import { berechneBruttoNetto, type BruttoNettoEingabe, type BruttoNettoErgebnis } from './brutto-netto';
import { KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT } from './sv-parameter';

export interface TeilzeitEingabe {
  vollzeitBrutto: number;
  vollzeitStunden: number;
  teilzeitStunden: number;
  steuerklasse: 1 | 2 | 3 | 4 | 5 | 6;
  bundesland: string;
  kirchensteuer: boolean;
  urlaubstageVollzeit: number;
  arbeitstageProWocheTeilzeit: number; // 3, 4 oder 5
  /** Arbeitstage/Woche in Vollzeit (Default 5; 6 bei Einzelhandel / Gastronomie). */
  arbeitstageProWocheVollzeit?: number;
}

export interface TeilzeitErgebnis {
  teilzeitFaktor: number;
  vollzeitBrutto: number;
  teilzeitBrutto: number;
  bruttoDifferenz: number;
  vollzeitNetto: number;
  teilzeitNetto: number;
  nettoDifferenz: number;
  nettoDifferenzProzent: number;
  bruttoDifferenzProzent: number;
  stundenlohn: number;
  urlaubstageTeilzeit: number;
  jahresBruttoVollzeit: number;
  jahresBruttoTeilzeit: number;
  jahresNettoVollzeit: number;
  jahresNettoTeilzeit: number;
  jahresNettoDifferenz: number;
  vollzeitDetails: BruttoNettoErgebnis;
  teilzeitDetails: BruttoNettoErgebnis;
}

function kirchensteuersatz(bundesland: string): 8 | 9 {
  return (bundesland === 'BY' || bundesland === 'BW') ? 8 : 9;
}

// § 5 Abs. 2 BUrlG-konforme Rundung: Bruchteile ≥ 0,5 Tage auf, sonst ab.
// Identisch zu Implementation in urlaubstage.ts — SSOT-Konsolidierung offen für Prompt 113.
function rundeBuRlGKonform(tage: number): number {
  const ganz = Math.floor(tage);
  const rest = tage - ganz;
  return rest >= 0.5 ? ganz + 1 : ganz;
}

function makeBnEingabe(brutto: number, steuerklasse: TeilzeitEingabe['steuerklasse'], bundesland: string, kirchensteuer: boolean): BruttoNettoEingabe {
  return {
    bruttoMonat: brutto,
    steuerklasse,
    kirchensteuer,
    kirchensteuersatz: kirchensteuersatz(bundesland),
    kinderfreibetraege: 0,
    bundesland,
    kvArt: 'gesetzlich',
    kvZusatzbeitrag: KV_ZUSATZBEITRAG_VOLL_DURCHSCHNITT_2026_PROZENT,
    kvPrivatBeitrag: 0,
    rvBefreit: false,
    abrechnungszeitraum: 'monat',
  };
}

export function berechneTeilzeit(eingabe: TeilzeitEingabe): TeilzeitErgebnis | null {
  const { vollzeitBrutto, vollzeitStunden, teilzeitStunden, steuerklasse, bundesland, kirchensteuer, urlaubstageVollzeit, arbeitstageProWocheTeilzeit } = eingabe;
  const arbeitstageProWocheVollzeit = eingabe.arbeitstageProWocheVollzeit ?? 5;

  if (vollzeitBrutto <= 0 || vollzeitStunden <= 0 || teilzeitStunden <= 0) return null;
  if (teilzeitStunden > vollzeitStunden) return null;
  if (arbeitstageProWocheVollzeit < 1 || arbeitstageProWocheVollzeit > 7) return null;
  if (arbeitstageProWocheTeilzeit > arbeitstageProWocheVollzeit) return null;

  const teilzeitFaktor = teilzeitStunden / vollzeitStunden;
  const teilzeitBrutto = Math.round(vollzeitBrutto * teilzeitFaktor * 100) / 100;

  // Netto über bestehende Brutto-Netto-Logik
  const vollzeitErgebnis = berechneBruttoNetto(makeBnEingabe(vollzeitBrutto, steuerklasse, bundesland, kirchensteuer));
  const teilzeitErgebnis = berechneBruttoNetto(makeBnEingabe(teilzeitBrutto, steuerklasse, bundesland, kirchensteuer));

  const vollzeitNetto = vollzeitErgebnis.nettoMonat;
  const teilzeitNetto = teilzeitErgebnis.nettoMonat;
  const nettoDifferenz = Math.round((vollzeitNetto - teilzeitNetto) * 100) / 100;
  const bruttoDifferenz = Math.round((vollzeitBrutto - teilzeitBrutto) * 100) / 100;

  const bruttoDifferenzProzent = vollzeitBrutto > 0
    ? Math.round((bruttoDifferenz / vollzeitBrutto) * 1000) / 10
    : 0;
  const nettoDifferenzProzent = vollzeitNetto > 0
    ? Math.round((nettoDifferenz / vollzeitNetto) * 1000) / 10
    : 0;

  // Stundenlohn (gleich für Voll- und Teilzeit)
  const wochenProMonat = 4.33;
  const stundenlohn = Math.round((vollzeitBrutto / (vollzeitStunden * wochenProMonat)) * 100) / 100;

  // Urlaubstage: BAG-konforme Umrechnung mit tatsächlicher Vollzeit-Arbeitstagesanzahl
  // (häufig 5, im Einzelhandel/Gastronomie auch 6). § 5 Abs. 2 BUrlG-Rundung.
  const urlaubstageTeilzeit = rundeBuRlGKonform(
    urlaubstageVollzeit * (arbeitstageProWocheTeilzeit / arbeitstageProWocheVollzeit),
  );

  return {
    teilzeitFaktor,
    vollzeitBrutto,
    teilzeitBrutto,
    bruttoDifferenz,
    vollzeitNetto,
    teilzeitNetto,
    nettoDifferenz,
    nettoDifferenzProzent,
    bruttoDifferenzProzent,
    stundenlohn,
    urlaubstageTeilzeit,
    jahresBruttoVollzeit: Math.round(vollzeitBrutto * 12 * 100) / 100,
    jahresBruttoTeilzeit: Math.round(teilzeitBrutto * 12 * 100) / 100,
    jahresNettoVollzeit: Math.round(vollzeitNetto * 12 * 100) / 100,
    jahresNettoTeilzeit: Math.round(teilzeitNetto * 12 * 100) / 100,
    jahresNettoDifferenz: Math.round(nettoDifferenz * 12 * 100) / 100,
    vollzeitDetails: vollzeitErgebnis,
    teilzeitDetails: teilzeitErgebnis,
  };
}
