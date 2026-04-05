export interface StreamingDienst {
  id: string;
  name: string;
  varianten: { label: string; preis: number }[];
}

export const streamingDienste: StreamingDienst[] = [
  {
    id: 'netflix',
    name: 'Netflix',
    varianten: [
      { label: 'Standard mit Werbung', preis: 4.99 },
      { label: 'Standard', preis: 13.99 },
      { label: 'Premium', preis: 19.99 },
    ],
  },
  {
    id: 'disney',
    name: 'Disney+',
    varianten: [
      { label: 'Standard mit Werbung', preis: 5.99 },
      { label: 'Standard', preis: 9.99 },
      { label: 'Premium', preis: 13.99 },
    ],
  },
  {
    id: 'prime',
    name: 'Amazon Prime',
    varianten: [{ label: 'Prime', preis: 8.99 }],
  },
  {
    id: 'spotify',
    name: 'Spotify',
    varianten: [
      { label: 'Premium', preis: 11.99 },
      { label: 'Family', preis: 17.99 },
    ],
  },
  {
    id: 'apple-music',
    name: 'Apple Music',
    varianten: [
      { label: 'Einzelperson', preis: 10.99 },
      { label: 'Family', preis: 16.99 },
    ],
  },
  {
    id: 'youtube',
    name: 'YouTube Premium',
    varianten: [
      { label: 'Einzelperson', preis: 13.99 },
      { label: 'Family', preis: 23.99 },
    ],
  },
  {
    id: 'dazn',
    name: 'DAZN',
    varianten: [
      { label: 'Standard', preis: 34.99 },
      { label: 'Unlimited', preis: 44.99 },
    ],
  },
  {
    id: 'sky',
    name: 'Sky',
    varianten: [
      { label: 'Entertainment', preis: 12.50 },
      { label: 'Sport', preis: 25.00 },
      { label: 'Komplett', preis: 40.00 },
    ],
  },
  {
    id: 'wow',
    name: 'WOW',
    varianten: [
      { label: 'Serien', preis: 7.99 },
      { label: 'Sport', preis: 29.99 },
    ],
  },
  {
    id: 'rtlplus',
    name: 'RTL+',
    varianten: [
      { label: 'Premium', preis: 7.99 },
      { label: 'Max', preis: 12.99 },
    ],
  },
  {
    id: 'paramount',
    name: 'Paramount+',
    varianten: [{ label: 'Standard', preis: 7.99 }],
  },
  {
    id: 'appletv',
    name: 'Apple TV+',
    varianten: [{ label: 'Standard', preis: 9.99 }],
  },
  {
    id: 'audible',
    name: 'Audible',
    varianten: [{ label: 'Standard', preis: 9.95 }],
  },
];

export interface AktivesAbo {
  dienstId: string;
  name: string;
  varianteLabel: string;
  preis: number;
}

export interface StreamingErgebnis {
  abos: AktivesAbo[];
  sonstigeBetrag: number;
  monatlich: number;
  jaehrlich: number;
  fuenfJahre: number;
  zehnJahre: number;
  arbeitsstundenMindestlohn: number;
  ranking: AktivesAbo[];
}

const MINDESTLOHN_2025 = 12.82; // € pro Stunde (ab 2025)

export function berechneStreamingKosten(
  auswahl: Record<string, number>, // dienstId -> variantenIndex
  sonstigeBetrag: number,
): StreamingErgebnis {
  const abos: AktivesAbo[] = [];

  for (const [dienstId, varIndex] of Object.entries(auswahl)) {
    const dienst = streamingDienste.find(d => d.id === dienstId);
    if (!dienst) continue;
    const variante = dienst.varianten[varIndex];
    if (!variante) continue;
    abos.push({
      dienstId,
      name: dienst.name,
      varianteLabel: variante.label,
      preis: variante.preis,
    });
  }

  const aboSumme = abos.reduce((s, a) => s + a.preis, 0);
  const monatlich = aboSumme + sonstigeBetrag;
  const jaehrlich = monatlich * 12;
  const fuenfJahre = jaehrlich * 5;
  const zehnJahre = jaehrlich * 10;
  const arbeitsstundenMindestlohn = jaehrlich / MINDESTLOHN_2025;

  const ranking = [...abos].sort((a, b) => b.preis - a.preis);

  return {
    abos,
    sonstigeBetrag,
    monatlich,
    jaehrlich,
    fuenfJahre,
    zehnJahre,
    arbeitsstundenMindestlohn,
    ranking,
  };
}
