'use client';

import { useEffect } from 'react';

/**
 * Räumt den gegenstandslos gewordenen Einwilligungsspeicher des früheren
 * Consent-Banners auf (W R3.3).
 *
 * Mit dem Rückbau von AdSense (R2) und der Umstellung des Rechenverlaufs auf
 * Opt-in (R3.1) bleibt keine einwilligungspflichtige Verarbeitung übrig. Der
 * Banner ist deshalb entfallen. Sein Eintrag liegt aber weiterhin im Browser
 * aller Besucher, die ihn jemals bestätigt haben, und würde dort ohne dieses
 * Aufräumen jahrelang stehen bleiben — ein Datum, das niemand mehr braucht und
 * das keiner Funktion mehr zugeordnet ist.
 *
 * Das Entfernen ist von § 25 Abs. 2 Nr. 2 TDDDG gedeckt: Es greift zwar auf das
 * Endgerät zu, aber ausschließlich, um einen eigenen Altbestand zu löschen.
 *
 * ABBAUBAR: Diese Komponente hat nur so lange einen Zweck, wie noch Besucher mit
 * altem Eintrag wiederkommen. Ab etwa September 2027 kann sie ersatzlos
 * entfernt werden; dann ist auch das Verzeichnis `components/cookie/` leer und
 * kann mitgehen.
 */

const ALTER_EINWILLIGUNGSSCHLUESSEL = 'cookie-consent';

export default function EinwilligungsspeicherAufraeumen() {
  useEffect(() => {
    try {
      window.localStorage.removeItem(ALTER_EINWILLIGUNGSSCHLUESSEL);
    } catch {
      // Speicher nicht verfügbar — dann liegt dort auch nichts von uns.
    }
  }, []);

  return null;
}
