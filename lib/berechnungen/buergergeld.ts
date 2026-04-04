export type Bedarfsgemeinschaft = 'alleinstehend' | 'paar' | 'paar-mit-kindern';

export type Kindergruppe = '0-5' | '6-13' | '14-17' | '18-24';

export interface KindEintrag {
  alter: Kindergruppe;
}

export interface BuergergeldEingabe {
  bedarfsgemeinschaft: Bedarfsgemeinschaft;
  kinder: KindEintrag[];
  warmmiete: number;
  heizkosten: number;
  einkommen: number;
  vermoegen: number;
}

export interface BuergergeldErgebnis {
  gesamtAnspruch: number;
  regelbedarfErwachsene: number;
  regelbedarfKinder: number;
  regelbedarfGesamt: number;
  unterkunftskosten: number;
  anrechenbareEinkommen: number;
  freibetragEinkommen: number;
  vermoegensFreibetrag: number;
  vermoegenOk: boolean;
  bedarfGedeckt: boolean;
  personenImHaushalt: number;
  aufschluesselungErwachsene: { label: string; betrag: number }[];
  aufschluesselungKinder: { label: string; betrag: number }[];
}

// Regelsätze 2026
const REGELSATZ_ALLEINSTEHEND = 563;
const REGELSATZ_PAAR_PRO_PERSON = 506;
const REGELSATZ_KIND: Record<Kindergruppe, number> = {
  '0-5': 357,
  '6-13': 390,
  '14-17': 471,
  '18-24': 451,
};

const KINDERGRUPPE_LABEL: Record<Kindergruppe, string> = {
  '0-5': '0–5 Jahre',
  '6-13': '6–13 Jahre',
  '14-17': '14–17 Jahre',
  '18-24': '18–24 Jahre',
};

// Vermögensfreibeträge
const VERMOEGEN_ERSTE_PERSON = 40000;
const VERMOEGEN_WEITERE_PERSON = 15000;

function berechneEinkommensFreibetrag(brutto: number, hatKinder: boolean): number {
  if (brutto <= 0) return 0;

  let freibetrag = 0;

  // Erste 100€ komplett frei
  const stufe1 = Math.min(brutto, 100);
  freibetrag += stufe1;

  // 100-520€: 20% Freibetrag
  if (brutto > 100) {
    const stufe2 = Math.min(brutto, 520) - 100;
    freibetrag += stufe2 * 0.2;
  }

  // 520-1000€: 30% Freibetrag
  if (brutto > 520) {
    const stufe3 = Math.min(brutto, 1000) - 520;
    freibetrag += stufe3 * 0.3;
  }

  // 1000-1200€ (ohne Kind) / 1000-1500€ (mit Kind): 10% Freibetrag
  const obergrenze = hatKinder ? 1500 : 1200;
  if (brutto > 1000) {
    const stufe4 = Math.min(brutto, obergrenze) - 1000;
    freibetrag += stufe4 * 0.1;
  }

  return Math.round(freibetrag * 100) / 100;
}

export function berechneBuergergeld(eingabe: BuergergeldEingabe): BuergergeldErgebnis | null {
  const { bedarfsgemeinschaft, kinder, warmmiete, heizkosten, einkommen, vermoegen } = eingabe;

  if (warmmiete < 0 || heizkosten < 0 || einkommen < 0 || vermoegen < 0) return null;

  // Erwachsene berechnen
  const aufschluesselungErwachsene: { label: string; betrag: number }[] = [];
  let regelbedarfErwachsene = 0;

  if (bedarfsgemeinschaft === 'alleinstehend') {
    regelbedarfErwachsene = REGELSATZ_ALLEINSTEHEND;
    aufschluesselungErwachsene.push({ label: 'Alleinstehende/r', betrag: REGELSATZ_ALLEINSTEHEND });
  } else {
    regelbedarfErwachsene = REGELSATZ_PAAR_PRO_PERSON * 2;
    aufschluesselungErwachsene.push({ label: 'Partner/in 1', betrag: REGELSATZ_PAAR_PRO_PERSON });
    aufschluesselungErwachsene.push({ label: 'Partner/in 2', betrag: REGELSATZ_PAAR_PRO_PERSON });
  }

  // Kinder berechnen
  const aufschluesselungKinder: { label: string; betrag: number }[] = [];
  let regelbedarfKinder = 0;

  kinder.forEach((kind, i) => {
    const betrag = REGELSATZ_KIND[kind.alter];
    regelbedarfKinder += betrag;
    aufschluesselungKinder.push({
      label: `Kind ${i + 1} (${KINDERGRUPPE_LABEL[kind.alter]})`,
      betrag,
    });
  });

  const regelbedarfGesamt = regelbedarfErwachsene + regelbedarfKinder;

  // Unterkunftskosten
  const unterkunftskosten = warmmiete + heizkosten;

  // Gesamtbedarf
  const gesamtBedarf = regelbedarfGesamt + unterkunftskosten;

  // Einkommensanrechnung
  const hatKinder = kinder.length > 0 || bedarfsgemeinschaft === 'paar-mit-kindern';
  const freibetragEinkommen = berechneEinkommensFreibetrag(einkommen, hatKinder);
  const anrechenbareEinkommen = Math.max(0, einkommen - freibetragEinkommen);

  // Anspruch
  const gesamtAnspruch = Math.max(0, Math.round((gesamtBedarf - anrechenbareEinkommen) * 100) / 100);

  // Vermögensprüfung
  const anzahlErwachsene = bedarfsgemeinschaft === 'alleinstehend' ? 1 : 2;
  const personenImHaushalt = anzahlErwachsene + kinder.length;
  const vermoegensFreibetrag = VERMOEGEN_ERSTE_PERSON + (personenImHaushalt - 1) * VERMOEGEN_WEITERE_PERSON;
  const vermoegenOk = vermoegen <= vermoegensFreibetrag;

  const bedarfGedeckt = gesamtAnspruch <= 0;

  return {
    gesamtAnspruch,
    regelbedarfErwachsene,
    regelbedarfKinder,
    regelbedarfGesamt,
    unterkunftskosten,
    anrechenbareEinkommen: Math.round(anrechenbareEinkommen * 100) / 100,
    freibetragEinkommen,
    vermoegensFreibetrag,
    vermoegenOk,
    bedarfGedeckt,
    personenImHaushalt,
    aufschluesselungErwachsene,
    aufschluesselungKinder,
  };
}
