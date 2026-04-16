'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';

type Groesse = 'aufstell' | 'klein' | 'mittel' | 'gross' | 'eigen';
type Heizung = 'keine' | 'waermepumpe' | 'solar';
type Saison = 'mai-sep' | 'apr-okt' | 'ganz';

const GROESSE_M3: Record<Exclude<Groesse, 'eigen'>, number> = {
  aufstell: 10,
  klein: 20,
  mittel: 40,
  gross: 60,
};

const GROESSE_LABEL: Record<Groesse, string> = {
  aufstell: 'Aufstellpool (10 m³)',
  klein: 'Klein (20 m³)',
  mittel: 'Mittel (40 m³)',
  gross: 'Groß (60 m³)',
  eigen: 'Eigene Angabe',
};

const SAISON_INFO: Record<Saison, { tage: number; monate: number; label: string }> = {
  'mai-sep': { tage: 153, monate: 5, label: 'Mai–September (5 Monate)' },
  'apr-okt': { tage: 214, monate: 7, label: 'April–Oktober (7 Monate)' },
  ganz: { tage: 365, monate: 12, label: 'Ganzjährig' },
};

export default function PoolkostenRechner() {
  const [groesse, setGroesse] = useState<Groesse>('mittel');
  const [laenge, setLaenge] = useState('5');
  const [breite, setBreite] = useState('3');
  const [tiefe, setTiefe] = useState('1,5');
  const [heizung, setHeizung] = useState<Heizung>('keine');
  const [abdeckung, setAbdeckung] = useState(true);
  const [saison, setSaison] = useState<Saison>('mai-sep');
  const [strompreis, setStrompreis] = useState('32');
  const [wasserpreis, setWasserpreis] = useState('4');

  const volumen = useMemo(() => {
    if (groesse === 'eigen') {
      return parseDeutscheZahl(laenge) * parseDeutscheZahl(breite) * parseDeutscheZahl(tiefe);
    }
    return GROESSE_M3[groesse];
  }, [groesse, laenge, breite, tiefe]);

  const nStrom = parseDeutscheZahl(strompreis);
  const nWasser = parseDeutscheZahl(wasserpreis);

  const ergebnis = useMemo(() => {
    const info = SAISON_INFO[saison];
    const tage = info.tage;

    // Wasser: 1× Füllung + 20 % Nachfüllung
    const wasser = volumen * 1.2 * nWasser;

    // Filterpumpe: 8 h/Tag × 0,5 kW (größer bei größeren Pools)
    const pumpenLeistung = volumen < 25 ? 0.4 : volumen < 50 ? 0.6 : 0.9;
    const filterStromKwh = 8 * pumpenLeistung * tage;
    const filterKosten = (filterStromKwh * nStrom) / 100;

    // Heizung
    let heizStromKwh = 0;
    if (heizung === 'waermepumpe') {
      heizStromKwh = (volumen / 40) * 4.5 * tage; // 3–6 kWh/Tag skaliert nach Größe
      if (abdeckung) heizStromKwh *= 0.70; // 30 % Ersparnis
    }
    const heizKosten = (heizStromKwh * nStrom) / 100;

    // Chemie: 7,50 €/m³ (reduziert bei Abdeckung)
    const chemieBase = volumen * 7.5;
    const chemie = abdeckung ? chemieBase * 0.80 : chemieBase;

    // Wartung pauschal: 250 € + 4 €/m³
    const wartung = 250 + volumen * 4;

    const gesamt = wasser + filterKosten + heizKosten + chemie + wartung;
    const proMonat = gesamt / info.monate;
    const proBadetag = gesamt / tage;

    return {
      volumen,
      wasser,
      filterStromKwh,
      filterKosten,
      heizStromKwh,
      heizKosten,
      chemie,
      wartung,
      gesamt,
      proMonat,
      proBadetag,
      tage,
      monate: info.monate,
    };
  }, [volumen, heizung, abdeckung, saison, nStrom, nWasser]);

  const fmt = (n: number) =>
    n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmt0 = (n: number) =>
    n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <div>
      {/* Poolgröße */}
      <div className="mb-5">
        <label htmlFor="poolkosten-select-1" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Poolgröße</label>
        <select id="poolkosten-select-1"
          value={groesse}
          onChange={e => setGroesse(e.target.value as Groesse)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
        >
          {(Object.keys(GROESSE_LABEL) as Groesse[]).map(k => (
            <option key={k} value={k}>{GROESSE_LABEL[k]}</option>
          ))}
        </select>
      </div>

      {groesse === 'eigen' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Länge</label>
            <NummerEingabe value={laenge} onChange={setLaenge} placeholder="5" einheit="m" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Breite</label>
            <NummerEingabe value={breite} onChange={setBreite} placeholder="3" einheit="m" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tiefe</label>
            <NummerEingabe value={tiefe} onChange={setTiefe} placeholder="1,5" einheit="m" />
          </div>
        </div>
      )}

      {/* Beheizung */}
      <div className="mb-5">
        <RadioToggleGroup
          name="pool-heizung"
          legend="Beheizung"
          options={[
            { value: 'keine', label: 'Keine' },
            { value: 'waermepumpe', label: 'Wärmepumpe' },
            { value: 'solar', label: 'Solar' },
          ]}
          value={heizung}
          onChange={(v) => setHeizung(v as Heizung)}
          columns={3}
        />
      </div>

      {/* Abdeckung */}
      <div className="mb-5">
        <RadioToggleGroup
          name="pool-abdeckung"
          legend="Abdeckung"
          options={[
            { value: 'ja', label: 'Ja (spart Heizung + Chemie)' },
            { value: 'nein', label: 'Nein' },
          ]}
          value={abdeckung ? 'ja' : 'nein'}
          onChange={(v) => setAbdeckung(v === 'ja')}
        />
      </div>

      {/* Saison */}
      <div className="mb-5">
        <label htmlFor="poolkosten-select-2" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Saison</label>
        <select id="poolkosten-select-2"
          value={saison}
          onChange={e => setSaison(e.target.value as Saison)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
        >
          {(Object.keys(SAISON_INFO) as Saison[]).map(k => (
            <option key={k} value={k}>{SAISON_INFO[k].label}</option>
          ))}
        </select>
      </div>

      {/* Strom- und Wasserpreis */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Strompreis</label>
          <NummerEingabe value={strompreis} onChange={setStrompreis} placeholder="32" einheit="ct/kWh" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Wasserpreis</label>
          <NummerEingabe value={wasserpreis} onChange={setWasserpreis} placeholder="4" einheit="€/m³" />
        </div>
      </div>

      {/* Ergebnis */}
      <div className="result-box mb-6" style={{ background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)' }}>
        <p className="text-white/90 text-sm mb-1">Jährliche Poolkosten ({fmt0(ergebnis.volumen)} m³)</p>
        <p className="text-5xl font-bold">{fmt0(ergebnis.gesamt)} €</p>
        <p className="text-white/90 text-sm mt-2">
          ≈ {fmt0(ergebnis.proMonat)} €/Monat · {fmt(ergebnis.proBadetag)} €/Tag
        </p>
      </div>

      {/* Aufschlüsselung */}
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 mb-6">
        <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Aufschlüsselung</h2>
        <table className="w-full text-sm">
          <tbody>
            <tr className="text-gray-600 dark:text-gray-400">
              <td className="py-2">💧 Wasser (Füllung + 20 % Nachfüllung)</td>
              <td className="py-2 text-right font-medium text-gray-800 dark:text-gray-200 tabular-nums">{fmt0(ergebnis.wasser)} €</td>
            </tr>
            <tr className="text-gray-600 dark:text-gray-400">
              <td className="py-2">⚡ Filterpumpe (8 h/Tag)</td>
              <td className="py-2 text-right font-medium text-gray-800 dark:text-gray-200 tabular-nums">{fmt0(ergebnis.filterKosten)} €</td>
            </tr>
            <tr className="text-gray-600 dark:text-gray-400">
              <td className="py-2">🔥 Heizung {heizung === 'solar' ? '(Solar ≈ 0 €)' : heizung === 'keine' ? '(keine)' : ''}</td>
              <td className="py-2 text-right font-medium text-gray-800 dark:text-gray-200 tabular-nums">{fmt0(ergebnis.heizKosten)} €</td>
            </tr>
            <tr className="text-gray-600 dark:text-gray-400">
              <td className="py-2">🧪 Chemie (Chlor, pH, Algen)</td>
              <td className="py-2 text-right font-medium text-gray-800 dark:text-gray-200 tabular-nums">{fmt0(ergebnis.chemie)} €</td>
            </tr>
            <tr className="text-gray-600 dark:text-gray-400">
              <td className="py-2">🧹 Wartung & Zubehör</td>
              <td className="py-2 text-right font-medium text-gray-800 dark:text-gray-200 tabular-nums">{fmt0(ergebnis.wartung)} €</td>
            </tr>
            <tr className="border-t-2 border-primary-200 dark:border-primary-500/40 font-bold">
              <td className="py-2 text-primary-700 dark:text-primary-300">Gesamt / Jahr</td>
              <td className="py-2 text-right text-primary-700 dark:text-primary-300 tabular-nums">{fmt0(ergebnis.gesamt)} €</td>
            </tr>
          </tbody>
        </table>
      </div>

      <CrossLink href="/wohnen/stromkosten-rechner" emoji="💡" text="Stromkosten-Rechner: Jahresverbrauch und Kosten" />
      <CrossLink href="/wohnen/photovoltaik-rechner" emoji="☀️" text="Photovoltaik-Rechner: Pool mit Solarstrom betreiben" />

      <ErgebnisAktionen
        ergebnisText={`Poolkosten: ${fmt0(ergebnis.gesamt)} €/Jahr (${fmt0(ergebnis.volumen)} m³ Pool) — ${fmt0(ergebnis.proMonat)} €/Monat`}
        seitenTitel="Poolkosten-Rechner"
      />

      <AiExplain
        rechnerName="Poolkosten-Rechner"
        eingaben={{
          poolgroesse: GROESSE_LABEL[groesse],
          volumenM3: fmt0(ergebnis.volumen),
          beheizung: heizung,
          abdeckung: abdeckung ? 'Ja' : 'Nein',
          saison: SAISON_INFO[saison].label,
          strompreisCt: fmt(nStrom),
          wasserpreisEuro: fmt(nWasser),
        }}
        ergebnis={{
          gesamtJahrEuro: fmt0(ergebnis.gesamt),
          proMonatEuro: fmt0(ergebnis.proMonat),
          proTagEuro: fmt(ergebnis.proBadetag),
          wasserEuro: fmt0(ergebnis.wasser),
          filterStromEuro: fmt0(ergebnis.filterKosten),
          heizungEuro: fmt0(ergebnis.heizKosten),
          chemieEuro: fmt0(ergebnis.chemie),
          wartungEuro: fmt0(ergebnis.wartung),
        }}
      />
    </div>
  );
}
