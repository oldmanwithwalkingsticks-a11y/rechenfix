export type Winkelmodus = 'DEG' | 'RAD';

export interface VerlaufEintrag {
  eingabe: string;
  ergebnis: string;
}

function fakultaet(n: number): number {
  if (n < 0 || !Number.isInteger(n)) return NaN;
  if (n > 170) return Infinity;
  if (n <= 1) return 1;
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

function zuRad(winkel: number, modus: Winkelmodus): number {
  return modus === 'DEG' ? (winkel * Math.PI) / 180 : winkel;
}

function vonRad(rad: number, modus: Winkelmodus): number {
  return modus === 'DEG' ? (rad * 180) / Math.PI : rad;
}

/**
 * Wertet einen mathematischen Ausdruck aus.
 * Unterstützt: +, -, *, /, ^, Klammern, Funktionen, Konstanten.
 */
export function berechne(ausdruck: string, modus: Winkelmodus, ans: number): { ergebnis: number; anzeige: string } | { fehler: string } {
  try {
    // Vorverarbeitung
    let expr = ausdruck
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/−/g, '-')
      .replace(/π/g, `(${Math.PI})`)
      .replace(/Ans/gi, `(${ans})`)
      .replace(/,/g, '.');

    // EXP-Notation: "5E3" → "5e3"
    expr = expr.replace(/E/g, 'e');

    // Implizite Multiplikation vor Klammern: "2(" → "2*("
    expr = expr.replace(/(\d)\(/g, '$1*(');
    expr = expr.replace(/\)(\d)/g, ')*$1');
    expr = expr.replace(/\)\(/g, ')*(');

    const result = parseExpr(expr, 0, modus);
    if (result.pos < expr.length) {
      return { fehler: 'Fehler' };
    }

    const val = result.value;
    if (!isFinite(val) && !isNaN(val)) {
      return { fehler: val > 0 ? '∞' : '-∞' };
    }
    if (isNaN(val)) {
      return { fehler: 'Fehler' };
    }

    return { ergebnis: val, anzeige: formatErgebnis(val) };
  } catch {
    return { fehler: 'Fehler' };
  }
}

// --- Recursive Descent Parser ---

interface ParseResult {
  value: number;
  pos: number;
}

function parseExpr(expr: string, pos: number, modus: Winkelmodus): ParseResult {
  let result = parseTerm(expr, pos, modus);
  while (result.pos < expr.length) {
    const ch = expr[result.pos];
    if (ch === '+') {
      const right = parseTerm(expr, result.pos + 1, modus);
      result = { value: result.value + right.value, pos: right.pos };
    } else if (ch === '-') {
      const right = parseTerm(expr, result.pos + 1, modus);
      result = { value: result.value - right.value, pos: right.pos };
    } else {
      break;
    }
  }
  return result;
}

function parseTerm(expr: string, pos: number, modus: Winkelmodus): ParseResult {
  let result = parsePower(expr, pos, modus);
  while (result.pos < expr.length) {
    const ch = expr[result.pos];
    if (ch === '*') {
      const right = parsePower(expr, result.pos + 1, modus);
      result = { value: result.value * right.value, pos: right.pos };
    } else if (ch === '/') {
      const right = parsePower(expr, result.pos + 1, modus);
      result = { value: result.value / right.value, pos: right.pos };
    } else if (ch === '%') {
      result = { value: result.value / 100, pos: result.pos + 1 };
    } else {
      break;
    }
  }
  return result;
}

function parsePower(expr: string, pos: number, modus: Winkelmodus): ParseResult {
  let result = parseUnary(expr, pos, modus);
  if (result.pos < expr.length && expr[result.pos] === '^') {
    const right = parsePower(expr, result.pos + 1, modus); // rechtsassoziativ
    result = { value: Math.pow(result.value, right.value), pos: right.pos };
  }
  // Fakultät
  if (result.pos < expr.length && expr[result.pos] === '!') {
    result = { value: fakultaet(result.value), pos: result.pos + 1 };
  }
  return result;
}

function parseUnary(expr: string, pos: number, modus: Winkelmodus): ParseResult {
  // Führendes Minus
  if (pos < expr.length && expr[pos] === '-') {
    const result = parseUnary(expr, pos + 1, modus);
    return { value: -result.value, pos: result.pos };
  }
  if (pos < expr.length && expr[pos] === '+') {
    return parseUnary(expr, pos + 1, modus);
  }
  return parsePrimary(expr, pos, modus);
}

function parsePrimary(expr: string, pos: number, modus: Winkelmodus): ParseResult {
  // Klammern
  if (pos < expr.length && expr[pos] === '(') {
    const result = parseExpr(expr, pos + 1, modus);
    if (result.pos < expr.length && expr[result.pos] === ')') {
      return { value: result.value, pos: result.pos + 1 };
    }
    return result; // fehlende schließende Klammer tolerieren
  }

  // Funktionen
  const funcNames = ['asin', 'acos', 'atan', 'sin', 'cos', 'tan', 'log', 'ln', 'sqrt', 'cbrt', 'exp'];
  for (const fn of funcNames) {
    if (expr.substring(pos, pos + fn.length) === fn) {
      const argStart = pos + fn.length;
      // Optional: Klammer nach Funktion
      if (argStart < expr.length && expr[argStart] === '(') {
        const inner = parseExpr(expr, argStart + 1, modus);
        const endPos = (inner.pos < expr.length && expr[inner.pos] === ')') ? inner.pos + 1 : inner.pos;
        return { value: applyFunc(fn, inner.value, modus), pos: endPos };
      }
      // Ohne Klammer: nächsten Primary parsen
      const arg = parsePrimary(expr, argStart, modus);
      return { value: applyFunc(fn, arg.value, modus), pos: arg.pos };
    }
  }

  // Euler e (nur wenn nicht Teil einer Zahl wie "2e3")
  if (pos < expr.length && expr[pos] === 'e' && (pos + 1 >= expr.length || !/[\d.]/.test(expr[pos + 1]))) {
    return { value: Math.E, pos: pos + 1 };
  }

  // Zahl (inkl. wissenschaftliche Notation)
  let numStr = '';
  while (pos < expr.length && /[\d.eE]/.test(expr[pos])) {
    numStr += expr[pos];
    pos++;
    // Vorzeichen nach e/E
    if (numStr.length > 1 && /[eE]$/.test(numStr) && pos < expr.length && /[+-]/.test(expr[pos])) {
      numStr += expr[pos];
      pos++;
    }
  }
  if (numStr) {
    const val = parseFloat(numStr);
    if (isNaN(val)) throw new Error('Ungültige Zahl');
    return { value: val, pos };
  }

  throw new Error('Unerwartetes Zeichen');
}

function applyFunc(fn: string, val: number, modus: Winkelmodus): number {
  switch (fn) {
    case 'sin': return Math.sin(zuRad(val, modus));
    case 'cos': return Math.cos(zuRad(val, modus));
    case 'tan': return Math.tan(zuRad(val, modus));
    case 'asin': return vonRad(Math.asin(val), modus);
    case 'acos': return vonRad(Math.acos(val), modus);
    case 'atan': return vonRad(Math.atan(val), modus);
    case 'log': return Math.log10(val);
    case 'ln': return Math.log(val);
    case 'sqrt': return Math.sqrt(val);
    case 'cbrt': return Math.cbrt(val);
    case 'exp': return Math.exp(val);
    default: return val;
  }
}

function formatErgebnis(n: number): string {
  if (n === 0) return '0';
  const abs = Math.abs(n);
  if (abs >= 1e15 || (abs < 1e-10 && abs > 0)) {
    return n.toExponential(8).replace(/\.?0+e/, 'e').replace('e+', 'e');
  }
  // Auf 10 Dezimalstellen runden, trailing zeros entfernen
  const rounded = parseFloat(n.toFixed(10));
  return rounded.toString().replace('.', ',');
}

export { formatErgebnis };
