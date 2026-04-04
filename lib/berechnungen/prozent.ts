export interface ProzentErgebnis {
  ergebnis: number;
  rechenweg: string[];
}

export function berechneProzentwert(grundwert: number, prozentsatz: number): ProzentErgebnis {
  const ergebnis = grundwert * (prozentsatz / 100);
  return {
    ergebnis,
    rechenweg: [
      `Prozentwert = Grundwert × (Prozentsatz ÷ 100)`,
      `Prozentwert = ${fmt(grundwert)} × (${fmt(prozentsatz)} ÷ 100)`,
      `Prozentwert = ${fmt(grundwert)} × ${fmt(prozentsatz / 100)}`,
      `Prozentwert = ${fmt(ergebnis)}`,
    ],
  };
}

export function berechneProzentsatz(prozentwert: number, grundwert: number): ProzentErgebnis {
  if (grundwert === 0) return { ergebnis: 0, rechenweg: ['Division durch 0 nicht möglich.'] };
  const ergebnis = (prozentwert / grundwert) * 100;
  return {
    ergebnis,
    rechenweg: [
      `Prozentsatz = (Prozentwert ÷ Grundwert) × 100`,
      `Prozentsatz = (${fmt(prozentwert)} ÷ ${fmt(grundwert)}) × 100`,
      `Prozentsatz = ${fmt(prozentwert / grundwert)} × 100`,
      `Prozentsatz = ${fmt(ergebnis)}%`,
    ],
  };
}

export function berechneGrundwert(prozentwert: number, prozentsatz: number): ProzentErgebnis {
  if (prozentsatz === 0) return { ergebnis: 0, rechenweg: ['Division durch 0 nicht möglich.'] };
  const ergebnis = (prozentwert / prozentsatz) * 100;
  return {
    ergebnis,
    rechenweg: [
      `Grundwert = (Prozentwert ÷ Prozentsatz) × 100`,
      `Grundwert = (${fmt(prozentwert)} ÷ ${fmt(prozentsatz)}) × 100`,
      `Grundwert = ${fmt(prozentwert / prozentsatz)} × 100`,
      `Grundwert = ${fmt(ergebnis)}`,
    ],
  };
}

export function berechneAufschlag(ausgangswert: number, prozentsatz: number): ProzentErgebnis {
  const aufschlag = ausgangswert * (prozentsatz / 100);
  const ergebnis = ausgangswert + aufschlag;
  return {
    ergebnis,
    rechenweg: [
      `Aufschlag = Ausgangswert × (Prozentsatz ÷ 100)`,
      `Aufschlag = ${fmt(ausgangswert)} × (${fmt(prozentsatz)} ÷ 100)`,
      `Aufschlag = ${fmt(aufschlag)}`,
      `Neuer Wert = ${fmt(ausgangswert)} + ${fmt(aufschlag)} = ${fmt(ergebnis)}`,
    ],
  };
}

export function berechneAbschlag(ausgangswert: number, prozentsatz: number): ProzentErgebnis {
  const abschlag = ausgangswert * (prozentsatz / 100);
  const ergebnis = ausgangswert - abschlag;
  return {
    ergebnis,
    rechenweg: [
      `Abschlag = Ausgangswert × (Prozentsatz ÷ 100)`,
      `Abschlag = ${fmt(ausgangswert)} × (${fmt(prozentsatz)} ÷ 100)`,
      `Abschlag = ${fmt(abschlag)}`,
      `Neuer Wert = ${fmt(ausgangswert)} − ${fmt(abschlag)} = ${fmt(ergebnis)}`,
    ],
  };
}

function fmt(n: number): string {
  return n.toLocaleString('de-DE', { maximumFractionDigits: 4 });
}
