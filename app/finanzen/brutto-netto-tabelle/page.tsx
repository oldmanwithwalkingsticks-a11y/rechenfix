import Link from 'next/link';
import { berechneBruttoNetto } from '@/lib/berechnungen/brutto-netto';
import { KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT } from '@/lib/berechnungen/sv-parameter';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ZurueckButton from '@/components/layout/ZurueckButton';
import AdSlot from '@/components/ads/AdSlot';
import { AffiliateBox } from '@/components/AffiliateBox';
import StructuredData from '@/components/seo/StructuredData';
import { generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo';
import type { Metadata } from 'next';

function calc(brutto: number, sk: 1 | 3 | 4) {
  return berechneBruttoNetto({
    bruttoMonat: brutto,
    steuerklasse: sk,
    kirchensteuer: false,
    kirchensteuersatz: 9,
    kinderfreibetraege: 0,
    bundesland: 'NW',
    kvArt: 'gesetzlich',
    kvZusatzbeitrag: KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT,
    kvPrivatBeitrag: 0,
    rvBefreit: false,
    abrechnungszeitraum: 'monat',
  });
}

const STUFEN = Array.from({ length: 18 }, (_, i) => 1500 + i * 500);

function fmt(n: number): string {
  return n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtK(n: number): string {
  return n.toLocaleString('de-DE');
}

export const metadata: Metadata = {
  title: 'Brutto-Netto-Tabelle 2026 — Übersicht',
  description: 'Brutto-Netto-Tabelle 2026: Alle Gehälter von 1.500 bis 10.000 € im Überblick ✓ Steuerklasse 1, 3 & 4 ✓ Kostenlos & aktuell.',
  keywords: 'brutto netto tabelle, brutto netto tabelle 2026, gehaltstabelle, netto tabelle, brutto netto übersicht',
  openGraph: {
    title: 'Brutto-Netto-Tabelle 2026 — Übersicht',
    description: 'Brutto-Netto-Tabelle 2026: Alle Gehälter von 1.500 bis 10.000 € im Überblick ✓ Steuerklasse 1, 3 & 4 ✓ Kostenlos & aktuell.',
    url: 'https://www.rechenfix.de/finanzen/brutto-netto-tabelle',
    siteName: 'Rechenfix.de',
    type: 'website',
    locale: 'de_DE',
    images: [{ url: 'https://www.rechenfix.de/opengraph-image', width: 1200, height: 630, alt: 'Brutto-Netto-Tabelle 2026 — Rechenfix.de' }],
  },
  twitter: { card: 'summary_large_image', title: 'Brutto-Netto-Tabelle 2026 — Übersicht', description: 'Brutto-Netto-Tabelle 2026: Alle Gehälter von 1.500 bis 10.000 € im Überblick ✓ Steuerklasse 1, 3 & 4.' },
  alternates: { canonical: 'https://www.rechenfix.de/finanzen/brutto-netto-tabelle' },
};

const faq = [
  { frage: 'Wie lese ich die Brutto-Netto-Tabelle?', antwort: 'Suchen Sie Ihr Bruttogehalt in der linken Spalte und lesen Sie das entsprechende Nettogehalt in der Spalte Ihrer Steuerklasse ab. Die Werte gelten ohne Kirchensteuer, mit gesetzlicher KV und ohne Kinder.' },
  { frage: 'Warum unterscheidet sich das Netto je nach Steuerklasse?', antwort: 'Die Steuerklasse bestimmt die Höhe der monatlichen Lohnsteuer. In SK3 (Verheiratete, Hauptverdiener) ist die Steuer am niedrigsten, in SK5/6 am höchsten. Die Jahressteuerlast bleibt über die Steuererklärung gleich.' },
  { frage: 'Stimmen die Werte in der Tabelle exakt?', antwort: 'Die Tabelle zeigt Näherungswerte zur Orientierung. Die exakte Berechnung hängt von weiteren Faktoren ab (Bundesland, Kirchensteuer, KV-Zusatzbeitrag, Kinderfreibeträge). Nutzen Sie unseren Brutto-Netto-Rechner für Ihre individuelle Berechnung.' },
  { frage: 'Ab welchem Gehalt zahlt man den Spitzensteuersatz?', antwort: 'Der Spitzensteuersatz von 42% greift ab einem zu versteuernden Einkommen von ca. 66.761 € jährlich (ca. 5.560 € monatlich brutto in SK1). Ab 277.826 € gilt der Reichensteuersatz von 45%.' },
  { frage: 'Welche Steuerklasse ist für mich die beste?', antwort: 'Ledige: SK1. Alleinerziehende: SK2. Verheiratete mit ähnlichem Einkommen: SK4/4. Verheiratete mit großem Gehaltsunterschied: SK3/5 (Hauptverdiener in 3, Partner in 5). Die Kombination 3/5 bringt monatlich mehr Netto für den Hauptverdiener.' },
];

const breadcrumbItems = [
  { name: 'Startseite', url: '/' },
  { name: 'Finanzen', url: '/finanzen' },
  { name: 'Brutto-Netto-Tabelle', url: '/finanzen/brutto-netto-tabelle' },
];

export default function BruttoNettoTabelle() {
  const zeilen = STUFEN.map(brutto => ({
    brutto,
    sk1: calc(brutto, 1),
    sk3: calc(brutto, 3),
    sk4: calc(brutto, 4),
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <StructuredData data={generateBreadcrumbSchema(breadcrumbItems)} />
      <StructuredData data={generateFAQSchema(faq)} />

      <Breadcrumbs
        items={[
          { label: 'Finanzen', href: '/finanzen' },
          { label: 'Brutto-Netto-Tabelle' },
        ]}
      />

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
          <AdSlot typ="leaderboard" className="mb-6" />

          <ZurueckButton fallbackHref="/finanzen" label="Zurück" />

          {/* Hauptinhalt */}
          <div className="card p-6 md:p-8 mb-8">
            <h1 className="text-2xl md:text-3xl font-extrabold text-primary-700 dark:text-primary-300 mb-2">
              Brutto-Netto-Tabelle 2026
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Alle Gehälter von {fmtK(STUFEN[0])} € bis {fmtK(STUFEN[STUFEN.length - 1])} € brutto im Überblick. Ohne Kirchensteuer, GKV, keine Kinder, NRW.
            </p>

            {/* Tabelle */}
            <div className="overflow-x-auto -mx-2">
              <table className="w-full text-sm border-collapse min-w-[500px]">
                <thead>
                  <tr className="bg-primary-50 dark:bg-primary-500/10">
                    <th className="text-left p-2.5 sm:p-3 font-semibold text-gray-700 dark:text-gray-200 rounded-tl-lg">Brutto / Monat</th>
                    <th className="text-right p-2.5 sm:p-3 font-semibold text-gray-700 dark:text-gray-200">Netto SK 1</th>
                    <th className="text-right p-2.5 sm:p-3 font-semibold text-gray-700 dark:text-gray-200">Netto SK 3</th>
                    <th className="text-right p-2.5 sm:p-3 font-semibold text-gray-700 dark:text-gray-200 rounded-tr-lg">Netto SK 4</th>
                  </tr>
                </thead>
                <tbody>
                  {zeilen.map((z, i) => {
                    const highlight = [2000, 2500, 3000, 3500, 4000, 5000].includes(z.brutto);
                    return (
                      <tr key={z.brutto} className={`${i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700/30' : ''} ${highlight ? 'font-medium' : ''}`}>
                        <td className="p-2.5 sm:p-3 text-gray-800 dark:text-gray-200">
                          {highlight ? (
                            <Link href={`/finanzen/${z.brutto}-euro-brutto-netto`} className="text-primary-600 hover:text-primary-600 font-semibold">
                              {fmtK(z.brutto)} €
                            </Link>
                          ) : (
                            <span className="font-medium">{fmtK(z.brutto)} €</span>
                          )}
                        </td>
                        <td className="p-2.5 sm:p-3 text-right text-gray-600 dark:text-gray-400">{fmt(z.sk1.nettoMonat)} €</td>
                        <td className="p-2.5 sm:p-3 text-right text-gray-600 dark:text-gray-400">{fmt(z.sk3.nettoMonat)} €</td>
                        <td className="p-2.5 sm:p-3 text-right text-gray-600 dark:text-gray-400">{fmt(z.sk4.nettoMonat)} €</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-500 mt-3">
              Werte gerundet, ohne Kirchensteuer, GKV mit 2,9 % durchschnittlichem Zusatzbeitrag (AN-Anteil 1,45 %), keine Kinder, NRW. Stand 2026.
            </p>

            {/* CTA */}
            <div className="mt-6 text-center">
              <Link href="/finanzen/brutto-netto-rechner" className="btn-primary inline-flex items-center gap-2">
                Eigenes Gehalt individuell berechnen
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <AdSlot typ="rectangle" className="mb-8" />

          {/* SEO-Text */}
          <section className="card p-6 md:p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Brutto-Netto-Tabelle 2026 — so lesen Sie die Übersicht
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed space-y-4">
              <p>
                Unsere Brutto-Netto-Tabelle 2026 zeigt Ihnen auf einen Blick, wie viel Nettogehalt bei verschiedenen Bruttoeinkommen und Steuerklassen übrig bleibt. Die Tabelle umfasst monatliche Bruttogehälter von {fmtK(STUFEN[0])} € bis {fmtK(STUFEN[STUFEN.length - 1])} € in 500-Euro-Schritten — und deckt damit den Großteil aller Gehälter in Deutschland ab.
              </p>
              <p>
                <strong className="text-gray-800 dark:text-gray-100">Warum drei Steuerklassen?</strong> Die Tabelle zeigt die drei häufigsten Steuerklassen: <strong className="text-gray-800 dark:text-gray-100">Steuerklasse 1</strong> für Ledige (die mit Abstand häufigste Klasse), <strong className="text-gray-800 dark:text-gray-100">Steuerklasse 3</strong> für den besserverdienenden Ehepartner und <strong className="text-gray-800 dark:text-gray-100">Steuerklasse 4</strong> für Ehepaare mit ähnlichem Einkommen. Diese drei Klassen decken über 85% aller Arbeitnehmer ab.
              </p>
              <p>
                <strong className="text-gray-800 dark:text-gray-100">Was fällt auf?</strong> Wer die Tabelle aufmerksam liest, erkennt die progressive Steuer in Aktion: Bei niedrigen Gehältern (z. B. {fmtK(STUFEN[0])} €) beträgt die Abzugsquote in SK1 nur rund {calc(STUFEN[0], 1).abzuegeProzent}%, während sie bei {fmtK(STUFEN[STUFEN.length - 1])} € auf {calc(STUFEN[STUFEN.length - 1], 1).abzuegeProzent}% steigt. Der Unterschied zwischen Steuerklasse 1 und 3 beträgt bei höheren Gehältern mehrere hundert Euro monatlich — bei {fmtK(STUFEN[STUFEN.length - 1])} € sind es {fmt(calc(STUFEN[STUFEN.length - 1], 3).nettoMonat - calc(STUFEN[STUFEN.length - 1], 1).nettoMonat)} € Differenz.
              </p>
              <p>
                <strong className="text-gray-800 dark:text-gray-100">Sozialabgaben als konstanter Faktor:</strong> Während die Lohnsteuer progressiv steigt, bleiben die Sozialabgaben (Kranken-, Renten-, Arbeitslosen- und Pflegeversicherung) prozentual gleich — bis zur jeweiligen Beitragsbemessungsgrenze. 2026 liegt die BBG in der Kranken- und Pflegeversicherung bei 5.812,50 € monatlich (69.750 €/Jahr). In der Renten- und Arbeitslosenversicherung gilt bundeseinheitlich 8.450 € monatlich (101.400 €/Jahr) — seit 2025 entfällt die Trennung zwischen Ost und West. Ab einer Versicherungspflichtgrenze von 77.400 €/Jahr (6.450 €/Monat) können Arbeitnehmer in die private Krankenversicherung wechseln. Ab den BBG steigen die Sozialabgaben nicht mehr weiter, wodurch die relative Belastung bei sehr hohen Gehältern sogar leicht sinkt.
              </p>
              <p>
                <strong className="text-gray-800 dark:text-gray-100">Wichtiger Hinweis:</strong> Die Tabelle zeigt Orientierungswerte ohne Kirchensteuer, mit gesetzlicher Krankenversicherung (durchschnittlicher Zusatzbeitrag 2,9 % gemäß § 242a SGB V, AN-Anteil 1,45 %) und ohne Kinderfreibeträge. Der kassenindividuelle Zusatzbeitrag kann abweichen (Spanne 2026 ca. 2,2–4,4 %). Kirchensteuer (8–9 % der Lohnsteuer), private Krankenversicherung oder Kinderfreibeträge können das Ergebnis verändern. Für Ihre individuelle Berechnung nutzen Sie unseren <Link href="/finanzen/brutto-netto-rechner" className="text-primary-600 hover:text-primary-600 font-medium">Brutto-Netto-Rechner</Link> mit allen Optionen.
              </p>
              <p>
                <strong className="text-gray-800 dark:text-gray-100">Steuerklasse wechseln?</strong> Verheiratete können die Steuerklassenkombination beim Finanzamt ändern. Die klassische Kombination 3/5 lohnt sich, wenn ein Partner deutlich mehr verdient. Beachten Sie: Die Steuerklasse beeinflusst nur die monatliche Auszahlung — die tatsächliche Jahressteuer wird über die Einkommensteuererklärung ausgeglichen. Bei der Kombination 3/5 ist die Steuererklärung Pflicht und es kommt häufig zu Nachzahlungen.
              </p>
              <p>
                Für detaillierte Berechnungen zu einzelnen Gehältern haben wir eigene Seiten erstellt: <Link href="/finanzen/2000-euro-brutto-netto" className="text-primary-600 hover:text-primary-600 font-medium">2.000 € brutto</Link>, <Link href="/finanzen/3000-euro-brutto-netto" className="text-primary-600 hover:text-primary-600 font-medium">3.000 € brutto</Link>, <Link href="/finanzen/4000-euro-brutto-netto" className="text-primary-600 hover:text-primary-600 font-medium">4.000 € brutto</Link> und <Link href="/finanzen/5000-euro-brutto-netto" className="text-primary-600 hover:text-primary-600 font-medium">5.000 € brutto</Link> — jeweils mit allen 6 Steuerklassen und ausführlicher Erklärung.
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

          <AffiliateBox programId="wiso" context="brutto-netto" variant="compact" />

          {/* Verwandte Seiten */}
          <section className="card p-6 md:p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Weitere Gehaltsberechnungen</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: '/finanzen/brutto-netto-rechner', label: 'Brutto-Netto-Rechner', icon: '💶', desc: 'Individuell berechnen' },
                { href: '/finanzen/3000-euro-brutto-netto', label: '3.000 € brutto netto', icon: '📊', desc: 'Alle Steuerklassen' },
                { href: '/finanzen/stundenlohn-rechner', label: 'Stundenlohnrechner', icon: '⏱️', desc: 'Stundenlohn ermitteln' },
                { href: '/arbeit/pendlerpauschale-rechner', label: 'Pendlerpauschale', icon: '🚗', desc: 'Fahrtkosten berechnen' },
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
