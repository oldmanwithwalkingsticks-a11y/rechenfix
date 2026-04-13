import { notFound } from 'next/navigation';
import Link from 'next/link';
import { rechner as alleRechner, kategorien, getRechnerBySlug, getRechnerByKategorie, getVerwandteRechner } from '@/lib/rechner-config';
import { generateRechnerMetadata, generateFAQSchema, generateWebApplicationSchema, generateBreadcrumbSchema } from '@/lib/seo';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ZurueckButton from '@/components/layout/ZurueckButton';
import AdSlot from '@/components/ads/AdSlot';
import StructuredData from '@/components/seo/StructuredData';
import LazySection from '@/components/ui/LazySection';
import FeedbackButtons from '@/components/ui/FeedbackButtons';
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
import StromkostenRechner from '@/components/rechner/StromkostenRechner';
import NebenkostenRechner from '@/components/rechner/NebenkostenRechner';
import MietrechnerRechner from '@/components/rechner/MietrechnerRechner';
import HeizkostenRechner from '@/components/rechner/HeizkostenRechner';
import GrunderwerbsteuerRechner from '@/components/rechner/GrunderwerbsteuerRechner';
import TapetenbedarfRechner from '@/components/rechner/TapetenbedarfRechner';
import QuadratmeterRechner from '@/components/rechner/QuadratmeterRechner';
import BruchRechner from '@/components/rechner/BruchRechner';
import EinheitenRechner from '@/components/rechner/EinheitenRechner';
import NotenschluesselRechner from '@/components/rechner/NotenschluesselRechner';
import DurchschnittRechner from '@/components/rechner/DurchschnittRechner';
import TaschenrechnerRechner from '@/components/rechner/TaschenrechnerRechner';
import ArbeitszeitRechner from '@/components/rechner/ArbeitszeitRechner';
import UrlaubstageRechner from '@/components/rechner/UrlaubstageRechner';
import UeberstundenRechner from '@/components/rechner/UeberstundenRechner';
import PendlerpauschaleRechner from '@/components/rechner/PendlerpauschaleRechner';
import PromilleRechner from '@/components/rechner/PromilleRechner';
import RabattRechner from '@/components/rechner/RabattRechner';
import GehaltsvergleichRechner from '@/components/rechner/GehaltsvergleichRechner';
import CountdownRechner from '@/components/rechner/CountdownRechner';
import LebenszeitRechner from '@/components/rechner/LebenszeitRechner';
import StreamingKostenRechner from '@/components/rechner/StreamingKostenRechner';
import RaucherRechner from '@/components/rechner/RaucherRechner';
import WahrerStundenlohnRechner from '@/components/rechner/WahrerStundenlohnRechner';
import SchlafRechner from '@/components/rechner/SchlafRechner';
import KaffeeKostenRechner from '@/components/rechner/KaffeeKostenRechner';
import LieferserviceRechner from '@/components/rechner/LieferserviceRechner';
import AboRechner from '@/components/rechner/AboRechner';
import HandykostenRechner from '@/components/rechner/HandykostenRechner';
import RechtsschutzRechner from '@/components/rechner/RechtsschutzRechner';
import SteuererstattungRechner from '@/components/rechner/SteuererstattungRechner';
import StromvergleichRechner from '@/components/rechner/StromvergleichRechner';
import FreelancerStundensatzRechner from '@/components/rechner/FreelancerStundensatzRechner';
import BussgeldRechner from '@/components/rechner/BussgeldRechner';
import KreditRechner from '@/components/rechner/KreditRechner';
import KalorienRechner from '@/components/rechner/KalorienRechner';
import GeburtsterminRechner from '@/components/rechner/GeburtsterminRechner';
import IdealgewichtRechner from '@/components/rechner/IdealgewichtRechner';
import KuendigungsfristRechner from '@/components/rechner/KuendigungsfristRechner';
import EtfSparplanRechner from '@/components/rechner/EtfSparplanRechner';
import TeilzeitRechner from '@/components/rechner/TeilzeitRechner';
import AbfindungsRechner from '@/components/rechner/AbfindungsRechner';
import MutterschutzRechner from '@/components/rechner/MutterschutzRechner';
import BaufinanzierungRechner from '@/components/rechner/BaufinanzierungRechner';
import RentenRechner from '@/components/rechner/RentenRechner';
import WasserbedarfRechner from '@/components/rechner/WasserbedarfRechner';
import UmzugskostenRechner from '@/components/rechner/UmzugskostenRechner';
import TrinkgeldRechner from '@/components/rechner/TrinkgeldRechner';
import KoerperfettRechner from '@/components/rechner/KoerperfettRechner';
import FlaechenRechner from '@/components/rechner/FlaechenRechner';
import MietrenditeRechner from '@/components/rechner/MietrenditeRechner';
import GeburtstagRechner from '@/components/rechner/GeburtstagRechner';
import ProzVeraenderungRechner from '@/components/rechner/ProzVeraenderungRechner';
import SplittingRechner from '@/components/rechner/SplittingRechner';
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
  'stromkosten-rechner': StromkostenRechner,
  'nebenkosten-rechner': NebenkostenRechner,
  'mietrechner': MietrechnerRechner,
  'heizkosten-rechner': HeizkostenRechner,
  'grunderwerbsteuer-rechner': GrunderwerbsteuerRechner,
  'tapetenbedarf-rechner': TapetenbedarfRechner,
  'quadratmeter-rechner': QuadratmeterRechner,
  'bruchrechner': BruchRechner,
  'einheiten-umrechner': EinheitenRechner,
  'notenschluessel-rechner': NotenschluesselRechner,
  'durchschnitt-rechner': DurchschnittRechner,
  'wissenschaftlicher-taschenrechner': TaschenrechnerRechner,
  'arbeitszeitrechner': ArbeitszeitRechner,
  'urlaubstage-rechner': UrlaubstageRechner,
  'ueberstunden-rechner': UeberstundenRechner,
  'pendlerpauschale-rechner': PendlerpauschaleRechner,
  'promillerechner': PromilleRechner,
  'rabattrechner': RabattRechner,
  'gehaltsvergleich': GehaltsvergleichRechner,
  'countdown': CountdownRechner,
  'lebenszeit-rechner': LebenszeitRechner,
  'streaming-kosten-rechner': StreamingKostenRechner,
  'raucher-rechner': RaucherRechner,
  'wahrer-stundenlohn': WahrerStundenlohnRechner,
  'schlaf-rechner': SchlafRechner,
  'kaffee-kosten-rechner': KaffeeKostenRechner,
  'lieferservice-rechner': LieferserviceRechner,
  'abo-rechner': AboRechner,
  'handykosten-rechner': HandykostenRechner,
  'rechtsschutz-rechner': RechtsschutzRechner,
  'steuererstattung-rechner': SteuererstattungRechner,
  'stromvergleich-rechner': StromvergleichRechner,
  'freelancer-stundensatz-rechner': FreelancerStundensatzRechner,
  'bussgeldrechner': BussgeldRechner,
  'kreditrechner': KreditRechner,
  'kalorienrechner': KalorienRechner,
  'geburtstermin-rechner': GeburtsterminRechner,
  'idealgewicht-rechner': IdealgewichtRechner,
  'kuendigungsfrist-rechner': KuendigungsfristRechner,
  'etf-sparplanrechner': EtfSparplanRechner,
  'teilzeit-rechner': TeilzeitRechner,
  'abfindungsrechner': AbfindungsRechner,
  'mutterschutz-rechner': MutterschutzRechner,
  'baufinanzierung-rechner': BaufinanzierungRechner,
  'rentenrechner': RentenRechner,
  'wasserbedarf-rechner': WasserbedarfRechner,
  'umzugskosten-rechner': UmzugskostenRechner,
  'trinkgeld-rechner': TrinkgeldRechner,
  'koerperfett-rechner': KoerperfettRechner,
  'flaechenrechner': FlaechenRechner,
  'mietrendite-rechner': MietrenditeRechner,
  'geburtstag-rechner': GeburtstagRechner,
  'prozentuale-veraenderung-rechner': ProzVeraenderungRechner,
  'splitting-rechner': SplittingRechner,
};

export default function RechnerSeite({ params }: Props) {
  const config = getRechnerBySlug(params.kategorie, params.rechner);
  if (!config) notFound();

  const RechnerKomponente = rechnerKomponenten[config.slug];
  if (!RechnerKomponente) notFound();

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
      <div className="no-print">
        <Breadcrumbs
          items={[
            { label: config.kategorie, href: `/${config.kategorieSlug}` },
            { label: config.titel },
          ]}
        />
      </div>

      {/* Layout: Hauptinhalt + Sidebar */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Hauptinhalt */}
        <div className="flex-1 min-w-0">
          {/* Ad Top */}
          <AdSlot typ="leaderboard" className="mb-6 no-print" />

          {/* Zurück-Button */}
          <div className="no-print">
            <ZurueckButton fallbackHref={`/${config.kategorieSlug}`} label={`Zurück`} />
          </div>

          {/* Rechner */}
          <div className="card p-6 md:p-8 mb-8">
            {/* Print-Header mit Logo — nur im Druck sichtbar */}
            <div className="hidden print-only mb-3">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-300">
                <img src="/logo.svg" alt="Rechenfix" width={32} height={32} />
                <div>
                  <span className="text-lg font-extrabold text-gray-800">Rechen<span className="text-emerald-600">fix</span><span className="text-sm font-normal text-gray-400">.de</span></span>
                  <span className="block text-[10px] text-gray-500">Fix gerechnet!</span>
                </div>
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-primary-700 dark:text-primary-300 mb-2 print-compact">
              {config.icon} {config.titel}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-6 no-print">{config.beschreibung}</p>
            <RechnerKomponente />
            <FeedbackButtons />
          </div>

          {/* Beliebte Gehaltsbeispiele (nur auf Brutto-Netto-Rechner) */}
          {config.slug === 'brutto-netto-rechner' && (
            <section className="card p-6 md:p-8 mb-8 no-print">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Beliebte Gehaltsbeispiele</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { href: '/finanzen/2000-euro-brutto-netto', label: '2.000 € brutto' },
                  { href: '/finanzen/2500-euro-brutto-netto', label: '2.500 € brutto' },
                  { href: '/finanzen/3000-euro-brutto-netto', label: '3.000 € brutto' },
                  { href: '/finanzen/3500-euro-brutto-netto', label: '3.500 € brutto' },
                  { href: '/finanzen/4000-euro-brutto-netto', label: '4.000 € brutto' },
                  { href: '/finanzen/5000-euro-brutto-netto', label: '5.000 € brutto' },
                  { href: '/finanzen/mindestlohn-netto', label: 'Mindestlohn 2026' },
                  { href: '/finanzen/brutto-netto-tabelle', label: 'Gehaltstabelle 2026' },
                ].map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-center p-3 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-500/30 hover:bg-primary-50/50 dark:hover:bg-primary-500/5 transition-all group"
                  >
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                      {link.label}
                    </span>
                    <span className="block text-xs text-gray-400 dark:text-gray-500 mt-0.5">in netto →</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Ad Middle */}
          <AdSlot typ="rectangle" className="mb-8" />

          {/* Erklaerung & FAQ — lazy-loaded */}
          <LazySection className="no-print">
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
          </LazySection>

          {/* Verwandte Rechner */}
          <section className="card p-6 md:p-8 mb-8 no-print">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Das könnte Sie auch interessieren</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {verwandteRechner.map(r => (
                <Link
                  key={r.slug}
                  href={`/${r.kategorieSlug}/${r.slug}`}
                  className="flex flex-col items-center text-center gap-2 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-500/30 hover:bg-primary-50/50 dark:hover:bg-primary-500/5 transition-all group"
                >
                  <span className="text-3xl">{r.icon}</span>
                  <div className="min-w-0">
                    <p className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors text-sm">
                      {r.titel}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{r.kategorie}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Ad Bottom */}
          <AdSlot typ="leaderboard" />
        </div>

        {/* Sidebar — hidden on mobile, visible on desktop */}
        <aside className="hidden lg:block lg:w-64 shrink-0">
          <div className="lg:sticky lg:top-24 max-h-[calc(100vh-7rem)] overflow-y-auto space-y-3 pr-1">
            {kategorien.map(k => {
              const katRechner = getRechnerByKategorie(k.slug);
              return (
                <div key={k.slug} className="card p-4">
                  <Link
                    href={`/${k.slug}`}
                    className="flex items-center gap-2 font-bold text-sm text-gray-800 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400 transition-colors mb-2"
                  >
                    <span>{k.icon}</span>
                    <span>{k.name}</span>
                    <span className="text-xs font-normal text-gray-400 ml-auto">{katRechner.length}</span>
                  </Link>
                  <ul className="space-y-0.5">
                    {katRechner.map(r => {
                      const istAktuell = r.slug === config.slug;
                      return (
                        <li key={r.slug}>
                          <Link
                            href={`/${r.kategorieSlug}/${r.slug}`}
                            className={`flex items-center gap-2 py-1.5 px-2 -mx-1 rounded-lg text-[13px] transition-all ${
                              istAktuell
                                ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10 font-medium'
                                : 'text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-500/10'
                            }`}
                          >
                            <span>{r.icon}</span>
                            <span className="truncate">{r.titel}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}

            {/* Ad Sidebar */}
            <AdSlot typ="rectangle" className="mt-3" />
          </div>
        </aside>
      </div>
    </div>
  );
}
