/**
 * Grafik: Welcher Tarif in welcher Steuerklasse angewendet wird — § 39b Abs. 2
 * Satz 6 und 7 EStG.
 *
 * Satz 6: "Für den zu versteuernden Jahresbetrag ist die Jahreslohnsteuer in den
 * Steuerklassen I, II und IV nach § 32a Absatz 1 sowie in der Steuerklasse III
 * nach § 32a Absatz 5 zu berechnen."
 * Satz 7: "In den Steuerklassen V und VI ist die Jahreslohnsteuer zu berechnen,
 * die sich aus dem Zweifachen des Unterschiedsbetrags zwischen dem Steuerbetrag
 * für das Eineinviertelfache und dem Steuerbetrag für das Dreiviertelfache des
 * zu versteuernden Jahresbetrags nach § 32a Absatz 1 ergibt; die Jahreslohnsteuer
 * beträgt jedoch mindestens 14 Prozent des zu versteuernden Jahresbetrags."
 *
 * Layout-Entscheidung: BEWUSST OHNE EURO-BETRÄGE. Die Aussage ist eine
 * Zuordnung von Klassen zu Rechenvorschriften, keine Größenrelation — Zahlen
 * würden suggerieren, es ginge um Beträge, und der Punkt wäre verfehlt. Die
 * Beträge stehen in der Folgegrafik.
 *
 * Ebenfalls bewusst NICHT im Bild: die Euro-Schwellen aus Satz 7 (42-/45-Prozent-
 * Stufen). Sie wandern mit den Tarifeckwerten und standen bei der Recherche in
 * vier verschiedenen Fassungen in den Quellen. Die 14-Prozent-Untergrenze ist
 * fassungsübergreifend identisch und trägt die Aussage allein.
 *
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 * Muster: components/blog/grafik/ZehnProzentZeitachse.tsx.
 */
const spalten = [
  {
    id: 'grund',
    klassen: 'I · II · IV',
    norm: '§ 32a Abs. 1 EStG',
    name: 'Grundtarif',
    erklaerung: ['Der normale Tarif. Genau der,', 'den auch ein Lediger zahlt.'],
    ton: 'neutral',
    x: 128,
  },
  {
    id: 'splitting',
    klassen: 'III',
    norm: '§ 32a Abs. 5 EStG',
    name: 'Splittingverfahren',
    erklaerung: ['Der Tarif eines Ehepaars —', 'auf ein einzelnes Gehalt.'],
    ton: 'gut',
    x: 340,
  },
  {
    id: 'differenz',
    klassen: 'V · VI',
    norm: '§ 39b Abs. 2 S. 7 EStG',
    name: 'Differenzformel',
    erklaerung: ['Eigene Formel, mindestens 14 %', '— ohne Grundfreibetrag.'],
    ton: 'hart',
    x: 552,
  },
] as const;

export default function DreiTarifeSechsKlassen() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 440" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .t-neutral { fill: #185FA5; }
          .t-gut { fill: #0F6E56; }
          .t-hart { fill: #993C1D; }
          .k-neutral { fill: #E8F0F9; stroke: #0C447C; }
          .k-gut { fill: #E6F2ED; stroke: #0F6E56; }
          .k-hart { fill: #FAEEDA; stroke: #854F0B; }
          .dark .t-neutral { fill: #85B7EB; }
          .dark .t-gut { fill: #5DCAA5; }
          .dark .t-hart { fill: #F0A88C; }
          .dark .k-neutral { fill: #16283C; }
          .dark .k-gut { fill: #1F3A33; }
          .dark .k-hart { fill: #3A3222; }
        `}</style>
        <title>Welcher Steuertarif in welcher Lohnsteuerklasse angewendet wird</title>
        <desc>
          Nach Paragraf 39b Absatz 2 Satz 6 des Einkommensteuergesetzes wird die Jahreslohnsteuer
          in den Steuerklassen eins, zwei und vier nach dem Grundtarif des Paragrafen 32a Absatz 1
          berechnet — also nach demselben Tarif wie bei einem Ledigen. In der Steuerklasse drei
          wird dagegen nach Paragraf 32a Absatz 5 gerechnet, dem Splittingverfahren für Ehepaare,
          angewendet auf ein einzelnes Gehalt. Für die Steuerklassen fünf und sechs gilt nach Satz 7
          eine eigene Differenzformel: das Zweifache des Unterschiedsbetrags zwischen dem
          Steuerbetrag für das Eineinviertelfache und dem für das Dreiviertelfache des zu
          versteuernden Jahresbetrags, mindestens jedoch vierzehn Prozent. Der Grundfreibetrag ist
          in Klasse fünf nicht enthalten; er sitzt vollständig in Klasse drei.
        </desc>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Sechs Klassen, drei Rechenwege</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">Was die Steuerklasse tatsächlich steuert — § 39b Abs. 2 Satz 6 und 7 EStG</text>

        <text x="24" y="98" fontSize="12" fill="#9ca3af">Steuerklasse</text>
        <line x1="24" y1="110" x2="656" y2="110" stroke="#d1d5db" strokeWidth="1" />

        {spalten.map((sp) => {
          const tk = sp.ton === 'gut' ? 't-gut' : sp.ton === 'hart' ? 't-hart' : 't-neutral';
          const kk = sp.ton === 'gut' ? 'k-gut' : sp.ton === 'hart' ? 'k-hart' : 'k-neutral';
          return (
            <g key={sp.id}>
              <text x={sp.x} y="148" fontSize="22" fontWeight="600" textAnchor="middle" className={tk}>{sp.klassen}</text>

              <line x1={sp.x} y1="166" x2={sp.x} y2="200" stroke="#d1d5db" strokeWidth="2" />
              <circle cx={sp.x} cy="200" r="5" className={tk} />

              <rect className={kk} x={sp.x - 96} y="216" width="192" height="126" rx="8" strokeWidth="1" />
              <text x={sp.x} y="244" fontSize="11" textAnchor="middle" fill="#9ca3af">wird berechnet nach</text>
              <text x={sp.x} y="268" fontSize="13" fontWeight="600" textAnchor="middle" fill="currentColor">{sp.norm}</text>
              <text x={sp.x} y="292" fontSize="14" fontWeight="600" textAnchor="middle" className={tk}>{sp.name}</text>
              {sp.erklaerung.map((zeile, zi) => (
                <text key={zeile} x={sp.x} y={314 + zi * 15} fontSize="11" textAnchor="middle" fill="#9ca3af">{zeile}</text>
              ))}
            </g>
          );
        })}

        <line x1="24" y1="378" x2="656" y2="378" stroke="#d1d5db" strokeWidth="1" />
        <text x="24" y="402" fontSize="12" fill="#9ca3af">
          Klasse III wendet den Splittingtarif eines Paares auf ein einzelnes Gehalt an — deshalb
          bleibt dort so viel übrig.
        </text>
        <text x="24" y="422" fontSize="12" fill="#9ca3af">
          Klasse V trägt die Gegenrechnung. Am Jahresende verteilt § 32a Abs. 5 EStG den Vorteil
          ohnehin neu.
        </text>
      </svg>
      <figcaption className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Die Steuerklasse entscheidet nicht über die Höhe der Steuer, sondern darüber, nach welcher
        Formel der Arbeitgeber die monatliche Vorauszahlung schätzt. Drei Formeln, sechs Klassen —
        und eine Jahressteuer, in der keine davon mehr vorkommt.
      </figcaption>
    </figure>
  );
}
