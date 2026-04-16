export interface PrimCheckErgebnis {
  zahl: number;
  istPrim: boolean;
  begruendung: string;
  kleinsteTeilbarkeit: number | null;
}

export interface PrimfaktorErgebnis {
  zahl: number;
  faktoren: { basis: number; exponent: number }[];
  rechenweg: string[];
  darstellung: string; // z.B. "2³ × 3² × 5"
}

export interface PrimBereichErgebnis {
  von: number;
  bis: number;
  primzahlen: number[];
  anzahl: number;
}

export function pruefePrimzahl(zahl: number): PrimCheckErgebnis {
  const n = Math.floor(zahl);
  if (n < 2) {
    return { zahl: n, istPrim: false, begruendung: `${n} ist keine Primzahl — Primzahlen sind natürliche Zahlen größer als 1.`, kleinsteTeilbarkeit: null };
  }
  if (n === 2) {
    return { zahl: n, istPrim: true, begruendung: '2 ist die kleinste und einzige gerade Primzahl.', kleinsteTeilbarkeit: null };
  }
  if (n % 2 === 0) {
    return { zahl: n, istPrim: false, begruendung: `${n} ist durch 2 teilbar (${n} ÷ 2 = ${n / 2}).`, kleinsteTeilbarkeit: 2 };
  }
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) {
      return { zahl: n, istPrim: false, begruendung: `${n} ist durch ${i} teilbar (${n} ÷ ${i} = ${n / i}).`, kleinsteTeilbarkeit: i };
    }
  }
  const wurzel = Math.floor(Math.sqrt(n));
  return { zahl: n, istPrim: true, begruendung: `${n} ist eine Primzahl — kein Teiler bis √${n} ≈ ${wurzel} gefunden.`, kleinsteTeilbarkeit: null };
}

export function primfaktorzerlegung(zahl: number): PrimfaktorErgebnis {
  let n = Math.floor(Math.abs(zahl));
  const original = n;
  const faktoren: { basis: number; exponent: number }[] = [];
  const rechenweg: string[] = [];

  if (n < 2) {
    return { zahl: original, faktoren: [], rechenweg: [`${original} hat keine Primfaktorzerlegung.`], darstellung: String(original) };
  }

  let teiler = 2;
  while (teiler * teiler <= n) {
    let exponent = 0;
    while (n % teiler === 0) {
      rechenweg.push(`${n} ÷ ${teiler} = ${n / teiler}`);
      n = n / teiler;
      exponent++;
    }
    if (exponent > 0) {
      faktoren.push({ basis: teiler, exponent });
    }
    teiler = teiler === 2 ? 3 : teiler + 2;
  }
  if (n > 1) {
    faktoren.push({ basis: n, exponent: 1 });
    rechenweg.push(`${n} ist prim → Faktor`);
  }

  const sup = (exp: number) => {
    if (exp === 1) return '';
    const sups: Record<string, string> = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
    return String(exp).split('').map(d => sups[d] || d).join('');
  };
  const darstellung = faktoren.map(f => `${f.basis}${sup(f.exponent)}`).join(' × ');

  return { zahl: original, faktoren, rechenweg, darstellung };
}

export function primzahlenImBereich(von: number, bis: number): PrimBereichErgebnis {
  const start = Math.max(2, Math.floor(von));
  const end = Math.min(Math.floor(bis), 100000);

  // Sieb des Eratosthenes
  const sieve = new Uint8Array(end + 1);
  sieve[0] = 1;
  sieve[1] = 1;
  for (let i = 2; i * i <= end; i++) {
    if (!sieve[i]) {
      for (let j = i * i; j <= end; j += i) {
        sieve[j] = 1;
      }
    }
  }

  const primzahlen: number[] = [];
  for (let i = start; i <= end; i++) {
    if (!sieve[i]) primzahlen.push(i);
  }

  return { von: start, bis: end, primzahlen, anzahl: primzahlen.length };
}
