'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

/**
 * Powerbank-Rechner (Technik-Kategorie).
 *
 * Inline-Logik (keine separate lib/berechnungen-Datei):
 * - Nutzbare Kapazität (mAh) = Nennkapazität(mAh) × Wirkungsgrad
 * - Ladungen = Nutzbare Kapazität ÷ Geräte-Akku(mAh)
 * - Wirkungsgrad-Default 0,65 (Spannungswandlung 3,7 V Zelle → 5 V USB + Wandler-/Geräte-Verluste)
 *   Deshalb lädt eine 20.000-mAh-Powerbank ein 5.000-mAh-Handy nicht 4×, sondern nur ~2,6×.
 */

const GERAET_STUFEN = [3000, 4000, 5000, 8000];

export default function PowerbankRechner() {
  const [pbKap, setPbKap] = useState('20000');
  const [geraetKap, setGeraetKap] = useState('5000');
  const [wirkungsgrad, setWirkungsgrad] = useState('0.65');

  const nPb = parseDeutscheZahl(pbKap);
  const nGeraet = parseDeutscheZahl(geraetKap);
  const nWirkungsgrad = parseFloat(wirkungsgrad);

  const ergebnis = useMemo(() => {
    if (nPb <= 0 || nGeraet <= 0 || nWirkungsgrad <= 0) return null;
    const nutzbar = nPb * nWirkungsgrad;
    const ladungen = nutzbar / nGeraet;
    return { nutzbar, ladungen };
  }, [nPb, nGeraet, nWirkungsgrad]);

  const fmt0 = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 0 });
  const fmtLad = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  return (
    <div>
      {/* Eingaben */}
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <div>
          <label htmlFor="pb-kapazitaet" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Powerbank-Kapazität</label>
          <NummerEingabe value={pbKap} onChange={setPbKap} placeholder="20000" einheit="mAh" />
        </div>
        <div>
          <label htmlFor="pb-geraet" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Geräte-Akku</label>
          <NummerEingabe value={geraetKap} onChange={setGeraetKap} placeholder="5000" einheit="mAh" />
        </div>
        <div>
          <label htmlFor="pb-wirkungsgrad" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Wirkungsgrad</label>
          <select
            id="pb-wirkungsgrad"
            value={wirkungsgrad}
            onChange={(e) => setWirkungsgrad(e.target.value)}
            className="input-field w-full"
          >
            <option value="0.7">70 % – sehr gut (kurzes Kabel, langsames Laden)</option>
            <option value="0.65">65 % – realistisch (Standard)</option>
            <option value="0.6">60 % – Schnellladen, lange Kabel oder Kälte</option>
          </select>
        </div>
      </div>

      {ergebnis ? (
        <>
          <div className="result-box mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-white/80 text-sm mb-1">Volle Ladungen</p>
                <p className="text-5xl font-bold">{fmtLad(ergebnis.ladungen)} ×</p>
              </div>
              <div className="sm:text-right space-y-1">
                <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  {fmt0(nPb)} mAh → {fmt0(nGeraet)} mAh
                </span>
                <span className="block text-white/80 text-sm">nutzbar: {fmt0(ergebnis.nutzbar)} mAh</span>
              </div>
            </div>
          </div>

          {/* Rechenweg */}
          <div className="bg-accent-50 dark:bg-accent-700/20 border border-accent-200 dark:border-accent-600/40 rounded-xl p-4 mb-6">
            <p className="font-semibold text-accent-700 dark:text-accent-400 text-sm mb-1">Rechenweg</p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              {fmt0(nPb)} mAh × {nWirkungsgrad.toLocaleString('de-DE')} = {fmt0(ergebnis.nutzbar)} mAh (nutzbar)
            </p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              {fmt0(ergebnis.nutzbar)} mAh ÷ {fmt0(nGeraet)} mAh = {fmtLad(ergebnis.ladungen)} ×
            </p>
          </div>

          {/* Geräte-Tabelle */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Wie oft lädt diese Powerbank verschiedene Geräte</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">Geräte-Akku</th>
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">Beispiel</th>
                    <th className="text-left py-2 font-semibold text-gray-700 dark:text-gray-300">Volle Ladungen</th>
                  </tr>
                </thead>
                <tbody>
                  {GERAET_STUFEN.map((stufe) => {
                    const ladungen = ergebnis.nutzbar / stufe;
                    const aktiv = Math.round(nGeraet) === stufe;
                    const beispiel = stufe === 3000 ? 'kleines Handy' : stufe === 4000 ? 'Handy' : stufe === 5000 ? 'großes Handy' : 'kleines Tablet';
                    return (
                      <tr key={stufe} className={`border-b border-gray-100 dark:border-gray-600/50 ${aktiv ? 'bg-primary-50 dark:bg-primary-500/10 font-bold' : ''}`}>
                        <td className="py-2.5 pr-4 text-gray-800 dark:text-gray-200">{fmt0(stufe)} mAh</td>
                        <td className="py-2.5 pr-4 text-gray-600 dark:text-gray-400">{beispiel}</td>
                        <td className="py-2.5 text-gray-800 dark:text-gray-200">{fmtLad(ladungen)} ×</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <CrossLink href="/technik/akku-ladezeit-rechner" emoji="🔋" text="Wie lange lädt mein Akku?" />
          <CrossLink href="/technik/stromverbrauch-geraete-rechner" emoji="⚡" text="Stromverbrauch & -kosten von Geräten" />

          <ErgebnisAktionen
            ergebnisText={`Eine ${fmt0(nPb)}-mAh-Powerbank (nutzbar ${fmt0(ergebnis.nutzbar)} mAh) lädt ein ${fmt0(nGeraet)}-mAh-Gerät rund ${fmtLad(ergebnis.ladungen)}× voll`}
            seitenTitel="Powerbank-Rechner"
          />
          <AiExplain
            rechnerName="Powerbank-Rechner"
            eingaben={{ powerbankMah: nPb, geraeteAkkuMah: nGeraet, wirkungsgrad: nWirkungsgrad }}
            ergebnis={{ nutzbareKapazitaetMah: Math.round(ergebnis.nutzbar), volleLadungen: ergebnis.ladungen }}
          />
        </>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Geben Sie die Powerbank-Kapazität und den Geräte-Akku ein, um die Anzahl der Ladungen zu berechnen.
        </p>
      )}
    </div>
  );
}
