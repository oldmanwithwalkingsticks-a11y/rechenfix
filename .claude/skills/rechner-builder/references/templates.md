# Rechner-Templates nach Typ

## Finanz-Rechner Template

Typische Eingabefelder:
- Betrag in € (type="number", inputmode="decimal", step="0.01")
- Zeitraum (Dropdown: monatlich/jährlich)
- Prozentsatz (Slider oder Eingabefeld mit %-Suffix)
- Bundesland (Dropdown mit allen 16 Bundesländern)
- Steuerklasse (Dropdown 1-6 mit Beschreibung)

Typische Ausgabe:
- Hauptergebnis in € (groß, farbig)
- Aufschlüsselungstabelle (Posten | Betrag | Anteil in %)
- Visueller Balken oder Tortendiagramm
- Vergleich: "X€ pro Tag / pro Stunde / pro Arbeitstag"

KI-Prompt-Kontext für Fix erklärt:
"Du bist der Finanz-Assistent von rechenfix.de. Erkläre das
Ergebnis persönlich, gib 2 konkrete Spartipps mit €-Beträgen.
Max 150 Wörter. Deutsch, Siezen, keine Markdown-Formatierung."

Verwandte Rechner: Brutto-Netto, MwSt, Stundenlohn, Sparrechner, Zinsrechner

---

## Alltags-Rechner Template

Typische Eingabefelder:
- Zwei Zahlenwerte zum Vergleichen/Berechnen
- Modus-Auswahl als Tabs (z.B. "Berechnung A | Berechnung B")
- Quick-Buttons für häufige Werte

Typische Ausgabe:
- Ergebnis mit Rechenweg ("X × Y ÷ 100 = Z")
- Alltagsvergleich ("Das entspricht X Tassen Kaffee")
- Copy-Button für das Ergebnis

KI-Prompt-Kontext für Fix erklärt:
"Du bist der Alltags-Assistent von rechenfix.de. Erkläre den
Rechenweg einfach, nutze ein Alltagsbeispiel.
Max 100 Wörter. Deutsch, Siezen, keine Markdown-Formatierung."

---

## Gesundheits-Rechner Template

Typische Eingabefelder:
- Geschlecht (Toggle: Männlich/Weiblich)
- Alter (number, Jahre)
- Gewicht (number, kg)
- Größe (number, cm)
- Aktivitätslevel (Dropdown)

Typische Ausgabe:
- Hauptergebnis mit Einordnung (Skala/Ampel)
- Altersgerechter Vergleich
- Gesundheitshinweis (immer: "Ersetzt keine ärztliche Beratung")

KI-Prompt-Kontext für Fix erklärt:
"Du bist der Gesundheits-Assistent von rechenfix.de. Sei sensibel,
ermutigend, nicht wertend. Empfiehl bei Auffälligkeiten einen Arztbesuch.
Max 120 Wörter. Deutsch, Siezen, keine Markdown-Formatierung."

WICHTIG: Keine Diagnosen stellen. Immer Disclaimer anzeigen.

---

## Wohn-/Energie-Rechner Template

Typische Eingabefelder:
- Wohnfläche in m² (number)
- Haushaltsgröße (Dropdown: 1-5+ Personen)
- Verbrauchswerte (kWh, m³, Liter)
- Preise pro Einheit (€/kWh, €/m³)
- PLZ oder Bundesland

Typische Ausgabe:
- Monatliche und jährliche Kosten
- Vergleich mit Durchschnitt für Haushaltsgröße
- Spartipps mit konkreten €-Beträgen
- Ggf. Affiliate-Box für Anbieterwechsel

KI-Prompt-Kontext für Fix erklärt:
"Du bist der Energieberater von rechenfix.de. Vergleiche mit dem
Durchschnitt und gib 2-3 konkrete Spartipps mit €-Beträgen.
Max 150 Wörter. Deutsch, Siezen, keine Markdown-Formatierung."

---

## Viraler/Fun-Rechner Template

Typische Eingabefelder:
- Wenige, einfache Eingaben (max 3-4 Felder)
- Ein "Berechnen" oder "Zeig mir!" Button (Ausnahme zur Live-Regel,
  weil der Überraschungseffekt wichtig ist)

Typische Ausgabe:
- Überraschende Hauptzahl (groß, bunt, animiert)
- 3-5 "Wussten Sie?"-Fakten basierend auf der Berechnung
- Alltagsvergleiche ("Dafür könnten Sie X kaufen / X Mal fliegen")
- Prominenter Share-Button (WhatsApp!)

KI-Prompt-Kontext für Fix erklärt:
"Du bist der Fun-Facts-Experte von rechenfix.de. Generiere einen
überraschenden, teilenswerten Vergleich basierend auf dem Ergebnis.
Max 80 Wörter. Deutsch, Siezen, keine Markdown-Formatierung."

WICHTIG: Share-Text muss kurz, überraschend und teilenswert sein.

---

## Auto-Rechner Template

Typische Eingabefelder:
- Fahrzeugtyp (Benzin/Diesel/Elektro/Hybrid)
- Verbrauch (l/100km oder kWh/100km)
- Strecke in km
- Preise (€/Liter, €/kWh)
- Hubraum, CO₂-Ausstoß (für Kfz-Steuer)

Typische Ausgabe:
- Kosten pro Strecke/Monat/Jahr
- Vergleich verschiedener Antriebsarten
- Ggf. Affiliate-Box für Kfz-Versicherung

---

## Mathe-Rechner Template

Typische Eingabefelder:
- Zahlen-Eingabefelder
- Modus-Auswahl (Tabs oder Dropdown)
- Rechenoperationen-Auswahl

Typische Ausgabe:
- Ergebnis
- Vollständiger Rechenweg Schritt für Schritt
- Formel anzeigen
- Für Schüler: Erklärung auf einfachem Niveau

KI-Prompt-Kontext für Fix erklärt:
"Du bist der Mathe-Tutor von rechenfix.de. Erkläre den Rechenweg
so einfach wie möglich, als würdest du es einem Schüler erklären.
Max 100 Wörter. Deutsch, Siezen, keine Markdown-Formatierung."

---

## Arbeits-Rechner Template

Typische Eingabefelder:
- Arbeitszeit (Stunden/Woche)
- Gehalt (€ brutto/netto)
- Urlaubstage
- Bundesland (für Feiertage)

Typische Ausgabe:
- Berechnetes Ergebnis
- Gesetzliche Hinweise (vereinfacht)
- Tipps für Arbeitnehmer
- Link zu relevanten Gesetzen

KI-Prompt-Kontext für Fix erklärt:
"Du bist der Arbeitsrecht-Assistent von rechenfix.de. Erkläre
das Ergebnis und gib Tipps für Arbeitnehmer. Weise darauf hin
dass dies keine Rechtsberatung ist.
Max 120 Wörter. Deutsch, Siezen, keine Markdown-Formatierung."

---

## Welle-13-Patterns (Stand 08.05.2026)

### KI-Button + Action-Bar mit Spacing-Doppel-Wrapper

```tsx
// Am Ende des {ergebnis && (...)}-Blocks im Component:

<CrossLink href="/.../..." emoji="..." text="..." />
<CrossLink href="/.../..." emoji="..." text="..." />

<div className="mt-4">
  <AiExplain
    rechnerName="<Name>"
    eingaben={{ /* Calculator-Inputs */ }}
    ergebnis={{ /* Calculator-Outputs */ }}
  />
</div>

<div className="mt-6">
  <ErgebnisAktionen
    ergebnisText="..."
    seitenTitel="<Name>"
  />
</div>
```

### RechnerConfig mit Affiliate-/Amazon-Property (Stand W14.A-Abschluss, 10.05.2026)

Affiliate-Boxen werden NIE hartkodiert im Component eingebaut, sondern als `config.affiliate` deklariert. Renderer macht `Array.isArray`-Check automatisch.

```ts
// In lib/rechner-config/<kategorie>.ts — Single-Box-Variante:
{
  slug: 'mein-rechner',
  titel: '...',
  beschreibung: '...',
  // ... weitere Properties ...
  formel: '...',
  beispiel: '...',
  erklaerung: `...`,
  faq: [ /* 5–8 Q&A, idealerweise 8 für Top-Rechner */ ],
  affiliate: { programId: 'lexware', context: 'mwst' },
  // optional: variant: 'compact' | 'full' (Default 'full')
}
```

```ts
// Multi-Box-Variante (≥2 AffiliateBoxes):
{
  // ... übrige Properties ...
  affiliate: [
    { programId: 'wiso', context: 'einkommensteuer' },
    { programId: 'smartsteuer', context: 'einkommensteuer' },
    { programId: 'cosmosdirekt', context: 'tagesgeld', variant: 'compact' },
  ],
}
```

```ts
// Mit AmazonBox (Keyword-Suchlinks, separates Property):
{
  // ... übrige Properties ...
  affiliate: [
    { programId: 'check24', context: 'spritkosten', variant: 'compact' },
    { programId: 'hotelde', context: 'spritkosten', variant: 'compact' },
  ],
  amazonProducts: [
    { keyword: 'kraftstoffzusatz', description: 'Injektorreiniger und Kraftstoffzusätze können bei älteren Motoren helfen.' },
    // optional: headline (Default 'Passende Produkte auf Amazon')
  ],
}
```

**Anti-Pattern:** `<AffiliateBox />` oder `<AmazonBox />` JSX direkt im Component-File hartkodieren. Vor jedem Component-Edit Pre-Phase-grep durchführen (L-46):

```bash
grep -nE '<AffiliateBox|<AmazonBox' components/rechner/<Name>Rechner.tsx
```

Hartkodierte Treffer ⇒ entweder Standard-Migration via `config.affiliate` oder Sonderfall-Triage (P1 BN, P2 Steuererstattung, P3 Margin-Wrapper, P4a Elterngeld-Conditional, P4b Renten-Hybrid — siehe welle-status-historie).

### Bold-Lead-Listen-Markdown für Anwendungsfälle

```markdown
**Anwendungsfälle: Wann brauchen Sie den <Name>-Rechner?**

Der <Name>-Rechner ist in vielen Lebenssituationen hilfreich — hier fünf konkrete Anwendungsfälle:

- **Szenario-Titel A.** Erklärungs-Text mit Werten und Beispielen, ~50 Wörter pro Stichpunkt.
- **Szenario-Titel B.** Erklärungs-Text...
- **Szenario-Titel C.** Erklärungs-Text...
- **Szenario-Titel D.** Erklärungs-Text...
- **Szenario-Titel E.** Erklärungs-Text...
```

### Bold-Lead-Listen-Markdown für Häufige Fehler

```markdown
**Häufige Fehler bei der <Name>-Berechnung**

- **Fehler A.** Erklärung des Fehlers + Konsequenz, ~30 Wörter.
- **Fehler B.** Erklärung...
- **Fehler C.** Erklärung...
- **Fehler D.** Erklärung...
- **Fehler E.** Erklärung...
```

---

## Welle-14-Patterns (Stand 10.05.2026) — Gesetzes-Stichtag + Tabellen-Constants

### Gesetzes-Bezug im Code-Kommentar (UPDATE-3)

Bei jedem gesetzlich bestimmten Wert/Algorithmus Pflicht-Header vor der Implementation:

```ts
/**
 * Berechnung X nach § <Norm> Abs. <Y>.
 * Stand: <DD.MM.YYYY>. Quelle: <Gesetzes-URL oder BGBl-Referenz>.
 *
 * Letzte Änderung: <DD.MM.YYYY> durch <Gesetz oder VO>.
 */
export function berechneX(...) { ... }
```

**Beispiel:**

```ts
/**
 * Soli-Berechnung nach § 4 SolzG mit Milderungszone.
 * Stand: 09.05.2026. Quelle: gesetze-im-internet.de/solzg_1995/__4.html
 *
 * Aktuelle Werte 2026:
 * - Freigrenze Grundtarif: 20.350 €
 * - Freigrenze Splittingtarif: 40.700 €
 * - Milderungssatz: 11,9 % auf ESt-Differenz
 * - Milderungs-Obergrenze: Freigrenze × 1,859375
 */
export function berechneSoli(est: number, splitting: boolean, jahr: number): number { ... }
```

### Tabellen-Werte als named constants (UPDATE-4)

Drift-anfällige Standardwerte am File-Anfang sammeln, KEINE magic numbers inline:

```ts
// ===========================================
// Standardwerte 2026 (Stichtag-dokumentiert)
// ===========================================

// BBG RV/AV (bundeseinheitlich seit 2025) 2026: 101.400 €/Jahr.
// Stand: 09.05.2026. Quelle: SV-Rechengrößen-VO 2026, BGBl. I 2025 Nr. 367.
export const BBG_RV_JAHR_2026 = 101_400;
export const BBG_RV_MONAT_2026 = 8_450;

// BBG KV/PV 2026: 69.750 €/Jahr.
// Stand: 09.05.2026. Quelle: SV-Rechengrößen-VO 2026.
export const BBG_KV_JAHR_2026 = 69_750;
export const BBG_KV_MONAT_2026 = 5_812.50;

// Mindestlohn ab 01.01.2026: 13,90 €/h. Ab 01.01.2027: 14,60 €/h.
// Stand: 09.05.2026. Quelle: 6. Mindestlohnanpassungsverordnung (BMAS).
// Stichtag-Switch via getAktuellerMindestlohn() in mindestlohn.ts.
export const MINDESTLOHN_2026 = 13.90;
export const MINDESTLOHN_2027 = 14.60;
```

**Anti-Pattern — magic number inline:**

```ts
// ❌ Schlecht: Wert ohne Bezeichnung, Stichtag, Quelle
const netto = brutto - 12348 - (brutto * 0.073);

// ✅ Gut: Named constants mit Stichtag-Header, oder SSOT-Import
import { GRUNDFREIBETRAG_2026 } from '@/lib/berechnungen/einkommensteuer';
import { KV_BASISSATZ_AN_2026 } from '@/lib/berechnungen/brutto-netto';
const netto = brutto - GRUNDFREIBETRAG_2026 - (brutto * KV_BASISSATZ_AN_2026);
```

**Audit-Workflow (Januar jährlich):**

```bash
# Alle dokumentierten Stichtage finden
grep -rn "Stand: " lib/berechnungen/

# Alle Vorjahres-Werte finden (Beispiel: Januar 2027 sucht 2026)
grep -rn "Stand: .*\.2026" lib/berechnungen/
grep -rn "_2026 = " lib/berechnungen/
```
