export interface BlutdruckMessung {
  systolisch: number;
  diastolisch: number;
}

export interface BlutdruckKlassifikation {
  name: string;
  farbe: 'green' | 'yellow' | 'orange' | 'red' | 'darkred';
  beschreibung: string;
}

export interface BlutdruckErgebnis {
  systolisch: number;
  diastolisch: number;
  klassifikation: BlutdruckKlassifikation;
  messungen: BlutdruckMessung[];
  istDurchschnitt: boolean;
  pulsdruckDiff: number;
  mittlererDruck: number;
}

const KLASSIFIKATIONEN: { name: string; farbe: BlutdruckKlassifikation['farbe']; beschreibung: string; syMin: number; syMax: number; diaMin: number; diaMax: number }[] = [
  { name: 'Optimal', farbe: 'green', beschreibung: 'Idealer Blutdruck. Weiter so!', syMin: 0, syMax: 119, diaMin: 0, diaMax: 79 },
  { name: 'Normal', farbe: 'green', beschreibung: 'Normaler Blutdruck. Kein Handlungsbedarf.', syMin: 120, syMax: 129, diaMin: 80, diaMax: 84 },
  { name: 'Hochnormal', farbe: 'yellow', beschreibung: 'Leicht erhöht. Lebensstil überprüfen.', syMin: 130, syMax: 139, diaMin: 85, diaMax: 89 },
  { name: 'Hypertonie Grad 1', farbe: 'orange', beschreibung: 'Leichte Hypertonie. Ärztliche Beratung empfohlen.', syMin: 140, syMax: 159, diaMin: 90, diaMax: 99 },
  { name: 'Hypertonie Grad 2', farbe: 'red', beschreibung: 'Mittelschwere Hypertonie. Ärztliche Behandlung notwendig.', syMin: 160, syMax: 179, diaMin: 100, diaMax: 109 },
  { name: 'Hypertonie Grad 3', farbe: 'darkred', beschreibung: 'Schwere Hypertonie. Sofortige ärztliche Behandlung notwendig.', syMin: 180, syMax: 999, diaMin: 110, diaMax: 999 },
];

function klassifiziere(sys: number, dia: number): BlutdruckKlassifikation {
  // Isolierte systolische Hypertonie
  if (sys >= 140 && dia < 90) {
    return { name: 'Isolierte systolische Hypertonie', farbe: 'orange', beschreibung: 'Systolisch erhöht bei normalem diastolischen Wert. Ärztliche Beratung empfohlen.' };
  }

  // Klassifikation nach dem höheren Grad (WHO-Regel)
  let sysKlasse = KLASSIFIKATIONEN[0];
  for (const k of KLASSIFIKATIONEN) {
    if (sys >= k.syMin && sys <= k.syMax) { sysKlasse = k; break; }
  }
  let diaKlasse = KLASSIFIKATIONEN[0];
  for (const k of KLASSIFIKATIONEN) {
    if (dia >= k.diaMin && dia <= k.diaMax) { diaKlasse = k; break; }
  }

  // Der höhere Grad bestimmt die Klassifikation
  const sysIdx = KLASSIFIKATIONEN.indexOf(sysKlasse);
  const diaIdx = KLASSIFIKATIONEN.indexOf(diaKlasse);
  const result = sysIdx >= diaIdx ? sysKlasse : diaKlasse;

  return { name: result.name, farbe: result.farbe, beschreibung: result.beschreibung };
}

export function berechneBlutdruck(messungen: BlutdruckMessung[]): BlutdruckErgebnis | null {
  const valid = messungen.filter(m => m.systolisch > 0 && m.diastolisch > 0 && m.systolisch > m.diastolisch);
  if (valid.length === 0) return null;

  const sys = Math.round(valid.reduce((s, m) => s + m.systolisch, 0) / valid.length);
  const dia = Math.round(valid.reduce((s, m) => s + m.diastolisch, 0) / valid.length);

  const klassifikation = klassifiziere(sys, dia);
  const pulsdruckDiff = sys - dia;
  const mittlererDruck = Math.round(dia + pulsdruckDiff / 3);

  return {
    systolisch: sys,
    diastolisch: dia,
    klassifikation,
    messungen: valid,
    istDurchschnitt: valid.length > 1,
    pulsdruckDiff,
    mittlererDruck,
  };
}
