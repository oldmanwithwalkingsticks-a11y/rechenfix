export function berechneProzentwert(grundwert: number, prozentsatz: number): number {
  return grundwert * (prozentsatz / 100);
}

export function berechneProzentsatz(prozentwert: number, grundwert: number): number {
  if (grundwert === 0) return 0;
  return (prozentwert / grundwert) * 100;
}

export function berechneGrundwert(prozentwert: number, prozentsatz: number): number {
  if (prozentsatz === 0) return 0;
  return (prozentwert / prozentsatz) * 100;
}
