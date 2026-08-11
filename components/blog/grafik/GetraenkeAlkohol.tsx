/**
 * Grafik: Wie viel reiner Alkohol in gängigen Portionen steckt.
 *
 * Rechenweg je Eintrag: Menge in Millilitern × Volumenprozent × 0,8 (Dichte von
 * Ethanol in Gramm je Milliliter). Beispiel Bier: 300 × 0,05 × 0,8 = 12,0 g.
 * Die Mengen entsprechen den Voreinstellungen in lib/berechnungen/promille.ts,
 * damit Grafik und Rechner nicht auseinanderlaufen.
 *
 * Die Balkenlänge ist proportional zur Alkoholmenge, nicht zur Trinkmenge —
 * genau das ist die Aussage: Der Schnapsbecher ist der kleinste und liegt
 * trotzdem in derselben Größenordnung wie das Glas Bier.
 *
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 */
const getraenke = [
  { name: 'Bier', menge: '0,3 l bei 5 %', gramm: 12.0 },
  { name: 'Weizen', menge: '0,5 l bei 5,4 %', gramm: 21.6 },
  { name: 'Wein', menge: '0,2 l bei 12 %', gramm: 19.2 },
  { name: 'Sekt', menge: '0,1 l bei 11 %', gramm: 8.8 },
  { name: 'Schnaps', menge: '0,02 l bei 40 %', gramm: 6.4 },
  { name: 'Longdrink', menge: '0,04 l bei 40 %', gramm: 12.8 },
] as const;

const MAX = 24;
const BALKEN = 300;

export default function GetraenkeAlkohol() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 340" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .balken { fill: #0F6E56; fill-opacity: 0.85; }
          .dark .balken { fill: #5DCAA5; fill-opacity: 0.9; }
        `}</style>
        <title>Reiner Alkohol in gängigen Portionen</title>
        <desc>
          Ein Glas Bier von 0,3 Litern mit 5 Prozent enthält 12,0 Gramm reinen Alkohol, ein Weizen
          von 0,5 Litern mit 5,4 Prozent 21,6 Gramm, ein Glas Wein von 0,2 Litern mit 12 Prozent
          19,2 Gramm, ein Glas Sekt von 0,1 Litern mit 11 Prozent 8,8 Gramm, ein Schnaps von 20
          Millilitern mit 40 Prozent 6,4 Gramm und ein Longdrink mit 40 Millilitern Spirituose bei
          40 Prozent 12,8 Gramm. Berechnet als Menge mal Volumenprozent mal 0,8.
        </desc>

        <text x="24" y="32" fontSize="17" fontWeight="500" fill="currentColor">Was in einem Glas an reinem Alkohol steckt</text>
        <text x="24" y="52" fontSize="12" fill="#9ca3af">Menge in Millilitern × Volumenprozent × 0,8 — der Faktor ist die Dichte von Ethanol</text>

        {getraenke.map((g, i) => (
          <g key={g.name}>
            <text x="24" y={96 + i * 38} fontSize="13" fontWeight="600" fill="currentColor">{g.name}</text>
            <text x="24" y={112 + i * 38} fontSize="11" fill="#9ca3af">{g.menge}</text>
            <rect className="balken" x="180" y={82 + i * 38} width={(g.gramm / MAX) * BALKEN} height="22" rx="4" />
            <text x={188 + (g.gramm / MAX) * BALKEN} y={98 + i * 38} fontSize="13" fill="currentColor">
              {g.gramm.toLocaleString('de-DE', { minimumFractionDigits: 1 })} g
            </text>
          </g>
        ))}

        <line x1="24" y1="308" x2="656" y2="308" stroke="#d1d5db" strokeWidth="1" />
        <text x="24" y="330" fontSize="12" fill="#9ca3af">
          Der Schnaps ist die kleinste Portion und liegt trotzdem in derselben Größenordnung wie das Glas Bier.
        </text>
      </svg>
      <figcaption className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Die Balken zeigen die Alkoholmenge, nicht die Trinkmenge. Genau darin liegt der
        Denkfehler, den viele beim Abschätzen machen — gezählt werden Gläser, wirksam ist Gramm.
      </figcaption>
    </figure>
  );
}
