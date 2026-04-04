import Link from 'next/link';
import { notFound } from 'next/navigation';
import { kategorien, getRechnerByKategorie, getKategorieBySlug } from '@/lib/rechner-config';
import { generateKategorieMetadata, generateBreadcrumbSchema } from '@/lib/seo';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
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

      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors mb-4"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Zurück zur Startseite
      </Link>

      <h1 className="text-3xl md:text-4xl font-extrabold text-primary-700 dark:text-primary-300 mb-2">
        {kategorie.icon} {kategorie.name}-Rechner
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-2xl">{kategorie.beschreibung}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rechnerListe.map(r => (
          <Link
            key={r.slug}
            href={`/${r.kategorieSlug}/${r.slug}`}
            className="card p-6 group"
          >
            <div className="text-3xl mb-3">{r.icon}</div>
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
              {r.titel}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">{r.beschreibung}</p>
            <span className="inline-block mt-3 text-primary-500 dark:text-primary-400 text-sm font-medium">
              Jetzt berechnen →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
