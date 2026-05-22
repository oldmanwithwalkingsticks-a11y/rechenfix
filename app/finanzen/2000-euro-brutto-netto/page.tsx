import BruttoNettoLongTail from '@/components/seo/BruttoNettoLongTail';
import { berechneBruttoNetto } from '@/lib/berechnungen/brutto-netto';
import { KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT } from '@/lib/berechnungen/sv-parameter';
import type { Metadata } from 'next';

const BRUTTO = 2000;
const LETZTE_AKTUALISIERUNG = '2026-05-22';
const n = (sk: 1|2|3|4|5|6) => berechneBruttoNetto({ bruttoMonat: BRUTTO, steuerklasse: sk, kirchensteuer: false, kirchensteuersatz: 9, kinderfreibetraege: 0, bundesland: 'NW', kvArt: 'gesetzlich', kvZusatzbeitrag: KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT, kvPrivatBeitrag: 0, rvBefreit: false, abrechnungszeitraum: 'monat' });
const fmt = (v: number) => v.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const metadata: Metadata = {
  title: '2.000 Euro brutto wie viel netto 2026?',
  description: '2.000 € brutto in netto: Niedriglohn-Sektor. Beispielstadt Chemnitz, Mindestlohn-Bezug, Erwerbstätigen-Freibetrag § 11b SGB II. Stand 2026.',
  keywords: '2000 euro brutto wieviel netto, 2000 brutto netto, 2000 euro brutto, gehalt 2000 brutto, chemnitz gehalt, buergergeld aufstockung',
  openGraph: {
    title: '2.000 Euro brutto wie viel netto 2026?',
    description: '2.000 € brutto in netto: Niedriglohn-Sektor + Beispielstadt Chemnitz + Mindestlohn-Bezug + Erwerbstätigen-Freibetrag SGB II.',
    url: 'https://www.rechenfix.de/finanzen/2000-euro-brutto-netto',
    siteName: 'Rechenfix.de', type: 'website', locale: 'de_DE',
    images: [{ url: 'https://www.rechenfix.de/opengraph-image', width: 1200, height: 630, alt: '2.000 Euro brutto netto 2026 — Rechenfix.de' }],
  },
  twitter: { card: 'summary_large_image', title: '2.000 Euro brutto wie viel netto 2026?', description: '2.000 € brutto in netto: Chemnitz + Mindestlohn-Bezug + Erwerbstätigen-Freibetrag.' },
  alternates: { canonical: 'https://www.rechenfix.de/finanzen/2000-euro-brutto-netto' },
};

const faq = [
  {
    frage: '2.000 Euro brutto — wie viel netto in Steuerklasse 1?',
    antwort: `Bei 2.000 € brutto bleiben in Steuerklasse 1 ca. ${fmt(n(1).nettoMonat)} € netto. Abzugsquote rund ${n(1).abzuegeProzent} %. Die Lohnsteuer fällt hier dank Grundfreibetrag (12.348 € im Jahr 2026) noch sehr gering aus — die Sozialabgaben machen aber ihren festen Prozentsatz aus.`,
  },
  {
    frage: 'Welche Berufe verdienen typischerweise 2.000 Euro brutto?',
    antwort: 'Mindestlohn 2026 bei 13,90 €/h × 173,5 h = 2.413 € — 2.000 € deutet also entweder auf Teilzeit, Tarif unter Mindestlohn-Standard, oder unterstes Tarifgefüge hin. Beispiele: Reinigungskraft Vollzeit nach Tarif (2.100-2.400 €), Servicekraft Gastronomie ohne Berufsausbildung (2.000-2.300 €), Verkäufer/in Einzelhandel ohne Berufserfahrung (2.100-2.400 €). Häufig Teilzeit-Verdienst von ca. 75 % bei mittlerem Stundenlohn.',
  },
  {
    frage: 'Wie viel netto bei 2.000 Euro brutto in Steuerklasse 3?',
    antwort: `In Steuerklasse 3 (verheiratet, Hauptverdiener) bleiben ca. ${fmt(n(3).nettoMonat)} € netto — das sind ${fmt(n(3).nettoMonat - n(1).nettoMonat)} € mehr als in SK1. Voraussetzung Verheiratung. Bei 2.000 € Brutto und niedriger Differenz zu Steuerklasse 5 ist die Wahl der Steuerklasse weniger bedeutsam als bei höheren Gehältern.`,
  },
  {
    frage: 'Was ist der Erwerbstätigen-Freibetrag bei 2.000 Euro brutto?',
    antwort: 'Wer mit 2.000 € Brutto aufstockendes Bürgergeld erhält (möglich bei hohen Mietkosten oder Familie), behält dank § 11b SGB II zusätzlich zum Bürgergeld bis zu 348 € (Single) bzw. 398 € (mit Kind/Alleinerziehend) anrechnungsfrei. Aufschlüsselung: 100 € Grundfreibetrag + 84 € (20 % von 100-520 €) + 144 € (30 % von 520-1.000 €) + 20 € (10 % von 1.000-1.200 €) = 348 €. Erwerbsarbeit lohnt sich immer.',
  },
  {
    frage: 'Reicht 2.000 Euro brutto für eine Familie?',
    antwort: 'Mit nur 2.000 € brutto als Alleinverdiener ist eine Familie mit Kind kaum tragbar — das gesamte Familieneinkommen reicht für die Bedarfsgemeinschaft selten. Bürgergeld-Anspruch wahrscheinlich. Kinderzuschlag (KiZ) bis 297 € pro Monat möglich, Kindergeld 2026 zusätzlich 259 € pro Kind. Realistisch funktioniert das Modell nur als Zweitverdiener im Haushalt oder bei niedrigen Mieten (z. B. ländliches Ostdeutschland).',
  },
  {
    frage: 'Welche Sparquote ist bei 2.000 Euro brutto realistisch?',
    antwort: 'Solo in einer günstigen Stadt wie Chemnitz: Netto SK1 ca. 1.485 €, Warmmiete 50 m² ~520 €. Verbleibt für Lebenshaltung 965 €, Lebenshaltung Solo Minimum ca. 570 €. Theoretisches Sparpotenzial 0-395 €, realistisch 0-50 € pro Monat. Empfehlung: Notgroschen-Aufbau hat absolute Priorität (3 Monatsgehälter auf dem Tagesgeldkonto), Altersvorsorge zunächst zweitrangig.',
  },
  {
    frage: 'Wo liegt 2.000 Euro brutto im deutschen Lohngefüge?',
    antwort: 'Unter den untersten 10 %. Die 10 %-Schwelle des deutschen Vollzeit-Verdienstes liegt bei 33.828 €/Jahr (~2.819 €/Monat laut Destatis PD26_113_621). 2.000 € sind also klar im Niedriglohnsektor. Im Ost-Markt durch die geringeren Mieten und niedrigeren Tarife noch relativ tragfähig, im West-Markt und in Großstädten besonders prekär.',
  },
  {
    frage: 'Welche Karrieresprünge sind ab 2.000 Euro brutto möglich?',
    antwort: 'Ausbildung nachholen → Sprung zum Facharbeiter typisch +30-50 % brutto. Branchenwechsel zu Bau / Logistik / Pflege → +20-40 % möglich. Schicht- und Nachtzulagen → +10-25 %. Mit Mindestlohn-Anpassung 01.01.2027 (von 13,90 € auf 14,60 €) ergeben sich automatisch +5 % Brutto, ohne aktiv etwas zu tun. Wer Vollzeit aus Teilzeit ergänzt, kann den Brutto-Sprung sofort um +30-50 % erhöhen.',
  },
];

// W15B-SPEZIFIK-START
const spezifischerContent = (
  <section className="card p-6 md:p-8 mb-8">
    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
      2.000 Euro brutto — Niedriglohn-Sektor und Mindestlohn-Bezug
    </h2>
    <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-2">Einordnung im Median</h3>
      <p>
        Mit 2.000 € brutto im Monat liegen Sie deutlich unter den untersten 10 % der Vollzeit-Verdienste. Die 10 %-Schwelle nach Destatis liegt bei 2.819 €/Monat (33.828 €/Jahr). 2.000 € sind also klar im Niedriglohnsektor.
      </p>
      <p>
        Der gesetzliche Mindestlohn 2026 beträgt 13,90 € pro Stunde — bei einer 173,5-Stunden-Vollzeit (40 h/Woche × 4,33 Wochen/Monat) ergäbe das 2.413 € brutto. 2.000 € deuten deshalb auf eine von drei Konstellationen hin: Teilzeit-Verdienst (z. B. 30 h/Woche bei Tarif-Lohn), ältere Tarif-Stufen unterhalb des aktuellen Mindestlohn-Standards, oder unterste Tarif-Gruppe in einer wenig dynamischen Branche.
      </p>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-4">Konkrete Berufe in diesem Gehaltsbereich</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong>Reinigungskraft Vollzeit nach Tarif:</strong> 2.100-2.400 € brutto. Branchen-Mindestlöhne in der Innenreinigung 14,25 €/h bzw. 17,65 €/h für Glas-/Fassadenreinigung (Allgemeinverbindlich-Erklärung 2026) liegen über dem allgemeinen MiLoG.
        </li>
        <li>
          <strong>Servicekraft Gastronomie ohne Berufsausbildung:</strong> 2.000-2.300 € brutto. Trinkgeld zusätzlich (im Schnitt 5-15 % vom Umsatz, je nach Position) — steuerfrei bis 100 €/Person/Tag (§ 3 Nr. 51 EStG).
        </li>
        <li>
          <strong>Verkäufer/in Einzelhandel ohne Berufserfahrung:</strong> 2.100-2.400 € brutto. Im Tarifgebiet Einzelhandel mit Tariftreue oft etwas höher (Tarif TVöD-NRW ~2.300 €).
        </li>
      </ul>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-4">2.000 Euro brutto in Chemnitz — exemplarische regionale Realität</h3>
      <p>
        Chemnitz steht repräsentativ für niedrigeres Lohnniveau Ost mit günstigen Mieten. Der ImmoScout24-Durchschnitt für Chemnitz Q1 2026 liegt bei 6,86 €/m² — deutlich unter dem Bundesdurchschnitt von 9,22 €/m². Stadtteile reichen von Sonnenberg (5,68 €/m², günstigste) bis Rabenstein (11,13 €/m², teuerste).
      </p>
      <p>
        Die folgenden Werte sind exemplarisch — in vergleichbaren ostdeutschen Mittelstädten (z. B. Magdeburg, Gera, Cottbus) sind die Verhältnisse ähnlich. In Westdeutschland oder Großstädten ist das Brutto-Niveau für die gleiche Lebenssituation nicht ausreichend.
      </p>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-4">Was bleibt Solo in Chemnitz</h3>
      <p>
        Nach Lohnsteuer und Sozialabgaben (Steuerklasse 1, kinderlos, GKV, ohne Kirchensteuer) bleiben rund 1.485 € netto. Bei einer 50-m²-Wohnung in mittlerer Chemnitzer Lage mit Warmmiete ~520 € (370 € kalt + 150 € Nebenkosten) verbleiben etwa 965 € für Lebenshaltung. Lebenshaltung Solo Minimum nach Destatis-Verbrauchsstichprobe: ~570 €. Theoretisches Sparpotenzial bis ~395 € — realistisch eher 0-50 €.
      </p>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-4">Erwerbstätigen-Freibetrag § 11b SGB II — wichtig für Aufstocker</h3>
      <p>
        Wer mit 2.000 € Brutto Anspruch auf aufstockendes Bürgergeld hat (z. B. bei hohen Mietkosten in Westdeutschland oder mit Kindern), behält nach § 11b SGB II zusätzlich zum Bürgergeld einen anrechnungsfreien Erwerbstätigen-Freibetrag.
      </p>
      <p>
        Aufschlüsselung für 2.000 € Brutto, Single ohne Kind:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>100 € Grundfreibetrag (immer)</li>
        <li>+ 84 € (20 % der Stufe 100-520 €)</li>
        <li>+ 144 € (30 % der Stufe 520-1.000 €)</li>
        <li>+ 20 € (10 % der Stufe 1.000-1.200 €)</li>
        <li>= <strong>348 € Gesamt-Erwerbstätigen-Freibetrag</strong></li>
      </ul>
      <p>
        Mit minderjährigem Kind oder als Alleinerziehende(r) gilt die 10 %-Stufe bis 1.500 € — Gesamtfreibetrag steigt auf <strong>398 €</strong>. Wer mit 2.000 € Brutto an der Bürgergeld-Schwelle steht: Erwerbsarbeit lohnt sich immer, weil dieser Betrag nicht angerechnet wird.
      </p>
      <p>
        Anspruchsvoraussetzung: Das gesamte Haushaltseinkommen muss unter dem Bedarf liegen (Regelsatz Single 2026: 563 € + Kosten der Unterkunft). Bei Solo-Verdienern mit 2.000 € und durchschnittlicher Miete ist Bürgergeld in der Regel ausgeschlossen — bei Familien mit Kindern oder hohen Mieten kann der Anspruch reichen.
      </p>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-4">Familie mit einem Kind in Chemnitz</h3>
      <p>
        Als Alleinverdiener mit 2.000 € Brutto + 1 Kind ist Familienleben kaum tragbar. Realistischer: 2.000 € als Zweitverdiener-Beitrag im Haushalt, oder Teilzeit-Modell. Bei 1 Verdiener mit 2.000 € Brutto + 1 Kind: Bürgergeld-Anspruch wahrscheinlich, Kinderzuschlag (KiZ) bis 297 € pro Monat möglich, Kindergeld 2026 = 259 € zusätzlich.
      </p>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-4">Karriere-Perspektive ab 2.000 Euro brutto</h3>
      <p>
        Ausbildung nachholen → Sprung zum Facharbeiter typisch +30-50 % brutto. Branchenwechsel zu Bau, Logistik oder Pflege → +20-40 % möglich. Schicht- und Nachtzulagen → +10-25 % brutto. Mit Mindestlohn-Anpassung 01.01.2027 (von 13,90 € auf 14,60 €) +5 % automatisch ohne aktive Veränderung. Wer Vollzeit aus Teilzeit ergänzt, kann den Brutto-Sprung sofort um +30-50 % erhöhen.
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
        Im Niedriglohn-Bereich rund um 2.000 € Brutto kombinieren manche Beschäftigte ihr Erwerbseinkommen mit aufstockenden Sozialleistungen — vor allem in teuren Städten oder bei Familiensituationen. § 11b SGB II garantiert dabei, dass nicht das gesamte Einkommen auf das Bürgergeld angerechnet wird.
      </p>
      <p>
        <strong>Staffeltabelle 2026 (anrechnungsfreier Anteil je Stufe):</strong>
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>0-100 €: 100 % (Grundfreibetrag)</li>
        <li>100-520 €: 20 % des darüber liegenden Betrags</li>
        <li>520-1.000 €: 30 % des darüber liegenden Betrags</li>
        <li>1.000-1.200 € (Single ohne Kind): 10 %</li>
        <li>1.000-1.500 € (mit minderjährigem Kind oder Alleinerziehend): 10 %</li>
        <li>Über 1.200 € bzw. 1.500 €: kein weiterer Freibetrag</li>
      </ul>
      <p>
        <strong>Konkrete Praxisrelevanz bei 2.000 € Brutto:</strong> Der Maximum-Freibetrag von 348 € (Single) bzw. 398 € (mit Kind) ist hier voll ausgeschöpft. Wer also wegen hoher Mietkosten oder Familiensituation Bürgergeld-Anspruch hat, behält diesen Betrag zusätzlich zum Sozialgeld. Erwerbsarbeit lohnt sich, weil dieser Teil nicht „verloren&ldquo; geht.
      </p>
      <p>
        <strong>Wichtige Anspruchsgrenze:</strong> Bürgergeld endet typisch bei Nettoeinkommen über etwa 1.300-1.600 € — also bei Single mit 2.000 € Brutto und durchschnittlicher Miete in der Regel kein Anspruch. Bei Familien mit Kindern und/oder besonders hohen Mieten (München, Hamburg, Frankfurt) kann der Anspruch deutlich weiter reichen.
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
      seoText="Ein Bruttogehalt von 2.000 Euro monatlich liegt im Niedriglohn-Sektor — unterhalb der 10 %-Schwelle des deutschen Vollzeit-Verdienstes. Bei diesem Gehalt fallen die Steuerabzüge dank Grundfreibetrag noch gering aus; die Sozialabgaben tragen den größten Anteil. Für Aufstocker mit Bürgergeld-Anspruch ist § 11b SGB II besonders relevant."
      faq={faq}
      spezifischerContent={spezifischerContent}
      subtypBlock={subtypBlock}
      letzteAktualisierung={LETZTE_AKTUALISIERUNG}
      zeigtAuthorBio={true}
    />
  );
}
