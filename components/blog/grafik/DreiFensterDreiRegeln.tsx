/**
 * Grafik: Drei Lohnersatzleistungen, drei völlig verschiedene Stichtagsregeln
 * für dieselbe Steuerklasse.
 *
 * Elterngeld — § 2c Abs. 3 BEEG: maßgeblich ist die Steuerklasse aus der
 * Bescheinigung für den letzten Monat des Bemessungszeitraums; hat sich die
 * Klasse geändert, gilt die abweichende Angabe, wenn sie in der überwiegenden
 * Zahl der Monate des Bemessungszeitraums gegolten hat. Bemessungszeitraum in
 * der Regel zwölf Monate. BSG 28.03.2019 (B 10 EG 8/17 R): relative
 * Betrachtung, keine feste Sieben; Monate ohne Einnahmen sind keine Zählmonate.
 *
 * Arbeitslosengeld — § 153 Abs. 2 SGB III: Die Feststellung der Lohnsteuer
 * richtet sich nach der Lohnsteuerklasse, die zu Beginn des Jahres, in dem der
 * Anspruch entstanden ist, als Lohnsteuerabzugsmerkmal gebildet war.
 *
 * Krankengeld — § 47 Abs. 2 Satz 1 SGB V: Bemessungsgrundlage ist das im
 * letzten vor Beginn der Arbeitsunfähigkeit abgerechneten
 * Entgeltabrechnungszeitraum, mindestens während der letzten abgerechneten vier
 * Wochen erzielte Arbeitsentgelt. Die Steuerklasse wirkt über die
 * 90-Prozent-Netto-Grenze des § 47 Abs. 1 Satz 2 SGB V, die bei üblichen
 * Netto-Anteilen fast immer greift.
 *
 * Layout-Entscheidung: Gemeinsamer rechter Endpunkt für alle drei Bahnen. Das
 * Ereignis ist die Konstante, die Fenster sind die Variable — nur so wird
 * sichtbar, dass dieselbe Frage je nach Leistung an drei verschiedenen Stellen
 * beantwortet wird.
 *
 * Beim ALG I ist bewusst ein PUNKT gezeichnet, kein Fenster, und er sitzt
 * bewusst an wechselnder Stelle: Der 1. Januar liegt je nach Eintritt des
 * Ereignisses zwischen einem Tag und zwölf Monaten zurück. Ein Fenster hätte
 * eine Dauer suggeriert, die es dort nicht gibt.
 *
 * v3 (27.08.2026) — GEOMETRIE-KORREKTUR nach Sichtprüfung im Inkognito.
 * In v1/v2 standen Leistungsname und Norm links NEBEN der Bahn, bei x=24, die
 * Bahnen begannen bei x=92. Alle sechs Beschriftungen sind breiter als diese
 * 68 px: „Arbeitslosengeld" endet rechnerisch bei x=147, „§ 153 Abs. 2 SGB III"
 * bei x=134. Sämtliche Labels lagen also auf den Bahnen. Nachgemessen mit einem
 * Breitenmodell von 0,55 × fontSize je Zeichen.
 *
 * v3 stellt jede Bahn als eigenen Block dar: Kopfzeile mit Leistungsname (x=24)
 * und Norm (x=200), darunter die Zeitachse über die volle Breite, darunter
 * Regel und Planbarkeit. Damit kollidiert nichts mehr, und die Zeitachse
 * gewinnt 68 px an Länge.
 *
 * LEHRE: Eine Beschriftung links neben einem Diagrammfeld braucht eine
 * gemessene Spaltenbreite. Dasselbe Versäumnis wie in EinBruttoSechsNettos v1.
 *
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 * Muster: components/blog/grafik/ZehnProzentZeitachse.tsx.
 */
const X_START = 24;
const X_ENDE = 600;
const SPANNE = X_ENDE - X_START;

const bahnen = [
  {
    id: 'eltern',
    leistung: 'Elterngeld',
    norm: '§ 2c Abs. 3 BEEG',
    kopf: 168,
    fensterVon: 0,
    fensterBis: 1,
    schraffurAb: 5 / 12,
    regel: 'überwiegende Zahl der Monate im Zwölf-Monats-Zeitraum',
    planbar: 'planbar — man weiß es Monate vorher',
    ton: 'gut',
  },
  {
    id: 'alg',
    leistung: 'Arbeitslosengeld',
    norm: '§ 153 Abs. 2 SGB III',
    kopf: 268,
    punkt: 0.18,
    regel: 'die Klasse am 1. Januar des Anspruchsjahres',
    planbar: 'teils planbar — ein Datum im Kalender',
    ton: 'neutral',
  },
  {
    id: 'kranken',
    leistung: 'Krankengeld',
    norm: '§ 47 Abs. 2 SGB V',
    kopf: 368,
    fensterVon: 11 / 12,
    fensterBis: 1,
    regel: 'letzter Abrechnungszeitraum, mindestens vier Wochen',
    planbar: 'nicht planbar — es kommt ohne Ankündigung',
    ton: 'hart',
  },
] as const;

export default function DreiFensterDreiRegeln() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 520" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .f-gut { fill: #0F6E56; }
          .f-neutral { fill: #185FA5; }
          .f-hart { fill: #993C1D; }
          .t-gut { fill: #0F6E56; }
          .t-neutral { fill: #185FA5; }
          .t-hart { fill: #993C1D; }
          .dark .f-gut { fill: #5DCAA5; }
          .dark .f-neutral { fill: #85B7EB; }
          .dark .f-hart { fill: #F0A88C; }
          .dark .t-gut { fill: #5DCAA5; }
          .dark .t-neutral { fill: #85B7EB; }
          .dark .t-hart { fill: #F0A88C; }
        `}</style>
        <title>Drei Lohnersatzleistungen mit drei verschiedenen Stichtagsregeln für die Steuerklasse</title>
        <desc>
          Beim Elterngeld zählt nach Paragraf 2c Absatz 3 des Bundeselterngeld- und
          Elternzeitgesetzes die Steuerklasse, die in der überwiegenden Zahl der Monate des
          zwölfmonatigen Bemessungszeitraums vor der Geburt gegolten hat. Beim Arbeitslosengeld
          richtet sich die Feststellung der Lohnsteuer nach Paragraf 153 Absatz 2 des Dritten
          Buches Sozialgesetzbuch nach der Steuerklasse, die zu Beginn des Jahres gebildet war, in
          dem der Anspruch entstanden ist — ein einzelner Stichtag am 1. Januar. Beim Krankengeld
          ist nach Paragraf 47 Absatz 2 des Fünften Buches Sozialgesetzbuch der letzte vor Beginn
          der Arbeitsunfähigkeit abgerechnete Entgeltabrechnungszeitraum maßgeblich, mindestens die
          letzten abgerechneten vier Wochen. Elterngeld lässt sich planen, Arbeitslosengeld
          teilweise, Krankengeld gar nicht — und ausgerechnet dort ist das Fenster am kürzesten.
        </desc>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Dieselbe Steuerklasse, drei verschiedene Stichtage</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">Welcher Zeitraum darüber entscheidet, mit welcher Klasse gerechnet wird</text>

        {/* Ereignis-Achse: senkrechte Konstante rechts */}
        <line x1={X_ENDE} y1="120" x2={X_ENDE} y2="448" stroke="#d1d5db" strokeWidth="2" strokeDasharray="4 4" />
        <text x={X_ENDE} y="112" fontSize="12" fontWeight="600" textAnchor="middle" fill="currentColor">Ereignis</text>
        <text x="656" y="466" fontSize="10" textAnchor="end" fill="#9ca3af">Geburt · Arbeitslosigkeit · Erkrankung</text>

        {/* Skala */}
        <text x="24" y="134" fontSize="11" fill="#9ca3af">12 Monate vorher</text>
        <line x1={X_START} y1="142" x2={X_ENDE} y2="142" stroke="#d1d5db" strokeWidth="1" />

        {bahnen.map((b) => {
          const fk = b.ton === 'gut' ? 'f-gut' : b.ton === 'hart' ? 'f-hart' : 'f-neutral';
          const tk = b.ton === 'gut' ? 't-gut' : b.ton === 'hart' ? 't-hart' : 't-neutral';
          const yBahn = b.kopf + 26;
          return (
            <g key={b.id}>
              <text x="24" y={b.kopf} fontSize="14" fontWeight="600" fill="currentColor">{b.leistung}</text>
              <text x="200" y={b.kopf} fontSize="10" fill="#9ca3af">{b.norm}</text>

              <line x1={X_START} y1={yBahn} x2={X_ENDE} y2={yBahn} stroke="#d1d5db" strokeWidth="1" />

              {'fensterVon' in b ? (
                <>
                  <rect
                    x={X_START + b.fensterVon * SPANNE}
                    y={yBahn - 13}
                    width={(b.fensterBis - b.fensterVon) * SPANNE}
                    height="26"
                    rx="4"
                    className={fk}
                    opacity="0.22"
                  />
                  {'schraffurAb' in b && (
                    <rect
                      x={X_START + b.schraffurAb * SPANNE}
                      y={yBahn - 13}
                      width={(b.fensterBis - b.schraffurAb) * SPANNE}
                      height="26"
                      rx="4"
                      className={fk}
                      opacity="0.5"
                    />
                  )}
                </>
              ) : (
                <>
                  <circle cx={X_START + b.punkt * SPANNE} cy={yBahn} r="7" className={fk} />
                  <text x={X_START + b.punkt * SPANNE} y={yBahn - 18} fontSize="11" textAnchor="middle" className={tk}>1. Januar</text>
                </>
              )}

              <text x="24" y={yBahn + 30} fontSize="11" fill="#9ca3af">{b.regel}</text>
              <text x="24" y={yBahn + 46} fontSize="11" className={tk}>{b.planbar}</text>
            </g>
          );
        })}

        <line x1="24" y1="482" x2="656" y2="482" stroke="#d1d5db" strokeWidth="1" />
        <text x="24" y="504" fontSize="12" fill="#9ca3af">
          Elterngeld lässt sich planen. Arbeitslosengeld teilweise. Krankengeld gar nicht — und dort
          ist das Fenster am kürzesten.
        </text>
      </svg>
      <figcaption className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Die verbreitete Faustregel „sieben Monate vorher wechseln“ stammt aus dem Elterngeldrecht.
        Für das Arbeitslosengeld zählt der 1. Januar, für das Krankengeld der letzte Lohnzettel.
        Beim Krankengeld entscheidet deshalb nicht die Klasse, die man gewählt hat, sondern die, in
        der man ohnehin steht.
      </figcaption>
    </figure>
  );
}
