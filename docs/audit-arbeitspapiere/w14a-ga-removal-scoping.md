# W14 Track A — GA-Removal Scoping-Report

**Stand:** 19.05.2026 (Phase 1)
**Trigger:** AdSense-Ablehnung 19.05.26 wegen „minderwertige Inhalte" → GA komplett raus, Vercel Analytics rein.

---

## Such-Pattern (Phase 1)

Globale Suche im Produktiv-Tree (Worktrees `.claude/worktrees/**` ausgeschlossen) nach:

- `gtag`, `dataLayer`, `googletagmanager`, `google-analytics`, `analytics.google`
- `NEXT_PUBLIC_GA`, `GA_ID`
- `G-[A-Z0-9]{8,}` (GA4-Measurement-ID-Format)
- „Google Analytics" (Textsuche in Datenschutz)

---

## Treffer-Inventar nach Kategorie

### 1. GA-Script-Loader

**[components/cookie/ConsentScripts.tsx](components/cookie/ConsentScripts.tsx)** — geteilte Komponente mit GA + AdSense

| Zeile | Inhalt | Aktion |
|---|---|---|
| 6 | `const GA_ID = process.env.NEXT_PUBLIC_GA_ID \|\| 'G-CNVMHDZM4S';` | **Löschen** |
| 10 | `const { analyticsAllowed, marketingAllowed } = useCookieConsent();` | **`analyticsAllowed` raus**, `marketingAllowed` behalten (AdSense) |
| 14–33 | Kompletter `{analyticsAllowed && (…)}`-Block mit `googletagmanager.com/gtag/js` + `ga4-init` Inline-Script | **Komplett löschen** |
| 35–42 | AdSense-Block | **Bleibt unverändert** |

**Anmerkung:** Komponente NICHT löschen — sie hostet auch den AdSense-Loader. Nur den GA-Block rausziehen. Datei könnte später in `AdSenseScript.tsx` umbenannt werden — nicht im Scope dieses Prompts.

**[app/layout.tsx](app/layout.tsx)** Z. 16 + Z. 113

`import ConsentScripts` und `<ConsentScripts />` bleiben unverändert (AdSense bleibt darüber geladen).

---

### 2. Cookie-Banner: GA-Toggle + Consent-Logik

**[components/cookie/CookieBanner.tsx](components/cookie/CookieBanner.tsx)**

| Zeile | Inhalt | Aktion |
|---|---|---|
| 9 | `const [analytics, setAnalytics] = useState(false);` | **Löschen** |
| 15 | `setAnalytics(consent?.analytics ?? false);` (in `useEffect`) | **Löschen** |
| 20 | `acceptAll = () => saveConsent({ analytics: true, marketing: true });` | **Umstellen** auf `{ marketing: true }` |
| 21 | `acceptNecessary = () => saveConsent({ analytics: false, marketing: false });` | **Umstellen** auf `{ marketing: false }` |
| 22 | `saveSelection = () => saveConsent({ analytics, marketing });` | **Umstellen** auf `{ marketing }` |
| 100–107 | `<CookieToggle label="Analyse-Cookies (Google Analytics)" …>` | **Komplett löschen** |
| 110–116 | Marketing-Toggle — Description erwähnt „Erfassung von Affiliate-Klicks in Google Analytics" | **Description kürzen** auf nur AdSense + Amazon-Tag |

**[components/cookie/CookieConsentProvider.tsx](components/cookie/CookieConsentProvider.tsx)**

| Zeile | Inhalt | Aktion |
|---|---|---|
| 7 | `analytics: boolean;` (in `CookieConsent`-Interface) | **Löschen** |
| 15 | `analyticsAllowed: boolean;` (in Context-Type) | **Löschen** |
| 32 | `analyticsAllowed: false,` (Default-Value im Context) | **Löschen** |
| 81 | `saveConsent(partial: Omit<CookieConsent, 'necessary' \| 'timestamp'>)` | **Signatur bleibt** (Partial-Type wird automatisch enger durch Z.7) |
| 84 | `analytics: partial.analytics,` (in `full`-Objekt) | **Löschen** |
| 121 | `analyticsAllowed: consent?.analytics ?? false,` | **Löschen** |

**Migrations-Hinweis:** Alte `localStorage`-Einträge mit `analytics: true/false`-Feld werden durch `JSON.parse` ohne Schaden eingelesen — das überzählige Feld wird stillschweigend ignoriert. **Kein Migrations-Code nötig.**

---

### 3. Datenschutzerklärung: GA-Abschnitt

**[app/datenschutz/page.tsx](app/datenschutz/page.tsx)**

| Zeile | Inhalt | Aktion |
|---|---|---|
| 29 | „Stand: April 2026" | **Auf „Mai 2026" anheben** (Commit 1) |
| 45 | Übersicht: „Analyse des Nutzerverhaltens (nur nach Einwilligung)" | **Löschen** in Commit 1; in Commit 2 ersetzen durch „Anonyme Reichweitenmessung (cookielos, ohne Einwilligung)" |
| 59 | Abschnitt 3: „Für den Einsatz von Google Analytics, Google AdSense und nicht-essenzielle Cookies" | **Auf „Google AdSense und nicht-essenzielle Cookies"** kürzen |
| 137–140 | Tabelle 6.3 Zeile „Analyse — Google Analytics 4 — Art. 6 Abs. 1 lit. a" | **Komplette `<tr>` löschen** in Commit 1; in Commit 2 neue Zeile „Reichweitenmessung — Vercel Analytics — Art. 6 Abs. 1 lit. f DSGVO" |
| 151–169 | **Abschnitt 7 „Google Analytics 4"** — komplette `<Section nr="7">` | **Komplett löschen** in Commit 1; in Commit 2 durch neuen Abschnitt „Vercel Analytics" ersetzen (cookielos, anonym, kein Personenbezug) |
| 230 | Abschnitt 9 (Affiliate): „Sofern Sie der Nutzung von Google Analytics zugestimmt haben, wird der Klick zusätzlich als Analytics-Event erfasst." | **Satz ersatzlos löschen** |
| Abschnitt-Nummerierung | Nr. 7 wird frei, Nr. 8 (AdSense), 9, 9a, 9b, 10–14 folgen | **Renumerierung NICHT nötig**, weil Abschnitt 7 in Commit 2 wieder durch Vercel Analytics belegt wird |

---

### 4. gtag-Event-Calls in Komponenten

**[components/AffiliateBox.tsx](components/AffiliateBox.tsx)** Z. 353–365

```ts
// GA-Event nur mit Marketing-Consent
if (marketingAllowed) {
  const w = window as any;
  if (typeof window !== 'undefined' && w.gtag) {
    w.gtag('event', 'affiliate_click', { … });
  }
}
```

**Aktion:** Block komplett löschen. **WICHTIG:** Der serverseitige `fetch('/api/track', …)` (Z. 340–351) bleibt unverändert — das ist die Upstash-Redis-Klickerfassung (siehe Datenschutz § 9, 9a), unabhängig von GA.

**Side-Effect-Check:** `marketingAllowed` wird im `useCallback`-Dep-Array (Z. 366) genutzt. Wenn der gtag-Block weg ist, ist `marketingAllowed` in der Funktion nicht mehr referenziert → Dep wird unnötig → entfernen aus Dep-Array, sonst ESLint-Warning. Ggf. auch `useCookieConsent()`-Aufruf prüfen (greife auf nur `marketingAllowed` zu, ist u.U. überflüssig nach dem Cleanup).

**[components/AmazonBox.tsx](components/AmazonBox.tsx)** Z. 54–66

Identisches Pattern wie AffiliateBox. Analog komplett löschen, `marketingAllowed` aus Dep-Array (Z. 67) entfernen, `useCookieConsent()`-Aufruf prüfen.

**Hinweis:** `marketingAllowed` wird bei AmazonBox auch im Render-Pfad für den Amazon-Tag-Anhang gebraucht (siehe [lib/amazon-link.ts](lib/amazon-link.ts) — `createAmazonSearchLink(keyword, marketingConsentGranted)`). Hook-Aufruf bleibt also drin, nur der gtag-Block geht.

---

## Env-Variablen (Phase 4 — Karsten manuell)

| Variable | Default-Fallback | Verwendung | Aktion |
|---|---|---|---|
| `NEXT_PUBLIC_GA_ID` | `'G-CNVMHDZM4S'` | nur in `ConsentScripts.tsx` Z. 6 | **In Vercel Project Settings löschen** (Phase 4, Punkt 2) |

Keine weitere Env-Var betroffen.

---

## Doku-Erwähnungen (Phase 3 — Commit 3 + Karsten Phase 4)

Folgende Markdown-Dateien erwähnen Google Analytics. Code-irrelevant, aber für Doku-Konsistenz nach W14-Track-A relevant:

| Datei | Stellen | Wann |
|---|---|---|
| `CLAUDE.md` | 1 Treffer („Google Analytics"-Suche), genaue Stelle bei Doku-Phase verifizieren | Phase 4 Karsten (Prompt-Punkt 5) |
| `rechenfix-projekt-referenz.md` | 1 Treffer, dito | Phase 4 Karsten (Prompt-Punkt 5) |
| `docs/amazon-integration.md` | 1 Treffer im Marketing-Cookie-Description-Kontext, dito | Phase 3 Commit 3 (Track-A-Doku-Update) |
| `docs/audit-arbeitspapiere/welle-status-historie.md` | neuer W14-Track-A-Eintrag | Phase 3 Commit 3 |

**Optional / Historisches Artefakt:** `affiliate-prompts/prompt-08-affiliate-click-tracking.md` enthält den Original-Spec für die GA-Event-Calls in AffiliateBox/AmazonBox. **Nicht ändern** — historische Dokumentation der damaligen Entscheidung. Wer das nachliest, soll sehen, dass die Calls absichtlich da waren und durch W14 Track A entfernt wurden.

---

## False Positives (ignoriert)

- `package-lock.json` — `has-tostringtag`, `es-set-tostringtag` (NPM-Subpackages, kein GA-Bezug)
- `lib/rechner-config/gesundheit.ts` — Worttreffer „Eisprungtag", „Stichtag", „Tag" im Zyklus-Erklärtext
- `scripts/verify-*.ts` — Test-Tag-Namen `GA-FACTOR`, `BG-STICHTAG`, `MJ-AG-PARITAET` (Identifier in Verify-Cases, keine GA-IDs)
- `docs/audit-arbeitspapiere/welle1-stufe4*.md` — analoge Test-Tag-Namen in Audit-Berichten
- `docs/audit-arbeitspapiere/welle14-*.md` — die Prompts selbst und deren Vorgängerfassung
- `.claude/worktrees/**` — Worktree-Spiegel des Produktiv-Trees, nicht zu touchen

---

## Soll-Bild nach Phase 2

**Commit 1 (`chore: remove google analytics (datenschutz)`):**
- 5 Dateien geändert: `ConsentScripts.tsx`, `CookieBanner.tsx`, `CookieConsentProvider.tsx`, `AffiliateBox.tsx`, `AmazonBox.tsx`
- 1 Datei geändert (Doku): `app/datenschutz/page.tsx` (GA-Abschnitt, Tabellenzeile, Übersicht-Bullet, Rechtsgrundlagen-Satz, Klick-Event-Hinweis)
- Stand-Datum in Datenschutz auf „Mai 2026"
- **Erwartung:** `npm run build` grün, 205/205 Tests grün, `grep -r "gtag\|GA_ID\|google-analytics\|googletagmanager" --include="*.ts" --include="*.tsx"` liefert 0 Treffer im Produktiv-Code

**Commit 2 (`feat: add vercel analytics (privacy-friendly)`):**
- `npm install @vercel/analytics`
- `app/layout.tsx`: Import + `<Analytics />` vor `</body>`
- `app/datenschutz/page.tsx`: neuer Abschnitt 7 „Vercel Analytics" + Tabellenzeile + Übersichts-Bullet
- **Erwartung:** `npm run build` grün, neue Devtools-Network-Anfragen auf `/_vercel/insights/*` sichtbar

**Commit 3 (`docs: welle 14 track a ga-entfernung dokumentiert`):**
- `docs/audit-arbeitspapiere/welle-status-historie.md`: neuer W14-Track-A-Block (Datum, Anlass, Diff-Liste aus diesem Scoping, Vercel-Setup-Schritte, L-Lehren falls neu)
- `docs/amazon-integration.md`: GA-Erwähnung auf Vercel angepasst oder gestrichen

---

## STOP — Karsten bestätigt Scoping vor Phase 2

Sieht das Inventar vollständig aus? Insbesondere:
- (a) Soll der Marketing-Toggle in CookieBanner.tsx den Hinweis „Affiliate-Klicks in Google Analytics" ersatzlos verlieren, oder durch einen Verweis auf die serverseitige Klickerfassung (Upstash) ersetzen?
- (b) Soll der Datenschutz-Abschnitt 7 in **demselben** Commit 1 entfernt werden (dann wäre die Site kurzzeitig ohne Analytics-Doku) oder ist das im Bundle mit Commit 2 (Vercel Analytics) okay, weil Commit 1 + 2 zeitnah hintereinander gepusht werden?
- (c) Soll die GA-Event-Logik in AffiliateBox/AmazonBox durch eine Vercel-Analytics-`track()`-Custom-Event-Variante ersetzt werden, oder reicht der bestehende serverseitige `/api/track`-Fetch zur Klickerfassung?
