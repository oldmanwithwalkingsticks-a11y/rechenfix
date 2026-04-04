// --- Modus 1: Urlaubsanspruch ---

export interface UrlaubsanspruchEingabe {
  vertraglicheTage: number;
  arbeitstageProWoche: 5 | 6;
  beschaeftigungsBeginn: string | null; // YYYY-MM-DD, null = volles Jahr
  beschaeftigungsEnde: string | null;   // YYYY-MM-DD, null = Jahresende
  teilzeit: boolean;
  teilzeitTage: number; // Arbeitstage pro Woche bei Teilzeit
  schwerbehindert: boolean;
}

export interface UrlaubsanspruchErgebnis {
  vertraglich: number;
  anteiligMonate: number | null;
  anteiligTage: number | null;
  teilzeitFaktor: number | null;
  teilzeitTage: number | null;
  schwerbehindertTage: number;
  gesamt: number;
  gesetzlichMinimum: number;
  ueberMinimum: number;
  wochen: number;
  aufschluesselung: { label: string; wert: string }[];
}

function volleMonate(von: Date, bis: Date): number {
  let monate = (bis.getFullYear() - von.getFullYear()) * 12 + (bis.getMonth() - von.getMonth());
  // Nur volle Monate zählen (§5 BUrlG)
  if (bis.getDate() < von.getDate()) monate--;
  return Math.max(0, Math.min(12, monate + 1));
}

export function berechneUrlaubsanspruch(e: UrlaubsanspruchEingabe): UrlaubsanspruchErgebnis | null {
  if (e.vertraglicheTage <= 0 || e.arbeitstageProWoche < 1) return null;

  const aufschluesselung: { label: string; wert: string }[] = [];
  let basis = e.vertraglicheTage;

  aufschluesselung.push({ label: 'Vertraglicher Anspruch', wert: `${basis} Tage` });

  // Gesetzliches Minimum
  const gesetzlichMinimum = e.arbeitstageProWoche === 6 ? 24 : 20;

  // Schwerbehinderung: +5 Tage (auf Basis Vollzeit-Tage)
  const schwerbehindertTage = e.schwerbehindert ? 5 : 0;
  if (e.schwerbehindert) {
    basis += schwerbehindertTage;
    aufschluesselung.push({ label: 'Zusatzurlaub Schwerbehinderung', wert: '+5 Tage' });
  }

  // Teilzeit-Umrechnung
  let teilzeitFaktor: number | null = null;
  let teilzeitTage: number | null = null;
  if (e.teilzeit && e.teilzeitTage > 0 && e.teilzeitTage < e.arbeitstageProWoche) {
    teilzeitFaktor = e.teilzeitTage / e.arbeitstageProWoche;
    basis = Math.round(basis * teilzeitFaktor * 10) / 10;
    teilzeitTage = basis;
    aufschluesselung.push({
      label: `Teilzeit-Umrechnung (${e.teilzeitTage}/${e.arbeitstageProWoche} Tage)`,
      wert: `${basis} Tage`,
    });
  }

  // Anteilig bei unterjähriger Beschäftigung
  let anteiligMonate: number | null = null;
  let anteiligTage: number | null = null;
  const jahr = new Date().getFullYear();

  if (e.beschaeftigungsBeginn || e.beschaeftigungsEnde) {
    const von = e.beschaeftigungsBeginn ? new Date(e.beschaeftigungsBeginn) : new Date(jahr, 0, 1);
    const bis = e.beschaeftigungsEnde ? new Date(e.beschaeftigungsEnde) : new Date(jahr, 11, 31);

    if (von > bis) return null;

    anteiligMonate = volleMonate(von, bis);
    anteiligTage = Math.round((basis / 12) * anteiligMonate * 10) / 10;
    basis = anteiligTage;

    aufschluesselung.push({
      label: `Anteilig (${anteiligMonate} volle Monate)`,
      wert: `${basis} Tage`,
    });
  }

  const gesamt = Math.round(basis * 2) / 2; // Auf halbe Tage runden
  const ueberMinimum = Math.round((gesamt - (e.teilzeit && teilzeitFaktor
    ? gesetzlichMinimum * teilzeitFaktor
    : gesetzlichMinimum)) * 10) / 10;
  const wochen = Math.round((gesamt / (e.teilzeit && e.teilzeitTage > 0 ? e.teilzeitTage : e.arbeitstageProWoche)) * 10) / 10;

  aufschluesselung.push({ label: 'Urlaubsanspruch gesamt', wert: `${gesamt} Tage` });

  return {
    vertraglich: e.vertraglicheTage,
    anteiligMonate,
    anteiligTage,
    teilzeitFaktor,
    teilzeitTage,
    schwerbehindertTage,
    gesamt,
    gesetzlichMinimum,
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

  const datum = new Date(e.kuendigungsDatum);
  if (isNaN(datum.getTime())) return null;

  const monat = datum.getMonth(); // 0-11
  const ersteJahreshaelfte = monat < 6; // Jan-Jun
  const aufschluesselung: { label: string; wert: string }[] = [];

  let anspruch: number;
  let vollerAnspruch: boolean;

  if (ersteJahreshaelfte) {
    // Anteilig: volle Monate / 12
    const monate = monat + 1;
    anspruch = Math.round((e.urlaubstageProJahr / 12) * monate * 10) / 10;
    anspruch = Math.round(anspruch * 2) / 2; // halbe Tage
    vollerAnspruch = false;
    aufschluesselung.push({ label: 'Jahresurlaub', wert: `${e.urlaubstageProJahr} Tage` });
    aufschluesselung.push({ label: `Anteilig (${monate} Monate)`, wert: `${anspruch} Tage` });
  } else {
    // Voller Anspruch
    anspruch = e.urlaubstageProJahr;
    vollerAnspruch = true;
    aufschluesselung.push({ label: 'Jahresurlaub (voller Anspruch)', wert: `${anspruch} Tage` });
  }

  aufschluesselung.push({ label: 'Bereits genommen', wert: `−${e.bereitsGenommen} Tage` });

  const resturlaub = Math.max(0, anspruch - e.bereitsGenommen);
  aufschluesselung.push({ label: 'Resturlaub', wert: `${resturlaub} Tage` });

  let hinweis: string;
  if (resturlaub > 0) {
    hinweis = `Sie haben Anspruch auf ${resturlaub} Resturlaubstage. Können diese nicht mehr genommen werden, steht Ihnen eine Urlaubsabgeltung in Geld zu (§ 7 Abs. 4 BUrlG).`;
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
