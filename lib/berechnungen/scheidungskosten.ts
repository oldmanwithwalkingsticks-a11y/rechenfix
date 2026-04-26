// lib/berechnungen/scheidungskosten.ts
//
// Scheidungskosten-Berechnung nach FamGKG (Gerichtskosten) und RVG (Anwalt).
// Stand: KostBRÄG 2025 (BGBl. 2025 I Nr. 109), in Kraft seit 01.06.2025.
//
// Rechtsquellen:
// - § 28 FamGKG i.V.m. Anlage 2 (Wertgebühren-Tabelle Familiensachen)
// - § 13 RVG i.V.m. Anlage 2 (Wertgebühren-Tabelle Anwaltsvergütung)
// - VV RVG: Nr. 3100 (1,3 Verfahrensgebühr), Nr. 3104 (1,2 Terminsgebühr),
//           Nr. 1003 (1,0 Einigungsgebühr), Nr. 7002 (Auslagenpauschale 20% / max. 20 €)

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

  gebuehrFamGKG: number;       // 1,0-Gebühr nach Anlage 2 zu § 28 FamGKG
  gebuehrRVG: number;          // 1,0-Gebühr nach Anlage 2 zu § 13 RVG
  gerichtskosten: number;      // 2,0 × FamGKG-Gebühr

  verfahrensgebuehr: number;   // 1,3 × RVG-Gebühr (Nr. 3100 VV RVG)
  terminsgebuehr: number;      // 1,2 × RVG-Gebühr (Nr. 3104 VV RVG)
  einigungsgebuehr: number;    // 1,0 × RVG-Gebühr (Nr. 1003 VV RVG, nur einvernehmlich)
  auslagenpauschale: number;   // Min(0,2 × Gebühren, 20 €) Nr. 7002 VV RVG
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

// === FamGKG-Tabelle (Anlage 2 zu § 28 FamGKG, KostBRÄG 2025 ab 01.06.2025) ===
// Quelle: BGBl. 2025 I Nr. 109, S. 14
const FAMGKG_TABELLE_2025: { bis: number; gebuehr: number }[] = [
  { bis:   500, gebuehr:   40.00 },
  { bis:  1000, gebuehr:   61.00 },
  { bis:  1500, gebuehr:   82.00 },
  { bis:  2000, gebuehr:  103.00 },
  { bis:  3000, gebuehr:  125.50 },
  { bis:  4000, gebuehr:  148.00 },
  { bis:  5000, gebuehr:  170.50 },
  { bis:  6000, gebuehr:  193.00 },
  { bis:  7000, gebuehr:  215.50 },
  { bis:  8000, gebuehr:  238.00 },
  { bis:  9000, gebuehr:  260.50 },
  { bis: 10000, gebuehr:  283.00 },
  { bis: 13000, gebuehr:  313.50 },
  { bis: 16000, gebuehr:  344.00 },
  { bis: 19000, gebuehr:  374.50 },
  { bis: 22000, gebuehr:  405.00 },
  { bis: 25000, gebuehr:  435.50 },
  { bis: 30000, gebuehr:  476.00 },
  { bis: 35000, gebuehr:  516.50 },
  { bis: 40000, gebuehr:  557.00 },
  { bis: 45000, gebuehr:  597.50 },
  { bis: 50000, gebuehr:  638.00 },
];

// === RVG-Tabelle (Anlage 2 zu § 13 RVG, KostBRÄG 2025 ab 01.06.2025) ===
// Quelle: BGBl. 2025 I Nr. 109, S. 9
const RVG_TABELLE_2025: { bis: number; gebuehr: number }[] = [
  { bis:   500, gebuehr:   51.50 },
  { bis:  1000, gebuehr:   93.00 },
  { bis:  1500, gebuehr:  134.50 },
  { bis:  2000, gebuehr:  176.00 },
  { bis:  3000, gebuehr:  235.50 },
  { bis:  4000, gebuehr:  295.00 },
  { bis:  5000, gebuehr:  354.50 },
  { bis:  6000, gebuehr:  414.00 },
  { bis:  7000, gebuehr:  473.50 },
  { bis:  8000, gebuehr:  533.00 },
  { bis:  9000, gebuehr:  592.50 },
  { bis: 10000, gebuehr:  652.00 },
  { bis: 13000, gebuehr:  707.00 },
  { bis: 16000, gebuehr:  762.00 },
  { bis: 19000, gebuehr:  817.00 },
  { bis: 22000, gebuehr:  872.00 },
  { bis: 25000, gebuehr:  927.00 },
  { bis: 30000, gebuehr: 1013.00 },
  { bis: 35000, gebuehr: 1099.00 },
  { bis: 40000, gebuehr: 1185.00 },
  { bis: 45000, gebuehr: 1271.00 },
  { bis: 50000, gebuehr: 1357.00 },
];

function rund2(n: number): number {
  return Math.round(n * 100) / 100;
}

function gebuehrFamGKG(wert: number): number {
  for (const stufe of FAMGKG_TABELLE_2025) {
    if (wert <= stufe.bis) return stufe.gebuehr;
  }
  // 50.001 € – 200.000 €: pro angefangene 15.000 € weitere 140,00 €
  if (wert <= 200000) {
    const stufen = Math.ceil((wert - 50000) / 15000);
    return rund2(638 + stufen * 140);
  }
  // > 200.000 €: pro angefangene 30.000 € weitere 210,00 €
  const stufen = Math.ceil((wert - 200000) / 30000);
  return rund2(2038 + stufen * 210);
}

function gebuehrRVG(wert: number): number {
  for (const stufe of RVG_TABELLE_2025) {
    if (wert <= stufe.bis) return stufe.gebuehr;
  }
  // 50.001 € – 200.000 €: pro angefangene 15.000 € weitere 99,50 €
  if (wert <= 200000) {
    const stufen = Math.ceil((wert - 50000) / 15000);
    return rund2(1357 + stufen * 99.50);
  }
  // > 200.000 €: pro angefangene 30.000 € weitere 140,00 €
  const stufen = Math.ceil((wert - 200000) / 30000);
  return rund2(2352 + stufen * 140);
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

  // === GERICHTSKOSTEN nach FamGKG ===
  const gFamGKG = gebuehrFamGKG(verfahrenswertGesamt);
  const gerichtskosten = rund2(gFamGKG * 2);

  // === ANWALTSKOSTEN nach RVG ===
  const gRVG = gebuehrRVG(verfahrenswertGesamt);
  const verfahrensgebuehr = rund2(gRVG * 1.3); // Nr. 3100 VV RVG
  const terminsgebuehr    = rund2(gRVG * 1.2); // Nr. 3104 VV RVG
  const einigungsgebuehr  = art === 'einvernehmlich' ? rund2(gRVG * 1.0) : 0; // Nr. 1003 VV RVG

  // Auslagenpauschale Nr. 7002 VV RVG: 20 % der Gebühren, max. 20 €
  const gebuehrenSumme = verfahrensgebuehr + terminsgebuehr + einigungsgebuehr;
  const auslagenpauschale = Math.min(rund2(gebuehrenSumme * 0.2), 20);

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
    gebuehrFamGKG: gFamGKG,
    gebuehrRVG: gRVG,
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
