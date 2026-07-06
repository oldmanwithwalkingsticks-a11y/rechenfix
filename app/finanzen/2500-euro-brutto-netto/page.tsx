import BruttoNettoLongTail from '@/components/seo/BruttoNettoLongTail';
import { berechneBruttoNetto } from '@/lib/berechnungen/brutto-netto';
import { KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT } from '@/lib/berechnungen/sv-parameter';
import type { Metadata } from 'next';

const BRUTTO = 2500;
const LETZTE_AKTUALISIERUNG = '2026-05-22';
const n = (sk: 1|2|3|4|5|6) => berechneBruttoNetto({ bruttoMonat: BRUTTO, steuerklasse: sk, kirchensteuer: false, kirchensteuersatz: 9, kinderfreibetraege: 0, bundesland: 'NW', kvArt: 'gesetzlich', kvZusatzbeitrag: KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT, kvPrivatBeitrag: 0, rvBefreit: false, abrechnungszeitraum: 'monat' });
const fmt = (v: number) => v.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const metadata: Metadata = {
  title: '2.500 Euro brutto wie viel netto 2026?',
  description: '2.500 € brutto in netto: Berufseinsteiger-Gehalt. Beispielstadt Leipzig (Boom-Markt Ost), Berufseinstieg nach Ausbildung, Erwerbstätigen-Freibetrag.',
  keywords: '2500 euro brutto wieviel netto, 2500 brutto netto, 2500 euro brutto, gehalt 2500 brutto, leipzig gehalt, berufseinstieg',
  openGraph: {
    title: '2.500 Euro brutto wie viel netto 2026?',
    description: '2.500 € brutto in netto: Berufseinsteiger + Beispielstadt Leipzig (Boom-Markt Ost) + Erwerbstätigen-Freibetrag.',
    url: 'https://www.rechenfix.de/finanzen/2500-euro-brutto-netto',
    siteName: 'Rechenfix.de', type: 'website', locale: 'de_DE',
    images: [{ url: 'https://www.rechenfix.de/opengraph-image', width: 1200, height: 630, alt: '2.500 Euro brutto netto 2026 — Rechenfix.de' }],
  },
  twitter: { card: 'summary_large_image', title: '2.500 Euro brutto wie viel netto 2026?', description: '2.500 € brutto in netto: Leipzig + Berufseinstieg + Erwerbstätigen-Freibetrag.' },
  alternates: { canonical: 'https://www.rechenfix.de/finanzen/2500-euro-brutto-netto' },
};

const faq = [
  {
    frage: '2.500 Euro brutto — wie viel netto in Steuerklasse 1?',
    antwort: `Bei 2.500 € brutto bleiben in Steuerklasse 1 ca. ${fmt(n(1).nettoMonat)} € netto. Abzugsquote rund ${n(1).abzuegeProzent} %. Die Lohnsteuer beginnt jetzt deutlich zu greifen — die Sozialabgaben machen weiterhin den festen Anteil aus.`,
  },
  {
    frage: 'Welche Berufe verdienen typischerweise 2.500 Euro brutto?',
    antwort: '2.500 € ist häufig der Berufseinstieg nach abgeschlossener Ausbildung. Beispiele: Industriemechaniker Berufsanfänger im Osten (2.400-2.700 €), Krankenpfleger Berufseinsteiger nach TVöD-P E7 Stufe 1 (2.500-2.700 €), Lkw-Fahrer Klasse CE im Berufseinstieg (2.400-2.800 €). Im Ost-Median Brutto/Jahr 46.013 € = 3.834 €/Monat liegt 2.500 € auch im Ost-Vergleich am unteren Ende.',
  },
  {
    frage: 'Wie viel netto bei 2.500 Euro brutto in Steuerklasse 3?',
    antwort: `In Steuerklasse 3 bleiben ca. ${fmt(n(3).nettoMonat)} € netto — das sind ${fmt(n(3).nettoMonat - n(1).nettoMonat)} € mehr als in SK1. Voraussetzung Verheiratung. Die Differenz zwischen SK1 und SK3 wird bei 2.500 € spürbarer als bei 2.000 €, bleibt aber kleiner als ab 3.500 € aufwärts.`,
  },
  {
    frage: 'Was ist der Erwerbstätigen-Freibetrag bei 2.500 Euro brutto?',
    antwort: 'Genauso wie bei 2.000 €: Bei aufstockendem Bürgergeld-Bezug (seit 01.07.2026 Grundsicherungsgeld) behalten Sie nach § 11b SGB II zusätzlich bis zu 348 € (Single) bzw. 398 € (mit Kind) anrechnungsfrei. Der Maximum-Freibetrag ist bei 1.200 €/1.500 € Brutto bereits ausgeschöpft. Allerdings: Bei 2.500 € Brutto Single in Leipzig ist Bürgergeld-Anspruch in der Regel ausgeschlossen — bei Familien oder sehr hohen Mietkosten (München, Hamburg) kann der Anspruch greifen.',
  },
  {
    frage: 'Reicht 2.500 Euro brutto für eine Familie in Leipzig?',
    antwort: `Als Alleinverdiener mit 1 Kind in Leipzig: In Steuerklasse 3 bleiben ca. ${fmt(n(3).nettoMonat)} € netto + 259 € Kindergeld 2026 = ${fmt(n(3).nettoMonat + 259)} € verfügbar. Warmmiete 75 m² in Leipzig ~1.030 € + Familien-Lebenshaltung ~1.400 € = ~2.430 € Bedarf. Knapp ausgeglichen, ggf. Kinderzuschlag und Wohngeld prüfen. Bei 2 Verdienern mit je 2.500 € (5.000 € HH-Brutto) entspannt sich die Lage deutlich.`,
  },
  {
    frage: 'Welche Sparquote ist bei 2.500 Euro brutto realistisch?',
    antwort: 'Solo in Leipzig: Netto SK1 ca. 1.770 €, Warmmiete 50 m² ~680 €. Verbleibt für Lebenshaltung 1.090 € (Solo-Minimum 570 €). Realistisches Sparpotenzial 100-200 € pro Monat (5-10 % des Nettos). Empfehlung: Notgroschen weiter aufbauen (3 Nettogehälter), parallel kleinen ETF-Sparplan starten mit 50-100 €/Monat als Einstieg.',
  },
  {
    frage: 'Wo liegt 2.500 Euro brutto im deutschen Lohngefüge?',
    antwort: 'Weiterhin im untersten Bereich. Die 10 %-Schwelle des Vollzeit-Verdienstes liegt bei 33.828 €/Jahr (2.819 €/Monat laut Destatis PD26_113_621). 2.500 € sind also knapp darunter, im Niedriglohnsektor. Typischer Wert für Erstbeschäftigung nach Ausbildung. Im Ost-Median (3.834 €) klar unten, im West-Median (4.620 €) deutlich.',
  },
  {
    frage: 'Welche Karrieresprünge sind ab 2.500 Euro brutto möglich?',
    antwort: 'Tarif-Stufenaufstieg über 3-5 Jahre → 2.800-3.200 €. Meister-/Techniker-Weiterbildung → +500-800 € brutto direkt nach Abschluss. Branchenwechsel in höher zahlende Bereiche (Industrie statt Handwerk, IT statt Einzelhandel): +20-40 %. Wechsel von Ost- zu West-Standort bei gleicher Position oft +15-30 %. Mindestlohn-Anpassung 01.01.2027 (auf 14,60 €) bringt automatisch ~5 % brutto.',
  },
];

// W15B-SPEZIFIK-START
const spezifischerContent = (
  <section className="card p-6 md:p-8 mb-8">
    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
      2.500 Euro brutto — Berufseinsteiger nach Ausbildung
    </h2>
    <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-2">Einordnung im Median</h3>
      <p>
        Mit 2.500 € brutto im Monat liegen Sie weiterhin im untersten Bereich des deutschen Lohngefüges. Die 10 %-Schwelle der Vollzeit-Verdienste liegt nach Destatis bei 2.819 €/Monat (33.828 €/Jahr) — 2.500 € sind also knapp darunter, im Niedriglohnsektor. Häufiger Wert für Erstbeschäftigung nach Ausbildung oder für mittlere Tarif-Stufen in nicht-Industrie-Branchen.
      </p>
      <p>
        Im Ost-Median (46.013 €/Jahr = 3.834 €/Monat) liegt 2.500 € auch im Ost-Vergleich am unteren Ende. Im West-Median (4.620 €/Monat) deutlich darunter. Typisch für Berufseinsteiger im Osten oder unteren Tarif in westdeutschen Dienstleistungs- und Pflege-Branchen.
      </p>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-4">Konkrete Berufe in diesem Gehaltsbereich</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong>Industriemechaniker Berufsanfänger Ost:</strong> 2.400-2.700 € im Tarif des Ost-Markts. West-Tarif liegt 200-400 € höher, weshalb gelernte Industriemechaniker oft nach West wechseln.
        </li>
        <li>
          <strong>Krankenpfleger Berufseinsteiger (TVöD-P E7 Stufe 1):</strong> 2.500-2.700 € Grundgehalt. Mit Pflege-Zulagen (Pflegezulage 10 %, Schichtzulagen) plus 13. Monatsgehalt kommt der Jahresdurchschnitt höher.
        </li>
        <li>
          <strong>Lkw-Fahrer Klasse CE im Berufseinstieg:</strong> 2.400-2.800 € Grundgehalt, plus Spesen und Übernachtungspauschalen. Internationale Touren häufig +500-800 €.
        </li>
      </ul>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-4">2.500 Euro brutto in Leipzig — exemplarische regionale Realität</h3>
      <p>
        Leipzig ist die Boom-Stadt Ost und steht repräsentativ für mittlere Mieten mit junger Bevölkerung und Universität. Der ImmoScout24-Schnitt liegt bei 9,10 €/m² (Q1 2026), mietpreise.info weist 10,45 €/m² Median aus. Die Mieten sind 2025 um 12,7 % gestiegen — bundesweit eine der dynamischsten Steigerungen. Stadtteile reichen von Westen (8,18 €/m², günstigste) bis Zentrum-Süd (10,78 €/m², teuerste).
      </p>
      <p>
        Die folgenden Werte sind exemplarisch — in vergleichbaren ostdeutschen Großstädten (z. B. Dresden, Erfurt, Halle) sind die Verhältnisse ähnlich, in Großstädten Westdeutschlands liegt das Mietniveau deutlich höher.
      </p>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-4">Was bleibt Solo in Leipzig</h3>
      <p>
        Nach Lohnsteuer und Sozialabgaben (Steuerklasse 1, kinderlos, GKV, ohne Kirchensteuer) bleiben rund 1.770 € netto. Bei einer 50-m²-Wohnung in mittlerer Leipziger Lage mit Warmmiete ~680 € (500 € kalt + 180 € Nebenkosten) verbleiben etwa 1.090 € für Lebenshaltung, Sparen und Freizeit. Lebenshaltung Solo Minimum ~570 €. Sparpotenzial 100-200 €/Monat oder 5-10 % des Nettos.
      </p>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-4">Erwerbstätigen-Freibetrag § 11b SGB II — auch bei 2.500 €</h3>
      <p>
        Wer mit 2.500 € Brutto aufstockendes Bürgergeld bekommt (möglich bei hohen Mietkosten in Westdeutschland oder mit Familie), behält nach § 11b SGB II zusätzlich bis zu 348 € (Single) bzw. 398 € (mit Kind/Alleinerziehend) anrechnungsfrei. Der Maximum-Freibetrag ist bei 1.200 €/1.500 € Brutto bereits ausgeschöpft — identisch zur 2.000-€-Stufe.
      </p>
      <p>
        Realistische Anspruchsvoraussetzung: Bei Single in Leipzig mit 2.500 € Brutto ist Bürgergeld-Anspruch in der Regel nicht mehr gegeben. Bei Familien mit Kindern und/oder sehr hohen Mietkosten (München, Hamburg, Frankfurt) kann der Anspruch reichen.
      </p>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-4">Familie mit einem Kind in Leipzig</h3>
      <p>
        Als Alleinverdiener mit einem Kind in Steuerklasse 3 bleiben ca. 1.990 € netto. Plus Kindergeld 2026 (259 €) ergibt 2.249 € verfügbar. Eine 75-m²-Familienwohnung in mittlerer Leipziger Lage kostet warm ~1.030 €. Mit Familien-Lebenshaltung von 1.370-2.600 € (Destatis-Verbrauchsstichprobe) wird das Budget eng bis sehr eng. Anspruch auf Kinderzuschlag und ggf. Wohngeld unbedingt prüfen.
      </p>
      <p>
        Bei 2 Verdienern mit je 2.500 € (HH-Brutto 5.000 €) entspannt sich die finanzielle Lage deutlich — das ist das in Leipzig häufige Modell.
      </p>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-4">Karriere-Perspektive ab 2.500 Euro brutto</h3>
      <p>
        Tarif-Stufenaufstieg über 3-5 Berufsjahre bringt typisch 2.800-3.200 € brutto. Meister oder Techniker via berufsbegleitende Weiterbildung: +500-800 € direkt nach Abschluss. Branchenwechsel in höher zahlende Bereiche (Industrie statt Handwerk, IT statt Einzelhandel): +20-40 % möglich. Wechsel von Ost- zu West-Standort bei gleicher Position: oft +15-30 %.
      </p>
      <p>
        Mindestlohn-Anpassung 01.01.2027 (von 13,90 € auf 14,60 €) bringt automatisch ~5 % brutto — bei Vollzeit-Mindestlohn-Bezug also +120 €/Monat ohne aktive Veränderung. Für viele Berufe in diesem Segment (Reinigung, Gastronomie, Einzelhandel) der relevanteste Sprung in 2027.
      </p>
    </div>
  </section>
);
// W15B-SPEZIFIK-END

const subtypBlock = (
  <section className="card p-6 md:p-8 mb-8">
    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
      Erwerbstätigen-Freibetrag bei Bürgergeld-Aufstockung (§ 11b SGB II)
    </h3>
    <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">
      <p>
        Auch bei 2.500 € Brutto kann § 11b SGB II relevant sein — vor allem in teuren Städten oder bei Familien-Situationen, wo das Erwerbseinkommen das Gesamt-Haushaltsbudget nicht alleine deckt.
      </p>
      <p>
        <strong>Staffeltabelle 2026 (anrechnungsfreier Anteil):</strong>
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>0-100 €: 100 % (Grundfreibetrag)</li>
        <li>100-520 €: 20 % des darüber liegenden Betrags</li>
        <li>520-1.000 €: 30 % des darüber liegenden Betrags</li>
        <li>1.000-1.200 € (Single ohne Kind): 10 %</li>
        <li>1.000-1.500 € (mit minderjährigem Kind oder Alleinerziehend): 10 %</li>
      </ul>
      <p>
        <strong>Konkrete Praxisrelevanz bei 2.500 € Brutto:</strong> Maximum-Freibetrag von 348 € (Single) bzw. 398 € (mit Kind) ist erreicht — derselbe wie bei 2.000 €, weil die Staffel bei 1.200 €/1.500 € endet. Anders gesagt: Wer von 2.000 € auf 2.500 € hochgeht, behält nicht zusätzlich mehr anrechnungsfrei, sondern das Mehr-Brutto wird zu 100 % auf das Bürgergeld angerechnet.
      </p>
      <p>
        <strong>Wann der Anspruch wahrscheinlich endet:</strong> Bei Single mit 2.500 € Brutto Vollzeit und durchschnittlicher Miete ist Bürgergeld-Anspruch in der Regel nicht mehr gegeben. Wohngeld bleibt oft eine Option für Geringverdiener mit eigenem Job — andere Berechnung, aber Erwerbsarbeit lohnt sich finanziell immer.
      </p>
      <p>
        Quelle: § 11b SGB II, Bundesagentur für Arbeit, Stand März 2026.
      </p>
    </div>
  </section>
);

export default function Page() {
  return (
    <BruttoNettoLongTail
      brutto={BRUTTO}
      seoText="Ein Bruttogehalt von 2.500 Euro monatlich ist häufig der Berufseinstieg nach abgeschlossener Ausbildung — etwa in Pflege, Industrie-Ost oder Logistik. Bei diesem Gehalt beginnt die Lohnsteuer merklich zu greifen, bleibt aber moderat. Den Großteil der Abzüge machen die Sozialversicherungsbeiträge aus."
      faq={faq}
      spezifischerContent={spezifischerContent}
      subtypBlock={subtypBlock}
      letzteAktualisierung={LETZTE_AKTUALISIERUNG}
      zeigtAuthorBio={true}
    />
  );
}
