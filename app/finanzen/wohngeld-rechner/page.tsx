import type { Metadata } from 'next';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ZurueckButton from '@/components/layout/ZurueckButton';
import AdSlot from '@/components/ads/AdSlot';
import StructuredData from '@/components/seo/StructuredData';
import { generateFAQSchema, generateBreadcrumbSchema } from '@/lib/seo';
import {
  HOECHSTBETRAEGE_WOGG_2026,
  ZUSCHLAG_PRO_PERSON_WOGG_2026,
} from '@/lib/berechnungen/wohngeld';

const BMWSB_WOHNGELDRECHNER_URL =
  'https://www.bmwsb.bund.de/DE/wohnen/wohngeld/wohngeldrechner/wohngeldrechner-2025_node.html';

const MIETSTUFEN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'] as const;

export const metadata: Metadata = {
  title: 'Wohngeld 2026: Anspruch, Mietstufen & Berechnung erklärt',
  description:
    'Wohngeld 2026: Wer hat Anspruch, wie funktionieren die Mietstufen und welche Höchstbeträge gelten? Kompakte Erklärung mit Link zum verbindlichen BMWSB-Wohngeldrechner.',
  alternates: { canonical: 'https://www.rechenfix.de/finanzen/wohngeld-rechner' },
  openGraph: {
    title: 'Wohngeld 2026: Anspruch, Mietstufen & Berechnung erklärt',
    description:
      'Wohngeld 2026: Anspruch, Mietstufen, Höchstbeträge. Mit Link zum offiziellen BMWSB-Rechner.',
    url: 'https://www.rechenfix.de/finanzen/wohngeld-rechner',
    siteName: 'Rechenfix.de',
    type: 'article',
    locale: 'de_DE',
    images: [
      {
        url: 'https://www.rechenfix.de/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Wohngeld 2026 — Rechenfix.de',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wohngeld 2026: Anspruch, Mietstufen & Berechnung erklärt',
    description:
      'Wohngeld 2026: Anspruch, Mietstufen, Höchstbeträge. Mit Link zum offiziellen BMWSB-Rechner.',
  },
};

const faq = [
  {
    frage: 'Wer hat Anspruch auf Wohngeld?',
    antwort:
      'Mieter und Eigentümer (Selbstnutzer) mit Einkommen oberhalb des Bürgergeld-Bedarfs, aber unterhalb der Einkommensgrenzen nach dem Wohngeldgesetz. Ausgeschlossen sind Empfänger von Bürgergeld oder Grundsicherung im Alter, da diese Leistungen den Unterkunftsbedarf bereits enthalten. Der Antrag wird bei der Wohngeldbehörde der jeweiligen Kommune gestellt.',
  },
  {
    frage: 'Welche Einkommensgrenzen gelten 2026?',
    antwort:
      'Wohngeld kennt keine feste Einkommensgrenze. Ob Anspruch besteht, ergibt sich aus dem Zusammenspiel von Haushaltsgröße, Mietstufe, zu berücksichtigender Miete und den Abzügen nach §§ 14 bis 16 WoGG — also Werbungskosten sowie pauschale Abzüge von 10, 20 oder 30 Prozent für Steuer, Kranken- und Rentenversicherung, dazu individuelle Freibeträge. Die Obergrenzen steigen mit der Mietstufe und der Haushaltsgröße. Für die konkrete Prüfung Ihrer Konstellation nutzen Sie bitte den offiziellen BMWSB-Wohngeldrechner.',
  },
  {
    frage: 'Wie finde ich meine Mietstufe?',
    antwort:
      'Die Mietstufe ist im Mietstufenverzeichnis des BMWSB festgelegt und hängt vom Mietniveau der Gemeinde ab. Die Zuordnung findet man beim örtlichen Wohngeldamt oder über Online-Tools der Bundesländer — viele Portale erlauben die Suche per Gemeindename oder Postleitzahl.',
  },
  {
    frage: 'Wird Wohngeld rückwirkend gezahlt?',
    antwort:
      'Wohngeld wird grundsätzlich ab dem Ersten des Monats gezahlt, in dem der Antrag bei der Wohngeldbehörde eingegangen ist (§ 25 Abs. 2 WoGG). Eine Rückwirkung für frühere Monate gibt es nur in engen Ausnahmefällen — zum Beispiel wenn ein zuvor gestellter Antrag auf Bürgergeld abgelehnt wurde und der Wohngeldantrag noch im Folgemonat nachgereicht wird (§ 25 Abs. 3 WoGG), oder bei einer rückwirkenden Mieterhöhung von mehr als zehn Prozent (§ 27 WoGG). Für zurückliegende Monate ohne solche Ausnahmesituation entsteht kein Anspruch — ein zügiger Antrag ist daher wichtig.',
  },
  {
    frage: 'Warum zeigt rechenfix.de aktuell keinen interaktiven Wohngeld-Rechner?',
    antwort:
      'Wir haben in unserer Berechnungslogik einen architektonischen Fehler bei Mehrpersonen-Haushalten identifiziert: Die Einkommensermittlung nach den §§ 14 bis 16 WoGG verlangt eine Berechnung pro Haushaltsmitglied mit individueller Werbungskostenpauschale, die unsere aktuelle Lib nicht abbildet. Anstatt möglicherweise falsche Werte anzuzeigen, bieten wir bis zum Relaunch im Juli 2026 diese Übersichtsseite an und verweisen für die verbindliche Berechnung auf den offiziellen Rechner des BMWSB.',
  },
];

const breadcrumbItems = [
  { name: 'Startseite', url: 'https://www.rechenfix.de/' },
  { name: 'Finanzen', url: 'https://www.rechenfix.de/finanzen' },
  {
    name: 'Wohngeld-Rechner',
    url: 'https://www.rechenfix.de/finanzen/wohngeld-rechner',
  },
];

function fmtEuro(n: number): string {
  return n.toLocaleString('de-DE');
}

export default function WohngeldErklaerseite() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <StructuredData data={generateBreadcrumbSchema(breadcrumbItems)} />
      <StructuredData data={generateFAQSchema(faq)} />

      <Breadcrumbs
        items={[
          { label: 'Finanzen', href: '/finanzen' },
          { label: 'Wohngeld-Rechner' },
        ]}
      />

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
          <AdSlot typ="leaderboard" className="mb-6" />

          <ZurueckButton fallbackHref="/finanzen" label="Zurück" />

          {/* Hinweis-Banner, prominent abgesetzt, oberhalb des H1 */}
          <div
            role="note"
            aria-label="Hinweis zum Wohngeld-Rechner"
            className="card p-5 md:p-6 mb-6 border-2 border-amber-400 dark:border-amber-500/60 bg-amber-50 dark:bg-amber-500/10"
          >
            <p className="text-sm md:text-base text-amber-900 dark:text-amber-100 leading-relaxed">
              <strong>Hinweis:</strong> Unser interaktiver Wohngeld-Rechner wird zum 01.07.2026
              gemeinsam mit der Reform zur Neuen Grundsicherung grundlegend neu gelauncht. Bis dahin
              finden Sie hier alle Informationen zum Wohngeld. Für Ihre verbindliche Berechnung
              nutzen Sie bitte den{' '}
              <a
                href={BMWSB_WOHNGELDRECHNER_URL}
                target="_blank"
                rel="noopener"
                className="underline font-semibold text-amber-900 dark:text-amber-100 hover:text-amber-700 dark:hover:text-amber-200"
              >
                offiziellen Wohngeldrechner des BMWSB
              </a>
              .
            </p>
          </div>

          {/* Hauptinhalt */}
          <div className="card p-6 md:p-8 mb-8">
            <h1 className="text-2xl md:text-3xl font-extrabold text-primary-700 dark:text-primary-300 mb-3">
              Wohngeld 2026 — Anspruch, Mietstufen & Berechnung erklärt
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Was Wohngeld ist, wer Anspruch hat, wie sich die Höhe ergibt — kompakt erklärt mit
              den aktuellen Höchstbeträgen nach § 12 WoGG.
            </p>

            <section className="prose dark:prose-invert max-w-none">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-8 mb-3">
                Was ist Wohngeld?
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                Wohngeld ist ein Zuschuss des Staates zu den Wohnkosten. Mieter erhalten einen
                Mietzuschuss, selbstnutzende Eigentümer einen Lastenzuschuss (§ 1 WoGG). Die
                Leistung wird je zur Hälfte von Bund und Ländern finanziert. Wohngeld ist
                einkommensabhängig und keine Sozialleistung im engeren Sinne: Empfänger stehen in
                der Regel im Arbeitsleben, erhalten aber wegen hoher Wohnkosten eine Entlastung.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Mit der Wohngeld-Plus-Reform zum 01.01.2023 wurde der Anspruchsberechtigten-Kreis
                deutlich erweitert. Zusätzlich gibt es seither eine Heizkostenkomponente und eine
                Klimakomponente. Die Höchstbeträge werden alle zwei Jahre dynamisiert; die letzte
                Fortschreibung trat zum 01.01.2025 in Kraft und gilt auch 2026 unverändert.
              </p>

              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-8 mb-3">
                Wer hat Anspruch auf Wohngeld?
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Mieter oder Eigentümer (Selbstnutzer) mit Hauptwohnsitz in Deutschland.</li>
                <li>
                  Das Haushaltseinkommen liegt über dem Bürgergeld-Bedarf, aber unter den
                  Einkommensgrenzen des Wohngeldgesetzes.
                </li>
                <li>
                  Kein gleichzeitiger Bezug von Bürgergeld, Grundsicherung im Alter oder Hilfe zum
                  Lebensunterhalt — diese Leistungen enthalten bereits einen Unterkunftsanteil.
                </li>
                <li>
                  Der Antrag wird bei der Wohngeldbehörde der Gemeinde, Stadt oder des Kreises
                  gestellt, in der Regel als Mieter- oder Lastenzuschussantrag.
                </li>
              </ul>

              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-8 mb-3">
                Mietstufen I bis VII
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                Jede Gemeinde ist per Wohngeldverordnung einer der sieben Mietstufen zugeordnet.
                Die Einstufung richtet sich nach dem örtlichen Mietniveau — höhere Stufen bedeuten
                höhere Höchstbeträge und damit potenziell mehr Wohngeld. Die Einstufungen werden
                periodisch überprüft und mit den Bundesländern abgestimmt.
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Stufe I — Gemeinden mit dem niedrigsten Mietniveau.</li>
                <li>Stufe IV — mittleres Niveau, viele mittlere Groß- und Mittelstädte.</li>
                <li>
                  Stufe VII — höchstes Niveau, unter anderem München, Frankfurt am Main und
                  Teile Hamburgs.
                </li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
                Die genaue Einstufung findet man im Mietstufenverzeichnis des BMWSB oder über
                Portale der Bundesländer, die häufig eine Suche nach Gemeindename und
                Postleitzahl anbieten.
              </p>

              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-8 mb-3">
                Höchstbeträge 2026 nach § 12 WoGG
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Die folgende Tabelle zeigt den monatlichen Höchstbetrag der Miete, bis zu dem
                Wohngeld berechnet wird — abhängig von der Haushaltsgröße und der Mietstufe der
                Gemeinde. Eine höhere tatsächliche Miete wird nur bis zu diesem Höchstbetrag
                angesetzt.
              </p>
              <div className="overflow-x-auto -mx-2">
                <table className="w-full text-sm border-collapse min-w-[540px]">
                  <thead>
                    <tr className="bg-primary-50 dark:bg-primary-500/10">
                      <th className="text-left p-2.5 sm:p-3 font-semibold text-gray-700 dark:text-gray-200 rounded-tl-lg">
                        Haushaltsgröße
                      </th>
                      {MIETSTUFEN.map((stufe, i) => (
                        <th
                          key={stufe}
                          className={`text-right p-2.5 sm:p-3 font-semibold text-gray-700 dark:text-gray-200 ${
                            i === MIETSTUFEN.length - 1 ? 'rounded-tr-lg' : ''
                          }`}
                        >
                          Stufe {stufe}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {HOECHSTBETRAEGE_WOGG_2026.map((zeile, idx) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700/30' : ''}
                      >
                        <td className="p-2.5 sm:p-3 text-gray-800 dark:text-gray-200 font-medium">
                          {idx + 1} {idx === 0 ? 'Person' : 'Personen'}
                        </td>
                        {zeile.map((wert, s) => (
                          <td
                            key={s}
                            className="p-2.5 sm:p-3 text-right text-gray-700 dark:text-gray-300"
                          >
                            {fmtEuro(wert)} €
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr className="bg-primary-50/60 dark:bg-primary-500/5 text-xs">
                      <td className="p-2.5 sm:p-3 text-gray-600 dark:text-gray-400 italic">
                        Zuschlag je weitere Person
                      </td>
                      {ZUSCHLAG_PRO_PERSON_WOGG_2026.map((wert, s) => (
                        <td
                          key={s}
                          className="p-2.5 sm:p-3 text-right text-gray-600 dark:text-gray-400 italic"
                        >
                          +{fmtEuro(wert)} €
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                Werte nach § 12 Abs. 1 WoGG in der Fassung der Wohngeld-Plus-Reform,
                BGBl. 2024 I Nr. 314 (Dynamisierungsverordnung vom 21.10.2024, gültig seit
                01.01.2025, unverändert 2026).
              </p>

              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-8 mb-3">
                Wie wird Wohngeld berechnet?
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                Das Wohngeld errechnet sich nach § 19 WoGG in Verbindung mit Anlage 2 in vier
                Schritten:
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  Ermittlung des Gesamteinkommens aller Haushaltsmitglieder nach den §§ 13 bis 16
                  WoGG. Davon abgezogen werden Werbungskosten bei Arbeitnehmern sowie pauschale
                  Abzüge von 10, 20 oder 30 Prozent für Steuer, Kranken- und Rentenversicherung,
                  abhängig von der jeweiligen Beitragspflicht pro Person.
                </li>
                <li>
                  Ermittlung der anzusetzenden Miete im Rahmen der Höchstbeträge nach § 12 WoGG.
                  Überschreitet die tatsächliche Miete den Höchstbetrag, wird nur der Höchstbetrag
                  angesetzt.
                </li>
                <li>
                  Anwendung der Anlage-2-Formel mit drei Koeffizienten je nach Haushaltsgröße.
                  Die Formel verbindet das bereinigte Einkommen und die angesetzte Miete zu einem
                  rechnerischen Wohngeldbetrag.
                </li>
                <li>
                  Rechenschritte und Rundungen nach § 19 Abs. 2 WoGG in Verbindung mit Anlage 3.
                  Der errechnete Betrag wird auf den nächsten vollen Eurobetrag aufgerundet.
                </li>
              </ol>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
                Die Berechnung berücksichtigt zahlreiche Detailregeln zu Freibeträgen (zum
                Beispiel für Alleinerziehende oder Schwerbehinderte) und Besonderheiten der
                wohngeldrechtlichen Haushaltszusammensetzung. Für eine präzise
                Einzelfallberechnung empfehlen wir den{' '}
                <a
                  href={BMWSB_WOHNGELDRECHNER_URL}
                  target="_blank"
                  rel="noopener"
                  className="text-primary-600 dark:text-primary-400 underline"
                >
                  offiziellen BMWSB-Wohngeldrechner
                </a>
                .
              </p>

              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-8 mb-3">
                Beispielrechnung
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Ein Single-Haushalt in Mietstufe IV mit 1.400 € Bruttoeinkommen aus
                nichtselbständiger Arbeit und einer Kaltmiete von 500 € hat 2026 einen
                Wohngeldanspruch von rund <strong>215 €</strong> monatlich (Wert nach offiziellem
                BMWSB-Wohngeldrechner, Stand 22.04.2026).
              </p>

              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-8 mb-4">
                Häufige Fragen (FAQ)
              </h2>
              <div className="space-y-4">
                {faq.map((f, i) => (
                  <details
                    key={i}
                    className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4"
                  >
                    <summary className="cursor-pointer font-semibold text-gray-800 dark:text-gray-100">
                      {f.frage}
                    </summary>
                    <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                      {f.antwort}
                    </p>
                  </details>
                ))}
              </div>

              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mt-8 mb-3">
                Weiterführende Links
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  <a
                    href={BMWSB_WOHNGELDRECHNER_URL}
                    target="_blank"
                    rel="noopener"
                    className="text-primary-600 dark:text-primary-400 underline"
                  >
                    Offizieller BMWSB-Wohngeldrechner
                  </a>{' '}
                  — verbindliche Berechnung des Bundes.
                </li>
                <li>
                  <a
                    href="https://www.gesetze-im-internet.de/wogg/__12.html"
                    target="_blank"
                    rel="noopener"
                    className="text-primary-600 dark:text-primary-400 underline"
                  >
                    § 12 WoGG
                  </a>{' '}
                  — Höchstbeträge für Miete und Belastung.
                </li>
                <li>
                  <a
                    href="https://www.gesetze-im-internet.de/wogg/anlage_2.html"
                    target="_blank"
                    rel="noopener"
                    className="text-primary-600 dark:text-primary-400 underline"
                  >
                    Anlage 2 WoGG
                  </a>{' '}
                  — Berechnungsformel (Koeffizienten a, b, c pro Haushaltsgröße).
                </li>
                <li>
                  <a
                    href="https://www.bmwsb.bund.de/DE/wohnen/wohngeld/wohngeld-plus/wohngeld-plus_node.html"
                    target="_blank"
                    rel="noopener"
                    className="text-primary-600 dark:text-primary-400 underline"
                  >
                    BMWSB — Informationen zur Wohngeld-Plus-Reform
                  </a>
                  .
                </li>
              </ul>
            </section>
          </div>

          <AdSlot typ="rectangle" className="mb-8" />
        </div>

        <aside className="lg:w-80 shrink-0">
          <AdSlot typ="sidebar" />
        </aside>
      </div>
    </div>
  );
}
