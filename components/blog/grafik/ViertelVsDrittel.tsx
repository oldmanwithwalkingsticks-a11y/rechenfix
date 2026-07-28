/**
 * Grafik: Zwei Schrittweiten auf derselben Strecke — Randle Holmes Viertelzoll
 * (1688) gegen das Gerstenkorn-Drittel (ab 1856 belegt). Über 8¼ bis 12 Zoll
 * ergibt das Viertel 15 Größen, das Drittel nur 11.
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 * Muster: components/blog/grafik/HpVsPs.tsx.
 */
export default function ViertelVsDrittel() {
  const viertel = [70, 108, 146, 184, 222, 260, 298, 336, 374, 412, 450, 488, 526, 564, 602, 640];
  const drittel = [70, 121, 171, 222, 273, 323, 374, 425, 475, 526, 577, 627];

  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 320" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .t-teal { fill: #0F6E56; }
          .t-brown { fill: #854F0B; }
          .l-teal { stroke: #0F6E56; }
          .l-brown { stroke: #854F0B; }
          .dark .t-teal { fill: #5DCAA5; }
          .dark .t-brown { fill: #FAC775; }
          .dark .l-teal { stroke: #5DCAA5; }
          .dark .l-brown { stroke: #FAC775; }
        `}</style>
        <title>Viertelzoll gegen Drittelzoll als Schrittweite der Schuhgröße</title>
        <desc>
          Randle Holme beschreibt 1688 eine Skala in Viertelzoll-Schritten: von 8¼ Zoll bis
          genau 12 Zoll ergibt das 15 Erwachsenengrößen. Das Gerstenkorn-Drittel, erst 1856
          bei Robert Gardiner belegt, kommt auf derselben Strecke nur auf 11 Stufen. Dieselbe
          Fußlänge erhält je nach System eine andere Nummer.
        </desc>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Dieselbe Strecke, zwei Schrittweiten</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">Von 8¼ bis 12 Zoll — der Bereich, den Holme 1688 für Erwachsene beschreibt.</text>

        {/* Viertelzoll — Holme 1688, oben */}
        <text x="24" y="98" fontSize="14" fontWeight="500" className="t-teal">Viertelzoll — Randle Holme, 1688</text>
        {viertel.map((x, i) => (
          <line key={`v${i}`} className="l-teal" x1={x} y1={112} x2={x} y2={140} strokeWidth={i === 0 ? 2.5 : 1.5} />
        ))}
        <line className="l-teal" x1="70" y1="140" x2="640" y2="140" strokeWidth="1.5" />
        <text x="70" y="162" fontSize="11" textAnchor="middle" fill="#9ca3af">8¼″</text>
        <text x="108" y="162" fontSize="11" textAnchor="middle" fill="#9ca3af">1</text>
        <text x="260" y="162" fontSize="11" textAnchor="middle" fill="#9ca3af">5</text>
        <text x="450" y="162" fontSize="11" textAnchor="middle" fill="#9ca3af">10</text>
        <text x="640" y="162" fontSize="11" textAnchor="middle" fill="#9ca3af">15</text>
        <text x="24" y="182" fontSize="12" fill="#9ca3af">15 Größen — die „long fifteens“ liegen bei genau 12 Zoll.</text>

        {/* Drittelzoll — Gerstenkorn, ab 1856 belegt, unten */}
        <text x="24" y="226" fontSize="14" fontWeight="500" className="t-brown">Drittelzoll (Gerstenkorn) — belegt ab 1856</text>
        {drittel.map((x, i) => (
          <line key={`d${i}`} className="l-brown" x1={x} y1={240} x2={x} y2={268} strokeWidth={i === 0 ? 2.5 : 1.5} />
        ))}
        <line className="l-brown" x1="70" y1="268" x2="640" y2="268" strokeWidth="1.5" />
        <text x="70" y="290" fontSize="11" textAnchor="middle" fill="#9ca3af">8¼″</text>
        <text x="121" y="290" fontSize="11" textAnchor="middle" fill="#9ca3af">1</text>
        <text x="323" y="290" fontSize="11" textAnchor="middle" fill="#9ca3af">5</text>
        <text x="577" y="290" fontSize="11" textAnchor="middle" fill="#9ca3af">10</text>
        <text x="24" y="310" fontSize="12" fill="#9ca3af">Nur 11 Stufen auf derselben Strecke — dieselbe Fußlänge bekommt eine andere Nummer.</text>
      </svg>
    </figure>
  );
}
