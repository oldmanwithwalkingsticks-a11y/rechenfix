'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';
import {
  type Altersstufe,
  type KindergeldOption,
  KINDERGELD_2026,
  KINDERGELD_HAELFTIG_2026,
  SELBSTBEHALT_2026,
  findeEinkommensgruppe,
  berechneTabellenwert,
  berechneZahlbetrag,
  berechneElternunterhalt,
} from '@/lib/berechnungen/duesseldorfer-tabelle';

// Ausbildungspauschale § 1610 BGB — pauschaler Abzug bei eigenem Einkommen
// volljähriger Kinder in Ausbildung. Nicht Teil der DT-Konstanten, daher
// hier lokal.
const AUSBILDUNGS_PAUSCHALE = 100;

const ALTERS_LABELS: Record<Altersstufe, string> = {
  '0-5': '0–5 Jahre',
  '6-11': '6–11 Jahre',
  '12-17': '12–17 Jahre',
  '18+': 'Ab 18 Jahre',
};

interface KindState {
  alter: Altersstufe;
  /** Nur bei '18+' relevant — entscheidet über Kindergeld-Berechtigung. */
  inErstausbildung: boolean;
  kindergeldOpt: KindergeldOption;
  eigenesEinkommen: string;
}

function defaultKind(alter: Altersstufe = '6-11'): KindState {
  const volljaehrig = alter === '18+';
  return {
    alter,
    inErstausbildung: volljaehrig,
    kindergeldOpt: volljaehrig ? 'voll' : 'hälftig',
    eigenesEinkommen: '0',
  };
}

const fmtEuro = (n: number) =>
  n.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
const fmtEuro2 = (n: number) =>
  n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function UnterhaltsRechner() {
  const [netto, setNetto] = useState('3000');
  const [anzahlKinder, setAnzahlKinder] = useState(1);
  const [kinder, setKinder] = useState<KindState[]>([defaultKind('6-11')]);
  const [gruppenAnpassung, setGruppenAnpassung] = useState(false);

  // Elternunterhalt (ausklappbar, default zu)
  const [elternOffen, setElternOffen] = useState(false);
  const [elternNettoKind, setElternNettoKind] = useState('3500');
  const [elternMitEhegatte, setElternMitEhegatte] = useState(false);
  const [elternNettoEhegatte, setElternNettoEhegatte] = useState('2800');

  const handleAnzahlChange = (n: number) => {
    setAnzahlKinder(n);
    setKinder(prev => {
      const next = [...prev];
      while (next.length < n) next.push(defaultKind('6-11'));
      return next.slice(0, n);
    });
    // Bei exakt 2 Kindern ist die DT-Basisannahme erfüllt — Anpassung deaktivieren
    if (n === 2) setGruppenAnpassung(false);
  };

  const updateKind = (i: number, patch: Partial<KindState>) => {
    setKinder(prev => {
      const next = [...prev];
      next[i] = { ...next[i], ...patch };
      return next;
    });
  };

  const handleAlterChange = (i: number, val: Altersstufe) => {
    setKinder(prev => {
      const next = [...prev];
      const alt = next[i];
      const volljaehrig = val === '18+';
      next[i] = {
        ...alt,
        alter: val,
        inErstausbildung: volljaehrig,
        // KG-Default neu setzen: minderjährig hälftig, 18+ in Erstausbildung voll
        kindergeldOpt: volljaehrig ? 'voll' : 'hälftig',
      };
      return next;
    });
  };

  const ergebnis = useMemo(() => {
    const einkommen = parseDeutscheZahl(netto) || 0;
    const basisGruppe = findeEinkommensgruppe(einkommen, anzahlKinder, false);
    const gruppe = findeEinkommensgruppe(einkommen, anzahlKinder, gruppenAnpassung);
    const anpassungWirktSich = gruppe !== basisGruppe;

    const berechnet = Array.from({ length: anzahlKinder }).map((_, i) => {
      const k = kinder[i] || defaultKind('6-11');
      const tabellen = berechneTabellenwert(k.alter, gruppe);

      const volljaehrig = k.alter === '18+';
      const eigen = volljaehrig ? parseDeutscheZahl(k.eigenesEinkommen) || 0 : 0;
      const anrechenbar = Math.max(0, eigen - AUSBILDUNGS_PAUSCHALE);

      // KG-Option: für Minderjährige/Erstausbildung erlaubt; bei 18+ ohne
      // Erstausbildung fix auf 'keine' — Anspruch entfällt.
      const kgEffektiv: KindergeldOption =
        volljaehrig && !k.inErstausbildung ? 'keine' : k.kindergeldOpt;
      const kgAbzug =
        kgEffektiv === 'voll'
          ? KINDERGELD_2026
          : kgEffektiv === 'hälftig'
            ? KINDERGELD_HAELFTIG_2026
            : 0;

      const zahl = berechneZahlbetrag(tabellen, kgEffektiv, anrechenbar);

      // Privilegiert volljährig — vereinfacht: in Erstausbildung = privilegiert.
      // Strikte Definition (§ 1603 Abs. 2 BGB) verlangt zusätzlich < 21 Jahre,
      // unverheiratet, im Haushalt eines Elternteils. Der Rechner nutzt die
      // einfachere Faustregel; siehe Hinweis in der Ergebnis-Aufschlüsselung.
      const privilegiert = !volljaehrig || k.inErstausbildung;

      return {
        index: i + 1,
        alter: k.alter,
        volljaehrig,
        privilegiert,
        tabellen,
        kgEffektiv,
        kgAbzug,
        eigenesEinkommen: eigen,
        anrechenbar,
        zahl,
      };
    });

    const summe = berechnet.reduce((a, b) => a + b.zahl, 0);

    // Selbstbehalt-Hinweis (kein Quotelungs-Mangelfall — außerhalb des Scopes).
    const hatNichtPrivilegierte = berechnet.some(k => !k.privilegiert);
    const selbstbehalt = hatNichtPrivilegierte
      ? SELBSTBEHALT_2026.gegen_nicht_privilegiert_volljaehrig
      : SELBSTBEHALT_2026.erwerbstaetig_gegen_minderjaehrig;
    const istMangelfall = summe > einkommen - selbstbehalt;

    return {
      einkommen,
      gruppe,
      basisGruppe,
      anpassungWirktSich,
      kinder: berechnet,
      summe,
      selbstbehalt,
      istMangelfall,
      hatNichtPrivilegierte,
    };
  }, [netto, anzahlKinder, kinder, gruppenAnpassung]);

  const elternErgebnis = useMemo(() => {
    if (!elternOffen) return null;
    return berechneElternunterhalt(
      parseDeutscheZahl(elternNettoKind) || 0,
      elternMitEhegatte,
      parseDeutscheZahl(elternNettoEhegatte) || 0,
    );
  }, [elternOffen, elternNettoKind, elternMitEhegatte, elternNettoEhegatte]);

  const kgOptions: { value: KindergeldOption; label: string }[] = [
    { value: 'hälftig', label: 'Hälftig (129,50 €)' },
    { value: 'voll', label: 'Voll (259 €)' },
    { value: 'keine', label: 'Keines' },
  ];

  return (
    <div>
      {/* 1: Nettoeinkommen */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Bereinigtes Nettoeinkommen des Unterhaltspflichtigen
        </h2>
        <NummerEingabe value={netto} onChange={setNetto} placeholder="3000" einheit="€/Monat" />
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Nach Abzug berufsbedingter Aufwendungen (typ. 5 % pauschal) und Schulden.</p>
      </div>

      {/* 2: Anzahl Kinder */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Anzahl unterhaltspflichtiger Kinder
        </h2>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Anzahl Kinder">
          {[1, 2, 3, 4, 5].map(n => (
            <button
              key={n}
              type="button"
              onClick={() => handleAnzahlChange(n)}
              aria-pressed={anzahlKinder === n}
              className={`min-w-[48px] min-h-[48px] px-4 rounded-xl text-sm font-medium transition-all ${anzahlKinder === n ? 'bg-primary-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600'}`}
            >
              {n === 1 ? '1 Kind' : `${n} Kinder`}
            </button>
          ))}
        </div>

        {/* Höherstufungs-Checkbox — versteckt bei exakt 2 Kindern (Basisannahme der DT). */}
        {anzahlKinder !== 2 && (
          <div className="mt-4 flex items-start gap-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/30 p-3">
            <input
              type="checkbox"
              id="unterhalt-gruppenanpassung"
              checked={gruppenAnpassung}
              onChange={e => setGruppenAnpassung(e.target.checked)}
              className="mt-1 w-4 h-4 accent-primary-500"
            />
            <label htmlFor="unterhalt-gruppenanpassung" className="cursor-pointer">
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Einkommensgruppe bei Abweichung von 2 Kindern anpassen</span>
              <span className="block mt-1 text-xs text-gray-600 dark:text-gray-400">
                Die DT geht von 2 unterhaltspflichtigen Kindern aus. Bei 1 Kind kann eine Höhergruppierung, bei 3+ eine Herabstufung angemessen sein — entscheidet im Einzelfall das Gericht. Aktivieren für eine strengere Schätzung.
              </span>
            </label>
          </div>
        )}
      </div>

      {/* 3: Einstellungen je Kind */}
      <div className="mb-6">
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          Einstellungen je Kind
        </h2>
        <div className="space-y-4">
          {Array.from({ length: anzahlKinder }).map((_, i) => {
            const k = kinder[i] || defaultKind('6-11');
            const voll = k.alter === '18+';
            const kgId = `unterhalt-kind-${i + 1}`;
            return (
              <div key={i} className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 w-16">Kind {i + 1}</span>
                  <label htmlFor={`${kgId}-alter`} className="sr-only">Altersgruppe Kind {i + 1}</label>
                  <select
                    id={`${kgId}-alter`}
                    value={k.alter}
                    onChange={e => handleAlterChange(i, e.target.value as Altersstufe)}
                    className="flex-1 min-h-[48px] px-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-sm text-gray-800 dark:text-gray-200"
                  >
                    {(Object.keys(ALTERS_LABELS) as Altersstufe[]).map(key => (
                      <option key={key} value={key}>{ALTERS_LABELS[key]}</option>
                    ))}
                  </select>
                </div>

                {voll && (
                  <div className="flex items-start gap-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 p-3">
                    <input
                      type="checkbox"
                      id={`${kgId}-erstausbildung`}
                      checked={k.inErstausbildung}
                      onChange={e => updateKind(i, {
                        inErstausbildung: e.target.checked,
                        // KG-Default folgt: Erstausbildung = voll, sonst keine
                        kindergeldOpt: e.target.checked ? 'voll' : 'keine',
                      })}
                      className="mt-1 w-4 h-4 accent-primary-500"
                    />
                    <label htmlFor={`${kgId}-erstausbildung`} className="cursor-pointer">
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Kind in Erstausbildung / Studium</span>
                      <span className="block mt-0.5 text-xs text-gray-600 dark:text-gray-400">
                        Nur dann besteht i. d. R. Kindergeld- und Unterhaltsanspruch (§ 1610 BGB).
                      </span>
                    </label>
                  </div>
                )}

                <RadioToggleGroup
                  name={`${kgId}-kg`}
                  legend={`Kindergeld-Anrechnung Kind ${i + 1}`}
                  srOnlyLegend
                  options={voll && !k.inErstausbildung ? [kgOptions[2]] : kgOptions}
                  value={voll && !k.inErstausbildung ? 'keine' : k.kindergeldOpt}
                  onChange={v => updateKind(i, { kindergeldOpt: v as KindergeldOption })}
                  columns={3}
                />

                {voll && (
                  <div>
                    <label htmlFor={`${kgId}-eigen`} className="text-xs font-medium text-gray-700 dark:text-gray-300 block mb-1">
                      Eigenes Einkommen des Kindes (Ausbildungsvergütung, Nebenjob)
                    </label>
                    <NummerEingabe
                      value={k.eigenesEinkommen}
                      onChange={v => updateKind(i, { eigenesEinkommen: v })}
                      placeholder="0"
                      einheit="€/Monat"
                    />
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Mindert den Anspruch um den übersteigenden Betrag (100 € ausbildungsbedingter Mehrbedarf wird pauschal abgezogen).
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ERGEBNIS */}
      <div className="result-box mb-2">
        <p className="text-white/90 text-sm mb-1">Monatlicher Kindesunterhalt gesamt</p>
        <p className="text-5xl font-bold">{fmtEuro(ergebnis.summe)} €</p>
        <p className="text-white/90 text-sm mt-2">
          Einkommensgruppe <strong>{ergebnis.gruppe}</strong> der Düsseldorfer Tabelle 2026
        </p>
      </div>

      {ergebnis.anpassungWirktSich && (
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-6">
          Basis-Gruppe {ergebnis.basisGruppe} {anzahlKinder === 1 ? 'erhöht' : 'gesenkt'} wegen{' '}
          {anzahlKinder === 1 ? 'nur 1 unterhaltspflichtigem Kind' : `${anzahlKinder} unterhaltspflichtigen Kindern`} (Opt-in Höherstufung).
        </p>
      )}
      {!ergebnis.anpassungWirktSich && <div className="mb-6" />}

      {ergebnis.istMangelfall && (
        <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-4 mb-6">
          <p className="text-red-800 dark:text-red-300 text-sm">
            <strong>⚠️ Mangelfall-Hinweis:</strong> Die rechnerische Unterhaltssumme ({fmtEuro(ergebnis.summe)} €) übersteigt das verfügbare Einkommen oberhalb des Selbstbehalts ({fmtEuro(ergebnis.selbstbehalt)} €). In der Praxis wird der Unterhalt dann anteilig gekürzt (Quotelung). Dieser Rechner zeigt den Tabellenwert unverändert — für eine Mangelfall-Berechnung ist eine anwaltliche Prüfung sinnvoll.
          </p>
        </div>
      )}

      {/* Tabelle pro Kind */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
        <div className="px-4 pt-4 pb-1">
          <h2 className="font-bold text-gray-700 dark:text-gray-200">Aufschlüsselung pro Kind</h2>
        </div>
        <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Aufschlüsselung pro Kind, scrollbar">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/30 text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                <th className="px-3 py-2 text-left font-semibold">Kind</th>
                <th className="px-3 py-2 text-left font-semibold">Alter</th>
                <th className="px-3 py-2 text-right font-semibold">Tabelle</th>
                <th className="px-3 py-2 text-right font-semibold">− KG</th>
                <th className="px-3 py-2 text-right font-semibold">− Eig. Eink.</th>
                <th className="px-3 py-2 text-right font-semibold">Zahlbetrag</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {ergebnis.kinder.map(k => (
                <tr key={k.index}>
                  <td className="px-3 py-2.5 text-gray-700 dark:text-gray-300">
                    Kind {k.index}
                    {k.volljaehrig && (
                      <span className={`ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium ${k.privilegiert ? 'bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300' : 'bg-orange-100 text-orange-800 dark:bg-orange-500/20 dark:text-orange-300'}`}>
                        {k.privilegiert ? 'privilegiert' : 'nicht-privilegiert'}
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2.5 text-gray-700 dark:text-gray-300">{ALTERS_LABELS[k.alter]}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums text-gray-800 dark:text-gray-200">{fmtEuro(k.tabellen)} €</td>
                  <td className="px-3 py-2.5 text-right tabular-nums text-red-700 dark:text-red-300">
                    {k.kgEffektiv === 'hälftig'
                      ? `−${fmtEuro2(KINDERGELD_HAELFTIG_2026)} €`
                      : k.kgEffektiv === 'voll'
                        ? `−${fmtEuro(KINDERGELD_2026)} €`
                        : '—'}
                  </td>
                  <td className="px-3 py-2.5 text-right tabular-nums text-red-700 dark:text-red-300">{k.anrechenbar > 0 ? `−${fmtEuro(k.anrechenbar)} €` : '—'}</td>
                  <td className="px-3 py-2.5 text-right tabular-nums font-semibold text-gray-900 dark:text-gray-100">{fmtEuro(k.zahl)} €</td>
                </tr>
              ))}
              <tr className="bg-blue-50 dark:bg-blue-500/10 font-bold">
                <td className="px-3 py-3 text-blue-800 dark:text-blue-300" colSpan={5}>= Gesamtsumme</td>
                <td className="px-3 py-3 text-right tabular-nums text-blue-800 dark:text-blue-300">{fmtEuro(ergebnis.summe)} €</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Hinweisbox */}
      <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-6 text-amber-800 dark:text-amber-300 text-xs leading-relaxed">
        <p><strong>⚠ Hinweis:</strong> Berechnung nach Düsseldorfer Tabelle 2026 (gültig ab 01.01.2026). Sonderbedarf und Mehrbedarf (Kita, Nachhilfe, Zahnspange, Studiengebühren) sind nicht berücksichtigt.</p>
        <p className="mt-2"><strong>Selbstbehalte 2026 (Kindesunterhalt unverändert gegenüber 2025):</strong></p>
        <ul className="list-disc pl-5 mt-1 space-y-0.5">
          <li>1.450 € erwerbstätig, gegenüber minderjährigen &amp; privilegiert volljährigen Kindern</li>
          <li>1.200 € nicht erwerbstätig, gegenüber minderjährigen &amp; privilegiert volljährigen Kindern</li>
          <li>1.750 € gegenüber nicht-privilegiert volljährigen Kindern</li>
          <li><strong>NEU 2026:</strong> 2.650 € bei Elternunterhalt (siehe Abschnitt unten)</li>
        </ul>
        <p className="mt-2"><strong>Kindergeld 2026:</strong> 259 € (hälftige Anrechnung bei minderjährigen Kindern: 129,50 €).</p>
      </div>

      <CrossLink href="/arbeit/scheidungskosten-rechner" emoji="⚖️" text="Scheidungskosten berechnen" />
      <CrossLink href="/arbeit/zugewinnausgleich-rechner" emoji="💍" text="Zugewinnausgleich berechnen" />
      <CrossLink href="/finanzen/kindergeld-rechner" emoji="👶" text="Kindergeld-Höhe prüfen" />

      <ErgebnisAktionen
        ergebnisText={`Kindesunterhalt (DT 2026): ${fmtEuro(ergebnis.summe)} €/Monat für ${anzahlKinder === 1 ? '1 Kind' : `${anzahlKinder} Kinder`} | Netto ${fmtEuro(ergebnis.einkommen)} € | Einkommensgruppe ${ergebnis.gruppe}${ergebnis.anpassungWirktSich ? ` (Basis ${ergebnis.basisGruppe}, Höherstufung aktiv)` : ''}${ergebnis.istMangelfall ? ' | Mangelfall-Hinweis' : ''}`}
        seitenTitel="Unterhaltsrechner"
      />

      <AffiliateBox programId="ks-auxilia" context="unterhalt" />

      {/* ─── Elternunterhalt (ausklappbar) ─── */}
      <section className="mt-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
        <button
          type="button"
          onClick={() => setElternOffen(o => !o)}
          aria-expanded={elternOffen}
          aria-controls="elternunterhalt-panel"
          className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        >
          <span>
            <span className="block text-sm font-semibold text-gray-800 dark:text-gray-100">
              Zusätzlich: Elternunterhalt berechnen (neu 2026)
            </span>
            <span className="block text-xs text-gray-600 dark:text-gray-400 mt-0.5">
              BGH XII ZB 6/24 — 70 % des Einkommens oberhalb des Selbstbehalts bleiben anrechnungsfrei.
            </span>
          </span>
          <span aria-hidden="true" className="text-gray-600 dark:text-gray-400 text-lg">
            {elternOffen ? '−' : '+'}
          </span>
        </button>

        {elternOffen && (
          <div id="elternunterhalt-panel" className="px-4 pb-4 pt-2 space-y-4 border-t border-gray-100 dark:border-gray-700">
            <div>
              <label htmlFor="eltern-netto-kind" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Bereinigtes Netto des unterhaltspflichtigen Kindes
              </label>
              <NummerEingabe
                value={elternNettoKind}
                onChange={setElternNettoKind}
                placeholder="3500"
                einheit="€/Monat"
              />
            </div>

            <div>
              <span className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Lebt das Kind mit Ehegatten zusammen?
              </span>
              <RadioToggleGroup
                name="eltern-ehegatte"
                legend="Ehegatte-Konstellation"
                srOnlyLegend
                options={[
                  { value: 'nein', label: 'Nein' },
                  { value: 'ja', label: 'Ja' },
                ]}
                value={elternMitEhegatte ? 'ja' : 'nein'}
                onChange={v => setElternMitEhegatte(v === 'ja')}
                columns={2}
              />
            </div>

            {elternMitEhegatte && (
              <div>
                <label htmlFor="eltern-netto-ehegatte" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Bereinigtes Netto des Ehegatten
                </label>
                <NummerEingabe
                  value={elternNettoEhegatte}
                  onChange={setElternNettoEhegatte}
                  placeholder="2800"
                  einheit="€/Monat"
                />
              </div>
            )}

            {elternErgebnis && (
              <div className="rounded-xl border border-primary-200 dark:border-primary-500/30 bg-primary-50 dark:bg-primary-500/10 p-4">
                <p className="text-sm text-primary-800 dark:text-primary-200">
                  <strong>Zumutbarer Elternunterhalt:</strong>{' '}
                  <span className="tabular-nums text-lg font-bold">{fmtEuro(elternErgebnis.zumutbar)} €/Monat</span>
                </p>
                {elternErgebnis.status === 'auch_ehegatte_traegt' && (
                  <p className="text-xs text-primary-700 dark:text-primary-300 mt-1">
                    Davon Kind-Anteil: {fmtEuro(elternErgebnis.kindAnteil)} € ·
                    Ehegatten-Anteil: {fmtEuro(elternErgebnis.ehegatteAnteil)} €
                  </p>
                )}
                <p className="text-xs text-primary-700 dark:text-primary-300 mt-2">{elternErgebnis.erklaerung}</p>
              </div>
            )}

            <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-3 text-amber-800 dark:text-amber-300 text-xs leading-relaxed">
              <p>
                <strong>⚠️ Wichtig:</strong> Der tatsächlich zu zahlende Elternunterhalt setzt zusätzlich eine gesetzliche Unterhaltspflicht nach § 1601 BGB voraus. Diese besteht nur, wenn die Eltern bedürftig sind (z.&thinsp;B. Grundsicherung im Alter beziehen oder beziehen müssten).
              </p>
              <p className="mt-2">
                <strong>Angehörigen-Entlastungsgesetz:</strong> Bei einem Jahreseinkommen des Kindes unter 100.000 € brutto besteht grundsätzlich keine Unterhaltspflicht für die Eltern.
              </p>
            </div>
          </div>
        )}
      </section>

      <AiExplain
        rechnerName="Unterhaltsrechner"
        eingaben={{
          netto: `${fmtEuro(ergebnis.einkommen)} €`,
          anzahlKinder: String(anzahlKinder),
          hoeherstufung: gruppenAnpassung ? 'ja' : 'nein',
          kinder: kinder.slice(0, anzahlKinder).map((k, i) => {
            const teile: string[] = [`Kind ${i + 1}: ${ALTERS_LABELS[k.alter]}`];
            if (k.alter === '18+') teile.push(k.inErstausbildung ? 'in Erstausbildung' : 'nicht in Erstausbildung');
            teile.push(`KG: ${k.kindergeldOpt}`);
            const eigen = parseDeutscheZahl(k.eigenesEinkommen);
            if (k.alter === '18+' && eigen > 0) teile.push(`eigenes Eink.: ${k.eigenesEinkommen} €`);
            return teile.join(', ');
          }).join(' | '),
        }}
        ergebnis={{
          gesamt: `${fmtEuro(ergebnis.summe)} €`,
          einkommensgruppe: `${ergebnis.gruppe}${ergebnis.anpassungWirktSich ? ` (Basis ${ergebnis.basisGruppe})` : ''}`,
          mangelfall: ergebnis.istMangelfall ? 'ja' : 'nein',
          elternunterhalt: elternErgebnis ? `${fmtEuro(elternErgebnis.zumutbar)} €` : 'nicht berechnet',
        }}
      />
    </div>
  );
}
