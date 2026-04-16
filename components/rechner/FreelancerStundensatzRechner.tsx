'use client';

import { useState, useMemo } from 'react';
import { berechneFreelancerStundensatz } from '@/lib/berechnungen/freelancer-stundensatz';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

export default function FreelancerStundensatzRechner() {
  const [nettoWunsch, setNettoWunsch] = useState('3000');
  const [arbeitstage, setArbeitstage] = useState('5');
  const [urlaubstage, setUrlaubstage] = useState('30');
  const [krankheitstage, setKrankheitstage] = useState('10');
  const [produktiveStunden, setProduktiveStunden] = useState('6');
  const [krankenversicherung, setKrankenversicherung] = useState('450');
  const [rentenvorsorge, setRentenvorsorge] = useState('300');
  const [betriebsausgaben, setBetriebsausgaben] = useState('200');
  const [steuersatz, setSteuersatz] = useState('30');
  const [kleinunternehmer, setKleinunternehmer] = useState(false);

  const ergebnis = useMemo(() => {
    const netto = parseDeutscheZahl(nettoWunsch);
    if (netto <= 0) return null;
    return berechneFreelancerStundensatz({
      nettoWunsch: netto,
      arbeitstageProWoche: parseDeutscheZahl(arbeitstage),
      urlaubstage: parseDeutscheZahl(urlaubstage),
      krankheitstage: parseDeutscheZahl(krankheitstage),
      produktiveStunden: parseDeutscheZahl(produktiveStunden),
      krankenversicherung: parseDeutscheZahl(krankenversicherung),
      rentenvorsorge: parseDeutscheZahl(rentenvorsorge),
      betriebsausgaben: parseDeutscheZahl(betriebsausgaben),
      steuersatz: parseDeutscheZahl(steuersatz),
      kleinunternehmer,
    });
  }, [nettoWunsch, arbeitstage, urlaubstage, krankheitstage, produktiveStunden, krankenversicherung, rentenvorsorge, betriebsausgaben, steuersatz, kleinunternehmer]);

  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      {/* Eingabefelder */}
      <div className="space-y-4 mb-6">
        {/* Netto-Wunsch */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Gewünschtes Netto-Monatseinkommen
          </label>
          <NummerEingabe value={nettoWunsch} onChange={setNettoWunsch} einheit="€" placeholder="z.B. 3.000" />
        </div>

        {/* Arbeitszeit */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Arbeitstage pro Woche
            </label>
            <NummerEingabe value={arbeitstage} onChange={setArbeitstage} placeholder="5" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Produktive Stunden pro Tag
            </label>
            <NummerEingabe value={produktiveStunden} onChange={setProduktiveStunden} einheit="h" placeholder="6" />
            <p className="text-xs text-gray-600 dark:text-gray-500 mt-1">Fakturierbare Stunden (ohne Akquise, Admin etc.)</p>
          </div>
        </div>

        {/* Urlaub + Krankheit */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Urlaubstage pro Jahr
            </label>
            <NummerEingabe value={urlaubstage} onChange={setUrlaubstage} placeholder="30" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Krankheitstage pro Jahr
            </label>
            <NummerEingabe value={krankheitstage} onChange={setKrankheitstage} placeholder="10" />
          </div>
        </div>

        {/* Versicherungen */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Krankenversicherung
            </label>
            <NummerEingabe value={krankenversicherung} onChange={setKrankenversicherung} einheit="€/Monat" placeholder="450" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Rentenvorsorge
            </label>
            <NummerEingabe value={rentenvorsorge} onChange={setRentenvorsorge} einheit="€/Monat" placeholder="300" />
          </div>
        </div>

        {/* Betriebsausgaben + Steuersatz */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Betriebsausgaben
            </label>
            <NummerEingabe value={betriebsausgaben} onChange={setBetriebsausgaben} einheit="€/Monat" placeholder="200" />
            <p className="text-xs text-gray-600 dark:text-gray-500 mt-1">Büro, Software, Telefon, Internet etc.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Einkommensteuersatz (geschätzt)
            </label>
            <NummerEingabe value={steuersatz} onChange={setSteuersatz} einheit="%" placeholder="30" />
          </div>
        </div>

        {/* Umsatzsteuer */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Umsatzsteuer
          </label>
          <select
            value={kleinunternehmer ? 'klein' : 'ust'}
            onChange={e => setKleinunternehmer(e.target.value === 'klein')}
            className="input-field"
          >
            <option value="ust">19% Umsatzsteuer</option>
            <option value="klein">Kleinunternehmer (keine USt)</option>
          </select>
        </div>
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-4">
            <p className="text-white/70 text-sm mb-1">Empfohlener Stundensatz</p>
            <div className="flex items-baseline gap-3 flex-wrap">
              <p className="text-5xl font-bold">
                {fmt(ergebnis.stundensatzNetto)} <span className="text-2xl">€ netto</span>
              </p>
              {!kleinunternehmer && (
                <p className="text-2xl font-bold text-white/70">
                  ({fmt(ergebnis.stundensatzBrutto)} € brutto inkl. USt)
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-4 border-t border-white/20">
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">Tagessatz</p>
                <p className="text-lg font-bold">{fmt(ergebnis.tagessatzNetto)} €</p>
              </div>
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">Monatsumsatz nötig</p>
                <p className="text-lg font-bold">{fmt(ergebnis.monatsumsatzNoetig)} €</p>
              </div>
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">Jahresumsatz nötig</p>
                <p className="text-lg font-bold">{fmt(ergebnis.jahresumsatzNoetig)} €</p>
              </div>
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">Fakturierbare Std/Jahr</p>
                <p className="text-lg font-bold">{ergebnis.fakturierbareStundenJahr}</p>
              </div>
            </div>
          </div>

          {/* Warnung niedriger Stundensatz */}
          {ergebnis.warnungNiedrig && (
            <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-4 mb-4">
              <p className="text-sm text-red-700 dark:text-red-400">
                <strong>Achtung:</strong> Ein Stundensatz unter 50 € ist für viele Branchen nicht nachhaltig. Bedenken Sie, dass Sie als Freelancer keine bezahlten Krankheitstage, kein Urlaubsgeld und keinen Arbeitgeberzuschuss zur Sozialversicherung erhalten.
              </p>
            </div>
          )}

          {/* Kostenaufschlüsselung als Balkendiagramm */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 mb-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Monatliche Kostenaufschlüsselung</p>

            {/* Gestapelter Balken */}
            <div className="w-full h-8 rounded-full overflow-hidden flex mb-4">
              {ergebnis.aufschluesselung.map(a => (
                <div
                  key={a.label}
                  style={{ width: `${a.anteilProzent}%`, backgroundColor: a.farbe }}
                  className="h-full transition-all duration-500"
                  title={`${a.label}: ${fmt(a.betrag)} € (${a.anteilProzent.toFixed(0)}%)`}
                />
              ))}
            </div>

            {/* Legende */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {ergebnis.aufschluesselung.map(a => (
                <div key={a.label} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: a.farbe }} />
                  <div className="min-w-0">
                    <span className="text-xs text-gray-600 dark:text-gray-400">{a.label}</span>
                    <span className="text-xs font-medium text-gray-800 dark:text-gray-200 ml-1">{fmt(a.betrag)} € ({a.anteilProzent.toFixed(0)}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detail-Tabelle */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Kalkulation im Detail</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Arbeitstage pro Jahr</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{ergebnis.arbeitstageJahr} Tage</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Fakturierbare Stunden pro Jahr</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{ergebnis.fakturierbareStundenJahr} Std</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Netto-Wunsch + Kosten (monatl.)</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.gesamtVorSteuernMonat)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">+ Einkommensteuer (monatl.)</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.steuernMonat)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm font-bold bg-primary-50/50 dark:bg-primary-500/5">
                <span className="text-gray-800 dark:text-gray-100">Brutto-Bedarf monatlich</span>
                <span className="text-primary-600 dark:text-primary-400">{fmt(ergebnis.bruttoBedarfMonat)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm font-bold bg-primary-50/50 dark:bg-primary-500/5">
                <span className="text-gray-800 dark:text-gray-100">Stundensatz netto</span>
                <span className="text-primary-600 dark:text-primary-400">{fmt(ergebnis.stundensatzNetto)} €</span>
              </div>
              {!kleinunternehmer && (
                <div className="flex justify-between px-4 py-3 text-sm font-bold bg-primary-50/50 dark:bg-primary-500/5">
                  <span className="text-gray-800 dark:text-gray-100">Stundensatz brutto (inkl. 19% USt)</span>
                  <span className="text-primary-600 dark:text-primary-400">{fmt(ergebnis.stundensatzBrutto)} €</span>
                </div>
              )}
            </div>
          </div>

          {/* Hinweis */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-4">
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              <strong>Hinweis:</strong> Vereinfachte Kalkulation. Der tatsächliche Stundensatz kann je nach Branche, Region, Erfahrung und Marktlage abweichen. Berücksichtigen Sie auch Kosten für Weiterbildung, Rücklagen und Akquisezeiten. Im Zweifel konsultieren Sie einen Steuerberater.
            </p>
          </div>

          <CrossLink href="/finanzen/mwst-rechner" emoji="🧾" text="Mehrwertsteuer berechnen" />
          <CrossLink href="/finanzen/gmbh-geschaeftsfuehrer-rechner" emoji="💼" text="GmbH gründen? GF-Gehalt berechnen" />

          <ErgebnisAktionen
            ergebnisText={`Empfohlener Freelancer-Stundensatz: ${fmt(ergebnis.stundensatzNetto)} € netto${!kleinunternehmer ? ` (${fmt(ergebnis.stundensatzBrutto)} € brutto inkl. USt)` : ''} | Tagessatz: ${fmt(ergebnis.tagessatzNetto)} € | Jahresumsatz nötig: ${fmt(ergebnis.jahresumsatzNoetig)} €`}
            seitenTitel="Freelancer-Stundensatz-Rechner"
          />

          <AffiliateBox programId="lexware" context="freelancer" variant="full" />

          <AiExplain
            rechnerName="Freelancer-Stundensatz-Rechner"
            eingaben={{
              nettoWunschEuro: parseDeutscheZahl(nettoWunsch),
              arbeitstageProWoche: parseDeutscheZahl(arbeitstage),
              urlaubstage: parseDeutscheZahl(urlaubstage),
              krankheitstage: parseDeutscheZahl(krankheitstage),
              produktiveStundenProTag: parseDeutscheZahl(produktiveStunden),
              krankenversicherungEuro: parseDeutscheZahl(krankenversicherung),
              rentenvorsorgeEuro: parseDeutscheZahl(rentenvorsorge),
              betriebsausgabenEuro: parseDeutscheZahl(betriebsausgaben),
              steuersatzProzent: parseDeutscheZahl(steuersatz),
              kleinunternehmer,
            }}
            ergebnis={{
              stundensatzNettoEuro: ergebnis.stundensatzNetto,
              stundensatzBruttoEuro: ergebnis.stundensatzBrutto,
              tagessatzNettoEuro: ergebnis.tagessatzNetto,
              jahresumsatzNoetigEuro: ergebnis.jahresumsatzNoetig,
              fakturierbareStundenJahr: ergebnis.fakturierbareStundenJahr,
            }}
          />
        </>
      )}
    </div>
  );
}
