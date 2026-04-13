export type Kuendiger = 'arbeitnehmer' | 'arbeitgeber';

export interface KuendigungsfristEingabe {
  kuendiger: Kuendiger;
  beschaeftigtSeit: string; // ISO date
  probezeit: boolean;
  probezeitDauer: 3 | 6; // Monate
  kuendigungsDatum: string; // ISO date
  abweichendeFrist: boolean;
  individuelleFristWochen: number;
}

export interface KuendigungsfristErgebnis {
  letzterArbeitstag: Date;
  kuendigungsFristText: string;
  rechtsgrundlage: string;
  betriebszugehoerigkeitJahre: number;
  betriebszugehoerigkeitMonate: number;
  betriebszugehoerigkeitText: string;
  verbleibendeKalendertage: number;
  kuendigungsDatum: Date;
  istProbezeit: boolean;
  warnhinweise: string[];
}

function addDays(date: Date, days: number): Date {
  const r = new Date(date);
  r.setDate(r.getDate() + days);
  return r;
}

function addMonths(date: Date, months: number): Date {
  const r = new Date(date);
  r.setMonth(r.getMonth() + months);
  return r;
}

function endOfMonth(date: Date): Date {
  const r = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return r;
}

function nextFifteenthOrEndOfMonth(date: Date): Date {
  // Find the next 15. or end-of-month that is >= date
  const y = date.getFullYear();
  const m = date.getMonth();

  // Check 15. of current month
  const fifteenth = new Date(y, m, 15);
  if (fifteenth >= date) return fifteenth;

  // Check end of current month
  const eom = endOfMonth(date);
  if (eom >= date) return eom;

  // 15. of next month
  return new Date(y, m + 1, 15);
}

function nextEndOfMonth(date: Date): Date {
  const eom = endOfMonth(date);
  if (eom >= date) return eom;
  return endOfMonth(addMonths(date, 1));
}

function diffDays(a: Date, b: Date): number {
  const ms = 86400000;
  return Math.floor((a.getTime() - b.getTime()) / ms);
}

function calcBetriebszugehoerigkeit(von: Date, bis: Date): { jahre: number; monate: number; text: string; totalMonate: number } {
  let jahre = bis.getFullYear() - von.getFullYear();
  let monate = bis.getMonth() - von.getMonth();
  if (bis.getDate() < von.getDate()) monate--;
  if (monate < 0) {
    jahre--;
    monate += 12;
  }
  const totalMonate = jahre * 12 + monate;

  const parts: string[] = [];
  if (jahre > 0) parts.push(`${jahre} ${jahre === 1 ? 'Jahr' : 'Jahre'}`);
  if (monate > 0 || parts.length === 0) parts.push(`${monate} ${monate === 1 ? 'Monat' : 'Monate'}`);

  return { jahre, monate, text: parts.join(', '), totalMonate };
}

interface AgFrist {
  fristText: string;
  rechtsgrundlage: string;
  berechne: (kuendigungsDatum: Date) => Date;
}

function getAgFrist(zugehoerigkeitJahre: number): AgFrist {
  // § 622 Abs. 2 BGB — verlängerte Fristen nach Betriebszugehörigkeit
  if (zugehoerigkeitJahre >= 20) {
    return {
      fristText: '7 Monate zum Monatsende',
      rechtsgrundlage: '§ 622 Abs. 2 Satz 1 Nr. 7 BGB',
      berechne: (d) => nextEndOfMonth(addMonths(d, 7)),
    };
  }
  if (zugehoerigkeitJahre >= 15) {
    return {
      fristText: '6 Monate zum Monatsende',
      rechtsgrundlage: '§ 622 Abs. 2 Satz 1 Nr. 6 BGB',
      berechne: (d) => nextEndOfMonth(addMonths(d, 6)),
    };
  }
  if (zugehoerigkeitJahre >= 12) {
    return {
      fristText: '5 Monate zum Monatsende',
      rechtsgrundlage: '§ 622 Abs. 2 Satz 1 Nr. 5 BGB',
      berechne: (d) => nextEndOfMonth(addMonths(d, 5)),
    };
  }
  if (zugehoerigkeitJahre >= 10) {
    return {
      fristText: '4 Monate zum Monatsende',
      rechtsgrundlage: '§ 622 Abs. 2 Satz 1 Nr. 4 BGB',
      berechne: (d) => nextEndOfMonth(addMonths(d, 4)),
    };
  }
  if (zugehoerigkeitJahre >= 8) {
    return {
      fristText: '3 Monate zum Monatsende',
      rechtsgrundlage: '§ 622 Abs. 2 Satz 1 Nr. 3 BGB',
      berechne: (d) => nextEndOfMonth(addMonths(d, 3)),
    };
  }
  if (zugehoerigkeitJahre >= 5) {
    return {
      fristText: '2 Monate zum Monatsende',
      rechtsgrundlage: '§ 622 Abs. 2 Satz 1 Nr. 2 BGB',
      berechne: (d) => nextEndOfMonth(addMonths(d, 2)),
    };
  }
  if (zugehoerigkeitJahre >= 2) {
    return {
      fristText: '1 Monat zum Monatsende',
      rechtsgrundlage: '§ 622 Abs. 2 Satz 1 Nr. 1 BGB',
      berechne: (d) => nextEndOfMonth(addMonths(d, 1)),
    };
  }
  // Unter 2 Jahre
  return {
    fristText: '4 Wochen zum 15. oder zum Monatsende',
    rechtsgrundlage: '§ 622 Abs. 1 BGB',
    berechne: (d) => nextFifteenthOrEndOfMonth(addDays(d, 28)),
  };
}

export function berechneKuendigungsfrist(eingabe: KuendigungsfristEingabe): KuendigungsfristErgebnis | null {
  if (!eingabe.beschaeftigtSeit || !eingabe.kuendigungsDatum) return null;

  const beschaeftigtSeit = new Date(eingabe.beschaeftigtSeit);
  const kuendigungsDatum = new Date(eingabe.kuendigungsDatum);

  if (isNaN(beschaeftigtSeit.getTime()) || isNaN(kuendigungsDatum.getTime())) return null;

  const heute = new Date();
  heute.setHours(0, 0, 0, 0);

  const zugehoerigkeit = calcBetriebszugehoerigkeit(beschaeftigtSeit, kuendigungsDatum);
  const warnhinweise: string[] = [];

  let letzterArbeitstag: Date;
  let kuendigungsFristText: string;
  let rechtsgrundlage: string;
  let istProbezeit = false;

  if (eingabe.abweichendeFrist) {
    // Individuelle Frist
    const tage = eingabe.individuelleFristWochen * 7;
    letzterArbeitstag = addDays(kuendigungsDatum, tage);
    kuendigungsFristText = `${eingabe.individuelleFristWochen} Wochen (vertraglich/tariflich)`;
    rechtsgrundlage = 'Arbeits- oder Tarifvertrag';
  } else if (eingabe.probezeit) {
    // Prüfe ob noch in Probezeit
    const probezeitEnde = addMonths(beschaeftigtSeit, eingabe.probezeitDauer);
    if (kuendigungsDatum <= probezeitEnde) {
      istProbezeit = true;
      letzterArbeitstag = addDays(kuendigungsDatum, 14);
      kuendigungsFristText = '2 Wochen (Probezeit)';
      rechtsgrundlage = '§ 622 Abs. 3 BGB';
    } else {
      // Probezeit vorbei → normale Fristen
      if (eingabe.kuendiger === 'arbeitgeber') {
        const frist = getAgFrist(zugehoerigkeit.jahre);
        letzterArbeitstag = frist.berechne(kuendigungsDatum);
        kuendigungsFristText = frist.fristText;
        rechtsgrundlage = frist.rechtsgrundlage;
      } else {
        letzterArbeitstag = nextFifteenthOrEndOfMonth(addDays(kuendigungsDatum, 28));
        kuendigungsFristText = '4 Wochen zum 15. oder zum Monatsende';
        rechtsgrundlage = '§ 622 Abs. 1 BGB';
      }
    }
  } else if (eingabe.kuendiger === 'arbeitgeber') {
    const frist = getAgFrist(zugehoerigkeit.jahre);
    letzterArbeitstag = frist.berechne(kuendigungsDatum);
    kuendigungsFristText = frist.fristText;
    rechtsgrundlage = frist.rechtsgrundlage;
  } else {
    // Arbeitnehmer: immer 4 Wochen zum 15./Monatsende
    letzterArbeitstag = nextFifteenthOrEndOfMonth(addDays(kuendigungsDatum, 28));
    kuendigungsFristText = '4 Wochen zum 15. oder zum Monatsende';
    rechtsgrundlage = '§ 622 Abs. 1 BGB';
  }

  // Warnhinweise
  if (eingabe.kuendiger === 'arbeitnehmer') {
    warnhinweise.push('Die Kündigung muss schriftlich erfolgen (§ 623 BGB). Eine Kündigung per E-Mail, SMS oder mündlich ist unwirksam!');
  }

  if (eingabe.kuendiger === 'arbeitgeber' && zugehoerigkeit.totalMonate > 6) {
    warnhinweise.push('Es könnte Kündigungsschutz nach dem KSchG bestehen (ab 6 Monaten Betriebszugehörigkeit und bei Betrieben mit mehr als 10 Arbeitnehmern).');
  }

  warnhinweise.push('Melden Sie sich spätestens 3 Tage nach Kenntnis der Kündigung bei der Agentur für Arbeit arbeitssuchend (§ 38 SGB III).');

  const verbleibendeKalendertage = Math.max(0, diffDays(letzterArbeitstag, heute));

  return {
    letzterArbeitstag,
    kuendigungsFristText,
    rechtsgrundlage,
    betriebszugehoerigkeitJahre: zugehoerigkeit.jahre,
    betriebszugehoerigkeitMonate: zugehoerigkeit.monate,
    betriebszugehoerigkeitText: zugehoerigkeit.text,
    verbleibendeKalendertage,
    kuendigungsDatum,
    istProbezeit,
    warnhinweise,
  };
}
