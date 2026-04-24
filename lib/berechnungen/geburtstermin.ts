export type Methode = 'periode' | 'empfaengnis' | 'ultraschall';

export interface GeburtsterminEingabe {
  methode: Methode;
  // Periode
  periodeDatum?: string;
  zyklusLaenge?: number;
  // Empfängnis
  empfaengnisDatum?: string;
  // Ultraschall
  ultraschallDatum?: string;
  ultraschallWochen?: number;
  ultraschallTage?: number;
}

export interface Meilenstein {
  icon: string;
  label: string;
  datum: Date;
  beschreibung: string;
  link?: { text: string; href: string };
  aktiv: boolean;
  vergangen: boolean;
}

export interface GeburtsterminErgebnis {
  geburtstermin: Date;
  schwangerschaftsBeginn: Date;
  aktuelleSSW: number;
  aktuelleTage: number;
  trimester: number;
  verbleibendeTage: number;
  fortschrittProzent: number;
  empfaengnisZeitraum: Date;
  meilensteine: Meilenstein[];
  terminVerstrichen: boolean;
  ueberTermin: boolean;
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function diffDays(a: Date, b: Date): number {
  const msPerDay = 86400000;
  return Math.floor((a.getTime() - b.getTime()) / msPerDay);
}

function getTrimester(wochen: number): number {
  if (wochen <= 12) return 1;
  if (wochen <= 27) return 2;
  return 3;
}

export function berechneGeburtstermin(eingabe: GeburtsterminEingabe): GeburtsterminErgebnis | null {
  let schwangerschaftsBeginn: Date;

  if (eingabe.methode === 'periode') {
    if (!eingabe.periodeDatum) return null;
    // Zeitzonen-sicherer Parser (analog ssw.ts): 'YYYY-MM-DD' + 'T00:00:00'
    // wird als lokale Mitternacht interpretiert, sonst als UTC-Mitternacht.
    schwangerschaftsBeginn = new Date(eingabe.periodeDatum + 'T00:00:00');
    const zyklusKorrektur = (eingabe.zyklusLaenge || 28) - 28;
    schwangerschaftsBeginn = addDays(schwangerschaftsBeginn, zyklusKorrektur);
  } else if (eingabe.methode === 'empfaengnis') {
    if (!eingabe.empfaengnisDatum) return null;
    // Empfängnis = ca. SSW 2+0, also Beginn = Empfängnis - 14 Tage
    schwangerschaftsBeginn = addDays(new Date(eingabe.empfaengnisDatum + 'T00:00:00'), -14);
  } else if (eingabe.methode === 'ultraschall') {
    if (!eingabe.ultraschallDatum) return null;
    const wochen = eingabe.ultraschallWochen || 0;
    const tage = eingabe.ultraschallTage || 0;
    const vergangeneTage = wochen * 7 + tage;
    schwangerschaftsBeginn = addDays(new Date(eingabe.ultraschallDatum + 'T00:00:00'), -vergangeneTage);
  } else {
    return null;
  }

  const geburtstermin = addDays(schwangerschaftsBeginn, 280);
  const heute = new Date();
  heute.setHours(0, 0, 0, 0);

  const vergangen = diffDays(heute, schwangerschaftsBeginn);
  const aktuelleSSW = Math.floor(vergangen / 7);
  const aktuelleTage = vergangen % 7;
  const trimester = getTrimester(aktuelleSSW);
  const verbleibendeTage = diffDays(geburtstermin, heute);
  const fortschrittProzent = Math.min(Math.max((vergangen / 280) * 100, 0), 100);

  // Empfängniszeitraum: ca. 2 Wochen nach Beginn (Eisprung)
  const empfaengnisZeitraum = addDays(schwangerschaftsBeginn, 14);

  const terminVerstrichen = verbleibendeTage < 0;
  const ueberTermin = aktuelleSSW >= 42;

  // Meilensteine
  const meilensteine: Meilenstein[] = [
    {
      icon: '🔬',
      label: 'Ersttrimester-Screening',
      datum: addDays(schwangerschaftsBeginn, 11 * 7),
      beschreibung: 'SSW 11–14: Nackenfaltenmessung und Bluttest',
      aktiv: aktuelleSSW >= 11 && aktuelleSSW <= 14,
      vergangen: aktuelleSSW > 14,
    },
    {
      icon: '🍼',
      label: 'Organscreening (Feindiagnostik)',
      datum: addDays(schwangerschaftsBeginn, 19 * 7),
      beschreibung: 'SSW 19–22: Detaillierte Ultraschalluntersuchung',
      aktiv: aktuelleSSW >= 19 && aktuelleSSW <= 22,
      vergangen: aktuelleSSW > 22,
    },
    {
      icon: '💉',
      label: 'Rhesusfaktor-Test',
      datum: addDays(schwangerschaftsBeginn, 24 * 7),
      beschreibung: 'SSW 24–27: Bluttest auf Antikörper',
      aktiv: aktuelleSSW >= 24 && aktuelleSSW <= 27,
      vergangen: aktuelleSSW > 27,
    },
    {
      icon: '🏥',
      label: 'Mutterschutz-Beginn',
      datum: addDays(geburtstermin, -42),
      beschreibung: '6 Wochen vor dem errechneten Termin',
      link: { text: 'Elterngeld-Rechner →', href: '/finanzen/elterngeld-rechner' },
      aktiv: false,
      vergangen: heute >= addDays(geburtstermin, -42),
    },
    {
      icon: '👶',
      label: 'Errechneter Geburtstermin',
      datum: geburtstermin,
      beschreibung: 'Voraussichtlicher Entbindungstermin',
      aktiv: false,
      vergangen: terminVerstrichen,
    },
    {
      icon: '🏥',
      label: 'Mutterschutz-Ende',
      datum: addDays(geburtstermin, 56),
      beschreibung: '8 Wochen nach dem errechneten Termin',
      aktiv: false,
      vergangen: heute >= addDays(geburtstermin, 56),
    },
  ];

  return {
    geburtstermin,
    schwangerschaftsBeginn,
    aktuelleSSW,
    aktuelleTage,
    trimester,
    verbleibendeTage,
    fortschrittProzent,
    empfaengnisZeitraum,
    meilensteine,
    terminVerstrichen,
    ueberTermin,
  };
}
