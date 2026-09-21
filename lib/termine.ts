/**
 * Termin-SSOT für Karstens eigene Seiten.
 *
 * Seit 17.09.2026 nicht mehr nur für rechenfix.de: Das Feld `projekt`
 * kennzeichnet Einträge, die eine andere Domain betreffen. Der Versand bleibt
 * unverändert der rechenfix-Cron — WürdeZeit hat keinen eigenen, und ein
 * zweiter Mailweg wäre eine zweite Stelle, die unbemerkt ausfallen kann.
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

/** Welche Seite der Termin betrifft. Fehlt das Feld, ist rechenfix.de gemeint. */
export type Terminprojekt = 'rechenfix.de' | 'wuerdezeit.de';

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
  /** Betroffene Seite. Fehlt = rechenfix.de. */
  projekt?: Terminprojekt;
  /** Die konkrete Handlung — nicht das Thema, sondern was zu tun ist. */
  was: string;
  /** Wo das Verfahren beschrieben steht. */
  quelle?: string;
}

export const TERMINE: Termin[] = [
  {
    id: 'wz-freigabe',
    titel: 'WürdeZeit: Freigabe der Seite',
    datum: '2026-10-15',
    vorlaufTage: 14,
    bereich: 'Betrieb',
    projekt: 'wuerdezeit.de',
    was: 'Erst wenn alles fertig ist — so von Karsten am 17.09.2026 entschieden. Dann: SEITE_PASSWORT in Vercel entfernen, SEITE_OEFFENTLICH=ja setzen, neu ausliefern, Sitemap in der Search Console einreichen. Danach im Registry-Eintrag von Susanne den Block zugangsschutz streichen und einen site-scan.py-Erstlauf sowie die Browserprüfung nachholen. Datum ist ein Platzhalter und wird verschoben, nicht stillschweigend überrollt.',
    quelle: 'assets/websites.json (Susanne), Eintrag www.wuerdezeit.de',
  },
  {
    id: 'wz-formular-loeschlauf',
    titel: 'WürdeZeit: Nachrichten aus dem Kontaktformular löschen',
    datum: '2026-10-20',
    vorlaufTage: 3,
    wiederholungMonate: 1,
    bereich: 'Recht',
    projekt: 'wuerdezeit.de',
    was: 'Ordner „Formular“ im Postfach info@wuerdezeit.de öffnen und zwei Sorten löschen: erledigte Anliegen, und Nachrichten OHNE Antwortadresse, die älter als drei Monate sind. Beides steht so in Abschnitt 9 der Datenschutzerklärung und ist damit eine Zusage an den Absender, keine Absichtserklärung. MONATLICH und nicht quartalsweise, weil die Zusage drei Monate lautet: Bei einem Quartalsrhythmus käme eine Nachricht, die einen Tag nach dem Termin eingeht, erst beim übernächsten Lauf dran — nach bis zu sechs Monaten. Die zugesagte Frist und der Rhythmus, der sie einhält, sind zwei verschiedene Zahlen, und die zweite muss kleiner sein. Der Lauf dauert eine halbe Minute, solange die Postfachregel greift; greift sie nicht mehr, ist DAS der eigentliche Befund und nicht die Arbeit.',
    quelle: 'app/datenschutz/page.tsx (WürdeZeit), Abschnitt 9; docs/kontaktformular/spezifikation.md Abschnitt 5',
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
    titel: 'bundle.social Kontingent sichten',
    datum: '2026-09-25',
    vorlaufTage: 2,
    wiederholungMonate: 1,
    bereich: 'Betrieb',
    was: 'Kontingent des Gratistarifs (20 Posts/Monat) gegen Monatsende sichten. Der Zähler springt zum Monatsersten auf null — abgeleitet am 06.09.2026 aus dem Stand 3 von 20 bei drei Beiträgen mit September-Datum, aus einer einzigen Beobachtung, am 01.10.2026 zu bestätigen. Im Zwei-Tage-Takt fallen höchstens 16 Beiträge im Monat an; das Kontingent ist dann nicht auszuschöpfen. Der Termin greift erst bei dichterem Takt oder wenn weitere Plattformen über bundle.social laufen.',
    quelle: 'docs/social-pipeline.md',
  },
  {
    id: 'anthropic-egress-allowlist',
    titel: 'Egress-Allowlist: besteht die Sperre noch?',
    datum: '2026-10-12',
    vorlaufTage: 3,
    wiederholungMonate: 1,
    bereich: 'Betrieb',
    was: 'Am 11.09.2026 gemeldet: Das Eintragen von sechs Domains mit www.-Praefix in die Allowlist hat den Netzzugang der geplanten Laeufe gekappt, auch fuer Hosts, die vorher trugen. Eintraege entfernt, Zugang wieder da. ANTWORT LIEGT VOR (16.09.2026, Conversation ID 215475901888167): bestaetigter Fehler, die Behebung muss von Anthropic kommen, es gibt ausdruecklich keinen Workaround auf Betreiberseite, eine Frist wird nicht zugesagt, der Vorgang ist vorlaeufig geschlossen mit der Bitte, sich zu melden, falls es weiter auftritt. Deshalb ist dies KEIN Nachfasstermin mehr, sondern eine monatliche Nachschau: Zeigt Susannes Tagesmeldung weiterhin CONNECT 403 fuer www.wuerdezeit.de, eur-lex.europa.eu, edpb.europa.eu oder ldi.nrw.de, besteht die Sperre fort — dann unter Bezug auf die Conversation ID erneut melden, mit Datum und Hostliste aus der Tagesmeldung. VORSICHT beim Gegentest: Erneut Domains einzutragen ist genau die Handlung, die am 11.09. alle Laeufe gekappt hat. Wer es probiert, tut es an einem Tag, an dem ein ausgefallener Lauf verschmerzbar ist, und entfernt die Eintraege sofort wieder. Was die Sperre kostet: Die Dienste-Wache erreicht wuerdezeit.de gar nicht, und vier von Susannes Primaerquellen bleiben ungeprueft, darunter die Aufsichtsbehoerde LDI NRW, die in beiden Datenschutzerklaerungen als zustaendig benannt ist. Nicht betroffen sind Aufgaben, die aus einer Chat-Sitzung laufen: Von dort ist www.wuerdezeit.de erreichbar (gemessen 18.09.2026: HTTP 401). Der site-scan.py-Erstlauf und die Browserpruefung nach dem Oeffentlichmachen sind deshalb NICHT blockiert — sie laufen aus einer Sitzung, nicht aus dem Container.',
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
    id: 'zeitumstellung-cron-laufzeiten',
    titel: 'Zeitumstellung: Laufzeiten der drei geplanten Aufgaben prüfen',
    datum: '2026-10-25',
    vorlaufTage: 7,
    bereich: 'Betrieb',
    was: 'Die geplanten Aufgaben laufen nach UTC-Cron: Peter 0 5 * * *, Susanne 0 6 * * *, Berichtswache 0 7 * * *. Bis zur Umstellung sind das 07:00, 08:00 und 09:00 Berliner Zeit, danach 06:00, 07:00 und 08:00. Die Reihenfolge und die Abstände bleiben; nur der ganze Block rutscht eine Stunde nach vorn. Zu entscheiden ist allein, ob die Uhrzeiten so bleiben sollen. Sollen sie es nicht, sind die drei Cron-Ausdrücke auf 0 6, 0 7 und 0 8 zu setzen.',
    quelle: 'Routinen unter claude.ai/code/routines — Peter Ai, Susanne Recht, Berichtswache',
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
    datum: '2026-09-24',
    vorlaufTage: 7,
    wiederholungMonate: 3,
    bereich: 'Recht',
    was: 'Nachsehen, ob der Angemessenheitsbeschluss der EU-Kommission vom 10.07.2023 zum EU-US Data Privacy Framework noch in Kraft ist. Anlass: Der US Supreme Court hat am 29.06.2026 in Trump v. Slaughter die Unabhängigkeit der FTC verneint; der EDSA hat die Kommission am 31.07.2026 zur Prüfung der Folgen aufgefordert. Fällt der Beschluss, müssen die Abschnitte 5, 6 und 11 der Datenschutzerklärung noch am selben Tag auf Art. 46 Abs. 2 lit. c DSGVO umgestellt werden — die Standardvertragsklauseln liegen bei Vercel, Hostinger und Plus Five Five, Inc. (Resend) vertraglich bereits vor. Zusätzlich bei jedem Durchlauf den Listenstatus der beiden US-Unterauftragnehmer von Hostinger prüfen: Cloudflare, Inc. ist am 23.09.2026 zur Erneuerung fällig, Proofpoint, Inc. stand am 04.09.2026 auf Active mit dem Unterstatus Re-certification under Review, nächste Fälligkeit 24.04.2027. Ebenso den Listenstatus von Plus Five Five, Inc. (Resend, Teilnehmer Nr. 8907) prüfen: am 11.09.2026 Active mit dem Unterstatus Re-certification under Review, nächste Fälligkeit 03.03.2027. Deshalb liegt der erste Durchlauf auf dem 24.09.2026 und nicht im Dezember.',
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
