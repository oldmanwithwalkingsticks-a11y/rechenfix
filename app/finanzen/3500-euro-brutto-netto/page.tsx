import BruttoNettoLongTail from '@/components/seo/BruttoNettoLongTail';
import { berechneBruttoNetto } from '@/lib/berechnungen/brutto-netto';
import type { Metadata } from 'next';

const BRUTTO = 3500;
const n = (sk: 1|2|3|4|5|6) => berechneBruttoNetto({ bruttoMonat: BRUTTO, steuerklasse: sk, kirchensteuer: false, kirchensteuersatz: 9, kinderfreibetraege: 0, bundesland: 'NW', kvArt: 'gesetzlich', kvZusatzbeitrag: 1.7, kvPrivatBeitrag: 0, rvBefreit: false, abrechnungszeitraum: 'monat' });
const fmt = (v: number) => v.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const metadata: Metadata = {
  title: '3.500 Euro brutto wie viel netto 2026?',
  description: '3.500€ brutto in netto umrechnen ✓ Alle Steuerklassen ✓ Mit Abzügen ✓ Aktuell für 2026.',
  keywords: '3500 euro brutto wieviel netto, 3500 brutto netto, 3500 euro brutto, gehalt 3500 brutto',
  openGraph: {
    title: '3.500 Euro brutto wie viel netto 2026?',
    description: '3.500€ brutto in netto umrechnen ✓ Alle Steuerklassen ✓ Mit Abzügen ✓ Aktuell für 2026.',
    url: 'https://www.rechenfix.de/finanzen/3500-euro-brutto-netto',
    siteName: 'Rechenfix.de', type: 'website', locale: 'de_DE',
    images: [{ url: 'https://www.rechenfix.de/opengraph-image', width: 1200, height: 630, alt: '3.500 Euro brutto netto 2026 — Rechenfix.de' }],
  },
  twitter: { card: 'summary_large_image', title: '3.500 Euro brutto wie viel netto 2026?', description: '3.500€ brutto in netto umrechnen ✓ Alle Steuerklassen ✓ Mit Abzügen ✓ Aktuell für 2026.' },
  alternates: { canonical: 'https://www.rechenfix.de/finanzen/3500-euro-brutto-netto' },
};

const faq = [
  { frage: '3.500 Euro brutto — wie viel netto in Steuerklasse 1?', antwort: `Bei 3.500 € brutto bleiben in Steuerklasse 1 ca. ${fmt(n(1).nettoMonat)} € netto übrig. Das entspricht einer Abzugsquote von rund ${n(1).abzuegeProzent}%.` },
  { frage: 'Welche Abzüge habe ich bei 3.500 Euro brutto?', antwort: 'Von 3.500 € brutto werden Lohnsteuer, ggf. Solidaritätszuschlag sowie Sozialabgaben (Kranken-, Renten-, Arbeitslosen- und Pflegeversicherung) abgezogen. Die Abzugsquote liegt bei ca. 33-35% in Steuerklasse 1.' },
  { frage: 'Wie viel netto bei 3.500 Euro brutto in Steuerklasse 3?', antwort: `In Steuerklasse 3 behalten Sie bei 3.500 € brutto ca. ${fmt(n(3).nettoMonat)} € netto — das sind ${fmt(n(3).nettoMonat - n(1).nettoMonat)} € mehr als in SK1.` },
  { frage: 'Ist 3.500 Euro brutto ein gutes Gehalt?', antwort: '3.500 € brutto liegt nahe am deutschen Median-Gehalt. Es ist ein solides Gehalt für Fachkräfte mit einigen Jahren Berufserfahrung, insbesondere außerhalb der Großstädte.' },
];

export default function Page() {
  return (
    <BruttoNettoLongTail
      brutto={BRUTTO}
      seoText="Ein Bruttogehalt von 3.500 Euro monatlich liegt nahe am deutschen Median-Gehalt und ist ein typisches Gehalt für qualifizierte Fachkräfte. Bei diesem Gehalt machen sich die progressiven Steuersätze bereits bemerkbar — die Abzugsquote ist deutlich höher als bei niedrigeren Gehältern. Umso wichtiger ist die richtige Steuerklasse."
      faq={faq}
    />
  );
}
