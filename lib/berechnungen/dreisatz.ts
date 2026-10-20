export interface DreisatzEingabe {
  a1: number;
  b1: number;
  a2: number;
  antiproportional: boolean;
}

export interface DreisatzErgebnis {
  b2: number;
  zwischenschritt: number;
  schritte: string[];
}

export function berechneDreisatz(eingabe: DreisatzEingabe): DreisatzErgebnis | null {
  const { a1, b1, a2, antiproportional } = eingabe;
  if (a1 === 0 || a2 === 0) return null;

  if (!antiproportional) {
    // Proportional: B2 = (B1 / A1) × A2
    const zwischenschritt = b1 / a1;
    const b2 = zwischenschritt * a2;
    return {
      b2: Math.round(b2 * 10000) / 10000,
      zwischenschritt: Math.round(zwischenschritt * 10000) / 10000,
      schritte: [
        // W184: Eingaben vorher roh („2.5 entspricht 7.5“), jetzt über fmt() de-DE
        `${fmt(a1)} entspricht ${fmt(b1)}`,
        `1 entspricht ${fmt(b1)} \u00F7 ${fmt(a1)} = ${fmt(zwischenschritt)}`,
        `${fmt(a2)} entspricht ${fmt(zwischenschritt)} \u00D7 ${fmt(a2)} = ${fmt(b2)}`,
      ],
    };
  } else {
    // Antiproportional: B2 = (B1 × A1) / A2
    const zwischenschritt = b1 * a1;
    const b2 = zwischenschritt / a2;
    return {
      b2: Math.round(b2 * 10000) / 10000,
      zwischenschritt: Math.round(zwischenschritt * 10000) / 10000,
      schritte: [
        `${fmt(a1)} entspricht ${fmt(b1)}`,
        `1 entspricht ${fmt(b1)} \u00D7 ${fmt(a1)} = ${fmt(zwischenschritt)}`,
        `${fmt(a2)} entspricht ${fmt(zwischenschritt)} \u00F7 ${fmt(a2)} = ${fmt(b2)}`,
      ],
    };
  }
}

function fmt(n: number): string {
  return n.toLocaleString('de-DE', { maximumFractionDigits: 4 });
}
