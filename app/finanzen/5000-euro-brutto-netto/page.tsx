import BruttoNettoLongTail from '@/components/seo/BruttoNettoLongTail';
import { berechneBruttoNetto } from '@/lib/berechnungen/brutto-netto';
import { KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT } from '@/lib/berechnungen/sv-parameter';
import type { Metadata } from 'next';

const BRUTTO = 5000;
const n = (sk: 1|2|3|4|5|6) => berechneBruttoNetto({ bruttoMonat: BRUTTO, steuerklasse: sk, kirchensteuer: false, kirchensteuersatz: 9, kinderfreibetraege: 0, bundesland: 'NW', kvArt: 'gesetzlich', kvZusatzbeitrag: KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT, kvPrivatBeitrag: 0, rvBefreit: false, abrechnungszeitraum: 'monat' });
const fmt = (v: number) => v.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const metadata: Metadata = {
  title: '5.000 Euro brutto wie viel netto 2026?',
  description: '5.000€ brutto in netto umrechnen ✓ Alle Steuerklassen ✓ Mit Abzügen ✓ Aktuell für 2026.',
  keywords: '5000 euro brutto wieviel netto, 5000 brutto netto, 5000 euro brutto, gehalt 5000 brutto',
  openGraph: {
    title: '5.000 Euro brutto wie viel netto 2026?',
    description: '5.000€ brutto in netto umrechnen ✓ Alle Steuerklassen ✓ Mit Abzügen ✓ Aktuell für 2026.',
    url: 'https://www.rechenfix.de/finanzen/5000-euro-brutto-netto',
    siteName: 'Rechenfix.de', type: 'website', locale: 'de_DE',
    images: [{ url: 'https://www.rechenfix.de/opengraph-image', width: 1200, height: 630, alt: '5.000 Euro brutto netto 2026 — Rechenfix.de' }],
  },
  twitter: { card: 'summary_large_image', title: '5.000 Euro brutto wie viel netto 2026?', description: '5.000€ brutto in netto umrechnen ✓ Alle Steuerklassen ✓ Mit Abzügen ✓ Aktuell für 2026.' },
  alternates: { canonical: 'https://www.rechenfix.de/finanzen/5000-euro-brutto-netto' },
};

const faq = [
  { frage: '5.000 Euro brutto — wie viel netto in Steuerklasse 1?', antwort: `Bei 5.000 € brutto bleiben in Steuerklasse 1 ca. ${fmt(n(1).nettoMonat)} € netto übrig. Das entspricht einer Abzugsquote von rund ${n(1).abzuegeProzent}%.` },
  { frage: 'Welche Abzüge habe ich bei 5.000 Euro brutto?', antwort: 'Von 5.000 € brutto werden erhebliche Lohnsteuer sowie Sozialabgaben abgezogen. Bei der Krankenversicherung nähert man sich der Beitragsbemessungsgrenze 2026 (5.812,50 €/Monat).' },
  { frage: 'Wie viel netto bei 5.000 Euro brutto in Steuerklasse 3?', antwort: `In Steuerklasse 3 behalten Sie bei 5.000 € brutto ca. ${fmt(n(3).nettoMonat)} € netto — das sind ${fmt(n(3).nettoMonat - n(1).nettoMonat)} € mehr als in SK1.` },
  { frage: 'Ist 5.000 Euro brutto ein überdurchschnittliches Gehalt?', antwort: '5.000 € brutto liegt deutlich über dem deutschen Durchschnitt von ca. 4.100 € brutto. Es entspricht ca. 60.000 € Jahresgehalt und ist typisch für erfahrene Fachkräfte, Ingenieure und akademische Berufe.' },
];

export default function Page() {
  return (
    <BruttoNettoLongTail
      brutto={BRUTTO}
      seoText="Ein Bruttogehalt von 5.000 Euro monatlich (60.000 € jährlich) liegt deutlich über dem deutschen Durchschnitt und ist typisch für erfahrene Fachkräfte, Ingenieure und akademische Berufe. In diesem Gehaltsbereich greift die progressive Steuer bereits stark — der Grenzsteuersatz nähert sich 42%. Gleichzeitig nähert man sich der Beitragsbemessungsgrenze der Krankenversicherung, sodass höhere Gehälter proportional weniger KV-Beitrag zahlen."
      faq={faq}
    />
  );
}
