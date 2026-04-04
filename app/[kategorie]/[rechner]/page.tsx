import { notFound } from 'next/navigation';
import Link from 'next/link';
import { rechner as alleRechner, getRechnerBySlug, getRechnerByKategorie, getVerwandteRechner } from '@/lib/rechner-config';
import { generateRechnerMetadata, generateFAQSchema, generateWebApplicationSchema, generateBreadcrumbSchema } from '@/lib/seo';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import AdSlot from '@/components/ads/AdSlot';
import StructuredData from '@/components/seo/StructuredData';
import Prozentrechner from '@/components/rechner/Prozentrechner';
import BruttoNettoRechner from '@/components/rechner/BruttoNettoRechner';
import MwStRechner from '@/components/rechner/MwStRechner';
import DreisatzRechner from '@/components/rechner/DreisatzRechner';
import BmiRechner from '@/components/rechner/BmiRechner';
import SpritkostenRechner from '@/components/rechner/SpritkostenRechner';
import KwPsRechner from '@/components/rechner/KwPsRechner';
import KfzSteuerRechner from '@/components/rechner/KfzSteuerRechner';
import ZinsRechner from '@/components/rechner/ZinsRechner';
import TageRechner from '@/components/rechner/TageRechner';
import ElterngeldRechner from '@/components/rechner/ElterngeldRechner';
import BuergergeldRechner from '@/components/rechner/BuergergeldRechner';
import StundenlohnRechner from '@/components/rechner/StundenlohnRechner';
import SparRechner from '@/components/rechner/SparRechner';
import InflationsRechner from '@/components/rechner/InflationsRechner';
import type { Metadata } from 'next';

interface Props {
  params: { kategorie: string; rechner: string };
}

export function generateStaticParams() {
  return alleRechner.map(r => ({
    kategorie: r.kategorieSlug,
    rechner: r.slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const config = getRechnerBySlug(params.kategorie, params.rechner);
  if (!config) return {};
  return generateRechnerMetadata(config);
}

const rechnerKomponenten: Record<string, React.ComponentType> = {
  'prozentrechner': Prozentrechner,
  'brutto-netto-rechner': BruttoNettoRechner,
  'mwst-rechner': MwStRechner,
  'dreisatz-rechner': DreisatzRechner,
  'bmi-rechner': BmiRechner,
  'spritkosten-rechner': SpritkostenRechner,
  'kw-ps-umrechner': KwPsRechner,
  'kfz-steuer-rechner': KfzSteuerRechner,
  'zinsrechner': ZinsRechner,
  'tagerechner': TageRechner,
  'elterngeld-rechner': ElterngeldRechner,
  'buergergeld-rechner': BuergergeldRechner,
  'stundenlohn-rechner': StundenlohnRechner,
  'sparrechner': SparRechner,
  'inflationsrechner': InflationsRechner,
};

export default function RechnerSeite({ params }: Props) {
  const config = getRechnerBySlug(params.kategorie, params.rechner);
  if (!config) notFound();

  const RechnerKomponente = rechnerKomponenten[config.slug];
  if (!RechnerKomponente) notFound();

  const kategorieRechner = getRechnerByKategorie(config.kategorieSlug).filter(r => r.slug !== config.slug);
  const verwandteRechner = getVerwandteRechner(config, 4);

  const breadcrumbItems = [
    { name: 'Startseite', url: '/' },
    { name: config.kategorie, url: `/${config.kategorieSlug}` },
    { name: config.titel, url: `/${config.kategorieSlug}/${config.slug}` },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Structured Data */}
      <StructuredData data={generateFAQSchema(config.faq)} />
      <StructuredData data={generateWebApplicationSchema(config)} />
      <StructuredData data={generateBreadcrumbSchema(breadcrumbItems)} />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: config.kategorie, href: `/${config.kategorieSlug}` },
          { label: config.titel },
        ]}
      />

      {/* Layout: Hauptinhalt + Sidebar */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Hauptinhalt */}
        <div className="flex-1 min-w-0">
          {/* Ad Top */}
          <AdSlot typ="leaderboard" className="mb-6" />

          {/* Rechner */}
          <div className="card p-6 md:p-8 mb-8">
            <h1 className="text-2xl md:text-3xl font-extrabold text-primary-700 dark:text-primary-300 mb-2">
              {config.icon} {config.titel}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-6">{config.beschreibung}</p>
            <RechnerKomponente />
          </div>

          {/* Ad Middle */}
          <AdSlot typ="rectangle" className="mb-8" />

          {/* Erklaerung */}
          <section className="card p-6 md:p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">So funktioniert der {config.titel}</h2>

            <div className="bg-accent-50 dark:bg-accent-700/20 border border-accent-200 dark:border-accent-600/40 rounded-xl p-4 mb-6">
              <p className="font-semibold text-accent-700 dark:text-accent-400 text-sm mb-1">Formel</p>
              <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">{config.formel}</p>
            </div>

            <div className="bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/30 rounded-xl p-4 mb-6">
              <p className="font-semibold text-primary-700 dark:text-primary-400 text-sm mb-1">Rechenbeispiel</p>
              <p className="text-gray-800 dark:text-gray-200 text-sm">{config.beispiel}</p>
            </div>

            <div className="max-w-none text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {config.erklaerung.split('\n\n').map((absatz, i) => {
                const istUeberschrift = absatz.startsWith('**') && absatz.indexOf('**', 2) === absatz.length - 2;
                const hatFetttext = absatz.includes('**');

                if (istUeberschrift) {
                  return (
                    <h3 key={i} className="text-base font-bold text-gray-800 dark:text-gray-100 mt-8 mb-3"
                      dangerouslySetInnerHTML={{
                        __html: absatz.replace(/\*\*(.*?)\*\*/g, '$1')
                      }}
                    />
                  );
                }
                if (absatz.startsWith('- ')) {
                  const items = absatz.split('\n').filter(l => l.startsWith('- '));
                  return (
                    <ul key={i} className="list-disc pl-5 space-y-1.5 mb-4">
                      {items.map((item, j) => (
                        <li key={j} dangerouslySetInnerHTML={{
                          __html: item.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        }} />
                      ))}
                    </ul>
                  );
                }
                if (hatFetttext) {
                  return (
                    <p key={i} className="mb-4" dangerouslySetInnerHTML={{
                      __html: absatz.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-800 dark:text-gray-100">$1</strong>').replace(/\n/g, '<br />')
                    }} />
                  );
                }
                return <p key={i} className="mb-4">{absatz}</p>;
              })}
            </div>
          </section>

          {/* FAQ */}
          <section className="card p-6 md:p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Häufige Fragen</h2>
            <div className="space-y-4">
              {config.faq.map((item, i) => (
                <details key={i} className="group border border-gray-100 dark:border-gray-700 rounded-xl">
                  <summary className="cursor-pointer p-4 font-medium text-gray-800 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 transition-colors list-none flex justify-between items-center">
                    {item.frage}
                    <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-400">
                    {item.antwort}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Verwandte Rechner */}
          <section className="card p-6 md:p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Das könnte Sie auch interessieren</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {verwandteRechner.map(r => (
                <Link
                  key={r.slug}
                  href={`/${r.kategorieSlug}/${r.slug}`}
                  className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-500/30 hover:bg-primary-50/50 dark:hover:bg-primary-500/5 transition-all group"
                >
                  <span className="text-2xl shrink-0">{r.icon}</span>
                  <div className="min-w-0">
                    <p className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors text-sm">
                      {r.titel}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{r.kategorie}</p>
                  </div>
                  <span className="text-gray-300 dark:text-gray-600 ml-auto shrink-0 group-hover:text-primary-400 transition-colors">→</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Ad Bottom */}
          <AdSlot typ="leaderboard" />
        </div>

        {/* Sidebar */}
        <aside className="lg:w-64 shrink-0">
          <div className="lg:sticky lg:top-24">
            {/* Kategorie-Rechner */}
            {kategorieRechner.length > 0 && (
              <div className="card p-5 mb-4">
                <h3 className="font-bold text-sm text-gray-800 dark:text-gray-200 mb-3">
                  Weitere {config.kategorie}-Rechner
                </h3>
                <ul className="space-y-1">
                  {kategorieRechner.map(r => (
                    <li key={r.slug}>
                      <Link
                        href={`/${r.kategorieSlug}/${r.slug}`}
                        className="flex items-center gap-2 py-2 px-2 -mx-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-all"
                      >
                        <span>{r.icon}</span>
                        <span>{r.titel}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Ad Sidebar */}
            <AdSlot typ="rectangle" />
          </div>
        </aside>
      </div>
    </div>
  );
}
