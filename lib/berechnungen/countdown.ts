export interface CountdownEvent {
  key: string;
  label: string;
  datum: () => Date; // Funktion, da sich Ostern etc. jährlich ändern
  icon: string;
}

// Osterberechnung nach Gauss (Algorithmus für gregorianischen Kalender)
function berechneOstern(jahr: number): Date {
  const a = jahr % 19;
  const b = Math.floor(jahr / 100);
  const c = jahr % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const monat = Math.floor((h + l - 7 * m + 114) / 31) - 1; // 0-basiert
  const tag = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(jahr, monat, tag);
}

function naechstesDatum(monat: number, tag: number): Date {
  const jetzt = new Date();
  const diesesJahr = new Date(jetzt.getFullYear(), monat, tag);
  if (diesesJahr.getTime() > jetzt.getTime()) return diesesJahr;
  return new Date(jetzt.getFullYear() + 1, monat, tag);
}

function naechstesOstern(): Date {
  const jetzt = new Date();
  const diesesJahr = berechneOstern(jetzt.getFullYear());
  if (diesesJahr.getTime() > jetzt.getTime()) return diesesJahr;
  return berechneOstern(jetzt.getFullYear() + 1);
}

// Sommerferien-Start variiert — wir nehmen einen typischen Durchschnitt (1. Juli)
function naechsteSommerferien(): Date {
  return naechstesDatum(6, 1); // 1. Juli
}

export const voreingestellteEvents: CountdownEvent[] = [
  { key: 'weihnachten', label: 'Weihnachten', datum: () => naechstesDatum(11, 24), icon: '🎄' },
  { key: 'silvester', label: 'Silvester', datum: () => naechstesDatum(11, 31), icon: '🎆' },
  { key: 'ostern', label: 'Ostersonntag', datum: naechstesOstern, icon: '🐣' },
  { key: 'sommerferien', label: 'Sommerferien (ca.)', datum: naechsteSommerferien, icon: '☀️' },
  { key: 'nikolaus', label: 'Nikolaus', datum: () => naechstesDatum(11, 6), icon: '🎅' },
  { key: 'valentinstag', label: 'Valentinstag', datum: () => naechstesDatum(1, 14), icon: '❤️' },
  { key: 'halloween', label: 'Halloween', datum: () => naechstesDatum(9, 31), icon: '🎃' },
  { key: 'neujahr', label: 'Neujahr', datum: () => naechstesDatum(0, 1), icon: '🥂' },
];

export interface CountdownErgebnis {
  tage: number;
  stunden: number;
  minuten: number;
  sekunden: number;
  gesamtSekunden: number;
  gesamtStunden: number;
  wochen: number;
  vorbei: boolean;
}

export function berechneCountdown(zielDatum: Date): CountdownErgebnis {
  const jetzt = new Date();
  const diff = zielDatum.getTime() - jetzt.getTime();

  if (diff <= 0) {
    return { tage: 0, stunden: 0, minuten: 0, sekunden: 0, gesamtSekunden: 0, gesamtStunden: 0, wochen: 0, vorbei: true };
  }

  const gesamtSekunden = Math.floor(diff / 1000);
  const gesamtStunden = Math.floor(diff / 3600000);
  const wochen = Math.floor(gesamtSekunden / 604800);
  const tage = Math.floor(gesamtSekunden / 86400);
  const stunden = Math.floor((gesamtSekunden % 86400) / 3600);
  const minuten = Math.floor((gesamtSekunden % 3600) / 60);
  const sekunden = gesamtSekunden % 60;

  return { tage, stunden, minuten, sekunden, gesamtSekunden, gesamtStunden, wochen, vorbei: false };
}
