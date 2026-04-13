export type FinanzierungsModus = 'eigenkapital' | 'kredit';
export type MietausfallRisiko = 0 | 2 | 5 | 8;

export interface MietrenditeEingabe {
  kaufpreis: number;
  kaufnebenkostenProzent: number;
  monatlicheKaltmiete: number;
  nichtUmlagefaehigeNK: number;
  instandhaltung: number;
  mietausfallRisiko: MietausfallRisiko;
  finanzierung: FinanzierungsModus;
  eigenkapital: number;
  zinssatz: number;
  tilgung: number;
}

export interface CashflowZeile {
  label: string;
  monat: number;
  jahr: number;
  istSumme?: boolean;
  istNegativ?: boolean;
}

export interface MietrenditeErgebnis {
  // Grundwerte
  kaufpreis: number;
  kaufnebenkosten: number;
  gesamtinvestition: number;
  jahresmiete: number;

  // Renditen
  bruttomietrendite: number;
  nettomietrendite: number;
  eigenkapitalrendite: number | null;
  mietmultiplikator: number;

  // Cashflow
  effektiveJahresmiete: number;
  jaehrlicheKosten: number;
  jahresreinertrag: number;
  jaehrlicheKreditkosten: number | null;
  monatlicheKreditrate: number | null;
  darlehenssumme: number | null;
  monatsCashflow: number;
  jahresCashflow: number;

  // Tabelle
  cashflowTabelle: CashflowZeile[];

  // Bewertungen
  bruttoRenditeBewertung: 'gut' | 'durchschnittlich' | 'gering';
  multiplikatorBewertung: 'gut' | 'durchschnittlich' | 'hoch';
}

export const MIETAUSFALL_OPTIONEN: { value: MietausfallRisiko; label: string }[] = [
  { value: 0, label: '0% (immer vermietet)' },
  { value: 2, label: '2% (1 Monat in 4 Jahren)' },
  { value: 5, label: '5% (typisch)' },
  { value: 8, label: '8% (Risikobewusst)' },
];

function rund2(n: number): number {
  return Math.round(n * 100) / 100;
}

function rund1(n: number): number {
  return Math.round(n * 10) / 10;
}

export function berechneMietrendite(eingabe: MietrenditeEingabe): MietrenditeErgebnis | null {
  const {
    kaufpreis, kaufnebenkostenProzent, monatlicheKaltmiete,
    nichtUmlagefaehigeNK, instandhaltung, mietausfallRisiko,
    finanzierung, eigenkapital, zinssatz, tilgung,
  } = eingabe;

  if (kaufpreis <= 0 || monatlicheKaltmiete <= 0) return null;

  const kaufnebenkosten = rund2(kaufpreis * kaufnebenkostenProzent / 100);
  const gesamtinvestition = kaufpreis + kaufnebenkosten;

  // Bruttomietrendite
  const jahresmiete = monatlicheKaltmiete * 12;
  const bruttomietrendite = rund1(jahresmiete / kaufpreis * 100);

  // Nettomietrendite
  const effektiveJahresmiete = rund2(jahresmiete * (1 - mietausfallRisiko / 100));
  const jaehrlicheKosten = rund2(nichtUmlagefaehigeNK * 12 + instandhaltung);
  const jahresreinertrag = rund2(effektiveJahresmiete - jaehrlicheKosten);
  const nettomietrendite = rund1(jahresreinertrag / gesamtinvestition * 100);

  // Mietmultiplikator
  const mietmultiplikator = jahresmiete > 0 ? rund1(kaufpreis / jahresmiete) : 0;

  // Kredit
  let eigenkapitalrendite: number | null = null;
  let darlehenssumme: number | null = null;
  let jaehrlicheKreditkosten: number | null = null;
  let monatlicheKreditrate: number | null = null;
  let monatsCashflow: number;
  let jahresCashflow: number;

  if (finanzierung === 'kredit' && eigenkapital < gesamtinvestition) {
    darlehenssumme = rund2(gesamtinvestition - eigenkapital);
    jaehrlicheKreditkosten = rund2(darlehenssumme * (zinssatz + tilgung) / 100);
    monatlicheKreditrate = rund2(jaehrlicheKreditkosten / 12);
    jahresCashflow = rund2(jahresreinertrag - jaehrlicheKreditkosten);
    monatsCashflow = rund2(jahresCashflow / 12);

    // EK-Rendite: Tilgung als Vermögensaufbau, nur Zinsen als echte Kosten
    const jaehrlicheZinsen = rund2(darlehenssumme * zinssatz / 100);
    if (eigenkapital > 0) {
      eigenkapitalrendite = rund1((jahresreinertrag - jaehrlicheZinsen) / eigenkapital * 100);
    }
  } else {
    jahresCashflow = jahresreinertrag;
    monatsCashflow = rund2(jahresreinertrag / 12);
  }

  // Cashflow-Tabelle
  const cashflowTabelle: CashflowZeile[] = [];
  const mietausfallMonat = rund2(monatlicheKaltmiete * mietausfallRisiko / 100);
  const effektiveMieteMonat = rund2(monatlicheKaltmiete - mietausfallMonat);
  const instandhaltungMonat = rund2(instandhaltung / 12);

  cashflowTabelle.push({
    label: 'Kaltmiete',
    monat: monatlicheKaltmiete,
    jahr: jahresmiete,
  });

  if (mietausfallRisiko > 0) {
    cashflowTabelle.push({
      label: `Mietausfall (${mietausfallRisiko}%)`,
      monat: -mietausfallMonat,
      jahr: rund2(-jahresmiete * mietausfallRisiko / 100),
      istNegativ: true,
    });
  }

  cashflowTabelle.push({
    label: 'Effektive Miete',
    monat: effektiveMieteMonat,
    jahr: effektiveJahresmiete,
    istSumme: true,
  });

  cashflowTabelle.push({
    label: 'Nicht umlagefähige NK',
    monat: -nichtUmlagefaehigeNK,
    jahr: rund2(-nichtUmlagefaehigeNK * 12),
    istNegativ: true,
  });

  cashflowTabelle.push({
    label: 'Instandhaltung',
    monat: -instandhaltungMonat,
    jahr: -instandhaltung,
    istNegativ: true,
  });

  if (finanzierung === 'kredit' && monatlicheKreditrate !== null && jaehrlicheKreditkosten !== null) {
    cashflowTabelle.push({
      label: 'Kreditrate (Zins + Tilgung)',
      monat: -monatlicheKreditrate,
      jahr: -jaehrlicheKreditkosten,
      istNegativ: true,
    });
  }

  cashflowTabelle.push({
    label: finanzierung === 'kredit' ? 'Monatlicher Cashflow' : 'Reinertrag',
    monat: monatsCashflow,
    jahr: jahresCashflow,
    istSumme: true,
  });

  // Bewertungen
  const bruttoRenditeBewertung: 'gut' | 'durchschnittlich' | 'gering' =
    bruttomietrendite >= 5 ? 'gut' : bruttomietrendite >= 3 ? 'durchschnittlich' : 'gering';

  const multiplikatorBewertung: 'gut' | 'durchschnittlich' | 'hoch' =
    mietmultiplikator > 0 && mietmultiplikator < 20 ? 'gut' : mietmultiplikator <= 25 ? 'durchschnittlich' : 'hoch';

  return {
    kaufpreis,
    kaufnebenkosten,
    gesamtinvestition,
    jahresmiete,
    bruttomietrendite,
    nettomietrendite,
    eigenkapitalrendite,
    mietmultiplikator,
    effektiveJahresmiete,
    jaehrlicheKosten,
    jahresreinertrag,
    jaehrlicheKreditkosten,
    monatlicheKreditrate,
    darlehenssumme,
    monatsCashflow,
    jahresCashflow,
    cashflowTabelle,
    bruttoRenditeBewertung,
    multiplikatorBewertung,
  };
}
