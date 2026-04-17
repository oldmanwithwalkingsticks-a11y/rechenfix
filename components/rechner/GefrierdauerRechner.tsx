'use client';

import { useState, useEffect } from 'react';
import ErgebnisAktionen from '@/components/ui/ErgebnisAktionen';
import AiExplain from '@/components/rechner/AiExplain';

// ────────────────────────────────────────────────────────────────────────────
// Daten
// ────────────────────────────────────────────────────────────────────────────

interface Lebensmittel {
  name: string;
  minMonate: number;
  maxMonate: number;
  auftau: string;
  hinweis?: string;
}

interface Kategorie {
  label: string;
  items: Record<string, Lebensmittel>;
}

const KATEGORIEN: Record<string, Kategorie> = {
  fleisch: {
    label: 'Fleisch',
    items: {
      hackfleisch: {
        name: 'Hackfleisch',
        minMonate: 1,
        maxMonate: 3,
        auftau: 'Im Kühlschrank über Nacht auftauen (niemals bei Raumtemperatur). Sofort verarbeiten.',
        hinweis: 'Hackfleisch hat durch die große Oberfläche eine kürzere Haltbarkeit.',
      },
      haenchen: {
        name: 'Hähnchen (ganz)',
        minMonate: 9,
        maxMonate: 12,
        auftau: 'Im Kühlschrank 24–48 h auftauen oder in kaltem Wasser (Beutel verschlossen).',
      },
      haenchenteile: {
        name: 'Hähnchen (Teile)',
        minMonate: 6,
        maxMonate: 9,
        auftau: 'Im Kühlschrank 12–24 h auftauen.',
      },
      rindfleisch: {
        name: 'Rindfleisch (Braten/Steak)',
        minMonate: 6,
        maxMonate: 12,
        auftau: 'Im Kühlschrank langsam auftauen (12–24 h), Qualität bleibt besser.',
      },
      schweinefleisch: {
        name: 'Schweinefleisch',
        minMonate: 4,
        maxMonate: 6,
        auftau: 'Im Kühlschrank 12–24 h auftauen.',
      },
      wurst: {
        name: 'Wurst / Aufschnitt',
        minMonate: 1,
        maxMonate: 2,
        auftau: 'Im Kühlschrank über Nacht auftauen, zeitnah verbrauchen.',
        hinweis: 'Wurst verliert nach dem Auftauen schnell an Qualität.',
      },
    },
  },
  fisch: {
    label: 'Fisch & Meeresfrüchte',
    items: {
      magerfisch: {
        name: 'Magerer Fisch (Kabeljau, Seelachs)',
        minMonate: 6,
        maxMonate: 8,
        auftau: 'Im Kühlschrank 12–24 h auftauen oder direkt gefroren garen.',
      },
      fettfisch: {
        name: 'Fetter Fisch (Lachs, Makrele)',
        minMonate: 2,
        maxMonate: 3,
        auftau: 'Im Kühlschrank langsam auftauen, nicht bei Raumtemperatur.',
        hinweis: 'Fetter Fisch oxidiert schneller – kürzer haltbar.',
      },
      meeresfrüchte: {
        name: 'Meeresfrüchte (Garnelen, Muscheln)',
        minMonate: 3,
        maxMonate: 6,
        auftau: 'In kaltem Wasser oder im Kühlschrank auftauen.',
      },
    },
  },
  gemuese: {
    label: 'Gemüse',
    items: {
      blanchiert: {
        name: 'Gemüse (blanchiert)',
        minMonate: 10,
        maxMonate: 12,
        auftau: 'Direkt gefroren in kochendes Wasser geben – kein Auftauen nötig.',
        hinweis: 'Blanchieren vor dem Einfrieren erhält Farbe, Geschmack und Vitamine.',
      },
      roh: {
        name: 'Gemüse (roh, unblanchiert)',
        minMonate: 3,
        maxMonate: 6,
        auftau: 'Im Kühlschrank auftauen oder direkt weiterverarbeiten.',
        hinweis: 'Ohne Blanchieren werden Konsistenz und Farbe schlechter.',
      },
      kartoffeln: {
        name: 'Kartoffeln (gegart)',
        minMonate: 2,
        maxMonate: 3,
        auftau: 'Bei Raumtemperatur oder im Kühlschrank auftauen.',
        hinweis: 'Rohe Kartoffeln eignen sich nicht zum Einfrieren.',
      },
    },
  },
  obst: {
    label: 'Obst',
    items: {
      beeren: {
        name: 'Beeren (Erdbeeren, Himbeeren)',
        minMonate: 10,
        maxMonate: 12,
        auftau: 'Im Kühlschrank auftauen oder direkt im Smoothie verwenden.',
      },
      steinobst: {
        name: 'Steinobst (Kirschen, Pfirsich)',
        minMonate: 10,
        maxMonate: 12,
        auftau: 'Im Kühlschrank langsam auftauen.',
        hinweis: 'Entsteinen vor dem Einfrieren empfohlen.',
      },
      zitrusobst: {
        name: 'Zitrusobst (Saft/Schale)',
        minMonate: 3,
        maxMonate: 4,
        auftau: 'Bei Raumtemperatur auftauen.',
        hinweis: 'Ganze Früchte nicht einfrieren – nur Saft oder Schale.',
      },
    },
  },
  brot: {
    label: 'Brot & Backwaren',
    items: {
      brot: {
        name: 'Brot (Scheiben/Laib)',
        minMonate: 3,
        maxMonate: 6,
        auftau: 'Scheiben direkt im Toaster. Laib bei Raumtemperatur 2–3 h auftauen.',
      },
      broetchen: {
        name: 'Brötchen',
        minMonate: 2,
        maxMonate: 3,
        auftau: 'Gefroren bei 180 °C ca. 5–8 Min. aufbacken.',
      },
      kuchen: {
        name: 'Kuchen / Torte',
        minMonate: 2,
        maxMonate: 3,
        auftau: 'Im Kühlschrank über Nacht oder bei Raumtemperatur 2–3 h.',
        hinweis: 'Tortenböden ohne Füllung und Sahne einfrieren – besser haltbar.',
      },
      hefeteig: {
        name: 'Hefeteig (roh)',
        minMonate: 1,
        maxMonate: 3,
        auftau: 'Im Kühlschrank über Nacht auftauen, dann gehen lassen.',
      },
    },
  },
  fertiggerichte: {
    label: 'Fertiggerichte & Suppen',
    items: {
      suppe: {
        name: 'Suppe / Eintopf',
        minMonate: 2,
        maxMonate: 3,
        auftau: 'Im Topf bei niedriger Hitze aufwärmen oder über Nacht im Kühlschrank.',
        hinweis: 'In Portionsgrößen einfrieren – einfacher auftauen.',
      },
      sauce: {
        name: 'Sauce / Soße',
        minMonate: 3,
        maxMonate: 4,
        auftau: 'Im Topf bei schwacher Hitze langsam auftauen.',
      },
      pizza: {
        name: 'Pizza / Aufläufe',
        minMonate: 1,
        maxMonate: 2,
        auftau: 'Direkt gefroren im Ofen bei 180 °C aufbacken.',
      },
      reis: {
        name: 'Gekochter Reis / Pasta',
        minMonate: 1,
        maxMonate: 3,
        auftau: 'In der Mikrowelle oder im Topf mit etwas Wasser aufwärmen.',
        hinweis: 'Schnell abkühlen und sofort einfrieren – nie länger als 2 h bei Raumtemperatur stehen lassen.',
      },
    },
  },
  milch: {
    label: 'Milchprodukte & Eier',
    items: {
      butter: {
        name: 'Butter',
        minMonate: 6,
        maxMonate: 9,
        auftau: 'Im Kühlschrank über Nacht oder bei Raumtemperatur 1–2 h.',
      },
      kaese: {
        name: 'Hartkäse (gerieben)',
        minMonate: 3,
        maxMonate: 6,
        auftau: 'Direkt gefroren über Gerichte streuen oder im Kühlschrank auftauen.',
        hinweis: 'Weichkäse eignet sich nicht gut zum Einfrieren.',
      },
      sahne: {
        name: 'Schlagsahne (geschlagen)',
        minMonate: 1,
        maxMonate: 2,
        auftau: 'Im Kühlschrank über Nacht auftauen.',
        hinweis: 'Flüssige Sahne verliert nach dem Auftauen die Schlageigenschaft.',
      },
      eier: {
        name: 'Eier (aufgeschlagen)',
        minMonate: 3,
        maxMonate: 12,
        auftau: 'Im Kühlschrank auftauen, sofort verwenden.',
        hinweis: 'Ganze Eier im Karton NICHT einfrieren – aufschlagen und in Eiswürfelformen frieren.',
      },
    },
  },
};

const VERPACKUNG_FAKTOREN: Record<string, { faktor: number; label: string; desc: string }> = {
  beutel: { faktor: 1.0, label: 'Gefrierbeutel', desc: 'Standard' },
  dose: { faktor: 1.0, label: 'Gefrierbox / Dose', desc: 'Lichtschutz' },
  alufolie: { faktor: 0.8, label: 'Alufolie', desc: 'Weniger geeignet' },
  vakuum: { faktor: 1.5, label: 'Vakuumiert', desc: '+50 % Haltbarkeit' },
};

// ────────────────────────────────────────────────────────────────────────────
// Hilfsfunktionen
// ────────────────────────────────────────────────────────────────────────────

function toDateString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' });
}

// ────────────────────────────────────────────────────────────────────────────
// Komponente
// ────────────────────────────────────────────────────────────────────────────

export default function GefrierdauerRechner() {
  // SSR-sicher: kein new Date() beim ersten Render
  const [mounted, setMounted] = useState(false);
  const [kategorie, setKategorie] = useState('fleisch');
  const [lebensmittelKey, setLebensmittelKey] = useState('hackfleisch');
  const [verpackung, setVerpackung] = useState('beutel');
  const [einfrierDatum, setEinfrierDatum] = useState('');

  // Heute erst nach Mount setzen (SSR-sicher)
  useEffect(() => {
    setMounted(true);
    setEinfrierDatum(toDateString(new Date()));
  }, []);

  // Wenn Kategorie wechselt → ersten Key der neuen Kategorie setzen
  useEffect(() => {
    const keys = Object.keys(KATEGORIEN[kategorie].items);
    setLebensmittelKey(keys[0]);
  }, [kategorie]);

  // ── Berechnung ─────────────────────────────────────────────────────────
  const lm = KATEGORIEN[kategorie]?.items[lebensmittelKey];
  const vp = VERPACKUNG_FAKTOREN[verpackung];

  let ergebnis = '';
  let haltbarBisMin: Date | null = null;
  let haltbarBisMax: Date | null = null;
  let verbleibendMin = 0;
  let verbleibendMax = 0;
  let ampel: 'gruen' | 'gelb' | 'rot' = 'gruen';

  if (mounted && lm && vp && einfrierDatum) {
    const einfrDate = new Date(einfrierDatum);
    const minMonate = lm.minMonate * vp.faktor;
    const maxMonate = lm.maxMonate * vp.faktor;
    haltbarBisMin = addMonths(einfrDate, minMonate);
    haltbarBisMax = addMonths(einfrDate, maxMonate);

    const heute = new Date();
    heute.setHours(0, 0, 0, 0);
    verbleibendMin = daysBetween(heute, haltbarBisMin);
    verbleibendMax = daysBetween(heute, haltbarBisMax);

    if (verbleibendMax <= 0) {
      ampel = 'rot';
    } else if (verbleibendMax <= 30) {
      ampel = 'gelb';
    } else {
      ampel = 'gruen';
    }

    ergebnis = `${lm.name} eingefroren am ${formatDate(einfrDate)}: Haltbar bis ${formatDate(haltbarBisMin)}–${formatDate(haltbarBisMax)} (noch ${verbleibendMin}–${verbleibendMax} Tage). Verpackung: ${vp.label}.`;
  }

  // ── Ampel-Styles ────────────────────────────────────────────────────────
  const ampelConfig = {
    gruen: {
      bg: 'bg-green-50 border-green-300',
      dot: 'bg-green-500',
      text: 'text-green-800',
      label: 'Noch gut haltbar',
    },
    gelb: {
      bg: 'bg-amber-50 border-amber-300',
      dot: 'bg-amber-500',
      text: 'text-amber-800',
      label: 'Bald verbrauchen',
    },
    rot: {
      bg: 'bg-red-50 border-red-300',
      dot: 'bg-red-500',
      text: 'text-red-800',
      label: 'Haltbarkeit überschritten',
    },
  };

  const ac = ampelConfig[ampel];

  return (
    <div className="space-y-6">
      {/* ── Eingaben ──────────────────────────────────────────────────── */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-5">
        <h2 className="text-lg font-semibold text-gray-800">Lebensmittel & Verpackung</h2>

        {/* Kategorie */}
        <div className="space-y-1.5">
          <label htmlFor="kategorie" className="block text-sm font-medium text-gray-700">
            Kategorie
          </label>
          <select
            id="kategorie"
            value={kategorie}
            onChange={e => setKategorie(e.target.value)}
            className="w-full min-h-[48px] rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(KATEGORIEN).map(([key, kat]) => (
              <option key={key} value={key}>
                {kat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Lebensmittel */}
        <div className="space-y-1.5">
          <label htmlFor="lebensmittel" className="block text-sm font-medium text-gray-700">
            Lebensmittel
          </label>
          <select
            id="lebensmittel"
            value={lebensmittelKey}
            onChange={e => setLebensmittelKey(e.target.value)}
            className="w-full min-h-[48px] rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(KATEGORIEN[kategorie].items).map(([key, item]) => (
              <option key={key} value={key}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* Verpackung */}
        <div className="space-y-1.5">
          <label htmlFor="verpackung" className="block text-sm font-medium text-gray-700">
            Verpackung
          </label>
          <select
            id="verpackung"
            value={verpackung}
            onChange={e => setVerpackung(e.target.value)}
            className="w-full min-h-[48px] rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Object.entries(VERPACKUNG_FAKTOREN).map(([key, vf]) => (
              <option key={key} value={key}>
                {vf.label} – {vf.desc}
              </option>
            ))}
          </select>
        </div>

        {/* Einfriedatum */}
        <div className="space-y-1.5">
          <label htmlFor="einfrierDatum" className="block text-sm font-medium text-gray-700">
            Einfriedatum
          </label>
          <input
            id="einfrierDatum"
            type="date"
            value={einfrierDatum}
            onChange={e => setEinfrierDatum(e.target.value)}
            className="w-full min-h-[48px] rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* ── Ergebnis ──────────────────────────────────────────────────── */}
      {mounted && lm && vp && einfrierDatum && haltbarBisMin && haltbarBisMax && (
        <div
          aria-live="polite"
          aria-atomic="true"
          className={`border-2 rounded-2xl p-6 space-y-4 ${ac.bg}`}
        >
          {/* Ampel-Header */}
          <div className="flex items-center gap-3">
            <span className={`w-4 h-4 rounded-full flex-shrink-0 ${ac.dot}`} aria-hidden="true" />
            <span className={`font-semibold text-base ${ac.text}`}>{ac.label}</span>
          </div>

          {/* Datum groß */}
          <div className="text-center py-2">
            <p className="text-sm text-gray-600 mb-1">Haltbar bis (empfohlen)</p>
            <p className={`text-2xl font-bold ${ac.text}`}>
              {formatDate(haltbarBisMin)} – {formatDate(haltbarBisMax)}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {verbleibendMax <= 0 ? (
                <span className="text-red-600 font-medium">Haltbarkeit abgelaufen</span>
              ) : (
                <>
                  noch ca.{' '}
                  <strong>
                    {verbleibendMin}–{verbleibendMax} Tage
                  </strong>
                </>
              )}
            </p>
          </div>

          {/* Verpackungsbonus */}
          {verpackung === 'vakuum' && (
            <p className="text-sm text-green-700 bg-green-100 rounded-lg px-3 py-2">
              Vakuumverpackung verlängert die Haltbarkeit um ca. 50 %.
            </p>
          )}
          {verpackung === 'alufolie' && (
            <p className="text-sm text-amber-700 bg-amber-100 rounded-lg px-3 py-2">
              Alufolie schützt weniger zuverlässig als Gefrierbeutel. Die Haltbarkeit kann kürzer ausfallen.
            </p>
          )}

          {/* Produkthinweis */}
          {lm.hinweis && (
            <p className="text-sm text-gray-700 bg-white/60 rounded-lg px-3 py-2">
              <strong>Hinweis:</strong> {lm.hinweis}
            </p>
          )}

          {/* Auftau-Tipp */}
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm font-semibold text-gray-700 mb-1">Auftau-Tipp</p>
            <p className="text-sm text-gray-700">{lm.auftau}</p>
          </div>

          {/* Haltbarkeits-Balken */}
          <HaltbarkeitsBalken
            einfrierDatum={new Date(einfrierDatum)}
            haltbarBisMin={haltbarBisMin}
            haltbarBisMax={haltbarBisMax}
          />

          <ErgebnisAktionen ergebnisText={ergebnis} />
        </div>
      )}

      {mounted && lm && vp && einfrierDatum && haltbarBisMin && haltbarBisMax && (
        <AiExplain
          rechnerName="Gefrierdauer-Rechner"
          eingaben={{
            lebensmittel: lm.name,
            verpackung: vp.label,
            einfriedatum: einfrierDatum,
          }}
          ergebnis={{
            haltbarBisMin: haltbarBisMin ? formatDate(haltbarBisMin) : '',
            haltbarBisMax: haltbarBisMax ? formatDate(haltbarBisMax) : '',
            verbleibendMin,
            verbleibendMax,
            status: ampel,
          }}
        />
      )}

      {/* ── Richtwerte-Tabelle ─────────────────────────────────────────── */}
      <RichtwertTabelle aktuelleKategorie={kategorie} aktuellerKey={lebensmittelKey} />

      {/* ── Tipps ──────────────────────────────────────────────────────── */}
      <Tipps />
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Haltbarkeits-Balken
// ────────────────────────────────────────────────────────────────────────────

function HaltbarkeitsBalken({
  einfrierDatum,
  haltbarBisMin,
  haltbarBisMax,
}: {
  einfrierDatum: Date;
  haltbarBisMin: Date;
  haltbarBisMax: Date;
}) {
  const heute = new Date();
  heute.setHours(0, 0, 0, 0);

  const gesamtDauer = daysBetween(einfrierDatum, haltbarBisMax);
  if (gesamtDauer <= 0) return null;

  const vergangen = Math.max(0, daysBetween(einfrierDatum, heute));
  const prozenVergangen = Math.min(100, (vergangen / gesamtDauer) * 100);

  // Grün-Zone bis minMonate, Gelb bis maxMonate
  const gruenEnde = (daysBetween(einfrierDatum, haltbarBisMin) / gesamtDauer) * 100;

  return (
    <div className="space-y-1">
      <p className="text-xs text-gray-600">Haltbarkeits-Zeitstrahl</p>
      <div className="relative h-4 rounded-full overflow-hidden bg-gray-100">
        {/* Grüner Bereich */}
        <div
          className="absolute inset-y-0 left-0 bg-green-400 opacity-50"
          style={{ width: `${gruenEnde}%` }}
        />
        {/* Gelber Bereich */}
        <div
          className="absolute inset-y-0 bg-amber-400 opacity-50"
          style={{ left: `${gruenEnde}%`, width: `${100 - gruenEnde}%` }}
        />
        {/* Heute-Marker */}
        {prozenVergangen > 0 && prozenVergangen <= 100 && (
          <div
            className="absolute inset-y-0 w-0.5 bg-gray-800"
            style={{ left: `${prozenVergangen}%` }}
            aria-label="Heute"
          />
        )}
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        <span>Eingefroren</span>
        <span>Opt. Verbrauch</span>
        <span>Max. Haltbar</span>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Richtwerte-Tabelle
// ────────────────────────────────────────────────────────────────────────────

function RichtwertTabelle({
  aktuelleKategorie,
  aktuellerKey,
}: {
  aktuelleKategorie: string;
  aktuellerKey: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <h2 className="text-base font-semibold text-gray-800 mb-4">
        Richtwerte: {KATEGORIEN[aktuelleKategorie].label}
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 pr-4 text-gray-600 font-medium">Lebensmittel</th>
              <th className="text-right py-2 px-2 text-gray-600 font-medium">Haltbarkeit</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(KATEGORIEN[aktuelleKategorie].items).map(([key, item]) => (
              <tr
                key={key}
                className={`border-b border-gray-100 last:border-0 ${
                  key === aktuellerKey ? 'bg-blue-50' : ''
                }`}
              >
                <td className="py-2 pr-4 text-gray-800">
                  {key === aktuellerKey ? (
                    <strong>{item.name}</strong>
                  ) : (
                    item.name
                  )}
                </td>
                <td className="py-2 px-2 text-right text-gray-700">
                  {item.minMonate === item.maxMonate
                    ? `${item.minMonate} Monat${item.minMonate !== 1 ? 'e' : ''}`
                    : `${item.minMonate}–${item.maxMonate} Monate`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-500 mt-3">
        Angaben gelten für Standardverpackung. Vakuumieren verlängert um ca. 50 %.
      </p>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Allgemeine Einfrierttipps
// ────────────────────────────────────────────────────────────────────────────

function Tipps() {
  const tipps = [
    {
      icon: '❄️',
      titel: 'Richtig beschriften',
      text: 'Datum und Inhalt auf den Beutel schreiben – nach 2–3 Monaten ist vieles nicht mehr erkennbar.',
    },
    {
      icon: '🌡️',
      titel: 'Temperatur: −18 °C',
      text: 'Erst bei mindestens −18 °C stoppt Bakterienwachstum vollständig. Tiefkühlfach prüfen!',
    },
    {
      icon: '📦',
      titel: 'Portionen einfrieren',
      text: 'In Portionsgrößen einfrieren – so tauen Sie nur auf, was Sie brauchen.',
    },
    {
      icon: '🚫',
      titel: 'Nicht doppelt einfrieren',
      text: 'Aufgetaute Lebensmittel niemals erneut einfrieren – Gefahr durch Keimvermehrung.',
    },
    {
      icon: '⚡',
      titel: 'Schnell einfrieren',
      text: 'Schockfrosten (Schnellgefrieren) erhält Qualität besser als langsames Einfrieren.',
    },
    {
      icon: '✅',
      titel: 'Auftauen im Kühlschrank',
      text: 'Ideal ist langsames Auftauen im Kühlschrank. Niemals Fleisch bei Raumtemperatur auftauen.',
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <h2 className="text-base font-semibold text-gray-800 mb-4">Tipps zum Einfrieren & Auftauen</h2>
      <ul className="space-y-3">
        {tipps.map((t) => (
          <li key={t.titel} className="flex gap-3">
            <span className="text-xl flex-shrink-0" aria-hidden="true">
              {t.icon}
            </span>
            <div>
              <p className="text-sm font-medium text-gray-800">{t.titel}</p>
              <p className="text-sm text-gray-600">{t.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
