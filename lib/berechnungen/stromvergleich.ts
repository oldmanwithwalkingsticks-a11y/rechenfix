export interface StromvergleichEingabe {
  verbrauchKwh: number;
  arbeitspreisCtKwh: number;
  grundpreisMonat: number;
  oekostrom: boolean;
}

export interface TarifVergleich {
  label: string;
  arbeitspreisCtKwh: number;
  grundpreisMonat: number;
  jahreskosten: number;
  monatskosten: number;
}

export interface StromvergleichErgebnis {
  aktuell: TarifVergleich;
  durchschnitt: TarifVergleich;
  guenstigster: TarifVergleich;
  sparpotenzialJahr: number;
  sparpotenzialMonat: number;
  istGuenstig: boolean;
  kostenProKwh: number;
}

function jahreskosten(verbrauch: number, arbeitspreisCtKwh: number, grundpreisMonat: number): number {
  return (verbrauch * arbeitspreisCtKwh / 100) + (grundpreisMonat * 12);
}

export function berechneStromvergleich(e: StromvergleichEingabe): StromvergleichErgebnis {
  const aktuellJahr = jahreskosten(e.verbrauchKwh, e.arbeitspreisCtKwh, e.grundpreisMonat);

  const dsAp = e.oekostrom ? 34 : 32;
  const dsGp = e.oekostrom ? 11 : 10;
  const durchschnittJahr = jahreskosten(e.verbrauchKwh, dsAp, dsGp);

  const gAp = e.oekostrom ? 30 : 28;
  const gGp = e.oekostrom ? 10 : 9;
  const guenstigsterJahr = jahreskosten(e.verbrauchKwh, gAp, gGp);

  const sparpotenzialJahr = Math.max(aktuellJahr - guenstigsterJahr, 0);

  return {
    aktuell: {
      label: 'Ihr aktueller Tarif',
      arbeitspreisCtKwh: e.arbeitspreisCtKwh,
      grundpreisMonat: e.grundpreisMonat,
      jahreskosten: aktuellJahr,
      monatskosten: aktuellJahr / 12,
    },
    durchschnitt: {
      label: e.oekostrom ? 'Durchschnitt Ökostrom' : 'Durchschnitt Normaltarif',
      arbeitspreisCtKwh: dsAp,
      grundpreisMonat: dsGp,
      jahreskosten: durchschnittJahr,
      monatskosten: durchschnittJahr / 12,
    },
    guenstigster: {
      label: e.oekostrom ? 'Günstigster Ökostrom (geschätzt)' : 'Günstigster Normaltarif (geschätzt)',
      arbeitspreisCtKwh: gAp,
      grundpreisMonat: gGp,
      jahreskosten: guenstigsterJahr,
      monatskosten: guenstigsterJahr / 12,
    },
    sparpotenzialJahr,
    sparpotenzialMonat: sparpotenzialJahr / 12,
    istGuenstig: sparpotenzialJahr < 20,
    kostenProKwh: e.verbrauchKwh > 0 ? aktuellJahr / e.verbrauchKwh * 100 : 0,
  };
}

export const HAUSHALTSGROESSEN = [
  { label: '1 Person', verbrauch: 1500 },
  { label: '2 Personen', verbrauch: 2500 },
  { label: '3 Personen', verbrauch: 3500 },
  { label: '4 Personen', verbrauch: 4500 },
  { label: '5+ Personen', verbrauch: 5500 },
];
