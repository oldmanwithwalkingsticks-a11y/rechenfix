# Social-Media Pipeline (Welle 17A)

Vollautomatische tägliche Posts auf Instagram (@rechenfix) und Facebook (Rechenfix-Page). Live seit Welle 17A (Juni 2026).

---

## 1. Architektur-Überblick

```
┌───────────────────┐  cron 0 17 * * *  ┌────────────────────────┐
│ Vercel Cron Job   │ ────────────────▶ │ /api/cron/social-post  │
└───────────────────┘  Bearer SECRET    └─────────┬──────────────┘
                                                  │
                          ┌───────────────────────┴──────────────────────┐
                          │                                              │
                          ▼                                              ▼
              ┌────────────────────────┐                  ┌────────────────────────┐
              │ publishToInstagram     │                  │ publishToFacebook      │
              │  1) POST /media        │                  │  POST /photos          │
              │  2) POST /media_publish│                  │   (url + message)      │
              └─────────┬──────────────┘                  └─────────┬──────────────┘
                        │                                            │
                        └────────────────┬───────────────────────────┘
                                         │
                                         ▼
                                ┌────────────────────┐
                                │ Vercel KV (Upstash)│
                                │  Idempotenz +      │
                                │  Error-Log         │
                                └────────────────────┘
                                         │
                                         ▼ (bei Fehler)
                                ┌────────────────────┐
                                │ Resend → Admin-Mail│
                                └────────────────────┘
```

- **Variante B** (zwei separate API-Calls, kein IG↔FB-Crosspost). Begründung siehe L-W17A.1 in CLAUDE.md.
- **Rotation**: `(today_Berlin - startDate) mod posts.length`. Posts in `lib/social/posts.json` deterministisch durchlaufen, kein Random.
- **Idempotenz**: KV-Key `social:posted:{YYYY-MM-DD}:{platform}` wird vor jedem API-Call geprüft. Ein erneuter Cron-Trigger am selben Berlin-Tag tut nichts (außer mit `?force=true`).
- **State**: Vercel-KV-Integration über die bestehende `redis`-Instance in [lib/redis.ts](../lib/redis.ts) (basiert auf `@upstash/redis`, ENV-Vars `KV_REST_API_URL` + `KV_REST_API_TOKEN`).
- **Cron**: Vercel Cron Jobs, definiert in [vercel.json](../vercel.json). Skalierung auf 2/3× über Schedule-Änderung, kein Code-Refactor.
- **Error-Handling**: keine Retries, KV-Log (`social:errors:...`), Resend-Mail an `ADMIN_NOTIFICATION_EMAIL`. Manueller Re-Trigger über `?force=true`.

---

## 2. Token-Generation Step-by-Step

Long-Lived Page Access Token (never expires) — wird vom Endpoint als `META_PAGE_ACCESS_TOKEN` gelesen.

1. **Graph API Explorer** öffnen: <https://developers.facebook.com/tools/explorer/>
2. App auswählen („Rechenfix Social Publisher"), Token-Typ **User Token**
3. Permissions hinzufügen:
   - `pages_show_list`
   - `pages_read_engagement`
   - `pages_manage_posts`
   - `instagram_basic`
   - `instagram_content_publish`
4. **Generate Access Token** → ergibt einen Short-Lived User Token (~1 h gültig).
5. Exchange zu Long-Lived **User Token** (60 Tage):
   ```
   GET https://graph.facebook.com/v23.0/oauth/access_token
       ?grant_type=fb_exchange_token
       &client_id={app-id}
       &client_secret={app-secret}
       &fb_exchange_token={short-lived-user-token}
   ```
6. Long-Lived **Page Token** holen (never expires!):
   ```
   GET https://graph.facebook.com/v23.0/{page-id}
       ?fields=access_token
       &access_token={long-lived-user-token}
   ```
   → `access_token`-Feld der Response ist der Page Token.
7. **Verifizieren** im Token Debugger: <https://developers.facebook.com/tools/debug/accesstoken/> → `expires_at: never`.
8. Instagram Business Account ID abfragen:
   ```
   GET https://graph.facebook.com/v23.0/{page-id}
       ?fields=instagram_business_account
       &access_token={page-token}
   ```
   → Feld `instagram_business_account.id` ist `META_INSTAGRAM_USER_ID`.

---

## 3. ENV-Vars (Production + Preview)

Alle ENV-Vars in der Vercel-Dashboard-UI setzen (Settings → Environment Variables).

| Variable | Wert / Quelle | Scope |
|---|---|---|
| `META_PAGE_ACCESS_TOKEN` | Long-Lived Page Token aus Schritt 6 oben | Production + Preview |
| `META_PAGE_ID` | Facebook-Page-ID (numerisch, z. B. `1127293363806857`) | Production + Preview |
| `META_INSTAGRAM_USER_ID` | IG-Business-Account-ID aus Schritt 8 | Production + Preview |
| `ADMIN_NOTIFICATION_EMAIL` | `info@rechenfix.de` (oder andere Empfangs-Adresse) | Production + Preview |
| `CRON_SECRET` | Random 32-Zeichen-String, manuell generieren (`openssl rand -hex 16`) | Production + Preview |
| `ADMIN_PASSWORD` | Random String — schützt `?test=true` in Production | Production + Preview |
| `RESEND_API_KEY` | bereits gesetzt, wird für Fehler-Mails wiederverwendet | bereits live |
| `KV_REST_API_URL` / `KV_REST_API_TOKEN` | aus Vercel-KV-Integration, bereits gesetzt | bereits live |

---

## 4. Skalierungspfad

Schedule-Änderung in [vercel.json](../vercel.json), kein Code-Refactor.

```jsonc
// 1×/Tag (Initial, Tag 1+)
{ "path": "/api/cron/social-post", "schedule": "0 17 * * *" }

// 2×/Tag (ab Tag 30)
{ "path": "/api/cron/social-post", "schedule": "0 17 * * *" },
{ "path": "/api/cron/social-post", "schedule": "0 11 * * *" }

// 3×/Tag (ab Tag 60)
{ "path": "/api/cron/social-post", "schedule": "0 17 * * *" },
{ "path": "/api/cron/social-post", "schedule": "0 11 * * *" },
{ "path": "/api/cron/social-post", "schedule": "0  6 * * *" }
```

Bei mehreren Cron-Einträgen am selben Tag posten alle denselben Post (Rotation ist tagesbasiert). Echte „Multi-Slot mit drei verschiedenen Posts pro Tag" wäre eine spätere Erweiterung in 17A.X mit `POSTS_PER_DAY > 1` + Slot-Aufschlüsselung in `posts.json`.

UTC-↔-Berlin: 17 UTC = 19 Berlin im Sommer, 18 Berlin im Winter. DST-Drift bewusst akzeptiert (kein Showstopper).

---

## 5. Neue Posts hinzufügen

1. Bild erstellen — 1080×1080 PNG, RGB. Dateiname `NNN.png` (3-stellig padded), nach [public/social-posts/](../public/social-posts/) ablegen. **Wichtig:** Image muss public unter `https://www.rechenfix.de/social-posts/NNN.png` erreichbar sein, sonst „Container creation failed".
2. Eintrag in [lib/social/posts.json](../lib/social/posts.json) anhängen — `index` ist 1-basierte fortlaufende Nummer, `slug` und `category` matchen den Rechner, `url` ist die vollständige Production-URL.
3. `captionIg` enthält den Hinweis „👉 Link in Bio" (IG erlaubt keine klickbaren Links im Caption-Text).
4. `captionFb` enthält den echten Rechner-URL (FB erlaubt Links).
5. Hashtags 9–15 Stück, Leerzeichen-getrennt.
6. Commit + Push.

Nach dem Deploy rotiert die Pipeline automatisch durch das erweiterte Array. **Index-Anpassung nicht vergessen**, sonst Duplicate-Index.

---

## 6. Troubleshooting

| Meta-Code | Bedeutung | Massnahme |
|---|---|---|
| **-10** | Permission Denied | Permissions im Token fehlen — Token via Graph API Explorer neu generieren mit allen 5 Scopes (siehe §2 Schritt 3) |
| **190** | Token expired / invalid | Page Token im Token Debugger prüfen. „Never expires" muss stehen. Falls expired: User Token + Page Token komplett neu generieren |
| **4** | Rate Limit | Wartezeit ~1 h. Bei wiederholtem Auftreten: Posts-Frequenz reduzieren oder API-Quota im Meta-Dashboard prüfen |
| **NO_CONTAINER_ID** | IG Step-1 ohne `id` | Image-URL nicht erreichbar (Server-Down? Image fehlt in `public/social-posts/`?). curl die URL manuell testen |
| **NO_MEDIA_ID** | IG Step-2 ohne `id` | Container war erstellt, Publish hat aber geknallt. Meist Token-Permission-Drift. Logs in KV checken |
| **NO_POST_ID** | FB ohne `post_id`/`id` | Selten — FB-API-Inkonsistenz. Manuell Page-Wall prüfen ob der Post trotzdem angekommen ist |
| **ENV_MISSING** | Tokens/IDs nicht gesetzt | Vercel-ENV-Vars prüfen (siehe §3) |

**KV-Logs inspizieren** (manuell via Upstash Console):

```
GET social:posted:2026-06-05:instagram   → mediaId oder null
GET social:posted:2026-06-05:facebook    → postId  oder null
GET social:errors:2026-06-05:instagram   → JSON oder null
GET social:errors:2026-06-05:facebook    → JSON oder null
```

**Manueller Re-Trigger** (überspringt Idempotenz-Check):

```bash
curl -H "Authorization: Bearer $CRON_SECRET" \
     "https://www.rechenfix.de/api/cron/social-post?force=true"
```

**Dry-Run im Preview** (kein API-Call, kein KV-Write — nur Logging):

```bash
curl -H "Authorization: Bearer $CRON_SECRET" \
     "https://preview-url/api/cron/social-post?test=true&admin=$ADMIN_PASSWORD"
```

---

## 7. Token-Rotation alle 50 Tage

Auch wenn der Long-Lived Page Token offiziell „never expires" hat, gibt es Edge-Cases (App-Permissions-Revocation, Meta-Policy-Changes), die Tokens ungültig werden lassen.

**Backup-Strategie:**

- **Tag 50** nach Token-Generation: Token im Token Debugger neu prüfen (`expires_at: never` muss noch stehen).
- **Bei Verlängerung des User Tokens** (alle 60 Tage): neuen Page Token mit Schritt 6 oben generieren, in Vercel-ENV austauschen.
- **Bei Code-190-Fehlern im KV-Log**: sofort Token-Neugenerierung.

Kalendar-Reminder in [docs/jahreswerte-kalender.md](./jahreswerte-kalender.md) eintragen wäre sinnvoll (Token-Refresh-Slot Q2 / Q4).

---

## 8. KV-Log-Schema

| Key-Pattern | Wert-Typ | Beispiel |
|---|---|---|
| `social:posted:{YYYY-MM-DD}:instagram` | string (mediaId) | `17841...` |
| `social:posted:{YYYY-MM-DD}:facebook` | string (postId) | `1127...XYZ_98...` |
| `social:errors:{YYYY-MM-DD}:{platform}` | JSON | `{"error":"...", "code":190, "step":"container", "ts":"2026-06-05T17:00:12.345Z"}` |

Keine TTL — Keys bleiben dauerhaft. Manuelle Bereinigung (z. B. „älter als 90 Tage löschen") wäre eine spätere Wartungs-Maßnahme; aktuell ignoriert, weil das KV-Volume klein bleibt (max. 2 Keys/Tag × 365 = 730 Keys/Jahr).

---

## 9. Out-of-Scope (kommt später)

- **17A.X**: Erweiterung auf 30+ und später 170 Posts (mit Python-Image-Builder)
- **17A.Y**: AI-Caption-Generator über Anthropic-API
- **17A.Z**: Image-Builder-Script für 170 Rechner
- **17B**: TikTok-Pipeline (Remotion-Videos)
- **17C**: Analytics + A/B-Tests

DST-genauer Schedule (immer 19:00 Berlin egal ob Sommer/Winter): kein Showstopper, in einem späteren Sprint mit Berlin-DST-Helper anpassbar.
