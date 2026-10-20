import { rundeBuRlGKonform } from './_helpers';

// --- Modus 1: Urlaubsanspruch ---
//
// W179: Teilurlaub nur in den Fällen des § 5 Abs. 1 BUrlG. Vorher wurde bei jedem Ein- oder Austritt
// gezwölftelt, auch wenn die sechsmonatige Wartezeit (§ 4 BUrlG) im Eintrittsjahr endet und damit der
// volle Jahresurlaub entsteht (Eintritt 01.04.: 30 × 3/5 = 18 Tage, nicht 14). Volle Monate werden
// jetzt nach §§ 187, 188 BGB gezählt (Eintritt 15.04. bis 31.12. = 8, nicht 9 Monate), der
// Schwerbehinderten-Zusatzurlaub richtet sich nach den Arbeitstagen pro Woche (§ 208 SGB IX), und
// Bruchteile unter einem halben Tag bleiben stehen (BAG, 23.01.2018, 9 AZR 200/17).

export interface UrlaubsanspruchEingabe {
  vertraglicheTage: number;
  arbeitstageProWoche: 5 | 6;
  beschaeftigungsBeginn: string | null; // YYYY-MM-DD, null = vor dem Rechenjahr
  beschaeftigungsEnde: string | null;   // YYYY-MM-DD, null = über das Rechenjahr hinaus
  teilzeit: boolean;
  teilzeitTage: number; // Arbeitstage pro Woche bei Teilzeit
  schwerbehindert: boolean;
  /**
   * Arbeitsvertrag kürzt den vertraglichen Mehrurlaub bei Ein- oder Austritt anteilig
   * (Zwölftelungsklausel). Ohne Klausel folgt der Mehrurlaub den gesetzlichen Regeln.
   */
  zwoelftelungMehrurlaub?: boolean;
}

export interface UrlaubsanspruchErgebnis {
  vertraglich: number;
  /** Kalenderjahr, für das gerechnet wird */
  rechenjahr: number;
  /** true = Teilurlaub nach § 5 Abs. 1 BUrlG */
  teilurlaub: boolean;
  /** Grund für Teilurlaub oder vollen Anspruch (Kurztext) */
  regel: string;
  anteiligMonate: number | null;
  anteiligTage: number | null;
  teilzeitFaktor: number | null;
  teilzeitTage: number | null;
  schwerbehindertTage: number;
  gesamt: number;
  /** gesetzlicher Mindestanspruch für denselben Zeitraum (BUrlG, ggf. + § 208 SGB IX) */
  gesetzlichMinimum: number;
  /** vertragliche Tage (umgerechnet) liegen unter dem gesetzlichen Mindesturlaub; es gilt dieser (§ 13 BUrlG) */
  vertragUnterMinimum: boolean;
  ueberMinimum: number;
  wochen: number;
  aufschluesselung: { label: string; wert: string }[];
}

/** 'YYYY-MM-DD' als lokales Datum (ohne UTC-Verschiebung). */
function parseDatum(s: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return isNaN(d.getTime()) ? null : d;
}

/**
 * Letzter Tag einer Frist von n Monaten, die am Tag `beginn` beginnt (§ 187 Abs. 2, § 188 Abs. 2
 * und 3 BGB): der Tag vor dem gleichnamigen Tag n Monate später; fehlt dieser Tag, der Monatsletzte.
 */
export function fristEnde(beginn: Date, n: number): Date {
  const y = beginn.getFullYear();
  const m = beginn.getMonth() + n;
  const d = beginn.getDate();
  const tageImZielmonat = new Date(y, m + 1, 0).getDate();
  return d <= tageImZielmonat ? new Date(y, m, d - 1) : new Date(y, m + 1, 0);
}

/** Volle Monate des Arbeitsverhältnisses zwischen von und bis (je einschließlich), höchstens 12. */
export function volleMonate(von: Date, bis: Date): number {
  let n = 0;
  while (n < 12 && fristEnde(von, n + 1) <= bis) n++;
  return n;
}

const tage = (n: number) => `${n.toLocaleString('de-DE', { maximumFractionDigits: 2 })} Tage`;

export function berechneUrlaubsanspruch(e: UrlaubsanspruchEingabe): UrlaubsanspruchErgebnis | null {
  if (e.vertraglicheTage <= 0 || e.arbeitstageProWoche < 1) return null;

  const beginn = e.beschaeftigungsBeginn ? parseDatum(e.beschaeftigungsBeginn) : null;
  const ende = e.beschaeftigungsEnde ? parseDatum(e.beschaeftigungsEnde) : null;
  if ((e.beschaeftigungsBeginn && !beginn) || (e.beschaeftigungsEnde && !ende)) return null;
  if (beginn && ende && beginn > ende) return null;

  const aufschluesselung: { label: string; wert: string }[] = [];

  // Arbeitstage pro Woche der Person und Umrechnungsfaktor (Teilzeit)
  const istTeilzeit = e.teilzeit && e.teilzeitTage > 0 && e.teilzeitTage < e.arbeitstageProWoche;
  const tageProWoche = istTeilzeit ? e.teilzeitTage : e.arbeitstageProWoche;
  const teilzeitFaktor = istTeilzeit ? e.teilzeitTage / e.arbeitstageProWoche : null;

  // Jahresansprüche bei ganzjähriger Beschäftigung
  const gesetzlichJahr = 24 * tageProWoche / 6;                 // § 3 BUrlG: 24 Werktage
  const vertraglichUmgerechnet = e.vertraglicheTage * tageProWoche / e.arbeitstageProWoche;
  const vertragUnterMinimum = vertraglichUmgerechnet < gesetzlichJahr;
  const vertraglichJahr = Math.max(vertraglichUmgerechnet, gesetzlichJahr);
  const schwerbehindertTage = e.schwerbehindert ? tageProWoche : 0; // § 208 SGB IX: eine Arbeitswoche

  aufschluesselung.push({ label: 'Vertraglicher Anspruch', wert: tage(e.vertraglicheTage) });
  if (teilzeitFaktor !== null) {
    aufschluesselung.push({
      // W184: vorher roh („2.5/5 Tage“), jetzt de-DE
      label: `Teilzeit-Umrechnung (${e.teilzeitTage.toLocaleString('de-DE', { maximumFractionDigits: 2 })}/${e.arbeitstageProWoche.toLocaleString('de-DE', { maximumFractionDigits: 2 })} Tage)`,
      wert: tage(Math.round(vertraglichJahr * 100) / 100),
    });
  }
  if (e.schwerbehindert) {
    aufschluesselung.push({ label: 'Zusatzurlaub Schwerbehinderung (§ 208 SGB IX)', wert: `+${tage(schwerbehindertTage)}` });
  }

  // Rechenjahr: Austrittsjahr, sonst Eintrittsjahr, sonst laufendes Jahr
  const rechenjahr = ende ? ende.getFullYear() : beginn ? beginn.getFullYear() : new Date().getFullYear();
  const jahresAnfang = new Date(rechenjahr, 0, 1);
  const jahresEnde = new Date(rechenjahr, 11, 31);
  const von = beginn && beginn > jahresAnfang ? beginn : jahresAnfang;
  const bis = ende && ende < jahresEnde ? ende : jahresEnde;
  if (beginn && beginn > jahresEnde) return null;

  // Voller Urlaub entsteht erst NACH sechsmonatigem Bestehen (§ 4 BUrlG; BAG, 17.11.2015, 9 AZR 179/15):
  // am Tag nach Ablauf der Wartezeit. Ohne Eintrittsdatum gilt die Wartezeit als erfüllt.
  const wartezeitEnde = beginn ? fristEnde(beginn, 6) : null;
  const vollAb = wartezeitEnde
    ? new Date(wartezeitEnde.getFullYear(), wartezeitEnde.getMonth(), wartezeitEnde.getDate() + 1)
    : null;
  const eintrittImJahr = !!beginn && beginn >= jahresAnfang;
  const austrittImJahr = !!ende && ende <= jahresEnde;

  let teilurlaub = false;
  let regel = 'Voller Jahresurlaub (Beschäftigung im ganzen Jahr)';
  if (eintrittImJahr && vollAb! > jahresEnde) {
    teilurlaub = true; // § 5 Abs. 1 a
    regel = 'Teilurlaub: Wartezeit endet erst im Folgejahr (Eintritt ab 1. Juli, § 5 Abs. 1 a BUrlG)';
  } else if (austrittImJahr && vollAb && ende! < vollAb) {
    teilurlaub = true; // § 5 Abs. 1 b
    regel = 'Teilurlaub: Austritt vor erfüllter Wartezeit (§ 5 Abs. 1 b BUrlG)';
  } else if (austrittImJahr && ende!.getMonth() < 6) {
    teilurlaub = true; // § 5 Abs. 1 c
    regel = 'Teilurlaub: Austritt in der ersten Jahreshälfte (§ 5 Abs. 1 c BUrlG)';
  } else if (eintrittImJahr || austrittImJahr) {
    regel = eintrittImJahr
      ? 'Voller Jahresurlaub: Wartezeit endet im Eintrittsjahr (§ 4 BUrlG)'
      : 'Voller Jahresurlaub: Austritt in der zweiten Jahreshälfte nach erfüllter Wartezeit';
  }

  const monate = (eintrittImJahr || austrittImJahr) ? volleMonate(von, bis) : 12;
  const jahrGesamt = vertraglichJahr + schwerbehindertTage;
  const gesetzlichGesamtJahr = gesetzlichJahr + schwerbehindertTage;

  let basis: number;
  let gesetzlich: number;
  let anteiligMonate: number | null = null;
  let anteiligTage: number | null = null;
  if (teilurlaub) {
    anteiligMonate = monate;
    basis = jahrGesamt * monate / 12;
    gesetzlich = gesetzlichGesamtJahr * monate / 12;
    anteiligTage = Math.round(basis * 100) / 100;
    aufschluesselung.push({ label: `Anteilig (${monate} volle Monate in ${rechenjahr})`, wert: tage(anteiligTage) });
  } else if (e.zwoelftelungMehrurlaub && (eintrittImJahr || austrittImJahr) && monate < 12) {
    // Voller gesetzlicher Urlaub, vertraglicher Mehrurlaub laut Vertrag anteilig
    anteiligMonate = monate;
    const mehr = (vertraglichJahr - gesetzlichJahr) * monate / 12;
    basis = gesetzlichGesamtJahr + mehr;
    gesetzlich = gesetzlichGesamtJahr;
    anteiligTage = Math.round(basis * 100) / 100;
    aufschluesselung.push({ label: `Mehrurlaub anteilig laut Vertrag (${monate} volle Monate)`, wert: tage(Math.round(mehr * 100) / 100) });
  } else {
    basis = jahrGesamt;
    gesetzlich = gesetzlichGesamtJahr;
  }

  // § 5 Abs. 2 BUrlG: Bruchteile ab einem halben Tag aufrunden; kleinere bleiben stehen.
  const gesamt = rundeBuRlGKonform(basis);
  const gesetzlichMinimum = rundeBuRlGKonform(gesetzlich);
  const ueberMinimum = Math.round((gesamt - gesetzlichMinimum) * 100) / 100;
  const wochen = Math.round((gesamt / tageProWoche) * 10) / 10;

  aufschluesselung.push({ label: 'Urlaubsanspruch gesamt', wert: tage(gesamt) });

  return {
    vertraglich: e.vertraglicheTage,
    rechenjahr,
    teilurlaub,
    regel,
    anteiligMonate,
    anteiligTage,
    teilzeitFaktor,
    teilzeitTage: teilzeitFaktor !== null ? Math.round(vertraglichJahr * 100) / 100 : null,
    schwerbehindertTage,
    gesamt,
    gesetzlichMinimum,
    vertragUnterMinimum,
    ueberMinimum,
    wochen,
    aufschluesselung,
  };
}

// --- Modus 2: Resturlaub bei Kündigung ---

export interface ResturlaubEingabe {
  urlaubstageProJahr: number;
  arbeitstageProWoche: 5 | 6;
  kuendigungsDatum: string; // YYYY-MM-DD
  bereitsGenommen: number;
}

export interface ResturlaubErgebnis {
  anspruchBisKuendigung: number;
  bereitsGenommen: number;
  resturlaub: number;
  ersteJahreshaelfte: boolean;
  vollerAnspruch: boolean;
  hinweis: string;
  aufschluesselung: { label: string; wert: string }[];
}

export function berechneResturlaub(e: ResturlaubEingabe): ResturlaubErgebnis | null {
  if (e.urlaubstageProJahr <= 0 || !e.kuendigungsDatum) return null;

  // kuendigungsDatum = letzter Tag des Arbeitsverhältnisses (Austritt), nicht der Tag der Kündigung.
  const datum = parseDatum(e.kuendigungsDatum);
  if (!datum) return null;

  const monat = datum.getMonth(); // 0-11
  const ersteJahreshaelfte = monat < 6; // Austritt bis 30.06.
  const aufschluesselung: { label: string; wert: string }[] = [];

  let anspruch: number;
  let vollerAnspruch: boolean;

  if (ersteJahreshaelfte) {
    // § 5 Abs. 1 c BUrlG: ein Zwölftel je vollem Beschäftigungsmonat im Austrittsjahr.
    // W179: vorher zählte der angefangene Austrittsmonat mit (Austritt 15.03. → 3 statt 2 Monate).
    const monate = volleMonate(new Date(datum.getFullYear(), 0, 1), datum);
    anspruch = rundeBuRlGKonform((e.urlaubstageProJahr / 12) * monate); // § 5 Abs. 2 BUrlG
    vollerAnspruch = false;
    aufschluesselung.push({ label: 'Jahresurlaub', wert: tage(e.urlaubstageProJahr) });
    aufschluesselung.push({ label: `Anteilig (${monate} volle Monate)`, wert: tage(anspruch) });
  } else {
    // Voller Anspruch
    anspruch = e.urlaubstageProJahr;
    vollerAnspruch = true;
    aufschluesselung.push({ label: 'Jahresurlaub (voller Anspruch)', wert: tage(anspruch) }); // W184: vorher `${anspruch} Tage` roh („27.5 Tage“)
  }

  aufschluesselung.push({ label: 'Bereits genommen', wert: `−${tage(e.bereitsGenommen)}` });

  const resturlaub = Math.max(0, Math.round((anspruch - e.bereitsGenommen) * 100) / 100);
  aufschluesselung.push({ label: 'Resturlaub', wert: tage(resturlaub) });

  let hinweis: string;
  if (resturlaub > 0) {
    hinweis = `Sie haben Anspruch auf ${resturlaub.toLocaleString('de-DE')} Resturlaubstage. Können diese nicht mehr genommen werden, steht Ihnen eine Urlaubsabgeltung in Geld zu (§ 7 Abs. 4 BUrlG).`;
  } else {
    hinweis = 'Sie haben keinen Resturlaubsanspruch — der Urlaub wurde bereits vollständig genommen oder überschritten.';
  }

  return {
    anspruchBisKuendigung: anspruch,
    bereitsGenommen: e.bereitsGenommen,
    resturlaub,
    ersteJahreshaelfte,
    vollerAnspruch,
    hinweis,
    aufschluesselung,
  };
}
