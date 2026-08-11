/**
 * Grafik: Der Grenzwert der absoluten Fahruntüchtigkeit als Summe aus
 * Grundwert und Sicherheitszuschlag.
 *
 * 1966: 1,0 Grundwert + 0,3 Zuschlag = 1,3 Promille.
 * 1990: 1,0 Grundwert + 0,1 Zuschlag = 1,1 Promille (BGH, 28.06.1990,
 * 4 StR 297/90).
 *
 * Der Zuschlag von 1966 entstand aus einer Standardabweichung der
 * Alkoholbestimmung von 0,05 Promille, die auf das Dreifache aufgerundet
 * wurde. Der Grundwert blieb 1990 unverändert — verändert hat sich allein die
 * Messgenauigkeit.
 *
 * Gestapelte Balken statt zweier Zahlen, weil die Aussage in der Zerlegung
 * liegt: Der untere Teil beschreibt den Menschen, der obere das Labor.
 *
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 */
/**
 * Maßstab bewusst auf 120 px je Promille gesetzt: Bei 150 stieß der Balken von
 * 1966 (1,3 ‰) in die Unterzeile der Überschrift, und die Summenbeschriftung
 * darüber überlagerte den Titel. Höchster Balken endet jetzt bei y = 110,
 * die Summe darüber bei y = 96 — mit Abstand unter der Unterzeile bei y = 52.
 */
const PX_PRO_PROMILLE = 120;
const BASIS = 266;

export default function GrenzwertZeitachse() {
  const jahre = [
    { jahr: '1966', grund: 1.0, zuschlag: 0.3, summe: '1,3 ‰', x: 170 },
    { jahr: '1990', grund: 1.0, zuschlag: 0.1, summe: '1,1 ‰', x: 430 },
  ];

  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 400" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .grund { fill: #0F6E56; fill-opacity: 0.85; }
          .zuschlag { fill: #B4791A; fill-opacity: 0.85; }
          .t-grund { fill: #0F6E56; }
          .t-zuschlag { fill: #854F0B; }
          .auf-balken { fill: #FFFFFF; }
          .dark .grund { fill: #5DCAA5; fill-opacity: 0.9; }
          .dark .zuschlag { fill: #E8C06A; fill-opacity: 0.9; }
          .dark .t-grund { fill: #5DCAA5; }
          .dark .t-zuschlag { fill: #E8C06A; }
          .dark .auf-balken { fill: #0B2E26; }
        `}</style>
        <title>Der Grenzwert als Summe aus Grundwert und Sicherheitszuschlag</title>
        <desc>
          1966 setzte sich der Grenzwert der absoluten Fahruntüchtigkeit von 1,3 Promille aus einem
          Grundwert von 1,0 Promille und einem Sicherheitszuschlag von 0,3 Promille zusammen. 1990
          senkte der Bundesgerichtshof den Grenzwert auf 1,1 Promille. Der Grundwert blieb bei 1,0
          Promille, der Zuschlag sank auf 0,1 Promille, weil die Alkoholbestimmung im Labor
          genauer geworden war.
        </desc>

        <text x="24" y="32" fontSize="17" fontWeight="500" fill="currentColor">Woraus die Grenze besteht</text>
        <text x="24" y="52" fontSize="12" fill="#9ca3af">Der untere Teil beschreibt den Menschen, der obere die Messgenauigkeit</text>

        <line x1="60" y1={BASIS} x2="620" y2={BASIS} stroke="#9ca3af" strokeWidth="1" />

        {jahre.map((j) => {
          const hGrund = j.grund * PX_PRO_PROMILLE;
          const hZuschlag = j.zuschlag * PX_PRO_PROMILLE;
          return (
            <g key={j.jahr}>
              <rect className="grund" x={j.x} y={BASIS - hGrund} width="110" height={hGrund} rx="3" />
              <rect className="zuschlag" x={j.x} y={BASIS - hGrund - hZuschlag} width="110" height={hZuschlag} rx="3" />
              <text x={j.x + 55} y={BASIS - hGrund / 2 + 5} fontSize="13" fontWeight="600" textAnchor="middle" className="auf-balken">1,0 ‰</text>
              <text x={j.x + 124} y={BASIS - hGrund - hZuschlag / 2 + 4} fontSize="12" className="t-zuschlag">
                + {j.zuschlag.toLocaleString('de-DE', { minimumFractionDigits: 1 })} ‰ Zuschlag
              </text>
              <text x={j.x + 55} y={BASIS - hGrund - hZuschlag - 14} fontSize="20" fontWeight="600" textAnchor="middle" fill="currentColor">{j.summe}</text>
              <text x={j.x + 55} y={BASIS + 24} fontSize="15" fontWeight="600" textAnchor="middle" fill="currentColor">{j.jahr}</text>
            </g>
          );
        })}

        <text x="225" y={BASIS + 44} fontSize="11" textAnchor="middle" fill="#9ca3af">Standardabweichung 0,05 ‰,</text>
        <text x="225" y={BASIS + 60} fontSize="11" textAnchor="middle" fill="#9ca3af">aufgerundet auf das Dreifache</text>
        <text x="485" y={BASIS + 44} fontSize="11" textAnchor="middle" fill="#9ca3af">BGH, 28. Juni 1990,</text>
        <text x="485" y={BASIS + 60} fontSize="11" textAnchor="middle" fill="#9ca3af">4 StR 297/90</text>

        <line x1="24" y1={BASIS + 78} x2="656" y2={BASIS + 78} stroke="#d1d5db" strokeWidth="1" />
        <text x="24" y={BASIS + 100} fontSize="12" fill="#9ca3af">
          Der Mensch von 1990 vertrug nicht weniger als der von 1966. Besser geworden waren die Labore.
        </text>
      </svg>
      <figcaption className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Einwendungen gegen den Grundwert von 1,0 Promille wurden aus
        medizinisch-naturwissenschaftlichen Fachkreisen nie erhoben. Gesunken ist allein der Teil,
        der die Unsicherheit der Analyse abdeckt.
      </figcaption>
    </figure>
  );
}
