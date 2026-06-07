# Social-Media Pipeline (Welle 17A + 17A.1)

Vollautomatische tägliche Posts auf Instagram (@rechenfix) und Facebook (Rechenfix-Page). Live seit Welle 17A (Juni 2026). Auto-Content-Generierung seit Welle 17A.1.

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
- **Queue + Done-Marken** (W17A.1, ersetzt Modulo-Rotation): Slug-Reihenfolge in [lib/social/queue.json](../lib/social/queue.json) (seeded shuffle, 160 Einträge). Pipeline wählt den ersten Slug ohne Done-Marke. Jeder Rechner wird **genau einmal** gepostet — Queue erschöpft → keine Wiederholung.
- **Idempotenz**: KV-Key `social:posted:{YYYY-MM-DD}:{platform}` wird vor jedem API-Call geprüft. Ein erneuter Cron-Trigger am selben Berlin-Tag tut nichts (außer mit `?force=true`). Zusätzlich KV-Key `social:done:{slug}` für die Slug-Uniqueness.
- **State**: Vercel-KV-Integration über die bestehende `redis`-Instance in [lib/redis.ts](../lib/redis.ts) (basiert auf `@upstash/redis`, ENV-Vars `KV_REST_API_URL` + `KV_REST_API_TOKEN`).
  - ⚠️ **KV-Host-Disziplin (zwei aktive DBs, L-W17A.NEU):** Der gelesene/geschriebene Store ist **`rechenfix-stats` (social-loon-99506)**. `erklaerfix` (apt-tahr-124200) ist ein **eigenes, aktives Projekt** — nicht verwaist, nicht löschen. Manuelle KV-Eingriffe AUSSCHLIESSLICH über Vercel → rechenfix → Storage → **rechenfix-stats** → CLI; vorher Host gegenchecken (`new URL(KV_REST_API_URL).host` = social-loon-99506). Bei „DEL/Wert kommt nicht an": zuerst den KV-Host prüfen, nicht den Code. Der IG-Doppelpost vom 06.06.2026 entstand genau so (DEL traf erklaerfix statt rechenfix-stats).
  - ⚠️ **`?force=true` umgeht BEIDE Idempotenz-Checks** (Done-Marke + same-day) und postet bedingungslos auf beiden Plattformen. Nicht für Reposts nutzen, wenn eine Plattform schon erledigt ist → sonst Doppelpost dort. Gezielter Einzel-Plattform-Nachhol: deren Done-Marke offen lassen und OHNE force den regulären Pfad nutzen. Der reguläre Cron (ohne force) ist idempotent.
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
| **`SOCIAL_PIPELINE_ENABLED`** | **`"true"` (String, exakt) → live; alles andere oder unset → pausiert.** Siehe §10. | Production + Preview |
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

## 5. Neue Posts hinzufügen / Pipeline mit Inhalt befüllen

**Seit W17A.1: Datenquelle ist queue.json + captions.json + public/social-posts/<slug>.png** (nicht mehr posts.json). Drei Schritte pro Slug:

### 5a. Queue erweitern (nur bei Slug-Pool-Änderung)

```bash
# Eintrag in lib/social/config.ts → EXCLUDED_SLUGS ggf. ergänzen
# (z. B. weitere manuell schon gepostete Slugs)
npx tsx scripts/build-social-queue.ts
git add lib/social/queue.json && git commit -m "chore(social): queue regen"
```

Bei gleichem `SHUFFLE_SEED = 17` ist die Queue für gleichen EXCLUDED-Stand deterministisch identisch. Done-Marken überleben den Rebuild (sind slug-basiert, nicht index-basiert).

### 5b. Captions + Bild-Texte bauen (W17A.2)

```bash
ANTHROPIC_API_KEY=… npx tsx scripts/social-caption-builder.ts
# oder via Node-20+-ENV-Datei:
node --env-file=.env.local --import tsx/esm scripts/social-caption-builder.ts
```

Pro Slug erzeugt die KI **sechs** Felder in [lib/social/captions.json](../lib/social/captions.json):

| Feld | Zweck | Limit |
|---|---|---|
| `captionIg` | IG-Post-Text mit „Link in Bio" | ≤ 600 Zeichen |
| `captionFb` | FB-Post-Text mit echter URL | ≤ 600 Zeichen |
| `hashtagsIg` | Instagram-Hashtags, thematisch | **5–7 Tags** (Hard 7) |
| `hashtagsFb` | Facebook-Hashtags, die wichtigsten Tags | **2–3 Tags** (Hard 3) |
| `socialHeadline` | Bild-Highlight, eine Zahl/Aussage | Ziel 22, Hard-Limit 40 |
| `socialEyebrow` | Bild-Überzeile, 1–2 thematische Wörter | Hard-Limit 30 |

Das `hashtags`-Feld (alt: 9–15 Tags) bleibt im Schema **deprecated optional** für Backwards-Compat mit Pre-W17A.2.y-Captions. IG/FB-Wrapper fallen auf das alte Feld zurück + trimmen selbst auf 7/3, falls die neuen Felder fehlen.

Das Script ist resumable (bereits gefüllte Slugs werden übersprungen) und schreibt Write-Through nach jedem Slug. Bei Schema-Verletzung (leere Felder, Überlänge, Hashtag-Anzahl > Limit) greift `RETRY_MAX = 1`.

```bash
git add lib/social/captions.json && git commit -m "feat(social): captions <N> slugs"
```

### 5c. Bilder bauen

```bash
# scripts/social-image-builder.py (Python + Pillow)
python scripts/social-image-builder.py
```

Output: `public/social-posts/<slug>.png` pro Eintrag in queue.json. Layout 1080×1080 RGB analog Phase-0-Optik. Image-URL muss public unter `https://www.rechenfix.de/social-posts/<slug>.png` erreichbar sein, sonst Meta-Code „Container creation failed".

```bash
git add public/social-posts/ && git commit -m "feat(social): images <N> slugs"
```

### Verify vor Deploy

```bash
# Lokaler Smoketest der Datenauflösung
npx tsx scripts/smoketest-social-publisher.ts
# Erwartung: Queue 160 / Rechner-Lücken 0 / Caption-Lücken <X> / Bild-Lücken über Cron-Dry-Run prüfen

# Cron-Dry-Run auf Preview
curl -H "Authorization: Bearer $CRON_SECRET" \
     "https://preview-url/api/cron/social-post?test=true&admin=$ADMIN_PASSWORD"
# Erwartung: { slug: "…", imageExists: true, captionExists: true, instagram: {success:true, postId:"dry-ig-…"}, … }
```

### Slug-Queue „neu mischen" (sehr selten)

`SHUFFLE_SEED` in [lib/social/config.ts](../lib/social/config.ts) ändern → `npx tsx scripts/build-social-queue.ts` neu. **Achtung:** verändert die Posting-Reihenfolge für künftige Slugs. Bereits geposteten Slugs (Done-Marke) sind nicht betroffen.

---

## 6. Troubleshooting

| Meta-Code | Bedeutung | Massnahme |
|---|---|---|
| **-10** | Permission Denied | Permissions im Token fehlen — Token via Graph API Explorer neu generieren mit allen 5 Scopes (siehe §2 Schritt 3) |
| **190** | Token expired / invalid | Page Token im Token Debugger prüfen. „Never expires" muss stehen. Falls expired: User Token + Page Token komplett neu generieren |
| **4** | Rate Limit | Wartezeit ~1 h. Bei wiederholtem Auftreten: Posts-Frequenz reduzieren oder API-Quota im Meta-Dashboard prüfen |
| **9007** | „Media ID is not available" (IG) | Timing-Problem: Container noch nicht fertig verarbeitet beim Publish. Seit W17A.2.x über Container-Status-Polling abgefangen — sollte nicht mehr auftreten. Falls doch: POLL_MAX_ATTEMPTS in `lib/social/instagram.ts` erhöhen |
| **POLL_TIMEOUT** | IG-Container nach ~30 s nicht FINISHED | Image-URL nicht erreichbar oder Meta-Backend hängt. Image-URL manuell `curl`en; bei Meta-Hänger einfach neuen Cron-Lauf abwarten |
| **EXPIRED** / **ERROR** | IG-Container Status im Polling | Container kann beim Image-Upload defekt sein (z. B. PNG-Encoding fishy). Image lokal `python scripts/social-image-builder.py --slug X` neu bauen + committen |
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
| `social:done:{slug}:instagram` | string (Berlin-Datum) | `2026-06-05` |
| `social:done:{slug}:facebook`  | string (Berlin-Datum) | `2026-06-05` |
| `social:current-bio-slug` | string (Rechner-Slug) | `autokosten-rechner` |

Done-Marken pro Slug+Plattform (seit W17A.2.x — vorher slug-only). Ein Slug gilt erst als „fully done", wenn BEIDE Plattform-Marken existieren. Damit kann ein Slug, der z. B. nur FB erfolgreich war, im nächsten Cron-Lauf noch einen IG-Retry bekommen — FB wird dabei per Plattform-Done-Marke übersprungen.

Keine TTL — Keys bleiben dauerhaft. Manuelle Bereinigung (z. B. „älter als 90 Tage löschen") wäre eine spätere Wartungs-Maßnahme; aktuell ignoriert, weil das KV-Volume klein bleibt (max. 3 Keys/Tag × 365 = ~1100 Keys/Jahr, plus 2 × 160 langlebige Done-Marken).

**Queue-Reset** (Pool nach 160 Posts neu starten): alle `social:done:*` Keys löschen → Pipeline startet wieder vorn in der Queue-Reihenfolge. KV-CLI:

```
SCAN 0 MATCH social:done:* COUNT 1000
DEL social:done:<slug1>:instagram social:done:<slug1>:facebook …
```

**Migration alter Done-Marken** (Pre-W17A.2.x existieren noch slug-only-Marken in KV). Pro betroffener Marke:

```
GET social:done:<slug>                        → Berlin-Datum, z. B. "2026-06-05"
SET social:done:<slug>:<platform-die-success-hatte> "2026-06-05"
DEL social:done:<slug>
```

Bekannter Fall **autokosten-rechner** (FB success, IG offen):

```
GET social:done:autokosten-rechner            → Datum lesen
SET social:done:autokosten-rechner:facebook   "<gelesenes Datum>"
DEL social:done:autokosten-rechner
```

Danach nächster Cron-Lauf: `pickNextSlug` greift autokosten-rechner wieder auf, FB wird per Plattform-Done-Marke übersprungen, IG bekommt den Retry mit dem Container-Polling-Fix.

---

## 9. Pipeline scharfschalten / pausieren

Der Cron-Endpoint prüft VOR dem ersten API-Call die ENV-Var **`SOCIAL_PIPELINE_ENABLED`**:

| Wert | Verhalten |
|---|---|
| `"true"` (String, exakt) | Live — postet IG + FB nach normalem Ablauf |
| `"false"` / unset / sonst | Pausiert — kein API-Call, kein KV-Write, kein Mail, HTTP 200 mit `paused: true` |

**Fail-Safe-Default:** Bei fehlender ENV gilt **pausiert**. Eine versehentliche Deploy-Aktion (z. B. Vercel-ENV-Migration) kann nie zu ungewollten Posts führen.

### Scharfschalten

1. Vercel-Dashboard → Project → Settings → Environment Variables
2. `SOCIAL_PIPELINE_ENABLED` = `true` (sowohl Production als auch Preview)
3. Redeploy auslösen (kommt automatisch beim nächsten Push, oder manuell „Redeploy" in der Deployments-Liste)
4. Verify: nächster Cron-Lauf oder manueller `?force=true`-Trigger postet wirklich

### Pausieren

1. `SOCIAL_PIPELINE_ENABLED` auf `false` setzen (oder ENV entfernen)
2. Redeploy auslösen
3. Verify: `curl … ?force=true` returnt `{ paused: true, reason: "…", envValue: "false" }`

### Dry-Run umgeht den Schalter

Auch bei pausierter Pipeline läuft `?test=true` durch und liefert die volle Diagnose-Antwort (slug, imageExists, captionExists, dry-ig-X/dry-fb-X). Damit kannst du die Pipeline vor Scharfschaltung end-to-end verifizieren:

```bash
curl -H "Authorization: Bearer $CRON_SECRET" \
     "https://www.rechenfix.de/api/cron/social-post?test=true&admin=$ADMIN_PASSWORD"
```

Erwartung: `{ "slug": "…", "imageExists": true, "captionExists": true, "instagram": { "success": true, "postId": "dry-ig-…" }, "facebook": { "success": true, "postId": "dry-fb-…" } }`.

---

## 10. Bio-Hub-Seite `/social` (W17A.3)

Instagram macht Caption-Links nicht klickbar — nur den EINEN Bio-Link. Die Pipeline-Lösung:

1. **IG-Bio-Link** zeigt permanent auf [`https://www.rechenfix.de/social`](https://www.rechenfix.de/social). Wird **einmal manuell** im IG-Profil gesetzt und nie wieder geändert.
2. **`/social` ist eine Server Component** mit `dynamic = 'force-dynamic'` — KV-Read bei jedem Request.
3. **Publisher schreibt** nach jedem erfolgreichen IG-Post `social:current-bio-slug = <slug>` (nur bei IG, FB braucht den Pointer nicht — dort sind URLs in Captions klickbar).
4. **Seite rendert** oben „Heute auf Instagram" mit dem aktuellen Slug als großem Button (Kategorie-Farbe aus `lib/social/kategorie-farben.json`), darunter die Top-10 (`EXCLUDED_SLUGS` aus `lib/social/config.ts`), Footer-Link zur Startseite.

**SEO:** `noindex/nofollow` via `metadata.robots` (Pattern wie `/ki-rechner`). Reine Funktionsseite, kein Index-Wert, verhindert Thin-Content-Signal.

**Fallback bei leerem KV:** Block „Heute auf Instagram" wird komplett ausgeblendet (kein Crash, kein leerer Default-Block). Top-10 + Footer sind immer da.

**Manuelle Override** (z. B. nach Queue-Reset, wenn der erste neue Post noch nicht gelaufen ist):

```
SET social:current-bio-slug "<slug>"
DEL social:current-bio-slug
```

---

## 11. Out-of-Scope (kommt später)

- **17A.X**: Erweiterung auf 30+ und später 170 Posts (mit Python-Image-Builder)
- **17A.Y**: AI-Caption-Generator über Anthropic-API
- **17A.Z**: Image-Builder-Script für 170 Rechner
- **17B**: TikTok-Pipeline (Remotion-Videos)
- **17C**: Analytics + A/B-Tests

DST-genauer Schedule (immer 19:00 Berlin egal ob Sommer/Winter): kein Showstopper, in einem späteren Sprint mit Berlin-DST-Helper anpassbar.
