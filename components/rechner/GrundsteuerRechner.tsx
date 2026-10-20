'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import {
  berechneGrundsteuer,
  BUNDESMODELL_LAENDER,
  type BundesmodellLand,
  type GrundsteuerModell,
  type Grundstuecksart,
  type MesszahlErmaessigung,
} from '@/lib/berechnungen/grundsteuer';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';

type Modell = GrundsteuerModell;

export default function GrundsteuerRechner() {
  const [modell, setModell] = useState<Modell>('bund');
  const [art, setArt] = useState<Grundstuecksart>('etw');
  const [bodenrichtwert, setBodenrichtwert] = useState('200');
  const [grundflaeche, setGrundflaeche] = useState('400');
  const [wohnflaeche, setWohnflaeche] = useState('120');
  const [baujahr, setBaujahr] = useState('1990');
  const [hebesatz, setHebesatz] = useState('500');
  // W187: neue Eingaben für das Ertragswertverfahren nach §§ 252–257 BewG (Bundesmodell)
  const [land, setLand] = useState<BundesmodellLand>('NW');
  const [mietniveaustufe, setMietniveaustufe] = useState('3');
  const [meaZaehler, setMeaZaehler] = useState('250');
  const [meaNenner, setMeaNenner] = useState('1000');
  const [anzahlWohnungen, setAnzahlWohnungen] = useState('6');
  const [ermaessigung, setErmaessigung] = useState<MesszahlErmaessigung>('keine');

  const ergebnis = useMemo(
    () =>
      berechneGrundsteuer({
        modell,
        art,
        bodenrichtwert: parseDeutscheZahl(bodenrichtwert) || 0,
        grundflaeche: parseDeutscheZahl(grundflaeche) || 0,
        wohnflaeche: parseDeutscheZahl(wohnflaeche) || 0,
        baujahr: parseDeutscheZahl(baujahr) || 2000,
        hebesatz: parseDeutscheZahl(hebesatz) || 0,
        land,
        mietniveaustufe: Number(mietniveaustufe),
        miteigentumsanteil: (parseDeutscheZahl(meaNenner) || 0) > 0
          ? (parseDeutscheZahl(meaZaehler) || 0) / parseDeutscheZahl(meaNenner)
          : 1,
        anzahlWohnungen: parseDeutscheZahl(anzahlWohnungen) || 3,
        ermaessigung,
      }),
    [modell, art, bodenrichtwert, grundflaeche, wohnflaeche, baujahr, hebesatz, land, mietniveaustufe, meaZaehler, meaNenner, anzahlWohnungen, ermaessigung],
  );
  const istBund = modell === 'bund';
  const bm = ergebnis.bundesmodell;
  const landName = BUNDESMODELL_LAENDER.find(l => l.kuerzel === land)?.name ?? land;
  const fmtProzent = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const fmtFaktor = (n: number, stellen: number) => n.toLocaleString('de-DE', { minimumFractionDigits: stellen, maximumFractionDigits: stellen });
  const fmtPromille = (n: number) => (n * 1000).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 4 });
  const selectKlasse = 'w-full min-h-[48px] px-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-sm text-gray-800 dark:text-gray-200';

  const fmtEuro = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const fmtEuro2 = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  // W184: Hebesatz vorher roh aus der Eingabe („475.5 %“), jetzt de-DE
  const fmtHebesatz = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 2 });

  return (
    <div>
      {/* 1: Modell */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Berechnungsmodell
        </h2>
        <RadioToggleGroup
          name="grundsteuer-modell"
          legend="Berechnungsmodell"
          srOnlyLegend
          options={[
            { value: 'bund', label: 'Bundesmodell', description: 'Die meisten Länder' },
            { value: 'bayern', label: 'Bayern', description: 'Flächenmodell' },
            { value: 'bw', label: 'Baden-Württemberg', description: 'Bodenwertmodell' },
          ]}
          value={modell}
          onChange={(v) => setModell(v as Modell)}
          columns={3}
        />
        {/* W187: Hinweis auf nicht abgebildete Ländermodelle (vorher keiner) */}
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Hamburg, Hessen und Niedersachsen haben eigene Modelle, die dieser Rechner nicht abbildet.
        </p>
        {istBund && (
          <div className="mt-3">
            <label htmlFor="grundsteuer-land" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Bundesland</label>
            <select id="grundsteuer-land" value={land} onChange={e => setLand(e.target.value as BundesmodellLand)} className={selectKlasse}>
              {BUNDESMODELL_LAENDER.map(l => (
                <option key={l.kuerzel} value={l.kuerzel}>{l.name}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* 2: Grundstücksart */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Grundstücksart
        </h2>
        <select id="grundsteuer-select-1" aria-label="Grundstücksart"
          value={art}
          onChange={e => setArt(e.target.value as Grundstuecksart)}
          className="w-full min-h-[48px] px-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-sm text-gray-800 dark:text-gray-200"
        >
          {/* W187: vorher eine Option „Ein-/Zweifamilienhaus“; Anlage 39 BewG unterscheidet beide */}
          <option value="efh">Einfamilienhaus</option>
          <option value="zfh">Zweifamilienhaus</option>
          <option value="etw">Eigentumswohnung</option>
          <option value="miet">Mietwohngrundstück</option>
          <option value="unbebaut">Unbebautes Grundstück</option>
        </select>
      </div>

      {/* 3: Bodenrichtwert */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          Bodenrichtwert
        </h2>
        <NummerEingabe value={bodenrichtwert} onChange={setBodenrichtwert} placeholder="200" einheit="€/m²" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Finden Sie auf boris.de oder beim Gutachterausschuss Ihrer Gemeinde.</p>
      </div>

      {/* 4: Grundfläche */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">4</span>
          {istBund && art === 'etw' ? 'Grundstücksfläche der gesamten Wohnanlage' : 'Grundstücksfläche'}
        </h2>
        <NummerEingabe value={grundflaeche} onChange={setGrundflaeche} placeholder="400" einheit="m²" />
        {/* W187: Miteigentumsanteil — beim Wohnungseigentum zählt nur der anteilige Bodenwert */}
        {istBund && art === 'etw' && (
          <div className="mt-3">
            <span className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Miteigentumsanteil laut Grundbuch</span>
            <div className="grid grid-cols-2 gap-2">
              <NummerEingabe id="grundsteuer-mea-zaehler" value={meaZaehler} onChange={setMeaZaehler} placeholder="250" einheit="Anteile" />
              <NummerEingabe id="grundsteuer-mea-nenner" value={meaNenner} onChange={setMeaNenner} placeholder="1000" einheit="von gesamt" />
            </div>
          </div>
        )}
        {istBund && art === 'miet' && (
          <div className="mt-3">
            <label htmlFor="grundsteuer-wohnungen" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Anzahl der Wohnungen</label>
            <NummerEingabe id="grundsteuer-wohnungen" value={anzahlWohnungen} onChange={setAnzahlWohnungen} placeholder="6" einheit="Wohnungen" />
          </div>
        )}
      </div>

      {art !== 'unbebaut' && (
        <>
          {/* 5: Wohnfläche */}
          <div className="mb-6">
            <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">5</span>
              Wohnfläche
            </h2>
            <NummerEingabe value={wohnflaeche} onChange={setWohnflaeche} placeholder="120" einheit="m²" />
          </div>

          {/* 6: Baujahr */}
          <div className="mb-6">
            <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">6</span>
              Baujahr
            </h2>
            <NummerEingabe value={baujahr} onChange={setBaujahr} placeholder="1990" einheit="" />
          </div>

          {istBund && (
            <div className="mb-6 grid sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="grundsteuer-mietniveau" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Mietniveaustufe der Gemeinde</label>
                <select id="grundsteuer-mietniveau" value={mietniveaustufe} onChange={e => setMietniveaustufe(e.target.value)} className={selectKlasse}>
                  {[1, 2, 3, 4, 5, 6, 7].map(n => (
                    <option key={n} value={String(n)}>
                      Stufe {n} ({n === 3 ? '±0 %' : `${n < 3 ? '−' : '+'}${Math.abs(n - 3) * 10} %`})
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Steht in der Mietniveau-Einstufungsverordnung zu § 254 BewG; nicht aufgeführte Gemeinden: Stufe 3.</p>
              </div>
              <div>
                <label htmlFor="grundsteuer-ermaessigung" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Ermäßigung der Steuermesszahl</label>
                <select id="grundsteuer-ermaessigung" value={ermaessigung} onChange={e => setErmaessigung(e.target.value as MesszahlErmaessigung)} className={selectKlasse}>
                  <option value="keine">Keine</option>
                  <option value="denkmal">Baudenkmal (−10 %)</option>
                  <option value="gefoerdert">Geförderter Wohnraum / Wohnungsbaugesellschaft, -genossenschaft (−25 %)</option>
                </select>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">§ 15 Abs. 2–5 GrStG, nur auf Antrag bzw. mit Nachweis.</p>
              </div>
            </div>
          )}
        </>
      )}

      {/* 7: Hebesatz */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">7</span>
          Hebesatz der Gemeinde
        </h2>
        <NummerEingabe value={hebesatz} onChange={setHebesatz} placeholder="500" einheit="%" />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Finden Sie auf der Website Ihrer Gemeinde. Durchschnitt: ca. 500 %.</p>
      </div>

      {/* ERGEBNIS */}
      <div className="result-box mb-6">
        <p className="text-white/80 text-sm mb-1">Grundsteuer pro Jahr</p>
        <p className="text-5xl font-bold">{fmtEuro(ergebnis.grundsteuerJahr)} €</p>
        <p className="text-white/80 text-sm mt-1">
          Vierteljährlich: <strong>{fmtEuro2(ergebnis.quartal)} €</strong> · Monatlich: <strong>{fmtEuro2(ergebnis.monat)} €</strong>
        </p>
      </div>

      {/* Aufschlüsselung */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">Berechnung im Detail</h2>
        </div>
        <table className="w-full text-sm">
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {/* W187: Rechenweg des Ertragswertverfahrens (§§ 252–257 BewG) — vorher nur Endwerte */}
            {istBund && bm && (
              <>
                <tr>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Rohertrag ({fmtEuro2(bm.mieteProQm)} €/m² × Wohnfläche × 12)</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200">{fmtEuro2(bm.rohertrag)} €</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">− Bewirtschaftungskosten {bm.bewirtschaftungskostenProzent} %</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200">{fmtEuro2(bm.reinertrag)} €</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">× Vervielfältiger {fmtFaktor(bm.vervielfaeltiger, 2)} ({bm.restnutzungsdauer} J. Restnutzungsdauer, {fmtProzent(bm.liegenschaftszins)} %)</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200">{fmtEuro2(bm.barwertReinertrag)} €</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">+ Bodenwert {fmtEuro(bm.bodenwert)} € × Abzinsungsfaktor {fmtFaktor(bm.abzinsungsfaktor, 4)}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200">{fmtEuro2(bm.abgezinsterBodenwert)} €</td>
                </tr>
                {bm.mindestwertGreift && (
                  <tr>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Mindestwert 75 % des Bodenwerts (§ 251 BewG) greift</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200">{fmtEuro2(bm.mindestwert)} €</td>
                  </tr>
                )}
              </>
            )}
            <tr>
              <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Grundsteuerwert{istBund ? ' (auf volle 100 € abgerundet)' : ''}</td>
              <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200">{fmtEuro(ergebnis.grundsteuerwert)} €</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Steuermessbetrag{istBund && bm ? ` (× ${fmtPromille(bm.steuermesszahl)} ‰)` : ''}</td>
              <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200">{fmtEuro2(ergebnis.messbetrag)} €</td>
            </tr>
            <tr>
              <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">× Hebesatz {fmtHebesatz(parseDeutscheZahl(hebesatz))} %</td>
              <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200">{fmtEuro2(ergebnis.grundsteuerJahr)} €</td>
            </tr>
            <tr className="bg-blue-50 dark:bg-blue-500/10 font-bold">
              <td className="px-4 py-3 text-blue-800 dark:text-blue-300">= Grundsteuer / Jahr</td>
              <td className="px-4 py-3 text-right tabular-nums text-blue-800 dark:text-blue-300">{fmtEuro(ergebnis.grundsteuerJahr)} €</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6">
        <p className="text-amber-800 dark:text-amber-300 text-xs">
          {/* W187: vorher für alle Modelle „Stark vereinfachte Berechnung“ */}
          <strong>⚠️ Hinweis:</strong>{' '}
          {istBund
            ? 'Schätzung nach dem Ertragswertverfahren der §§ 252–257 BewG mit den gesetzlichen Tabellen (Mieten, Bewirtschaftungskosten, Vervielfältiger, Abzinsung). Nicht abgebildet sind u. a. Garagen, gewerblich genutzte Flächen und Modernisierungen. Verbindlich sind der Grundsteuerwertbescheid des Finanzamts und der Grundsteuerbescheid der Gemeinde.'
            : 'Stark vereinfachte Berechnung. Der tatsächliche Grundsteuerwert wird vom Finanzamt festgestellt und kann abweichen.'}
        </p>
      </div>

      <CrossLink href="/wohnen/grunderwerbsteuer-rechner" emoji="🏠" text="Beim Kauf: Grunderwerbsteuer berechnen" />
      <CrossLink href="/wohnen/baufinanzierung-rechner" emoji="💰" text="Baufinanzierung berechnen" />
      <CrossLink href="/wohnen/nebenkosten-rechner" emoji="📊" text="Nebenkosten berechnen" />

      <ErgebnisAktionen
        ergebnisText={`Grundsteuer 2026 (${modell === 'bund' ? `Bundesmodell, ${landName}, Mietniveaustufe ${mietniveaustufe}` : modell === 'bayern' ? 'Bayern' : 'BW'}): ${fmtEuro(ergebnis.grundsteuerJahr)} €/Jahr | Grundsteuerwert ${fmtEuro(ergebnis.grundsteuerwert)} € | Messbetrag ${fmtEuro2(ergebnis.messbetrag)} € × Hebesatz ${fmtHebesatz(parseDeutscheZahl(hebesatz))} %`}
        seitenTitel="Grundsteuer-Rechner"
      />

      <AiExplain
        rechnerName="Grundsteuer-Rechner"
        eingaben={{
          modell,
          ...(istBund ? { land: landName, mietniveaustufe: `Stufe ${mietniveaustufe}`, ermaessigung } : {}),
          ...(istBund && art === 'etw' ? { miteigentumsanteil: `${meaZaehler}/${meaNenner}` } : {}),
          ...(istBund && art === 'miet' ? { anzahlWohnungen } : {}),
          art,
          bodenrichtwert: `${bodenrichtwert} €/m²`,
          grundflaeche: `${grundflaeche} m²`,
          wohnflaeche: `${wohnflaeche} m²`,
          baujahr,
          hebesatz: `${hebesatz} %`,
        }}
        ergebnis={{
          grundsteuerwert: `${fmtEuro(ergebnis.grundsteuerwert)} €`,
          messbetrag: `${fmtEuro2(ergebnis.messbetrag)} €`,
          grundsteuerJahr: `${fmtEuro(ergebnis.grundsteuerJahr)} €`,
        }}
      />
    </div>
  );
}
