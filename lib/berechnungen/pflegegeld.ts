export type Pflegegrad = 1 | 2 | 3 | 4 | 5;
export type Pflegeform = 'angehoerige' | 'dienst' | 'kombination' | 'stationaer';

export interface PflegegeldEingabe {
  pflegegrad: Pflegegrad;
  pflegeform: Pflegeform;
  anteilDienst: number; // 0-100, nur bei Kombination
}

export interface PflegegeldErgebnis {
  pflegegrad: Pflegegrad;
  pflegeform: Pflegeform;

  // Basiswerte
  pflegegeldVoll: number;          // bei Angehörigen
  pflegesachleistungVoll: number;  // bei Dienst
  stationaerZuschuss: number;

  // Kombinationsleistung
  anteiligSachleistung: number;    // genutzt
  anteiligPflegegeld: number;      // verbleibend
  kombinationGesamt: number;
  restProzentPflegegeld: number;

  // Hauptbetrag (je nach Pflegeform)
  hauptLeistungMonat: number;
  hauptLeistungJahr: number;

  // Zusatzleistungen
  entlastungsbetrag: number;          // 125 €/Mon
  verhinderungspflegeJahr: number;    // bis 1.612 €
  kurzzeitpflegeJahr: number;         // bis 1.774 €
  pflegehilfsmittelMonat: number;     // bis 40 €
  wohnraumanpassung: number;          // bis 4.000 € einmalig

  // Gesamt (inkl. Entlastungsbetrag)
  gesamtMonat: number;
}

// === LEISTUNGSBETRÄGE 2026 ===

const PFLEGEGELD: Record<Pflegegrad, number> = {
  1: 0,
  2: 332,
  3: 573,
  4: 765,
  5: 947,
};

const PFLEGESACHLEISTUNG: Record<Pflegegrad, number> = {
  1: 0,
  2: 761,
  3: 1432,
  4: 1778,
  5: 2200,
};

const STATIONAER: Record<Pflegegrad, number> = {
  1: 125,
  2: 770,
  3: 1262,
  4: 1775,
  5: 2005,
};

export const PFLEGEGELD_TABELLE = PFLEGEGELD;
export const PFLEGESACHLEISTUNG_TABELLE = PFLEGESACHLEISTUNG;
export const STATIONAER_TABELLE = STATIONAER;

export const ENTLASTUNGSBETRAG = 125;
export const VERHINDERUNGSPFLEGE_MAX = 1612;
export const KURZZEITPFLEGE_MAX = 1774;
export const PFLEGEHILFSMITTEL_MAX = 40;
export const WOHNRAUMANPASSUNG_MAX = 4000;

function rund2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function berechnePflegegeld(eingabe: PflegegeldEingabe): PflegegeldErgebnis {
  const { pflegegrad, pflegeform } = eingabe;
  const anteilDienst = Math.min(100, Math.max(0, eingabe.anteilDienst));

  const pflegegeldVoll = PFLEGEGELD[pflegegrad];
  const pflegesachleistungVoll = PFLEGESACHLEISTUNG[pflegegrad];
  const stationaerZuschuss = STATIONAER[pflegegrad];

  // Kombinationsleistung
  const anteiligSachleistung = rund2(pflegesachleistungVoll * anteilDienst / 100);
  const restProzentPflegegeld = 100 - anteilDienst;
  const anteiligPflegegeld = rund2(pflegegeldVoll * restProzentPflegegeld / 100);
  const kombinationGesamt = rund2(anteiligSachleistung + anteiligPflegegeld);

  // Hauptleistung je nach Pflegeform
  let hauptLeistungMonat = 0;
  switch (pflegeform) {
    case 'angehoerige':
      hauptLeistungMonat = pflegegeldVoll;
      break;
    case 'dienst':
      hauptLeistungMonat = pflegesachleistungVoll;
      break;
    case 'kombination':
      hauptLeistungMonat = kombinationGesamt;
      break;
    case 'stationaer':
      hauptLeistungMonat = stationaerZuschuss;
      break;
  }

  // Entlastungsbetrag gibt es ab Grad 1 für ALLE
  const entlastungsbetrag = ENTLASTUNGSBETRAG;

  // Verhinderungs- und Kurzzeitpflege nur ab Grad 2
  const verhinderungspflegeJahr = pflegegrad >= 2 ? VERHINDERUNGSPFLEGE_MAX : 0;
  const kurzzeitpflegeJahr = pflegegrad >= 2 ? KURZZEITPFLEGE_MAX : 0;

  // Gesamt monatlich (Hauptleistung + Entlastungsbetrag; bei stationär ist Entlastung nicht üblich, aber Pauschale zählt)
  const gesamtMonat = rund2(hauptLeistungMonat + entlastungsbetrag);

  return {
    pflegegrad,
    pflegeform,
    pflegegeldVoll,
    pflegesachleistungVoll,
    stationaerZuschuss,
    anteiligSachleistung,
    anteiligPflegegeld,
    kombinationGesamt,
    restProzentPflegegeld,
    hauptLeistungMonat: rund2(hauptLeistungMonat),
    hauptLeistungJahr: rund2(hauptLeistungMonat * 12),
    entlastungsbetrag,
    verhinderungspflegeJahr,
    kurzzeitpflegeJahr,
    pflegehilfsmittelMonat: PFLEGEHILFSMITTEL_MAX,
    wohnraumanpassung: WOHNRAUMANPASSUNG_MAX,
    gesamtMonat,
  };
}
