# W14 Track B — Amazon-Removal Scoping-Report

**Stand:** 19.05.2026 (Phase 1)
**Trigger:** AdSense-Ablehnung 19.05.26 — Hypothese: Affiliate-Dichte (insb. Amazon-Disclosure-Footer + 16 AmazonBoxen) als Primärsignal für AdSense-Klassifikator „minderwertige Inhalte". Strategie: sämtliche Amazon-Affiliate-Integration entfernen.

**Goldene Regel:** **KEINE AWIN-Änderungen.** Die `affiliate`-Property in `lib/rechner-config/*` steuert AWIN-Programme und bleibt unangetastet.

---

## Such-Pattern (Phase 1)

- `amazonProducts` (RechnerConfig-Property)
- `AmazonBox` (Component-Name + Import)
- `amzn.to`, `amazon.de`, `amazon.com`, `rechenfix-21`, `tag=`, `partner-tag`
- Image-Domain: `m.media-amazon.com`, `images-amazon.com`, `images-na.ssl-images-amazon.com`
- Env-Vars: `AMAZON_PARTNER_TAG`, `AMAZON_AFFILIATE`, `NEXT_PUBLIC_AMAZON`
- Pflicht-Footer-Text: „Als Amazon-Partner verdiene ich"

---

## Treffer-Inventar nach Kategorie

### A. Component & Helper

| Datei | Zweck | Aktion |
|---|---|---|
| [components/AmazonBox.tsx](components/AmazonBox.tsx) | 105 Z., Box-Component mit Suchlink + Click-Tracking (inkl. gtag-Resttreffer aus Track A) | **Datei löschen** (Commit 1) |
| [lib/amazon-link.ts](lib/amazon-link.ts) | 34 Z., `AMAZON_TAG = 'rechenfix-21'` + `createAmazonSearchLink(keyword, consent)` | **Datei löschen** (Commit 2) |

### B. Component-Files mit hartkodiertem `<AmazonBox>`-JSX (11 Files)

Diese Components rendern AmazonBox direkt im JSX statt über `config.amazonProducts`. Alle entstanden vor W14.A oder wurden nicht migriert.

| Component | Import-Zeile | JSX-Zeile | Slug-Kategorie |
|---|---|---|---|
| [components/rechner/BackformUmrechner.tsx](components/rechner/BackformUmrechner.tsx) | Z. 9 | Z. 197 | Kochen |
| [components/rechner/BackzeitRechner.tsx](components/rechner/BackzeitRechner.tsx) | Z. 10 | Z. 256 | Kochen |
| [components/rechner/BrotbackRechner.tsx](components/rechner/BrotbackRechner.tsx) | Z. 9 | Z. 379 | Kochen |
| [components/rechner/FahrradRahmenRechner.tsx](components/rechner/FahrradRahmenRechner.tsx) | Z. 11 | Z. 132 | Sport |
| [components/rechner/HerzfrequenzZonenRechner.tsx](components/rechner/HerzfrequenzZonenRechner.tsx) | Z. 10 | Z. 214 | Sport |
| [components/rechner/KochzeitRechner.tsx](components/rechner/KochzeitRechner.tsx) | Z. 8 | Z. 359 | Kochen |
| [components/rechner/MalerkostenRechner.tsx](components/rechner/MalerkostenRechner.tsx) | Z. 10 | Z. 213 | Wohnen |
| [components/rechner/PaceRechner.tsx](components/rechner/PaceRechner.tsx) | Z. 10 | Z. 368 | Sport |
| [components/rechner/PizzateigRechner.tsx](components/rechner/PizzateigRechner.tsx) | Z. 9 | Z. 236 | Kochen |
| [components/rechner/RezeptUmrechner.tsx](components/rechner/RezeptUmrechner.tsx) | Z. 7 | Z. 335 | Kochen |
| [components/rechner/TapetenbedarfRechner.tsx](components/rechner/TapetenbedarfRechner.tsx) | Z. 10 | Z. 270 | Wohnen |

**Aktion (Commit 1):** Pro Component: `import { AmazonBox } from '@/components/AmazonBox';` entfernen + JSX-Block `<AmazonBox … />` entfernen.

### C. Page-Renderer

[app/[kategorie]/[rechner]/page.tsx](app/[kategorie]/[rechner]/page.tsx)

| Zeile | Inhalt | Aktion |
|---|---|---|
| 11 | `import { AmazonBox } from '@/components/AmazonBox';` | **Entfernen** (Commit 1) |
| 590–598 | `{/* Amazon-Partner-Boxen ... */}` Renderer-Block mit `config.amazonProducts?.map(...)` | **Komplett entfernen** (Commit 1, gehört thematisch zur AmazonBox-Entfernung) |

### D. lib/rechner-config — `amazonProducts`-Blöcke (5 Configs, 5 Rechner)

| Datei | Zeile | Rechner-Slug | Keywords |
|---|---|---|---|
| [lib/rechner-config/alltag.ts](lib/rechner-config/alltag.ts) | 885–887 | umzug | `umzugskartons 30 stück` |
| [lib/rechner-config/arbeit.ts](lib/rechner-config/arbeit.ts) | 93–95 | arbeitszeit | `zeiterfassung stempeluhr` |
| [lib/rechner-config/arbeit.ts](lib/rechner-config/arbeit.ts) | 393–395 | pendlerpauschale | `handyhalterung auto` |
| [lib/rechner-config/auto.ts](lib/rechner-config/auto.ts) | 116–118 | spritkosten | `kraftstoffzusatz` |
| [lib/rechner-config/wohnen.ts](lib/rechner-config/wohnen.ts) | 324–326 | heizkosten | `heizkörperthermostat` |

**Aktion (Commit 2):** Alle 5 `amazonProducts: [...]`-Blöcke entfernen (`affiliate`-Properties darüber bleiben unverändert).

**Discovery:** Laut [docs/amazon-integration.md](docs/amazon-integration.md) waren 16 Rechner mit AmazonBox geplant. Tatsächlich liegen 11 als hartkodiertes JSX in Components + 5 als `amazonProducts` in Configs = 16 ✓. Die geplante W14.A-Migration aller 16 auf das Config-Pattern wurde nicht abgeschlossen — was uns hier nicht stört, weil beide Pfade in Commit 1+2 ohnehin verschwinden.

### E. Type-Definition

[lib/rechner-config/types.ts](lib/rechner-config/types.ts)

| Zeile | Inhalt | Aktion |
|---|---|---|
| 16–26 | `interface AmazonProductConfig { keyword; headline?; description? }` + JSDoc-Kommentar | **Komplett entfernen** (Commit 2) |
| 51–56 | `amazonProducts?: AmazonProductConfig[]` in `RechnerConfig` + JSDoc | **Komplett entfernen** (Commit 2) |

### F. Datenschutzerklärung — [app/datenschutz/page.tsx](app/datenschutz/page.tsx)

| Zeile | Inhalt | Aktion |
|---|---|---|
| 220–222 | Abschnitt 9 — Verweis-Satz „Zusätzlich nehmen wir am **Amazon Partner-Programm** … teil. Weitere Details dazu in Abschnitt 9b." | **Komplett entfernen** (Commit 3) |
| 234–251 | **Abschnitt 9b „Amazon-Partnerprogramm"** — komplette `<Section nr="9b">` mit fünf `<p>`-Blöcken (Tag-Erklärung, Suchlink-Mechanik, Consent-Logik, Verweis auf Amazon-Datenschutz, Rechtsgrundlage) | **Komplett entfernen** (Commit 3) |

**Renumerierung:** Nicht nötig. Bestand danach: 9 (Affiliate-Awin), 9a (Upstash), 10–14 (Kontakt, Rechte, etc.). Abschnitt 9b einfach weg, kein nachfolgender Block springt nach oben.

**Stand-Datum:** „Mai 2026" wurde bereits in Track A gesetzt — kein Update nötig.

### G. Cookie-Banner — [components/cookie/CookieBanner.tsx](components/cookie/CookieBanner.tsx)

| Zeile | Inhalt | Aktion |
|---|---|---|
| 99–104 | Marketing-Toggle Description: „Ermöglichen die Anzeige personalisierter Werbung über Google AdSense sowie das Setzen des Amazon-Partner-Tags (rechenfix-21) für die Zuordnung von Käufen aus dem Amazon-Partnerprogramm." | **Description bereinigen** auf reinen AdSense-Text (Commit 3) |

### H. Footer — [components/layout/Footer.tsx](components/layout/Footer.tsx)

| Zeile | Inhalt | Aktion |
|---|---|---|
| 152 | Block-Kommentar `{/* Copyright + Amazon-Partner-Pflichthinweis */}` | **Kommentar auf „Copyright" kürzen** (Commit 3) |
| 153 | `<div className="border-t border-primary-600 dark:border-gray-800 py-5 text-center text-primary-300 dark:text-gray-500 text-sm space-y-1">` (`space-y-1` schafft Abstand zwischen Copyright und Amazon-Hinweis) | **`space-y-1` entfernen** (nur noch ein `<p>` übrig, kein Spacing nötig) |
| 155–157 | `<p className="text-xs text-primary-400 dark:text-gray-600">Als Amazon-Partner verdiene ich an qualifizierten Verkäufen.</p>` | **Komplett entfernen** (Commit 3) |

### I. Infrastruktur — `next.config.mjs`

**Befund:** [next.config.mjs](next.config.mjs) konfiguriert KEINE Amazon-Image-Domain in `images.domains` / `images.remotePatterns` (überhaupt keine externen Domains konfiguriert). **Kein Cleanup nötig.**

### J. Env-Variablen (Phase 4 — Karsten manuell)

**Befund:** Keine Treffer für `AMAZON_PARTNER_TAG`, `AMAZON_AFFILIATE`, `NEXT_PUBLIC_AMAZON` im Produktiv-Code. Der Tag ist hartkodiert in `lib/amazon-link.ts` (`AMAZON_TAG = 'rechenfix-21'`), nicht über Env-Var konfigurierbar. **Vercel hat vermutlich auch keine Amazon-Env-Var** — bitte trotzdem prüfen.

### K. Test-/Verify-Scripts

**Befund:** `grep amazon scripts/` → keine Treffer. Keine Amazon-spezifischen Verify-Scripts vorhanden. Validation-Sweep [docs/audit-arbeitspapiere/validation-affiliate-konsistenz.md](docs/audit-arbeitspapiere/validation-affiliate-konsistenz.md) erwähnt Amazon im Soll-Wert-Kontext (133 = 117 AffiliateBox + 16 AmazonBox) — Sweep läuft historisch, bleibt als Doku.

### L. Doku-Erwähnungen

**Hart zu pflegende Doku (Commit 3, im Track-B-Scope):**

| Datei | Stellen | Aktion |
|---|---|---|
| [CLAUDE.md](CLAUDE.md) | Z. 42–49 großer „Amazon Partner-Programm"-Abschnitt + Z. 487 + Z. 716 Streukommentare + Z. 2224 (Gutschein-Erklärtext „Amazon, REWE" = **bleibt**, kein Affiliate-Bezug) | Z. 42–49 komplett raus, Z. 487/716 prüfen und Streukommentare bereinigen |
| [rechenfix-projekt-referenz.md](rechenfix-projekt-referenz.md) | Z. 83 (lib/amazon-link), Z. 283 (Prompt-122-Block), Z. 285–288 (Rechtsbasis-Bullets), Z. 565–568 (Tabelle Tag-ID), Z. 695–697 (Rechtliche-Basics-Block) | Alle Amazon-Stellen raus oder als „bis 19.05.2026 aktiv, entfernt mit W14-Track-B" markieren |
| [docs/amazon-integration.md](docs/amazon-integration.md) | 113 Z. komplette Datei | **Komplette Datei löschen** (Commit 3) |

**Skill-Files (außerhalb Track-B-Scope, separater Workflow):**

| Datei | Stellen | Aktion |
|---|---|---|
| [.claude/skills/rechner-builder/SKILL.md](.claude/skills/rechner-builder/SKILL.md) | Z. 1234–1281 Amazon-Section, Z. 1597, 1638, 1665, 1673 Verweise | **Nicht im Track-B-Code-Commit** — Skill-Files brauchen separaten manuellen Sync ins Claude.ai-Skills-UI (Memory-Pflicht). Empfehlung: nach Track B als eigenen Doku-Sync-Prompt fahren |
| [.claude/skills/rechner-builder/references/templates.md](.claude/skills/rechner-builder/references/templates.md) | Z. 230, 237, 244, 247 | Dito |
| [.claude/skills/rechner-builder/references/checklist.md](.claude/skills/rechner-builder/references/checklist.md) | Z. 83 | Dito |

**Historische Audit-Doku (nicht ändern):**

- [docs/audit-arbeitspapiere/welle-status-historie.md](docs/audit-arbeitspapiere/welle-status-historie.md) — viele Erwähnungen, alle historisch. W14-Track-A-Block (Z. 24/59/64) erwähnt Track B antizipierend — bleibt
- [docs/audit-arbeitspapiere/welle15-adsense-tiefenanalyse-dossier.md](docs/audit-arbeitspapiere/welle15-adsense-tiefenanalyse-dossier.md) Z. 163 — Tiefenanalyse, historisches Dokument
- [docs/audit-arbeitspapiere/validation-affiliate-konsistenz.md](docs/audit-arbeitspapiere/validation-affiliate-konsistenz.md) — Validation-Sweep, historisches Dokument
- [docs/audit-arbeitspapiere/scoping-w14-a-1.md](docs/audit-arbeitspapiere/scoping-w14-a-1.md) — Scoping für W14.A, historisches Dokument
- Mehrere `welle14-*-prompt.md` — historische Prompts, bleiben

### M. Memory

**Befund:** [C:\Users\a-reino\.claude\projects\G--Projekte-Rechenfix\memory\MEMORY.md](file:///C:/Users/a-reino/.claude/projects/G--Projekte-Rechenfix/memory/MEMORY.md) und das einzige andere Memory-File (`feedback_push_after_green.md`) enthalten **keine** Amazon-Erwähnungen. Der Prompt-Hinweis „Memory-Edit: AmazonBox-Erwähnung im W13-Goldstandard-Eintrag" findet keine Entsprechung im aktuellen Memory-State — entweder bereits gestrichen oder bezog sich auf eine andere Session. **Karstens Phase-4-Punkt 3 ist faktisch erledigt.**

---

## False Positives (ignoriert)

- `lib/berechnungen/abo.ts` Z. 23 + `lib/berechnungen/streaming-kosten.ts` Z. 28 — „Amazon Prime" als Streaming-Service-Eintrag (Kostenposition für den Abo-Rechner). KEIN Affiliate-Bezug, bleibt
- `CLAUDE.md` Z. 2224 — „Warengutscheine (Amazon, REWE)" im Sachbezug-Erklärtext. KEIN Affiliate-Bezug, bleibt
- `node_modules/svix/**` — AWS-S3-Konfig im Drittpaket, irrelevant
- `.claude/worktrees/**` — Worktree-Spiegel
- `brutto-netto-raw.html` — lokale Raw-Datei mit Pflicht-Footer-Hinweis als HTML-Snapshot (untracked) — wird nicht committed, bleibt unverändert
- `affiliate-prompts/prompt-08-affiliate-click-tracking.md` — historisches Doku-Artefakt, bleibt

---

## Commit-Plan Phase 2 + 3

### Commit 1 — `chore: remove amazon box component`
**Files:** 12 Components + 1 Page-Renderer + 1 Component-Datei-Löschung
- 11 Component-Files (Abschnitt B): Import + JSX raus
- [app/[kategorie]/[rechner]/page.tsx](app/[kategorie]/[rechner]/page.tsx) Z. 11 Import + Z. 590–598 Renderer-Block raus
- [components/AmazonBox.tsx](components/AmazonBox.tsx) löschen

**Erwartung:** `npm run build` 205/205 grün, `grep -rn "AmazonBox" components/ app/` liefert 0 Treffer

### Commit 2 — `chore: remove amazonProducts from rechner configs`
**Files:** 5 Config-Files + 1 Type-File + 1 Helper-Löschung
- 5× `amazonProducts: [...]`-Blöcke (Abschnitt D)
- [lib/rechner-config/types.ts](lib/rechner-config/types.ts): `AmazonProductConfig`-Interface + `amazonProducts`-Property weg
- [lib/amazon-link.ts](lib/amazon-link.ts) löschen

**Erwartung:** Build grün, `grep -rn "amazonProducts\|amazon-link\|AMAZON_TAG\|createAmazonSearchLink" lib/ app/ components/` liefert 0 Treffer

### Commit 3 — `chore: remove amazon references from infra & docs`
**Files:** 4 Code/Doku + 1 Doku-Löschung
- [app/datenschutz/page.tsx](app/datenschutz/page.tsx): Abschnitt 9b komplett + Verweis-Satz in Abschnitt 9 raus
- [components/cookie/CookieBanner.tsx](components/cookie/CookieBanner.tsx): Marketing-Description bereinigen
- [components/layout/Footer.tsx](components/layout/Footer.tsx): Pflicht-Hinweis + `space-y-1` raus, Kommentar kürzen
- [CLAUDE.md](CLAUDE.md): Amazon-Sektion Z. 42–49 + Streukommentare raus
- [rechenfix-projekt-referenz.md](rechenfix-projekt-referenz.md): alle Amazon-Stellen raus
- [docs/amazon-integration.md](docs/amazon-integration.md): Datei komplett löschen

**Erwartung:** Build grün; Site hat keine Amazon-Pflicht-Werbekennzeichnung und keinen Disclosure-Abschnitt mehr.

### Commit 4 — `docs: welle 14 track b amazon-removal dokumentiert`
**Files:** 1 Doku
- [docs/audit-arbeitspapiere/welle-status-historie.md](docs/audit-arbeitspapiere/welle-status-historie.md): neuer W14-Track-B-Block mit Datum, Anlass, Commit-Aufstellung, L-Lehren (Anzahl betroffener Configs/Components aus Scoping)

---

## STOP — Karsten bestätigt Scoping vor Phase 2

**Klärungsfragen:**

1. **Skill-Files-Scope:** Sollen die Updates an `.claude/skills/rechner-builder/SKILL.md` + `templates.md` + `checklist.md` (Abschnitt L „Skill-Files") in Commit 3 mit rein, oder lieber als separater Sync-Prompt nach Track B, weil die Skill-Files ohnehin manuell ins Claude.ai-Skills-UI synchronisiert werden müssen?

2. **rechenfix-projekt-referenz.md Stil:** Sollen die Amazon-Stellen in der Projekt-Referenz **komplett entfernt** werden (saubere Linie) oder als historischer Block markiert (z. B. „Amazon Partner-Programm — aktiv 22.04.2026 bis 19.05.2026, entfernt mit W14 Track B wegen AdSense-Strategie")? Beides hat Vor- und Nachteile.

3. **Footer-Layout nach Removal:** Mit Pflicht-Hinweis war der Copyright-Block zweizeilig. Nach Removal nur noch eine Zeile. Soll der Block visuell unverändert bleiben (nur `space-y-1` raus) oder soll ich auch das Padding zurückbauen?

4. **Bestätigung Goldene Regel:** Die `affiliate`-Property mit `programId: 'check24'` / `'wiso'` / `'lexware'` / `'cosmosdirekt'` / etc. bleibt in allen 5 Configs (alltag/arbeit/auto/wohnen heizkosten) komplett unangetastet — Cross-Check, dass ich das richtig verstanden habe?
