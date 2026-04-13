export type FormTyp =
  | 'rechteck'
  | 'dreieck'
  | 'kreis'
  | 'trapez'
  | 'parallelogramm'
  | 'raute'
  | 'sechseck'
  | 'ellipse';

export type Einheit = 'mm' | 'cm' | 'm' | 'km' | 'zoll' | 'fuss';

export interface FlaecheEingabe {
  form: FormTyp;
  einheit: Einheit;
  // Rechteck
  laenge?: number;
  breite?: number;
  // Dreieck
  grundseite?: number;
  hoehe?: number;
  seiteB?: number;
  seiteC?: number;
  // Kreis
  radius?: number;
  // Trapez
  seiteA?: number;
  seiteCTrapez?: number;
  hoeheTrapez?: number;
  seiteBTrapez?: number;
  seiteDTrapez?: number;
  // Parallelogramm
  grundseiteP?: number;
  hoeheP?: number;
  seiteBP?: number;
  // Raute
  diagonale1?: number;
  diagonale2?: number;
  // Sechseck
  seitenlaenge?: number;
  // Ellipse
  halbachseA?: number;
  halbachseB?: number;
}

export interface EinheitenUmrechnung {
  einheit: string;
  flaechenEinheit: string;
  flaeche: number;
}

export interface FlaecheErgebnis {
  flaeche: number;
  umfang: number | null;
  diagonale: number | null;
  formelText: string;
  rechenweg: string;
  einheit: Einheit;
  umrechnungen: EinheitenUmrechnung[];
}

const EINHEIT_LABELS: Record<Einheit, string> = {
  mm: 'mm', cm: 'cm', m: 'm', km: 'km', zoll: 'Zoll', fuss: 'Fuß',
};

// Umrechnungsfaktoren zu Metern
const ZU_METER: Record<Einheit, number> = {
  mm: 0.001, cm: 0.01, m: 1, km: 1000, zoll: 0.0254, fuss: 0.3048,
};

export const EINHEIT_OPTIONEN: { value: Einheit; label: string }[] = [
  { value: 'mm', label: 'mm' },
  { value: 'cm', label: 'cm' },
  { value: 'm', label: 'm' },
  { value: 'km', label: 'km' },
  { value: 'zoll', label: 'Zoll' },
  { value: 'fuss', label: 'Fuß' },
];

export const FORM_OPTIONEN: { value: FormTyp; label: string; icon: string }[] = [
  { value: 'rechteck', label: 'Rechteck', icon: '🟦' },
  { value: 'dreieck', label: 'Dreieck', icon: '🔺' },
  { value: 'kreis', label: 'Kreis', icon: '🔵' },
  { value: 'trapez', label: 'Trapez', icon: '⬡' },
  { value: 'parallelogramm', label: 'Parallelogramm', icon: '▱' },
  { value: 'raute', label: 'Raute', icon: '🔶' },
  { value: 'sechseck', label: 'Sechseck', icon: '⬡' },
  { value: 'ellipse', label: 'Ellipse', icon: '🟤' },
];

function rund(n: number, stellen = 4): number {
  const f = Math.pow(10, stellen);
  return Math.round(n * f) / f;
}

function fmtZ(n: number): string {
  return n.toLocaleString('de-DE', { maximumFractionDigits: 4 });
}

function berechneUmrechnungen(flaeche: number, einheit: Einheit): EinheitenUmrechnung[] {
  const faktorZuM = ZU_METER[einheit];
  const flaecheM2 = flaeche * faktorZuM * faktorZuM;

  const zielEinheiten: Einheit[] = ['mm', 'cm', 'm', 'km'];
  return zielEinheiten
    .filter(e => e !== einheit)
    .map(e => {
      const faktor = ZU_METER[e];
      const umgerechneteFlaeche = flaecheM2 / (faktor * faktor);
      return {
        einheit: EINHEIT_LABELS[e],
        flaechenEinheit: `${EINHEIT_LABELS[e]}²`,
        flaeche: rund(umgerechneteFlaeche, 6),
      };
    })
    .filter(u => u.flaeche > 0.000001 && u.flaeche < 1e12);
}

export function berechneFlaeche(eingabe: FlaecheEingabe): FlaecheErgebnis | null {
  const e = EINHEIT_LABELS[eingabe.einheit];
  let flaeche: number;
  let umfang: number | null = null;
  let diagonale: number | null = null;
  let formelText: string;
  let rechenweg: string;

  switch (eingabe.form) {
    case 'rechteck': {
      const a = eingabe.laenge ?? 0;
      const b = eingabe.breite ?? 0;
      if (a <= 0 || b <= 0) return null;
      flaeche = a * b;
      umfang = 2 * (a + b);
      diagonale = Math.sqrt(a * a + b * b);
      formelText = `A = a × b`;
      rechenweg = `A = ${fmtZ(a)} × ${fmtZ(b)} = ${fmtZ(rund(flaeche))} ${e}²`;
      break;
    }
    case 'dreieck': {
      const a = eingabe.grundseite ?? 0;
      const h = eingabe.hoehe ?? 0;
      const b = eingabe.seiteB ?? 0;
      const c = eingabe.seiteC ?? 0;
      if (a <= 0) return null;

      if (h > 0) {
        flaeche = (a * h) / 2;
        formelText = `A = (a × h) / 2`;
        rechenweg = `A = (${fmtZ(a)} × ${fmtZ(h)}) / 2 = ${fmtZ(rund(flaeche))} ${e}²`;
      } else if (b > 0 && c > 0) {
        // Heron
        const s = (a + b + c) / 2;
        const val = s * (s - a) * (s - b) * (s - c);
        if (val <= 0) return null;
        flaeche = Math.sqrt(val);
        formelText = `A = √(s(s-a)(s-b)(s-c)) mit s = (a+b+c)/2`;
        rechenweg = `s = (${fmtZ(a)}+${fmtZ(b)}+${fmtZ(c)})/2 = ${fmtZ(rund((a + b + c) / 2))} → A = ${fmtZ(rund(flaeche))} ${e}²`;
      } else {
        return null;
      }

      if (b > 0 && c > 0) {
        umfang = a + b + c;
      }
      break;
    }
    case 'kreis': {
      const r = eingabe.radius ?? 0;
      if (r <= 0) return null;
      flaeche = Math.PI * r * r;
      umfang = 2 * Math.PI * r;
      formelText = `A = π × r²`;
      rechenweg = `A = π × ${fmtZ(r)}² = ${fmtZ(rund(flaeche))} ${e}²`;
      break;
    }
    case 'trapez': {
      const a = eingabe.seiteA ?? 0;
      const c = eingabe.seiteCTrapez ?? 0;
      const h = eingabe.hoeheTrapez ?? 0;
      if (a <= 0 || c <= 0 || h <= 0) return null;
      flaeche = ((a + c) * h) / 2;
      formelText = `A = (a + c) × h / 2`;
      rechenweg = `A = (${fmtZ(a)} + ${fmtZ(c)}) × ${fmtZ(h)} / 2 = ${fmtZ(rund(flaeche))} ${e}²`;

      const b = eingabe.seiteBTrapez ?? 0;
      const d = eingabe.seiteDTrapez ?? 0;
      if (b > 0 && d > 0) {
        umfang = a + b + c + d;
      }
      break;
    }
    case 'parallelogramm': {
      const a = eingabe.grundseiteP ?? 0;
      const h = eingabe.hoeheP ?? 0;
      const b = eingabe.seiteBP ?? 0;
      if (a <= 0 || h <= 0) return null;
      flaeche = a * h;
      formelText = `A = a × h`;
      rechenweg = `A = ${fmtZ(a)} × ${fmtZ(h)} = ${fmtZ(rund(flaeche))} ${e}²`;
      if (b > 0) {
        umfang = 2 * (a + b);
      }
      break;
    }
    case 'raute': {
      const d1 = eingabe.diagonale1 ?? 0;
      const d2 = eingabe.diagonale2 ?? 0;
      if (d1 <= 0 || d2 <= 0) return null;
      flaeche = (d1 * d2) / 2;
      const seite = Math.sqrt((d1 / 2) ** 2 + (d2 / 2) ** 2);
      umfang = 4 * seite;
      formelText = `A = (d₁ × d₂) / 2`;
      rechenweg = `A = (${fmtZ(d1)} × ${fmtZ(d2)}) / 2 = ${fmtZ(rund(flaeche))} ${e}²`;
      break;
    }
    case 'sechseck': {
      const a = eingabe.seitenlaenge ?? 0;
      if (a <= 0) return null;
      flaeche = (3 * Math.sqrt(3) / 2) * a * a;
      umfang = 6 * a;
      formelText = `A = (3√3 / 2) × a²`;
      rechenweg = `A = (3√3 / 2) × ${fmtZ(a)}² = ${fmtZ(rund(flaeche))} ${e}²`;
      break;
    }
    case 'ellipse': {
      const a = eingabe.halbachseA ?? 0;
      const b = eingabe.halbachseB ?? 0;
      if (a <= 0 || b <= 0) return null;
      flaeche = Math.PI * a * b;
      // Ramanujan-Näherung
      umfang = Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b)));
      formelText = `A = π × a × b`;
      rechenweg = `A = π × ${fmtZ(a)} × ${fmtZ(b)} = ${fmtZ(rund(flaeche))} ${e}²`;
      break;
    }
    default:
      return null;
  }

  return {
    flaeche: rund(flaeche),
    umfang: umfang !== null ? rund(umfang) : null,
    diagonale: diagonale !== null ? rund(diagonale) : null,
    formelText,
    rechenweg,
    einheit: eingabe.einheit,
    umrechnungen: berechneUmrechnungen(flaeche, eingabe.einheit),
  };
}
