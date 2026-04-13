'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { berechneMutterschutz, type GeburtsArt, type Beschaeftigung } from '@/lib/berechnungen/mutterschutz';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

function toIso(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function defaultET(): string {
  const d = new Date();
  d.setDate(d.getDate() + 84); // +12 Wochen
  return toIso(d);
}

function fmtDatum(d: Date): string {
  return d.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

function fmtDatumKurz(d: Date): string {
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

const GEBURTS_ARTEN: { key: GeburtsArt; label: string }[] = [
  { key: 'normal', label: 'Normale Geburt' },
  { key: 'fruehgeburt', label: 'Frühgeburt' },
  { key: 'mehrlingsgeburt', label: 'Mehrlingsgeburt' },
  { key: 'behinderung', label: 'Kind mit Behinderung' },
];

const BESCHAEFTIGUNG_ARTEN: { key: Beschaeftigung; label: string }[] = [
  { key: 'gesetzlich', label: 'Angestellt (gesetzlich versichert)' },
  { key: 'privat', label: 'Angestellt (privat versichert)' },
  { key: 'minijob', label: 'Minijob' },
  { key: 'selbststaendig', label: 'Selbstständig' },
];

export default function MutterschutzRechner() {
  const [geburtstermin, setGeburtstermin] = useState(defaultET());
  const [geburtsArt, setGeburtsArt] = useState<GeburtsArt>('normal');
  const [tatsaechlich, setTatsaechlich] = useState('');
  const [nettoGehalt, setNettoGehalt] = useState('2500');
  const [beschaeftigung, setBeschaeftigung] = useState<Beschaeftigung>('gesetzlich');

  const nNettoGehalt = parseDeutscheZahl(nettoGehalt);

  const ergebnis = useMemo(
    () =>
      berechneMutterschutz({
        geburtstermin,
        geburtsArt,
        tatsaechlichesGeburtsdatum: tatsaechlich,
        nettoGehalt: nNettoGehalt,
        beschaeftigung,
      }),
    [geburtstermin, geburtsArt, tatsaechlich, nNettoGehalt, beschaeftigung],
  );

  const fmt = (n: number) => Math.round(n).toLocaleString('de-DE');
  const fmtDez = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      {/* Geburtstermin */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Errechneter Geburtstermin</label>
          <input
            type="date"
            value={geburtstermin}
            onChange={e => setGeburtstermin(e.target.value)}
            className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
          />
          <CrossLink href="/gesundheit/geburtstermin-rechner" emoji="👶" text="Geburtstermin berechnen" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Art der Geburt</label>
          <select
            value={geburtsArt}
            onChange={e => setGeburtsArt(e.target.value as GeburtsArt)}
            className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
          >
            {GEBURTS_ARTEN.map(g => (
              <option key={g.key} value={g.key}>{g.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tatsächliches Geburtsdatum */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tatsächliches Geburtsdatum (optional)</label>
        <input
          type="date"
          value={tatsaechlich}
          onChange={e => setTatsaechlich(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
        />
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Falls Ihr Kind schon geboren ist. Bei Frühgeburt verlängert sich der Mutterschutz um die nicht in Anspruch genommenen Tage vor der Geburt.
        </p>
      </div>

      {/* Gehalt und Beschäftigung */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Netto-Monatsgehalt (Ø letzte 3 Monate)</label>
          <NummerEingabe value={nettoGehalt} onChange={setNettoGehalt} placeholder="z.B. 2500" einheit="€" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Beschäftigungsverhältnis</label>
          <select
            value={beschaeftigung}
            onChange={e => setBeschaeftigung(e.target.value as Beschaeftigung)}
            className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
          >
            {BESCHAEFTIGUNG_ARTEN.map(b => (
              <option key={b.key} value={b.key}>{b.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* Zeitleiste */}
          <div className="result-box mb-6">
            <p className="text-white/80 text-sm mb-3">Mutterschutz-Zeitraum</p>
            <div className="relative">
              {/* Balken */}
              <div className="h-4 bg-white/20 rounded-full overflow-hidden flex">
                <div
                  className="bg-pink-300/60 h-full"
                  style={{ width: `${(ergebnis.tageVorGeburt / ergebnis.gesamtTage) * 100}%` }}
                />
                <div className="w-1 bg-white h-full flex-shrink-0" />
                <div
                  className="bg-pink-200/80 h-full flex-1"
                />
              </div>
              {/* Labels */}
              <div className="flex justify-between mt-2 text-xs text-white/80">
                <div>
                  <div className="font-semibold text-white">Beginn</div>
                  <div>{fmtDatumKurz(ergebnis.beginn)}</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-white">
                    {ergebnis.tatsaechlicheGeburt ? 'Geburt' : 'ET'}
                  </div>
                  <div>
                    {fmtDatumKurz(ergebnis.tatsaechlicheGeburt || ergebnis.geburtstermin)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-white">Ende</div>
                  <div>{fmtDatumKurz(ergebnis.ende)}</div>
                </div>
              </div>
            </div>
            <div className="mt-3 text-center">
              <span className="text-2xl font-bold">{ergebnis.gesamtTage} Tage</span>
              <span className="text-white/70 text-sm ml-2">({ergebnis.gesamtWochen} Wochen)</span>
            </div>
          </div>

          {/* Fristen-Übersicht */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
            <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Fristen-Übersicht</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Mutterschutz-Beginn</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{fmtDatum(ergebnis.beginn)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  {ergebnis.tatsaechlicheGeburt ? 'Tatsächliche Geburt' : 'Errechneter Geburtstermin'}
                </span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  {fmtDatum(ergebnis.tatsaechlicheGeburt || ergebnis.geburtstermin)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Mutterschutz-Ende</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{fmtDatum(ergebnis.ende)}</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-gray-200 dark:border-gray-600">
                <span className="text-gray-600 dark:text-gray-400">Gesamtdauer</span>
                <span className="font-bold text-gray-800 dark:text-gray-200">{ergebnis.gesamtWochen} Wochen ({ergebnis.gesamtTage} Tage)</span>
              </div>
              {ergebnis.verlaengerungTage > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Verlängerung</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">+{ergebnis.verlaengerungTage} Tage</span>
                </div>
              )}
            </div>
          </div>

          {/* Mutterschaftsgeld */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 mb-6">
            <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-4">Mutterschaftsgeld</h3>
            {beschaeftigung !== 'selbststaendig' && (
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {beschaeftigung === 'privat' ? 'Bundesamt (einmalig)' : 'Krankenkasse'}
                  </span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {beschaeftigung === 'privat'
                      ? `${fmt(ergebnis.einmalzahlungPrivat)} € (einmalig)`
                      : `${fmtDez(ergebnis.kasseSatzTag)} €/Tag = ${fmt(ergebnis.kasseMonat)} €/Monat`
                    }
                  </span>
                </div>
                {beschaeftigung !== 'minijob' && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Arbeitgeberzuschuss</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{fmtDez(ergebnis.agZuschussTag)} €/Tag = {fmt(ergebnis.agZuschussMonat)} €/Monat</span>
                  </div>
                )}
                <div className="flex justify-between text-sm pt-2 border-t border-gray-200 dark:border-gray-600">
                  <span className="text-gray-700 dark:text-gray-200 font-bold">Ihr Einkommen im Mutterschutz</span>
                  <span className="font-bold text-green-600 dark:text-green-400">{fmt(ergebnis.einkommenMonat)} €/Monat</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Gesamt über {ergebnis.gesamtTage} Tage</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{fmt(ergebnis.gesamtEinkommen)} €</span>
                </div>
              </div>
            )}
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
              {ergebnis.geldHinweis}
            </p>
          </div>

          {/* Wichtige Termine */}
          <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-5 mb-6">
            <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-3">Wichtige Termine</h3>
            <div className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
              <div className="flex gap-3">
                <span className="font-semibold flex-shrink-0 w-44">Arbeitgeber informieren:</span>
                <span>{ergebnis.meldeTermin}</span>
              </div>
              <div className="flex gap-3">
                <span className="font-semibold flex-shrink-0 w-44">Mutterschaftsgeld beantragen:</span>
                <span>Ab {fmtDatumKurz(ergebnis.antragTermin)} (7 Wochen vor ET)</span>
              </div>
              <div className="flex gap-3">
                <span className="font-semibold flex-shrink-0 w-44">Elterngeld beantragen:</span>
                <span>{ergebnis.elterngeldFrist}</span>
              </div>
              <div className="mt-2 pt-2 border-t border-blue-200 dark:border-blue-500/30">
                <Link href="/finanzen/elterngeld-rechner" className="text-primary-600 dark:text-primary-400 hover:underline font-medium">
                  Elterngeld berechnen →
                </Link>
              </div>
            </div>
          </div>

          {/* Kündigungsschutz-Hinweis */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-2">
            <p className="text-amber-800 dark:text-amber-300 text-xs">
              <strong>Kündigungsschutz:</strong> Während des Mutterschutzes und der gesamten Schwangerschaft besteht Kündigungsschutz (§ 17 MuSchG). Der Arbeitgeber darf Ihnen nicht kündigen — auch nicht in der Probezeit.
            </p>
          </div>

          <CrossLink href="/finanzen/elterngeld-rechner" emoji="💰" text="Elterngeld berechnen — wie viel steht Ihnen zu?" />

          <AffiliateBox programId="wiso" context="mutterschutz" />

          <ErgebnisAktionen
            ergebnisText={`Mutterschutz: ${fmtDatumKurz(ergebnis.beginn)} bis ${fmtDatumKurz(ergebnis.ende)} (${ergebnis.gesamtTage} Tage) | Einkommen: ${fmt(ergebnis.einkommenMonat)} €/Monat | Gesamt: ${fmt(ergebnis.gesamtEinkommen)} €`}
            seitenTitel="Mutterschutz-Rechner"
          />

          <AiExplain
            rechnerName="Mutterschutz-Rechner"
            eingaben={{
              geburtstermin,
              geburtsArt: GEBURTS_ARTEN.find(g => g.key === geburtsArt)?.label || geburtsArt,
              tatsaechlichesGeburtsdatum: tatsaechlich || 'noch nicht geboren',
              nettoGehalt: nNettoGehalt,
              beschaeftigung: BESCHAEFTIGUNG_ARTEN.find(b => b.key === beschaeftigung)?.label || beschaeftigung,
            }}
            ergebnis={{
              beginn: fmtDatumKurz(ergebnis.beginn),
              ende: fmtDatumKurz(ergebnis.ende),
              gesamtTage: ergebnis.gesamtTage,
              einkommenMonat: ergebnis.einkommenMonat,
              gesamtEinkommen: ergebnis.gesamtEinkommen,
            }}
          />
        </>
      )}
    </div>
  );
}
