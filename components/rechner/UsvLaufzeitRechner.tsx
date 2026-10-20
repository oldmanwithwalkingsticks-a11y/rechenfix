'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

/**
 * USV-Laufzeit-Rechner (Technik-Kategorie).
 *
 * Inline-Logik (keine separate lib/berechnungen-Datei):
 * - Laufzeit (min) = Akku-Kapazität(Wh) × Wirkungsgrad ÷ Last(W) × 60
 * - Wh aus Akku: Spannung(V) × Kapazität(Ah)
 * - VA → W: Scheinleistung(VA) × Leistungsfaktor (PF 0,6 ältere / 0,9–1,0 moderne USV)
 * Wirkungsgrad-Default 0,9 deckt Wechselrichter-/Wandlerverluste ab.
 *
 * W184: Ergebnis vorher als „Überbrückungszeit“ ohne Einschränkung. Die lineare Formel kennt
 * keinen lastabhängigen Kapazitätsverlust (Peukert, Abschaltspannung, Alterung) und überschätzt
 * reale Bleiakku-USV deutlich: 1500-VA-USV mit 24 V/9 Ah laut Herstellerdatenblatt bei halber
 * Last (≈ 432 W) 12,3 min, Formel 27 min; bei Volllast (865 W) 3,7 min, Formel 13,5 min.
 * Ein pauschaler Abschlag ließe sich nicht belegen (hängt von Akku-Typ, Modell, Alter,
 * Temperatur ab) — deshalb jetzt ausdrücklich als rechnerischer Höchstwert gekennzeichnet.
 */

const LAST_STUFEN = [50, 100, 200, 400, 600];

function formatZeit(min: number): string {
  if (!isFinite(min) || min <= 0) return '0 min';
  if (min < 60) return `${min.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} min`;
  const h = Math.floor(min / 60);
  const m = Math.round(min - h * 60);
  if (m === 60) return `${h + 1} h 00 min`;
  return `${h} h ${String(m).padStart(2, '0')} min`;
}

export default function UsvLaufzeitRechner() {
  // Kapazität
  const [kapModus, setKapModus] = useState<'wh' | 'akku'>('wh');
  const [wh, setWh] = useState('216');
  const [spannung, setSpannung] = useState('24');
  const [ah, setAh] = useState('9');
  // Last
  const [lastModus, setLastModus] = useState<'w' | 'va'>('w');
  const [watt, setWatt] = useState('200');
  const [va, setVa] = useState('1500');
  const [pf, setPf] = useState('0.6');
  // Wirkungsgrad
  const [wirkungsgrad, setWirkungsgrad] = useState('0.9');

  const nWh = parseDeutscheZahl(wh);
  const nSpannung = parseDeutscheZahl(spannung);
  const nAh = parseDeutscheZahl(ah);
  const nWatt = parseDeutscheZahl(watt);
  const nVa = parseDeutscheZahl(va);
  const nPf = parseFloat(pf);
  const nWirkungsgrad = parseFloat(wirkungsgrad);

  const ergebnis = useMemo(() => {
    const kapazitaet = kapModus === 'akku' ? nSpannung * nAh : nWh;
    const last = lastModus === 'va' ? nVa * nPf : nWatt;
    if (kapazitaet <= 0 || last <= 0 || nWirkungsgrad <= 0) return null;
    const laufzeit = (kapazitaet * nWirkungsgrad) / last * 60;
    return { kapazitaet, last, laufzeit };
  }, [kapModus, nWh, nSpannung, nAh, lastModus, nWatt, nVa, nPf, nWirkungsgrad]);

  const fmt0 = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 0 });

  return (
    <div>
      {/* Kapazität */}
      <div className="grid gap-4 sm:grid-cols-2 mb-4">
        <div>
          <label htmlFor="usv-kapmodus" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Akku-Kapazität als</label>
          <select id="usv-kapmodus" value={kapModus} onChange={(e) => setKapModus(e.target.value as 'wh' | 'akku')} className="input-field w-full">
            <option value="wh">Wattstunden (Wh)</option>
            <option value="akku">Akku: Spannung × Kapazität</option>
          </select>
        </div>
        {kapModus === 'wh' ? (
          <div>
            <label htmlFor="usv-wh" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kapazität</label>
            <NummerEingabe value={wh} onChange={setWh} placeholder="216" einheit="Wh" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="usv-spannung" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Spannung</label>
              <select id="usv-spannung" value={spannung} onChange={(e) => setSpannung(e.target.value)} className="input-field w-full">
                <option value="12">12 V</option>
                <option value="24">24 V</option>
                <option value="48">48 V</option>
              </select>
            </div>
            <div>
              <label htmlFor="usv-ah" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kapazität</label>
              <NummerEingabe value={ah} onChange={setAh} placeholder="9" einheit="Ah" />
            </div>
          </div>
        )}
      </div>

      {/* Last */}
      <div className="grid gap-4 sm:grid-cols-2 mb-4">
        <div>
          <label htmlFor="usv-lastmodus" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last als</label>
          <select id="usv-lastmodus" value={lastModus} onChange={(e) => setLastModus(e.target.value as 'w' | 'va')} className="input-field w-full">
            <option value="w">Leistung (Watt)</option>
            <option value="va">Scheinleistung (VA) × Leistungsfaktor</option>
          </select>
        </div>
        {lastModus === 'w' ? (
          <div>
            <label htmlFor="usv-watt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last</label>
            <NummerEingabe value={watt} onChange={setWatt} placeholder="200" einheit="W" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="usv-va" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Scheinleistung</label>
              <NummerEingabe value={va} onChange={setVa} placeholder="1500" einheit="VA" />
            </div>
            <div>
              <label htmlFor="usv-pf" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Leistungsfaktor</label>
              <select id="usv-pf" value={pf} onChange={(e) => setPf(e.target.value)} className="input-field w-full">
                <option value="0.6">0,6 – ältere USV</option>
                <option value="0.8">0,8</option>
                <option value="0.9">0,9 – moderne USV</option>
                <option value="1">1,0 – rein ohmsch</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Wirkungsgrad */}
      <div className="mb-6">
        <label htmlFor="usv-wirkungsgrad" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Wirkungsgrad</label>
        <select id="usv-wirkungsgrad" value={wirkungsgrad} onChange={(e) => setWirkungsgrad(e.target.value)} className="input-field w-full">
          <option value="0.95">95 % – sehr gute USV</option>
          <option value="0.9">90 % – Standard</option>
          <option value="0.8">80 % – ältere oder kalte USV</option>
        </select>
      </div>

      {ergebnis ? (
        <>
          <div className="result-box mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-white/80 text-sm mb-1">Überbrückungszeit (rechnerischer Höchstwert)</p>
                <p className="text-5xl font-bold">{formatZeit(ergebnis.laufzeit)}</p>
              </div>
              <div className="sm:text-right space-y-1">
                <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  {fmt0(ergebnis.kapazitaet)} Wh @ {fmt0(ergebnis.last)} W
                </span>
                <span className="block text-white/80 text-sm">Wirkungsgrad {Math.round(nWirkungsgrad * 100)} %</span>
              </div>
            </div>
          </div>

          {/* Rechenweg */}
          <div className="bg-accent-50 dark:bg-accent-700/20 border border-accent-200 dark:border-accent-600/40 rounded-xl p-4 mb-6">
            <p className="font-semibold text-accent-700 dark:text-accent-400 text-sm mb-1">Rechenweg</p>
            {kapModus === 'akku' && (
              <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
                {fmt0(nSpannung)} V × {fmt0(nAh)} Ah = {fmt0(ergebnis.kapazitaet)} Wh
              </p>
            )}
            {lastModus === 'va' && (
              <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
                {fmt0(nVa)} VA × {nPf.toLocaleString('de-DE')} = {fmt0(ergebnis.last)} W
              </p>
            )}
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              {fmt0(ergebnis.kapazitaet)} Wh × {nWirkungsgrad.toLocaleString('de-DE')} ÷ {fmt0(ergebnis.last)} W × 60 = {formatZeit(ergebnis.laufzeit)}
            </p>
          </div>

          {/* W184: Hinweis Höchstwert */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
            <p className="text-amber-800 dark:text-amber-300 text-sm">
              <strong>Rechnerischer Höchstwert:</strong> Die Formel geht davon aus, dass der Akku seine volle Kapazität abgibt. Reale USV mit Bleiakku schaffen oft deutlich weniger, vor allem bei hoher Last: Bei hohem Entladestrom sinkt die nutzbare Kapazität (Peukert-Effekt), dazu kommen Abschaltspannung, Akku-Alter und Temperatur. Beispiel: Eine 1500-VA-USV mit 24-V-/9-Ah-Akku (216 Wh) hält laut Herstellerdatenblatt bei halber Last (rund 430 W) etwa 12 Minuten — rechnerisch wären es rund 27. Verlässlich ist die Laufzeitkurve im Datenblatt Ihres Modells.
            </p>
          </div>

          {/* Last-Tabelle */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Laufzeit dieser USV bei verschiedenen Lasten</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">Last</th>
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">Beispiel</th>
                    <th className="text-left py-2 font-semibold text-gray-700 dark:text-gray-300">Laufzeit (rechnerisch, max.)</th>
                  </tr>
                </thead>
                <tbody>
                  {LAST_STUFEN.map((stufe) => {
                    const laufzeit = (ergebnis.kapazitaet * nWirkungsgrad) / stufe * 60;
                    const aktiv = Math.round(ergebnis.last) === stufe;
                    const bsp = stufe === 50 ? 'Router + ONT' : stufe === 100 ? 'NAS + Netzwerk' : stufe === 200 ? 'Office-PC + Monitor' : stufe === 400 ? 'starker PC' : 'Gaming-PC';
                    return (
                      <tr key={stufe} className={`border-b border-gray-100 dark:border-gray-600/50 ${aktiv ? 'bg-primary-50 dark:bg-primary-500/10 font-bold' : ''}`}>
                        <td className="py-2.5 pr-4 text-gray-800 dark:text-gray-200">{stufe} W</td>
                        <td className="py-2.5 pr-4 text-gray-600 dark:text-gray-400">{bsp}</td>
                        <td className="py-2.5 text-gray-800 dark:text-gray-200">{formatZeit(laufzeit)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <CrossLink href="/technik/stromverbrauch-geraete-rechner" emoji="⚡" text="Wie viel Watt zieht mein Gerät?" />
          <CrossLink href="/technik/netzteil-watt-rechner" emoji="🔌" text="PC-Netzteil-Wattzahl berechnen" />

          <ErgebnisAktionen
            ergebnisText={`USV mit ${fmt0(ergebnis.kapazitaet)} Wh überbrückt bei ${fmt0(ergebnis.last)} W Last rechnerisch höchstens ${formatZeit(ergebnis.laufzeit)} (real je nach Akku und Last oft deutlich weniger)`}
            seitenTitel="USV-Laufzeit-Rechner"
          />
          <AiExplain
            rechnerName="USV-Laufzeit-Rechner"
            eingaben={{ kapazitaetWh: Math.round(ergebnis.kapazitaet), lastW: Math.round(ergebnis.last), wirkungsgrad: nWirkungsgrad }}
            ergebnis={{ laufzeitMinutenRechnerischMax: Number(ergebnis.laufzeit.toFixed(1)), hinweis: 'rechnerischer Höchstwert ohne Peukert-Effekt; reale Bleiakku-USV oft deutlich darunter, vor allem bei hoher Last' }}
          />
        </>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Geben Sie Akku-Kapazität und Last ein, um die Überbrückungszeit zu berechnen.
        </p>
      )}
    </div>
  );
}
