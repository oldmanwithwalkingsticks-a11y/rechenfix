/**
 * SoliRampe — Blogartikel 20 (Kinder und Lohnsteuer)
 *
 * Solidaritätszuschlag im Jahr über der Einkommensteuer im Jahr, drei Rechenweisen:
 *  - geltendes Recht: Freigrenze 20.350 € (§ 3 Abs. 3 SolzG), darüber höchstens 11,9 %
 *    des Überhangs (§ 4 Satz 2 SolzG), ab 37.838 € volle 5,5 % der ganzen Steuer
 *  - Faustregel „5,5 % auf alles“
 *  - hypothetischer Freibetrag: 5,5 % nur auf den Teil über 20.350 €
 * Das Ende der Rampe folgt aus 0,119 × (x − 20.350) = 0,055 × x, also x = 37.838,28.
 *
 * Die Kurve des geltenden Rechts kommt aus berechneSoli (lib/berechnungen/einkommensteuer.ts),
 * die Freigrenze aus berechneEinkommensteuer(…).soliFreigrenze — kein Jahreswert steht hier
 * als Zahl (Wächter check-jahreswerte). Die beiden Vergleichslinien sind reine Formeln.
 *
 * Geometrie: Achse x = 15.000 bis 45.000 € auf 80 bis 660 px, y = 0 bis 2.500 € auf
 * 320 bis 90 px. Keine Beschriftung im Kurvenfeld — Legende und Erläuterung stehen unter
 * der Achse, die beiden Markenlinien tragen ihr Label über dem Feld (y = 76). Paarweise
 * geprüft, keine Kollision, kein Überlauf über 700 × 432.
 *
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor; Linienfarben
 * bleiben in beiden Modi gleich (Skill-Regel), nur die Legendentexte wechseln.
 */
import { berechneEinkommensteuer, berechneSoli } from '@/lib/berechnungen/einkommensteuer';

const X_MIN = 15000;
const X_MAX = 45000;
const Y_MAX = 2500;
const PX0 = 80;
const PX1 = 660;
const PY0 = 320;
const PY1 = 90;
const FREIGRENZE = berechneEinkommensteuer({ zvE: 0, splitting: false, jahr: 2026, kirchensteuer: false, kirchensteuersatz: 9 }).soliFreigrenze;
const RAMPENENDE = (0.119 * FREIGRENZE) / (0.119 - 0.055);

const px = (x: number) => PX0 + ((x - X_MIN) / (X_MAX - X_MIN)) * (PX1 - PX0);
const py = (v: number) => PY0 - (v / Y_MAX) * (PY0 - PY1);

const geltend = (x: number) => berechneSoli(x, false, 2026);
const faustregel = (x: number) => 0.055 * x;
const freibetrag = (x: number) => (x <= FREIGRENZE ? 0 : 0.055 * (x - FREIGRENZE));

function pfad(f: (x: number) => number): string {
  const punkte: string[] = [];
  for (let x = X_MIN; x <= X_MAX; x += 250) punkte.push(`${px(x).toFixed(1)},${py(f(x)).toFixed(1)}`);
  // Knickstellen exakt setzen, damit die Ecken nicht zwischen zwei Stützstellen verrutschen
  for (const k of [FREIGRENZE, RAMPENENDE]) punkte.push(`${px(k).toFixed(1)},${py(f(k)).toFixed(1)}`);
  return punkte
    .map((p) => p.split(',').map(Number) as [number, number])
    .sort((a, b) => a[0] - b[0])
    .map(([a, b]) => `${a},${b}`)
    .join(' ');
}

const X_TICKS = [15000, 20000, 25000, 30000, 35000, 40000, 45000];
const Y_TICKS = [0, 500, 1000, 1500, 2000, 2500];
const tausend = (n: number) => n.toLocaleString('de-DE');

export default function SoliRampe() {
  return (
    <figure className="my-8">
      <svg
        width="100%"
        viewBox="0 0 700 432"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        className="rounded-xl text-gray-900 dark:text-gray-100"
      >
        <title>Solidaritätszuschlag: Freigrenze mit Milderungszone statt Freibetrag</title>
        <desc>
          Liniendiagramm des Solidaritätszuschlags im Jahr über der Einkommensteuer im Jahr von
          15.000 bis 45.000 Euro. Nach geltendem Recht ist der Soli bis 20.350 Euro Steuer null,
          steigt danach steil mit 11,9 Prozent des Überhangs und trifft bei 37.838 Euro die Linie
          von 5,5 Prozent der ganzen Steuer, der er von dort an folgt. Zum Vergleich eine Linie
          mit 5,5 Prozent auf die ganze Steuer ab dem ersten Euro und eine Linie, die zeigt, wie
          der Soli als echter Freibetrag verliefe: 5,5 Prozent nur auf den Teil über 20.350 Euro.
        </desc>

        <style>{`
          .sr-t-blau { fill: #185FA5; }
          .sr-t-rot { fill: #993C1D; }
          .sr-t-gruen { fill: #0F6E56; }
          .dark .sr-t-blau { fill: #85B7EB; }
          .dark .sr-t-rot { fill: #F0997B; }
          .dark .sr-t-gruen { fill: #5DCAA5; }
        `}</style>

        <text x="24" y="32" fontSize="17" fontWeight="700" fill="currentColor">
          Eine Freigrenze ist kein Freibetrag
        </text>
        <text x="24" y="52" fontSize="12" fill="#9ca3af">
          Solidaritätszuschlag im Jahr (Euro) über der Einkommensteuer im Jahr, 2026
        </text>

        {Y_TICKS.map((v) => (
          <g key={`y${v}`}>
            <line x1={PX0} y1={py(v)} x2={PX1} y2={py(v)} stroke="#9ca3af" strokeOpacity="0.35" strokeWidth="1" />
            <text x={PX0 - 8} y={py(v) + 4} fontSize="11" textAnchor="end" fill="#9ca3af">{tausend(v)}</text>
          </g>
        ))}
        {X_TICKS.map((x) => (
          <text key={`x${x}`} x={px(x)} y={PY0 + 18} fontSize="11" textAnchor="middle" fill="#9ca3af">{tausend(x)}</text>
        ))}
        <text x={(PX0 + PX1) / 2} y={PY0 + 36} fontSize="11" textAnchor="middle" fill="#9ca3af">
          Einkommensteuer bzw. Jahreslohnsteuer in Euro
        </text>

        <line x1={px(FREIGRENZE)} y1={PY1} x2={px(FREIGRENZE)} y2={PY0} stroke="#9ca3af" strokeWidth="1" strokeDasharray="4 3" />
        <text x={px(FREIGRENZE) + 4} y="76" fontSize="11" fill="#9ca3af">Freigrenze 20.350</text>
        <line x1={px(RAMPENENDE)} y1={PY1} x2={px(RAMPENENDE)} y2={PY0} stroke="#9ca3af" strokeWidth="1" strokeDasharray="4 3" />
        <text x={px(RAMPENENDE) + 4} y="76" fontSize="11" fill="#9ca3af">Rampe endet 37.838</text>

        <polyline points={pfad(faustregel)} fill="none" stroke="#993C1D" strokeWidth="1.5" strokeDasharray="6 4" />
        <polyline points={pfad(freibetrag)} fill="none" stroke="#0F6E56" strokeWidth="1.5" strokeDasharray="2 3" />
        <polyline points={pfad(geltend)} fill="none" stroke="#185FA5" strokeWidth="3" strokeLinejoin="round" />

        <line x1="80" y1="380" x2="104" y2="380" stroke="#185FA5" strokeWidth="3" />
        <text x="110" y="384" fontSize="11" fontWeight="600" className="sr-t-blau">geltendes Recht</text>
        <line x1="250" y1="380" x2="274" y2="380" stroke="#993C1D" strokeWidth="1.5" strokeDasharray="6 4" />
        <text x="280" y="384" fontSize="11" className="sr-t-rot">5,5 % auf alles</text>
        <line x1="420" y1="380" x2="444" y2="380" stroke="#0F6E56" strokeWidth="1.5" strokeDasharray="2 3" />
        <text x="450" y="384" fontSize="11" className="sr-t-gruen">wäre es ein Freibetrag</text>

        <text x="24" y="406" fontSize="11" fill="#9ca3af">
          Zwischen 20.350 und 37.838 € Steuer kostet jeder weitere Steuereuro 11,9 Cent Soli.
        </text>
        <text x="24" y="424" fontSize="11" fill="#9ca3af">
          Darüber zählen 5,5 % der ganzen Steuer – als hätte es die Freigrenze nie gegeben.
        </text>
      </svg>
      <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
        Aus dem Sprung an der Freigrenze macht die Milderungszone eine Rampe – steiler als 5,5 Prozent.
      </figcaption>
    </figure>
  );
}
