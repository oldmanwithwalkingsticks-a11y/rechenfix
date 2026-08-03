/**
 * Grafik: Wie viele Rechenwege für denselben Brennwert zulässig sind.
 * FAO, Food and Nutrition Paper 77 (2003), Kapitel 3.5.5 und 3.8: Codex
 * Alimentarius und die EU schreiben die allgemeinen Faktoren vor; der Code of
 * Federal Regulations der USA lässt fünf verschiedene Verfahren zu.
 *
 * Layout-Entscheidung: Zwei Spalten mit stark unterschiedlicher Zeilenzahl —
 * genau diese Asymmetrie ist die Aussage, deshalb KEINE optische Angleichung.
 *
 * Korrektur nach Sichtprüfung: Die Einträge 3 und 5 liefen rechts aus dem
 * Kasten. Nutzbare Textbreite im Kasten sind 268 px (Kasten 300 px minus 2×16
 * Innenabstand); bei Schriftgrad 11 sind das rund 49 Zeichen. Eintrag 3 hatte
 * 56, Eintrag 5 hatte 53. Beide laufen jetzt zweizeilig; die Kästen sind dafür
 * 40 statt 34 px hoch. Regel für spätere Änderungen: Ein einzeiliger Eintrag
 * darf 49 Zeichen nicht überschreiten, sonst zweite Zeile setzen — NICHT
 * kürzen und NICHT die Schrift verkleinern.
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 * Muster: components/blog/grafik/MehlStreuung.tsx.
 */
const KASTEN_H = 40;
const SCHRITT = 48;

const eu = ['allgemeine Faktoren: 17 / 37 / 17 kJ je Gramm'] as const;

const usa = [
  { z1: '1. spezifische Atwater-Faktoren', z2: '' },
  { z1: '2. allgemeine Faktoren wie im Codex', z2: '' },
  { z1: '3. allgemeine Faktoren, Kohlenhydrate', z2: 'ohne Ballaststoffe' },
  { z1: '4. von der Behörde genehmigte Sonderfaktoren', z2: '' },
  { z1: '5. Bombenkalorimeter, abzüglich', z2: '1,25 kcal je Gramm Eiweiß' },
] as const;

export default function FuenfWege() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 400" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .k-eu { fill: #E6F2EE; stroke: #0F6E56; }
          .k-usa { fill: #FAEEDA; stroke: #854F0B; }
          .t-eu { fill: #0F6E56; }
          .t-usa { fill: #993C1D; }
          .dark .k-eu { fill: #16332B; }
          .dark .k-usa { fill: #3A3222; }
          .dark .t-eu { fill: #5DCAA5; }
          .dark .t-usa { fill: #F0A88C; }
        `}</style>
        <title>Zulässige Rechenwege für den Brennwert in der EU und in den USA</title>
        <desc>
          In der Europäischen Union und im Codex Alimentarius ist genau ein Rechenweg
          vorgeschrieben: die allgemeinen Faktoren mit 17, 37 und 17 Kilojoule je Gramm. In den
          Vereinigten Staaten sind fünf verschiedene Verfahren zulässig, darunter auch die direkte
          Messung im Bombenkalorimeter abzüglich 1,25 Kilokalorien je Gramm Eiweiß.
        </desc>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Ein Lebensmittel, zwei Regelwerke</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">Deshalb verbietet die EU-Kommission, beide Nährwerttabellen nebeneinander abzudrucken.</text>

        <text x="24" y="94" fontSize="13" fontWeight="600" className="t-eu">EU und Codex Alimentarius</text>
        {eu.map((e, i) => (
          <g key={e}>
            <rect className="k-eu" x="24" y={116 + i * SCHRITT} width="300" height={KASTEN_H} rx="6" strokeWidth="1" />
            <text x="40" y={140 + i * SCHRITT} fontSize="12" fill="currentColor">{e}</text>
          </g>
        ))}
        <text x="24" y="196" fontSize="12" fill="#9ca3af">ein vorgeschriebener Weg</text>

        <text x="356" y="94" fontSize="13" fontWeight="600" className="t-usa">Vereinigte Staaten</text>
        {usa.map((u, i) => {
          const y = 116 + i * SCHRITT;
          return (
            <g key={u.z1}>
              <rect className="k-usa" x="356" y={y} width="300" height={KASTEN_H} rx="6" strokeWidth="1" />
              {u.z2 ? (
                <>
                  <text x="372" y={y + 17} fontSize="11" fill="currentColor">{u.z1}</text>
                  <text x="372" y={y + 31} fontSize="11" fill="currentColor">{u.z2}</text>
                </>
              ) : (
                <text x="372" y={y + 24} fontSize="11" fill="currentColor">{u.z1}</text>
              )}
            </g>
          );
        })}
        <text x="356" y="388" fontSize="12" fill="#9ca3af">fünf zulässige Wege, der Hersteller wählt</text>

        <line x1="24" y1="360" x2="324" y2="360" stroke="#d1d5db" strokeWidth="1" />
        <text x="24" y="388" fontSize="12" fill="#9ca3af">975 Kombinationen zählt die FAO insgesamt.</text>
      </svg>
    </figure>
  );
}
