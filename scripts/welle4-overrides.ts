/**
 * Welle-4 — Component↔Slug-Override-Map und Inventur-Konventionen.
 *
 * Zweck: Behebt die in docs/audit-arbeitspapiere/welle4-inventar-pre-scoping.md
 * Sektion 6 dokumentierten Anomalien A-02 (Slug↔Component-Naming-Drift) und
 * A-07 (Underscore-Lib-Helper-Konvention). Wird in den Welle-4-Modulen M1–M5
 * von Inline-Inventar-Sweeps konsumiert.
 *
 * Quelle: welle4-scoping.md (M0-Sektion), welle4-inventar-pre-scoping.md (A-02/A-03/A-07).
 * Stand: 03.05.2026 (Welle-4 M0).
 */

/**
 * Component-Datei-Name → Slug-Mapping für die 8 Camel/Kebab-Mismatches,
 * die die Auto-Heuristik (Camel-zu-Kebab-Konversion) nicht abbildet.
 *
 * Key:   Component-Datei-Basename ohne `.tsx` (z. B. `KwPsRechner`)
 * Value: URL-Slug aus `lib/rechner-config/<kategorie>.ts` (z. B. `kw-ps-umrechner`)
 */
export const COMPONENT_SLUG_OVERRIDES: Record<string, string> = {
  KwPsRechner:             'kw-ps-umrechner',
  EinheitenRechner:        'einheiten-umrechner',
  GleichungsloeserRechner: 'gleichungsrechner',
  PfaendungRechner:        'pfaendungsrechner',
  ProzVeraenderungRechner: 'prozentuale-veraenderung-rechner',
  TaschenrechnerRechner:   'wissenschaftlicher-taschenrechner',
  AfbgRechner:             'aufstiegs-bafoeg-rechner',
  ZufallszahlRechner:      'zufallszahl-generator',
};

/**
 * Components ohne Rechner-Charakter — sollen von Inventur-Sweeps NICHT als
 * „Slug-Mismatch" gemeldet werden. Es sind UI-Hilfs-Komponenten ohne eigenen
 * Slug-Anker (Tipp-Boxen, Was-wäre-wenn-Schalter, KI-Erklärung-Wrapper etc.).
 */
export const COMPONENT_HELPER_SET: ReadonlySet<string> = new Set([
  'AiExplain',
  'SchlafTipp',
  'SchnellCheck',
  'StromSpartipp',
  'WasWaereWenn',
]);

/**
 * Underscore-Prefix-Konvention (A-07): Lib-Files unter `lib/berechnungen/`
 * mit `_`-Prefix sind nicht-zu-verifizierende Helper (Utility-Funktionen,
 * Konstanten-Tabellen, PAP-Programme). Welle-4-Coverage-Bilanz filtert sie aus.
 *
 * Beispiele: `_helpers.ts`, `_lohnsteuer-pap-2026.ts`.
 */
export const UNDERSCORE_LIB_HELPER_REGEX = /^_/;

/**
 * Helper für Inventur-Sweeps: ist diese Lib-Datei (Basename ohne `.ts`)
 * ein Underscore-Helper im Sinne von A-07?
 */
export function isUnderscoreLibHelper(libBasename: string): boolean {
  return UNDERSCORE_LIB_HELPER_REGEX.test(libBasename);
}
