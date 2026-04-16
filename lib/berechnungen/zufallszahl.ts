export interface ZufallszahlErgebnis {
  zahlen: number[];
  min: number;
  max: number;
  durchschnitt: number;
  kleinste: number;
  groesste: number;
}

export interface WuerfelErgebnis {
  wuerfe: number[];
  anzahl: number;
  seiten: number;
  summe: number;
  durchschnitt: number;
}

export interface MuenzwurfErgebnis {
  wuerfe: ('Kopf' | 'Zahl')[];
  anzahlKopf: number;
  anzahlZahl: number;
  gesamt: number;
}

export interface LosziehungErgebnis {
  gezogene: number[];
  aus: number;
  anzahl: number;
}

export interface PasswortErgebnis {
  passwort: string;
  laenge: number;
  staerke: 'schwach' | 'mittel' | 'stark' | 'sehr stark';
}

export function generiereZufallszahlen(min: number, max: number, anzahl: number): ZufallszahlErgebnis {
  const n = Math.min(Math.max(1, Math.floor(anzahl)), 1000);
  const lo = Math.floor(min);
  const hi = Math.floor(max);
  const zahlen: number[] = [];
  for (let i = 0; i < n; i++) {
    zahlen.push(Math.floor(Math.random() * (hi - lo + 1)) + lo);
  }
  const summe = zahlen.reduce((a, b) => a + b, 0);
  return {
    zahlen,
    min: lo,
    max: hi,
    durchschnitt: Math.round((summe / n) * 100) / 100,
    kleinste: Math.min(...zahlen),
    groesste: Math.max(...zahlen),
  };
}

export function wuerfeln(anzahl: number, seiten: number): WuerfelErgebnis {
  const n = Math.min(Math.max(1, Math.floor(anzahl)), 10);
  const s = Math.max(2, Math.floor(seiten));
  const wuerfe: number[] = [];
  for (let i = 0; i < n; i++) {
    wuerfe.push(Math.floor(Math.random() * s) + 1);
  }
  const summe = wuerfe.reduce((a, b) => a + b, 0);
  return {
    wuerfe,
    anzahl: n,
    seiten: s,
    summe,
    durchschnitt: Math.round((summe / n) * 100) / 100,
  };
}

export function muenzwurf(anzahl: number): MuenzwurfErgebnis {
  const n = Math.min(Math.max(1, Math.floor(anzahl)), 100);
  const wuerfe: ('Kopf' | 'Zahl')[] = [];
  for (let i = 0; i < n; i++) {
    wuerfe.push(Math.random() < 0.5 ? 'Kopf' : 'Zahl');
  }
  const anzahlKopf = wuerfe.filter(w => w === 'Kopf').length;
  return {
    wuerfe,
    anzahlKopf,
    anzahlZahl: n - anzahlKopf,
    gesamt: n,
  };
}

export function losziehung(aus: number, anzahl: number): LosziehungErgebnis {
  const pool = Math.min(Math.max(2, Math.floor(aus)), 99);
  const n = Math.min(Math.max(1, Math.floor(anzahl)), pool);
  const alle = Array.from({ length: pool }, (_, i) => i + 1);
  // Fisher-Yates Shuffle
  for (let i = alle.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [alle[i], alle[j]] = [alle[j], alle[i]];
  }
  const gezogene = alle.slice(0, n).sort((a, b) => a - b);
  return { gezogene, aus: pool, anzahl: n };
}

export function generierePasswort(
  laenge: number,
  optionen: { gross: boolean; klein: boolean; zahlen: boolean; sonder: boolean }
): PasswortErgebnis {
  const len = Math.min(Math.max(8, Math.floor(laenge)), 64);
  let zeichenPool = '';
  if (optionen.klein) zeichenPool += 'abcdefghijklmnopqrstuvwxyz';
  if (optionen.gross) zeichenPool += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (optionen.zahlen) zeichenPool += '0123456789';
  if (optionen.sonder) zeichenPool += '!@#$%^&*()-_=+[]{}|;:,.<>?';
  if (zeichenPool.length === 0) zeichenPool = 'abcdefghijklmnopqrstuvwxyz';

  let passwort = '';
  for (let i = 0; i < len; i++) {
    passwort += zeichenPool[Math.floor(Math.random() * zeichenPool.length)];
  }

  let kategorien = 0;
  if (optionen.gross) kategorien++;
  if (optionen.klein) kategorien++;
  if (optionen.zahlen) kategorien++;
  if (optionen.sonder) kategorien++;

  let staerke: PasswortErgebnis['staerke'] = 'schwach';
  if (len >= 12 && kategorien >= 2) staerke = 'mittel';
  if (len >= 16 && kategorien >= 3) staerke = 'stark';
  if (len >= 20 && kategorien >= 4) staerke = 'sehr stark';

  return { passwort, laenge: len, staerke };
}
