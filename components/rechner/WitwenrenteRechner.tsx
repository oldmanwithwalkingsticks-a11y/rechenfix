'use client';

import { useState, useMemo } from 'react';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import { AffiliateBox } from '@/components/AffiliateBox';
import CrossLink from '@/components/ui/CrossLink';
import RadioToggleGroup from '@/components/ui/RadioToggleGroup';
import { getAktuellerRentenwert, RENTENWERT_AB_01_07_2026 } from '@/lib/berechnungen/rente';

type Art = 'gross' | 'klein';

// Rentenwert aus zentraler SSOT (§ 255 SGB VI + Rentenwert-Verordnung).
// Heute: 40,79 €, ab 01.07.2026: 42,52 € — Switch greift automatisch.
const RENTENWERT = getAktuellerRentenwert();
const FREIBETRAG_FAKTOR = 26.4; // § 97 SGB VI + Anlage 1
const KIND_FAKTOR = 5.6;        // § 97 SGB VI pro Kind unter 18
const ANRECHNUNG = 0.40;        // 40 % des übersteigenden Einkommens

export default function WitwenrenteRechner() {
  const [art, setArt] = useState<Art>('gross');
  const [renteVerstorbener, setRenteVerstorbener] = useState('1500');
  const [eigenesNetto, setEigenesNetto] = useState('1800');
  const [kinder, setKinder] = useState('0');
  const [neuesRecht, setNeuesRecht] = useState(true);

  const rv = parseDeutscheZahl(renteVerstorbener);
  const en = parseDeutscheZahl(eigenesNetto);
  const k = parseInt(kinder, 10) || 0;

  const ergebnis = useMemo(() => {
    if (rv <= 0) return null;

    // Prozentsatz nach Recht
    const prozent = art === 'gross'
      ? (neuesRecht ? 0.55 : 0.60)
      : 0.25;

    const grundanspruch = rv * prozent;

    // Freibetrag
    const freibetragBasis = FREIBETRAG_FAKTOR * RENTENWERT;
    const freibetragKinder = k * KIND_FAKTOR * RENTENWERT;
    const freibetragGesamt = freibetragBasis + freibetragKinder;

    // Anrechenbares Einkommen
    const anrechenbar = Math.max(0, en - freibetragGesamt);
    const abzug = anrechenbar * ANRECHNUNG;

    const auszahlung = Math.max(0, grundanspruch - abzug);

    // Sterbevierteljahr: 3 Monate volle Rente des Verstorbenen
    const sterbevierteljahrMonat = rv;
    const sterbevierteljahrGesamt = rv * 3;

    const befristung = art === 'klein' && neuesRecht ? 24 : null;

    return {
      prozent,
      grundanspruch,
      freibetragBasis,
      freibetragKinder,
      freibetragGesamt,
      anrechenbar,
      abzug,
      auszahlung,
      sterbevierteljahrMonat,
      sterbevierteljahrGesamt,
      befristung,
    };
  }, [art, rv, en, k, neuesRecht]);

  const fmt = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div>
      {/* Art der Witwenrente */}
      <div className="mb-5">
        <RadioToggleGroup
          name="witwenrente-art"
          legend="Art der Witwenrente"
          options={[
            { value: 'gross', label: 'Große Witwenrente' },
            { value: 'klein', label: 'Kleine Witwenrente' },
          ]}
          value={art}
          onChange={(v) => setArt(v as Art)}
          fullWidth
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
          Große: ab 47 Jahre, erwerbsgemindert oder Kind erziehend. Kleine: alle anderen Fälle.
        </p>
      </div>

      {/* Renten-Eingaben */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rente des Verstorbenen</label>
          <NummerEingabe value={renteVerstorbener} onChange={setRenteVerstorbener} placeholder="1500" einheit="€/Monat" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Eigenes Nettoeinkommen</label>
          <NummerEingabe value={eigenesNetto} onChange={setEigenesNetto} placeholder="1800" einheit="€/Monat" />
        </div>
      </div>

      {/* Kinder */}
      <div className="mb-4">
        <label htmlFor="witwenrente-select-1" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kinder unter 18 Jahren</label>
        <select id="witwenrente-select-1"
          value={kinder}
          onChange={e => setKinder(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-3 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[48px]"
        >
          <option value="0">0 Kinder</option>
          <option value="1">1 Kind</option>
          <option value="2">2 Kinder</option>
          <option value="3">3 Kinder</option>
          <option value="4">4 Kinder</option>
        </select>
      </div>

      {/* Recht */}
      <div className="mb-6 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">Neues Recht (Heirat nach 2001)</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Große Rente: 55 % statt 60 %. Kleine Rente auf 24 Monate befristet.</p>
          </div>
          <button
            onClick={() => setNeuesRecht(!neuesRecht)}
            className={`w-12 h-7 rounded-full relative transition-colors shrink-0 ml-3 ${neuesRecht ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'}`}
          >
            <span className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${neuesRecht ? 'translate-x-5' : ''}`} />
          </button>
        </div>
      </div>

      {/* Ergebnis */}
      {ergebnis && (
        <>
          {/* Hauptergebnis */}
          <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-500/15 dark:to-primary-600/10 rounded-2xl p-6 text-center mb-4">
            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-1">
              {art === 'gross' ? 'Große' : 'Kleine'} Witwenrente (nach Einkommensanrechnung)
            </p>
            <p className="text-4xl font-extrabold text-primary-700 dark:text-primary-300">
              {fmt(ergebnis.auszahlung)} €
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">pro Monat</p>
            {ergebnis.befristung && (
              <p className="text-xs text-amber-700 dark:text-amber-400 mt-2">
                Befristet auf {ergebnis.befristung} Monate (kleine Witwenrente, neues Recht)
              </p>
            )}
          </div>

          {/* Sterbevierteljahr */}
          <div className="bg-accent-50 dark:bg-accent-700/20 border border-accent-200 dark:border-accent-600/40 rounded-xl p-4 mb-4">
            <p className="text-sm font-semibold text-accent-700 dark:text-accent-400 mb-1">Sterbevierteljahr (erste 3 Monate)</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{fmt(ergebnis.sterbevierteljahrMonat)} €/Monat</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              In den ersten 3 Monaten nach dem Todesfall wird die volle Rente des Verstorbenen gezahlt (ohne Einkommensanrechnung). Gesamt: {fmt(ergebnis.sterbevierteljahrGesamt)} €.
            </p>
          </div>

          {/* Aufschlüsselung */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Aufschlüsselung</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Grundanspruch ({(ergebnis.prozent * 100).toLocaleString('de-DE')} % von {fmt(rv)} €)</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.grundanspruch)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Grundfreibetrag (26,4 × {fmt(RENTENWERT)} € Rentenwert)</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.freibetragBasis)} €</span>
              </div>
              {ergebnis.freibetragKinder > 0 && (
                <div className="flex justify-between px-4 py-3 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Kinderfreibetrag ({k} × 5,6 × Rentenwert)</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">+{fmt(ergebnis.freibetragKinder)} €</span>
                </div>
              )}
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Freibetrag gesamt</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.freibetragGesamt)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Anrechenbares Einkommen ({fmt(en)} − Freibetrag)</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">{fmt(ergebnis.anrechenbar)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">Abzug (40 % des anrechenbaren Einkommens)</span>
                <span className="font-medium text-red-600 dark:text-red-400">−{fmt(ergebnis.abzug)} €</span>
              </div>
              <div className="flex justify-between px-4 py-3 text-sm font-bold bg-primary-50/50 dark:bg-primary-500/5">
                <span className="text-gray-800 dark:text-gray-100">Auszahlung pro Monat</span>
                <span className="text-primary-600 dark:text-primary-400">{fmt(ergebnis.auszahlung)} €</span>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-3">
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              <strong>Hinweis:</strong> Vereinfachte Berechnung mit Rentenwert {fmt(RENTENWERT)} €. Ab 01.07.2026 steigt der Rentenwert auf {fmt(RENTENWERT_AB_01_07_2026)} €, dadurch erhöhen sich Grundfreibetrag und Kinderfreibetrag automatisch. Maßgeblich bleibt der Bescheid der Deutschen Rentenversicherung.
            </p>
          </div>

          <CrossLink href="/finanzen/rentenrechner" emoji="👵" text="Eigene Rente berechnen" />
          <CrossLink href="/finanzen/buergergeld-rechner" emoji="💶" text="Bürgergeld prüfen — wenn die Witwenrente nicht reicht" />

          <AffiliateBox programId="cosmosdirekt" context="risikolebensversicherung" />

          <ErgebnisAktionen
            ergebnisText={`${art === 'gross' ? 'Große' : 'Kleine'} Witwenrente: ${fmt(ergebnis.auszahlung)} €/Monat (Grundanspruch ${fmt(ergebnis.grundanspruch)} € − Anrechnung ${fmt(ergebnis.abzug)} €). Sterbevierteljahr: ${fmt(ergebnis.sterbevierteljahrMonat)} €/Monat.`}
            seitenTitel="Witwenrente-Rechner"
          />

          <AiExplain
            rechnerName="Witwenrente-Rechner"
            eingaben={{
              art: art === 'gross' ? 'Große Witwenrente' : 'Kleine Witwenrente',
              renteVerstorbener: rv,
              eigenesNetto: en,
              kinder: k,
              neuesRecht,
            }}
            ergebnis={{
              auszahlung: ergebnis.auszahlung,
              grundanspruch: ergebnis.grundanspruch,
              freibetragGesamt: ergebnis.freibetragGesamt,
              abzug: ergebnis.abzug,
              sterbevierteljahrMonat: ergebnis.sterbevierteljahrMonat,
            }}
          />
        </>
      )}
    </div>
  );
}
