'use client';

import { useState, useMemo } from 'react';
import { berechneBetriebskosten } from '@/lib/berechnungen/betriebskosten';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

type Geschaeftsform = 'freelancer' | 'gmbh' | 'ug';

export default function BetriebskostenRechner() {
  const [geschaeftsform, setGeschaeftsform] = useState<Geschaeftsform>('freelancer');
  const [miete, setMiete] = useState('500');
  const [versicherungen, setVersicherungen] = useState('200');
  const [software, setSoftware] = useState('100');
  const [telefonInternet, setTelefonInternet] = useState('60');
  const [buchhaltung, setBuchhaltung] = useState('150');
  const [sonstigeFix, setSonstigeFix] = useState('100');
  const [material, setMaterial] = useState('0');
  const [fahrtkosten, setFahrtkosten] = useState('100');
  const [marketing, setMarketing] = useState('200');
  const [unternehmerlohn, setUnternehmerlohn] = useState('3000');

  const ergebnis = useMemo(() => {
    return berechneBetriebskosten({
      geschaeftsform,
      miete: parseDeutscheZahl(miete),
      versicherungen: parseDeutscheZahl(versicherungen),
      software: parseDeutscheZahl(software),
      telefonInternet: parseDeutscheZahl(telefonInternet),
      buchhaltung: parseDeutscheZahl(buchhaltung),
      sonstigeFix: parseDeutscheZahl(sonstigeFix),
      material: parseDeutscheZahl(material),
      fahrtkosten: parseDeutscheZahl(fahrtkosten),
      marketing: parseDeutscheZahl(marketing),
      unternehmerlohn: parseDeutscheZahl(unternehmerlohn),
    });
  }, [geschaeftsform, miete, versicherungen, software, telefonInternet, buchhaltung, sonstigeFix, material, fahrtkosten, marketing, unternehmerlohn]);

  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const geschaeftsformLabel: Record<Geschaeftsform, string> = {
    freelancer: 'Freelancer / Einzelunternehmer',
    gmbh: 'GmbH',
    ug: 'UG (haftungsbeschränkt)',
  };

  return (
    <div>
      <div className="space-y-4 mb-6">
        {/* Geschäftsform */}
        <div>
          <label htmlFor="betriebskosten-geschaeftsform" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Geschäftsform
          </label>
          <select
            id="betriebskosten-geschaeftsform"
            value={geschaeftsform}
            onChange={e => setGeschaeftsform(e.target.value as Geschaeftsform)}
            className="input-field"
          >
            <option value="freelancer">Freelancer / Einzelunternehmer</option>
            <option value="gmbh">GmbH</option>
            <option value="ug">UG (haftungsbeschränkt)</option>
          </select>
        </div>

        {/* Fixkosten */}
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fixkosten pro Monat</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Miete / Büro</label>
            <NummerEingabe value={miete} onChange={setMiete} einheit="€" placeholder="500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Versicherungen</label>
            <NummerEingabe value={versicherungen} onChange={setVersicherungen} einheit="€" placeholder="200" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Software / Tools</label>
            <NummerEingabe value={software} onChange={setSoftware} einheit="€" placeholder="100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Telefon / Internet</label>
            <NummerEingabe value={telefonInternet} onChange={setTelefonInternet} einheit="€" placeholder="60" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Buchhaltung / Steuerberater</label>
            <NummerEingabe value={buchhaltung} onChange={setBuchhaltung} einheit="€" placeholder="150" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sonstige Fixkosten</label>
            <NummerEingabe value={sonstigeFix} onChange={setSonstigeFix} einheit="€" placeholder="100" />
          </div>
        </div>

        {/* Variable Kosten */}
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Variable Kosten pro Monat</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Material / Wareneinsatz</label>
            <NummerEingabe value={material} onChange={setMaterial} einheit="€" placeholder="0" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fahrtkosten</label>
            <NummerEingabe value={fahrtkosten} onChange={setFahrtkosten} einheit="€" placeholder="100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Marketing</label>
            <NummerEingabe value={marketing} onChange={setMarketing} einheit="€" placeholder="200" />
          </div>
        </div>

        {/* Unternehmerlohn */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Eigenes Gehalt / Unternehmerlohn</label>
          <NummerEingabe value={unternehmerlohn} onChange={setUnternehmerlohn} einheit="€" placeholder="3.000" />
        </div>
      </div>

      {/* Ergebnis */}
      {ergebnis && ergebnis.gesamtMonat > 0 && (
        <>
          {/* Hauptergebnis */}
          <div className="result-box mb-4">
            <p className="text-white/70 text-sm mb-1">Monatliche Gesamtkosten</p>
            <p className="text-5xl font-bold">{fmt(ergebnis.gesamtMonat)} <span className="text-2xl">€</span></p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-4 border-t border-white/20">
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">Jährliche Kosten</p>
                <p className="text-lg font-bold">{fmt(ergebnis.gesamtJahr)} €</p>
              </div>
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">Umsatz netto nötig</p>
                <p className="text-lg font-bold">{fmt(ergebnis.noetigerUmsatzNetto)} €</p>
              </div>
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">Umsatz brutto nötig</p>
                <p className="text-lg font-bold">{fmt(ergebnis.noetigerUmsatzBrutto)} €</p>
              </div>
              <div className="text-center">
                <p className="text-white/60 text-xs mb-1">Stundensatz (≈1.400 h)</p>
                <p className="text-lg font-bold">{fmt(ergebnis.noetigerStundensatz)} €</p>
              </div>
            </div>
          </div>

          {/* Tortendiagramm Fix/Variabel/Gehalt */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 mb-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Kostenverteilung</p>
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
            <div className="grid grid-cols-3 gap-2">
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
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Aufschlüsselung im Detail</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <div className="px-4 py-2 bg-blue-50/50 dark:bg-blue-500/5">
                <p className="text-xs font-semibold text-blue-700 dark:text-blue-400">Fixkosten</p>
              </div>
              {ergebnis.fixkostenDetail.map(k => (
                <div key={k.label} className="flex justify-between px-4 py-3 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{k.label}</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(k.betrag)} €</span>
                </div>
              ))}
              <div className="flex justify-between px-4 py-3 text-sm font-bold bg-blue-50/30 dark:bg-blue-500/5">
                <span className="text-gray-800 dark:text-gray-100">Fixkosten gesamt</span>
                <span className="text-blue-600 dark:text-blue-400">{fmt(ergebnis.fixkostenGesamt)} €</span>
              </div>

              <div className="px-4 py-2 bg-amber-50/50 dark:bg-amber-500/5">
                <p className="text-xs font-semibold text-amber-700 dark:text-amber-400">Variable Kosten</p>
              </div>
              {ergebnis.variableKostenDetail.map(k => (
                <div key={k.label} className="flex justify-between px-4 py-3 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{k.label}</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(k.betrag)} €</span>
                </div>
              ))}
              <div className="flex justify-between px-4 py-3 text-sm font-bold bg-amber-50/30 dark:bg-amber-500/5">
                <span className="text-gray-800 dark:text-gray-100">Variable Kosten gesamt</span>
                <span className="text-amber-600 dark:text-amber-400">{fmt(ergebnis.variableKostenGesamt)} €</span>
              </div>

              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Unternehmerlohn</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.unternehmerlohn)} €</span>
              </div>

              <div className="flex justify-between px-4 py-3 text-sm font-bold bg-primary-50/50 dark:bg-primary-500/5">
                <span className="text-gray-800 dark:text-gray-100">Gesamtkosten / Monat</span>
                <span className="text-primary-600 dark:text-primary-400">{fmt(ergebnis.gesamtMonat)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm font-bold bg-primary-50/50 dark:bg-primary-500/5">
                <span className="text-gray-800 dark:text-gray-100">Gesamtkosten / Jahr</span>
                <span className="text-primary-600 dark:text-primary-400">{fmt(ergebnis.gesamtJahr)} €</span>
              </div>
            </div>
          </div>

          {/* Hinweis */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-4">
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              <strong>Hinweis:</strong> Vereinfachte Kalkulation. Nicht berücksichtigt sind u. a. Einkommensteuer, Gewerbesteuer, Sozialversicherungsbeiträge und saisonale Schwankungen. Der Stundensatz basiert auf ca. 1.400 fakturierbaren Stunden pro Jahr. Im Zweifel konsultieren Sie einen Steuerberater.
            </p>
          </div>

          <CrossLink href="/arbeit/freelancer-stundensatz-rechner" emoji="💰" text="Freelancer-Stundensatz berechnen" />
          <CrossLink href="/finanzen/mwst-rechner" emoji="🧾" text="Mehrwertsteuer berechnen" />
          <CrossLink href="/finanzen/gmbh-geschaeftsfuehrer-rechner" emoji="🏢" text="GmbH-Geschäftsführer-Gehalt berechnen" />

          <ErgebnisAktionen
            ergebnisText={`Betriebskosten (${geschaeftsformLabel[geschaeftsform]}): ${fmt(ergebnis.gesamtMonat)} €/Monat (${fmt(ergebnis.gesamtJahr)} €/Jahr) | Fixkosten: ${fmt(ergebnis.fixkostenGesamt)} € | Variable Kosten: ${fmt(ergebnis.variableKostenGesamt)} € | Unternehmerlohn: ${fmt(ergebnis.unternehmerlohn)} € | Nötiger Stundensatz: ${fmt(ergebnis.noetigerStundensatz)} €`}
            seitenTitel="Betriebskosten-Rechner"
          />

          <AffiliateBox programId="lexware" context="betriebskosten" />

          <AiExplain
            rechnerName="Betriebskosten-Rechner"
            eingaben={{
              geschaeftsform,
              mieteEuro: parseDeutscheZahl(miete),
              versicherungenEuro: parseDeutscheZahl(versicherungen),
              softwareEuro: parseDeutscheZahl(software),
              telefonInternetEuro: parseDeutscheZahl(telefonInternet),
              buchhaltungEuro: parseDeutscheZahl(buchhaltung),
              sonstigeFixEuro: parseDeutscheZahl(sonstigeFix),
              materialEuro: parseDeutscheZahl(material),
              fahrtkostenEuro: parseDeutscheZahl(fahrtkosten),
              marketingEuro: parseDeutscheZahl(marketing),
              unternehmerlohnEuro: parseDeutscheZahl(unternehmerlohn),
            }}
            ergebnis={{
              fixkostenGesamtEuro: ergebnis.fixkostenGesamt,
              variableKostenGesamtEuro: ergebnis.variableKostenGesamt,
              gesamtMonatEuro: ergebnis.gesamtMonat,
              gesamtJahrEuro: ergebnis.gesamtJahr,
              noetigerUmsatzNettoEuro: ergebnis.noetigerUmsatzNetto,
              noetigerUmsatzBruttoEuro: ergebnis.noetigerUmsatzBrutto,
              noetigerStundensatzEuro: ergebnis.noetigerStundensatz,
            }}
          />
        </>
      )}
    </div>
  );
}
