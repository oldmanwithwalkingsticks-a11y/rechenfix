/**
 * Grafik: Die Faustregel „mal zwei“ ergibt einen um 2,3 Prozent zu hohen
 * D-Mark-Betrag. Deutsche Bundesbank, Monatsbericht Januar 2004.
 *
 * Layout-Entscheidung: Jede Zeile ist auf ihren eigenen Höchstwert normiert
 * (der „mal zwei“-Balken füllt immer die volle Breite). Dadurch ist die Lücke
 * in allen drei Zeilen gleich groß — genau das ist die Aussage: der relative
 * Fehler bleibt derselbe, nur der absolute Betrag wächst. Eine gemeinsame
 * Skala über alle drei Zeilen würde die ersten beiden auf wenige Pixel
 * zusammenschrumpfen und die Lücke unsichtbar machen.
 *
 * Korrektur nach Sichtprüfung Welle 47: Bei Zeilenabstand 88 lag der
 * Differenztext der dritten Zeile bei y=338 und damit genau auf der Legende.
 * Zeilenabstand jetzt 84, Differenztext bei y+64, Legende bei y=352, Trennlinie
 * bei y=378, viewBox 410 hoch. Regel für spätere Änderungen:
 * 92 + 2 * ABSTAND + 64 muss deutlich kleiner bleiben als die Legenden-y.
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 * Muster: components/blog/grafik/MehlStreuung.tsx.
 */
const BALKEN_X = 132;
const BALKEN_MAX = 384;
const ABSTAND = 84;
const ANTEIL_KORREKT = 1 / 1.022583762392437;

const zeilen = [
  { euro: '5 €', korrekt: '9,78 DM', falsch: '10,00 DM', diff: '0,22 DM zu viel' },
  { euro: '100 €', korrekt: '195,58 DM', falsch: '200,00 DM', diff: '4,42 DM zu viel' },
  { euro: '1.000 €', korrekt: '1.955,83 DM', falsch: '2.000,00 DM', diff: '44,17 DM zu viel' },
] as const;

export default function MalZweiFalle() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 410" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .b-korrekt { fill: #0F6E56; }
          .b-falsch { fill: #993C1D; }
          .t-falsch { fill: #993C1D; }
          .dark .b-korrekt { fill: #5DCAA5; }
          .dark .b-falsch { fill: #F0A88C; }
          .dark .t-falsch { fill: #F0A88C; }
        `}</style>
        <title>Umrechnung mit dem echten Kurs gegen die Faustregel mal zwei</title>
        <desc>
          Fünf Euro sind 9,78 D-Mark, nicht 10. Hundert Euro sind 195,58 D-Mark, nicht 200.
          Tausend Euro sind 1.955,83 D-Mark, nicht 2.000. Wer Euro-Beträge im Kopf verdoppelt,
          erhält immer einen um 2,3 Prozent zu hohen D-Mark-Betrag.
        </desc>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Was „mal zwei“ im Kopf anrichtet</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">Der echte Kurs lautet 1,95583 — nicht 2.</text>

        {zeilen.map((z, i) => {
          const y = 92 + i * ABSTAND;
          return (
            <g key={z.euro}>
              <text x="24" y={y + 26} fontSize="16" fontWeight="600" fill="currentColor">{z.euro}</text>

              <rect className="b-korrekt" x={BALKEN_X} y={y} width={BALKEN_MAX * ANTEIL_KORREKT} height="20" rx="3" />
              <text x={BALKEN_X + BALKEN_MAX + 12} y={y + 15} fontSize="12" fill="#9ca3af">{z.korrekt}</text>

              <rect className="b-falsch" x={BALKEN_X} y={y + 28} width={BALKEN_MAX} height="20" rx="3" />
              <text x={BALKEN_X + BALKEN_MAX + 12} y={y + 43} fontSize="12" className="t-falsch" fontWeight="600">{z.falsch}</text>

              <text x={BALKEN_X} y={y + 64} fontSize="11" fill="#9ca3af">{z.diff}</text>
            </g>
          );
        })}

        <g>
          <rect x="24" y="352" width="14" height="10" rx="2" className="b-korrekt" />
          <text x="46" y="361" fontSize="12" fill="#9ca3af">korrekt geteilt durch 1,95583</text>
          <rect x="270" y="352" width="14" height="10" rx="2" className="b-falsch" />
          <text x="292" y="361" fontSize="12" fill="#9ca3af">Kopfrechnung mal zwei</text>
        </g>

        <line x1="24" y1="378" x2="656" y2="378" stroke="#d1d5db" strokeWidth="1" />
        <text x="24" y="396" fontSize="12" fill="#9ca3af">Immer 2,3 Prozent zu hoch — bei jedem Preisvergleich, über Jahre hinweg.</text>
      </svg>
    </figure>
  );
}
