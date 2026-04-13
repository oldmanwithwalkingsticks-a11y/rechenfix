export type GeburtsArt = 'normal' | 'fruehgeburt' | 'mehrlingsgeburt' | 'behinderung';
export type Beschaeftigung = 'gesetzlich' | 'privat' | 'minijob' | 'selbststaendig';

export interface MutterschutzEingabe {
  geburtstermin: string; // ISO date
  geburtsArt: GeburtsArt;
  tatsaechlichesGeburtsdatum: string; // ISO date, leer = noch nicht geboren
  nettoGehalt: number;
  beschaeftigung: Beschaeftigung;
}

export interface MutterschutzErgebnis {
  beginn: Date;
  ende: Date;
  geburtstermin: Date;
  tatsaechlicheGeburt: Date | null;
  gesamtTage: number;
  gesamtWochen: number;
  tageVorGeburt: number;
  tageNachGeburt: number;
  verlaengerungTage: number; // Zusatztage bei Früh-/Spätgeburt
  // Mutterschaftsgeld
  kasseSatzTag: number;
  kasseMonat: number;
  agZuschussTag: number;
  agZuschussMonat: number;
  einkommenMonat: number;
  gesamtEinkommen: number;
  einmalzahlungPrivat: number;
  geldHinweis: string;
  // Termine
  meldeTermin: string;
  antragTermin: Date;
  elterngeldFrist: string;
}

function addDays(d: Date, days: number): Date {
  const r = new Date(d);
  r.setDate(r.getDate() + days);
  return r;
}

function diffDays(a: Date, b: Date): number {
  return Math.round((a.getTime() - b.getTime()) / 86400000);
}

function nachgeburtWochen(art: GeburtsArt): number {
  return art === 'normal' ? 8 : 12;
}

export function berechneMutterschutz(eingabe: MutterschutzEingabe): MutterschutzErgebnis | null {
  if (!eingabe.geburtstermin) return null;
  const et = new Date(eingabe.geburtstermin);
  if (isNaN(et.getTime())) return null;

  const hatTatsaechlich = !!eingabe.tatsaechlichesGeburtsdatum;
  const tatsaechlich = hatTatsaechlich ? new Date(eingabe.tatsaechlichesGeburtsdatum) : null;
  if (tatsaechlich && isNaN(tatsaechlich.getTime())) return null;

  const nachWochen = nachgeburtWochen(eingabe.geburtsArt);
  const nachTage = nachWochen * 7;

  let beginn: Date;
  let ende: Date;
  let tageVorGeburt: number;
  let tageNachGeburt: number;
  let verlaengerungTage = 0;

  if (tatsaechlich) {
    const geplanterBeginn = addDays(et, -42);

    if (tatsaechlich <= et) {
      // Kind kam VOR oder AM Termin
      beginn = geplanterBeginn;
      const nichtGenommeneTageVor = diffDays(et, tatsaechlich); // Tage die vor Geburt nicht genutzt

      if (eingabe.geburtsArt === 'fruehgeburt') {
        // Frühgeburt: nicht genommene Vortage werden nach Geburt angehängt + 12 Wochen
        verlaengerungTage = nichtGenommeneTageVor;
        ende = addDays(tatsaechlich, nachTage + verlaengerungTage);
      } else {
        ende = addDays(tatsaechlich, nachTage);
      }

      tageVorGeburt = diffDays(tatsaechlich, beginn);
      tageNachGeburt = diffDays(ende, tatsaechlich);
    } else {
      // Kind kam NACH dem Termin
      beginn = geplanterBeginn;
      ende = addDays(tatsaechlich, nachTage);
      tageVorGeburt = diffDays(tatsaechlich, beginn);
      tageNachGeburt = nachTage;
      verlaengerungTage = diffDays(tatsaechlich, et);
    }
  } else {
    // Noch nicht geboren → Berechnung nach ET
    beginn = addDays(et, -42);
    ende = addDays(et, nachTage);
    tageVorGeburt = 42;
    tageNachGeburt = nachTage;
  }

  const gesamtTage = diffDays(ende, beginn);
  const gesamtWochen = Math.round(gesamtTage / 7 * 10) / 10;

  // Mutterschaftsgeld
  const nettoTag = eingabe.nettoGehalt / 30;
  let kasseSatzTag = 0;
  let agZuschussTag = 0;
  let einkommenMonat = 0;
  let einmalzahlungPrivat = 0;
  let geldHinweis = '';

  switch (eingabe.beschaeftigung) {
    case 'gesetzlich':
      kasseSatzTag = Math.min(13, nettoTag);
      agZuschussTag = Math.max(0, Math.round((nettoTag - 13) * 100) / 100);
      einkommenMonat = eingabe.nettoGehalt;
      geldHinweis = 'Ihr volles Nettogehalt wird weitergezahlt: Krankenkasse + Arbeitgeberzuschuss.';
      break;
    case 'privat':
      einmalzahlungPrivat = 210;
      agZuschussTag = Math.round((nettoTag - (210 / gesamtTage)) * 100) / 100;
      kasseSatzTag = Math.round((210 / gesamtTage) * 100) / 100;
      einkommenMonat = eingabe.nettoGehalt;
      geldHinweis = 'Einmalig 210 € vom Bundesamt + Arbeitgeberzuschuss zum vollen Netto.';
      break;
    case 'minijob':
      kasseSatzTag = 13;
      agZuschussTag = 0;
      einkommenMonat = Math.round(kasseSatzTag * 30 * 100) / 100;
      geldHinweis = 'Max. 13 €/Tag von der Krankenkasse. Kein Arbeitgeberzuschuss bei Minijob.';
      break;
    case 'selbststaendig':
      kasseSatzTag = 0;
      agZuschussTag = 0;
      einkommenMonat = 0;
      geldHinweis = 'Kein Mutterschaftsgeld für Selbstständige — es sei denn, Sie sind freiwillig gesetzlich versichert mit Krankengeld-Wahltarif.';
      break;
  }

  const kasseMonat = Math.round(kasseSatzTag * 30 * 100) / 100;
  const agZuschussMonat = Math.round(agZuschussTag * 30 * 100) / 100;
  const gesamtEinkommen = Math.round(einkommenMonat * (gesamtTage / 30) * 100) / 100;

  // Termine
  const antragTermin = addDays(et, -49); // 7 Wochen vor ET

  return {
    beginn,
    ende,
    geburtstermin: et,
    tatsaechlicheGeburt: tatsaechlich,
    gesamtTage,
    gesamtWochen,
    tageVorGeburt,
    tageNachGeburt,
    verlaengerungTage,
    kasseSatzTag: Math.round(kasseSatzTag * 100) / 100,
    kasseMonat,
    agZuschussTag: Math.max(0, agZuschussTag),
    agZuschussMonat: Math.max(0, agZuschussMonat),
    einkommenMonat,
    gesamtEinkommen,
    einmalzahlungPrivat,
    geldHinweis,
    meldeTermin: 'Empfohlen: Sobald Sie die Schwangerschaft bestätigt haben',
    antragTermin,
    elterngeldFrist: 'Spätestens 3 Monate nach Geburt (rückwirkend)',
  };
}
