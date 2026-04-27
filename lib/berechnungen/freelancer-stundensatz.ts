import { anzahlBundesweiterFeiertageMoBisFr } from './feiertage';

export interface FreelancerEingabe {
  nettoWunsch: number;
  arbeitstageProWoche: number;
  urlaubstage: number;
  krankheitstage: number;
  produktiveStunden: number;
  krankenversicherung: number;
  rentenvorsorge: number;
  betriebsausgaben: number;
  steuersatz: number;
  kleinunternehmer: boolean;
}

export interface KostenAufschluesselung {
  label: string;
  betrag: number;
  farbe: string;
  anteilProzent: number;
}

export interface FreelancerErgebnis {
  stundensatzNetto: number;
  stundensatzBrutto: number;
  tagessatzNetto: number;
  tagessatzBrutto: number;
  monatsumsatzNoetig: number;
  jahresumsatzNoetig: number;
  fakturierbareStundenJahr: number;
  arbeitstageJahr: number;
  bruttoBedarfMonat: number;
  gesamtVorSteuernMonat: number;
  steuernMonat: number;
  aufschluesselung: KostenAufschluesselung[];
  warnungNiedrig: boolean;
}

export function berechneFreelancerStundensatz(
  e: FreelancerEingabe,
  jahr: number = new Date().getFullYear()
): FreelancerErgebnis {
  const feiertageMoBisFr = anzahlBundesweiterFeiertageMoBisFr(jahr);
  const arbeitstageJahr = Math.max((e.arbeitstageProWoche * 52) - e.urlaubstage - e.krankheitstage - feiertageMoBisFr, 1);
  const fakturierbareStundenJahr = arbeitstageJahr * e.produktiveStunden;

  const gesamtVorSteuernMonat = e.nettoWunsch + e.krankenversicherung + e.rentenvorsorge + e.betriebsausgaben;
  const steuersatzFaktor = Math.min(e.steuersatz, 99) / 100;
  const bruttoBedarfMonat = gesamtVorSteuernMonat / (1 - steuersatzFaktor);
  const steuernMonat = bruttoBedarfMonat - gesamtVorSteuernMonat;

  const jahresBrutto = bruttoBedarfMonat * 12;

  const stundensatzNetto = fakturierbareStundenJahr > 0 ? jahresBrutto / fakturierbareStundenJahr : 0;
  const stundensatzBrutto = e.kleinunternehmer ? stundensatzNetto : stundensatzNetto * 1.19;

  const tagessatzNetto = stundensatzNetto * e.produktiveStunden;
  const tagessatzBrutto = e.kleinunternehmer ? tagessatzNetto : tagessatzNetto * 1.19;

  const monatsumsatzNoetig = bruttoBedarfMonat;
  const jahresumsatzNoetig = jahresBrutto;

  // Aufschlüsselung für Tortendiagramm
  const gesamtMonat = bruttoBedarfMonat;
  const aufschluesselung: KostenAufschluesselung[] = [
    { label: 'Netto-Einkommen', betrag: e.nettoWunsch, farbe: '#22c55e', anteilProzent: (e.nettoWunsch / gesamtMonat) * 100 },
    { label: 'Einkommensteuer', betrag: steuernMonat, farbe: '#ef4444', anteilProzent: (steuernMonat / gesamtMonat) * 100 },
    { label: 'Krankenversicherung', betrag: e.krankenversicherung, farbe: '#3b82f6', anteilProzent: (e.krankenversicherung / gesamtMonat) * 100 },
    { label: 'Rentenvorsorge', betrag: e.rentenvorsorge, farbe: '#a855f7', anteilProzent: (e.rentenvorsorge / gesamtMonat) * 100 },
    { label: 'Betriebsausgaben', betrag: e.betriebsausgaben, farbe: '#f59e0b', anteilProzent: (e.betriebsausgaben / gesamtMonat) * 100 },
  ];

  return {
    stundensatzNetto,
    stundensatzBrutto,
    tagessatzNetto,
    tagessatzBrutto,
    monatsumsatzNoetig,
    jahresumsatzNoetig,
    fakturierbareStundenJahr,
    arbeitstageJahr,
    bruttoBedarfMonat,
    gesamtVorSteuernMonat,
    steuernMonat,
    aufschluesselung,
    warnungNiedrig: stundensatzNetto < 50,
  };
}
