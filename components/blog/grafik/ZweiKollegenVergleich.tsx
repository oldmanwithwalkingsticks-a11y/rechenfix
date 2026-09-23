/**
 * ZweiKollegenVergleich — Blogartikel 20 (Kinder und Lohnsteuer)
 *
 * Die beiden Gehaltsabrechnungen aus dem Einstieg des Artikels nebeneinander:
 * 4.500 € brutto, Steuerklasse IV, Kirchensteuer 9 %, Zusatzbeitrag 2,9 %, einmal
 * ohne Kinder (älter als 23), einmal mit zwei Kindern unter 25 und Zähler 2,0.
 *
 * Werte: unabhängig aus den Gesetzestexten gerechnet und gegen den PAP 2026 geprüft
 * (Welle 147, scripts/verify-bruttonetto-zuschlaege.ts, Referenzfälle 1 und 2). Der
 * Brutto-Netto-Rechner liefert seit Welle 147 dieselben Zahlen auf den Cent.
 *
 * WARTUNG: Die Zahlen veralten zum 01.01.2027 mit Tarif und SV-Parametern. Beim
 * Jahresaudit gegen den Rechner neu lesen, nicht hochrechnen.
 *
 * Geometrie: Spalten rechtsbündig bei x = 420, 560, 676. Die längste Zeilenbeschriftung
 * („Pflegeversicherung“, 18 Zeichen bei Größe 13) endet bei x ≈ 153, der breiteste Wert
 * der ersten Spalte („2.812,58 €“, 10 Zeichen bei Größe 13, fett) beginnt bei x ≈ 342.
 * Paarweise geprüft, keine Kollision, kein Überlauf über 700 × 318.
 *
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 */
const X_OHNE = 420;
const X_MIT = 560;
const X_DIFF = 676;

const zeilen = [
  { y: 124, label: 'Lohnsteuer', ohne: '650,16 €', mit: '662,50 €', diff: '+12,34 €', ton: 'rot' },
  { y: 156, label: 'Kirchensteuer', ohne: '58,51 €', mit: '37,11 €', diff: '−21,40 €', ton: 'gruen' },
  { y: 188, label: 'Pflegeversicherung', ohne: '108,00 €', mit: '69,75 €', diff: '−38,25 €', ton: 'gruen' },
] as const;

export default function ZweiKollegenVergleich() {
  return (
    <figure className="my-8">
      <svg
        width="100%"
        viewBox="0 0 700 318"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        className="rounded-xl text-gray-900 dark:text-gray-100"
      >
        <title>Zwei Gehaltsabrechnungen mit gleichem Brutto, einmal ohne und einmal mit zwei Kindern</title>
        <desc>
          Zwei Kollegen verdienen je 4.500 Euro brutto im Monat, beide in Steuerklasse vier und
          kirchensteuerpflichtig. Ohne Kinder beträgt die Lohnsteuer 650,16 Euro, mit zwei Kindern
          662,50 Euro, also 12,34 Euro mehr. Die Kirchensteuer sinkt mit zwei Kindern von 58,51 auf
          37,11 Euro, die Pflegeversicherung von 108,00 auf 69,75 Euro. Netto bleiben ohne Kinder
          2.812,58 Euro, mit zwei Kindern 2.859,89 Euro, also 47,31 Euro mehr. Kranken-, Renten-
          und Arbeitslosenversicherung sind bei beiden gleich, Solidaritätszuschlag fällt nicht an.
        </desc>

        <style>{`
          .zk-netto { fill: #E1F5EE; }
          .zk-t-rot { fill: #993C1D; }
          .zk-t-gruen { fill: #0F6E56; }
          .dark .zk-netto { fill: #1E3A32; }
          .dark .zk-t-rot { fill: #F0997B; }
          .dark .zk-t-gruen { fill: #5DCAA5; }
        `}</style>

        <text x="24" y="32" fontSize="17" fontWeight="700" fill="currentColor">
          Gleiches Brutto, zwei Abrechnungen
        </text>
        <text x="24" y="52" fontSize="12" fill="#9ca3af">
          4.500 € brutto, Steuerklasse IV, Kirchensteuer 9 %, Monatswerte 2026
        </text>

        <text x={X_OHNE} y="92" fontSize="12" textAnchor="end" fill="#9ca3af">ohne Kinder</text>
        <text x={X_MIT} y="92" fontSize="12" textAnchor="end" fill="#9ca3af">zwei Kinder</text>
        <text x={X_DIFF} y="92" fontSize="12" textAnchor="end" fill="#9ca3af">Unterschied</text>
        <line x1="24" y1="102" x2="676" y2="102" stroke="#d1d5db" strokeWidth="1" />

        {zeilen.map((z) => (
          <g key={z.label}>
            <text x="24" y={z.y} fontSize="13" fill="currentColor">{z.label}</text>
            <text x={X_OHNE} y={z.y} fontSize="13" textAnchor="end" fill="currentColor">{z.ohne}</text>
            <text x={X_MIT} y={z.y} fontSize="13" textAnchor="end" fill="currentColor">{z.mit}</text>
            <text
              x={X_DIFF}
              y={z.y}
              fontSize="13"
              fontWeight="600"
              textAnchor="end"
              className={z.ton === 'rot' ? 'zk-t-rot' : 'zk-t-gruen'}
            >
              {z.diff}
            </text>
          </g>
        ))}

        <rect x="16" y="204" width="668" height="36" rx="6" className="zk-netto" />
        <text x="24" y="228" fontSize="13" fontWeight="700" fill="currentColor">Netto</text>
        <text x={X_OHNE} y="228" fontSize="13" fontWeight="700" textAnchor="end" fill="currentColor">2.812,58 €</text>
        <text x={X_MIT} y="228" fontSize="13" fontWeight="700" textAnchor="end" fill="currentColor">2.859,89 €</text>
        <text x={X_DIFF} y="228" fontSize="13" fontWeight="700" textAnchor="end" className="zk-t-gruen">+47,31 €</text>

        <line x1="24" y1="258" x2="676" y2="258" stroke="#d1d5db" strokeWidth="1" />
        <text x="24" y="280" fontSize="11" fill="#9ca3af">
          Bei beiden gleich: Kranken- 393,75 €, Renten- 418,50 € und Arbeitslosenversicherung 58,50 €, Soli 0 €.
        </text>
        <text x="24" y="300" fontSize="11" fill="#9ca3af">
          Unterschied = zwei Kinder minus ohne Kinder. Das Kindergeld zahlt die Familienkasse, nicht der Arbeitgeber.
        </text>
      </svg>
      <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
        Mit zwei Kindern steigt die Lohnsteuer um 12,34 Euro – und das Netto trotzdem um 47,31 Euro.
      </figcaption>
    </figure>
  );
}
