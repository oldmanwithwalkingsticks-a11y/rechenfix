import BruttoNettoLongTail from '@/components/seo/BruttoNettoLongTail';
import { berechneBruttoNetto } from '@/lib/berechnungen/brutto-netto';
import type { Metadata } from 'next';

const BRUTTO = 2500;
const n = (sk: 1|2|3|4|5|6) => berechneBruttoNetto({ bruttoMonat: BRUTTO, steuerklasse: sk, kirchensteuer: false, kirchensteuersatz: 9, kinderfreibetraege: 0, bundesland: 'NW', kvArt: 'gesetzlich', kvZusatzbeitrag: 1.7, kvPrivatBeitrag: 0, rvBefreit: false, abrechnungszeitraum: 'monat' });
const fmt = (v: number) => v.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const metadata: Metadata = {
  title: '2.500 Euro brutto wie viel netto 2026? | Rechenfix',
  description: '2.500€ brutto in netto umrechnen ✓ Alle Steuerklassen ✓ Mit Abzügen ✓ Aktuell für 2026.',
  keywords: '2500 euro brutto wieviel netto, 2500 brutto netto, 2500 euro brutto, gehalt 2500 brutto',
  openGraph: {
    title: '2.500 Euro brutto wie viel netto 2026? | Rechenfix',
    description: '2.500€ brutto in netto umrechnen ✓ Alle Steuerklassen ✓ Mit Abzügen ✓ Aktuell für 2026.',
    url: 'https://rechenfix.de/finanzen/2500-euro-brutto-netto',
    siteName: 'Rechenfix.de', type: 'website', locale: 'de_DE',
    images: [{ url: 'https://rechenfix.de/opengraph-image', width: 1200, height: 630, alt: '2.500 Euro brutto netto 2026 — Rechenfix.de' }],
  },
  twitter: { card: 'summary_large_image', title: '2.500 Euro brutto wie viel netto 2026? | Rechenfix', description: '2.500€ brutto in netto umrechnen ✓ Alle Steuerklassen ✓ Mit Abzügen ✓ Aktuell für 2026.' },
  alternates: { canonical: 'https://rechenfix.de/finanzen/2500-euro-brutto-netto' },
};

const faq = [
  { frage: '2.500 Euro brutto — wie viel netto in Steuerklasse 1?', antwort: `Bei 2.500 € brutto bleiben in Steuerklasse 1 ca. ${fmt(n(1).nettoMonat)} € netto übrig. Das entspricht einer Abzugsquote von rund ${n(1).abzuegeProzent}%.` },
  { frage: 'Welche Abzüge habe ich bei 2.500 Euro brutto?', antwort: 'Von 2.500 € brutto werden Lohnsteuer und Sozialabgaben abgezogen. Die Lohnsteuer ist in diesem Bereich noch moderat, den Großteil der Abzüge machen die Sozialabgaben aus.' },
  { frage: 'Wie viel netto bei 2.500 Euro brutto in Steuerklasse 3?', antwort: `In Steuerklasse 3 behalten Sie bei 2.500 € brutto ca. ${fmt(n(3).nettoMonat)} € netto — deutlich mehr als in SK1.` },
  { frage: 'Ist 2.500 Euro brutto ein durchschnittliches Gehalt?', antwort: '2.500 € brutto liegt unter dem deutschen Durchschnitt von ca. 4.100 € brutto. Es ist ein typisches Gehalt für Berufseinsteiger, Handwerksgesellen und in vielen Dienstleistungsberufen.' },
];

export default function Page() {
  return (
    <BruttoNettoLongTail
      brutto={BRUTTO}
      seoText="Ein Bruttogehalt von 2.500 Euro monatlich ist ein typisches Einstiegsgehalt in vielen Branchen — etwa im Handwerk, im Einzelhandel oder in sozialen Berufen. Bei diesem Gehalt beginnt die Lohnsteuer merklich zu greifen, bleibt aber noch moderat. Der Großteil der Abzüge entfällt auf die Sozialversicherungsbeiträge."
      faq={faq}
    />
  );
}
