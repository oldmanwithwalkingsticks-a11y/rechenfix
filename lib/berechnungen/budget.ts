export interface AusgabenKategorie {
  name: string;
  betrag: number;
  typ: 'beduerfnis' | 'wunsch'; // for 50/30/20 classification
}

export interface BudgetErgebnis {
  einnahmenGesamt: number;
  ausgabenGesamt: number;
  ueberschuss: number; // can be negative (deficit)
  sparquote: number; // in percent

  // Ausgaben breakdown
  kategorien: AusgabenKategorie[];

  // 50/30/20 rule
  beduerfnisseIst: number;
  wuenscheIst: number;
  sparenIst: number; // = ueberschuss (clamped to 0 min)
  beduerfnisseSoll: number; // einnahmen * 0.50
  wuenscheSoll: number;     // einnahmen * 0.30
  sparenSoll: number;       // einnahmen * 0.20

  // Percentages for chart
  beduerfnisseProzent: number;
  wuenscheProzent: number;
  sparenProzent: number;
}

export function berechneBudget(
  nettoEinkommen: number,
  weitereEinnahmen: number,
  miete: number,
  stromGas: number,
  versicherungen: number,
  lebensmittel: number,
  mobilitaet: number,
  internetHandy: number,
  abosStreaming: number,
  freizeitAusgehen: number,
  kleidung: number,
  sonstiges: number,
): BudgetErgebnis | null {
  if (nettoEinkommen <= 0) return null;

  const einnahmenGesamt = nettoEinkommen + weitereEinnahmen;

  // Build categorized expense list
  const kategorien: AusgabenKategorie[] = [
    { name: 'Miete & Nebenkosten', betrag: miete, typ: 'beduerfnis' },
    { name: 'Strom/Gas', betrag: stromGas, typ: 'beduerfnis' },
    { name: 'Versicherungen', betrag: versicherungen, typ: 'beduerfnis' },
    { name: 'Lebensmittel', betrag: lebensmittel, typ: 'beduerfnis' },
    { name: 'Mobilität (Auto/ÖPNV)', betrag: mobilitaet, typ: 'beduerfnis' },
    { name: 'Internet/Handy', betrag: internetHandy, typ: 'beduerfnis' },
    { name: 'Abos/Streaming', betrag: abosStreaming, typ: 'wunsch' },
    { name: 'Freizeit/Ausgehen', betrag: freizeitAusgehen, typ: 'wunsch' },
    { name: 'Kleidung', betrag: kleidung, typ: 'wunsch' },
    { name: 'Sonstiges', betrag: sonstiges, typ: 'wunsch' },
  ].filter(k => k.betrag > 0);

  const ausgabenGesamt = kategorien.reduce((sum, k) => sum + k.betrag, 0);
  const ueberschuss = einnahmenGesamt - ausgabenGesamt;
  const sparquote = einnahmenGesamt > 0 ? (ueberschuss / einnahmenGesamt) * 100 : 0;

  // 50/30/20 Ist-Werte
  const beduerfnisseIst = kategorien
    .filter(k => k.typ === 'beduerfnis')
    .reduce((sum, k) => sum + k.betrag, 0);
  const wuenscheIst = kategorien
    .filter(k => k.typ === 'wunsch')
    .reduce((sum, k) => sum + k.betrag, 0);
  const sparenIst = Math.max(0, ueberschuss);

  // 50/30/20 Soll-Werte
  const beduerfnisseSoll = einnahmenGesamt * 0.50;
  const wuenscheSoll = einnahmenGesamt * 0.30;
  const sparenSoll = einnahmenGesamt * 0.20;

  // Percentages for chart (relative to total income)
  const beduerfnisseProzent = einnahmenGesamt > 0 ? (beduerfnisseIst / einnahmenGesamt) * 100 : 0;
  const wuenscheProzent = einnahmenGesamt > 0 ? (wuenscheIst / einnahmenGesamt) * 100 : 0;
  const sparenProzent = einnahmenGesamt > 0 ? (sparenIst / einnahmenGesamt) * 100 : 0;

  return {
    einnahmenGesamt,
    ausgabenGesamt,
    ueberschuss,
    sparquote,
    kategorien,
    beduerfnisseIst,
    wuenscheIst,
    sparenIst,
    beduerfnisseSoll,
    wuenscheSoll,
    sparenSoll,
    beduerfnisseProzent,
    wuenscheProzent,
    sparenProzent,
  };
}
