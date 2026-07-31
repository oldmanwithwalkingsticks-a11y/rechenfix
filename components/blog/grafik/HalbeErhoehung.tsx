/**
 * Grafik: Der Durchschnitt, den kein einzelner Kunde bezahlte.
 * Sonderauswertung des Einzelpreismaterials, Deutsche Bundesbank, Monatsbericht
 * Januar 2004: Im Januar 2002 hob nur rund die Hälfte der beobachteten
 * Friseursalons die Preise an — diese aber im Mittel um rund 6 Prozent.
 * Amtlich ausgewiesen wurde ein Bundesdurchschnitt von 1,9 Prozent.
 *
 * Layout-Entscheidung: 100 Quadrate im 10x10-Raster, jedes zweite hervorgehoben.
 * Das abwechselnde Muster zeigt „rund die Hälfte“, ohne eine Ordnung zu
 * behaupten, die es in den Daten nicht gibt. Die Beschriftungen stehen als
 * Legende rechts neben dem Raster, nicht an den Quadraten.
 *
 * Korrektur nach Sichtprüfung Welle 47: Bei Schrittweite 28 endete die zehnte
 * Rasterzeile bei y=366 und lief durch Trennlinie und Schlusstext. Jetzt
 * Schrittweite 24 bei 19 px Kantenlänge, Raster endet bei y=327, Trennlinie
 * bei y=348. Regel für spätere Änderungen: RASTER_Y + 9 * SCHRITT + KANTE muss
 * kleiner bleiben als die y-Position der Trennlinie.
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 * Muster: components/blog/grafik/MehlStreuung.tsx.
 */
const RASTER_X = 30;
const RASTER_Y = 92;
const SCHRITT = 24;
const KANTE = 19;

const felder = Array.from({ length: 100 }, (_, i) => ({
  i,
  x: RASTER_X + (i % 10) * SCHRITT,
  y: RASTER_Y + Math.floor(i / 10) * SCHRITT,
  erhoeht: i % 2 === 1,
}));

const legende = [
  { klasse: 'ruhig', titel: '50 Salons', text: 'Preis blieb unverändert' },
  { klasse: 'aktiv', titel: '50 Salons', text: 'erhöhten im Mittel um rund 6 %' },
] as const;

export default function HalbeErhoehung() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 400" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .f-ruhig { fill: #e5e7eb; }
          .f-aktiv { fill: #993C1D; }
          .schnitt { fill: #FAEEDA; stroke: #854F0B; }
          .dark .f-ruhig { fill: #4b5563; }
          .dark .f-aktiv { fill: #F0A88C; }
          .dark .schnitt { fill: #3A3222; }
        `}</style>
        <title>Preisänderungen bei Friseursalons im Januar 2002</title>
        <desc>
          Hundert Quadrate stehen für hundert beobachtete Friseursalons. Rund die Hälfte ließ die
          Preise im Januar 2002 unverändert, die andere Hälfte erhöhte im Mittel um rund sechs
          Prozent. Der amtlich ausgewiesene Bundesdurchschnitt lag bei 1,9 Prozent und traf damit
          auf keinen einzelnen Betrieb zu.
        </desc>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Januar 2002: Was beim Friseur wirklich passierte</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">Jedes Quadrat ist ein Salon aus der Sonderauswertung der Einzelpreise.</text>

        {felder.map((f) => (
          <rect key={f.i} x={f.x} y={f.y} width={KANTE} height={KANTE} rx="3" className={f.erhoeht ? 'f-aktiv' : 'f-ruhig'} />
        ))}

        {legende.map((l, i) => (
          <g key={l.text}>
            <rect x="360" y={110 + i * 62} width="19" height="19" rx="3" className={`f-${l.klasse}`} />
            <text x="392" y={124 + i * 62} fontSize="14" fontWeight="600" fill="currentColor">{l.titel}</text>
            <text x="392" y={144 + i * 62} fontSize="12" fill="#9ca3af">{l.text}</text>
          </g>
        ))}

        <rect className="schnitt" x="360" y="238" width="288" height="66" rx="8" strokeWidth="1" />
        <text x="378" y="264" fontSize="12" fill="#9ca3af">Amtlich ausgewiesen wurde</text>
        <text x="378" y="290" fontSize="20" fontWeight="600" fill="currentColor">+1,9 % im Bundesdurchschnitt</text>

        <line x1="24" y1="348" x2="656" y2="348" stroke="#d1d5db" strokeWidth="1" />
        <text x="24" y="366" fontSize="12" fill="#9ca3af">Wer zu einem Salon der einen Hälfte ging, zahlte sechs Prozent mehr. Wer zur anderen ging, gar nichts.</text>
        <text x="24" y="384" fontSize="12" fill="#9ca3af">Den Durchschnitt von 1,9 Prozent bezahlte niemand.</text>
      </svg>
    </figure>
  );
}
