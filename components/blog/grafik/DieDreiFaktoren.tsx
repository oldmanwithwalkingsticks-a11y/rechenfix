/**
 * Grafik: Die Atwater-Faktoren und ihre Rundung.
 * FAO, Food and Nutrition Paper 77 (2003), Kapitel 3.5.1: Die präzisen Werte
 * lauten 16,7 kJ/g Protein, 37,4 Fett, 16,7 Kohlenhydrate, 28,9 Alkohol.
 * Daraus wurden die gerundeten 17, 37, 17 und 29.
 *
 * Layout-Entscheidung: Balken nach kcal/g skaliert, weil das die im Alltag
 * bekannte Größe ist. Der präzise kJ-Wert steht klein unter dem gerundeten —
 * die Rundung ist die Aussage, nicht der Größenvergleich. Alle Beschriftungen
 * stehen RECHTS neben dem Balken, nicht darin: weiße Schrift auf dem Balken
 * wäre im Dark Mode auf hellem Grün unlesbar.
 * Geometrie: letzte Zeile endet bei y = 88 + 3*62 + 40 = 314, Trennlinie bei
 * y=340. Regel: 88 + (n-1)*62 + 40 muss unter der Trennlinie bleiben.
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 * Muster: components/blog/grafik/MehlStreuung.tsx.
 */
const BALKEN_X = 176;
const PRO_KCAL = 40;

const naehrstoffe = [
  { name: 'Fett', kcal: 9, gerundet: '37 kJ/g', praezise: 'genau 37,4' },
  { name: 'Alkohol', kcal: 7, gerundet: '29 kJ/g', praezise: 'genau 28,9' },
  { name: 'Kohlenhydrate', kcal: 4, gerundet: '17 kJ/g', praezise: 'genau 16,7' },
  { name: 'Eiweiß', kcal: 4, gerundet: '17 kJ/g', praezise: 'genau 16,7' },
] as const;

export default function DieDreiFaktoren() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 370" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .b-haupt { fill: #0F6E56; }
          .dark .b-haupt { fill: #5DCAA5; }
        `}</style>
        <title>Die Atwater-Faktoren je Gramm Nährstoff</title>
        <desc>
          Ein Gramm Fett liefert nach den Atwater-Faktoren 9 Kilokalorien, ein Gramm Alkohol 7,
          ein Gramm Kohlenhydrate und ein Gramm Eiweiß je 4. In Kilojoule lauten die gerundeten
          Werte 37, 29, 17 und 17; die präzisen Ausgangswerte sind 37,4, 28,9, 16,7 und 16,7.
        </desc>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Was ein Gramm liefert — und wie viel davon gerundet ist</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">Die Faktoren stammen aus Verbrennungsversuchen von Wilbur Atwater, um 1900.</text>

        {naehrstoffe.map((n, i) => {
          const y = 88 + i * 62;
          return (
            <g key={n.name}>
              <text x="24" y={y + 20} fontSize="14" fill="currentColor">{n.name}</text>
              <rect className="b-haupt" x={BALKEN_X} y={y} width={n.kcal * PRO_KCAL} height="26" rx="3" />
              <text x={BALKEN_X + n.kcal * PRO_KCAL + 14} y={y + 12} fontSize="15" fontWeight="600" fill="currentColor">{n.kcal} kcal</text>
              <text x={BALKEN_X + n.kcal * PRO_KCAL + 14} y={y + 28} fontSize="11" fill="#9ca3af">{n.gerundet} · {n.praezise}</text>
            </g>
          );
        })}

        <line x1="24" y1="340" x2="656" y2="340" stroke="#d1d5db" strokeWidth="1" />
        <text x="24" y="358" fontSize="12" fill="#9ca3af">Ballaststoffe zählen mit 2 kcal je Gramm, weil rund 70 Prozent von ihnen im Dickdarm vergoren werden.</text>
      </svg>
    </figure>
  );
}
