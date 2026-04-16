import Link from 'next/link';
import { berechneBruttoNetto } from '@/lib/berechnungen/brutto-netto';
import type { BruttoNettoErgebnis } from '@/lib/berechnungen/brutto-netto';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ZurueckButton from '@/components/layout/ZurueckButton';
import AdSlot from '@/components/ads/AdSlot';
import StructuredData from '@/components/seo/StructuredData';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo';

const steuerklassen: { sk: 1 | 2 | 3 | 4 | 5 | 6; label: string; beschreibung: string }[] = [
  { sk: 1, label: 'Steuerklasse 1', beschreibung: 'Ledig, geschieden, verwitwet' },
  { sk: 2, label: 'Steuerklasse 2', beschreibung: 'Alleinerziehend' },
  { sk: 3, label: 'Steuerklasse 3', beschreibung: 'Verheiratet (Hauptverdiener)' },
  { sk: 4, label: 'Steuerklasse 4', beschreibung: 'Verheiratet (ähnliches Einkommen)' },
  { sk: 5, label: 'Steuerklasse 5', beschreibung: 'Verheiratet (Geringverdiener)' },
  { sk: 6, label: 'Steuerklasse 6', beschreibung: 'Zweit-/Nebenjob' },
];

function berechneNetto(brutto: number, sk: 1 | 2 | 3 | 4 | 5 | 6): BruttoNettoErgebnis {
  return berechneBruttoNetto({
    bruttoMonat: brutto,
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

function fmt(n: number): string {
  return n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtBrutto(brutto: number): string {
  return brutto.toLocaleString('de-DE');
}

interface Props {
  brutto: number;
  seoText: string;
  faq: { frage: string; antwort: string }[];
}

const GEHALTSSTUFEN = [2000, 2500, 3000, 3500, 4000, 5000];

export default function BruttoNettoLongTail({ brutto, seoText, faq }: Props) {
  const bruttoFmt = fmtBrutto(brutto);
  const slug = `${brutto}-euro-brutto-netto`;
  const stufenIndex = GEHALTSSTUFEN.indexOf(brutto);
  const vorherige = stufenIndex > 0 ? GEHALTSSTUFEN[stufenIndex - 1] : null;
  const naechste = stufenIndex < GEHALTSSTUFEN.length - 1 ? GEHALTSSTUFEN[stufenIndex + 1] : null;

  const ergebnisse = steuerklassen.map(s => ({
    ...s,
    ergebnis: berechneNetto(brutto, s.sk),
  }));

  const breadcrumbItems = [
    { name: 'Startseite', url: '/' },
    { name: 'Finanzen', url: '/finanzen' },
    { name: `${bruttoFmt} € brutto netto`, url: `/finanzen/${slug}` },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <StructuredData data={generateBreadcrumbSchema(breadcrumbItems)} />
      <StructuredData data={generateFAQSchema(faq)} />

      <Breadcrumbs
        items={[
          { label: 'Finanzen', href: '/finanzen' },
          { label: `${bruttoFmt} € brutto netto` },
        ]}
      />

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
          <AdSlot typ="leaderboard" className="mb-6" />

          <ZurueckButton fallbackHref="/finanzen" label="Zurück" />

          {/* Hauptinhalt */}
          <div className="card p-6 md:p-8 mb-8">
            <h1 className="text-2xl md:text-3xl font-extrabold text-primary-700 dark:text-primary-300 mb-2">
              {bruttoFmt} Euro brutto — wie viel netto 2026?
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Alle Steuerklassen im Überblick. Ohne Kirchensteuer, GKV, keine Kinder.
            </p>

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
                        <span className="block text-xs text-gray-600 dark:text-gray-500">{e.beschreibung}</span>
                      </td>
                      <td className="p-3 text-right font-bold text-primary-600 dark:text-primary-400">{fmt(e.ergebnis.nettoMonat)} €</td>
                      <td className="p-3 text-right text-red-600 dark:text-red-400">{fmt(e.ergebnis.gesamtAbzuege)} €</td>
                      <td className="p-3 text-right text-gray-600 dark:text-gray-400">{e.ergebnis.abzuegeProzent}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Highlight-Box SK1 */}
            <div className="result-box mt-6">
              <p className="text-white/80 text-sm mb-1">{bruttoFmt} € brutto in Steuerklasse 1</p>
              <p className="text-4xl font-bold">{fmt(ergebnisse[0].ergebnis.nettoMonat)} € netto</p>
              <p className="text-white/70 text-sm mt-2">
                {fmt(ergebnisse[0].ergebnis.nettoJahr)} € / Jahr &nbsp;|&nbsp; ~{fmt(ergebnisse[0].ergebnis.nettoProStunde)} € / Stunde
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
              {bruttoFmt} Euro brutto in netto — das müssen Sie wissen
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed space-y-4">
              <p>{seoText}</p>
              <p>
                In <strong className="text-gray-800 dark:text-gray-100">Steuerklasse 1</strong> (Ledige) behalten Sie von {bruttoFmt} € brutto ca. {fmt(ergebnisse[0].ergebnis.nettoMonat)} € netto. Das entspricht rund {(100 - ergebnisse[0].ergebnis.abzuegeProzent).toFixed(0)}% Ihres Bruttogehalts. Die Abzüge setzen sich aus Lohnsteuer ({fmt(ergebnisse[0].ergebnis.lohnsteuer)} €), Krankenversicherung ({fmt(ergebnisse[0].ergebnis.krankenversicherung)} €), Rentenversicherung ({fmt(ergebnisse[0].ergebnis.rentenversicherung)} €), Arbeitslosenversicherung ({fmt(ergebnisse[0].ergebnis.arbeitslosenversicherung)} €) und Pflegeversicherung ({fmt(ergebnisse[0].ergebnis.pflegeversicherung)} €) zusammen.
              </p>
              <p>
                Deutlich günstiger fahren <strong className="text-gray-800 dark:text-gray-100">Verheiratete in Steuerklasse 3</strong>: Hier bleiben ca. {fmt(ergebnisse[2].ergebnis.nettoMonat)} € netto — das sind {fmt(ergebnisse[2].ergebnis.nettoMonat - ergebnisse[0].ergebnis.nettoMonat)} € mehr pro Monat als in Steuerklasse 1.
              </p>
              <p>
                Am wenigsten Netto bleibt in <strong className="text-gray-800 dark:text-gray-100">Steuerklasse 5 und 6</strong>. Steuerklasse 5 ist das Gegenstück zu SK3 für den geringverdienenden Partner, während SK6 für Zweit- und Nebenjobs gilt — hier entfallen alle Freibeträge.
              </p>
              <p>
                <strong className="text-gray-800 dark:text-gray-100">Wichtig zu wissen:</strong> Die Steuerklasse beeinflusst nur die monatlichen Abzüge, nicht die tatsächliche Jahressteuer. Über die Steuererklärung gleicht das Finanzamt die Differenz aus.
              </p>
              <p>
                Nutzen Sie unseren <Link href="/finanzen/brutto-netto-rechner" className="text-primary-600 hover:text-primary-600 font-medium">Brutto-Netto-Rechner</Link> für eine individuelle Berechnung mit allen Parametern wie Kirchensteuer, Bundesland und privater Krankenversicherung.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section className="card p-6 md:p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Häufige Fragen</h2>
            <div className="space-y-4">
              {faq.map((item, i) => (
                <details key={i} className="group border border-gray-100 dark:border-gray-700 rounded-xl">
                  <summary className="cursor-pointer p-4 font-medium text-gray-800 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors list-none flex justify-between items-center">
                    {item.frage}
                    <svg className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-400">{item.antwort}</div>
                </details>
              ))}
            </div>
          </section>

          {/* Navigation vorherige/nächste Gehaltsstufe */}
          {(vorherige || naechste) && (
            <div className="flex gap-3 mb-8">
              {vorherige ? (
                <Link
                  href={`/finanzen/${vorherige}-euro-brutto-netto`}
                  className="flex-1 card p-4 flex items-center gap-2 group hover:border-primary-200 dark:hover:border-primary-500/30 transition-all"
                >
                  <svg className="w-4 h-4 text-gray-600 group-hover:text-primary-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {fmtBrutto(vorherige)} € brutto netto
                  </span>
                </Link>
              ) : <div className="flex-1" />}
              {naechste ? (
                <Link
                  href={`/finanzen/${naechste}-euro-brutto-netto`}
                  className="flex-1 card p-4 flex items-center justify-end gap-2 group hover:border-primary-200 dark:hover:border-primary-500/30 transition-all"
                >
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {fmtBrutto(naechste)} € brutto netto
                  </span>
                  <svg className="w-4 h-4 text-gray-600 group-hover:text-primary-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ) : <div className="flex-1" />}
            </div>
          )}

          {/* Verwandte Seiten */}
          <section className="card p-6 md:p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Weitere Gehaltsberechnungen</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: '/finanzen/brutto-netto-rechner', label: 'Brutto-Netto-Rechner', icon: '💶', desc: 'Eigenes Gehalt berechnen' },
                { href: '/finanzen/brutto-netto-tabelle', label: 'Brutto-Netto-Tabelle', icon: '📊', desc: 'Alle Gehälter im Überblick' },
                { href: '/finanzen/stundenlohn-rechner', label: 'Stundenlohnrechner', icon: '⏱️', desc: 'Stundenlohn ermitteln' },
                { href: '/finanzen/elterngeld-rechner', label: 'Elterngeldrechner', icon: '👶', desc: 'Elterngeld berechnen' },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-500/30 hover:bg-primary-50/50 dark:hover:bg-primary-500/5 transition-all group"
                >
                  <span className="text-2xl shrink-0">{link.icon}</span>
                  <div className="min-w-0">
                    <p className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors text-sm">{link.label}</p>
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
