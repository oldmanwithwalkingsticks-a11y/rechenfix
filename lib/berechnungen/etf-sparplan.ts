export interface EtfSparplanEingabe {
  sparrate: number;
  einmalanlage: number;
  anlagedauer: number; // Jahre
  rendite: number; // % p.a.
  dynamik: boolean;
  dynamikProzent: number;
  steuern: boolean;
  freibetrag: number; // 1000 oder 2000
}

export interface JahresDaten {
  jahr: number;
  einzahlungenKumuliert: number;
  sparrateMonat: number;
  kapital: number;
  renditeKumuliert: number;
}

export interface EtfSparplanErgebnis {
  endkapital: number;
  summeEinzahlungen: number;
  renditeAnteil: number;
  renditeAnteilProzent: number;
  steuer: number;
  endkapitalNachSteuern: number;
  jahresDaten: JahresDaten[];
  ohneRenditeEndkapital: number; // Girokonto-Vergleich
}

export function berechneEtfSparplan(eingabe: EtfSparplanEingabe): EtfSparplanErgebnis | null {
  const { sparrate, einmalanlage, anlagedauer, rendite, dynamik, dynamikProzent, steuern, freibetrag } = eingabe;
  if (sparrate < 0 || anlagedauer <= 0 || rendite < 0) return null;

  const monatsRendite = Math.pow(1 + rendite / 100, 1 / 12) - 1;
  const gesamtMonate = anlagedauer * 12;

  let kapital = einmalanlage;
  let summeEinzahlungen = einmalanlage;
  let aktuelleSparrate = sparrate;

  const jahresDaten: JahresDaten[] = [];

  for (let monat = 1; monat <= gesamtMonate; monat++) {
    // Dynamik: Sparrate erhöht sich jedes Jahr (nach 12, 24, 36... Monaten)
    if (dynamik && dynamikProzent > 0 && monat > 1 && (monat - 1) % 12 === 0) {
      aktuelleSparrate = sparrate * Math.pow(1 + dynamikProzent / 100, Math.floor((monat - 1) / 12));
    }

    // Rendite auf bestehendes Kapital + neue Sparrate
    kapital = kapital * (1 + monatsRendite) + aktuelleSparrate;
    summeEinzahlungen += aktuelleSparrate;

    // Jahresende-Snapshot
    if (monat % 12 === 0) {
      const jahr = monat / 12;
      jahresDaten.push({
        jahr,
        einzahlungenKumuliert: Math.round(summeEinzahlungen * 100) / 100,
        sparrateMonat: Math.round(aktuelleSparrate * 100) / 100,
        kapital: Math.round(kapital * 100) / 100,
        renditeKumuliert: Math.round((kapital - summeEinzahlungen) * 100) / 100,
      });
    }
  }

  const endkapital = Math.round(kapital * 100) / 100;
  summeEinzahlungen = Math.round(summeEinzahlungen * 100) / 100;
  const renditeAnteil = Math.round((endkapital - summeEinzahlungen) * 100) / 100;
  const renditeAnteilProzent = summeEinzahlungen > 0
    ? Math.round((renditeAnteil / summeEinzahlungen) * 10000) / 100
    : 0;

  // Steuerberechnung
  let steuer = 0;
  let endkapitalNachSteuern = endkapital;

  if (steuern && renditeAnteil > 0) {
    // Teilfreistellung 30% bei Aktienfonds (§ 20 Abs. 1 InvStG)
    const steuerpflichtigerGewinn = renditeAnteil * 0.70;
    const nachFreibetrag = Math.max(0, steuerpflichtigerGewinn - freibetrag);
    steuer = Math.round(nachFreibetrag * 0.26375 * 100) / 100;
    endkapitalNachSteuern = Math.round((endkapital - steuer) * 100) / 100;
  }

  // Girokonto-Vergleich (0% Rendite)
  const ohneRenditeEndkapital = summeEinzahlungen;

  return {
    endkapital,
    summeEinzahlungen,
    renditeAnteil,
    renditeAnteilProzent,
    steuer,
    endkapitalNachSteuern,
    jahresDaten,
    ohneRenditeEndkapital,
  };
}
