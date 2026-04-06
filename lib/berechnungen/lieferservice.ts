export interface LieferserviceEingabe {
  bestellungenProWoche: number;
  bestellwert: number;
  liefergebuehr: number;
  trinkgeld: number;
}

export interface LieferserviceErgebnis {
  kostenProBestellung: number;
  kostenProWoche: number;
  kostenProMonat: number;
  kostenProJahr: number;
  kostenIn5Jahren: number;
  kostenIn10Jahren: number;
  selbstKochenProMahlzeit: number;
  selbstKochenProMonat: number;
  selbstKochenProJahr: number;
  selbstKochenIn10Jahren: number;
  ersparnisProMonat: number;
  ersparnisProJahr: number;
  ersparnisIn10Jahren: number;
  vergleiche: { label: string; icon: string; anzahl: number }[];
  lieferAnteilProzent: number;
  kochenAnteilProzent: number;
}

const SELBST_KOCHEN_PRO_MAHLZEIT = 4;

export function berechneLieferservice(eingabe: LieferserviceEingabe): LieferserviceErgebnis {
  const { bestellungenProWoche, bestellwert, liefergebuehr, trinkgeld } = eingabe;

  const kostenProBestellung = bestellwert + liefergebuehr + trinkgeld;
  const kostenProWoche = kostenProBestellung * bestellungenProWoche;
  const kostenProMonat = kostenProWoche * (52 / 12);
  const kostenProJahr = kostenProWoche * 52;
  const kostenIn5Jahren = kostenProJahr * 5;
  const kostenIn10Jahren = kostenProJahr * 10;

  const selbstKochenProMahlzeit = SELBST_KOCHEN_PRO_MAHLZEIT;
  const selbstKochenProWoche = selbstKochenProMahlzeit * bestellungenProWoche;
  const selbstKochenProMonat = selbstKochenProWoche * (52 / 12);
  const selbstKochenProJahr = selbstKochenProWoche * 52;
  const selbstKochenIn10Jahren = selbstKochenProJahr * 10;

  const ersparnisProMonat = kostenProMonat - selbstKochenProMonat;
  const ersparnisProJahr = kostenProJahr - selbstKochenProJahr;
  const ersparnisIn10Jahren = kostenIn10Jahren - selbstKochenIn10Jahren;

  // Balkenvergleich Prozent
  const maxKosten = Math.max(kostenProJahr, selbstKochenProJahr);
  const lieferAnteilProzent = maxKosten > 0 ? (kostenProJahr / maxKosten) * 100 : 0;
  const kochenAnteilProzent = maxKosten > 0 ? (selbstKochenProJahr / maxKosten) * 100 : 0;

  // Was man sich in 10 Jahren leisten könnte
  const vergleiche: { label: string; icon: string; anzahl: number }[] = [
    { label: 'Urlaube (à 2.000 €)', icon: '🏖️', anzahl: Math.floor(ersparnisIn10Jahren / 2000) },
    { label: 'iPhones (à 1.200 €)', icon: '📱', anzahl: Math.floor(ersparnisIn10Jahren / 1200) },
    { label: 'E-Bikes (à 3.000 €)', icon: '🚴', anzahl: Math.floor(ersparnisIn10Jahren / 3000) },
    { label: 'Monatsmieten (à 800 €)', icon: '🏠', anzahl: Math.floor(ersparnisIn10Jahren / 800) },
    { label: 'Netflix-Jahre (à 156 €)', icon: '📺', anzahl: Math.floor(ersparnisIn10Jahren / 156) },
  ].filter(v => v.anzahl > 0);

  return {
    kostenProBestellung,
    kostenProWoche,
    kostenProMonat,
    kostenProJahr,
    kostenIn5Jahren,
    kostenIn10Jahren,
    selbstKochenProMahlzeit,
    selbstKochenProMonat,
    selbstKochenProJahr,
    selbstKochenIn10Jahren,
    ersparnisProMonat,
    ersparnisProJahr,
    ersparnisIn10Jahren,
    vergleiche,
    lieferAnteilProzent,
    kochenAnteilProzent,
  };
}
