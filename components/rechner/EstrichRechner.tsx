'use client';

import { useState, useMemo } from 'react';
import { berechneEstrich, ESTRICH_TYPEN, PUTZ_TYPEN } from '@/lib/berechnungen/estrich';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function EstrichRechner() {
  const [material, setMaterial] = useState<'estrich' | 'putz'>('estrich');
  const [flaeche, setFlaeche] = useState('20');
  const [dicke, setDicke] = useState('50');
  const [estrichTyp, setEstrichTyp] = useState('zement');
  const [putzTyp, setPutzTyp] = useState('kalkzement');

  // Dicke-Default anpassen bei Material-Wechsel
  const handleMaterialChange = (val: string) => {
    setMaterial(val as 'estrich' | 'putz');
    if (val === 'estrich' && parseDeutscheZahl(dicke) < 30) setDicke('50');
    if (val === 'putz' && parseDeutscheZahl(dicke) > 30) setDicke('15');
  };

  const ergebnis = useMemo(() => {
    const f = parseDeutscheZahl(flaeche);
    const d = parseDeutscheZahl(dicke);
    const typId = material === 'estrich' ? estrichTyp : putzTyp;
    if (f <= 0 || d <= 0) return null;
    return berechneEstrich(material, typId, f, d);
  }, [material, flaeche, dicke, estrichTyp, putzTyp]);

  const typen = material === 'estrich' ? ESTRICH_TYPEN : PUTZ_TYPEN;

  return (
    <div>
      <div className="space-y-4 mb-6">
        <RadioToggleGroup
          legend="Material"
          name="material"
          options={[
            { value: 'estrich', label: 'Estrich (Boden)' },
            { value: 'putz', label: 'Putz/Mörtel (Wand)' },
          ]}
          value={material}
          onChange={handleMaterialChange}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fläche (m²)</label>
            <NummerEingabe value={flaeche} onChange={setFlaeche} placeholder="20" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Schichtdicke (mm)</label>
            <NummerEingabe value={dicke} onChange={setDicke} placeholder={material === 'estrich' ? '50' : '15'} />
          </div>
          <div>
            <label htmlFor="materialtyp" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Materialtyp</label>
            <select
              id="materialtyp"
              value={material === 'estrich' ? estrichTyp : putzTyp}
              onChange={e => material === 'estrich' ? setEstrichTyp(e.target.value) : setPutzTyp(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-3 px-3 text-base"
            >
              {typen.map(t => (
                <option key={t.id} value={t.id}>{t.label} ({t.dichte.toLocaleString('de-DE')} kg/m³)</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {ergebnis && (
        <>
          <div className="result-box mb-4">
            <p className="text-white/70 text-sm mb-2 text-center">{ergebnis.materialTypLabel} — {ergebnis.flaeche} m² × {ergebnis.dickeMm} mm</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-white/70 text-sm mb-1">Volumen</p>
                <p className="text-2xl font-bold">{ergebnis.volumen.toLocaleString('de-DE', { minimumFractionDigits: 2 })}</p>
                <p className="text-white/60 text-xs">m³</p>
              </div>
              <div>
                <p className="text-white/70 text-sm mb-1">Gewicht</p>
                <p className="text-2xl font-bold">{ergebnis.gewichtKg.toLocaleString('de-DE')}</p>
                <p className="text-white/60 text-xs">kg</p>
              </div>
              <div>
                <p className="text-white/70 text-sm mb-1">Säcke ({ergebnis.sackgewichtKg} kg)</p>
                <p className="text-2xl font-bold">{ergebnis.anzahlSaecke}</p>
                <p className="text-white/60 text-xs">Stück (inkl. 5 % Reserve)</p>
              </div>
              <div>
                <p className="text-white/70 text-sm mb-1">Kosten</p>
                <p className="text-2xl font-bold">~{fmt(ergebnis.kostenGesamt)}</p>
                <p className="text-white/60 text-xs">€</p>
              </div>
            </div>
          </div>

          {/* Rechenweg */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Berechnung</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Fläche × Dicke</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{ergebnis.flaeche} m² × {ergebnis.dickeMm} mm = {ergebnis.volumen.toLocaleString('de-DE', { minimumFractionDigits: 2 })} m³</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">× Dichte ({ergebnis.materialTypLabel})</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{ergebnis.dichte.toLocaleString('de-DE')} kg/m³ = {ergebnis.gewichtKg.toLocaleString('de-DE')} kg</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">+ 5 % Reserve ÷ {ergebnis.sackgewichtKg} kg/Sack</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{ergebnis.anzahlSaecke} Säcke</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">× {fmt(ergebnis.kostenProSack)} €/Sack</span>
                <span className="font-bold text-primary-600 dark:text-primary-400">~{fmt(ergebnis.kostenGesamt)} €</span>
              </div>
            </div>
          </div>

          <CrossLink href="/wohnen/beton-rechner" emoji="🧱" text="Betonmenge berechnen" />
          <CrossLink href="/wohnen/quadratmeter-rechner" emoji="📏" text="Quadratmeter berechnen" />
          <CrossLink href="/wohnen/laminat-rechner" emoji="🪵" text="Laminatbedarf berechnen" />

          <ErgebnisAktionen
            ergebnisText={`${ergebnis.materialTypLabel}: ${ergebnis.flaeche} m² × ${ergebnis.dickeMm} mm = ${ergebnis.gewichtKg.toLocaleString('de-DE')} kg, ${ergebnis.anzahlSaecke} Säcke (~${fmt(ergebnis.kostenGesamt)} €)`}
            seitenTitel="Estrich-Rechner"
          />

          <AiExplain
            rechnerName="Estrich-Rechner"
            eingaben={{
              material: ergebnis.materialTypLabel,
              flaeche: ergebnis.flaeche,
              dickeMm: ergebnis.dickeMm,
            }}
            ergebnis={{
              volumen: ergebnis.volumen,
              gewichtKg: ergebnis.gewichtKg,
              saecke: ergebnis.anzahlSaecke,
              kosten: ergebnis.kostenGesamt,
            }}
          />
        </>
      )}
    </div>
  );
}
