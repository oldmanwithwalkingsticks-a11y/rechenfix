/**
 * MonatsstundenKalender2026 — Blogartikel 21 (Ein Monat hat keine 160 Stunden)
 *
 * Bezahlte Stunden je Monat 2026 bei 40 Wochenstunden: Tage von Montag bis Freitag
 * mal 8 Stunden. Feiertage zählen mit, weil sie nach § 2 EFZG bezahlt werden.
 *
 * Daten: nicht getippt, sondern beim Rendern gezählt — zaehleArbeitstageZeitraum aus
 * lib/berechnungen/feiertage.ts (Werktage Mo–Fr je Monat), Stunden je Tag aus
 * VOLLZEIT_WOCHENSTUNDEN / 5, die Linie 52 ÷ 12 aus VOLLZEIT_STUNDEN_MONAT
 * (lib/berechnungen/mindestlohn.ts). Ergebnis 2026: Februar 160, März bis Dezember
 * zwischen 168 und 184, im Schnitt 174 (261 Tage, 2.088 Stunden).
 *
 * Geometrie: y = 150 bis 190 Stunden auf 330 bis 110 px (5,5 px je Stunde), zwölf
 * Spalten von x = 64 bis 536, Achsenstriche nur links (ein Raster durch das Feld lief
 * durch die Wertlabels der 168-Stunden-Monate). Die Linien 174 (y = 198) und 173,33 (y = 201,7) liegen
 * 3,7 px auseinander; ihre Beschriftungen stehen deshalb in der rechten Spalte ab
 * x = 548 eine ÜBER der 174-Linie und eine UNTER der 173,33-Linie. Die Wertlabels der
 * Balken stehen 6 px über dem Balken; der niedrigste mit 168 Stunden endet bei
 * y = 225, also 23 px unter den beiden Linien. Paarweise geprüft (Chromium-Bbox),
 * kein Überlauf über 680 × 420.
 *
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 */
import { zaehleArbeitstageZeitraum } from '@/lib/berechnungen/feiertage';
import { VOLLZEIT_STUNDEN_MONAT, VOLLZEIT_WOCHENSTUNDEN } from '@/lib/berechnungen/mindestlohn';
import { formatZahl } from '@/lib/zahlenformat';

const JAHR = 2026;
const MONATE = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
const MONATE_LANG = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
const STUNDEN_JE_TAG = VOLLZEIT_WOCHENSTUNDEN / 5;

const TAGE = MONATE.map(
  (_, m) => zaehleArbeitstageZeitraum(new Date(JAHR, m, 1), new Date(JAHR, m + 1, 0), 'nw', [1, 2, 3, 4, 5]).werktage,
);
const STUNDEN = TAGE.map((t) => t * STUNDEN_JE_TAG);
const TAGE_JAHR = TAGE.reduce((s, t) => s + t, 0);
const STUNDEN_JAHR = TAGE_JAHR * STUNDEN_JE_TAG;
const SCHNITT = STUNDEN_JAHR / 12;
const MIN = Math.min(...STUNDEN);
const MAX = Math.max(...STUNDEN);
const VIER_WOCHEN = 4 * VOLLZEIT_WOCHENSTUNDEN;

const Y_MIN = 150;
const Y_MAX = 190;
const PY0 = 330;
const PY1 = 110;
const X0 = 64;
const X1 = 536;
const SPALTE = (X1 - X0) / 12;
const BALKEN = 26;

const py = (v: number) => PY0 - ((v - Y_MIN) / (Y_MAX - Y_MIN)) * (PY0 - PY1);
const mitte = (i: number) => X0 + SPALTE * (i + 0.5);

export default function MonatsstundenKalender2026() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 420" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .mk-norm { fill: #DCE8F5; }
          .mk-kurz { fill: #F6D5C8; }
          .mk-lang { fill: #9FC3E7; }
          .mk-t-coral { fill: #993C1D; }
          .mk-t-teal { fill: #0F6E56; }
          .mk-l-teal { stroke: #0F6E56; }
          .mk-l-coral { stroke: #993C1D; }
          .dark .mk-norm { fill: #1F3247; }
          .dark .mk-kurz { fill: #4A2A1F; }
          .dark .mk-lang { fill: #2C5480; }
          .dark .mk-t-coral { fill: #F0997B; }
          .dark .mk-t-teal { fill: #5DCAA5; }
          .dark .mk-l-teal { stroke: #5DCAA5; }
          .dark .mk-l-coral { stroke: #F0997B; }
        `}</style>
        <title>{`Bezahlte Stunden je Monat im Jahr ${JAHR}`}</title>
        <desc>
          {`Bei 40 Wochenstunden hat jeder Monat des Jahres ${JAHR} so viele bezahlte Stunden, wie er Tage von Montag bis Freitag hat, mal acht. `}
          {MONATE_LANG.map((m, i) => `${m} ${STUNDEN[i]}`).join(', ')}
          {`. Nur der Februar kommt auf ${formatZahl(VIER_WOCHEN)} Stunden, die Faustregel vier mal 40. Im Schnitt hat ein Monat ${formatZahl(SCHNITT)} Stunden, ${formatZahl(TAGE_JAHR)} Tage von Montag bis Freitag mal acht geteilt durch zwölf. Die Konvention 52 Wochen geteilt durch 12 Monate ergibt ${formatZahl(VOLLZEIT_STUNDEN_MONAT, 2)} Stunden.`}
        </desc>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Bezahlte Stunden je Monat {JAHR}</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">40 Wochenstunden: Tage von Montag bis Freitag mal 8, Feiertage zählen mit</text>

        <text x="56" y="96" fontSize="10" textAnchor="end" fill="#9ca3af">Std.</text>
        {[160, 170, 180, 190].map((v) => (
          <g key={v}>
            <line x1={X0 - 6} y1={py(v)} x2={X0 - 2} y2={py(v)} stroke="#9ca3af" strokeWidth="1" />
            <text x="56" y={py(v) + 3.5} fontSize="10" textAnchor="end" fill="#9ca3af">{v}</text>
          </g>
        ))}

        {STUNDEN.map((h, i) => {
          const klasse = h === MIN ? 'mk-kurz' : h === MAX ? 'mk-lang' : 'mk-norm';
          const strich = h === MIN ? '#993C1D' : '#185FA5';
          const x = mitte(i) - BALKEN / 2;
          return (
            <g key={MONATE[i]}>
              <rect x={x} y={py(h)} width={BALKEN} height={PY0 - py(h)} rx="3" className={klasse} stroke={strich} strokeWidth="1" />
              <text
                x={mitte(i)}
                y={py(h) - 6}
                fontSize="11"
                fontWeight={h === MIN || h === MAX ? 700 : 500}
                textAnchor="middle"
                className={h === MIN ? 'mk-t-coral' : undefined}
                fill={h === MIN ? undefined : 'currentColor'}
              >
                {h}
              </text>
              <text x={mitte(i)} y="348" fontSize="11" textAnchor="middle" fill="#9ca3af">{MONATE[i]}</text>
            </g>
          );
        })}
        <line x1={X0 - 4} y1={PY0} x2={X1} y2={PY0} stroke="#9ca3af" strokeWidth="1" />

        <line x1={X0 - 4} y1={py(SCHNITT)} x2="540" y2={py(SCHNITT)} stroke="currentColor" strokeWidth="1.2" strokeDasharray="5 3" />
        <line x1={X0 - 4} y1={py(VOLLZEIT_STUNDEN_MONAT)} x2="540" y2={py(VOLLZEIT_STUNDEN_MONAT)} className="mk-l-teal" strokeWidth="1.5" />
        <line x1={X0 - 4} y1={py(VIER_WOCHEN)} x2="540" y2={py(VIER_WOCHEN)} className="mk-l-coral" strokeWidth="1.2" strokeDasharray="2 3" />
        <text x="548" y={py(SCHNITT) - 5} fontSize="11" fontWeight="600" fill="currentColor">Schnitt {JAHR}: {formatZahl(SCHNITT)}</text>
        <text x="548" y={py(VOLLZEIT_STUNDEN_MONAT) + 13} fontSize="11" fontWeight="600" className="mk-t-teal">52 ÷ 12: {formatZahl(VOLLZEIT_STUNDEN_MONAT, 2)}</text>
        <text x="548" y={py(VIER_WOCHEN) + 4} fontSize="11" fontWeight="600" className="mk-t-coral">4 × 40: {formatZahl(VIER_WOCHEN)}</text>

        <line x1="24" y1="368" x2="656" y2="368" stroke="#d1d5db" strokeWidth="1" />
        <text x="24" y="388" fontSize="12" fill="#9ca3af">
          {`${JAHR} hat ${formatZahl(TAGE_JAHR)} Tage von Montag bis Freitag: ${formatZahl(STUNDEN_JAHR)} bezahlte Stunden, im Schnitt ${formatZahl(SCHNITT)} je Monat.`}
        </text>
        <text x="24" y="406" fontSize="12" fill="#9ca3af">{`Feiertage werden bezahlt (§ 2 EFZG). Die Achse beginnt bei ${Y_MIN} Stunden.`}</text>
      </svg>
      <figcaption className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {`Nur der Februar hat ${JAHR} genau ${formatZahl(MIN)} bezahlte Stunden. ${MONATE_LANG.filter((_, i) => STUNDEN[i] === MAX).join(' und ')} haben ${formatZahl(MAX)}, ${formatZahl((MAX - MIN) / STUNDEN_JE_TAG)} Arbeitstage mehr. Über das Jahr gerechnet sind es im Schnitt ${formatZahl(SCHNITT)} Stunden je Monat, die Konvention 52 ÷ 12 nimmt ${formatZahl(VOLLZEIT_STUNDEN_MONAT, 2)}.`}
      </figcaption>
    </figure>
  );
}
