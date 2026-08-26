# Qualitäts-Guards G1–G14

> Referenzdatei zum Skill `rechner-builder`. Ausgelagert in Welle 114 (26.08.2026),
> damit die SKILL.md den Ablauf trägt und die Detailbestände erst bei Bedarf geladen werden.
> Der Inhalt ist gegenüber der früheren SKILL.md **unverändert**.

Vierzehn Prüfpunkte, die **vor jedem Commit** eines Rechners abzuarbeiten sind (Step 13 im SKILL.md).
Wo ein Guard nicht zutrifft — etwa G5 ohne Einheiten-Output —, das in der Code-Review-Notiz kurz begründen.

Herkunft: Rezept-Umrechner-Audit April 2026; G10 aus dem Jahresaudit 2026; G11–G14 aus der Welle-1-Audit-Serie und Prompt 107b.

---

## Qualitäts-Guards (aus Rezept-Umrechner-Audit, April 2026)

Diese neun Guards wurden nach einem Audit der Rezept-Umrechner-Session
extrahiert. Jeder neue Rechner MUSS sie einhalten. Sie sind außerdem in
`scripts/smoke-test-v3.js` als automatisierte Checks C1–C9 abgebildet.

### G1 — Division-by-zero-Guards
Jede Formel muss Null-Werte und leere Inputs abfangen. Zwei akzeptable
Muster:
- **Input-Clamping:** Wert springt on-change auf sinnvolles Minimum (≥1).
- **Early-Return in Berechnung:** statt `NaN`/`Infinity` eine Hinweisbox
  rendern („Bitte alle Felder ausfüllen").

Anti-Pattern: `const faktor = neueMenge / alteMenge;` ohne Guard.

### G2 — Reset-Button mit Default-Set
Definiere am Datei-Anfang eine `DEFAULT_STATE`-Konstante mit sinnvollen
Beispiel-Werten. Initial-State und Reset nutzen dieselbe Konstante.
NIEMALS auf `0`/`0` zurücksetzen — der Rechner soll nach Reset sofort
wieder ein plausibles Ergebnis zeigen.

```ts
const DEFAULT_STATE = { menge: 500, personen: 4, einheit: 'g' };
const [state, setState] = useState(DEFAULT_STATE);
const reset = () => setState(DEFAULT_STATE);
```

### G3 — JS-seitiges Clamping
`max` und `min` als HTML5-Attribute reichen nicht — der Browser erlaubt
out-of-range Werte, solange das Formular nicht submitted wird. In jedem
`onChange`:

```ts
const raw = parseInt(e.target.value, 10);
const clamped = isNaN(raw) ? MIN : Math.min(MAX, Math.max(MIN, raw));
setMenge(clamped);
```

### G4 — `step="1"` auf Integer-Inputs
Wenn der Wert nur ganzzahlig Sinn macht (Portionen, Personen, Stückzahl,
Tage, Kinderzahl), `step="1"` setzen. Verhindert Dezimaleingabe per
Pfeiltasten und schützt vor Rundungs-Quirks.

### G5 — Pluralisierung bei Einheiten-Output
Wenn der Rechner Zahlen + Einheiten ausgibt, eine `PLURAL_MAP` am
Komponenten-Anfang pflegen und an **allen** Ausgabestellen (Tabelle,
Copy-Output, aria-live) anwenden:

```ts
const PLURAL_MAP: Record<string, string> = {
  'Prise': 'Prisen',
  'Dose': 'Dosen',
  'Tasse': 'Tassen',
  'Packung': 'Packungen',
  // … bei Bedarf erweitern
};
const formatUnit = (n: number, unit: string) =>
  n === 1 ? unit : (PLURAL_MAP[unit] ?? unit);
```

### G6 — aria-live ohne Prefix-Dopplung
Nur EIN Präfix (Rechnername) im aria-live-Text, nicht im umgebenden
Label UND im Message-String. Format:

```
<Rechnername>: <X> → <Y> <Einheit> (Faktor × <n>)
```

Anti-Pattern: `aria-label="Rezept-Umrechner"` plus Textinhalt
`Rezept-Umrechner: Rezept-Umrechner: 2 Eier → 4 Eier`.

### G7 — Title maximal 72 Zeichen gerendert
`metaTitle` im Config muss so gewählt sein, dass
`metaTitle.length + 15` (Suffix ` | Rechenfix.de`) ≤ 60 ergibt.
Ausnahme nur mit Begründung im Kommentar (aktuelle Ausnahme:
`/gesundheit/schwangerschaft-gewicht-rechner` bei 72). Jahreszahl nur
dann, wenn tatsächlich jährlich ändernde Werte relevant sind
(Steuer-Tabellen, Sozialleistungen, Kindergeld, Rente, BAföG, AfA).

### G8 — Sidebar wird aus Route abgeleitet
Für Einzel-Rechner nicht relevant (Layout-Sache). Aber wenn eine neue
Kategorie eröffnet wird: Die Sidebar-Komponente muss `params.kategorie`
auswerten, nicht hardcoden. Sonst zeigt der neue Rechner die falsche
Sidebar.

### G9 — Skalierungs-Caps für nicht-linear skalierende Einheiten
Wenn ein Rechner Werte multipliziert (z. B. Rezept-Umrechner
Faktor × Menge), prüfen: Welche Einheiten machen mathematisch keinen
Sinn beim Skalieren? Diese vom Faktor ausnehmen und in der Komponente
dokumentieren:

```ts
// Nicht-skalierende Einheiten (Prise bleibt Prise, egal wie groß das Rezept)
const UNSCALED_UNITS = new Set(['Prise', 'n.B.', 'nach Geschmack']);
const skalieren = (menge: number, einheit: string, faktor: number) =>
  UNSCALED_UNITS.has(einheit) ? menge : menge * faktor;
```

### G10 — Keine Dubletten zentraler Werte

Jeder Rechner, der einen gesetzlich fixierten Jahreswert benötigt
(Grundfreibetrag, Kindergeld, Mindestlohn, Rentenwert, BBG, JAEG,
Soli-Grenzen, Pfändungsfreibeträge, Tabaksteuer, D-Ticket-Preis,
Zusatzbeitrag etc.), MUSS diesen aus der entsprechenden
`lib/berechnungen/*`-Datei importieren. Hartcodierte Zahlen für solche
Werte sind verboten — auch dann, wenn sie in einem einzelnen SEO-Text
oder in einer einzelnen Berechnung stehen.

**Warum:** Die Jahresparameter-Audits Sprint 1 (April 2026) und
Jahresaudit 2026 (Prompts 86–91) haben gemeinsam in neun Rechnern
Werte gefunden, die 1–2 Jahre veraltet waren — weil sie lokal
hartkodiert waren statt aus der zentralen Lib gezogen.

**Ausnahme:** Nicht rechts-/jahresabhängige Konstanten (z. B.
„12 Monate pro Jahr", „π ≈ 3,14159") dürfen hartkodiert sein.

**Verweis:** Siehe `CLAUDE.md` Abschnitt „Zentrale Libs (SSOT)" für
die vollständige Liste und das Stichtag-Switch-Pattern.

### G11 — SSOT-Import-Pflicht (Welle-1-Audit, April 2026)

Vor jedem Rechner-Bau prüfen und konsumieren — niemals duplizieren:

- ESt? → `berechneEStGrund(zvE, jahr)` aus `einkommensteuer.ts`
- Soli? → `berechneSoli(est, splittingtarif, jahr)` (mit Milderungszone)
- Kirchensteuer? → `berechneKirchensteuerByBundesland(est, bundesland)`
- Rentenwert? → `getAktuellerRentenwert()` aus `rente.ts` (Stichtag-Switch)
- BBG? → `BBG_RV_MONAT` / `BBG_KV_MONAT` aus `brutto-netto.ts`
- Kindergeld / Kinderfreibetrag? → Konstanten + Logik aus `kindergeld.ts`
  (`KIFB_GESAMT_ZUSAMMEN_2026` = 9.756 €, `KIFB_GESAMT_EINZEL_2026` = 4.878 €)
- Pfändungstabelle? → `pfaendung.ts`
- Mindestlohn? → `mindestlohn.ts`
- Pendlerpauschale-Satz? → `PENDLERPAUSCHALE_SATZ_2026` (= 0,38 €) aus `pendlerpauschale.ts`

Keine eigenen Zahlen-Konstanten für gesetzliche Werte. Keine eigenen
Tarif-Formeln. Jede Verletzung ist ein P1-Bug wie die im April 2026
gefundenen (Steuerklassen-Faktor, Rentenwert 39,32, Kifb 15.612,
Pendler-Staffelung 0,30/0,38).

### G12 — Keine Transform-Hover auf Karten (Prompt 96/96a)

Keine `transform`/`scale`/`translate`-basierten Hover-Effekte auf
Karten-artigen Elementen. Der Browser promotet transformierte
Elemente auf eine Compositor-Ebene und rendert Text mit Subpixel-
Antialiasing → Text-Blur während der Transition. Auch `translateY(-2px)`
ist betroffen.

**Korrekte Umsetzung:** Nutze die zentrale `.card`-Utility aus
`app/globals.css` oder eine äquivalente Shadow-only-Animation.
Elevation-Eindruck entsteht allein durch verstärkten Box-Shadow —
keine Pixel-Bewegung nötig. Siehe CLAUDE.md Abschnitt
„UI-Regeln für Rechner-Kacheln".

### G13 — Differenz-Methode für Steuer-/Soli-Ersparnis (Prompt 100)

Bei Rechnern, die Steuerersparnis aus Absetzungen schätzen
(Spenden, Werbungskosten, Altersvorsorge): Immer Differenz-Methode
nutzen — nie pauschal `ersparnis * 0.055`:

```ts
// FALSCH (ignoriert Soli-Freigrenze):
const soliErsparnis = estErsparnis * 0.055;

// RICHTIG (berücksichtigt Freigrenze + Milderungszone):
const soliVoll = berechneSoli(estVoll, splitting, 2026);
const soliNachAbzug = berechneSoli(estNachAbzug, splitting, 2026);
const soliErsparnis = soliVoll - soliNachAbzug;
```

Dieselbe Logik gilt für KiSt:
`berechneKirchensteuerByBundesland(estVoll, bundesland) − berechneKirchensteuerByBundesland(estNachAbzug, bundesland)`.

Der pauschale 5,5 %-Ansatz überschätzt die Ersparnis systematisch,
wenn zvE vor oder nach Abzug unter die Soli-Freigrenze rutscht
(Prompt 100: ~200 €/Jahr Überschätzung bei typischen Spendern
um zvE 70–80 k).

### G14 — Ein Footer, dynamische Zahlen (Prompt 107b)

Genau **eine** Footer-Komponente site-weit: [components/layout/Footer.tsx](components/layout/Footer.tsx). Keine zweite Footer-Komponente anlegen (z. B. für Landing-Pages, Admin-Bereiche oder Rechner-Subseiten).

Rechner- und Kategorie-Zahlen im Footer werden **dynamisch** aus [lib/rechner-config/client-data.ts](lib/rechner-config/client-data.ts) berechnet — niemals hartcodieren:

```tsx
// RICHTIG:
{rechner.length} Rechner in {kategorien.length} Kategorien

// FALSCH (veraltet, sobald ein Rechner dazukommt):
206 Rechner in 10 Kategorien
```

Das Lint-Script `npm run lint:footer` prüft beides automatisch:
- `footer-uniqueness`: genau 1 Footer-Datei in `{app,components}/**/*Footer*.{ts,tsx}`
- `footer-hardcoded-count`: Regex `\b\d{2,4}\s+Rechner\s+(in|pro)\s+\d+\s+Kategorien?\b` im Footer-Content → Fehler
