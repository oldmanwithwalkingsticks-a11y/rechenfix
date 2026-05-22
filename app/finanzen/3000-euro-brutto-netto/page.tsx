import BruttoNettoLongTail from '@/components/seo/BruttoNettoLongTail';
import { berechneBruttoNetto } from '@/lib/berechnungen/brutto-netto';
import { KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT } from '@/lib/berechnungen/sv-parameter';
import type { Metadata } from 'next';

const BRUTTO = 3000;
const LETZTE_AKTUALISIERUNG = '2026-05-22';
const n = (sk: 1|2|3|4|5|6) => berechneBruttoNetto({ bruttoMonat: BRUTTO, steuerklasse: sk, kirchensteuer: false, kirchensteuersatz: 9, kinderfreibetraege: 0, bundesland: 'NW', kvArt: 'gesetzlich', kvZusatzbeitrag: KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT, kvPrivatBeitrag: 0, rvBefreit: false, abrechnungszeitraum: 'monat' });
const fmt = (v: number) => v.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const metadata: Metadata = {
  title: '3.000 Euro brutto wie viel netto 2026?',
  description: '3.000 € brutto in netto: alle Steuerklassen + Beispielstadt Hannover + typische Berufe + DACH-Vergleich. Stand 2026.',
  keywords: '3000 euro brutto wieviel netto, 3000 brutto netto, 3000 euro brutto, gehalt 3000 brutto, hannover gehalt',
  openGraph: {
    title: '3.000 Euro brutto wie viel netto 2026?',
    description: '3.000 € brutto in netto: alle Steuerklassen + Beispielstadt Hannover + typische Berufe + DACH-Vergleich.',
    url: 'https://www.rechenfix.de/finanzen/3000-euro-brutto-netto',
    siteName: 'Rechenfix.de', type: 'website', locale: 'de_DE',
    images: [{ url: 'https://www.rechenfix.de/opengraph-image', width: 1200, height: 630, alt: '3.000 Euro brutto netto 2026 — Rechenfix.de' }],
  },
  twitter: { card: 'summary_large_image', title: '3.000 Euro brutto wie viel netto 2026?', description: '3.000 € brutto in netto: alle Steuerklassen + Beispielstadt Hannover + typische Berufe + DACH-Vergleich.' },
  alternates: { canonical: 'https://www.rechenfix.de/finanzen/3000-euro-brutto-netto' },
};

const faq = [
  {
    frage: '3.000 Euro brutto — wie viel netto in Steuerklasse 1?',
    antwort: `Bei 3.000 € brutto bleiben in Steuerklasse 1 (ledig, kinderlos, GKV, NRW, ohne Kirchensteuer) ca. ${fmt(n(1).nettoMonat)} € netto übrig. Das entspricht einer Abzugsquote von rund ${n(1).abzuegeProzent} %. Mit Kirchensteuer reduziert sich das Netto je nach Bundesland um weitere 8 % (BW/BY) bzw. 9 % der Lohnsteuer.`,
  },
  {
    frage: 'Welche Berufe verdienen typischerweise 3.000 Euro brutto?',
    antwort: '3.000 € brutto pro Monat ist ein häufiges Gehalt für Fachkräfte mit mehrjähriger Berufserfahrung. Beispiele: Industriemechaniker im Westen (2.900-3.400 €), Bürokauffrau mit 5+ Jahren Berufserfahrung (2.900-3.300 €), IT-Support / Helpdesk auf Junior-Level (2.800-3.300 €). Im öffentlichen Dienst entspricht das ungefähr der Tarifgruppe TVöD E8 bis E9, Stufe 2-3.',
  },
  {
    frage: 'Wie viel netto bei 3.000 Euro brutto in Steuerklasse 3?',
    antwort: `In Steuerklasse 3 (verheiratet, Hauptverdiener) bleiben bei 3.000 € brutto ca. ${fmt(n(3).nettoMonat)} € netto — das sind ${fmt(n(3).nettoMonat - n(1).nettoMonat)} € mehr pro Monat als in Steuerklasse 1. Wichtig: Der Partner in Steuerklasse 5 zahlt entsprechend mehr Lohnsteuer. Über die Jahresveranlagung gleicht das Finanzamt die Differenz aus — die tatsächliche Jahressteuer ist identisch zu Steuerklasse 4/4.`,
  },
  {
    frage: 'Reicht 3.000 Euro brutto für eine Familie mit Kind?',
    antwort: `Als Alleinverdiener mit 3.000 € brutto und 1 Kind: In Steuerklasse 3 bleiben rund ${fmt(n(3).nettoMonat)} € netto, plus 259 € Kindergeld 2026 = ${fmt(n(3).nettoMonat + 259)} € verfügbar. In Hannover bei einer 75-m²-Wohnung (~1.180 € warm) und durchschnittlicher Familien-Lebenshaltung (~1.400 €) bleibt das Budget eng — ggf. Anspruch auf Kinderzuschlag prüfen. In günstigeren Städten wie Dresden ist das Budget komfortabler.`,
  },
  {
    frage: 'Welche Sparquote ist bei 3.000 Euro brutto realistisch?',
    antwort: 'Bei 3.000 € brutto solo in einer Stadt mit mittlerem Mietniveau (z. B. Hannover) sind 10-15 % des Nettos als Sparquote realistisch — also rund 200-310 € pro Monat. Die Bundesbank misst für Deutschland 2024 einen Durchschnitt von 11,1 %. Empfehlung Verbraucherzentrale: mindestens 15 % für die Altersvorsorge zurücklegen, idealerweise via ETF-Sparplan. Vor dem ETF: ein Notgroschen von 3 Nettogehältern auf einem Tagesgeldkonto.',
  },
  {
    frage: 'Wo liegt 3.000 Euro brutto im deutschen Lohngefüge?',
    antwort: 'Der Median-Bruttomonatsverdienst Vollzeit liegt 2025 bei 4.123 € (Destatis Verdiensterhebung). 3.000 € sind damit unter dem Median, aber über der 10 %-Schwelle (2.819 €) — ungefähr beim 30. Perzentil. Im Ost-Median (3.834 €) liegt 3.000 € am unteren Ende, im West-Median (4.620 €) deutlich darunter. Für ostdeutsche Großstädte wie Dresden, Leipzig oder Hannover ist es ein solides mittleres Fachkraft-Gehalt.',
  },
  {
    frage: 'Welche Karrieresprünge sind ab 3.000 Euro brutto möglich?',
    antwort: 'Typische nächste Stufen aus diesem Gehaltsbereich: Senior-Position nach 2-4 weiteren Berufsjahren (3.500-4.200 €), Teamleiter-Schritt mit Personalverantwortung (3.800-4.500 €), spezialisierende Weiterbildung wie Meister oder Techniker (+400-800 € sofort). Im öffentlichen Dienst: Tarif-Stufenaufstieg ohne neue Position (~150-250 € alle 2-3 Jahre). IT-Spezialisierung (DevOps, Cloud, Security) bringt oft den größten Sprung — typisch +800-1.500 € binnen 12 Monaten.',
  },
  {
    frage: 'Was bedeutet 3.000 Euro brutto im DACH-Vergleich?',
    antwort: 'Deutschland 3.000 €/Monat entspricht 36.000 €/Jahr — etwa 67 % des deutschen Medians. Österreich-Äquivalent: ~28.500 €/Jahr (auch 67 % des österreichischen Medians). Schweiz: ein vergleichbares Position-Profil zahlt ca. 5.100 CHF (~4.700 €) brutto — nominal 57 % mehr. Aber Zürich-Mieten liegen rund 90 % über Hannover, Krankenversicherung kostet pro Person ~430 € monatlich. Reale Kaufkraft in der Schweiz nur 18-30 % höher.',
  },
];

// W15B-SPEZIFIK-START
const spezifischerContent = (
  <section className="card p-6 md:p-8 mb-8">
    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
      3.000 Euro brutto — was bedeutet das im deutschen Lohngefüge?
    </h2>
    <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-2">Einordnung im Median</h3>
      <p>
        Mit 3.000 € brutto im Monat liegen Sie unter dem deutschen Median-Bruttomonatsverdienst von 4.123 € (Destatis Verdiensterhebung April 2025), aber deutlich über der 10 %-Schwelle von 2.819 €. Das entspricht ungefähr dem 30. Perzentil — rund 70 % der Vollzeit-Beschäftigten in Deutschland verdienen mehr. Im Ost-Median (3.834 €) liegt das Gehalt am unteren Ende, im West-Median (4.620 €) klar darunter.
      </p>
      <p>
        Typisch sind Fachkräfte mit mehrjähriger Berufserfahrung, kaufmännische Sachbearbeiter und mittlere Tarif-Positionen im öffentlichen Dienst (TVöD E8-E9, Stufe 2-3). Im Ost-Markt wie Dresden, Leipzig oder Chemnitz repräsentiert es solides mittleres Fachkraft-Niveau; im West-Markt eher Einstieg oder Teilzeit-Aufstockung.
      </p>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-4">Konkrete Berufe in diesem Gehaltsbereich</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong>Industriemechaniker mit Berufserfahrung (West):</strong> Tarifgebunden in der Metall- und Elektroindustrie zwischen 2.900 und 3.400 €. Mit Schichtzulagen und 13. Monatsgehalt erreichen viele 3.300 € im Schnitt.
        </li>
        <li>
          <strong>Bürokauffrau / -mann mit 5+ Jahren Berufserfahrung:</strong> Sachbearbeitung mit Eigenverantwortung im Mittelstand bei 2.900-3.300 €. Im öffentlichen Dienst Tarifgruppe TVöD E8.
        </li>
        <li>
          <strong>IT-Support / Helpdesk Junior:</strong> Nach Ausbildung oder Quereinstieg liegt das Einstiegsgehalt bei 2.800-3.300 €. Senior-Helpdesk mit Spezialisierungen erreicht oft 3.500 € und mehr.
        </li>
      </ul>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-4">3.000 Euro brutto in Hannover — exemplarische regionale Realität</h3>
      <p>
        Hannover steht als solider mittelgroßer West-Markt repräsentativ für Median-Fachkräfte. Der qualifizierte Mietspiegel 2025 (rechtsgültig bis Ende 2026) weist eine durchschnittliche Nettokaltmiete von 11,50-11,92 €/m² aus. Stadtteile reichen von Burg (8,95 €/m², günstigste) bis Seelhorst (14,87 €/m², teuerste). Eine 50-m²-Wohnung in mittlerer Lage kostet rund 590 € kalt; eine 75-m²-Familienwohnung etwa 890 € kalt.
      </p>
      <p>
        Die folgenden Werte sind exemplarisch — in günstigeren Städten wie Chemnitz oder Dresden bleiben mehr finanzieller Spielraum, in München oder Frankfurt deutlich weniger.
      </p>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-4">Was bleibt Solo in Hannover</h3>
      <p>
        Nach Lohnsteuer und Sozialabgaben (Steuerklasse 1, kinderlos, GKV, ohne Kirchensteuer) bleiben rund 2.050 € netto. Bei einer 50-m²-Wohnung in mittlerer Lage mit Warmmiete ~790 € (590 € kalt + 200 € Nebenkosten inkl. Heizung) verbleiben etwa 1.260 € für Lebenshaltung, Sparen und Freizeit. Lebenshaltung Solo nach Destatis-Verbrauchsstichprobe: zwischen 570 € (Minimum) und 1.130 € (komfortabel). Realistisches Sparpotenzial: 200-310 € pro Monat oder 10-15 % des Nettos.
      </p>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-4">Familie mit einem Kind</h3>
      <p>
        Als Alleinverdiener mit einem Kind bleiben in Steuerklasse 3 rund 2.300 € netto. Plus Kindergeld 2026 (259 € für das erste Kind) ergibt sich ein verfügbares Einkommen von etwa 2.559 €. Bei einer 75-m²-Familienwohnung in Hannover (Warmmiete ~1.180 €) und durchschnittlicher Familien-Lebenshaltung (1.370-2.600 € laut Destatis) wird das Budget eng. Anspruch auf Kinderzuschlag (KiZ) bis 297 €/Monat und ggf. Wohngeld lohnen sich zu prüfen.
      </p>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-4">Sparpotenzial und Altersvorsorge</h3>
      <p>
        Empfohlene Sparquote in diesem Gehaltsbereich: 15 % des Nettos (Verbraucherzentrale-Empfehlung Altersvorsorge), also rund 300 € pro Monat für Solo, deutlich weniger für Familien. Realistisch in Deutschland 2024: 11,1 % im Durchschnitt. Mit dem seit März 2026 reformierten Altersvorsorgedepot (Altersvorsorgereformgesetz BT-Drs. 21/4088 + 21/4996) lohnt sich besonders ein staatlich geförderter ETF-Sparplan: Förderung 20 Cent pro eingezahltem Euro plus Kinderzulage 25 Cent.
      </p>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-4">Karriere-Perspektive ab 3.000 Euro brutto</h3>
      <p>
        Typische Karrieresprünge: Senior-Position nach 2-4 weiteren Berufsjahren (3.500-4.200 €), Teamleiter-Schritt mit Personalverantwortung (3.800-4.500 €), spezialisierende Weiterbildung wie Meister oder Techniker (+400-800 € sofort). Im IT-Bereich bringen Spezialisierungen wie DevOps, Cloud oder Security oft den größten Sprung — +800 bis +1.500 € binnen 12-18 Monaten.
      </p>
    </div>
  </section>
);
// W15B-SPEZIFIK-END

const subtypBlock = (
  <section className="card p-6 md:p-8 mb-8">
    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
      DACH-Vergleich: 3.000 € in Deutschland, Österreich und der Schweiz
    </h3>
    <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">
      <p>
        Wer das deutsche Gehalt mit den DACH-Nachbarn vergleichen will, sollte nicht nur auf die Brutto-Zahl, sondern auf reale Kaufkraft schauen. 3.000 €/Monat in Deutschland entspricht 36.000 €/Jahr — etwa 67 % des deutschen Medians.
      </p>
      <p>
        In <strong>Österreich</strong> liegt der Median bei rund 50.200 €/Jahr. Ein deutsches 3.000 €-Brutto-Gehalt entspricht in der Lohngefüge-Position einem österreichischen Brutto von ca. 28.500 €/Jahr (also etwa 2.380 €/Monat über 12 Auszahlungen oder 2.035 €/Monat über 14 inkl. Urlaubs- und Weihnachtsgeld). Die Lebenshaltungskosten sind in Österreich rund 5-8 % höher als in Deutschland.
      </p>
      <p>
        In der <strong>Schweiz</strong> zahlt eine vergleichbare Position rund 5.100 CHF (~4.700 €) brutto — nominal 57 % mehr. Aber: Zürich-Mieten liegen etwa 90 % über Hannover, die obligatorische Krankenversicherung kostet pro Person 400-500 CHF monatlich (Kinder anteilig), und Lebenshaltung ist 30-50 % teurer. Die reale Kaufkraft liegt für eine vergleichbare Position nur 18-30 % über dem deutschen Niveau.
      </p>
      <p>
        Fazit: Der Schweiz-Vorteil ist deutlich kleiner als die Brutto-Zahl suggeriert. Wer mit 3.000 € in Deutschland gut zurechtkommt, wäre in Zürich auf ähnlichem Lebensstandard.
      </p>
    </div>
  </section>
);

export default function Page() {
  return (
    <BruttoNettoLongTail
      brutto={BRUTTO}
      seoText="Ein Bruttogehalt von 3.000 Euro monatlich ist ein häufiges Gehalt in Deutschland — insbesondere bei Fachkräften mit mehrjähriger Berufserfahrung, in kaufmännischen Berufen und in vielen Regionen Ostdeutschlands. Doch wie viel bleibt nach Abzug von Steuern und Sozialabgaben tatsächlich übrig? Die Antwort hängt maßgeblich von Ihrer Steuerklasse ab."
      faq={faq}
      spezifischerContent={spezifischerContent}
      subtypBlock={subtypBlock}
      letzteAktualisierung={LETZTE_AKTUALISIERUNG}
      zeigtAuthorBio={true}
    />
  );
}
