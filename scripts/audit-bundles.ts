// scripts/audit-bundles.ts
//
// Definitionen für Audit-Bundles. Jedes Bundle ist eine benannte Liste von
// Repo-Dateien, die per `npm run audit:bundle <name>` zu einer einzigen
// Markdown-Datei unter `docs/audit-bundles/<name>.md` zusammengefasst werden.
//
// Zweck: Claude Chat (claude.ai) kann nur Top-Level-URLs fetchen, die der
// User explizit gibt — kein Tree-Browsing, keine Pattern-Konstruktion über
// raw.githubusercontent.com. Mit Bundles braucht Claude pro Audit nur einen
// einzigen Raw-Link statt einer 12-zeiligen URL-Liste.

export interface BundleDefinition {
  name: string;
  description: string;
  files: string[];
}

export const BUNDLES: BundleDefinition[] = [
  {
    name: 'block-b-arbeit',
    description: 'Welle 2 Stufe 3 Arbeit Block B — 8 Rechner ohne substanzielle P1-Befunde, Audit-Eingabe für Folge-Prompt',
    files: [
      'lib/rechner-config/arbeit.ts',
      'components/rechner/ArbeitstageRechner.tsx',
      'components/rechner/ArbeitszeitRechner.tsx',
      'components/rechner/FreelancerStundensatzRechner.tsx',
      'components/rechner/PromilleRechner.tsx',
      'components/rechner/RechtsschutzRechner.tsx',
      'components/rechner/TeilzeitRechner.tsx',
      'components/rechner/UeberstundenRechner.tsx',
      'components/rechner/UrlaubstageRechner.tsx',
      'lib/berechnungen/teilzeit.ts',
      'lib/berechnungen/urlaubstage.ts',
      'lib/berechnungen/stundenlohn.ts',
      'lib/berechnungen/_helpers.ts',
    ],
  },
  {
    name: 'block-b-libs',
    description: 'Welle 2 Stufe 3 Arbeit Block B — 5 Berechnungs-Libs (Folge-Bundle 153c), schließt P3-B6/B7/B10-Audit-Lücke',
    files: [
      'lib/berechnungen/arbeitszeit.ts',
      'lib/berechnungen/promille.ts',
      'lib/berechnungen/freelancer-stundensatz.ts',
      'lib/berechnungen/rechtsschutz.ts',
      'lib/berechnungen/ueberstunden.ts',
    ],
  },
  {
    name: 'blockA-arbeit-p3',
    description: 'Welle 2 Stufe 3 Arbeit Block A — P3-Sammelbatch (Prompt 151): 10 rechtssensitive Rechner + Configs + Libs für 17+ P3-Items aus blockA-audit.md',
    files: [
      // Configs (arbeitslosengeld liegt seit 149a in finanzen.ts)
      'lib/rechner-config/arbeit.ts',
      'lib/rechner-config/finanzen.ts',
      // 10 Block-A-Components
      'components/rechner/AbfindungsRechner.tsx',
      'components/rechner/ArbeitslosengeldRechner.tsx',
      'components/rechner/EhegattenunterhaltRechner.tsx',
      'components/rechner/ElternzeitRechner.tsx',
      'components/rechner/KuendigungsfristRechner.tsx',
      'components/rechner/MutterschutzRechner.tsx',
      'components/rechner/PendlerpauschaleRechner.tsx',
      'components/rechner/ScheidungskostenRechner.tsx',
      'components/rechner/UnterhaltsRechner.tsx',
      'components/rechner/ZugewinnausgleichRechner.tsx',
      // Relevante Libs
      'lib/berechnungen/abfindung.ts',
      'lib/berechnungen/duesseldorfer-tabelle.ts',
      'lib/berechnungen/elterngeld.ts',
      'lib/berechnungen/kuendigungsfrist.ts',
      'lib/berechnungen/mutterschutz.ts',
      'lib/berechnungen/pendlerpauschale.ts',
      'lib/berechnungen/scheidungskosten.ts',
      'lib/berechnungen/vpi.ts',
    ],
  },
];
