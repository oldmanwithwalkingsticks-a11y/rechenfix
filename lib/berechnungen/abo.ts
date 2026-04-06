export interface Abo {
  id: string;
  name: string;
  betrag: number;
  aktiv: boolean;
}

export interface AboErgebnis {
  gesamtMonatlich: number;
  gesamtJaehrlich: number;
  gesamtIn10Jahren: number;
  ranking: Abo[];
  anteile: { name: string; betrag: number; prozent: number; farbe: string }[];
  kuendigungsEmpfehlung: { name: string; betrag: number }[];
  kuendigungsErsparnis: number;
}

export const VORDEFINIERTE_ABOS: { name: string; betrag: number }[] = [
  { name: 'Fitnessstudio', betrag: 30 },
  { name: 'Handy-Vertrag', betrag: 25 },
  { name: 'Netflix', betrag: 14 },
  { name: 'Spotify', betrag: 12 },
  { name: 'Amazon Prime', betrag: 9 },
  { name: 'Zeitung', betrag: 25 },
  { name: 'Cloud-Speicher', betrag: 3 },
  { name: 'Xbox/PS Plus', betrag: 10 },
  { name: 'ChatGPT Plus', betrag: 20 },
  { name: 'Zeitschriften', betrag: 10 },
];

const FARBEN = [
  '#3b82f6', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6',
  '#ec4899', '#06b6d4', '#f97316', '#6366f1', '#14b8a6',
  '#e11d48', '#84cc16', '#a855f7', '#0ea5e9', '#d946ef',
];

export function berechneAbos(abos: Abo[]): AboErgebnis | null {
  const aktiveAbos = abos.filter(a => a.aktiv && a.betrag > 0);
  if (aktiveAbos.length === 0) return null;

  const gesamtMonatlich = aktiveAbos.reduce((sum, a) => sum + a.betrag, 0);
  const gesamtJaehrlich = gesamtMonatlich * 12;
  const gesamtIn10Jahren = gesamtJaehrlich * 10;

  // Ranking: teuerste zuerst
  const ranking = [...aktiveAbos].sort((a, b) => b.betrag - a.betrag);

  // Anteile für Tortendiagramm
  const anteile = ranking.map((a, i) => ({
    name: a.name,
    betrag: a.betrag,
    prozent: gesamtMonatlich > 0 ? (a.betrag / gesamtMonatlich) * 100 : 0,
    farbe: FARBEN[i % FARBEN.length],
  }));

  // Kündigungsempfehlung: die 2 günstigsten Abos (die man am ehesten nicht braucht)
  const nachPreis = [...aktiveAbos].sort((a, b) => a.betrag - b.betrag);
  const kuendigungsEmpfehlung = nachPreis.slice(0, Math.min(2, nachPreis.length));
  const kuendigungsErsparnis = kuendigungsEmpfehlung.reduce((sum, a) => sum + a.betrag, 0) * 12;

  return {
    gesamtMonatlich,
    gesamtJaehrlich,
    gesamtIn10Jahren,
    ranking,
    anteile,
    kuendigungsEmpfehlung,
    kuendigungsErsparnis,
  };
}
