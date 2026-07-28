/**
 * Grafik: Was ISO 19407 rechnet und was im Schuh steht — eine halbe Größe
 * Unterschied bei denselben Paaren. Die Norm hält diese Abweichung selbst fest
 * und bezeichnet ihre eigenen Tabellen als technisch korrekter.
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor,
 * Kachelflächen im Dark abgedunkelt, damit heller Text lesbar bleibt.
 * Muster: components/blog/grafik/HpVsPs.tsx.
 */
export default function NormVsEtikett() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 300" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .box-norm { fill: #E1F5EE; }
          .box-etikett { fill: #FAEEDA; }
          .t-teal { fill: #0F6E56; }
          .t-brown { fill: #854F0B; }
          .dark .box-norm { fill: #1E3A32; }
          .dark .box-etikett { fill: #3A3222; }
          .dark .t-teal { fill: #5DCAA5; }
          .dark .t-brown { fill: #FAC775; }
        `}</style>
        <title>Umrechnung nach ISO 19407 gegen die Größenangabe im Schuh</title>
        <desc>
          Die Norm ISO 19407 rechnet UK 4 auf EU 36,5 und UK 8 auf EU 41,5. Im Handel sind
          dieselben Paare regelmäßig mit 37 beziehungsweise 42 etikettiert. Die Norm hält
          diese Abweichung von einer halben Größe ausdrücklich fest.
        </desc>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Die Norm und das Etikett sind sich nicht einig</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">Eine halbe Größe Unterschied — und die Norm weiß davon.</text>

        {/* Spaltenköpfe */}
        <text x="150" y="96" fontSize="13" fontWeight="500" textAnchor="middle" fill="#9ca3af">britische Größe</text>
        <text x="358" y="96" fontSize="13" fontWeight="500" textAnchor="middle" className="t-teal">so rechnet ISO 19407</text>
        <text x="566" y="96" fontSize="13" fontWeight="500" textAnchor="middle" className="t-brown">so steht es im Schuh</text>

        {/* Zeile 1 */}
        <text x="150" y="142" fontSize="20" fontWeight="600" textAnchor="middle" fill="currentColor">UK 4</text>
        <rect className="box-norm" x="278" y="116" width="160" height="40" rx="6" stroke="#0F6E56" strokeWidth="1" />
        <text x="358" y="143" fontSize="18" fontWeight="600" textAnchor="middle" className="t-teal">EU 36,5</text>
        <rect className="box-etikett" x="486" y="116" width="160" height="40" rx="6" stroke="#854F0B" strokeWidth="1" />
        <text x="566" y="143" fontSize="18" fontWeight="600" textAnchor="middle" className="t-brown">EU 37</text>
        <text x="462" y="142" fontSize="16" textAnchor="middle" fill="#9ca3af">≠</text>

        {/* Zeile 2 */}
        <text x="150" y="204" fontSize="20" fontWeight="600" textAnchor="middle" fill="currentColor">UK 8</text>
        <rect className="box-norm" x="278" y="178" width="160" height="40" rx="6" stroke="#0F6E56" strokeWidth="1" />
        <text x="358" y="205" fontSize="18" fontWeight="600" textAnchor="middle" className="t-teal">EU 41,5</text>
        <rect className="box-etikett" x="486" y="178" width="160" height="40" rx="6" stroke="#854F0B" strokeWidth="1" />
        <text x="566" y="205" fontSize="18" fontWeight="600" textAnchor="middle" className="t-brown">EU 42</text>
        <text x="462" y="204" fontSize="16" textAnchor="middle" fill="#9ca3af">≠</text>

        <line x1="24" y1="244" x2="656" y2="244" stroke="#d1d5db" strokeWidth="1" />
        <text x="24" y="270" fontSize="12" fill="#9ca3af">Die Norm vermerkt, dass Kunden über diese Abweichung überrascht sind — und hält ihre eigenen</text>
        <text x="24" y="288" fontSize="12" fill="#9ca3af">Tabellen für technisch korrekter. Geändert hat sich an der Etikettierung dadurch nichts.</text>
      </svg>
    </figure>
  );
}
