export type Scheidungsart = 'einvernehmlich' | 'streitig';

export interface ScheidungskostenEingabe {
  nettoeinkommenGesamt: number; // €/Monat (beide Ehepartner)
  art: Scheidungsart;
  versorgungsausgleich: boolean;
  zugewinnausgleich: boolean;
  unterhalt: boolean;
  sorgerecht: boolean;
  ehewohnung: boolean;
}

export interface ScheidungskostenErgebnis {
  verfahrenswertBasis: number;
  verfahrenswertVA: number;
  verfahrenswertFolgesachen: number;
  verfahrenswertGesamt: number;

  gebuehrEinfach: number;     // 1,0-Gebühr (Tabelle)
  gerichtskosten: number;     // 2,0 Gebühren

  verfahrensgebuehr: number;  // 1,3 RVG
  terminsgebuehr: number;     // 1,2 RVG
  einigungsgebuehr: number;   // 1,0 RVG (nur einvernehmlich)
  auslagenpauschale: number;
  anwaltNetto: number;
  mwst: number;
  anwaltBrutto: number;

  anzahlAnwaelte: number;
  anwaltskostenGesamt: number;

  gesamtkosten: number;
  proPerson: number;

  // Vergleichswerte
  gesamtkostenEinvernehmlich: number;
  gesamtkostenStreitig: number;
  ersparnisEinvernehmlich: number;
  ersparnisProzent: number;
}

// Gebührentabelle FamGKG / GKG (1,0-Gebühr)
const GEBUEHREN_TABELLE: { bis: number; gebuehr: number }[] = [
  { bis:   500, gebuehr:  38 },
  { bis:  1000, gebuehr:  58 },
  { bis:  1500, gebuehr:  78 },
  { bis:  2000, gebuehr:  98 },
  { bis:  3000, gebuehr: 119 },
  { bis:  4000, gebuehr: 131 },
  { bis:  5000, gebuehr: 143 },
  { bis:  6000, gebuehr: 155 },
  { bis:  7000, gebuehr: 167 },
  { bis:  8000, gebuehr: 179 },
  { bis:  9000, gebuehr: 191 },
  { bis: 10000, gebuehr: 203 },
  { bis: 13000, gebuehr: 239 },
  { bis: 16000, gebuehr: 275 },
  { bis: 19000, gebuehr: 311 },
  { bis: 22000, gebuehr: 347 },
  { bis: 25000, gebuehr: 383 },
  { bis: 30000, gebuehr: 440 },
  { bis: 35000, gebuehr: 499 },
  { bis: 40000, gebuehr: 558 },
  { bis: 45000, gebuehr: 617 },
  { bis: 50000, gebuehr: 676 },
];

function gebuehrFuerWert(wert: number): number {
  for (const stufe of GEBUEHREN_TABELLE) {
    if (wert <= stufe.bis) return stufe.gebuehr;
  }
  // Über 50.000: jede weiteren 5.000 € ≈ +59 €
  const ueber = wert - 50000;
  const stufen = Math.ceil(ueber / 5000);
  return 676 + stufen * 59;
}

function rund2(n: number): number {
  return Math.round(n * 100) / 100;
}

function berechneEineScheidung(eingabe: ScheidungskostenEingabe, art: Scheidungsart) {
  // === VERFAHRENSWERT ===
  const verfahrenswertBasis = Math.max(3000, eingabe.nettoeinkommenGesamt * 3);

  const verfahrenswertVA = eingabe.versorgungsausgleich
    ? Math.round(verfahrenswertBasis * 0.1)
    : 0;

  // Folgesachen (nur relevant bei streitig)
  let folgesachen = 0;
  if (art === 'streitig') {
    if (eingabe.zugewinnausgleich) folgesachen += Math.round(verfahrenswertBasis * 0.2);
    if (eingabe.unterhalt)         folgesachen += Math.round(verfahrenswertBasis * 0.15);
    if (eingabe.sorgerecht)        folgesachen += 4000;
    if (eingabe.ehewohnung)        folgesachen += 4000;
  }

  const verfahrenswertGesamt = verfahrenswertBasis + verfahrenswertVA + folgesachen;

  // === GEBÜHREN ===
  const gebuehrEinfach = gebuehrFuerWert(verfahrenswertGesamt);
  const gerichtskosten = gebuehrEinfach * 2; // 2,0 Gebühren

  // === ANWALT (RVG) ===
  const verfahrensgebuehr = rund2(gebuehrEinfach * 1.3);
  const terminsgebuehr    = rund2(gebuehrEinfach * 1.2);
  const einigungsgebuehr  = art === 'einvernehmlich' ? rund2(gebuehrEinfach * 1.0) : 0;
  const auslagenpauschale = 20;
  const anwaltNetto = rund2(verfahrensgebuehr + terminsgebuehr + einigungsgebuehr + auslagenpauschale);
  const mwst = rund2(anwaltNetto * 0.19);
  const anwaltBrutto = rund2(anwaltNetto + mwst);

  const anzahlAnwaelte = art === 'einvernehmlich' ? 1 : 2;
  const anwaltskostenGesamt = rund2(anwaltBrutto * anzahlAnwaelte);

  const gesamtkosten = rund2(gerichtskosten + anwaltskostenGesamt);
  const proPerson = rund2(gesamtkosten / 2);

  return {
    verfahrenswertBasis,
    verfahrenswertVA,
    verfahrenswertFolgesachen: folgesachen,
    verfahrenswertGesamt,
    gebuehrEinfach,
    gerichtskosten,
    verfahrensgebuehr,
    terminsgebuehr,
    einigungsgebuehr,
    auslagenpauschale,
    anwaltNetto,
    mwst,
    anwaltBrutto,
    anzahlAnwaelte,
    anwaltskostenGesamt,
    gesamtkosten,
    proPerson,
  };
}

export function berechneScheidungskosten(eingabe: ScheidungskostenEingabe): ScheidungskostenErgebnis {
  const aktuell = berechneEineScheidung(eingabe, eingabe.art);

  // Vergleich: bewusst beide Varianten rechnen
  const einvernehmlich = berechneEineScheidung(eingabe, 'einvernehmlich');
  const streitig       = berechneEineScheidung(eingabe, 'streitig');

  const ersparnisEinvernehmlich = rund2(streitig.gesamtkosten - einvernehmlich.gesamtkosten);
  const ersparnisProzent = streitig.gesamtkosten > 0
    ? Math.round(ersparnisEinvernehmlich / streitig.gesamtkosten * 100)
    : 0;

  return {
    ...aktuell,
    gesamtkostenEinvernehmlich: einvernehmlich.gesamtkosten,
    gesamtkostenStreitig: streitig.gesamtkosten,
    ersparnisEinvernehmlich,
    ersparnisProzent,
  };
}
