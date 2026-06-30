'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

/**
 * Netzteil-/PC-Watt-Rechner (Technik-Kategorie).
 *
 * Inline-Logik (keine separate lib/berechnungen-Datei):
 * - Gesamtlast = CPU + GPU + RAM×5 + SSD×5 + HDD×8 + Lüfter×2
 * - Empfohlen = Gesamtlast × (1 + Reserve), aufgerundet auf die nächste gängige Netzteilgröße
 * - Reserve-Default 0,30: deckt GPU-Lastspitzen, Effizienz-Sweetspot bei ~50 % Last und Alterung ab.
 */

const NETZTEIL_GROESSEN = [300, 400, 450, 500, 550, 600, 650, 750, 850, 1000, 1200, 1600];

const CPU_OPTIONEN = [
  { key: '65', label: 'Sparsam (65 W)' },
  { key: '95', label: 'Mittelklasse (95 W)' },
  { key: '125', label: 'High-End (125 W)' },
  { key: '170', label: 'Enthusiast (170 W)' },
];
const GPU_OPTIONEN = [
  { key: '0', label: 'Keine / integriert (0 W)' },
  { key: '75', label: 'Einsteiger (75 W)' },
  { key: '170', label: 'Mittelklasse (170 W)' },
  { key: '290', label: 'High-End (290 W)' },
  { key: '450', label: 'Enthusiast (450 W)' },
];
const RESERVE_OPTIONEN = [
  { key: '0.2', label: '20 % – knapp kalkuliert' },
  { key: '0.3', label: '30 % – empfohlen (Standard)' },
  { key: '0.4', label: '40 % – viel Reserve / Aufrüstung' },
];

export default function NetzteilWattRechner() {
  const [cpu, setCpu] = useState('95');
  const [gpu, setGpu] = useState('170');
  const [ram, setRam] = useState('2');
  const [ssd, setSsd] = useState('1');
  const [hdd, setHdd] = useState('1');
  const [luefter, setLuefter] = useState('4');
  const [reserve, setReserve] = useState('0.3');

  const nCpu = parseDeutscheZahl(cpu);
  const nGpu = parseDeutscheZahl(gpu);
  const nRam = parseDeutscheZahl(ram);
  const nSsd = parseDeutscheZahl(ssd);
  const nHdd = parseDeutscheZahl(hdd);
  const nLuefter = parseDeutscheZahl(luefter);
  const nReserve = parseFloat(reserve);

  const ergebnis = useMemo(() => {
    const ramW = Math.max(0, nRam) * 5;
    const ssdW = Math.max(0, nSsd) * 5;
    const hddW = Math.max(0, nHdd) * 8;
    const luefterW = Math.max(0, nLuefter) * 2;
    const last = nCpu + nGpu + ramW + ssdW + hddW + luefterW;
    if (last <= 0) return null;
    const empfohlenRoh = last * (1 + nReserve);
    const empfohlen = NETZTEIL_GROESSEN.find((s) => s >= empfohlenRoh) ?? 1600;
    return { last, ramW, ssdW, hddW, luefterW, empfohlenRoh, empfohlen };
  }, [nCpu, nGpu, nRam, nSsd, nHdd, nLuefter, nReserve]);

  const fmt0 = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 0 });
  const reserveProzent = Math.round(nReserve * 100);

  const BEISPIELE: Array<{ name: string; last: number; netzteil: number }> = [
    { name: 'Office / Büro', last: 84, netzteil: 300 },
    { name: 'Gaming-Mittelklasse', last: 296, netzteil: 400 },
    { name: 'High-End', last: 457, netzteil: 600 },
    { name: 'Enthusiast', last: 674, netzteil: 1000 },
  ];

  return (
    <div>
      {/* Eingaben */}
      <div className="grid gap-4 sm:grid-cols-2 mb-6">
        <div>
          <label htmlFor="ps-cpu" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Prozessor (CPU)</label>
          <select id="ps-cpu" value={cpu} onChange={(e) => setCpu(e.target.value)} className="input-field w-full">
            {CPU_OPTIONEN.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="ps-gpu" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Grafikkarte (GPU)</label>
          <select id="ps-gpu" value={gpu} onChange={(e) => setGpu(e.target.value)} className="input-field w-full">
            {GPU_OPTIONEN.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="ps-ram" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">RAM-Riegel</label>
          <NummerEingabe value={ram} onChange={setRam} placeholder="2" einheit="×" />
        </div>
        <div>
          <label htmlFor="ps-ssd" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SSD / NVMe</label>
          <NummerEingabe value={ssd} onChange={setSsd} placeholder="1" einheit="×" />
        </div>
        <div>
          <label htmlFor="ps-hdd" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Festplatten (HDD)</label>
          <NummerEingabe value={hdd} onChange={setHdd} placeholder="1" einheit="×" />
        </div>
        <div>
          <label htmlFor="ps-luefter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lüfter / AIO-Pumpe</label>
          <NummerEingabe value={luefter} onChange={setLuefter} placeholder="4" einheit="×" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="ps-reserve" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Leistungsreserve</label>
          <select id="ps-reserve" value={reserve} onChange={(e) => setReserve(e.target.value)} className="input-field w-full">
            {RESERVE_OPTIONEN.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
          </select>
        </div>
      </div>

      {ergebnis ? (
        <>
          <div className="result-box mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
              <div>
                <p className="text-white/80 text-sm mb-1">Empfohlenes Netzteil</p>
                <p className="text-5xl font-bold">{fmt0(ergebnis.empfohlen)} W</p>
              </div>
              <div className="sm:text-right space-y-1">
                <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  Gesamtlast: {fmt0(ergebnis.last)} W
                </span>
                <span className="block text-white/80 text-sm">inkl. {reserveProzent} % Reserve ({fmt0(ergebnis.empfohlenRoh)} W)</span>
              </div>
            </div>
          </div>

          {/* Rechenweg */}
          <div className="bg-accent-50 dark:bg-accent-700/20 border border-accent-200 dark:border-accent-600/40 rounded-xl p-4 mb-6">
            <p className="font-semibold text-accent-700 dark:text-accent-400 text-sm mb-1">Rechenweg</p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              {fmt0(nCpu)} (CPU) + {fmt0(nGpu)} (GPU) + {fmt0(ergebnis.ramW)} (RAM) + {fmt0(ergebnis.ssdW)} (SSD) + {fmt0(ergebnis.hddW)} (HDD) + {fmt0(ergebnis.luefterW)} (Lüfter) = {fmt0(ergebnis.last)} W
            </p>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              {fmt0(ergebnis.last)} W × {(1 + nReserve).toLocaleString('de-DE')} = {fmt0(ergebnis.empfohlenRoh)} W → aufgerundet {fmt0(ergebnis.empfohlen)} W
            </p>
          </div>

          {/* Beispiel-Tabelle */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Beispiel-Konfigurationen und empfohlenes Netzteil</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-600">
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">Konfiguration</th>
                    <th className="text-left py-2 pr-4 font-semibold text-gray-700 dark:text-gray-300">Gesamtlast</th>
                    <th className="text-left py-2 font-semibold text-gray-700 dark:text-gray-300">Netzteil</th>
                  </tr>
                </thead>
                <tbody>
                  {BEISPIELE.map((b) => {
                    const aktiv = ergebnis.last >= b.last - 40 && ergebnis.last <= b.last + 40;
                    return (
                      <tr key={b.name} className={`border-b border-gray-100 dark:border-gray-600/50 ${aktiv ? 'bg-primary-50 dark:bg-primary-500/10 font-bold' : ''}`}>
                        <td className="py-2.5 pr-4 text-gray-800 dark:text-gray-200">{b.name}</td>
                        <td className="py-2.5 pr-4 text-gray-600 dark:text-gray-400">{b.last} W</td>
                        <td className="py-2.5 text-gray-800 dark:text-gray-200">{b.netzteil} W</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <CrossLink href="/technik/stromverbrauch-geraete-rechner" emoji="⚡" text="Stromverbrauch & -kosten von Geräten" />
          <CrossLink href="/wohnen/stromkosten-rechner" emoji="💡" text="Was kostet der PC-Betrieb im Jahr?" />

          <ErgebnisAktionen
            ergebnisText={`Gesamtlast ${fmt0(ergebnis.last)} W + ${reserveProzent} % Reserve → empfohlenes Netzteil: ${fmt0(ergebnis.empfohlen)} W`}
            seitenTitel="Netzteil-Rechner (PC-Watt)"
          />
          <AiExplain
            rechnerName="Netzteil-Rechner (PC-Watt)"
            eingaben={{ cpuW: nCpu, gpuW: nGpu, ramRiegel: nRam, ssd: nSsd, hdd: nHdd, luefter: nLuefter, reserveProzent }}
            ergebnis={{ gesamtlastW: ergebnis.last, empfohlenW: ergebnis.empfohlen }}
          />
        </>
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Wählen Sie Ihre Komponenten aus, um die empfohlene Netzteilgröße zu berechnen.
        </p>
      )}
    </div>
  );
}
