'use client';

import { useState, useMemo } from 'react';
import { berechneBussgeld } from '@/lib/berechnungen/bussgeld';
import type { VerstossArt, Ort, Fahrzeug, RotlichtPhase, AbstandStufe, AlkoholStufe, HandyStufe, ParkStufe } from '@/lib/berechnungen/bussgeld';
import { parseDeutscheZahl } from '@/lib/zahlenformat';
import NummerEingabe from '@/components/ui/NummerEingabe';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';
import CrossLink from '@/components/ui/CrossLink';
import { AffiliateBox } from '@/components/AffiliateBox';

const VERSTOSS_OPTIONEN: { value: VerstossArt; label: string }[] = [
  { value: 'geschwindigkeit', label: 'Geschwindigkeitsüberschreitung' },
  { value: 'rotlicht', label: 'Rotlichtverstoß' },
  { value: 'abstand', label: 'Abstandsverstoß' },
  { value: 'handy', label: 'Handy am Steuer' },
  { value: 'parken', label: 'Parkverstöße' },
  { value: 'alkohol', label: 'Alkohol am Steuer' },
];

const SCHWERE_FARBEN: Record<string, { bg: string; text: string; label: string }> = {
  'gering': { bg: 'bg-green-500', text: 'text-green-700 dark:text-green-400', label: 'Gering' },
  'mittel': { bg: 'bg-yellow-500', text: 'text-yellow-700 dark:text-yellow-400', label: 'Mittel' },
  'schwer': { bg: 'bg-orange-500', text: 'text-orange-700 dark:text-orange-400', label: 'Schwer' },
  'sehr-schwer': { bg: 'bg-red-500', text: 'text-red-700 dark:text-red-400', label: 'Sehr schwer' },
};

export default function BussgeldRechner() {
  const [verstoss, setVerstoss] = useState<VerstossArt>('geschwindigkeit');
  const [ueberschreitung, setUeberschreitung] = useState('20');
  const [ort, setOrt] = useState<Ort>('ausserorts');
  const [fahrzeug, setFahrzeug] = useState<Fahrzeug>('pkw');
  const [rotlichtPhase, setRotlichtPhase] = useState<RotlichtPhase>('unter1');
  const [abstandGeschwindigkeit, setAbstandGeschwindigkeit] = useState('100');
  const [abstandStufe, setAbstandStufe] = useState<AbstandStufe>('3_10');
  const [alkoholStufe, setAlkoholStufe] = useState<AlkoholStufe>('05_109');
  const [handyStufe, setHandyStufe] = useState<HandyStufe>('normal');
  const [parkStufe, setParkStufe] = useState<ParkStufe>('unerlaubt');

  const ergebnis = useMemo(() => {
    return berechneBussgeld({
      verstoss,
      ueberschreitung: parseDeutscheZahl(ueberschreitung),
      ort,
      fahrzeug,
      rotlichtPhase,
      abstandGeschwindigkeit: parseDeutscheZahl(abstandGeschwindigkeit),
      abstandStufe,
      alkoholStufe,
      handyStufe,
      parkStufe,
    });
  }, [verstoss, ueberschreitung, ort, fahrzeug, rotlichtPhase, abstandGeschwindigkeit, abstandStufe, alkoholStufe, handyStufe, parkStufe]);

  const schwere = SCHWERE_FARBEN[ergebnis.schwere];

  return (
    <div>
      {/* Eingabefelder */}
      <div className="space-y-4 mb-6">
        {/* Verstoß-Art */}
        <div>
          <label htmlFor="bussgeld-select-1" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Art des Verstoßes
          </label>
          <select id="bussgeld-select-1"
            value={verstoss}
            onChange={e => setVerstoss(e.target.value as VerstossArt)}
            className="input-field"
          >
            {VERSTOSS_OPTIONEN.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Geschwindigkeits-Felder */}
        {verstoss === 'geschwindigkeit' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Überschreitung
              </label>
              <NummerEingabe value={ueberschreitung} onChange={setUeberschreitung} einheit="km/h" placeholder="z.B. 20" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Wo?</label>
                <div className="flex gap-2">
                  {(['ausserorts', 'innerorts'] as Ort[]).map(o => (
                    <button
                      key={o}
                      onClick={() => setOrt(o)}
                      className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        ort === o
                          ? 'bg-primary-500 text-white shadow-md'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {o === 'innerorts' ? 'Innerorts' : 'Außerorts'}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Fahrzeugtyp</label>
                <div className="flex gap-2">
                  {(['pkw', 'lkw'] as Fahrzeug[]).map(f => (
                    <button
                      key={f}
                      onClick={() => setFahrzeug(f)}
                      className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        fahrzeug === f
                          ? 'bg-primary-500 text-white shadow-md'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {f === 'pkw' ? 'PKW' : 'LKW/Bus'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Rotlicht-Felder */}
        {verstoss === 'rotlicht' && (
          <div>
            <label htmlFor="bussgeld-select-2" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phase</label>
            <select id="bussgeld-select-2" value={rotlichtPhase} onChange={e => setRotlichtPhase(e.target.value as RotlichtPhase)} className="input-field">
              <option value="unter1">Unter 1 Sekunde rot</option>
              <option value="ueber1">Über 1 Sekunde rot</option>
              <option value="gefaehrdung">Mit Gefährdung</option>
              <option value="sachbeschaedigung">Mit Sachbeschädigung</option>
            </select>
          </div>
        )}

        {/* Abstands-Felder */}
        {verstoss === 'abstand' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Geschwindigkeit</label>
              <NummerEingabe value={abstandGeschwindigkeit} onChange={setAbstandGeschwindigkeit} einheit="km/h" placeholder="100" />
            </div>
            <div>
              <label htmlFor="bussgeld-select-3" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Abstand</label>
              <select id="bussgeld-select-3" value={abstandStufe} onChange={e => setAbstandStufe(e.target.value as AbstandStufe)} className="input-field">
                <option value="5_10">Weniger als 5/10 des halben Tachos</option>
                <option value="4_10">Weniger als 4/10 des halben Tachos</option>
                <option value="3_10">Weniger als 3/10 des halben Tachos</option>
                <option value="2_10">Weniger als 2/10 des halben Tachos</option>
                <option value="1_10">Weniger als 1/10 des halben Tachos</option>
              </select>
            </div>
          </div>
        )}

        {/* Handy-Felder */}
        {verstoss === 'handy' && (
          <div>
            <label htmlFor="bussgeld-select-4" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Situation</label>
            <select id="bussgeld-select-4" value={handyStufe} onChange={e => setHandyStufe(e.target.value as HandyStufe)} className="input-field">
              <option value="normal">Handy am Steuer</option>
              <option value="gefaehrdung">Mit Gefährdung</option>
              <option value="sachbeschaedigung">Mit Sachbeschädigung</option>
              <option value="radfahrer">Beim Radfahren</option>
            </select>
          </div>
        )}

        {/* Park-Felder */}
        {verstoss === 'parken' && (
          <div>
            <label htmlFor="bussgeld-select-5" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Parkverstoß</label>
            <select id="bussgeld-select-5" value={parkStufe} onChange={e => setParkStufe(e.target.value as ParkStufe)} className="input-field">
              <option value="unerlaubt">Parken an unerlaubter Stelle</option>
              <option value="feuerwehr">Parken in Feuerwehrzufahrt</option>
              <option value="gehweg">Parken auf Gehweg</option>
              <option value="zweite_reihe">Parken in zweiter Reihe</option>
              <option value="behindert">Parken auf Behindertenparkplatz</option>
            </select>
          </div>
        )}

        {/* Alkohol-Felder */}
        {verstoss === 'alkohol' && (
          <div>
            <label htmlFor="bussgeld-select-6" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Promille-Bereich</label>
            <select id="bussgeld-select-6" value={alkoholStufe} onChange={e => setAlkoholStufe(e.target.value as AlkoholStufe)} className="input-field">
              <option value="05_109">0,5 – 1,09 ‰ (Ordnungswidrigkeit)</option>
              <option value="ab_11">Ab 1,1 ‰ (Straftat)</option>
              <option value="unter_05_auffaellig">Unter 0,5 ‰ mit Auffälligkeiten</option>
              <option value="probezeit">Probezeit / unter 21: ab 0,0 ‰</option>
            </select>
            <CrossLink href="/gesundheit/alkohol-abbau-rechner" emoji="🍺" text="Wann bin ich wieder nüchtern? Alkohol-Abbau-Rechner" />
          </div>
        )}
      </div>

      {/* Hinweis Bußgeldkatalog */}
      <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-3 mb-4">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Angaben basierend auf dem Bußgeldkatalog (Stand 2025). Alle Angaben ohne Gewähr.
        </p>
      </div>

      {/* Ergebnis */}
      <>
        {/* Hauptergebnis */}
        <div className="result-box mb-4">
          {ergebnis.straftat ? (
            <>
              <p className="text-white/70 text-sm mb-1">Straftat</p>
              <p className="text-4xl font-bold text-red-300">Geldstrafe / Freiheitsstrafe</p>
            </>
          ) : (
            <>
              <p className="text-white/70 text-sm mb-1">Bußgeld</p>
              <p className="text-5xl font-bold">{ergebnis.bussgeld} <span className="text-2xl">€</span></p>
            </>
          )}

          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/20">
            {/* Punkte */}
            <div className="text-center">
              <p className="text-white/60 text-xs mb-2">Punkte in Flensburg</p>
              <div className="flex justify-center gap-1.5">
                {[1, 2, 3].map(i => (
                  <span
                    key={i}
                    className={`w-5 h-5 rounded-full ${
                      i <= ergebnis.punkte ? 'bg-red-400' : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
              <p className="text-lg font-bold mt-1">{ergebnis.punkte}</p>
            </div>

            {/* Fahrverbot */}
            <div className="text-center">
              <p className="text-white/60 text-xs mb-2">Fahrverbot</p>
              {ergebnis.fahrverbot > 0 || ergebnis.straftat ? (
                <p className="text-lg font-bold text-red-300">
                  {ergebnis.straftat ? 'Entzug' : `${ergebnis.fahrverbot} Monat${ergebnis.fahrverbot > 1 ? 'e' : ''}`}
                </p>
              ) : (
                <p className="text-lg font-bold text-green-300">Keins</p>
              )}
            </div>

            {/* Schwere */}
            <div className="text-center">
              <p className="text-white/60 text-xs mb-2">Schwere</p>
              <div className="flex justify-center gap-1 mb-1">
                {['gering', 'mittel', 'schwer', 'sehr-schwer'].map((s, i) => {
                  const schwereIndex = ['gering', 'mittel', 'schwer', 'sehr-schwer'].indexOf(ergebnis.schwere);
                  const farben = ['bg-green-400', 'bg-yellow-400', 'bg-orange-400', 'bg-red-400'];
                  return (
                    <span
                      key={s}
                      className={`w-4 h-4 rounded-sm ${i <= schwereIndex ? farben[i] : 'bg-white/20'}`}
                    />
                  );
                })}
              </div>
              <p className={`text-sm font-bold ${schwere.text}`}>{schwere.label}</p>
            </div>
          </div>
        </div>

        {/* Beschreibung */}
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 mb-4">
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{ergebnis.beschreibung}</p>
          {ergebnis.fahrverbotHinweis && (
            <p className="text-sm text-red-600 dark:text-red-400 mt-1 font-medium">{ergebnis.fahrverbotHinweis}</p>
          )}
        </div>

        {/* Fahrverbot-Info */}
        {(ergebnis.fahrverbot > 0 || ergebnis.straftat) && (
          <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-4 mb-4">
            <p className="text-sm text-red-700 dark:text-red-400">
              {ergebnis.straftat ? (
                <><strong>Straftat:</strong> Ab 1,1 ‰ handelt es sich um eine Straftat. Die Fahrerlaubnis wird entzogen — eine Neuerteilung erfordert in der Regel eine MPU (Medizinisch-Psychologische Untersuchung).</>
              ) : (
                <><strong>Fahrverbot:</strong> Bei einem Fahrverbot müssen Sie Ihren Führerschein bei der zuständigen Behörde abgeben. Sie dürfen in dieser Zeit kein Kraftfahrzeug führen.</>
              )}
            </p>
          </div>
        )}

        {/* Einspruch-Hinweis */}
        {(ergebnis.bussgeld >= 100 || ergebnis.punkte >= 1) && (
          <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 mb-4">
            <p className="text-sm text-blue-700 dark:text-blue-400">
              <strong>Einspruch möglich:</strong> Sie können innerhalb von 14 Tagen nach Zustellung Einspruch gegen den Bußgeldbescheid einlegen. Bei fehlerhaften Messungen oder Formfehlern im Bescheid kann sich ein Einspruch lohnen.
            </p>
          </div>
        )}

        {/* Zusätzliche Hinweise */}
        {ergebnis.hinweise.length > 0 && (
          <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-4 mb-4">
            {ergebnis.hinweise.map((h, i) => (
              <p key={i} className="text-sm text-amber-700 dark:text-amber-400 mb-1 last:mb-0">
                <strong>Hinweis:</strong> {h}
              </p>
            ))}
          </div>
        )}

        <CrossLink href="/auto/kfz-steuer-rechner" emoji="📋" text="Kfz-Steuer berechnen" />

        <ErgebnisAktionen
          ergebnisText={`${ergebnis.beschreibung}: ${ergebnis.straftat ? 'Straftat' : `${ergebnis.bussgeld} € Bußgeld`}, ${ergebnis.punkte} Punkt${ergebnis.punkte !== 1 ? 'e' : ''} in Flensburg${ergebnis.fahrverbot > 0 ? `, ${ergebnis.fahrverbot} Monat${ergebnis.fahrverbot > 1 ? 'e' : ''} Fahrverbot` : ''}`}
          seitenTitel="Bußgeldrechner"
        />

        {/* Affiliate — prominent wenn Punkte oder Fahrverbot */}
        {(ergebnis.punkte >= 1 || ergebnis.fahrverbot > 0) && (
          <AffiliateBox programId="ks-auxilia" context="bussgeld" variant="full" />
        )}

        <AiExplain
          rechnerName="Bußgeldrechner"
          eingaben={{
            verstoss,
            ...(verstoss === 'geschwindigkeit' ? { ueberschreitungKmh: parseDeutscheZahl(ueberschreitung), ort, fahrzeug } : {}),
            ...(verstoss === 'rotlicht' ? { rotlichtPhase } : {}),
            ...(verstoss === 'abstand' ? { geschwindigkeitKmh: parseDeutscheZahl(abstandGeschwindigkeit), abstandStufe } : {}),
            ...(verstoss === 'alkohol' ? { alkoholStufe } : {}),
            ...(verstoss === 'handy' ? { handyStufe } : {}),
            ...(verstoss === 'parken' ? { parkStufe } : {}),
          }}
          ergebnis={{
            bussgeldEuro: ergebnis.bussgeld,
            punkte: ergebnis.punkte,
            fahrverbotMonate: ergebnis.fahrverbot,
            straftat: ergebnis.straftat,
            schwere: ergebnis.schwere,
          }}
        />
      </>
    </div>
  );
}
