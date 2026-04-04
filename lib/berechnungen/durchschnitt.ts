// --- Modus 1: Arithmetisches Mittel ---

export interface StatistikErgebnis {
  mittelwert: number;
  summe: number;
  anzahl: number;
  min: number;
  max: number;
  spannweite: number;
  standardabweichung: number;
  sortiert: number[];
  rechenweg: string;
}

export function berechneArithmetisch(werte: number[]): StatistikErgebnis | null {
  if (werte.length < 2) return null;

  const summe = werte.reduce((s, v) => s + v, 0);
  const mittelwert = summe / werte.length;
  const sortiert = [...werte].sort((a, b) => a - b);
  const min = sortiert[0];
  const max = sortiert[sortiert.length - 1];

  const varianz = werte.reduce((s, v) => s + (v - mittelwert) ** 2, 0) / werte.length;
  const standardabweichung = Math.sqrt(varianz);

  const werteStr = werte.map(v => formatZ(v)).join(' + ');
  const rechenweg = `( ${werteStr} ) ÷ ${werte.length} = ${formatZ(mittelwert)}`;

  return {
    mittelwert: runde(mittelwert),
    summe: runde(summe),
    anzahl: werte.length,
    min: runde(min),
    max: runde(max),
    spannweite: runde(max - min),
    standardabweichung: runde(standardabweichung),
    sortiert: sortiert.map(runde),
    rechenweg,
  };
}

// --- Modus 2: Gewichtetes Mittel ---

export interface GewichtetEintrag {
  wert: number;
  gewicht: number;
}

export interface GewichtetErgebnis {
  mittelwert: number;
  summeGewichte: number;
  anzahl: number;
  rechenweg: string;
}

export function berechneGewichtet(eintraege: GewichtetEintrag[]): GewichtetErgebnis | null {
  const gueltig = eintraege.filter(e => e.gewicht > 0);
  if (gueltig.length < 2) return null;

  const summeProdukte = gueltig.reduce((s, e) => s + e.wert * e.gewicht, 0);
  const summeGewichte = gueltig.reduce((s, e) => s + e.gewicht, 0);
  if (summeGewichte === 0) return null;

  const mittelwert = summeProdukte / summeGewichte;

  const teile = gueltig.map(e => `${formatZ(e.wert)}×${formatZ(e.gewicht)}`).join(' + ');
  const rechenweg = `( ${teile} ) ÷ ${formatZ(summeGewichte)} = ${formatZ(mittelwert)}`;

  return {
    mittelwert: runde(mittelwert),
    summeGewichte: runde(summeGewichte),
    anzahl: gueltig.length,
    rechenweg,
  };
}

// --- Modus 3: Median & Modus ---

export interface MedianModusErgebnis extends StatistikErgebnis {
  median: number;
  modus: number[] | null; // null = kein Modus
  medianRechenweg: string;
}

export function berechneMedianModus(werte: number[]): MedianModusErgebnis | null {
  const basis = berechneArithmetisch(werte);
  if (!basis) return null;

  const sortiert = basis.sortiert;
  const n = sortiert.length;

  let median: number;
  let medianRechenweg: string;
  if (n % 2 === 1) {
    const mitte = Math.floor(n / 2);
    median = sortiert[mitte];
    medianRechenweg = `Sortiert: [${sortiert.map(formatZ).join(', ')}] → Mittlerer Wert (Position ${mitte + 1}): ${formatZ(median)}`;
  } else {
    const m1 = sortiert[n / 2 - 1];
    const m2 = sortiert[n / 2];
    median = (m1 + m2) / 2;
    medianRechenweg = `Sortiert: [${sortiert.map(formatZ).join(', ')}] → Mitte: (${formatZ(m1)} + ${formatZ(m2)}) ÷ 2 = ${formatZ(median)}`;
  }

  // Modus
  const haeufigkeit = new Map<number, number>();
  for (const v of werte) {
    haeufigkeit.set(v, (haeufigkeit.get(v) || 0) + 1);
  }
  const maxH = Math.max(...Array.from(haeufigkeit.values()));
  let modus: number[] | null = null;
  if (maxH > 1) {
    modus = Array.from(haeufigkeit.entries())
      .filter(([, h]) => h === maxH)
      .map(([v]) => v)
      .sort((a, b) => a - b);
    // Wenn alle gleich häufig, kein Modus
    if (modus.length === haeufigkeit.size) modus = null;
  }

  return {
    ...basis,
    median: runde(median),
    modus,
    medianRechenweg,
  };
}

// --- Hilfsfunktionen ---

function runde(n: number): number {
  return Math.round(n * 10000) / 10000;
}

function formatZ(n: number): string {
  return runde(n).toLocaleString('de-DE', { maximumFractionDigits: 4 });
}

export function parseWerteListe(text: string): number[] {
  return text
    .split(/[,;]+/)
    .map(s => s.trim().replace(',', '.'))
    .filter(s => s !== '' && !isNaN(Number(s)))
    .map(Number);
}
