/**
 * Récupère les événements publics et écrit src/data/events.generated.json.
 *
 * Sources, par ordre de priorité :
 *  1. EVENTS_FEED_URL : endpoint JSON exposé par le backend Fitmates sur le VPS
 *     (ex. https://api.fitmates.net/public/events.json), avec EVENTS_FEED_TOKEN en Bearer si défini
 *  2. Fichier local data/events.json (export manuel ou déposé par un cron du VPS)
 *  3. Liste vide (le site se construit quand même)
 *
 * Le format attendu est documenté dans docs/acces-donnees.md (voir data/events.example.json).
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const OUT = path.join(ROOT, 'src/data/events.generated.json');
const LOCAL = path.join(ROOT, 'data/events.json');

const FEED_URL = process.env.EVENTS_FEED_URL;
const FEED_TOKEN = process.env.EVENTS_FEED_TOKEN;

function slugify(s) {
  return String(s)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function normalize(raw) {
  const start = raw.start_at || raw.starts_at || raw.date;
  const id = String(raw.id);
  const day = start ? String(start).slice(0, 10) : 'date';
  return {
    id,
    slug: raw.slug || `${slugify(raw.title || 'evenement')}-${day}-${id.slice(-6)}`,
    title: raw.title,
    sport: raw.sport,
    description: raw.description || '',
    start_at: start,
    end_at: raw.end_at || null,
    timezone: raw.timezone || 'Europe/Paris',
    zone: raw.zone,
    location: raw.location || {
      name: raw.location_name,
      address: raw.address || null,
      city: raw.city,
      postal_code: raw.postal_code || null,
      department: raw.department || null,
      lat: raw.lat ?? null,
      lng: raw.lng ?? null,
    },
    level: raw.level || 'tous',
    distance_km: raw.distance_km ?? null,
    elevation_m: raw.elevation_m ?? null,
    duration_min: raw.duration_min ?? null,
    max_participants: raw.max_participants ?? null,
    participants_count: raw.participants_count ?? null,
    price_eur: raw.price_eur ?? 0,
    organizer: raw.organizer || {
      id: raw.organizer_id,
      display_name: raw.organizer_name || 'Membre Fitmates',
      is_coach: !!raw.organizer_is_coach,
      events_organized: raw.organizer_events_count ?? undefined,
    },
    status: raw.status || 'open',
    approval_mode: raw.approval_mode || 'auto',
    app_url: raw.app_url || `https://app.fitmates.net/events/${id}`,
    image_url: raw.image_url || null,
    created_at: raw.created_at,
    updated_at: raw.updated_at,
  };
}

async function fromFeed() {
  const headers = { Accept: 'application/json' };
  if (FEED_TOKEN) headers.Authorization = `Bearer ${FEED_TOKEN}`;
  const res = await fetch(FEED_URL, { headers });
  if (!res.ok) throw new Error(`feed ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const body = await res.json();
  return Array.isArray(body) ? body : body.events || body.data || [];
}

async function main() {
  let rows = [];
  let source = 'empty';
  try {
    if (FEED_URL) {
      rows = await fromFeed();
      source = FEED_URL;
    } else if (existsSync(LOCAL)) {
      rows = JSON.parse(await readFile(LOCAL, 'utf8'));
      source = 'data/events.json';
    }
  } catch (err) {
    console.warn('[fetch-events] source failed:', err.message);
    if (existsSync(LOCAL)) {
      rows = JSON.parse(await readFile(LOCAL, 'utf8'));
      source = 'data/events.json (fallback)';
    }
  }
  const events = (Array.isArray(rows) ? rows : [])
    .filter((r) => r && r.title && r.sport && r.zone && (r.start_at || r.starts_at || r.date))
    .map(normalize);
  await mkdir(path.dirname(OUT), { recursive: true });
  await writeFile(OUT, JSON.stringify(events, null, 2));
  console.log(`[fetch-events] ${events.length} événement(s) écrits depuis ${source}`);
}

main();
