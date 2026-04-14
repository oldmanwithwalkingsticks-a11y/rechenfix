'use client';

import { useState, useMemo } from 'react';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

type Basis = 'dec' | 'bin' | 'oct' | 'hex';

function parseByBasis(s: string, b: Basis): number | null {
  const str = s.trim().toLowerCase().replace(/\s+/g, '');
  if (!str) return 0;
  const base = b === 'dec' ? 10 : b === 'bin' ? 2 : b === 'oct' ? 8 : 16;
  const valid =
    b === 'dec' ? /^-?\d+$/ :
    b === 'bin' ? /^-?[01]+$/ :
    b === 'oct' ? /^-?[0-7]+$/ :
    /^-?[0-9a-f]+$/;
  if (!valid.test(str)) return null;
  const n = parseInt(str, base);
  return isNaN(n) ? null : n;
}

function toBinDetail(n: number): { bits: string; weg: { bit: number; wert: number }[] } {
  if (n === 0) return { bits: '0', weg: [] };
  const abs = Math.abs(n);
  const bits = abs.toString(2);
  const weg: { bit: number; wert: number }[] = [];
  for (let i = 0; i < bits.length; i++) {
    const bit = parseInt(bits[i]);
    if (bit) {
      const exp = bits.length - 1 - i;
      weg.push({ bit: exp, wert: Math.pow(2, exp) });
    }
  }
  return { bits: (n < 0 ? '-' : '') + bits, weg };
}

export default function BinaerRechner() {
  const [input, setInput] = useState('42');
  const [basis, setBasis] = useState<Basis>('dec');

  const ergebnis = useMemo(() => {
    const n = parseByBasis(input, basis);
    if (n === null) return null;
    const bin = toBinDetail(n);
    const oct = n.toString(8);
    const hex = n.toString(16).toUpperCase();
    const dec = n.toString(10);
    const ascii = n >= 0 && n <= 127 && n >= 32 ? String.fromCharCode(n) : null;
    return { n, dec, bin, oct, hex, ascii };
  }, [input, basis]);

  return (
    <div>
      <div className="space-y-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Eingabesystem</label>
          <div className="grid grid-cols-4 gap-2">
            {(['dec', 'bin', 'oct', 'hex'] as Basis[]).map(b => (
              <button key={b} onClick={() => setBasis(b)} className={`min-h-[48px] px-3 rounded-xl border text-sm font-medium ${basis === b ? 'bg-primary-500 text-white border-primary-500' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}>
                {b === 'dec' ? 'Dezimal' : b === 'bin' ? 'Binär' : b === 'oct' ? 'Oktal' : 'Hex'}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Zahl</label>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            inputMode={basis === 'dec' ? 'numeric' : 'text'}
            className="w-full min-h-[48px] px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-mono"
            placeholder={basis === 'dec' ? '42' : basis === 'bin' ? '101010' : basis === 'oct' ? '52' : '2A'}
          />
          <p className="text-xs text-gray-500 mt-1">
            Erlaubte Zeichen: {basis === 'dec' ? '0–9' : basis === 'bin' ? '0, 1' : basis === 'oct' ? '0–7' : '0–9, A–F'}
          </p>
        </div>
      </div>

      {!ergebnis && (
        <div className="result-box mb-6 !bg-red-500">
          <p className="text-white text-sm mb-1">Ungültige Eingabe</p>
          <p className="text-2xl font-bold">Bitte prüfen Sie die Ziffern</p>
        </div>
      )}

      {ergebnis && (
        <>
          <div className="result-box mb-6">
            <p className="text-white/80 text-sm mb-1">Binärdarstellung</p>
            <p className="text-4xl font-bold font-mono break-all">{ergebnis.bin.bits}</p>
            <p className="text-white/80 text-sm mt-2">Dezimal: <strong>{ergebnis.dec}</strong></p>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4">
            <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-3 text-sm">Alle Zahlensysteme</h3>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Dezimal (Basis 10)</span><span className="font-mono font-medium">{ergebnis.dec}</span></div>
              <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Binär (Basis 2)</span><span className="font-mono font-medium break-all">{ergebnis.bin.bits}</span></div>
              <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Oktal (Basis 8)</span><span className="font-mono font-medium">{ergebnis.oct}</span></div>
              <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">Hexadezimal (Basis 16)</span><span className="font-mono font-medium">{ergebnis.hex}</span></div>
              {ergebnis.ascii && (
                <div className="flex justify-between"><span className="text-gray-600 dark:text-gray-400">ASCII-Zeichen</span><span className="font-mono font-medium">&apos;{ergebnis.ascii}&apos;</span></div>
              )}
            </div>
          </div>

          {ergebnis.bin.weg.length > 0 && (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4">
              <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-3 text-sm">Rechenweg (Zweierpotenzen)</h3>
              <p className="text-xs text-gray-500 mb-2">Jede 1-Stelle im Binärcode entspricht einer Zweierpotenz.</p>
              <div className="space-y-1 text-sm font-mono">
                {ergebnis.bin.weg.map(w => (
                  <div key={w.bit} className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">2^{w.bit}</span>
                    <span className="font-medium">{w.wert}</span>
                  </div>
                ))}
                <div className="border-t border-gray-200 dark:border-gray-600 mt-2 pt-2 flex justify-between font-bold">
                  <span>Summe</span>
                  <span className="text-primary-600 dark:text-primary-400">{Math.abs(ergebnis.n)}</span>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <CrossLink href="/mathe/einheiten-umrechner" emoji="📐" text="Einheiten umrechnen" />
      <CrossLink href="/mathe/wissenschaftlicher-taschenrechner" emoji="🧮" text="Wissenschaftlicher Rechner" />
      <CrossLink href="/mathe/bruchrechner" emoji="½" text="Bruchrechner" />

      <ErgebnisAktionen
        ergebnisText={ergebnis ? `${input} (${basis}) = ${ergebnis.dec} dec = ${ergebnis.bin.bits} bin = ${ergebnis.hex} hex` : 'Ungültige Eingabe'}
        seitenTitel="Binär-Rechner"
      />

      <AiExplain
        rechnerName="Binär-Rechner"
        eingaben={{
          'Eingabe': input,
          'System': basis,
        }}
        ergebnis={ergebnis ? {
          'Dezimal': ergebnis.dec,
          'Binär': ergebnis.bin.bits,
          'Oktal': ergebnis.oct,
          'Hexadezimal': ergebnis.hex,
        } : { 'Fehler': 'Ungültige Eingabe' }}
      />
    </div>
  );
}
