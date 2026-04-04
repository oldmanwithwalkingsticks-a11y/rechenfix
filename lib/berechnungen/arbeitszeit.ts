export interface TagesEingabe {
  beginn: string; // HH:MM
  ende: string;   // HH:MM
  pausen: number[]; // Minuten
}

export interface TagesErgebnis {
  bruttoMinuten: number;
  pauseMinuten: number;
  nettoMinuten: number;
  nettoStunden: number;
  nettoRestMinuten: number;
  dezimal: number;
  hinweise: string[];
}

export interface WochenTag {
  label: string;
  frei: boolean;
  beginn: string;
  ende: string;
  pause: number;
}

export interface WochenErgebnis {
  tage: { label: string; ergebnis: TagesErgebnis | null }[];
  gesamtMinuten: number;
  gesamtStunden: number;
  gesamtRestMinuten: number;
  gesamtDezimal: number;
  arbeitstage: number;
  durchschnittMinuten: number;
  durchschnittDezimal: number;
  hinweise: string[];
}

function parseZeit(zeit: string): number | null {
  const match = zeit.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  const h = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  if (h < 0 || h > 23 || m < 0 || m > 59) return null;
  return h * 60 + m;
}

function pruefeHinweise(nettoMinuten: number, pauseMinuten: number): string[] {
  const hinweise: string[] = [];
  if (nettoMinuten > 600) {
    hinweise.push('Die tägliche Arbeitszeit darf laut ArbZG 10 Stunden nicht überschreiten.');
  }
  if (nettoMinuten > 540 && pauseMinuten < 45) {
    hinweise.push('Ab 9 Stunden Arbeitszeit sind laut ArbZG mindestens 45 Minuten Pause vorgeschrieben.');
  } else if (nettoMinuten > 360 && pauseMinuten < 30) {
    hinweise.push('Ab 6 Stunden Arbeitszeit sind laut ArbZG mindestens 30 Minuten Pause vorgeschrieben.');
  }
  return hinweise;
}

export function berechneTageszeit(eingabe: TagesEingabe): TagesErgebnis | null {
  const start = parseZeit(eingabe.beginn);
  const end = parseZeit(eingabe.ende);
  if (start === null || end === null) return null;

  // Nachtschicht: Ende < Beginn → über Mitternacht
  const bruttoMinuten = end >= start ? end - start : (1440 - start) + end;
  if (bruttoMinuten <= 0) return null;

  const pauseMinuten = eingabe.pausen.reduce((s, p) => s + Math.max(0, p), 0);
  const nettoMinuten = Math.max(0, bruttoMinuten - pauseMinuten);

  const nettoStunden = Math.floor(nettoMinuten / 60);
  const nettoRestMinuten = nettoMinuten % 60;
  const dezimal = Math.round((nettoMinuten / 60) * 100) / 100;

  const hinweise = pruefeHinweise(nettoMinuten, pauseMinuten);

  return {
    bruttoMinuten,
    pauseMinuten,
    nettoMinuten,
    nettoStunden,
    nettoRestMinuten,
    dezimal,
    hinweise,
  };
}

export function berechneWoche(tage: WochenTag[]): WochenErgebnis | null {
  const ergebnisse: { label: string; ergebnis: TagesErgebnis | null }[] = [];
  let gesamtMinuten = 0;
  let arbeitstage = 0;
  const alleHinweise: string[] = [];

  for (const tag of tage) {
    if (tag.frei) {
      ergebnisse.push({ label: tag.label, ergebnis: null });
      continue;
    }

    const erg = berechneTageszeit({
      beginn: tag.beginn,
      ende: tag.ende,
      pausen: [tag.pause],
    });

    if (erg) {
      gesamtMinuten += erg.nettoMinuten;
      arbeitstage++;
      for (const h of erg.hinweise) {
        const prefixed = `${tag.label}: ${h}`;
        if (!alleHinweise.includes(prefixed)) alleHinweise.push(prefixed);
      }
    }

    ergebnisse.push({ label: tag.label, ergebnis: erg });
  }

  if (arbeitstage === 0) return null;

  const durchschnittMinuten = Math.round(gesamtMinuten / arbeitstage);

  return {
    tage: ergebnisse,
    gesamtMinuten,
    gesamtStunden: Math.floor(gesamtMinuten / 60),
    gesamtRestMinuten: gesamtMinuten % 60,
    gesamtDezimal: Math.round((gesamtMinuten / 60) * 100) / 100,
    arbeitstage,
    durchschnittMinuten,
    durchschnittDezimal: Math.round((durchschnittMinuten / 60) * 100) / 100,
    hinweise: alleHinweise,
  };
}
