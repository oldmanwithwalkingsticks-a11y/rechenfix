/**
 * MonatsstundenLeiter — Blogartikel 21 (Ein Monat hat keine 160 Stunden)
 *
 * Wie viele Stunden ein Monat bei Vollzeit hat, je nachdem, wer rechnet: zehn Werte von
 * 160 bis 184, aufsteigend als Leiter.
 *
 * Datenherkunft je Wert:
 * - Zoll, Seite „Fälligkeit und Arbeitszeitflexibilisierung“ (Branchenmindestlöhne),
 *   abgerufen am 27.10.2026, als feste Werte übernommen: Bauhauptgewerbe 178 Stunden
 *   April bis November, 164 Dezember bis März oder durchgehend 173; Gerüstbau 174 Mai bis
 *   November, 162 Dezember bis April oder durchgehend mindestens 169; Gebäudereinigung
 *   Wochenarbeitszeit ÷ 5 × 261 ÷ 12 (hier für 40 Stunden gerechnet); Bodenabfertigung
 *   sowie Aus- und Weiterbildung Wochenstunden × 4,348.
 * - 4,348: § 24 Abs. 3 Satz 3 TV-L, gleichlautend TVöD.
 * - 52 ÷ 12: VOLLZEIT_STUNDEN_MONAT aus lib/berechnungen/mindestlohn.ts.
 * - 4 × 40 und der längste Monat 2026: gerechnet (VOLLZEIT_WOCHENSTUNDEN,
 *   zaehleArbeitstageZeitraum aus lib/berechnungen/feiertage.ts).
 *
 * Geometrie: Werte rechtsbündig bis x = 84, Balkenfeld x = 100 bis 300 für 155 bis
 * 185 Stunden, Beschreibungen ab x = 316. Längste Beschreibung 50 Zeichen bei Größe 12,
 * rechnerisch 330 px, Ende bei x = 646. Zeilenabstand 30 px. Paarweise geprüft
 * (Chromium-Bbox), kein Überlauf über 680 × 466.
 *
 * Server-Komponente, statisch. Dark Mode über <style> mit .dark-Selektor.
 */
import { zaehleArbeitstageZeitraum } from '@/lib/berechnungen/feiertage';
import { VOLLZEIT_STUNDEN_MONAT, VOLLZEIT_WOCHENSTUNDEN } from '@/lib/berechnungen/mindestlohn';
import { formatZahl } from '@/lib/zahlenformat';

// Zoll, Branchenmindestlöhne, Stand 27.10.2026 (siehe Kopf).
const BAU_SOMMER = 178;
const BAU_WINTER = 164;
const BAU_FEST = 173;
const GERUEST_SOMMER = 174;
const GERUEST_WINTER = 162;
const GERUEST_MINDESTENS = 169;
const GEBAEUDEREINIGUNG = (VOLLZEIT_WOCHENSTUNDEN / 5) * 261 / 12;
// § 24 Abs. 3 Satz 3 TV-L
const FAKTOR_TVL = 4.348;

const JAHR = 2026;
const STUNDEN_JE_TAG = VOLLZEIT_WOCHENSTUNDEN / 5;
const MONATSTAGE = Array.from({ length: 12 }, (_, m) =>
  zaehleArbeitstageZeitraum(new Date(JAHR, m, 1), new Date(JAHR, m + 1, 0), 'nw', [1, 2, 3, 4, 5]).werktage,
);
const LAENGSTER_TAGE = Math.max(...MONATSTAGE);

type Art = 'zoll' | 'konvention' | 'kalender';

const STUFEN: { wert: number; stellen: number; text: string; art: Art }[] = [
  { wert: 4 * VOLLZEIT_WOCHENSTUNDEN, stellen: 0, text: '4 × 40, stimmt nur im Februar ohne Schalttag', art: 'kalender' },
  { wert: GERUEST_WINTER, stellen: 0, text: 'Gerüstbau, Dezember bis April', art: 'zoll' },
  { wert: BAU_WINTER, stellen: 0, text: 'Bauhauptgewerbe, Dezember bis März', art: 'zoll' },
  { wert: GERUEST_MINDESTENS, stellen: 0, text: 'Gerüstbau, durchgehend mindestens', art: 'zoll' },
  { wert: BAU_FEST, stellen: 0, text: 'Bauhauptgewerbe, durchgehend', art: 'zoll' },
  { wert: VOLLZEIT_STUNDEN_MONAT, stellen: 2, text: '52 ÷ 12: Minijob-Grenze, BMAS-Rechner, rechenfix', art: 'konvention' },
  { wert: VOLLZEIT_WOCHENSTUNDEN * FAKTOR_TVL, stellen: 2, text: `${formatZahl(FAKTOR_TVL, 3)}: TV-L, TVöD, Bodenabfertigung, Weiterbildung`, art: 'zoll' },
  {
    wert: GERUEST_SOMMER,
    stellen: 0,
    text: GEBAEUDEREINIGUNG === GERUEST_SOMMER ? 'Gerüstbau Mai bis November, Gebäudereinigung' : 'Gerüstbau Mai bis November',
    art: 'zoll',
  },
  { wert: BAU_SOMMER, stellen: 0, text: 'Bauhauptgewerbe, April bis November', art: 'zoll' },
  { wert: LAENGSTER_TAGE * STUNDEN_JE_TAG, stellen: 0, text: `Juli und Dezember ${JAHR}, ${LAENGSTER_TAGE} Tage × ${STUNDEN_JE_TAG}`, art: 'kalender' },
];

const V_MIN = 155;
const V_MAX = 185;
const BX0 = 100;
const BX1 = 300;
const Y0 = 120;
const ZEILE = 30;

const bx = (v: number) => BX0 + ((v - V_MIN) / (V_MAX - V_MIN)) * (BX1 - BX0);
const KLASSE: Record<Art, string> = { zoll: 'ml-zoll', konvention: 'ml-konv', kalender: 'ml-kal' };
const Y_FUSS = Y0 + (STUFEN.length - 1) * ZEILE + 22;

export default function MonatsstundenLeiter() {
  return (
    <figure className="my-8">
      <svg width="100%" viewBox="0 0 680 466" role="img" xmlns="http://www.w3.org/2000/svg" className="rounded-xl text-gray-900 dark:text-gray-100">
        <style>{`
          .ml-zoll { fill: #185FA5; }
          .ml-konv { fill: #0F6E56; }
          .ml-kal { fill: #9ca3af; }
          .ml-hervor { fill: #E1F5EE; }
          .ml-t-teal { fill: #0F6E56; }
          .dark .ml-zoll { fill: #85B7EB; }
          .dark .ml-konv { fill: #5DCAA5; }
          .dark .ml-kal { fill: #6b7280; }
          .dark .ml-hervor { fill: #1E3A32; }
          .dark .ml-t-teal { fill: #5DCAA5; }
        `}</style>
        <title>Wie viele Stunden hat ein Monat?</title>
        <desc>
          {'Monatsstunden bei Vollzeit mit 40 Wochenstunden, je nachdem, wer rechnet, von klein nach groß: '}
          {STUFEN.map((s) => `${formatZahl(s.wert, s.stellen)} Stunden: ${s.text}`).join('; ')}
          {`. Die Werte für Bau, Gerüstbau, Gebäudereinigung, Bodenabfertigung sowie Aus- und Weiterbildung stehen in der Liste des Zolls für die Branchenmindestlöhne. ${formatZahl(VOLLZEIT_STUNDEN_MONAT, 2)} Stunden, die Rechnung 52 Wochen geteilt durch 12 Monate, kommen dort nicht vor.`}
        </desc>

        <text x="24" y="34" fontSize="17" fontWeight="500" fill="currentColor">Wie viele Stunden hat ein Monat?</text>
        <text x="24" y="54" fontSize="12" fill="#9ca3af">Vollzeit mit 40 Wochenstunden, je nachdem, wer rechnet</text>

        <text x="84" y="88" fontSize="11" textAnchor="end" fill="#9ca3af">Stunden</text>
        {[160, 170, 180].map((v) => (
          <g key={v}>
            <text x={bx(v)} y="88" fontSize="10" textAnchor="middle" fill="#9ca3af">{v}</text>
            <line x1={bx(v)} y1="100" x2={bx(v)} y2={Y_FUSS - 8} stroke="#d1d5db" strokeWidth="0.5" />
          </g>
        ))}
        <text x="316" y="88" fontSize="11" fill="#9ca3af">Wer so rechnet</text>
        <line x1="24" y1="96" x2="656" y2="96" stroke="#d1d5db" strokeWidth="1" />

        {STUFEN.map((s, i) => {
          const y = Y0 + i * ZEILE;
          return (
            <g key={s.text}>
              {s.art === 'konvention' && <rect x="16" y={y - 15} width="648" height="26" rx="6" className="ml-hervor" />}
              <text x="84" y={y + 5} fontSize="13" fontWeight="600" textAnchor="end" fill="currentColor">{formatZahl(s.wert, s.stellen)}</text>
              <rect x={BX0} y={y - 7} width={bx(s.wert) - BX0} height="12" rx="3" className={KLASSE[s.art]} />
              <text
                x="316"
                y={y + 4}
                fontSize="12"
                fontWeight={s.art === 'konvention' ? 600 : 400}
                className={s.art === 'konvention' ? 'ml-t-teal' : undefined}
                fill={s.art === 'konvention' ? undefined : 'currentColor'}
              >
                {s.text}
              </text>
            </g>
          );
        })}

        <line x1="24" y1={Y_FUSS} x2="656" y2={Y_FUSS} stroke="#d1d5db" strokeWidth="1" />
        <rect x="24" y={Y_FUSS + 11} width="10" height="10" rx="2" className="ml-zoll" />
        <text x="40" y={Y_FUSS + 20} fontSize="12" fill="#9ca3af">Zoll-Liste der Branchenmindestlöhne</text>
        <rect x="282" y={Y_FUSS + 11} width="10" height="10" rx="2" className="ml-konv" />
        <text x="298" y={Y_FUSS + 20} fontSize="12" fill="#9ca3af">52 ÷ 12, fehlt beim Zoll</text>
        <rect x="470" y={Y_FUSS + 11} width="10" height="10" rx="2" className="ml-kal" />
        <text x="486" y={Y_FUSS + 20} fontSize="12" fill="#9ca3af">Kalender, Faustregel</text>
        <text x="24" y={Y_FUSS + 40} fontSize="12" fill="#9ca3af">
          {`Bau und Gerüstbau: Sommer- und Wintermonate oder ein fester Wert. ${formatZahl(FAKTOR_TVL, 3)} = Kalendermittel.`}
        </text>
      </svg>
      <figcaption className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {`Zehn Antworten auf eine Frage. Die Liste des Zolls für die Branchenmindestlöhne kennt Werte von ${formatZahl(GERUEST_WINTER)} bis ${formatZahl(BAU_SOMMER)} Stunden, aber nicht die ${formatZahl(VOLLZEIT_STUNDEN_MONAT, 2)}, mit denen der Gesetzgeber die Minijob-Grenze berechnet.`}
      </figcaption>
    </figure>
  );
}
