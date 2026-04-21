export type Zeitraum = 'monatlich' | 'woechentlich' | 'taeglich';

export interface PfaendungEingabe {
  nettoMonat: number;
  unterhaltspflichten: number; // 0–5+
  zeitraum: Zeitraum;
  /**
   * Stichtag für die Pfändungstabelle. Default: aktuelles Datum.
   * Ab 01.07.2026 greift automatisch die Tabelle aus BGBl. 2026 I Nr. 80.
   */
  stichtag?: Date;
}

export interface PfaendungErgebnis {
  nettoMonat: number;
  zeitraum: Zeitraum;
  grundfreibetrag: number;
  erhoehungUnterhalt: number;
  gesamtFreibetrag: number;
  pfaendungsfrei: number;    // € (in gewähltem Zeitraum)
  pfaendbar: number;         // € (in gewähltem Zeitraum)
  pfaendbarProzent: number;  // Anteil am Nettoeinkommen
  mehrbetrag: number;        // zvE oberhalb Freibetrag
  pfaendungsQuote: number;   // % vom Mehrbetrag pfändbar
  ueberObergrenze: boolean;
  obergrenze: number;
  beispielTabelle: Array<{ netto: number; frei: number; pfaendbar: number }>;
  unterhaltspflichten: number;
}

/**
 * Pfändungsfreigrenzen nach § 850c ZPO
 *
 * Historie:
 * - 01.07.2023–30.06.2025: Grundfreibetrag 1.402,28 € (BGBl. 2023)
 * - 01.07.2025–30.06.2026: Grundfreibetrag 1.555,00 € (BGBl. 2025)
 * - 01.07.2026–30.06.2028: Grundfreibetrag 1.587,40 € (BGBl. 2026 I Nr. 80 v. 26.03.2026)
 *
 * Anpassung alle zwei Jahre zum 01.07. (§ 850c Abs. 4 ZPO), Kopplung an den
 * Grundfreibetrag nach § 32a EStG. Die amtliche Tabelle arbeitet mit 10-€-Stufen
 * und hat eigene Rundungslogik — wir nutzen die Pauschalquote aus § 850c Abs. 3 ZPO.
 */

export interface PfaendungsParameter {
  /** Unpfändbarer Grundbetrag ohne Unterhaltspflichten (€/Monat). */
  grundfreibetrag: number;
  /** Erhöhung für die 1. unterhaltsberechtigte Person (€/Monat). */
  unterhalt_1: number;
  /** Erhöhung je weitere unterhaltsberechtigte Person 2.–5. (€/Monat). */
  unterhalt_2_bis_5: number;
  /** Vollpfändungsgrenze: Nettoeinkommen, oberhalb dessen alles pfändbar ist (€/Monat). */
  vollpfaendung: number;
}

/** Werte 01.07.2025–30.06.2026 (BGBl. 2025). */
export const PFAENDUNG_2025: PfaendungsParameter = {
  grundfreibetrag: 1555.0,
  unterhalt_1: 585.23,
  unterhalt_2_bis_5: 326.04,
  vollpfaendung: 4771.49,
};

/** Werte ab 01.07.2026 (BGBl. 2026 I Nr. 80 v. 26.03.2026), gültig bis 30.06.2028. */
export const PFAENDUNG_2026: PfaendungsParameter = {
  grundfreibetrag: 1587.4,
  unterhalt_1: 597.42,
  unterhalt_2_bis_5: 332.83,
  vollpfaendung: 4866.3,
};

/**
 * Liefert die jeweils geltende Pfändungstabelle nach Stichtag.
 * Der Switch greift am 01.07.2026 automatisch.
 */
export function getAktuellePfaendungsParameter(
  stichtag: Date = new Date(),
): PfaendungsParameter {
  const switchDatum = new Date(2026, 6, 1); // 01.07.2026 (Monat 0-indexiert)
  return stichtag >= switchDatum ? PFAENDUNG_2026 : PFAENDUNG_2025;
}

/**
 * Backwards-Compat: liefert den tagesaktuellen Grundfreibetrag. Als Getter-
 * Funktion statt Modul-Scope-Konstante, damit der 01.07.-Stichtag-Switch
 * auch nach längerer Server-Laufzeit greift (Regressionsfalle-Pattern aus
 * Prompt 116 Midijob).
 */
export function getGrundfreibetrag(stichtag: Date = new Date()): number {
  return getAktuellePfaendungsParameter(stichtag).grundfreibetrag;
}

// Pfändungsquoten oberhalb des Freibetrags (§ 850c Abs. 3 ZPO, Pauschalquote).
const PFAENDUNGS_QUOTEN: Record<number, number> = {
  0: 0.7,
  1: 0.5,
  2: 0.4,
  3: 0.3,
  4: 0.2,
  5: 0.1,
};

function berechneFreibetrag(
  unterhalt: number,
  p: PfaendungsParameter,
): { grund: number; erhoehung: number; gesamt: number } {
  const u = Math.min(Math.max(Math.floor(unterhalt), 0), 5);
  let erhoehung = 0;
  if (u >= 1) erhoehung += p.unterhalt_1;
  if (u >= 2) erhoehung += (u - 1) * p.unterhalt_2_bis_5;
  return {
    grund: p.grundfreibetrag,
    erhoehung,
    gesamt: p.grundfreibetrag + erhoehung,
  };
}

function berechneObergrenze(unterhalt: number, p: PfaendungsParameter): number {
  const u = Math.min(Math.max(Math.floor(unterhalt), 0), 5);
  let erhoehung = 0;
  if (u >= 1) erhoehung += p.unterhalt_1;
  if (u >= 2) erhoehung += (u - 1) * p.unterhalt_2_bis_5;
  return p.vollpfaendung + erhoehung;
}

function berechnePfaendbarMonat(
  nettoMonat: number,
  unterhalt: number,
  p: PfaendungsParameter,
): { frei: number; pfaendbar: number; mehrbetrag: number; quote: number; ueberObergrenze: boolean } {
  const { gesamt: freibetrag } = berechneFreibetrag(unterhalt, p);
  const obergrenze = berechneObergrenze(unterhalt, p);
  const u = Math.min(Math.max(Math.floor(unterhalt), 0), 5);
  const quote = PFAENDUNGS_QUOTEN[u];

  if (nettoMonat <= freibetrag) {
    return { frei: nettoMonat, pfaendbar: 0, mehrbetrag: 0, quote, ueberObergrenze: false };
  }

  // Amtliche Pfändungstabelle (§ 850c ZPO Anlage) rundet das Netto auf die
  // nächstniedrigere 10-€-Stufe ab und berechnet darauf mit den Pauschalquoten
  // aus Abs. 3. Dieses Verfahren reproduziert die BGBl-Tabelle exakt —
  // ein separater Tabellen-Port ist dann nicht nötig.
  const nettoAufStufe = Math.floor(nettoMonat / 10) * 10;
  const mehrbetragStufe = Math.max(0, nettoAufStufe - freibetrag);
  const mehrbetrag = nettoMonat - freibetrag; // für Display, nicht für Rechnung
  let pfaendbar: number;
  let ueberObergrenze = false;

  if (nettoAufStufe >= obergrenze) {
    // Oberhalb Vollpfändungsgrenze: alles über Obergrenze zu 100 % + Pauschalquote
    // auf die Strecke [Freibetrag, Obergrenze]. Obergrenze wird nicht gerundet,
    // weil sie exakt aus Freibetrag + Unterhaltssätzen abgeleitet ist.
    const ueberGrenze = nettoMonat - obergrenze;
    const bisGrenze = obergrenze - freibetrag;
    pfaendbar = ueberGrenze + bisGrenze * quote;
    ueberObergrenze = true;
  } else {
    pfaendbar = mehrbetragStufe * quote;
  }

  pfaendbar = Math.round(pfaendbar * 100) / 100;
  const frei = Math.round((nettoMonat - pfaendbar) * 100) / 100;

  return { frei, pfaendbar, mehrbetrag, quote, ueberObergrenze };
}

function umrechnen(wertMonat: number, zeitraum: Zeitraum): number {
  switch (zeitraum) {
    case 'monatlich':    return wertMonat;
    case 'woechentlich': return wertMonat * 12 / 52;
    case 'taeglich':     return wertMonat * 12 / 365;
  }
}

export function berechnePfaendung(e: PfaendungEingabe): PfaendungErgebnis {
  const { nettoMonat, unterhaltspflichten, zeitraum, stichtag } = e;
  const p = getAktuellePfaendungsParameter(stichtag);
  const fb = berechneFreibetrag(unterhaltspflichten, p);
  const obergrenze = berechneObergrenze(unterhaltspflichten, p);
  const { frei, pfaendbar, mehrbetrag, quote, ueberObergrenze } = berechnePfaendbarMonat(nettoMonat, unterhaltspflichten, p);

  const pfaendbarProzent = nettoMonat > 0
    ? Math.round(pfaendbar / nettoMonat * 10000) / 100
    : 0;

  // Beispieltabelle: 5 Nettowerte rund um das aktuelle Einkommen
  const werte = [2000, 2500, 3000, 3500, 4000, 5000];
  const beispielTabelle = werte.map(netto => {
    const r = berechnePfaendbarMonat(netto, unterhaltspflichten, p);
    return {
      netto,
      frei: Math.round(umrechnen(r.frei, zeitraum) * 100) / 100,
      pfaendbar: Math.round(umrechnen(r.pfaendbar, zeitraum) * 100) / 100,
    };
  });

  return {
    nettoMonat,
    zeitraum,
    grundfreibetrag: Math.round(umrechnen(fb.grund, zeitraum) * 100) / 100,
    erhoehungUnterhalt: Math.round(umrechnen(fb.erhoehung, zeitraum) * 100) / 100,
    gesamtFreibetrag: Math.round(umrechnen(fb.gesamt, zeitraum) * 100) / 100,
    pfaendungsfrei: Math.round(umrechnen(frei, zeitraum) * 100) / 100,
    pfaendbar: Math.round(umrechnen(pfaendbar, zeitraum) * 100) / 100,
    pfaendbarProzent,
    mehrbetrag: Math.round(umrechnen(mehrbetrag, zeitraum) * 100) / 100,
    pfaendungsQuote: Math.round(quote * 100),
    ueberObergrenze,
    obergrenze: Math.round(umrechnen(obergrenze, zeitraum) * 100) / 100,
    beispielTabelle,
    unterhaltspflichten: Math.min(Math.max(Math.floor(unterhaltspflichten), 0), 5),
  };
}
