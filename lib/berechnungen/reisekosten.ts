export interface ReisekostenEingabe {
  naechte: number;
  personen: number;
  anreiseTyp: 'auto' | 'zug' | 'flug' | 'bus';
  // Auto
  entfernung: number; // km einfach
  spritverbrauch: number; // l/100km
  spritpreis: number; // €/l
  maut: number; // € gesamt
  // Zug/Flug/Bus
  anreisePreisProPerson: number; // € einfach
  // Unterkunft
  unterkunftProNacht: number;
  // Verpflegung
  verpflegungProTagProPerson: number;
  // Aktivitäten
  aktivitaetenProTag: number;
  // Versicherung
  versicherung: number;
}

export interface ReisekostenErgebnis {
  anreise: number;
  unterkunft: number;
  verpflegung: number;
  aktivitaeten: number;
  versicherung: number;
  gesamt: number;
  proPerson: number;
  proTag: number;
  tage: number;
  personen: number;
  anteile: { name: string; betrag: number; prozent: number }[];
}

export function berechneReisekosten(e: ReisekostenEingabe): ReisekostenErgebnis | null {
  if (e.naechte < 1 || e.personen < 1) return null;

  const tage = e.naechte + 1;

  // Anreise (hin + rück)
  let anreise: number;
  if (e.anreiseTyp === 'auto') {
    const spritkosten = (e.entfernung / 100) * e.spritverbrauch * e.spritpreis;
    anreise = Math.round((spritkosten * 2 + e.maut) * 100) / 100;
  } else {
    anreise = Math.round(e.anreisePreisProPerson * e.personen * 2 * 100) / 100;
  }

  const unterkunft = Math.round(e.unterkunftProNacht * e.naechte * 100) / 100;
  const verpflegung = Math.round(e.verpflegungProTagProPerson * e.personen * tage * 100) / 100;
  const aktivitaeten = Math.round(e.aktivitaetenProTag * e.personen * tage * 100) / 100;
  const versicherung = Math.round(e.versicherung * 100) / 100;

  const gesamt = anreise + unterkunft + verpflegung + aktivitaeten + versicherung;
  const proPerson = Math.round((gesamt / e.personen) * 100) / 100;
  const proTag = Math.round((gesamt / tage) * 100) / 100;

  const anteile = [
    { name: 'Anreise', betrag: anreise },
    { name: 'Unterkunft', betrag: unterkunft },
    { name: 'Verpflegung', betrag: verpflegung },
    { name: 'Aktivitäten', betrag: aktivitaeten },
    { name: 'Versicherung', betrag: versicherung },
  ]
    .filter(a => a.betrag > 0)
    .map(a => ({ ...a, prozent: gesamt > 0 ? Math.round((a.betrag / gesamt) * 100) : 0 }));

  return {
    anreise,
    unterkunft,
    verpflegung,
    aktivitaeten,
    versicherung,
    gesamt,
    proPerson,
    proTag,
    tage,
    personen: e.personen,
    anteile,
  };
}
