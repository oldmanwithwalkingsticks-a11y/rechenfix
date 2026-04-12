'use client';

import { useState, useEffect, useMemo } from 'react';

interface ClickEntry {
  p: string;
  c: string;
  r: string;
  t: number;
}

type Tab = 'programm' | 'rechner' | 'alle';

export default function AffiliateStatsPage() {
  const [clicks, setClicks] = useState<ClickEntry[]>([]);
  const [tab, setTab] = useState<Tab>('programm');

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem('rf_aff_clicks') || '[]');
      setClicks(data);
    } catch {
      setClicks([]);
    }
  }, []);

  const zeitraum = useMemo(() => {
    if (clicks.length === 0) return null;
    const sorted = [...clicks].sort((a, b) => a.t - b.t);
    return { von: sorted[0].t, bis: sorted[sorted.length - 1].t };
  }, [clicks]);

  const nachProgramm = useMemo(() => {
    const map = new Map<string, { count: number; letzter: number }>();
    for (const c of clicks) {
      const e = map.get(c.p);
      if (e) {
        e.count++;
        if (c.t > e.letzter) e.letzter = c.t;
      } else {
        map.set(c.p, { count: 1, letzter: c.t });
      }
    }
    return Array.from(map.entries())
      .map(([programm, d]) => ({ programm, ...d }))
      .sort((a, b) => b.count - a.count);
  }, [clicks]);

  const nachRechner = useMemo(() => {
    const map = new Map<string, Map<string, { count: number; letzter: number }>>();
    for (const c of clicks) {
      if (!map.has(c.r)) map.set(c.r, new Map());
      const prog = map.get(c.r)!;
      const e = prog.get(c.p);
      if (e) {
        e.count++;
        if (c.t > e.letzter) e.letzter = c.t;
      } else {
        prog.set(c.p, { count: 1, letzter: c.t });
      }
    }
    const result: { rechner: string; programm: string; count: number; letzter: number }[] = [];
    Array.from(map.entries()).forEach(([rechner, progs]) => {
      Array.from(progs.entries()).forEach(([programm, d]) => {
        result.push({ rechner, programm, ...d });
      });
    });
    return result.sort((a, b) => b.count - a.count);
  }, [clicks]);

  const alleKlicks = useMemo(() => {
    return [...clicks].sort((a, b) => b.t - a.t);
  }, [clicks]);

  const fmtDate = (t: number) => {
    const d = new Date(t);
    return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
      + ' ' + d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  };

  const handleLoeschen = () => {
    if (confirm('Alle Affiliate-Klick-Daten unwiderruflich löschen?')) {
      localStorage.removeItem('rf_aff_clicks');
      setClicks([]);
    }
  };

  const handleExport = () => {
    const header = 'Datum;Programm;Context;Seite\n';
    const rows = [...clicks]
      .sort((a, b) => b.t - a.t)
      .map(c => `${fmtDate(c.t)};${c.p};${c.c};${c.r}`)
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `affiliate-clicks-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: 'programm', label: 'Nach Programm' },
    { key: 'rechner', label: 'Nach Rechner' },
    { key: 'alle', label: 'Alle Klicks' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
        Affiliate-Klick-Statistiken
      </h1>

      <p className="text-sm text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-lg px-3 py-2 mb-6">
        Diese Daten sind lokal in Ihrem Browser gespeichert und nur auf diesem Gerät verfügbar.
      </p>

      {/* Übersicht */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Gesamtklicks</p>
          <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">{clicks.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Programme</p>
          <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">{nachProgramm.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Zeitraum</p>
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mt-1">
            {zeitraum ? `${fmtDate(zeitraum.von)} — ${fmtDate(zeitraum.bis)}` : '—'}
          </p>
        </div>
      </div>

      {/* Aktionen */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={handleExport}
          disabled={clicks.length === 0}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-primary-500 text-white hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          CSV exportieren
        </button>
        <button
          onClick={handleLoeschen}
          disabled={clicks.length === 0}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Daten löschen
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              tab === t.key
                ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {clicks.length === 0 ? (
        <div className="text-center py-12 text-gray-400 dark:text-gray-500">
          Noch keine Klick-Daten vorhanden.
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
          {tab === 'programm' && (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/50 text-left">
                  <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Programm</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300 text-right">Klicks</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300 text-right">Letzter Klick</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {nachProgramm.map(r => (
                  <tr key={r.programm} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">{r.programm}</td>
                    <td className="px-4 py-3 text-right tabular-nums text-gray-600 dark:text-gray-400">{r.count}</td>
                    <td className="px-4 py-3 text-right text-gray-500 dark:text-gray-400">{fmtDate(r.letzter)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {tab === 'rechner' && (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/50 text-left">
                  <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Rechner</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Programm</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300 text-right">Klicks</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300 text-right">Letzter Klick</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {nachRechner.map((r, i) => (
                  <tr key={`${r.rechner}-${r.programm}-${i}`} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-4 py-3 text-gray-800 dark:text-gray-200 font-mono text-xs">{r.rechner}</td>
                    <td className="px-4 py-3 font-medium text-gray-600 dark:text-gray-400">{r.programm}</td>
                    <td className="px-4 py-3 text-right tabular-nums text-gray-600 dark:text-gray-400">{r.count}</td>
                    <td className="px-4 py-3 text-right text-gray-500 dark:text-gray-400">{fmtDate(r.letzter)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {tab === 'alle' && (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/50 text-left">
                  <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Datum/Uhrzeit</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Programm</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Context</th>
                  <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Seite</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {alleKlicks.map((c, i) => (
                  <tr key={`${c.t}-${i}`} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">{fmtDate(c.t)}</td>
                    <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">{c.p}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{c.c || '—'}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400 font-mono text-xs">{c.r}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
