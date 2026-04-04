export type FormTyp = 'rechteck' | 'kreis' | 'dreieck' | 'lform' | 'trapez';
export type Einheit = 'm' | 'cm' | 'mm';

export interface RechteckEingabe {
  form: 'rechteck';
  laenge: number;
  breite: number;
}

export interface KreisEingabe {
  form: 'kreis';
  radius: number;
}

export interface DreieckEingabe {
  form: 'dreieck';
  grundseite: number;
  hoehe: number;
}

export interface LFormEingabe {
  form: 'lform';
  r1Laenge: number;
  r1Breite: number;
  r2Laenge: number;
  r2Breite: number;
}

export interface TrapezEingabe {
  form: 'trapez';
  seiteA: number;
  seiteC: number;
  hoehe: number;
}

export type FlaechenEingabe = RechteckEingabe | KreisEingabe | DreieckEingabe | LFormEingabe | TrapezEingabe;

export interface FlaechenErgebnis {
  flaeche: number;       // m²
  umfang: number | null; // m (null wenn nicht berechenbar)
  label: string;
}

export interface QuadratmeterErgebnis {
  einzelFlaechen: FlaechenErgebnis[];
  gesamtFlaeche: number;  // m²
  inCm2: number;
  inMm2: number;
  inAr: number;
  inHektar: number;
}

function umrechnenNachMeter(wert: number, einheit: Einheit): number {
  if (einheit === 'cm') return wert / 100;
  if (einheit === 'mm') return wert / 1000;
  return wert;
}

export function berechneEinzelflaeche(eingabe: FlaechenEingabe, einheit: Einheit): FlaechenErgebnis | null {
  switch (eingabe.form) {
    case 'rechteck': {
      const l = umrechnenNachMeter(eingabe.laenge, einheit);
      const b = umrechnenNachMeter(eingabe.breite, einheit);
      if (l <= 0 || b <= 0) return null;
      return {
        flaeche: l * b,
        umfang: 2 * (l + b),
        label: `Rechteck ${eingabe.laenge} × ${eingabe.breite} ${einheit}`,
      };
    }
    case 'kreis': {
      const r = umrechnenNachMeter(eingabe.radius, einheit);
      if (r <= 0) return null;
      return {
        flaeche: Math.PI * r * r,
        umfang: 2 * Math.PI * r,
        label: `Kreis r = ${eingabe.radius} ${einheit}`,
      };
    }
    case 'dreieck': {
      const g = umrechnenNachMeter(eingabe.grundseite, einheit);
      const h = umrechnenNachMeter(eingabe.hoehe, einheit);
      if (g <= 0 || h <= 0) return null;
      return {
        flaeche: (g * h) / 2,
        umfang: null,
        label: `Dreieck ${eingabe.grundseite} × ${eingabe.hoehe} ${einheit}`,
      };
    }
    case 'lform': {
      const l1 = umrechnenNachMeter(eingabe.r1Laenge, einheit);
      const b1 = umrechnenNachMeter(eingabe.r1Breite, einheit);
      const l2 = umrechnenNachMeter(eingabe.r2Laenge, einheit);
      const b2 = umrechnenNachMeter(eingabe.r2Breite, einheit);
      if (l1 <= 0 || b1 <= 0 || l2 <= 0 || b2 <= 0) return null;
      return {
        flaeche: l1 * b1 + l2 * b2,
        umfang: null,
        label: `L-Form (${eingabe.r1Laenge}×${eingabe.r1Breite} + ${eingabe.r2Laenge}×${eingabe.r2Breite}) ${einheit}`,
      };
    }
    case 'trapez': {
      const a = umrechnenNachMeter(eingabe.seiteA, einheit);
      const c = umrechnenNachMeter(eingabe.seiteC, einheit);
      const h = umrechnenNachMeter(eingabe.hoehe, einheit);
      if (a <= 0 || c <= 0 || h <= 0) return null;
      return {
        flaeche: ((a + c) / 2) * h,
        umfang: null,
        label: `Trapez a=${eingabe.seiteA}, c=${eingabe.seiteC}, h=${eingabe.hoehe} ${einheit}`,
      };
    }
  }
}

export function berechneQuadratmeter(
  eingaben: FlaechenEingabe[],
  einheit: Einheit
): QuadratmeterErgebnis | null {
  if (eingaben.length === 0) return null;

  const einzelFlaechen: FlaechenErgebnis[] = [];
  for (const e of eingaben) {
    const erg = berechneEinzelflaeche(e, einheit);
    if (!erg) return null;
    einzelFlaechen.push(erg);
  }

  const gesamtFlaeche = einzelFlaechen.reduce((s, f) => s + f.flaeche, 0);

  return {
    einzelFlaechen: einzelFlaechen.map(f => ({
      ...f,
      flaeche: Math.round(f.flaeche * 10000) / 10000,
      umfang: f.umfang !== null ? Math.round(f.umfang * 10000) / 10000 : null,
    })),
    gesamtFlaeche: Math.round(gesamtFlaeche * 10000) / 10000,
    inCm2: Math.round(gesamtFlaeche * 10000 * 100) / 100,
    inMm2: Math.round(gesamtFlaeche * 1000000 * 100) / 100,
    inAr: Math.round(gesamtFlaeche / 100 * 10000) / 10000,
    inHektar: Math.round(gesamtFlaeche / 10000 * 1000000) / 1000000,
  };
}
