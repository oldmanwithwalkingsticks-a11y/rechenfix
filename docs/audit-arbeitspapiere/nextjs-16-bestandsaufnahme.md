# Bestandsaufnahme Next.js 14.2.35 → 16

**Stand:** 28.09.2026. **Art:** Erhebung ohne Codeänderung. Die Migration selbst ist eine eigene Welle
auf Grundlage dieses Papiers.
**Termin:** `nextjs-sicherheitsrelease-2026-09` in `lib/termine.ts` (Commit `f61950d`), fällig am
01.10.2026. Er füllt Abschnitt 6. **Erledigt am 01.10.2026:** Abschnitt 6 ist ausgefüllt, die Migration
auf 16 wird vorgezogen (6.5).

## Quellen

Alle Quellen wurden am **28.09.2026** in dieser Sitzung abgerufen. Die Leitfäden kamen als Markdown
über die `.md`-Endung der Doku-URL.

| Kürzel | Quelle | Seitenstand laut Kopf |
|---|---|---|
| **L15** | nextjs.org/docs/app/guides/upgrading/version-15 — „How to upgrade to version 15“ (14 → 15) | lastUpdated 2026-08-25, Doku-Version 16.3.6 |
| **L16** | nextjs.org/docs/app/guides/upgrading/version-16 — „How to upgrade to version 16“ (15 → 16) | lastUpdated 2026-08-25, Doku-Version 16.3.6 |
| **SP** | nextjs.org/support-policy | — |
| **BL** | nextjs.org/blog/upcoming-nextjs-security-release-september-2026 | publishedAt 23.09.2026 |
| REF-output | nextjs.org/docs/app/api-reference/config/next-config-js/output — nur für Abschnitt 2.3, **kein Leitfaden** | lastUpdated 2025-10-08, Doku-Version 16.3.6 |

Die Fundstelle in den Tabellen nennt den Abschnittstitel des Leitfadens wörtlich.

---

## 1. Ausgangslage

### 1.1 Installierte Fassungen (Phase 0)

Gelesen aus `package.json`, `package-lock.json` (`packages["node_modules/<name>"].version`) und
gegengeprüft in `node_modules/<name>/package.json`. Beide Quellen stimmen überein.

| Paket | `package.json` | installiert | Art |
|---|---|---|---|
| `next` | `14.2.35` (fest) | 14.2.35 | dependency |
| `react` | `^18` | 18.3.1 | dependency |
| `react-dom` | `^18` | 18.3.1 | dependency |
| `eslint-config-next` | `14.2.35` (fest) | 14.2.35 | devDependency |
| `@types/react` | `^18` | 18.3.28 | devDependency |
| `@types/react-dom` | `^18` | 18.3.7 | devDependency |
| `typescript` | `^5` | 5.9.3 | devDependency |

**Node.js:** Im Repository ist keine Fassung festgelegt: kein `engines` in `package.json` und keins
im Wurzeleintrag des Lockfiles, keine `.nvmrc`, keine `.node-version`. Lokal läuft Node v24.14.1;
das sagt nichts über Vercel aus. **Die Node.js-Fassung in den Vercel-Projekteinstellungen ist aus
dem Repository nicht sichtbar.** Sie wird hier weder angenommen noch abgeleitet.

Weitere Randdaten für die Migration: `@types/node` `^20`, `eslint` `^8`, ESLint-Konfiguration
`.eslintrc.json` (Legacy-Format), `browserslist` (production) `chrome >= 87`, `firefox >= 78`,
`safari >= 14`, `edge >= 88`.

### 1.2 Support-Lage nach SP (abgerufen 28.09.2026)

| Hauptversion | Status laut SP | Erscheinungsdatum laut SP |
|---|---|---|
| 16.x | **Active LTS** | 21.10.2025 |
| 15.x | **Maintenance LTS** | 21.10.2024 |
| 14.x | **Unsupported** | 26.10.2023 |

SP: „Each major version will remain in Maintenance LTS for two years following the initial
release.“ Für 15.x ergibt das den 21.10.2026 als Ende. In der Maintenance-LTS-Phase liefert
Next.js nur kritische Fehlerkorrekturen und wesentliche Sicherheitsupdates. Für Fassungen außerhalb
der LTS-Regel stellt SP Patches nur „in rare circumstances“ in Aussicht.

### 1.3 Anlass nach BL (abgerufen 28.09.2026)

Sicherheitsrelease am **30.09.2026** mit neun Lücken: eine kritisch, zwei hoch, fünf mittel, eine
niedrig. Angekündigt sind die Fassungen **16.3.7** und **15.5.27**, veröffentlicht „alongside the
full advisories, including impact, affected versions, and upgrade instructions“. Welche Fassungen
betroffen sind, steht erst in den Advisories. Die Einordnung für 14.2.35 folgt in Abschnitt 6.
**Berichtigt am 01.10.2026 (6.2):** Erschienen sind sieben Lücken, korrigiert in 16.3.8 und 15.5.27.
Zwei weitere (1 kritisch, 1 hoch) sind zurückgestellt, und 16.3.7 enthält keine Sicherheitskorrektur.

### 1.4 Ziel

**Next.js 16.** Ein Zwischenschritt auf 15 entfällt, weil 15.x am 21.10.2026 aus der Unterstützung
fällt. Dieses Papier erhebt deshalb die Änderungen **beider** Leitfäden: L15 für 14 → 15, L16 für
15 → 16.

---

## 2. Änderungen nach Leitfaden

**Suchbereich:** `app/`, `components/`, `lib/` und — wo angegeben — `scripts/`, `next.config.mjs`,
`package.json`. Ausgeschlossen sind `node_modules/`, `.next/`, `docs/` und `public/`. Die Muster sind
erweiterte reguläre Ausdrücke (`grep -E`). Einschätzungen: **betrifft** / **betrifft nicht** /
**nicht feststellbar**.

Messgrundlage für Routen: Die Build-Ausgabe von `npm run build` am 28.09.2026 (Teil 1) weist
`/[kategorie]` und `/[kategorie]/[rechner]` als SSG (●) aus. `/opengraph-image`, `/social` und alle
15 Route-Handler unter `app/api/` sind dynamisch (ƒ). Middleware gibt es nicht, weder
`middleware.*` noch `proxy.*`. Es gibt auch kein `pages/`-Verzeichnis und keine
Parallel-/Intercept-Ordner (`@*`, `(.)*`).

### 2.1 Aus L15 (14 → 15)

| # | Änderung — Fundstelle | Suchmuster | Treffer in rechenfix | Codemod laut Leitfaden | Einschätzung |
|---|---|---|---|---|---|
| 15-1 | **React 19 als Mindestversion** für `react`/`react-dom`. `useFormState` → `useActionState`, `useFormStatus` mit neuen Schlüsseln. `@types/react`/`@types/react-dom` mit anheben. — L15 „React 19“ (samt „Good to know“). Dazu L16 „React 19.2“: Der App Router nutzt den React-Canary mit den 19.2-Funktionen. | `useFormState\|useFormStatus` | Paketstände: 2 Dateien (`package.json`, `package-lock.json`). Hooks: **0 Dateien**. | Ja: der `upgrade`-Codemod (L15 „Upgrading from 14 to 15“, L16 „Using the codemod“) hebt die Pakete an. | **betrifft** — react/react-dom 18.3.1 und @types 18 müssen auf 19. Die beiden genannten Hooks kommen nicht vor. L15 verweist für weitere Änderungen auf den React-19-Upgrade-Leitfaden (react.dev). Der ist **nicht Gegenstand dieser Erhebung** und gehört in Teilschritt 2 der Migrationswelle. |
| 15-2 | **Async Request APIs**: `cookies`, `headers`, `draftMode`, `params` (layout/page/route/default/opengraph-image/twitter-image/icon/apple-icon) und `searchParams` (page) werden asynchron. — L15 „Async Request APIs (Breaking change)“. In 16 ist der synchrone Zugriff **ganz entfernt**: L16 „Async Request APIs (Breaking change)“. | siehe Unterzeilen 15-2a bis 15-2d | 4 Dateien, Einzelheiten unten | Ja. L15 verweist auf den Codemod (codemods#150). L16: `npx @next/codemod@canary next-async-request-api .` — **nicht** Teil des `upgrade`-Codemods (L16 „Using the codemod“). Typhilfe `npx next typegen` (ab 15.5) für `PageProps`/`LayoutProps`/`RouteContext`. | **betrifft** |
| 15-2a | … `params` in `page`/`layout` und `generateMetadata` | `\bparams\b` in `app/` | **2 Dateien:** `app/[kategorie]/[rechner]/page.tsx` — Typ Z. 20, `generateMetadata` Z. 46–47, Seite Z. 52–53; `app/[kategorie]/page.tsx` — Typ Z. 11, `generateMetadata` Z. 40–41, Seite Z. 46–47, 50, 104. Dritter Treffer `app/api/tiktok/callback/route.ts` Z. 29 ist eine lokale Variable (`URLSearchParams`), **kein** Next-`params`. Die 3 Layouts (`app/layout.tsx`, `app/blog/layout.tsx`, `app/admin/affiliate-stats/layout.tsx`) nehmen nur `children`. | s. 15-2 | **betrifft.** Beide `generateMetadata` sind synchron und liefern `Metadata` direkt; sie müssen `async` werden. `KategorieSeite` ist keine `async`-Funktion (Z. 46). `generateStaticParams` (beide Dateien, Z. 36/37) **empfängt** keine `params` und ist von dieser Änderung nicht berührt. Über diese beiden Routen laufen alle Rechner- und Kategorieseiten (einzige Ausnahme ist `wohngeld-rechner`, `STATISCHE_OVERRIDES`): Ein Fehler hier trifft die ganze Seite. Der Build rendert beide Routen vollständig vor (SSG) und würde einen Laufzeitfehler dabei zeigen. |
| 15-2b | … `params` als zweites Argument von Route-Handlern | Signaturzeile `export (async )?function (GET\|POST\|PUT\|PATCH\|DELETE\|HEAD\|OPTIONS)\(` in `app/api/**/route.ts` | 15 Route-Handler, **0** mit zweitem Argument. Die Signaturen lauten `GET()`, `POST()`, `POST(request)`, `GET(request)` usw. | s. 15-2 | **betrifft nicht** — kein Handler liest Segment-`params`; es gibt unter `app/api/` auch keine dynamischen Segmente. |
| 15-2c | … `searchParams` als Seiten-Prop | `\bsearchParams\b` in `app/`, `components/`, `lib/` | **1 Datei:** `app/social/page.tsx` Z. 103–109 (`searchParams: { ref?: string }`, `searchParams?.ref === 'tt'`). Die übrigen Treffer sind `URL.searchParams`-Aufrufe auf `new URL(request.url)` und **keine** Next-Props: `app/api/cron/social-post/route.ts` Z. 118–123, `app/api/cron/social-post-tiktok/route.ts` Z. 102–103, `app/api/stats/route.ts` Z. 96–97, `app/api/tiktok/auth/route.ts` Z. 43, `app/api/tiktok/callback/route.ts` Z. 29. | s. 15-2 | **betrifft** — 1 Seite. `/social` ist `force-dynamic` (ƒ), der Build rendert sie **nicht** vor. Ein Fehler zeigt sich erst beim Aufruf, etwa über `/tt` → `/social?ref=tt`. |
| 15-2d | … `cookies()`, `headers()`, `draftMode()` | `from ['"]next/headers['"]` und `\b(cookies\|headers\|draftMode)\(\)` | **1 Datei:** `lib/admin-session.ts` — Import Z. 1, Aufruf Z. 217 `cookies().get(ADMIN_COOKIE_NAME)?.value` in `istAdminAngemeldet()`. Aufrufer: `app/api/monthly-report/route.ts`, `app/api/social-status/route.ts`, `app/api/stats/route.ts`, `app/api/tiktok/auth/route.ts`. `headers()`/`draftMode()`: 0. | s. 15-2 | **betrifft.** Heikel: Der Aufruf steht in `try { … } catch { return false; }`. Scheitert der synchrone Zugriff unter 16 zur Laufzeit, meldet die Funktion „nicht angemeldet“, statt einen Fehler zu werfen. Der Admin-Zugang fiele dann **still** aus. Ob die Typprüfung von 16 den Fall vorher meldet, ist ohne installiertes Next 16 in dieser Sitzung **nicht nachprüfbar**. Beim Umbau diese Stelle einzeln prüfen, nicht nur dem Codemod überlassen. |
| 15-3 | **`runtime: 'experimental-edge'`** führt zum Fehler; stattdessen `edge`. — L15 „`runtime` configuration (Breaking change)“ | `experimental-edge` | **0 Dateien.** `runtime = 'edge'` in 5 Dateien: `app/api/counter/route.ts`, `app/api/social-status/route.ts`, `app/api/stats/route.ts`, `app/api/track/route.ts`, `app/opengraph-image.tsx` | Ja (codemods#app-dir-runtime-config-experimental-edge) | **betrifft nicht** — `edge` ist die gültige Schreibweise. |
| 15-4 | **`fetch` wird standardmäßig nicht mehr gecacht.** — L15 „`fetch` requests“ | `\bfetch\(` | 21 Dateien. **12** davon sind `'use client'` (Browser-`fetch`, nicht betroffen): `app/admin/affiliate-stats/page.tsx`, `app/feedback/FeedbackClient.tsx`, `app/ki-rechner/KiRechnerClient.tsx`, `components/AffiliateBox.tsx`, `components/rechner/AiExplain.tsx`, `components/rechner/BruttoNettoRechner.tsx`, `components/rechner/MwStRechner.tsx`, `components/rechner/SchlafTipp.tsx`, `components/rechner/StromSpartipp.tsx`, `components/rechner/WasWaereWenn.tsx`, `components/ui/ErgebnisAktionen.tsx`, `components/ui/FeedbackButtons.tsx`. **9** ohne Direktive: `app/api/cron/health-check/route.ts` (`cache: 'no-store'`), `app/api/explain/route.ts` (nur POST), `app/api/ki-rechner/route.ts` (POST, `force-dynamic`), `lib/berechnungs-zaehler.ts` (`no-store`; nur von Client-Komponenten importiert, relative URL), `lib/social/state.ts` (`no-store`), `lib/social/facebook.ts`, `lib/social/instagram.ts`, `lib/social/tiktok.ts`, `lib/social/tiktok-auth.ts` (nur aus `force-dynamic`-Handlern erreichbar). | Nein | **betrifft nicht** — Die Änderung nimmt nur Caching weg. Kein serverseitiger `fetch` in rechenfix verlässt sich darauf: Jeder setzt `no-store` oder läuft in einem `force-dynamic`- bzw. POST-Handler. `/social` setzt zusätzlich `fetchCache = 'force-no-store'`. |
| 15-5 | **`GET`-Route-Handler** werden standardmäßig nicht mehr gecacht. — L15 „Route Handlers“ | Exporte `GET` in `app/api/**/route.ts`; `export const dynamic` | 8 Dateien mit `GET`: `api/counter`, `api/social-status`, `api/stats`, `api/cron/health-check`, `api/cron/social-post`, `api/cron/social-post-tiktok`, `api/tiktok/auth`, `api/tiktok/callback` | Nein | **betrifft nicht** — alle 8 setzen `dynamic = 'force-dynamic'`, und der Build weist alle 15 Handler als ƒ aus. Heute ist also keiner gecacht. |
| 15-6 | **Client Cache**: Seitensegmente werden bei Navigation per `<Link>`/`useRouter` nicht mehr aus dem Client-Cache wiederverwendet (Zurück/Vor und Layouts schon). Opt-in über `experimental.staleTimes`. — L15 „Client Cache“ | `from ['"]next/link['"]`, `from ['"]next/navigation['"]`, `staleTimes` | `next/link`: **36 Dateien** (Liste in Anhang A). `next/navigation`: **5 Dateien** (`app/[kategorie]/[rechner]/page.tsx`, `app/[kategorie]/page.tsx`, `components/AffiliateBox.tsx`, `components/layout/SearchBar.tsx`, `components/layout/ZurueckButton.tsx`). `staleTimes`: 0 | Nein | **betrifft (Verhalten), keine Codeänderung nötig.** Navigation zwischen Seiten lädt die Seitennutzlast erneut; Zurück/Vor bleibt gecacht. Ob `staleTimes` gesetzt wird, ist eine optionale Entscheidung, keine Pflicht. |
| 15-7 | **`@next/font` entfernt**, nur noch eingebautes `next/font`. — L15 „`next/font`“ | `@next/font\|next/font` | 1 Datei: `app/layout.tsx` Z. 2 `import { Inter } from 'next/font/google'`; Kommentar in `scripts/verify-critical-css.mjs` Z. 6 | Ja (codemods#built-in-next-font) | **betrifft nicht** — rechenfix nutzt schon `next/font`. |
| 15-8 | `experimental.bundlePagesExternals` → `bundlePagesRouterDependencies`. — L15 „bundlePagesRouterDependencies“ | `bundlePagesExternals\|bundlePagesRouterDependencies` in `next.config.mjs` | 0 | Nein | **betrifft nicht** — Schlüssel nicht gesetzt, kein Pages Router. |
| 15-9 | `experimental.serverComponentsExternalPackages` → `serverExternalPackages`. — L15 „serverExternalPackages“ | `serverComponentsExternalPackages\|serverExternalPackages` | 0 | Nein | **betrifft nicht.** |
| 15-10 | **Automatische Speed-Insights-Instrumentierung entfernt.** — L15 „Speed Insights“ | `speed-insights\|SpeedInsights` | 0 Dateien. Kein Paket `@vercel/speed-insights` in `package.json`; installiert ist `@vercel/analytics`, das ist ein anderes Produkt. | Nein | **nicht feststellbar** — ob Speed Insights im Vercel-Projekt eingeschaltet ist und sich auf die automatische Instrumentierung stützt, steht nicht im Repository. |
| 15-11 | **`geo` und `ip` auf `NextRequest` entfernt.** — L15 „`NextRequest` Geolocation“ | `\.(geo\|ip)\b[^a-zA-Z(]\|request\.ip\|req\.ip\|\.geo\.` | 0 | Ja (codemods#150) | **betrifft nicht** — kein Zugriff, keine Middleware. |

### 2.2 Aus L16 (15 → 16)

| # | Änderung — Fundstelle | Suchmuster | Treffer in rechenfix | Codemod laut Leitfaden | Einschätzung |
|---|---|---|---|---|---|
| 16-1 | **Node.js 20.9+** (Node 18 nicht mehr unterstützt). — L16 „Node.js runtime and browser support“ | `engines` in `package.json`; `.nvmrc`, `.node-version` | 0 Festlegungen im Repository | Nein | **nicht feststellbar** — maßgeblich ist die Einstellung im Vercel-Projekt, und die ist aus dem Repository nicht sichtbar (Abschnitt 1.1). |
| 16-2 | **TypeScript 5.1+**. — ebenda | installierte Fassung | `typescript` 5.9.3 | Nein | **betrifft nicht** — erfüllt. |
| 16-3 | **Browser-Mindeststand** Chrome 111+, Edge 111+, Firefox 111+, Safari 16.4+. — ebenda | `browserslist` in `package.json` | 1 Datei: `package.json`, `browserslist.production` = `chrome >= 87`, `firefox >= 78`, `safari >= 14`, `edge >= 88` | Nein | **betrifft** — die erklärten Ziele liegen unter dem Mindeststand von 16. Was 16 mit niedrigeren Zielen tut, sagt L16 nicht. Zu entscheiden ist, ob `browserslist` auf den neuen Stand gehoben wird. |
| 16-4 | **Turbopack ist Standard** für `next dev` und `next build`. Findet `next build` eine **`webpack`-Konfiguration**, bricht der Build ab. Auswege: `--turbopack` (Webpack-Konfiguration ignorieren), auf Turbopack umstellen oder `--webpack`. L16 warnt ausdrücklich: Die `webpack`-Option kann auch von einem **Plugin** stammen. — L16 „Turbopack by default“, „Opting out of Turbopack“ | Auswertung der fertigen Config (read-only: `import('./next.config.mjs')`, Phase `phase-production-build`). Dazu `webpack\(config` in den installierten Plugins. | `next.config.mjs` setzt selbst **keinen** `webpack`-Schlüssel. Die fertige Config enthält trotzdem **`webpack: function`**, eingetragen von **`@next/mdx` 14.2.35** (`node_modules/@next/mdx/index.js` Z. 23) und **`@serwist/next` 9.5.12** (`node_modules/@serwist/next/dist/index.mjs` Z. 121). `@serwist/next` warnt in Z. 105–117 selbst, dass es Turbopack nicht unterstützt, und nennt als Alternativen `--webpack`, `@serwist/turbopack` oder den „configurator mode“. `package.json`-Skripte haben keine `--turbopack`-Flags. | Nur für die Verlagerung einer `turbopack`-Konfiguration (16-5), **nicht** für Webpack-Plugins | **betrifft — größter Einzelpunkt.** Unter 16 bricht `npm run build` in der jetzigen Form ab. Zu entscheiden ist Weg A, `next build --webpack` (kleinster Eingriff, Serwist und MDX bleiben), oder Weg B, Umstellung von Serwist und MDX auf Turbopack-fähige Varianten. Serwist erzeugt `public/sw.js` (W69, gitignored). Bei Weg B muss der Service Worker nachweislich weiter entstehen. |
| 16-5 | `experimental.turbopack` → oberste Ebene `turbopack`. — L16 „Turbopack configuration location“ | `turbopack` in `next.config.mjs` | 0 | Ja (`upgrade`-Codemod) | **betrifft nicht.** |
| 16-6 | **Node-Module im Client-Code** (`Can't resolve 'fs'`): unter Webpack oft per `resolve.fallback` verdeckt, unter Turbopack umbauen oder `turbopack.resolveAlias`. — L16 „Resolve alias fallback“ | Importe `from ['"](node:)?(fs\|fs/promises\|path\|crypto\|child_process\|os\|stream)['"]` in `app/`, `components/`, `lib/`; danach die Importeure über zwei Ebenen auf `'use client'` geprüft | 8 Dateien mit Node-Builtins: `app/api/explain/route.ts`, `app/api/ki-rechner/route.ts`, `app/sitemap.ts`, `app/ueber-uns/page.tsx`, `components/AuthorBio.tsx`, `lib/blog.ts`, `lib/social/publisher.ts`, `lib/social/tiktok-auth.ts`. **Keine** davon ist `'use client'`. Ihre Importeure und deren Importeure sind ebenfalls nicht `'use client'`. | Nein | **betrifft nicht** — kein Pfad von Client-Code zu `fs` & Co. gefunden. Die Methode prüft Importe über zwei Ebenen. Für Weg B aus 16-4 zeigt der Turbopack-Build das abschließend. |
| 16-7 | Sass-Importe mit `~` aus `node_modules`. — L16 „Sass node\_modules imports“ | `*.scss`/`*.sass`; Paket `sass` | 0 | Nein | **betrifft nicht** — kein Sass. |
| 16-8 | Turbopack-Dateisystem-Cache standardmäßig an. — L16 „Turbopack File System Caching“ | — | — | Nein | **betrifft nicht** — kein Handlungsbedarf. |
| 16-9 | Bildfunktionen in `opengraph-image`/`twitter-image`/`icon`/`apple-icon` erhalten `params` und `id` als Promise. — L16 „Async parameters for icon, and open-graph Image (Breaking change)“ | Dateikonventionen unter `app/`; `generateImageMetadata` | 1 Datei: `app/opengraph-image.tsx` (Edge, `export default function OGImage()` **ohne** Argumente). `twitter-image`, `icon`, `apple-icon`: 0. `app/favicon.ico` ist statisch. `generateImageMetadata`: 0 | Nein | **betrifft nicht** — die Funktion liest weder `params` noch `id`. |
| 16-10 | `sitemap` erhält `id` aus `generateSitemaps` als Promise. — L16 „Async `id` parameter for `sitemap` (Breaking change)“ | `generateSitemaps` | 0; `app/sitemap.ts` Z. 44 `sitemap()` ohne Argumente | Nein | **betrifft nicht.** |
| 16-11 | **React Compiler** stabil, aber nicht standardmäßig an. — L16 „React Compiler Support“ | `reactCompiler` | 0 | Nein | **betrifft nicht** — Opt-in. |
| 16-12 | **Caching-APIs**: `revalidateTag` braucht ein zweites Argument; neu `updateTag` und `refresh`; `cacheLife`/`cacheTag` ohne `unstable_`. — L16 „Caching APIs“ | `revalidateTag\|revalidatePath\|unstable_[a-zA-Z]+\|updateTag\|cacheLife\|cacheTag` | 2 Dateien, **beide Fehltreffer**: `components/rechner/ArbeitszeitRechner.tsx` Z. 108 und `components/rechner/UeberstundenRechner.tsx` Z. 85 definieren eine lokale Funktion `updateTag` (Wochentag), **nicht** aus `next/cache` | Ja: der `upgrade`-Codemod entfernt `unstable_`-Präfixe | **betrifft nicht.** |
| 16-13 | **Überarbeitetes Routing/Prefetching** (Layout-Deduplizierung, inkrementelles Prefetching). Mehr, aber kleinere Prefetch-Anfragen; laut L16 ohne Codeänderung. — L16 „Enhanced Routing and Navigation“ | wie 15-6 | 36 Dateien mit `next/link` (Anhang A) | Nein | **betrifft (Verhalten), keine Codeänderung.** |
| 16-14 | **PPR-Flag** und `experimental_ppr` entfernt; Nachfolger `cacheComponents`. — L16 „Partial Prerendering (PPR)“ | `experimental_ppr\|\bppr\b\|cacheComponents` | 0 | Ja (`upgrade`-Codemod entfernt `experimental_ppr`) | **betrifft nicht.** |
| 16-15 | **`middleware` → `proxy`**; `proxy` läuft nur mit Node.js. Config-Schlüssel mit „middleware“ umbenannt, z. B. `skipMiddlewareUrlNormalize`. — L16 „`middleware` to `proxy`“ | Dateien `middleware.*`/`proxy.*`; `skipMiddleware` | 0 | Ja (`upgrade`-Codemod) | **betrifft nicht** — keine Middleware. |
| 16-16 | **`next/image`**, sieben Teiländerungen. — L16 „`next/image` changes“. (a) lokale Bilder mit Query-String brauchen `images.localPatterns.search`; (b) `minimumCacheTTL`-Standard 60 s → 4 h; (c) `imageSizes`-Standard ohne `16`; (d) `qualities`-Standard nur `[75]`; (e) lokale IPs gesperrt (`dangerouslyAllowLocalIP`); (f) `maximumRedirects`-Standard 3; (g) `next/legacy/image` und `images.domains` veraltet | `from ['"]next/image['"]`; in diesen Dateien `src=\|quality=\|width=\|sizes=`; `<Bild[^>]*src=` in `*.mdx`; in der Config `remotePatterns\|localPatterns\|domains:\|dangerouslyAllowLocalIP\|maximumRedirects\|imageSizes\|qualities`; `next/legacy/image` | **6 Dateien** mit `next/image`: `app/ueber-uns/page.tsx`, `components/AuthorBio.tsx`, `components/blog/Bild.tsx`, `components/blog/KarstenSagt.tsx`, `components/layout/Footer.tsx`, `components/layout/Header.tsx`. Quellen: `/about/karsten-kautz-v3.webp` (`lib/site-config.ts` Z. 17), `/logo.svg`, dazu 20 `<Bild src=…>` in MDX — **keine mit Query-String**. `quality`-Prop: 0. Kleinste Bildbreite 36 px (Footer-Logo). Config: nur `formats`, `deviceSizes`, `minimumCacheTTL` (30 Tage); keine Remote-Muster, kein `domains`. `next/legacy/image`: 0 | Nein | **betrifft nicht**, Punkt für Punkt: (a) kein Query-String; (b) Wert ist explizit gesetzt, der Standard greift nicht; (c) kein Bild ≤ 16 px; (d) kein `quality`-Prop, also bleibt 75; (e)/(f) gelten für Remote-Bilder, rechenfix hat keine; (g) nicht genutzt. |
| 16-17 | **`next dev` und `next build` gleichzeitig**: getrennte Ausgabeordner (`.next/dev`), Sperrdatei gegen Mehrfachstarts. — L16 „Concurrent `dev` and `build`“ | — | 0 Dateien | Nein | **betrifft (Arbeitsablauf), keine Codeänderung.** Die bisherige Arbeitsregel „kein `npm run build` neben laufendem `next dev`“ ist nach der Migration neu zu bewerten. |
| 16-18 | **Parallel Routes** brauchen `default.js`. — L16 „Parallel Routes `default.js` requirement“ | Ordner `@*` unter `app/` | 0 | Nein | **betrifft nicht.** |
| 16-19 | **ESLint Flat Config** als Standard von `@next/eslint-plugin-next`. — L16 „ESLint Flat Config“ | `.eslintrc*`; `eslint`-Fassung | 1 Datei: `.eslintrc.json` (`extends: ["next/core-web-vitals", "next/typescript"]`), `eslint` `^8` | Nein; L16 verweist auf den Migrationsleitfaden von ESLint | **betrifft.** |
| 16-20 | **`scroll-behavior`**: Next.js überschreibt `scroll-behavior: smooth` bei Navigation nicht mehr (Opt-in: `data-scroll-behavior="smooth"`). — L16 „Scroll Behavior Override“ | `scroll-behavior\|scroll-smooth\|data-scroll-behavior` in `*.css`, `*.ts(x)`, `*.mdx` | 0 | Nein | **betrifft nicht.** |
| 16-21 | Build-Ausgabe ohne `size`/`First Load JS`. `next dev` lädt die Config nur einmal (`process.argv` enthält `'dev'` nicht mehr). — L16 „Performance Improvements“ | `First Load` in `scripts/`; `process.argv` in `next.config.mjs` | 0 Skripte werten die Build-Ausgabe aus. `next.config.mjs` fragt nur `process.env.NODE_ENV` ab, nicht `process.argv` | Nein | **betrifft nicht.** |
| 16-22 | Build Adapters API (alpha). — L16 „Build Adapters API (alpha)“ | `adapterPath` | 0 | Nein | **betrifft nicht** — Opt-in. |
| 16-23 | `sass-loader` v16. — L16 „Modern Sass API“ | wie 16-7 | 0 | Nein | **betrifft nicht.** |
| 16-24 | **Entfernt: AMP.** — L16 „Removals / AMP Support“ | `next/amp\|useAmp\|amp:` | 2 Fehltreffer: `lib/critical-css.ts` (generiertes CSS) und `scripts/verify-elternzeit.ts` Z. 184 (Zeichenfolge „Clamp:“) | Nein | **betrifft nicht.** |
| 16-25 | **Entfernt: `next lint`.** `next build` **lintet nicht mehr**; die `eslint`-Option in der Config fällt weg. — L16 „Removals / `next lint` Command“ | `next lint` in `package.json`; `eslint:` in `next.config.mjs` | 1 Datei: `package.json`, Skript `"lint": "next lint"` (mit `"prelint"`). `eslint`-Option: 0 | Ja: `npx @next/codemod@canary next-lint-to-eslint-cli .` | **betrifft**, mit Folge für das Sicherheitsnetz (Abschnitt 4): Heute bricht der Vercel-Build an `react/no-unescaped-entities`, weil `next build` lintet (CLAUDE.md, „Häufige Fehler vermeiden“). Unter 16 fällt diese Prüfung ersatzlos weg, solange Lint nicht eigens in den Build eingehängt wird. |
| 16-26 | **Entfernt:** `serverRuntimeConfig`/`publicRuntimeConfig`. — L16 „Removals / Runtime Configuration“ | `serverRuntimeConfig\|publicRuntimeConfig\|next/config` | 0 | Nein | **betrifft nicht.** |
| 16-27 | **Entfernt:** `devIndicators`-Optionen `appIsrStatus`, `buildActivity`, `buildActivityPosition`. — L16 „Removals / `devIndicators` Options“ | `devIndicators` | 0 | Nein | **betrifft nicht.** |
| 16-28 | **Entfernt:** `experimental.dynamicIO`, `experimental.useCache`. — L16 „Removals / `experimental.dynamicIO` and `experimental.useCache`“ | `dynamicIO\|useCache` | 0 | Nein | **betrifft nicht.** |
| 16-29 | **Entfernt:** `unstable_rootParams`. — L16 „Removals / `unstable_rootParams`“ | `rootParams` | 0 | Nein | **betrifft nicht.** |

**Nicht als Änderung gezählt:** L16 „Set up AI agent docs“ empfiehlt vor dem Upgrade
`npx @next/codemod@canary agents-md`, das eine `AGENTS.md` mit Verweis auf die mitgelieferte Doku
unter `node_modules/next/dist/docs/` anlegt. Das ist eine Empfehlung, keine Änderung des Frameworks.
rechenfix hat keine `AGENTS.md`. Aufgeführt als optionaler Punkt in Teilschritt 1.

### 2.3 Außerhalb der Leitfäden, bei der Erhebung aufgefallen

Diese Punkte nennen **weder L15 noch L16**. Sie stehen hier nicht als Kategorien, sondern als
Prüfaufträge mit eigener Quelle. Sie fließen nicht in die Leitfaden-Zählung ein.

1. **`experimental.outputFileTracingExcludes`** (`next.config.mjs`, W53a). Der Eintrag hält die
   Serverless-Functions unter 250 MB; ohne ihn lief der `[kategorie]/[rechner]`-Bundle auf 263,82 MB
   (Commit `f706af7`). REF-output (Stand 2025-10-08, abgerufen 28.09.2026) führt
   `outputFileTracingExcludes` als Schlüssel **auf oberster Ebene** der Config, nicht unter
   `experimental`. Die Beispiele verwenden Routen-Globs wie `'/*'`, rechenfix verwendet `'*'`. Ob
   16 den Eintrag unter `experimental` noch liest und ob `'*'` dort weiter alle Routen trifft, sagt
   die Referenz nicht. **Nicht feststellbar ohne Next 16.** Nach der Migration prüfen: Größe der
   Function `[kategorie]/[rechner]` im Vercel-Build.
2. **`@next/mdx`** steht in `package.json` auf `^14.2.35`. Es hat keine `peerDependencies` auf
   `next`, trägt aber dieselbe Versionsnummer wie `next` und wird im Projekt an dessen Fassung
   gebunden. Anheben zusammen mit `next`.
3. **Serwist** meldet selbst fehlende Turbopack-Unterstützung (16-4). Die Quelle ist das installierte
   Paket, nicht der Leitfaden.

---

## 3. Abhängigkeiten

Gelesen aus `node_modules/<paket>/package.json` (`peerDependencies`, `peerDependenciesMeta`).
Geprüft mit `semver.satisfies` (semver 7.8.5 aus `node_modules`, `includePrerelease`) gegen
React **19.0.0** und **19.2.0** sowie Next **16.0.0** und **16.3.7**.

| Laufzeit-Abhängigkeit (installiert) | Peer `react` | Peer `react-dom` | Peer `next` | React 19 | Next 16 |
|---|---|---|---|---|---|
| `@mdx-js/loader` 3.1.1 | — | — | — | – | – |
| `@mdx-js/react` 3.1.1 | `>=16` | — | — | ja | – |
| `@next/mdx` 14.2.35 | — | — | — (nur optionale Peers `@mdx-js/loader`, `@mdx-js/react` `>=0.15.0`) | – | – (s. 2.3 Nr. 2) |
| `@serwist/next` 9.5.12 | `>=18.0.0` | — | `>=14.0.0` | ja | ja (Peer; Turbopack s. 16-4) |
| `@upstash/redis` 1.37.0 | — | — | — | – | – |
| `@vercel/analytics` 2.0.1 | `^18 \|\| ^19 \|\| ^19.0.0-rc` (optional) | — | `>= 13` (optional) | ja | ja |
| `decimal.js` 10.6.0 | — | — | — | – | – |
| `ffmpeg-static` 5.3.0 | — | — | — | – | – |
| `jspdf` 4.2.1 | — | — | — | – | – |
| `jspdf-autotable` 5.0.8 | — | — | — | – | – |
| `next` 14.2.35 | `^18.2.0` | `^18.2.0` | — | **NEIN** | (wird selbst ersetzt) |
| `qrcode` 1.5.4 | — | — | — | – | – |
| `react` 18.3.1 | — | — | — | – | – |
| `react-dom` 18.3.1 | `^18.3.1` | — | — | **NEIN** | – |
| `resend` 6.10.0 | — (nur optional `@react-email/render` `*`) | — | — | – | – |
| `serwist` 9.5.12 | — | — | — | – | – |

**Pakete, die React 19 oder Next 16 nicht zulassen:** `next` 14.2.35 (`react`/`react-dom`
`^18.2.0`) und `react-dom` 18.3.1 (`react` `^18.3.1`). Beide werden bei der Migration selbst
ersetzt. **Unter den Fremdpaketen lässt keines React 19 oder Next 16 nicht zu.**

Nicht verlangt, aber für den Paketsprung nötig — devDependencies:
- `@types/react-dom` 18.3.7 verlangt `@types/react` `^18.0.0` und blockiert damit `@types/react` 19.
  Beide Pakete gemeinsam anheben (L15 „React 19“, „Good to know“).
- `eslint-config-next` 14.2.35 ist fest auf die Next-Fassung gesetzt; Peers `eslint` `^7 || ^8`,
  `typescript` `>=3.3.1`. Anheben zusammen mit `next`, Zusammenhang mit 16-19 und 16-25.

---

## 4. Sicherheitsnetz

### 4.1 Was einen Bruch automatisch aufdeckt

**`npm run build`**, lokal und auf Vercel, besteht aus zwei Stufen:

1. **Prebuild-Kette, 19 Befehle** (`package.json`, `prebuild`): `check-footer`,
   `check-drittanbieter`, `check-affiliate-partnerliste`, `check-verwandte-rechner`,
   `check-metadescription`, `check-energiepreise`, `check-wellenhistorie`,
   `check-blog-wortzahl --all --warnung`, `check-contentbloecke-pflicht`, `check-jahreswerte`,
   `check-backticks`, `check-ki-beispiele`, `generate-ki-inventar --pruefen`, `check-ki-generatoren`,
   `check-termine`, `slug-drift-scan`, `generate-client-data`, `generate-tipp-constants`,
   `build-critical-css`. Sie prüfen Inhalte, Konfiguration und Verweise und laufen ohne Next.js.
   **Für die Migration sind sie neutral**: Sie decken keinen Framework-Bruch auf und werden von
   ihm auch nicht gestört. `build-critical-css` baut über die Tailwind-CLI und hängt nicht am
   Bundler.
2. **`next build`** zeigt unter 14.2.35 am 28.09.2026: Kompilierung, „Linting and checking validity of
   types“ und Vorrendern von 273 Seiten. Daraus würde er melden:
   - 16-4: Abbruch bei gefundener `webpack`-Konfiguration, sofort;
   - Typfehler aus 15-2a, 15-2c, 15-2d, soweit die Typen von 16 sie ausweisen (nicht vorab
     prüfbar);
   - Laufzeitfehler beim **Vorrendern** aller SSG-Seiten, darunter alle Seiten aus `[kategorie]`
     und `[kategorie]/[rechner]` sowie der Blog;
   - **nicht mehr** unter 16: Lint (16-25).

**Verify-Skripte:** 58 unter `scripts/` (57 × `.ts`, 1 × `.mjs`). Aufruf einzeln:
`npx tsx scripts/verify-<name>.ts` bzw. `node scripts/verify-critical-css.mjs`. Keins steht im
Prebuild. Es gibt keinen Sammelaufruf und keine CI (`.github/workflows/` fehlt). Die 57
`.ts`-Skripte prüfen die Rechenlogik in `lib/berechnungen/`. Drei davon lesen zusätzlich
Komponenten-Quelltext als Text (`verify-unterhalt-component`, `verify-wohnen-block-b`,
`verify-zugewinnausgleich`). **Keins rendert React oder startet Next.js**; für die Migration
belegen sie nur, dass die Rechenlogik unberührt bleibt. Einzige Ausnahme ist
`verify-critical-css.mjs`: Es prüft das ausgelieferte HTML von 4 URLs (Inline-`<style>`,
höchstens ein Stylesheet-Link von `next/font`). Voraussetzung ist ein lokaler Produktionsserver auf
Port 3000 (`npm run build`, `npm start`). Das Skript ist nach der Migration relevant, weil ein
Bundlerwechsel die CSS-Topologie ändern kann.

**Manuell:** Smoketest v3.1 (C1–C9) als Browser-Konsolen-Skript, laut CLAUDE.md Pflicht nach jeder
Änderung.

### 4.2 Was keine automatische Prüfung hat

- **Alle 15 Route-Handler** (ƒ, beim Build nicht ausgeführt): Cron `social-post`,
  `social-post-tiktok`, `health-check`, Admin-Login/-Logout, `explain`, `ki-rechner`, `track`,
  `counter`, `stats`, `social-status`, `monthly-report`, `feedback`, TikTok-Auth/-Callback.
  Besonders `istAdminAngemeldet()` (15-2d): Ein Fehler zeigt sich dort als „nicht angemeldet“, nicht
  als Absturz.
- **`/social`** mit `searchParams` (15-2c), **`/opengraph-image`** (Edge): beide ƒ, beim Build nicht
  gerendert.
- **Service Worker:** Ob `public/sw.js` (gitignored) nach dem Umbau noch erzeugt wird und die
  Registrierung über `/offline-nutzung` funktioniert. Keine Prüfung.
- **Client-Navigation und Prefetching** (15-6, 16-13): nur sichtbar im Browser.
- **Größe der Serverless-Functions** (2.3 Nr. 1): zeigt sich erst im Vercel-Build.
- **Lint** nach 16-25, solange er nicht eigens in den Build eingehängt ist.
- **Vercel-seitige Einstellungen:** Node-Fassung (16-1), Speed Insights (15-10).

---

## 5. Umfang

| Kategorie | Leitfaden-Zeile | Betroffene Dateien | Pfade |
|---|---|---|---|
| Paketsprung React 19 / Next 16 / @types / eslint-config-next / @next/mdx | 15-1, 3, 2.3 Nr. 2 | 2 | `package.json`, `package-lock.json` |
| Async `params` | 15-2a | 2 | `app/[kategorie]/[rechner]/page.tsx`, `app/[kategorie]/page.tsx` |
| Async `searchParams` | 15-2c | 1 | `app/social/page.tsx` |
| Async `cookies()` | 15-2d | 1 (+4 abhängige Handler ohne Änderungsbedarf) | `lib/admin-session.ts` |
| Turbopack-Standard vs. Webpack-Plugins (Serwist, MDX) | 16-4 | 1–2, je nach Weg | `next.config.mjs`; bei Weg A zusätzlich `package.json` (`build`-Skript) |
| `next lint` entfernt, Build lintet nicht mehr | 16-25 | 1 | `package.json` (`lint`, `prelint`, ggf. `prebuild`) |
| ESLint Flat Config | 16-19 | 1 (+ neue Datei) | `.eslintrc.json` → Flat-Config-Datei |
| Browser-Mindeststand | 16-3 | 1 | `package.json` (`browserslist`) |
| Client Cache / Routing (nur Verhalten) | 15-6, 16-13 | 0 zu ändern (36 + 5 berührt) | Anhang A |
| Node.js ≥ 20.9 | 16-1 | 0 im Repository | Vercel-Einstellung, nicht feststellbar |
| Speed Insights | 15-10 | 0 im Repository | Vercel-Einstellung, nicht feststellbar |
| `outputFileTracingExcludes` (außerhalb der Leitfäden) | 2.3 Nr. 1 | 1 | `next.config.mjs` |
| Gleichzeitiges `dev`/`build` (Arbeitsablauf) | 16-17 | 0 | — |

**Zu ändernde Dateien insgesamt: 8** — `package.json`, `package-lock.json`, `next.config.mjs`,
`.eslintrc.json` (bzw. deren Flat-Nachfolger), `app/[kategorie]/[rechner]/page.tsx`,
`app/[kategorie]/page.tsx`, `app/social/page.tsx`, `lib/admin-session.ts`.
Die 40 Hauptzeilen (11 aus L15, 29 aus L16) verteilen sich so: **6 betreffen rechenfix mit
Code- oder Konfigurationsfolge** (15-1; 15-2 mit den Unterzeilen a, c, d; 16-3; 16-4; 16-19;
16-25). **3 betreffen nur Verhalten oder Arbeitsablauf** (15-6, 16-13, 16-17). **2 sind nicht
feststellbar** (15-10, 16-1). **29 betreffen rechenfix nicht.**

### Vorschlag: Teilschritte der Migrationswelle

Nur Reihenfolge und Umfang, keine Zeitschätzung.

1. **Entscheidungen und Ablesen, ohne Code.** Node-Fassung im Vercel-Projekt ablesen (≥ 20.9?).
   Speed-Insights-Status ablesen. Entscheiden: Weg A (`--webpack`) oder Weg B (Turbopack mit
   Serwist-/MDX-Umstellung) für 16-4; `browserslist` anheben ja/nein (16-3); Lint als eigener
   Prebuild-Schritt ja/nein (16-25). Optional `AGENTS.md` (L16 „Set up AI agent docs“).
   React-19-Upgrade-Leitfaden (react.dev) gegen den Code halten, eigener Suchlauf.
2. **Paketsprung** über den `upgrade`-Codemod oder von Hand: `next`, `react`, `react-dom`,
   `@types/react`, `@types/react-dom`, `eslint-config-next`, `@next/mdx`; Lockfile.
3. **Async Request APIs** in 4 Dateien: Codemod `next-async-request-api`, danach
   `lib/admin-session.ts` (try/catch) von Hand prüfen. Typen ggf. über `npx next typegen`.
4. **Build-Weg** nach Entscheidung aus 1: `next.config.mjs` und `build`-Skript;
   `outputFileTracingExcludes` an die Stelle nach 16 bringen; Erzeugung von `public/sw.js`
   nachweisen.
5. **Lint:** `next lint` → ESLint-CLI (Codemod `next-lint-to-eslint-cli`), Flat Config, Lint wieder
   in den Build-Pfad, damit `react/no-unescaped-entities` weiter vor Vercel abfängt.
6. **Verifikation:** `npm run build` (273 Seiten, ohne Lint-Lücke). `verify-critical-css.mjs` gegen
   den lokalen Produktionsserver. Smoketest v3.1. Stichproben ohne automatische Prüfung (4.2):
   Cron-Handler im Trockenlauf (`?test=true`), Admin-Anmeldung, `/tt` → `/social?ref=tt`,
   `/opengraph-image`, Service-Worker-Registrierung, Function-Größe im Vercel-Build.

**Kopplung:** Die Schritte 2 bis 4 ergeben nur **gemeinsam** einen grünen Build. Nach Schritt 2
allein bricht `next build` an 16-4 ab, und die synchronen Zugriffe aus 15-2 sind entfernt. Sie
gehören deshalb in einen Arbeitsgang mit einem Build am Ende. Schritt 5 ist davon unabhängig, muss
aber vor dem ersten Deploy auf 16 stehen, sonst läuft mindestens ein Deploy ohne Lint.

---

## 6. Advisories 30.09.2026

**Ausgefüllt:** 01.10.2026 nach dem Build-Prompt „Termine vom 01.10.2026 abarbeiten“. Der Termin
`nextjs-sicherheitsrelease-2026-09` ist damit erledigt und aus `lib/termine.ts` entfernt. Folgetermin
`nextjs-zurueckgehaltene-advisories` am 08.10.2026 (6.6). Ausgangsbasis waren Fakten aus einer
Chat-Recherche vom 01.10.2026. Wo sie in dieser Sitzung nachgeprüft wurden, steht das Ergebnis dabei,
und es gilt das Ergebnis.

### 6.1 Quellen

Alle am **01.10.2026** in dieser Sitzung abgerufen, wenn nicht anders vermerkt.

| Kürzel | Quelle | Ergebnis des Abrufs |
|---|---|---|
| **SR** | nextjs.org/blog/september-2026-security-release | HTTP 200 |
| **RL** | github.com/vercel/next.js/releases/tag/v16.3.8, gelesen über `api.github.com/repos/vercel/next.js/releases/tags/v16.3.8` | HTTP 200, `published_at` 2026-09-30T16:13:46Z |
| **RL-16.3.7** | dasselbe für `v16.3.7` | HTTP 200, `published_at` 2026-09-29T08:54:51Z |
| **RA** | `api.github.com/repos/vercel/next.js/security-advisories/<GHSA>` — Bereiche der sieben neuen GHSAs. In der globalen Datenbank (`api.github.com/advisories/<GHSA>`) standen sie am 01.10.2026 noch nicht (HTTP 404). | je HTTP 200 |
| **GA** | `api.github.com/advisories/<GHSA>` — GitHub Advisory Database, Texte der Advisories aus 6.4 und der drei vorgelagerten React-Advisories | je HTTP 200 |
| **AU** | `npm audit --json` im Repository, `auditReportVersion` 2 | Ausgabe in 6.3 |
| SP | nextjs.org/support-policy — Stand aus Abschnitt 1.2 (28.09.2026), **nicht neu abgerufen** | — |

### 6.2 Das Release vom 30.09.2026

**Sieben Lücken statt der angekündigten neun.** Berichtigt Abschnitt 1.3. SR wörtlich: „A fix for one
critical vulnerability and one high severity vulnerability was postponed due to upstream dependency
delays.“ Der Satz aus der Chat-Recherche, „This release now addresses seven vulnerabilities instead of
nine …“, steht am 01.10.2026 **nicht** in SR. Inhaltlich deckt er sich mit dem tatsächlichen Wortlaut.

**Korrigiert in 16.3.8 und 15.5.27.** SR: „Updates are now available in v16.3.8 (Active LTS) and
v15.5.27 (Maintenance LTS)“. Die in BL angekündigte 16.3.7 nennt SR nicht. RL-16.3.7 führt als einzige
Änderung einen Turbopack-Fix auf („turbo-tasks-backend: fix strongly consistent read hanging on a
canceled task (#98931)“), keine Sicherheitskorrektur. npm-Veröffentlichung laut Registry: 16.3.7 am
29.09.2026, 16.3.8 und 15.5.27 am 30.09.2026.

**Nachprüfung der sieben GHSAs: bestätigt.** RL und SR nennen dieselben sieben Kennungen mit
denselben Schweregraden wie die Chat-Recherche. Die Bereiche stammen aus RA, wörtlich einschließlich
der Platzhalter, die dort am 01.10.2026 standen.

| GHSA | Schweregrad (RL) | Bereich (RA) | korrigiert (RA) | Titel (RL) | Voraussetzung laut SR |
|---|---|---|---|---|---|
| GHSA-cjq9-62q9-8jv4 | High | `>= 16.0.0 < 16.3.?` | `16.3.?` | Server-Side Request Forgery in Image Optimization | „If no images.remotePatterns are configured, your application is not affected.“ |
| GHSA-4jqv-mc3x-m676 | Medium | `>= 15.0.0`; `>= 16.0.0` | `15.5.?`; `16.3.?` | Cache poisoning of SSG and ISR pages in self-hosted Next.js applications | Pages Router mit SSG/ISR, selbst gehostet. „Applications deployed on Vercel are not affected.“ |
| GHSA-mcj8-r9mp-w47p | Medium | `>= 16.0.0`; `>= 15.0.0` | `16.3.?`; `15.5.?` | Cache poisoning in Next.js SSG/ISR rendering leads to cross-user content substitution and persistent denial of service | Catch-all-Seite auf oberster Ebene zusammen mit SSG/ISR |
| GHSA-f87g-xv8r-7p7x | Medium | `>= 16.0.0` | `16.3.?` | Information disclosure in Next.js App Router metadata image routes via dynamicParams bypass | App Router mit Webpack, Metadaten-Bildrouten |
| GHSA-h694-7cp9-m8p3 | Medium | `16.3.0` | `16.3.8` | Cache leak across root param values in nested 'use cache' functions | Cache Components eingeschaltet |
| GHSA-3w37-wq28-93x7 | Medium | `16.3.0` | `16.3.?` | Pending `use cache` fill can leak Draft Mode content into regular responses and persisted pages | Cache Components (oder `experimental.useCache`) und Draft Mode |
| GHSA-39w2-rjm5-chcv | Low | `>= 16.0.0` | `16.3.?` | Information disclosure in the Next.js development server's Model Context Protocol endpoint | „Only applications run with next dev are affected.“ |

Alle Bereiche beginnen bei `>= 15.0.0`, `>= 16.0.0` oder `16.3.0`. **Keiner nennt 14.x.** Das heißt
„nicht angegeben“, nicht „nicht betroffen“. Passend dazu führt AU keine der sieben für 14.2.35. Für die
einzige hohe der sieben, GHSA-cjq9-62q9-8jv4, gilt unabhängig davon: rechenfix setzt keine
`images.remotePatterns` (`next.config.mjs` Z. 29–34), nach dem Satz aus SR ist es also selbst dann nicht
betroffen, wenn die Lücke 14.x einschlösse.

### 6.3 `npm audit` gegen next@14.2.35 — maßgebliche Liste

AU meldet für das Paket `next` den Gesamtschweregrad `critical`, den Bereich
`9.3.4-canary.0 - 16.3.0-preview.10` und `fixAvailable` = `next@16.3.8` (`isSemVerMajor: true`).
**23 Advisories: 2 kritisch, 8 hoch, 11 mittel, 2 niedrig.** Das deckt sich mit der Chat-Recherche
(23, davon 2 kritisch und 8 hoch); eine Abweichung gibt es nicht. Für 14.x gibt es keine Korrektur
mehr: Die korrigierten Fassungen beginnen bei 15.0.8.

| # | GHSA | Schweregrad | Bereich | Titel |
|---|---|---|---|---|
| 1 | GHSA-2xp9-vwfh-vxw4 | kritisch | `>=10.0.0 <15.5.24` | Next.js: Unauthenticated Remote Code Execution in Image Optimization API when AVIF files are used |
| 2 | GHSA-p293-qw3h-jr36 | kritisch | `>=13.4.0 <15.5.24` | Next.js: Unauthenticated Remote Code Execution on windows-hosted servers |
| 3 | GHSA-36qx-fr4f-26g5 | hoch | `>=12.2.0 <15.5.16` | Next.js has a Middleware / Proxy bypass in Pages Router applications using i18n |
| 4 | GHSA-89xv-2m56-2m9x | hoch | `>=14.1.1 <15.5.21` | Next.js: Server-Side Request Forgery in Server Actions on custom servers |
| 5 | GHSA-8h8q-6873-q5fj | hoch | `>=13.0.0 <15.5.16` | Next.js Vulnerable to Denial of Service with Server Components |
| 6 | GHSA-c4j6-fc7j-m34r | hoch | `>=13.4.13 <15.5.16` | Next.js vulnerable to server-side request forgery in applications using WebSocket upgrades |
| 7 | GHSA-h25m-26qc-wcjf | hoch | `>=13.0.0 <15.0.8` | Next.js HTTP request deserialization can lead to DoS when using insecure React Server Components |
| 8 | GHSA-m99w-x7hq-7vfj | hoch | `>=13.0.0 <15.5.21` | Next.js: Denial of Service in App Router using Server Actions |
| 9 | GHSA-p9j2-gv94-2wf4 | hoch | `>=12.0.0 <15.5.21` | Next.js: Server-Side Request Forgery in rewrites via attacker-controlled destination hostname |
| 10 | GHSA-q4gf-8mx6-v5v3 | hoch | `>=13.0.0 <15.5.15` | Next.js has a Denial of Service with Server Components |
| 11 | GHSA-3x4c-7xq6-9pq8 | mittel | `>=10.0.0 <15.5.14` | Next.js: Unbounded next/image disk cache growth can exhaust storage |
| 12 | GHSA-4633-3j49-mh5q | mittel | `>=13.0.0 <15.5.21` | Next.js: Cache confusion of response bodies for requests with bodies containing invalid UTF-8 byte sequences |
| 13 | GHSA-4c39-4ccg-62r3 | mittel | `>=13.0.0 <15.5.21` | Next.js: Unbounded Server Action payload in Edge runtime |
| 14 | GHSA-68g3-v927-f742 | mittel | `>=13.0.0 <15.5.21` | Next.js: Cache confusion of response bodies for requests with bodies |
| 15 | GHSA-955p-x3mx-jcvp | mittel | `>=13.0.0 <15.5.21` | Next.js: Unauthenticated disclosure of internal Server Function endpoints |
| 16 | GHSA-9g9p-9gw9-jx7f | mittel | `>=10.0.0 <15.5.10` | Next.js self-hosted applications vulnerable to DoS via Image Optimizer remotePatterns configuration |
| 17 | GHSA-ffhc-5mcf-pf4q | mittel | `>=13.4.0 <15.5.16` | Next.js vulnerable to cross-site scripting in App Router applications using CSP nonces |
| 18 | GHSA-ggv3-7p47-pfv8 | mittel | `>=9.5.0 <15.5.13` | Next.js: HTTP request smuggling in rewrites |
| 19 | GHSA-gx5p-jg67-6x7h | mittel | `>=13.0.0 <15.5.16` | Next.js has cross-site scripting in beforeInteractive scripts with untrusted input |
| 20 | GHSA-h64f-5h5j-jqjh | mittel | `>=10.0.0 <15.5.16` | Next.js has a Denial of Service in the Image Optimization API |
| 21 | GHSA-wfc6-r584-vfw7 | mittel | `>=14.2.0 <15.5.16` | Next.js vulnerable to cache poisoning in React Server Component responses |
| 22 | GHSA-3g8h-86w9-wvmq | niedrig | `>=12.2.0 <15.5.16` | Next.js's Middleware / Proxy redirects can be cache-poisoned |
| 23 | GHSA-vfv6-92ff-j949 | niedrig | `>=13.4.6 <15.5.16` | Next.js vulnerable to cache poisoning via collisions in React Server Component cache-busting |

Die Schweregrade sind von AU übersetzt (`moderate` = mittel). Die Bereiche gibt AU verkürzt wieder. GA
nennt je zusätzlich die korrigierte 16er-Fassung, die höchste davon ist 16.3.3 (Nr. 1 und 2).

### 6.4 Einordnung der kritischen und hohen Advisories

Einordnung **einschlägig** / **nicht einschlägig** / **offen**. Die Zitate stammen aus GA. Steht im
Advisory nichts zu Vercel, gilt der Vercel-Schutz als **nicht angegeben** und wird nicht angenommen.

Gemeinsame Repository-Befunde, Stand 01.10.2026:

- **Hosting:** Vercel, belegt durch `vercel.json` mit `crons` und `ignoreCommand`. Kein eigener Server: kein `server.*`, `package.json` Z. 10–12 `next dev`/`next build`/`next start`, kein `output` in `next.config.mjs`.
- **Pages Router:** Es gibt kein Verzeichnis `pages/`.
- **i18n:** steht nicht in `next.config.mjs`.
- **Middleware:** Es gibt weder `middleware.*` noch `proxy.*`.
- **Rewrites:** Kein `rewrites()`. `redirects()` (`next.config.mjs` Z. 36–78) hat vier Regeln, alle mit relativem Ziel (Z. 44, 52, 61, 73). `vercel.json` enthält weder Rewrites noch Redirects.
- **Server Actions:** 0 Treffer für `"use server"`/`'use server'` in `app/`, `components/` und `lib/` (`*.ts`, `*.tsx`, `*.js`, `*.mjs`, `*.mdx`). `.next/server/server-reference-manifest.json` aus dem lokalen Build vom 30.09.2026 ist leer: `node` 0, `edge` 0. Im installierten Next 14.2.35 bricht `handleAction` in diesem Fall ab, bevor ein Request-Körper dekodiert wird: `node_modules/next/dist/server/app-render/action-handler.js` Z. 249–256, Kommentar „If the app has no server actions at all, we can 404 early.“, Prüfung `hasServerActions` in Z. 33–35. Die Aufrufe `decodeReply`/`decodeAction` folgen erst ab Z. 353.
- **Image Optimization:**
  - Aktiv mit dem Standard-Loader. `next.config.mjs` Z. 29–34 setzt `formats: ['image/webp', 'image/avif']`, `deviceSizes` und `minimumCacheTTL`. Es gibt kein `unoptimized`, kein `loader`, keine `remotePatterns` und kein `domains`. Auch im Code steht kein `unoptimized`.
  - `next/image` steht in **6 Dateien**. **4 davon mit Rasterquellen:**
    - `components/AuthorBio.tsx`, `components/blog/KarstenSagt.tsx` und `app/ueber-uns/page.tsx` mit `/about/karsten-kautz-v3.webp` (`lib/site-config.ts` Z. 17);
    - `components/blog/Bild.tsx` mit **20 PNG-Titelbildern** aus den 20 Blog-MDX-Dateien.
  - Wo das WebP-Foto erscheint: `AuthorBio` auf den 10 Rechnern mit `zeigtAuthorBio: true`, im Blog-Layout und auf den 6 Brutto-Netto-Long-Tail-Seiten; `KarstenSagt` in 20 MDX-Dateien; dazu `/ueber-uns`.
  - `components/layout/Header.tsx` und `Footer.tsx` nutzen nur `/logo.svg`. SVG liefert Next 14 ohne Optimierung aus (`node_modules/next/dist/shared/lib/get-img-props.js` Z. 237).
  - In `public/` liegen **0 Dateien `*.avif`**.

| GHSA | Schwere | Einordnung | Beleg aus dem Advisory | Beleg aus dem Repository |
|---|---|---|---|---|
| GHSA-2xp9-vwfh-vxw4 | kritisch | **offen** | „A vulnerability in the underlying `libheif` library used by `sharp` which Next.js uses for image optimization can lead to remote code execution when AVIF files are optimized.“ — „Until a fix has propagated, optimization of AVIF files is disabled.“ Zu Vercel: nichts, also **nicht angegeben**. | Die Image Optimization API ist mit Rasterquellen in Betrieb, und `formats` enthält `image/avif`. Damit kann jeder Aufrufer über den `Accept`-Header eine AVIF-**Ausgabe** anstoßen. Eine AVIF-**Quelle** kann ein Angreifer nicht unterschieben, denn es gibt keine AVIF-Dateien und keine Remote-Quellen. Ob „AVIF files are optimized“ die Quelle oder das Zielformat meint, sagt das Advisory nicht. **Abgeschaltet am 01.10.2026** durch Entfernen von `image/avif` aus `images.formats` in `next.config.mjs`, entsprechend der Abhilfe der korrigierten Fassungen. |
| GHSA-p293-qw3h-jr36 | kritisch | **nicht einschlägig** | „…can lead to remote code execution when the server is hosted on machines using a Windows filesystem.“ | Die Produktion läuft auf Vercel, nicht unter Windows. **Lokaler Rest außerhalb der Produktion:** `next dev` und das `npm start` für `verify-critical-css.mjs` laufen auf Karstens Windows-Rechner. Die Einordnung gilt für die ausgelieferte Seite. |
| GHSA-36qx-fr4f-26g5 | hoch | **nicht einschlägig** | „Applications using the Pages Router with `i18n` configured and middleware/proxy-based authorization…“ | kein `pages/`, kein `i18n`, keine Middleware |
| GHSA-89xv-2m56-2m9x | hoch | **nicht einschlägig** | „Applications that use Server Actions are affected when the incoming host header is not fixed to a trusted value.“ | 0 Server Actions, Manifest leer |
| GHSA-8h8q-6873-q5fj | hoch | **nicht einschlägig** | „A specially crafted HTTP request can be sent to any App Router Server Function endpoint that, when deserialized, may trigger excessive CPU usage.“ Die vorgelagerte React-Advisory GHSA-rv78-f8rc-xrxh schließt nur Apps ohne Server oder ohne RSC-Framework aus. Das trifft auf rechenfix **nicht** zu. | App Router ist im Einsatz, aber es gibt keinen Server-Function-Endpunkt. Ohne Server Actions endet `handleAction` vor der Deserialisierung (Belege oben). |
| GHSA-c4j6-fc7j-m34r | hoch | **nicht einschlägig** | „Self-hosted applications using the built-in Node.js server can be vulnerable…“ — „Vercel-hosted deployments are not affected.“ | Vercel-Hosting |
| GHSA-h25m-26qc-wcjf | hoch | **nicht einschlägig** | wie GHSA-8h8q („…sent to any App Router Server Function endpoint that, when deserialized…“); vorgelagert GHSA-83fc-fqcc-2hmg, gleiche Ausschlussformel | wie GHSA-8h8q |
| GHSA-m99w-x7hq-7vfj | hoch | **nicht einschlägig** | „Applications using Pages Router or not using Server Actions are not vulnerable.“ | 0 Server Actions |
| GHSA-p9j2-gv94-2wf4 | hoch | **nicht einschlägig** | „A `rewrites()` or `redirects()` rule that builds its external destination hostname from request-controlled input…“ | kein `rewrites()`, alle vier `redirects()`-Ziele relativ |
| GHSA-q4gf-8mx6-v5v3 | hoch | **nicht einschlägig** | wie GHSA-8h8q; vorgelagert GHSA-479c-33wc-g2pg, gleiche Ausschlussformel | wie GHSA-8h8q |

**Grenze der Belege bei den drei RSC-DoS-Advisories:** Der Beleg ist der installierte Code von
14.2.35 zusammen mit dem leeren Manifest. Er hält nur, solange rechenfix keine Server Action einführt.
Mit dem ersten `'use server'` wären alle drei einschlägig.

### 6.5 Entscheidung

Regel: Ist mindestens ein kritisches oder hohes Advisory `einschlägig` oder `offen`, wird die Migration
auf 16 vorgezogen.

**GHSA-2xp9-vwfh-vxw4 (kritisch, Remote Code Execution) ist `offen`. Die Migration auf Next.js 16 wird
vorgezogen. Zielversion mindestens 16.3.8.** Ein Ziel 15.x lohnt nicht: Nach SP endet die
Maintenance-LTS von 15.x zwei Jahre nach dem Erscheinen am 21.10.2024, errechnet also am 21.10.2026
(Abschnitt 1.2).

Folge für dieses Papier: Abschnitt 3 hat die Peer-Abhängigkeiten gegen 16.0.0 und 16.3.7 geprüft. Bei
der Migration ist dieselbe Prüfung gegen die tatsächliche Zielversion zu wiederholen.

**Überbrückung, umgesetzt am 01.10.2026 und über die Migration hinaus gültig:** `'image/avif'` aus
`images.formats` in `next.config.mjs` gestrichen. Wieder eingeschaltet wird AVIF erst, wenn Next.js die
Optimierung selbst freigibt. Seitdem entsteht keine AVIF-Ausgabe mehr. AVIF-Quellen gibt es ohnehin
nicht, beide Lesarten aus 6.4 sind damit für rechenfix geschlossen. Das entspricht im Ergebnis dem, was
die korrigierten Fassungen nach dem Advisory tun („optimization of AVIF files is disabled“). Der Preis:
Browser bekommen WebP statt AVIF.

### 6.6 Zurückgehaltene Advisories

SR: zwei Lücken, **1 kritisch, 1 hoch**, „postponed due to upstream dependency delays“. Bereiche,
Kennungen und Voraussetzungen sind **unbekannt**. Folgetermin `nextjs-zurueckgehaltene-advisories` am
08.10.2026: nachsehen, ob sie veröffentlicht sind, und ihre Bereiche gegen 14.2.35 und gegen die
Zielversion der Migration halten.

### 6.7 Außenmessung vom 01.10.2026

Gemessen in einer Chat-Sitzung am 01.10.2026 von außen gegen www.rechenfix.de, **nicht in dieser
Sitzung**. Hier gegen das Repository gehalten.

| Messung (Chat) | Repository | Ergebnis |
|---|---|---|
| `window.next.version` = `14.2.35` | `package.json` Z. 39 `"next": "14.2.35"`; `package-lock.json`, `packages["node_modules/next"].version` = 14.2.35 | **bestätigt** |
| KI-Erklärung über den Route Handler `POST /api/explain`, keine Server Action | `app/api/explain/route.ts` Z. 118 `export async function POST`; `components/rechner/AiExplain.tsx` Z. 86 `fetch('/api/explain'` | **bestätigt** |
| Keine Action-IDs in den Client-Bündeln | 0 × `'use server'`; `server-reference-manifest.json` leer (6.4) | **bestätigt** |
| `next/image` auf `/` und `/alltag/prozentrechner` nur mit `/logo.svg`, dort kein `_next/image` | Header und Footer nutzen `/logo.svg`, das Next 14 unoptimiert ausliefert (`get-img-props.js` Z. 237). `prozentrechner` setzt kein `zeigtAuthorBio`. | **bestätigt für die beiden Seiten — ergänzt:** `_next/image` ist auf rechenfix in Gebrauch. Es erscheint auf den 10 Rechnern mit `zeigtAuthorBio`, auf den 6 Brutto-Netto-Long-Tail-Seiten, im ganzen Blog (Foto und 20 PNG-Titelbilder) und auf `/ueber-uns`. Die beiden gemessenen Seiten sind dafür nicht repräsentativ. |
| `/opengraph-image` antwortet mit HTTP 200 | `app/opengraph-image.tsx` existiert, `runtime = 'edge'` (Z. 3) | **passt**; der Statuscode selbst wurde hier nicht neu gemessen |
| Kein `x-middleware-*`-Header | Weder `middleware.*` noch `proxy.*` im Repository | **bestätigt:** Es gibt keine Middleware. Der fehlende Header allein hätte das nicht bewiesen. |

---

## 7. Folgewellen

Angelegt am 28.09.2026 mit der Migrationswelle `next16` (Branch `next16`, Next.js 16.3.6 mit
`--webpack`). Nichts davon ist Teil dieser Welle.

1. **Turbopack.** Entfernt den MDX-Workaround in `next.config.mjs` (webpack-Hook, der den
   SWC-Schritt der MDX-Regel von `@next/mdx` in die RSC-Schicht legt) samt
   `scripts/check-mdx-nur-seiten.mjs` in der Prebuild-Kette. Braucht Ersatz für `@serwist/next`:
   Version 9.5.12 unterstützt Turbopack nicht und nennt als Wege `@serwist/turbopack` oder den
   „configurator mode“. Bis dahin gilt: Nach jedem Nachzug der Next-Fassung einmal ohne den Hook
   bauen; baut es grün, fliegt der Workaround raus. Stand 28.09.2026: 16.3.6 ohne Hook scheitert an
   allen `page.mdx`.
2. **Interne Links auf `<Link>` umstellen.** 17 interne `<a href>`-Links in 14 Dateien, gemeldet von
   `@next/next/no-html-link-for-pages` (34 Meldungen, jede Fundstelle doppelt): `app/datenschutz/page.tsx`,
   `app/impressum/page.tsx`, `app/ki-rechner/page.tsx`, `app/nutzungsbedingungen/page.tsx` (2),
   `components/rechner/AiExplain.tsx`, `AutokostenRechner.tsx`, `BafoegRechner.tsx`,
   `FirmenwagenRechner.tsx`, `GehaltserhoehungRechner.tsx`, `MidijobRechner.tsx` (2),
   `MinijobRechner.tsx` (2), `SplittingRechner.tsx`, `TeilzeitRechner.tsx`, `WohngeldRechner.tsx`
   (Komponenten unter `components/rechner/`). Danach die Regel in `eslint.config.mjs` wieder
   einschalten.
3. **Die 15 neuen Lint-Regeln einzeln bewerten.** In `eslint.config.mjs` vorerst aus:
   `@next/next/no-location-assign-relative-destination` und die 14 React-Compiler-Regeln aus
   `eslint-plugin-react-hooks` 7 (`config`, `error-boundaries`, `gating`, `globals`, `immutability`,
   `incompatible-library`, `preserve-manual-memoization`, `purity`, `refs`, `set-state-in-effect`,
   `set-state-in-render`, `static-components`, `unsupported-syntax`, `use-memo`). Am Bestand
   gemessen: 19 × `set-state-in-effect` in 17 Dateien, 2 × `immutability`, 2 ×
   `preserve-manual-memoization`, 1 × `purity`.
4. **ESLint-Fassung.** npm meldet `eslint@9.39.5` bei der Installation als „no longer supported“.
   `eslint-config-next` 16.3.6 verlangt `eslint >=9.0.0`; installiert ist die Hauptversion 9
   nach Entscheidung 1. Zu prüfen ist der Sprung auf 10.

---

## 8. Migration durchgeführt (01.10.2026, Zweig next16)

Welle 155. Der Build-Prompt sah diesen Abschnitt als „7“ vor. Abschnitt 7 trägt auf diesem Zweig aber
schon die Folgewellen vom 28.09.2026, deshalb steht die Migration hier als 8.

### 8.1 Vorgeschichte und Vorgehen

Auf `next16` lag seit dem 28.09.2026 eine Migration auf 16.3.6 mit 13 Commits, gepusht und mit
Freigaben von Karsten:

| Commit | Inhalt |
|---|---|
| `37655f1` | Pakete auf Next.js 16.3.6, React 19, ESLint 9 |
| `9d657c5` | Webpack beibehalten — `dev` und `build` mit `--webpack` |
| `e4a1d6f` | Async Request APIs — `params` und `searchParams` mit `await` |
| `de1ab24` | `admin-session` — `cookies()` mit `await`, fail closed mit Protokoll |
| `d576071` | Lint bleibt Teil des Builds — Flat Config, `npm run lint` am Ende der Prebuild-Kette |
| `ef78da6` | `outputFileTracingExcludes` auf die oberste Ebene |
| `ce72d6b` | `browserslist` auf den Mindeststand von 16 |
| `8657a71` | Workaround MDX-Seiten unter Next.js 16 mit Webpack |
| `5302f3e` | `check-mdx-nur-seiten` erzwingt die Voraussetzung des Workarounds |
| `81e852d` | ESLint-Kommentar zu `no-html-link-for-pages` präzisiert |
| `c1a7ac6` | `tsconfig.json` so, wie Next.js 16 sie selbst schreibt |
| `43ff3ba` | Bestandsaufnahme: Abschnitt Folgewellen |
| `4a56d79` | `AGENTS.md` mit dem von `next dev` verwalteten Block |

Der Build-Prompt vom 01.10.2026 sah `git switch -c next16` von `main` aus vor. Nach Rückfrage gilt
Karstens Entscheidung: auf dem bestehenden Zweig weiterbauen, kein Force-Push.
1. **Grundlinie** auf `main` (`1c231f3`, 14.2.35) vor dem Merge gemessen (8.4).
2. **Merge** `main` → `next16`: `1998423`. Konflikt nur in `package.json`, die `prebuild`-Kette ist als
   Vereinigung aufgelöst: `check-mdx-nur-seiten` von next16, `verify-zahlenformat` und
   `verify-clamp-input` von main, `npm run lint` am Ende wie auf next16.
   - `next.config.mjs` ist automatisch zusammengeführt: Stand next16 mit `images.formats: ['image/webp']`
     und dem AVIF-Kommentar von main, **kein `image/avif`**.
   - In dieser Datei ist Abschnitt 6 vollständig wie auf main.
3. **Fassungen** fest auf 16.3.8: `f5674ee`.

**MDX-Workaround (`8657a71`), Ursache:** Unter Next.js 16 mit `--webpack` brach der Build an allen 20
`app/blog/*/page.mdx` ab: „You are attempting to export "metadata" from a component marked with "use
client"“.
- Next.js 16 übergibt `pageExtensions` an die Server-Components-Transformation von SWC
  (`next/dist/build/swc/options.js`).
- Die MDX-Regel von `@next/mdx` läuft über `defaultLoaders.babel`, einen SWC-Loader ohne `bundleLayer`.
  `page.mdx` gilt damit als App-Seite in der Client-Schicht. Unter 14.2.35 wurde `pageExtensions`
  nicht übergeben.
- Abhilfe: Ein `webpack`-Hook in `next.config.mjs` lässt den SWC-Schritt der MDX-Regel in der
  RSC-Schicht laufen (`bundleLayer: 'rsc'`, `esm`).
- Das trägt nur, solange MDX ausschließlich als `app/**/page.mdx` vorkommt. Das erzwingt
  `scripts/check-mdx-nur-seiten.mjs` in der Prebuild-Kette. Entfällt mit Turbopack (Abschnitt 7, Nr. 1).

### 8.2 Entscheidungen

| Punkt | Entscheidung laut Build-Prompt | umgesetzt |
|---|---|---|
| Zielfassung | `next`, `eslint-config-next`, `@next/mdx` fest 16.3.8 | ja (`f5674ee`); 16.3.6 enthielt die Korrekturen vom 30.09. nicht |
| React | `^19.2.0`, `@types` `^19` | `^19` bleibt, installiert 19.3.0 ≥ 19.2.0 (Karsten, 01.10.2026) |
| ESLint | Peer von `eslint-config-next` 16.3.8 (`>=9.0.0`) | `^9`, installiert 9.39.5 |
| Node (16-1) | erfüllt, Vercel `nodeVersion: 24.x` | unverändert; abgelesen in einer Chat-Sitzung am 01.10.2026 |
| Build-Weg (16-4) | Weg A, `--webpack` | ja (`9d657c5`) |
| `browserslist` (16-3) | Chrome/Edge/Firefox 111, Safari 16.4 | ja (`ce72d6b`) |
| Lint (16-25, 16-19) | Flat Config, Lint in der `prebuild`-Kette über `app components lib` | ja (`d576071`): `eslint . --cache` mit globalen Ignores, Geltungsbereich `app/`, `components/`, `lib/`; `npm run lint` am Ende der Kette |
| Neue Lint-Regeln | auf `"warn"` | **abweichend: `"off"`** nach Karstens Freigabe vom 28.09.2026, bestätigt am 01.10.2026 (8.3) |
| `lib/admin-session.ts` (15-2d) | `async`, `await cookies()`, `catch` → `console.error` und `false` | ja (`de1ab24`) |
| `outputFileTracingExcludes` | oberste Ebene | ja (`ef78da6`) |
| AVIF | bleibt aus | ja, nach dem Merge geprüft: `formats: ['image/webp']` |
| `AGENTS.md` | nein | **abweichend: ja** nach Karstens Freigabe vom 28.09.2026, bestätigt am 01.10.2026; ohne die Datei schreibt `next dev` seinen Block in `CLAUDE.md` |

**Installierte Fassungen** (`node_modules/<paket>/package.json`):

| Paket | Fassung |
|---|---|
| `next` | 16.3.8 |
| `react`, `react-dom` | 19.3.0 |
| `@types/react`, `@types/react-dom` | 19.3.0 |
| `eslint` | 9.39.5 |
| `eslint-config-next` | 16.3.8 |
| `@next/mdx` | 16.3.8 |

`npm install`:
- keine Peer-Warnung;
- einzige Warnung: `eslint@9.39.5` sei „no longer supported“ (Abschnitt 7, Nr. 4).

`npm audit` danach:
- `next` ist nicht mehr betroffen.
- Übrig sind 9 Meldungen (1 niedrig, 4 mittel, 4 hoch, 0 kritisch).
- Direkte Abhängigkeiten darunter: `@serwist/next` (hoch), `sharp` (hoch), `resend` (mittel).
- Diese Meldungen sind nicht Gegenstand dieser Welle.

**Code-Änderungen der Migration** (alle aus den Commits vom 28.09.2026, am 01.10.2026 am
zusammengeführten Stand nachgeprüft):
- `app/[kategorie]/[rechner]/page.tsx`, `app/[kategorie]/page.tsx`: `params` abgewartet, `generateMetadata` async, Typen über `PageProps<…>`.
- `app/social/page.tsx`: `searchParams` abgewartet.
- `lib/admin-session.ts`: `istAdminAngemeldet()` wartet `cookies()` ab.
  - Alle 5 Aufrufe warten das Ergebnis ab: `monthly-report`, `social-status`, `stats` (GET und DELETE), `tiktok/auth`.
  - Synchrone `cookies()`/`headers()`/`draftMode()` gibt es im Code nicht mehr.

Der Codemod `next-async-request-api` lief am 01.10.2026 nicht erneut, weil die Änderungen auf dem Zweig
schon standen.

**React-19-Suche** (Leitfaden react.dev, abgerufen 01.10.2026, HTTP 200; `app components lib`,
`*.ts/tsx/js/jsx/mdx`): 0 Treffer für jedes Muster:
- `propTypes`, `defaultProps`;
- Legacy Context (`contextTypes`, `childContextTypes`, `getChildContext`);
- String-Refs;
- `ReactDOM.render`/`hydrate`, `unmountComponentAtNode`, `findDOMNode`;
- `react-dom/test-utils`, `react-test-renderer`;
- `useRef()` ohne Argument;
- `element.ref`;
- globale `JSX.`-Typen.

Kein Typ-Codemod nötig.

### 8.3 Lint

| | 14.2.35 (`next lint`, main) | 16.3.8 (`eslint`, next16) |
|---|---|---|
| Fehler | 0 | 0 |
| Warnungen | 2 × `react-hooks/exhaustive-deps` | 2 × `react-hooks/exhaustive-deps` |

`react/no-unescaped-entities` = `error` (gelesen mit `eslint --print-config`).

**Probe:** `components/__lintprobe.tsx` mit `<p>Karstens "Probe"</p>` → `npx eslint` endet mit Exit 1 und
zwei Fehlern `react/no-unescaped-entities`. Die Datei ist danach entfernt und nicht committet.

**Auf `"off"`, offen für eine eigene Welle** (16 Regeln, gelesen mit `eslint --print-config`):
- `@next/next/no-html-link-for-pages`: 17 interne `<a href>` in 14 Dateien, Abschnitt 7 Nr. 2;
- `@next/next/no-location-assign-relative-destination`;
- aus `eslint-plugin-react-hooks` 7: `react-hooks/config`, `react-hooks/error-boundaries`,
  `react-hooks/gating`, `react-hooks/globals`, `react-hooks/immutability`,
  `react-hooks/incompatible-library`, `react-hooks/preserve-manual-memoization`, `react-hooks/purity`,
  `react-hooks/refs`, `react-hooks/set-state-in-effect`, `react-hooks/set-state-in-render`,
  `react-hooks/static-components`, `react-hooks/unsupported-syntax`, `react-hooks/use-memo`.

### 8.4 Build, `sw.js`, `.nft.json` gegen die Grundlinie

Grundlinie: `main` `1c231f3`, Next.js 14.2.35, `npm run build` vom 01.10.2026 (identischer Baum).
Ergebnis: `next16` nach `f5674ee`, Next.js 16.3.8 (webpack).

| | Grundlinie 14.2.35 | 16.3.8 |
|---|---|---|
| `npm run build` | grün | grün |
| Zähler „Generating static pages“ | 273 | **271** |
| Routentabelle | 70 Einträge (51 ○, 2 ●, 17 ƒ) | gleiche 70 Einträge; die beiden ●-Routen ohne eigenes Zeichen, ihre Unterpfade mit ● |
| Unterpfade `[kategorie]` / `[kategorie]/[rechner]` | `[+7 more paths]` / `[+202 more paths]` | identisch |
| Warnungen | Spritpreis-Alter; „Using edge runtime on a page …“ | dieselben, dazu **neu:** „The Edge Runtime is deprecated“ |
| `public/sw.js` | 129.488 B, `!function(){"use strict";…` | 131.366 B, `(()=>{"use strict";…`, gleiche Serwist-Kennungen |
| `.nft.json` `[kategorie]/[rechner]` | 986 Einträge | 1.064 Einträge |
| davon `public/blog/`, `public/social-videos-src/` | 257 | 257 |

**Zähler 273 → 271:** Erzeugt werden dieselben Seiten: Die Routentabelle und die Zahl der Unterpfade
sind gleich. Die Differenz von 2 entspricht den zwei dynamischen SSG-Routen. Die genaue Zählweise von
Next 14 ist nicht nachgewiesen.

**Edge Runtime:** neu als veraltet gemeldet. Betroffen sind die 5 Dateien mit `runtime = 'edge'` aus
15-3, offen für eine eigene Welle.

**`.nft.json` lokal kein Beleg.** Next 14 und 16 wenden `outputFileTracingExcludes` unter Windows nicht
an:
- `next/dist/build/collect-build-traces.js` (14.2.35, Z. 576–585) baut das Muster mit `path.join`, unter
  Windows also mit Backslashes.
- Gemessen mit dem mitgelieferten picomatch:
  - Muster `G:\Projekte\Rechenfix\public\blog\**` gegen `…\public\blog\bankjahr.mp4` → **kein**
    Treffer;
  - mit `/` → Treffer.
- Deshalb stehen die 257 Pfade schon in der Grundlinie.
- **Maßgeblich ist der Vercel-Build der Vorschau** (Linux). Läuft er auf READY, liegt die Function
  `[kategorie]/[rechner]` unter 250 MB.

**Vorschau:** READY für `02b00ec`, danach READY für `59998fd`
(Alias `rechenfix-git-next16-karsten-kautzs-projects.vercel.app`). Karstens Prüfliste für die Vorschau
ist am 01.10.2026 bestanden.

### 8.5 Serverprüfung (`npm start`, 16.3.8, lokal)

| Pfad | Status | Bytes | Anmerkung |
|---|---|---|---|
| `/` | 200 | 236.801 | |
| `/alltag/prozentrechner` | 200 | 264.844 | |
| `/finanzen/brutto-netto-rechner` | 200 | 269.460 | |
| `/finanzen/wohngeld-rechner` | 200 | 243.127 | statische Route |
| `/auto/spritkosten-rechner` | 200 | 279.059 | |
| `/blog` | 200 | 192.426 | |
| `/blog/warum-kinder-die-lohnsteuer-nicht-senken` | 200 | 335.324 | erster Artikel der Liste, MDX |
| `/social?ref=tt` | 200 | 145.319 | |
| `/tt` | 307 | 14 | → `/social?ref=tt` |
| `/opengraph-image` | 200 | 175.670 | `image/png` |
| `/sitemap.xml` | 200 | 45.830 | `application/xml` |
| `/robots.txt` | 200 | 70 | |
| `/gesundheit/herzfrequenz-rechner` | 308 | 33 | → `/sport/herzfrequenz-zonen-rechner` |
| `/api/stats` ohne Cookie | 401 | 24 | **nicht 500**; kein `[admin-session]`-Fehler im Serverprotokoll |

Antwortköpfe von `/`:
- `Content-Security-Policy: frame-ancestors 'self'`
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: origin-when-cross-origin`
- `Cross-Origin-Opener-Policy: same-origin-allow-popups`

**`verify-critical-css.mjs`: erledigt in `59998fd`.** Der erste Lauf meldete ✗ an allen 4 URLs
(`<style>` 1, Stylesheet-Links 2). Das war keine Folge der Migration.
- **Ursache:** Das Skript (24.05.2026, `96c2ead`) zählte den `<noscript>`-Ausweichblock aus
  `app/layout.tsx` mit. Der Block stammt aus W14 (08.06.2026, `90f5c84`). Die Live-Seite auf 14.2.35
  (www.rechenfix.de, 01.10.2026) zählte ebenfalls 2.
- **Korrektur:** Gezählt wird nur noch außerhalb von `<noscript>`; die Ausgabe nennt den noscript-Link
  getrennt. Vor den Abrufen läuft ein Selbsttest mit 3 präparierten HTML-Strings. Er belegt, dass ein
  zweites Stylesheet außerhalb von `<noscript>` weiter als Regression gilt.
- **Ergebnis unter 16.3.8 (`npm start`):** Selbsttest 3/3, alle 4 URLs ✓ (`<style>` 1, Stylesheet-Links
  1, dazu 1 in `<noscript>`), Exit 0.
- **Gegenprobe:** Ein Wegwerf-Server auf Port 3000 lieferte ein zweites Stylesheet außerhalb von
  `<noscript>`. Ergebnis: alle 4 URLs ✗, Exit 1. Der Seitencode blieb unberührt.

**Verify-Skripte:** `verify-zahlenformat.ts` 29/29 grün, `verify-clamp-input.ts` 13/13 grün (85 Paare,
0 Verstöße).

### 8.6 Offen für eine eigene Welle

- **Turbopack (Weg B):** entfernt den MDX-Workaround, braucht Ersatz für `@serwist/next` (Abschnitt 7,
  Nr. 1).
- **Die 16 Regeln auf `"off"`** aus 8.3 (Abschnitt 7, Nr. 2 und 3).
- **AVIF wieder einschalten,** sobald Next.js die Optimierung freigibt.
- Bei der Migration aufgefallen:
  - Edge Runtime veraltet (5 Dateien);
  - ESLint 9 nicht mehr unterstützt (Abschnitt 7, Nr. 4);
  - 9 verbliebene `npm audit`-Meldungen außerhalb von `next`.

**Erledigt:** `verify-critical-css.mjs` zählt `<noscript>` nicht mehr mit (`59998fd`, 01.10.2026, siehe
8.5).

### 8.7 Produktion bestätigt (02.10.2026)

- **Merge und Deployment:** `2a8d621` auf `main`, Produktions-Deployment
  `dpl_2PfBnJfA1FRGeoUsKzvzyaBLcWRP`. Angelegt am 01.10.2026 um 23:03:56 Uhr MESZ, READY seit 23:05:51
  Uhr MESZ, Alias `www.rechenfix.de`. Laut Vercel ist es das einzige Produktions-Deployment seit dem
  Merge, am 02.10.2026 nachgeprüft.
- **Erste Cron-Läufe darauf am 02.10.2026,** laut Vercel-Laufzeitprotokoll dieses Deployments, beide
  HTTP 200:
  - 05:00:28 UTC `GET /api/cron/social-post-tiktok`;
  - 06:00:14 UTC `GET /api/cron/health-check`. Das ist der Cron der Betriebsmeldung: versendet in
    `app/api/cron/health-check/route.ts`, Betreff `[Rechenfix KI-Check] …`, Zeitplan `0 6 * * *`.
- **Betriebsmeldung 02.10.2026:** `ki_proben=2`, `ki_fehler=0`. Das ist der erste KI-Lauf in Produktion
  unter Next.js 16.3.8. Die Berichtswache vom selben Tag meldet „Betrieb: geprueft“; ihre beiden
  Befunde zum Betrieb sind Termine (bundle.social, Spritpreise), kein Fehler.
- **Rollback:** Das Rollback-Ziel `dpl_D3GrygFnSALZeE3otewnDQSvKFPt` (`1c231f3`, 14.2.35) wird nicht mehr
  bereitgehalten.

**`npm audit`, Stand 02.10.2026 nach dem Merge:** 9 Meldungen, 0 kritisch, 4 hoch, 4 mittel, 1 niedrig.
`next` ist nicht darunter.

| Paket | Schweregrad | Art | GHSA |
|---|---|---|---|
| `@serwist/next` | hoch | direkt | keine eigene; über `browserslist` |
| `brace-expansion` | hoch | transitiv | GHSA-3jxr-9vmj-r5cp, GHSA-mh99-v99m-4gvg, GHSA-rgw5-rvv9-x895, GHSA-q2hr-2g5m-vwhr, GHSA-qhr7-859c-m2p7, GHSA-6j4f-fj2g-mc7p |
| `browserslist` | hoch | transitiv | GHSA-c83g-rgw3-j3cx, GHSA-73wf-gq98-2v4g |
| `sharp` | hoch | direkt | GHSA-f88m-g3jw-g9cj, GHSA-rgj7-g3m4-5g8c |
| `dompurify` | mittel | transitiv | GHSA-55q2-fjhq-7xh7 |
| `resend` | mittel | direkt | keine eigene; über `svix` |
| `svix` | mittel | transitiv | keine eigene; über `uuid` |
| `uuid` | mittel | transitiv | GHSA-w5hq-g745-h8pq |
| `postcss-selector-parser` | niedrig | transitiv | GHSA-w9m9-85wc-3x92 |

### 8.8 npm-Advisories geschlossen (02.10.2026)

**Ergebnis:** `npm audit` meldet 0, vorher 9 (4 hoch, 4 mittel, 1 niedrig). `npm ci` läuft auf dem neuen
Lockfile durch. Unverändert: `next` und `eslint-config-next` 16.3.8, `@next/mdx` 16.3.8, `react` und
`react-dom` 19.3.0, `eslint` 9.39.5. Welle 156 in der Wellenhistorie.

| Paket | vorher | nachher | Weg |
|---|---|---|---|
| `sharp` (eigene devDependency) | 0.34.5 | 0.35.5 | `package.json` `^0.34.5` → `^0.35.5`; jetzt eine einzige Kopie, `next` nutzt sie mit (`deduped`) |
| `sharp` (unter `next`) | 0.35.5 | 0.35.5 | unverändert |
| `browserslist` | 4.28.6 | 4.29.3 | `overrides`; eine einzige Kopie für `@serwist/next`, `@serwist/utils`, `update-browserslist-db` und `@babel/helper-compilation-targets` |
| `@serwist/next` | 9.5.12 | 9.5.12 | Meldung entfällt mit dem Override |
| `brace-expansion` (unter `minimatch` 3.1.5, `eslint`) | 1.1.13 | 1.1.21 | `npm audit fix` |
| `brace-expansion` (zweimal unter `minimatch` 10.2.6 über `glob` 13.0.6, `@serwist/build` und `@serwist/next`) | 5.0.9 | 5.0.12 | `npm audit fix` |
| `brace-expansion` (unter `typescript-eslint`) | 5.0.12 | 5.0.12 | war nicht betroffen |
| `dompurify` (optional unter `jspdf` 4.2.1) | 3.4.12 | 3.4.16 | `npm audit fix` |
| `postcss-selector-parser` (unter `tailwindcss`, `postcss-nested`) | 6.1.2 | 6.1.4 | `npm audit fix` |
| `resend` | 6.10.0 | 6.32.0 | `npm audit fix`, im Bereich `^6` |
| `svix` | 1.88.0 | entfällt | `resend` 6.32.0 hängt nicht mehr von `svix` ab |
| `uuid` | 10.0.0 | entfällt | kam nur über `svix` |

**Entscheidungen:**
1. **`npm audit fix` ohne `--force`.** Mit `--force` hätte npm `@serwist/next` auf 9.4.1 zurückgestuft
   und `sharp` als Hauptversionssprung behandelt. Beides ist nicht nötig: Alle übrigen Behebungen liegen
   im Rahmen der vorhandenen Bereiche.
2. **`sharp` als devDependency auf `^0.35.5`.** Die eigene Kopie diente nur `scripts/titelbilder-verkleinern.mjs`.
   Der Bildoptimierer nutzte schon vorher die gepatchte Kopie unter `next` (0.35.5). Mit dem Anheben
   bleibt eine einzige Fassung.
3. **`overrides` für `browserslist` (`^4.29.3`).** `@serwist/next` 9.5.12 pinnt genau 4.28.6 und ist die
   neueste Fassung. `browserslist` läuft nur im Build und nur mit der eigenen Konfiguration; das
   Override schließt die Meldung trotzdem, damit jede neue sofort auffällt. Termin
   `serwist-browserslist-override` am 02.11.2026: Verlangt eine neuere `@serwist/next` selbst ≥ 4.28.7,
   fällt das Override weg.

**Geprüft:**
- Build grün, 271 Seiten, nur die bekannten Warnungen. `public/sw.js` lokal 131.366 B, live vor dem
  Deployment 130.543 B.
- `sharp` 0.35.5 (vips 8.18.7) wandelt `public/about/karsten-kautz-v3.webp` (590×800) in eine PNG mit
  590×800.
- Lokaler Server (`npm start`): `/` 200, `/_next/image?url=%2Fabout%2Fkarsten-kautz-v3.webp&w=640&q=75`
  200 mit `image/webp`, `/sw.js` 200, `/api/stats` ohne Cookie 401.

**Verwendungen:**
- `resend` nur über `resend.emails.send` in fünf Routen (`health-check`, `social-post`, `social-post-tiktok`,
  `feedback`, `monthly-report`). `webhooks` und `svix` kommen im Code nicht vor.
- `jspdf` wird in `ErgebnisAktionen` (200 Rechner, Knopf „Als PDF speichern“ immer sichtbar) sowie im
  Brutto-Netto- und im MwSt-Rechner dynamisch geladen. `jsPDF.html()`, für das `dompurify` gebraucht
  würde, wird nicht aufgerufen.

**Reste:** keine. Ob `resend` 6.32.0 trägt, zeigt die Betriebsmeldung am Folgetag.

---

## Anhang A — Dateien mit `next/link` (36)

Suchmuster `from ['"]next/link['"]` in `app/`, `components/`, `lib/`:

`app/[kategorie]/[rechner]/page.tsx`, `app/[kategorie]/page.tsx`, `app/aktualisierungen/page.tsx`,
`app/barrierefreiheit/page.tsx`, `app/blog/layout.tsx`, `app/blog/page.tsx`,
`app/datenschutz/page.tsx`, `app/finanzen/brutto-netto-tabelle/page.tsx`,
`app/finanzen/mindestlohn-netto/page.tsx`, `app/finanzen/wohngeld-rechner/page.tsx`,
`app/ki-rechner/KiRechnerClient.tsx`, `app/ki-transparenz/page.tsx`, `app/not-found.tsx`,
`app/offline-nutzung/page.tsx`, `app/offline/page.tsx`, `app/page.tsx`, `app/qualitaet/page.tsx`,
`app/social/page.tsx`, `app/ueber-uns/page.tsx`, `app/wuerdezeit-mcp/page.tsx`,
`components/AuthorBio.tsx`, `components/blog/BlogHinweis.tsx`, `components/blog/BlogTeaser.tsx`,
`components/layout/Breadcrumbs.tsx`, `components/layout/Footer.tsx`, `components/layout/Header.tsx`,
`components/layout/MegaMenuContent.tsx`, `components/rechner/BalkonSolarRechner.tsx`,
`components/rechner/GeburtsterminRechner.tsx`, `components/rechner/KuendigungsfristRechner.tsx`,
`components/rechner/MutterschutzRechner.tsx`, `components/rechner/RentenRechner.tsx`,
`components/seo/BruttoNettoLongTail.tsx`, `components/seo/StandardBruttoNettoBlock.tsx`,
`components/ui/CrossLink.tsx`, `components/ui/TippDesTages.tsx`.
