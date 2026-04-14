# Prompt 6: Neuer Rechner — Stromvergleich-Rechner (für CHECK24-Affiliate)

## Aufgabe
Erstelle einen neuen Rechner "Stromvergleich-Rechner" in der Kategorie "Wohnen & Energie" für rechenfix.de. Ergänzt den bestehenden Stromkosten-Rechner mit einer Wechsel-Spar-Analyse.

## Technischer Kontext
- Gleiche Struktur wie `/src/app/wohnen/stromkosten-rechner/page.tsx`
- Next.js App Router, Tailwind CSS

## Rechner-Spezifikation

### Route: `/wohnen/stromvergleich-rechner`

### Eingabefelder:
1. **Haushaltsgröße** (Schnellwahl-Buttons: "1 Person", "2 Personen", "3 Personen", "4 Personen", "5+ Personen")
   - Setzt automatisch Durchschnittsverbrauch: 1500, 2500, 3500, 4500, 5500 kWh
2. **Jahresverbrauch** (kWh, manuell überschreibbar)
3. **Aktueller Arbeitspreis** (ct/kWh, Default: 36)
4. **Aktueller Grundpreis** (€/Monat, Default: 12)
5. **PLZ** (5-stellig, für regionalen Kontext — wird nur angezeigt, nicht zur Berechnung genutzt)
6. **Ökostrom bevorzugt?** (Toggle, Default: Nein)

### Berechnungen:
```
Aktuelle Jahreskosten = (Verbrauch × Arbeitspreis/100) + (Grundpreis × 12)
Durchschnittliche Jahreskosten (Marktdurchschnitt 2026):
  - Normaltarif: ~32 ct/kWh + 10€/Monat Grundpreis
  - Ökostrom: ~34 ct/kWh + 11€/Monat Grundpreis

Günstigster geschätzter Tarif (Neukunden-Durchschnitt):
  - Normaltarif: ~28 ct/kWh + 9€/Monat
  - Ökostrom: ~30 ct/kWh + 10€/Monat

Sparpotenzial = Aktuelle Kosten - Günstigster Tarif
Monatliche Ersparnis = Sparpotenzial / 12
```

### Ergebnis-Anzeige:
- **Ihre aktuellen Stromkosten**: X €/Jahr (X €/Monat)
- **Günstigster geschätzter Tarif**: X €/Jahr
- **Mögliche Ersparnis**: X €/Jahr in Grün (oder "Sie zahlen bereits günstig" in Blau)
- Balkenvergleich: Ihre Kosten vs. Durchschnitt vs. Günstigster
- Info-Text: "Die tatsächliche Ersparnis hängt von Ihrem Standort und aktuellen Angeboten ab."

### Affiliate-Integration:
```tsx
<AffiliateBox programId="check24" context="stromvergleich" />
```

Neuer Kontext-Text:
```typescript
check24: {
  'stromvergleich': 'Stromanbieter vergleichen auf CHECK24 — kostenlos, unverbindlich und mit Wechselbonus.',
  'strom': 'Stromtarife vergleichen und bis zu 500 € pro Jahr sparen.',
}
```

### Cross-Link:
Am Ende eine Verlinkung zum bestehenden Stromkosten-Rechner:
"Berechnen Sie die Stromkosten einzelner Geräte → Stromkosten-Rechner"

### SEO:
- Title: "Stromvergleich-Rechner 2026 — Stromanbieter wechseln & sparen"
- Description: "Stromkosten vergleichen: Berechnen Sie Ihr Sparpotenzial beim Anbieterwechsel. Mit Haushaltsgröße, aktuellem Tarif und geschätzter Ersparnis."

### Kategorie-Eintrag:
- Emoji: ⚡
- Name: Stromvergleich-Rechner
- Beschreibung: "Stromanbieter vergleichen: Sparpotenzial berechnen und mit dem aktuellen Tarif vergleichen."
