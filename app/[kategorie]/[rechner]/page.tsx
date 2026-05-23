import { notFound } from 'next/navigation';
import Link from 'next/link';
import { rechner as alleRechner, kategorien, getRechnerBySlug, getRechnerByKategorie, getVerwandteRechner } from '@/lib/rechner-config';
import { generateRechnerMetadata, generateFAQSchema, generateWebApplicationSchema, generateBreadcrumbSchema } from '@/lib/seo';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ZurueckButton from '@/components/layout/ZurueckButton';
import AdSlot from '@/components/ads/AdSlot';
import StructuredData from '@/components/seo/StructuredData';
import FeedbackButtons from '@/components/ui/FeedbackButtons';
import { AffiliateBox } from '@/components/AffiliateBox';
import Quellen from '@/components/Quellen';
import StandHinweis from '@/components/StandHinweis';
import AuthorBio from '@/components/AuthorBio';
import RechnerLoader from '@/components/rechner/RechnerLoader';
import type { Metadata } from 'next';

interface Props {
  params: { kategorie: string; rechner: string };
}

// Rechner, die eine eigene statische Route in app/<kategorie>/<slug>/page.tsx
// haben und deshalb NICHT unter der dynamischen Route gerendert werden sollen.
// Statische Routen gewinnen zwar in Next.js gegen die dynamische Route, aber
// der Ausschluss hier vermeidet doppelten Prerender und hält den Build schlank.
const STATISCHE_OVERRIDES = new Set<string>(['wohngeld-rechner']);

// Rechner, die ihren Erklär-Text + FAQ inline in der Component rendern (W13.1.1+)
// und deshalb HIER weder die Config-erklaerung-Section noch die Config-FAQ-Section
// noch das Config-FAQPage-JSON-LD ausliefern sollen — sonst Doppelung im Live-HTML.
const INLINE_ERKLAERUNG_SLUGS = new Set<string>(['brutto-netto-rechner']);

export function generateStaticParams() {
  return alleRechner
    .filter(r => !STATISCHE_OVERRIDES.has(r.slug))
    .map(r => ({
      kategorie: r.kategorieSlug,
      rechner: r.slug,
    }));
}

export function generateMetadata({ params }: Props): Metadata {
  const config = getRechnerBySlug(params.kategorie, params.rechner);
  if (!config) return {};
  return generateRechnerMetadata(config);
}

export default function RechnerSeite({ params }: Props) {
  const config = getRechnerBySlug(params.kategorie, params.rechner);
  if (!config) notFound();


  const verwandteRechner = getVerwandteRechner(config, 4);

  const breadcrumbItems = [
    { name: 'Startseite', url: '/' },
    { name: config.kategorie, url: `/${config.kategorieSlug}` },
    { name: config.titel, url: `/${config.kategorieSlug}/${config.slug}` },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Structured Data — FAQPage-Schema NUR wenn Config-FAQ auch sichtbar gerendert wird
          (Inline-Erklär-Slugs liefern eigene FAQPage über die Component, sonst gäbe es 2× FAQPage). */}
      {!INLINE_ERKLAERUNG_SLUGS.has(config.slug) && (
        <StructuredData data={generateFAQSchema(config.faq)} />
      )}
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

      {/* Aktualisiert-Datum (W15A.2 E-E-A-T-Trust-Signal) */}
      {config.letzteAktualisierung && (
        <StandHinweis letzteAktualisierung={config.letzteAktualisierung} />
      )}

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
            {/* Print-Header mit Logo — nur im Druck sichtbar. Raw <img> ist hier
                bewusst statt next/image: Print-Stylesheet (@media print) braucht
                ein direktes HTML-Element ohne Next.js-Optimizer-Wrapper, damit
                der Browser im Druckdialog das SVG sofort einbettet. LCP-irrelevant,
                weil nur in der Druckansicht sichtbar. */}
            <div className="hidden print-only mb-3">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-300">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.svg" alt="Rechenfix" width={32} height={32} />
                <div>
                  <span className="text-lg font-extrabold text-gray-800">Rechen<span className="text-emerald-600">fix</span><span className="text-sm font-normal text-gray-600">.de</span></span>
                  <span className="block text-[10px] text-gray-500">Fix gerechnet!</span>
                </div>
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-primary-700 dark:text-primary-300 mb-2 print-compact">
              {config.icon} {config.titel}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-6 no-print">{config.beschreibung}</p>
            <RechnerLoader slug={config.slug} />
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
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {link.label}
                    </span>
                    <span className="block text-xs text-gray-600 dark:text-gray-500 mt-0.5">in netto →</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Ad Middle */}
          <AdSlot typ="rectangle" className="mb-8" />

          {/* Erklaerung & FAQ — eager rendered für SSR-Sichtbarkeit (AdSense)
              Inline-Erklär-Slugs (W13.1.1+) skippen diesen Block, weil ihre Component
              den Erklär-Text + FAQ bereits selbst inline rendert. */}
          {!INLINE_ERKLAERUNG_SLUGS.has(config.slug) && (
          <>
            <section className="card p-6 md:p-8 mb-8 no-print">
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
            <section className="card p-6 md:p-8 mb-8 no-print">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Häufige Fragen</h2>
              <div className="space-y-4">
                {config.faq.map((item, i) => (
                  <details key={i} className="group border border-gray-100 dark:border-gray-700 rounded-xl">
                    <summary className="cursor-pointer p-4 font-medium text-gray-800 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors list-none flex justify-between items-center">
                      {item.frage}
                      <svg className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          </>
          )}

          {/* Quellen-Sektion — nach FAQ, vor Affiliate (W15A.3 E-E-A-T-Material).
              Nur Top-10-Rechner (und später Top-20) haben config.quellen gesetzt;
              alle anderen rendern hier nichts. */}
          {config.quellen && <Quellen quellen={config.quellen} />}

          {/* Author-Mini-Bio — nach Quellen, vor Affiliate (W15A.2 E-E-A-T-Trust).
              Nur Top-10-Rechner mit zeigtAuthorBio=true. Hierarchie:
              Substanz (Rechner) → Citations (Quellen) → Authorship (Bio) → Commercial. */}
          {config.zeigtAuthorBio && <AuthorBio />}

          {/* Affiliate-Boxen — nach Content für AdSense-konforme Position (W13.2+ / W14.A.1).
              Single-Object für 1 Box, Array für Multi-Box. Rechner mit eigenem
              Custom-Affiliate-Layout (z. B. brutto-netto-rechner) setzen kein
              affiliate-Property und bleiben unverändert. */}
          {config.affiliate && (
            Array.isArray(config.affiliate) ? (
              <>
                {config.affiliate.map((a, i) => (
                  <AffiliateBox
                    key={`${a.programId}-${a.context ?? 'default'}-${i}`}
                    programId={a.programId}
                    context={a.context}
                    variant={a.variant}
                  />
                ))}
              </>
            ) : (
              <AffiliateBox
                programId={config.affiliate.programId}
                context={config.affiliate.context}
                variant={config.affiliate.variant}
              />
            )
          )}

          {/*
            Verwandte Rechner — auf dem wissenschaftlichen Taschenrechner bewusst
            ausgelassen. Utility-Tool wird oft mehrfach hintereinander genutzt,
            Content-Crosslinks würden vom Fokus ablenken. Globaler Footer mit
            Kategorien-Übersicht bleibt für SEO erhalten.
            Entscheidung: Prompt 78z-C, April 2026.
          */}
          {config.slug !== 'wissenschaftlicher-taschenrechner' && (
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
                      <p className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors text-sm">
                        {r.titel}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{r.kategorie}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Ad Bottom */}
          <AdSlot typ="leaderboard" />
        </div>

        {/* Sidebar — hidden on mobile, visible on desktop */}
        <aside className="hidden lg:block lg:w-64 shrink-0" aria-label={`Weitere Rechner in ${config.kategorie}`}>
          <div className="lg:sticky lg:top-24 max-h-[calc(100vh-7rem)] overflow-y-auto space-y-3 pr-1">
            {kategorien
              .filter(k => k.slug === config.kategorieSlug)
              .map(k => {
                const katRechner = getRechnerByKategorie(k.slug);
                return (
                  <div key={k.slug} className="card p-4">
                    <Link
                      href={`/${k.slug}`}
                      className="flex items-center gap-2 font-bold text-sm text-gray-800 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-2"
                    >
                      <span>{k.icon}</span>
                      <span>{k.name}</span>
                      <span className="text-xs font-normal text-gray-600 ml-auto">{katRechner.length}</span>
                    </Link>
                    <ul className="space-y-0.5">
                      {katRechner.map(r => {
                        const istAktuell = r.slug === config.slug;
                        return (
                          <li key={r.slug}>
                            <Link
                              href={`/${r.kategorieSlug}/${r.slug}`}
                              aria-current={istAktuell ? 'page' : undefined}
                              className={`flex items-center gap-2 py-1.5 px-2 -mx-1 rounded-lg text-[13px] transition-all ${
                                istAktuell
                                  ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10 font-medium'
                                  : 'text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-500/10'
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
