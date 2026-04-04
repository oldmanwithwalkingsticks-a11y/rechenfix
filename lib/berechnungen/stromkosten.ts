export interface StromkostenEingabe {
  verbrauch: number;       // kWh pro Jahr
  preisProKwh: number;     // Cent pro kWh
  grundpreis: number;      // Euro pro Monat
}

export interface StromkostenErgebnis {
  kostenJahr: number;
  kostenMonat: number;
  kostenTag: number;
  arbeitspreis: number;
  grundpreisJahr: number;
  kostenProKwh: number;    // effektiver Gesamtpreis
}

export function berechneStromkosten(eingabe: StromkostenEingabe): StromkostenErgebnis | null {
  const { verbrauch, preisProKwh, grundpreis } = eingabe;
  if (verbrauch < 0 || preisProKwh < 0 || grundpreis < 0) return null;
  if (verbrauch === 0 && grundpreis === 0) return null;

  const arbeitspreis = verbrauch * (preisProKwh / 100);
  const grundpreisJahr = grundpreis * 12;
  const kostenJahr = arbeitspreis + grundpreisJahr;
  const kostenMonat = kostenJahr / 12;
  const kostenTag = kostenJahr / 365;
  const kostenProKwh = verbrauch > 0 ? (kostenJahr / verbrauch) * 100 : 0;

  return {
    kostenJahr: Math.round(kostenJahr * 100) / 100,
    kostenMonat: Math.round(kostenMonat * 100) / 100,
    kostenTag: Math.round(kostenTag * 100) / 100,
    arbeitspreis: Math.round(arbeitspreis * 100) / 100,
    grundpreisJahr: Math.round(grundpreisJahr * 100) / 100,
    kostenProKwh: Math.round(kostenProKwh * 100) / 100,
  };
}
