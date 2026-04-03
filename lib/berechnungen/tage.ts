export interface TageEingabe {
  startDatum: Date;
  endDatum: Date;
  mitzaehlen: boolean; // Start- und Endtag mitzählen
}

export interface TageErgebnis {
  tage: number;
  wochen: number;
  restTage: number;        // Tage nach vollen Wochen
  monate: number;
  restTageNachMonaten: number;
  jahre: number;
  restMonateNachJahren: number;
  restTageNachJahrenMonaten: number;
  arbeitstage: number;
  wochenendtage: number;
}

/**
 * Zählt die Arbeitstage (Mo-Fr) zwischen zwei Daten (inklusive Start, exklusive Ende).
 */
function zaehleArbeitstage(start: Date, ende: Date): number {
  let arbeitstage = 0;
  const current = new Date(start);
  while (current < ende) {
    const wochentag = current.getDay();
    if (wochentag !== 0 && wochentag !== 6) {
      arbeitstage++;
    }
    current.setDate(current.getDate() + 1);
  }
  return arbeitstage;
}

/**
 * Berechnet die Differenz in Monaten und Resttagen zwischen zwei Daten.
 */
function berechneMonate(start: Date, ende: Date): { jahre: number; monate: number; tage: number } {
  let jahre = ende.getFullYear() - start.getFullYear();
  let monate = ende.getMonth() - start.getMonth();
  let tage = ende.getDate() - start.getDate();

  if (tage < 0) {
    monate--;
    // Tage im Vormonat des Enddatums
    const vormonat = new Date(ende.getFullYear(), ende.getMonth(), 0);
    tage += vormonat.getDate();
  }

  if (monate < 0) {
    jahre--;
    monate += 12;
  }

  return { jahre, monate, tage };
}

export function berechneTage(eingabe: TageEingabe): TageErgebnis | null {
  const { startDatum, endDatum, mitzaehlen } = eingabe;

  // Normalisieren auf Mitternacht
  const start = new Date(startDatum.getFullYear(), startDatum.getMonth(), startDatum.getDate());
  const ende = new Date(endDatum.getFullYear(), endDatum.getMonth(), endDatum.getDate());

  if (isNaN(start.getTime()) || isNaN(ende.getTime())) return null;

  // Sicherstellen, dass Start <= Ende
  const [frueh, spaet] = start <= ende ? [start, ende] : [ende, start];

  // Differenz in Millisekunden → Tage
  const diffMs = spaet.getTime() - frueh.getTime();
  let tage = Math.round(diffMs / (1000 * 60 * 60 * 24));

  // Wenn Start- und Endtag mitzählen: +1
  if (mitzaehlen && tage >= 0) {
    tage += 1;
  }

  const wochen = Math.floor(tage / 7);
  const restTage = tage % 7;

  // Arbeitstage berechnen
  let arbeitstage = zaehleArbeitstage(frueh, spaet);
  if (mitzaehlen) {
    // Auch den letzten Tag prüfen
    const letzterTag = spaet.getDay();
    if (letzterTag !== 0 && letzterTag !== 6) {
      arbeitstage++;
    }
  }
  const wochenendtage = tage - arbeitstage;

  // Monate/Jahre-Berechnung
  const monatsDiff = berechneMonate(frueh, spaet);
  const gesamtMonate = monatsDiff.jahre * 12 + monatsDiff.monate;

  return {
    tage,
    wochen,
    restTage,
    monate: gesamtMonate,
    restTageNachMonaten: monatsDiff.tage + (mitzaehlen ? 1 : 0),
    jahre: monatsDiff.jahre,
    restMonateNachJahren: monatsDiff.monate,
    restTageNachJahrenMonaten: monatsDiff.tage + (mitzaehlen ? 1 : 0),
    arbeitstage,
    wochenendtage,
  };
}

/**
 * Formatiert ein Date-Objekt als deutsches Datum (TT.MM.JJJJ).
 */
export function formatDatum(datum: Date): string {
  const tag = String(datum.getDate()).padStart(2, '0');
  const monat = String(datum.getMonth() + 1).padStart(2, '0');
  const jahr = datum.getFullYear();
  return `${tag}.${monat}.${jahr}`;
}

/**
 * Parst ein deutsches Datum (TT.MM.JJJJ) zu einem Date-Objekt.
 */
export function parseDeutschesDatum(text: string): Date | null {
  // Akzeptiert TT.MM.JJJJ und T.M.JJJJ
  const match = text.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
  if (!match) return null;
  const tag = parseInt(match[1], 10);
  const monat = parseInt(match[2], 10);
  const jahr = parseInt(match[3], 10);
  if (monat < 1 || monat > 12 || tag < 1 || tag > 31) return null;
  const datum = new Date(jahr, monat - 1, tag);
  // Prüfen ob gültiges Datum (z.B. 31.02. → ungültig)
  if (datum.getDate() !== tag || datum.getMonth() !== monat - 1) return null;
  return datum;
}
