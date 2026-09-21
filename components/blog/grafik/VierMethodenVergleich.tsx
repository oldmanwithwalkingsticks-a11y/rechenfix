/**
 * VierMethodenVergleich — Blogartikel 19 (Bankjahr)
 *
 * Stellt die vier gebräuchlichen Tagezählmethoden nebeneinander: gleicher
 * Zinssatz, gleiches Kapital, vier Beträge. Nur act/360 weicht im Normaljahr ab,
 * im Schaltjahr weichen act/360 und act/365 ab.
 *
 * Zahlen maschinell nachgerechnet (12.09.2026, /tmp/zinsmethoden.mjs, ohne
 * Rückgriff auf lib/berechnungen):
 *   10.000 EUR, 3,0 % p. a.
 *   Normaljahr 01.01.2025–01.01.2026 (365 Kalendertage):
 *     30/360 = 300,00 | act/365 = 300,00 | act/act = 300,00 | act/360 = 304,17
 *   Schaltjahr 01.01.2024–01.01.2025 (366 Kalendertage):
 *     30/360 = 300,00 | act/365 = 300,82 | act/act = 300,00 | act/360 = 305,00
 *
 * Geometrie (Breitenmodell 0,55 x fontSize):
 *   Spalte 1 x = 24..236: längster Text „Eurozinsmethode (act/360)“ = 25 Zeichen
 *   bei Größe 12 = 165,0 px, endet bei 189,0 px — 47 px Luft zur nächsten Spalte.
 *   Spalten 2/3 (Zahlen, Größe 12, linksbündig) x = 236 und x = 330.
 *   Spalten 4/5 (Beträge) x = 424 und x = 552; breitester Eintrag „304,17 €“
 *   = 8 Zeichen = 52,8 px, endet bei 604,8 px — innerhalb viewBox 700 minus 20.
 *   Kopf: Titel y = 32, Untertitel y = 52, Spaltenköpfe y = 86, Trennlinie y = 96.
 *   Zeilen y = 122 / 154 / 186 / 218, Trennlinie y = 236, Fußtext y = 258/276.
 *   Letzte Grundlinie y = 276, viewBox-Höhe 296.
 */
export default function VierMethodenVergleich() {
  return (
    <figure className="my-8">
      <svg
        width="100%"
        viewBox="0 0 700 296"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        className="rounded-xl text-gray-900 dark:text-gray-100"
      >
        <title>Zinsertrag nach vier Tagezählmethoden bei gleichem Zinssatz</title>
        <desc>
          10.000 Euro zu 3,0 Prozent pro Jahr. Die deutsche Methode 30/360 rechnet mit 360
          Zinstagen auf 360 Tagen Jahresbasis und ergibt in beiden Jahren 300,00 Euro. Die
          englische Methode act/365 ergibt 300,00 Euro im Normaljahr und 300,82 Euro im
          Schaltjahr. Act/act ergibt in beiden Fällen 300,00 Euro. Die Eurozinsmethode act/360
          zählt tatsächliche Tage auf 360 Tagen Basis und ergibt 304,17 Euro im Normaljahr und
          305,00 Euro im Schaltjahr.
        </desc>

        <style>{`
          .vm-hell { fill: #FAECE7; }
          .vm-t-rot { fill: #993C1D; }
          .dark .vm-hell { fill: #3A2A22; }
          .dark .vm-t-rot { fill: #F0997B; }
        `}</style>

        <text x="24" y="32" fontSize="17" fontWeight="700" fill="currentColor">
          Ein Zinssatz, vier Beträge
        </text>
        <text x="24" y="52" fontSize="12" fill="#9ca3af">
          10.000 € zu 3,0 % p. a., jeweils ein volles Kalenderjahr
        </text>

        {/* Hervorhebung der abweichenden Zeile */}
        <rect x="16" y="200" width="668" height="32" className="vm-hell" />

        <text x="24" y="86" fontSize="11" fontWeight="600" fill="#9ca3af">
          Methode
        </text>
        <text x="236" y="86" fontSize="11" fontWeight="600" fill="#9ca3af">
          Zinstage
        </text>
        <text x="330" y="86" fontSize="11" fontWeight="600" fill="#9ca3af">
          Jahresbasis
        </text>
        <text x="424" y="86" fontSize="11" fontWeight="600" fill="#9ca3af">
          Jahr 2025
        </text>
        <text x="552" y="86" fontSize="11" fontWeight="600" fill="#9ca3af">
          Schaltjahr 2024
        </text>
        <line x1="24" y1="96" x2="676" y2="96" stroke="#9ca3af" strokeWidth="1" />

        {/* Zeile 1 */}
        <text x="24" y="122" fontSize="12" fill="currentColor">
          Deutsche Methode (30/360)
        </text>
        <text x="236" y="122" fontSize="12" fill="currentColor">
          360
        </text>
        <text x="330" y="122" fontSize="12" fill="currentColor">
          360
        </text>
        <text x="424" y="122" fontSize="12" fontWeight="600" fill="currentColor">
          300,00 €
        </text>
        <text x="552" y="122" fontSize="12" fontWeight="600" fill="currentColor">
          300,00 €
        </text>

        {/* Zeile 2 */}
        <text x="24" y="154" fontSize="12" fill="currentColor">
          Englische Methode (act/365)
        </text>
        <text x="236" y="154" fontSize="12" fill="currentColor">
          365 / 366
        </text>
        <text x="330" y="154" fontSize="12" fill="currentColor">
          365
        </text>
        <text x="424" y="154" fontSize="12" fontWeight="600" fill="currentColor">
          300,00 €
        </text>
        <text x="552" y="154" fontSize="12" fontWeight="600" fill="currentColor">
          300,82 €
        </text>

        {/* Zeile 3 */}
        <text x="24" y="186" fontSize="12" fill="currentColor">
          Taggenau (act/act)
        </text>
        <text x="236" y="186" fontSize="12" fill="currentColor">
          365 / 366
        </text>
        <text x="330" y="186" fontSize="12" fill="currentColor">
          365 / 366
        </text>
        <text x="424" y="186" fontSize="12" fontWeight="600" fill="currentColor">
          300,00 €
        </text>
        <text x="552" y="186" fontSize="12" fontWeight="600" fill="currentColor">
          300,00 €
        </text>

        {/* Zeile 4 — die Abweichung */}
        <text x="24" y="218" fontSize="12" fontWeight="600" className="vm-t-rot">
          Eurozinsmethode (act/360)
        </text>
        <text x="236" y="218" fontSize="12" className="vm-t-rot">
          365 / 366
        </text>
        <text x="330" y="218" fontSize="12" className="vm-t-rot">
          360
        </text>
        <text x="424" y="218" fontSize="12" fontWeight="600" className="vm-t-rot">
          304,17 €
        </text>
        <text x="552" y="218" fontSize="12" fontWeight="600" className="vm-t-rot">
          305,00 €
        </text>

        <line x1="24" y1="236" x2="676" y2="236" stroke="#9ca3af" strokeWidth="1" />
        <text x="24" y="258" fontSize="11" fill="#9ca3af">
          act/360 zählt jeden Kalendertag und teilt trotzdem durch 360: Der Zähler wächst, der
          Nenner bleibt.
        </text>
        <text x="24" y="276" fontSize="11" fill="#9ca3af">
          Aufschlag im Normaljahr 1,3889 %, im Schaltjahr 1,6667 % — ohne Änderung des
          Zinssatzes.
        </text>
      </svg>
      <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
        Derselbe Zinssatz auf dasselbe Kapital: Drei Methoden führen zum gleichen Betrag, eine
        nicht.
      </figcaption>
    </figure>
  );
}
