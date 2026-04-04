export interface Wand {
  breite: number;
  hoehe: number;
}

export interface TapetenbedarfEingabe {
  waende: Wand[];
  fensterAnzahl: number;
  fensterBreite: number;
  fensterHoehe: number;
  tuerenAnzahl: number;
  tuerBreite: number;
  tuerHoehe: number;
  rollenBreite: number;    // m (0.53 oder 1.06)
  rollenLaenge: number;    // m (10.05 oder 25)
  rapport: number;         // cm
  verschnitt: number;      // % (z.B. 10)
  preisProRolle: number;   // € (0 = keine Kostenschätzung)
}

export interface TapetenbedarfErgebnis {
  gesamtWandflaeche: number;
  fensterFlaeche: number;
  tuerFlaeche: number;
  abzuege: number;
  tapezierFlaeche: number;
  gesamtBreite: number;
  bahnenBenoetigt: number;
  bahnenProRolle: number;
  rollenBenoetigt: number;
  verschnittFlaeche: number;
  verschnittProzent: number;
  kosten: number | null;
}

export function berechneTapetenbedarf(eingabe: TapetenbedarfEingabe): TapetenbedarfErgebnis | null {
  const {
    waende, fensterAnzahl, fensterBreite, fensterHoehe,
    tuerenAnzahl, tuerBreite, tuerHoehe,
    rollenBreite, rollenLaenge, rapport, verschnitt, preisProRolle,
  } = eingabe;

  if (waende.length === 0) return null;
  if (rollenBreite <= 0 || rollenLaenge <= 0) return null;

  // Gesamtwandfläche und Gesamtbreite
  let gesamtWandflaeche = 0;
  let gesamtBreite = 0;
  let maxHoehe = 0;

  for (const w of waende) {
    if (w.breite <= 0 || w.hoehe <= 0) return null;
    gesamtWandflaeche += w.breite * w.hoehe;
    gesamtBreite += w.breite;
    if (w.hoehe > maxHoehe) maxHoehe = w.hoehe;
  }

  // Abzüge
  const fensterFlaeche = fensterAnzahl * fensterBreite * fensterHoehe;
  const tuerFlaeche = tuerenAnzahl * tuerBreite * tuerHoehe;
  const abzuege = fensterFlaeche + tuerFlaeche;

  const tapezierFlaeche = Math.max(0, gesamtWandflaeche - abzuege);

  // Rapport in Meter
  const rapportM = rapport / 100;

  // Bahnen pro Rolle: Wie viele ganze Bahnen passen auf eine Rolle?
  const bahnHoehe = maxHoehe + rapportM;
  const bahnenProRolle = bahnHoehe > 0 ? Math.floor(rollenLaenge / bahnHoehe) : 0;
  if (bahnenProRolle <= 0) return null;

  // Bahnen benötigt: Gesamtbreite / Rollenbreite (aufgerundet)
  const bahnenBenoetigt = Math.ceil(gesamtBreite / rollenBreite);

  // Rollen benötigt
  const rollenOhneVerschnitt = Math.ceil(bahnenBenoetigt / bahnenProRolle);
  const rollenBenoetigt = Math.ceil(rollenOhneVerschnitt * (1 + verschnitt / 100));

  // Verschnitt berechnen
  const tapetenflaecheGesamt = rollenBenoetigt * rollenBreite * rollenLaenge;
  const verschnittFlaeche = Math.max(0, tapetenflaecheGesamt - tapezierFlaeche);
  const verschnittProzent = tapetenflaecheGesamt > 0
    ? (verschnittFlaeche / tapetenflaecheGesamt) * 100
    : 0;

  // Kosten
  const kosten = preisProRolle > 0 ? rollenBenoetigt * preisProRolle : null;

  return {
    gesamtWandflaeche: Math.round(gesamtWandflaeche * 100) / 100,
    fensterFlaeche: Math.round(fensterFlaeche * 100) / 100,
    tuerFlaeche: Math.round(tuerFlaeche * 100) / 100,
    abzuege: Math.round(abzuege * 100) / 100,
    tapezierFlaeche: Math.round(tapezierFlaeche * 100) / 100,
    gesamtBreite: Math.round(gesamtBreite * 100) / 100,
    bahnenBenoetigt,
    bahnenProRolle,
    rollenBenoetigt,
    verschnittFlaeche: Math.round(verschnittFlaeche * 100) / 100,
    verschnittProzent: Math.round(verschnittProzent * 10) / 10,
    kosten: kosten !== null ? Math.round(kosten * 100) / 100 : null,
  };
}
