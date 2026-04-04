export type Notensystem = 'schule' | 'ihk' | 'uni';
export type Schluesseltyp = 'linear' | 'knick';

export interface NotenGrenze {
  note: string;
  bezeichnung: string;
  abProzent: number;
}

// --- Notengrenzen ---

const SCHUL_NOTEN: NotenGrenze[] = [
  { note: '1', bezeichnung: 'sehr gut', abProzent: 92 },
  { note: '2', bezeichnung: 'gut', abProzent: 81 },
  { note: '3', bezeichnung: 'befriedigend', abProzent: 67 },
  { note: '4', bezeichnung: 'ausreichend', abProzent: 50 },
  { note: '5', bezeichnung: 'mangelhaft', abProzent: 30 },
  { note: '6', bezeichnung: 'ungenügend', abProzent: 0 },
];

const SCHUL_NOTEN_HALB: NotenGrenze[] = [
  { note: '1+', bezeichnung: 'sehr gut +', abProzent: 96 },
  { note: '1', bezeichnung: 'sehr gut', abProzent: 92 },
  { note: '1-', bezeichnung: 'sehr gut -', abProzent: 88 },
  { note: '2+', bezeichnung: 'gut +', abProzent: 84 },
  { note: '2', bezeichnung: 'gut', abProzent: 81 },
  { note: '2-', bezeichnung: 'gut -', abProzent: 77 },
  { note: '3+', bezeichnung: 'befriedigend +', abProzent: 73 },
  { note: '3', bezeichnung: 'befriedigend', abProzent: 67 },
  { note: '3-', bezeichnung: 'befriedigend -', abProzent: 60 },
  { note: '4+', bezeichnung: 'ausreichend +', abProzent: 56 },
  { note: '4', bezeichnung: 'ausreichend', abProzent: 50 },
  { note: '4-', bezeichnung: 'ausreichend -', abProzent: 45 },
  { note: '5+', bezeichnung: 'mangelhaft +', abProzent: 39 },
  { note: '5', bezeichnung: 'mangelhaft', abProzent: 30 },
  { note: '5-', bezeichnung: 'mangelhaft -', abProzent: 20 },
  { note: '6', bezeichnung: 'ungenügend', abProzent: 0 },
];

const IHK_NOTEN: NotenGrenze[] = [
  { note: '1', bezeichnung: 'sehr gut', abProzent: 92 },
  { note: '2', bezeichnung: 'gut', abProzent: 81 },
  { note: '3', bezeichnung: 'befriedigend', abProzent: 67 },
  { note: '4', bezeichnung: 'ausreichend', abProzent: 50 },
  { note: '5', bezeichnung: 'mangelhaft', abProzent: 30 },
  { note: '6', bezeichnung: 'ungenügend', abProzent: 0 },
];

const UNI_NOTEN: NotenGrenze[] = [
  { note: '1,0', bezeichnung: 'sehr gut', abProzent: 95 },
  { note: '1,3', bezeichnung: 'sehr gut', abProzent: 90 },
  { note: '1,7', bezeichnung: 'gut', abProzent: 85 },
  { note: '2,0', bezeichnung: 'gut', abProzent: 80 },
  { note: '2,3', bezeichnung: 'gut', abProzent: 75 },
  { note: '2,7', bezeichnung: 'befriedigend', abProzent: 70 },
  { note: '3,0', bezeichnung: 'befriedigend', abProzent: 65 },
  { note: '3,3', bezeichnung: 'befriedigend', abProzent: 60 },
  { note: '3,7', bezeichnung: 'ausreichend', abProzent: 55 },
  { note: '4,0', bezeichnung: 'ausreichend', abProzent: 50 },
  { note: '5,0', bezeichnung: 'nicht bestanden', abProzent: 0 },
];

export function getNotenGrenzen(system: Notensystem, halbeNoten: boolean): NotenGrenze[] {
  if (system === 'ihk') return IHK_NOTEN;
  if (system === 'uni') return UNI_NOTEN;
  return halbeNoten ? SCHUL_NOTEN_HALB : SCHUL_NOTEN;
}

// --- Knick-Schlüssel ---

function knickGrenzen(bestehensGrenze: number, system: Notensystem, halbeNoten: boolean): NotenGrenze[] {
  const basis = getNotenGrenzen(system, halbeNoten);
  // Finde Bestehensnote (4 bei Schule/IHK, 4.0 bei Uni)
  const bestehensNote = basis.find(g =>
    g.bezeichnung.startsWith('ausreichend')
  );
  if (!bestehensNote) return basis;

  return basis.map(g => {
    if (g.abProzent === 0) return g;

    // Über der Bestehensnote: linear von bestehensGrenze bis 100%
    if (g.abProzent >= bestehensNote.abProzent) {
      const origRange = 100 - bestehensNote.abProzent;
      const newRange = 100 - bestehensGrenze;
      if (origRange === 0) return g;
      const ratio = (g.abProzent - bestehensNote.abProzent) / origRange;
      return { ...g, abProzent: Math.round(bestehensGrenze + ratio * newRange) };
    }
    // Unter der Bestehensnote: linear von 0 bis bestehensGrenze
    const origRange = bestehensNote.abProzent;
    const newRange = bestehensGrenze;
    if (origRange === 0) return g;
    const ratio = g.abProzent / origRange;
    return { ...g, abProzent: Math.round(ratio * newRange) };
  });
}

// --- Modus 1: Punkte → Note ---

export interface PunkteNoteErgebnis {
  prozent: number;
  note: string;
  bezeichnung: string;
  bestanden: boolean;
  farbe: 'gruen' | 'gelb' | 'rot';
}

export function berechneNote(
  erreicht: number,
  maximum: number,
  system: Notensystem,
  schluessel: Schluesseltyp,
  bestehensGrenze: number,
  halbeNoten: boolean,
): PunkteNoteErgebnis | null {
  if (maximum <= 0 || erreicht < 0) return null;

  const prozent = Math.min(100, (erreicht / maximum) * 100);
  const grenzen = schluessel === 'knick'
    ? knickGrenzen(bestehensGrenze, system, halbeNoten)
    : getNotenGrenzen(system, halbeNoten);

  let note = grenzen[grenzen.length - 1];
  for (const g of grenzen) {
    if (prozent >= g.abProzent) {
      note = g;
      break;
    }
  }

  const bestanden = prozent >= bestehensGrenze;

  let farbe: 'gruen' | 'gelb' | 'rot';
  if (prozent >= 81) farbe = 'gruen';
  else if (prozent >= 50) farbe = 'gelb';
  else farbe = 'rot';

  return {
    prozent: Math.round(prozent * 10) / 10,
    note: note.note,
    bezeichnung: note.bezeichnung,
    bestanden,
    farbe,
  };
}

// --- Modus 2: Notenschlüssel erstellen ---

export interface SchluesselZeile {
  punkte: number;
  prozent: number;
  note: string;
  bezeichnung: string;
}

export function erstelleSchluessel(
  maximum: number,
  system: Notensystem,
  schluessel: Schluesseltyp,
  bestehensGrenze: number,
  halbeNoten: boolean,
): SchluesselZeile[] | null {
  if (maximum <= 0) return null;

  const grenzen = schluessel === 'knick'
    ? knickGrenzen(bestehensGrenze, system, halbeNoten)
    : getNotenGrenzen(system, halbeNoten);

  const tabelle: SchluesselZeile[] = [];

  for (let p = maximum; p >= 0; p--) {
    const prozent = (p / maximum) * 100;

    let note = grenzen[grenzen.length - 1];
    for (const g of grenzen) {
      if (prozent >= g.abProzent) {
        note = g;
        break;
      }
    }

    tabelle.push({
      punkte: p,
      prozent: Math.round(prozent * 10) / 10,
      note: note.note,
      bezeichnung: note.bezeichnung,
    });
  }

  return tabelle;
}

// --- Modus 3: Notendurchschnitt ---

export interface NotenEintrag {
  note: number;
  gewichtung: number;
}

export interface DurchschnittErgebnis {
  durchschnitt: number;
  bezeichnung: string;
  anzahl: number;
  gesamtGewichtung: number;
}

export function berechneDurchschnitt(eintraege: NotenEintrag[]): DurchschnittErgebnis | null {
  const gueltig = eintraege.filter(e => e.note > 0 && e.gewichtung > 0);
  if (gueltig.length === 0) return null;

  const summe = gueltig.reduce((s, e) => s + e.note * e.gewichtung, 0);
  const gewichte = gueltig.reduce((s, e) => s + e.gewichtung, 0);
  if (gewichte === 0) return null;

  const schnitt = summe / gewichte;
  const gerundet = Math.round(schnitt * 100) / 100;

  let bezeichnung: string;
  if (gerundet < 1.5) bezeichnung = 'sehr gut';
  else if (gerundet < 2.5) bezeichnung = 'gut';
  else if (gerundet < 3.5) bezeichnung = 'befriedigend';
  else if (gerundet < 4.5) bezeichnung = 'ausreichend';
  else if (gerundet < 5.5) bezeichnung = 'mangelhaft';
  else bezeichnung = 'ungenügend';

  return {
    durchschnitt: gerundet,
    bezeichnung,
    anzahl: gueltig.length,
    gesamtGewichtung: gewichte,
  };
}
