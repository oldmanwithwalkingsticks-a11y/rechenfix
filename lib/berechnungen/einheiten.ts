export type EinheitenKategorie = 'laenge' | 'gewicht' | 'volumen' | 'flaeche' | 'temperatur' | 'zeit' | 'geschwindigkeit' | 'daten';

export interface Einheit {
  key: string;
  label: string;
  faktor: number; // relativ zur Basiseinheit (bei Temperatur ignoriert)
}

export interface KategorieDef {
  key: EinheitenKategorie;
  label: string;
  basis: string; // Basiseinheit-Key
  einheiten: Einheit[];
}

export const kategorien: KategorieDef[] = [
  {
    key: 'laenge', label: 'Länge', basis: 'm',
    einheiten: [
      { key: 'km', label: 'Kilometer', faktor: 1000 },
      { key: 'm', label: 'Meter', faktor: 1 },
      { key: 'dm', label: 'Dezimeter', faktor: 0.1 },
      { key: 'cm', label: 'Zentimeter', faktor: 0.01 },
      { key: 'mm', label: 'Millimeter', faktor: 0.001 },
      { key: 'µm', label: 'Mikrometer', faktor: 0.000001 },
      { key: 'mi', label: 'Meile', faktor: 1609.344 },
      { key: 'yd', label: 'Yard', faktor: 0.9144 },
      { key: 'ft', label: 'Fuß', faktor: 0.3048 },
      { key: 'in', label: 'Zoll', faktor: 0.0254 },
      { key: 'nmi', label: 'Seemeile', faktor: 1852 },
    ],
  },
  {
    key: 'gewicht', label: 'Gewicht', basis: 'kg',
    einheiten: [
      { key: 't', label: 'Tonne', faktor: 1000 },
      { key: 'kg', label: 'Kilogramm', faktor: 1 },
      { key: 'g', label: 'Gramm', faktor: 0.001 },
      { key: 'mg', label: 'Milligramm', faktor: 0.000001 },
      { key: 'lb', label: 'Pfund (lb)', faktor: 0.45359237 },
      { key: 'oz', label: 'Unze (oz)', faktor: 0.028349523125 },
      { key: 'st', label: 'Stone', faktor: 6.35029318 },
      { key: 'ct', label: 'Karat', faktor: 0.0002 },
    ],
  },
  {
    key: 'volumen', label: 'Volumen', basis: 'l',
    einheiten: [
      { key: 'm3', label: 'Kubikmeter', faktor: 1000 },
      { key: 'l', label: 'Liter', faktor: 1 },
      { key: 'dl', label: 'Deziliter', faktor: 0.1 },
      { key: 'cl', label: 'Zentiliter', faktor: 0.01 },
      { key: 'ml', label: 'Milliliter', faktor: 0.001 },
      { key: 'cm3', label: 'Kubikzentimeter', faktor: 0.001 },
      { key: 'gal_us', label: 'Gallone (US)', faktor: 3.785411784 },
      { key: 'gal_uk', label: 'Gallone (UK)', faktor: 4.54609 },
      { key: 'pt_us', label: 'Pint (US)', faktor: 0.473176473 },
      { key: 'cup', label: 'Tasse', faktor: 0.2365882365 },
      { key: 'tbsp', label: 'Esslöffel', faktor: 0.01478676478 },
      { key: 'tsp', label: 'Teelöffel', faktor: 0.00492892159 },
    ],
  },
  {
    key: 'flaeche', label: 'Fläche', basis: 'm2',
    einheiten: [
      { key: 'km2', label: 'Quadratkilometer', faktor: 1000000 },
      { key: 'ha', label: 'Hektar', faktor: 10000 },
      { key: 'a', label: 'Ar', faktor: 100 },
      { key: 'm2', label: 'Quadratmeter', faktor: 1 },
      { key: 'cm2', label: 'Quadratzentimeter', faktor: 0.0001 },
      { key: 'mm2', label: 'Quadratmillimeter', faktor: 0.000001 },
      { key: 'mi2', label: 'Quadratmeile', faktor: 2589988.110336 },
      { key: 'yd2', label: 'Quadratyard', faktor: 0.83612736 },
      { key: 'ft2', label: 'Quadratfuß', faktor: 0.09290304 },
      { key: 'in2', label: 'Quadratzoll', faktor: 0.00064516 },
      { key: 'acre', label: 'Morgen (Acre)', faktor: 4046.8564224 },
    ],
  },
  {
    key: 'temperatur', label: 'Temperatur', basis: 'c',
    einheiten: [
      { key: 'c', label: 'Celsius', faktor: 1 },
      { key: 'f', label: 'Fahrenheit', faktor: 1 },
      { key: 'k', label: 'Kelvin', faktor: 1 },
    ],
  },
  {
    key: 'zeit', label: 'Zeit', basis: 's',
    einheiten: [
      { key: 'y', label: 'Jahr', faktor: 31557600 },
      { key: 'mo', label: 'Monat', faktor: 2629800 },
      { key: 'w', label: 'Woche', faktor: 604800 },
      { key: 'd', label: 'Tag', faktor: 86400 },
      { key: 'h', label: 'Stunde', faktor: 3600 },
      { key: 'min', label: 'Minute', faktor: 60 },
      { key: 's', label: 'Sekunde', faktor: 1 },
      { key: 'ms', label: 'Millisekunde', faktor: 0.001 },
    ],
  },
  {
    key: 'geschwindigkeit', label: 'Geschwindigkeit', basis: 'ms',
    einheiten: [
      { key: 'kmh', label: 'km/h', faktor: 0.27777777778 },
      { key: 'ms', label: 'm/s', faktor: 1 },
      { key: 'mph', label: 'mph', faktor: 0.44704 },
      { key: 'kn', label: 'Knoten', faktor: 0.51444444444 },
      { key: 'mach', label: 'Mach', faktor: 343 },
    ],
  },
  {
    key: 'daten', label: 'Daten', basis: 'byte',
    einheiten: [
      { key: 'bit', label: 'Bit', faktor: 0.125 },
      { key: 'byte', label: 'Byte', faktor: 1 },
      { key: 'kb', label: 'Kilobyte', faktor: 1000 },
      { key: 'mb', label: 'Megabyte', faktor: 1000000 },
      { key: 'gb', label: 'Gigabyte', faktor: 1000000000 },
      { key: 'tb', label: 'Terabyte', faktor: 1000000000000 },
      { key: 'pb', label: 'Petabyte', faktor: 1000000000000000 },
      { key: 'kib', label: 'Kibibyte', faktor: 1024 },
      { key: 'mib', label: 'Mebibyte', faktor: 1048576 },
      { key: 'gib', label: 'Gibibyte', faktor: 1073741824 },
    ],
  },
];

// --- Temperatur-Spezialbehandlung ---

function zuCelsius(wert: number, von: string): number {
  if (von === 'c') return wert;
  if (von === 'f') return (wert - 32) * 5 / 9;
  if (von === 'k') return wert - 273.15;
  return wert;
}

function vonCelsius(celsius: number, zu: string): number {
  if (zu === 'c') return celsius;
  if (zu === 'f') return celsius * 9 / 5 + 32;
  if (zu === 'k') return celsius + 273.15;
  return celsius;
}

// --- Umrechnung ---

export interface UmrechnungErgebnis {
  wert: number;
  vonLabel: string;
  zuLabel: string;
  ergebnis: number;
  formel: string;
  alleUmrechnungen: { label: string; key: string; wert: number }[];
}

export function rechneUm(
  kategorie: EinheitenKategorie,
  wert: number,
  vonKey: string,
  zuKey: string,
): UmrechnungErgebnis | null {
  const kat = kategorien.find(k => k.key === kategorie);
  if (!kat) return null;

  const von = kat.einheiten.find(e => e.key === vonKey);
  const zu = kat.einheiten.find(e => e.key === zuKey);
  if (!von || !zu) return null;

  let ergebnis: number;
  let formel: string;

  if (kategorie === 'temperatur') {
    const celsius = zuCelsius(wert, vonKey);
    ergebnis = vonCelsius(celsius, zuKey);

    if (vonKey === 'c' && zuKey === 'f') formel = `${von.label} → ${zu.label}: F = C × 9/5 + 32`;
    else if (vonKey === 'f' && zuKey === 'c') formel = `${von.label} → ${zu.label}: C = (F − 32) × 5/9`;
    else if (vonKey === 'c' && zuKey === 'k') formel = `${von.label} → ${zu.label}: K = C + 273,15`;
    else if (vonKey === 'k' && zuKey === 'c') formel = `${von.label} → ${zu.label}: C = K − 273,15`;
    else if (vonKey === 'f' && zuKey === 'k') formel = `${von.label} → ${zu.label}: K = (F − 32) × 5/9 + 273,15`;
    else if (vonKey === 'k' && zuKey === 'f') formel = `${von.label} → ${zu.label}: F = (K − 273,15) × 9/5 + 32`;
    else formel = `${von.label} = ${zu.label}`;
  } else {
    const basisWert = wert * von.faktor;
    ergebnis = basisWert / zu.faktor;
    const faktor = von.faktor / zu.faktor;
    formel = `1 ${von.label} = ${smartFormat(faktor)} ${zu.label}`;
  }

  // Alle Umrechnungen
  const alleUmrechnungen = kat.einheiten.map(e => {
    let w: number;
    if (kategorie === 'temperatur') {
      const celsius = zuCelsius(wert, vonKey);
      w = vonCelsius(celsius, e.key);
    } else {
      w = (wert * von.faktor) / e.faktor;
    }
    return { label: e.label, key: e.key, wert: w };
  });

  return {
    wert,
    vonLabel: von.label,
    zuLabel: zu.label,
    ergebnis,
    formel,
    alleUmrechnungen,
  };
}

function smartFormat(n: number): string {
  if (n === 0) return '0';
  const abs = Math.abs(n);
  if (abs >= 1000000) return n.toLocaleString('de-DE', { maximumFractionDigits: 2 });
  if (abs >= 1) return n.toLocaleString('de-DE', { maximumFractionDigits: 6 });
  if (abs >= 0.001) return n.toLocaleString('de-DE', { maximumFractionDigits: 8 });
  return n.toExponential(4).replace('.', ',');
}

export function formatWert(n: number): string {
  return smartFormat(n);
}
