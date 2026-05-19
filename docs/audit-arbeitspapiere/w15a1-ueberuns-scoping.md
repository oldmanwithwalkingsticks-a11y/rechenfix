# W15A Track 1 — Über-uns Scoping-Report

**Stand:** 19.05.2026 (Phase 1, Read-only)
**Trigger:** AdSense-Ablehnung 19.05.2026 → Welle-15-Tiefenanalyse Killer-Faktor 1: E-E-A-T-Vakuum.

---

## 1. Aktueller Inhalt — Wortzahl + Strukturskizze

**Datei:** [app/ueber-uns/page.tsx](app/ueber-uns/page.tsx), 218 Zeilen.

**Wichtige Pre-Phase-Korrektur:** Der Prompt nimmt an, dass die Seite aktuell ~150W generische Bullets hat. **Das stimmt nicht mehr.** Sie wurde in Sprint 155 (28.04.2026, Commit `1a6e6ed`, Doku-Anker [welle-status-historie.md](docs/audit-arbeitspapiere/welle-status-historie.md)) auf substantielle ~700W ausgebaut.

**Aktuelle Strukturskizze (6 Sections, ~730W insgesamt):**

| Section | Wörter | Inhalt |
|---|---|---|
| 1. Hero (3 Absätze) | ~185W | Lead mit „170 kostenlose Online-Rechner in neun Kategorien", Browser-Lokal-Versprechen, „Fix erklärt"-KI-Mechanik-Erklärung mit Abgrenzung „**Berechnungen nicht KI-generiert**" |
| 2. „Wer steht hinter Rechenfix?" | ~120W | Karsten Kautz als Einzelperson + Krefeld + Software-Entwickler + Abgrenzung „kein Steuerberater oder Rechtsanwalt" + Impressum-Verweis |
| 3. „Wie wir Genauigkeit sicherstellen" | ~185W | 4 Bullet-Punkte (Primärquellen-Pflicht / Verify-Skripte / Stichtag-Logik / SSOT) + Verweis auf /qualitaet |
| 4. „Unsere Quellen (Auswahl)" | ~80W | 4-spaltige Mini-Grid (Steuern/Recht, Sozialversicherung, Statistik, Wohnen/Energie) mit Quellen-Listen |
| 5. „Datenschutz und Transparenz" | ~120W | Lokal-Berechnung + Werbung/Affiliate-Transparenz |
| 6. „Kontakt" | ~40W | E-Mail + Impressum-Link |

**Bewertung gegen Prompt-Ziel-Struktur:**

Der Prompt zielt auf **8 Sections** (Hero+Foto+Author / Wer ich bin / Wie Rechenfix entstanden / Was Rechenfix anders macht / So pflege ich die Rechner / Quellen / Kontakt / Aktualisiert-Block). Davon sind in der jetzigen Seite **zu großen Teilen schon abgedeckt**:

| Prompt-Section | Status aktuell |
|---|---|
| Hero + Author-Block mit Foto | **FEHLT** (Hero ist gut, Foto + Krefeld-Untertitel fehlen prominent) |
| „Wer ich bin" (persönlich, Alter, Hintergrund) | **TEILWEISE** — Section 2 nennt Karsten Kautz / Krefeld / Software-Entwickler, aber kein Alter, kein beruflicher Hintergrund-Satz, kein „Was begeistert mich"-Personal Touch |
| „Wie Rechenfix entstanden ist" — Founder-Story | **FEHLT** komplett — keine Story, kein „Vor einer Steuererklärung saß ich…" |
| „Was Rechenfix anders macht" | **TEILWEISE** — über die 5 Sections verteilt (Browser-Lokal, KI-Erklärung, Werbung/Affiliate), keine konsolidierte 3-Bullet-Section |
| „So pflege ich die Rechner" (4-Schritt-Workflow) | **VORHANDEN** als Section 3 mit anderen Worten — Primärquellen-Pflicht / Verify-Skripte / Stichtag-Logik / SSOT statt Quellen-Recherche / Werte-mit-Stichtag / Januar-Audit / Korrektur-Hinweise |
| „Quellen" | **VORHANDEN** als Section 4, sogar besser strukturiert (4-Themen-Grid statt freier Text) |
| „Kontakt" | **VORHANDEN** Section 6, leicht anders formuliert |
| „Aktualisiert"-Block | **FEHLT** komplett |

**Strategische Entscheidung nötig (Klärungsfrage 1):** Komplett-Neuschreibung wie im Prompt vorgesehen, oder gezielte **Ergänzung** der vier fehlenden Elemente (Foto+Author-Block / Wer-ich-bin-personal / Founder-Story / Aktualisiert-Block) bei Beibehaltung der starken Methodik- und Quellen-Sections?

Empfehlung: **Ergänzungs-Variante.** Begründung: Die bestehenden Methodik- und Quellen-Sections sind inhaltlich substanziell und genau das, was AdSense-Reviewer für E-E-A-T sehen wollen. Der Founder-Story-Personalisierungs-Layer fehlt — den ergänzen wir on-top, ohne das Vorhandene wegzuwerfen.

---

## 2. Layout-Tech-Befunde

| Aspekt | Befund |
|---|---|
| Container-Width | `<div className="max-w-4xl mx-auto px-4 py-8">` — **`max-w-4xl`** (Prompt schlägt `max-w-3xl` vor). Inkonsistenz: Datenschutz nutzt ebenfalls `max-w-4xl`, Impressum nutzt `max-w-3xl`. Vorschlag: bei `max-w-4xl` bleiben (Konsistenz mit Datenschutz-Page) |
| Section-Spacing | Jede `<section>` hat `card p-6 md:p-8 mb-8` — Card-Look, NICHT der schlichte `mt-12`-Abstand aus dem Prompt |
| Breadcrumbs | `<Breadcrumbs items={[{ label: 'Über uns' }]} />` aus `@/components/layout/Breadcrumbs` |
| H1 | `text-3xl md:text-4xl font-extrabold text-primary-700 dark:text-primary-300` |
| H2 (Section-Titel) | `text-xl font-bold text-gray-800 dark:text-gray-100 mb-4` |
| H3 (Sub-Titel) | `font-semibold text-gray-800 dark:text-gray-100 mb-1.5` (im Quellen-Grid) |
| Prose-Container | `<div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">` — `prose-sm`-Plugin (Tailwind Typography) für 14px-Lesbarkeit |

**Section-Komponente:** Existiert **nicht** wiederverwendbar. Die `<Section nr="…" titel="…">`-Komponente in [app/datenschutz/page.tsx:340](app/datenschutz/page.tsx) ist eine **datei-private** Helper-Komponente (nicht exportiert). Verwendung in ueber-uns würde Duplikat-Code bedeuten. Pragmatisch: bei Inline-`<section>`-Pattern bleiben wie aktuell, oder eine lokale Section-Komponente analog Datenschutz anlegen.

**Empfehlung:** Inline-Pattern beibehalten. Aufwand für lokale Section-Komponente lohnt sich nur bei sehr vielen Sections (Datenschutz hat 14, ueber-uns wird ~7–8 haben).

---

## 3. Footer-Komponenten-Status — KEIN Drift-Fix nötig

**Welle-15-Dossier behauptet** (Sektion 1.7 + 4.2): Drei verschiedene Footer-Counts auf der Site — Über-uns „40 Rechner / 7 Kategorien", Datenschutz „32 / 7", Rest „170 / 9".

**Repo-Realität (verifiziert):**

- [app/ueber-uns/page.tsx](app/ueber-uns/page.tsx) hat **keinen** eigenen Footer-Import oder `<Footer />`-Render
- Footer kommt zentral aus [app/layout.tsx:117](app/layout.tsx) (`<Footer />` im Root-Layout, innerhalb des `ThemeProvider`-Trees)
- Es gibt nur **eine** Footer-Component: [components/layout/Footer.tsx](components/layout/Footer.tsx)
- Diese liest `rechner` und `kategorien` aus [lib/rechner-config/client-data.ts](lib/rechner-config/client-data.ts) (Z. 5)
- Footer.tsx Z. 39–41: `<p className="text-primary-300 dark:text-gray-500 text-xs">{rechner.length} Rechner in {kategorien.length} Kategorien</p>` — **dynamisch, kein Hardcode**
- `client-data.ts` ist auto-generiert beim Prebuild-Hook ([scripts/generate-client-data.ts](scripts/generate-client-data.ts)) — bei jedem `npm run build` neu erzeugt

**Schlussfolgerung:** Es ist code-technisch unmöglich, dass dieselbe `client-data.ts` auf verschiedenen Seiten unterschiedliche `.length`-Werte liefert. Der „40/7"-Befund aus dem Dossier ist eine **Vercel-Cache-Drift** — einzelne Static-Pages, die bei früheren Deploys mit veralteten `client-data.ts`-Buckets prerendered wurden und nie revalidiert.

**Fix-Status:** **Kein Code-Change nötig.** Der nächste Vercel-Deploy mit aktuellem `client-data.ts` (Generated: 2026-05-19) räumt die Drift automatisch auf, sobald alle Static-Pages neu generiert werden. Karsten kann das über den nächsten Deploy nach diesem Sprint forcieren (eventuell mit „Use existing Build Cache" unchecken, falls Vercel partielle Pages cached — analog L-W14.5-3).

**Klärungsfrage 2:** Soll der W15A.1-Sprint trotzdem einen leeren „verify Footer-Drift"-Subtask aufnehmen (z. B. via Build-Diff-Check), oder reicht der Karsten-Live-Verify im Inkognito nach Deploy?

---

## 4. Image-Pfad-Konvention

| Aspekt | Befund |
|---|---|
| Image-Component | `next/image` wird durchgehend verwendet (`components/layout/Header.tsx:5`, `components/layout/Footer.tsx:4`) |
| Public-Pfade vorhanden | `public/images/`, `public/og-images/`, `public/logo.svg`, `public/favicon.svg`, `public/ads.txt` |
| `public/about/` | **Existiert nicht** — muss von Karsten beim Foto-Upload angelegt werden |
| Referenz-Pfad-Pattern | `<Image src="/logo.svg" alt="…" width={36} height={36} />` (Footer.tsx Z. 24) — `/public/` wird beim `src=` NICHT geprefixt (Next-Konvention) |

**Vorschlag für ueber-uns:**

```tsx
<Image
  src="/about/karsten-kautz.jpg"
  alt="Karsten Kautz, Gründer von Rechenfix.de"
  width={200}
  height={200}
  className="rounded-2xl"
  priority
/>
```

**Fallback-Strategie bei fehlendem Foto** (Karsten lädt erst in Phase 4):
- Optionale `<Image>`-Render: bei nicht-existierendem File würde Next.js einen 404-Bildfehler werfen → **bedingte Render-Logik mit Default-Placeholder-Div nötig**
- Alternative: Component versucht das Bild zu laden, der Browser zeigt einen leeren Box bei 404. Schlechte UX.
- Cleaner: Server-side `existsSync('public/about/karsten-kautz.jpg')`-Check in einer Server-Component (ueber-uns ist eine Server-Component → erlaubt). Pseudocode:
  ```tsx
  import { existsSync } from 'fs';
  import path from 'path';
  const fotoExists = existsSync(path.join(process.cwd(), 'public/about/karsten-kautz.jpg'));
  ```
  Dann konditionell rendern.

**Klärungsfrage 3:** Soll der Sprint mit Foto-Placeholder-Div live gehen (sichtbar als „Foto folgt"), oder soll die Author-Section **vorerst ohne Foto** deployed werden und erst freischalten, wenn Karsten das File hochgeladen hat? Mit `existsSync`-Check ist Variante 1 cleaner — das gerenderte HTML zeigt automatisch das Foto, sobald Karsten es hochlädt, ohne Code-Change.

---

## 5. Aktualisiert-Block / Build-Date — kein Pattern vorhanden

**Datenschutz-Page** (als Referenz vom Prompt): Z. 29 zeigt `<p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Stand: Mai 2026</p>` — **hartkodiert**, kein Build-Time-Inject.

**Optionen für ueber-uns:**

1. **Hartkodiert** (wie Datenschutz): `Stand: Mai 2026`. Vorteil: konsistent mit Datenschutz. Nachteil: muss manuell aktualisiert werden, kann drift'en.
2. **Build-Time-Inject** via `process.env.NEXT_BUILD_DATE` oder ähnlicher Vercel-Env-Var (Vercel hat `VERCEL_GIT_COMMIT_AUTHOR_DATE` etc.). Vorteil: automatisch. Nachteil: nicht-Standard-Pattern für die Site.
3. **Letzte-Code-Änderung-Datum** aus Git-Metadaten beim Build (z. B. via `child_process` auf `git log -1 --format=%cI -- app/ueber-uns/page.tsx`). Erfordert Build-Skript-Anpassung.
4. **Statisches Datum mit JSX-Konstante am Dateianfang:** `const LAST_UPDATED = '19. Mai 2026';` — explizit gepflegt, leicht zu finden bei Updates.

**Empfehlung:** Variante 4 — `const LAST_UPDATED = '19. Mai 2026'` am Dateianfang, im Section-Footer dargestellt als `Diese Seite zuletzt aktualisiert: {LAST_UPDATED}`. Pragmatischer als Build-Time-Inject, klarer als hartkodiert in JSX. Bei Updates: Karsten passt eine Konstante an, Datenschutz-Pattern bleibt unverändert.

**Klärungsfrage 4:** Soll auch die Datenschutz-Page beim Doku-Sync auf das `LAST_UPDATED`-Konstanten-Pattern umgestellt werden (Konsistenz), oder bleibt sie auf hartkodiertem JSX-String?

---

## 6. Footer-Drift-Fix — Reality Check

Wie unter Punkt 3 ausgeführt: **Kein Code-Fix nötig.** Der Welle-15-Dossier-Befund (Über-uns 40/7) ist eine Cache-Reliquie auf Vercel-Seite, nicht ein Code-Defizit. Repo-Seitig ist die Footer-Konsolidierung längst da (W13-G14-Guard, [scripts/check-footer.mjs](scripts/check-footer.mjs)).

**Verifikations-Vorschlag** (Phase 4, Karsten manuell):
1. Vercel-Deploy nach diesem Sprint anstoßen, **mit „Use existing Build Cache" unchecked**
2. Im Inkognito-Browser `/ueber-uns`, `/datenschutz`, `/impressum`, `/` aufrufen
3. Footer-Count auf allen vier Seiten: muss „170 Rechner in 9 Kategorien" zeigen
4. Falls eine Seite weiter abweicht: das ist dann ein Vercel-Bug, nicht ein Code-Defizit — Karsten-Support-Ticket bei Vercel

---

## 7. Welle-Status: Bestehender Inhalt ist eine wertvolle Basis

Vor der Komplett-Neuschreibung sollte berücksichtigt werden:

- Section 3 („Wie wir Genauigkeit sicherstellen") ist substantieller als das, was der Prompt in der „So pflege ich die Rechner"-Section beschreibt — sie nennt 4 konkrete Praktiken mit Begriffen wie SSOT, Verify-Skripte, Stichtag-Logik, die exakt das ist, was AdSense-Reviewer als E-E-A-T sehen wollen.
- Section 4 („Unsere Quellen") ist **strukturierter** als die einzeilige Aufzählung im Prompt-Vorschlag (4-Themen-Grid statt freier Text).
- Section 1 Hero benennt bereits „170 kostenlose Online-Rechner in neun Kategorien" — die im Prompt geforderten harten Zahlen sind drin.

Das Fehlende ist **die Person**: Foto, Alter, beruflicher Hintergrund, persönliche Founder-Story.

---

## Empfohlene Phase-2-Strategie (basierend auf Klärungs-Empfehlungen)

**Hybrid-Ergänzung** (statt Komplett-Neuschreibung):

1. **Section 1 Hero erweitern** — Author-Block mit Foto links + Name/Untertitel/Krefeld rechts unterhalb der bestehenden 3 Hero-Absätze. Aktuelle Hero-Texte bleiben.
2. **NEUE Section 2a** „Wer ich bin" — persönlich, mit Platzhalter-Klammern für Karsten (Alter, Berufshintergrund, Hobbys/Motivation). Wird zwischen bestehender Section 1 Hero und Section 2 „Wer steht hinter Rechenfix?" eingefügt.
3. **NEUE Section 2b** „Wie Rechenfix entstanden ist" — Founder-Story mit Platzhalter-Klammern. Wird nach 2a eingefügt.
4. **Section 3 + 4 bleiben** unverändert (substantielle Methodik + Quellen)
5. **Section 5 + 6 bleiben** unverändert (Datenschutz + Kontakt)
6. **NEUE Section 7** „Was Rechenfix anders macht" — 3-Bullet-Block (aktuelle Werte / Fix erklärt / Werbefinanziert ohne Überladung). Kann auch in Hero integriert werden, dann sparen wir eine extra-Section. Tendiere zu eigener Section für Klarheit.
7. **NEUER Block am Ende** — „Diese Seite zuletzt aktualisiert: 19. Mai 2026" via `LAST_UPDATED`-Konstante

Resultat: bestehende ~730W + ~400–500W neu = ~1.150W. Deutlich über dem 700W-Ziel des Prompts, was für E-E-A-T besser ist.

**Foto-Handling:** `existsSync`-Check in der Server-Component → konditionell `<Image>` oder Placeholder-Div mit „Foto folgt"-Text. Karsten lädt in Phase 4 hoch, ohne Code-Change zum Sichtbarmachen.

---

## STOP — Karsten bestätigt Scoping vor Phase 2

**4 Klärungsfragen:**

1. **Strategie:** Hybrid-Ergänzung (Empfehlung, +400–500W on-top) oder Komplett-Neuschreibung wie im Prompt vorgesehen (alles weg, ~700W neu)?
2. **Footer-Drift-Subtask:** Im Sprint mitnehmen (verify im Sinne von Vercel-Cache-Bust) oder Karsten verifiziert manuell nach Deploy?
3. **Foto-Fallback:** `existsSync`-bedingter Render (Placeholder bis File da ist, danach automatisch sichtbar) oder Section vorerst ohne Foto, dann nachziehen?
4. **`LAST_UPDATED`-Pattern:** Auch die Datenschutz-Page auf das Konstanten-Pattern umstellen (Konsistenz), oder Datenschutz auf hartkodiertem String belassen?
