/**
 * MindestlohnMonatsSoll — Blogartikel 21 (Ein Monat hat keine 160 Stunden)
 *
 * Festes Monatsgehalt zum Mindestlohn (40 Wochenstunden, 52 ÷ 12) gegen das Soll jedes
 * einzelnen Monats, wenn man den Mindestlohn streng je Kalendermonat misst: Stunden des
 * Monats (Montag bis Freitag mal 8) mal Mindestlohn. Zwei Felder, 2026 und 2027.
 *
 * Daten: nicht getippt. Mindestlohn MINDESTLOHN_2026 und MINDESTLOHN_2027, festes Gehalt
 * mindestlohnMonatVollzeit (beide lib/berechnungen/mindestlohn.ts), Stunden je Monat mit
 * zaehleArbeitstageZeitraum (lib/berechnungen/feiertage.ts). Ergebnis 2026: festes Gehalt
 * 2.409,33 €, Soll 2.224,00 € (Februar) bis 2.557,60 € (Juli, Dezember); 2027: 2.530,67 €,
 * Soll 2.336,00 € bis 2.686,40 € (März, Dezember). In beiden Jahren liegt das Soll in
 * 8 von 12 Monaten über dem festen Gehalt.
 *
 * Rechtslage (siehe Artikeltext): BAG 5 AZR 135/16 misst je Kalendermonat; das BMAS
 * hält ein verstetigtes Gehalt für zulässig. Die Grafik zeigt die Rechnung, kein Urteil.
 *
 * Geometrie: y = 2.150 bis 2.750 € auf je 120 px (0,2 px je Euro), Feld 2026 von
 * y = 100 bis 220, Feld 2027 von y = 284 bis 404; zwölf Spalten von x = 64 bis 520.
 * Wertlabels nur am kürzesten und an den längsten Monaten, 5 px über dem Balken; im Feld
 * 2027 stehen Februar und März nebeneinander, ihre Labels liegen 72 px übereinander
 * auseinander. Das Gehalt steht in der rechten Spalte ab x = 532, zweizeilig über und
 * unter der Linie. Paarweise geprüft (Chromium-Bbox), kein Überlauf über 680 × 506.
 *
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 */
import { zaehleArbeitstageZeitraum } from '@/lib/berechnungen/feiertage';
import { MINDESTLOHN_2026, MINDESTLOHN_2027, VOLLZEIT_WOCHENSTUNDEN, mindestlohnMonatVollzeit } from '@/lib/berechnungen/mindestlohn';
import { formatZahl } from '@/lib/zahlenformat';

const MONATE = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
const MONATE_LANG = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
const STUNDEN_JE_TAG = VOLLZEIT_WOCHENSTUNDEN / 5;

function jahr(j: number, mindestlohn: number, oben: number) {
  const stunden = MONATE.map(
    (_, m) => zaehleArbeitstageZeitraum(new Date(j, m, 1), new Date(j, m + 1, 0), 'nw', [1, 2, 3, 4, 5]).werktage * STUNDEN_JE_TAG,
  );
  const soll = stunden.map((h) => Math.round(h * mindestlohn * 100) / 100);
  const fest = mindestlohnMonatVollzeit(mindestlohn);
  return { j, mindestlohn, oben, stunden, soll, fest, ueber: soll.filter((s) => s > fest).length };
}

const FELDER = [jahr(2026, MINDESTLOHN_2026, 100), jahr(2027, MINDESTLOHN_2027, 284)];

const E_MIN = 2150;
const E_MAX = 2750;
const HOEHE = 120;
const X0 = 64;
const X1 = 520;
const SPALTE = (X1 - X0) / 12;
const BALKEN = 24;

const euro = (v: number) => formatZahl(v, 2);
const mitte = (i: number) => X0 + SPALTE * (i + 0.5);

export default function MindestlohnMonatsSoll() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 506" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .ms-ueber { fill: #F6D5C8; }
          .ms-unter { fill: #CDEBDF; }
          .ms-t-coral { fill: #993C1D; }
          .ms-t-teal { fill: #0F6E56; }
          .dark .ms-ueber { fill: #4A2A1F; }
          .dark .ms-unter { fill: #1E3A32; }
          .dark .ms-t-coral { fill: #F0997B; }
          .dark .ms-t-teal { fill: #5DCAA5; }
        `}</style>
        <title>Mindestlohn: festes Monatsgehalt gegen das Soll je Kalendermonat, 2026 und 2027</title>
        <desc>
          {FELDER.map(
            (f) =>
              `${f.j}, Mindestlohn ${euro(f.mindestlohn)} Euro: festes Monatsgehalt bei 40 Wochenstunden ${euro(f.fest)} Euro. Soll je Monat, Stunden mal Mindestlohn: ` +
              MONATE_LANG.map((m, i) => `${m} ${euro(f.soll[i])} Euro`).join(', ') +
              `. In ${f.ueber} von 12 Monaten liegt das Soll über dem festen Gehalt. `,
          ).join('')}
        </desc>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Mindestlohn: festes Gehalt gegen das Soll je Monat</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">40 Wochenstunden; Soll = Stunden des Monats (Montag bis Freitag mal 8) × Mindestlohn</text>

        {FELDER.map((f) => {
          const unten = f.oben + HOEHE;
          const py = (v: number) => unten - ((v - E_MIN) / (E_MAX - E_MIN)) * HOEHE;
          const min = Math.min(...f.soll);
          const max = Math.max(...f.soll);
          return (
            <g key={f.j}>
              <text x="24" y={f.oben - 12} fontSize="13" fontWeight="600" fill="currentColor">
                {`${f.j} · Mindestlohn ${euro(f.mindestlohn)} € je Stunde`}
              </text>
              {f.soll.map((s, i) => (
                <g key={MONATE[i]}>
                  <rect
                    x={mitte(i) - BALKEN / 2}
                    y={py(s)}
                    width={BALKEN}
                    height={unten - py(s)}
                    rx="3"
                    className={s > f.fest ? 'ms-ueber' : 'ms-unter'}
                    stroke={s > f.fest ? '#993C1D' : '#0F6E56'}
                    strokeWidth="1"
                  />
                  {(s === min || s === max) && (
                    <text
                      x={mitte(i)}
                      y={py(s) - 5}
                      fontSize="10"
                      fontWeight="600"
                      textAnchor="middle"
                      className={s > f.fest ? 'ms-t-coral' : 'ms-t-teal'}
                    >
                      {euro(s)}
                    </text>
                  )}
                  <text x={mitte(i)} y={unten + 14} fontSize="10" textAnchor="middle" fill="#9ca3af">{MONATE[i]}</text>
                </g>
              ))}
              <line x1={X0 - 4} y1={unten} x2={X1} y2={unten} stroke="#9ca3af" strokeWidth="1" />
              <line x1={X0 - 4} y1={py(f.fest)} x2="524" y2={py(f.fest)} stroke="currentColor" strokeWidth="1.5" />
              <text x="532" y={py(f.fest) - 4} fontSize="11" fill="#9ca3af">festes Gehalt</text>
              <text x="532" y={py(f.fest) + 12} fontSize="12" fontWeight="700" fill="currentColor">{`${euro(f.fest)} €`}</text>
            </g>
          );
        })}

        <line x1="24" y1="440" x2="656" y2="440" stroke="#d1d5db" strokeWidth="1" />
        <text x="24" y="460" fontSize="12" fill="#9ca3af">
          <tspan className="ms-t-coral" fontWeight="600">Braun:</tspan>
          {FELDER[0].ueber === FELDER[1].ueber
            ? ` Soll über dem festen Gehalt, ${FELDER[0].j} und ${FELDER[1].j} in je ${FELDER[0].ueber} von 12 Monaten. `
            : ` Soll über dem festen Gehalt, ${FELDER.map((f) => `${f.j} in ${f.ueber}`).join(' und ')} von 12 Monaten. `}
          <tspan className="ms-t-teal" fontWeight="600">Grün:</tspan>
          {' darunter.'}
        </text>
        <text x="24" y="478" fontSize="12" fill="#9ca3af">Ob ein festes Gehalt das über das Jahr ausgleichen darf, ist höchstrichterlich offen.</text>
        <text x="24" y="496" fontSize="12" fill="#9ca3af">{`Die Achse beginnt bei ${formatZahl(E_MIN)} €.`}</text>
      </svg>
      <figcaption className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {`Wer Vollzeit zum Mindestlohn mit festem Gehalt arbeitet, bekommt ${FELDER[0].j} jeden Monat ${euro(FELDER[0].fest)} €. Misst man streng je Kalendermonat, bräuchte der ${MONATE_LANG[FELDER[0].soll.indexOf(Math.max(...FELDER[0].soll))]} ${euro(Math.max(...FELDER[0].soll))} €, der Februar nur ${euro(Math.min(...FELDER[0].soll))} €.`}
      </figcaption>
    </figure>
  );
}
