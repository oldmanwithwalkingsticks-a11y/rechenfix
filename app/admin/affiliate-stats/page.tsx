'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';

interface ClickEntry {
  p: string;
  c: string;
  r: string;
  t: number;
}

interface FeedbackEntry {
  v: 'ja' | 'nein';
  r: string;
  t: number;
}

type Tab = 'programm' | 'rechner' | 'alle' | 'feedback';

const AUTH_STORAGE_KEY = 'rf_admin_stats_token';

function getMonatKey(t: number) {
  const d = new Date(t);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function getMonatLabel(key: string) {
  const [jahr, monat] = key.split('-');
  const monate = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
  return `${monate[parseInt(monat) - 1]} ${jahr}`;
}

function aktuellerMonat() {
  return getMonatKey(Date.now());
}

function isImMonat(t: number, monatKey: string) {
  return getMonatKey(t) === monatKey;
}

export default function AffiliateStatsPage() {
  const [token, setToken] = useState<string | null>(null);
  const [passwortEingabe, setPasswortEingabe] = useState('');
  const [authFehler, setAuthFehler] = useState(false);
  const [ladeStatus, setLadeStatus] = useState<'idle' | 'lade' | 'fehler' | 'ok'>('idle');

  const [alleClicks, setAlleClicks] = useState<ClickEntry[]>([]);
  const [alleFeedbacks, setAlleFeedbacks] = useState<FeedbackEntry[]>([]);
  const [monat, setMonat] = useState(aktuellerMonat());
  const [tab, setTab] = useState<Tab>('programm');
  const [berichtStatus, setBerichtStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  // Token aus SessionStorage laden (überlebt Reload, nicht Tab-Close)
  useEffect(() => {
    try {
      const t = sessionStorage.getItem(AUTH_STORAGE_KEY);
      if (t) setToken(t);
    } catch { /* ignore */ }
  }, []);

  const ladeStats = useCallback(async (t: string) => {
    setLadeStatus('lade');
    try {
      const res = await fetch('/api/stats', {
        headers: { Authorization: `Bearer ${t}` },
        cache: 'no-store',
      });
      if (res.status === 401) {
        setAuthFehler(true);
        setToken(null);
        try { sessionStorage.removeItem(AUTH_STORAGE_KEY); } catch { /* ignore */ }
        setLadeStatus('fehler');
        return;
      }
      if (!res.ok) {
        setLadeStatus('fehler');
        return;
      }
      const data = await res.json();
      setAlleClicks(Array.isArray(data.clicks) ? data.clicks : []);
      setAlleFeedbacks(Array.isArray(data.feedbacks) ? data.feedbacks : []);
      setLadeStatus('ok');
    } catch {
      setLadeStatus('fehler');
    }
  }, []);

  useEffect(() => {
    if (token) ladeStats(token);
  }, [token, ladeStats]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const pw = passwortEingabe.trim();
    if (!pw) return;
    setAuthFehler(false);
    setToken(pw);
    try { sessionStorage.setItem(AUTH_STORAGE_KEY, pw); } catch { /* ignore */ }
    setPasswortEingabe('');
  };

  const handleLogout = () => {
    setToken(null);
    setAlleClicks([]);
    setAlleFeedbacks([]);
    try { sessionStorage.removeItem(AUTH_STORAGE_KEY); } catch { /* ignore */ }
  };

  // Verfügbare Monate ermitteln
  const verfuegbareMonate = useMemo(() => {
    const set = new Set<string>();
    for (const c of alleClicks) set.add(getMonatKey(c.t));
    for (const f of alleFeedbacks) set.add(getMonatKey(f.t));
    if (set.size === 0) set.add(aktuellerMonat());
    return Array.from(set).sort().reverse();
  }, [alleClicks, alleFeedbacks]);

  // Daten nach gewähltem Monat filtern
  const clicks = useMemo(() => alleClicks.filter(c => isImMonat(c.t, monat)), [alleClicks, monat]);
  const feedbacks = useMemo(() => alleFeedbacks.filter(f => isImMonat(f.t, monat)), [alleFeedbacks, monat]);

  const nachProgramm = useMemo(() => {
    const map = new Map<string, { count: number; letzter: number }>();
    for (const c of clicks) {
      const e = map.get(c.p);
      if (e) { e.count++; if (c.t > e.letzter) e.letzter = c.t; }
      else map.set(c.p, { count: 1, letzter: c.t });
    }
    return Array.from(map.entries()).map(([programm, d]) => ({ programm, ...d })).sort((a, b) => b.count - a.count);
  }, [clicks]);

  const nachRechner = useMemo(() => {
    const map = new Map<string, Map<string, { count: number; letzter: number }>>();
    for (const c of clicks) {
      if (!map.has(c.r)) map.set(c.r, new Map());
      const prog = map.get(c.r)!;
      const e = prog.get(c.p);
      if (e) { e.count++; if (c.t > e.letzter) e.letzter = c.t; }
      else prog.set(c.p, { count: 1, letzter: c.t });
    }
    const result: { rechner: string; programm: string; count: number; letzter: number }[] = [];
    map.forEach((progs, rechner) => progs.forEach((d, programm) => result.push({ rechner, programm, ...d })));
    return result.sort((a, b) => b.count - a.count);
  }, [clicks]);

  const alleKlicks = useMemo(() => [...clicks].sort((a, b) => b.t - a.t), [clicks]);

  const feedbackStats = useMemo(() => {
    const map = new Map<string, { ja: number; nein: number; letzter: number }>();
    for (const f of feedbacks) {
      const e = map.get(f.r) || { ja: 0, nein: 0, letzter: 0 };
      if (f.v === 'ja') e.ja++; else e.nein++;
      if (f.t > e.letzter) e.letzter = f.t;
      map.set(f.r, e);
    }
    return Array.from(map.entries())
      .map(([rechner, d]) => {
        const gesamt = d.ja + d.nein;
        return { rechner, ...d, gesamt, rate: gesamt > 0 ? (d.ja / gesamt) * 100 : 0 };
      })
      .sort((a, b) => b.gesamt - a.gesamt);
  }, [feedbacks]);

  const feedbackGesamt = useMemo(() => {
    const ja = feedbacks.filter(f => f.v === 'ja').length;
    return { ja, nein: feedbacks.length - ja, gesamt: feedbacks.length };
  }, [feedbacks]);

  const fmtDate = (t: number) => {
    const d = new Date(t);
    return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
      + ' ' + d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  };

  // CSV generieren für gewählten Monat
  const buildCsv = useCallback(() => {
    const lines: string[] = [];
    lines.push('Typ;Datum;Programm/Bewertung;Context/Rechner;Seite');

    for (const c of [...clicks].sort((a, b) => a.t - b.t)) {
      lines.push(`Affiliate-Klick;${fmtDate(c.t)};${c.p};${c.c || '-'};${c.r}`);
    }
    for (const f of [...feedbacks].sort((a, b) => a.t - b.t)) {
      lines.push(`Feedback;${fmtDate(f.t)};${f.v === 'ja' ? 'Daumen hoch' : 'Daumen runter'};${f.r};${f.r}`);
    }

    lines.push('');
    lines.push('--- ZUSAMMENFASSUNG ---');
    lines.push(`Monat;${getMonatLabel(monat)}`);
    lines.push(`Affiliate-Klicks gesamt;${clicks.length}`);
    lines.push(`Feedback gesamt;${feedbacks.length}`);
    lines.push(`Daumen hoch;${feedbackGesamt.ja}`);
    lines.push(`Daumen runter;${feedbackGesamt.nein}`);
    if (feedbackGesamt.gesamt > 0) {
      lines.push(`Zufriedenheitsrate;${((feedbackGesamt.ja / feedbackGesamt.gesamt) * 100).toFixed(0)}%`);
    }

    lines.push('');
    lines.push('--- AFFILIATE NACH PROGRAMM ---');
    lines.push('Programm;Klicks');
    for (const r of nachProgramm) lines.push(`${r.programm};${r.count}`);

    lines.push('');
    lines.push('--- FEEDBACK NACH RECHNER ---');
    lines.push('Rechner;Daumen hoch;Daumen runter;Gesamt;Zufriedenheit');
    for (const r of feedbackStats) lines.push(`${r.rechner};${r.ja};${r.nein};${r.gesamt};${r.rate.toFixed(0)}%`);

    return lines.join('\n');
  }, [clicks, feedbacks, monat, feedbackGesamt, nachProgramm, feedbackStats]);

  const handleExport = () => {
    const blob = new Blob([buildCsv()], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rechenfix-bericht-${monat}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleBerichtSenden = async () => {
    setBerichtStatus('sending');
    try {
      const res = await fetch('/api/monthly-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ monat: getMonatLabel(monat), csv: buildCsv() }),
      });
      setBerichtStatus(res.ok ? 'sent' : 'error');
    } catch {
      setBerichtStatus('error');
    }
  };

  const handleLoeschen = async () => {
    if (!token) return;
    if (!confirm(`Alle Daten für ${getMonatLabel(monat)} unwiderruflich löschen?`)) return;
    try {
      const res = await fetch(`/api/stats?monat=${monat}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        await ladeStats(token);
      }
    } catch { /* ignore */ }
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: 'programm', label: 'Nach Programm' },
    { key: 'rechner', label: 'Nach Rechner' },
    { key: 'alle', label: 'Alle Klicks' },
    { key: 'feedback', label: 'Feedback' },
  ];

  // Login-Screen
  if (!token) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Admin-Login</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Passwort erforderlich für Zugriff auf die Affiliate- &amp; Feedback-Statistiken.
        </p>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            value={passwortEingabe}
            onChange={e => setPasswortEingabe(e.target.value)}
            placeholder="Passwort"
            autoFocus
            className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
          />
          {authFehler && (
            <p className="text-sm text-red-600 dark:text-red-400">
              Passwort falsch. Bitte erneut versuchen.
            </p>
          )}
          <button
            type="submit"
            disabled={!passwortEingabe}
            className="w-full px-4 py-3 text-sm font-medium rounded-xl bg-primary-500 text-white hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-h-[48px]"
          >
            Anmelden
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-start justify-between mb-2 gap-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Affiliate- &amp; Feedback-Statistiken
        </h1>
        <button
          onClick={handleLogout}
          className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 underline"
        >
          Abmelden
        </button>
      </div>

      <p className="text-sm text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-lg px-3 py-2 mb-6">
        Monatliche Auswertung. Daten werden serverseitig in Upstash Redis gespeichert und sind geräteübergreifend verfügbar.
      </p>

      {ladeStatus === 'lade' && (
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">Daten werden geladen …</div>
      )}
      {ladeStatus === 'fehler' && (
        <div className="text-sm text-red-600 dark:text-red-400 mb-6">
          Fehler beim Laden der Daten.
          <button onClick={() => token && ladeStats(token)} className="ml-2 underline">
            Erneut versuchen
          </button>
        </div>
      )}

      {/* Monatsauswahl */}
      <div className="flex items-center gap-3 mb-6">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Monat:</label>
        <select
          value={monat}
          onChange={e => { setMonat(e.target.value); setBerichtStatus('idle'); }}
          className="px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400"
        >
          {verfuegbareMonate.map(m => (
            <option key={m} value={m}>
              {getMonatLabel(m)}{m === aktuellerMonat() ? ' (aktuell)' : ''}
            </option>
          ))}
        </select>
      </div>

      {/* Übersicht */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Affiliate-Klicks</p>
          <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">{clicks.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Programme</p>
          <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">{nachProgramm.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Feedback</p>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">{feedbackGesamt.ja}</p>
          <p className="text-xs text-gray-600 dark:text-gray-500">👍 {feedbackGesamt.ja} / 👎 {feedbackGesamt.nein}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Zufriedenheit</p>
          <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
            {feedbackGesamt.gesamt > 0 ? `${((feedbackGesamt.ja / feedbackGesamt.gesamt) * 100).toFixed(0)}%` : '—'}
          </p>
        </div>
      </div>

      {/* Aktionen */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={handleExport}
          disabled={clicks.length === 0 && feedbacks.length === 0}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-primary-500 text-white hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          CSV exportieren
        </button>
        <button
          onClick={handleBerichtSenden}
          disabled={berichtStatus === 'sending' || berichtStatus === 'sent' || (clicks.length === 0 && feedbacks.length === 0)}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {berichtStatus === 'sending' ? 'Wird gesendet...' : berichtStatus === 'sent' ? 'Gesendet ✓' : berichtStatus === 'error' ? 'Fehler — erneut senden' : 'Bericht per E-Mail senden'}
        </button>
        <button
          onClick={handleLoeschen}
          disabled={clicks.length === 0 && feedbacks.length === 0}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Monat löschen
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
      {clicks.length === 0 && feedbacks.length === 0 ? (
        <div className="text-center py-12 text-gray-600 dark:text-gray-500">
          Keine Daten für {getMonatLabel(monat)} vorhanden.
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
          {tab === 'programm' && (
            clicks.length === 0 ? (
              <div className="text-center py-12 text-gray-600 dark:text-gray-500">Keine Affiliate-Klicks in diesem Monat.</div>
            ) : (
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
            )
          )}

          {tab === 'rechner' && (
            clicks.length === 0 ? (
              <div className="text-center py-12 text-gray-600 dark:text-gray-500">Keine Affiliate-Klicks in diesem Monat.</div>
            ) : (
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
            )
          )}

          {tab === 'alle' && (
            clicks.length === 0 ? (
              <div className="text-center py-12 text-gray-600 dark:text-gray-500">Keine Affiliate-Klicks in diesem Monat.</div>
            ) : (
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
            )
          )}

          {tab === 'feedback' && (
            feedbacks.length === 0 ? (
              <div className="text-center py-12 text-gray-600 dark:text-gray-500">Keine Feedback-Daten in diesem Monat.</div>
            ) : (
              <>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/50 text-left">
                    <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Rechner</th>
                    <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300 text-right">👍</th>
                    <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300 text-right">👎</th>
                    <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300 text-right">Gesamt</th>
                    <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300 text-right">Zufriedenheit</th>
                    <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300 text-right">Letztes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {feedbackStats.map(r => (
                    <tr key={r.rechner} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                      <td className="px-4 py-3 text-gray-800 dark:text-gray-200 font-mono text-xs">{r.rechner}</td>
                      <td className="px-4 py-3 text-right tabular-nums text-green-600 dark:text-green-400">{r.ja}</td>
                      <td className="px-4 py-3 text-right tabular-nums text-red-600 dark:text-red-400">{r.nein}</td>
                      <td className="px-4 py-3 text-right tabular-nums text-gray-600 dark:text-gray-400">{r.gesamt}</td>
                      <td className="px-4 py-3 text-right">
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                          r.rate >= 80 ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400'
                            : r.rate >= 50 ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400'
                            : 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400'
                        }`}>
                          {r.rate.toFixed(0)}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-gray-500 dark:text-gray-400">{fmtDate(r.letzter)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="border-t border-gray-200 dark:border-gray-700 mt-2">
                <p className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide bg-gray-50 dark:bg-gray-700/30">Einzelne Feedbacks</p>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700/50 text-left">
                      <th className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300">Datum/Uhrzeit</th>
                      <th className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300">Bewertung</th>
                      <th className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300">Rechner</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {[...feedbacks].sort((a, b) => b.t - a.t).map((f, i) => (
                      <tr key={`fb-${f.t}-${i}`} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                        <td className="px-4 py-2 text-gray-500 dark:text-gray-400 whitespace-nowrap">{fmtDate(f.t)}</td>
                        <td className="px-4 py-2">{f.v === 'ja' ? <span className="text-green-600 dark:text-green-400">👍 Ja</span> : <span className="text-red-600 dark:text-red-400">👎 Nein</span>}</td>
                        <td className="px-4 py-2 text-gray-800 dark:text-gray-200 font-mono text-xs">{f.r}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              </>
            )
          )}
        </div>
      )}
    </div>
  );
}
