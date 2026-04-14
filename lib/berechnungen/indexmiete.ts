export interface IndexmieteEingabe {
  kaltmiete: number;           // €/Monat
  vpiAlt: number;              // VPI bei letzter Anpassung
  vpiNeu: number;              // aktueller VPI
  datumLetzteAnpassung: string; // ISO yyyy-mm-dd
}

export interface IndexmieteErgebnis {
  kaltmieteAlt: number;
  kaltmieteNeu: number;
  erhoehungAbsolut: number;     // €/Monat
  erhoehungProzent: number;     // %
  erhoehungProJahr: number;     // €
  vpiVeraenderung: number;      // %
  fruehestmoeglicheAnpassung: string; // ISO
  anpassungMoeglich: boolean;
  monateBisAnpassung: number;   // 0 wenn möglich
}

function rund2(n: number): number {
  return Math.round(n * 100) / 100;
}

function addMonate(isoDatum: string, monate: number): Date {
  const d = new Date(isoDatum);
  d.setMonth(d.getMonth() + monate);
  return d;
}

function toIso(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const t = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${t}`;
}

export function defaultDatumLetzteAnpassung(): string {
  const d = new Date();
  d.setFullYear(d.getFullYear() - 1);
  return toIso(d);
}

export function berechneIndexmiete(e: IndexmieteEingabe): IndexmieteErgebnis {
  const { kaltmiete, vpiAlt, vpiNeu, datumLetzteAnpassung } = e;

  const vpiVeraenderung = vpiAlt > 0 ? ((vpiNeu - vpiAlt) / vpiAlt) * 100 : 0;
  const kaltmieteNeu = rund2(kaltmiete * (1 + vpiVeraenderung / 100));
  const erhoehungAbsolut = rund2(kaltmieteNeu - kaltmiete);
  const erhoehungProzent = kaltmiete > 0 ? rund2((erhoehungAbsolut / kaltmiete) * 100) : 0;
  const erhoehungProJahr = rund2(erhoehungAbsolut * 12);

  const fruehDatum = addMonate(datumLetzteAnpassung, 12);
  const heute = new Date();
  heute.setHours(0, 0, 0, 0);
  fruehDatum.setHours(0, 0, 0, 0);

  const anpassungMoeglich = heute.getTime() >= fruehDatum.getTime();
  let monateBisAnpassung = 0;
  if (!anpassungMoeglich) {
    const msProMonat = 1000 * 60 * 60 * 24 * 30.44;
    monateBisAnpassung = Math.max(0, Math.ceil((fruehDatum.getTime() - heute.getTime()) / msProMonat));
  }

  return {
    kaltmieteAlt: rund2(kaltmiete),
    kaltmieteNeu,
    erhoehungAbsolut,
    erhoehungProzent,
    erhoehungProJahr,
    vpiVeraenderung: rund2(vpiVeraenderung),
    fruehestmoeglicheAnpassung: toIso(fruehDatum),
    anpassungMoeglich,
    monateBisAnpassung,
  };
}
