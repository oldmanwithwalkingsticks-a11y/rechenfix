'use client';

import { useState, useMemo } from 'react';
import { berechnePotenz, berechneWurzel, berechneLogarithmus } from '@/lib/berechnungen/potenz';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import TabGroup from '@/components/ui/TabGroup';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

const TABS = [
  { id: 'potenz', label: 'Potenz (xⁿ)' },
  { id: 'wurzel', label: 'Wurzel (ⁿ√x)' },
  { id: 'log', label: 'Logarithmus (logₐx)' },
];

const POTENZGESETZE = [
  { regel: 'aⁿ × aᵐ = aⁿ⁺ᵐ', name: 'Multiplikation' },
  { regel: 'aⁿ ÷ aᵐ = aⁿ⁻ᵐ', name: 'Division' },
  { regel: '(aⁿ)ᵐ = aⁿ·ᵐ', name: 'Potenz einer Potenz' },
  { regel: 'a⁰ = 1', name: 'Nullter Exponent' },
  { regel: 'a⁻ⁿ = 1 ÷ aⁿ', name: 'Negativer Exponent' },
  { regel: 'ⁿ√a = a^(1/n)', name: 'Wurzel als Potenz' },
];

export default function PotenzRechner() {
  const [tab, setTab] = useState('potenz');
  const [basis, setBasis] = useState('2');
  const [exponent, setExponent] = useState('10');
  const [radikand, setRadikand] = useState('144');
  const [wurzelgrad, setWurzelgrad] = useState('2');
  const [logZahl, setLogZahl] = useState('100');
  const [logBasis, setLogBasis] = useState('10');

  const fmtNum = (n: number) => {
    if (Number.isInteger(n) && Math.abs(n) < 1e15) return n.toLocaleString('de-DE');
    return n.toLocaleString('de-DE', { maximumSignificantDigits: 10 });
  };

  const potenzErgebnis = useMemo(() => {
    const b = parseDeutscheZahl(basis);
    const e = parseDeutscheZahl(exponent);
    if (!Number.isFinite(b) || !Number.isFinite(e)) return null;
    const result = berechnePotenz(b, e);
    if (!Number.isFinite(result.ergebnis)) return null;
    return result;
  }, [basis, exponent]);

  const wurzelErgebnis = useMemo(() => {
    const r = parseDeutscheZahl(radikand);
    const g = parseDeutscheZahl(wurzelgrad);
    if (r < 0 || g < 1 || !Number.isFinite(r) || !Number.isFinite(g)) return null;
    return berechneWurzel(r, g);
  }, [radikand, wurzelgrad]);

  const logErgebnis = useMemo(() => {
    const z = parseDeutscheZahl(logZahl);
    const b = parseDeutscheZahl(logBasis);
    if (z <= 0 || b <= 0 || b === 1) return null;
    return berechneLogarithmus(z, b);
  }, [logZahl, logBasis]);

  const ergebnisText = useMemo(() => {
    if (tab === 'potenz' && potenzErgebnis) return `${fmtNum(potenzErgebnis.basis)}^${potenzErgebnis.exponent} = ${fmtNum(potenzErgebnis.ergebnis)}`;
    if (tab === 'wurzel' && wurzelErgebnis) return `${wurzelErgebnis.grad === 2 ? '√' : wurzelErgebnis.grad + '√'}${fmtNum(wurzelErgebnis.radikand)} = ${fmtNum(wurzelErgebnis.ergebnis)}`;
    if (tab === 'log' && logErgebnis) return `log_${fmtNum(logErgebnis.basis)}(${fmtNum(logErgebnis.zahl)}) = ${fmtNum(logErgebnis.ergebnis)}`;
    return '';
  }, [tab, potenzErgebnis, wurzelErgebnis, logErgebnis]);

  return (
    <div>
      <TabGroup tabs={TABS} activeId={tab} onChange={setTab} ariaLabel="Berechnungsmodus wählen">
        {/* Potenz */}
        {tab === 'potenz' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Basis (x)</label>
                <NummerEingabe value={basis} onChange={setBasis} placeholder="2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Exponent (n)</label>
                <NummerEingabe value={exponent} onChange={setExponent} placeholder="10" />
              </div>
            </div>

            {potenzErgebnis && (
              <div className="result-box">
                <p className="text-white/70 text-sm mb-1">{fmtNum(potenzErgebnis.basis)} hoch {potenzErgebnis.exponent}</p>
                <p className="text-4xl font-bold break-all">{fmtNum(potenzErgebnis.ergebnis)}</p>
              </div>
            )}
          </div>
        )}

        {/* Wurzel */}
        {tab === 'wurzel' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Radikand (x)</label>
                <NummerEingabe value={radikand} onChange={setRadikand} placeholder="144" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Wurzelgrad (n)</label>
                <NummerEingabe value={wurzelgrad} onChange={setWurzelgrad} placeholder="2" />
              </div>
            </div>

            {wurzelErgebnis && (
              <>
                <div className="result-box">
                  <p className="text-white/70 text-sm mb-1">{wurzelErgebnis.grad === 2 ? 'Quadratwurzel' : `${wurzelErgebnis.grad}. Wurzel`} von {fmtNum(wurzelErgebnis.radikand)}</p>
                  <p className="text-4xl font-bold">{fmtNum(wurzelErgebnis.ergebnis)}</p>
                  {wurzelErgebnis.istGanzzahl && (
                    <p className="text-white/70 text-sm mt-1">✓ Glatte Zahl</p>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {/* Logarithmus */}
        {tab === 'log' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Zahl (x)</label>
                <NummerEingabe value={logZahl} onChange={setLogZahl} placeholder="100" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Basis (a)</label>
                <NummerEingabe value={logBasis} onChange={setLogBasis} placeholder="10" />
              </div>
            </div>

            {logErgebnis && (
              <div className="result-box">
                <p className="text-white/70 text-sm mb-1">Logarithmus von {fmtNum(logErgebnis.zahl)} zur Basis {fmtNum(logErgebnis.basis)}</p>
                <p className="text-4xl font-bold">{fmtNum(logErgebnis.ergebnis)}</p>
              </div>
            )}
          </div>
        )}
      </TabGroup>

      {/* Rechenweg */}
      {(() => {
        const schritte = tab === 'potenz' ? potenzErgebnis?.rechenweg : tab === 'wurzel' ? wurzelErgebnis?.rechenweg : logErgebnis?.rechenweg;
        if (!schritte || schritte.length === 0) return null;
        return (
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mt-4 mb-4">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Rechenweg</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {schritte.map((s, i) => (
                <div key={i} className="px-4 py-2 text-sm font-mono text-gray-700 dark:text-gray-300">{s}</div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* Potenzgesetze */}
      <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-4 mt-4">
        <p className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">Potenzgesetze</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {POTENZGESETZE.map(g => (
            <div key={g.name} className="text-center">
              <p className="font-mono text-sm text-blue-900 dark:text-blue-200">{g.regel}</p>
              <p className="text-xs text-blue-600 dark:text-blue-400">{g.name}</p>
            </div>
          ))}
        </div>
      </div>

      {ergebnisText && (
        <div>
          <CrossLink href="/mathe/wissenschaftlicher-taschenrechner" emoji="🧮" text="Wissenschaftlicher Taschenrechner" />
          <CrossLink href="/mathe/pythagoras-rechner" emoji="📐" text="Satz des Pythagoras" />
          <CrossLink href="/alltag/prozentrechner" emoji="%" text="Prozentrechner" />

          <ErgebnisAktionen ergebnisText={ergebnisText} seitenTitel="Potenz-Rechner" />

          <AiExplain
            rechnerName="Potenz-Rechner"
            eingaben={{
              modus: tab,
              ...(tab === 'potenz' ? { basis: parseDeutscheZahl(basis), exponent: parseDeutscheZahl(exponent) } : {}),
              ...(tab === 'wurzel' ? { radikand: parseDeutscheZahl(radikand), wurzelgrad: parseDeutscheZahl(wurzelgrad) } : {}),
              ...(tab === 'log' ? { zahl: parseDeutscheZahl(logZahl), basis: parseDeutscheZahl(logBasis) } : {}),
            }}
            ergebnis={{
              ...(tab === 'potenz' && potenzErgebnis ? { ergebnis: potenzErgebnis.ergebnis } : {}),
              ...(tab === 'wurzel' && wurzelErgebnis ? { ergebnis: wurzelErgebnis.ergebnis, istGanzzahl: wurzelErgebnis.istGanzzahl } : {}),
              ...(tab === 'log' && logErgebnis ? { ergebnis: logErgebnis.ergebnis } : {}),
            }}
          />
        </div>
      )}
    </div>
  );
}
