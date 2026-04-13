export type Antriebsart = 'benzin' | 'diesel' | 'elektro' | 'hybrid';
export type FinanzierungsModus = 'bar' | 'finanziert';

export interface AutokostenEingabe {
  kaufpreis: number;
  fahrzeugAlter: number;
  haltedauer: number;
  finanzierung: FinanzierungsModus;
  monatlicheRate: number;
  versicherungMonat: number;
  kfzSteuerJahr: number;
  fahrleistungJahr: number;
  verbrauch: number;
  antrieb: Antriebsart;
  kraftstoffpreis: number;
  wartungJahr: number;
  reifenJahr: number;
  tuevZweiJahre: number;
  parkkostenMonat: number;
  waschanlagePflegeMonat: number;
}

export interface KostenBlock {
  label: string;
  monat: number;
  jahr: number;
  anteilProzent: number;
  farbe: string;
}

export interface StreckenKosten {
  label: string;
  km: number;
  kosten: number;
  hinweis?: string;
}

export interface AutokostenErgebnis {
  // Hauptergebnisse
  gesamtMonat: number;
  gesamtJahr: number;
  kostenProKm: number;
  kostenProTag: number;

  // Wertverlust
  restwert: number;
  gesamtWertverlust: number;
  wertverlustJahr: number;
  wertverlustMonat: number;

  // Einzelposten (Jahr)
  kraftstoffJahr: number;
  versicherungJahr: number;
  steuerJahr: number;
  wartungGesamtJahr: number;
  sonstigeJahr: number;

  // Aufschlüsselung
  kostenBloecke: KostenBlock[];

  // Streckenkosten
  streckenKosten: StreckenKosten[];

  // Finanzierung
  istFinanziert: boolean;
  finanzierungJahr: number;

  // Vergleich
  vergleichText: string;
  vergleichProzent: number;
}

const WERTVERLUST_NEUWAGEN = [0.24, 0.13, 0.10, 0.08, 0.06];
const WERTVERLUST_GEBRAUCHT_RATE = 0.06;

export const STANDARD_PREISE: Record<Antriebsart, number> = {
  benzin: 1.75,
  diesel: 1.65,
  elektro: 0.35,
  hybrid: 1.75,
};

export const ANTRIEB_EINHEITEN: Record<Antriebsart, string> = {
  benzin: '€/l',
  diesel: '€/l',
  elektro: '€/kWh',
  hybrid: '€/l',
};

export const VERBRAUCH_EINHEITEN: Record<Antriebsart, string> = {
  benzin: 'l/100 km',
  diesel: 'l/100 km',
  elektro: 'kWh/100 km',
  hybrid: 'l/100 km',
};

const FARBEN = [
  '#6366f1', // Wertverlust - Indigo
  '#f59e0b', // Kraftstoff - Amber
  '#3b82f6', // Versicherung - Blue
  '#ef4444', // Steuer - Red
  '#10b981', // Wartung - Emerald
  '#8b5cf6', // TÜV - Violet
  '#ec4899', // Parken/Pflege - Pink
];

function rund2(n: number): number {
  return Math.round(n * 100) / 100;
}

function berechneRestwert(kaufpreis: number, fahrzeugAlter: number, haltedauer: number): number {
  let wert = kaufpreis;

  const startJahr = fahrzeugAlter;
  const endJahr = fahrzeugAlter + haltedauer;

  for (let j = startJahr; j < endJahr; j++) {
    let rate: number;
    if (fahrzeugAlter === 0 && j < WERTVERLUST_NEUWAGEN.length) {
      // Neuwagen: Spezifische Raten für die ersten Jahre
      rate = WERTVERLUST_NEUWAGEN[j];
    } else {
      rate = WERTVERLUST_GEBRAUCHT_RATE;
    }
    wert *= (1 - rate);
  }

  return Math.max(0, Math.round(wert));
}

export function berechneAutokosten(eingabe: AutokostenEingabe): AutokostenErgebnis | null {
  const {
    kaufpreis, fahrzeugAlter, haltedauer, finanzierung, monatlicheRate,
    versicherungMonat, kfzSteuerJahr, fahrleistungJahr, verbrauch,
    kraftstoffpreis, wartungJahr, reifenJahr, tuevZweiJahre,
    parkkostenMonat, waschanlagePflegeMonat,
  } = eingabe;

  if (kaufpreis <= 0 || haltedauer <= 0 || fahrleistungJahr <= 0) return null;

  // === WERTVERLUST ===
  const restwert = berechneRestwert(kaufpreis, fahrzeugAlter, haltedauer);
  const gesamtWertverlust = kaufpreis - restwert;
  const wertverlustJahr = rund2(gesamtWertverlust / haltedauer);
  const wertverlustMonat = rund2(wertverlustJahr / 12);

  // === KRAFTSTOFF ===
  const kraftstoffJahr = rund2((fahrleistungJahr / 100) * verbrauch * kraftstoffpreis);

  // === VERSICHERUNG ===
  const versicherungJahr = rund2(versicherungMonat * 12);

  // === STEUER ===
  const steuerJahr = kfzSteuerJahr;

  // === WARTUNG & VERSCHLEISS ===
  const tuevJahr = rund2(tuevZweiJahre / 2);
  const wartungGesamtJahr = rund2(wartungJahr + reifenJahr + tuevJahr);

  // === SONSTIGE ===
  const sonstigeJahr = rund2((parkkostenMonat + waschanlagePflegeMonat) * 12);

  // === FINANZIERUNG ===
  const istFinanziert = finanzierung === 'finanziert';
  const finanzierungJahr = istFinanziert ? rund2(monatlicheRate * 12) : 0;

  // === GESAMTKOSTEN ===
  // Bei Finanzierung: Rate statt Wertverlust als monatliche Belastung
  const kostenOhneAnschaffung = kraftstoffJahr + versicherungJahr + steuerJahr + wartungGesamtJahr + sonstigeJahr;
  const gesamtJahr = rund2(
    (istFinanziert ? finanzierungJahr : wertverlustJahr) + kostenOhneAnschaffung
  );
  const gesamtMonat = rund2(gesamtJahr / 12);
  const kostenProKm = rund2(gesamtJahr / fahrleistungJahr * 100) / 100;
  const kostenProTag = rund2(gesamtJahr / 365);

  // === KOSTENBLÖCKE ===
  const bloeckeRoh: { label: string; jahr: number; farbe: string }[] = [];

  if (istFinanziert) {
    bloeckeRoh.push({ label: 'Finanzierungsrate', jahr: finanzierungJahr, farbe: FARBEN[0] });
  } else {
    bloeckeRoh.push({ label: 'Wertverlust', jahr: wertverlustJahr, farbe: FARBEN[0] });
  }
  bloeckeRoh.push({ label: 'Kraftstoff', jahr: kraftstoffJahr, farbe: FARBEN[1] });
  bloeckeRoh.push({ label: 'Versicherung', jahr: versicherungJahr, farbe: FARBEN[2] });
  bloeckeRoh.push({ label: 'Kfz-Steuer', jahr: steuerJahr, farbe: FARBEN[3] });
  bloeckeRoh.push({ label: 'Wartung & Reifen', jahr: rund2(wartungJahr + reifenJahr), farbe: FARBEN[4] });
  if (tuevJahr > 0) {
    bloeckeRoh.push({ label: 'TÜV / HU+AU', jahr: tuevJahr, farbe: FARBEN[5] });
  }
  if (sonstigeJahr > 0) {
    bloeckeRoh.push({ label: 'Parken & Pflege', jahr: sonstigeJahr, farbe: FARBEN[6] });
  }

  const kostenBloecke: KostenBlock[] = bloeckeRoh.map(b => ({
    label: b.label,
    monat: rund2(b.jahr / 12),
    jahr: b.jahr,
    anteilProzent: gesamtJahr > 0 ? rund2((b.jahr / gesamtJahr) * 100) : 0,
    farbe: b.farbe,
  }));

  // === STRECKENKOSTEN ===
  const streckenKosten: StreckenKosten[] = [
    {
      label: 'Weg zur Arbeit (20 km einfach)',
      km: 40,
      kosten: rund2(40 * kostenProKm),
      hinweis: 'pro Tag (Hin + Zurück)',
    },
    {
      label: 'Wochenendausflug',
      km: 100,
      kosten: rund2(100 * kostenProKm),
    },
    {
      label: 'Urlaub',
      km: 800,
      kosten: rund2(800 * kostenProKm),
    },
  ];

  // === VERGLEICH ===
  const durchschnitt = 500; // ca. 500 €/Monat Durchschnitt in Deutschland
  const vergleichProzent = rund2(((gesamtMonat - durchschnitt) / durchschnitt) * 100);
  let vergleichText: string;
  if (Math.abs(vergleichProzent) < 5) {
    vergleichText = 'Ihre Kosten liegen im deutschen Durchschnitt (ca. 400–600 €/Monat).';
  } else if (vergleichProzent > 0) {
    vergleichText = `Ihre Kosten liegen ca. ${Math.abs(Math.round(vergleichProzent))}% über dem Durchschnitt (ca. 400–600 €/Monat).`;
  } else {
    vergleichText = `Ihre Kosten liegen ca. ${Math.abs(Math.round(vergleichProzent))}% unter dem Durchschnitt (ca. 400–600 €/Monat).`;
  }

  return {
    gesamtMonat, gesamtJahr, kostenProKm, kostenProTag,
    restwert, gesamtWertverlust, wertverlustJahr, wertverlustMonat,
    kraftstoffJahr, versicherungJahr, steuerJahr, wartungGesamtJahr, sonstigeJahr,
    kostenBloecke, streckenKosten,
    istFinanziert, finanzierungJahr,
    vergleichText, vergleichProzent,
  };
}
