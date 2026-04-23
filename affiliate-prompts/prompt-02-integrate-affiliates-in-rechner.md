# Prompt 2: Affiliate-Boxen in bestehende Rechner einbauen

## Aufgabe
Integriere die `AffiliateBox`-Komponente (aus `src/components/AffiliateBox.tsx`) in die passenden bestehenden Rechner-Seiten auf rechenfix.de. Die Box soll NACH dem Rechenergebnis angezeigt werden.

## Mapping: Welcher Rechner bekommt welches Affiliate-Programm

### Finanzen-Rechner:
1. **Brutto-Netto-Rechner** (`/finanzen/brutto-netto-rechner`):
   - `<AffiliateBox programId="wiso" context="brutto-netto" />`
   - `<AffiliateBox programId="smartsteuer" context="brutto-netto" />` (als zweite Box, 16px Abstand)

2. **MwSt-Rechner** (`/finanzen/mwst-rechner`):
   - `<AffiliateBox programId="lexware" context="mwst" />`

3. **Zinsrechner** (`/finanzen/zinsrechner`):
   - Kein Affiliate (kein passendes Programm)

4. **Sparrechner** (`/finanzen/sparrechner`):
   - Kein Affiliate

5. **Elterngeld-Rechner** (`/finanzen/elterngeld-rechner`):
   - `<AffiliateBox programId="wiso" context="default" variant="compact" />`

6. **Bürgergeld-Rechner** (`/finanzen/buergergeld-rechner`):
   - `<AffiliateBox programId="check24" context="default" variant="compact" />`

7. **Brutto-Netto-Tabelle** (`/finanzen/brutto-netto-tabelle`):
   - `<AffiliateBox programId="wiso" context="brutto-netto" variant="compact" />`

### Auto & Verkehr:
8. **Kfz-Steuer-Rechner** (`/auto/kfz-steuer-rechner`):
   - `<AffiliateBox programId="check24" context="kfz-steuer" />`
   - `<AffiliateBox programId="wiso" context="kfz-steuer" variant="compact" />`

9. **Spritkosten-Rechner** (`/auto/spritkosten-rechner`):
   - `<AffiliateBox programId="check24" context="default" variant="compact" />`

### Wohnen & Energie:
10. **Stromkosten-Rechner** (`/wohnen/stromkosten-rechner`):
    - `<AffiliateBox programId="check24" context="strom" />`

11. **Heizkosten-Rechner** (`/wohnen/heizkosten-rechner`):
    - `<AffiliateBox programId="check24" context="heizkosten" />`

12. **Nebenkosten-Rechner** (`/wohnen/nebenkosten-rechner`):
    - `<AffiliateBox programId="check24" context="nebenkosten" />`

13. **Grunderwerbsteuer-Rechner** (`/wohnen/grunderwerbsteuer-rechner`):
    - `<AffiliateBox programId="wiso" context="default" variant="compact" />`

### Arbeit & Recht:
14. **Stundenlohn-Rechner** (`/finanzen/stundenlohn-rechner`):
    - `<AffiliateBox programId="lexware" context="stundenlohn" />`

15. **Arbeitszeitrechner** (`/arbeit/arbeitszeitrechner`):
    - `<AffiliateBox programId="lexware" context="default" variant="compact" />`

16. **Urlaubstage-Rechner** (`/arbeit/urlaubstage-rechner`):
    - `<AffiliateBox programId="ks-auxilia" context="urlaubstage" />`

17. **Überstunden-Rechner** (`/arbeit/ueberstunden-rechner`):
    - `<AffiliateBox programId="ks-auxilia" context="ueberstunden" />`
    - `<AffiliateBox programId="lexware" context="default" variant="compact" />`

18. **Pendlerpauschale-Rechner** (`/arbeit/pendlerpauschale-rechner`):
    - `<AffiliateBox programId="wiso" context="pendlerpauschale" />`

## Implementierungs-Anweisungen

1. Öffne jede Rechner-Seite einzeln
2. Finde die Stelle wo das Rechenergebnis angezeigt wird (typischerweise nach dem Ergebnis-Container oder nach der KI-Erklärung)
3. Füge den Import hinzu: `import { AffiliateBox } from '@/components/AffiliateBox';`
4. Platziere die AffiliateBox NACH dem Ergebnis, aber VOR dem SEO-Textblock
5. Bei 2 Boxen auf einer Seite: 16px Abstand dazwischen, max. 2 Boxen pro Rechner
6. Teste dass die Seite noch korrekt rendert

## Wichtig
- Nicht mehr als 2 AffiliateBoxen pro Rechner-Seite
- Die Box soll sich responsive verhalten (100% Breite auf Mobile)
- Keine Affiliate-Boxen in Mathe/Schule-Rechnern (unpassend für die Zielgruppe)
- Keine Affiliate-Boxen in Gesundheits-Rechnern (sensibles Thema)
