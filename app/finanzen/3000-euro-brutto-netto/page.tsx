import BruttoNettoLongTail from '@/components/seo/BruttoNettoLongTail';
import { berechneBruttoNetto } from '@/lib/berechnungen/brutto-netto';
import type { Metadata } from 'next';

const BRUTTO = 3000;
const n = (sk: 1|2|3|4|5|6) => berechneBruttoNetto({ bruttoMonat: BRUTTO, steuerklasse: sk, kirchensteuer: false, kirchensteuersatz: 9, kinderfreibetraege: 0, bundesland: 'NW', kvArt: 'gesetzlich', kvZusatzbeitrag: 1.7, kvPrivatBeitrag: 0, rvBefreit: false, abrechnungszeitraum: 'monat' });
const fmt = (v: number) => v.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const metadata: Metadata = {
  title: '3.000 Euro brutto wie viel netto 2026? | Rechenfix',
  description: '3.000€ brutto in netto umrechnen ✓ Alle Steuerklassen ✓ Mit Abzügen ✓ Aktuell für 2026.',
  keywords: '3000 euro brutto wieviel netto, 3000 brutto netto, 3000 euro brutto, gehalt 3000 brutto',
  openGraph: {
    title: '3.000 Euro brutto wie viel netto 2026? | Rechenfix',
    description: '3.000€ brutto in netto umrechnen ✓ Alle Steuerklassen ✓ Mit Abzügen ✓ Aktuell für 2026.',
    url: 'https://www.rechenfix.de/finanzen/3000-euro-brutto-netto',
    siteName: 'Rechenfix.de', type: 'website', locale: 'de_DE',
    images: [{ url: 'https://www.rechenfix.de/opengraph-image', width: 1200, height: 630, alt: '3.000 Euro brutto netto 2026 — Rechenfix.de' }],
  },
  twitter: { card: 'summary_large_image', title: '3.000 Euro brutto wie viel netto 2026? | Rechenfix', description: '3.000€ brutto in netto umrechnen ✓ Alle Steuerklassen ✓ Mit Abzügen ✓ Aktuell für 2026.' },
  alternates: { canonical: 'https://www.rechenfix.de/finanzen/3000-euro-brutto-netto' },
};

const faq = [
  { frage: '3.000 Euro brutto — wie viel netto in Steuerklasse 1?', antwort: `Bei 3.000 € brutto bleiben in Steuerklasse 1 ca. ${fmt(n(1).nettoMonat)} € netto übrig. Das entspricht einer Abzugsquote von rund ${n(1).abzuegeProzent}%.` },
  { frage: 'Welche Abzüge habe ich bei 3.000 Euro brutto?', antwort: 'Von 3.000 € brutto werden Lohnsteuer, Solidaritätszuschlag (falls zutreffend), sowie Sozialabgaben (Kranken-, Renten-, Arbeitslosen- und Pflegeversicherung) abgezogen.' },
  { frage: 'Wie viel netto bei 3.000 Euro brutto in Steuerklasse 3?', antwort: `In Steuerklasse 3 behalten Sie bei 3.000 € brutto ca. ${fmt(n(3).nettoMonat)} € netto — deutlich mehr als in SK1.` },
  { frage: 'Ist 3.000 Euro brutto ein gutes Gehalt?', antwort: '3.000 € brutto liegt etwas unter dem deutschen Durchschnittsgehalt von ca. 4.100 € brutto (2025). In Ostdeutschland und in vielen Ausbildungsberufen ist es ein übliches Einstiegsgehalt.' },
];

export default function Page() {
  return (
    <BruttoNettoLongTail
      brutto={BRUTTO}
      seoText="Ein Bruttogehalt von 3.000 Euro monatlich ist ein häufiges Gehalt in Deutschland — insbesondere bei Fachkräften, in kaufmännischen Berufen und in vielen Regionen Ostdeutschlands. Doch wie viel bleibt nach Abzug von Steuern und Sozialabgaben tatsächlich übrig? Die Antwort hängt maßgeblich von Ihrer Steuerklasse ab."
      faq={faq}
    />
  );
}
