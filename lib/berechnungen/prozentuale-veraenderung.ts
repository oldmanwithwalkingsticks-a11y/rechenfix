export interface ProzVeraenderungEingabe {
  alterWert: number;
  neuerWert: number;
  einheit: string;
}

export interface ProzVeraenderungErgebnis {
  prozent: number;
  absolut: number;
  faktor: number;
  richtung: 'zunahme' | 'abnahme' | 'gleich';
  // Rechenweg
  rechenschritte: string[];
  // Umkehr
  umkehrProzent: number;
  // Eingaben
  alterWert: number;
  neuerWert: number;
  einheit: string;
  // Sonderfall
  divisionDurchNull: boolean;
}

function fmtZ(n: number): string {
  return n.toLocaleString('de-DE', { maximumFractionDigits: 4 });
}

export function berechneProzVeraenderung(eingabe: ProzVeraenderungEingabe): ProzVeraenderungErgebnis | null {
  const { alterWert, neuerWert, einheit } = eingabe;

  // Beide Werte 0 → keine sinnvolle Berechnung
  if (alterWert === 0 && neuerWert === 0) {
    return {
      prozent: 0,
      absolut: 0,
      faktor: 1,
      richtung: 'gleich',
      rechenschritte: ['Beide Werte sind 0 — keine Veränderung.'],
      umkehrProzent: 0,
      alterWert,
      neuerWert,
      einheit,
      divisionDurchNull: false,
    };
  }

  // Alter Wert = 0 → Division durch Null
  if (alterWert === 0) {
    return {
      prozent: 0,
      absolut: neuerWert,
      faktor: 0,
      richtung: neuerWert > 0 ? 'zunahme' : 'abnahme',
      rechenschritte: [
        'Nicht berechenbar: Der Ausgangswert ist 0.',
        'Eine prozentuale Veränderung von 0 ausgehend ist mathematisch nicht definiert (Division durch Null).',
      ],
      umkehrProzent: 0,
      alterWert,
      neuerWert,
      einheit,
      divisionDurchNull: true,
    };
  }

  const absolut = neuerWert - alterWert;
  const prozent = (absolut / Math.abs(alterWert)) * 100;
  const faktor = neuerWert / alterWert;

  const richtung: 'zunahme' | 'abnahme' | 'gleich' =
    absolut > 0 ? 'zunahme' : absolut < 0 ? 'abnahme' : 'gleich';

  // Rechenweg
  const rechenschritte: string[] = [];
  rechenschritte.push(`Formel: ((Neuer Wert − Alter Wert) / |Alter Wert|) × 100`);
  rechenschritte.push(`= ((${fmtZ(neuerWert)} − ${fmtZ(alterWert)}) / |${fmtZ(alterWert)}|) × 100`);
  rechenschritte.push(`= (${fmtZ(absolut)} / ${fmtZ(Math.abs(alterWert))}) × 100`);
  rechenschritte.push(`= ${fmtZ(Math.round(prozent * 100) / 100)}%`);

  // Umkehr-Prozent: Von neuerWert zurück auf alterWert
  let umkehrProzent = 0;
  if (neuerWert !== 0) {
    umkehrProzent = ((alterWert - neuerWert) / Math.abs(neuerWert)) * 100;
    umkehrProzent = Math.round(umkehrProzent * 100) / 100;
  }

  return {
    prozent: Math.round(prozent * 100) / 100,
    absolut: Math.round(absolut * 10000) / 10000,
    faktor: Math.round(faktor * 10000) / 10000,
    richtung,
    rechenschritte,
    umkehrProzent,
    alterWert,
    neuerWert,
    einheit,
    divisionDurchNull: false,
  };
}
