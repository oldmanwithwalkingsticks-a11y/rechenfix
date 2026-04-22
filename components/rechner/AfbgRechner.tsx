'use client';

import { useState, useMemo } from 'react';
import {
  berechneAfbg,
  type FortbildungsArt,
  type AfbgKind,
} from '@/lib/berechnungen/afbg';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';

export default function AfbgRechner() {
  const [fortbildungsart, setFortbildungsart] = useState<FortbildungsArt>('vollzeit');
  const [lehrgangskosten, setLehrgangskosten] = useState('10000');
  const [meisterstueckKosten, setMeisterstueckKosten] = useState('0');
  const [antragstellerBrutto, setAntragstellerBrutto] = useState('0');
  const [vermoegen, setVermoegen] = useState('0');
  const [ehegatteVorhanden, setEhegatteVorhanden] = useState(false);
  const [ehegatteBrutto, setEhegatteBrutto] = useState('0');
  const [kinder, setKinder] = useState<AfbgKind[]>([]);
  const [bestehensErlass, setBestehensErlass] = useState(true);
  const [gruenderErlass, setGruenderErlass] = useState(false);

  const istVollzeit = fortbildungsart === 'vollzeit';

  const ergebnis = useMemo(
    () => berechneAfbg({
      fortbildungsart,
      lehrgangskosten: parseDeutscheZahl(lehrgangskosten),
      meisterstueckKosten: parseDeutscheZahl(meisterstueckKosten),
      antragstellerBruttoMonat: parseDeutscheZahl(antragstellerBrutto),
      vermoegen: parseDeutscheZahl(vermoegen),
      ehegatte: ehegatteVorhanden
        ? { vorhanden: true, bruttoMonat: parseDeutscheZahl(ehegatteBrutto) }
        : { vorhanden: false },
      kinder,
      bestehensErlassAngenommen: bestehensErlass,
      gruenderErlassAngenommen: gruenderErlass,
    }),
    [fortbildungsart, lehrgangskosten, meisterstueckKosten, antragstellerBrutto, vermoegen, ehegatteVorhanden, ehegatteBrutto, kinder, bestehensErlass, gruenderErlass],
  );

  const fmtEuro = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const fmtEuroCent = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const kindHinzufuegen = () => {
    if (kinder.length >= 5) return;
    setKinder([...kinder, { alter: 5, anspruchAufKindergeld: true }]);
  };
  const kindEntfernen = (index: number) => setKinder(kinder.filter((_, i) => i !== index));
  const kindAendern = (index: number, patch: Partial<AfbgKind>) => {
    setKinder(kinder.map((k, i) => i === index ? { ...k, ...patch } : k));
  };

  return (
    <div>
      {/* === 1: Fortbildungsart === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Fortbildungsart
        </h2>
        <div className="flex gap-2">
          {([['vollzeit', '📚 Vollzeit'], ['teilzeit', '🕒 Teilzeit']] as const).map(([val, label]) => (
            <button key={val} onClick={() => setFortbildungsart(val)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[48px] ${fortbildungsart === val ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'}`}>
              {label}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
          Unterhaltsbeitrag nach § 10 AFBG gibt es nur bei Vollzeit-Maßnahmen. Der
          Maßnahmebeitrag (Lehrgangskosten) steht bei beiden Formen zu.
        </p>
      </div>

      {/* === 2: Kosten === */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Kosten der Fortbildung
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lehrgangs- und Prüfungsgebühren</label>
            <NummerEingabe value={lehrgangskosten} onChange={setLehrgangskosten} placeholder="10.000" einheit="€ gesamt" />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              § 12 AFBG — Höchstbetrag 15.000 €. Über diesem Betrag wird nicht gefördert.
            </p>
          </div>
          <details className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50">
            <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 select-none">
              Meisterstück / Prüfungsstück-Materialkosten (optional)
            </summary>
            <div className="px-4 pb-4 pt-1 border-t border-gray-100 dark:border-gray-700">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mt-3 mb-1">Materialkosten</label>
              <NummerEingabe value={meisterstueckKosten} onChange={setMeisterstueckKosten} placeholder="0" einheit="€ gesamt" />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                § 12 AFBG — Höchstbetrag 2.000 €. Aufteilung identisch: 50 % Zuschuss, 50 % Darlehen.
              </p>
            </div>
          </details>
        </div>
      </div>

      {/* === 3: Persönliche Situation (nur Vollzeit) === */}
      {istVollzeit && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
            Persönliche Situation <span className="text-xs font-normal text-gray-500">(für Unterhaltsbeitrag)</span>
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Eigenes Bruttoeinkommen</label>
                <NummerEingabe value={antragstellerBrutto} onChange={setAntragstellerBrutto} placeholder="0" einheit="€/Monat" />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Freibetrag ca. 603 €/Monat (Minijob-Grenze)</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Eigenes Vermögen</label>
                <NummerEingabe value={vermoegen} onChange={setVermoegen} placeholder="0" einheit="€" />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Freibetrag 45.000 € (§ 29 BAföG)</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ehegatte / Lebenspartner</label>
              <div className="flex gap-2">
                {([false, true] as const).map(val => (
                  <button key={String(val)} onClick={() => setEhegatteVorhanden(val)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all min-h-[48px] ${ehegatteVorhanden === val ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600'}`}>
                    {val ? '💍 Vorhanden' : 'Nein'}
                  </button>
                ))}
              </div>
              {ehegatteVorhanden && (
                <div className="mt-3 w-full sm:w-1/2">
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Bruttoeinkommen Ehegatte/Partner</label>
                  <NummerEingabe value={ehegatteBrutto} onChange={setEhegatteBrutto} placeholder="0" einheit="€/Monat" />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Freibetrag 850 €/Monat zusätzlich + 235 € Bedarfs-Zuschlag</p>
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Kinder ({kinder.length})</label>
                {kinder.length < 5 && (
                  <button onClick={kindHinzufuegen}
                    className="text-xs text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Kind hinzufügen
                  </button>
                )}
              </div>
              {kinder.length > 0 && (
                <div className="space-y-2">
                  {kinder.map((kind, i) => (
                    <div key={i} className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3">
                      <span className="text-sm text-gray-600 dark:text-gray-400 shrink-0 w-16">Kind {i + 1}</span>
                      <input
                        type="number"
                        min={0} max={25} step={1}
                        aria-label={`Alter Kind ${i + 1}`}
                        value={kind.alter}
                        onChange={e => kindAendern(i, { alter: Math.max(0, Math.min(25, parseInt(e.target.value) || 0)) })}
                        className="w-20 text-sm bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-2 text-gray-800 dark:text-gray-200"
                      />
                      <span className="text-xs text-gray-600 dark:text-gray-400">J.</span>
                      <label className="flex items-center gap-1.5 text-xs text-gray-700 dark:text-gray-300 ml-2">
                        <input
                          type="checkbox"
                          checked={kind.anspruchAufKindergeld}
                          onChange={e => kindAendern(i, { anspruchAufKindergeld: e.target.checked })}
                          className="w-4 h-4 rounded border-gray-300 dark:border-gray-600"
                        />
                        Kindergeld
                      </label>
                      <button
                        onClick={() => kindEntfernen(i)}
                        className="ml-auto text-red-400 hover:text-red-600 p-1"
                        aria-label={`Kind ${i + 1} entfernen`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                Pro kindergeldberechtigtem Kind: + 235 € Bedarfs-Zuschlag + 770 € Einkommens-Freibetrag.
                Kinderbetreuungszuschlag 150 €/Monat zusätzlich für Kinder unter 14 (§ 10 Abs. 3a AFBG).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* === 4: Rückzahlungs-Szenarien === */}
      <div className="mb-6">
        <details className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50" open>
          <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 select-none">
            Rückzahlungs-Szenarien (§ 13b AFBG)
          </summary>
          <div className="px-4 pb-4 pt-1 border-t border-gray-100 dark:border-gray-700 space-y-3">
            <label className="flex items-start gap-2 cursor-pointer mt-3">
              <input
                type="checkbox"
                checked={bestehensErlass}
                onChange={e => setBestehensErlass(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500 mt-0.5"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong>Bestehens-Erlass (50 %)</strong> — bei bestandener Abschlussprüfung werden 50 %
                des bis dahin noch nicht fällig gewordenen Lehrgangsdarlehens erlassen
                <span className="text-gray-600 dark:text-gray-500"> (§ 13b Abs. 1 AFBG)</span>
              </span>
            </label>
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={gruenderErlass}
                onChange={e => setGruenderErlass(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500 mt-0.5"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong>Gründer-Erlass (100 % Rest)</strong> — bei Existenzgründung im Haupterwerb mit
                mindestens 3 Jahren Führung wird das verbleibende Restdarlehen komplett erlassen
                <span className="text-gray-600 dark:text-gray-500"> (§ 13b Abs. 2 AFBG, seit 2020 ohne Mitarbeiter-Pflicht)</span>
              </span>
            </label>
          </div>
        </details>
      </div>

      {/* === ERGEBNIS === */}
      <div className="result-box mb-6" style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-white/80 text-sm mb-1">Maßnahmebeitrag Gesamtförderung</p>
            <p className="text-4xl font-bold">{fmtEuro(ergebnis.massnahme.gesamtFoerderung)} €</p>
            <p className="text-white/90 text-xs mt-1">
              davon {fmtEuro(ergebnis.massnahme.zuschussGesamt)} € Zuschuss (50 %)
            </p>
          </div>
          {ergebnis.unterhalt.anwendbar && ergebnis.unterhalt.auszahlung > 0 && (
            <div className="sm:text-right">
              <p className="text-white/80 text-sm mb-1">Unterhaltsbeitrag (Vollzuschuss)</p>
              <p className="text-4xl font-bold">{fmtEuro(ergebnis.unterhalt.auszahlung)} €</p>
              <p className="text-white/90 text-xs mt-1">pro Monat</p>
            </div>
          )}
        </div>
      </div>

      {/* Aufschlüsselung */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">Berechnung im Detail</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {/* MAßNAHMEBEITRAG */}
              <tr className="bg-gray-50 dark:bg-gray-700/30">
                <td colSpan={2} className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300 text-xs uppercase tracking-wider">
                  Maßnahmebeitrag (§ 12 AFBG)
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Lehrgangs-/Prüfungsgebühren (angesetzt, max. 15.000 €)</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.massnahme.lehrgangskostenAnsatz)} €</td>
              </tr>
              <tr>
                <td className="px-4 py-2 pl-8 text-xs text-gray-600 dark:text-gray-400">davon Zuschuss (50 %)</td>
                <td className="px-4 py-2 text-right tabular-nums text-green-600 dark:text-green-400 whitespace-nowrap">{fmtEuro(ergebnis.massnahme.zuschussLehrgang)} €</td>
              </tr>
              <tr>
                <td className="px-4 py-2 pl-8 text-xs text-gray-600 dark:text-gray-400">davon Darlehen (50 %, KfW)</td>
                <td className="px-4 py-2 text-right tabular-nums text-gray-700 dark:text-gray-300 whitespace-nowrap">{fmtEuro(ergebnis.massnahme.darlehenLehrgang)} €</td>
              </tr>
              {ergebnis.massnahme.meisterstueckAnsatz > 0 && (
                <>
                  <tr>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Meisterstück-Materialkosten (max. 2.000 €)</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.massnahme.meisterstueckAnsatz)} €</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 pl-8 text-xs text-gray-600 dark:text-gray-400">davon Zuschuss (50 %)</td>
                    <td className="px-4 py-2 text-right tabular-nums text-green-600 dark:text-green-400 whitespace-nowrap">{fmtEuro(ergebnis.massnahme.zuschussMeisterstueck)} €</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 pl-8 text-xs text-gray-600 dark:text-gray-400">davon Darlehen (50 %)</td>
                    <td className="px-4 py-2 text-right tabular-nums text-gray-700 dark:text-gray-300 whitespace-nowrap">{fmtEuro(ergebnis.massnahme.darlehenMeisterstueck)} €</td>
                  </tr>
                </>
              )}
              <tr className="bg-green-50 dark:bg-green-500/10 font-medium">
                <td className="px-4 py-2.5 text-green-800 dark:text-green-300">= Zuschuss gesamt (geschenkt)</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-green-800 dark:text-green-300 whitespace-nowrap">{fmtEuro(ergebnis.massnahme.zuschussGesamt)} €</td>
              </tr>
              <tr className="bg-indigo-50 dark:bg-indigo-500/10 font-medium">
                <td className="px-4 py-2.5 text-indigo-800 dark:text-indigo-300">= Darlehen gesamt (KfW, rückzahlbar)</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-indigo-800 dark:text-indigo-300 whitespace-nowrap">{fmtEuro(ergebnis.massnahme.darlehenGesamt)} €</td>
              </tr>

              {/* UNTERHALTSBEITRAG (nur Vollzeit) */}
              {ergebnis.unterhalt.anwendbar && (
                <>
                  <tr className="bg-gray-50 dark:bg-gray-700/30">
                    <td colSpan={2} className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300 text-xs uppercase tracking-wider">
                      Unterhaltsbeitrag — Vollzuschuss (§ 10 AFBG)
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Grundbedarf Alleinstehend Vollzeit</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.unterhalt.bedarfAufschluesselung.grundbedarf)} €</td>
                  </tr>
                  {ergebnis.unterhalt.bedarfAufschluesselung.ehegattenZuschlag > 0 && (
                    <tr>
                      <td className="px-4 py-2 text-gray-600 dark:text-gray-400">+ Ehegatten-/Partner-Zuschlag</td>
                      <td className="px-4 py-2 text-right tabular-nums text-green-600 dark:text-green-400 whitespace-nowrap">+{fmtEuro(ergebnis.unterhalt.bedarfAufschluesselung.ehegattenZuschlag)} €</td>
                    </tr>
                  )}
                  {ergebnis.unterhalt.bedarfAufschluesselung.kinderZuschlag > 0 && (
                    <tr>
                      <td className="px-4 py-2 text-gray-600 dark:text-gray-400">+ Kinder-Zuschlag (235 € je Kind mit Kindergeld)</td>
                      <td className="px-4 py-2 text-right tabular-nums text-green-600 dark:text-green-400 whitespace-nowrap">+{fmtEuro(ergebnis.unterhalt.bedarfAufschluesselung.kinderZuschlag)} €</td>
                    </tr>
                  )}
                  {ergebnis.unterhalt.bedarfAufschluesselung.kinderbetreuungZuschlag > 0 && (
                    <tr>
                      <td className="px-4 py-2 text-gray-600 dark:text-gray-400">+ Kinderbetreuungszuschlag (150 € je Kind &lt; 14 J.)</td>
                      <td className="px-4 py-2 text-right tabular-nums text-green-600 dark:text-green-400 whitespace-nowrap">+{fmtEuro(ergebnis.unterhalt.bedarfAufschluesselung.kinderbetreuungZuschlag)} €</td>
                    </tr>
                  )}
                  <tr className="bg-blue-50 dark:bg-blue-500/10 font-medium">
                    <td className="px-4 py-2.5 text-blue-800 dark:text-blue-300">= Gesamtbedarf Unterhalt</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-blue-800 dark:text-blue-300 whitespace-nowrap">{fmtEuro(ergebnis.unterhalt.bedarf)} €</td>
                  </tr>

                  {ergebnis.unterhalt.anrechnungAufschluesselung.gesamtBrutto > 0 && (
                    <tr>
                      <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">
                        Einkommensanrechnung
                        <span className="text-xs text-gray-600 ml-1">
                          (Brutto {fmtEuroCent(ergebnis.unterhalt.anrechnungAufschluesselung.gesamtBrutto)} € − Freibetrag {fmtEuroCent(ergebnis.unterhalt.anrechnungAufschluesselung.gesamtFreibetrag)} € × Quote {(ergebnis.unterhalt.anrechnungAufschluesselung.quote * 100).toFixed(0)} %)
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-red-600 whitespace-nowrap">−{fmtEuroCent(ergebnis.unterhalt.anrechnungAufschluesselung.einkommensAnrechnung)} €</td>
                    </tr>
                  )}
                  {ergebnis.unterhalt.anrechnungAufschluesselung.vermoegenMonat > 0 && (
                    <tr>
                      <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">
                        Vermögensanrechnung
                        <span className="text-xs text-gray-600 ml-1">(Überschuss {fmtEuroCent(ergebnis.unterhalt.anrechnungAufschluesselung.vermoegenUeberschreitend)} € / 24 Monate)</span>
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-red-600 whitespace-nowrap">−{fmtEuroCent(ergebnis.unterhalt.anrechnungAufschluesselung.vermoegenMonat)} €</td>
                    </tr>
                  )}
                  <tr className="bg-green-50 dark:bg-green-500/10 font-bold">
                    <td className="px-4 py-3 text-green-800 dark:text-green-300">= Auszahlung Unterhalt / Monat (100 % Vollzuschuss)</td>
                    <td className="px-4 py-3 text-right tabular-nums text-lg text-green-700 dark:text-green-300 whitespace-nowrap">{fmtEuroCent(ergebnis.unterhalt.auszahlung)} €</td>
                  </tr>
                </>
              )}

              {/* RÜCKZAHLUNG */}
              <tr className="bg-gray-50 dark:bg-gray-700/30">
                <td colSpan={2} className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300 text-xs uppercase tracking-wider">
                  Rückzahlungs-Szenarien Lehrgangsdarlehen (§ 13b AFBG)
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">Darlehen ohne Erlass</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.rueckzahlung.darlehenOhneErlass)} €</td>
              </tr>
              {ergebnis.rueckzahlung.bestehensErlass > 0 && (
                <tr>
                  <td className="px-4 py-2 pl-4 text-xs text-gray-600 dark:text-gray-400">− Bestehens-Erlass 50 % (§ 13b Abs. 1)</td>
                  <td className="px-4 py-2 text-right tabular-nums text-green-600 whitespace-nowrap">−{fmtEuro(ergebnis.rueckzahlung.bestehensErlass)} €</td>
                </tr>
              )}
              {bestehensErlass && (
                <tr>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300 font-medium">= Nach Bestehens-Erlass</td>
                  <td className="px-4 py-2 text-right tabular-nums text-gray-800 dark:text-gray-200 whitespace-nowrap">{fmtEuro(ergebnis.rueckzahlung.nachBestehensErlass)} €</td>
                </tr>
              )}
              {ergebnis.rueckzahlung.gruenderErlass > 0 && (
                <tr>
                  <td className="px-4 py-2 pl-4 text-xs text-gray-600 dark:text-gray-400">− Gründer-Erlass 100 % (§ 13b Abs. 2)</td>
                  <td className="px-4 py-2 text-right tabular-nums text-green-600 whitespace-nowrap">−{fmtEuro(ergebnis.rueckzahlung.gruenderErlass)} €</td>
                </tr>
              )}
              <tr className="bg-indigo-50 dark:bg-indigo-500/10 font-bold">
                <td className="px-4 py-3 text-indigo-800 dark:text-indigo-300">= Tatsächlich zurückzuzahlen</td>
                <td className="px-4 py-3 text-right tabular-nums text-lg text-indigo-700 dark:text-indigo-300 whitespace-nowrap">{fmtEuro(ergebnis.rueckzahlung.nachGruenderErlass)} €</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-xs text-gray-600 dark:text-gray-500">Mindestrate {ergebnis.rueckzahlung.mindestrateMonat} €/Monat · Karenzzeit {ergebnis.rueckzahlung.karenzzeitMonate} Monate nach Lehrgangsende</td>
                <td className="px-4 py-2 text-right text-xs text-gray-600 dark:text-gray-500">§ 13 AFBG (KfW)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Disclaimer-Block */}
      <div className="mb-6 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 px-3 py-2.5 flex gap-2 items-start">
        <span className="text-gray-500 dark:text-gray-400 text-sm leading-tight" aria-hidden="true">ℹ️</span>
        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
          <strong className="font-semibold text-gray-700 dark:text-gray-300">Vereinfachte Schätzung — Abweichungen möglich.</strong>{' '}
          Dieser Rechner bildet die Grundmechanik nach §§ 10, 12 und 13b AFBG ab. Nicht berücksichtigt sind:
          Zulassungsvoraussetzungen nach § 2 AFBG (bestimmte Vorqualifikation oder Berufspraxis erforderlich),
          Auslandsmaßnahmen (§ 5 AFBG), Freistellung von der Rückzahlung bei geringem Einkommen (§ 13a AFBG),
          genaue Vermögensverteilung über den individuellen Bewilligungszeitraum (vereinfacht durch 24 Monate geteilt),
          sowie Einkommensnachweis aus dem vorletzten Kalenderjahr (der Rechner nutzt das aktuelle Bruttoeinkommen).
          Der vom zuständigen Förderamt erlassene Bescheid ist rechtsverbindlich.
        </p>
      </div>

      {/* Quelle */}
      <p className="text-xs text-gray-500 dark:text-gray-500 mb-6">
        Rechtsstand: {ergebnis.quelle}
      </p>

      <CrossLink href="/finanzen/bafoeg-rechner" emoji="🎓" text="Reguläres BAföG berechnen" />
      <CrossLink href="/finanzen/buergergeld-rechner" emoji="📋" text="Bürgergeld berechnen" />

      {/* Externe Info- und Antragsportale (mit target="_blank", weil externe Domains) */}
      <a
        href="https://www.aufstiegs-bafoeg.de/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-3 my-3 rounded-xl bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/30 hover:bg-primary-100 dark:hover:bg-primary-500/20 hover:border-primary-300 dark:hover:border-primary-500/50 transition-colors duration-200 group print:hidden"
      >
        <span className="text-lg flex-shrink-0" role="img" aria-hidden="true">ℹ️</span>
        <span className="text-sm font-medium text-primary-700 dark:text-primary-300 group-hover:text-primary-800 dark:group-hover:text-primary-200 transition-colors">
          Info-Portal aufstiegs-bafoeg.de (BMBF)
        </span>
        <span className="ml-auto text-primary-400 dark:text-primary-500 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors font-bold" aria-hidden="true">↗</span>
      </a>
      <a
        href="https://afbg-digital.de/start"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-3 my-3 rounded-xl bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/30 hover:bg-primary-100 dark:hover:bg-primary-500/20 hover:border-primary-300 dark:hover:border-primary-500/50 transition-colors duration-200 group print:hidden"
      >
        <span className="text-lg flex-shrink-0" role="img" aria-hidden="true">📝</span>
        <span className="text-sm font-medium text-primary-700 dark:text-primary-300 group-hover:text-primary-800 dark:group-hover:text-primary-200 transition-colors">
          Antrag stellen auf afbg-digital.de
        </span>
        <span className="ml-auto text-primary-400 dark:text-primary-500 group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors font-bold" aria-hidden="true">↗</span>
      </a>

      <ErgebnisAktionen
        ergebnisText={`Aufstiegs-BAföG: Maßnahme ${fmtEuro(ergebnis.massnahme.zuschussGesamt)} € Zuschuss + ${fmtEuro(ergebnis.massnahme.darlehenGesamt)} € Darlehen${ergebnis.unterhalt.anwendbar ? ` | Unterhaltsbeitrag ${fmtEuroCent(ergebnis.unterhalt.auszahlung)} €/Monat (Vollzuschuss)` : ''} | Rückzahlung nach Erlass-Szenarien: ${fmtEuro(ergebnis.rueckzahlung.nachGruenderErlass)} €`}
        seitenTitel="Aufstiegs-BAföG-Rechner"
      />

      <AiExplain
        rechnerName="Aufstiegs-BAföG-Rechner"
        eingaben={{
          fortbildungsart,
          lehrgangskosten: `${fmtEuro(parseDeutscheZahl(lehrgangskosten))} €`,
          meisterstueckKosten: `${fmtEuro(parseDeutscheZahl(meisterstueckKosten))} €`,
          kinderAnzahl: kinder.length,
          ehegatteVorhanden,
          bestehensErlass,
          gruenderErlass,
        }}
        ergebnis={{
          massnahmeGesamt: `${fmtEuro(ergebnis.massnahme.gesamtFoerderung)} €`,
          zuschussGesamt: `${fmtEuro(ergebnis.massnahme.zuschussGesamt)} €`,
          darlehenGesamt: `${fmtEuro(ergebnis.massnahme.darlehenGesamt)} €`,
          unterhaltMonat: ergebnis.unterhalt.anwendbar ? `${fmtEuroCent(ergebnis.unterhalt.auszahlung)} €` : 'nicht anwendbar',
          tatsaechlichRueckzahlen: `${fmtEuro(ergebnis.rueckzahlung.nachGruenderErlass)} €`,
        }}
      />
    </div>
  );
}
