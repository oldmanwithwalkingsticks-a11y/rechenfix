# Welle 17A — Social-Media Pipeline (Phase 1 Scoping-Prompt für Claude Code)

> **An Claude Code:** Lies diesen Prompt vollständig. Stelle Rückfragen
> zu Architektur-Entscheidungen BEVOR du anfängst zu coden. Falls eine
> Anforderung mehrdeutig ist, frag nach. Wenn alles klar ist, beginne
> mit Pre-Phase Schritt 1.

---

## Sprint-Ziel

Vollautomatische Pipeline, die täglich um 19:00 Uhr Berlin-Zeit
ein Bild + Caption auf Instagram (@rechenfix) und Facebook
(Rechenfix-Page) postet. Aufbauend auf Phase 0 (10 Tage manuelle
Posts erfolgreich durchgezogen, 04.06.2026 abgeschlossen).

## Architektur-Entscheidungen (fest)

- **Variante B (2 separate API-Calls):** Ein API-Call an Instagram
  Graph API (intern 2 Calls: Container + Publish), ein API-Call
  an Facebook Page API (Photo Post). Grund: IG↔FB-Verknüpfung
  blockiert wegen Werbekonto-Restriction im Business-Portfolio
  (Meta-Support-Ticket vom 03.06.2026 läuft, Lösung nicht
  abgewartet).
- **MVP-Datenbasis:** Posts vorab als JSON + Bilder im Repo
  committed. Initial 30 Posts. Pipeline rotiert ("Tag N mod 30").
  Erweiterung auf 170 in eigenem Sprint (out of scope).
- **Token:** Long-Lived Page Access Token (never expires).
  Generierung via Graph API Explorer + Page-Token-Endpoint.
- **State:** Upstash KV (bereits im Projekt integriert) für
  Idempotenz + Error-Logs. Keine zusätzliche Datenbank.
- **Cron:** Vercel Cron Jobs. Trigger 1× täglich. Skalierung auf
  2/3× über Schedule-Änderung in vercel.json, kein Code-Refactor.
- **Error-Handling:** Bei Fehler Resend-Email an info@rechenfix.de,
  KV-Error-Log, 503-Response. Kein automatischer Retry; manueller
  Re-Trigger möglich über `?force=true`.

## Vorab-Entscheidungen für häufige Rückfragen

- Bildgröße: **1080×1080 PNG, RGB** (wie Phase 0)
- Caption max: **2200 Zeichen** (IG-Limit, FB nutzt gleichen Text)
- Hashtags: **9-15** (wie Phase 0)
- Graph API Version: **v23.0**
- Posts.json Schema: **versioniert** (v1), Erweiterungen
  rückwärtskompatibel
- pnpm build muss vor jedem Commit grün sein

## Pre-Phase (Vorbereitung)

### P1. Meta-Setup verifizieren (Karsten erledigt parallel)

Karsten erledigt:
- Meta Developer Console: App "Rechenfix Social Publisher" auf
  Production-Mode (falls noch Draft)
- Permissions beantragen: `pages_show_list`,
  `pages_read_engagement`, `pages_manage_posts`, `instagram_basic`,
  `instagram_content_publish`
- Long-Lived Page Access Token generieren:
  1. Graph API Explorer: User Token mit obigen Permissions
  2. Exchange zu Long-Lived User Token (60 Tage)
  3. Long-Lived Page Token holen via:
     `GET /v23.0/{page-id}?fields=access_token&access_token={user-token}`
  4. Token Debugger verifizieren → "expires_at: never"
- Instagram Business Account ID abfragen:
  `GET /v23.0/{page-id}?fields=instagram_business_account&access_token={page-token}`
- Vercel Env Vars setzen (Production):
  ```
  META_PAGE_ACCESS_TOKEN=<never-expires page token>
  META_PAGE_ID=1127293363806857
  META_INSTAGRAM_USER_ID=<aus instagram_business_account.id>
  ADMIN_NOTIFICATION_EMAIL=info@rechenfix.de
  ```

**Stop-Trigger:** Wenn Permissions in Meta Console nicht freigegeben
werden oder Tokens nicht generiert werden können → STOP, gemeinsam
debuggen, NICHT raten.

### P2. Verzeichnis-Struktur anlegen

```
lib/social/
  ├─ schema.ts         # TypeScript Types
  ├─ posts.json        # 30 Posts (initial 10 Phase-0)
  ├─ config.ts         # POSTS_PER_DAY, START_DATE
  ├─ instagram.ts      # IG Graph API Wrapper
  ├─ facebook.ts       # FB Page API Wrapper
  ├─ publisher.ts      # Orchestration
  ├─ state.ts          # KV-Wrapper (Idempotenz + Logs)
  └─ utils.ts          # Date-Helpers, Berlin-Time

public/social-posts/
  └─ 001.png ... 030.png   # 1080×1080 PNG

app/api/cron/social-post/
  └─ route.ts          # Cron-Endpoint

scripts/
  └─ social-image-builder.py   # Bild-Generator (basiert auf Phase-0-Script)

vercel.json            # Cron-Schedule erweitern

docs/
  └─ social-pipeline.md # Komplette Doku
```

### P3. Phase-0-Daten importieren

Posts 1-10:
- Bilder aus `/mnt/user-data/outputs/phase0/` (existieren bereits)
  als `001.png`-`010.png` ins Repo kopieren
- Captions aus `phase0-komplett-anleitung.md` extrahieren (sind
  bereits formuliert und live getestet)
- captionIg = mit "Link in Bio"
- captionFb = mit echtem URL (siehe Anleitung)

Posts 11-30:
- 20 neue Rechner-Posts. **Karsten priorisiert die Rechner-Liste
  parallel** (kurze Liste mit slug + emoji + Beispielzahl).
- Wenn Karstens Liste noch nicht da ist: Code-Phase trotzdem
  starten, posts.json kann später ergänzt werden, Pipeline
  funktioniert mit 10 Posts (rotiert dann durch Phase-0-Set
  alle 10 Tage).

## Code-Phase (Atomic Commits)

**Vor jedem Commit:** `pnpm build` grün, kein Type-Error.

### Commit 1: Schema + Config + Phase-0-Daten

`lib/social/schema.ts`:
```typescript
export interface SocialPost {
  index: number;
  slug: string;
  category: string;
  url: string;
  image: string;        // 001.png
  captionIg: string;
  captionFb: string;
  hashtags: string;
}

export interface PostsFile {
  version: 1;
  startDate: string;    // YYYY-MM-DD
  posts: SocialPost[];
}
```

`lib/social/config.ts`:
```typescript
export const SOCIAL_CONFIG = {
  POSTS_PER_DAY: 1,
  START_DATE: '2026-06-05',
  POSTING_HOUR_BERLIN: 19,
  GRAPH_API_VERSION: 'v23.0',
} as const;
```

`lib/social/posts.json`: 10 Phase-0-Posts portiert.

`public/social-posts/001.png` bis `010.png`: kopiert.

### Commit 2: IG + FB API-Wrapper

`lib/social/instagram.ts`:
```typescript
// 1) Container erstellen: POST /{ig-user-id}/media
//    Body: image_url, caption, access_token
// 2) Container publishen: POST /{ig-user-id}/media_publish
//    Body: creation_id (aus Step 1), access_token
// Returns: mediaId
publishToInstagram(post: SocialPost, dryRun: boolean): Promise<string>
```

`lib/social/facebook.ts`:
```typescript
// POST /{page-id}/photos
// Body: url (image URL), message (caption + URL), access_token
// Returns: postId
publishToFacebook(post: SocialPost, dryRun: boolean): Promise<string>
```

Beide:
- `fetch` (kein SDK)
- Retries: keine (Pipeline läuft idempotent jeden Tag)
- Timeout: 30 Sek
- Errors als Exception werfen mit Meta-Error-Code in `.code` property

### Commit 3: State + Publisher

`lib/social/state.ts`:
```typescript
// KV-Keys:
//   social:posted:{YYYY-MM-DD}:instagram → postId
//   social:posted:{YYYY-MM-DD}:facebook → postId
//   social:errors:{YYYY-MM-DD}:{platform} → { error, timestamp }

wasPostedToday(platform): Promise<boolean>
markPosted(platform, postId): Promise<void>
logError(platform, error): Promise<void>
```

`lib/social/publisher.ts`:
```typescript
getPostForToday(): SocialPost {
  // (today - START_DATE) in days, mod posts.length
}

publishToBothPlatforms(force = false, dryRun = false): {
  instagram: { success, postId?, error? },
  facebook: { success, postId?, error? }
} {
  // Idempotenz: wasPostedToday() prüfen, skip falls true (außer force)
  // IG zuerst, dann FB (unabhängig — falls IG fehlschlägt, FB trotzdem versuchen)
  // markPosted bei Erfolg, logError bei Fehler
}
```

### Commit 4: Cron-Endpoint

`app/api/cron/social-post/route.ts`:
```typescript
// GET handler
// Auth: Authorization: Bearer ${CRON_SECRET} (Vercel automatisch)
// Query-Parameter:
//   ?force=true   : Ignoriert Idempotenz-Check
//   ?test=true    : dryRun=true (nur loggen, nicht posten)
//                   Nur in development oder mit ADMIN_PASSWORD-Auth
//
// Response:
//   200: { instagram: {...}, facebook: {...} }
//   503: { error, instagram?, facebook? }
//
// Bei Fehler: Resend-Email senden (subject: "Rechenfix Social Pipeline Error")
```

`vercel.json` (existierende crons erhalten, ergänzen um):
```json
{ "path": "/api/cron/social-post", "schedule": "0 17 * * *" }
```

Hinweis: `17 UTC = 19 Berlin Sommerzeit`. Im Winter 1h früher
(18 Berlin) — bewusst akzeptiert, kein Showstopper. Falls
exakt 19 Berlin gewünscht, in einem späteren Sprint mit
Berlin-DST-Helper anpassen.

### Commit 5: Doku

`docs/social-pipeline.md`:
1. Architektur-Überblick (Variante B, KV-State, Cron-Schedule)
2. Token-Generation Step-by-Step (mit konkreten URLs/Endpoints)
3. ENV-Vars Liste mit Beschreibung
4. Skalierungspfad:
   - 1 → 2/Tag (Tag 30+): zusätzlicher Cron-Eintrag, POSTS_PER_DAY=2
   - 2 → 3/Tag (Tag 60+): dritter Cron-Eintrag, POSTS_PER_DAY=3
5. Wie neue Posts hinzufügen (Bild generieren, JSON erweitern,
   Commit)
6. Troubleshooting:
   - Code -10: Permissions
   - Code 190: Token expired
   - Code 4: Rate Limit
   - "Container creation failed": Image URL nicht erreichbar
7. Token-Rotation alle 50 Tage (Backup-Strategie auch wenn
   never-expires)
8. KV-Log-Schema, wie KV-Inhalte inspizieren (via Upstash Console)

`CLAUDE.md` ergänzen:
- L-W17A.1: IG↔FB-Verknüpfung blockiert wegen Werbekonto-Restriction
- L-W17A.2: Variante B (2 API-Calls) robuster als Crosspost
- L-W17A.3: MVP-Datenbasis mit 10 Initial-Posts ausreichend für Pipeline-Live, Erweiterung iterativ

`docs/audit-arbeitspapiere/welle-status-historie.md`:
- Welle 17A eintragen, Status "in Progress" → bei erfolgreichem
  ersten Cron-Lauf "abgeschlossen"

## Test-Phase

### Lokale Tests (vor Deploy)
- Unit-Test `getPostForToday()` mit gemocktem Datum
- Unit-Test `wasPostedToday()` mit gemocktem KV
- Build-Test: `pnpm build` grün

### Preview-Deploy
- Vercel Preview Deployment ziehen lassen
- Manueller Test via Browser:
  `https://{preview-url}/api/cron/social-post?test=true`
- Erwartung: JSON-Response mit dryRun-Ergebnis, KEIN tatsächlicher
  Post auf IG/FB

### Live-Test (Production)
- Production Deploy
- Erster Live-Test **mit Karsten dabei**, manuell ausgelöst:
  `https://www.rechenfix.de/api/cron/social-post?force=true`
  (Auth via CRON_SECRET im Authorization Header — Test mit curl
  oder Insomnia)
- Bei Erfolg: IG-Post + FB-Post verifizieren (visuell auf den
  Plattformen)
- Bei Erfolg: Cron aktiviert lassen, läuft am nächsten Tag um
  17 UTC = 19 Berlin automatisch

## Stop-Trigger

STOPP und Karsten fragen, falls:
- Meta-Permissions nicht freigegeben
- Token-Generation fehlschlägt
- IG/FB Test-Post failed mit unbekanntem Error-Code
- ENV-Vars in Vercel nicht durchkommen
- pnpm build failed nach einem Commit (rollback + analysieren)
- Karsten hat keine Rechner-Liste für Posts 11-30 fertig — dann
  Pipeline mit 10 Posts launchen, Erweiterung später

## Out-of-Scope (andere Wellen)

- Welle 17A.X: Erweiterung auf 30+ Posts, später 170
- Welle 17A.Y: AI-Caption-Generator (Anthropic API automatisiert)
- Welle 17A.Z: Bild-Generator-Script für 170 Rechner (Erweiterung
  Phase-0-Script)
- Welle 17B: TikTok-Pipeline (Remotion-Videos)
- Welle 17C: Analytics + A/B-Tests
- Story-Reposts: bleibt manuell oder eigene Welle

## Aufwand-Schätzung

- Pre-Phase (P1-P3): 1-2h
- Code-Phase (Commits 1-5): 3-4h
- Test+Deploy: 1-2h
- Doku: bereits in Commit 5 enthalten
- **Gesamt: 5-8 Stunden**

---

**Vorgehen für Claude Code:**

1. Lies diesen Prompt ganz durch
2. Frage zurück bei Architektur-Punkten, die unklar oder
   anders bekannt sind (Projekt-Konventionen, Build-Config etc.)
3. Wenn Karsten "alles klar" sagt: Pre-Phase Schritt P2 starten
   (Verzeichnis-Struktur), parallel Karsten P1 (Meta-Setup) und
   P3 (Daten)
4. Atomic Commits mit Build-grün-Garantie
5. Bei Stop-Triggers: anhalten, fragen, nicht raten

Bei Zweifeln gilt: **lieber einmal nachfragen als später debuggen.**
