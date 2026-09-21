/**
 * ZweiJahreslaengen — Blogartikel 19 (Bankjahr)
 *
 * Zeigt die beiden Maßstäbe, die in einem einzigen Kreditvertrag nebeneinander
 * stehen: das Zinsjahr des Sollzinses mit zwölf Monaten zu 30 Tagen und das
 * Effektivzinsjahr der Preisangabenverordnung mit zwölf Standardmonaten zu
 * 30,41666 Tagen.
 *
 * Belegt durch die Anlage zu § 16 PAngV (365 Tage, Standardmonat 365/12) und
 * durch Nummer 3.2 der Bedingungen für den Sparverkehr (Monat 30, Jahr 360).
 *
 * Geometrie (Breitenmodell 0,55 x fontSize):
 *   Maßstab 1,6438 px je Tag. Balken 1 (360 Tage): x = 24..615,8, zwölf
 *   Segmente à 49,32 px. Balken 2 (365 Tage): x = 24..624,0, zwölf Segmente
 *   à 50,00 px. Der Überstand von 8,2 px ist der Unterschied von fünf Tagen.
 *   Rechte Beschriftungen ab x = 632 bei Größe 11: „360 Tage“ = 48,4 px, endet
 *   bei 680,4 px — deshalb steht dort die kürzere Form ohne Wort „Tage“
 *   („360 T.“ = 36,3 px, endet bei 668,3 px), innerhalb viewBox 700 minus 20.
 *   Kopf: Titel y = 32, Untertitel y = 52.
 *   Balken 1: Beschriftung y = 84, Fläche y = 94..118.
 *   Balken 2: Beschriftung y = 150, Fläche y = 160..184.
 *   Hinweis auf den Überstand y = 212, Gesetzeskasten y = 232..288,
 *   letzte Grundlinie y = 278, viewBox-Höhe 300.
 */
const X0 = 24;
const PX_PRO_TAG = 600 / 365;
const SEG_SOLL = 30 * PX_PRO_TAG;
const SEG_EFF = (365 / 12) * PX_PRO_TAG;

function segmente(anzahl: number, breite: number, y: number, klasse: string, rahmen: string) {
  return Array.from({ length: anzahl }, (_, i) => (
    <rect
      key={i}
      x={X0 + i * breite}
      y={y}
      width={breite}
      height={24}
      className={klasse}
      stroke={rahmen}
      strokeWidth="1"
    />
  ));
}

export default function ZweiJahreslaengen() {
  return (
    <figure className="my-8">
      <svg
        width="100%"
        viewBox="0 0 700 300"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        className="rounded-xl text-gray-900 dark:text-gray-100"
      >
        <title>Zwei Jahreslängen in einem Kreditvertrag</title>
        <desc>
          Zwei maßstabsgetreue Balken übereinander. Der obere zeigt das Zinsjahr des Sollzinses
          mit zwölf Monaten zu 30 Tagen, zusammen 360 Tage. Der untere zeigt das
          Effektivzinsjahr nach der Anlage zu Paragraf 16 der Preisangabenverordnung mit zwölf
          Standardmonaten zu 30,41666 Tagen, zusammen 365 Tage. Der untere Balken ragt um fünf
          Tage über den oberen hinaus. Darunter steht der Wortlaut von Paragraf 191 des
          Bürgerlichen Gesetzbuchs, der den Monat zu 30 und das Jahr zu 365 Tagen rechnet.
        </desc>

        <style>{`
          .zj-soll { fill: #FAEEDA; }
          .zj-eff { fill: #E1F5EE; }
          .zj-rest { fill: #FAECE7; }
          .zj-kasten { fill: none; }
          .zj-t-braun { fill: #854F0B; }
          .zj-t-gruen { fill: #0F6E56; }
          .zj-t-rot { fill: #993C1D; }
          .dark .zj-soll { fill: #3A3222; }
          .dark .zj-eff { fill: #1E3A32; }
          .dark .zj-rest { fill: #3A2A22; }
          .dark .zj-t-braun { fill: #FAC775; }
          .dark .zj-t-gruen { fill: #5DCAA5; }
          .dark .zj-t-rot { fill: #F0997B; }
        `}</style>

        <text x="24" y="32" fontSize="17" fontWeight="700" fill="currentColor">
          Zwei Jahreslängen, ein Vertrag
        </text>
        <text x="24" y="52" fontSize="12" fill="#9ca3af">
          Beide Balken maßstabsgetreu, 1,64 px je Tag
        </text>

        <text x="24" y="84" fontSize="12" fontWeight="600" className="zj-t-braun">
          Sollzins: 12 Monate zu 30 Tagen
        </text>
        {segmente(12, SEG_SOLL, 94, 'zj-soll', '#854F0B')}
        <text x="632" y="110" fontSize="11" className="zj-t-braun">
          360 T.
        </text>

        <text x="24" y="150" fontSize="12" fontWeight="600" className="zj-t-gruen">
          Effektiver Jahreszins: 12 Standardmonate zu 30,41666 Tagen
        </text>
        {segmente(12, SEG_EFF, 160, 'zj-eff', '#0F6E56')}
        <rect x={X0 + 12 * SEG_SOLL} y="160" width={12 * SEG_EFF - 12 * SEG_SOLL} height="24" className="zj-rest" stroke="#993C1D" strokeWidth="1" />
        <text x="632" y="176" fontSize="11" className="zj-t-gruen">
          365 T.
        </text>

        <line x1="620" y1="186" x2="620" y2="208" stroke="#993C1D" strokeWidth="1" />
        <line x1="600" y1="208" x2="620" y2="208" stroke="#993C1D" strokeWidth="1" />
        <text x="470" y="212" fontSize="11" className="zj-t-rot">
          fünf Tage Unterschied
        </text>

        <rect x="24" y="232" width="652" height="56" className="zj-kasten" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4 3" />
        <text x="40" y="256" fontSize="11" fill="#9ca3af">
          § 191 BGB: „so wird der Monat zu 30, das Jahr zu 365 Tagen gerechnet“
        </text>
        <text x="40" y="278" fontSize="11" fill="#9ca3af">
          Zwölf Monate zu 30 Tagen ergeben 360. Beide Zahlen stehen in einem Satz.
        </text>
      </svg>
      <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
        Der Sollzins und die gesetzlich vorgeschriebene Vergleichszahl rechnen mit
        unterschiedlich langen Monaten.
      </figcaption>
    </figure>
  );
}
