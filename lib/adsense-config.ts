/**
 * AdSense Publisher-ID — Single Source of Truth.
 *
 * Per Design öffentlich (steht in jedem `adsbygoogle.js`-Script-Tag und `<ins>`-Element).
 * KEIN Secret, deshalb auch keine Env-Var — die ID ändert sich nicht und wird hier
 * zentral gepflegt, damit Konsumenten (`components/cookie/ConsentScripts.tsx`,
 * `components/ads/AdSlot.tsx`) nicht driften können.
 *
 * Konsolidiert in W14.5.0 (19.05.2026) nach Pre-Flight Secret-Scan W14.5 Phase 0.
 */

export const ADSENSE_PUBLISHER_ID = 'ca-pub-1389746597486587';
