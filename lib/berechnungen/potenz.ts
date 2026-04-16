export interface PotenzErgebnis {
  basis: number;
  exponent: number;
  ergebnis: number;
  rechenweg: string[];
}

export interface WurzelErgebnis {
  radikand: number;
  grad: number;
  ergebnis: number;
  istGanzzahl: boolean;
  rechenweg: string[];
}

export interface LogErgebnis {
  zahl: number;
  basis: number;
  ergebnis: number;
  rechenweg: string[];
}

const sup = (n: number | string): string => {
  const sups: Record<string, string> = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻', '.': '·' };
  return String(n).split('').map(d => sups[d] || d).join('');
};

const fmtNum = (n: number): string => {
  if (Number.isInteger(n) && Math.abs(n) < 1e15) return n.toLocaleString('de-DE');
  return n.toLocaleString('de-DE', { maximumSignificantDigits: 10 });
};

export function berechnePotenz(basis: number, exponent: number): PotenzErgebnis {
  const ergebnis = Math.pow(basis, exponent);
  const rechenweg: string[] = [];

  rechenweg.push(`${fmtNum(basis)}${sup(exponent)} = ${fmtNum(ergebnis)}`);

  if (Number.isInteger(exponent) && exponent >= 0 && exponent <= 10) {
    const teile = Array(exponent).fill(fmtNum(basis));
    if (exponent === 0) {
      rechenweg.push(`Jede Zahl hoch 0 ergibt 1 (Konvention).`);
    } else if (exponent === 1) {
      rechenweg.push(`Jede Zahl hoch 1 ergibt sich selbst.`);
    } else {
      rechenweg.push(`= ${teile.join(' × ')} = ${fmtNum(ergebnis)}`);
    }
  }

  if (exponent < 0) {
    rechenweg.push(`Negativer Exponent: ${fmtNum(basis)}${sup(exponent)} = 1 ÷ ${fmtNum(basis)}${sup(-exponent)} = 1 ÷ ${fmtNum(Math.pow(basis, -exponent))} = ${fmtNum(ergebnis)}`);
  }

  return { basis, exponent, ergebnis, rechenweg };
}

export function berechneWurzel(radikand: number, grad: number): WurzelErgebnis {
  const ergebnis = Math.pow(radikand, 1 / grad);
  const gerundet = Math.round(ergebnis * 1e10) / 1e10;
  const istGanzzahl = Number.isInteger(gerundet) && Math.abs(gerundet) < 1e12;
  const rechenweg: string[] = [];

  if (grad === 2) {
    rechenweg.push(`√${fmtNum(radikand)} = ${fmtNum(gerundet)}`);
  } else {
    rechenweg.push(`${sup(grad)}√${fmtNum(radikand)} = ${fmtNum(gerundet)}`);
  }

  rechenweg.push(`Denn ${fmtNum(gerundet)}${sup(grad)} = ${fmtNum(radikand)}`);

  if (istGanzzahl) {
    rechenweg.push(`→ Ergebnis ist eine glatte Zahl.`);
  }

  return { radikand, grad, ergebnis: gerundet, istGanzzahl, rechenweg };
}

export function berechneLogarithmus(zahl: number, basis: number): LogErgebnis {
  const ergebnis = Math.log(zahl) / Math.log(basis);
  const gerundet = Math.round(ergebnis * 1e10) / 1e10;
  const rechenweg: string[] = [];

  if (basis === 10) {
    rechenweg.push(`log₁₀(${fmtNum(zahl)}) = ${fmtNum(gerundet)}`);
  } else if (basis === Math.E) {
    rechenweg.push(`ln(${fmtNum(zahl)}) = ${fmtNum(gerundet)}`);
  } else {
    const sub = String(basis).split('').map(d => {
      const subs: Record<string, string> = { '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉' };
      return subs[d] || d;
    }).join('');
    rechenweg.push(`log${sub}(${fmtNum(zahl)}) = ${fmtNum(gerundet)}`);
  }

  rechenweg.push(`Denn ${fmtNum(basis)}${sup(gerundet)} = ${fmtNum(zahl)}`);

  return { zahl, basis, ergebnis: gerundet, rechenweg };
}
