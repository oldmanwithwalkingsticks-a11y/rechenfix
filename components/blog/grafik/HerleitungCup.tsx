/**
 * Grafik: Die Herleitung der 236,5882365 Milliliter — vom Zylindermaß der englischen
 * Weingallone über die Pi-Näherung 22/7 und die Teilung durch 128 bis zur metrischen
 * Festlegung des Zolls 1959. Zeigt, dass die krumme Zahl kein Messwert ist, sondern
 * das Ergebnis einer Kette von Setzungen.
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor,
 * farbige Flächen/Texte als className (kein fill-Attribut an <text>).
 * Muster: components/blog/grafik/GerstenkornStreuung.tsx.
 */
export default function HerleitungCup() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 400" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .k-beige { fill: #FAEEDA; }
          .k-mint { fill: #E1F5EE; }
          .t-brown { fill: #854F0B; }
          .t-teal { fill: #0F6E56; }
          .t-coral { fill: #993C1D; }
          .l-grau { stroke: #9ca3af; }
          .dark .k-beige { fill: #3A3222; }
          .dark .k-mint { fill: #1E3A32; }
          .dark .t-brown { fill: #FAC775; }
          .dark .t-teal { fill: #5DCAA5; }
          .dark .t-coral { fill: #F0997B; }
        `}</style>
        <title>Herleitung des amerikanischen Cups von der Weingallone bis zur metrischen Definition</title>
        <desc>
          Die Kette beginnt bei einem Zylinder von sieben Zoll Durchmesser und sechs Zoll Höhe.
          Rechnerisch fasst er 230,907 Kubikzoll; auf die glatte Zahl 231 kommt man erst mit der
          Näherung von Pi als 22 Siebtel. Diese 231 Kubikzoll wurden 1707 als Weingallone
          festgeschrieben. Geteilt durch 128 ergibt sich die Flüssigunze, mal acht der Cup. Seit
          der Zoll 1959 auf exakt 2,54 Zentimeter festgelegt wurde, misst der Cup exakt
          236,5882365 Milliliter — eine Zahl, die aus lauter Setzungen entstanden ist und aus
          keiner einzigen Messung.
        </desc>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Wie aus einem Weinfass 236,5882365 werden</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">Fünf Schritte, kein einziger davon eine Messung.</text>

        {/* Schritt 1: Zylinder */}
        <rect className="k-beige" x="24" y="80" width="180" height="72" rx="8" stroke="#854F0B" strokeWidth="1" />
        <text x="114" y="106" fontSize="13" fontWeight="500" textAnchor="middle" className="t-brown">Zylindermaß</text>
        <text x="114" y="126" fontSize="12" textAnchor="middle" fill="#9ca3af">7 Zoll breit, 6 Zoll hoch</text>
        <text x="114" y="143" fontSize="12" textAnchor="middle" fill="#9ca3af">= 230,907 Kubikzoll</text>

        {/* Pfeil 1 mit Pi-Hinweis */}
        <line className="l-grau" x1="212" y1="116" x2="256" y2="116" strokeWidth="1.5" />
        <text x="234" y="106" fontSize="12" fontWeight="500" textAnchor="middle" className="t-coral">Pi als 22/7</text>

        {/* Schritt 2: 231 */}
        <rect className="k-beige" x="264" y="80" width="176" height="72" rx="8" stroke="#854F0B" strokeWidth="1" />
        <text x="352" y="106" fontSize="13" fontWeight="500" textAnchor="middle" className="t-brown">Weingallone 1707</text>
        <text x="352" y="126" fontSize="12" textAnchor="middle" fill="#9ca3af">glatt gerundet auf</text>
        <text x="352" y="143" fontSize="12" textAnchor="middle" fill="#9ca3af">231 Kubikzoll</text>

        {/* Pfeil 2 */}
        <line className="l-grau" x1="448" y1="116" x2="492" y2="116" strokeWidth="1.5" />
        <text x="470" y="106" fontSize="12" textAnchor="middle" fill="#9ca3af">: 128</text>

        {/* Schritt 3: Fluessigunze */}
        <rect className="k-beige" x="500" y="80" width="156" height="72" rx="8" stroke="#854F0B" strokeWidth="1" />
        <text x="578" y="106" fontSize="13" fontWeight="500" textAnchor="middle" className="t-brown">Flüssigunze</text>
        <text x="578" y="126" fontSize="12" textAnchor="middle" fill="#9ca3af">1,8046875</text>
        <text x="578" y="143" fontSize="12" textAnchor="middle" fill="#9ca3af">Kubikzoll</text>

        {/* Verbindung nach unten */}
        <line className="l-grau" x1="578" y1="160" x2="578" y2="196" strokeWidth="1.5" />
        <text x="600" y="182" fontSize="12" fill="#9ca3af">mal 8</text>

        {/* Schritt 4: Cup in Kubikzoll */}
        <rect className="k-mint" x="440" y="204" width="216" height="72" rx="8" stroke="#0F6E56" strokeWidth="1" />
        <text x="548" y="230" fontSize="13" fontWeight="500" textAnchor="middle" className="t-teal">Ein Cup</text>
        <text x="548" y="250" fontSize="12" textAnchor="middle" fill="#9ca3af">14,4375 Kubikzoll</text>
        <text x="548" y="267" fontSize="12" textAnchor="middle" fill="#9ca3af">noch ohne Millilitermaß</text>

        {/* Verbindung nach links */}
        <line className="l-grau" x1="432" y1="240" x2="380" y2="240" strokeWidth="1.5" />
        <text x="406" y="230" fontSize="12" textAnchor="middle" fill="#9ca3af">1959</text>

        {/* Schritt 5: metrisch */}
        <rect className="k-mint" x="140" y="204" width="232" height="72" rx="8" stroke="#0F6E56" strokeWidth="1" />
        <text x="256" y="230" fontSize="13" fontWeight="500" textAnchor="middle" className="t-teal">1 Zoll = 2,54 cm exakt</text>
        <text x="256" y="252" fontSize="14" fontWeight="600" textAnchor="middle" className="t-teal">236,5882365 ml</text>
        <text x="256" y="269" fontSize="12" textAnchor="middle" fill="#9ca3af">exakt, nicht gerundet</text>

        <text x="24" y="318" fontSize="12" fill="#9ca3af">Die 240 Milliliter der US-Behörde entstehen in einem einzigen Schritt: bewusstes Runden für die</text>
        <text x="24" y="336" fontSize="12" fill="#9ca3af">Nährwertkennzeichnung. Die krummere der beiden Zahlen ist die ungeplante.</text>
        <text x="24" y="370" fontSize="12" fontWeight="500" className="t-coral">Ein Maß kann exakt sein und trotzdem willkürlich — beides schließt sich nicht aus.</text>
      </svg>
    </figure>
  );
}
