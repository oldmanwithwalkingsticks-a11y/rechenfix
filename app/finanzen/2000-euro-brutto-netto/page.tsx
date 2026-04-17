import BruttoNettoLongTail from '@/components/seo/BruttoNettoLongTail';
import { berechneBruttoNetto } from '@/lib/berechnungen/brutto-netto';
import type { Metadata } from 'next';

const BRUTTO = 2000;
const n = (sk: 1|2|3|4|5|6) => berechneBruttoNetto({ bruttoMonat: BRUTTO, steuerklasse: sk, kirchensteuer: false, kirchensteuersatz: 9, kinderfreibetraege: 0, bundesland: 'NW', kvArt: 'gesetzlich', kvZusatzbeitrag: 1.7, kvPrivatBeitrag: 0, rvBefreit: false, abrechnungszeitraum: 'monat' });
const fmt = (v: number) => v.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const metadata: Metadata = {
  title: '2.000 Euro brutto wie viel netto 2026?',
  description: '2.000€ brutto in netto umrechnen ✓ Alle Steuerklassen ✓ Mit Abzügen ✓ Aktuell für 2026.',
  keywords: '2000 euro brutto wieviel netto, 2000 brutto netto, 2000 euro brutto, gehalt 2000 brutto',
  openGraph: {
    title: '2.000 Euro brutto wie viel netto 2026?',
    description: '2.000€ brutto in netto umrechnen ✓ Alle Steuerklassen ✓ Mit Abzügen ✓ Aktuell für 2026.',
    url: 'https://www.rechenfix.de/finanzen/2000-euro-brutto-netto',
    siteName: 'Rechenfix.de', type: 'website', locale: 'de_DE',
    images: [{ url: 'https://www.rechenfix.de/opengraph-image', width: 1200, height: 630, alt: '2.000 Euro brutto netto 2026 — Rechenfix.de' }],
  },
  twitter: { card: 'summary_large_image', title: '2.000 Euro brutto wie viel netto 2026?', description: '2.000€ brutto in netto umrechnen ✓ Alle Steuerklassen ✓ Mit Abzügen ✓ Aktuell für 2026.' },
  alternates: { canonical: 'https://www.rechenfix.de/finanzen/2000-euro-brutto-netto' },
};

const faq = [
  { frage: '2.000 Euro brutto — wie viel netto in Steuerklasse 1?', antwort: `Bei 2.000 € brutto bleiben in Steuerklasse 1 ca. ${fmt(n(1).nettoMonat)} € netto übrig. Das entspricht einer Abzugsquote von rund ${n(1).abzuegeProzent}%.` },
  { frage: 'Welche Abzüge habe ich bei 2.000 Euro brutto?', antwort: 'Von 2.000 € brutto werden Lohnsteuer und Sozialabgaben (Kranken-, Renten-, Arbeitslosen- und Pflegeversicherung) abgezogen. Bei diesem Gehalt fällt die Lohnsteuer noch relativ gering aus.' },
  { frage: 'Wie viel netto bei 2.000 Euro brutto in Steuerklasse 3?', antwort: `In Steuerklasse 3 behalten Sie bei 2.000 € brutto ca. ${fmt(n(3).nettoMonat)} € netto — deutlich mehr als in SK1.` },
  { frage: 'Kann man von 2.000 Euro brutto leben?', antwort: '2.000 € brutto ergibt je nach Steuerklasse ca. 1.500-1.700 € netto. In ländlichen Regionen und Ostdeutschland kann das ausreichen, in Großstädten wie München oder Hamburg wird es jedoch knapp.' },
];

export default function Page() {
  return (
    <BruttoNettoLongTail
      brutto={BRUTTO}
      seoText="Ein Bruttogehalt von 2.000 Euro monatlich liegt im Bereich des Mindestlohns bei Vollzeit und betrifft viele Berufseinsteiger, Teilzeitkräfte und Beschäftigte im Niedriglohnsektor. Bei diesem Gehalt fallen die Steuerabzüge noch relativ gering aus, da der Grundfreibetrag einen großen Teil abdeckt — die Sozialabgaben machen jedoch einen festen Prozentsatz aus."
      faq={faq}
    />
  );
}
