/**
 * Grafik: Zwei Cups im selben Land — die gesetzlich festgelegte für die
 * Nährwertkennzeichnung und die im Rezept gebräuchliche.
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 * Muster: components/blog/grafik/HpVsPs.tsx.
 */
export default function EtikettGegenRezept() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 320" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .box-etikett { fill: #FAEEDA; stroke: #854F0B; }
          .box-rezept { fill: #E1F5EE; stroke: #0F6E56; }
          .t-brown { fill: #854F0B; }
          .t-teal { fill: #0F6E56; }
          .dark .box-etikett { fill: #3A3222; stroke: #FAC775; }
          .dark .box-rezept { fill: #1E3A32; stroke: #5DCAA5; }
          .dark .t-brown { fill: #FAC775; }
          .dark .t-teal { fill: #5DCAA5; }
        `}</style>
        <title>Der Cup auf der Packung gegen den Cup im Rezept</title>
        <desc>
          In den USA existieren zwei Cups nebeneinander. Für die Nährwertkennzeichnung sind nach
          21 CFR 101.9 exakt 240 Milliliter festgelegt, bewusst auf eine glatte Zahl gerundet. In
          Rezepten gilt dagegen die Alltags-Cup mit 236,588 Millilitern, also acht
          US-Flüssigunzen. Der Unterschied beträgt rund 1,4 Prozent.
        </desc>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Zwei Cups im selben Land</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">Beide sind korrekt — sie gelten nur für verschiedene Zwecke.</text>

        {/* Etikett */}
        <rect className="box-etikett" x="34" y="80" width="288" height="146" rx="8" strokeWidth="1.5" />
        <text x="178" y="106" fontSize="13" fontWeight="600" textAnchor="middle" className="t-brown">Auf der Packung</text>
        <text x="178" y="152" fontSize="26" fontWeight="700" textAnchor="middle" fill="currentColor">240 ml</text>
        <text x="178" y="180" fontSize="12" textAnchor="middle" fill="#9ca3af">gesetzlich festgelegt für die</text>
        <text x="178" y="196" fontSize="12" textAnchor="middle" fill="#9ca3af">Nährwertkennzeichnung</text>
        <text x="178" y="214" fontSize="11" textAnchor="middle" className="t-brown">21 CFR 101.9</text>

        {/* Rezept */}
        <rect className="box-rezept" x="358" y="80" width="288" height="146" rx="8" strokeWidth="1.5" />
        <text x="502" y="106" fontSize="13" fontWeight="600" textAnchor="middle" className="t-teal">Im Rezept</text>
        <text x="502" y="152" fontSize="26" fontWeight="700" textAnchor="middle" fill="currentColor">236,588 ml</text>
        <text x="502" y="180" fontSize="12" textAnchor="middle" fill="#9ca3af">acht US-Flüssigunzen,</text>
        <text x="502" y="196" fontSize="12" textAnchor="middle" fill="#9ca3af">ein halbes US-Pint</text>
        <text x="502" y="214" fontSize="11" textAnchor="middle" className="t-teal">Kochbücher, Rezeptseiten</text>

        <text x="340" y="252" fontSize="13" fontWeight="600" textAnchor="middle" fill="#9ca3af">1,4 % Unterschied</text>

        <line x1="24" y1="272" x2="656" y2="272" stroke="#d1d5db" strokeWidth="1" />
        <text x="24" y="296" fontSize="12" fill="#9ca3af">Deshalb liefern Umrechnungstabellen verschiedene Ergebnisse: Die einen rechnen mit 236,6,</text>
        <text x="24" y="314" fontSize="12" fill="#9ca3af">die anderen mit 240 — und beide haben recht.</text>
      </svg>
    </figure>
  );
}
