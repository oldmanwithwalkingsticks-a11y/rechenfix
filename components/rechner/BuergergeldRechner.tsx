'use client';

import { useState, useMemo } from 'react';
import {
  berechneBuergergeld,
  type Bedarfsgemeinschaft,
  type Kindergruppe,
  type KindEintrag,
  type MehrbedarfEingabe,
  type JugendlicherStatusKategorie,
} from '@/lib/berechnungen/buergergeld';
import {
  KDU_ANGEMESSENHEITS_HINWEIS,
  getAktuelleBuergergeldParameter,
} from '@/lib/berechnungen/buergergeld-parameter';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';

const ALTERSGRUPPEN: { key: Kindergruppe; label: string }[] = [
  { key: '0-5', label: '0–5 Jahre' },
  { key: '6-13', label: '6–13 Jahre' },
  { key: '14-17', label: '14–17 Jahre' },
  { key: '18-24', label: '18–24 Jahre' },
];

const JUGENDLICHER_STATUS_OPTIONEN: { value: JugendlicherStatusKategorie; label: string }[] = [
  { value: 'none', label: 'Kein Sonderstatus (regulärer Freibetrag)' },
  { value: 'schueler', label: 'Schüler/in einer allgemein- oder berufsbildenden Schule' },
  { value: 'azubi', label: 'Auszubildende/r' },
  { value: 'studierender', label: 'Studierende/r' },
  { value: 'freiwilligendienst', label: 'Bundesfreiwilligendienst / Jugendfreiwilligendienst' },
];

// ISO-Monat „YYYY-MM" des aktuellen Datums für <input type="month">-Default.
function aktuellerMonat(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

/** Parst „YYYY-MM" in Date (1. des Monats, lokale Zeit). */
function parseMonat(s: string): Date {
  const [y, m] = s.split('-').map(Number);
  return new Date(y, (m || 1) - 1, 1);
}

export default function BuergergeldRechner() {
  const [bg, setBg] = useState<Bedarfsgemeinschaft>('alleinstehend');
  const [kinder, setKinder] = useState<KindEintrag[]>([]);
  const [warmmiete, setWarmmiete] = useState('450');
  const [heizkosten, setHeizkosten] = useState('80');
  const [einkommen, setEinkommen] = useState('0');
  const [vermoegen, setVermoegen] = useState('0');
  const [stichtagMonat, setStichtagMonat] = useState<string>(aktuellerMonat());
  const [alterAntragsteller, setAlterAntragsteller] = useState('35');
  const [alterPartner, setAlterPartner] = useState('35');

  // Mehrbedarfe § 21 SGB II (optional)
  const [alleinerziehend, setAlleinerziehend] = useState(false);
  const [schwanger, setSchwanger] = useState(false);
  const [behinderung, setBehinderung] = useState(false);
  const [warmwasserDezentral, setWarmwasserDezentral] = useState(false);
  const [ernaehrungEuro, setErnaehrungEuro] = useState('0');
  const [atypischEuro, setAtypischEuro] = useState('0');

  // § 11b Abs. 2b SGB II — Jugendlichen-Freibetrag (optional)
  const [jugendlicherStatus, setJugendlicherStatus] = useState<JugendlicherStatusKategorie>('none');
  const [jugendlicherAlter, setJugendlicherAlter] = useState('22');

  // Alleinerziehend-Mehrbedarf § 21 Abs. 3 SGB II: rechtlich nur bei alleiniger
  // Pflege/Erziehung. Im UI deshalb NUR wirksam, wenn Bedarfsgemeinschaft
  // = 'alleinstehend' + Kinder > 0 + Checkbox bewusst aktiviert. Bei „Paar mit
  // Kindern" greift der Mehrbedarf regelmäßig nicht (gemeinsame Verantwortung).
  const alleinerziehendWirksam = bg === 'alleinstehend' && kinder.length > 0 && alleinerziehend;

  const mehrbedarfeInput: MehrbedarfEingabe = useMemo(() => ({
    alleinerziehend: alleinerziehendWirksam,
    schwangerschaftAb13SSW: schwanger,
    behinderungEingliederungshilfe: behinderung,
    warmwasserDezentral,
    kostenaufwaendigeErnaehrungEuro: parseDeutscheZahl(ernaehrungEuro),
    atypischerMehrbedarfEuro: parseDeutscheZahl(atypischEuro),
  }), [alleinerziehendWirksam, schwanger, behinderung, warmwasserDezentral, ernaehrungEuro, atypischEuro]);

  const stichtag = useMemo(() => parseMonat(stichtagMonat), [stichtagMonat]);

  const erwachseneAlter = useMemo(() => {
    const a = parseInt(alterAntragsteller) || 0;
    if (bg === 'alleinstehend') return [a];
    return [a, parseInt(alterPartner) || 0];
  }, [bg, alterAntragsteller, alterPartner]);

  const ergebnis = useMemo(
    () => berechneBuergergeld({
      bedarfsgemeinschaft: bg,
      kinder,
      warmmiete: parseDeutscheZahl(warmmiete),
      heizkosten: parseDeutscheZahl(heizkosten),
      einkommen: parseDeutscheZahl(einkommen),
      vermoegen: parseDeutscheZahl(vermoegen),
      mehrbedarfe: mehrbedarfeInput,
      jugendlicherStatus: jugendlicherStatus !== 'none'
        ? { alter: parseInt(jugendlicherAlter) || 0, status: jugendlicherStatus }
        : undefined,
      stichtag,
      erwachseneAlter,
    }),
    [bg, kinder, warmmiete, heizkosten, einkommen, vermoegen, mehrbedarfeInput, jugendlicherStatus, jugendlicherAlter, stichtag, erwachseneAlter]
  );

  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const kindHinzufuegen = () => {
    if (kinder.length >= 6) return;
    setKinder([...kinder, { alter: '0-5' }]);
  };

  const kindEntfernen = (index: number) => {
    setKinder(kinder.filter((_, i) => i !== index));
  };

  const kindAlterAendern = (index: number, alter: Kindergruppe) => {
    setKinder(kinder.map((k, i) => i === index ? { alter } : k));
  };

  // Bei Wechsel zu „Paar" (ohne Kinder): Kinder entfernen. „Alleinstehend" behält
  // die bisherigen Kinder (Alleinerziehend-Fall BG-MB bleibt ohne Re-Input
  // aktivierbar). „Paar mit Kindern" behält Kinder ohnehin.
  const handleBgChange = (neu: Bedarfsgemeinschaft) => {
    setBg(neu);
    if (neu === 'paar') {
      setKinder([]);
      // Alleinerziehend-Checkbox auch zurücksetzen, da ohne Kinder nicht anwendbar
      setAlleinerziehend(false);
    }
  };

  // Regelsätze aus Lib ableiten (Paket 6, Prompt 123): keine Hartkodierungen mehr.
  // Ab Prompt 129 mit Stichtag-Parameter, damit H2 (Grundsicherungsgeld ab
  // 01.07.2026) live im UI sichtbar wird, wenn User den Stichtag vorzieht.
  const params = getAktuelleBuergergeldParameter(stichtag);
  const istH2 = params.vermoegen.modus === 'alter_gestaffelt';
  const regelsatzInfo: { label: string; betrag: number }[] = [
    { label: 'Alleinstehende',     betrag: params.regelsaetze.rbs1_alleinstehend },
    { label: 'Partner/in (je Person)', betrag: params.regelsaetze.rbs2_paarProPerson },
    { label: 'Kind 18–24 Jahre',   betrag: params.regelsaetze.rbs3_volljaehrigBeiEltern },
    { label: 'Kind 14–17 Jahre',   betrag: params.regelsaetze.rbs4_jugendlich_14_17 },
    { label: 'Kind 6–13 Jahre',    betrag: params.regelsaetze.rbs5_kind_6_13 },
    { label: 'Kind 0–5 Jahre',     betrag: params.regelsaetze.rbs6_kind_0_5 },
  ];

  return (
    <div>
      {/* Bedarfsgemeinschaft */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bedarfsgemeinschaft</label>
        <div className="flex flex-col sm:flex-row gap-2">
          {([
            { key: 'alleinstehend' as const, label: 'Alleinstehend', icon: '👤' },
            { key: 'paar' as const, label: 'Paar', icon: '👫' },
            { key: 'paar-mit-kindern' as const, label: 'Paar mit Kindern', icon: '👨‍👩‍👧' },
          ]).map(opt => (
            <button
              key={opt.key}
              onClick={() => handleBgChange(opt.key)}
              className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${
                bg === opt.key
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <span>{opt.icon}</span> {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stichtag & Alter der Erwachsenen — ab H2 (01.07.2026) relevant für
          Schonvermögen § 12 Abs. 2 SGB II n.F. (altersgestaffelt). */}
      <div className="mb-5">
        <label htmlFor="buergergeld-stichtag" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Stichtag (Bezugsmonat)
        </label>
        <input
          id="buergergeld-stichtag"
          type="month"
          value={stichtagMonat}
          onChange={e => setStichtagMonat(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Ab 01.07.2026 heißt die Leistung offiziell <strong>Grundsicherungsgeld</strong>, mit neuem Schonvermögen
          (§ 12 Abs. 2 SGB II i.d.F. des 13. SGB II-Änderungsgesetzes, BGBl. 2026 I Nr. 107).
        </p>
      </div>

      {istH2 && (
        <div className="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="buergergeld-alter-antragsteller" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Alter {bg === 'alleinstehend' ? 'Antragsteller/in' : 'Partner/in 1'}
            </label>
            <input
              id="buergergeld-alter-antragsteller"
              type="number"
              min={18}
              max={99}
              step={1}
              value={alterAntragsteller}
              onChange={e => setAlterAntragsteller(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
            />
          </div>
          {bg !== 'alleinstehend' && (
            <div>
              <label htmlFor="buergergeld-alter-partner" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Alter Partner/in 2
              </label>
              <input
                id="buergergeld-alter-partner"
                type="number"
                min={18}
                max={99}
                step={1}
                value={alterPartner}
                onChange={e => setAlterPartner(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
              />
            </div>
          )}
        </div>
      )}

      {/* Kinder — bei „Paar mit Kindern" Pflicht, bei „Alleinstehend" optional (Alleinerziehend-Fall) */}
      {(bg === 'paar-mit-kindern' || bg === 'alleinstehend') && (
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Kinder ({kinder.length})
          </label>
          <div className="space-y-2">
            {kinder.map((kind, i) => (
              <div key={i} className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3">
                <span className="text-sm text-gray-600 dark:text-gray-400 shrink-0 w-16">Kind {i + 1}</span>
                <select id={`buergergeld-kind-${i + 1}-alter`} aria-label={`Alter Kind ${i + 1}`}
                  value={kind.alter}
                  onChange={e => kindAlterAendern(i, e.target.value as Kindergruppe)}
                  className="flex-1 text-sm bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-800 dark:text-gray-200"
                >
                  {ALTERSGRUPPEN.map(ag => (
                    <option key={ag.key} value={ag.key}>{ag.label}</option>
                  ))}
                </select>
                <button
                  onClick={() => kindEntfernen(i)}
                  className="text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors p-1"
                  aria-label={`Kind ${i + 1} entfernen`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          {kinder.length < 6 && (
            <button
              onClick={kindHinzufuegen}
              className="mt-2 text-sm text-primary-600 hover:text-primary-600 dark:hover:text-primary-400 font-medium flex items-center gap-1 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Kind hinzufügen
            </button>
          )}
        </div>
      )}

      {/* Unterkunftskosten */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Warmmiete</label>
          <NummerEingabe value={warmmiete} onChange={setWarmmiete} placeholder="z. B. 450" einheit="€" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Heizkosten</label>
          <NummerEingabe value={heizkosten} onChange={setHeizkosten} placeholder="z. B. 80" einheit="€" />
        </div>
      </div>

      {/* KdU-Angemessenheitshinweis § 22 SGB II */}
      <div className="mb-6 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 px-3 py-2.5 flex gap-2 items-start">
        <span className="text-gray-500 dark:text-gray-400 text-sm leading-tight" aria-hidden="true">ℹ️</span>
        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
          {KDU_ANGEMESSENHEITS_HINWEIS}
        </p>
      </div>

      {/* Einkommen & Vermögen */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Einkommen (Brutto)</label>
          <NummerEingabe value={einkommen} onChange={setEinkommen} placeholder="0" einheit="€" />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Monatliches Brutto</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Vermögen</label>
          <NummerEingabe value={vermoegen} onChange={setVermoegen} placeholder="0" einheit="€" />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Gesamt-Vermögen</p>
        </div>
      </div>

      {/* § 11b Abs. 2b SGB II — Jugendlichen-Freibetrag (aufklappbar, Paket 5 Prompt 123) */}
      <details className="mb-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800" open={jugendlicherStatus !== 'none'}>
        <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 select-none">
          Sonderstatus Einkommensfreibetrag (Schüler/Azubi/Student/Freiwilligendienst) — § 11b Abs. 2b SGB II
        </summary>
        <div className="px-4 pb-4 pt-1 space-y-3 border-t border-gray-100 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed italic">
            § 11b Abs. 2b SGB II: Für Schüler/Azubis/Studierende/Freiwilligendienstler unter
            25 Jahren gilt ein erhöhter Erwerbstätigen-Freibetrag in Höhe der Minijob-Grenze
            ({params.einkommensfreibetrag.jugendlicherFreibetrag_unter25} €/Monat, 2026) statt
            der üblichen Stufen-Regelung. Für über-25-Jährige in denselben Situationen:{' '}
            {params.einkommensfreibetrag.jugendlicherFreibetrag_ab25} €/Monat.
            Ferienjobs von Schülern sind zusätzlich vollständig anrechnungsfrei
            (§ 11a Abs. 7 SGB II) — diesen Sonderfall deckt der Rechner NICHT ab;
            bei Ferienjobs als Einkommen 0 € angeben.
          </p>
          <div>
            <label htmlFor="buergergeld-select-jugend-status" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status des Antragstellers
            </label>
            <select id="buergergeld-select-jugend-status"
              value={jugendlicherStatus}
              onChange={e => setJugendlicherStatus(e.target.value as JugendlicherStatusKategorie)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
            >
              {JUGENDLICHER_STATUS_OPTIONEN.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          {jugendlicherStatus !== 'none' && (
            <div>
              <label htmlFor="buergergeld-jugend-alter" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Alter des Antragstellers
              </label>
              <input
                id="buergergeld-jugend-alter"
                type="number"
                min={14}
                max={99}
                step={1}
                value={jugendlicherAlter}
                onChange={e => setJugendlicherAlter(e.target.value)}
                className="w-full sm:w-1/2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-[48px] text-sm"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Unter 25 → Freibetrag {params.einkommensfreibetrag.jugendlicherFreibetrag_unter25} €/Monat.
                Ab 25 → {params.einkommensfreibetrag.jugendlicherFreibetrag_ab25} €/Monat.
              </p>
            </div>
          )}
        </div>
      </details>

      {/* Mehrbedarfe § 21 SGB II — aufklappbar */}
      <details className="mb-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 select-none">
          Weitere Bedarfe (optional) — § 21 SGB II
        </summary>
        <div className="px-4 pb-4 pt-1 space-y-3 border-t border-gray-100 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 italic">
            Mehrbedarfe werden zusätzlich zum Regelsatz gewährt, wenn bestimmte Lebensumstände vorliegen. Mehrere Mehrbedarfe sind kombinierbar.
          </p>

          {bg === 'alleinstehend' && kinder.length > 0 && (
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={alleinerziehend}
                  onChange={e => setAlleinerziehend(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Alleinerziehend <span className="text-gray-600 dark:text-gray-500">— alleinige Pflege und Erziehung des/der Kinder (+12–60 % nach Staffel)</span>
                </span>
              </label>
              <p className="ml-7 mt-1 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Rechtsgrundlage: § 21 Abs. 3 SGB II. Anwendbar, wenn Sie allein für Pflege und Erziehung zuständig sind. Bei Wechselmodellen mit etwa gleicher Betreuung durch beide Elternteile greift der Mehrbedarf üblicherweise nicht.
              </p>
            </div>
          )}

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={schwanger}
              onChange={e => setSchwanger(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Schwangerschaft ab 13. Woche <span className="text-gray-600 dark:text-gray-500">(+17 %)</span>
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={behinderung}
              onChange={e => setBehinderung(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Behinderung mit Leistungen zur Teilhabe am Arbeitsleben <span className="text-gray-600 dark:text-gray-500">(+35 %)</span>
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={warmwasserDezentral}
              onChange={e => setWarmwasserDezentral(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Dezentrale Warmwasserbereitung <span className="text-gray-600 dark:text-gray-500">(Boiler/Durchlauferhitzer; § 21 Abs. 7 SGB II, altersgestaffelt)</span>
            </span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Kostenaufwändige Ernährung <span className="font-normal text-gray-500">(§ 21 Abs. 5)</span>
              </label>
              <NummerEingabe value={ernaehrungEuro} onChange={setErnaehrungEuro} placeholder="0" einheit="€/Mo" />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Laut ärztl. Attest, angemessene Höhe.</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                Sonstiger unabweisbarer Bedarf <span className="font-normal text-gray-500">(§ 21 Abs. 6)</span>
              </label>
              <NummerEingabe value={atypischEuro} onChange={setAtypischEuro} placeholder="0" einheit="€/Mo" />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Atypisch, individuell vom Jobcenter geprüft.</p>
            </div>
          </div>
        </div>
      </details>

      {/* Ergebnis */}
      {ergebnis && (
        <div className="space-y-4">
          {/* Hauptergebnis */}
          <div className={`rounded-2xl p-6 text-center ${
            ergebnis.bedarfGedeckt
              ? 'bg-gray-50 dark:bg-gray-800/50'
              : 'bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10'
          }`}>
            {ergebnis.bedarfGedeckt ? (
              <>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Kein {params.bezeichnung}-Anspruch</p>
                <p className="text-2xl font-extrabold text-gray-500 dark:text-gray-400">0,00 €</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Ihr Einkommen deckt den Bedarf vollständig.
                </p>
              </>
            ) : (
              <>
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">
                  Voraussichtlicher {params.bezeichnung}-Anspruch
                </p>
                <p className="text-4xl font-extrabold text-primary-700 dark:text-primary-300">
                  {fmt(ergebnis.gesamtAnspruch)} €
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">pro Monat</p>
              </>
            )}
          </div>

          {/* Vermögensprüfung — H1 (pauschale Karenz) / H2 (altersgestaffelt) */}
          <div className={`rounded-xl p-4 border ${
            ergebnis.vermoegenOk
              ? 'bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30'
              : 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30'
          }`}>
            <div className="flex items-start gap-3">
              <span className="text-lg">{ergebnis.vermoegenOk ? '✅' : '⚠️'}</span>
              <div className="flex-1">
                <p className={`text-sm font-semibold ${
                  ergebnis.vermoegenOk
                    ? 'text-green-700 dark:text-green-400'
                    : 'text-red-700 dark:text-red-400'
                }`}>
                  {ergebnis.vermoegenOk
                    ? 'Vermögen liegt unter dem Freibetrag'
                    : 'Vermögen liegt über dem Freibetrag'}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                  Freibetrag gesamt: <strong>{ergebnis.vermoegensFreibetrag.toLocaleString('de-DE')} €</strong>
                  {' '}({ergebnis.personenImHaushalt} {ergebnis.personenImHaushalt === 1 ? 'Person' : 'Personen'} im Haushalt)
                </p>
                {ergebnis.vermoegenModus === 'karenz_pauschal' && (
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                    In den ersten 12 Monaten (Karenzzeit) gelten erhöhte Freibeträge nach § 12 Abs. 4 SGB II a.F.
                    Nach der Karenzzeit sinken die Freibeträge auf 15.000 € für die erste und 10.000 € für weitere Personen.
                    Ab 01.07.2026 wird diese Regelung durch altersgestaffelte Freibeträge (5.000–20.000 € je Person) ersetzt.
                  </p>
                )}
                {ergebnis.vermoegenModus === 'alter_gestaffelt' && ergebnis.vermoegensAufschluesselung.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                      Altersstaffel nach § 12 Abs. 2 SGB II n.F. (Grundsicherungsgeld-Gesetz):
                    </p>
                    <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-0.5">
                      {ergebnis.vermoegensAufschluesselung.map((p, i) => (
                        <li key={i} className="flex justify-between">
                          <span>{p.label} ({p.alter} J.)</span>
                          <span className="tabular-nums">{p.betrag.toLocaleString('de-DE')} €</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
                      Hinweis: Selbstgenutztes Hausgrundstück oder selbstgenutzte Eigentumswohnung bleiben
                      während der Karenzzeit (erstes Bezugsjahr, § 22 Abs. 1 Satz 2 SGB II) unabhängig
                      von der Größe vom Vermögen ausgenommen (§ 12 Abs. 1 Satz 3 SGB II n.F.).
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Aufschlüsselung */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Aufschlüsselung</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {/* Erwachsene */}
              <div className="px-4 py-2 bg-gray-50/50 dark:bg-gray-700/20">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Regelbedarf Erwachsene</p>
              </div>
              {ergebnis.aufschluesselungErwachsene.map((pos, i) => (
                <div key={`e-${i}`} className="flex justify-between px-4 py-2.5 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{pos.label}</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(pos.betrag)} €</span>
                </div>
              ))}

              {/* Kinder */}
              {ergebnis.aufschluesselungKinder.length > 0 && (
                <>
                  <div className="px-4 py-2 bg-gray-50/50 dark:bg-gray-700/20">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Regelbedarf Kinder</p>
                  </div>
                  {ergebnis.aufschluesselungKinder.map((pos, i) => (
                    <div key={`k-${i}`} className="flex justify-between px-4 py-2.5 text-sm">
                      <span className="text-gray-600 dark:text-gray-400">{pos.label}</span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(pos.betrag)} €</span>
                    </div>
                  ))}
                </>
              )}

              {/* Mehrbedarfe § 21 SGB II */}
              {ergebnis.mehrbedarfe.gesamt > 0 && (
                <>
                  <div className="px-4 py-2 bg-gray-50/50 dark:bg-gray-700/20">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Mehrbedarfe (§ 21 SGB II)</p>
                  </div>
                  {ergebnis.mehrbedarfe.schwangerschaft > 0 && (
                    <div className="flex justify-between px-4 py-2 text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Schwangerschaft (Abs. 2)</span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.mehrbedarfe.schwangerschaft)} €</span>
                    </div>
                  )}
                  {ergebnis.mehrbedarfe.alleinerziehend > 0 && (
                    <div className="flex justify-between px-4 py-2 text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Alleinerziehend (Abs. 3)</span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.mehrbedarfe.alleinerziehend)} €</span>
                    </div>
                  )}
                  {ergebnis.mehrbedarfe.behinderung > 0 && (
                    <div className="flex justify-between px-4 py-2 text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Behinderung + Teilhabe (Abs. 4)</span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.mehrbedarfe.behinderung)} €</span>
                    </div>
                  )}
                  {ergebnis.mehrbedarfe.ernaehrung > 0 && (
                    <div className="flex justify-between px-4 py-2 text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Kostenaufwändige Ernährung (Abs. 5)</span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.mehrbedarfe.ernaehrung)} €</span>
                    </div>
                  )}
                  {ergebnis.mehrbedarfe.atypisch > 0 && (
                    <div className="flex justify-between px-4 py-2 text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Atypischer Bedarf (Abs. 6)</span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.mehrbedarfe.atypisch)} €</span>
                    </div>
                  )}
                  {ergebnis.mehrbedarfe.warmwasser > 0 && (
                    <div className="flex justify-between px-4 py-2 text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Dezentrale Warmwasserbereitung (Abs. 7)</span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.mehrbedarfe.warmwasser)} €</span>
                    </div>
                  )}
                </>
              )}

              {/* Unterkunft */}
              <div className="px-4 py-2 bg-gray-50/50 dark:bg-gray-700/20">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Kosten der Unterkunft</p>
              </div>
              <div className="flex justify-between px-4 py-2.5 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Warmmiete + Heizkosten</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.unterkunftskosten)} €</span>
              </div>

              {/* Zwischensumme */}
              <div className="flex justify-between px-4 py-3 text-sm font-semibold bg-gray-50/80 dark:bg-gray-700/30">
                <span className="text-gray-700 dark:text-gray-200">Gesamtbedarf</span>
                <span className="text-gray-800 dark:text-gray-100">{fmt(ergebnis.regelbedarfGesamt + ergebnis.mehrbedarfe.gesamt + ergebnis.unterkunftskosten)} €</span>
              </div>

              {/* Einkommensanrechnung — Jugendlicher-Pfad (§ 11b Abs. 2b SGB II, Prompt 123-fix) */}
              {jugendlicherStatus !== 'none' && parseDeutscheZahl(einkommen) > 0 && (
                <>
                  <div className="px-4 py-2 bg-gray-50/50 dark:bg-gray-700/20">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Einkommensanrechnung</p>
                  </div>
                  <div className="flex justify-between px-4 py-2.5 text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Monatliches Bruttoeinkommen</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(parseDeutscheZahl(einkommen))} €</span>
                  </div>
                  <div className="flex justify-between px-4 py-2 text-sm">
                    <span className="pl-4 text-xs text-gray-600 dark:text-gray-400">abzgl. Freibetrag § 11b Abs. 2b SGB II</span>
                    <span className="font-medium text-red-600 dark:text-red-400">−{fmt(ergebnis.freibetragEinkommen)} €</span>
                  </div>
                  <div className="flex justify-between px-4 py-2.5 text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Anrechenbares Einkommen</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.anrechenbareEinkommen)} €</span>
                  </div>
                </>
              )}

              {/* Einkommensanrechnung — regulärer Pfad (§ 11b Abs. 1/3 SGB II) */}
              {jugendlicherStatus === 'none' && ergebnis.anrechenbareEinkommen > 0 && (
                <>
                  <div className="px-4 py-2 bg-gray-50/50 dark:bg-gray-700/20">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Einkommensanrechnung</p>
                  </div>
                  <div className="flex justify-between px-4 py-2.5 text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Freibetrag</span>
                    <span className="font-medium text-green-600 dark:text-green-400">{fmt(ergebnis.freibetragEinkommen)} €</span>
                  </div>
                  <div className="flex justify-between px-4 py-2.5 text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Anrechenbares Einkommen</span>
                    <span className="font-medium text-red-600 dark:text-red-400">−{fmt(ergebnis.anrechenbareEinkommen)} €</span>
                  </div>
                </>
              )}

              {/* Endergebnis */}
              <div className="flex justify-between px-4 py-3 text-sm font-bold bg-primary-50/50 dark:bg-primary-500/5">
                <span className="text-gray-800 dark:text-gray-100">{params.bezeichnung}-Anspruch</span>
                <span className="text-primary-600 dark:text-primary-400">{fmt(ergebnis.gesamtAnspruch)} €</span>
              </div>
            </div>
          </div>

          {/* Regelsätze Info — Werte aus Lib abgeleitet (Paket 6, Prompt 123) */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                {params.bezeichnung}-Regelsätze {new Date().getFullYear()}
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {regelsatzInfo.map((zeile) => (
                    <tr key={zeile.label}>
                      <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">{zeile.label}</td>
                      <td className="px-4 py-2.5 text-right font-medium text-gray-800 dark:text-gray-200">{zeile.betrag} €</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4">
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              <strong>Hinweis:</strong> Vereinfachte Schätzung. Maßgeblich ist der Bescheid Ihres Jobcenters.
            </p>
          </div>

          <CrossLink href="/finanzen/wohngeld-rechner" emoji="🏠" text="Alternativ: Wohngeld prüfen" />

          <ErgebnisAktionen
            ergebnisText={ergebnis.bedarfGedeckt ? `Kein ${params.bezeichnung}-Anspruch (Bedarf durch Einkommen gedeckt)` : `${params.bezeichnung}-Anspruch: ${fmt(ergebnis.gesamtAnspruch)} € pro Monat`}
            seitenTitel="Bürgergeld-Rechner"
          />
          <AiExplain
            rechnerName="Bürgergeld-Rechner"
            eingaben={{
              bedarfsgemeinschaft: bg,
              anzahlKinder: kinder.length,
              warmmiete: parseDeutscheZahl(warmmiete),
              heizkosten: parseDeutscheZahl(heizkosten),
              einkommen: parseDeutscheZahl(einkommen),
              vermoegen: parseDeutscheZahl(vermoegen),
            }}
            ergebnis={{
              gesamtAnspruch: ergebnis.gesamtAnspruch,
              regelbedarfGesamt: ergebnis.regelbedarfGesamt,
              unterkunftskosten: ergebnis.unterkunftskosten,
              anrechenbareEinkommen: ergebnis.anrechenbareEinkommen,
              bedarfGedeckt: ergebnis.bedarfGedeckt,
            }}
          />

          <AffiliateBox programId="check24" context="strom" variant="compact" />
        </div>
      )}
    </div>
  );
}
