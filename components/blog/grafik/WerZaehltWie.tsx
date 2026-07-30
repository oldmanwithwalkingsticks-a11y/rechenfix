/**
 * Grafik: Wer zählt in Tausenderschritten, wer in 1024er-Schritten. Zeigt, dass
 * die Fronten nicht nach Branche verlaufen, sondern quer durch alles — und dass
 * Apple 2009 die Seite gewechselt hat.
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 * Muster: components/blog/grafik/HpVsPs.tsx.
 */
const dezimal = [
  'Festplatten und SSDs',
  'DVD (4,7 GB)',
  'USB-Datenraten',
  'Internetanbieter',
  'macOS — seit August 2009',
];

const binaer = [
  'Arbeitsspeicher (nach JEDEC)',
  'CD (700 MB)',
  'Windows',
  'macOS — bis August 2009',
  'Diskette, aber nur erste Stufe',
];

export default function WerZaehltWie() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 330" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .box-dez { fill: #E1F5EE; stroke: #0F6E56; }
          .box-bin { fill: #FAEEDA; stroke: #854F0B; }
          .t-teal { fill: #0F6E56; }
          .t-brown { fill: #854F0B; }
          .p-teal { fill: #0F6E56; }
          .p-brown { fill: #854F0B; }
          .dark .box-dez { fill: #1E3A32; stroke: #5DCAA5; }
          .dark .box-bin { fill: #3A3222; stroke: #FAC775; }
          .dark .t-teal { fill: #5DCAA5; }
          .dark .t-brown { fill: #FAC775; }
          .dark .p-teal { fill: #5DCAA5; }
          .dark .p-brown { fill: #FAC775; }
        `}</style>
        <title>Welche Geräte und Systeme dezimal zählen und welche binär</title>
        <desc>
          In Tausenderschritten zählen Festplatten und SSDs, die DVD, USB-Datenraten,
          Internetanbieter und macOS seit August 2009. In 1024er-Schritten zählen der
          Arbeitsspeicher nach JEDEC, die CD, Windows, macOS bis August 2009 sowie die Diskette in
          ihrer ersten Stufe. Apple hat mit Snow Leopard die Seite gewechselt.
        </desc>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Wer zählt wie</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">Die Fronten verlaufen nicht nach Branche — und sie sind nicht stabil.</text>

        {/* Linke Spalte: dezimal */}
        <rect className="box-dez" x="34" y="76" width="292" height="182" rx="8" strokeWidth="1.5" />
        <text x="180" y="102" fontSize="14" fontWeight="600" textAnchor="middle" className="t-teal">in Tausenderschritten</text>
        <text x="180" y="120" fontSize="11" textAnchor="middle" fill="#9ca3af">1 kB = 1000 Byte</text>
        {dezimal.map((z, i) => (
          <g key={z}>
            <circle cx="60" cy={148 + i * 24} r="3" className="p-teal" />
            <text x="74" y={152 + i * 24} fontSize="12" fill="#9ca3af">{z}</text>
          </g>
        ))}

        {/* Rechte Spalte: binär */}
        <rect className="box-bin" x="354" y="76" width="292" height="182" rx="8" strokeWidth="1.5" />
        <text x="500" y="102" fontSize="14" fontWeight="600" textAnchor="middle" className="t-brown">in 1024er-Schritten</text>
        <text x="500" y="120" fontSize="11" textAnchor="middle" fill="#9ca3af">1 KiB = 1024 Byte</text>
        {binaer.map((z, i) => (
          <g key={z}>
            <circle cx="380" cy={148 + i * 24} r="3" className="p-brown" />
            <text x="394" y={152 + i * 24} fontSize="12" fill="#9ca3af">{z}</text>
          </g>
        ))}

        <line x1="24" y1="284" x2="656" y2="284" stroke="#d1d5db" strokeWidth="1" />
        <text x="24" y="308" fontSize="12" fill="#9ca3af">macOS steht in beiden Spalten: Mit Snow Leopard wechselte Apple im August 2009 die Seite.</text>
        <text x="24" y="326" fontSize="12" fill="#9ca3af">Dieselbe Platte, zwei Zahlen, beide korrekt.</text>
      </svg>
    </figure>
  );
}
