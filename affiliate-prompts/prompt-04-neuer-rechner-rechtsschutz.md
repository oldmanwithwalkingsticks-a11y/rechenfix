# Prompt 4: Neuer Rechner — Rechtsschutzversicherung-Rechner (für KS Auxilia)

## Aufgabe
Erstelle einen neuen Rechner "Rechtsschutz-Rechner" in der Kategorie "Arbeit & Recht" für rechenfix.de. Berechnet die geschätzten Kosten einer Rechtsschutzversicherung und zeigt, wann sich diese lohnt.

## Technischer Kontext
- Übernimm exakt die Struktur eines bestehenden Rechners (z.B. `/src/app/arbeit/urlaubstage-rechner/page.tsx`)
- Next.js App Router, Tailwind CSS, gleiche Komponenten

## Rechner-Spezifikation

### Route: `/arbeit/rechtsschutz-rechner`

### Eingabefelder:
1. **Lebenssituation** (Dropdown: "Single", "Familie/Paar", "Single mit Kind")
2. **Gewünschte Bausteine** (Multi-Select Checkboxen):
   - ☑ Privatrechtsschutz
   - ☑ Berufs-/Arbeitsrechtsschutz
   - ☑ Verkehrsrechtsschutz
   - ☐ Miet-/Wohnrechtsschutz
3. **Selbstbeteiligung** (Dropdown: "0 €", "150 €", "250 €", "500 €")
4. **Zahlweise** (Dropdown: "Monatlich", "Vierteljährlich", "Jährlich")
5. **Beruf** (Dropdown: "Angestellt", "Selbstständig", "Beamter", "Rentner", "Student")

### Berechnungen (Schätzwerte basierend auf Marktdurchschnitt):
Basis-Monatsbeiträge (Durchschnittswerte 2025/2026):
```
Privat: Single 15€, Familie 22€
Beruf: +8€ (Single), +8€ (Familie)
Verkehr: +5€ (Single), +7€ (Familie)
Miet/Wohn: +6€ (Single), +8€ (Familie)
```

Anpassungen:
- Selbstbeteiligung 150€: -10%, 250€: -18%, 500€: -25%
- Jährlich: -5% Rabatt, Vierteljährlich: -2%
- Selbstständig: +15%, Beamter: -10%, Student: -20%, Rentner: +5%

### Ergebnis-Anzeige:
- **Geschätzter Monatsbeitrag** (große Zahl)
- **Jahresbeitrag**
- Aufschlüsselung nach Bausteinen (kleine Tabelle)
- "Ab wann lohnt es sich?"-Box: Vergleich typischer Anwaltskosten:
  - Arbeitsrechtliche Beratung: ~250-500 €
  - Kündigungsschutzklage: ~3.000-8.000 €
  - Verkehrsunfall-Streit: ~1.500-5.000 €
  - Mietstreitigkeit: ~1.000-3.000 €

### Hinweis-Box (wichtig für Compliance):
```
⚠️ Hinweis: Diese Berechnung zeigt geschätzte Durchschnittswerte.
Der tatsächliche Beitrag hängt von Anbieter, Vorschäden und
individuellen Faktoren ab. Bitte holen Sie ein individuelles
Angebot ein.
```

### Affiliate-Integration:
```tsx
<AffiliateBox programId="ks-auxilia" context="rechtsschutz" />
```

Neuer Kontext-Text:
```typescript
'ks-auxilia': {
  'rechtsschutz': 'KS Auxilia bietet Rechtsschutzversicherung ab 18,90 €/Monat — mit freier Anwaltswahl und ohne Wartezeit im Verkehrsrecht.',
  'kuendigung': 'Im Streitfall abgesichert — Rechtsschutz für Arbeitsrecht.',
  'urlaubstage': 'Arbeitgeber kürzt Urlaub? Rechtsschutz gibt Ihnen Sicherheit.',
  'ueberstunden': 'Unbezahlte Überstunden? Mit Rechtsschutz zu Ihrem Recht.',
  default: 'Rechtsschutz für alle Lebensbereiche.',
}
```

### SEO:
- Title: "Rechtsschutzversicherung-Rechner 2026 — Kosten & Beiträge berechnen"
- Description: "Rechtsschutzversicherung Kosten berechnen: Geschätzter Monatsbeitrag nach Bausteinen, Selbstbeteiligung und Lebenssituation. Mit Lohnt-sich-Analyse."
- Schema.org WebApplication

### Kategorie-Eintrag:
- Emoji: ⚖️
- Name: Rechtsschutz-Rechner
- Beschreibung: "Rechtsschutzversicherung berechnen: Geschätzte Kosten nach Bausteinen, Selbstbeteiligung und Lebenssituation."
