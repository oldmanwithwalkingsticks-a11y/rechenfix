import { RechnerConfig, KategorieConfig } from './rechner-config';
import type { Metadata } from 'next';

const SITE_URL = 'https://www.rechenfix.de';
const SITE_NAME = 'Rechenfix.de';
const OG_IMAGE = `${SITE_URL}/opengraph-image`;

export function generateRechnerMetadata(rechner: RechnerConfig): Metadata {
  const url = `${SITE_URL}/${rechner.kategorieSlug}/${rechner.slug}`;
  return {
    title: rechner.metaTitle,
    description: rechner.metaDescription,
    keywords: rechner.keywords.join(', '),
    openGraph: {
      title: rechner.metaTitle,
      description: rechner.metaDescription,
      url,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'de_DE',
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${rechner.titel} — ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: rechner.metaTitle,
      description: rechner.metaDescription,
      images: [OG_IMAGE],
    },
    alternates: {
      canonical: url,
    },
  };
}

export function generateKategorieMetadata(kategorie: KategorieConfig): Metadata {
  const url = `${SITE_URL}/${kategorie.slug}`;
  return {
    title: kategorie.metaTitle,
    description: kategorie.metaDescription,
    openGraph: {
      title: kategorie.metaTitle,
      description: kategorie.metaDescription,
      url,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'de_DE',
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${kategorie.name} — ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: kategorie.metaTitle,
      description: kategorie.metaDescription,
      images: [OG_IMAGE],
    },
    alternates: {
      canonical: url,
    },
  };
}

export function generateFAQSchema(faq: { frage: string; antwort: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(item => ({
      '@type': 'Question',
      name: item.frage,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.antwort,
      },
    })),
  };
}

export function generateWebApplicationSchema(rechner: RechnerConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: rechner.titel,
    description: rechner.beschreibung,
    url: `${SITE_URL}/${rechner.kategorieSlug}/${rechner.slug}`,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    inLanguage: 'de',
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Kostenlose Online-Rechner für Finanzen, Alltag, Auto und Gesundheit.',
    inLanguage: 'de',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}
