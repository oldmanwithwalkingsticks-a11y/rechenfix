# Content-Standards — contentBloecke und Pattern-Goldstandard

> Referenzdatei zum Skill `rechner-builder`. Ausgelagert in Welle 114 (26.08.2026),
> damit die SKILL.md den Ablauf trägt und die Detailbestände erst bei Bedarf geladen werden.
> Der Inhalt ist gegenüber der früheren SKILL.md **unverändert**.

**Wann lesen:** bevor Inhalte für einen Rechner geschrieben werden.

Der `contentBloecke`-Standard ist seit Welle 19 der einzige Pfad; der Thin-`erklaerung`-String hat die vierte AdSense-Ablehnung verursacht. Der Pattern-Goldstandard darunter beschreibt das Layout, das die Top-Rechner gemeinsam haben.

Der Self-Check am Ende des ersten Abschnitts (L-W19.SelfCheck) ist vor jedem Commit Pflicht.

---

## Pattern-Goldstandard (Welle 13, Stand 08.05.2026)

Top-10-Rechner (BN, MwSt, Zins, BMI etc.) folgen einem etablierten Layout-Pattern für AdSense-Konformität und maximale Conversion. Bei neuen Rechnern oder Updates bestehender Rechner gilt:

### Component-Layout (`components/rechner/<Name>Rechner.tsx`)

Innerhalb des `{ergebnis && (...)}`-Blocks in dieser Reihenfolge:

1. **Result-Box** (blau, Hauptzahl + Kategorie-Badge)
2. **Custom-UI** rechner-spezifisch (z.B. Aufschlüsselung, Skala, Tabelle, dynamische Hinweise)
3. **CrossLinks** zu verwandten Rechnern
4. **AiExplain im `mt-4`-Wrapper:**
   ```tsx
   <div className="mt-4">
     <AiExplain rechnerName="..." eingaben={{...}} ergebnis={{...}} />
   </div>
   ```
5. **ErgebnisAktionen im `mt-6`-Wrapper:**
   ```tsx
   <div className="mt-6">
     <ErgebnisAktionen ergebnisText="..." seitenTitel="..." />
   </div>
   ```

**Wichtig:** Beide Wrapper IMMER zusammen setzen. Nur `mt-4` oder nur `mt-6` führt zu Spacing-Hotfix-Bedarf (Lerneffekt aus W13.3.1, W13.3.6, W13.4.1).

### Page-Layout (durch `app/[kategorie]/[rechner]/page.tsx` automatisch gerendert)

1. AdSlot Rectangle
2. h2 „So funktioniert..." + `config.formel` + `config.beispiel`
3. `config.erklaerung` mit Existing + NEU-Sektionen
4. h2 „Häufige Fragen" mit `config.faq`
5. **`config.affiliate` (Single-Object oder Array)** — AdSense-konform post-FAQ; Renderer macht `Array.isArray`-Check automatisch (seit W14.A.1)
6. „Das könnte Sie auch interessieren" + Sidebar

### Inhalts-Standards für Top-Rechner

Jeder Top-Rechner (BN, MwSt, Zins, BMI etc.) hat in `config.erklaerung`:

- **Existing-Sektionen** (rechner-spezifische Grundlagen, Formel, Tabellen)
- **„Anwendungsfälle: Wann brauchen Sie den X-Rechner?"** (NEU, ~250W, 5 konkrete Szenarien als Bold-Lead-Liste)
- **„Häufige Fehler bei der X-Berechnung"** (NEU, ~150W, 5 Stichpunkte als Bold-Lead-Liste)

`config.faq` mit mindestens 8 Q&A (5 Existing + 3 rechner-spezifische NEU-Fragen).

> **Welle-19-Hinweis:** Neue und neu zu überarbeitende Top-Rechner nutzen statt der `erklaerung`-NEU-Sektionen das Content-Baustein-Muster (`contentBloecke`, siehe den Abschnitt „Content-Bausteine" in dieser Datei). Der hier beschriebene Bold-Lead-Listen-Weg in `erklaerung` bleibt **Bestandsschutz** für die noch nicht migrierten Rechner.

### Bold-Lead-Listen-Pattern

```markdown
- **Punkt-Titel.** Erklärungs-Text mit konkreten Werten/Beispielen für ein Mini-Mehrwert-Element.
```

Markdown-Render in `page.tsx` parsiert dieses Pattern korrekt — gilt kategorie-übergreifend.

### Affiliate-Architektur (Stand W14.A-Abschluss, 10.05.2026)

| Pattern | Wann | Wo |
|---|---|---|
| Single-Box via `config.affiliate` (Object) | 1 Affiliate-Box pro Rechner | Property in `lib/rechner-config/<kat>.ts` |
| Multi-Box via `config.affiliate` (Array) | 2+ Affiliate-Boxen | Array-Property in `lib/rechner-config/<kat>.ts` |
| Kein Affiliate | Affiliate-frei (z. B. Gesundheit/Mathe) | Property weglassen (undefined) |
| **P1 Inline-Custom (Bestandsschutz)** | BN-Pattern (Position-Erhalt als CTR-Slot) | Inline-JSX im Component, kein `config.affiliate` |
| **P4a Inline-Conditional (Bestandsschutz)** | Render-Conditional auf User-Input-State (≤1:1 unconditional:conditional) | Inline-JSX im Component, kein `config.affiliate` (ElterngeldRechner) |
| **P4b Hybrid (Bestandsschutz)** | 3+ Boxen mit Mehrheit-unconditional + 1 Conditional | Mehrheit ins `config.affiliate`-Array, Conditional inline (RentenRechner) |

Neue Rechner nutzen **ausschließlich** die ersten 4 Zeilen (Standard-Pattern). Patterns P1/P4a/P4b sind Bestandsschutz für dokumentierte Sonderfälle aus W14.A — keine neuen Anwendungen.

L-43 (Multi-Box-Drift) ist mit W14.A.6 eliminiert. **L-46-Pflicht:** Bei jedem Component-Edit, der `AffiliateBox` berührt, `grep -nE '<AffiliateBox' components/rechner/<File>.tsx` als Pre-Phase. Bei hartkodierten Treffern entweder Standard-Migration oder Sonderfall-Triage (P1/P2/P3/P4a/P4b — siehe welle-status-historie).

### Sensitivitäts-Layer

Bei Gesundheits-, Finanz-, Familien- und ähnlichen sensiblen Themen:
- Keine wertende Sprache, keine Empfehlungen zur Verhaltensänderung
- Verweise auf Fachpersonen (Arzt, Hebamme, Steuerberater) statt eigener Empfehlungen
- Limitierungen klar benennen

---

## Content-Bausteine (contentBloecke) — Standard ab Welle 19 (10.06.2026)

**Neuer Content-Standard für neue Rechner und Migrationen.** Statt des einzelnen `erklaerung`-Strings tragen Rechner ihren Fachinhalt in modularen Bausteinen (`contentBloecke`). Das Baustein-System ist live (Pilot: `spritkosten-rechner`), Gestaltung/Renderer sind final (Commits 6299c7f→386e846) — Baustein-Arbeit ist ausschließlich **Content im Config-Eintrag**.

### Warum

Ein einziger `erklaerung`-String über 170 strukturgleiche Seiten erzeugt Thin-Content- bzw. AI-Massen-Verdacht — die Ursache der 4. AdSense-Ablehnung. Lösung: modulare Bausteine, bei denen **jeder Rechner ein eigenes Leitformat** trägt (siehe „Leitformat-Prinzip"), sodass jede Seite strukturell einzigartig wird. **Nicht** Wortzahl strecken, **nicht** noindex. Ziel pro Rechner: **~1.500 Wörter sichtbarer Text, nie unter 1.500** (mit Self-Check vor jedem Commit erzwungen, siehe unten).

> **Goldstandard-Erkenntnis (11.06.2026, Pilot-Tranche mwst/zins/stundenlohn/bmi/tage/spritkosten):** Das ursprüngliche Wortziel 1.250 und der bloße „Mindestmix" reichten nicht. Zwei Fehler traten reproduzierbar auf: (1) Dieselben Bausteine nur neu sortiert → Seiten sahen weiter gleich aus (Mindestmix erzeugt Schablonen). (2) Wort-Budgets wurden konsequent unterschätzt — real lagen vermeintlich „~1.500 W"-Seiten bei 766–1.394 W. Beide Fehler sind unten durch das **Leitformat-Prinzip** und den **Self-Check** behoben.

### Die 8 Block-Typen (exakte Feldnamen aus `lib/rechner-config/types.ts`)

```ts
type ContentBlock =
  | { typ: 'text'; titel?: string; html: string }
  | { typ: 'tabelle'; titel?: string; kopf: string[]; zeilen: string[][]; fussnote?: string }
  | { typ: 'statistik'; titel?: string; werte: { label: string; wert: string; hinweis?: string }[] }
  | { typ: 'diagramm'; titel?: string; variante: 'balken' | 'kreis' | 'linie' | 'gestapelt' | 'wasserfall'; daten?: { label: string; wert: number; einheit?: string }[]; gestapelt?: { label: string; segmente: { name: string; wert: number }[] }[]; wasserfall?: { label: string; wert: number; art: 'start' | 'delta' | 'summe' }[]; einheit?: string; fussnote?: string }
  | { typ: 'vergleich'; titel?: string; spalteA: string; spalteB: string; zeilen: { kriterium: string; a: string; b: string }[] }
  | { typ: 'beispielrechnung'; titel?: string; schritte: { label: string; formel: string; ergebnis: string }[]; fazit?: string }
  | { typ: 'checkliste'; titel?: string; punkte: string[] }
  | { typ: 'infobox'; variante: 'tipp' | 'warnung' | 'hinweis'; titel?: string; text: string };
```

Optionales Feld in `RechnerConfig`: `contentBloecke?: ContentBlock[]`. Bei gesetzter Länge rendert `page.tsx` den `ContentBlockRenderer` (freistehende Kacheln); sonst greift der Fallback-Pfad (Außenbox + Formel + Beispiel + `erklaerung`-Split).

### Leitformat-Prinzip (Kern der Einzigartigkeit)

Jeder Rechner bekommt **ein eigenes Leitformat** — eine dominante Darstellungsform + einen inhaltlichen Schwerpunkt, plus **bewusst weggelassene** Bausteintypen. NICHT dieselben Bausteine neu sortieren (das erzeugt Schablonen). Erprobte Leitformate der Pilot-Tranche:

- **Tabellen-Nachschlagewerk** (mwst): mehrere Tabellen, KEIN Diagramm. Für Referenz-/Übersichtsthemen (Sätze, Fristen, Kategorien).
- **Visueller Zeitverlauf** (zins): Diagramme dominant (Linie/Balken), KEIN Vergleich. Für Entwicklung über Zeit.
- **Vergleich & Einordnung** (stundenlohn): mehrere Vergleiche + Statistik, KEIN Diagramm. Für „X im Verhältnis zu Y".
- **Risiko- & Kontext** (bmi): Verteilungs-Diagramm (Kreis) + erklärender Kontext. Für sensible/deskriptive Themen.
- **Anwendungsfall-Sammlung** (tage): mehrere Beispielrechnungen + Checklisten, KEINE großen Datentabellen, KEIN Diagramm. Für „wofür man das braucht".

Wähle pro neuem Rechner das thematisch passende Leitformat und grenze es durch ausgelassene Typen von den Nachbarn ab. Mindestens vorhanden sein sollten: 3–4 gehaltvolle `text`-Blöcke (Hauptanteil der Wörter) + 1 `beispielrechnung` + mindestens 1 Daten-/Visual-Baustein (tabelle/diagramm/vergleich/statistik) + 1 Callout (checkliste/infobox).

### Diagramm-Varianten (5 Typen, je eigener Erkenntniswert)

`variante` wählen nach Datenform — das variiert Diagramme zwischen Rechnern (visuelle Einzigartigkeit):

- **balken** — Kategorienvergleich nebeneinander (Kosten, Verbrauch je Klasse)
- **kreis** (Donut) — Anteile, die ein Ganzes ergeben (Verteilung, Kostenaufteilung; Werte summieren sinnvoll); nutzt `daten`
- **linie** — Zeitverlauf/Entwicklung über Jahre; `daten`-Reihenfolge = x-Achse
- **gestapelt** — Zusammensetzung über Kategorien; nutzt `gestapelt`-Feld (Kategorie → Segmente)
- **wasserfall** — schrittweise Zu-/Abnahme (z. B. Brutto → Abzüge → Netto); nutzt `wasserfall`-Feld (`art: 'start'|'delta'|'summe'`, delta auch negativ)

balken/kreis/linie nutzen das flache `daten`-Feld; gestapelt/wasserfall ihre eigenen Felder. **Wichtig:** Diagramm-/Vergleich-/Statistik-Bausteine sind **wortarm** — wer sie dominant einsetzt (zins, stundenlohn), muss von vornherein mehr und tiefere `text`-Blöcke einplanen, sonst reißt die Seite das 1.500-Wort-Ziel.

### Self-Check (Pflicht vor jedem Commit) — L-W19.SelfCheck

Wort-Budgets werden beim Bauen konsequent unterschätzt. Daher **objektiv messen, nicht schätzen**:

```
node scripts/check-contentbloecke-wortzahl.mjs <slug> --min 1500
```

Muss „OK" zeigen, BEVOR committet wird. Bei „UNTER SCHWELLE" die `text`-Bausteine vertiefen (echte Fachsubstanz, kein Fülltext) und erneut messen. Auf ~1.500–1.560 puffern, nicht knapp auf der Schwelle committen (Mess-Reserve). Das Skript zählt sichtbaren Text aller Bausteine (html ohne Tags, Tabellenzellen, Labels, Schritte, Punkte).

### Daten-Disziplin

- Markt-/Zahlenwerte in Bausteinen als **SSOT-Konstante** in `lib/berechnungen/<thema>-parameter.ts` (Muster: `SPRITPREISE_REFERENZ`), mit **Stichtag + Quelle** im Kommentar. Im Config über Helper einsetzen (z. B. `eur()`/`STAND_DE` im Auto-Pilot), nicht hartkodieren.
- **Rechtsdaten (YMYL) NIE aus Memory** — Primärquelle prüfen (L-37, siehe CLAUDE.md).
- `scripts/check-jahreswerte.mjs` warnt (soft, im Prebuild) bei einem Markt-Stichtag > 45 Tage.
- Für externe Marktwerte gilt weiter L-38 (User-Eingabe-Default, Step 3b): redaktionelle Referenzwerte in Bausteinen ergänzen die User-Eingabe, ersetzen sie nicht.

### erklaerung-Fallback bleibt Pflicht

Auch bei gesetzten `contentBloecke` das `erklaerung`-Feld **befüllt lassen** (Schema-Konsistenz + Sicherheit). Der Renderer zeigt `erklaerung` nicht, solange `contentBloecke?.length` greift — es bleibt der Fallback-Pfad für alle nicht-migrierten Rechner.

### Quellen-Pflicht (ab 06/2026)

Jeder Goldstandard-Rechner setzt `config.quellen` (2–4 Einträge, `{ titel, url?, hinweis? }` aus `types.ts`). Bei YMYL-Themen Primärquellen mit Link (gesetze-im-internet.de, BMF, Destatis, Bundesbank, BEEG/SGB/BGB/PAngV); bei Mathe/Alltag ohne Gesetzesbezug genügt ein didaktischer `hinweis` ohne `url`. Die Quellen-Sektion rendert automatisch über das Page-Template (`app/[kategorie]/[rechner]/page.tsx`), sobald `config.quellen` gesetzt ist — fehlt das Feld, bleibt die Sektion leer und verschenkt E-E-A-T (gerade bei YMYL). Pflicht-Bestandteil neben `contentBloecke` + Self-Check.

**Überschrift ist typabhängig (seit 19.06.2026, `components/Quellen.tsx`):** Die Komponente leitet die Überschrift aus den Quellen ab — KEINE manuelle Steuerung nötig. Hat mindestens eine Quelle einen Rechtsbezug (URL auf `gesetze-im-internet.de`/`bundesgesetzblatt`/`eur-lex` ODER `§`/Gesetzeskürzel wie EStG, BGB, ArbZG, SGB, BUrlG, KraftStG, BetrKV, StGB, StVG, StVO, BKatV, WoFlV, BKKG im `titel`), erscheint **„Quellen & Rechtsgrundlagen"**. Sonst — also bei rein didaktischen Hinweisen UND bei reinen Daten-/Behördenquellen ohne Gesetzesbezug (Destatis, ADAC, DGSM, BfS …) — erscheint **„Quellen & Methodik"**. Konsequenz fürs Quellen-Setzen: Bei didaktischen/Daten-Rechnern keinen Gesetzes-Etikettenschwindel erzeugen; ein `hinweis` ohne `§` ist korrekt und führt automatisch zur richtigen „Methodik"-Überschrift.

### Referenz-Beispiele (Goldstandard-Tranche, 11.06.2026)

Sechs fertige Goldstandard-Rechner als Kopiervorlage (je >1.500 W, eigenes Leitformat, primärquellen-verifiziert):

- `lib/rechner-config/finanzen.ts`: **mwst-rechner** (Tabellen-Nachschlagewerk), **zinsrechner** (Zeitverlauf, Linie+Kreis), **stundenlohn-rechner** (Vergleich & Einordnung)
- `lib/rechner-config/gesundheit.ts`: **bmi-rechner** (Risiko-/Kontext, Kreis, sensibel-deskriptiv)
- `lib/rechner-config/alltag.ts`: **tagerechner** (Anwendungsfall-Sammlung, mehrere Beispielrechnungen)
- `lib/rechner-config/auto.ts`: **spritkosten-rechner** (gemischt, Pilot)

Für Komposition + Daten-Disziplin diese als Muster nehmen — nicht den ursprünglichen dünnen Pilot-Stand.

### Renderer/Design NICHT anfassen

Gestaltung ist final: `ContentBlockRenderer.tsx` (Server-Component, Kachel = `card p-5 md:p-6` mit Hover-Lift, Titel `primary-600`). Der Renderer beherrscht 5 Diagramm-Varianten (balken/kreis/linie/gestapelt/wasserfall, CLS-sicher, kontrastreiche Hex-Palette, Donut zentriert) — diese werden über das `variante`-Feld im Config gesteuert, NICHT durch Renderer-Änderungen. Baustein-Arbeit = **ausschließlich Content** im Config-Eintrag der jeweiligen Kategorie-Datei (`lib/rechner-config/<kategorie>.ts`) — nur die Auto-Kategorie selbst liegt in `auto.ts`.

---
