/**
 * Backform-Umrechnung (Backform-Umrechner).
 *
 * W184: aus der Komponente ausgelagert und um das Kastenform-Volumen ergänzt. Vorher wurde die
 * Höhe der Kastenform abgefragt, aber nie verwendet — die Seite versprach „Kastenform-Volumen“.
 *   - Rund: Bodenfläche π × (d/2)²; rechteckig und Kastenform: Länge × Breite
 *   - Kastenform zusätzlich Volumen Länge × Breite × Höhe
 *   - Faktor: Kastenform → Kastenform über das Volumen, sonst über die Bodenfläche
 *     (gleiche Teighöhe; zwischen Kastenform und flacher Form geht die Höhe nicht ein)
 */

export type FormTyp = 'rund' | 'rechteckig' | 'kasten';

export interface BackformMasse {
  typ: FormTyp;
  durchmesser: number;
  laenge: number;
  breite: number;
  hoehe: number;
}

export function bodenflaeche(f: BackformMasse): number {
  switch (f.typ) {
    case 'rund':        return Math.PI * (f.durchmesser / 2) ** 2;
    case 'rechteckig':  return f.laenge * f.breite;
    case 'kasten':      return f.laenge * f.breite;
  }
}

/** Volumen in cm³ (nur Kastenform, sonst null) */
export function volumen(f: BackformMasse): number | null {
  return f.typ === 'kasten' ? f.laenge * f.breite * f.hoehe : null;
}

export interface BackformErgebnis {
  flaecheOrig: number;
  flaecheZiel: number;
  volumenOrig: number | null;
  volumenZiel: number | null;
  /** true: Faktor aus dem Volumen (beide Kastenformen) */
  nachVolumen: boolean;
  /** Kastenform mit flacher Form kombiniert → Faktor aus der Fläche, Höhe ohne Wirkung */
  gemischtMitKasten: boolean;
  faktor: number;
}

export function berechneBackform(original: BackformMasse, ziel: BackformMasse): BackformErgebnis {
  const flaecheOrig = bodenflaeche(original);
  const flaecheZiel = bodenflaeche(ziel);
  const volumenOrig = volumen(original);
  const volumenZiel = volumen(ziel);
  const nachVolumen = volumenOrig !== null && volumenZiel !== null && volumenOrig > 0;
  const faktor = nachVolumen
    ? (volumenZiel as number) / (volumenOrig as number)
    : flaecheOrig > 0 ? flaecheZiel / flaecheOrig : 1;
  const gemischtMitKasten = !nachVolumen && (original.typ === 'kasten' || ziel.typ === 'kasten');
  return { flaecheOrig, flaecheZiel, volumenOrig, volumenZiel, nachVolumen, gemischtMitKasten, faktor };
}

/** Zutatenmenge wie in der Tabelle des Rechners: Stück ganzzahlig, sonst auf 5 g/ml gerundet. */
export function zutatUmgerechnet(menge: number, faktor: number, einheit: string): number {
  const neu = menge * faktor;
  return einheit === 'Stück' ? Math.round(neu) : Math.round(neu / 5) * 5;
}
