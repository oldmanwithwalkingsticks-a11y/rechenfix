/**
 * Zentrale Stelle für die Kennzeichnung KI-generierter Medien.
 *
 * Hintergrund: Art. 50 Abs. 4 KI-VO (Verordnung (EU) 2024/1689) verlangt vom
 * Betreiber, künstlich erzeugte Bild- und Videoinhalte offenzulegen. Art. 50
 * Abs. 2 richtet sich an ANBIETER generativer Systeme — für unsere Blog-Medien
 * sind das die Generatoren, nicht wir. Die maschinenlesbare Auszeichnung hier
 * ist daher freiwillig und bewusst über das Geforderte hinaus.
 *
 * Maschinenlesbarkeit über den IPTC-Standardwert `trainedAlgorithmicMedia`
 * (Digital Source Type), den Plattformen und Crawler als Marker für
 * synthetische Medien auswerten.
 */

export const IPTC_DIGITAL_SOURCE_TYPE_URI =
  'http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia';

export const SITE_URL = 'https://www.rechenfix.de';

/** Die tatsächlich eingesetzten Generatoren. Nur diese Werte verwenden. */
export const KI_GENERATOREN = {
  bild: 'Bildgenerator von Google (Gemini 3 Pro Image)',
  video: 'Kling AI 3.0 (Kuaishou Technology)',
  keiner: '',
} as const;

export type KiGenerator = keyof typeof KI_GENERATOREN;

/**
 * JSON-LD für ein KI-generiertes Medium. Der IPTC-Wert wird als
 * `additionalProperty` transportiert — schema.org hat kein eigenes Feld dafür,
 * `PropertyValue` mit `propertyID` ist der etablierte Weg.
 */
export function generateKiMedienSchema({
  typ,
  src,
  beschreibung,
  generator,
}: {
  typ: 'bild' | 'video';
  src: string;
  beschreibung: string;
  generator: KiGenerator;
}) {
  const absolut = src.startsWith('http') ? src : `${SITE_URL}${src}`;

  return {
    '@context': 'https://schema.org',
    '@type': typ === 'bild' ? 'ImageObject' : 'VideoObject',
    ...(typ === 'bild' ? { contentUrl: absolut } : { contentUrl: absolut, name: beschreibung }),
    description: beschreibung,
    creditText: 'KI-generiert',
    creator: {
      '@type': 'SoftwareApplication',
      name: KI_GENERATOREN[generator],
      applicationCategory: 'Generative AI',
    },
    additionalProperty: {
      '@type': 'PropertyValue',
      name: 'digitalSourceType',
      propertyID: 'https://cv.iptc.org/newscodes/digitalsourcetype/',
      value: IPTC_DIGITAL_SOURCE_TYPE_URI,
    },
  };
}
