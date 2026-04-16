export interface SchritteErgebnis {
  schritte: number;
  schrittlaenge: number; // cm
  distanzKm: number;
  dauerStunden: number;
  dauerMinuten: number;
  kalorien: number;
  geschwindigkeitKmh: number;
  tagesziel: number;
  fortschrittProzent: number;
  restSchritte: number;
  restKm: number;
}

const GESCHWINDIGKEITEN: Record<string, number> = {
  langsam: 4,
  normal: 5,
  schnell: 6.5,
};

export function berechneSchritte(
  schritte: number,
  koerpergroesse: number,
  gewicht: number,
  geschwindigkeit: string
): SchritteErgebnis | null {
  if (schritte <= 0 || koerpergroesse <= 0 || gewicht <= 0) return null;

  const schrittlaenge = koerpergroesse * 0.415; // cm
  const distanzKm = (schritte * schrittlaenge) / 100000;
  const kmh = GESCHWINDIGKEITEN[geschwindigkeit] || 5;
  const dauerStunden = distanzKm / kmh;
  const dauerMinuten = Math.round(dauerStunden * 60);
  const kalorien = Math.round(distanzKm * gewicht * 0.9);

  const tagesziel = 10000;
  const fortschrittProzent = Math.min(100, Math.round((schritte / tagesziel) * 100));
  const restSchritte = Math.max(0, tagesziel - schritte);
  const restKm = (restSchritte * schrittlaenge) / 100000;

  return {
    schritte,
    schrittlaenge: Math.round(schrittlaenge * 10) / 10,
    distanzKm: Math.round(distanzKm * 100) / 100,
    dauerStunden: Math.round(dauerStunden * 100) / 100,
    dauerMinuten,
    kalorien,
    geschwindigkeitKmh: kmh,
    tagesziel,
    fortschrittProzent,
    restSchritte,
    restKm: Math.round(restKm * 100) / 100,
  };
}
