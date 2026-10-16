/**
 * Prérendu statique (SSG) des pages publiques après `vite build`.
 *
 *  - rend chaque route de publicRoutes() en HTML via dist-server/entry-server.js
 *  - injecte title / meta / canonical / JSON-LD dans le template dist/index.html
 *  - écrit dist/<route>/index.html, dist/sitemap.xml, dist/sitemap-events.xml,
 *    dist/llms-full.txt, dist/api/public/events.json et dist/events.ics
 *
 * Les routes non listées (ex. /pitch, /admin) restent servies par le fallback SPA.
 */
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DIST = path.join(ROOT, process.env.PRERENDER_DIST || 'dist');
const SERVER = path.join(ROOT, 'dist-server');

const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

function headFor(meta) {
  const robots = meta.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large';
  const og = meta.ogImage || 'https://fitmates.net/screenshot_homescreen.png';
  const jsonLd = (meta.jsonLd ?? [])
    .map((ld) => `<script type="application/ld+json" data-seo-jsonld="1">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>`)
    .join('\n    ');
  return `<title>${esc(meta.title)}</title>
    <meta name="description" content="${esc(meta.description)}" />
    <meta name="robots" content="${robots}" />
    <link rel="canonical" href="${esc(meta.canonical)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Fitmates" />
    <meta property="og:locale" content="fr_FR" />
    <meta property="og:title" content="${esc(meta.title)}" />
    <meta property="og:description" content="${esc(meta.description)}" />
    <meta property="og:url" content="${esc(meta.canonical)}" />
    <meta property="og:image" content="${esc(og)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(meta.title)}" />
    <meta name="twitter:description" content="${esc(meta.description)}" />
    <meta name="twitter:image" content="${esc(og)}" />
    ${jsonLd}`;
}

function icsEscape(s) {
  return String(s ?? '').replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\;');
}
function icsDate(iso) {
  return new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

async function main() {
  const template = await readFile(path.join(DIST, 'index.html'), 'utf8');
  const start = template.indexOf('<!--seo:start-->');
  const end = template.indexOf('<!--seo:end-->');
  if (start === -1 || end === -1) throw new Error('index.html must contain <!--seo:start--> and <!--seo:end--> markers');
  const before = template.slice(0, start);
  const after = template.slice(end + '<!--seo:end-->'.length);

  const mod = await import(path.join(SERVER, 'entry-server.js'));
  const routes = mod.publicRoutes();
  const site = mod.SITE;
  const today = new Date().toISOString().slice(0, 10);

  let count = 0;
  for (const r of routes) {
    const { html, meta } = mod.render(r.path);
    const page = (before + headFor(meta) + after).replace('<div id="root"></div>', `<div id="root">${html}</div>`);
    const outDir = r.path === '/' ? DIST : path.join(DIST, r.path);
    await mkdir(outDir, { recursive: true });
    await writeFile(path.join(outDir, 'index.html'), page);
    count++;
  }

  // Sitemaps
  const urlset = (items) =>
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items
      .map(
        (r) =>
          `  <url><loc>${site.url}${r.path === '/' ? '/' : r.path}</loc>${r.lastmod ? `<lastmod>${String(r.lastmod).slice(0, 10)}</lastmod>` : ''}<priority>${r.priority}</priority></url>`,
      )
      .join('\n')}\n</urlset>\n`;
  const pageRoutes = routes.filter((r) => !r.path.startsWith('/evenements/'));
  const eventRoutes = routes.filter((r) => r.path.startsWith('/evenements/'));
  await writeFile(path.join(DIST, 'sitemap-pages.xml'), urlset(pageRoutes));
  await writeFile(path.join(DIST, 'sitemap-events.xml'), urlset(eventRoutes));
  await writeFile(
    path.join(DIST, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap><loc>${site.url}/sitemap-pages.xml</loc><lastmod>${today}</lastmod></sitemap>\n  <sitemap><loc>${site.url}/sitemap-events.xml</loc><lastmod>${today}</lastmod></sitemap>\n</sitemapindex>\n`,
  );

  // Flux publics (JSON + iCal) pour agrégateurs et agents
  const upcoming = mod.upcomingEvents();
  await mkdir(path.join(DIST, 'api/public'), { recursive: true });
  await writeFile(
    path.join(DIST, 'api/public/events.json'),
    JSON.stringify(
      {
        generated_at: new Date().toISOString(),
        source: site.url,
        count: upcoming.length,
        events: upcoming.map((e) => ({ ...e, url: `${site.url}/evenements/${e.slug}` })),
      },
      null,
      2,
    ),
  );
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Fitmates//Événements publics//FR',
    'X-WR-CALNAME:Fitmates – sorties sportives',
    ...upcoming.flatMap((e) => [
      'BEGIN:VEVENT',
      `UID:${e.id}@fitmates.net`,
      `DTSTAMP:${icsDate(e.updated_at || e.start_at)}`,
      `DTSTART:${icsDate(e.start_at)}`,
      ...(e.end_at ? [`DTEND:${icsDate(e.end_at)}`] : []),
      `SUMMARY:${icsEscape(e.title)}`,
      `DESCRIPTION:${icsEscape(e.description)}\\n${site.url}/evenements/${e.slug}`,
      `LOCATION:${icsEscape(`${e.location.name}, ${e.location.city}`)}`,
      `URL:${site.url}/evenements/${e.slug}`,
      'END:VEVENT',
    ]),
    'END:VCALENDAR',
    '',
  ].join('\r\n');
  await writeFile(path.join(DIST, 'events.ics'), ics);

  // llms-full.txt : contenu complet en Markdown pour les LLM
  const md = [];
  md.push(`# Fitmates – contenu complet (généré le ${today})\n`);
  md.push(
    `> Fitmates est une application française gratuite (iOS, Android, web) pour trouver des partenaires sportifs et rejoindre ou organiser des événements sportifs locaux, sport par sport et zone par zone. Communauté active : randonnée en Île-de-France, ${site.facts.activeUsers} membres actifs et environ ${site.facts.weeklyParticipations} participations par semaine (${site.facts.asOf}), sans publicité payante.\n`,
  );
  md.push(`Télécharger : iOS ${site.ios} · Android ${site.android} · Web ${site.appUrl}\n`);
  md.push('## Sports\n');
  for (const s of mod.SPORTS) {
    md.push(`### ${s.name} (${s.live ? 'actif' : 'ouverture à venir'}) – ${site.url}/sport/${s.slug}\n${s.short}\n${s.why}\nNiveaux : ${s.levels.join(' ; ')}.`);
    for (const f of s.faq) md.push(`- Q : ${f.q}\n  R : ${f.a}`);
    md.push('');
  }
  md.push('## Zones (Île-de-France)\n');
  for (const z of mod.ZONES) {
    md.push(`### ${z.name} (${z.departments.join(', ')})\n${z.intro}`);
    for (const [sportSlug, spots] of Object.entries(z.spots)) {
      const s = mod.SPORTS.find((x) => x.slug === sportSlug);
      md.push(`- ${s?.name ?? sportSlug} – ${site.url}/sport/${sportSlug}/${z.slug} : ${spots.map((sp) => `${sp.name} (${sp.detail}${sp.access ? ` Accès : ${sp.access}` : ''})`).join(' ; ')}`);
    }
    md.push('');
  }
  md.push(`## Événements à venir (${upcoming.length})\n`);
  for (const e of upcoming.slice(0, 100)) {
    md.push(
      `- ${e.title} — ${e.start_at} — ${e.location.name}, ${e.location.city} — niveau ${e.level}${e.distance_km ? ` — ${e.distance_km} km` : ''}${e.elevation_m ? `, ${e.elevation_m} m D+` : ''} — ${site.url}/evenements/${e.slug}\n  ${e.description}`,
    );
  }
  md.push(`\nFlux JSON : ${site.url}/api/public/events.json · iCal : ${site.url}/events.ics · Sitemap : ${site.url}/sitemap.xml\n`);
  await writeFile(path.join(DIST, 'llms-full.txt'), md.join('\n'));

  await rm(SERVER, { recursive: true, force: true });
  console.log(`[prerender] ${count} pages, ${eventRoutes.length} événements, sitemap + llms-full.txt + events.json + events.ics`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
