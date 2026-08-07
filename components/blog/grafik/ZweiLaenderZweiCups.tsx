/**
 * Grafik: Zwei Länder, dieselbe Struktur — in den USA wie in Japan stehen ein
 * Alltags-Cup und ein zweiter, amtlich oder traditionell festgelegter Cup nebeneinander.
 * Der jeweils krummere Wert ist in beiden Fällen der ältere, aus einer Umrechnung
 * entstandene. Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor,
 * farbige Flächen/Texte als className (kein fill-Attribut an <text>).
 * Muster: components/blog/grafik/GerstenkornStreuung.tsx.
 */
export default function ZweiLaenderZweiCups() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 340" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .b-alt { fill: #FAECE7; }
          .b-neu { fill: #E1F5EE; }
          .t-coral { fill: #993C1D; }
          .t-teal { fill: #0F6E56; }
          .dark .b-alt { fill: #3A2A22; }
          .dark .b-neu { fill: #1E3A32; }
          .dark .t-coral { fill: #F0997B; }
          .dark .t-teal { fill: #5DCAA5; }
        `}</style>
        <title>Zwei Länder mit jeweils zwei gleichzeitig gültigen Cups</title>
        <desc>
          In den Vereinigten Staaten stehen der Alltags-Cup mit 236,588 Millilitern und der
          gesetzliche Cup der Lebensmittelkennzeichnung mit 240 Millilitern nebeneinander. In
          Japan gilt dieselbe Doppelung: das traditionelle gō mit 180,39 Millilitern, das im
          Reiskocherbecher weiterlebt, und der 1959 festgelegte Küchen-Cup mit 200 Millilitern.
          In beiden Ländern ist der krummere Wert der ältere und stammt aus einer Umrechnung,
          der glattere ist eine bewusste Setzung.
        </desc>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Zwei Länder, dasselbe Muster</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">Je ein Erbwert aus einer Umrechnung, je ein glatt gesetzter Wert. Beide gelten gleichzeitig.</text>

        {/* USA */}
        <text x="24" y="94" fontSize="14" fontWeight="600" fill="currentColor">USA</text>
        <rect className="b-alt" x="120" y="76" width="248" height="62" rx="8" stroke="#993C1D" strokeWidth="1" />
        <text x="244" y="100" fontSize="13" fontWeight="500" textAnchor="middle" className="t-coral">236,588 ml — Rezept-Cup</text>
        <text x="244" y="122" fontSize="12" textAnchor="middle" fill="#9ca3af">Erbe der Weingallone von 1707</text>
        <rect className="b-neu" x="384" y="76" width="248" height="62" rx="8" stroke="#0F6E56" strokeWidth="1" />
        <text x="508" y="100" fontSize="13" fontWeight="500" textAnchor="middle" className="t-teal">240 ml — Etikett-Cup</text>
        <text x="508" y="122" fontSize="12" textAnchor="middle" fill="#9ca3af">gerundet für die Kennzeichnung</text>

        {/* Japan */}
        <text x="24" y="188" fontSize="14" fontWeight="600" fill="currentColor">Japan</text>
        <rect className="b-alt" x="120" y="170" width="248" height="62" rx="8" stroke="#993C1D" strokeWidth="1" />
        <text x="244" y="194" fontSize="13" fontWeight="500" textAnchor="middle" className="t-coral">180,39 ml — ein gō</text>
        <text x="244" y="216" fontSize="12" textAnchor="middle" fill="#9ca3af">im Reiskocherbecher, seit 1891</text>
        <rect className="b-neu" x="384" y="170" width="248" height="62" rx="8" stroke="#0F6E56" strokeWidth="1" />
        <text x="508" y="194" fontSize="13" fontWeight="500" textAnchor="middle" className="t-teal">200 ml — Rezept-Cup</text>
        <text x="508" y="216" fontSize="12" textAnchor="middle" fill="#9ca3af">glatt gesetzt nach 1959</text>

        {/* Trennlinie */}
        <line x1="376" y1="66" x2="376" y2="242" stroke="#d1d5db" strokeWidth="1" strokeDasharray="4 4" />
        <text x="244" y="264" fontSize="12" fontWeight="500" textAnchor="middle" className="t-coral">gewachsen</text>
        <text x="508" y="264" fontSize="12" fontWeight="500" textAnchor="middle" className="t-teal">gesetzt</text>

        <text x="24" y="304" fontSize="12" fill="#9ca3af">Wer japanischen Reis mit einem europäischen 250-ml-Becher misst, nimmt fast vierzig Prozent zu viel.</text>
        <text x="24" y="322" fontSize="12" fill="#9ca3af">Der Unterschied zwischen den beiden Werten eines Landes liegt dagegen nur bei rund zehn Prozent.</text>
      </svg>
    </figure>
  );
}
