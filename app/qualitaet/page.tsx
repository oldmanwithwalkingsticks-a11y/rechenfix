import Breadcrumbs from '@/components/layout/Breadcrumbs';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Qualität & Methodik | Rechenfix.de',
  description: 'Wie Rechenfix.de Genauigkeit und Aktualität sicherstellt: Audit-Workflow, Primärquellen-Pflicht, Verify-Skripte, Stichtag-Logik, A11y-Konformität.',
  alternates: { canonical: 'https://www.rechenfix.de/qualitaet' },
  openGraph: {
    title: 'Qualität & Methodik | Rechenfix.de',
    description: 'Audit-Workflow, Primärquellen, Stichtag-Logik und A11y-Status — wie Rechenfix.de Genauigkeit sicherstellt.',
    url: 'https://www.rechenfix.de/qualitaet',
    siteName: 'Rechenfix.de',
    type: 'website',
    locale: 'de_DE',
    images: [{ url: 'https://www.rechenfix.de/opengraph-image', width: 1200, height: 630, alt: 'Qualität & Methodik — Rechenfix.de' }],
  },
};

export default function QualitaetSeite() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Qualität & Methodik' }]} />

      <h1 className="text-3xl md:text-4xl font-extrabold text-primary-700 dark:text-primary-300 mb-2">
        Qualität &amp; Methodik
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        Wie Rechenfix.de Genauigkeit, Aktualität und Transparenz sicherstellt.
      </p>

      {/* 1. Hero */}
      <section className="card p-6 md:p-8 mb-8">
        <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
          <p className="mb-4">
            Rechenfix.de pflegt 170 Online-Rechner in neun Kategorien — viele davon
            mit rechtlich relevanten Berechnungen (Steuern, Sozialabgaben, Unterhalt,
            Förderung, Mietrecht). Diese Seite beschreibt den Workflow, mit dem
            die fachliche Genauigkeit und Aktualität sichergestellt wird.
          </p>
          <p>
            Die hier dargestellten Praktiken sind nicht Marketing-Sprache, sondern
            die tatsächlich angewendete Arbeitsweise. Wer prüfen möchte: Der
            Quellcode der Site ist in TypeScript geschrieben, alle Berechnungs-Bibliotheken
            liegen im Verzeichnis <code className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">lib/berechnungen/</code>.
          </p>
        </div>
      </section>

      {/* 2. Audit-Workflow */}
      <section className="card p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Audit-Workflow
        </h2>
        <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
          <p className="mb-4">
            Größere Pflegezyklen werden als <strong>Audit-Wellen</strong> organisiert.
            Eine Welle deckt typischerweise 10–25 Rechner einer Themenkategorie ab und
            gliedert sich in drei Phasen:
          </p>
          <ol className="list-decimal pl-5 space-y-1.5 mb-4">
            <li>Audit-Erstellung gegen Primärquellen mit dokumentierten Befunden P1/P2/P3</li>
            <li>Atomare Code-Commits pro Befund, jeder mit dediziertem Verify-Skript</li>
            <li>Live-Verifikation per Inkognito-Browser-Stichprobe nach Deploy</li>
          </ol>
          <p className="mb-4">
            Jede einzelne Berechnungs-Änderung wird nach einem
            <strong> 4-Punkt-Audit</strong> geprüft:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 mb-4">
            <li><strong>Formel und Rechtsquelle:</strong> Stimmt die Formel mit der referenzierten Vorschrift überein?</li>
            <li><strong>Input-Validierung:</strong> Werden Eingaben sinnvoll gegen Min-/Max-Werte geprüft?</li>
            <li><strong>Edge Cases:</strong> Wie verhält sich der Rechner bei Nullwerten, Maximalwerten, ungewöhnlichen Konstellationen?</li>
            <li><strong>SSOT-Hygiene:</strong> Werden zentrale Konstanten (Beitragssätze, Freibeträge) aus der Single Source of Truth bezogen?</li>
          </ul>
          <p>
            <strong>Verify-Skripte</strong> testen Berechnungslogik gegen externe
            Sollwerte. Beispiele: Die deutsche Feiertage-Bibliothek wird mit 60
            Test-Cases gegen Bundesfinanzministerium und kalender.de verifiziert
            (Ostersonntag 2024–2030, alle 16 Bundesländer-Feiertagskarten,
            Buß- und Bettag-Edge-Cases). Die Lohnsteuerformel wird gegen den
            offiziellen BMF-Lohnsteuerrechner stichprobenartig abgeglichen.
          </p>
        </div>
      </section>

      {/* 3. Primärquellen */}
      <section className="card p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Primärquellen
        </h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-5 leading-relaxed">
          Konkrete Beträge, Sätze, Stichtage und Formeln werden ausschließlich
          aus offiziellen Primärquellen übernommen — nicht aus Sekundärartikeln,
          Blogposts oder Sammel-Sites. Die folgende Liste zeigt die Hauptquellen
          nach Themenbereich:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Einkommensteuer &amp; Lohnabzüge</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
              <li>Bundesfinanzministerium — BMF-Lohnsteuerrechner und Schreiben</li>
              <li>Bundesgesetzblatt — laufende Gesetzesänderungen</li>
              <li>gesetze-im-internet.de — EStG, KStG, KraftStG, BUrlG, BEEG, MuSchG, BGB, ArbZG</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Sozialversicherung</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
              <li>GKV-Spitzenverband — Beitragsbemessungsgrenzen, Zusatzbeitrag</li>
              <li>Deutsche Rentenversicherung — Rentenwerte, Durchschnittsentgelt</li>
              <li>BMAS — Mindestlohn, ALG-Sätze</li>
              <li>BfA / Familienkasse — Kindergeld, Elterngeld</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Familien- und Unterhaltsrecht</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
              <li>Düsseldorfer Tabelle — OLG Düsseldorf, jährlich aktualisiert</li>
              <li>Süddeutsche Leitlinien (BW, BY) — wo abweichend von Düsseldorf</li>
              <li>RVG / FamGKG — Anwalts- und Gerichtskosten</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Wohnen, Energie &amp; Förderung</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
              <li>Bundesnetzagentur — Strompreise, Netzentgelte</li>
              <li>BDEW — Strom-Mittelwerte, WP-Tarife</li>
              <li>KfW — Förderprogramme (BEG, Effizienzhaus)</li>
              <li>Deutscher Mieterbund — Betriebskostenspiegel</li>
              <li>Mertens / VDI 6002 — Solarertragsmodelle</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Statistik &amp; Wirtschaft</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
              <li>Statistisches Bundesamt (Destatis) — VPI, Lebenshaltung</li>
              <li>Deutsche Bundesbank — Zinsdaten</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Gesundheit &amp; Schwangerschaft</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
              <li>Robert Koch-Institut — Referenzwerte</li>
              <li>WHO — BMI-Klassifikation</li>
              <li>DGE — Energiebedarfs-Empfehlungen</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Stichtag-Logik */}
      <section className="card p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Stichtag-Logik
        </h2>
        <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
          <p className="mb-4">
            Werte, die sich zu einem konkreten Datum ändern, sind im Code mit einem
            Stichtag-Switch hinterlegt. Beim Aufruf eines Rechners wird automatisch
            der Wert verwendet, der zum aktuellen Datum gilt — kein manueller
            Code-Eingriff zum Umschaltzeitpunkt nötig. Beispiele aktuell hinterlegter
            Stichtage:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 mb-4">
            <li><strong>Mindestlohn:</strong> 13,90 € → 14,60 € zum 01.01.2027</li>
            <li><strong>Aktueller Rentenwert:</strong> 40,79 € → 42,52 € zum 01.07.2026</li>
            <li><strong>Pfändungsfreigrenze:</strong> 1.555,98 € → 1.587,40 € zum 01.07.2026</li>
            <li><strong>Kfz-Steuer-Befreiung Elektrofahrzeuge nach § 3d KraftStG:</strong> verlängert bis 31.12.2035 durch das Achte KraftStÄndG vom 04.12.2025</li>
          </ul>
          <p>
            Bei jedem Build prüft ein Pre-Build-Hook, ob alle Stichtag-Konstanten in
            der zentralen Bibliothek mit den im Footer angezeigten Jahreswerten
            konsistent sind. Inkonsistenzen brechen den Build und verhindern, dass
            veraltete Stände versehentlich live gehen.
          </p>
        </div>
      </section>

      {/* 5. A11y und Barrierefreiheit */}
      <section className="card p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Barrierefreiheit
        </h2>
        <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
          <p className="mb-4">
            Rechenfix.de hat im April 2026 einen vollständigen A11y-Sprint
            durchlaufen. Geprüfte Stichprobe: 19 Rechner aus allen 9 Kategorien.
            Ergebnisse:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 mb-4">
            <li><strong>Lighthouse Accessibility:</strong> 100/100 auf Mobile und Desktop</li>
            <li><strong>axe DevTools:</strong> 0 automatisch erkennbare Verstöße</li>
            <li>Form-Labels, Color-Contrast, Keyboard-Navigation, Screen-Reader-Kompatibilität geprüft</li>
          </ul>
          <p className="mb-4">
            Bekannte Limitationen sind transparent dokumentiert:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 mb-4">
            <li>Die BMI-Skala-Visualisierung ist primär grafisch — der textuelle Bereich (Unter-/Normal-/Übergewicht) bleibt aber zugänglich</li>
            <li>Der wissenschaftliche Taschenrechner ist mit Maus/Touch optimiert; Tastatursteuerung ist auf Standard-Operationen beschränkt</li>
          </ul>
          <p>
            Details unter <Link href="/barrierefreiheit" className="text-primary-600 dark:text-primary-400 hover:underline">/barrierefreiheit</Link>.
            Anregungen oder Probleme bitte an{' '}
            <a href="mailto:info@rechenfix.de" className="text-primary-600 dark:text-primary-400 hover:underline">info@rechenfix.de</a>.
          </p>
        </div>
      </section>

      {/* 6. Datenschutz und Performance */}
      <section className="card p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Datenschutz und Performance
        </h2>
        <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
          <p className="mb-4">
            Alle Berechnungen laufen lokal in Ihrem Browser. Eingaben (Gehalt,
            Bundesland, Familienstand, Gesundheitswerte etc.) werden nicht an
            einen Server übertragen, nicht protokolliert und nicht gespeichert.
          </p>
          <p className="mb-4">
            Cookies werden nur mit ausdrücklicher Einwilligung gesetzt. Notwendige
            technische Cookies (Sitzung) sind funktional unverzichtbar; Analyse- und
            Marketing-Cookies sind optional und im Cookie-Banner einzeln steuerbar.
          </p>
          <p>
            Vollständige Angaben zur Datenverarbeitung in der{' '}
            <Link href="/datenschutz" className="text-primary-600 dark:text-primary-400 hover:underline">Datenschutzerklärung</Link>.
          </p>
        </div>
      </section>

      {/* 7. Was Rechenfix NICHT ist */}
      <section className="card p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Was Rechenfix.de nicht ist
        </h2>
        <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
          <p className="mb-4">
            Trotz aller Sorgfalt ersetzt Rechenfix keine professionelle Beratung
            in fachlich relevanten Einzelfällen:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 mb-4">
            <li><strong>Keine Steuerberatung</strong> im Sinne des Steuerberatungsgesetzes (StBerG)</li>
            <li><strong>Keine Rechtsberatung</strong> im Sinne des Rechtsdienstleistungsgesetzes (RDG)</li>
            <li><strong>Keine medizinische Beratung</strong> oder Diagnostik</li>
            <li><strong>Keine Anlageberatung</strong> nach WpHG / KAGB</li>
          </ul>
          <p className="mb-4">
            Die Rechner liefern eine Orientierung auf Basis der dokumentierten
            Formeln und der zum Zeitpunkt des Aufrufs aktuellen Werte. Für
            verbindliche Entscheidungen — Steuererklärung, Vertragsabschluss,
            medizinische Maßnahmen — wenden Sie sich an die jeweils qualifizierte
            Fachperson.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 italic">
            Alle Angaben ohne Gewähr.
          </p>
        </div>
      </section>
    </div>
  );
}
