export type Lebenssituation = 'single' | 'familie' | 'single-kind';
export type Zahlweise = 'monatlich' | 'vierteljaehrlich' | 'jaehrlich';
export type Beruf = 'angestellt' | 'selbststaendig' | 'beamter' | 'rentner' | 'student';

export interface Baustein {
  key: string;
  label: string;
  basisSingle: number;
  basisFamilie: number;
}

export const BAUSTEINE: Baustein[] = [
  { key: 'privat', label: 'Privatrechtsschutz', basisSingle: 15, basisFamilie: 22 },
  { key: 'beruf', label: 'Berufs-/Arbeitsrechtsschutz', basisSingle: 8, basisFamilie: 8 },
  { key: 'verkehr', label: 'Verkehrsrechtsschutz', basisSingle: 5, basisFamilie: 7 },
  { key: 'miet', label: 'Miet-/Wohnrechtsschutz', basisSingle: 6, basisFamilie: 8 },
];

const SELBSTBETEILIGUNG_RABATT: Record<number, number> = {
  0: 0,
  150: 0.10,
  250: 0.18,
  500: 0.25,
};

const ZAHLWEISE_RABATT: Record<Zahlweise, number> = {
  monatlich: 0,
  vierteljaehrlich: 0.02,
  jaehrlich: 0.05,
};

const BERUF_FAKTOR: Record<Beruf, number> = {
  angestellt: 0,
  selbststaendig: 0.15,
  beamter: -0.10,
  rentner: 0.05,
  student: -0.20,
};

export interface RechtsschutzEingabe {
  lebenssituation: Lebenssituation;
  bausteine: string[];
  selbstbeteiligung: number;
  zahlweise: Zahlweise;
  beruf: Beruf;
}

export interface BausteinErgebnis {
  label: string;
  basis: number;
  nachAbzug: number;
}

export interface RechtsschutzErgebnis {
  monatsbeitrag: number;
  jahresbeitrag: number;
  bausteinDetails: BausteinErgebnis[];
  selbstbeteiligungRabattProzent: number;
  zahlweiseRabattProzent: number;
  berufFaktorProzent: number;
}

export function berechneRechtsschutz(e: RechtsschutzEingabe): RechtsschutzErgebnis | null {
  if (e.bausteine.length === 0) return null;

  const istFamilie = e.lebenssituation !== 'single';

  // Basis-Monatsbeiträge für gewählte Bausteine
  const bausteinDetails: BausteinErgebnis[] = [];
  let basisGesamt = 0;

  for (const key of e.bausteine) {
    const baustein = BAUSTEINE.find(b => b.key === key);
    if (!baustein) continue;
    const basis = istFamilie ? baustein.basisFamilie : baustein.basisSingle;
    basisGesamt += basis;
    bausteinDetails.push({ label: baustein.label, basis, nachAbzug: 0 });
  }

  // Anpassungen
  const sbRabatt = SELBSTBETEILIGUNG_RABATT[e.selbstbeteiligung] ?? 0;
  const zwRabatt = ZAHLWEISE_RABATT[e.zahlweise] ?? 0;
  const berufFaktor = BERUF_FAKTOR[e.beruf] ?? 0;

  const gesamtFaktor = 1 + berufFaktor;
  const nachBeruf = basisGesamt * gesamtFaktor;
  const nachSb = nachBeruf * (1 - sbRabatt);
  const monatsbeitrag = nachSb * (1 - zwRabatt);

  // Anteilige Aufschlüsselung pro Baustein
  for (const detail of bausteinDetails) {
    const anteil = basisGesamt > 0 ? detail.basis / basisGesamt : 0;
    detail.nachAbzug = monatsbeitrag * anteil;
  }

  return {
    monatsbeitrag,
    jahresbeitrag: monatsbeitrag * 12,
    bausteinDetails,
    selbstbeteiligungRabattProzent: sbRabatt * 100,
    zahlweiseRabattProzent: zwRabatt * 100,
    berufFaktorProzent: berufFaktor * 100,
  };
}
