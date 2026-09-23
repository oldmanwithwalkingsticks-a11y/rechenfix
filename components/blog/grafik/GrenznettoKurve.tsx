/**
 * GrenznettoKurve — Blogartikel 20 (Kinder und Lohnsteuer)
 *
 * Wie viel von 100 € mehr Brutto netto ankommt, über Monatsbrutto 2.000 bis 16.000 €.
 * Steuerklasse I, kinderlos (älter als 23), ohne Kirchensteuer, Zusatzbeitrag 2,9 %, 2026.
 *
 * Daten: 141 Werte, je Netto(m + 100) − Netto(m) für m = 2.000, 2.100, … 16.000, gelesen
 * aus berechneBruttoNetto nach Welle 147 (= PAP 2026 auf den Cent, geprüft mit
 * scripts/verify-bruttonetto-zuschlaege.ts). Jeder Wert wird in der Mitte seines
 * 100-€-Schritts gezeichnet (m + 50).
 *
 * Die vier Marken: die beiden Beitragsbemessungsgrenzen kommen aus brutto-netto.ts
 * (BBG_KV_MONAT, BBG_RV_MONAT — Wächter check-jahreswerte). Beginn des Soli bei 7.700 € und
 * volle 5,5 % ab 11.240 € sind an derselben Lib gemessene Schwellen dieser Datenreihe, keine
 * Rechtsgrößen, und veralten mit ihr.
 *
 * WARTUNG: Die Werte veralten zum 01.01.2027. Neu lesen, nicht hochrechnen.
 *
 * Geometrie: x = 2.000 bis 16.000 € auf 80 bis 660 px, y = 44 bis 60 € auf 320 bis 110 px.
 * Die Markenlabels stehen über dem Feld in zwei Reihen, weil „Soli ab“ (x = 320) sonst
 * zwischen den beiden Beitragsgrenzen (x = 242 und 351) mit ihnen kollidiert. Die
 * Markenlinien beginnen erst bei y = 104, damit keine Linie durch ein Label der zweiten
 * Reihe läuft. Das Label des Tiefpunkts steht UNTER der Kurve und in der Lücke zwischen
 * den Marken bei x = 347 und 463, zweizeilig, weil es einzeilig fett die rechte Marke
 * berührte: dort liegt die Kurve bei y ≤ 284, das Label belegt x = 352 bis rund 413 und
 * y = 289 bis 316. Paarweise geprüft, kein Überlauf über 700 × 412.
 *
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 */
import { BBG_KV_MONAT, BBG_RV_MONAT } from '@/lib/berechnungen/brutto-netto';

const DATEN = [
  58.91, 58.75, 58.42, 58.17, 57.83, 57.67, 57.33, 57.08, 56.84, 56.58, 56.33, 56, 55.75, 55.5, 55.25, 55, 54.75,
  54.42, 54.17, 53.91, 53.67, 53.42, 53.08, 52.83, 52.59, 52.33, 52.08, 51.84, 51.5, 51.25, 51, 50.75, 50.5,
  50.25, 49.91, 49.67, 49.42, 49.16, 55.1, 55.73, 55.32, 54.98, 54.65, 54.4, 53.9, 53.65, 53.32, 52.98, 52.57,
  52.23, 51.98, 51.57, 51.32, 51.31, 51.32, 51.32, 51.3, 46.78, 46.79, 46.69, 46.79, 46.78, 46.78, 46.79, 49.84,
  53, 53.01, 53, 53, 53, 53, 53.01, 53, 53, 53, 53, 53.01, 53, 53, 53, 53, 53.01, 53, 53, 53, 53, 53.01, 53, 53,
  53, 53, 53.01, 54.63, 55.69, 55.69, 55.69, 55.69, 55.69, 55.69, 55.69, 55.69, 55.69, 55.69, 55.69, 55.69,
  55.69, 55.69, 55.69, 55.69, 55.69, 55.69, 55.69, 55.69, 55.69, 55.69, 55.69, 55.69, 55.69, 55.69, 55.69,
  55.69, 55.69, 55.69, 55.69, 55.69, 55.69, 55.69, 55.69, 55.69, 55.69, 55.69, 55.69, 55.69, 55.69, 55.69,
  55.69, 55.69, 55.69, 55.69,
];

const X_MIN = 2000;
const X_MAX = 16000;
const Y_MIN = 44;
const Y_MAX = 60;
const PX0 = 80;
const PX1 = 660;
const PY0 = 320;
const PY1 = 110;

const px = (x: number) => PX0 + ((x - X_MIN) / (X_MAX - X_MIN)) * (PX1 - PX0);
const py = (v: number) => PY0 - ((v - Y_MIN) / (Y_MAX - Y_MIN)) * (PY0 - PY1);

const punkte = DATEN.map((v, i) => `${px(X_MIN + i * 100 + 50).toFixed(1)},${py(v).toFixed(1)}`).join(' ');

const MARKEN = [
  { x: BBG_KV_MONAT, label: 'KV/PV-Grenze', reihe: 76 },
  { x: 7700, label: 'Soli ab', reihe: 92 },
  { x: BBG_RV_MONAT, label: 'RV/AV-Grenze', reihe: 76 },
  { x: 11240, label: 'Soli voll', reihe: 76 },
];

const X_TICKS = [2000, 4000, 6000, 8000, 10000, 12000, 14000, 16000];
const tausend = (n: number) => n.toLocaleString('de-DE');
const Y_TICKS = [44, 48, 52, 56, 60];
const TIEF_X = 7900 + 50;
const TIEF_Y = 46.69;

export default function GrenznettoKurve() {
  return (
    <figure className="my-8">
      <svg
        width="100%"
        viewBox="0 0 700 412"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        className="rounded-xl text-gray-900 dark:text-gray-100"
      >
        <title>Was von 100 Euro Gehaltserhöhung netto ankommt, nach Monatsbrutto</title>
        <desc>
          Liniendiagramm über ein Monatsbrutto von 2.000 bis 16.000 Euro, Steuerklasse eins, ohne
          Kinder und ohne Kirchensteuer. Bei 2.000 Euro kommen von 100 Euro mehr Brutto 58,91 Euro
          netto an, bei 5.000 Euro 51,00 Euro. Über der Beitragsbemessungsgrenze der Kranken- und
          Pflegeversicherung springt der Wert auf rund 55 Euro, sinkt dann wieder und erreicht
          zwischen 7.700 und 8.450 Euro mit rund 46,70 Euro seinen Tiefpunkt, weil dort der Soli
          einsetzt und die Rentenbeiträge noch laufen. Über der Rentengrenze sind es 53 Euro, ab
          11.240 Euro, wenn der Soli voll greift, 55,69 Euro.
        </desc>

        <style>{`
          .gn-t-rot { fill: #993C1D; }
          .gn-punkt { fill: #993C1D; }
          .dark .gn-t-rot { fill: #F0997B; }
          .dark .gn-punkt { fill: #F0997B; }
        `}</style>

        <text x="24" y="32" fontSize="17" fontWeight="700" fill="currentColor">
          Von 100 € mehr Brutto kommen netto an
        </text>
        <text x="24" y="52" fontSize="12" fill="#9ca3af">
          Steuerklasse I, kinderlos, ohne Kirchensteuer, Zusatzbeitrag 2,9 %, 2026
        </text>

        {Y_TICKS.map((v) => (
          <g key={`y${v}`}>
            <line x1={PX0} y1={py(v)} x2={PX1} y2={py(v)} stroke="#9ca3af" strokeOpacity="0.35" strokeWidth="1" />
            <text x={PX0 - 8} y={py(v) + 4} fontSize="11" textAnchor="end" fill="#9ca3af">{v} €</text>
          </g>
        ))}
        {X_TICKS.map((x) => (
          <text key={`x${x}`} x={px(x)} y={PY0 + 18} fontSize="11" textAnchor="middle" fill="#9ca3af">
            {tausend(x)}
          </text>
        ))}
        <text x={(PX0 + PX1) / 2} y={PY0 + 36} fontSize="11" textAnchor="middle" fill="#9ca3af">
          Monatsbrutto in Euro
        </text>

        {MARKEN.map((m) => (
          <g key={m.label}>
            <line x1={px(m.x)} y1={PY1 - 6} x2={px(m.x)} y2={PY0} stroke="#9ca3af" strokeWidth="1" strokeDasharray="4 3" />
            <text x={px(m.x) + 4} y={m.reihe} fontSize="11" fill="#9ca3af">{m.label}</text>
          </g>
        ))}

        <polyline points={punkte} fill="none" stroke="#185FA5" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx={px(TIEF_X)} cy={py(TIEF_Y)} r="4" className="gn-punkt" />
        <text x="352" y="298" fontSize="11" fontWeight="600" className="gn-t-rot">
          Tiefpunkt
        </text>
        <text x="352" y="313" fontSize="11" fontWeight="600" className="gn-t-rot">
          46,69 €
        </text>

        <text x="24" y="382" fontSize="11" fill="#9ca3af">
          Über den Beitragsgrenzen wird von jedem weiteren Euro nur noch Steuer abgezogen.
        </text>
        <text x="24" y="400" fontSize="11" fill="#9ca3af">
          Dafür wachsen dort auch Rente, Arbeitslosen- und Krankengeld nicht mehr mit.
        </text>
      </svg>
      <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
        Am wenigsten bleibt von einer Gehaltserhöhung zwischen rund 7.700 und 8.450 Euro brutto.
      </figcaption>
    </figure>
  );
}
