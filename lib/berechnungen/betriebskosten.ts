export interface BetriebskostenEingabe {
  geschaeftsform: 'freelancer' | 'gmbh' | 'ug';
  miete: number;
  versicherungen: number;
  software: number;
  telefonInternet: number;
  buchhaltung: number;
  sonstigeFix: number;
  material: number;
  fahrtkosten: number;
  marketing: number;
  unternehmerlohn: number;
}

export interface KostenBlock {
  label: string;
  betrag: number;
  farbe: string;
  anteilProzent: number;
}

export interface BetriebskostenErgebnis {
  fixkostenGesamt: number;
  variableKostenGesamt: number;
  unternehmerlohn: number;
  gesamtMonat: number;
  gesamtJahr: number;
  noetigerUmsatzNetto: number;
  noetigerUmsatzBrutto: number;
  noetigerStundensatz: number;
  aufschluesselung: KostenBlock[];
  fixkostenDetail: { label: string; betrag: number }[];
  variableKostenDetail: { label: string; betrag: number }[];
}

const FAKTURIERBARE_STUNDEN_JAHR = 1400;

export function berechneBetriebskosten(e: BetriebskostenEingabe): BetriebskostenErgebnis {
  const fixkostenDetail = [
    { label: 'Miete / Büro', betrag: e.miete },
    { label: 'Versicherungen', betrag: e.versicherungen },
    { label: 'Software / Tools', betrag: e.software },
    { label: 'Telefon / Internet', betrag: e.telefonInternet },
    { label: 'Buchhaltung / Steuerberater', betrag: e.buchhaltung },
    { label: 'Sonstige Fixkosten', betrag: e.sonstigeFix },
  ];

  const variableKostenDetail = [
    { label: 'Material / Wareneinsatz', betrag: e.material },
    { label: 'Fahrtkosten', betrag: e.fahrtkosten },
    { label: 'Marketing', betrag: e.marketing },
  ];

  const fixkostenGesamt = fixkostenDetail.reduce((s, k) => s + k.betrag, 0);
  const variableKostenGesamt = variableKostenDetail.reduce((s, k) => s + k.betrag, 0);
  const unternehmerlohn = e.unternehmerlohn;

  const gesamtMonat = fixkostenGesamt + variableKostenGesamt + unternehmerlohn;
  const gesamtJahr = gesamtMonat * 12;

  const noetigerUmsatzNetto = gesamtMonat;
  const noetigerUmsatzBrutto = gesamtMonat * 1.19;

  const noetigerStundensatz = gesamtJahr / FAKTURIERBARE_STUNDEN_JAHR;

  const aufschluesselung: KostenBlock[] = gesamtMonat > 0
    ? [
        { label: 'Fixkosten', betrag: fixkostenGesamt, farbe: '#3b82f6', anteilProzent: (fixkostenGesamt / gesamtMonat) * 100 },
        { label: 'Variable Kosten', betrag: variableKostenGesamt, farbe: '#f59e0b', anteilProzent: (variableKostenGesamt / gesamtMonat) * 100 },
        { label: 'Unternehmerlohn', betrag: unternehmerlohn, farbe: '#22c55e', anteilProzent: (unternehmerlohn / gesamtMonat) * 100 },
      ]
    : [];

  return {
    fixkostenGesamt,
    variableKostenGesamt,
    unternehmerlohn,
    gesamtMonat,
    gesamtJahr,
    noetigerUmsatzNetto,
    noetigerUmsatzBrutto,
    noetigerStundensatz,
    aufschluesselung,
    fixkostenDetail,
    variableKostenDetail,
  };
}
