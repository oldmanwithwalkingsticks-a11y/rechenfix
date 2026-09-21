/**
 * ZinstageKalender — Blogartikel 19 (Bankjahr)
 *
 * Zeigt, dass die deutsche Methode Zinstage aus den langen Monaten in die kurzen
 * verschiebt: Im Februar zählt sie zwei Tage mehr, als der Kalender hergibt, im
 * August einen weniger.
 *
 * Zahlen maschinell nachgerechnet (12.09.2026, /tmp/zinsmethoden.mjs):
 *   10.000 EUR, 3,0 % p. a.
 *   01.02.2026–01.03.2026: 28 Kalendertage, 30 Zinstage nach 30/360
 *     30/360 = 25,00 EUR | act/365 = 23,01 EUR
 *   01.08.2026–31.08.2026: 30 Kalendertage, 29 Zinstage nach 30/360
 *     (jeder 31. wird auf den 30. zurückgesetzt, gezählt wird 1. bis 30.)
 *     30/360 = 24,17 EUR | act/365 = 24,66 EUR
 *
 * Geometrie (Breitenmodell 0,55 x fontSize):
 *   Kästchenreihen: 30 Felder à 16 px plus 2 px Abstand = 540 px, x = 24..564.
 *   Beschriftungen stehen ÜBER den Reihen, nicht daneben — bei einer linken
 *   Spalte wäre „1. Februar bis 1. März 2026“ (26 Zeichen, Größe 12 = 171,6 px)
 *   breiter als jeder vertretbare Spaltenrest.
 *   Kopf: Titel y = 32, Untertitel y = 52.
 *   Block Februar: Zeile y = 84, Kästchen y = 94..110, Beträge y = 132.
 *   Block August: Zeile y = 176, Kästchen y = 186..202, Beträge y = 224.
 *   Fußtext y = 256, letzte Grundlinie y = 256, viewBox-Höhe 276.
 */
const REIHE_X = 24;
const FELD = 16;
const LUECKE = 2;

function felder(anzahl: number, davonGezaehlt: number, y: number, klasse: string) {
  return Array.from({ length: anzahl }, (_, i) => (
    <rect
      key={i}
      x={REIHE_X + i * (FELD + LUECKE)}
      y={y}
      width={FELD}
      height={FELD}
      className={i < davonGezaehlt ? klasse : 'zk-leer'}
      stroke="#9ca3af"
      strokeWidth="1"
      strokeDasharray={i < davonGezaehlt ? undefined : '3 2'}
    />
  ));
}

export default function ZinstageKalender() {
  return (
    <figure className="my-8">
      <svg
        width="100%"
        viewBox="0 0 700 276"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        className="rounded-xl text-gray-900 dark:text-gray-100"
      >
        <title>Zinstage nach der deutschen Methode im Februar und im August</title>
        <desc>
          Zwei Kästchenreihen mit je 30 Feldern. Im Zeitraum vom 1. Februar bis 1. März 2026
          vergehen 28 Kalendertage, die deutsche Methode zählt 30 Zinstage: Zwei Felder sind
          gestrichelt, weil es die Tage nicht gibt. Der Ertrag beträgt 25,00 Euro statt 23,01
          Euro. Vom 1. bis 31. August 2026 vergehen 30 Kalendertage, gezählt werden 29: Ein Feld
          ist gestrichelt. Der Ertrag beträgt 24,17 Euro statt 24,66 Euro.
        </desc>

        <style>{`
          .zk-mint { fill: #E1F5EE; }
          .zk-beige { fill: #FAEEDA; }
          .zk-leer { fill: none; }
          .zk-t-gruen { fill: #0F6E56; }
          .zk-t-braun { fill: #854F0B; }
          .dark .zk-mint { fill: #1E3A32; }
          .dark .zk-beige { fill: #3A3222; }
          .dark .zk-t-gruen { fill: #5DCAA5; }
          .dark .zk-t-braun { fill: #FAC775; }
        `}</style>

        <text x="24" y="32" fontSize="17" fontWeight="700" fill="currentColor">
          Der Februar gewinnt, der August verliert
        </text>
        <text x="24" y="52" fontSize="12" fill="#9ca3af">
          Ein Kästchen ist ein Zinstag. Gestrichelt: gezählt, aber nicht im Kalender — oder
          umgekehrt.
        </text>

        <text x="24" y="84" fontSize="12" fontWeight="600" fill="currentColor">
          1. Februar bis 1. März 2026 — 28 Kalendertage, 30 Zinstage
        </text>
        {felder(30, 28, 94, 'zk-mint')}
        <text x="24" y="132" fontSize="12" className="zk-t-gruen">
          30/360: 25,00 €
        </text>
        <text x="180" y="132" fontSize="12" fill="#9ca3af">
          act/365: 23,01 €
        </text>
        <text x="336" y="132" fontSize="11" fill="#9ca3af">
          zwei Zinstage geschenkt
        </text>

        <text x="24" y="176" fontSize="12" fontWeight="600" fill="currentColor">
          1. bis 31. August 2026 — 30 Kalendertage, 29 Zinstage
        </text>
        {felder(30, 29, 186, 'zk-beige')}
        <text x="24" y="224" fontSize="12" className="zk-t-braun">
          30/360: 24,17 €
        </text>
        <text x="180" y="224" fontSize="12" fill="#9ca3af">
          act/365: 24,66 €
        </text>
        <text x="336" y="224" fontSize="11" fill="#9ca3af">
          ein Zinstag fällt weg
        </text>

        <text x="24" y="256" fontSize="11" fill="#9ca3af">
          Über ein volles Jahr gleicht sich das aus. Über einen einzelnen Monat nicht.
        </text>
      </svg>
      <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
        Die deutsche Methode ändert nicht die Jahressumme, sondern ihre Verteilung.
      </figcaption>
    </figure>
  );
}
