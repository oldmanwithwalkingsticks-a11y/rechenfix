import Link from 'next/link';
import { berechneBruttoNetto } from '@/lib/berechnungen/brutto-netto';
import type { BruttoNettoErgebnis } from '@/lib/berechnungen/brutto-netto';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ZurueckButton from '@/components/layout/ZurueckButton';
import AdSlot from '@/components/ads/AdSlot';
import StructuredData from '@/components/seo/StructuredData';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo';
import type { Metadata } from 'next';

const STUNDENLOHN = 12.82;
const STUNDEN_PRO_MONAT = 160;
const BRUTTO = Math.round(STUNDENLOHN * STUNDEN_PRO_MONAT);

const steuerklassen: { sk: 1 | 2 | 3 | 4 | 5 | 6; label: string; beschreibung: string }[] = [
  { sk: 1, label: 'Steuerklasse 1', beschreibung: 'Ledig, geschieden, verwitwet' },
  { sk: 2, label: 'Steuerklasse 2', beschreibung: 'Alleinerziehend' },
  { sk: 3, label: 'Steuerklasse 3', beschreibung: 'Verheiratet (Hauptverdiener)' },
  { sk: 4, label: 'Steuerklasse 4', beschreibung: 'Verheiratet (ähnliches Einkommen)' },
  { sk: 5, label: 'Steuerklasse 5', beschreibung: 'Verheiratet (Geringverdiener)' },
  { sk: 6, label: 'Steuerklasse 6', beschreibung: 'Zweit-/Nebenjob' },
];

function berechneNetto(sk: 1 | 2 | 3 | 4 | 5 | 6): BruttoNettoErgebnis {
  return berechneBruttoNetto({
    bruttoMonat: BRUTTO,
    steuerklasse: sk,
    kirchensteuer: false,
    kirchensteuersatz: 9,
    kinderfreibetraege: 0,
    bundesland: 'NW',
    kvArt: 'gesetzlich',
    kvZusatzbeitrag: 1.7,
    kvPrivatBeitrag: 0,
    rvBefreit: false,
    abrechnungszeitraum: 'monat',
  });
}

const fmt = (v: number) => v.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const ergebnisse = steuerklassen.map(s => ({
  ...s,
  ergebnis: berechneNetto(s.sk),
}));

export const metadata: Metadata = {
  title: 'Mindestlohn 2026 netto berechnen | Rechenfix',
  description: `Mindestlohn 2026: ${STUNDENLOHN.toLocaleString('de-DE')} €/Std. = ${BRUTTO.toLocaleString('de-DE')} € brutto/Monat. Netto in allen 6 Steuerklassen berechnet ✓ Aktuell für 2026.`,
  keywords: 'mindestlohn 2026 netto, mindestlohn netto, mindestlohn steuerklasse 1, 12 82 euro netto, mindestlohn gehalt netto, was bleibt vom mindestlohn',
  openGraph: {
    title: 'Mindestlohn 2026 netto berechnen | Rechenfix',
    description: `Mindestlohn 2026: ${STUNDENLOHN.toLocaleString('de-DE')} €/Std. = ${BRUTTO.toLocaleString('de-DE')} € brutto/Monat. Netto in allen Steuerklassen.`,
    url: 'https://rechenfix.de/finanzen/mindestlohn-netto',
    siteName: 'Rechenfix.de',
    type: 'website',
    locale: 'de_DE',
    images: [{ url: 'https://rechenfix.de/opengraph-image', width: 1200, height: 630, alt: 'Mindestlohn 2026 netto — Rechenfix.de' }],
  },
  twitter: { card: 'summary_large_image', title: 'Mindestlohn 2026 netto berechnen | Rechenfix', description: `Mindestlohn 2026: ${STUNDENLOHN.toLocaleString('de-DE')} €/Std. = ${BRUTTO.toLocaleString('de-DE')} € brutto/Monat. Netto in allen Steuerklassen.` },
  alternates: { canonical: 'https://rechenfix.de/finanzen/mindestlohn-netto' },
};

const faq = [
  {
    frage: 'Wie hoch ist der Mindestlohn 2026 netto?',
    antwort: `Der Mindestlohn 2026 beträgt ${STUNDENLOHN.toLocaleString('de-DE')} € brutto pro Stunde. Bei einer 40-Stunden-Woche (${STUNDEN_PRO_MONAT} Std./Monat) ergibt das ca. ${BRUTTO.toLocaleString('de-DE')} € brutto. In Steuerklasse 1 bleiben davon ca. ${fmt(ergebnisse[0].ergebnis.nettoMonat)} € netto übrig.`,
  },
  {
    frage: 'Wie viel Mindestlohn netto in Steuerklasse 1?',
    antwort: `In Steuerklasse 1 bleiben vom Mindestlohn (${BRUTTO.toLocaleString('de-DE')} € brutto) ca. ${fmt(ergebnisse[0].ergebnis.nettoMonat)} € netto. Die Abzugsquote beträgt rund ${ergebnisse[0].ergebnis.abzuegeProzent}%.`,
  },
  {
    frage: 'Wie viel Mindestlohn netto in Steuerklasse 3?',
    antwort: `In Steuerklasse 3 behalten Sie vom Mindestlohn ca. ${fmt(ergebnisse[2].ergebnis.nettoMonat)} € netto — das sind ${fmt(ergebnisse[2].ergebnis.nettoMonat - ergebnisse[0].ergebnis.nettoMonat)} € mehr als in Steuerklasse 1.`,
  },
  {
    frage: 'Kann man vom Mindestlohn leben?',
    antwort: `Mit ca. ${fmt(ergebnisse[0].ergebnis.nettoMonat)} € netto in Steuerklasse 1 liegt das Mindestlohn-Gehalt deutlich unter dem Durchschnittseinkommen. In Großstädten mit hohen Mieten reicht der Mindestlohn allein oft nicht aus. Wohngeld, Kinderzuschlag oder andere Sozialleistungen können ergänzend beantragt werden.`,
  },
  {
    frage: 'Wie hat sich der Mindestlohn in den letzten Jahren entwickelt?',
    antwort: 'Der Mindestlohn wurde seit seiner Einführung 2015 (8,50 €) kontinuierlich angehoben: 2022 auf 12,00 €, Oktober 2022 auf 12,41 €, Januar 2024 auf 12,41 €, Januar 2025 auf 12,82 €. Für 2026 gilt weiterhin 12,82 € pro Stunde.',
  },
];

const breadcrumbItems = [
  { name: 'Startseite', url: '/' },
  { name: 'Finanzen', url: '/finanzen' },
  { name: 'Mindestlohn 2026 netto', url: '/finanzen/mindestlohn-netto' },
];

export default function Page() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <StructuredData data={generateBreadcrumbSchema(breadcrumbItems)} />
      <StructuredData data={generateFAQSchema(faq)} />

      <Breadcrumbs
        items={[
          { label: 'Finanzen', href: '/finanzen' },
          { label: 'Mindestlohn 2026 netto' },
        ]}
      />

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
          <AdSlot typ="leaderboard" className="mb-6" />

          <ZurueckButton fallbackHref="/finanzen" label="Zurück" />

          {/* Hauptinhalt */}
          <div className="card p-6 md:p-8 mb-8">
            <h1 className="text-2xl md:text-3xl font-extrabold text-primary-700 dark:text-primary-300 mb-2">
              Mindestlohn 2026 netto — was bleibt übrig?
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Berechnung: {STUNDENLOHN.toLocaleString('de-DE')} € × {STUNDEN_PRO_MONAT} Stunden = <strong className="text-gray-700 dark:text-gray-200">{BRUTTO.toLocaleString('de-DE')} € brutto/Monat</strong>
            </p>

            {/* Berechnungs-Box */}
            <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold text-amber-700 dark:text-amber-400 text-sm">So wird gerechnet</span>
              </div>
              <p className="text-sm text-amber-800 dark:text-amber-300">
                Mindestlohn {STUNDENLOHN.toLocaleString('de-DE')} €/Std. × {STUNDEN_PRO_MONAT} Std./Monat (40-Stunden-Woche) = <strong>{BRUTTO.toLocaleString('de-DE')} € brutto</strong> pro Monat bzw. <strong>{(BRUTTO * 12).toLocaleString('de-DE')} € brutto</strong> pro Jahr.
              </p>
            </div>

            {/* Ergebnis-Tabelle */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-primary-50 dark:bg-primary-500/10">
                    <th className="text-left p-3 font-semibold text-gray-700 dark:text-gray-200 rounded-tl-lg">Steuerklasse</th>
                    <th className="text-right p-3 font-semibold text-gray-700 dark:text-gray-200">Nettogehalt</th>
                    <th className="text-right p-3 font-semibold text-gray-700 dark:text-gray-200">Abzüge</th>
                    <th className="text-right p-3 font-semibold text-gray-700 dark:text-gray-200 rounded-tr-lg">Abzüge in %</th>
                  </tr>
                </thead>
                <tbody>
                  {ergebnisse.map((e, i) => (
                    <tr key={e.sk} className={i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700/30' : ''}>
                      <td className="p-3">
                        <span className="font-medium text-gray-800 dark:text-gray-200">{e.label}</span>
                        <span className="block text-xs text-gray-400 dark:text-gray-500">{e.beschreibung}</span>
                      </td>
                      <td className="p-3 text-right font-bold text-primary-600 dark:text-primary-400">{fmt(e.ergebnis.nettoMonat)} €</td>
                      <td className="p-3 text-right text-red-500 dark:text-red-400">{fmt(e.ergebnis.gesamtAbzuege)} €</td>
                      <td className="p-3 text-right text-gray-600 dark:text-gray-400">{e.ergebnis.abzuegeProzent}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Highlight-Box SK1 */}
            <div className="result-box mt-6">
              <p className="text-white/80 text-sm mb-1">Mindestlohn 2026 in Steuerklasse 1</p>
              <p className="text-4xl font-bold">{fmt(ergebnisse[0].ergebnis.nettoMonat)} € netto</p>
              <p className="text-white/70 text-sm mt-2">
                {fmt(ergebnisse[0].ergebnis.nettoJahr)} € / Jahr &nbsp;|&nbsp; ~{fmt(ergebnisse[0].ergebnis.nettoProStunde)} € netto / Stunde
              </p>
            </div>

            {/* CTA */}
            <div className="mt-6 text-center">
              <Link href="/finanzen/brutto-netto-rechner" className="btn-primary inline-flex items-center gap-2">
                Eigenes Gehalt berechnen
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* SEO-Text */}
          <section className="card p-6 md:p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Mindestlohn 2026: Was bleibt netto vom Bruttogehalt?
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed space-y-4">
              <p>
                Der <strong className="text-gray-800 dark:text-gray-100">gesetzliche Mindestlohn</strong> beträgt seit Januar 2025 in Deutschland <strong className="text-gray-800 dark:text-gray-100">{STUNDENLOHN.toLocaleString('de-DE')} Euro brutto pro Stunde</strong>. Dieser Wert gilt auch 2026 fort. Für Arbeitnehmerinnen und Arbeitnehmer in Vollzeit mit einer 40-Stunden-Woche ergibt sich bei durchschnittlich {STUNDEN_PRO_MONAT} Arbeitsstunden pro Monat ein <strong className="text-gray-800 dark:text-gray-100">monatliches Bruttogehalt von rund {BRUTTO.toLocaleString('de-DE')} Euro</strong>. Auf das Jahr gerechnet sind das etwa {(BRUTTO * 12).toLocaleString('de-DE')} Euro brutto.
              </p>
              <p>
                Doch wie viel davon tatsächlich auf dem Konto ankommt, hängt von verschiedenen Faktoren ab. Die wichtigsten sind die <strong className="text-gray-800 dark:text-gray-100">Steuerklasse</strong>, der Familienstand und ob Kirchensteuer anfällt. In <strong className="text-gray-800 dark:text-gray-100">Steuerklasse 1</strong> — der häufigsten Klasse für ledige Arbeitnehmer — bleiben von {BRUTTO.toLocaleString('de-DE')} € brutto etwa <strong className="text-gray-800 dark:text-gray-100">{fmt(ergebnisse[0].ergebnis.nettoMonat)} € netto</strong> übrig. Das entspricht einem effektiven Netto-Stundenlohn von ca. {fmt(ergebnisse[0].ergebnis.nettoProStunde)} Euro.
              </p>
              <p>
                Die Abzüge setzen sich aus <strong className="text-gray-800 dark:text-gray-100">Lohnsteuer</strong> und den vier <strong className="text-gray-800 dark:text-gray-100">Sozialversicherungsbeiträgen</strong> zusammen: Krankenversicherung ({fmt(ergebnisse[0].ergebnis.krankenversicherung)} €), Rentenversicherung ({fmt(ergebnisse[0].ergebnis.rentenversicherung)} €), Arbeitslosenversicherung ({fmt(ergebnisse[0].ergebnis.arbeitslosenversicherung)} €) und Pflegeversicherung ({fmt(ergebnisse[0].ergebnis.pflegeversicherung)} €). Die Lohnsteuer fällt mit {fmt(ergebnisse[0].ergebnis.lohnsteuer)} € in Steuerklasse 1 vergleichsweise moderat aus, da der Grundfreibetrag einen Teil des Einkommens steuerfrei stellt.
              </p>
              <p>
                Für <strong className="text-gray-800 dark:text-gray-100">verheiratete Arbeitnehmer in Steuerklasse 3</strong> sieht die Rechnung günstiger aus: Hier bleiben ca. {fmt(ergebnisse[2].ergebnis.nettoMonat)} € netto — das sind {fmt(ergebnisse[2].ergebnis.nettoMonat - ergebnisse[0].ergebnis.nettoMonat)} € mehr als in Steuerklasse 1. Das liegt am deutlich höheren Grundfreibetrag dieser Steuerklasse. Im Gegenzug zahlt der Ehepartner in Steuerklasse 5 mehr Steuern.
              </p>
              <p>
                <strong className="text-gray-800 dark:text-gray-100">Alleinerziehende in Steuerklasse 2</strong> profitieren vom Entlastungsbetrag und behalten ca. {fmt(ergebnisse[1].ergebnis.nettoMonat)} € netto. Am wenigsten bleibt in Steuerklasse 6, die für Zweit- und Nebenjobs gilt — hier entfallen sämtliche Freibeträge, sodass nur ca. {fmt(ergebnisse[5].ergebnis.nettoMonat)} € netto übrig bleiben.
              </p>
              <p>
                Der Mindestlohn wurde 2015 mit 8,50 € eingeführt und seitdem mehrfach erhöht. Die bislang <strong className="text-gray-800 dark:text-gray-100">größte Anhebung</strong> erfolgte im Oktober 2022 auf 12,00 €, gefolgt von der Erhöhung auf 12,41 € (2024) und 12,82 € (2025). Die Mindestlohnkommission empfiehlt die Anpassung regelmäßig auf Basis der Tarifentwicklung.
              </p>
              <p>
                <strong className="text-gray-800 dark:text-gray-100">Wichtig:</strong> Wer vom Mindestlohn lebt und ergänzende Sozialleistungen wie <strong className="text-gray-800 dark:text-gray-100">Wohngeld</strong> oder <strong className="text-gray-800 dark:text-gray-100">Kinderzuschlag</strong> beantragen möchte, sollte sein exaktes Nettogehalt kennen. Nutzen Sie dafür unseren <Link href="/finanzen/brutto-netto-rechner" className="text-primary-500 hover:text-primary-600 font-medium">Brutto-Netto-Rechner</Link> mit individuellen Einstellungen für Bundesland, Kirchensteuer und Krankenversicherung.
              </p>
              <p>
                In der <Link href="/finanzen/brutto-netto-tabelle" className="text-primary-500 hover:text-primary-600 font-medium">Brutto-Netto-Tabelle 2026</Link> finden Sie einen Überblick über weitere Gehaltsstufen von 1.500 € bis 10.000 € brutto.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section className="card p-6 md:p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Häufige Fragen</h2>
            <div className="space-y-4">
              {faq.map((item, i) => (
                <details key={i} className="group border border-gray-100 dark:border-gray-700 rounded-xl">
                  <summary className="cursor-pointer p-4 font-medium text-gray-800 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 transition-colors list-none flex justify-between items-center">
                    {item.frage}
                    <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-400">{item.antwort}</div>
                </details>
              ))}
            </div>
          </section>

          {/* Verwandte Seiten */}
          <section className="card p-6 md:p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Verwandte Rechner</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: '/finanzen/brutto-netto-rechner', label: 'Brutto-Netto-Rechner', desc: 'Individuell berechnen' },
                { href: '/finanzen/brutto-netto-tabelle', label: 'Brutto-Netto-Tabelle', desc: '1.500 € bis 10.000 €' },
                { href: '/finanzen/2000-euro-brutto-netto', label: '2.000 € brutto netto', desc: 'Knapp über Mindestlohn' },
                { href: '/finanzen/stundenlohn-rechner', label: 'Stundenlohnrechner', desc: 'Stundenlohn ermitteln' },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-500/30 hover:bg-primary-50/50 dark:hover:bg-primary-500/5 transition-all group"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors text-sm">{link.label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{link.desc}</p>
                  </div>
                  <span className="text-gray-300 dark:text-gray-600 ml-auto shrink-0 group-hover:text-primary-400 transition-colors">→</span>
                </Link>
              ))}
            </div>
          </section>

          <AdSlot typ="leaderboard" />
        </div>
      </div>
    </div>
  );
}
