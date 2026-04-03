'use client';

import { istGueltigeZahleneingabe } from '@/lib/zahlenformat';

interface NummerEingabeProps {
  value: string;
  onChange: (wert: string) => void;
  placeholder?: string;
  className?: string;
  einheit?: string;
  /** Schrittweite für +/- Buttons (nicht verwendet, nur für Kompatibilität) */
  step?: string;
}

/**
 * Wiederverwendbares Eingabefeld für Zahlen im deutschen Format.
 * Akzeptiert Komma als Dezimaltrennzeichen (z. B. "7,5").
 *
 * Verwendung:
 *   <NummerEingabe value={wert} onChange={setWert} einheit="kg" placeholder="z.B. 75" />
 *
 * WICHTIG für zukünftige Rechner:
 * - Immer <NummerEingabe> statt <input type="number"> verwenden
 * - Wert wird als String gespeichert (State), Parsing mit parseDeutscheZahl()
 */
export default function NummerEingabe({
  value,
  onChange,
  placeholder,
  className = '',
  einheit,
}: NummerEingabeProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const neuerWert = e.target.value;
    // Nur gültige Zahleneingaben durchlassen (Ziffern, ein Komma/Punkt, optionales Minus)
    if (neuerWert === '' || neuerWert === '-' || istGueltigeZahleneingabe(neuerWert)) {
      onChange(neuerWert);
    }
  };

  // Padding-Klasse basierend auf Einheit-Länge
  const einheitPadding = einheit
    ? einheit.length > 5
      ? 'pr-20'
      : einheit.length > 2
        ? 'pr-14'
        : 'pr-10'
    : '';

  return (
    <div className="relative">
      <input
        type="text"
        inputMode="decimal"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`input-field ${einheitPadding} ${className}`}
      />
      {einheit && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
          {einheit}
        </span>
      )}
    </div>
  );
}
