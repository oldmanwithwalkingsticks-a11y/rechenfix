import BruttoNettoLongTail from '@/components/seo/BruttoNettoLongTail';
import { berechneBruttoNetto } from '@/lib/berechnungen/brutto-netto';
import type { Metadata } from 'next';

const BRUTTO = 4000;
const n = (sk: 1|2|3|4|5|6) => berechneBruttoNetto({ bruttoMonat: BRUTTO, steuerklasse: sk, kirchensteuer: false, kirchensteuersatz: 9, kinderfreibetraege: 0, bundesland: 'NW', kvArt: 'gesetzlich', kvZusatzbeitrag: 1.7, kvPrivatBeitrag: 0, rvBefreit: false, abrechnungszeitraum: 'monat' });
const fmt = (v: number) => v.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const metadata: Metadata = {
  title: '4.000 Euro brutto wie viel netto 2026?',
  description: '4.000€ brutto in netto umrechnen ✓ Alle Steuerklassen ✓ Mit Abzügen ✓ Aktuell für 2026.',
  keywords: '4000 euro brutto wieviel netto, 4000 brutto netto, 4000 euro brutto, gehalt 4000 brutto',
  openGraph: {
    title: '4.000 Euro brutto wie viel netto 2026?',
    description: '4.000€ brutto in netto umrechnen ✓ Alle Steuerklassen ✓ Mit Abzügen ✓ Aktuell für 2026.',
    url: 'https://www.rechenfix.de/finanzen/4000-euro-brutto-netto',
    siteName: 'Rechenfix.de', type: 'website', locale: 'de_DE',
    images: [{ url: 'https://www.rechenfix.de/opengraph-image', width: 1200, height: 630, alt: '4.000 Euro brutto netto 2026 — Rechenfix.de' }],
  },
  twitter: { card: 'summary_large_image', title: '4.000 Euro brutto wie viel netto 2026?', description: '4.000€ brutto in netto umrechnen ✓ Alle Steuerklassen ✓ Mit Abzügen ✓ Aktuell für 2026.' },
  alternates: { canonical: 'https://www.rechenfix.de/finanzen/4000-euro-brutto-netto' },
};

const faq = [
  { frage: '4.000 Euro brutto — wie viel netto in Steuerklasse 1?', antwort: `Bei 4.000 € brutto bleiben in Steuerklasse 1 ca. ${fmt(n(1).nettoMonat)} € netto übrig. Das entspricht einer Abzugsquote von rund ${n(1).abzuegeProzent}%.` },
  { frage: 'Welche Abzüge habe ich bei 4.000 Euro brutto?', antwort: 'Von 4.000 € brutto werden Lohnsteuer, ggf. Solidaritätszuschlag sowie Sozialabgaben abgezogen. Die progressive Steuer greift hier stärker — die Abzugsquote liegt bei ca. 34-37% in SK1.' },
  { frage: 'Wie viel netto bei 4.000 Euro brutto in Steuerklasse 3?', antwort: `In Steuerklasse 3 behalten Sie bei 4.000 € brutto ca. ${fmt(n(3).nettoMonat)} € netto — das sind ${fmt(n(3).nettoMonat - n(1).nettoMonat)} € mehr als in SK1.` },
  { frage: 'Ist 4.000 Euro brutto ein gutes Gehalt?', antwort: '4.000 € brutto liegt nahe am deutschen Durchschnittsgehalt von ca. 4.100 € brutto (2025). Es ist ein gutes Gehalt, das für die meisten Lebenssituationen in Deutschland ausreicht.' },
];

export default function Page() {
  return (
    <BruttoNettoLongTail
      brutto={BRUTTO}
      seoText="Ein Bruttogehalt von 4.000 Euro monatlich entspricht nahezu dem deutschen Durchschnittsgehalt. In diesem Gehaltsbereich greifen die progressiven Steuersätze bereits spürbar — jeder zusätzliche Euro wird stärker besteuert als der vorherige. Die Wahl der richtigen Steuerklasse kann hier monatlich mehrere hundert Euro Unterschied ausmachen."
      faq={faq}
    />
  );
}
