'use client';

import { useState, useMemo } from 'react';
import {
  berechnePflegegeld,
  PFLEGEGELD_TABELLE,
  PFLEGESACHLEISTUNG_TABELLE,
  STATIONAER_TABELLE,
  type Pflegegrad,
  type Pflegeform,
} from '@/lib/berechnungen/pflegegeld';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';

const PFLEGEGRAD_INFO: Record<Pflegegrad, string> = {
  1: 'Geringe Beeinträchtigung',
  2: 'Erhebliche Beeinträchtigung',
  3: 'Schwere Beeinträchtigung',
  4: 'Schwerste Beeinträchtigung',
  5: 'Schwerste mit besonderen Anforderungen',
};

const PFLEGEFORM_OPTIONEN: { value: Pflegeform; label: string; icon: string }[] = [
  { value: 'angehoerige', label: 'Häusliche Pflege durch Angehörige', icon: '👨‍👩‍👧' },
  { value: 'dienst', label: 'Ambulanter Pflegedienst', icon: '🚑' },
  { value: 'kombination', label: 'Kombination (Angehörige + Dienst)', icon: '🤝' },
  { value: 'stationaer', label: 'Stationäre Pflege (Pflegeheim)', icon: '🏥' },
];

export default function PflegegeldRechner() {
  const [pflegegrad, setPflegegrad] = useState<Pflegegrad>(2);
  const [pflegeform, setPflegeform] = useState<Pflegeform>('angehoerige');
  const [anteilDienst, setAnteilDienst] = useState(50);

  const ergebnis = useMemo(
    () => berechnePflegegeld({ pflegegrad, pflegeform, anteilDienst }),
    [pflegegrad, pflegeform, anteilDienst],
  );

  const fmtEuro = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const pflegeformLabel = PFLEGEFORM_OPTIONEN.find(p => p.value === pflegeform)?.label || '';

  return (
    <div>
      {/* === 1: Pflegegrad === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Pflegegrad
        </h2>
        <div className="grid grid-cols-5 gap-2">
          {([1, 2, 3, 4, 5] as const).map(n => (
            <button
              key={n}
              onClick={() => setPflegegrad(n)}
              className={`px-2 py-3 rounded-xl text-sm font-semibold transition-all min-h-[56px] ${pflegegrad === n ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'}`}
            >
              <div className="text-lg font-bold">{n}</div>
              <div className="text-[10px] opacity-80">Grad</div>
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          <strong>Pflegegrad {pflegegrad}:</strong> {PFLEGEGRAD_INFO[pflegegrad]}
        </p>
      </div>

      {/* === 2: Pflegeform === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Pflegeform
        </h2>
        <RadioToggleGroup
          name="pflege-form"
          legend="Pflegeform"
          srOnlyLegend
          options={PFLEGEFORM_OPTIONEN.map(opt => ({
            value: opt.value,
            label: `${opt.icon} ${opt.label}`,
          }))}
          value={pflegeform}
          onChange={(v) => setPflegeform(v as Pflegeform)}
          columns={2}
        />
      </div>

      {/* === 3: Anteil Pflegedienst (nur bei Kombination) === */}
      {pflegeform === 'kombination' && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
            Anteil Pflegedienst
          </h2>
          <div className="space-y-2">
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={anteilDienst}
              onChange={e => setAnteilDienst(Number(e.target.value))}
              className="w-full accent-primary-500"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>0% (nur Angehörige)</span>
              <strong className="text-primary-600 dark:text-primary-400 text-base">{anteilDienst}%</strong>
              <span>100% (nur Dienst)</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Wie viel der Pflege übernimmt der professionelle Dienst?</p>
          </div>
        </div>
      )}

      {/* === ERGEBNIS === */}
      <div className="result-box mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <p className="text-white/80 text-sm mb-1">{pflegeformLabel}</p>
            <p className="text-5xl font-bold">{fmtEuro(ergebnis.hauptLeistungMonat)} €</p>
            <p className="text-white/80 text-sm mt-1">pro Monat · Pflegegrad {pflegegrad}</p>
          </div>
          <div className="sm:text-right space-y-1">
            <div>
              <span className="inline-block px-3 py-1 rounded-lg text-sm font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                {fmtEuro(ergebnis.hauptLeistungJahr)} €/Jahr
              </span>
            </div>
            <div>
              <span className="inline-block px-3 py-1 rounded-lg text-xs font-medium" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                + 125 € Entlastungsbetrag
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Kombinations-Visualisierung */}
      {pflegeform === 'kombination' && ergebnis.pflegesachleistungVoll > 0 && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6">
          <h2 className="font-bold text-gray-700 dark:text-gray-200 text-sm mb-3">🤝 Kombinationsleistung aufgeteilt</h2>
          <div className="flex h-8 rounded-lg overflow-hidden mb-3">
            <div
              className="bg-blue-500 flex items-center justify-center text-white text-xs font-semibold"
              style={{ width: `${anteilDienst}%` }}
            >
              {anteilDienst >= 15 && `${anteilDienst}% Dienst`}
            </div>
            <div
              className="bg-green-700 flex items-center justify-center text-white text-xs font-semibold"
              style={{ width: `${100 - anteilDienst}%` }}
            >
              {(100 - anteilDienst) >= 15 && `${100 - anteilDienst}% Angehörige`}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-blue-50 dark:bg-blue-500/10 rounded-lg p-3">
              <p className="text-xs text-blue-700 dark:text-blue-400 mb-1">Pflegesachleistung</p>
              <p className="text-lg font-bold text-blue-800 dark:text-blue-300">{fmtEuro(ergebnis.anteiligSachleistung)} €</p>
              <p className="text-xs text-blue-600/70 dark:text-blue-400/70">{anteilDienst}% von {fmtEuro(ergebnis.pflegesachleistungVoll)} €</p>
            </div>
            <div className="bg-green-50 dark:bg-green-500/10 rounded-lg p-3">
              <p className="text-xs text-green-700 dark:text-green-400 mb-1">Pflegegeld (anteilig)</p>
              <p className="text-lg font-bold text-green-800 dark:text-green-300">{fmtEuro(ergebnis.anteiligPflegegeld)} €</p>
              <p className="text-xs text-green-600/70 dark:text-green-400/70">{ergebnis.restProzentPflegegeld}% von {fmtEuro(ergebnis.pflegegeldVoll)} €</p>
            </div>
          </div>
        </div>
      )}

      {/* Leistungsübersicht aktueller Grad */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">Leistungen bei Pflegegrad {pflegegrad}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                <th className="px-4 py-2 text-left font-semibold">Leistung</th>
                <th className="px-4 py-2 text-right font-semibold">Monatlich</th>
                <th className="px-4 py-2 text-right font-semibold">Jährlich</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              <tr className={pflegeform === 'angehoerige' ? 'bg-primary-50 dark:bg-primary-500/10 font-semibold' : ''}>
                <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">Pflegegeld (Angehörige)</td>
                <td className="px-4 py-2.5 text-right tabular-nums whitespace-nowrap">{fmtEuro(ergebnis.pflegegeldVoll)} €</td>
                <td className="px-4 py-2.5 text-right tabular-nums whitespace-nowrap">{fmtEuro(ergebnis.pflegegeldVoll * 12)} €</td>
              </tr>
              <tr className={pflegeform === 'dienst' ? 'bg-primary-50 dark:bg-primary-500/10 font-semibold' : ''}>
                <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">Pflegesachleistung (Dienst)</td>
                <td className="px-4 py-2.5 text-right tabular-nums whitespace-nowrap">{fmtEuro(ergebnis.pflegesachleistungVoll)} €</td>
                <td className="px-4 py-2.5 text-right tabular-nums whitespace-nowrap">{fmtEuro(ergebnis.pflegesachleistungVoll * 12)} €</td>
              </tr>
              <tr className={pflegeform === 'stationaer' ? 'bg-primary-50 dark:bg-primary-500/10 font-semibold' : ''}>
                <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">Stationäre Pflege (Zuschuss)</td>
                <td className="px-4 py-2.5 text-right tabular-nums whitespace-nowrap">{fmtEuro(ergebnis.stationaerZuschuss)} €</td>
                <td className="px-4 py-2.5 text-right tabular-nums whitespace-nowrap">{fmtEuro(ergebnis.stationaerZuschuss * 12)} €</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-700/30">
                <td colSpan={3} className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300 text-xs uppercase tracking-wider">Zusatzleistungen (für alle Pflegegrade)</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">+ Entlastungsbetrag</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-green-600 dark:text-green-400 whitespace-nowrap">+{fmtEuro(ergebnis.entlastungsbetrag)} €</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-green-600 dark:text-green-400 whitespace-nowrap">+{fmtEuro(ergebnis.entlastungsbetrag * 12)} €</td>
              </tr>
              {ergebnis.verhinderungspflegeJahr > 0 && (
                <tr>
                  <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">Verhinderungspflege</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-gray-500 whitespace-nowrap">—</td>
                  <td className="px-4 py-2.5 text-right tabular-nums whitespace-nowrap">bis {fmtEuro(ergebnis.verhinderungspflegeJahr)} €</td>
                </tr>
              )}
              {ergebnis.kurzzeitpflegeJahr > 0 && (
                <tr>
                  <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">Kurzzeitpflege</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-gray-500 whitespace-nowrap">—</td>
                  <td className="px-4 py-2.5 text-right tabular-nums whitespace-nowrap">bis {fmtEuro(ergebnis.kurzzeitpflegeJahr)} €</td>
                </tr>
              )}
              <tr>
                <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">Pflegehilfsmittel (zum Verbrauch)</td>
                <td className="px-4 py-2.5 text-right tabular-nums whitespace-nowrap">bis {fmtEuro(ergebnis.pflegehilfsmittelMonat)} €</td>
                <td className="px-4 py-2.5 text-right tabular-nums whitespace-nowrap">bis {fmtEuro(ergebnis.pflegehilfsmittelMonat * 12)} €</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">Wohnraumanpassung (einmalig)</td>
                <td colSpan={2} className="px-4 py-2.5 text-right tabular-nums whitespace-nowrap">bis {fmtEuro(ergebnis.wohnraumanpassung)} € pro Maßnahme</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Vergleichstabelle alle Pflegegrade */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">Leistungsübersicht aller Pflegegrade 2026</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                <th className="px-4 py-2 text-left font-semibold">Grad</th>
                <th className="px-4 py-2 text-right font-semibold">Pflegegeld</th>
                <th className="px-4 py-2 text-right font-semibold">Sachleistung</th>
                <th className="px-4 py-2 text-right font-semibold">Stationär</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {([1, 2, 3, 4, 5] as const).map(g => (
                <tr key={g} className={g === pflegegrad ? 'bg-primary-50 dark:bg-primary-500/10 font-semibold' : ''}>
                  <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">Grad {g}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums whitespace-nowrap">{fmtEuro(PFLEGEGELD_TABELLE[g])} €</td>
                  <td className="px-4 py-2.5 text-right tabular-nums whitespace-nowrap">{fmtEuro(PFLEGESACHLEISTUNG_TABELLE[g])} €</td>
                  <td className="px-4 py-2.5 text-right tabular-nums whitespace-nowrap">{fmtEuro(STATIONAER_TABELLE[g])} €</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hinweis */}
      <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
        <p className="text-amber-800 dark:text-amber-300 text-xs">
          <strong>⚠️ Hinweis:</strong> Der Pflegegrad wird durch den Medizinischen Dienst (MD) festgestellt. Diese Berechnung zeigt die gesetzlichen Leistungen der Pflegeversicherung — die tatsächlichen Kosten eines Pflegeheims liegen oft deutlich höher (Eigenanteil von 2.000–3.000 € monatlich sind keine Seltenheit). Stand: 2026.
        </p>
      </div>

      <CrossLink href="/finanzen/buergergeld-rechner" emoji="📋" text="Bürgergeld berechnen — bei geringer Rente + Pflegekosten" />
      <CrossLink href="/finanzen/rentenrechner" emoji="🏖️" text="Rentenlücke berechnen — Altersvorsorge planen" />
      <CrossLink href="/finanzen/wohngeld-rechner" emoji="🏠" text="Wohngeld berechnen" />

      <ErgebnisAktionen
        ergebnisText={`Pflegegeld Grad ${pflegegrad} (${pflegeformLabel}): ${fmtEuro(ergebnis.hauptLeistungMonat)} €/Monat (${fmtEuro(ergebnis.hauptLeistungJahr)} €/Jahr) + 125 € Entlastungsbetrag`}
        seitenTitel="Pflegegeld-Rechner"
      />

      <AiExplain
        rechnerName="Pflegegeld-Rechner"
        eingaben={{
          pflegegrad,
          pflegeform: pflegeformLabel,
          anteilDienst: pflegeform === 'kombination' ? `${anteilDienst}%` : '—',
        }}
        ergebnis={{
          hauptLeistungMonat: `${ergebnis.hauptLeistungMonat} €`,
          hauptLeistungJahr: `${ergebnis.hauptLeistungJahr} €`,
          entlastungsbetrag: `${ergebnis.entlastungsbetrag} €`,
          verhinderungspflege: `bis ${ergebnis.verhinderungspflegeJahr} €/Jahr`,
          kurzzeitpflege: `bis ${ergebnis.kurzzeitpflegeJahr} €/Jahr`,
        }}
      />
    </div>
  );
}
