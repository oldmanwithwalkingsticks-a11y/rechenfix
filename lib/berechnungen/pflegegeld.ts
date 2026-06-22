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
  entlastungsbetrag: number;          // 131 €/Mon (§ 45b SGB XI)
  verhinderungspflegeJahr: number;    // § 42a SGB XI: VHP+KZP gemeinsam bis 3.539 €/Jahr
  kurzzeitpflegeJahr: number;         // § 42a SGB XI: VHP+KZP gemeinsam bis 3.539 €/Jahr
  pflegehilfsmittelMonat: number;     // bis 42 € (§ 40 SGB XI)
  wohnraumanpassung: number;          // bis 4.180 € einmalig (§ 40 SGB XI)

  // Gesamt (inkl. Entlastungsbetrag)
  gesamtMonat: number;
}

// === LEISTUNGSBETRÄGE 2026 ===
// Stand: ab 01.01.2025 (PUEG +4,5 %), 2026 unverändert; §§ 36/37/40/42a/43/45b SGB XI; nächste Dynamisierung 01.01.2028

const PFLEGEGELD: Record<Pflegegrad, number> = {
  1: 0,
  2: 347,
  3: 599,
  4: 800,
  5: 990,
};

const PFLEGESACHLEISTUNG: Record<Pflegegrad, number> = {
  1: 0,
  2: 796,
  3: 1497,
  4: 1859,
  5: 2299,
};

const STATIONAER: Record<Pflegegrad, number> = {
  1: 131,
  2: 805,
  3: 1319,
  4: 1855,
  5: 2096,
};

export const PFLEGEGELD_TABELLE = PFLEGEGELD;
export const PFLEGESACHLEISTUNG_TABELLE = PFLEGESACHLEISTUNG;
export const STATIONAER_TABELLE = STATIONAER;

export const ENTLASTUNGSBETRAG = 131;
// § 42a SGB XI: Gemeinsamer Jahresbetrag VHP+KZP zusammen 3.539 €/Jahr (nicht je Topf einzeln)
export const VERHINDERUNGSPFLEGE_MAX = 3539;
export const KURZZEITPFLEGE_MAX = 3539;
export const PFLEGEHILFSMITTEL_MAX = 42;
export const WOHNRAUMANPASSUNG_MAX = 4180;

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
