'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

/**
 * Darstellungsmodus (hell/dunkel).
 *
 * RECHTLICHER HINTERGRUND — bitte vor Änderungen lesen:
 *
 * Bis W R4 schrieb dieser Provider den aufgelösten Wert bei JEDEM Seitenaufruf
 * in den Local Storage, auch wenn der Nutzer nie etwas gewählt hatte. Damit war
 * `rechenfix-theme` eine automatische Speicherung — und das bricht die Linie,
 * auf der die gesamte Argumentation der Datenschutzerklärung ruht:
 *
 *   vom Nutzer selbst gesetzt → einwilligungsfrei (§ 25 Abs. 2 Nr. 2 TDDDG)
 *   automatisch angelegt      → einwilligungspflichtig
 *
 * Abschnitt 7 der Datenschutzerklärung sagt: „Im Browser gespeichert wird
 * ausschließlich, was Sie selbst einschalten." Dieser Satz soll ohne
 * Ausnahmeklausel stehen bleiben können. Deshalb wurde hier der Code
 * korrigiert und nicht dort der Text abgeschwächt.
 *
 * ZWEI EIGENSCHAFTEN, DIE NICHT WEGOPTIMIERT WERDEN DÜRFEN:
 *
 * 1. Geschrieben wird AUSSCHLIESSLICH in `toggleTheme`, also nur auf
 *    ausdrückliche Betätigung des Umschalters. Kein `setItem` in einem Effekt —
 *    Effekte laufen bei jedem Einhängen, auch ohne Zutun des Nutzers.
 * 2. Ohne gespeicherten Wert entscheidet `prefers-color-scheme`. Ein einmal
 *    ungefragt geschriebener Wert würde die Systemeinstellung dauerhaft
 *    überstimmen, auch wenn der Nutzer sie später ändert.
 *
 * Vorhandene Einträge werden bewusst NICHT aufgeräumt: Anders als beim
 * Rechenverlauf ist hier keine unrechtmäßige Speicherung zu bereinigen, und ein
 * Löschen würde die Einstellung der Nutzer zurücksetzen. Wo Löschen dem Nutzer
 * schadet und nichts schützt, wird nicht gelöscht.
 */

type Theme = 'light' | 'dark';

const SCHLUESSEL = 'rechenfix-theme';

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({ theme: 'light', toggleTheme: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let start: Theme = 'light';
    try {
      const gespeichert = localStorage.getItem(SCHLUESSEL);
      if (gespeichert === 'light' || gespeichert === 'dark') {
        start = gespeichert;
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        start = 'dark';
      }
    } catch {
      // Speicher nicht verfügbar (privater Modus, Richtlinie): Systemwert
      // versuchen, sonst bei hell bleiben.
      try {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) start = 'dark';
      } catch { /* dann eben hell */ }
    }
    setTheme(start);
    setMounted(true);
  }, []);

  // Nur die Darstellung anwenden — hier wird bewusst NICHT gespeichert.
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme, mounted]);

  const toggleTheme = useCallback(() => {
    const naechstes: Theme = theme === 'light' ? 'dark' : 'light';
    // Die aktive Wahl des Nutzers ist der einzige Anlass zu speichern.
    try {
      localStorage.setItem(SCHLUESSEL, naechstes);
    } catch {
      // Ohne Speicher gilt die Wahl nur für die laufende Sitzung.
    }
    setTheme(naechstes);
  }, [theme]);

  // Prevent flash of wrong theme
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
