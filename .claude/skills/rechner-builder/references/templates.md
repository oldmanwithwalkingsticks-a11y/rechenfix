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
