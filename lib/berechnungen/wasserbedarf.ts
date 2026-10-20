export type AktivitaetsLevel = 'kaum' | 'leicht' | 'maessig' | 'sehr' | 'extrem';
export type SchwangerStillend = 'nein' | 'schwanger' | 'stillend';

/**
 * W187: vorher galt das Ergebnis als „reine Trinkmenge“. Die 30–35 ml/kg sind aber nach den
 * D-A-CH-Referenzwerten die Gesamtwasserzufuhr (Getränke + Wasser aus fester Nahrung +
 * Oxidationswasser). Davon entfallen bei Erwachsenen von 19 bis unter 65 Jahren 54–55 % auf
 * Getränke (19–<25: 1.470 von 2.700 ml, 25–<51: 1.410 von 2.600 ml, 51–<65: 1.230 von 2.250 ml;
 * ab 65: 1.310 von 2.250 ml = 58 %). Quelle: DGE/ÖGE/SGE, D-A-CH-Referenzwerte für die
 * Nährstoffzufuhr, Richtwerte Wasser (Tabelle z. B. bei vis.bayern.de, richtwerte_fuer_zufuhr_wasser_akt.pdf).
 *
 * Einheitlicher Ansatz für Wasserbedarf- und Trinkmenge-Rechner:
 *   Trinkmenge = Grundbedarf × GETRAENKE_ANTEIL + Zuschläge für Schweißverluste (Sport, Hitze) voll.
 * Der Anteil gilt auch für Zuschläge, die den Gesamtbedarf erhöhen (Schwangerschaft/Stillzeit);
 * Sport- und Hitzezuschläge gleichen Schweiß aus und werden vollständig getrunken.
 */
export const GETRAENKE_ANTEIL = 0.54;

export interface WasserbedarfEingabe {
  gewicht: number;
  aktivitaet: AktivitaetsLevel;
  sportMinuten: number;
  heiss: boolean;
  schwangerStillend: SchwangerStillend;
}

export interface WasserbedarfErgebnis {
  basisbedarf: number;       // ml
  sportZuschlag: number;     // ml
  hitzeZuschlag: number;     // ml
  schwangerZuschlag: number; // ml
  gesamtMl: number;          // Gesamtbedarf (Getränke + Nahrung + Oxidationswasser)
  gesamtLiter: number;
  trinkmengeMl: number;      // W187: davon über Getränke
  trinkmengeLiter: number;
  anzahlGlaeser: number;     // à 250 ml, W187: vorher auf den Gesamtbedarf bezogen, jetzt auf die Trinkmenge
}

const AKTIVITAETS_FAKTOREN: Record<AktivitaetsLevel, number> = {
  kaum: 30,
  leicht: 35,
  maessig: 40,
  sehr: 45,
  extrem: 50,
};

/**
 * W187: Trinkmenge aus Getränken (ml) nach dem einheitlichen Ansatz.
 * grundMl: Teil des Gesamtbedarfs, der anteilig auch über Nahrung/Oxidationswasser gedeckt wird.
 * schweissMl: Zuschläge für Schweißverluste (Sport, Hitze), vollständig zu trinken.
 */
export function trinkmengeAusBedarf(grundMl: number, schweissMl: number): number {
  return grundMl * GETRAENKE_ANTEIL + schweissMl;
}

export function berechneWasserbedarf(eingabe: WasserbedarfEingabe): WasserbedarfErgebnis | null {
  const { gewicht, aktivitaet, sportMinuten, heiss, schwangerStillend } = eingabe;

  if (gewicht <= 0) return null;

  const faktor = AKTIVITAETS_FAKTOREN[aktivitaet];
  const basisbedarf = gewicht * faktor;

  const sportZuschlag = sportMinuten > 0 ? (sportMinuten / 30) * 350 : 0;

  const hitzeZuschlag = heiss ? 500 : 0;

  let schwangerZuschlag = 0;
  if (schwangerStillend === 'schwanger') schwangerZuschlag = 300;
  if (schwangerStillend === 'stillend') schwangerZuschlag = 700;

  const gesamtMl = basisbedarf + sportZuschlag + hitzeZuschlag + schwangerZuschlag;
  const gesamtLiter = Math.round(gesamtMl / 100) / 10; // 1 Dezimalstelle
  // W187: vorher Gläser = Gesamtbedarf ÷ 250; jetzt Trinkmenge (Getränke-Anteil) ÷ 250
  const trinkmengeMl = trinkmengeAusBedarf(basisbedarf + schwangerZuschlag, sportZuschlag + hitzeZuschlag);
  const trinkmengeLiter = Math.round(trinkmengeMl / 100) / 10;
  const anzahlGlaeser = Math.ceil(trinkmengeMl / 250);

  return {
    basisbedarf: Math.round(basisbedarf),
    sportZuschlag: Math.round(sportZuschlag),
    hitzeZuschlag,
    schwangerZuschlag,
    gesamtMl: Math.round(gesamtMl),
    gesamtLiter,
    trinkmengeMl: Math.round(trinkmengeMl),
    trinkmengeLiter,
    anzahlGlaeser,
  };
}

/**
 * W187: Trinkmenge-Rechner (Sport-Kategorie) — vorher Inline-Logik in TrinkmengeRechner.tsx,
 * Ergebnis als „Empfohlene Trinkmenge“ beschriftet, obwohl es der Gesamtbedarf ist.
 * Basis = Gewicht × 33 (Männer) bzw. 31 ml/kg (Frauen), Klima-Faktor 1,0/1,1/1,2 auf die Basis,
 * Sport-Bonus (Minuten ÷ 30) × 350 ml. Trinkmenge: Basis × 54 % + Klima-Mehrbedarf + Sport-Bonus.
 */
export interface TrinkmengeErgebnis {
  basis: number;       // ml, ohne Klima
  klimaZuschlag: number; // ml, Basis × (Klima-Faktor − 1)
  bonus: number;       // ml, Sport
  gesamtMl: number;
  gesamtL: number;
  trinkMl: number;
  trinkL: number;
}

export function berechneTrinkmenge(gewichtKg: number, faktorKg: number, sportMinuten: number, klimaFaktor: number): TrinkmengeErgebnis | null {
  if (gewichtKg <= 0) return null;
  const basis = gewichtKg * faktorKg;
  const bonus = Math.max(0, sportMinuten) / 30 * 350;
  const klimaZuschlag = basis * (klimaFaktor - 1);
  const gesamtMl = basis * klimaFaktor + bonus;
  const trinkMl = trinkmengeAusBedarf(basis, klimaZuschlag + bonus);
  return { basis, klimaZuschlag, bonus, gesamtMl, gesamtL: gesamtMl / 1000, trinkMl, trinkL: trinkMl / 1000 };
}
