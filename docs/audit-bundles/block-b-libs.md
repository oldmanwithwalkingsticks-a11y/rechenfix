# Audit-Bundle: block-b-libs

**Beschreibung:** Welle 2 Stufe 3 Arbeit Block B — 5 Berechnungs-Libs (Folge-Bundle 153c), schließt P3-B6/B7/B10-Audit-Lücke
**Generiert:** 2026-04-28T20:49:04.009Z
**Dateien:** 5

## Inhalt

1. [`lib/berechnungen/arbeitszeit.ts`](#lib-berechnungen-arbeitszeit-ts)
2. [`lib/berechnungen/promille.ts`](#lib-berechnungen-promille-ts)
3. [`lib/berechnungen/freelancer-stundensatz.ts`](#lib-berechnungen-freelancer-stundensatz-ts)
4. [`lib/berechnungen/rechtsschutz.ts`](#lib-berechnungen-rechtsschutz-ts)
5. [`lib/berechnungen/ueberstunden.ts`](#lib-berechnungen-ueberstunden-ts)

---

## `lib/berechnungen/arbeitszeit.ts`

*3.7 KB*

```ts
export interface TagesEingabe {
  beginn: string; // HH:MM
  ende: string;   // HH:MM
  pausen: number[]; // Minuten
}

export interface TagesErgebnis {
  bruttoMinuten: number;
  pauseMinuten: number;
  nettoMinuten: number;
  nettoStunden: number;
  nettoRestMinuten: number;
  dezimal: number;
  hinweise: string[];
}

export interface WochenTag {
  label: string;
  frei: boolean;
  beginn: string;
  ende: string;
  pause: number;
}

export interface WochenErgebnis {
  tage: { label: string; ergebnis: TagesErgebnis | null }[];
  gesamtMinuten: number;
  gesamtStunden: number;
  gesamtRestMinuten: number;
  gesamtDezimal: number;
  arbeitstage: number;
  durchschnittMinuten: number;
  durchschnittDezimal: number;
  hinweise: string[];
}

function parseZeit(zeit: string): number | null {
  const match = zeit.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  const h = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  if (h < 0 || h > 23 || m < 0 || m > 59) return null;
  return h * 60 + m;
}

function pruefeHinweise(nettoMinuten: number, pauseMinuten: number): string[] {
  const hinweise: string[] = [];
  if (nettoMinuten > 600) {
    hinweise.push('Die tägliche Arbeitszeit darf laut ArbZG 10 Stunden nicht überschreiten.');
  }
  if (nettoMinuten > 540 && pauseMinuten < 45) {
    hinweise.push('Ab 9 Stunden Arbeitszeit sind laut ArbZG mindestens 45 Minuten Pause vorgeschrieben.');
  } else if (nettoMinuten > 360 && pauseMinuten < 30) {
    hinweise.push('Ab 6 Stunden Arbeitszeit sind laut ArbZG mindestens 30 Minuten Pause vorgeschrieben.');
  }
  return hinweise;
}

export function berechneTageszeit(eingabe: TagesEingabe): TagesErgebnis | null {
  const start = parseZeit(eingabe.beginn);
  const end = parseZeit(eingabe.ende);
  if (start === null || end === null) return null;

  // Nachtschicht: Ende < Beginn → über Mitternacht
  const bruttoMinuten = end >= start ? end - start : (1440 - start) + end;
  if (bruttoMinuten <= 0) return null;

  const pauseMinuten = eingabe.pausen.reduce((s, p) => s + Math.max(0, p), 0);
  const nettoMinuten = Math.max(0, bruttoMinuten - pauseMinuten);

  const nettoStunden = Math.floor(nettoMinuten / 60);
  const nettoRestMinuten = nettoMinuten % 60;
  const dezimal = Math.round((nettoMinuten / 60) * 100) / 100;

  const hinweise = pruefeHinweise(nettoMinuten, pauseMinuten);

  return {
    bruttoMinuten,
    pauseMinuten,
    nettoMinuten,
    nettoStunden,
    nettoRestMinuten,
    dezimal,
    hinweise,
  };
}

export function berechneWoche(tage: WochenTag[]): WochenErgebnis | null {
  const ergebnisse: { label: string; ergebnis: TagesErgebnis | null }[] = [];
  let gesamtMinuten = 0;
  let arbeitstage = 0;
  const alleHinweise: string[] = [];

  for (const tag of tage) {
    if (tag.frei) {
      ergebnisse.push({ label: tag.label, ergebnis: null });
      continue;
    }

    const erg = berechneTageszeit({
      beginn: tag.beginn,
      ende: tag.ende,
      pausen: [tag.pause],
    });

    if (erg) {
      gesamtMinuten += erg.nettoMinuten;
      arbeitstage++;
      for (const h of erg.hinweise) {
        const prefixed = `${tag.label}: ${h}`;
        if (!alleHinweise.includes(prefixed)) alleHinweise.push(prefixed);
      }
    }

    ergebnisse.push({ label: tag.label, ergebnis: erg });
  }

  if (arbeitstage === 0) return null;

  const durchschnittMinuten = Math.round(gesamtMinuten / arbeitstage);

  return {
    tage: ergebnisse,
    gesamtMinuten,
    gesamtStunden: Math.floor(gesamtMinuten / 60),
    gesamtRestMinuten: gesamtMinuten % 60,
    gesamtDezimal: Math.round((gesamtMinuten / 60) * 100) / 100,
    arbeitstage,
    durchschnittMinuten,
    durchschnittDezimal: Math.round((durchschnittMinuten / 60) * 100) / 100,
    hinweise: alleHinweise,
  };
}
```

---

## `lib/berechnungen/promille.ts`

*3.5 KB*

```ts
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
```

---

## `lib/berechnungen/freelancer-stundensatz.ts`

*3.2 KB*

```ts
import { anzahlBundesweiterFeiertageMoBisFr } from './feiertage';

export interface FreelancerEingabe {
  nettoWunsch: number;
  arbeitstageProWoche: number;
  urlaubstage: number;
  krankheitstage: number;
  produktiveStunden: number;
  krankenversicherung: number;
  rentenvorsorge: number;
  betriebsausgaben: number;
  steuersatz: number;
  kleinunternehmer: boolean;
}

export interface KostenAufschluesselung {
  label: string;
  betrag: number;
  farbe: string;
  anteilProzent: number;
}

export interface FreelancerErgebnis {
  stundensatzNetto: number;
  stundensatzBrutto: number;
  tagessatzNetto: number;
  tagessatzBrutto: number;
  monatsumsatzNoetig: number;
  jahresumsatzNoetig: number;
  fakturierbareStundenJahr: number;
  arbeitstageJahr: number;
  bruttoBedarfMonat: number;
  gesamtVorSteuernMonat: number;
  steuernMonat: number;
  aufschluesselung: KostenAufschluesselung[];
  warnungNiedrig: boolean;
}

export function berechneFreelancerStundensatz(
  e: FreelancerEingabe,
  jahr: number = new Date().getFullYear()
): FreelancerErgebnis {
  const feiertageMoBisFr = anzahlBundesweiterFeiertageMoBisFr(jahr);
  const arbeitstageJahr = Math.max((e.arbeitstageProWoche * 52) - e.urlaubstage - e.krankheitstage - feiertageMoBisFr, 1);
  const fakturierbareStundenJahr = arbeitstageJahr * e.produktiveStunden;

  const gesamtVorSteuernMonat = e.nettoWunsch + e.krankenversicherung + e.rentenvorsorge + e.betriebsausgaben;
  const steuersatzFaktor = Math.min(e.steuersatz, 99) / 100;
  const bruttoBedarfMonat = gesamtVorSteuernMonat / (1 - steuersatzFaktor);
  const steuernMonat = bruttoBedarfMonat - gesamtVorSteuernMonat;

  const jahresBrutto = bruttoBedarfMonat * 12;

  const stundensatzNetto = fakturierbareStundenJahr > 0 ? jahresBrutto / fakturierbareStundenJahr : 0;
  const stundensatzBrutto = e.kleinunternehmer ? stundensatzNetto : stundensatzNetto * 1.19;

  const tagessatzNetto = stundensatzNetto * e.produktiveStunden;
  const tagessatzBrutto = e.kleinunternehmer ? tagessatzNetto : tagessatzNetto * 1.19;

  const monatsumsatzNoetig = bruttoBedarfMonat;
  const jahresumsatzNoetig = jahresBrutto;

  // Aufschlüsselung für Tortendiagramm
  const gesamtMonat = bruttoBedarfMonat;
  const aufschluesselung: KostenAufschluesselung[] = [
    { label: 'Netto-Einkommen', betrag: e.nettoWunsch, farbe: '#22c55e', anteilProzent: (e.nettoWunsch / gesamtMonat) * 100 },
    { label: 'Einkommensteuer', betrag: steuernMonat, farbe: '#ef4444', anteilProzent: (steuernMonat / gesamtMonat) * 100 },
    { label: 'Krankenversicherung', betrag: e.krankenversicherung, farbe: '#3b82f6', anteilProzent: (e.krankenversicherung / gesamtMonat) * 100 },
    { label: 'Rentenvorsorge', betrag: e.rentenvorsorge, farbe: '#a855f7', anteilProzent: (e.rentenvorsorge / gesamtMonat) * 100 },
    { label: 'Betriebsausgaben', betrag: e.betriebsausgaben, farbe: '#f59e0b', anteilProzent: (e.betriebsausgaben / gesamtMonat) * 100 },
  ];

  return {
    stundensatzNetto,
    stundensatzBrutto,
    tagessatzNetto,
    tagessatzBrutto,
    monatsumsatzNoetig,
    jahresumsatzNoetig,
    fakturierbareStundenJahr,
    arbeitstageJahr,
    bruttoBedarfMonat,
    gesamtVorSteuernMonat,
    steuernMonat,
    aufschluesselung,
    warnungNiedrig: stundensatzNetto < 50,
  };
}
```

---

## `lib/berechnungen/rechtsschutz.ts`

*3.0 KB*

```ts
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
```

---

## `lib/berechnungen/ueberstunden.ts`

*2.8 KB*

```ts
import { WOCHEN_PRO_MONAT } from './_helpers';

// ── Modus 1: Überstunden berechnen ──

export interface UeberstundenEingabe {
  vertraglicheStunden: number; // Wochenarbeitszeit
  tatsaechlicheStunden: number; // tatsächlich pro Woche
  zeitraum: 'woche' | 'monat' | 'custom';
  customWochen?: number;
}

export interface UeberstundenErgebnis {
  proWoche: number;
  proMonat: number;
  proJahr: number;
  zusaetzlicheTageProJahr: number;
  istMinusstunden: boolean;
  zeitraumWert: number;
  zeitraumLabel: string;
}

export function berechneUeberstunden(eingabe: UeberstundenEingabe): UeberstundenErgebnis | null {
  const { vertraglicheStunden, tatsaechlicheStunden, zeitraum, customWochen } = eingabe;
  if (vertraglicheStunden <= 0 || tatsaechlicheStunden < 0) return null;

  const proWoche = tatsaechlicheStunden - vertraglicheStunden;
  const proMonat = proWoche * WOCHEN_PRO_MONAT;
  const proJahr = proWoche * 52;

  const tagesStunden = vertraglicheStunden / 5;
  const zusaetzlicheTageProJahr = tagesStunden > 0 ? Math.abs(proJahr) / tagesStunden : 0;

  let zeitraumWert = proWoche;
  let zeitraumLabel = 'pro Woche';
  if (zeitraum === 'monat') {
    zeitraumWert = proMonat;
    zeitraumLabel = 'pro Monat';
  } else if (zeitraum === 'custom' && customWochen && customWochen > 0) {
    zeitraumWert = proWoche * customWochen;
    zeitraumLabel = `in ${customWochen} Wochen`;
  }

  return {
    proWoche,
    proMonat,
    proJahr,
    zusaetzlicheTageProJahr,
    istMinusstunden: proWoche < 0,
    zeitraumWert,
    zeitraumLabel,
  };
}

// ── Modus 2: Vergütung berechnen ──

export interface VerguetungEingabe {
  ueberstunden: number;
  bruttogehalt: number;
  monatsstunden: number;
  zuschlag: number; // in %
}

export interface ZuschlagSzenario {
  zuschlag: number;
  ueberstundenlohn: number;
  verguetungBrutto: number;
  verguetungNetto: number;
}

export interface VerguetungErgebnis {
  stundenlohn: number;
  ueberstundenlohn: number;
  verguetungBrutto: number;
  verguetungNetto: number;
  szenarien: ZuschlagSzenario[];
}

export function berechneVerguetung(eingabe: VerguetungEingabe): VerguetungErgebnis | null {
  const { ueberstunden, bruttogehalt, monatsstunden, zuschlag } = eingabe;
  if (ueberstunden <= 0 || bruttogehalt <= 0 || monatsstunden <= 0) return null;

  const stundenlohn = bruttogehalt / monatsstunden;

  const calc = (z: number): ZuschlagSzenario => {
    const ul = stundenlohn * (1 + z / 100);
    const brutto = ueberstunden * ul;
    return {
      zuschlag: z,
      ueberstundenlohn: ul,
      verguetungBrutto: brutto,
      verguetungNetto: brutto * 0.6,
    };
  };

  const haupt = calc(zuschlag);
  const szenarien = [0, 25, 50].map(calc);

  return {
    stundenlohn,
    ueberstundenlohn: haupt.ueberstundenlohn,
    verguetungBrutto: haupt.verguetungBrutto,
    verguetungNetto: haupt.verguetungNetto,
    szenarien,
  };
}
```

