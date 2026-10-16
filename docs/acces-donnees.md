# Accès aux données : ce que le site attend du backend (VPS)

Le site public (fitmates.net) est généré en HTML statique à chaque build. Il ne lit jamais la base en direct : il consomme un **flux JSON** exposé par le backend, puis génère les pages événements, les pages sport × zone, le sitemap, `llms-full.txt`, `api/public/events.json` et `events.ics`.

Deux couches :

1. **Flux statique** (obligatoire) : les événements publics à venir. Lu au build, régénéré chaque jour (cron ou deploy hook) et à chaque déploiement.
2. **Endpoint de recherche** (recommandé, phase 2) : interrogé par les assistants IA au moment de la question, avec les contraintes de l'utilisateur. C'est le seul moyen d'avoir une réponse « adaptée au profil » : Google, ChatGPT, Claude et Perplexity ne transmettent jamais le profil du chercheur à un site.

## 1. Flux statique `GET /public/events.json`

Configuration côté site : `EVENTS_FEED_URL` (et `EVENTS_FEED_TOKEN` si tu protèges l'endpoint par `Authorization: Bearer`). Alternative sans endpoint : un cron du VPS dépose le même JSON dans `data/events.json` du dépôt avant le build.

Règles :

- Uniquement les événements **publics**, **non annulés** (ou annulés depuis < 7 jours avec `status: "cancelled"`, pour garder l'URL et afficher « annulée »), **à venir** jusqu'à J+60, triés par `start_at`.
- Tableau à la racine ou `{ "events": [...] }`. Maximum 1 000 éléments.
- Dates ISO 8601 **avec fuseau** (`2026-10-25T09:30:00+02:00`).
- `display_name` = prénom + initiale. Jamais de nom complet, d'email ni de téléphone : la page est publique.
- `slug` stable (généré une fois à la création, jamais recalculé) : il devient l'URL `/evenements/<slug>`.

### Champs

| Champ | Type | Obligatoire | Notes |
|---|---|---|---|
| `id` | string | oui | identifiant interne |
| `slug` | string | recommandé | `kebab-case`, unique, stable ; sinon généré |
| `title` | string | oui | 40–80 caractères idéalement |
| `sport` | enum | oui | `randonnee`, `course-a-pied`, `trail`, `velo`, `marche-nordique`, `natation`, `escalade`, `yoga`, `pilates`, `fitness`, `tennis`, `padel`, `football`, `basketball` |
| `zone` | enum | oui | `paris`, `hauts-de-seine`, `seine-saint-denis`, `val-de-marne`, `seine-et-marne`, `yvelines`, `essonne`, `val-d-oise` (extensible) |
| `description` | string | oui | texte libre de l'organisateur, 1 000 caractères max |
| `start_at`, `end_at` | ISO 8601 | oui / non | |
| `timezone` | string | non | défaut `Europe/Paris` |
| `location` | objet | oui | `name`, `city` obligatoires ; `address`, `postal_code`, `department`, `lat`, `lng` recommandés (Google Events + « près de moi ») |
| `level` | enum | non | `debutant`, `intermediaire`, `avance`, `tous` (défaut) |
| `distance_km`, `elevation_m`, `duration_min` | number | non | |
| `max_participants`, `participants_count` | int | non | permet « X places restantes » |
| `price_eur` | number | non | 0 = gratuit |
| `organizer` | objet | oui | `id`, `display_name` ; `avatar_url`, `is_coach`, `events_organized` optionnels |
| `status` | enum | non | `open` (défaut), `full`, `cancelled` |
| `approval_mode` | enum | non | `auto` (défaut), `manual` |
| `app_url` | string | non | lien profond vers l'événement dans l'app ; défaut `https://app.fitmates.net/events/<id>` |
| `image_url` | string | non | 1200×630 idéalement (Open Graph) |
| `created_at`, `updated_at` | ISO 8601 | recommandé | `updated_at` alimente `<lastmod>` du sitemap |

### Champs enrichis par le LLM du backend (optionnels, fortement recommandés)

Le site les affiche s'ils sont présents et les injecte dans les métadonnées, le JSON-LD et `llms-full.txt`. Ils transforment une fiche brute en page que Google et les assistants citent. À générer **une fois à la création/modification** de l'événement (pas à chaque requête), en français, factuel, sans superlatifs.

| Champ | Contenu attendu | Exemple |
|---|---|---|
| `seo_summary` | 1 phrase (≤ 160 caractères) qui répond à « quoi, où, quand, pour qui » | « Randonnée sportive de 16 km (800 m D+) dans les Trois Pignons, dimanche 25 octobre, départ gare de Bois-le-Roi, niveau confirmé. » |
| `suited_for` | liste de 2–4 profils | `["coureurs qui veulent du dénivelé", "randonneurs réguliers", "préparation trail"]` |
| `transport_access` | comment venir sans voiture | « Transilien R depuis Gare de Lyon, arrêt Bois-le-Roi (40 min). » |
| `what_to_bring` | liste courte | `["2 L d'eau", "pique-nique", "chaussures à tige haute"]` |
| `meeting_point_instructions` | 1–2 phrases | « Devant la sortie principale de la gare, côté parking, panneau Fitmates. » |
| `difficulty_score` | entier 1–5 | 4 |
| `tags` | 3–8 mots-clés de recherche | `["25 bosses", "fontainebleau", "trois pignons", "rando sportive"]` |
| `faq` | 2–4 paires `{q, a}` spécifiques à l'événement | « Peut-on venir seul·e ? » / « Oui, la majorité des participants viennent seuls. » |
| `weather_policy` | 1 phrase | « Maintenue sauf alerte orange ; décision la veille à 18h dans le chat. » |
| `recurrence` | objet si récurrent | `{ "frequency": "weekly", "by_day": ["SU"], "time": "09:30" }` → JSON-LD `eventSchedule` |

### Endpoint de statistiques `GET /public/stats.json` (recommandé)

Sert à afficher des **chiffres honnêtes et datés** sur la home, les pages sport × zone et dans `llms.txt` (les pages avec statistiques datées sont nettement plus citées par les IA). Remplace les compteurs actuels de la landing (« 10 000+ utilisateurs », « 50 000+ événements ») qui ne correspondent pas à la réalité.

```json
{
  "as_of": "2026-10-16",
  "active_members_30d": 1210,
  "participations_7d": 104,
  "participations_30d": 418,
  "events_upcoming": 23,
  "organizers_active_30d": 31,
  "by_sport_zone": [
    { "sport": "randonnee", "zone": "seine-et-marne", "events_30d": 12, "participations_30d": 168, "organizers": 6 },
    { "sport": "randonnee", "zone": "yvelines", "events_30d": 9, "participations_30d": 121, "organizers": 5 }
  ]
}
```

## 2. Endpoint de recherche `GET /public/events/search` (phase 2)

Exposé publiquement (rate-limité) et déclaré dans `llms.txt`, puis emballé dans un **serveur MCP** (3 outils : `search_events`, `get_event`, `list_zones`) pour le ChatGPT Plugin Directory, les connecteurs Claude et les agents génériques. C'est l'endroit où ton LLM peut apporter de l'« intelligence contextuelle » : l'assistant transmet les contraintes de l'utilisateur, ton backend classe et explique.

Paramètres : `sport`, `zone`, `level`, `date_from`, `date_to`, `near=lat,lng`, `radius_km`, `max_distance_km`, `free_only`, `q` (texte libre, ex. « rando facile dimanche accessible en RER »), `limit`.

Réponse : même schéma que le flux, plus un `why` par résultat (1 phrase générée : « Correspond à votre niveau débutant, départ RER B, 12 km ») et un `summary` global (« 4 sorties correspondent ce week-end, la plus proche part de Saint-Rémy-lès-Chevreuse à 9h30 »).

À ne pas faire : personnaliser selon un identifiant utilisateur passé par un assistant externe. Aucun assistant ne le fait de façon fiable aujourd'hui, et ce serait un problème RGPD. La personnalisation par profil reste dans l'app, après connexion.

## 3. Cadence de rafraîchissement

- Build quotidien à 06:17 (`.github/workflows/daily-rebuild.yml` → deploy hook Vercel), ou un cron sur le VPS si le site y est buildé : `npm run build` puis copie de `dist/` derrière Caddy/Nginx.
- Optionnel : appeler le deploy hook à chaque création/annulation d'événement côté backend (débounce 10 min) pour que la page existe avant que l'organisateur la partage.
- Ping IndexNow (Bing) à chaque nouvel événement : `https://api.indexnow.org/indexnow?url=https://fitmates.net/evenements/<slug>&key=<clé>` (clé à déposer à la racine du site).
