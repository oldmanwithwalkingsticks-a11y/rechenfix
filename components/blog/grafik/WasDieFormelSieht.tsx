/**
 * Grafik: Die BMI-Formel kennt genau zwei Eingaben. Alles andere, was für die
 * Einordnung eines einzelnen Menschen erheblich wäre, kommt in ihr nicht vor.
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 * Muster: components/blog/grafik/HpVsPs.tsx.
 */
const kennt = ['Körpergewicht', 'Körpergröße'];

const kenntNicht = [
  'Muskelmasse',
  'Fettverteilung am Körper',
  'Knochenbau',
  'Alter',
  'Geschlecht',
  'Herkunft der Vergleichsdaten',
];

export default function WasDieFormelSieht() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 320" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .box-kennt { fill: #E1F5EE; stroke: #0F6E56; }
          .box-nicht { fill: none; stroke: #9ca3af; }
          .t-teal { fill: #0F6E56; }
          .p-teal { fill: #0F6E56; }
          .dark .box-kennt { fill: #1E3A32; stroke: #5DCAA5; }
          .dark .t-teal { fill: #5DCAA5; }
          .dark .p-teal { fill: #5DCAA5; }
        `}</style>
        <title>Die beiden Eingaben der BMI-Formel und was sie nicht berücksichtigt</title>
        <desc>
          Die Formel verarbeitet ausschließlich Körpergewicht und Körpergröße. Nicht
          berücksichtigt werden Muskelmasse, die Verteilung des Fetts am Körper, der Knochenbau,
          das Alter, das Geschlecht sowie die Herkunft der Bevölkerung, aus der die Vergleichsdaten
          stammen.
        </desc>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Zwei Eingaben, eine Zahl</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">Was in der Rechnung vorkommt — und was nicht.</text>

        {/* Kennt */}
        <rect className="box-kennt" x="34" y="78" width="288" height="176" rx="8" strokeWidth="1.5" />
        <text x="178" y="104" fontSize="14" fontWeight="600" textAnchor="middle" className="t-teal">Die Formel kennt</text>
        {kennt.map((z, i) => (
          <g key={z}>
            <circle cx="70" cy={142 + i * 30} r="3.5" className="p-teal" />
            <text x="86" y={147 + i * 30} fontSize="13" fill="currentColor">{z}</text>
          </g>
        ))}
        <text x="178" y="226" fontSize="12" textAnchor="middle" fill="#9ca3af">Gewicht geteilt durch</text>
        <text x="178" y="244" fontSize="12" textAnchor="middle" fill="#9ca3af">Größe im Quadrat</text>

        {/* Kennt nicht */}
        <rect className="box-nicht" x="358" y="78" width="288" height="176" rx="8" strokeWidth="1.5" strokeDasharray="4 4" />
        <text x="502" y="104" fontSize="14" fontWeight="600" textAnchor="middle" fill="#9ca3af">Die Formel kennt nicht</text>
        {kenntNicht.map((z, i) => (
          <g key={z}>
            <circle cx="386" cy={132 + i * 22} r="3" fill="none" stroke="#9ca3af" strokeWidth="1.5" />
            <text x="402" y={136 + i * 22} fontSize="12" fill="#9ca3af">{z}</text>
          </g>
        ))}

        <line x1="24" y1="276" x2="656" y2="276" stroke="#d1d5db" strokeWidth="1" />
        <text x="24" y="300" fontSize="12" fill="#9ca3af">Für den Vergleich ganzer Bevölkerungen genügen zwei Zahlen. Für die Einordnung eines</text>
        <text x="24" y="316" fontSize="12" fill="#9ca3af">einzelnen Menschen fehlt der Formel alles Übrige.</text>
      </svg>
    </figure>
  );
}
