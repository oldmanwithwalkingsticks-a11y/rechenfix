'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Opt-in-Speicherung auf dem Endgerät (W R3).
 *
 * RECHTLICHER HINTERGRUND — bitte vor Änderungen lesen:
 *
 * § 25 TDDDG fragt nach dem Zugriff auf das Endgerät des Besuchers, und zwar
 * unabhängig davon, ob personenbezogene Daten verarbeitet werden und ob die Daten
 * das Gerät jemals verlassen. Ein Verlauf, der rein lokal bleibt, ist deshalb NICHT
 * automatisch unbedenklich. § 25 kennt kein berechtigtes Interesse: Entweder greift
 * die Ausnahme nach Absatz 2, oder es braucht eine Einwilligung.
 *
 * Die Trennlinie, nach der hier gearbeitet wird:
 *   vom Nutzer selbst eingeschaltet  → einwilligungsfrei (§ 25 Abs. 2 Nr. 2)
 *   automatisch angelegt             → einwilligungspflichtig
 *
 * Ein Komfortverlauf ist für die angeforderte Berechnung nicht „unbedingt
 * erforderlich" — die Rechner funktionieren ohne ihn vollständig. Deshalb schreibt
 * dieser Hook im Ausgangszustand NICHTS. Erst der ausdrückliche Schalter macht die
 * Speicherung zu dem Dienst, den der Nutzer gewünscht hat; dann trägt die Ausnahme.
 *
 * Vorbild und Schwesterfall ist `components/pwa/OfflineSchalter.tsx`. Beide Fälle
 * sind bewusst gleich gebaut, damit sie im Rechtstext gleich behandelt werden können
 * (Datenschutzerklärung, Abschnitt 7a).
 *
 * DREI EIGENSCHAFTEN, DIE NICHT WEGOPTIMIERT WERDEN DÜRFEN:
 *
 * 1. Standardzustand aus. Ohne Zutun des Nutzers wird nicht geschrieben.
 * 2. Ausschalten löscht die bereits abgelegten Daten, nicht nur das Kennzeichen.
 *    Ein Widerruf, der die Daten stehen lässt, ist keiner.
 * 3. Altbestände ohne Einwilligungskennzeichen werden beim ersten Laden gelöscht.
 *    Diese Daten sind ohne Einwilligung entstanden; sie werden nicht dadurch
 *    legitimiert, dass es jetzt eine Einwilligungsmechanik gibt.
 *
 * Wer einen weiteren Rechner mit Verlauf ausstattet, benutzt diesen Hook — nicht
 * `localStorage` direkt. Sonst kehrt der automatische Schreiber über die Hintertür
 * zurück (Befund der Welle R2).
 */

export interface OptInSpeicher<T> {
  /** Hat der Nutzer die Speicherung eingeschaltet? */
  aktiv: boolean;
  /**
   * Erst nach dem ersten Lesen im Browser `true`. Vorher darf die Oberfläche den
   * Schalterzustand nicht anzeigen, sonst entsteht ein Hydration-Unterschied
   * zwischen Server-Auslieferung und Client.
   */
  bereit: boolean;
  /** Aktueller Wert — bei ausgeschalteter Speicherung nur im Arbeitsspeicher. */
  daten: T;
  /** Setzt den Wert. Geschrieben wird nur, wenn `aktiv`. */
  setzeDaten: (naechste: T | ((vorher: T) => T)) => void;
  /** Schaltet die Speicherung ein und sichert den aktuellen Stand. */
  einschalten: () => void;
  /** Schaltet ab, löscht Kennzeichen und Daten und leert die Anzeige. */
  ausschalten: () => void;
}

export function useOptInStorage<T>(optionen: {
  /** Schlüssel des Einwilligungskennzeichens, z. B. `rechenfix-verlauf-einwilligung`. */
  einwilligungsSchluessel: string;
  /** Schlüssel der eigentlichen Daten, z. B. `rechenfix_prozent_history`. */
  datenSchluessel: string;
  /** Wert im Ausgangszustand und nach dem Abschalten. */
  initialwert: T;
}): OptInSpeicher<T> {
  const { einwilligungsSchluessel, datenSchluessel, initialwert } = optionen;

  const [aktiv, setAktiv] = useState(false);
  const [bereit, setBereit] = useState(false);
  const [daten, setDaten] = useState<T>(initialwert);

  // Der Ausgangswert soll die Effekte nicht erneut auslösen, wenn der Aufrufer
  // ihn als Literal übergibt (neue Referenz bei jedem Rendern).
  const initialRef = useRef(initialwert);

  useEffect(() => {
    let eingewilligt = false;
    try {
      eingewilligt = window.localStorage.getItem(einwilligungsSchluessel) !== null;
    } catch {
      // Speicher nicht verfügbar (privater Modus, Richtlinie): wie „aus" behandeln.
    }

    if (eingewilligt) {
      try {
        const abgelegt = window.localStorage.getItem(datenSchluessel);
        if (abgelegt) setDaten(JSON.parse(abgelegt) as T);
      } catch {
        // Unlesbarer Bestand wird ignoriert; der Verlauf beginnt neu.
      }
      setAktiv(true);
    } else {
      // Altbestand ohne Einwilligung — siehe Eigenschaft 3 im Dateikopf.
      try {
        window.localStorage.removeItem(datenSchluessel);
      } catch {
        /* nichts zu tun */
      }
      setAktiv(false);
    }

    setBereit(true);
  }, [einwilligungsSchluessel, datenSchluessel]);

  const setzeDaten = useCallback(
    (naechste: T | ((vorher: T) => T)) => {
      setDaten((vorher) => {
        const wert =
          typeof naechste === 'function' ? (naechste as (v: T) => T)(vorher) : naechste;
        if (aktiv) {
          try {
            window.localStorage.setItem(datenSchluessel, JSON.stringify(wert));
          } catch {
            /* Speichern fehlgeschlagen — der Wert bleibt im Arbeitsspeicher. */
          }
        }
        return wert;
      });
    },
    [aktiv, datenSchluessel]
  );

  const einschalten = useCallback(() => {
    try {
      window.localStorage.setItem(einwilligungsSchluessel, new Date().toISOString());
      window.localStorage.setItem(datenSchluessel, JSON.stringify(daten));
    } catch {
      /* Ohne Speicher bleibt es beim Arbeitsspeicher. */
    }
    setAktiv(true);
  }, [einwilligungsSchluessel, datenSchluessel, daten]);

  const ausschalten = useCallback(() => {
    try {
      window.localStorage.removeItem(einwilligungsSchluessel);
      window.localStorage.removeItem(datenSchluessel);
    } catch {
      /* nichts zu tun */
    }
    setAktiv(false);
    // Auch die Anzeige wird geleert: Ein Widerruf, nach dem die Einträge
    // weiterlaufen, wäre für den Nutzer nicht nachvollziehbar.
    setDaten(initialRef.current);
  }, [einwilligungsSchluessel, datenSchluessel]);

  return { aktiv, bereit, daten, setzeDaten, einschalten, ausschalten };
}
