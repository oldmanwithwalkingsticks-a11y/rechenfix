export interface SchlafEingabe {
  aufwachzeit: string; // "HH:MM"
  alter: number;
  einschlafzeit?: number; // Minuten, default 15
}

export interface SchlafZeit {
  uhrzeit: string; // "HH:MM"
  zyklen: number;
  schlafstunden: number; // z.B. 4.5, 6, 7.5, 9
  bewertung: 'wenig' | 'ausreichend' | 'optimal' | 'viel';
}

export interface SchlafErgebnis {
  einschlafMinuten: number;
  aufwachzeit: string;
  schlafzeiten: SchlafZeit[];
  empfohleneStunden: { min: number; max: number; label: string };
  jahreImSchlaf: number;
  idealZyklen: number;
}

const ZYKLUS_MINUTEN = 90;

/**
 * Empfohlene Schlafdauer nach Alter (WHO / National Sleep Foundation)
 */
export function getEmpfohleneSchlafdauer(alter: number): { min: number; max: number; label: string } {
  if (alter <= 0) return { min: 7, max: 9, label: 'Erwachsene (18–64)' };
  if (alter <= 3) return { min: 10, max: 13, label: 'Kleinkinder (1–3)' };
  if (alter <= 5) return { min: 10, max: 13, label: 'Vorschulkinder (3–5)' };
  if (alter <= 13) return { min: 9, max: 11, label: 'Schulkinder (6–13)' };
  if (alter <= 17) return { min: 8, max: 10, label: 'Teenager (14–17)' };
  if (alter <= 25) return { min: 7, max: 9, label: 'Junge Erwachsene (18–25)' };
  if (alter <= 64) return { min: 7, max: 9, label: 'Erwachsene (26–64)' };
  return { min: 7, max: 8, label: 'Senioren (65+)' };
}

function bewertung(stunden: number, empfohlenMin: number, empfohlenMax: number): SchlafZeit['bewertung'] {
  if (stunden < empfohlenMin - 1) return 'wenig';
  if (stunden < empfohlenMin) return 'ausreichend';
  if (stunden <= empfohlenMax) return 'optimal';
  return 'viel';
}

function zeitSubtrahieren(aufwachzeit: string, minuten: number): string {
  const [h, m] = aufwachzeit.split(':').map(Number);
  const totalMinAufwach = h * 60 + m;
  let zielMin = totalMinAufwach - minuten;
  if (zielMin < 0) zielMin += 24 * 60;
  const stunden = Math.floor(zielMin / 60) % 24;
  const mins = zielMin % 60;
  return `${String(stunden).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

export function berechneSchlaf(eingabe: SchlafEingabe): SchlafErgebnis {
  const einschlafMin = eingabe.einschlafzeit ?? 15;
  const empfohlen = getEmpfohleneSchlafdauer(eingabe.alter);

  // 6, 5, 4, 3 Zyklen
  const zyklenOptionen = [6, 5, 4, 3];
  const schlafzeiten: SchlafZeit[] = zyklenOptionen.map(zyklen => {
    const schlafMinuten = zyklen * ZYKLUS_MINUTEN;
    const gesamtMinuten = schlafMinuten + einschlafMin;
    const uhrzeit = zeitSubtrahieren(eingabe.aufwachzeit, gesamtMinuten);
    const schlafstunden = schlafMinuten / 60;

    return {
      uhrzeit,
      zyklen,
      schlafstunden,
      bewertung: bewertung(schlafstunden, empfohlen.min, empfohlen.max),
    };
  });

  // Lebenszeit-Berechnung: Durchschnitt 8h/Tag = 1/3 des Lebens
  const lebenserwartung = 80;
  const jahreImSchlaf = Math.round((lebenserwartung * (empfohlen.min + empfohlen.max) / 2 / 24) * 10) / 10;

  // Ideale Zyklen: nächste Zyklenzahl die in den empfohlenen Bereich fällt
  const idealZyklen = zyklenOptionen.find(z => {
    const stunden = (z * ZYKLUS_MINUTEN) / 60;
    return stunden >= empfohlen.min && stunden <= empfohlen.max;
  }) || 5;

  return {
    einschlafMinuten: einschlafMin,
    aufwachzeit: eingabe.aufwachzeit,
    schlafzeiten,
    empfohleneStunden: empfohlen,
    jahreImSchlaf,
    idealZyklen,
  };
}
