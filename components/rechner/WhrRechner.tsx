'use client';

import { useState, useMemo } from 'react';
import { berechneWhr } from '@/lib/berechnungen/whr';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

type Geschlecht = 'frau' | 'mann';

const RISIKO_FARBEN = {
  niedrig: { bg: 'bg-green-50 dark:bg-green-500/10', border: 'border-green-200 dark:border-green-500/30', text: 'text-green-700 dark:text-green-400', label: 'Niedriges Risiko' },
  moderat: { bg: 'bg-amber-50 dark:bg-amber-500/10', border: 'border-amber-200 dark:border-amber-500/30', text: 'text-amber-700 dark:text-amber-400', label: 'Moderates Risiko' },
  erhoeht: { bg: 'bg-red-50 dark:bg-red-500/10', border: 'border-red-200 dark:border-red-500/30', text: 'text-red-700 dark:text-red-400', label: 'Erhöhtes Risiko' },
};

export default function WhrRechner() {
  const [geschlecht, setGeschlecht] = useState<Geschlecht>('frau');
  const [taillenumfang, setTaillenumfang] = useState('78');
  const [hueftumfang, setHueftumfang] = useState('100');
  const [koerpergroesse, setKoerpergroesse] = useState('168');

  const ergebnis = useMemo(() => {
    const taille = parseDeutscheZahl(taillenumfang);
    const huefte = parseDeutscheZahl(hueftumfang);
    if (taille <= 0 || huefte <= 0) return null;
    return berechneWhr({
      geschlecht,
      taillenumfangCm: taille,
      hueftumfangCm: huefte,
      koerpergroesseCm: parseDeutscheZahl(koerpergroesse),
    });
  }, [geschlecht, taillenumfang, hueftumfang, koerpergroesse]);

  const fmtWhr = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      <div className="space-y-4 mb-6">
        {/* Geschlecht */}
        <RadioToggleGroup
          name="geschlecht"
          legend="Geschlecht"
          value={geschlecht}
          onChange={v => setGeschlecht(v as Geschlecht)}
          options={[
            { label: 'Frau', value: 'frau' },
            { label: 'Mann', value: 'mann' },
          ]}
        />

        {/* Maße */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Taillenumfang</label>
            <NummerEingabe value={taillenumfang} onChange={setTaillenumfang} einheit="cm" placeholder="78" />
            <p className="text-xs text-gray-600 dark:text-gray-500 mt-1">Auf Nabelhöhe messen</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hüftumfang</label>
            <NummerEingabe value={hueftumfang} onChange={setHueftumfang} einheit="cm" placeholder="100" />
            <p className="text-xs text-gray-600 dark:text-gray-500 mt-1">An der breitesten Stelle</p>
          </div>
        </div>

        {/* Körpergröße (optional für WHtR) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Körpergröße (optional, für WHtR)</label>
          <NummerEingabe value={koerpergroesse} onChange={setKoerpergroesse} einheit="cm" placeholder="168" />
        </div>
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-4">
            <p className="text-white/70 text-sm mb-1">Ihr Taille-Hüfte-Verhältnis (WHR)</p>
            <p className="text-5xl font-bold">{fmtWhr(ergebnis.whr)}</p>
            {ergebnis.whtr !== null && (
              <div className="mt-3 pt-3 border-t border-white/20">
                <p className="text-white/60 text-xs mb-1">Taille-Größe-Verhältnis (WHtR)</p>
                <p className="text-2xl font-bold">{fmtWhr(ergebnis.whtr)}</p>
              </div>
            )}
          </div>

          {/* Risiko-Ampel */}
          {(() => {
            const r = RISIKO_FARBEN[ergebnis.risiko];
            return (
              <div className={`${r.bg} border ${r.border} rounded-xl p-4 mb-4`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{ergebnis.risiko === 'niedrig' ? '🟢' : ergebnis.risiko === 'moderat' ? '🟡' : '🔴'}</span>
                  <div>
                    <p className={`font-bold ${r.text}`}>{r.label}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      WHR {fmtWhr(ergebnis.whr)} — {geschlecht === 'frau' ? 'Frauen' : 'Männer'}: {ergebnis.risiko === 'niedrig' ? ergebnis.grenzwerte.niedrig : ergebnis.risiko === 'moderat' ? ergebnis.grenzwerte.moderat : ergebnis.grenzwerte.erhoeht}
                    </p>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* WHtR-Einordnung */}
          {ergebnis.whtr !== null && ergebnis.whtrRisiko !== null && (
            <div className={`${ergebnis.whtrRisiko === 'optimal' ? 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30' : 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30'} border rounded-xl p-4 mb-4`}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{ergebnis.whtrRisiko === 'optimal' ? '🟢' : '🔴'}</span>
                <div>
                  <p className={`font-bold ${ergebnis.whtrRisiko === 'optimal' ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
                    WHtR: {ergebnis.whtrRisiko === 'optimal' ? 'Optimal' : 'Erhöhtes Risiko'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Taille-Größe-Verhältnis {fmtWhr(ergebnis.whtr)} — {ergebnis.whtrRisiko === 'optimal' ? 'unter 0,50 (optimal)' : 'ab 0,50 (erhöht)'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Grenzwert-Tabelle */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">WHR-Grenzwerte ({geschlecht === 'frau' ? 'Frauen' : 'Männer'})</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-gray-600 dark:text-gray-400">Niedriges Risiko</span>
                </span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{ergebnis.grenzwerte.niedrig}</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="text-gray-600 dark:text-gray-400">Moderates Risiko</span>
                </span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{ergebnis.grenzwerte.moderat}</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-gray-600 dark:text-gray-400">Erhöhtes Risiko</span>
                </span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{ergebnis.grenzwerte.erhoeht}</span>
              </div>
              <div className={`flex justify-between px-4 py-3 text-sm font-bold bg-primary-50/50 dark:bg-primary-500/5`}>
                <span className="text-gray-800 dark:text-gray-100">Ihr WHR</span>
                <span className="text-primary-600 dark:text-primary-400">{fmtWhr(ergebnis.whr)}</span>
              </div>
            </div>
          </div>

          {/* Info-Box WHR vs BMI */}
          <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-4">
            <p className="text-sm text-blue-800 dark:text-blue-300 leading-relaxed">
              <strong>WHR vs. BMI:</strong> Das Taille-Hüfte-Verhältnis ist für die Einschätzung von Herz-Kreislauf-Risiken oft aussagekräftiger als der BMI, weil es die Fettverteilung berücksichtigt. Bauchfett (viszerales Fett) gilt als besonders gesundheitsgefährdend — unabhängig vom Gesamtgewicht.
            </p>
          </div>

          {/* Hinweis */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-4">
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              <strong>Hinweis:</strong> Dieser Rechner dient der Orientierung und ersetzt keine ärztliche Beratung. Messen Sie morgens nüchtern im Stehen, ohne den Bauch einzuziehen. WHO-Grenzwerte können je nach Ethnie variieren.
            </p>
          </div>

          <CrossLink href="/gesundheit/bmi-rechner" emoji="⚖️" text="BMI berechnen" />
          <CrossLink href="/gesundheit/koerperfett-rechner" emoji="📊" text="Körperfettanteil berechnen" />
          <CrossLink href="/gesundheit/kalorienrechner" emoji="🔥" text="Kalorienbedarf berechnen" />

          <ErgebnisAktionen
            ergebnisText={`WHR (${geschlecht === 'frau' ? 'Frau' : 'Mann'}): ${fmtWhr(ergebnis.whr)} — ${RISIKO_FARBEN[ergebnis.risiko].label}${ergebnis.whtr !== null ? ` | WHtR: ${fmtWhr(ergebnis.whtr)} (${ergebnis.whtrRisiko === 'optimal' ? 'optimal' : 'erhöht'})` : ''} | Taille: ${taillenumfang} cm | Hüfte: ${hueftumfang} cm`}
            seitenTitel="WHR-Rechner"
          />

          <AiExplain
            rechnerName="WHR-Rechner (Taille-Hüfte-Verhältnis)"
            eingaben={{
              geschlecht,
              taillenumfangCm: parseDeutscheZahl(taillenumfang),
              hueftumfangCm: parseDeutscheZahl(hueftumfang),
              koerpergroesseCm: parseDeutscheZahl(koerpergroesse),
            }}
            ergebnis={{
              whr: ergebnis.whr,
              risiko: ergebnis.risiko,
              whtr: ergebnis.whtr,
              whtrRisiko: ergebnis.whtrRisiko,
            }}
          />
        </>
      )}
    </div>
  );
}
