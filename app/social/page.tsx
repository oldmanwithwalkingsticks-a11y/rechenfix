/**
 * W17A.3 — /social Bio-Hub-Seite.
 *
 * Ziel: Instagram macht Caption-Links nicht klickbar — nur den EINEN
 * Bio-Link. Dieser Bio-Link zeigt permanent auf https://www.rechenfix.de/social,
 * und die Seite zeigt oben dynamisch den aktuell auf IG geposteten Rechner.
 *
 * Datenfluss:
 * - Publisher schreibt nach erfolgreichem Post `social:current-bio-slug` → KV
 * - Diese Server-Component liest den Slug bei jedem Request (force-dynamic)
 * - Renders Top-Block + Top-10-Beliebte + Footer-Link
 *
 * SEO: noindex/nofollow — reine Funktionsseite (analog /ki-rechner).
 * Render-Modus: Server Component, force-dynamic (KV-Read pro Request).
 */

import Link from 'next/link';
import type { Metadata } from 'next';
import { rechner } from '@/lib/rechner-config';
import { BIO_HUB_FEATURED } from '@/lib/social/config';
import { getCurrentBioSlug } from '@/lib/social/state';
import farbenFile from '@/lib/social/kategorie-farben.json';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'nodejs';
export const fetchCache = 'force-no-store';

export const metadata: Metadata = {
  title: 'rechenfix — Rechner aus Instagram',
  description: 'Direkt zu unseren Rechnern auf rechenfix.de',
  robots: { index: false, follow: false },
};

interface KategorieFarbe {
  bg: [number, number, number];
  accent: [number, number, number];
}
const FARBEN = farbenFile.farben as unknown as Record<string, KategorieFarbe>;
const DEFAULT_FARBE: KategorieFarbe = { bg: [243, 244, 246], accent: [55, 65, 81] };

function rgbCss([r, g, b]: [number, number, number]): string {
  return `rgb(${r}, ${g}, ${b})`;
}

function getFarbe(kategorieSlug: string): KategorieFarbe {
  return FARBEN[kategorieSlug] ?? DEFAULT_FARBE;
}

interface RechnerLite {
  slug: string;
  kategorieSlug: string;
  titel: string;
  icon: string;
}

function resolveRechner(slug: string): RechnerLite | null {
  const r = rechner.find((x) => x.slug === slug);
  if (!r) return null;
  return {
    slug: r.slug,
    kategorieSlug: r.kategorieSlug,
    titel: r.titel,
    icon: r.icon ?? '📊',
  };
}

function CalcButton({
  rechner,
  size,
}: {
  rechner: RechnerLite;
  size: 'lg' | 'md';
}) {
  const farbe = getFarbe(rechner.kategorieSlug);
  const isLg = size === 'lg';
  return (
    <Link
      href={`/${rechner.kategorieSlug}/${rechner.slug}`}
      className={`flex items-center gap-4 rounded-2xl shadow-sm active:scale-[0.98] transition-transform ${
        isLg ? 'p-5 sm:p-6' : 'p-4'
      }`}
      style={{
        backgroundColor: rgbCss(farbe.bg),
        color: rgbCss(farbe.accent),
        minHeight: isLg ? 80 : 64,
      }}
    >
      <span className={isLg ? 'text-4xl' : 'text-3xl'} aria-hidden="true">
        {rechner.icon}
      </span>
      <span className={`font-bold ${isLg ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'} flex-1`}>
        {rechner.titel}
      </span>
      <span className="text-2xl font-bold" aria-hidden="true">
        →
      </span>
    </Link>
  );
}

export default async function SocialBioHubPage({
  searchParams,
}: {
  searchParams: { ref?: string };
}) {
  // TikTok-Bio-Link trägt `?ref=tt` → eigener Bio-Slug + eigene Überschrift.
  // Ohne ref bleibt alles beim bestehenden IG-Verhalten (abwärtskompatibel).
  const isTikTok = searchParams?.ref === 'tt';
  const currentSlug = isTikTok
    ? await getCurrentBioSlug('tiktok')
    : await getCurrentBioSlug();
  const current = currentSlug ? resolveRechner(currentSlug) : null;
  const blockLabel = isTikTok ? 'Aus deinem TikTok-Video' : 'Heute auf Instagram';

  const top10 = BIO_HUB_FEATURED.map((slug) => resolveRechner(slug)).filter(
    (r): r is RechnerLite => r !== null,
  );

  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:py-12">
      {/* Header */}
      <header className="text-center mb-8 sm:mb-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.svg"
          alt="rechenfix"
          width={56}
          height={56}
          className="mx-auto mb-3"
        />
        <h1 className="text-2xl sm:text-3xl font-extrabold text-primary-700 dark:text-primary-300">
          rechen<span className="text-emerald-600">fix</span>.de
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400">
          Schnell gerechnet — direkt zum Rechner aus dem Post.
        </p>
      </header>

      {/* Block 1: aktueller Bio-Rechner (IG „Heute auf Instagram" / TikTok „Aus deinem TikTok-Video") */}
      {current && (
        <section className="mb-8">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
            {blockLabel}
          </h2>
          <CalcButton rechner={current} size="lg" />
        </section>
      )}

      {/* Block 2: Beliebte Rechner */}
      <section className="mb-10">
        <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
          Beliebte Rechner
        </h2>
        <div className="space-y-3">
          {top10.map((r) => (
            <CalcButton key={r.slug} rechner={r} size="md" />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center pt-2 pb-4 space-y-3">
        <Link
          href="/"
          className="inline-block text-base font-semibold text-primary-700 dark:text-primary-300 underline underline-offset-4"
        >
          Alle {rechner.length} Rechner →
        </Link>
        <div className="flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-300">
          <Link href="/impressum" className="underline underline-offset-2 hover:text-gray-800 dark:hover:text-white">Impressum</Link>
          <span aria-hidden="true">·</span>
          <Link href="/datenschutz" className="underline underline-offset-2 hover:text-gray-800 dark:hover:text-white">Datenschutz</Link>
        </div>
      </footer>
    </div>
  );
}
