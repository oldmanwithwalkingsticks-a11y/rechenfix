export interface BetonErgebnis {
  form: string;
  volumenRoh: number;
  zuschlagProzent: number;
  volumenMitZuschlag: number;
  gewichtKg: number;
  gewichtTonnen: number;
  sackgroesseKg: number;
  volumenProSack: number;
  anzahlSaecke: number;
  kostenSaecke: number;
  kostenLieferbeton: number;
  empfehlungLieferbeton: boolean;
  rechenweg: string[];
}

const DICHTE = 2400; // kg/m³
const SACK_VOLUMEN: Record<number, number> = { 25: 0.012, 40: 0.019 };
const SACK_PREIS: Record<number, number> = { 25: 6.5, 40: 9.5 };
const LIEFERBETON_PREIS = 100; // €/m³

export function berechneBeton(
  form: 'rechteck' | 'rund' | 'lform',
  masse: {
    laenge?: number; breite?: number; hoehe?: number;
    durchmesser?: number;
    l1Laenge?: number; l1Breite?: number; l2Laenge?: number; l2Breite?: number; lDicke?: number;
  },
  zuschlagProzent: number,
  sackgroesseKg: number
): BetonErgebnis | null {
  let volumenRoh: number;
  const rechenweg: string[] = [];

  if (form === 'rechteck') {
    const l = masse.laenge || 0;
    const b = masse.breite || 0;
    const h = masse.hoehe || 0;
    if (l <= 0 || b <= 0 || h <= 0) return null;
    volumenRoh = l * b * h;
    rechenweg.push(`Volumen = ${l} × ${b} × ${h} = ${(volumenRoh).toFixed(3)} m³`);
  } else if (form === 'rund') {
    const d = masse.durchmesser || 0;
    const h = masse.hoehe || 0;
    if (d <= 0 || h <= 0) return null;
    const r = d / 2;
    volumenRoh = Math.PI * r * r * h;
    rechenweg.push(`Volumen = π × (${d}/2)² × ${h} = ${volumenRoh.toFixed(3)} m³`);
  } else {
    // L-Form: zwei Schenkel
    const l1l = masse.l1Laenge || 0;
    const l1b = masse.l1Breite || 0;
    const l2l = masse.l2Laenge || 0;
    const l2b = masse.l2Breite || 0;
    const d = masse.lDicke || 0;
    if (l1l <= 0 || l1b <= 0 || l2l <= 0 || l2b <= 0 || d <= 0) return null;
    volumenRoh = (l1l * l1b + l2l * l2b) * d;
    rechenweg.push(`Volumen = (${l1l} × ${l1b} + ${l2l} × ${l2b}) × ${d} = ${volumenRoh.toFixed(3)} m³`);
  }

  const zuschlag = volumenRoh * (zuschlagProzent / 100);
  const volumenMitZuschlag = volumenRoh + zuschlag;
  rechenweg.push(`+ ${zuschlagProzent} % Zuschlag = ${volumenMitZuschlag.toFixed(3)} m³`);

  const gewichtKg = Math.round(volumenMitZuschlag * DICHTE);
  const gewichtTonnen = Math.round(gewichtKg / 10) / 100;
  rechenweg.push(`Gewicht = ${volumenMitZuschlag.toFixed(3)} × ${DICHTE} = ${gewichtKg.toLocaleString('de-DE')} kg`);

  const volumenProSack = SACK_VOLUMEN[sackgroesseKg] || 0.012;
  const anzahlSaecke = Math.ceil(volumenMitZuschlag / volumenProSack);
  rechenweg.push(`Säcke (${sackgroesseKg} kg) = ${volumenMitZuschlag.toFixed(3)} ÷ ${volumenProSack} ≈ ${anzahlSaecke} Stück`);

  const sackPreis = SACK_PREIS[sackgroesseKg] || 6.5;
  const kostenSaecke = Math.round(anzahlSaecke * sackPreis * 100) / 100;
  const kostenLieferbeton = Math.round(volumenMitZuschlag * LIEFERBETON_PREIS * 100) / 100;

  return {
    form,
    volumenRoh: Math.round(volumenRoh * 1000) / 1000,
    zuschlagProzent,
    volumenMitZuschlag: Math.round(volumenMitZuschlag * 1000) / 1000,
    gewichtKg,
    gewichtTonnen,
    sackgroesseKg,
    volumenProSack,
    anzahlSaecke,
    kostenSaecke,
    kostenLieferbeton,
    empfehlungLieferbeton: volumenMitZuschlag >= 0.5,
    rechenweg,
  };
}
