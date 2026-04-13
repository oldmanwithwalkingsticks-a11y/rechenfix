'use client';

import { useState, useMemo } from 'react';
import {
  berechneFlaeche,
  FORM_OPTIONEN,
  EINHEIT_OPTIONEN,
  type FormTyp,
  type Einheit,
} from '@/lib/berechnungen/flaeche';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';

const EINHEIT_LABELS: Record<Einheit, string> = {
  mm: 'mm', cm: 'cm', m: 'm', km: 'km', zoll: 'Zoll', fuss: 'Fuß',
};

export default function FlaechenRechner() {
  const [form, setForm] = useState<FormTyp>('rechteck');
  const [einheit, setEinheit] = useState<Einheit>('cm');

  // Rechteck
  const [laenge, setLaenge] = useState('5');
  const [breite, setBreite] = useState('3');
  // Dreieck
  const [grundseite, setGrundseite] = useState('6');
  const [hoehe, setHoehe] = useState('4');
  const [seiteB, setSeiteB] = useState('');
  const [seiteC, setSeiteC] = useState('');
  // Kreis
  const [radius, setRadius] = useState('5');
  const [durchmesserModus, setDurchmesserModus] = useState(false);
  // Trapez
  const [trapezA, setTrapezA] = useState('8');
  const [trapezC, setTrapezC] = useState('4');
  const [trapezH, setTrapezH] = useState('5');
  const [trapezB, setTrapezB] = useState('');
  const [trapezD, setTrapezD] = useState('');
  // Parallelogramm
  const [paraA, setParaA] = useState('7');
  const [paraH, setParaH] = useState('4');
  const [paraB, setParaB] = useState('5');
  // Raute
  const [diag1, setDiag1] = useState('6');
  const [diag2, setDiag2] = useState('8');
  // Sechseck
  const [seitenlaenge, setSeitenlaenge] = useState('4');
  // Ellipse
  const [halbA, setHalbA] = useState('6');
  const [halbB, setHalbB] = useState('4');

  const e = EINHEIT_LABELS[einheit];

  const effektiverRadius = useMemo(() => {
    const r = parseDeutscheZahl(radius);
    return durchmesserModus ? r / 2 : r;
  }, [radius, durchmesserModus]);

  const eingabe = useMemo(() => ({
    form,
    einheit,
    laenge: parseDeutscheZahl(laenge),
    breite: parseDeutscheZahl(breite),
    grundseite: parseDeutscheZahl(grundseite),
    hoehe: parseDeutscheZahl(hoehe),
    seiteB: parseDeutscheZahl(seiteB),
    seiteC: parseDeutscheZahl(seiteC),
    radius: effektiverRadius,
    seiteA: parseDeutscheZahl(trapezA),
    seiteCTrapez: parseDeutscheZahl(trapezC),
    hoeheTrapez: parseDeutscheZahl(trapezH),
    seiteBTrapez: parseDeutscheZahl(trapezB),
    seiteDTrapez: parseDeutscheZahl(trapezD),
    grundseiteP: parseDeutscheZahl(paraA),
    hoeheP: parseDeutscheZahl(paraH),
    seiteBP: parseDeutscheZahl(paraB),
    diagonale1: parseDeutscheZahl(diag1),
    diagonale2: parseDeutscheZahl(diag2),
    seitenlaenge: parseDeutscheZahl(seitenlaenge),
    halbachseA: parseDeutscheZahl(halbA),
    halbachseB: parseDeutscheZahl(halbB),
  }), [form, einheit, laenge, breite, grundseite, hoehe, seiteB, seiteC, effektiverRadius, trapezA, trapezC, trapezH, trapezB, trapezD, paraA, paraH, paraB, diag1, diag2, seitenlaenge, halbA, halbB]);

  const ergebnis = useMemo(() => berechneFlaeche(eingabe), [eingabe]);

  const fmtZ = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 4 });

  // SVG-Grafik für die jeweilige Form
  function renderSVG() {
    const w = 200;
    const h = 140;
    const pad = 20;
    const cX = w / 2;
    const cY = h / 2;

    const labelClass = 'fill-gray-600 dark:fill-gray-300 text-[10px] font-medium';
    const shapeClass = 'fill-primary-100 dark:fill-primary-500/20 stroke-primary-500 dark:stroke-primary-400';

    switch (form) {
      case 'rechteck': {
        const rw = w - pad * 2;
        const rh = h - pad * 2;
        return (
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[240px]">
            <rect x={pad} y={pad} width={rw} height={rh} className={shapeClass} strokeWidth="2" />
            <text x={cX} y={h - 4} textAnchor="middle" className={labelClass}>a = {laenge} {e}</text>
            <text x={w - 4} y={cY} textAnchor="end" className={labelClass} transform={`rotate(-90, ${w - 8}, ${cY})`}>b = {breite} {e}</text>
          </svg>
        );
      }
      case 'dreieck': {
        const x1 = pad, y1 = h - pad;
        const x2 = w - pad, y2 = h - pad;
        const x3 = cX, y3 = pad;
        return (
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[240px]">
            <polygon points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`} className={shapeClass} strokeWidth="2" />
            <line x1={x3} y1={y3} x2={x3} y2={y2} stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,3" />
            <text x={cX} y={h - 4} textAnchor="middle" className={labelClass}>a = {grundseite} {e}</text>
            <text x={x3 + 14} y={cY + 4} className={labelClass}>h = {hoehe} {e}</text>
          </svg>
        );
      }
      case 'kreis': {
        const r = Math.min(cX, cY) - pad;
        return (
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[240px]">
            <circle cx={cX} cy={cY} r={r} className={shapeClass} strokeWidth="2" />
            <line x1={cX} y1={cY} x2={cX + r} y2={cY} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,3" />
            <text x={cX + r / 2} y={cY - 6} textAnchor="middle" className={labelClass}>r = {durchmesserModus ? fmtZ(effektiverRadius) : radius} {e}</text>
          </svg>
        );
      }
      case 'trapez': {
        const bTop = 60, bBot = 160;
        const topX = cX - bTop / 2, topX2 = cX + bTop / 2;
        const botX = cX - bBot / 2, botX2 = cX + bBot / 2;
        const yTop = pad + 10, yBot = h - pad;
        return (
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[240px]">
            <polygon points={`${botX},${yBot} ${botX2},${yBot} ${topX2},${yTop} ${topX},${yTop}`} className={shapeClass} strokeWidth="2" />
            <text x={cX} y={h - 4} textAnchor="middle" className={labelClass}>a = {trapezA} {e}</text>
            <text x={cX} y={yTop - 4} textAnchor="middle" className={labelClass}>c = {trapezC} {e}</text>
            <line x1={topX2 + 8} y1={yTop} x2={topX2 + 8} y2={yBot} stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,3" />
            <text x={topX2 + 14} y={cY + 4} className={labelClass}>h</text>
          </svg>
        );
      }
      case 'parallelogramm': {
        const off = 30;
        const x1 = pad + off, y1 = pad;
        const x2 = w - pad, y2 = pad;
        const x3 = w - pad - off, y3 = h - pad;
        const x4 = pad, y4 = h - pad;
        return (
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[240px]">
            <polygon points={`${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4}`} className={shapeClass} strokeWidth="2" />
            <text x={cX} y={h - 4} textAnchor="middle" className={labelClass}>a = {paraA} {e}</text>
            <line x1={x1} y1={y1} x2={x1} y2={y4} stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,3" />
            <text x={x1 + 10} y={cY + 4} className={labelClass}>h = {paraH} {e}</text>
          </svg>
        );
      }
      case 'raute': {
        const rx = 70, ry = 45;
        return (
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[240px]">
            <polygon points={`${cX},${cY - ry} ${cX + rx},${cY} ${cX},${cY + ry} ${cX - rx},${cY}`} className={shapeClass} strokeWidth="2" />
            <line x1={cX - rx} y1={cY} x2={cX + rx} y2={cY} stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,3" />
            <line x1={cX} y1={cY - ry} x2={cX} y2={cY + ry} stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,3" />
            <text x={cX} y={h - 2} textAnchor="middle" className={labelClass}>d₁ = {diag1} {e}</text>
            <text x={w - 6} y={cY - 4} textAnchor="end" className={labelClass}>d₂ = {diag2} {e}</text>
          </svg>
        );
      }
      case 'sechseck': {
        const r = Math.min(cX, cY) - pad;
        const points = Array.from({ length: 6 }, (_, i) => {
          const angle = (Math.PI / 3) * i - Math.PI / 2;
          return `${cX + r * Math.cos(angle)},${cY + r * Math.sin(angle)}`;
        }).join(' ');
        return (
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[240px]">
            <polygon points={points} className={shapeClass} strokeWidth="2" />
            <text x={cX} y={h - 2} textAnchor="middle" className={labelClass}>a = {seitenlaenge} {e}</text>
          </svg>
        );
      }
      case 'ellipse': {
        const rx = (w - pad * 2) / 2;
        const ry = (h - pad * 2) / 2;
        return (
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[240px]">
            <ellipse cx={cX} cy={cY} rx={rx} ry={ry} className={shapeClass} strokeWidth="2" />
            <line x1={cX} y1={cY} x2={cX + rx} y2={cY} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,3" />
            <line x1={cX} y1={cY} x2={cX} y2={cY - ry} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,3" />
            <text x={cX + rx / 2} y={cY + 14} textAnchor="middle" className={labelClass}>a = {halbA} {e}</text>
            <text x={cX + 14} y={cY - ry / 2} className={labelClass}>b = {halbB} {e}</text>
          </svg>
        );
      }
      default:
        return null;
    }
  }

  // Eingabefelder je nach Form
  function renderEingaben() {
    switch (form) {
      case 'rechteck':
        return (
          <>
            <Feld label={`Länge (a)`} value={laenge} onChange={setLaenge} einheit={e} />
            <Feld label={`Breite (b)`} value={breite} onChange={setBreite} einheit={e} />
          </>
        );
      case 'dreieck':
        return (
          <>
            <Feld label="Grundseite (a)" value={grundseite} onChange={setGrundseite} einheit={e} />
            <Feld label="Höhe (h)" value={hoehe} onChange={setHoehe} einheit={e} hinweis="Oder leer lassen und 3 Seiten eingeben (Heron)" />
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Für Umfang / Heron-Formel (optional):</p>
              <div className="grid grid-cols-2 gap-3">
                <Feld label="Seite b" value={seiteB} onChange={setSeiteB} einheit={e} small />
                <Feld label="Seite c" value={seiteC} onChange={setSeiteC} einheit={e} small />
              </div>
            </div>
          </>
        );
      case 'kreis':
        return (
          <>
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => setDurchmesserModus(false)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  !durchmesserModus
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
                }`}
              >
                Radius
              </button>
              <button
                onClick={() => setDurchmesserModus(true)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  durchmesserModus
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'
                }`}
              >
                Durchmesser
              </button>
            </div>
            <Feld label={durchmesserModus ? 'Durchmesser (d)' : 'Radius (r)'} value={radius} onChange={setRadius} einheit={e} />
          </>
        );
      case 'trapez':
        return (
          <>
            <Feld label="Seite a (unten)" value={trapezA} onChange={setTrapezA} einheit={e} />
            <Feld label="Seite c (oben)" value={trapezC} onChange={setTrapezC} einheit={e} />
            <Feld label="Höhe (h)" value={trapezH} onChange={setTrapezH} einheit={e} />
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Für Umfang (optional):</p>
              <div className="grid grid-cols-2 gap-3">
                <Feld label="Seite b" value={trapezB} onChange={setTrapezB} einheit={e} small />
                <Feld label="Seite d" value={trapezD} onChange={setTrapezD} einheit={e} small />
              </div>
            </div>
          </>
        );
      case 'parallelogramm':
        return (
          <>
            <Feld label="Grundseite (a)" value={paraA} onChange={setParaA} einheit={e} />
            <Feld label="Höhe (h)" value={paraH} onChange={setParaH} einheit={e} />
            <Feld label="Seite b (für Umfang)" value={paraB} onChange={setParaB} einheit={e} />
          </>
        );
      case 'raute':
        return (
          <>
            <Feld label="Diagonale d₁" value={diag1} onChange={setDiag1} einheit={e} />
            <Feld label="Diagonale d₂" value={diag2} onChange={setDiag2} einheit={e} />
          </>
        );
      case 'sechseck':
        return <Feld label="Seitenlänge (a)" value={seitenlaenge} onChange={setSeitenlaenge} einheit={e} />;
      case 'ellipse':
        return (
          <>
            <Feld label="Halbachse a (groß)" value={halbA} onChange={setHalbA} einheit={e} />
            <Feld label="Halbachse b (klein)" value={halbB} onChange={setHalbB} einheit={e} />
          </>
        );
      default:
        return null;
    }
  }

  return (
    <div>
      {/* Form auswählen */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Form auswählen</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {FORM_OPTIONEN.map(f => (
            <button
              key={f.value}
              onClick={() => setForm(f.value)}
              className={`flex items-center gap-2 px-3 py-3 rounded-xl text-sm font-medium transition-all min-h-[48px] ${
                form === f.value
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <span className="text-lg">{f.icon}</span>
              <span>{f.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Einheit */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Einheit</label>
        <select
          value={einheit}
          onChange={ev => setEinheit(ev.target.value as Einheit)}
          className="w-full sm:w-1/3 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm min-h-[48px]"
        >
          {EINHEIT_OPTIONEN.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Dynamische Eingabefelder */}
      <div className="mb-6 space-y-4">
        {renderEingaben()}
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <p className="text-white/80 text-sm mb-1">Fläche</p>
                <p className="text-4xl sm:text-5xl font-bold">{fmtZ(ergebnis.flaeche)} {e}²</p>
              </div>
              <div className="sm:text-right space-y-1">
                {ergebnis.umfang !== null && (
                  <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                    Umfang: {fmtZ(ergebnis.umfang)} {e}
                  </span>
                )}
                {ergebnis.diagonale !== null && (
                  <div>
                    <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                      Diagonale: {fmtZ(ergebnis.diagonale)} {e}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SVG + Formel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* SVG-Grafik */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex items-center justify-center">
              {renderSVG()}
            </div>

            {/* Formel + Rechenweg */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5">
              <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Formel &amp; Rechenweg</h3>
              <div className="space-y-2">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                  <p className="text-sm font-mono text-primary-600 dark:text-primary-400">{ergebnis.formelText}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                  <p className="text-sm font-mono text-gray-700 dark:text-gray-300">{ergebnis.rechenweg}</p>
                </div>
                {ergebnis.umfang !== null && (
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                    <p className="text-sm font-mono text-gray-700 dark:text-gray-300">U = {fmtZ(ergebnis.umfang)} {e}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Aufschlüsselung */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Ergebnisse</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Fläche</span>
                <span className="font-bold text-primary-600 dark:text-primary-400">{fmtZ(ergebnis.flaeche)} {e}²</span>
              </div>
              {ergebnis.umfang !== null && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Umfang{form === 'ellipse' ? ' (Näherung)' : ''}</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{fmtZ(ergebnis.umfang)} {e}</span>
                </div>
              )}
              {ergebnis.diagonale !== null && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Diagonale</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{fmtZ(ergebnis.diagonale)} {e}</span>
                </div>
              )}
            </div>
          </div>

          {/* Einheiten-Umrechnung */}
          {ergebnis.umrechnungen.length > 0 && (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
              <div className="px-5 pt-4 pb-2">
                <h3 className="font-bold text-gray-700 dark:text-gray-200">Umrechnung</h3>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/50 text-left">
                    <th className="px-5 py-2.5 font-semibold text-gray-700 dark:text-gray-300">Einheit</th>
                    <th className="px-5 py-2.5 font-semibold text-gray-700 dark:text-gray-300 text-right">Fläche</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  <tr className="bg-primary-50 dark:bg-primary-500/10 font-semibold">
                    <td className="px-5 py-2.5 text-primary-700 dark:text-primary-400">{e}² ✓</td>
                    <td className="px-5 py-2.5 text-right tabular-nums text-primary-700 dark:text-primary-400">{fmtZ(ergebnis.flaeche)}</td>
                  </tr>
                  {ergebnis.umrechnungen.map(u => (
                    <tr key={u.einheit} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                      <td className="px-5 py-2.5 text-gray-800 dark:text-gray-200">{u.flaechenEinheit}</td>
                      <td className="px-5 py-2.5 text-right tabular-nums text-gray-600 dark:text-gray-400">{u.flaeche.toLocaleString('de-DE', { maximumFractionDigits: 6 })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Hinweis */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
            <p className="text-amber-800 dark:text-amber-300 text-xs">
              <strong>Tipp:</strong> Achten Sie darauf, alle Maße in der gleichen Einheit einzugeben. Der Rechner rundet auf 4 Nachkommastellen. Für Raumflächen nutzen Sie auch unseren Quadratmeter-Rechner.
            </p>
          </div>

          <ErgebnisAktionen
            ergebnisText={`${FORM_OPTIONEN.find(f => f.value === form)?.label}: Fläche = ${fmtZ(ergebnis.flaeche)} ${e}²${ergebnis.umfang !== null ? ` | Umfang = ${fmtZ(ergebnis.umfang)} ${e}` : ''}${ergebnis.diagonale !== null ? ` | Diagonale = ${fmtZ(ergebnis.diagonale)} ${e}` : ''}`}
            seitenTitel="Flächenrechner"
          />

          <AiExplain
            rechnerName="Flächenrechner"
            eingaben={{
              form: FORM_OPTIONEN.find(f => f.value === form)?.label ?? form,
              einheit: e,
              formel: ergebnis.formelText,
              rechenweg: ergebnis.rechenweg,
            }}
            ergebnis={{
              flaeche: `${ergebnis.flaeche} ${e}²`,
              ...(ergebnis.umfang !== null ? { umfang: `${ergebnis.umfang} ${e}` } : {}),
              ...(ergebnis.diagonale !== null ? { diagonale: `${ergebnis.diagonale} ${e}` } : {}),
            }}
          />
        </>
      )}
    </div>
  );
}

// Hilfskomponente für ein Eingabefeld
function Feld({ label, value, onChange, einheit, hinweis, small }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  einheit: string;
  hinweis?: string;
  small?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
      <div className={small ? 'w-full' : 'w-full sm:w-1/2'}>
        <NummerEingabe value={value} onChange={onChange} placeholder="0" einheit={einheit} />
      </div>
      {hinweis && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{hinweis}</p>}
    </div>
  );
}
