export interface KaffeeEingabe {
  kaffeeProTag: number;
  art: 'filter' | 'kapsel' | 'cafe' | 'starbucks' | 'custom';
  customPreis: number;
  jahre: number;
}

export interface KaffeeErgebnis {
  preisProStueck: number;
  kostenProTag: number;
  kostenProWoche: number;
  kostenProMonat: number;
  kostenProJahr: number;
  kostenBisher: number;
  kostenIn30Jahren: number;
  kaffeeProJahr: number;
  kaffeeBisher: number;
  sparVergleiche: { von: string; nach: string; ersparnis: number }[];
  vergleiche: { label: string; icon: string; anzahl: number }[];
}

const PREISE: Record<string, { preis: number; label: string }> = {
  filter: { preis: 0.15, label: 'Filterkaffee' },
  kapsel: { preis: 0.40, label: 'Kapsel (Nespresso & Co.)' },
  cafe: { preis: 3.50, label: 'Café to go' },
  starbucks: { preis: 5.00, label: 'Starbucks & Co.' },
};

export function getKaffeePreise() {
  return PREISE;
}

export function berechneKaffee(eingabe: KaffeeEingabe): KaffeeErgebnis {
  const { kaffeeProTag, art, customPreis, jahre } = eingabe;

  const preisProStueck = art === 'custom' ? customPreis : PREISE[art].preis;

  const kostenProTag = kaffeeProTag * preisProStueck;
  const kostenProWoche = kostenProTag * 7;
  const kostenProMonat = kostenProTag * 30.44; // avg days/month
  const kostenProJahr = kostenProTag * 365;

  const kostenBisher = kostenProJahr * jahre;
  const kostenIn30Jahren = kostenProJahr * 30;

  const kaffeeProJahr = Math.round(kaffeeProTag * 365);
  const kaffeeBisher = Math.round(kaffeeProTag * 365 * jahre);

  // Spar-Vergleiche: Umstieg auf günstigere Optionen
  const sparVergleiche: { von: string; nach: string; ersparnis: number }[] = [];
  const alleArten = ['filter', 'kapsel', 'cafe', 'starbucks'] as const;
  const aktuellerIndex = alleArten.indexOf(art as typeof alleArten[number]);

  if (aktuellerIndex > 0) {
    for (let i = 0; i < aktuellerIndex; i++) {
      const guenstigereArt = alleArten[i];
      const guenstigererPreis = PREISE[guenstigereArt].preis;
      const ersparnis = (preisProStueck - guenstigererPreis) * kaffeeProTag * 365;
      if (ersparnis > 0) {
        sparVergleiche.push({
          von: PREISE[art]?.label ?? 'Ihr Kaffee',
          nach: PREISE[guenstigereArt].label,
          ersparnis,
        });
      }
    }
  } else if (art === 'custom' && customPreis > 0.15) {
    const ersparnis = (customPreis - 0.15) * kaffeeProTag * 365;
    sparVergleiche.push({
      von: 'Ihr Kaffee',
      nach: 'Filterkaffee',
      ersparnis,
    });
  }

  // Vergleiche: Was man dafür kaufen könnte (basierend auf Kosten in 30 Jahren)
  const vergleiche: { label: string; icon: string; anzahl: number }[] = [
    { label: 'Urlaube (à 2.000 €)', icon: '🏖️', anzahl: Math.floor(kostenIn30Jahren / 2000) },
    { label: 'iPhones (à 1.200 €)', icon: '📱', anzahl: Math.floor(kostenIn30Jahren / 1200) },
    { label: 'E-Bike (à 3.000 €)', icon: '🚴', anzahl: Math.floor(kostenIn30Jahren / 3000) },
    { label: 'Monatsmieten (à 800 €)', icon: '🏠', anzahl: Math.floor(kostenIn30Jahren / 800) },
    { label: 'Netflix-Jahre (à 156 €)', icon: '📺', anzahl: Math.floor(kostenIn30Jahren / 156) },
  ].filter(v => v.anzahl > 0);

  return {
    preisProStueck,
    kostenProTag,
    kostenProWoche,
    kostenProMonat,
    kostenProJahr,
    kostenBisher,
    kostenIn30Jahren,
    kaffeeProJahr,
    kaffeeBisher,
    sparVergleiche,
    vergleiche,
  };
}
