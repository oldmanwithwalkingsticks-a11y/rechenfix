/**
 * Zentrale Site-weite Konstanten, die in mehreren Components/Pages
 * referenziert werden und bei Änderung an einer Stelle bumpen sollen.
 */

/**
 * Pfad zum aktuellen Karsten-Foto. Bei Foto-Tausch hier auf neue Version
 * bumpen (z. B. -v3.jpg, -v4.jpg). Einzige Stelle, die geändert werden muss.
 *
 * Versions-Suffix als Cache-Bust gegen Vercel-Image-Optimizer
 * (minimumCacheTTL = 30 Tage in next.config.mjs). Foto-Inhalt-Wechsel am
 * gleichen URL-Pfad triggert nicht automatisch Cache-Invalidation — Cache-Key
 * ist url + width + quality, nicht Content-Hash. Rename ist sauberer Bypass.
 *
 * Genutzt in: app/ueber-uns/page.tsx, components/AuthorBio.tsx.
 */
export const KARSTEN_PHOTO_PATH = '/about/karsten-kautz-v2.jpg';
