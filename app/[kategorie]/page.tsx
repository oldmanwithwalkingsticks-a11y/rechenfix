import Link from 'next/link';
import { notFound } from 'next/navigation';
import { kategorien, getRechnerByKategorie, getKategorieBySlug } from '@/lib/rechner-config';
import { generateKategorieMetadata, generateBreadcrumbSchema } from '@/lib/seo';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import ZurueckButton from '@/components/layout/ZurueckButton';
import StructuredData from '@/components/seo/StructuredData';
import type { Metadata } from 'next';

interface Props {
  params: { kategorie: string };
}

export function generateStaticParams() {
  return kategorien.map(k => ({ kategorie: k.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const kategorie = getKategorieBySlug(params.kategorie);
  if (!kategorie) return {};
  return generateKategorieMetadata(kategorie);
}

export default function KategorieSeite({ params }: Props) {
  const kategorie = getKategorieBySlug(params.kategorie);
  if (!kategorie) notFound();

  const rechnerListe = getRechnerByKategorie(params.kategorie);

  const breadcrumbItems = [
    { name: 'Startseite', url: '/' },
    { name: kategorie.name, url: `/${kategorie.slug}` },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <StructuredData data={generateBreadcrumbSchema(breadcrumbItems)} />

      <Breadcrumbs items={[{ label: kategorie.name }]} />

      <ZurueckButton fallbackHref="/" label="Zurück" />

      <h1 className="text-3xl md:text-4xl font-extrabold text-primary-700 dark:text-primary-300 mb-2">
        {kategorie.icon} {kategorie.name}-Rechner — {rechnerListe.length} kostenlose Tools 2026
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-2xl">{kategorie.beschreibung}</p>

      {kategorie.einleitung && kategorie.einleitung.trim().length > 0 && (
        <section className="mb-8 max-w-3xl">
          <div className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed space-y-3">
            {kategorie.einleitung.split('\n\n').filter(Boolean).map((absatz, i) => (
              <p key={i}>{absatz.trim()}</p>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rechnerListe.map(r => (
          <Link
            key={r.slug}
            href={`/${r.kategorieSlug}/${r.slug}`}
            className="card p-6 group"
          >
            <div className="text-3xl mb-3">{r.icon}</div>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {r.titel}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">{r.beschreibung}</p>
            <span className="inline-block mt-3 text-primary-600 dark:text-primary-400 text-sm font-medium">
              Jetzt berechnen →
            </span>
          </Link>
        ))}
      </div>

      {/* Brutto-Netto-Beispiele (nur auf Finanzen-Kategorie) */}
      {params.kategorie === 'finanzen' && (
        <section className="mt-12">
          <h2 className="section-title mb-4">Brutto-Netto-Beispiele</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Wie viel netto bleibt bei diesen Bruttogehältern?</p>
          <div className="flex flex-wrap gap-2.5">
            {[
              { href: '/finanzen/mindestlohn-netto', label: 'Mindestlohn 2026' },
              { href: '/finanzen/2000-euro-brutto-netto', label: '2.000 € brutto' },
              { href: '/finanzen/2500-euro-brutto-netto', label: '2.500 € brutto' },
              { href: '/finanzen/3000-euro-brutto-netto', label: '3.000 € brutto' },
              { href: '/finanzen/3500-euro-brutto-netto', label: '3.500 € brutto' },
              { href: '/finanzen/4000-euro-brutto-netto', label: '4.000 € brutto' },
              { href: '/finanzen/5000-euro-brutto-netto', label: '5.000 € brutto' },
              { href: '/finanzen/brutto-netto-tabelle', label: 'Gehaltstabelle 2026' },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="card px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-500/5 transition-all"
              >
                {link.label} →
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
