import BruttoNettoLongTail from '@/components/seo/BruttoNettoLongTail';
import { berechneBruttoNetto } from '@/lib/berechnungen/brutto-netto';
import { KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT } from '@/lib/berechnungen/sv-parameter';
import type { Metadata } from 'next';

const BRUTTO = 4000;
const LETZTE_AKTUALISIERUNG = '2026-05-22';
const n = (sk: 1|2|3|4|5|6) => berechneBruttoNetto({ bruttoMonat: BRUTTO, steuerklasse: sk, kirchensteuer: false, kirchensteuersatz: 9, kinderfreibetraege: 0, bundesland: 'NW', kvArt: 'gesetzlich', kvZusatzbeitrag: KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT, kvPrivatBeitrag: 0, rvBefreit: false, abrechnungszeitraum: 'monat' });
const fmt = (v: number) => v.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const metadata: Metadata = {
  title: '4.000 Euro brutto wie viel netto 2026?',
  description: '4.000 € brutto in netto: knapp unter dem Median. Beispielstadt Köln, IT- und Ingenieur-Berufe, DACH-Vergleich. Stand 2026.',
  keywords: '4000 euro brutto wieviel netto, 4000 brutto netto, 4000 euro brutto, gehalt 4000 brutto, koeln gehalt',
  openGraph: {
    title: '4.000 Euro brutto wie viel netto 2026?',
    description: '4.000 € brutto in netto: alle Steuerklassen + Beispielstadt Köln + typische IT- und Ingenieur-Berufe + DACH-Vergleich.',
    url: 'https://www.rechenfix.de/finanzen/4000-euro-brutto-netto',
    siteName: 'Rechenfix.de', type: 'website', locale: 'de_DE',
    images: [{ url: 'https://www.rechenfix.de/opengraph-image', width: 1200, height: 630, alt: '4.000 Euro brutto netto 2026 — Rechenfix.de' }],
  },
  twitter: { card: 'summary_large_image', title: '4.000 Euro brutto wie viel netto 2026?', description: '4.000 € brutto in netto: alle Steuerklassen + Köln + typische IT-Berufe + DACH-Vergleich.' },
  alternates: { canonical: 'https://www.rechenfix.de/finanzen/4000-euro-brutto-netto' },
};

const faq = [
  {
    frage: '4.000 Euro brutto — wie viel netto in Steuerklasse 1?',
    antwort: `Bei 4.000 € brutto bleiben in Steuerklasse 1 ca. ${fmt(n(1).nettoMonat)} € netto. Abzugsquote rund ${n(1).abzuegeProzent} %. Der progressive Tarif greift hier deutlich stärker als bei 3.000 €: Pro 100 € Brutto-Plus kommen netto nur noch rund 55-60 € an statt 65-70 € im niedrigeren Bereich.`,
  },
  {
    frage: 'Welche Berufe verdienen typischerweise 4.000 Euro brutto?',
    antwort: 'Mit 4.000 € brutto liegt man knapp unter dem deutschen Median (4.123 €). Klassische Beispiele: IT-Entwickler / Software-Engineer Junior bis Mid-Level mit 2-4 Jahren Berufserfahrung (3.800-4.500 €), Junior-Ingenieur Maschinenbau (3.900-4.400 €), Teamleitung mit 3-5 Mitarbeitern im Mittelstand (3.800-4.300 €). Im öffentlichen Dienst entspricht das TVöD E10-E11.',
  },
  {
    frage: 'Wie viel netto bei 4.000 Euro brutto in Steuerklasse 3?',
    antwort: `In Steuerklasse 3 (verheiratet, Hauptverdiener) bleiben ca. ${fmt(n(3).nettoMonat)} € netto — das sind ${fmt(n(3).nettoMonat - n(1).nettoMonat)} € mehr pro Monat als in Steuerklasse 1. Voraussetzung ist Verheiratung. Der Partner in Steuerklasse 5 zahlt entsprechend mehr Lohnsteuer; die Summen-Jahressteuer ist identisch zu Steuerklasse 4/4.`,
  },
  {
    frage: 'Reicht 4.000 Euro brutto für eine Familie in Köln?',
    antwort: `Als Alleinverdiener mit einem Kind in Köln (75 m² Familienwohnung): In Steuerklasse 3 bleiben ca. ${fmt(n(3).nettoMonat)} € netto, plus 259 € Kindergeld 2026 = ${fmt(n(3).nettoMonat + 259)} € verfügbar. Warmmiete für 75 m² in Köln durchschnittlich ~1.335 € (13,14 €/m² Kalt-Schnitt Q1 2026 + Nebenkosten). Familien-Lebenshaltung 1.400-1.700 €. Sparpotenzial 300-400 €/Monat — knapper als in Hannover oder Dresden.`,
  },
  {
    frage: 'Welche Sparquote ist bei 4.000 Euro brutto realistisch?',
    antwort: 'Solo in Köln mit 4.000 € brutto: Netto SK1 ca. 2.600 €, Warmmiete 50 m² ~895 €. Sparpotenzial 520-650 € pro Monat oder 20-25 % des Nettos — die klassische Vermögensaufbau-Phase. Empfehlung: ETF-Sparplan 400-500 €/Monat, parallel betriebliche Altersvorsorge (bAV) ausreizen (steuerlich gefördert bis 4 % der Beitragsbemessungsgrenze).',
  },
  {
    frage: 'Warum ist 4.000 Euro brutto der häufigste Vergleichswert?',
    antwort: 'Weil 4.000 € sehr nahe am Median-Bruttomonatsverdienst Vollzeit von 4.123 € liegt (Destatis Verdiensterhebung 2025). Für viele qualifizierte Mitte-30-Positionen ist es das "normale Gehalt". Entsprechend dominieren Vergleichsanfragen mit "4000 euro brutto" die Sucher-Volumina, und es konkurrieren zahlreiche Portale um dieses spezielle Keyword.',
  },
  {
    frage: 'Welche Karrieresprünge sind ab 4.000 Euro brutto möglich?',
    antwort: 'Senior-Position nach 3-5 Berufsjahren bringt typisch 4.800-5.800 € brutto. Abteilungsleitung mit 5-15 Mitarbeitern: 5.500-7.000 €. IT-Spezialisierung (DevOps, Cloud, ML, Security): +1.000-2.000 € binnen 12-18 Monaten — oft der schnellste Sprung. Konzern- oder Beratungs-Wechsel bei gleicher Position: +15-25 %.',
  },
  {
    frage: 'Was bedeutet 4.000 Euro brutto im DACH-Vergleich?',
    antwort: 'Deutschland 4.000 €/Monat = 48.000 €/Jahr, etwa 89 % des deutschen Medians (54.066 €). Österreich-Äquivalent: ~44.700 €/Jahr (knapp unter österreichischem Median 50.200 €). Schweiz: vergleichbare Position ~6.800 CHF (~6.300 €) brutto — nominal +57 %. Aber Krankenversicherung pro Person 400-500 CHF/Monat, Zürich-Miete 90 % höher als Köln. Reale Kaufkraft in der Schweiz nur 20-30 % über deutschem Niveau.',
  },
];

// W15B-SPEZIFIK-START
const spezifischerContent = (
  <section className="card p-6 md:p-8 mb-8">
    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
      4.000 Euro brutto — knapp am deutschen Median
    </h2>
    <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-2">Einordnung im Median</h3>
      <p>
        Mit 4.000 € brutto im Monat liegen Sie knapp unter dem Median-Bruttomonatsverdienst Vollzeit von 4.123 € (Destatis Verdiensterhebung April 2025) — etwa beim 49. Perzentil. Das ist für viele qualifizierte Mitte-30-Positionen das „normale Gehalt&ldquo;. Im West-Median (4.620 €) knapp darunter, im Ost-Median (3.834 €) deutlich darüber.
      </p>
      <p>
        Typische Profile: IT-Entwickler Junior bis Mid-Level, Junior-Ingenieure, Teamleiter mit kleinem Team. Im öffentlichen Dienst entspricht das TVöD E10-E11. Weil 4.000 € so häufig als „normaler&ldquo; Vergleichswert genutzt wird, dominieren Such-Anfragen dieses Gehalts-Segment — die Page ist im Search-Console-Bericht als „Duplikat ohne kanonisches Tag&ldquo; markiert. Genau deshalb wurde sie in W15B prioritär aufgewertet.
      </p>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-4">Konkrete Berufe in diesem Gehaltsbereich</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong>IT-Entwickler / Software-Engineer (Junior bis Mid, 2-4 Jahre):</strong> 3.800-4.500 € je nach Stack und Region. Frontend-Entwickler oft am unteren Ende, Backend mit Datenbank-Erfahrung im Mittelfeld, DevOps und Cloud-Engineering oben.
        </li>
        <li>
          <strong>Junior-Ingenieur Maschinenbau:</strong> 3.900-4.400 € im tarifgebundenen Mittelstand und Konzern. Berufseinstieg nach FH oder TU mit erster Projektverantwortung.
        </li>
        <li>
          <strong>Teamleiter mit 3-5 Mitarbeitern:</strong> Im Mittelstand 3.800-4.300 €, im Konzern oft etwas höher. Erste Personalverantwortung als Sprungbrett für höhere Positionen.
        </li>
      </ul>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-4">4.000 Euro brutto in Köln — exemplarische regionale Realität</h3>
      <p>
        Köln als NRW-Hauptmarkt und klassische Großstadt-Mitte repräsentiert den Median-Gehalt-Sweet-Spot. Der ImmoScout24-Durchschnitt für Köln liegt im Q1 2026 bei 13,14 €/m² (+5 % gegenüber Q1 2025). Stadtteile reichen von Chorweiler (11,74 €/m²) und Porz (11,88 €/m²) bis Innenstadt (15,96 €/m²). Ehrenfeld liegt bei 14,15 €/m², Lindenthal bei 14,53 €/m².
      </p>
      <p>
        Die folgenden Werte sind exemplarisch für eine westdeutsche Großstadt mit gehobenem Mietniveau. In günstigeren Städten wie Dresden bleibt deutlich mehr Spielraum; in München wird dasselbe Brutto-Gehalt durch Wohnen aufgezehrt.
      </p>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-4">Was bleibt Solo in Köln</h3>
      <p>
        Nach Lohnsteuer und Sozialabgaben (Steuerklasse 1, kinderlos, GKV, ohne Kirchensteuer) bleiben rund 2.600 € netto. Bei einer 50-m²-Wohnung in mittlerer Lage mit Warmmiete ~895 € (675 € kalt + 220 € Nebenkosten) verbleiben etwa 1.705 € für Lebenshaltung, Sparen und Freizeit. Sparpotenzial 520-650 €/Monat oder 20-25 % des Nettos — die klassische Vermögensaufbau-Phase ist hier voll erreichbar.
      </p>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-4">Familie mit einem Kind in Köln</h3>
      <p>
        Als Alleinverdiener mit einem Kind in Steuerklasse 3 bleiben rund 2.910 € netto. Plus Kindergeld 2026 (259 €) ergibt 3.169 € verfügbar. Eine 75-m²-Familienwohnung in mittlerer Kölner Lage kostet warm ~1.335 €. Mit durchschnittlicher Familien-Lebenshaltung von 1.400-1.700 € bleibt ein Sparpotenzial von 300-400 €/Monat (rund 10-12 %). Niedriger als in Dresden oder Hannover — Köln ist teurer; aber komfortabler als München.
      </p>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-4">Sparpotenzial und Altersvorsorge</h3>
      <p>
        Die Sparquote-Empfehlung der Verbraucherzentrale (15-20 % des Nettos für Altersvorsorge) lässt sich solo problemlos erreichen. Mit dem reformierten Altersvorsorgedepot (Altersvorsorgereformgesetz vom 27.03.2026, Bundestag-Drucksache 21/4088 + 21/4996) lohnt sich ein ETF-Sparplan mit 20 Cent staatlicher Förderung pro eingezahltem Euro. Parallel: betriebliche Altersvorsorge (bAV) ausreizen — steuerlich gefördert bis 4 % der Beitragsbemessungsgrenze.
      </p>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-4">Karriere-Perspektive ab 4.000 Euro brutto</h3>
      <p>
        Senior-Position nach 3-5 Berufsjahren: 4.800-5.800 €. Abteilungsleitung mit 5-15 Mitarbeitern: 5.500-7.000 €. IT-Spezialisierung (DevOps, Cloud-Architektur, ML, Security): +1.000-2.000 € binnen 12-18 Monaten — oft der schnellste Sprung. Konzern-Wechsel oder Beratungsbranche bei gleicher Position: +15-25 %. Ab ~5.000 € beginnt im Finanzministerium-Sinne der „Gutverdiener-Status&ldquo; (Grenze 5.859 €/Monat).
      </p>
    </div>
  </section>
);
// W15B-SPEZIFIK-END

const subtypBlock = (
  <section className="card p-6 md:p-8 mb-8">
    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
      DACH-Vergleich: 4.000 € in Deutschland, Österreich und der Schweiz
    </h3>
    <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">
      <p>
        Deutschland 4.000 €/Monat entspricht 48.000 €/Jahr — etwa 89 % des deutschen Medians (54.066 € laut Destatis PD26_113_621).
      </p>
      <p>
        In <strong>Österreich</strong> liegt eine vergleichbare Position bei rund 44.700 €/Jahr brutto — knapp unter dem österreichischen Median von 50.200 €. Über 14 Auszahlungen inkl. Urlaubs- und Weihnachtsgeld sind das ca. 3.190 € pro Monat.
      </p>
      <p>
        In der <strong>Schweiz</strong> zahlt ein vergleichbares Position-Profil etwa 6.800 CHF (~6.300 €) brutto — nominal 57 % mehr als in Deutschland. Aber: Die obligatorische Grundkrankenversicherung kostet pro erwachsene Person 400-500 CHF/Monat (Familien mit Kindern entsprechend mehr), Zürich-Mieten liegen rund 90 % über Köln. Die reale Kaufkraft in der Schweiz übersteigt das deutsche Niveau für die gleiche Position nur um 20-30 %.
      </p>
      <p>
        Fazit: Mit 4.000 € liegt man im deutschen Mittelfeld. In Zürich oder Genf bekäme man dafür ca. 6.800 CHF nominal — aber Köln, Hamburg oder Frankfurt nähern sich bei Wohnkosten dem Schweizer Niveau. Die Schweiz-Vorteile schmelzen für Familien mit Kindern besonders schnell.
      </p>
    </div>
  </section>
);

export default function Page() {
  return (
    <BruttoNettoLongTail
      brutto={BRUTTO}
      seoText={'Ein Bruttogehalt von 4.000 Euro monatlich liegt knapp unter dem deutschen Median und gilt als „normales&ldquo; Gehalt für qualifizierte Mitte-30-Positionen. Genau deshalb ist 4.000 € einer der häufigsten Brutto-Netto-Vergleichswerte überhaupt — und entsprechend stark mit konkurrierenden Inhalten besetzt. Wie viel netto bleibt tatsächlich übrig?'}
      faq={faq}
      spezifischerContent={spezifischerContent}
      subtypBlock={subtypBlock}
      letzteAktualisierung={LETZTE_AKTUALISIERUNG}
      zeigtAuthorBio={true}
    />
  );
}
