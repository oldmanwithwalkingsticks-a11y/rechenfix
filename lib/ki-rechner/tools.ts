import { berechneZinsen, type ZinsEingabe } from '@/lib/berechnungen/zinsen';
import { berechneBmi, type BmiEingabe } from '@/lib/berechnungen/bmi';
import { berechneKfzSteuer, type KfzSteuerEingabe } from '@/lib/berechnungen/kfz-steuer';

// Ein Tool = Anthropic-Tool-Definition + interner Ausführer + Ziel-Slug für Verlinkung.
export interface KiTool {
  name: string;
  description: string;
  input_schema: Record<string, unknown>; // JSON-Schema (type:'object', properties, required)
  rechnerSlug: string;                    // z.B. 'finanzen/zinsrechner'
  run: (input: unknown) => unknown;       // ruft die verifizierte lib-Funktion auf
}

export const KI_TOOLS: KiTool[] = [
  {
    name: 'berechne_zinsen',
    description: 'Berechnet Zinsen/Zinseszins und Endkapital für eine Geldanlage oder Sparplan. Nutze dies bei Fragen zu Zinsen, Zinseszins, Festgeld, Tagesgeld, Kapitalwachstum.',
    input_schema: {
      type: 'object',
      properties: {
        anfangskapital: { type: 'number', description: 'Startkapital in Euro' },
        zinssatz: { type: 'number', description: 'Zinssatz in Prozent pro Jahr' },
        laufzeit: { type: 'number', description: 'Laufzeit in Jahren' },
        zinseszins: { type: 'boolean', description: 'true = Zinseszins, false = einfache Zinsen' },
        sparrate: { type: 'number', description: 'Monatliche Sparrate in Euro (0 wenn keine)' },
      },
      required: ['anfangskapital', 'zinssatz', 'laufzeit', 'zinseszins', 'sparrate'],
    },
    rechnerSlug: 'finanzen/zinsrechner',
    run: (i) => berechneZinsen(i as ZinsEingabe),
  },
  {
    name: 'berechne_bmi',
    description: 'Berechnet den Body-Mass-Index (BMI) und die Gewichtskategorie aus Gewicht und Größe. Nutze dies bei Fragen zu BMI, Körpergewicht, Idealgewicht, Über- oder Untergewicht.',
    input_schema: {
      type: 'object',
      properties: {
        gewicht: { type: 'number', description: 'Körpergewicht in Kilogramm' },
        groesse: { type: 'number', description: 'Körpergröße in Zentimetern' },
        geschlecht: { type: 'string', enum: ['maennlich', 'weiblich'], description: 'Geschlecht der Person' },
        alter: { type: 'number', description: 'Alter in Jahren (optional, für altersadjustierten Optimalbereich)' },
      },
      required: ['gewicht', 'groesse', 'geschlecht'],
    },
    rechnerSlug: 'gesundheit/bmi-rechner',
    run: (i) => berechneBmi(i as BmiEingabe),
  },
  {
    name: 'berechne_kfz_steuer',
    description: 'Berechnet die jährliche Kfz-Steuer aus Hubraum, Antriebsart, CO₂-Ausstoß und Zulassungszeitraum. Nutze dies bei Fragen zur Kfz-Steuer, Autosteuer, Fahrzeugsteuer.',
    input_schema: {
      type: 'object',
      properties: {
        zulassung: { type: 'string', enum: ['vor-2009', 'nach-2009'], description: 'Zulassungszeitraum des Fahrzeugs' },
        antrieb: { type: 'string', enum: ['benzin', 'diesel', 'elektro', 'hybrid'], description: 'Antriebsart des Fahrzeugs' },
        hubraum: { type: 'number', description: 'Hubraum in Kubikzentimetern (ccm)' },
        co2: { type: 'number', description: 'CO₂-Ausstoß in Gramm pro Kilometer (g/km)' },
      },
      required: ['zulassung', 'antrieb', 'hubraum', 'co2'],
    },
    rechnerSlug: 'auto/kfz-steuer-rechner',
    run: (i) => berechneKfzSteuer(i as KfzSteuerEingabe),
  },
];

// Findet Tool per Name, führt es aus, fängt null + Exceptions ab.
export function dispatchTool(name: string, input: unknown):
  { ok: true; slug: string; result: unknown } | { ok: false; error: string } {
  const tool = KI_TOOLS.find((t) => t.name === name);
  if (!tool) return { ok: false, error: `Unbekanntes Tool: ${name}` };
  try {
    const result = tool.run(input);
    if (result === null || result === undefined) {
      return { ok: false, error: 'Berechnung nicht möglich — Eingabe unvollständig oder ungültig. Bitte fehlende/plausible Werte erfragen.' };
    }
    return { ok: true, slug: tool.rechnerSlug, result };
  } catch {
    return { ok: false, error: 'Interner Berechnungsfehler.' };
  }
}
