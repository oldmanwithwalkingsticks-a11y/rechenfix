# Prompt 1: Affiliate-Empfehlungsbox-Komponente

## Aufgabe
Erstelle eine wiederverwendbare React-Komponente `AffiliateBox` für rechenfix.de, die kontextuelle Affiliate-Empfehlungen nach dem Rechenergebnis anzeigt.

## Technischer Kontext
- Next.js App Router Projekt
- Tailwind CSS für Styling
- Bestehende Komponenten in `/src/components/`
- Deutsche Sprache, "Sie"-Anrede

## Anforderungen

### 1. Neue Datei: `src/components/AffiliateBox.tsx`
Client Component mit Props:
```typescript
interface AffiliateBoxProps {
  programId: 'wiso' | 'smartsteuer' | 'lexware' | 'check24' | 'congstar' | 'ks-auxilia' | 'eventfloss';
  context?: string; // z.B. "brutto-netto", "mwst", "strom"
  variant?: 'compact' | 'full'; // compact = 1 Zeile, full = mit Beschreibung
}
```

### 2. Affiliate-Daten als Konstante (gleiche Datei oder eigene config)
```typescript
const AFFILIATE_PROGRAMS = {
  wiso: {
    name: 'WISO Steuer',
    tagline: 'Steuererklärung leicht gemacht — durchschnittlich 1.063 € Erstattung',
    cta: 'WISO Steuer ansehen',
    url: '%%WISO_TRACKING_URL%%', // Placeholder für echte Tracking-URL
    color: '#0066CC',
    icon: '📊',
  },
  smartsteuer: {
    name: 'smartsteuer',
    tagline: 'Online-Steuererklärung in unter 1 Stunde — ohne Vorkenntnisse',
    cta: 'smartsteuer testen',
    url: '%%SMARTSTEUER_TRACKING_URL%%',
    color: '#00A651',
    icon: '⚡',
  },
  lexware: {
    name: 'Lexware Office',
    tagline: 'Buchhaltung, Rechnungen & Steuern — alles in einer Software',
    cta: 'Lexware Office testen',
    url: '%%LEXWARE_TRACKING_URL%%',
    color: '#003399',
    icon: '💼',
  },
  check24: {
    name: 'CHECK24',
    tagline: 'Anbieter vergleichen und sofort sparen',
    cta: 'Jetzt vergleichen',
    url: '%%CHECK24_TRACKING_URL%%',
    color: '#003E7E',
    icon: '🔍',
  },
  congstar: {
    name: 'congstar',
    tagline: 'Faire Handytarife ohne versteckte Kosten',
    cta: 'Tarife ansehen',
    url: '%%CONGSTAR_TRACKING_URL%%',
    color: '#FF6600',
    icon: '📱',
  },
  'ks-auxilia': {
    name: 'KS Auxilia Rechtsschutz',
    tagline: 'Rechtsschutzversicherung ab 18,90 €/Monat — für Arbeit, Verkehr & Privat',
    cta: 'Rechtsschutz anfragen',
    url: '%%KS_AUXILIA_TRACKING_URL%%',
    color: '#B22222',
    icon: '⚖️',
  },
  eventfloss: {
    name: 'Eventfloss Berlin',
    tagline: 'Unvergessliche Events auf dem Wasser — jetzt planen',
    cta: 'Events entdecken',
    url: '%%EVENTFLOSS_TRACKING_URL%%',
    color: '#1E90FF',
    icon: '🚢',
  },
};
```

### 3. Kontextuelle Beschreibungen
Je nach `context`-Prop soll ein angepasster Satz angezeigt werden:
```typescript
const CONTEXT_TEXTS: Record<string, Record<string, string>> = {
  wiso: {
    'brutto-netto': 'Mit der Steuererklärung holen Sie sich einen Teil der Abzüge zurück.',
    'kfz-steuer': 'Die Kfz-Steuer können Sie in der Steuererklärung als Werbungskosten angeben.',
    'pendlerpauschale': 'WISO Steuer berechnet Ihre Pendlerpauschale automatisch optimal.',
    default: 'Steuererklärung machen und Geld zurückholen.',
  },
  lexware: {
    'mwst': 'Als Selbstständiger? Lexware Office erstellt Ihre UStVA automatisch.',
    'stundenlohn': 'Stundensatz kalkulieren und direkt Rechnungen schreiben.',
    default: 'Buchhaltung für Selbstständige und Kleinunternehmer.',
  },
  check24: {
    'strom': 'Stromtarife vergleichen und bis zu 500 € pro Jahr sparen.',
    'heizkosten': 'Gas- und Heizstromtarife vergleichen und Heizkosten senken.',
    'nebenkosten': 'Strom- und Gasanbieter wechseln — einfach und kostenlos.',
    'kfz-steuer': 'Kfz-Versicherung vergleichen und bis zu 850 € sparen.',
    default: 'Tarife vergleichen und bares Geld sparen.',
  },
  'ks-auxilia': {
    'kuendigung': 'Im Streitfall abgesichert — Rechtsschutz für Arbeitsrecht.',
    'urlaubstage': 'Arbeitgeber kürzt Urlaub? Rechtsschutz gibt Ihnen Sicherheit.',
    'ueberstunden': 'Unbezahlte Überstunden? Mit Rechtsschutz zu Ihrem Recht.',
    default: 'Rechtsschutz für alle Lebensbereiche.',
  },
};
```

### 4. Design-Anforderungen
- Dezent, nicht aufdringlich — passt zum bestehenden rechenfix.de Design
- Linksborder in Programmfarbe (4px solid)
- Hintergrund: leichtes Grau (#f9fafb)
- Padding: 16px
- Runde Ecken (8px)
- Label "Anzeige" oder "Empfehlung" klein oben rechts in grauer Schrift (8px)
- CTA als dezenter Button oder Link mit Pfeil →
- rel="noopener noreferrer sponsored" auf allen Affiliate-Links
- target="_blank" auf allen Links
- Margin-top: 24px (Abstand zum Rechenergebnis)

### 5. Consent-Check
Die Komponente soll nur rendern, wenn der User Cookie-Consent für Marketing gegeben hat. Prüfe ob ein bestehendes Consent-System existiert (z.B. Cookie-Banner State). Falls nicht, rendere die Box trotzdem, aber ohne Tracking-Parameter in der URL.

### 6. Keine externen Dependencies
Nur React + Tailwind.

## Erwartetes Ergebnis
Eine Datei `src/components/AffiliateBox.tsx` die so eingebunden wird:
```tsx
<AffiliateBox programId="wiso" context="brutto-netto" variant="full" />
```
