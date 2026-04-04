export interface Getraenk {
  id: number;
  name: string;
  mengeL: number;
  alkoholProzent: number;
}

export interface PromilleEingabe {
  geschlecht: 'mann' | 'frau';
  gewichtKg: number;
  getraenke: Getraenk[];
  trinkzeitStunden: number;
}

export interface PromilleErgebnis {
  gesamtAlkoholGramm: number;
  maxPromille: number;
  abgebaut: number;
  aktuellPromille: number;
  restStunden: number;
  nuechternUhrzeit: string;
  zone: 'gruen' | 'gelb' | 'orange' | 'rot';
  hinweis: string;
  getraenkeDetail: { name: string; menge: string; alkoholGramm: number }[];
}

const ABBAU_PRO_STUNDE = 0.15;

export const SCHNELLWAHL = [
  { name: 'Bier', mengeL: 0.5, alkoholProzent: 5, emoji: '🍺' },
  { name: 'Wein', mengeL: 0.2, alkoholProzent: 12, emoji: '🍷' },
  { name: 'Sekt', mengeL: 0.1, alkoholProzent: 11, emoji: '🥂' },
  { name: 'Schnaps', mengeL: 0.02, alkoholProzent: 40, emoji: '🥃' },
  { name: 'Cocktail', mengeL: 0.3, alkoholProzent: 15, emoji: '🍹' },
  { name: 'Longdrink', mengeL: 0.4, alkoholProzent: 8, emoji: '🍸' },
];

function alkoholInGramm(mengeL: number, prozent: number): number {
  return mengeL * prozent * 0.8 * 10;
}

function getZone(promille: number): PromilleErgebnis['zone'] {
  if (promille < 0.3) return 'gruen';
  if (promille < 0.5) return 'gelb';
  if (promille < 1.1) return 'orange';
  return 'rot';
}

function getHinweis(promille: number): string {
  if (promille <= 0) return 'Kein Alkoholeinfluss. Sie sind nüchtern.';
  if (promille < 0.3) return 'Minimaler Alkoholeinfluss. Fahranfänger und Personen unter 21: 0,0‰-Grenze beachten!';
  if (promille < 0.5) return 'Vorsicht: Ab 0,3‰ drohen bei Auffälligkeiten im Straßenverkehr bereits Konsequenzen (§ 316 StGB).';
  if (promille < 1.1) return 'Ordnungswidrigkeit! Ab 0,5‰: 500 € Bußgeld, 1 Monat Fahrverbot, 2 Punkte. Nicht Autofahren!';
  return 'Straftat! Ab 1,1‰: Absolute Fahruntüchtigkeit. Führerscheinentzug, Geld- oder Freiheitsstrafe. Auf keinen Fall Autofahren!';
}

function formatMenge(mengeL: number): string {
  if (mengeL >= 1) return `${mengeL.toLocaleString('de-DE', { maximumFractionDigits: 1 })} L`;
  return `${Math.round(mengeL * 1000)} ml`;
}

export function berechnePromille(eingabe: PromilleEingabe): PromilleErgebnis | null {
  const { geschlecht, gewichtKg, getraenke, trinkzeitStunden } = eingabe;
  if (gewichtKg <= 0 || getraenke.length === 0) return null;

  const koerperwasser = geschlecht === 'mann' ? gewichtKg * 0.68 : gewichtKg * 0.55;

  const getraenkeDetail = getraenke.map(g => ({
    name: g.name,
    menge: formatMenge(g.mengeL),
    alkoholGramm: alkoholInGramm(g.mengeL, g.alkoholProzent),
  }));

  const gesamtAlkoholGramm = getraenkeDetail.reduce((s, g) => s + g.alkoholGramm, 0);

  if (gesamtAlkoholGramm <= 0) return null;

  const maxPromille = gesamtAlkoholGramm / koerperwasser;
  const abgebaut = ABBAU_PRO_STUNDE * trinkzeitStunden;
  const aktuellPromille = Math.max(0, maxPromille - abgebaut);

  const restStunden = aktuellPromille > 0 ? aktuellPromille / ABBAU_PRO_STUNDE : 0;

  const jetzt = new Date();
  const nuechternZeit = new Date(jetzt.getTime() + restStunden * 60 * 60 * 1000);
  const nuechternUhrzeit = nuechternZeit.toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
  }) + ' Uhr';

  return {
    gesamtAlkoholGramm,
    maxPromille,
    abgebaut,
    aktuellPromille,
    restStunden,
    nuechternUhrzeit,
    zone: getZone(aktuellPromille),
    hinweis: getHinweis(aktuellPromille),
    getraenkeDetail,
  };
}
