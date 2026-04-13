export type UmzugsArt = 'firma' | 'selbst';
export type Etage = 'eg' | '1og' | '2og' | '3og' | '4og' | 'aufzug';

export interface UmzugskostenEingabe {
  wohnungsgroesse: number; // m²
  entfernung: number;      // km
  art: UmzugsArt;
  etageAlt: Etage;
  etageNeu: Etage;
  einpackservice: boolean;
  moebelmontage: boolean;
  halteverbotszone: boolean;
  klaviertransport: boolean;
}

export interface UmzugskostenErgebnis {
  // Hauptkosten
  basiskosten: number;
  etagenzuschlag: number;
  einpackservice: number;
  moebelmontage: number;
  halteverbotszone: number;
  klaviertransport: number;
  // Selbst
  transporterMiete: number;
  transporterTyp: string;
  kmKosten: number;
  verpackung: number;
  verpflegung: number;
  // Gesamt
  gesamtkosten: number;
  // Vergleich
  vergleichSelbst: number | null; // nur bei Firma
  differenz: number | null;
  // Nebenkosten
  nachsendeauftrag: number;
  renovierung: number;
  // Info
  art: UmzugsArt;
  kostenProQm: number;
}

function etageZuNummer(e: Etage): number {
  switch (e) {
    case 'eg': return 0;
    case '1og': return 1;
    case '2og': return 2;
    case '3og': return 3;
    case '4og': return 4;
    case 'aufzug': return 0; // kein Zuschlag
  }
}

function kostenProQm(entfernung: number): number {
  if (entfernung <= 50) return 25;
  if (entfernung <= 100) return 30;
  if (entfernung <= 500) return 35;
  return 45;
}

function transporterInfo(qm: number): { miete: number; typ: string } {
  if (qm <= 30) return { miete: 80, typ: 'Sprinter' };
  if (qm <= 60) return { miete: 120, typ: '3,5t LKW' };
  if (qm <= 90) return { miete: 180, typ: '7,5t LKW' };
  return { miete: 280, typ: '7,5t LKW (2 Fahrten)' };
}

export function berechneUmzugskosten(eingabe: UmzugskostenEingabe): UmzugskostenErgebnis | null {
  const { wohnungsgroesse, entfernung, art, etageAlt, etageNeu } = eingabe;

  if (wohnungsgroesse <= 0 || entfernung < 0) return null;

  const proQm = kostenProQm(entfernung);

  // Etagenzuschlag: pro Etage +5% (nur wenn kein Aufzug)
  const etageAltN = etageZuNummer(etageAlt);
  const etageNeuN = etageZuNummer(etageNeu);
  const etagenSumme = (etageAlt !== 'aufzug' ? etageAltN : 0) + (etageNeu !== 'aufzug' ? etageNeuN : 0);

  if (art === 'firma') {
    const basiskosten = wohnungsgroesse * proQm;
    const etagenzuschlag = Math.round(basiskosten * etagenSumme * 0.05);

    const einpackservice = eingabe.einpackservice ? wohnungsgroesse * 4 : 0;
    const moebelmontage = eingabe.moebelmontage ? 250 : 0;
    const halteverbotszone = eingabe.halteverbotszone ? 300 : 0; // 150 × 2
    const klaviertransport = eingabe.klaviertransport ? 350 : 0;

    const gesamtkosten = basiskosten + etagenzuschlag + einpackservice + moebelmontage + halteverbotszone + klaviertransport;

    // Vergleich: was würde "selbst" kosten?
    const transporter = transporterInfo(wohnungsgroesse);
    const kmKosten = Math.round(entfernung * 2 * 0.35);
    const verpackung = wohnungsgroesse * 2;
    const verpflegung = 50;
    const vergleichSelbst = transporter.miete + kmKosten + verpackung + verpflegung;

    return {
      basiskosten,
      etagenzuschlag,
      einpackservice,
      moebelmontage,
      halteverbotszone,
      klaviertransport,
      transporterMiete: 0,
      transporterTyp: '',
      kmKosten: 0,
      verpackung: 0,
      verpflegung: 0,
      gesamtkosten,
      vergleichSelbst,
      differenz: gesamtkosten - vergleichSelbst,
      nachsendeauftrag: 30,
      renovierung: wohnungsgroesse * 5,
      art,
      kostenProQm: proQm,
    };
  }

  // Selbst organisiert
  const transporter = transporterInfo(wohnungsgroesse);
  const kmKosten = Math.round(entfernung * 2 * 0.35);
  const verpackung = wohnungsgroesse * 2;
  const verpflegung = 50;

  const gesamtkosten = transporter.miete + kmKosten + verpackung + verpflegung;

  return {
    basiskosten: 0,
    etagenzuschlag: 0,
    einpackservice: 0,
    moebelmontage: 0,
    halteverbotszone: 0,
    klaviertransport: 0,
    transporterMiete: transporter.miete,
    transporterTyp: transporter.typ,
    kmKosten,
    verpackung,
    verpflegung,
    gesamtkosten,
    vergleichSelbst: null,
    differenz: null,
    nachsendeauftrag: 30,
    renovierung: wohnungsgroesse * 5,
    art,
    kostenProQm: proQm,
  };
}
