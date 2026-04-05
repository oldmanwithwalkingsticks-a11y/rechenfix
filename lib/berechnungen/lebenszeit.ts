export interface LebenszeitEingabe {
  geburtsdatum: Date;
  geschlecht: 'maennlich' | 'weiblich';
}

export interface LebenszeitErgebnis {
  // Gelebt
  gesamtTage: number;
  gesamtStunden: number;
  gesamtMinuten: number;
  gesamtSekunden: number;
  alterJahre: number;
  alterMonate: number;
  alterTageRest: number;

  // Zeitverteilung
  jahreGeschlafen: number;
  jahreEssen: number;
  stundenSmartphone: number;
  herzschlaege: number;
  atemzuege: number;
  jahreArbeit: number;

  // Lebenserwartung
  lebenserwartung: number;
  verbleibendeTage: number;
  verbleibendeWochenenden: number;
  prozentGelebt: number;
}

const LEBENSERWARTUNG = {
  maennlich: 78.5,
  weiblich: 83.2,
};

// Durchschnittswerte (Quellen: WHO, Statista, Destatis)
const SCHLAF_ANTEIL = 1 / 3;           // ~8h/Tag
const ESSEN_JAHRE = 5;                  // ~5 Jahre im Leben
const SMARTPHONE_STUNDEN_TAG = 4;       // Durchschnitt DE
const HERZSCHLAEGE_MINUTE = 70;
const ATEMZUEGE_MINUTE = 15;
const ARBEIT_JAHRE = 10.5;              // ~10.5 Jahre bei 40h/Woche, 35 Arbeitsjahre

export function berechneLebenszeit(eingabe: LebenszeitEingabe): LebenszeitErgebnis {
  const jetzt = new Date();
  const diffMs = jetzt.getTime() - eingabe.geburtsdatum.getTime();

  const gesamtTage = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const gesamtStunden = Math.floor(diffMs / (1000 * 60 * 60));
  const gesamtMinuten = Math.floor(diffMs / (1000 * 60));
  const gesamtSekunden = Math.floor(diffMs / 1000);

  // Alter berechnen
  let alterJahre = jetzt.getFullYear() - eingabe.geburtsdatum.getFullYear();
  let alterMonate = jetzt.getMonth() - eingabe.geburtsdatum.getMonth();
  let alterTageRest = jetzt.getDate() - eingabe.geburtsdatum.getDate();

  if (alterTageRest < 0) {
    alterMonate--;
    const vormonat = new Date(jetzt.getFullYear(), jetzt.getMonth(), 0);
    alterTageRest += vormonat.getDate();
  }
  if (alterMonate < 0) {
    alterJahre--;
    alterMonate += 12;
  }

  // Lebenszeit-Statistiken
  const gelebteJahre = gesamtTage / 365.25;
  const jahreGeschlafen = gelebteJahre * SCHLAF_ANTEIL;
  const anteilGelebt = gelebteJahre / LEBENSERWARTUNG[eingabe.geschlecht];
  const jahreEssen = ESSEN_JAHRE * Math.min(anteilGelebt, 1);
  const stundenSmartphone = gesamtTage * SMARTPHONE_STUNDEN_TAG;
  const herzschlaege = gesamtMinuten * HERZSCHLAEGE_MINUTE;
  const atemzuege = gesamtMinuten * ATEMZUEGE_MINUTE;
  const jahreArbeit = ARBEIT_JAHRE * Math.min(anteilGelebt, 1);

  // Lebenserwartung
  const lebenserwartung = LEBENSERWARTUNG[eingabe.geschlecht];
  const erwarteteGesamtTage = Math.round(lebenserwartung * 365.25);
  const verbleibendeTage = Math.max(0, erwarteteGesamtTage - gesamtTage);
  const verbleibendeWochenenden = Math.floor(verbleibendeTage / 7);
  const prozentGelebt = Math.min(100, (gesamtTage / erwarteteGesamtTage) * 100);

  return {
    gesamtTage,
    gesamtStunden,
    gesamtMinuten,
    gesamtSekunden,
    alterJahre,
    alterMonate,
    alterTageRest,
    jahreGeschlafen,
    jahreEssen,
    stundenSmartphone,
    herzschlaege,
    atemzuege,
    jahreArbeit,
    lebenserwartung,
    verbleibendeTage,
    verbleibendeWochenenden,
    prozentGelebt,
  };
}
