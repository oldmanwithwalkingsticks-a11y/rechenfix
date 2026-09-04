/**
 * Termin-SSOT für rechenfix.de.
 *
 * Bewusst in `lib/` und NICHT in `docs/`: `vercel.json` überspringt Deploys,
 * bei denen nur `docs/**` oder `*.md` geändert wurde. Eine Terminänderung in
 * `docs/` würde nie deployt — der Cron liefe mit veralteten Daten weiter.
 *
 * Gelesen von:
 *   - app/api/cron/health-check/route.ts  (tägliche Mail 06 UTC)
 *   - scripts/check-termine.mjs           (Warnung im Prebuild, kein Gate)
 *
 * ACHTUNG bei Änderungen an `naechstesVorkommen`: Die Monatskappung existiert
 * bewusst zweimal — hier und in scripts/check-termine.mjs, weil das Skript
 * reines Node ist und diese Datei nicht importieren kann. Wer eine Seite
 * ändert, muss an die andere denken, sonst nennen Mail und Build-Log
 * verschiedene Daten.
 *
 * Pflegeregel:
 *   - `wiederholungMonate` gesetzt  → wiederkehrender Termin. Liegt das Datum in
 *     der Vergangenheit, rollt die Berechnung automatisch auf das nächste
 *     Vorkommen. Erinnerung, keine Verpflichtung.
 *   - `wiederholungMonate` fehlt    → Einmaltermin. Bleibt nach Ablauf dauerhaft
 *     als ÜBERFÄLLIG in der Mail stehen, bis der Eintrag entfernt oder das Datum
 *     bewusst verschoben wird. Genau so gewollt: rechtliche Fristen und
 *     Vertragsabläufe sollen nerven, bis jemand handelt.
 */

export type Terminbereich = 'Recht' | 'Betrieb' | 'Gesetzeswerte' | 'Inhalt';

export interface Termin {
  /** Stabile Kennung, kleingeschrieben, Bindestriche. */
  id: string;
  /** Kurzer Titel für die Mailzeile. */
  titel: string;
  /** ISO YYYY-MM-DD. Bei wiederkehrenden Terminen ein beliebiges Vorkommen. */
  datum: string;
  /** Wie viele Tage vorher erinnert wird. */
  vorlaufTage: number;
  /** 12 = jährlich, 24 = zweijährlich, 3 = quartalsweise, 1 = monatlich. Fehlt = einmalig. */
  wiederholungMonate?: number;
  bereich: Terminbereich;
  /** Die konkrete Handlung — nicht das Thema, sondern was zu tun ist. */
  was: string;
  /** Wo das Verfahren beschrieben steht. */
  quelle?: string;
}

export const TERMINE: Termin[] = [
  {
    id: 'tia-bundle-social',
    titel: 'Transfer-Folgenabschätzung bundle.social',
    datum: '2026-09-05',
    vorlaufTage: 10,
    bereich: 'Recht',
    was: 'Supabase-TIA von bundle.social anmahnen oder selbst erstellen. Angefordert 10.08.2026, erneut zugesagt 18.08.2026, liegt nicht vor.',
    quelle: 'Verarbeitungsverzeichnis VT-13 (lokal bei Karsten, nicht im Repo)',
  },
  {
    id: 'postpeer-loeschbestaetigung',
    titel: 'Löschbestätigung PostPeer',
    datum: '2026-09-18',
    vorlaufTage: 7,
    bereich: 'Recht',
    was: 'Monatsfrist nach Art. 12 Abs. 3 DSGVO für die Antwort auf das Löschverlangen. Bei Ausbleiben: schriftlich nachfassen und im Verarbeitungsverzeichnis vermerken.',
    quelle: 'Verarbeitungsverzeichnis VT-13',
  },
  {
    id: 'domain-checkdomain',
    titel: 'Domain rechenfix.de läuft aus',
    datum: '2027-04-03',
    vorlaufTage: 30,
    bereich: 'Betrieb',
    was: 'Verlängerung bei checkdomain GmbH prüfen und sicherstellen. Bewusst KEIN wiederkehrender Termin: nach der Verlängerung das Datum hier von Hand auf den neuen Ablauf setzen. Ein automatisch weiterrollender Eintrag würde sich selbst beruhigen, ohne dass verlängert wurde.',
  },
  {
    id: 'postfach-hostinger',
    titel: 'E-Mail-Postfach @rechenfix.de läuft aus',
    datum: '2027-04-03',
    vorlaufTage: 30,
    bereich: 'Betrieb',
    was: 'Hostinger-Vertrag für das Postfach verlängern. Ohne Postfach fallen auch der Absender feedback@rechenfix.de und damit Health-Check- und Feedback-Mails aus. Ebenfalls Einmaltermin — nach Verlängerung von Hand fortschreiben.',
  },
  {
    id: 'vercel-kostenkontrolle',
    titel: 'Vercel-Pro: Verbrauch und Rechnung sichten',
    datum: '2026-11-27',
    vorlaufTage: 3,
    wiederholungMonate: 3,
    bereich: 'Betrieb',
    was: 'Abrechnung läuft automatisch am 30. jedes Monats. Vierteljährlich statt monatlich erinnert, weil die Abbuchung selbst keine Handlung erfordert — geprüft werden Verbrauch, Rechnungshöhe und ob der Tarif noch passt.',
  },
  {
    id: 'awin-programme',
    titel: 'AWIN-Programme auf Aktivität prüfen',
    datum: '2026-09-01',
    vorlaufTage: 2,
    wiederholungMonate: 1,
    bereich: 'Betrieb',
    was: 'Im AWIN-Konto (Publisher-ID 2843240) nachsehen, welche der 13 Programme noch aktiv sind. Beendete oder ausgelaufene Programme aus components/AffiliateBox.tsx entfernen, sonst zeigen Werbemittel ins Leere. Bewusst monatlich statt fristgebunden: Die Programme haben keine im Repo hinterlegte Laufzeit, ein Ablaufdatum gibt es nicht.',
    quelle: 'components/AffiliateBox.tsx, Konstante AFFILIATE_PROGRAMS',
  },
  {
    id: 'bundle-social-kontingent',
    titel: 'bundle.social Kontingent prüfen',
    datum: '2026-09-06',
    vorlaufTage: 2,
    wiederholungMonate: 1,
    bereich: 'Betrieb',
    was: 'Zyklusgrenze des Gratistarifs (20 Posts/Monat). Verbrauch gegen den Jeden-zweiten-Tag-Takt gegenrechnen.',
    quelle: 'docs/social-pipeline.md',
  },
  {
    id: 'anthropic-key-vorlauf',
    titel: 'Anthropic-API-Schlüssel: Rotation vorbereiten',
    datum: '2026-10-25',
    vorlaufTage: 3,
    wiederholungMonate: 3,
    bereich: 'Betrieb',
    was: 'Reihenfolge zwingend: neuen Schlüssel anlegen, ANTHROPIC_API_KEY in Vercel ersetzen, deployen, KI-Erklärung testen, ERST DANN den alten widerrufen.',
  },
  {
    id: 'anthropic-key-ablauf',
    titel: 'Anthropic-API-Schlüssel läuft ab',
    datum: '2026-11-01',
    vorlaufTage: 7,
    wiederholungMonate: 3,
    bereich: 'Betrieb',
    was: 'Harter Ablauf. Ist die Rotation nicht erfolgt, fallen KI-Erklärung und KI-Rechner aus.',
  },
  {
    id: 'sv-rechengroessen',
    titel: 'SV-Rechengrößenverordnung Folgejahr',
    datum: '2026-10-01',
    vorlaufTage: 14,
    wiederholungMonate: 12,
    bereich: 'Gesetzeswerte',
    was: 'Neue BBG-Werte (RV und KV/PV, Monat und Jahr) sowie Durchschnittsentgelt beobachten, Switch auf 01.01. vorbereiten.',
    quelle: 'docs/jahreswerte-kalender.md, Dezember-Audit Punkt 3',
  },
  {
    id: 'lohnsteuer-pap',
    titel: 'Lohnsteuer-Programmablaufplan Folgejahr',
    datum: '2026-10-15',
    vorlaufTage: 14,
    wiederholungMonate: 12,
    bereich: 'Gesetzeswerte',
    was: 'ITZBund-XML herunterladen, SHA256 und Abrufdatum eintragen, neue _lohnsteuer-pap-JAHR.ts ableiten, Stützpunkte erweitern.',
    quelle: 'docs/jahreswerte-kalender.md, Dezember-Audit Punkt 9',
  },
  {
    id: 'wohngeld-dynamisierung',
    titel: 'Wohngeld-Dynamisierung',
    datum: '2026-10-01',
    vorlaufTage: 21,
    wiederholungMonate: 24,
    bereich: 'Gesetzeswerte',
    was: 'Zweijährliche Fortschreibung zum 01.01. Höchstbeträge Anlage 1 WoGG, Koeffizienten, Freibeträge § 17, Heiz- und Klimakomponente.',
    quelle: 'docs/jahreswerte-kalender.md, Abschnitt Wohngeld-Dynamisierung',
  },
  {
    id: 'audit-dezember',
    titel: 'Dezember-Audit Jahreswerte',
    datum: '2026-12-10',
    vorlaufTage: 10,
    wiederholungMonate: 12,
    bereich: 'Gesetzeswerte',
    was: 'Neun-Punkte-Checkliste für die 01.01.-Wechsel abarbeiten und Letzter-Check-Daten fortschreiben.',
    quelle: 'docs/jahreswerte-kalender.md, Dezember-Audit',
  },
  {
    id: 'switch-wirksamkeit-2027',
    titel: 'Stichtag-Switches 01.01.2027 nachprüfen',
    datum: '2027-01-02',
    vorlaufTage: 3,
    bereich: 'Gesetzeswerte',
    was: 'Mindestlohn 14,60 € und Minijob-Grenze 633 € sind als automatischer Switch vorbereitet. Am Stichtag live gegenprüfen, dass sie tatsächlich greifen.',
    quelle: 'lib/berechnungen/mindestlohn.ts',
  },
  {
    id: 'audit-juni',
    titel: 'Juni-Audit Jahreswerte',
    datum: '2027-06-01',
    vorlaufTage: 10,
    wiederholungMonate: 12,
    bereich: 'Gesetzeswerte',
    was: 'Rentenwert, Pfändungsfreigrenzen (zweijährlich, nächste 01.07.2028), Witwenrente-Freibetrag, Krankengeld-Höchstsatz.',
    quelle: 'docs/jahreswerte-kalender.md, Juni-Audit',
  },
  {
    id: 'audit-august-bafoeg',
    titel: 'August-Audit BAföG und AFBG',
    datum: '2027-08-01',
    vorlaufTage: 10,
    wiederholungMonate: 12,
    bereich: 'Gesetzeswerte',
    was: 'Bedarfssätze, Wohnpauschalen, KV/PV-Zuschläge zum Wintersemester; AFBG-Sätze meist gleichzeitig.',
    quelle: 'docs/jahreswerte-kalender.md, August-Audit',
  },
  {
    id: 'verarbeitungsverzeichnis-durchsicht',
    titel: 'Verarbeitungsverzeichnis durchsehen',
    datum: '2027-02-18',
    vorlaufTage: 14,
    wiederholungMonate: 6,
    bereich: 'Recht',
    was: 'VT-13 gegen den tatsächlichen Dienstleisterbestand abgleichen: Zugänge, Abgänge, Drittlandtransfers, AVV-Stand.',
    quelle: 'Fassung 18.08.2026, lokal bei Karsten als .docx',
  },
  {
    id: 'dpf-angemessenheit',
    titel: 'Angemessenheitsbeschluss Data Privacy Framework prüfen',
    datum: '2026-12-01',
    vorlaufTage: 7,
    wiederholungMonate: 3,
    bereich: 'Recht',
    was: 'Nachsehen, ob der Angemessenheitsbeschluss der EU-Kommission vom 10.07.2023 zum EU-US Data Privacy Framework noch in Kraft ist. Anlass: Der US Supreme Court hat am 29.06.2026 in Trump v. Slaughter die Unabhängigkeit der FTC verneint; der EDSA hat die Kommission am 31.07.2026 zur Prüfung der Folgen aufgefordert. Fällt der Beschluss, müssen die Abschnitte 5, 6 und 11 der Datenschutzerklärung noch am selben Tag auf Art. 46 Abs. 2 lit. c DSGVO umgestellt werden — die Standardvertragsklauseln liegen bei Vercel und Hostinger vertraglich bereits vor.',
    quelle: 'app/datenschutz/page.tsx, Abschnitte 5, 6 und 11',
  },
  {
    id: 'hostinger-unterauftragnehmer',
    titel: 'Unterauftragnehmer von Hostinger abgleichen',
    datum: '2027-03-04',
    vorlaufTage: 14,
    wiederholungMonate: 6,
    bereich: 'Recht',
    was: 'Anhang 3 des Hostinger-Auftragsverarbeitungsvertrags gegen den geführten Stand vom 04.09.2026 prüfen: AWS EMEA, Google Cloud EMEA, Cloudflare, MailChannels, Proofpoint, Anthropic Ireland, spectra tech. Nach Abschnitt 6.3 des Vertrags werden neue Unterauftragnehmer dort ergänzt, mit zehn Tagen Widerspruchsfrist. Zugänge außerhalb der EU können Abschnitt 11 der Datenschutzerklärung berühren.',
    quelle: 'https://www.hostinger.com/legal/dpa, Anhang 3',
  },
];

/** Normiert auf UTC-Tagesbeginn, damit Zeitzonen keine Off-by-one erzeugen. */
function tagesbeginn(iso: string): number {
  return new Date(`${iso}T00:00:00Z`).getTime();
}

/**
 * Nächstes Vorkommen. Einmaltermine liefern ihr Datum unverändert zurück —
 * auch wenn es lange vorbei ist.
 *
 * Der Monatswechsel wird bewusst NICHT über `setUTCMonth` auf dem Datum selbst
 * gemacht: bei Tagen > 28 rechnet JavaScript still in den Folgemonat über
 * (30.01. + 1 Monat = 02.03.), und der Termin driftet danach dauerhaft. Statt-
 * dessen wird Jahr/Monat separat fortgezählt und der Tag auf das Monatsende
 * gekappt. Ein am 30. verankerter Monatstermin fällt im Februar also auf den
 * 28. bzw. 29. und im Folgemonat wieder auf den 30.
 */
export function naechstesVorkommen(termin: Termin, heuteIso: string): string {
  if (!termin.wiederholungMonate) return termin.datum;

  const start = new Date(`${termin.datum}T00:00:00Z`);
  const ankerTag = start.getUTCDate();
  const heute = tagesbeginn(heuteIso);

  let jahr = start.getUTCFullYear();
  let monat = start.getUTCMonth();

  const bauen = (): { iso: string; zeit: number } => {
    const letzterTag = new Date(Date.UTC(jahr, monat + 1, 0)).getUTCDate();
    const tag = Math.min(ankerTag, letzterTag);
    const d = new Date(Date.UTC(jahr, monat, tag));
    return { iso: d.toISOString().slice(0, 10), zeit: d.getTime() };
  };

  let aktuell = bauen();
  let schutz = 0;
  while (aktuell.zeit < heute && schutz < 600) {
    monat += termin.wiederholungMonate;
    jahr += Math.floor(monat / 12);
    monat = ((monat % 12) + 12) % 12;
    aktuell = bauen();
    schutz++;
  }
  return aktuell.iso;
}

export interface Terminlage {
  ueberfaellig: { termin: Termin; datum: string; tage: number }[];
  faellig: { termin: Termin; datum: string; tage: number }[];
}

/**
 * `ueberfaellig`: Datum liegt vor heute (nur Einmaltermine können das erreichen).
 * `faellig`:      Datum liegt innerhalb des Vorlauffensters.
 * Alles Weitere wird bewusst nicht gemeldet — die Mail soll kurz bleiben.
 */
export function getTerminlage(heuteIso: string): Terminlage {
  const heute = tagesbeginn(heuteIso);
  const ueberfaellig: Terminlage['ueberfaellig'] = [];
  const faellig: Terminlage['faellig'] = [];

  for (const termin of TERMINE) {
    const datum = naechstesVorkommen(termin, heuteIso);
    const tage = Math.round((tagesbeginn(datum) - heute) / 86400000);
    if (tage < 0) ueberfaellig.push({ termin, datum, tage });
    else if (tage <= termin.vorlaufTage) faellig.push({ termin, datum, tage });
  }

  ueberfaellig.sort((a, b) => a.tage - b.tage);
  faellig.sort((a, b) => a.tage - b.tage);
  return { ueberfaellig, faellig };
}
