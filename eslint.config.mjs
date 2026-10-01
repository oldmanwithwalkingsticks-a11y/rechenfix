// ESLint Flat Config — Nachfolger von .eslintrc.json (Welle next16, Next.js 16).
//
// Regeln wie bisher: eslint-config-next in den Varianten core-web-vitals und
// typescript, Aufbau nach nextjs.org/docs/app/api-reference/config/eslint.
//
// Geltungsbereich wie bisher: `next build` hat unter 14.2.35 nur die Verzeichnisse
// aus ESLINT_DEFAULT_DIRS gelintet (app, pages, components, lib, src — pages und
// src gibt es hier nicht). Seit Next.js 16 lintet `next build` gar nicht mehr;
// `npm run lint` hängt deshalb in der Prebuild-Kette. Damit `eslint .` dabei
// nicht plötzlich scripts/, public/ (generiertes sw.js) oder docs/ prüft, ist
// alles außer app/, components/ und lib/ global ausgeschlossen.
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Angleichung an den Regelstand vor der Migration (ESLint 8, eslint-config-next
  // 14.2.35, ermittelt per `eslint --print-config`). Die Welle next16 wechselt die
  // Fassung, nicht die Regeln. Ob die neuen Regeln eingeschaltet werden, ist eine
  // eigene Entscheidung — sie melden am bestehenden Code Fehler in Dateien, die
  // diese Welle nicht anfasst.
  {
    rules: {
      // Unter 14.2.35 ebenfalls aktiv, meldete dort aber 0 Treffer. Das Plugin
      // 16.3.6 meldet 34 Mal (17 Fundstellen, jede doppelt) in 14 Dateien — das
      // sind ECHTE interne <a href>-Links (/datenschutz, /impressum,
      // /ki-transparenz, Rechnerseiten), die das alte Plugin nicht erkannt hat.
      // Kein Fehlalarm. Aus, bis sie auf <Link> umgestellt sind (Folgewelle, siehe
      // docs/audit-arbeitspapiere/nextjs-16-bestandsaufnahme.md, „Folgewellen“);
      // danach wieder einschalten.
      '@next/next/no-html-link-for-pages': 'off',
      // Neu in @next/eslint-plugin-next 16 (warn), vorher nicht vorhanden.
      '@next/next/no-location-assign-relative-destination': 'off',
      // Neu mit eslint-plugin-react-hooks 7 (React-Compiler-Regeln), vorher nicht
      // vorhanden. Am Bestand: 19 × set-state-in-effect, 2 × immutability,
      // 2 × preserve-manual-memoization, 1 × purity.
      'react-hooks/config': 'off',
      'react-hooks/error-boundaries': 'off',
      'react-hooks/gating': 'off',
      'react-hooks/globals': 'off',
      'react-hooks/immutability': 'off',
      'react-hooks/incompatible-library': 'off',
      'react-hooks/preserve-manual-memoization': 'off',
      'react-hooks/purity': 'off',
      'react-hooks/refs': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/set-state-in-render': 'off',
      'react-hooks/static-components': 'off',
      'react-hooks/unsupported-syntax': 'off',
      'react-hooks/use-memo': 'off',
      // Vorher error, in eslint-config-next 16 auf warn abgeschwächt.
      '@typescript-eslint/no-unused-expressions': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },
  globalIgnores([
    // Standard-Ausschlüsse von eslint-config-next
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Bisheriger Geltungsbereich: nur app/, components/, lib/
    '*',
    '!app/',
    '!components/',
    '!lib/',
  ]),
]);

export default eslintConfig;
