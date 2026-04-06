'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const BEISPIELE = [
  'Wie viel sind 19% MwSt von 500€?',
  'Was kostet Rauchen pro Jahr bei 10 Zigaretten am Tag?',
  'Wie viel netto bei 3.500€ brutto?',
  'Wie viel Strom verbraucht ein Kühlschrank pro Jahr?',
  'Was ist 15% Rabatt auf 89,99€?',
];

/** Maps keywords in the AI response to rechner links */
const RECHNER_LINKS: { keywords: string[]; label: string; href: string }[] = [
  { keywords: ['brutto', 'netto', 'nettogehalt', 'steuerklasse', 'lohnsteuer'], label: 'Brutto-Netto-Rechner', href: '/finanzen/brutto-netto-rechner' },
  { keywords: ['mwst', 'mehrwertsteuer', 'umsatzsteuer', '19%', '7%'], label: 'MwSt-Rechner', href: '/finanzen/mwst-rechner' },
  { keywords: ['prozent', 'prozentrechnung', 'prozentsatz', 'grundwert', 'prozentwert'], label: 'Prozentrechner', href: '/alltag/prozentrechner' },
  { keywords: ['rabatt', 'reduziert', 'nachlass', 'ermäßigung', 'preisnachlass'], label: 'Rabattrechner', href: '/alltag/rabattrechner' },
  { keywords: ['dreisatz', 'verhältnis', 'proportional'], label: 'Dreisatz-Rechner', href: '/alltag/dreisatz-rechner' },
  { keywords: ['bmi', 'body mass', 'übergewicht', 'untergewicht', 'normalgewicht'], label: 'BMI-Rechner', href: '/gesundheit/bmi-rechner' },
  { keywords: ['promille', 'alkohol', 'blutalkohol'], label: 'Promillerechner', href: '/gesundheit/promillerechner' },
  { keywords: ['schlaf', 'schlafzykl', 'einschlafen', 'aufwachen', 'schlafenszeit'], label: 'Schlafrechner', href: '/gesundheit/schlaf-rechner' },
  { keywords: ['rauchen', 'raucher', 'zigarett', 'nikotin', 'tabak'], label: 'Raucher-Rechner', href: '/gesundheit/raucher-rechner' },
  { keywords: ['sprit', 'benzin', 'diesel', 'tankfüllung', 'fahrtkosten'], label: 'Spritkosten-Rechner', href: '/auto/spritkosten-rechner' },
  { keywords: ['kfz-steuer', 'kfz steuer', 'autosteuer'], label: 'Kfz-Steuer-Rechner', href: '/auto/kfz-steuer-rechner' },
  { keywords: ['ps umrechnen', 'kw umrechnen', 'pferdestärke', 'kilowatt', 'kw in ps', 'ps in kw'], label: 'kW-PS-Rechner', href: '/auto/kw-ps-umrechner' },
  { keywords: ['pendlerpauschale', 'pendler', 'entfernungspauschale'], label: 'Pendlerpauschale-Rechner', href: '/arbeit/pendlerpauschale-rechner' },
  { keywords: ['strom', 'kwh', 'stromverbrauch', 'stromkosten', 'kühlschrank'], label: 'Stromkosten-Rechner', href: '/wohnen/stromkosten-rechner' },
  { keywords: ['heizkosten', 'heizung', 'heizen', 'gas', 'fernwärme'], label: 'Heizkosten-Rechner', href: '/wohnen/heizkosten-rechner' },
  { keywords: ['nebenkosten', 'betriebskosten', 'warmmiete'], label: 'Nebenkosten-Rechner', href: '/wohnen/nebenkosten-rechner' },
  { keywords: ['miete', 'mietpreis', 'kaltmiete', 'mietbelastung'], label: 'Mietrechner', href: '/wohnen/mietrechner' },
  { keywords: ['grunderwerbsteuer', 'kaufnebenkosten', 'immobilie', 'hauskauf'], label: 'Grunderwerbsteuer-Rechner', href: '/wohnen/grunderwerbsteuer-rechner' },
  { keywords: ['tapete', 'tapetenbedarf', 'rolle'], label: 'Tapetenbedarf-Rechner', href: '/wohnen/tapetenbedarf-rechner' },
  { keywords: ['quadratmeter', 'fläche', 'm²', 'wohnfläche'], label: 'Quadratmeter-Rechner', href: '/wohnen/quadratmeter-rechner' },
  { keywords: ['zins', 'zinsen', 'zinseszins', 'festgeld', 'tagesgeld'], label: 'Zinsrechner', href: '/finanzen/zinsrechner' },
  { keywords: ['sparplan', 'sparrate', 'etf', 'sparen', 'vermögensaufbau', 'ansparen'], label: 'Sparrechner', href: '/finanzen/sparrechner' },
  { keywords: ['inflation', 'kaufkraft', 'preissteigerung', 'geldentwertung'], label: 'Inflationsrechner', href: '/finanzen/inflationsrechner' },
  { keywords: ['elterngeld', 'elternzeit', 'mutterschutz'], label: 'Elterngeld-Rechner', href: '/finanzen/elterngeld-rechner' },
  { keywords: ['bürgergeld', 'arbeitslosengeld', 'hartz', 'jobcenter', 'regelbedarf'], label: 'Bürgergeld-Rechner', href: '/finanzen/buergergeld-rechner' },
  { keywords: ['stundenlohn', 'lohn pro stunde', 'verdienst pro stunde'], label: 'Stundenlohn-Rechner', href: '/arbeit/stundenlohn-rechner' },
  { keywords: ['arbeitszeit', 'arbeitsstunden', 'wochenstunden'], label: 'Arbeitszeit-Rechner', href: '/arbeit/arbeitszeitrechner' },
  { keywords: ['urlaub', 'urlaubstage', 'urlaubsanspruch', 'resturlaub'], label: 'Urlaubstage-Rechner', href: '/arbeit/urlaubstage-rechner' },
  { keywords: ['überstunden', 'mehrarbeit'], label: 'Überstunden-Rechner', href: '/arbeit/ueberstunden-rechner' },
  { keywords: ['bruch', 'bruchrechnung', 'nenner', 'zähler'], label: 'Bruchrechner', href: '/mathe/bruchrechner' },
  { keywords: ['durchschnitt', 'mittelwert', 'median', 'notendurchschnitt'], label: 'Durchschnittsrechner', href: '/mathe/durchschnitt-rechner' },
  { keywords: ['notenschlüssel', 'note', 'punkte', 'bewertung', 'klausur'], label: 'Notenschlüssel-Rechner', href: '/mathe/notenschluessel-rechner' },
  { keywords: ['einheit', 'umrechnen', 'kilometer', 'meilen', 'celsius', 'fahrenheit', 'liter', 'gallone'], label: 'Einheitenrechner', href: '/alltag/einheiten-umrechner' },
  { keywords: ['tage zwischen', 'tage berechnen', 'datum', 'zeitraum', 'wie viele tage'], label: 'Tage-Rechner', href: '/alltag/tagerechner' },
  { keywords: ['countdown', 'weihnachten', 'silvester', 'wie lange noch'], label: 'Countdown-Rechner', href: '/alltag/countdown' },
  { keywords: ['streaming', 'netflix', 'disney', 'spotify', 'abo'], label: 'Streaming-Kosten-Rechner', href: '/alltag/streaming-kosten-rechner' },
  { keywords: ['lebenszeit', 'lebensjahr', 'wie alt', 'herzschläge'], label: 'Lebenszeit-Rechner', href: '/alltag/lebenszeit-rechner' },
  { keywords: ['gehaltsvergleich', 'gehalt vergleich', 'verdiene ich genug'], label: 'Gehaltsvergleich', href: '/finanzen/gehaltsvergleich' },
  { keywords: ['wahrer stundenlohn', 'tatsächlicher stundenlohn', 'echter stundenlohn', 'pendeln stundenlohn'], label: 'Wahrer-Stundenlohn-Rechner', href: '/finanzen/wahrer-stundenlohn' },
  { keywords: ['kaffee', 'kaffeekosten', 'espresso', 'cappuccino', 'latte', 'café-to-go'], label: 'Kaffee-Kosten-Rechner', href: '/alltag/kaffee-kosten-rechner' },
  { keywords: ['lieferservice', 'lieferdienst', 'lieferando', 'bestellen', 'liefergebühr', 'essenslieferung'], label: 'Lieferservice-Rechner', href: '/alltag/lieferservice-rechner' },
  { keywords: ['abo', 'abonnement', 'abos', 'monatliche kosten', 'fixkosten', 'subscription'], label: 'Abo-Rechner', href: '/alltag/abo-rechner' },
];

function detectRechnerLink(frage: string, antwort: string): { label: string; href: string } | null {
  const combined = (frage + ' ' + antwort).toLowerCase();

  let best: { label: string; href: string; score: number } | null = null;

  for (const rechner of RECHNER_LINKS) {
    let score = 0;
    for (const kw of rechner.keywords) {
      // Use word boundary regex so e.g. 'rauch' doesn't match 'verbrauch'
      const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(?:^|[\\s,.;:!?/"'()—–-])${escaped}`, 'i');
      if (regex.test(combined)) {
        score++;
      }
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { label: rechner.label, href: rechner.href, score };
    }
  }

  return best ? { label: best.label, href: best.href } : null;
}

interface Verlauf {
  frage: string;
  antwort: string;
  link: { label: string; href: string } | null;
}

export default function KiRechnerClient() {
  const [frage, setFrage] = useState('');
  const [laden, setLaden] = useState(false);
  const [fehler, setFehler] = useState('');
  const [verlauf, setVerlauf] = useState<Verlauf[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const ergebnisRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (verlauf.length > 0 && ergebnisRef.current) {
      ergebnisRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [verlauf]);

  async function handleAbsenden() {
    const text = frage.trim();
    if (!text || laden) return;

    setLaden(true);
    setFehler('');

    try {
      const res = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rechner_name: '__ki_rechner__',
          eingaben: {},
          ergebnis: { _: true },
          frage: text,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFehler(data.error || 'Antwort konnte nicht geladen werden.');
        return;
      }

      const link = detectRechnerLink(text, data.explanation);
      setVerlauf(prev => [...prev, { frage: text, antwort: data.explanation, link }]);
      setFrage('');
    } catch {
      setFehler('Verbindungsfehler. Bitte versuchen Sie es erneut.');
    } finally {
      setLaden(false);
    }
  }

  function handleBeispiel(text: string) {
    setFrage(text);
    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAbsenden();
    }
  }

  return (
    <div className="space-y-6">
      {/* Eingabefeld */}
      <div className="relative">
        <div className="bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-700/40 rounded-2xl shadow-lg shadow-purple-100/50 dark:shadow-purple-900/20 overflow-hidden focus-within:border-purple-400 dark:focus-within:border-purple-500 transition-colors">
          <textarea
            ref={inputRef}
            value={frage}
            onChange={e => setFrage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Stellen Sie eine Rechenfrage... z.B. "Wie viel netto bei 4.000€ brutto in Steuerklasse 3?"'
            rows={3}
            className="w-full px-5 pt-5 pb-14 text-gray-800 dark:text-gray-200 bg-transparent placeholder-gray-400 dark:placeholder-gray-500 text-base focus:outline-none resize-none"
          />
          <div className="absolute bottom-3 right-3">
            <button
              onClick={handleAbsenden}
              disabled={!frage.trim() || laden}
              className="px-5 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-gray-300 disabled:to-gray-400 dark:disabled:from-gray-600 dark:disabled:to-gray-700 text-white text-sm font-medium rounded-xl transition-all disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            >
              {laden ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Analysiere...
                </span>
              ) : (
                'Frage senden'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Beispiel-Fragen */}
      {verlauf.length === 0 && (
        <div>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Beispiel-Fragen</p>
          <div className="flex flex-wrap gap-2">
            {BEISPIELE.map(b => (
              <button
                key={b}
                onClick={() => handleBeispiel(b)}
                className="px-3.5 py-2 rounded-xl text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all"
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Fehler */}
      {fehler && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/30 rounded-xl p-4">
          <p className="text-sm text-red-700 dark:text-red-300">{fehler}</p>
          <button
            onClick={handleAbsenden}
            className="mt-2 text-sm text-red-600 dark:text-red-400 underline hover:no-underline"
          >
            Erneut versuchen
          </button>
        </div>
      )}

      {/* Verlauf */}
      <div className="space-y-4" ref={ergebnisRef}>
        {verlauf.map((v, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm">
            {/* Frage */}
            <div className="px-5 py-3 bg-gray-50 dark:bg-gray-700/50 flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-sm shrink-0 mt-0.5">🧑</span>
              <p className="text-sm text-gray-700 dark:text-gray-300 font-medium pt-0.5">{v.frage}</p>
            </div>

            {/* Antwort */}
            <div className="px-5 py-4 flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-sm shrink-0 mt-0.5">🤖</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-line">{v.antwort}</p>

                {/* Rechner-Link */}
                {v.link && (
                  <Link
                    href={v.link.href}
                    className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-700/40 rounded-xl text-sm font-medium text-purple-700 dark:text-purple-300 hover:from-purple-100 hover:to-blue-100 dark:hover:from-purple-900/30 dark:hover:to-blue-900/30 transition-all group"
                  >
                    <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Zum {v.link.label} f&uuml;r eine detaillierte Berechnung
                    <svg className="w-4 h-4 text-purple-400 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Loading-Indikator im Verlauf */}
      {laden && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-5 py-3 bg-gray-50 dark:bg-gray-700/50 flex items-start gap-3">
            <span className="w-7 h-7 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-sm shrink-0">🧑</span>
            <p className="text-sm text-gray-700 dark:text-gray-300 font-medium pt-0.5">{frage}</p>
          </div>
          <div className="px-5 py-4 flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-sm shrink-0">🤖</span>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Berechne Antwort...</span>
            </div>
          </div>
        </div>
      )}

      {/* Hinweis */}
      <p className="text-xs text-center text-gray-400 dark:text-gray-500">
        KI-basierte Sch&auml;tzung &mdash; f&uuml;r pr&auml;zise Ergebnisse nutzen Sie den verlinkten Detailrechner. Max 3 Fragen pro Minute.
      </p>
    </div>
  );
}
