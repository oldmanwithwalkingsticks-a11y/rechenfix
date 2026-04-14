# Prompt 7: Neuer Rechner — Freelancer-Stundensatz-Rechner (für Lexware Office)

## Aufgabe
Erstelle einen neuen Rechner "Freelancer-Stundensatz-Rechner" in der Kategorie "Arbeit & Recht" für rechenfix.de. Berechnet den nötigen Stundensatz für Selbstständige/Freelancer basierend auf gewünschtem Netto-Einkommen.

## Technischer Kontext
- Gleiche Struktur wie bestehende Arbeit-Rechner
- Next.js App Router, Tailwind CSS

## Rechner-Spezifikation

### Route: `/arbeit/freelancer-stundensatz-rechner`

### Eingabefelder:
1. **Gewünschtes Netto-Monatseinkommen** (€, Default: 3000)
2. **Arbeitstage pro Woche** (Default: 5)
3. **Urlaubstage pro Jahr** (Default: 30)
4. **Krankheitstage pro Jahr** (Default: 10)
5. **Produktive Stunden pro Tag** (fakturierbar, Default: 6)
6. **Krankenversicherung** (€/Monat, Default: 450 — gesetzlich ca. 450-900€)
7. **Rentenvorsorge** (€/Monat, Default: 300)
8. **Betriebsausgaben** (€/Monat, z.B. Büro, Software, Default: 200)
9. **Einkommensteuersatz** (%, Default: 30 — vereinfacht)
10. **Umsatzsteuer** (Dropdown: "19% USt", "Kleinunternehmer (keine USt)")

### Berechnungen:
```
Arbeitstage/Jahr = (Arbeitstage/Woche × 52) - Urlaubstage - Krankheitstage - 10 (Feiertage)
Fakturierbare Stunden/Jahr = Arbeitstage/Jahr × Produktive Stunden/Tag

Monatliche Kosten:
  Netto-Wunsch + KV + Rente + Betriebsausgaben = Gesamt vor Steuern
  Brutto-Bedarf = Gesamt / (1 - Steuersatz/100)
  Jahres-Brutto = Brutto-Bedarf × 12

Stundensatz (netto) = Jahres-Brutto / Fakturierbare Stunden
Stundensatz (brutto, mit USt) = Stundensatz × 1.19 (oder ×1 bei Kleinunternehmer)

Tages-/Wochen-/Monats-Satz ableiten
```

### Ergebnis-Anzeige:
- **Empfohlener Stundensatz**: X € (netto) / X € (brutto inkl. USt)
- Tagessatz: X €
- Monatsumsatz nötig: X €
- Jahresumsatz nötig: X €
- Fakturierbare Stunden/Jahr: X
- Aufschlüsselung als Tortendiagramm: Netto | Steuern | KV | Rente | Betrieb
- Warnung wenn Stundensatz < 50€: "Achtung: Ein Stundensatz unter 50 € ist für viele Branchen nicht nachhaltig."

### Affiliate-Integration:
```tsx
<AffiliateBox programId="lexware" context="freelancer" />
```

Neuer Kontext-Text:
```typescript
lexware: {
  'freelancer': 'Lexware Office: Angebote, Rechnungen und Buchhaltung für Freelancer — alles in einem Tool.',
  'mwst': 'Als Selbstständiger? Lexware Office erstellt Ihre UStVA automatisch.',
  'stundenlohn': 'Stundensatz kalkulieren und direkt Rechnungen schreiben.',
  default: 'Buchhaltung für Selbstständige und Kleinunternehmer.',
}
```

### SEO:
- Title: "Freelancer-Stundensatz-Rechner 2026 — Den richtigen Stundensatz berechnen"
- Description: "Stundensatz für Freelancer berechnen: Von Wunsch-Netto über Versicherungen und Steuern zum nötigen Stundensatz. Mit Tagessatz und Jahresumsatz."

### Kategorie-Eintrag:
- Emoji: 🧑‍💻
- Name: Freelancer-Stundensatz-Rechner
- Beschreibung: "Freelancer-Stundensatz berechnen: Vom Wunsch-Netto zum nötigen Stundensatz inkl. Steuern, Versicherungen und Betriebskosten."
