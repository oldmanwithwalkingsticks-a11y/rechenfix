export interface SternzeichenInfo {
  name: string;
  symbol: string;
  von: string;
  bis: string;
}

export const STERNZEICHEN: SternzeichenInfo[] = [
  { name: 'Steinbock', symbol: '♑', von: '22.12', bis: '19.01' },
  { name: 'Wassermann', symbol: '♒', von: '20.01', bis: '18.02' },
  { name: 'Fische', symbol: '♓', von: '19.02', bis: '20.03' },
  { name: 'Widder', symbol: '♈', von: '21.03', bis: '19.04' },
  { name: 'Stier', symbol: '♉', von: '20.04', bis: '20.05' },
  { name: 'Zwillinge', symbol: '♊', von: '21.05', bis: '20.06' },
  { name: 'Krebs', symbol: '♋', von: '21.06', bis: '22.07' },
  { name: 'Löwe', symbol: '♌', von: '23.07', bis: '22.08' },
  { name: 'Jungfrau', symbol: '♍', von: '23.08', bis: '22.09' },
  { name: 'Waage', symbol: '♎', von: '23.09', bis: '22.10' },
  { name: 'Skorpion', symbol: '♏', von: '23.10', bis: '21.11' },
  { name: 'Schütze', symbol: '♐', von: '22.11', bis: '21.12' },
];

const WOCHENTAGE = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

export interface Meilenstein {
  label: string;
  datum: Date;
  vergangen: boolean;
}

export interface GeburtstagErgebnis {
  // Alter
  jahre: number;
  monate: number;
  tage: number;

  // Einheiten
  gesamtTage: number;
  gesamtWochen: number;
  gesamtStunden: number;
  gesamtMinuten: number;
  gesamtSekunden: number;

  // Wochentag & Sternzeichen
  wochentagGeburt: string;
  sternzeichen: SternzeichenInfo;

  // Nächster Geburtstag
  naechsterGeburtstag: Date;
  tagesBisNaechster: number;
  wochentagNaechster: string;
  alterNaechster: number;

  // Nächster runder Geburtstag
  naechsterRunderGeburtstag: number;
  datumRunderGeburtstag: Date;
  tagesBisRunder: number;
  jahreBisRunder: number;

  // Meilensteine
  meilensteine: Meilenstein[];

  // Für Live-Zähler
  geburtsdatumMs: number;
}

function getSternzeichen(tag: number, monat: number): SternzeichenInfo {
  // monat: 1-12
  const mmdd = monat * 100 + tag;

  if (mmdd >= 120 && mmdd <= 218) return STERNZEICHEN[1]; // Wassermann
  if (mmdd >= 219 && mmdd <= 320) return STERNZEICHEN[2]; // Fische
  if (mmdd >= 321 && mmdd <= 419) return STERNZEICHEN[3]; // Widder
  if (mmdd >= 420 && mmdd <= 520) return STERNZEICHEN[4]; // Stier
  if (mmdd >= 521 && mmdd <= 620) return STERNZEICHEN[5]; // Zwillinge
  if (mmdd >= 621 && mmdd <= 722) return STERNZEICHEN[6]; // Krebs
  if (mmdd >= 723 && mmdd <= 822) return STERNZEICHEN[7]; // Löwe
  if (mmdd >= 823 && mmdd <= 922) return STERNZEICHEN[8]; // Jungfrau
  if (mmdd >= 923 && mmdd <= 1022) return STERNZEICHEN[9]; // Waage
  if (mmdd >= 1023 && mmdd <= 1121) return STERNZEICHEN[10]; // Skorpion
  if (mmdd >= 1122 && mmdd <= 1221) return STERNZEICHEN[11]; // Schütze
  return STERNZEICHEN[0]; // Steinbock (22.12-19.01)
}

function tageDifferenz(von: Date, bis: Date): number {
  const msProTag = 86400000;
  const vonUtc = Date.UTC(von.getFullYear(), von.getMonth(), von.getDate());
  const bisUtc = Date.UTC(bis.getFullYear(), bis.getMonth(), bis.getDate());
  return Math.floor((bisUtc - vonUtc) / msProTag);
}

function berechneAlter(geburt: Date, heute: Date): { jahre: number; monate: number; tage: number } {
  let jahre = heute.getFullYear() - geburt.getFullYear();
  let monate = heute.getMonth() - geburt.getMonth();
  let tage = heute.getDate() - geburt.getDate();

  if (tage < 0) {
    monate--;
    const vorherigerMonat = new Date(heute.getFullYear(), heute.getMonth(), 0);
    tage += vorherigerMonat.getDate();
  }

  if (monate < 0) {
    jahre--;
    monate += 12;
  }

  return { jahre, monate, tage };
}

export function berechneGeburtstag(geburtsdatumStr: string): GeburtstagErgebnis | null {
  if (!geburtsdatumStr) return null;

  const geburt = new Date(geburtsdatumStr + 'T00:00:00');
  if (isNaN(geburt.getTime())) return null;

  const heute = new Date();
  const heuteDate = new Date(heute.getFullYear(), heute.getMonth(), heute.getDate());

  if (geburt >= heuteDate) return null;

  // Alter
  const { jahre, monate, tage } = berechneAlter(geburt, heuteDate);

  // Gesamt-Einheiten
  const gesamtTage = tageDifferenz(geburt, heuteDate);
  const gesamtWochen = Math.floor(gesamtTage / 7);
  const gesamtStunden = gesamtTage * 24;
  const gesamtMinuten = gesamtStunden * 60;
  const gesamtSekunden = gesamtMinuten * 60;

  // Wochentag
  const wochentagGeburt = WOCHENTAGE[geburt.getDay()];

  // Sternzeichen
  const sternzeichen = getSternzeichen(geburt.getDate(), geburt.getMonth() + 1);

  // Nächster Geburtstag
  let naechsterGeburtstag = new Date(heute.getFullYear(), geburt.getMonth(), geburt.getDate());
  if (naechsterGeburtstag <= heuteDate) {
    naechsterGeburtstag = new Date(heute.getFullYear() + 1, geburt.getMonth(), geburt.getDate());
  }
  const tagesBisNaechster = tageDifferenz(heuteDate, naechsterGeburtstag);
  const wochentagNaechster = WOCHENTAGE[naechsterGeburtstag.getDay()];
  const alterNaechster = naechsterGeburtstag.getFullYear() - geburt.getFullYear();

  // Nächster runder Geburtstag
  let naechsterRunder = Math.ceil((jahre + 1) / 10) * 10;
  if (naechsterRunder <= jahre) naechsterRunder += 10;
  const datumRunder = new Date(geburt.getFullYear() + naechsterRunder, geburt.getMonth(), geburt.getDate());
  const tagesBisRunder = tageDifferenz(heuteDate, datumRunder);
  const jahreBisRunder = naechsterRunder - jahre;

  // Meilensteine
  const meilensteine: Meilenstein[] = [];
  const meilensteinTage = [
    { tage: 1000, label: '1.000 Tage' },
    { tage: 5000, label: '5.000 Tage' },
    { tage: 10000, label: '10.000 Tage' },
    { tage: 15000, label: '15.000 Tage' },
    { tage: 20000, label: '20.000 Tage' },
    { tage: 25000, label: '25.000 Tage' },
    { tage: 30000, label: '30.000 Tage' },
  ];

  for (const ms of meilensteinTage) {
    const datum = new Date(geburt.getTime() + ms.tage * 86400000);
    if (datum.getFullYear() <= geburt.getFullYear() + 120) {
      meilensteine.push({
        label: ms.label,
        datum,
        vergangen: datum <= heuteDate,
      });
    }
  }

  // 1.000.000 Stunden (≈ 114 Jahre)
  const millionStundenDatum = new Date(geburt.getTime() + 1000000 * 3600000);
  if (millionStundenDatum.getFullYear() - geburt.getFullYear() <= 120) {
    meilensteine.push({
      label: '1.000.000 Stunden',
      datum: millionStundenDatum,
      vergangen: millionStundenDatum <= heuteDate,
    });
  }

  return {
    jahre,
    monate,
    tage,
    gesamtTage,
    gesamtWochen,
    gesamtStunden,
    gesamtMinuten,
    gesamtSekunden,
    wochentagGeburt,
    sternzeichen,
    naechsterGeburtstag,
    tagesBisNaechster,
    wochentagNaechster,
    alterNaechster,
    naechsterRunderGeburtstag: naechsterRunder,
    datumRunderGeburtstag: datumRunder,
    tagesBisRunder,
    jahreBisRunder,
    meilensteine,
    geburtsdatumMs: geburt.getTime(),
  };
}
