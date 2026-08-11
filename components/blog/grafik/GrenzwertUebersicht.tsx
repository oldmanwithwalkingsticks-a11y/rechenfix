/**
 * Grafik: Die Grenzwerte im Straßenverkehr, sortiert nach Höhe, mit ihrer
 * jeweiligen Rechtsquelle.
 *
 * Die Aussage steckt in der rechten Spalte: Die einzige im Gesetzestext
 * fixierte Promillezahl ist die für die Ordnungswidrigkeit (§ 24a StVG).
 * Alle strafrechtlich bedeutsamen Werte stammen aus der Rechtsprechung;
 * § 316 StGB nennt selbst keine Zahl. Die 1,6 ist keine Sanktions-, sondern
 * eine Eignungsgrenze (§ 13 FeV).
 *
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 */
const grenzen = [
  {
    wert: '0,0 ‰',
    wer: 'Probezeit und unter 21 Jahren',
    folge: 'Ordnungswidrigkeit',
    quelle: '§ 24c StVG — im Gesetz',
    imGesetz: true,
  },
  {
    wert: '0,3 ‰',
    wer: 'mit Ausfallerscheinungen',
    folge: 'Straftat, relative Fahruntüchtigkeit',
    quelle: 'Rechtsprechung',
    imGesetz: false,
  },
  {
    wert: '0,5 ‰',
    wer: 'alle Kraftfahrzeugführer',
    folge: 'Ordnungswidrigkeit',
    quelle: '§ 24a StVG — im Gesetz',
    imGesetz: true,
  },
  {
    wert: '1,1 ‰',
    wer: 'alle Kraftfahrzeugführer',
    folge: 'Straftat, absolute Fahruntüchtigkeit',
    quelle: 'Rechtsprechung',
    imGesetz: false,
  },
  {
    wert: '1,6 ‰',
    wer: 'auch Radfahrende',
    folge: 'Eignungsprüfung, keine Sanktion',
    quelle: '§ 13 FeV',
    imGesetz: true,
  },
] as const;

export default function GrenzwertUebersicht() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 340" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .zeile-gesetz { fill: #E6F2ED; }
          .zeile-recht { fill: #FAEEDA; }
          .m-gesetz { fill: #0F6E56; }
          .m-recht { fill: #854F0B; }
          .dark .zeile-gesetz { fill: #1F3A33; }
          .dark .zeile-recht { fill: #3A3222; }
          .dark .m-gesetz { fill: #5DCAA5; }
          .dark .m-recht { fill: #E8C06A; }
        `}</style>
        <title>Die Promillegrenzen und ihre Rechtsquellen</title>
        <desc>
          Null Promille gelten in der Probezeit und vor Vollendung des 21. Lebensjahres nach
          Paragraf 24c des Straßenverkehrsgesetzes. Ab 0,3 Promille kann mit Ausfallerscheinungen
          relative Fahruntüchtigkeit als Straftat vorliegen; dieser Wert stammt aus der
          Rechtsprechung. Ab 0,5 Promille liegt nach Paragraf 24a des Straßenverkehrsgesetzes eine
          Ordnungswidrigkeit vor. Ab 1,1 Promille gilt absolute Fahruntüchtigkeit als Straftat,
          ebenfalls aus der Rechtsprechung. Ab 1,6 Promille wird nach Paragraf 13 der
          Fahrerlaubnis-Verordnung in der Regel eine medizinisch-psychologische Untersuchung
          angeordnet, auch bei Radfahrenden.
        </desc>

        <text x="24" y="32" fontSize="17" fontWeight="500" fill="currentColor">Fünf Grenzen, zwei Herkünfte</text>
        <text x="24" y="52" fontSize="12" fill="#9ca3af">Die strafrechtlich bedeutsamen Zahlen stehen in keinem Paragrafen</text>

        {grenzen.map((g, i) => (
          <g key={g.wert}>
            <rect className={g.imGesetz ? 'zeile-gesetz' : 'zeile-recht'} x="24" y={76 + i * 44} width="632" height="38" rx="6" />
            <text x="44" y={101 + i * 44} fontSize="16" fontWeight="600" fill="currentColor">{g.wert}</text>
            <text x="120" y={95 + i * 44} fontSize="12" fill="currentColor">{g.wer}</text>
            <text x="120" y={109 + i * 44} fontSize="11" fill="#9ca3af">{g.folge}</text>
            <text x="636" y={101 + i * 44} fontSize="12" fontWeight="600" textAnchor="end" className={g.imGesetz ? 'm-gesetz' : 'm-recht'}>
              {g.quelle}
            </text>
          </g>
        ))}

        <line x1="24" y1="308" x2="656" y2="308" stroke="#d1d5db" strokeWidth="1" />
        <text x="24" y="330" fontSize="12" fill="#9ca3af">
          § 316 StGB nennt selbst keine Promillezahl — er verlangt nur, dass jemand nicht sicher fahren kann.
        </text>
      </svg>
      <figcaption className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Die 1,6 fällt aus der Reihe: Sie bestraft nichts, sondern löst eine Eignungsprüfung aus —
        und sie ist die einzige Zahl der Liste, die auch für Radfahrende gilt.
      </figcaption>
    </figure>
  );
}
