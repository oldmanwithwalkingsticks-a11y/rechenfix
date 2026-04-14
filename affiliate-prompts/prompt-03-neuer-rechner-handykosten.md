# Prompt 3: Neuer Rechner — Handykosten-Rechner (für congstar-Affiliate)

## Aufgabe
Erstelle einen neuen Rechner "Handykosten-Rechner" in der Kategorie "Alltag" für rechenfix.de. Dieser Rechner soll die tatsächlichen monatlichen und jährlichen Handykosten berechnen und mit dem congstar-Affiliate verknüpft werden.

## Technischer Kontext
- Schau dir die Struktur eines bestehenden Rechners an (z.B. `/src/app/alltag/abo-rechner/page.tsx`) und verwende exakt die gleiche Struktur, Komponenten und Patterns
- Next.js App Router, Tailwind CSS
- Die bestehende Rechner-Infrastruktur nutzen (Layout, SEO-Meta, Schema.org, Share-Buttons, KI-Erklärung etc.)

## Rechner-Spezifikation

### Route: `/alltag/handykosten-rechner`

### Eingabefelder:
1. **Monatlicher Tarifpreis** (€, Pflicht, Default: 15)
2. **Vertragslaufzeit** (Dropdown: "Monatlich kündbar", "12 Monate", "24 Monate")
3. **Einmaliger Gerätepreis** (€, Optional, Default: 0)
4. **Geräte-Ratenzahlung** (Toggle: Ja/Nein, wenn Ja → monatliche Rate eingeben)
5. **Zusatzoptionen pro Monat** (€, Optional — z.B. Auslandsflatrate, Cloud etc.)
6. **Datenvolumen** (GB, Info-Feld zur Anzeige, Default: 10)
7. **Aktueller Anbieter-Kosten** (€/Monat, Optional — zum Vergleich)

### Berechnungen (live, kein Button):
- **Effektive Monatskosten** = Tarifpreis + Zusatzoptionen + (Gerätepreis / Vertragslaufzeit-Monate falls keine Raten, sonst Ratenpreis)
- **Jahreskosten** = Effektive Monatskosten × 12
- **Gesamtkosten über Vertragslaufzeit**
- **Kosten pro GB** = Effektive Monatskosten / Datenvolumen
- **Ersparnis vs. aktueller Anbieter** (wenn angegeben): Differenz pro Monat und pro Jahr

### Ergebnis-Anzeige:
- Große Zahl: Effektive Monatskosten
- Darunter: Jahreskosten, Gesamtkosten, Kosten/GB
- Falls Vergleich: Grüne/rote Anzeige ob günstiger oder teurer
- Balkendiagramm: Aufschlüsselung (Tarif | Gerät | Zusatzoptionen)

### Affiliate-Integration:
Nach dem Ergebnis:
```tsx
<AffiliateBox programId="congstar" context="handykosten" />
```

Füge in der AffiliateBox-Config einen neuen Kontext-Text hinzu:
```typescript
congstar: {
  'handykosten': 'congstar bietet faire Tarife ab 5 €/Monat — monatlich kündbar und ohne versteckte Kosten.',
  default: 'Faire Handytarife ohne versteckte Kosten.',
}
```

### SEO:
- Title: "Handykosten-Rechner 2026 — Monatliche & jährliche Kosten berechnen"
- Description: "Handykosten berechnen: Effektive Monatskosten inkl. Gerät, Tarif und Zusatzoptionen. Mit Anbieter-Vergleich und Kostenaufschlüsselung."
- Schema.org WebApplication Markup (wie bei anderen Rechnern)

### KI-Erklärung (Fix erklärt):
Wenn der User auf "Fix erklärt" klickt, soll die KI-Erklärung die Kosten analysieren und Tipps geben, z.B.:
- Ob ein günstigerer Tarif ohne Gerät sinnvoller wäre
- Ob monatlich kündbar vs. 24 Monate günstiger ist
- Kosten pro GB im Vergleich zum Marktdurchschnitt

## Kategorie-Eintrag
Füge den Rechner in die Kategorie "Alltag" ein (wo die anderen Alltags-Rechner gelistet werden):
- Emoji: 📱
- Name: Handykosten-Rechner
- Beschreibung: "Handykosten berechnen: Effektive Monatskosten, Jahreskosten und Kostenaufschlüsselung für Ihren Mobilfunkvertrag."
