/**
 * Grafik: Die Washingtoner Meridiankonferenz 1884 — Beschlüsse und Nicht-Beschlüsse.
 * Server-Komponente, statisch. Kern der Grafik ist die Gegenüberstellung: der
 * Nullmeridian wurde beschlossen (22 Ja, 1 Nein, 2 Enthaltungen), die Einteilung
 * in 24 Zeitzonen dagegen kam nie zur Abstimmung.
 * Quelle: Protokoll der Konferenz, Sitzung vom 13.10.1884.
 *
 * Layout-Rechnung: unterste Inhaltskante ist die Fußzeile bei y=328,
 * darunter der rechte Kasten endet bei y=306. viewBox-Höhe 348 → 20 px Rand
 * unter der Fußzeile, 22 px zwischen Kastenunterkante und Fußzeile.
 * Zielpfad: components/blog/grafik/WasWashingtonBeschloss.tsx
 */
export default function WasWashingtonBeschloss() {
  return (
    <figure className="my-8">
      <svg
        width="100%"
        viewBox="0 0 680 348"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        className="rounded-xl text-gray-900 dark:text-gray-100"
      >
        <title>Beschlüsse und Nicht-Beschlüsse der Meridiankonferenz von 1884</title>
        <desc>
          Die Internationale Meridiankonferenz in Washington beschloss 1884 den Meridian von
          Greenwich als Nullmeridian, mit zweiundzwanzig Ja-Stimmen, einer Gegenstimme aus
          San Domingo und zwei Enthaltungen von Frankreich und Brasilien. Ebenfalls
          beschlossen wurden die Zählung der Längengrade in beide Richtungen bis
          hundertachtzig Grad und ein universeller Tag. Die oft behauptete Einteilung der
          Erde in vierundzwanzig Zeitzonen wurde dagegen nie zur Abstimmung gestellt:
          Vorschläge dazu, unter anderem von Sandford Fleming, wurden als außerhalb des
          Konferenzauftrags zurückgewiesen.
        </desc>

        <style>{`
          .b-mint  { fill: #E1F5EE; }
          .t-teal  { fill: #0F6E56; }
          .b-rosa  { fill: #FAECE7; }
          .t-coral { fill: #993C1D; }
          .dark .b-mint  { fill: #1E3A32; }
          .dark .t-teal  { fill: #5DCAA5; }
          .dark .b-rosa  { fill: #3A2A22; }
          .dark .t-coral { fill: #F0997B; }
        `}</style>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">
          Washington 1884 — und die Legende
        </text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">
          41 Delegierte aus 25 Nationen. Abgestimmt wurde am 13. Oktober.
        </text>

        {/* Linke Spalte: beschlossen */}
        <rect className="b-mint" x="24" y="76" width="308" height="230" stroke="#0F6E56" strokeWidth="1.5" rx="8" />
        <text x="44" y="104" fontSize="14" fontWeight="500" className="t-teal">Beschlossen</text>

        <text x="44" y="132" fontSize="12" fill="currentColor">Ein gemeinsamer Nullmeridian</text>
        <text x="44" y="150" fontSize="12" fill="#9ca3af">einstimmig angenommen</text>

        <text x="44" y="180" fontSize="12" fill="currentColor">Der Meridian von Greenwich</text>
        {/* Stimmen als Kästchen: 22 ja, 1 nein, 2 Enthaltung */}
        <g>
          {Array.from({ length: 22 }).map((_, i) => (
            <rect
              key={`ja-${i}`}
              x={44 + (i % 11) * 15}
              y={192 + Math.floor(i / 11) * 15}
              width="11"
              height="11"
              rx="2"
              fill="#1D9E75"
            />
          ))}
          <rect x="212" y="192" width="11" height="11" rx="2" fill="#993C1D" />
          <rect x="212" y="207" width="11" height="11" rx="2" fill="#9ca3af" />
          <rect x="227" y="207" width="11" height="11" rx="2" fill="#9ca3af" />
        </g>
        <text x="44" y="238" fontSize="12" fill="#9ca3af">22 dafür · 1 dagegen · 2 Enthaltungen</text>
        <text x="44" y="256" fontSize="12" fill="#9ca3af">Dagegen: San Domingo. Enthalten:</text>
        <text x="44" y="272" fontSize="12" fill="#9ca3af">Frankreich und Brasilien.</text>
        <text x="44" y="292" fontSize="12" fill="currentColor">Dazu: ein universeller Tag</text>

        {/* Rechte Spalte: nicht beschlossen */}
        <rect className="b-rosa" x="348" y="76" width="308" height="230" stroke="#993C1D" strokeWidth="1.5" rx="8" />
        <text x="368" y="104" fontSize="14" fontWeight="500" className="t-coral">Nicht abgestimmt</text>

        <text x="368" y="132" fontSize="12" fill="currentColor">Die Einteilung der Erde in</text>
        <text x="368" y="150" fontSize="12" fill="currentColor">24 Zeitzonen zu je 15 Grad</text>

        <text x="368" y="182" fontSize="12" fill="#9ca3af">Zwei Delegierte, darunter Sandford</text>
        <text x="368" y="198" fontSize="12" fill="#9ca3af">Fleming, schlugen eine einheitliche</text>
        <text x="368" y="214" fontSize="12" fill="#9ca3af">Standardzeit vor. Andere hielten das</text>
        <text x="368" y="230" fontSize="12" fill="#9ca3af">für außerhalb des Auftrags. Keiner</text>
        <text x="368" y="246" fontSize="12" fill="#9ca3af">der beiden Vorschläge kam zur</text>
        <text x="368" y="262" fontSize="12" fill="#9ca3af">Abstimmung.</text>

        <text x="368" y="292" fontSize="12" className="t-coral">Die Zeitzonen kamen durch Nachahmung.</text>

        <text x="24" y="328" fontSize="12" fill="#9ca3af">
          Frankreich übernahm den Greenwich-Meridian auf seinen Karten erst 1911 — 27 Jahre nach der Abstimmung.
        </text>
      </svg>
    </figure>
  );
}
