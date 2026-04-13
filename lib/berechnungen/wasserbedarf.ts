export type AktivitaetsLevel = 'kaum' | 'leicht' | 'maessig' | 'sehr' | 'extrem';
export type SchwangerStillend = 'nein' | 'schwanger' | 'stillend';

export interface WasserbedarfEingabe {
  gewicht: number;
  aktivitaet: AktivitaetsLevel;
  sportMinuten: number;
  heiss: boolean;
  schwangerStillend: SchwangerStillend;
}

export interface WasserbedarfErgebnis {
  basisbedarf: number;       // ml
  sportZuschlag: number;     // ml
  hitzeZuschlag: number;     // ml
  schwangerZuschlag: number; // ml
  gesamtMl: number;
  gesamtLiter: number;
  anzahlGlaeser: number;     // à 250 ml
}

const AKTIVITAETS_FAKTOREN: Record<AktivitaetsLevel, number> = {
  kaum: 30,
  leicht: 35,
  maessig: 40,
  sehr: 45,
  extrem: 50,
};

export function berechneWasserbedarf(eingabe: WasserbedarfEingabe): WasserbedarfErgebnis | null {
  const { gewicht, aktivitaet, sportMinuten, heiss, schwangerStillend } = eingabe;

  if (gewicht <= 0) return null;

  const faktor = AKTIVITAETS_FAKTOREN[aktivitaet];
  const basisbedarf = gewicht * faktor;

  const sportZuschlag = sportMinuten > 0 ? (sportMinuten / 30) * 350 : 0;

  const hitzeZuschlag = heiss ? 500 : 0;

  let schwangerZuschlag = 0;
  if (schwangerStillend === 'schwanger') schwangerZuschlag = 300;
  if (schwangerStillend === 'stillend') schwangerZuschlag = 700;

  const gesamtMl = basisbedarf + sportZuschlag + hitzeZuschlag + schwangerZuschlag;
  const gesamtLiter = Math.round(gesamtMl / 100) / 10; // 1 Dezimalstelle
  const anzahlGlaeser = Math.ceil(gesamtMl / 250);

  return {
    basisbedarf: Math.round(basisbedarf),
    sportZuschlag: Math.round(sportZuschlag),
    hitzeZuschlag,
    schwangerZuschlag,
    gesamtMl: Math.round(gesamtMl),
    gesamtLiter,
    anzahlGlaeser,
  };
}
