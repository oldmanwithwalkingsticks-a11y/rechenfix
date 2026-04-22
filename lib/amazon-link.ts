/**
 * Amazon Partnerprogramm — Suchlink-Helper.
 *
 * Erzeugt Amazon-Suchlinks nach Schema `https://www.amazon.de/s?k=<keyword>&tag=<AMAZON_TAG>`.
 * Der `tag=`-Parameter wird nur angehängt, wenn der User Marketing-Cookies akzeptiert hat —
 * ohne Tag bleibt der Link funktionsfähig für den User, wir bekommen jedoch keine Provision
 * (korrektes Verhalten gemäß DSGVO und Cookie-Consent).
 *
 * Tag-ID bestätigt durch Amazon Associates Germany am 22.04.2026 (Prompt 122-amazon).
 * 180-Tage-Frist für ersten qualifizierten Referral läuft bis ca. 19.10.2026.
 */

export const AMAZON_TAG = 'rechenfix-21';

/**
 * Erzeugt einen Amazon-Suchlink.
 *
 * @param keyword Freitext-Suchbegriff (z. B. "digitale küchenwaage"). Wird URL-encoded.
 * @param marketingConsentGranted true wenn User Marketing-Cookies akzeptiert hat.
 *   Bei false wird der Tag weggelassen — Link funktioniert für den User, wir bekommen
 *   aber keine Provision.
 * @returns voll-qualifizierte amazon.de-Such-URL
 */
export function createAmazonSearchLink(
  keyword: string,
  marketingConsentGranted: boolean,
): string {
  const base = `https://www.amazon.de/s?k=${encodeURIComponent(keyword)}`;
  if (marketingConsentGranted) {
    return `${base}&tag=${AMAZON_TAG}`;
  }
  return base;
}
