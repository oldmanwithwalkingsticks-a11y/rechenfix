import Link from 'next/link';
import { notFound } from 'next/navigation';
import { kategorien, getRechnerByKategorie, getKategorieBySlug } from '@/lib/rechner-config';
import { generateKategorieMetadata } from '@/lib/seo';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: kategorie.name }]} />

      <h1 className="text-3xl md:text-4xl font-extrabold text-primary-700 mb-2">
        {kategorie.icon} {kategorie.name}-Rechner
      </h1>
      <p className="text-gray-500 mb-8 max-w-2xl">{kategorie.beschreibung}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rechnerListe.map(r => (
          <Link
            key={r.slug}
            href={`/${r.kategorieSlug}/${r.slug}`}
            className="card p-6 group"
          >
            <div className="text-3xl mb-3">{r.icon}</div>
            <h2 className="text-lg font-bold text-gray-800 group-hover:text-primary-500 transition-colors">
              {r.titel}
            </h2>
            <p className="text-sm text-gray-500 mt-2 line-clamp-2">{r.beschreibung}</p>
            <span className="inline-block mt-3 text-primary-500 text-sm font-medium">
              Jetzt berechnen →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
