/**
 * Grafik: Dieselbe Blutprobe, zwei Rückrechnungen.
 *
 * Beispielfall: Tatzeit 1 Uhr, Blutentnahme 7 Uhr, gemessen 1,30 Promille.
 *
 * Fahruntüchtigkeit (§ 316 StGB): 0,10 ‰ je Stunde, die ersten zwei Stunden
 * nach Trinkende bleiben wegen möglicher Resorption unberücksichtigt, also
 * 4 Stunden × 0,10 = 0,40 → 1,70 ‰.
 *
 * Schuldfähigkeit (§§ 20, 21 StGB): 0,20 ‰ je Stunde über die volle Zeit plus
 * einmaliger Sicherheitszuschlag von 0,20 ‰, also 6 × 0,20 + 0,20 = 1,40
 * → 2,70 ‰.
 *
 * Beide Wege zugunsten des Beschuldigten — was ihm nützt, ist bei den beiden
 * Fragen entgegengesetzt.
 *
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 */
const spalten = [
  {
    frage: 'Fahruntüchtigkeit',
    norm: '§ 316 StGB',
    zeilen: [
      { label: 'gemessen um 7 Uhr', wert: '1,30 ‰' },
      { label: 'angerechnete Stunden', wert: '4' },
      { label: 'Abbau je Stunde', wert: '0,10 ‰' },
      { label: 'Sicherheitszuschlag', wert: 'keiner' },
    ],
    ergebnis: '1,70 ‰',
    nutzen: 'niedrig ist günstig für den Beschuldigten',
    x: 40,
    ton: 'links',
  },
  {
    frage: 'Schuldfähigkeit',
    norm: '§§ 20, 21 StGB',
    zeilen: [
      { label: 'gemessen um 7 Uhr', wert: '1,30 ‰' },
      { label: 'angerechnete Stunden', wert: '6' },
      { label: 'Abbau je Stunde', wert: '0,20 ‰' },
      { label: 'Sicherheitszuschlag', wert: '0,20 ‰' },
    ],
    ergebnis: '2,70 ‰',
    nutzen: 'hoch ist günstig für den Beschuldigten',
    x: 360,
    ton: 'rechts',
  },
] as const;

export default function ZweiRueckrechnungen() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 400" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .k-links { fill: #E6F2ED; stroke: #0F6E56; }
          .k-rechts { fill: #FAEEDA; stroke: #854F0B; }
          .t-links { fill: #0F6E56; }
          .t-rechts { fill: #854F0B; }
          .dark .k-links { fill: #1F3A33; }
          .dark .k-rechts { fill: #3A3222; }
          .dark .t-links { fill: #5DCAA5; }
          .dark .t-rechts { fill: #E8C06A; }
        `}</style>
        <title>Dieselbe Blutprobe, zwei Rückrechnungen</title>
        <desc>
          Beispielfall: Tatzeit 1 Uhr, Blutentnahme um 7 Uhr, gemessen 1,30 Promille. Für die
          Frage der Fahruntüchtigkeit werden vier Stunden mit je 0,10 Promille angesetzt, ohne
          Sicherheitszuschlag; das ergibt 1,70 Promille zur Tatzeit. Für die Frage der
          Schuldfähigkeit werden sechs Stunden mit je 0,20 Promille angesetzt zuzüglich eines
          einmaligen Sicherheitszuschlags von 0,20 Promille; das ergibt 2,70 Promille. Beide
          Rechnungen gehen zugunsten des Beschuldigten aus, weil ein niedriger Wert bei der einen
          Frage und ein hoher Wert bei der anderen Frage für ihn günstig ist.
        </desc>

        <text x="24" y="32" fontSize="17" fontWeight="500" fill="currentColor">Dieselbe Blutprobe, zwei Ergebnisse</text>
        <text x="24" y="52" fontSize="12" fill="#9ca3af">Tatzeit 1 Uhr, Blutentnahme 7 Uhr, gemessen 1,30 ‰</text>

        {spalten.map((sp) => (
          <g key={sp.frage}>
            <rect
              className={sp.ton === 'links' ? 'k-links' : 'k-rechts'}
              x={sp.x}
              y="76"
              width="280"
              height="252"
              rx="10"
              strokeWidth="1"
            />
            <text x={sp.x + 140} y="104" fontSize="15" fontWeight="600" textAnchor="middle" className={sp.ton === 'links' ? 't-links' : 't-rechts'}>
              {sp.frage}
            </text>
            <text x={sp.x + 140} y="122" fontSize="11" textAnchor="middle" fill="#9ca3af">{sp.norm}</text>

            {sp.zeilen.map((z, i) => (
              <g key={z.label}>
                <text x={sp.x + 20} y={154 + i * 26} fontSize="12" fill="currentColor">{z.label}</text>
                <text x={sp.x + 260} y={154 + i * 26} fontSize="12" fontWeight="600" textAnchor="end" fill="currentColor">{z.wert}</text>
              </g>
            ))}

            <line x1={sp.x + 20} y1="270" x2={sp.x + 260} y2="270" stroke="#9ca3af" strokeWidth="1" />
            <text x={sp.x + 20} y="296" fontSize="13" fontWeight="600" fill="currentColor">zur Tatzeit</text>
            <text x={sp.x + 260} y="298" fontSize="20" fontWeight="600" textAnchor="end" className={sp.ton === 'links' ? 't-links' : 't-rechts'}>
              {sp.ergebnis}
            </text>
            <text x={sp.x + 140} y="318" fontSize="11" textAnchor="middle" fill="#9ca3af">{sp.nutzen}</text>
          </g>
        ))}

        <line x1="24" y1="352" x2="656" y2="352" stroke="#d1d5db" strokeWidth="1" />
        <text x="24" y="374" fontSize="12" fill="#9ca3af">
          Ein ganzes Promille Unterschied — bei identischer Blutprobe und identischer Person.
        </text>
        <text x="24" y="392" fontSize="12" fill="#9ca3af">
          Gerechnet wird nicht der wahrscheinlichste Wert, sondern der nicht mehr bestreitbare.
        </text>
      </svg>
      <figcaption className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Zurückgerechnet wird immer zugunsten des Beschuldigten. Weil ihm bei der Fahruntüchtigkeit
        ein niedriger und bei der Schuldfähigkeit ein hoher Wert nützt, führt dasselbe Prinzip zu
        entgegengesetzten Rechenwegen.
      </figcaption>
    </figure>
  );
}
