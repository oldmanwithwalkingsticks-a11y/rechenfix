# Prompt 5: Neuer Rechner — Steuererstattungs-Rechner (für WISO + smartsteuer)

## Aufgabe
Erstelle einen neuen Rechner "Steuererstattungs-Rechner" in der Kategorie "Finanzen" für rechenfix.de. Dieser schätzt die mögliche Steuererstattung und verlinkt auf die Steuer-Software-Affiliates.

## Technischer Kontext
- Gleiche Struktur wie bestehende Finanzen-Rechner
- Next.js App Router, Tailwind CSS

## Rechner-Spezifikation

### Route: `/finanzen/steuererstattung-rechner`

### Eingabefelder:
1. **Jahresbruttoeinkommen** (€, Pflicht, Default: 40000)
2. **Steuerklasse** (Dropdown: I-VI, Default: I)
3. **Entfernung Wohnung-Arbeit** (km, Default: 0)
4. **Arbeitstage pro Jahr** (Default: 220)
5. **Homeoffice-Tage pro Jahr** (Default: 0)
6. **Berufsbedingte Ausgaben** (€, Summe für: Fachliteratur, Fortbildung, Arbeitsmittel, Default: 0)
7. **Haben Sie eine Steuererklärung abgegeben?** (Toggle: Ja/Nein)
8. **Kirchensteuer** (Toggle: Ja/Nein)
9. **Haushaltsnahe Dienstleistungen** (€, z.B. Putzhilfe, Handwerker, Default: 0)
10. **Spenden** (€, Default: 0)

### Berechnungen:
Vereinfachte Schätzung der Steuererstattung:

```
Werbungskosten:
- Pendlerpauschale: km × Arbeitstage × 0,30€ (ab km 21: 0,38€)
- Homeoffice-Pauschale: Homeoffice-Tage × 6€ (max. 1.260€)
- Berufsbedingte Ausgaben: direkter Betrag
- Arbeitnehmer-Pauschbetrag: 1.230€ (wird automatisch abgezogen, nur Differenz zählt)

Sonderausgaben:
- Spenden (direkt absetzbar)

Haushaltsnahe Dienstleistungen:
- 20% direkt von der Steuerschuld (max. 4.000€/Jahr)

Geschätzte Ersparnis:
- Werbungskosten über Pauschbetrag × persönlicher Grenzsteuersatz
- Grenzsteuersatz basierend auf Bruttoeinkommen (vereinfacht: 25-42%)
- Plus haushaltsnahe Dienstleistungen (20% direkt)
```

### Ergebnis-Anzeige:
- **Große Zahl: Geschätzte Steuererstattung** (in Grün)
- Aufschlüsselung:
  - Pendlerpauschale-Effekt
  - Homeoffice-Pauschale-Effekt
  - Sonstige Werbungskosten
  - Haushaltsnahe Dienstleistungen
  - Spendenabzug
- Info-Box: "⚠️ Vereinfachte Schätzung. Die tatsächliche Erstattung hängt von vielen Faktoren ab."
- Motivations-Text: "Im Durchschnitt erhalten Arbeitnehmer 1.063 € zurück. X% der Steuererklärungen führen zu einer Erstattung."

### Affiliate-Integration (ZWEI Boxen — Vergleich-Stil):
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
  <AffiliateBox programId="wiso" context="steuererstattung" variant="full" />
  <AffiliateBox programId="smartsteuer" context="steuererstattung" variant="full" />
</div>
```

Neue Kontext-Texte:
```typescript
wiso: {
  'steuererstattung': 'WISO Steuer: Umfassende Steuersoftware mit automatischem Belegabruf. Ideal für komplexe Steuerfälle.',
},
smartsteuer: {
  'steuererstattung': 'smartsteuer: Online-Steuererklärung in unter 60 Minuten. Perfekt für einfache Steuerfälle.',
}
```

### SEO:
- Title: "Steuererstattungs-Rechner 2026 — Wie viel bekomme ich vom Finanzamt zurück?"
- Description: "Steuererstattung schätzen: Berechnen Sie Ihre mögliche Erstattung anhand von Pendlerpauschale, Homeoffice, Werbungskosten und Sonderausgaben."
- H1: "Steuererstattungs-Rechner 2026"

### SEO-Textblock (unter dem Rechner):
Kurzer informativer Text über:
- Durchschnittliche Steuererstattung in Deutschland
- Welche Kosten absetzbar sind
- Frist für die Steuererklärung (31. Juli bzw. mit Steuerberater verlängert)
- Hinweis: "Mit einer Steuersoftware geht die Erklärung schneller und Sie verpassen keine Absetzposten."

### Kategorie-Eintrag:
- Emoji: 💸
- Name: Steuererstattungs-Rechner
- Beschreibung: "Steuererstattung schätzen: Berechnen Sie Ihre mögliche Rückzahlung vom Finanzamt anhand Ihrer Ausgaben."
