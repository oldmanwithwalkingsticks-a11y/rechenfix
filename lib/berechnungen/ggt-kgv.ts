export interface GgtKgvErgebnis {
  zahlen: number[];
  ggt: number;
  kgv: number;
  euklid: string[];
  teilermengen: { zahl: number; teiler: number[] }[];
  primfaktoren: { zahl: number; darstellung: string }[];
}

function ggtZwei(a: number, b: number): { ergebnis: number; schritte: string[] } {
  a = Math.abs(a);
  b = Math.abs(b);
  if (a === 0) return { ergebnis: b, schritte: [`ggT(0, ${b}) = ${b}`] };
  if (b === 0) return { ergebnis: a, schritte: [`ggT(${a}, 0) = ${a}`] };

  const schritte: string[] = [];
  let x = Math.max(a, b);
  let y = Math.min(a, b);

  while (y > 0) {
    const q = Math.floor(x / y);
    const r = x % y;
    schritte.push(`${x} = ${q} × ${y} + ${r}`);
    x = y;
    y = r;
  }
  schritte.push(`→ ggT = ${x}`);
  return { ergebnis: x, schritte };
}

function kgvZwei(a: number, b: number, ggt: number): number {
  if (ggt === 0) return 0;
  return Math.abs(a * b) / ggt;
}

function teilerVon(n: number): number[] {
  n = Math.abs(n);
  if (n === 0) return [];
  const teiler: number[] = [];
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      teiler.push(i);
      if (i !== n / i) teiler.push(n / i);
    }
  }
  return teiler.sort((a, b) => a - b);
}

function primfaktorDarstellung(n: number): string {
  let val = Math.abs(n);
  if (val < 2) return String(val);

  const sup = (exp: number): string => {
    if (exp === 1) return '';
    const sups: Record<string, string> = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
    return String(exp).split('').map(d => sups[d] || d).join('');
  };

  const faktoren: { basis: number; exponent: number }[] = [];
  let teiler = 2;
  while (teiler * teiler <= val) {
    let exp = 0;
    while (val % teiler === 0) { val /= teiler; exp++; }
    if (exp > 0) faktoren.push({ basis: teiler, exponent: exp });
    teiler = teiler === 2 ? 3 : teiler + 2;
  }
  if (val > 1) faktoren.push({ basis: val, exponent: 1 });

  return faktoren.map(f => `${f.basis}${sup(f.exponent)}`).join(' × ');
}

export function berechneGgtKgv(zahlen: number[]): GgtKgvErgebnis | null {
  const clean = zahlen.filter(z => z > 0 && Number.isInteger(z));
  if (clean.length < 2) return null;

  // ggT paarweise
  const euklid: string[] = [];
  let currentGgt = clean[0];
  for (let i = 1; i < clean.length; i++) {
    const result = ggtZwei(currentGgt, clean[i]);
    if (clean.length > 2) {
      euklid.push(`ggT(${currentGgt}, ${clean[i]}):`);
    }
    euklid.push(...result.schritte);
    currentGgt = result.ergebnis;
  }

  // kgV paarweise
  let currentKgv = clean[0];
  for (let i = 1; i < clean.length; i++) {
    const g = ggtZwei(currentKgv, clean[i]).ergebnis;
    currentKgv = kgvZwei(currentKgv, clean[i], g);
  }

  const teilermengen = clean.map(z => ({ zahl: z, teiler: teilerVon(z) }));
  const primfaktoren = clean.map(z => ({ zahl: z, darstellung: primfaktorDarstellung(z) }));

  return {
    zahlen: clean,
    ggt: currentGgt,
    kgv: currentKgv,
    euklid,
    teilermengen,
    primfaktoren,
  };
}
