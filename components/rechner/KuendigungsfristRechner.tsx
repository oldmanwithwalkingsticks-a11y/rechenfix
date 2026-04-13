'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { berechneKuendigungsfrist, type Kuendiger } from '@/lib/berechnungen/kuendigungsfrist';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';

function toIso(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function defaultBeschaeftigtSeit(): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 3);
  return toIso(d);
}

function fmtDatum(d: Date): string {
  return d.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

function fmtDatumKurz(d: Date): string {
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export default function KuendigungsfristRechner() {
  const [kuendiger, setKuendiger] = useState<Kuendiger>('arbeitnehmer');
  const [beschaeftigtSeit, setBeschaeftigtSeit] = useState(defaultBeschaeftigtSeit());
  const [probezeit, setProbezeit] = useState(false);
  const [probezeitDauer, setProbezeitDauer] = useState<3 | 6>(6);
  const [kuendigungsDatum, setKuendigungsDatum] = useState(toIso(new Date()));
  const [abweichendeFrist, setAbweichendeFrist] = useState(false);
  const [individuelleFristWochen, setIndividuelleFristWochen] = useState('4');

  const ergebnis = useMemo(
    () =>
      berechneKuendigungsfrist({
        kuendiger,
        beschaeftigtSeit,
        probezeit,
        probezeitDauer,
        kuendigungsDatum,
        abweichendeFrist,
        individuelleFristWochen: parseInt(individuelleFristWochen) || 4,
      }),
    [kuendiger, beschaeftigtSeit, probezeit, probezeitDauer, kuendigungsDatum, abweichendeFrist, individuelleFristWochen],
  );

  // Zeitleiste-Daten
  const zeitleiste = useMemo(() => {
    if (!ergebnis) return null;
    const heute = new Date();
    heute.setHours(0, 0, 0, 0);
    const kd = new Date(kuendigungsDatum);
    const la = ergebnis.letzterArbeitstag;
    const totalDays = Math.max(1, Math.floor((la.getTime() - heute.getTime()) / 86400000));
    const kdPos = Math.max(0, Math.min(100, (Math.floor((kd.getTime() - heute.getTime()) / 86400000) / totalDays) * 100));
    return { heute, kdPos, totalDays };
  }, [ergebnis, kuendigungsDatum]);

  return (
    <div>
      {/* Wer kündigt? */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Wer kündigt?</label>
        <div className="flex gap-2">
          {([
            { key: 'arbeitnehmer' as const, label: 'Ich kündige (Arbeitnehmer)' },
            { key: 'arbeitgeber' as const, label: 'Mir wird gekündigt (Arbeitgeber)' },
          ]).map(o => (
            <button
              key={o.key}
              onClick={() => setKuendiger(o.key)}
              className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                kuendiger === o.key
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {/* Beschäftigt seit + Kündigungsdatum */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Beschäftigt seit</label>
          <input
            type="date"
            value={beschaeftigtSeit}
            onChange={e => setBeschaeftigtSeit(e.target.value)}
            className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
          />
          {ergebnis && (
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Betriebszugehörigkeit: {ergebnis.betriebszugehoerigkeitText}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kündigungsdatum (Zugang)</label>
          <input
            type="date"
            value={kuendigungsDatum}
            onChange={e => setKuendigungsDatum(e.target.value)}
            className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Datum, an dem die Kündigung zugestellt wird
          </p>
        </div>
      </div>

      {/* Probezeit */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Probezeit?</label>
        <div className="flex gap-2">
          {([false, true] as const).map(v => (
            <button
              key={String(v)}
              onClick={() => setProbezeit(v)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                probezeit === v
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {v ? 'Ja' : 'Nein'}
            </button>
          ))}
        </div>
      </div>

      {probezeit && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Probezeit-Dauer</label>
          <select
            value={probezeitDauer}
            onChange={e => setProbezeitDauer(parseInt(e.target.value) as 3 | 6)}
            className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
          >
            <option value={3}>3 Monate</option>
            <option value={6}>6 Monate</option>
          </select>
        </div>
      )}

      {/* Tarifvertrag / Sonderregelung */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Fristgrundlage</label>
        <div className="flex gap-2">
          {([
            { key: false, label: 'Gesetzliche Frist' },
            { key: true, label: 'Abweichende Frist' },
          ] as const).map(o => (
            <button
              key={String(o.key)}
              onClick={() => setAbweichendeFrist(o.key)}
              className={`flex-1 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                abweichendeFrist === o.key
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {abweichendeFrist && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Individuelle Frist</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              inputMode="numeric"
              value={individuelleFristWochen}
              onChange={e => setIndividuelleFristWochen(e.target.value)}
              min={1}
              max={52}
              className="w-24 px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">Wochen</span>
          </div>
        </div>
      )}

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-6">
            <p className="text-white/80 text-sm mb-1">Frühestmöglicher letzter Arbeitstag</p>
            <p className="text-4xl sm:text-5xl font-bold">{fmtDatum(ergebnis.letzterArbeitstag)}</p>
          </div>

          {/* Details */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Kündigungsfrist</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{ergebnis.kuendigungsFristText}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Betriebszugehörigkeit</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{ergebnis.betriebszugehoerigkeitText}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Verbleibende Kalendertage</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{ergebnis.verbleibendeKalendertage} Tage</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Rechtsgrundlage</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{ergebnis.rechtsgrundlage}</span>
              </div>
              <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                <Link
                  href="/arbeit/urlaubstage-rechner"
                  className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Prüfen Sie Ihren Resturlaub → Urlaubstage-Rechner
                </Link>
              </div>
            </div>
          </div>

          {/* Zeitleiste */}
          {zeitleiste && (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 mb-6">
              <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Zeitleiste</h3>
              <div className="relative">
                {/* Linie */}
                <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full relative">
                  <div
                    className="absolute inset-y-0 left-0 bg-primary-400 dark:bg-primary-500 rounded-full"
                    style={{ width: `${zeitleiste.kdPos}%` }}
                  />
                </div>
                {/* Marker */}
                <div className="flex justify-between mt-3 text-xs text-gray-500 dark:text-gray-400">
                  <div className="text-center">
                    <div className="font-semibold text-gray-700 dark:text-gray-300">Heute</div>
                    <div>{fmtDatumKurz(zeitleiste.heute)}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-700 dark:text-gray-300">Kündigung zugestellt</div>
                    <div>{fmtDatumKurz(ergebnis.kuendigungsDatum)}</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-primary-600 dark:text-primary-400">Letzter Arbeitstag</div>
                    <div>{fmtDatumKurz(ergebnis.letzterArbeitstag)}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Warnhinweise */}
          {ergebnis.warnhinweise.length > 0 && (
            <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6 space-y-2">
              {ergebnis.warnhinweise.map((h, i) => (
                <p key={i} className="text-amber-800 dark:text-amber-300 text-xs">
                  <strong>⚠️ Hinweis:</strong> {h}
                </p>
              ))}
            </div>
          )}

          {/* Affiliate — besonders bei AG-Kündigung */}
          {kuendiger === 'arbeitgeber' && (
            <AffiliateBox programId="ks-auxilia" context="kuendigung" />
          )}

          <ErgebnisAktionen
            ergebnisText={`Letzter Arbeitstag: ${fmtDatum(ergebnis.letzterArbeitstag)} | Kündigungsfrist: ${ergebnis.kuendigungsFristText} | Betriebszugehörigkeit: ${ergebnis.betriebszugehoerigkeitText} | ${ergebnis.rechtsgrundlage}`}
            seitenTitel="Kündigungsfrist-Rechner"
          />

          <AiExplain
            rechnerName="Kündigungsfrist-Rechner"
            eingaben={{
              kuendiger: kuendiger === 'arbeitnehmer' ? 'Arbeitnehmer' : 'Arbeitgeber',
              beschaeftigtSeit,
              probezeit: probezeit ? `Ja (${probezeitDauer} Monate)` : 'Nein',
              kuendigungsDatum,
              fristgrundlage: abweichendeFrist ? `Abweichend: ${individuelleFristWochen} Wochen` : 'Gesetzlich',
            }}
            ergebnis={{
              letzterArbeitstag: fmtDatum(ergebnis.letzterArbeitstag),
              kuendigungsfrist: ergebnis.kuendigungsFristText,
              betriebszugehoerigkeit: ergebnis.betriebszugehoerigkeitText,
              verbleibendeKalendertage: ergebnis.verbleibendeKalendertage,
              rechtsgrundlage: ergebnis.rechtsgrundlage,
            }}
          />
        </>
      )}
    </div>
  );
}
