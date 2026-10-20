export interface StreamingDienst {
  id: string;
  name: string;
  varianten: { label: string; preis: number }[];
}

/**
 * Listenpreise Deutschland (Monatsabo), Stand 20.10.2026. W182: Netflix (Erhöhung 04.09.2026), Disney+
 * (Herbst 2025), Spotify (14.08.2025), YouTube Premium (Juni 2026), RTL+ (Januar 2026), Paramount+ und
 * WOW nach den Anbieter- bzw. Preisseiten aktualisiert; vorher Stand Anfang 2025 (Netflix Standard 13,99 €,
 * Spotify 11,99 €, Disney+ 9,99 €). Quellen: help.netflix.com/de/node/24926, disneyplus.com/de-de,
 * spotify.com/de/premium, wowtv.de; YouTube, RTL+ und Paramount+ laut Fachpresse.
 */
export const STREAMING_PREISE_STAND = '2026-10-20';

export const streamingDienste: StreamingDienst[] = [
  {
    id: 'netflix',
    name: 'Netflix',
    varianten: [
      { label: 'Standard mit Werbung', preis: 6.99 },
      { label: 'Standard', preis: 15.99 },
      { label: 'Premium', preis: 21.99 },
    ],
  },
  {
    id: 'disney',
    name: 'Disney+',
    varianten: [
      { label: 'Standard mit Werbung', preis: 6.99 },
      { label: 'Standard', preis: 10.99 },
      { label: 'Premium', preis: 15.99 },
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
      { label: 'Premium', preis: 12.99 },
      { label: 'Family', preis: 21.99 },
      { label: 'Duo', preis: 17.99 },
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
      { label: 'Einzelperson', preis: 14.99 },
      { label: 'Family', preis: 27.99 },
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
      { label: 'Filme & Serien', preis: 9.98 },
      { label: 'Live-Sport (12-Monats-Abo)', preis: 29.99 },
    ],
  },
  {
    id: 'rtlplus',
    name: 'RTL+',
    varianten: [
      { label: 'Premium', preis: 9.99 },
      { label: 'Premium werbefrei', preis: 12.99 },
    ],
  },
  {
    id: 'paramount',
    name: 'Paramount+',
    varianten: [{ label: 'Standard', preis: 9.99 }],
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

// Aktueller Mindestlohn aus zentraler SSOT — die Variable wurde bis
// Prompt 88 als `MINDESTLOHN_2025` hartkodiert; semantisch ist sie immer
// der *aktuelle* Mindestlohn (für die "Arbeitsstunden-Äquivalent"-Metrik).
import { MINDESTLOHN } from './mindestlohn';

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
  const arbeitsstundenMindestlohn = jaehrlich / MINDESTLOHN;

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
