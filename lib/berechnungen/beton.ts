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
  /** Lieferbeton brutto (inkl. 19 % USt), inkl. Mindermengenzuschlag unter 7,5 m³. */
  kostenLieferbeton: number;
  /** Davon Mindermengenzuschlag brutto (0 ab 7,5 m³). */
  mindermengenZuschlagBrutto: number;
  /** true, wenn Lieferbeton günstiger ist als die Sackware. */
  empfehlungLieferbeton: boolean;
  rechenweg: string[];
}

const DICHTE = 2400; // kg/m³
const SACK_VOLUMEN: Record<number, number> = { 25: 0.012, 40: 0.019 };
const SACK_PREIS: Record<number, number> = { 25: 6.5, 40: 9.5 };
// W185: vorher LIEFERBETON_PREIS = 100 €/m³ ohne Kleinmengen- und Steueraufschlag (Seite: „80–120 €/m³“),
// Empfehlung pauschal ab 0,5 m³. Transportbeton-Preislisten 2026, C20/25–C25/30, Konsistenz F3, netto:
//   - Siemsen, Preisliste 2026 (ab 01.01.2026), C20/25 F3 0/16 181,50 €, C25/30 185,00–187,50 €
//     https://www.siemsen.de/fileadmin/content/Preisliste_2026_Transportbeton_und_Betonpumpen.pdf
//   - Heidelberg Materials NRW bzw. Hamburg-Bremen 2026 (ab 01.10.2025), C20/25 208–210 €, C25/30 213 €
//     (inkl. Frachtanteil), zzgl. Pflichtzuschläge Energie/Logistik 1,50 + Maut 5,00 + Nachhaltigkeit ab 5,50 €/m³
//     https://www.heidelbergmaterials.de/system/files/2025-09/Preisliste%20Heidelberg%20Materials%20Beton_Nordrhein-Westfalen_2026.pdf
//   - Mindermenge: beide Listen berechnen unter 7,5 m³ je Fahrzeug die Differenz zu 7,5 m³ mit 24–25 €/m³.
// Angesetzt: 195 €/m³ netto (Mitte der Spanne), 25 €/m³ Mindermengenzuschlag, 19 % USt — die Sackpreise oben
// sind Baumarkt-Bruttopreise, verglichen wird deshalb brutto. Anfahrt außerhalb des Liefergebiets und Pumpe nicht enthalten.
export const LIEFERBETON_PREIS_NETTO = 195; // €/m³
export const LIEFERBETON_MINDERMENGE_M3 = 7.5; // m³ je Fahrzeug
export const LIEFERBETON_MINDERMENGE_ZUSCHLAG_NETTO = 25; // € je fehlendem m³ bis 7,5 m³
export const LIEFERBETON_UST = 0.19;

// W184: Rechenweg vorher mit rohen Zahlen und toFixed(3) („2.5 × 0.15 = 0.375 m³“), jetzt de-DE („2,5 × 0,15 = 0,375 m³“)
const fz = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 3 });
const f3 = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 3, maximumFractionDigits: 3 });

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
    rechenweg.push(`Volumen = ${fz(l)} × ${fz(b)} × ${fz(h)} = ${f3(volumenRoh)} m³`);
  } else if (form === 'rund') {
    const d = masse.durchmesser || 0;
    const h = masse.hoehe || 0;
    if (d <= 0 || h <= 0) return null;
    const r = d / 2;
    volumenRoh = Math.PI * r * r * h;
    rechenweg.push(`Volumen = π × (${fz(d)}/2)² × ${fz(h)} = ${f3(volumenRoh)} m³`);
  } else {
    // L-Form: zwei Schenkel
    const l1l = masse.l1Laenge || 0;
    const l1b = masse.l1Breite || 0;
    const l2l = masse.l2Laenge || 0;
    const l2b = masse.l2Breite || 0;
    const d = masse.lDicke || 0;
    if (l1l <= 0 || l1b <= 0 || l2l <= 0 || l2b <= 0 || d <= 0) return null;
    volumenRoh = (l1l * l1b + l2l * l2b) * d;
    rechenweg.push(`Volumen = (${fz(l1l)} × ${fz(l1b)} + ${fz(l2l)} × ${fz(l2b)}) × ${fz(d)} = ${f3(volumenRoh)} m³`);
  }

  const zuschlag = volumenRoh * (zuschlagProzent / 100);
  const volumenMitZuschlag = volumenRoh + zuschlag;
  rechenweg.push(`+ ${fz(zuschlagProzent)} % Zuschlag = ${f3(volumenMitZuschlag)} m³`);

  const gewichtKg = Math.round(volumenMitZuschlag * DICHTE);
  const gewichtTonnen = Math.round(gewichtKg / 10) / 100;
  rechenweg.push(`Gewicht = ${f3(volumenMitZuschlag)} × ${DICHTE.toLocaleString('de-DE')} = ${gewichtKg.toLocaleString('de-DE')} kg`);

  const volumenProSack = SACK_VOLUMEN[sackgroesseKg] || 0.012;
  const anzahlSaecke = Math.ceil(volumenMitZuschlag / volumenProSack);
  rechenweg.push(`Säcke (${sackgroesseKg} kg) = ${f3(volumenMitZuschlag)} ÷ ${f3(volumenProSack)} ≈ ${anzahlSaecke} Stück`);

  const sackPreis = SACK_PREIS[sackgroesseKg] || 6.5;
  const kostenSaecke = Math.round(anzahlSaecke * sackPreis * 100) / 100;
  // W185: Listenpreis + Mindermengenzuschlag, brutto (vorher V × 100 €/m³).
  const fehlmenge = Math.max(0, LIEFERBETON_MINDERMENGE_M3 - volumenMitZuschlag);
  const mindermengeNetto = fehlmenge * LIEFERBETON_MINDERMENGE_ZUSCHLAG_NETTO;
  const lieferNetto = volumenMitZuschlag * LIEFERBETON_PREIS_NETTO + mindermengeNetto;
  const kostenLieferbeton = Math.round(lieferNetto * (1 + LIEFERBETON_UST) * 100) / 100;
  const mindermengenZuschlagBrutto = Math.round(mindermengeNetto * (1 + LIEFERBETON_UST) * 100) / 100;
  const de2 = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  rechenweg.push(
    fehlmenge > 0
      ? `Lieferbeton = (${volumenMitZuschlag.toLocaleString('de-DE', { maximumFractionDigits: 3 })} m³ × ${LIEFERBETON_PREIS_NETTO} € + Mindermenge ${fehlmenge.toLocaleString('de-DE', { maximumFractionDigits: 3 })} m³ × ${LIEFERBETON_MINDERMENGE_ZUSCHLAG_NETTO} €) × 1,19 ≈ ${de2(kostenLieferbeton)} €`
      : `Lieferbeton = ${volumenMitZuschlag.toLocaleString('de-DE', { maximumFractionDigits: 3 })} m³ × ${LIEFERBETON_PREIS_NETTO} € × 1,19 ≈ ${de2(kostenLieferbeton)} €`,
  );

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
    mindermengenZuschlagBrutto,
    // W185: vorher pauschal ab 0,5 m³; mit Mindermengenzuschlag lohnt Lieferbeton erst ab rund 0,7 m³ (25-kg-Säcke).
    empfehlungLieferbeton: kostenLieferbeton < kostenSaecke,
    rechenweg,
  };
}
