# Fitmates – site public (fitmates.net)

Vite + React + Tailwind, **prérendu en HTML statique** pour le SEO et les assistants IA.

```bash
npm ci
cp .env.example .env         # EVENTS_FEED_URL, VITE_LEADS_API_URL
npm run dev                  # développement (SPA)
npm run build                # fetch événements → build client → build SSR → prérendu dist/
npm run preview              # aperçu (utiliser les URLs avec slash final : /sport/randonnee/paris/)
```

- `src/data/sports.ts`, `src/data/zones.ts` : contenu des pages sport × zone (ajouter une zone = nouvelles pages).
- `scripts/fetch-events.mjs` : lit le flux d'événements du backend (format : `docs/acces-donnees.md`).
- `scripts/prerender.mjs` : pages statiques, sitemaps, `llms-full.txt`, `api/public/events.json`, `events.ics`.
- `leads-service/` : outil de gestion de leads auto-hébergé (voir son README).
- `docs/strategie-marketing-2026.md` : stratégie marketing, SEO et visibilité IA.
- `scripts/google-trends.py` : extraction Google Trends à lancer en local.
