import { RechnerConfig, KategorieConfig } from './rechner-config';

const SITE_URL = 'https://rechenfix.de';
const SITE_NAME = 'Rechenfix.de';

export function generateRechnerMetadata(rechner: RechnerConfig) {
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
    },
    alternates: {
      canonical: url,
    },
  };
}

export function generateKategorieMetadata(kategorie: KategorieConfig) {
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
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    inLanguage: 'de',
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
