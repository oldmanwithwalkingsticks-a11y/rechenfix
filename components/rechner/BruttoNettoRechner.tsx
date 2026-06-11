'use client';

import { useState, useMemo } from 'react';
import { berechneBruttoNetto, BUNDESLAENDER } from '@/lib/berechnungen/brutto-netto';
import type { BruttoNettoErgebnis } from '@/lib/berechnungen/brutto-netto';
import { KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT } from '@/lib/berechnungen/sv-parameter';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import AiExplain from '@/components/rechner/AiExplain';
import WasWaereWenn from '@/components/rechner/WasWaereWenn';
import SchnellCheck from '@/components/rechner/SchnellCheck';
import WasserfallSvg from '@/components/rechner/WasserfallSvg';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';

const TABELLEN_WERTE = [1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 6000];

const STATIC_FAQ: { frage: string; antwort: string }[] = [
  {
    frage: 'Wie viel Netto bleibt von meinem Brutto?',
    antwort:
      'Das hängt von Steuerklasse, Bundesland, Kirchensteuerpflicht und Krankenversicherung ab. Als Faustregel: In Steuerklasse 1 bleiben bei 3.500 € brutto rund 60–67 % als Netto übrig (ca. 2.300 €). Bei höheren Gehältern sinkt der Netto-Anteil durch die progressive Lohnsteuer. Bei niedrigen Einkommen kann er bei knapp 75 % liegen.',
  },
  {
    frage: 'Welche Steuerklasse habe ich?',
    antwort:
      'Ledige ohne Kinder sind in Steuerklasse 1. Alleinerziehende mit mindestens einem Kind kommen in Klasse 2 (mit Entlastungsbetrag). Verheiratete starten standardmäßig in 4/4 — können aber zu 3/5 oder zum Faktorverfahren wechseln. Steuerklasse 6 gilt für Zweit- und Nebenjobs. Welche Klasse für Sie eingetragen ist, sehen Sie auf Ihrer monatlichen Lohnabrechnung oben rechts.',
  },
  {
    frage: 'Was zählt zu den Sozialabgaben?',
    antwort:
      'Vier Pflichtbeiträge: Krankenversicherung (paritätisch 7,3 % plus halber Zusatzbeitrag), Rentenversicherung (paritätisch 9,3 %), Arbeitslosenversicherung (paritätisch 1,3 %) und Pflegeversicherung (paritätisch 1,8 %, plus 0,6 % Kinderlosenzuschlag, den nur Sie tragen). Arbeitgeber und Arbeitnehmer teilen sich die Beiträge — Ihr Arbeitnehmer-Anteil liegt 2026 bei rund 21 % vom Brutto.',
  },
  {
    frage: 'Was ist die Beitragsbemessungsgrenze?',
    antwort:
      'Die BBG ist die Einkommensgrenze, bis zu der Sozialabgaben berechnet werden. 2026: Kranken- und Pflegeversicherung 5.812,50 €/Monat (69.750 €/Jahr), Renten- und Arbeitslosenversicherung einheitlich 8.450 €/Monat (101.400 €/Jahr). Einkommen oberhalb der Grenze bleibt sozialabgabenfrei. Seit 2025 gilt die BBG bundesweit einheitlich — die frühere Trennung West/Ost wurde aufgehoben.',
  },
  {
    frage: 'Was ist der Solidaritätszuschlag?',
    antwort:
      'Der Soli beträgt 5,5 % der Lohnsteuer. Seit 2021 fällt er für rund 90 % der Steuerzahler weg. Erst ab einer Jahres-Lohnsteuer von 20.350 € (Single 2026) bzw. 40.700 € (gemeinsam) wird er wieder fällig — das entspricht etwa 73.500 € Jahresbrutto in Steuerklasse 1. Auf Kapitalerträge fällt der Soli unverändert weiter an, wenn Kapitalertragsteuer einbehalten wird.',
  },
  {
    frage: 'Warum unterscheidet sich mein Netto je nach Bundesland?',
    antwort:
      'Es gibt einen Hauptgrund: Der Kirchensteuersatz beträgt in Bayern und Baden-Württemberg 8 %, in allen anderen Bundesländern 9 % — das wirkt sich nur bei Kirchenmitgliedschaft aus. Frühere Unterschiede bei der Beitragsbemessungsgrenze West/Ost wurden seit 2025 abgeschafft, die BBG gilt nun bundesweit einheitlich. Auch der Krankenkassen-Zusatzbeitrag variiert je nach Kasse zwischen etwa 1,5 % und über 3 %.',
  },
  {
    frage: 'Lohnt sich die Steuerklassenkombination 3/5?',
    antwort:
      'Bei großem Einkommensunterschied bringt 3/5 dem Hauptverdiener monatlich mehr Netto, weil der Partner in Klasse 3 fast keine Lohnsteuer zahlt. Steuerklasse 5 ist bewusst hoch besteuert — zusammen ergibt sich aber etwa dieselbe Steuersumme wie bei 4/4. Achtung: Die endgültige Steuerlast wird in der gemeinsamen Veranlagung am Jahresende abgerechnet, die Steuererklärung ist bei 3/5 Pflicht und kann zu Nachzahlungen führen. Bei ähnlichem Einkommen ist 4/4 monatlich neutral und einfacher.',
  },
  {
    frage: 'Wie viel von einer Gehaltserhöhung bleibt netto übrig?',
    antwort:
      'Bei mittleren Einkommen kommen rund 50–60 % der Brutto-Erhöhung als Netto an. Bei höheren Einkommen sinkt das durch die progressive Lohnsteuer auf 45–55 %. Konkret: Aus 200 € Brutto-Erhöhung werden meist 100–115 € Netto.',
  },
  {
    frage: 'Welche Freibeträge berücksichtigt der Rechner?',
    antwort:
      'Der Rechner rechnet automatisch mit dem Grundfreibetrag (2026: 12.348 € Single, 24.696 € verheiratet), dem Kinderfreibetrag bei eingetragenen Kindern und dem Entlastungsbetrag für Alleinerziehende. Individuelle Freibeträge auf der Lohnsteuerkarte — etwa für hohe Werbungskosten, die Pendlerpauschale oder außergewöhnliche Belastungen — müssen Sie separat eintragen, falls sie für Sie zutreffen.',
  },
  {
    frage: 'Wie wirken sich Kinderfreibeträge konkret auf mein Netto aus?',
    antwort:
      'Kinderfreibeträge senken die monatlichen Abzüge bei der Pflegeversicherung — der 0,6-%-Kinderlosenzuschlag entfällt, ab dem zweiten Kind wird der AN-Anteil zusätzlich um 0,25 Prozentpunkte je Kind reduziert (bis maximal 5 Kinder). Steuerlich nimmt das Finanzamt eine Günstigerprüfung vor: Es prüft automatisch, ob Kindergeld oder der Kinderfreibetrag (2026: 6.826 € pro Kind) günstiger für Sie ist und gewährt das Bessere.',
  },
  {
    frage: 'Lohnt sich der Kirchenaustritt finanziell?',
    antwort:
      'Bei 3.000 € Brutto sparen Sie je nach Bundesland 25–35 € monatlich, bei 5.000 € sind es 60–80 €. Über 30 Jahre Berufsleben kommen schnell 15.000 € oder mehr zusammen. Der Austritt erfolgt beim Standesamt oder Amtsgericht, kostet einmalig 25–60 € Verwaltungsgebühr und wirkt ab dem Folgemonat.',
  },
  {
    frage: 'Wie berechne ich mein Netto pro Stunde?',
    antwort:
      'Teilen Sie Ihr monatliches Nettogehalt durch Ihre durchschnittlichen Arbeitsstunden pro Monat. Bei einer 40-Stunden-Woche sind das ca. 174 Stunden (40 × 52 Wochen ÷ 12 Monate). Beispiel: 2.340 € netto ÷ 174 = 13,45 € netto/Stunde. Unser Rechner zeigt diesen Wert automatisch im Ergebnis-Bereich an.',
  },
];

function berechneSchnell(brutto: number, sk: 1 | 3 | 5): BruttoNettoErgebnis {
  return berechneBruttoNetto({
    bruttoMonat: brutto,
    steuerklasse: sk,
    kirchensteuer: false,
    kirchensteuersatz: 9,
    kinderfreibetraege: 0,
    bundesland: 'NW',
    kvArt: 'gesetzlich',
    kvZusatzbeitrag: KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT,
    kvPrivatBeitrag: 0,
    rvBefreit: false,
    abrechnungszeitraum: 'monat',
  });
}

export default function BruttoNettoRechner() {
  const [brutto, setBrutto] = useState('3500');
  const [steuerklasse, setSteuerklasse] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [kirchensteuer, setKirchensteuer] = useState(false);
  const [kinder, setKinder] = useState(0);
  // Anzahl berücksichtigungsfähiger Kinder unter 25 (für PV nach § 55 Abs. 3 SGB XI).
  // Default 1 = Elterneigenschaft ohne Abschlag (gängigster Fall mit Kindern);
  // bei 0 greift Kinderloszuschlag (sofern Alter > 23).
  const [kinderUnter25, setKinderUnter25] = useState(0);
  const [bundesland, setBundesland] = useState('NW');
  const [kvArt, setKvArt] = useState<'gesetzlich' | 'privat'>('gesetzlich');
  const [kvZusatzbeitrag, setKvZusatzbeitrag] = useState('2.9');
  const [kvPrivatBeitrag, setKvPrivatBeitrag] = useState('');
  const [rvBefreit, setRvBefreit] = useState(false);
  const [abrechnungszeitraum, setAbrechnungszeitraum] = useState<'monat' | 'jahr'>('monat');
  const [kopiert, setKopiert] = useState(false);
  const [kopierFehler, setKopierFehler] = useState(false);
  const [weihnachtsgeldAktiv, setWeihnachtsgeldAktiv] = useState(false);
  const [weihnachtsgeldHoehe, setWeihnachtsgeldHoehe] = useState<'100' | '50' | 'eigen'>('100');
  const [weihnachtsgeldBetrag, setWeihnachtsgeldBetrag] = useState('');


  const bruttoNum = parseDeutscheZahl(brutto);
  const bl = BUNDESLAENDER.find(b => b.kuerzel === bundesland);
  const kstSatz = bl?.kirchensteuersatz ?? 9;

  const kvZusatzbeitragNum = parseDeutscheZahl(kvZusatzbeitrag);
  const kvPrivatBeitragNum = parseDeutscheZahl(kvPrivatBeitrag);
  const weihnachtsgeldBetragNum = parseDeutscheZahl(weihnachtsgeldBetrag);

  const weihnachtsgeldWert = useMemo(() => {
    if (!weihnachtsgeldAktiv) return 0;
    const monatsBrutto = abrechnungszeitraum === 'jahr' ? bruttoNum / 12 : bruttoNum;
    if (weihnachtsgeldHoehe === '100') return monatsBrutto;
    if (weihnachtsgeldHoehe === '50') return Math.round(monatsBrutto * 50) / 100;
    return weihnachtsgeldBetragNum;
  }, [weihnachtsgeldAktiv, weihnachtsgeldHoehe, weihnachtsgeldBetragNum, bruttoNum, abrechnungszeitraum]);

  const ergebnis = useMemo(() => berechneBruttoNetto({
    bruttoMonat: bruttoNum, steuerklasse, kirchensteuer, kirchensteuersatz: kstSatz,
    kinderfreibetraege: kinder, kinderUnter25, bundesland, kvArt, kvZusatzbeitrag: kvZusatzbeitragNum,
    kvPrivatBeitrag: kvPrivatBeitragNum, rvBefreit, abrechnungszeitraum,
    weihnachtsgeld: weihnachtsgeldWert > 0 ? weihnachtsgeldWert : undefined,
  }), [bruttoNum, steuerklasse, kirchensteuer, kstSatz, kinder, kinderUnter25, bundesland, kvArt, kvZusatzbeitragNum, kvPrivatBeitragNum, rvBefreit, abrechnungszeitraum, weihnachtsgeldWert]);

  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const pct = (n: number, base: number) => base > 0 ? ((n / base) * 100).toFixed(1) : '0.0';

  const skLabel = (sk: number) => {
    const labels: Record<number, string> = { 1: 'SK1', 2: 'SK2', 3: 'SK3', 4: 'SK4', 5: 'SK5', 6: 'SK6' };
    return labels[sk] || `SK${sk}`;
  };

  async function handleCopy() {
    const blName = bl?.name || bundesland;
    let text = `Brutto: ${fmt(ergebnis.bruttoMonat)} € → Netto: ${fmt(ergebnis.nettoMonat)} € (${skLabel(steuerklasse)}, ${blName}, 2026)`;
    if (ergebnis.weihnachtsgeld) {
      text += ` | Weihnachtsgeld: ${fmt(ergebnis.weihnachtsgeld.brutto)} € brutto → ${fmt(ergebnis.weihnachtsgeld.netto)} € netto`;
    }
    try {
      await navigator.clipboard.writeText(text);
      setKopierFehler(false);
      setKopiert(true);
      setTimeout(() => setKopiert(false), 2000);
    } catch {
      setKopiert(false);
      setKopierFehler(true);
      setTimeout(() => setKopierFehler(false), 3000);
    }
  }

  function handlePrint() {
    window.print();
  }

  function handleShare() {
    const blName = bl?.name || bundesland;
    const text = `Mein Nettogehalt bei ${fmt(ergebnis.bruttoMonat)} € brutto: ${fmt(ergebnis.nettoMonat)} € (${skLabel(steuerklasse)}, ${blName}) — berechnet auf rechenfix.de/finanzen/brutto-netto-rechner`;
    if (navigator.share) {
      navigator.share({ title: 'Brutto-Netto-Berechnung', text });
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    }
  }

  return (
    <div>
      {/* Abrechnungszeitraum */}
      <div className="mb-6 no-print">
        <RadioToggleGroup
          name="bruttonetto-zeitraum"
          legend="Abrechnungszeitraum"
          srOnlyLegend
          options={[
            { value: 'monat', label: 'Monatsgehalt' },
            { value: 'jahr', label: 'Jahresgehalt' },
          ]}
          value={abrechnungszeitraum}
          onChange={(v) => setAbrechnungszeitraum(v as 'monat' | 'jahr')}
        />
      </div>

      {/* Eingaben */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 no-print">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Bruttogehalt ({abrechnungszeitraum === 'monat' ? 'monatlich' : 'jährlich'})
          </label>
          <NummerEingabe value={brutto} onChange={setBrutto} placeholder={abrechnungszeitraum === 'monat' ? 'z.B. 3500' : 'z.B. 42000'} einheit="€" />
        </div>
        <div>
          <label htmlFor="bruttonetto-select-1" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Steuerklasse</label>
          <select id="bruttonetto-select-1" value={steuerklasse} onChange={e => setSteuerklasse(Number(e.target.value) as 1|2|3|4|5|6)} className="input-field">
            <option value={1}>Steuerklasse 1 — Ledig</option>
            <option value={2}>Steuerklasse 2 — Alleinerziehend</option>
            <option value={3}>Steuerklasse 3 — Verheiratet (mehr)</option>
            <option value={4}>Steuerklasse 4 — Verheiratet (gleich)</option>
            <option value={5}>Steuerklasse 5 — Verheiratet (weniger)</option>
            <option value={6}>Steuerklasse 6 — Zweitjob</option>
          </select>
        </div>
        <div>
          <label htmlFor="bruttonetto-select-2" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bundesland</label>
          <select id="bruttonetto-select-2" value={bundesland} onChange={e => setBundesland(e.target.value)} className="input-field">
            {BUNDESLAENDER.map(bl => (
              <option key={bl.kuerzel} value={bl.kuerzel}>{bl.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="bruttonetto-select-3" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kinder (Freibeträge)</label>
          <select id="bruttonetto-select-3" value={kinder} onChange={e => setKinder(Number(e.target.value))} className="input-field">
            <option value={0}>Keine Kinder</option>
            <option value={0.5}>0,5</option>
            <option value={1}>1</option>
            <option value={1.5}>1,5</option>
            <option value={2}>2</option>
            <option value={2.5}>2,5</option>
            <option value={3}>3+</option>
          </select>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Steuerliche Kinderfreibeträge (für Soli &amp; KiSt-Ermäßigung).</p>
        </div>
        <div>
          <label htmlFor="bruttonetto-select-4" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kinder unter 25 Jahren</label>
          <select id="bruttonetto-select-4" value={kinderUnter25} onChange={e => setKinderUnter25(Number(e.target.value))} className="input-field">
            <option value={0}>0 (kinderlos)</option>
            <option value={1}>1 Kind</option>
            <option value={2}>2 Kinder</option>
            <option value={3}>3 Kinder</option>
            <option value={4}>4 Kinder</option>
            <option value={5}>5 Kinder</option>
            <option value={6}>6+ Kinder</option>
          </select>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Für den PV-Beitrag nach § 55 Abs. 3 SGB XI. Bei 0 und Alter &gt; 23 fällt der Kinderloszuschlag an; ab dem 2. Kind ermäßigt sich der AN-Anteil um 0,25 pp je Kind (bis 5.).
          </p>
        </div>
      </div>

      {/* Erweiterte Optionen */}
      <details className="mb-6 group no-print">
        <summary className="cursor-pointer text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-600 transition-colors list-none flex items-center gap-2">
          <svg className="w-4 h-4 group-open:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          Erweiterte Optionen (KV, RV, Kirchensteuer, Weihnachtsgeld)
        </summary>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kirchensteuer</label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={kirchensteuer} onChange={e => setKirchensteuer(e.target.checked)} className="w-5 h-5 rounded text-primary-600 focus:ring-primary-200" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Ja ({kstSatz}% in {bl?.name})</span>
            </label>
          </div>
          <div>
            <RadioToggleGroup
              name="bruttonetto-kv"
              legend="Krankenversicherung"
              options={[
                { value: 'gesetzlich', label: 'Gesetzlich' },
                { value: 'privat', label: 'Privat' },
              ]}
              value={kvArt}
              onChange={(v) => setKvArt(v as 'gesetzlich' | 'privat')}
              activeColor="accent"
              fullWidth
            />
          </div>
          {kvArt === 'gesetzlich' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">KV-Zusatzbeitrag (AN-Anteil)</label>
              <NummerEingabe value={kvZusatzbeitrag} onChange={setKvZusatzbeitrag} placeholder="z.B. 2,9" einheit="%" />
              <p className="text-xs text-gray-600 mt-1">Durchschnitt 2026: 1,45% (halber Zusatzbeitrag von 2,9%)</p>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">PKV-Beitrag (AN-Anteil)</label>
              <NummerEingabe value={kvPrivatBeitrag} onChange={setKvPrivatBeitrag} placeholder="z.B. 350" einheit="€" />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rentenversicherung</label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={rvBefreit} onChange={e => setRvBefreit(e.target.checked)} className="w-5 h-5 rounded text-primary-600 focus:ring-primary-200" />
              <span className="text-sm text-gray-700 dark:text-gray-300">RV-befreit (z. B. Beamte)</span>
            </label>
          </div>
          <div className="sm:col-span-2 border-t border-gray-200 dark:border-gray-600 pt-4 mt-2">
            <div className="mb-3">
              <RadioToggleGroup
                name="bruttonetto-weihnachtsgeld"
                legend="Weihnachtsgeld"
                options={[
                  { value: 'nein', label: 'Nein' },
                  { value: 'ja', label: 'Ja' },
                ]}
                value={weihnachtsgeldAktiv ? 'ja' : 'nein'}
                onChange={(v) => setWeihnachtsgeldAktiv(v === 'ja')}
                activeColor="accent"
              />
            </div>
            {weihnachtsgeldAktiv && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="bruttonetto-select-4" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Höhe</label>
                  <select id="bruttonetto-select-4"
                    value={weihnachtsgeldHoehe}
                    onChange={e => setWeihnachtsgeldHoehe(e.target.value as '100' | '50' | 'eigen')}
                    className="input-field"
                  >
                    <option value="100">Volles 13. Gehalt (100%)</option>
                    <option value="50">Halbes (50%)</option>
                    <option value="eigen">Eigener Betrag</option>
                  </select>
                </div>
                {weihnachtsgeldHoehe === 'eigen' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Betrag (brutto)</label>
                    <NummerEingabe value={weihnachtsgeldBetrag} onChange={setWeihnachtsgeldBetrag} placeholder="z.B. 2000" einheit="€" />
                  </div>
                )}
                {weihnachtsgeldHoehe !== 'eigen' && weihnachtsgeldWert > 0 && (
                  <div className="flex items-end">
                    <p className="text-sm text-gray-500 dark:text-gray-400 pb-2">
                      = {fmt(weihnachtsgeldWert)} € brutto
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </details>

      {/* KI-Schnellcheck Tipps */}
      {bruttoNum > 0 && (
        <SchnellCheck
          brutto={bruttoNum}
          steuerklasse={steuerklasse}
          kirchensteuer={kirchensteuer}
          kirchensteuersatz={kstSatz}
          kinder={kinder}
          kirchensteuerBetrag={ergebnis.kirchensteuer}
        />
      )}

      {/* Ergebnis */}
      {bruttoNum > 0 && (
        <>
          <div className="result-box mb-4" id="brutto-netto-ergebnis">
            <p className="text-white/80 text-sm mb-1">Dein Nettogehalt (monatlich)</p>
            <p className="text-4xl font-bold">{fmt(ergebnis.nettoMonat)} &euro;</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-white/70 text-sm mt-2">
              <span>{fmt(ergebnis.nettoJahr)} € / Jahr</span>
              <span>|</span>
              <span>~{fmt(ergebnis.nettoProStunde)} € / Stunde</span>
              <span>|</span>
              <span>{ergebnis.abzuegeProzent}% Abzüge</span>
            </div>
          </div>

          {/* Action-Buttons */}
          <div className="flex flex-wrap gap-3 mb-4 no-print">
            <button onClick={handleCopy} className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-600 font-medium transition-colors">
              {kopiert ? '✓ Kopiert' : kopierFehler ? 'Fehler — bitte manuell kopieren' : 'Ergebnis kopieren'}
            </button>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <button onClick={handleShare} className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-600 font-medium transition-colors">
              Ergebnis teilen
            </button>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <button onClick={handlePrint} className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-600 font-medium transition-colors">
              Als PDF drucken
            </button>
          </div>

          {/* Prozentbalken */}
          <div className="mb-6">
            <div className="flex rounded-xl overflow-hidden h-8 text-xs font-medium">
              <div className="bg-green-800 flex items-center justify-center text-white transition-all" style={{ width: `${100 - ergebnis.abzuegeProzent}%` }}>
                {(100 - ergebnis.abzuegeProzent).toFixed(1)}% Netto
              </div>
              <div className="bg-red-700 flex items-center justify-center text-white transition-all" style={{ width: `${ergebnis.bruttoMonat > 0 ? (ergebnis.steuernGesamt / ergebnis.bruttoMonat * 100) : 0}%` }}>
                Steuern
              </div>
              <div className="bg-amber-600 flex items-center justify-center text-gray-900 transition-all" style={{ width: `${ergebnis.bruttoMonat > 0 ? (ergebnis.sozialabgabenGesamt / ergebnis.bruttoMonat * 100) : 0}%` }}>
                Sozial
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-green-600 inline-block" /> Netto</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-red-600 inline-block" /> Steuern</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-amber-600 inline-block" /> Sozialabgaben</span>
            </div>
          </div>

          {/* Wasserfall: Brutto → Abzüge → Netto (visuelle Ergänzung zur Aufschlüsselung) */}
          <div className="card p-5 md:p-6 mb-4">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">
              Vom Brutto zum Netto
            </h2>
            <WasserfallSvg
              einheit="€"
              steps={[
                { label: 'Brutto', wert: ergebnis.bruttoMonat, art: 'start' },
                { label: 'Steuern', wert: -(ergebnis.lohnsteuer + ergebnis.solidaritaet + ergebnis.kirchensteuer), art: 'delta' },
                { label: 'Sozialabg.', wert: -ergebnis.sozialabgabenGesamt, art: 'delta' },
                { label: 'Netto', wert: ergebnis.nettoMonat, art: 'summe' },
              ]}
            />
          </div>

          {/* Aufschlüsselung */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5" id="brutto-netto-tabelle">
            <h2 className="font-bold text-gray-700 dark:text-gray-200 mb-3">Aufschlüsselung (monatlich)</h2>
            <table className="w-full text-sm">
              <tbody>
                <Zeile label="Bruttogehalt" wert={ergebnis.bruttoMonat} hervorgehoben />
                <tr><td colSpan={3} className="pt-3 pb-1 text-xs font-semibold text-gray-600 dark:text-gray-500 uppercase tracking-wider">Steuern</td></tr>
                <Zeile label="Lohnsteuer" wert={-ergebnis.lohnsteuer} brutto={ergebnis.bruttoMonat} />
                <Zeile label="Solidaritätszuschlag" wert={-ergebnis.solidaritaet} brutto={ergebnis.bruttoMonat} />
                {kirchensteuer && <Zeile label={`Kirchensteuer (${kstSatz}%)`} wert={-ergebnis.kirchensteuer} brutto={ergebnis.bruttoMonat} />}
                <tr><td colSpan={3} className="pt-3 pb-1 text-xs font-semibold text-gray-600 dark:text-gray-500 uppercase tracking-wider">Sozialabgaben</td></tr>
                <Zeile label={kvArt === 'privat' ? 'Private KV (AN-Anteil)' : 'Krankenversicherung'} wert={-ergebnis.krankenversicherung} brutto={ergebnis.bruttoMonat} />
                <Zeile label="Rentenversicherung" wert={-ergebnis.rentenversicherung} brutto={ergebnis.bruttoMonat} />
                <Zeile label="Arbeitslosenversicherung" wert={-ergebnis.arbeitslosenversicherung} brutto={ergebnis.bruttoMonat} />
                <Zeile label="Pflegeversicherung" wert={-ergebnis.pflegeversicherung} brutto={ergebnis.bruttoMonat} />
                <tr className="border-t-2 border-primary-200 dark:border-primary-500/40 font-bold text-primary-700 dark:text-primary-300">
                  <td className="py-2">Nettogehalt</td>
                  <td className="py-2 text-right">{fmt(ergebnis.nettoMonat)} &euro;</td>
                  <td className="py-2 text-right text-xs">{pct(ergebnis.nettoMonat, ergebnis.bruttoMonat)}%</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Weihnachtsgeld-Ergebnis */}
          {ergebnis.weihnachtsgeld && (() => {
            const wg = ergebnis.weihnachtsgeld!;
            const wgAbzuegePct = wg.brutto > 0 ? Math.round((wg.abzuege / wg.brutto) * 1000) / 10 : 0;
            const wgSteuern = wg.lohnsteuer + wg.solidaritaet + wg.kirchensteuer;
            const effektiverSteuersatz = wg.brutto > 0 ? Math.round((wgSteuern / wg.brutto) * 1000) / 10 : 0;
            const regelSteuersatz = ergebnis.bruttoMonat > 0 ? Math.round((ergebnis.steuernGesamt / ergebnis.bruttoMonat) * 1000) / 10 : 0;
            const jahresBruttoMitWg = ergebnis.bruttoJahr + wg.brutto;
            const jahresNettoMitWg = ergebnis.nettoJahr + wg.netto;

            return (
              <>
                {/* Sonderzahlung Zusammenfassung */}
                <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-5 mt-4">
                  <h2 className="font-bold text-amber-800 dark:text-amber-300 mb-4 flex items-center gap-2">
                    <span>🎄</span> Sonderzahlung Weihnachtsgeld
                  </h2>

                  {/* Übersichtskarten */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    <div className="bg-white dark:bg-gray-800/60 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Brutto</p>
                      <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{fmt(wg.brutto)} €</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800/60 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Abzüge</p>
                      <p className="text-lg font-bold text-red-600 dark:text-red-400">{fmt(wg.abzuege)} €</p>
                      <p className="text-xs text-gray-600">{wgAbzuegePct}%</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800/60 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Netto</p>
                      <p className="text-lg font-bold text-green-600 dark:text-green-400">{fmt(wg.netto)} €</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800/60 rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Eff. Steuersatz</p>
                      <p className="text-lg font-bold text-amber-700 dark:text-amber-300">{effektiverSteuersatz}%</p>
                    </div>
                  </div>

                  {/* Hinweis Progression */}
                  {effektiverSteuersatz > regelSteuersatz && (
                    <div className="bg-amber-100 dark:bg-amber-500/20 rounded-lg px-4 py-2.5 mb-4 text-sm text-amber-800 dark:text-amber-200">
                      <strong>Hinweis:</strong> Der effektive Steuersatz auf das Weihnachtsgeld ({effektiverSteuersatz}%) ist höher als auf Ihr reguläres Gehalt ({regelSteuersatz}%). Das liegt an der Steuerprogression — die Sonderzahlung wird zum Jahresgehalt addiert und fällt damit in eine höhere Steuerzone.
                    </div>
                  )}

                  {/* Detaillierte Aufschlüsselung */}
                  <table className="w-full text-sm">
                    <tbody>
                      <Zeile label="Weihnachtsgeld (brutto)" wert={wg.brutto} hervorgehoben />
                      <tr><td colSpan={3} className="pt-3 pb-1 text-xs font-semibold text-gray-600 dark:text-gray-500 uppercase tracking-wider">Steuern</td></tr>
                      <Zeile label="Lohnsteuer" wert={-wg.lohnsteuer} brutto={wg.brutto} />
                      <Zeile label="Solidaritätszuschlag" wert={-wg.solidaritaet} brutto={wg.brutto} />
                      {wg.kirchensteuer > 0 && <Zeile label={`Kirchensteuer (${kstSatz}%)`} wert={-wg.kirchensteuer} brutto={wg.brutto} />}
                      <tr><td colSpan={3} className="pt-3 pb-1 text-xs font-semibold text-gray-600 dark:text-gray-500 uppercase tracking-wider">Sozialabgaben</td></tr>
                      <Zeile label="Krankenversicherung" wert={-wg.krankenversicherung} brutto={wg.brutto} />
                      <Zeile label="Rentenversicherung" wert={-wg.rentenversicherung} brutto={wg.brutto} />
                      <Zeile label="Arbeitslosenversicherung" wert={-wg.arbeitslosenversicherung} brutto={wg.brutto} />
                      <Zeile label="Pflegeversicherung" wert={-wg.pflegeversicherung} brutto={wg.brutto} />
                      <tr className="border-t-2 border-amber-300 dark:border-amber-500/40 font-bold text-amber-800 dark:text-amber-300">
                        <td className="py-2">Weihnachtsgeld (netto)</td>
                        <td className="py-2 text-right">{fmt(wg.netto)} &euro;</td>
                        <td className="py-2 text-right text-xs">{pct(wg.netto, wg.brutto)}%</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="text-xs text-amber-600 dark:text-amber-400/70 mt-3">
                    Berechnung nach der Jahreslohnsteuer-Differenzmethode: Jahressteuer mit Weihnachtsgeld minus Jahressteuer ohne Weihnachtsgeld.
                  </p>
                </div>

                {/* Jahresübersicht inkl. Weihnachtsgeld */}
                <div className="bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/30 rounded-xl p-5 mt-4">
                  <h2 className="font-bold text-primary-800 dark:text-primary-300 mb-3">Jahresübersicht inkl. Weihnachtsgeld</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Jahresbrutto inkl. Weihnachtsgeld</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{fmt(jahresBruttoMitWg)} €</p>
                      <p className="text-xs text-gray-600 mt-1">{fmt(ergebnis.bruttoJahr)} € Gehalt + {fmt(wg.brutto)} € Weihnachtsgeld</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Jahresnetto inkl. Weihnachtsgeld</p>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">{fmt(jahresNettoMitWg)} €</p>
                      <p className="text-xs text-gray-600 mt-1">{fmt(ergebnis.nettoJahr)} € Gehalt + {fmt(wg.netto)} € Weihnachtsgeld</p>
                    </div>
                  </div>
                </div>
              </>
            );
          })()}

          <p className="text-xs text-gray-600 dark:text-gray-500 mt-4 no-print">
            * Vereinfachte Berechnung zur Orientierung. Für eine exakte Berechnung wenden Sie sich an Ihren Steuerberater oder nutzen Sie ELSTER.
          </p>

          <CrossLink href="/finanzen/steuererstattung-rechner" emoji="💰" text="Wie viel bekommen Sie vom Finanzamt zurück?" />
          <CrossLink href="/finanzen/gehaltsvergleich" emoji="📊" text="Verdienen Sie genug? Gehalt vergleichen" />

          {/* KI-Buttons (W13.1.2 — Hebel A) — in Calculator-Card hochgezogen,
              Pattern-Konsistenz mit MwSt-Rechner. Above-the-fold-USP-Sichtbarkeit. */}
          <div className="mt-4 no-print flex flex-wrap gap-3">
            <AiExplain
              rechnerName="Brutto-Netto-Rechner"
              eingaben={{
                bruttogehalt: bruttoNum,
                steuerklasse,
                bundesland: bl?.name ?? bundesland,
                kirchensteuer,
                kinder,
                kvArt,
                kvZusatzbeitrag: kvZusatzbeitragNum,
              }}
              ergebnis={{
                nettogehalt: ergebnis.nettoMonat,
                lohnsteuer: ergebnis.lohnsteuer,
                solidaritaetszuschlag: ergebnis.solidaritaet,
                kirchensteuerBetrag: ergebnis.kirchensteuer,
                krankenversicherung: ergebnis.krankenversicherung,
                rentenversicherung: ergebnis.rentenversicherung,
                arbeitslosenversicherung: ergebnis.arbeitslosenversicherung,
                pflegeversicherung: ergebnis.pflegeversicherung,
                gesamtabzuegeProzent: ergebnis.abzuegeProzent,
              }}
            />
            <WasWaereWenn
              eingaben={{
                bruttogehalt: bruttoNum,
                steuerklasse,
                bundesland: bl?.name ?? bundesland,
                kirchensteuer,
                kinder,
                kvArt,
                kvZusatzbeitrag: kvZusatzbeitragNum,
              }}
              ergebnis={{
                nettogehalt: ergebnis.nettoMonat,
                lohnsteuer: ergebnis.lohnsteuer,
                solidaritaetszuschlag: ergebnis.solidaritaet,
                kirchensteuerBetrag: ergebnis.kirchensteuer,
                krankenversicherung: ergebnis.krankenversicherung,
                rentenversicherung: ergebnis.rentenversicherung,
                arbeitslosenversicherung: ergebnis.arbeitslosenversicherung,
                pflegeversicherung: ergebnis.pflegeversicherung,
                gesamtabzuegeProzent: ergebnis.abzuegeProzent,
              }}
            />
          </div>

          {/* Konsolidierter Erklär-Block (W13.1.1) — server-rendered für AdSense-Quality
              5 h2-Sections: So funktioniert / Anwendungsfälle / Häufige Fehler / Tipps / FAQ */}

          {/* Section 4: So funktioniert die Brutto-Netto-Berechnung */}
          <section className="mt-8 no-print">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">So funktioniert die Brutto-Netto-Berechnung</h2>
            <div className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed space-y-4">
              <p>
                Brutto ist Ihr vereinbartes Gehalt — Netto das, was nach Abzügen tatsächlich auf Ihrem Konto landet. Vier Posten werden vom Brutto abgezogen:
              </p>
              <ol className="list-decimal pl-5 space-y-1.5">
                <li><strong className="text-gray-800 dark:text-gray-100">Lohnsteuer</strong> — abhängig von Steuerklasse, Bundesland und Freibeträgen</li>
                <li><strong className="text-gray-800 dark:text-gray-100">Solidaritätszuschlag</strong> — nur bei höheren Einkommen (2026: ab ca. 73.500 € Jahresbrutto Single)</li>
                <li><strong className="text-gray-800 dark:text-gray-100">Kirchensteuer</strong> — 8 % (Bayern, Baden-Württemberg) bzw. 9 % (übrige Bundesländer) auf die Lohnsteuer, nur bei Kirchenzugehörigkeit</li>
                <li><strong className="text-gray-800 dark:text-gray-100">Sozialabgaben</strong> — Kranken-, Pflege-, Renten- und Arbeitslosenversicherung, in Summe rund 21 % vom Brutto (Arbeitnehmer-Anteil)</li>
              </ol>
              <p>
                <strong className="text-gray-800 dark:text-gray-100">Formel:</strong> Netto = Brutto − Lohnsteuer − Soli − Kirchensteuer − Sozialabgaben
              </p>
              <p>
                <strong className="text-gray-800 dark:text-gray-100">Beispiel:</strong> Bei 4.000 € Brutto in Steuerklasse 1 (ledig, kinderlos, NRW, ohne Kirchensteuer) bleiben rund <strong className="text-gray-800 dark:text-gray-100">2.598 € Netto</strong> übrig — also etwa 65 % des Brutto. Die Quote sinkt mit höherem Einkommen, weil die Lohnsteuer progressiv steigt, und kann bei niedrigen Gehältern bei knapp 75 % liegen.
              </p>

              <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 mt-6 mb-3">Alle Abzüge im Detail (2026)</h3>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong className="text-gray-800 dark:text-gray-100">Lohnsteuer:</strong> Progressive Besteuerung nach dem Einkommensteuertarif § 32a EStG. Grundfreibetrag 2026: 12.348 €. Der Eingangssteuersatz beträgt 14 %, der Spitzensteuersatz 42 % (ab 69.879 €) und der Reichensteuersatz 45 % (ab 277.826 €).</li>
                <li><strong className="text-gray-800 dark:text-gray-100">Solidaritätszuschlag:</strong> 5,5 % der Lohnsteuer. Seit 2021 für ca. 90 % der Steuerzahler abgeschafft (Freigrenze 2026: 20.350 € Jahressteuer).</li>
                <li><strong className="text-gray-800 dark:text-gray-100">Kirchensteuer:</strong> 8 % der Lohnsteuer in Baden-Württemberg und Bayern, 9 % in allen anderen Bundesländern. Nur bei Kirchenmitgliedschaft.</li>
                <li><strong className="text-gray-800 dark:text-gray-100">Krankenversicherung (GKV):</strong> Allgemeiner Beitragssatz 14,6 % (Arbeitnehmeranteil: 7,3 %) + kassenindividueller Zusatzbeitrag (Durchschnitt 2026: 2,9 %, AN-Anteil: 1,45 %). Beitragsbemessungsgrenze: 5.812,50 €/Monat.</li>
                <li><strong className="text-gray-800 dark:text-gray-100">Rentenversicherung:</strong> 18,6 % (Arbeitnehmeranteil: 9,3 %). BBG 2026 einheitlich: 8.450 €/Monat (seit 2025 keine West/Ost-Trennung mehr).</li>
                <li><strong className="text-gray-800 dark:text-gray-100">Arbeitslosenversicherung:</strong> 2,6 % (Arbeitnehmeranteil: 1,3 %). Gleiche BBG wie RV.</li>
                <li><strong className="text-gray-800 dark:text-gray-100">Pflegeversicherung:</strong> 3,6 % (Arbeitnehmeranteil: 1,8 %). Kinderlose ab 23 Jahren zahlen einen Zuschlag von 0,6 %. Ab dem 2. Kind Abschlag von 0,25 pp pro Kind (bis 5. Kind, unter 25 J.). BBG wie KV.</li>
              </ul>

              <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 mt-6 mb-3">Die 6 Steuerklassen erklärt</h3>
              <p>
                Die Steuerklasse bestimmt, wie viel Lohnsteuer monatlich einbehalten wird. Sie beeinflusst nicht die jährliche Steuerlast (die wird über die Steuererklärung ausgeglichen), sondern nur die monatliche Verteilung:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong className="text-gray-800 dark:text-gray-100">Steuerklasse 1:</strong> Ledige, Geschiedene, Verwitwete — die Standardklasse für Alleinstehende.</li>
                <li><strong className="text-gray-800 dark:text-gray-100">Steuerklasse 2:</strong> Alleinerziehende mit mindestens einem Kind im Haushalt. Bietet den Entlastungsbetrag für Alleinerziehende (4.260 €).</li>
                <li><strong className="text-gray-800 dark:text-gray-100">Steuerklasse 3:</strong> Verheiratete mit deutlich höherem Einkommen als der Partner. Günstigste Steuerklasse, aber nur in Kombination mit SK5 für den Partner.</li>
                <li><strong className="text-gray-800 dark:text-gray-100">Steuerklasse 4:</strong> Verheiratete mit ähnlich hohem Einkommen. Beide Partner werden wie in SK1 besteuert.</li>
                <li><strong className="text-gray-800 dark:text-gray-100">Steuerklasse 5:</strong> Verheiratete mit deutlich niedrigerem Einkommen. Höchste monatliche Abzüge, gleicht sich aber über die Steuererklärung aus.</li>
                <li><strong className="text-gray-800 dark:text-gray-100">Steuerklasse 6:</strong> Für Zweit- und Nebenjobs. Keine Freibeträge, daher die höchsten Abzüge.</li>
              </ul>

              <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 mt-6 mb-3">Gesetzliche vs. Private Krankenversicherung</h3>
              <p>
                In der gesetzlichen Krankenversicherung (GKV) richtet sich der Beitrag nach dem Einkommen (bis zur BBG). Der Arbeitgeber übernimmt die Hälfte des allgemeinen Beitrags. In der privaten Krankenversicherung (PKV) hängt der Beitrag von Alter, Gesundheitszustand und gewähltem Tarif ab. Der Arbeitgeberzuschuss ist auf den maximalen GKV-Beitrag begrenzt. Beamte, Selbstständige und Arbeitnehmer mit einem Bruttoeinkommen über der Versicherungspflichtgrenze (Jahresarbeitsentgeltgrenze 77.400 €/Jahr bzw. 6.450 €/Monat, Stand 2026) können in die PKV wechseln.
              </p>

              <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 mt-6 mb-3">Hinweis zur Genauigkeit</h3>
              <p>
                Unser Brutto-Netto-Rechner liefert eine gute Orientierung, basiert jedoch auf vereinfachten Berechnungen. Die exakte Lohnsteuer wird vom Finanzamt nach dem offiziellen Lohnsteuertarif berechnet, der deutlich komplexer ist. Für eine exakte Berechnung empfehlen wir den Lohnsteuerrechner des BMF oder Ihren Steuerberater.
              </p>
            </div>
          </section>

          {/* Section 5: Anwendungsfälle */}
          <section className="mt-8 no-print">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Anwendungsfälle: Wann brauchen Sie den Brutto-Netto-Rechner?</h2>
            <div className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed space-y-4">
              <p>
                <strong className="text-gray-800 dark:text-gray-100">1. Jobwechsel oder Gehaltsverhandlung.</strong> Sie bekommen ein Angebot über 4.500 € brutto — was bedeutet das netto? Vergleichen Sie mit Ihrem aktuellen Nettogehalt, bevor Sie zusagen. Eine Bruttoerhöhung von 500 € pro Monat bringt durch die Steuerprogression oft nur 250–300 € mehr netto — das macht den Unterschied zwischen &bdquo;lohnt sich&ldquo; und &bdquo;kaum spürbar&ldquo;.
              </p>
              <p>
                <strong className="text-gray-800 dark:text-gray-100">2. Steuerklassen-Wechsel nach Heirat.</strong> Frisch verheiratete Paare können zwischen 4/4, 3/5 oder dem Faktorverfahren wählen. Bei großem Einkommensunterschied bringt 3/5 monatlich mehr Netto für den Hauptverdiener — die endgültige Steuerlast wird allerdings erst in der gemeinsamen Steuererklärung am Jahresende abgerechnet. Berechnen Sie beide Varianten, um die monatlich günstigere Kombination zu finden.
              </p>
              <p>
                <strong className="text-gray-800 dark:text-gray-100">3. Umzug in ein anderes Bundesland.</strong> Bayern und Baden-Württemberg erheben 8 % Kirchensteuer, alle anderen Bundesländer 9 %. Auch der Krankenkassen-Zusatzbeitrag variiert je Kasse — von etwa 1,5 % bis über 3 %. Ein Umzug oder Kassenwechsel kann einige hundert Euro pro Jahr ausmachen.
              </p>
              <p>
                <strong className="text-gray-800 dark:text-gray-100">4. Kirchenein- oder -austritt.</strong> Wer aus der Kirche austritt, spart die Kirchensteuer komplett. Bei 3.500 € Brutto sind das je nach Bundesland 25–40 € monatlich, bei höheren Einkommen schnell 60–100 €. Über 30 Jahre Berufsleben kommen so leicht 15.000 € oder mehr zusammen.
              </p>
              <p>
                <strong className="text-gray-800 dark:text-gray-100">5. Familienplanung.</strong> Mit der Geburt eines Kindes ändern sich Freibeträge: der Kinderfreibetrag (2026: 6.826 € pro Kind), der Entlastungsbetrag für Alleinerziehende und der Wegfall des Pflegeversicherungs-Zuschlags für Kinderlose. Der Rechner berücksichtigt diese Faktoren und zeigt Ihnen das neue Netto sofort.
              </p>
            </div>
          </section>

          {/* Section 6: Häufige Fehler */}
          <section className="mt-8 no-print">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Häufige Fehler bei der Brutto-Netto-Berechnung</h2>
            <ul className="list-disc pl-5 space-y-3 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              <li>
                <strong className="text-gray-800 dark:text-gray-100">Steuerklasse falsch angegeben.</strong> Verheiratete sind nicht automatisch in Klasse 4. Wer 3/5 gewählt hat, hat in der höheren Klasse mehr Netto, in der niedrigeren weniger. Welche Klasse Sie tatsächlich haben, steht oben rechts auf Ihrer Lohnabrechnung.
              </li>
              <li>
                <strong className="text-gray-800 dark:text-gray-100">Sozialabgaben unterschätzt.</strong> Viele rechnen mit pauschal 20 %. Tatsächlich liegt der Arbeitnehmer-Anteil 2026 bei rund 21 % — abhängig vom Krankenkassen-Zusatzbeitrag und mit zusätzlich 0,6 % Aufschlag für Kinderlose ab 23 Jahren.
              </li>
              <li>
                <strong className="text-gray-800 dark:text-gray-100">Solidaritätszuschlag pauschal abgezogen.</strong> Seit 2021 zahlen rund 90 % der Steuerzahler keinen Soli mehr. Erst ab einer Jahres-Lohnsteuer von 20.350 € (Single 2026) bzw. 40.700 € (gemeinsam) wird er fällig — das entspricht etwa 73.500 € Jahresbrutto Single.
              </li>
              <li>
                <strong className="text-gray-800 dark:text-gray-100">Beitragsbemessungsgrenze ignoriert.</strong> Bei Bruttogehältern über 5.812,50 € pro Monat zahlen Sie nicht weiter mehr in Kranken- und Pflegeversicherung ein (RV und ALV: bis 8.450 € pro Monat). Wer das nicht weiß, rechnet sein Netto bei hohen Gehältern zu niedrig.
              </li>
              <li>
                <strong className="text-gray-800 dark:text-gray-100">Bundesland-Unterschiede vergessen.</strong> Kirchensteuer ist 8 % in Bayern und Baden-Württemberg, 9 % in allen anderen Bundesländern. Beim Umzug ändert sich das automatisch — auch ohne Kirchenwechsel.
              </li>
            </ul>
          </section>

          {/* Section 7: Tipps: Mehr Netto vom Brutto (h3 → h2 promoted aus Existing-Pos 20) */}
          <section className="mt-8 no-print">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Tipps: Mehr Netto vom Brutto</h2>
            <div className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed space-y-4">
              <p>Es gibt legale Wege, Ihr Nettogehalt zu optimieren:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong className="text-gray-800 dark:text-gray-100">Steuerklassenwechsel:</strong> Verheiratete können durch die Kombination 3/5 statt 4/4 das monatliche Netto des Hauptverdieners deutlich erhöhen.</li>
                <li><strong className="text-gray-800 dark:text-gray-100">Kinderfreibeträge eintragen lassen:</strong> Reduziert die monatliche Pflegeversicherung und kann steuerlich günstiger sein als Kindergeld.</li>
                <li><strong className="text-gray-800 dark:text-gray-100">Steuererklärung machen:</strong> Viele Arbeitnehmer erhalten im Schnitt ca. 1.100 € Erstattung pro Jahr.</li>
                <li><strong className="text-gray-800 dark:text-gray-100">Betriebliche Altersvorsorge:</strong> Beiträge zur bAV werden vor Steuern und Sozialabgaben abgezogen.</li>
                <li><strong className="text-gray-800 dark:text-gray-100">Sachbezüge:</strong> Der Arbeitgeber kann bis zu 50 € monatlich steuerfrei als Sachbezug gewähren (z. B. Tankgutschein, Jobticket).</li>
              </ul>
            </div>
          </section>

          {/* Section 8: Häufige Fragen — 12 konsolidierte Q&A + FAQPage Schema.org */}
          <section className="mt-8 no-print">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Häufige Fragen zur Brutto-Netto-Berechnung</h2>
            <div className="space-y-4">
              {STATIC_FAQ.map((item, i) => (
                <details key={i} className="group border border-gray-100 dark:border-gray-700 rounded-xl">
                  <summary className="cursor-pointer p-4 font-medium text-gray-800 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors list-none flex justify-between items-center">
                    {item.frage}
                    <svg className="w-5 h-5 text-gray-600 group-open:rotate-180 transition-transform shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.antwort}
                  </div>
                </details>
              ))}
            </div>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'FAQPage',
                  mainEntity: STATIC_FAQ.map(item => ({
                    '@type': 'Question',
                    name: item.frage,
                    acceptedAnswer: { '@type': 'Answer', text: item.antwort },
                  })),
                }),
              }}
            />
          </section>

        </>
      )}

      {/* Affiliate-Boxen */}
      {ergebnis && (
        <>
          <AffiliateBox programId="wiso" context="brutto-netto" />
          <AffiliateBox programId="smartsteuer" context="brutto-netto" />
        </>
      )}

      {/* Brutto-Netto-Tabelle (SEO) */}
      <div className="mt-8 no-print">
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">Brutto-Netto-Tabelle 2026</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Wie viel Netto bleibt vom Brutto? Übersicht für Steuerklasse 1, 3 und 5 (ohne Kirchensteuer, GKV, NRW).
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary-50 dark:bg-primary-500/10">
                <th className="text-left p-2.5 font-semibold text-gray-700 dark:text-gray-200 rounded-tl-lg">Brutto / Monat</th>
                <th className="text-right p-2.5 font-semibold text-gray-700 dark:text-gray-200">Netto SK 1</th>
                <th className="text-right p-2.5 font-semibold text-gray-700 dark:text-gray-200">Netto SK 3</th>
                <th className="text-right p-2.5 font-semibold text-gray-700 dark:text-gray-200 rounded-tr-lg">Netto SK 5</th>
              </tr>
            </thead>
            <tbody>
              {TABELLEN_WERTE.map((b, i) => {
                const sk1 = berechneSchnell(b, 1);
                const sk3 = berechneSchnell(b, 3);
                const sk5 = berechneSchnell(b, 5);
                return (
                  <tr key={b} className={i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700/30' : ''}>
                    <td className="p-2.5 font-medium text-gray-800 dark:text-gray-200">{b.toLocaleString('de-DE')} €</td>
                    <td className="p-2.5 text-right text-gray-600 dark:text-gray-400">{fmt(sk1.nettoMonat)} €</td>
                    <td className="p-2.5 text-right text-gray-600 dark:text-gray-400">{fmt(sk3.nettoMonat)} €</td>
                    <td className="p-2.5 text-right text-gray-600 dark:text-gray-400">{fmt(sk5.nettoMonat)} €</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-500 mt-2">
          Werte gerundet, ohne Kirchensteuer, GKV mit 2,9 % durchschnittlichem Zusatzbeitrag (AN-Anteil 1,45 %), keine Kinder, NRW. Stand 2026. Der kassenindividuelle Zusatzbeitrag kann abweichen.
        </p>
      </div>
    </div>
  );
}

function Zeile({ label, wert, hervorgehoben = false, brutto }: { label: string; wert: number; hervorgehoben?: boolean; brutto?: number }) {
  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const prozent = brutto && brutto > 0 ? ((Math.abs(wert) / brutto) * 100).toFixed(1) : null;
  return (
    <tr className={hervorgehoben ? 'font-semibold text-gray-800 dark:text-gray-100' : 'text-gray-600 dark:text-gray-400'}>
      <td className="py-1.5">{label}</td>
      <td className={`py-1.5 text-right ${wert < 0 ? 'text-red-600 dark:text-red-400' : ''}`}>
        {wert < 0 ? `−${fmt(Math.abs(wert))}` : fmt(wert)} &euro;
      </td>
      <td className="py-1.5 text-right text-xs text-gray-600 dark:text-gray-500 w-16">
        {prozent ? `${prozent}%` : ''}
      </td>
    </tr>
  );
}
