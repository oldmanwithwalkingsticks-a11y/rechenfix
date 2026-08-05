/**
 * Grafik: Zeitleiste der Zeitvereinheitlichung, 1883 bis 2027.
 * Server-Komponente, statisch. Der letzte Punkt ist Zukunft und deshalb
 * farblich abgesetzt sowie mit gestrichelter Linie angebunden.
 *
 * Layout-Rechnung: unterste Inhaltskante sind die Beschriftungen unter der
 * Achse bei y=232 (dreizeilig maximal). Fußzeile auf y=290, viewBox-Höhe 310
 * → 58 px Abstand zur letzten Beschriftungszeile, 20 px Rand unten.
 * Zielpfad: components/blog/grafik/ZeitleisteEinheitszeit.tsx
 */
export default function ZeitleisteEinheitszeit() {
  return (
    <figure className="my-8">
      <svg
        width="100%"
        viewBox="0 0 680 310"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        className="rounded-xl text-gray-900 dark:text-gray-100"
      >
        <title>Zeitleiste der Zeitvereinheitlichung von 1883 bis 2027</title>
        <desc>
          1883 teilte die amerikanische Railway Time Convention das nordamerikanische
          Bahnnetz in Stundenzonen. 1884 legte die Washingtoner Konferenz den Meridian von
          Greenwich als Nullmeridian fest. 1890 beschloss der Verein Deutscher
          Eisenbahnverwaltungen die Zonenzeit für den inneren Dienst. 1893 wurde die
          Mitteleuropäische Zeit gesetzliche Zeit im Deutschen Reich. 1972 begann die
          Koordinierte Weltzeit mit Schaltsekunden. 2016 wurde die bislang letzte
          Schaltsekunde eingefügt. Ab dem 20. Mai 2027 soll UTC ohne Schaltsekunden
          durchlaufen.
        </desc>

        <style>{`
          .t-blau { fill: #185FA5; }
          .dark .t-blau { fill: #85B7EB; }
        `}</style>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">
          Von der Bahnuhr zur Atomuhr
        </text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">
          Sieben Schritte in 144 Jahren — der letzte steht noch zur Abstimmung.
        </text>

        {/* Achse */}
        <line x1="52" y1="140" x2="562" y2="140" stroke="#d1d5db" strokeWidth="1.5" />
        <line x1="562" y1="140" x2="640" y2="140" stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="6 5" />

        {/* 1883 */}
        <circle cx="62" cy="140" r="5" fill="#185FA5" />
        <text x="62" y="120" fontSize="14" fontWeight="500" fill="currentColor" textAnchor="middle">1883</text>
        <text x="62" y="168" fontSize="12" fill="#9ca3af" textAnchor="middle">USA:</text>
        <text x="62" y="184" fontSize="12" fill="#9ca3af" textAnchor="middle">aus 75</text>
        <text x="62" y="200" fontSize="12" fill="#9ca3af" textAnchor="middle">Bahnzeiten</text>
        <text x="62" y="216" fontSize="12" fill="#9ca3af" textAnchor="middle">werden 5</text>

        {/* 1884 */}
        <circle cx="152" cy="140" r="5" fill="#185FA5" />
        <text x="152" y="120" fontSize="14" fontWeight="500" fill="currentColor" textAnchor="middle">1884</text>
        <text x="152" y="168" fontSize="12" fill="#9ca3af" textAnchor="middle">Washington:</text>
        <text x="152" y="184" fontSize="12" fill="#9ca3af" textAnchor="middle">Greenwich</text>
        <text x="152" y="200" fontSize="12" fill="#9ca3af" textAnchor="middle">wird der</text>
        <text x="152" y="216" fontSize="12" fill="#9ca3af" textAnchor="middle">Nullmeridian</text>

        {/* 1890 */}
        <circle cx="242" cy="140" r="5" fill="#185FA5" />
        <text x="242" y="120" fontSize="14" fontWeight="500" fill="currentColor" textAnchor="middle">1890</text>
        <text x="242" y="168" fontSize="12" fill="#9ca3af" textAnchor="middle">Zonenzeit</text>
        <text x="242" y="184" fontSize="12" fill="#9ca3af" textAnchor="middle">im inneren</text>
        <text x="242" y="200" fontSize="12" fill="#9ca3af" textAnchor="middle">Bahndienst</text>

        {/* 1893 */}
        <circle cx="332" cy="140" r="6" fill="#0C447C" />
        <text x="332" y="120" fontSize="14" fontWeight="500" fill="currentColor" textAnchor="middle">1893</text>
        <text x="332" y="168" fontSize="12" className="t-blau" textAnchor="middle">MEZ wird</text>
        <text x="332" y="184" fontSize="12" className="t-blau" textAnchor="middle">gesetzliche</text>
        <text x="332" y="200" fontSize="12" className="t-blau" textAnchor="middle">Zeit in</text>
        <text x="332" y="216" fontSize="12" className="t-blau" textAnchor="middle">Deutschland</text>

        {/* 1972 */}
        <circle cx="422" cy="140" r="5" fill="#185FA5" />
        <text x="422" y="120" fontSize="14" fontWeight="500" fill="currentColor" textAnchor="middle">1972</text>
        <text x="422" y="168" fontSize="12" fill="#9ca3af" textAnchor="middle">UTC startet,</text>
        <text x="422" y="184" fontSize="12" fill="#9ca3af" textAnchor="middle">Schalt-</text>
        <text x="422" y="200" fontSize="12" fill="#9ca3af" textAnchor="middle">sekunden</text>
        <text x="422" y="216" fontSize="12" fill="#9ca3af" textAnchor="middle">gleichen aus</text>

        {/* 2016 */}
        <circle cx="512" cy="140" r="5" fill="#185FA5" />
        <text x="512" y="120" fontSize="14" fontWeight="500" fill="currentColor" textAnchor="middle">2016</text>
        <text x="512" y="168" fontSize="12" fill="#9ca3af" textAnchor="middle">die bislang</text>
        <text x="512" y="184" fontSize="12" fill="#9ca3af" textAnchor="middle">letzte</text>
        <text x="512" y="200" fontSize="12" fill="#9ca3af" textAnchor="middle">Schaltsekunde</text>

        {/* 2027 — Zukunft */}
        <circle cx="620" cy="140" r="6" fill="#1D9E75" />
        <text x="620" y="120" fontSize="14" fontWeight="500" fill="currentColor" textAnchor="middle">2027</text>
        <text x="620" y="168" fontSize="12" fill="#9ca3af" textAnchor="middle">UTC läuft</text>
        <text x="620" y="184" fontSize="12" fill="#9ca3af" textAnchor="middle">durch —</text>
        <text x="620" y="200" fontSize="12" fill="#9ca3af" textAnchor="middle">geplant zum</text>
        <text x="620" y="216" fontSize="12" fill="#9ca3af" textAnchor="middle">20. Mai</text>

        <text x="24" y="264" fontSize="12" fill="#9ca3af">
          Die Zonenzeit war bei den Bahnen bereits eingeführt, bevor das Gesetz von 1893 sie auf das
        </text>
        <text x="24" y="280" fontSize="12" fill="#9ca3af">
          übrige Leben ausdehnte.
        </text>
        <text x="24" y="300" fontSize="12" fill="#9ca3af">
          Der Schritt von 2027 wird vom 13. bis 15. Oktober 2026 in Versailles zur Abstimmung gestellt.
        </text>
      </svg>
    </figure>
  );
}
