'use client';

import { useState } from 'react';
import { rechner as alleRechner, kategorien } from '@/lib/rechner-config';

type FeedbackTyp = 'rechner-wunsch' | 'fehler' | 'bewertung' | 'rechner-verbessern' | 'ki-feedback';

const TYPEN: { id: FeedbackTyp; icon: string; label: string; beschreibung: string }[] = [
  { id: 'rechner-wunsch', icon: '💡', label: 'Rechner-Wunsch', beschreibung: 'Schlagen Sie einen neuen Rechner vor' },
  { id: 'fehler', icon: '🐛', label: 'Fehler melden', beschreibung: 'Ein Rechner funktioniert nicht richtig' },
  { id: 'bewertung', icon: '⭐', label: 'Bewertung', beschreibung: 'Wie gefällt Ihnen Rechenfix?' },
  { id: 'rechner-verbessern', icon: '🧮', label: 'Rechner verbessern', beschreibung: 'Was fehlt bei einem Rechner?' },
  { id: 'ki-feedback', icon: '🤖', label: 'KI-Feedback', beschreibung: 'Wie hilfreich sind die KI-Erklärungen?' },
];

const rechnerListe = alleRechner.map(r => ({ slug: r.slug, titel: r.titel, kategorie: r.kategorie }));

function Sterne({ wert, onChange }: { wert: number; onChange: (n: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className={`text-3xl transition-transform hover:scale-110 ${n <= wert ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function FeedbackClient() {
  const [aktiverTyp, setAktiverTyp] = useState<FeedbackTyp | null>(null);
  const [gesendet, setGesendet] = useState(false);
  const [sending, setSending] = useState(false);

  // Shared
  const [email, setEmail] = useState('');

  // Rechner-Wunsch
  const [wunschBeschreibung, setWunschBeschreibung] = useState('');
  const [wunschKategorie, setWunschKategorie] = useState('');

  // Fehler
  const [fehlerRechner, setFehlerRechner] = useState('');
  const [fehlerProblem, setFehlerProblem] = useState('');

  // Bewertung
  const [bewertungSterne, setBewertungSterne] = useState(0);
  const [bewertungGefaellt, setBewertungGefaellt] = useState('');
  const [bewertungVerbessern, setBewertungVerbessern] = useState('');

  // Rechner verbessern
  const [verbessernRechner, setVerbessernRechner] = useState('');
  const [verbessernWasFehlt, setVerbessernWasFehlt] = useState('');

  // KI-Feedback
  const [kiSterne, setKiSterne] = useState(0);
  const [kiHilfreich, setKiHilfreich] = useState<'ja' | 'nein' | 'teilweise' | ''>('');
  const [kiAnmerkung, setKiAnmerkung] = useState('');

  const resetForm = () => {
    setEmail('');
    setWunschBeschreibung(''); setWunschKategorie('');
    setFehlerRechner(''); setFehlerProblem('');
    setBewertungSterne(0); setBewertungGefaellt(''); setBewertungVerbessern('');
    setVerbessernRechner(''); setVerbessernWasFehlt('');
    setKiSterne(0); setKiHilfreich(''); setKiAnmerkung('');
  };

  const isValid = () => {
    switch (aktiverTyp) {
      case 'rechner-wunsch': return wunschBeschreibung.trim().length > 0;
      case 'fehler': return fehlerRechner && fehlerProblem.trim().length > 0;
      case 'bewertung': return bewertungSterne > 0;
      case 'rechner-verbessern': return verbessernRechner && verbessernWasFehlt.trim().length > 0;
      case 'ki-feedback': return kiSterne > 0 && kiHilfreich !== '';
      default: return false;
    }
  };

  const buildFelder = (): Record<string, unknown> => {
    switch (aktiverTyp) {
      case 'rechner-wunsch':
        return { beschreibung: wunschBeschreibung, kategorie: wunschKategorie || 'Keine Angabe' };
      case 'fehler':
        return { rechner: fehlerRechner, problem: fehlerProblem };
      case 'bewertung':
        return { sterne: bewertungSterne, gefaellt: bewertungGefaellt || '-', verbessern: bewertungVerbessern || '-' };
      case 'rechner-verbessern':
        return { rechner: verbessernRechner, wasFehlt: verbessernWasFehlt };
      case 'ki-feedback':
        return { sterne: kiSterne, hilfreich: kiHilfreich, anmerkung: kiAnmerkung || '-' };
      default:
        return {};
    }
  };

  const absenden = async () => {
    if (!aktiverTyp || !isValid()) return;
    const formData = {
      typ: TYPEN.find(t => t.id === aktiverTyp)?.label ?? aktiverTyp,
      felder: buildFelder(),
      email: email.trim() || undefined,
    };
    console.log('Submit clicked', formData);
    setSending(true);
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      console.log('API response:', res.status, await res.text());
    } catch (error) {
      console.error('Fetch error:', error);
    }
    setSending(false);
    setGesendet(true);
    resetForm();
  };

  if (gesendet) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">Vielen Dank für Ihr Feedback!</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Wir lesen jede Nachricht und verbessern Rechenfix damit stetig.</p>
        <button
          onClick={() => { setGesendet(false); setAktiverTyp(null); }}
          className="px-6 py-2 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
        >
          Weiteres Feedback geben
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Typ-Kacheln */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
        {TYPEN.map(typ => (
          <button
            key={typ.id}
            onClick={() => setAktiverTyp(aktiverTyp === typ.id ? null : typ.id)}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              aktiverTyp === typ.id
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 ring-1 ring-primary-500/30'
                : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-primary-300'
            }`}
          >
            <span className="text-2xl">{typ.icon}</span>
            <p className="font-bold text-gray-800 dark:text-gray-100 mt-2">{typ.label}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{typ.beschreibung}</p>
          </button>
        ))}
      </div>

      {/* Formulare */}
      {aktiverTyp && (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-6 animate-in">
          <h2 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-4">
            {TYPEN.find(t => t.id === aktiverTyp)?.icon} {TYPEN.find(t => t.id === aktiverTyp)?.label}
          </h2>

          <div className="space-y-4">
            {/* Rechner-Wunsch */}
            {aktiverTyp === 'rechner-wunsch' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Beschreibung *</label>
                  <textarea
                    value={wunschBeschreibung}
                    onChange={e => setWunschBeschreibung(e.target.value)}
                    className="input-field min-h-[100px]"
                    placeholder="Welchen Rechner wünschen Sie sich? Was soll er berechnen?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Kategorie</label>
                  <select
                    value={wunschKategorie}
                    onChange={e => setWunschKategorie(e.target.value)}
                    className="input-field"
                  >
                    <option value="">Bitte wählen (optional)</option>
                    {kategorien.map(k => (
                      <option key={k.slug} value={k.name}>{k.icon} {k.name}</option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {/* Fehler melden */}
            {aktiverTyp === 'fehler' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Welcher Rechner? *</label>
                  <select
                    value={fehlerRechner}
                    onChange={e => setFehlerRechner(e.target.value)}
                    className="input-field"
                  >
                    <option value="">Bitte wählen</option>
                    {rechnerListe.map(r => (
                      <option key={r.slug} value={r.titel}>{r.titel} ({r.kategorie})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Problem beschreiben *</label>
                  <textarea
                    value={fehlerProblem}
                    onChange={e => setFehlerProblem(e.target.value)}
                    className="input-field min-h-[100px]"
                    placeholder="Was funktioniert nicht? Was haben Sie erwartet?"
                  />
                </div>
              </>
            )}

            {/* Bewertung */}
            {aktiverTyp === 'bewertung' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ihre Bewertung *</label>
                  <Sterne wert={bewertungSterne} onChange={setBewertungSterne} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Was gefällt Ihnen?</label>
                  <textarea
                    value={bewertungGefaellt}
                    onChange={e => setBewertungGefaellt(e.target.value)}
                    className="input-field min-h-[80px]"
                    placeholder="Was machen wir gut?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Was können wir verbessern?</label>
                  <textarea
                    value={bewertungVerbessern}
                    onChange={e => setBewertungVerbessern(e.target.value)}
                    className="input-field min-h-[80px]"
                    placeholder="Was fehlt oder stört Sie?"
                  />
                </div>
              </>
            )}

            {/* Rechner verbessern */}
            {aktiverTyp === 'rechner-verbessern' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Welcher Rechner? *</label>
                  <select
                    value={verbessernRechner}
                    onChange={e => setVerbessernRechner(e.target.value)}
                    className="input-field"
                  >
                    <option value="">Bitte wählen</option>
                    {rechnerListe.map(r => (
                      <option key={r.slug} value={r.titel}>{r.titel} ({r.kategorie})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Was fehlt oder sollte verbessert werden? *</label>
                  <textarea
                    value={verbessernWasFehlt}
                    onChange={e => setVerbessernWasFehlt(e.target.value)}
                    className="input-field min-h-[100px]"
                    placeholder="Welche Funktion fehlt? Was sollte anders berechnet werden?"
                  />
                </div>
              </>
            )}

            {/* KI-Feedback */}
            {aktiverTyp === 'ki-feedback' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Wie bewerten Sie die KI-Erklärungen? *</label>
                  <Sterne wert={kiSterne} onChange={setKiSterne} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Waren die Erklärungen hilfreich? *</label>
                  <div className="flex gap-2">
                    {(['ja', 'teilweise', 'nein'] as const).map(opt => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setKiHilfreich(opt)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
                          kiHilfreich === opt
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-800 dark:text-primary-300'
                            : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-primary-300'
                        }`}
                      >
                        {opt === 'ja' ? '👍 Ja' : opt === 'teilweise' ? '🤔 Teilweise' : '👎 Nein'}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Anmerkung</label>
                  <textarea
                    value={kiAnmerkung}
                    onChange={e => setKiAnmerkung(e.target.value)}
                    className="input-field min-h-[80px]"
                    placeholder="Was war gut oder schlecht an der KI-Erklärung?"
                  />
                </div>
              </>
            )}

            {/* E-Mail (optional, bei allen) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">E-Mail (optional)</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input-field"
                placeholder="Falls wir Rückfragen haben"
              />
            </div>

            {/* Absenden */}
            <button
              onClick={absenden}
              disabled={!isValid() || sending}
              className={`w-full py-3 rounded-xl font-bold text-white transition-all ${
                isValid() && !sending
                  ? 'bg-primary-600 hover:bg-primary-700 cursor-pointer'
                  : 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
              }`}
            >
              {sending ? 'Wird gesendet...' : 'Feedback absenden'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
