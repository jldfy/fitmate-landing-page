# Fitmates Leads – outil de gestion de leads (gratuit, auto-hébergé)

Micro-service sans dépendance (Node ≥ 22.13, SQLite intégré) qui reçoit les formulaires du site et offre une interface de suivi.

## Démarrer sur le VPS

```bash
cd leads-service
cp .env.example .env && nano .env        # ADMIN_PASSWORD obligatoire
docker compose up -d --build
# → http://127.0.0.1:8787/admin (Basic Auth)
```

Expose-le en HTTPS avec Caddy (recommandé, certificat automatique) :

```
leads.fitmates.net {
  reverse_proxy 127.0.0.1:8787
}
```

Puis côté site (Vercel ou build sur le VPS) : `VITE_LEADS_API_URL=https://leads.fitmates.net`.

Sans Docker : `ADMIN_PASSWORD=xxx node server.mjs` (systemd conseillé).

## Endpoints

| Méthode | Route | Rôle |
|---|---|---|
| POST | `/api/leads` | capture publique (CORS limité à `ALLOWED_ORIGINS`, 10 requêtes/h/IP, honeypot, dédoublonnage email+type sur 7 jours) |
| GET | `/admin` | interface : tableau de bord, filtres, statut, responsable, prochaine relance, notes, export CSV, suppression RGPD |
| GET | `/api/admin/leads?status=&type=&sport=&zone=&q=` | JSON |
| PATCH | `/api/admin/leads/:id` | `{status, owner, notes, next_action_at, tags}` |
| DELETE | `/api/admin/leads/:id` | suppression |
| GET | `/api/admin/leads.csv` | export (mêmes filtres) |
| GET | `/api/admin/stats` | compteurs |

Pipeline : `nouveau → contacte → qualifie → converti | perdu`. Types : `participant`, `organisateur`, `partenaire`.

## Notifications

`LEAD_WEBHOOK_URL` reçoit un POST JSON `{ text, content, lead }` à chaque nouveau lead : compatible Slack (incoming webhook), Discord (`content`), n8n / Make (pour alimenter Brevo, Notion ou Google Sheets si tu veux un CRM plus riche plus tard).

## Sauvegarde

Toute la donnée est dans le volume `leads-data` (`/data/leads.sqlite`). Sauvegarde quotidienne :

```bash
docker compose exec leads sh -c 'cp /data/leads.sqlite /data/leads-$(date +%F).sqlite'
```

## RGPD

Consentement explicite dans le formulaire, IP hachée avec sel, suppression par lead depuis l’admin, export CSV pour les demandes d’accès. Ajoute la finalité « recontact suite à une demande sur le site » dans la politique de confidentialité.
