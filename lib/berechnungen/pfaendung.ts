export type Zeitraum = 'monatlich' | 'woechentlich' | 'taeglich';

export interface PfaendungEingabe {
  nettoMonat: number;
  unterhaltspflichten: number; // 0–5+
  zeitraum: Zeitraum;
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

// Pfändungstabelle § 850c ZPO, gültig ab 01.07.2025 (Turnus: alle 2 Jahre, nächste Anpassung 01.07.2026)
const GRUNDFREIBETRAG = 1555.99;          // monatlich, 0 Unterhaltspflichten
const ERHOEHUNG_1 = 585.59;                // für 1. unterhaltsberechtigte Person
const ERHOEHUNG_WEITERE = 326.04;          // für jede weitere unterhaltsberechtigte Person (2.–5.)
const OBERGRENZE_0 = 4573.10;              // Obergrenze, oberhalb → alles pfändbar (0 Unterhalt)

// Pfändungsquoten oberhalb des Freibetrags (§ 850c Abs. 3 ZPO, Pauschalquote)
const PFAENDUNGS_QUOTEN: Record<number, number> = {
  0: 0.7,
  1: 0.5,
  2: 0.4,
  3: 0.3,
  4: 0.2,
  5: 0.1,
};

function berechneFreibetrag(unterhalt: number): { grund: number; erhoehung: number; gesamt: number } {
  const u = Math.min(Math.max(Math.floor(unterhalt), 0), 5);
  let erhoehung = 0;
  if (u >= 1) erhoehung += ERHOEHUNG_1;
  if (u >= 2) erhoehung += (u - 1) * ERHOEHUNG_WEITERE;
  return {
    grund: GRUNDFREIBETRAG,
    erhoehung,
    gesamt: GRUNDFREIBETRAG + erhoehung,
  };
}

function berechneObergrenze(unterhalt: number): number {
  const u = Math.min(Math.max(Math.floor(unterhalt), 0), 5);
  let erhoehung = 0;
  if (u >= 1) erhoehung += ERHOEHUNG_1;
  if (u >= 2) erhoehung += (u - 1) * ERHOEHUNG_WEITERE;
  return OBERGRENZE_0 + erhoehung;
}

function berechnePfaendbarMonat(nettoMonat: number, unterhalt: number): { frei: number; pfaendbar: number; mehrbetrag: number; quote: number; ueberObergrenze: boolean } {
  const { gesamt: freibetrag } = berechneFreibetrag(unterhalt);
  const obergrenze = berechneObergrenze(unterhalt);
  const u = Math.min(Math.max(Math.floor(unterhalt), 0), 5);
  const quote = PFAENDUNGS_QUOTEN[u];

  if (nettoMonat <= freibetrag) {
    return { frei: nettoMonat, pfaendbar: 0, mehrbetrag: 0, quote, ueberObergrenze: false };
  }

  const mehrbetrag = nettoMonat - freibetrag;
  let pfaendbar: number;
  let ueberObergrenze = false;

  if (nettoMonat >= obergrenze) {
    // Pfändbar = alles oberhalb Obergrenze (zu 100%) + Pauschalquote bis Obergrenze
    const ueberGrenze = nettoMonat - obergrenze;
    const bisGrenze = obergrenze - freibetrag;
    pfaendbar = ueberGrenze + bisGrenze * quote;
    ueberObergrenze = true;
  } else {
    pfaendbar = mehrbetrag * quote;
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
  const { nettoMonat, unterhaltspflichten, zeitraum } = e;
  const fb = berechneFreibetrag(unterhaltspflichten);
  const obergrenze = berechneObergrenze(unterhaltspflichten);
  const { frei, pfaendbar, mehrbetrag, quote, ueberObergrenze } = berechnePfaendbarMonat(nettoMonat, unterhaltspflichten);

  const pfaendbarProzent = nettoMonat > 0
    ? Math.round(pfaendbar / nettoMonat * 10000) / 100
    : 0;

  // Beispieltabelle: 5 Nettowerte rund um das aktuelle Einkommen
  const werte = [2000, 2500, 3000, 3500, 4000, 5000];
  const beispielTabelle = werte.map(netto => {
    const r = berechnePfaendbarMonat(netto, unterhaltspflichten);
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
