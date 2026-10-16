/**
 * Fitmates Leads — micro-service de capture et de gestion de leads.
 * Zéro dépendance : Node ≥ 22.13 (node:sqlite intégré).
 *
 *  POST /api/leads                 capture publique (formulaires du site), CORS + rate limit + honeypot
 *  GET  /admin                     interface de gestion (Basic Auth)
 *  GET  /api/admin/leads           liste filtrable (status, type, sport, zone, q)
 *  PATCH /api/admin/leads/:id      mise à jour (status, notes, owner, next_action_at, tags)
 *  DELETE /api/admin/leads/:id     suppression (RGPD)
 *  GET  /api/admin/leads.csv       export CSV
 *  GET  /api/admin/stats           compteurs pour le tableau de bord
 *  GET  /healthz
 */
import http from 'node:http';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const PORT = Number(process.env.PORT || 8787);
const DATA_DIR = process.env.DATA_DIR || path.join(path.dirname(new URL(import.meta.url).pathname), 'data');
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'https://fitmates.net,https://www.fitmates.net,http://localhost:5173,http://localhost:4173')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
const LEAD_WEBHOOK_URL = process.env.LEAD_WEBHOOK_URL; // Slack / Discord / Telegram / n8n…
const RATE_LIMIT_PER_HOUR = Number(process.env.RATE_LIMIT_PER_HOUR || 10);

if (!ADMIN_PASSWORD) {
  console.error('ADMIN_PASSWORD manquant : définis-le dans l’environnement.');
  process.exit(1);
}

mkdirSync(DATA_DIR, { recursive: true });
const db = new DatabaseSync(path.join(DATA_DIR, 'leads.sqlite'));
db.exec(`
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS leads (
    id TEXT PRIMARY KEY,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    type TEXT NOT NULL,              -- participant | organisateur | partenaire
    first_name TEXT,
    email TEXT NOT NULL,
    sport TEXT,
    zone TEXT,
    message TEXT,
    source TEXT,                     -- chemin de la page d'origine
    page_url TEXT,
    utm TEXT,                        -- JSON
    status TEXT NOT NULL DEFAULT 'nouveau', -- nouveau | contacte | qualifie | converti | perdu
    owner TEXT,
    notes TEXT,
    next_action_at TEXT,
    tags TEXT,                       -- JSON array
    ip_hash TEXT,
    user_agent TEXT
  );
  CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
  CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
  CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at);
`);

const STATUSES = ['nouveau', 'contacte', 'qualifie', 'converti', 'perdu'];
const TYPES = ['participant', 'organisateur', 'partenaire'];
const rate = new Map(); // ipHash -> timestamps

const json = (res, code, body, extra = {}) => {
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', ...extra });
  res.end(JSON.stringify(body));
};
const readBody = (req) =>
  new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (c) => {
      data += c;
      if (data.length > 64 * 1024) reject(new Error('payload too large'));
    });
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (e) {
        reject(e);
      }
    });
  });
const cors = (req) => {
  const origin = req.headers.origin;
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
};
const isAdmin = (req) => {
  const h = req.headers.authorization || '';
  if (!h.startsWith('Basic ')) return false;
  const [u, p] = Buffer.from(h.slice(6), 'base64').toString().split(':');
  const ok = (a, b) => a.length === b.length && crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
  return ok(u || '', ADMIN_USER) && ok(p || '', ADMIN_PASSWORD);
};
const unauthorized = (res) => {
  res.writeHead(401, { 'WWW-Authenticate': 'Basic realm="Fitmates Leads"', 'Content-Type': 'text/plain' });
  res.end('Authentification requise');
};
const ipOf = (req) => (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress || '';
const hash = (s) => crypto.createHash('sha256').update(String(s) + (process.env.IP_SALT || 'fitmates')).digest('hex').slice(0, 16);
const validEmail = (e) => typeof e === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e) && e.length <= 120;

async function notify(lead) {
  if (!LEAD_WEBHOOK_URL) return;
  const text = `🆕 Lead ${lead.type} — ${lead.first_name || '?'} <${lead.email}> · ${lead.sport || '-'} / ${lead.zone || '-'} · via ${lead.source || '-'}${lead.message ? `\n${lead.message}` : ''}`;
  try {
    await fetch(LEAD_WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text, content: text, lead }) });
  } catch (e) {
    console.warn('[webhook]', e.message);
  }
}

function createLead(req, body) {
  if (body.website) return { ok: true, id: null }; // honeypot : on répond OK sans stocker
  if (!TYPES.includes(body.type)) return { error: 'type invalide' };
  if (!validEmail(body.email)) return { error: 'email invalide' };
  const ipHash = hash(ipOf(req));
  const now = Date.now();
  const hits = (rate.get(ipHash) || []).filter((t) => now - t < 3600_000);
  if (hits.length >= RATE_LIMIT_PER_HOUR) return { error: 'trop de requêtes', code: 429 };
  hits.push(now);
  rate.set(ipHash, hits);

  const existing = db.prepare('SELECT id FROM leads WHERE email = ? AND type = ? AND created_at > ?').get(body.email.toLowerCase(), body.type, new Date(now - 7 * 86400_000).toISOString());
  const nowIso = new Date(now).toISOString();
  const lead = {
    id: existing?.id || crypto.randomUUID(),
    created_at: nowIso,
    updated_at: nowIso,
    type: body.type,
    first_name: String(body.first_name || '').slice(0, 80),
    email: body.email.toLowerCase(),
    sport: body.sport ? String(body.sport).slice(0, 40) : null,
    zone: body.zone ? String(body.zone).slice(0, 40) : null,
    message: body.message ? String(body.message).slice(0, 1000) : null,
    source: body.source ? String(body.source).slice(0, 200) : null,
    page_url: body.page_url ? String(body.page_url).slice(0, 500) : null,
    utm: JSON.stringify(body.utm && typeof body.utm === 'object' ? body.utm : {}),
    ip_hash: ipHash,
    user_agent: String(req.headers['user-agent'] || '').slice(0, 200),
  };
  if (existing) {
    db.prepare('UPDATE leads SET updated_at = ?, message = COALESCE(?, message), sport = COALESCE(?, sport), zone = COALESCE(?, zone), source = ? WHERE id = ?').run(
      nowIso, lead.message, lead.sport, lead.zone, lead.source, existing.id,
    );
    return { ok: true, id: existing.id, duplicate: true };
  }
  db.prepare(
    `INSERT INTO leads (id, created_at, updated_at, type, first_name, email, sport, zone, message, source, page_url, utm, ip_hash, user_agent)
     VALUES (@id, @created_at, @updated_at, @type, @first_name, @email, @sport, @zone, @message, @source, @page_url, @utm, @ip_hash, @user_agent)`,
  ).run(lead);
  notify(lead);
  return { ok: true, id: lead.id };
}

function listLeads(q) {
  const where = [];
  const params = [];
  if (q.get('status')) { where.push('status = ?'); params.push(q.get('status')); }
  if (q.get('type')) { where.push('type = ?'); params.push(q.get('type')); }
  if (q.get('sport')) { where.push('sport = ?'); params.push(q.get('sport')); }
  if (q.get('zone')) { where.push('zone = ?'); params.push(q.get('zone')); }
  if (q.get('q')) { where.push('(email LIKE ? OR first_name LIKE ? OR message LIKE ? OR notes LIKE ?)'); const like = `%${q.get('q')}%`; params.push(like, like, like, like); }
  const sql = `SELECT id, created_at, updated_at, type, first_name, email, sport, zone, message, source, utm, status, owner, notes, next_action_at, tags FROM leads ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY created_at DESC LIMIT 2000`;
  return db.prepare(sql).all(...params).map((r) => ({ ...r, utm: JSON.parse(r.utm || '{}'), tags: JSON.parse(r.tags || '[]') }));
}

function stats() {
  const byStatus = Object.fromEntries(db.prepare('SELECT status, COUNT(*) n FROM leads GROUP BY status').all().map((r) => [r.status, r.n]));
  const byType = Object.fromEntries(db.prepare('SELECT type, COUNT(*) n FROM leads GROUP BY type').all().map((r) => [r.type, r.n]));
  const bySport = db.prepare('SELECT sport, COUNT(*) n FROM leads WHERE sport IS NOT NULL GROUP BY sport ORDER BY n DESC').all();
  const byZone = db.prepare('SELECT zone, COUNT(*) n FROM leads WHERE zone IS NOT NULL GROUP BY zone ORDER BY n DESC').all();
  const bySource = db.prepare('SELECT source, COUNT(*) n FROM leads GROUP BY source ORDER BY n DESC LIMIT 20').all();
  const last7 = db.prepare("SELECT COUNT(*) n FROM leads WHERE created_at > ?").get(new Date(Date.now() - 7 * 86400_000).toISOString()).n;
  const last30 = db.prepare("SELECT COUNT(*) n FROM leads WHERE created_at > ?").get(new Date(Date.now() - 30 * 86400_000).toISOString()).n;
  const overdue = db.prepare("SELECT COUNT(*) n FROM leads WHERE next_action_at IS NOT NULL AND next_action_at < ? AND status NOT IN ('converti','perdu')").get(new Date().toISOString().slice(0, 10)).n;
  const total = db.prepare('SELECT COUNT(*) n FROM leads').get().n;
  return { total, last7, last30, overdue, byStatus, byType, bySport, byZone, bySource };
}

function toCsv(rows) {
  const cols = ['id', 'created_at', 'type', 'first_name', 'email', 'sport', 'zone', 'status', 'owner', 'next_action_at', 'source', 'message', 'notes'];
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  return [cols.join(';'), ...rows.map((r) => cols.map((c) => esc(r[c])).join(';'))].join('\r\n');
}

const adminHtml = readFileSync(path.join(path.dirname(new URL(import.meta.url).pathname), 'admin.html'));

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const p = url.pathname;
  try {
    if (p === '/healthz') return json(res, 200, { ok: true });

    if (p === '/api/leads') {
      if (req.method === 'OPTIONS') { res.writeHead(204, cors(req)); return res.end(); }
      if (req.method !== 'POST') return json(res, 405, { error: 'method' }, cors(req));
      const body = await readBody(req);
      const r = createLead(req, body);
      if (r.error) return json(res, r.code || 400, { error: r.error }, cors(req));
      return json(res, 201, r, cors(req));
    }

    if (p === '/admin' || p.startsWith('/api/admin/')) {
      if (!isAdmin(req)) return unauthorized(res);
      if (p === '/admin') { res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); return res.end(adminHtml); }
      if (p === '/api/admin/leads' && req.method === 'GET') return json(res, 200, { leads: listLeads(url.searchParams) });
      if (p === '/api/admin/leads.csv') {
        res.writeHead(200, { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': `attachment; filename="fitmates-leads-${new Date().toISOString().slice(0, 10)}.csv"` });
        return res.end('﻿' + toCsv(listLeads(url.searchParams)));
      }
      if (p === '/api/admin/stats') return json(res, 200, stats());
      const m = p.match(/^\/api\/admin\/leads\/([0-9a-f-]{36})$/);
      if (m && req.method === 'PATCH') {
        const body = await readBody(req);
        const fields = [];
        const params = [];
        if (body.status !== undefined) { if (!STATUSES.includes(body.status)) return json(res, 400, { error: 'status' }); fields.push('status = ?'); params.push(body.status); }
        for (const k of ['owner', 'notes', 'next_action_at']) if (body[k] !== undefined) { fields.push(`${k} = ?`); params.push(body[k] ? String(body[k]).slice(0, 4000) : null); }
        if (body.tags !== undefined) { fields.push('tags = ?'); params.push(JSON.stringify(Array.isArray(body.tags) ? body.tags.slice(0, 20) : [])); }
        if (!fields.length) return json(res, 400, { error: 'nothing to update' });
        fields.push('updated_at = ?'); params.push(new Date().toISOString());
        params.push(m[1]);
        const info = db.prepare(`UPDATE leads SET ${fields.join(', ')} WHERE id = ?`).run(...params);
        return json(res, info.changes ? 200 : 404, { ok: !!info.changes });
      }
      if (m && req.method === 'DELETE') {
        const info = db.prepare('DELETE FROM leads WHERE id = ?').run(m[1]);
        return json(res, info.changes ? 200 : 404, { ok: !!info.changes });
      }
      return json(res, 404, { error: 'not found' });
    }
    res.writeHead(302, { Location: '/admin' });
    res.end();
  } catch (e) {
    console.error(e);
    json(res, 500, { error: 'server error' });
  }
});

server.listen(PORT, () => console.log(`Fitmates Leads sur http://0.0.0.0:${PORT} (admin: /admin, données: ${DATA_DIR})`));
