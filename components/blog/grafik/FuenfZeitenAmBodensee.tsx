/**
 * Grafik: Fünf Anrainerstaaten, fünf Uhrzeiten — der Bodensee um 1880.
 * Server-Komponente, statisch. Die Zeitangaben sind aus den Längengraden der
 * jeweiligen Bezugsstadt errechnet (1° = 4 Minuten), Bezugspunkt ist die
 * Berner Zeit als westlichste. Quelle für die fünf Bezugszeiten selbst:
 * Deutsches Uhrenmuseum Furtwangen.
 * Zielpfad: components/blog/grafik/FuenfZeitenAmBodensee.tsx
 */
export default function FuenfZeitenAmBodensee() {
  return (
    <figure className="my-8">
      <svg
        width="100%"
        viewBox="0 0 680 330"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        className="rounded-xl text-gray-900 dark:text-gray-100"
      >
        <title>Fünf Uhrzeiten rund um den Bodensee um 1880</title>
        <desc>
          Um 1880 galt am Bodensee im Großherzogtum Baden die Karlsruher Zeit, im
          Königreich Württemberg die Stuttgarter, im Königreich Bayern die Münchner, im
          westlichen Österreich-Ungarn die Wiener und in der Schweiz die Berner Zeit.
          Zwischen der westlichsten und der östlichsten dieser Zeiten lagen rund
          sechsunddreißig Minuten. Wer den See umrundete, stellte die Uhr viermal.
        </desc>

        <style>{`
          .b-beige { fill: #FAEEDA; }
          .t-braun { fill: #854F0B; }
          .dark .b-beige { fill: #3A3222; }
          .dark .t-braun { fill: #FAC775; }
        `}</style>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">
          Ein See, fünf Uhrzeiten
        </text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">
          Die Anrainer des Bodensees um 1880 — jeder Staat richtete sich nach seiner Hauptstadt.
        </text>

        {/* Zeitachse */}
        <line x1="120" y1="250" x2="600" y2="250" stroke="#d1d5db" strokeWidth="1.5" />
        <text x="120" y="272" fontSize="11" fill="#9ca3af" textAnchor="middle">früher</text>
        <text x="600" y="272" fontSize="11" fill="#9ca3af" textAnchor="middle">später</text>

        {/* Bern — westlichste, Nullpunkt */}
        <circle cx="130" cy="250" r="5" className="t-braun" />
        <line x1="130" y1="250" x2="130" y2="212" stroke="#d1d5db" strokeWidth="1" />
        <text x="130" y="204" fontSize="13" fontWeight="500" fill="currentColor" textAnchor="middle">Schweiz</text>
        <text x="130" y="188" fontSize="12" fill="#9ca3af" textAnchor="middle">Berner Zeit</text>
        <text x="130" y="172" fontSize="12" className="t-braun" textAnchor="middle">12:00</text>

        {/* Karlsruhe +3,8 min */}
        <circle cx="181" cy="250" r="5" className="t-braun" />
        <line x1="181" y1="250" x2="181" y2="146" stroke="#d1d5db" strokeWidth="1" />
        <text x="181" y="138" fontSize="13" fontWeight="500" fill="currentColor" textAnchor="middle">Baden</text>
        <text x="181" y="122" fontSize="12" fill="#9ca3af" textAnchor="middle">Karlsruher Zeit</text>
        <text x="181" y="106" fontSize="12" className="t-braun" textAnchor="middle">12:04</text>

        {/* Stuttgart +6,9 min */}
        <circle cx="223" cy="250" r="5" className="t-braun" />
        <line x1="223" y1="250" x2="223" y2="212" stroke="#d1d5db" strokeWidth="1" />
        <text x="238" y="204" fontSize="13" fontWeight="500" fill="currentColor">Württemberg</text>
        <text x="238" y="188" fontSize="12" fill="#9ca3af">Stuttgarter Zeit</text>
        <text x="238" y="172" fontSize="12" className="t-braun">12:07</text>

        {/* München +16,5 min */}
        <circle cx="352" cy="250" r="5" className="t-braun" />
        <line x1="352" y1="250" x2="352" y2="146" stroke="#d1d5db" strokeWidth="1" />
        <text x="352" y="138" fontSize="13" fontWeight="500" fill="currentColor" textAnchor="middle">Bayern</text>
        <text x="352" y="122" fontSize="12" fill="#9ca3af" textAnchor="middle">Münchner Zeit</text>
        <text x="352" y="106" fontSize="12" className="t-braun" textAnchor="middle">12:16</text>

        {/* Wien +35,7 min */}
        <circle cx="592" cy="250" r="5" className="t-braun" />
        <line x1="592" y1="250" x2="592" y2="212" stroke="#d1d5db" strokeWidth="1" />
        <text x="592" y="204" fontSize="13" fontWeight="500" fill="currentColor" textAnchor="middle">Österreich-Ungarn</text>
        <text x="592" y="188" fontSize="12" fill="#9ca3af" textAnchor="middle">Wiener Zeit</text>
        <text x="592" y="172" fontSize="12" className="t-braun" textAnchor="middle">12:36</text>

        {/* Spannweite */}
        <rect className="b-beige" x="130" y="292" width="462" height="20" stroke="#854F0B" strokeWidth="1" rx="4" />
        <text x="361" y="306" fontSize="12" className="t-braun" textAnchor="middle">
          36 Minuten Unterschied rund um einen See
        </text>
      </svg>
    </figure>
  );
}
