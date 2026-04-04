'use client';

import { useState, useMemo } from 'react';
import { berechneRabatt, berechneRabattProzent, berechneDoppelrabatt } from '@/lib/berechnungen/rabatt';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';

type Modus = 'rabatt' | 'endpreis' | 'doppelrabatt';

const QUICK_RABATTE = [5, 10, 15, 20, 25, 30, 50, 70];

export default function RabattRechner() {
  const [modus, setModus] = useState<Modus>('rabatt');
  const [wert1, setWert1] = useState('');
  const [wert2, setWert2] = useState('');
  const [wert3, setWert3] = useState('');
  const [kopiert, setKopiert] = useState(false);

  const n1 = parseDeutscheZahl(wert1);
  const n2 = parseDeutscheZahl(wert2);
  const n3 = parseDeutscheZahl(wert3);

  const modi: { key: Modus; label: string; kurz: string }[] = [
    { key: 'rabatt', label: 'Rabatt berechnen', kurz: 'Preis − X% = ?' },
    { key: 'endpreis', label: 'Rabatt-% ermitteln', kurz: 'War X €, jetzt Y €' },
    { key: 'doppelrabatt', label: 'Doppelrabatt', kurz: 'Erst X%, dann Y%' },
  ];

  const ergebnis = useMemo(() => {
    if (modus === 'rabatt' && n1 > 0 && n2 > 0) {
      return berechneRabatt(n1, n2);
    }
    if (modus === 'endpreis' && n1 > 0 && n2 > 0) {
      return berechneRabattProzent(n1, n2);
    }
    if (modus === 'doppelrabatt' && n1 > 0 && n2 > 0 && n3 > 0) {
      return berechneDoppelrabatt(n1, n2, n3);
    }
    return null;
  }, [modus, n1, n2, n3]);

  const fmt = (v: number) => v.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const ergebnisText = useMemo(() => {
    if (!ergebnis) return '';
    if (modus === 'rabatt' && 'rabattProzent' in ergebnis) {
      return `${fmt(n1)} € − ${fmt(n2)}% = ${fmt(ergebnis.endpreis)} € (Ersparnis: ${fmt(ergebnis.ersparnis)} €)`;
    }
    if (modus === 'endpreis' && 'rabattProzent' in ergebnis) {
      return `Von ${fmt(n1)} € auf ${fmt(n2)} € = ${fmt(ergebnis.rabattProzent)}% Rabatt (${fmt(ergebnis.ersparnis)} € Ersparnis)`;
    }
    if (modus === 'doppelrabatt' && 'gesamtRabattProzent' in ergebnis) {
      return `${fmt(n1)} € − ${fmt(n2)}% − ${fmt(n3)}% = ${fmt(ergebnis.endpreis)} € (Gesamt: ${fmt(ergebnis.gesamtRabattProzent)}% Rabatt)`;
    }
    return '';
  }, [ergebnis, modus, n1, n2, n3]);

  const handleKopieren = async () => {
    if (!ergebnisText) return;
    try {
      await navigator.clipboard.writeText(ergebnisText);
      setKopiert(true);
      setTimeout(() => setKopiert(false), 2000);
    } catch { /* ignore */ }
  };

  const handleTeilen = async () => {
    if (!ergebnisText) return;
    const text = `${ergebnisText} — berechnet auf rechenfix.de`;
    if (navigator.share) {
      try { await navigator.share({ title: 'Rabattberechnung', text }); } catch { /* ignore */ }
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  return (
    <div className="space-y-6">
      {/* Modus-Tabs */}
      <div className="flex flex-wrap gap-2">
        {modi.map(m => (
          <button
            key={m.key}
            onClick={() => { setModus(m.key); setWert1(''); setWert2(''); setWert3(''); }}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              modus === m.key
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <span className="block">{m.label}</span>
            <span className="block text-[10px] opacity-70 mt-0.5">{m.kurz}</span>
          </button>
        ))}
      </div>

      {/* Eingabefelder */}
      <div className="space-y-4">
        {modus === 'rabatt' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Originalpreis (€)</label>
              <NummerEingabe value={wert1} onChange={setWert1} placeholder="z. B. 149,99" einheit="€" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rabatt (%)</label>
              <NummerEingabe value={wert2} onChange={setWert2} placeholder="z. B. 20" einheit="%" />
              <div className="flex flex-wrap gap-1.5 mt-2">
                {QUICK_RABATTE.map(v => (
                  <button
                    key={v}
                    onClick={() => setWert2(String(v))}
                    className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${
                      wert2 === String(v)
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-primary-500/20'
                    }`}
                  >
                    {v}%
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {modus === 'endpreis' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Originalpreis (€)</label>
              <NummerEingabe value={wert1} onChange={setWert1} placeholder="z. B. 199,00" einheit="€" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Reduzierter Preis (€)</label>
              <NummerEingabe value={wert2} onChange={setWert2} placeholder="z. B. 149,00" einheit="€" />
            </div>
          </>
        )}

        {modus === 'doppelrabatt' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Originalpreis (€)</label>
              <NummerEingabe value={wert1} onChange={setWert1} placeholder="z. B. 200,00" einheit="€" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Erster Rabatt (%)</label>
              <NummerEingabe value={wert2} onChange={setWert2} placeholder="z. B. 20" einheit="%" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Zweiter Rabatt (%)</label>
              <NummerEingabe value={wert3} onChange={setWert3} placeholder="z. B. 10" einheit="%" />
            </div>
          </>
        )}
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <div className="space-y-4">
          <div className="result-box">
            {modus === 'rabatt' && (
              <>
                <p className="text-white/80 text-sm mb-1">Endpreis nach {fmt(n2)}% Rabatt</p>
                <p className="text-4xl font-bold">{fmt(ergebnis.endpreis)} €</p>
                <p className="text-white/70 text-sm mt-2">
                  Ersparnis: {fmt(ergebnis.ersparnis)} €
                </p>
              </>
            )}
            {modus === 'endpreis' && 'rabattProzent' in ergebnis && (
              <>
                <p className="text-white/80 text-sm mb-1">Rabatt von {fmt(n1)} € auf {fmt(n2)} €</p>
                <p className="text-4xl font-bold">{fmt(ergebnis.rabattProzent)}%</p>
                <p className="text-white/70 text-sm mt-2">
                  Ersparnis: {fmt(ergebnis.ersparnis)} €
                </p>
              </>
            )}
            {modus === 'doppelrabatt' && 'gesamtRabattProzent' in ergebnis && (
              <>
                <p className="text-white/80 text-sm mb-1">Endpreis nach {fmt(n2)}% + {fmt(n3)}% Rabatt</p>
                <p className="text-4xl font-bold">{fmt(ergebnis.endpreis)} €</p>
                <p className="text-white/70 text-sm mt-2">
                  Gesamtrabatt: {fmt(ergebnis.gesamtRabattProzent)}% | Ersparnis: {fmt(ergebnis.ersparnis)} €
                </p>
              </>
            )}
          </div>

          {/* Visuelle Ersparnis-Leiste */}
          {n1 > 0 && (
            <div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                <span>Endpreis</span>
                <span>Ersparnis</span>
              </div>
              <div className="h-4 rounded-full overflow-hidden flex bg-gray-100 dark:bg-gray-700">
                <div
                  className="bg-primary-500 rounded-l-full transition-all duration-500"
                  style={{ width: `${Math.max(0, Math.min(100, (ergebnis.endpreis / n1) * 100))}%` }}
                />
                <div
                  className="bg-red-400 rounded-r-full transition-all duration-500"
                  style={{ width: `${Math.max(0, Math.min(100, (ergebnis.ersparnis / n1) * 100))}%` }}
                />
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span className="text-primary-600 dark:text-primary-400 font-medium">{fmt(ergebnis.endpreis)} €</span>
                <span className="text-red-500 font-medium">−{fmt(ergebnis.ersparnis)} €</span>
              </div>
            </div>
          )}

          {/* Rechenweg */}
          <div className="bg-gray-50 dark:bg-gray-700/40 rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Rechenweg</p>
            <div className="space-y-1">
              {ergebnis.rechenweg.map((schritt, i) => (
                <p key={i} className={`text-sm ${i === ergebnis.rechenweg.length - 1 ? 'font-bold text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-300'}`}>
                  {schritt}
                </p>
              ))}
            </div>
          </div>

          {/* Doppelrabatt-Hinweis */}
          {modus === 'doppelrabatt' && 'gesamtRabattProzent' in ergebnis && (
            <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  <strong>Achtung:</strong> {fmt(n2)}% + {fmt(n3)}% sind nicht {fmt(n2 + n3)}% Gesamtrabatt! Der zweite Rabatt wird auf den bereits reduzierten Preis berechnet. Der tatsächliche Gesamtrabatt beträgt nur <strong>{fmt(ergebnis.gesamtRabattProzent)}%</strong>.
                </p>
              </div>
            </div>
          )}

          {/* Aktions-Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleKopieren}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {kopiert ? (
                <><svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Kopiert!</>
              ) : (
                <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> Kopieren</>
              )}
            </button>
            <button
              onClick={handleTeilen}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
              Teilen
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
