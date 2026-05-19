import Breadcrumbs from '@/components/layout/Breadcrumbs';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { existsSync } from 'fs';
import path from 'path';

// ============================================================================
// TODO KARSTEN — Platzhalter mit eigenen Werten ersetzen.
// Suchstring: "PLACEHOLDER_"
// ============================================================================
const PLACEHOLDER_ALTER = '{ALTER}';
const PLACEHOLDER_BERUFLICHER_HINTERGRUND = '{BERUFLICHER_HINTERGRUND}';
const PLACEHOLDER_PROJEKT_TYP = '{WOCHENEND-PROJEKT / ABENDPROJEKT / HAUPTPROJEKT}';
const PLACEHOLDER_MOTIVATION = '{2–3 SÄTZE: Was begeistert dich an Rechnern? Welche Beispiele aus deinem Alltag haben dich zum Thema gebracht?}';
const PLACEHOLDER_STORY_ZEITPUNKT = '{ZEITPUNKT}';
const PLACEHOLDER_STORY_SITUATION = '{KONKRETE SITUATION AUS DEINEM ALLTAG: z. B. "vor einer Steuererklärung saß und für jeden einzelnen Rechenschritt eine andere Website mit Werbeflut und unklaren Erklärungen aufrufen musste"}';
const PLACEHOLDER_STORY_EIGENSCHAFTEN = '{DREI EIGENSCHAFTEN: z. B. "klare Erklärungen liefert, mobil sauber funktioniert und nicht nur Affiliate-Links verkauft"}';
const PLACEHOLDER_STORY_STATUS = '{STATUS HEUTE: Anzahl Rechner, Kategorien, was als nächstes geplant ist}';

// LAST_UPDATED manuell pflegen bei substantiellen Änderungen.
const LAST_UPDATED = '20. Mai 2026';

// Server-side Foto-Check: rendert <Image>, sobald public/about/karsten-kautz.jpg
// existiert. Solange nicht: Placeholder-Div mit identischer Grössen-Reserve.
const fotoExists = existsSync(path.join(process.cwd(), 'public/about/karsten-kautz.jpg'));

export const metadata: Metadata = {
  title: 'Über Rechenfix.de — Unabhängiges Rechnerportal aus Deutschland',
  description: 'Rechenfix.de — unabhängiges Rechnerportal aus Deutschland. Kostenlose Online-Rechner für Finanzen, Alltag, Wohnen und mehr. Schnell und ohne Anmeldung.',
  alternates: { canonical: 'https://www.rechenfix.de/ueber-uns' },
  openGraph: {
    title: 'Über Rechenfix.de — Unabhängiges Rechnerportal',
    description: 'Kostenlose Online-Rechner für Finanzen, Alltag, Wohnen, Mathe und mehr. Schnell, privat und ohne Anmeldung.',
    url: 'https://www.rechenfix.de/ueber-uns',
    siteName: 'Rechenfix.de',
    type: 'website',
    locale: 'de_DE',
    images: [{ url: 'https://www.rechenfix.de/opengraph-image', width: 1200, height: 630, alt: 'Über Rechenfix.de' }],
  },
};

export default function UeberUnsSeite() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Über uns' }]} />

      <h1 className="text-3xl md:text-4xl font-extrabold text-primary-700 dark:text-primary-300 mb-2">
        Über Rechenfix.de
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        Unabhängiges Online-Rechnerportal aus Deutschland.
      </p>

      {/* 1. Hero + Author-Block (BESTEHEND Hero, NEU Author-Block) */}
      <section className="card p-6 md:p-8 mb-8">
        <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
          <p className="mb-4">
            Rechenfix.de ist ein unabhängiges Rechnerportal mit aktuell <strong>170 kostenlosen
            Online-Rechnern</strong> in neun Kategorien: Alltag, Finanzen, Gesundheit,
            Auto &amp; Verkehr, Wohnen &amp; Energie, Mathematik, Arbeit &amp; Recht, Kochen
            und Sport.
          </p>
          <p className="mb-4">
            Alle Berechnungen laufen <strong>direkt in Ihrem Browser</strong> — wir
            übertragen keine Eingaben auf einen Server, keine Anmeldung ist nötig,
            keine Daten werden gespeichert. Das Ziel ist einfach: komplexe Berechnungen
            so zugänglich machen, dass Sie in Sekunden eine belastbare Orientierung
            bekommen.
          </p>
          <p>
            Eine Besonderheit von Rechenfix ist die KI-gestützte Erklärung
            („Fix erklärt&rdquo;): Auf Wunsch erläutert eine KI die Berechnung individuell für
            Ihre konkreten Eingaben — die zugrundeliegenden Formeln und Werte sind
            jedoch <strong>nicht KI-generiert</strong>, sondern manuell aus
            Primärquellen gepflegt (siehe <Link href="/qualitaet" className="text-primary-600 dark:text-primary-400 hover:underline">Qualität &amp; Methodik</Link>).
          </p>
        </div>

        {/* Author-Block — Foto links, Name/Untertitel/Ort rechts */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-start gap-5">
          {fotoExists ? (
            <Image
              src="/about/karsten-kautz.jpg"
              alt="Karsten Kautz, Gründer von Rechenfix.de"
              width={200}
              height={200}
              className="rounded-2xl shrink-0"
              priority
            />
          ) : (
            <div
              className="w-[200px] h-[200px] rounded-2xl bg-gray-200 dark:bg-gray-700 shrink-0 flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm"
              role="img"
              aria-label="Foto folgt"
            >
              Foto folgt
            </div>
          )}
          <div className="pt-1">
            <div className="font-bold text-lg text-gray-800 dark:text-gray-100">Karsten Kautz</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Gründer und alleiniger Betreiber von Rechenfix
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-500 mt-0.5">Krefeld</div>
          </div>
        </div>
      </section>

      {/* 2. Wer ich bin (NEU, persönlich, mit Platzhaltern) */}
      <section className="card p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Wer ich bin
        </h2>
        <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
          <p className="mb-4">
            Ich heiße Karsten Kautz, bin {PLACEHOLDER_ALTER} Jahre alt und lebe in Krefeld.
            Beruflich bin ich {PLACEHOLDER_BERUFLICHER_HINTERGRUND}. Rechenfix ist mein {PLACEHOLDER_PROJEKT_TYP} seit 2026.
          </p>
          <p className="mb-4">
            {PLACEHOLDER_MOTIVATION}
          </p>
          <p>
            Wichtige Abgrenzung: Ich bin Software-Entwickler, kein Steuerberater oder
            Rechtsanwalt. Die Genauigkeit der Rechner kommt nicht aus persönlicher
            Beratungs-Expertise, sondern aus disziplinierter Pflege gegen die offiziellen
            Primärquellen — siehe{' '}
            <Link href="/qualitaet" className="text-primary-600 dark:text-primary-400 hover:underline">Qualität &amp; Methodik</Link>.
            Vollständige Anbieter-Angaben gemäß § 5 TMG inklusive Anschrift,
            Telefonnummer und Umsatzsteuer-ID finden Sie im{' '}
            <Link href="/impressum" className="text-primary-600 dark:text-primary-400 hover:underline">Impressum</Link>.
          </p>
        </div>
      </section>

      {/* 3. Wie Rechenfix entstanden ist (NEU, Founder-Story mit Platzhaltern) */}
      <section className="card p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Wie Rechenfix entstanden ist
        </h2>
        <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
          <p className="mb-4">
            Die Idee zu Rechenfix kam {PLACEHOLDER_STORY_ZEITPUNKT}, als ich {PLACEHOLDER_STORY_SITUATION}.
          </p>
          <p className="mb-4">
            Mir fehlte ein deutsches Rechner-Portal, das {PLACEHOLDER_STORY_EIGENSCHAFTEN}.
          </p>
          <p>
            Im Frühjahr 2026 habe ich begonnen, die ersten Rechner selbst zu programmieren. {PLACEHOLDER_STORY_STATUS}.
          </p>
        </div>
      </section>

      {/* 4. Was Rechenfix anders macht (NEU, 3 Bold-Lead-Bullets) */}
      <section className="card p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Was Rechenfix anders macht
        </h2>
        <ul className="space-y-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          <li>
            <strong className="text-gray-800 dark:text-gray-100">Aktuelle Werte ohne Verzögerung.</strong>{' '}
            Steuersätze 2026, Beitragsbemessungsgrenzen 2026, Mindestlohn 2026 —
            gesetzliche Änderungen werden eingepflegt, sobald sie wirksam werden.
            Stichtage wie der 01.07. (Rentenwert) oder 01.01. (Tarif) schalten
            automatisch um, ohne dass die Site neu deployed werden muss.
          </li>
          <li>
            <strong className="text-gray-800 dark:text-gray-100">„Fix erklärt&ldquo;: Antworten in einfacher Sprache.</strong>{' '}
            Wer wissen will, warum sein Bruttogehalt anders versteuert wird als gedacht,
            bekommt eine Erklärung in zwei Sätzen statt eines Steuergesetz-Auszugs. Die
            Erklärung läuft über eine KI, die zugrundeliegende Rechnung läuft aber über
            geprüften Code.
          </li>
          <li>
            <strong className="text-gray-800 dark:text-gray-100">Werbefinanziert, aber nicht werbeüberladen.</strong>{' '}
            Eine dezente Werbeanzeige unter dem Ergebnis hält den Betrieb am Laufen.
            Keine Pop-ups, keine Newsletter-Aufdringlichkeit, keine
            „Premium-Versionen&ldquo;, keine Tracking-Banner über die ganze Seite.
          </li>
        </ul>
      </section>

      {/* 5. Wie wir Genauigkeit sicherstellen (BESTEHEND, war S3) */}
      <section className="card p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Wie wir Genauigkeit sicherstellen
        </h2>
        <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
          <p className="mb-4">
            Rechenfix verwendet einen mehrstufigen Audit-Workflow, um Genauigkeit
            und Aktualität sicherzustellen. Die Kernpraktiken in Kürze:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>
              <strong>Primärquellen-Pflicht:</strong> Konkrete Werte (Beitragssätze,
              Freibeträge, Steuersätze, Stichtage) werden gegen offizielle Quellen
              wie Bundesgesetzblatt, Bundesfinanzministerium oder Statistisches
              Bundesamt geprüft — nicht aus Sekundärartikeln übernommen.
            </li>
            <li>
              <strong>Verify-Skripte:</strong> Sicherheitskritische Berechnungs-Logik
              (Steuerformel, Sozialabgaben, Feiertage etc.) wird automatisiert gegen
              externe Sollwerte getestet, bevor neue Versionen veröffentlicht werden.
            </li>
            <li>
              <strong>Stichtag-Logik:</strong> Werte, die sich zu einem konkreten
              Datum ändern (z. B. Mindestlohn, Rentenwert, Pfändungsfreigrenze),
              sind im Code mit Stichtag-Switch hinterlegt — die Site rechnet
              automatisch zum richtigen Tag mit dem neuen Wert.
            </li>
            <li>
              <strong>Single Source of Truth:</strong> Beitragssätze und gemeinsame
              Konstanten existieren genau einmal als zentrale Library und werden von
              allen Rechnern referenziert — nicht pro Rechner dupliziert.
            </li>
          </ul>
          <p>
            Die ausführliche Darstellung dieses Workflows mit Quellen-Liste und
            Update-Historie steht auf der Seite{' '}
            <Link href="/qualitaet" className="text-primary-600 dark:text-primary-400 hover:underline">Qualität &amp; Methodik</Link>.
          </p>
        </div>
      </section>

      {/* 6. Unsere Quellen — Kurzübersicht (BESTEHEND, war S4) */}
      <section className="card p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Unsere Quellen (Auswahl)
        </h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Die folgenden Primärquellen werden für die zentralen Themen-Bereiche genutzt.
          Eine vollständige Liste mit weiterführenden Erläuterungen findet sich auf{' '}
          <Link href="/qualitaet" className="text-primary-600 dark:text-primary-400 hover:underline">/qualitaet</Link>.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1.5">Steuern &amp; Recht</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
              <li>Bundesfinanzministerium (BMF)</li>
              <li>Bundesgesetzblatt (BGBl.)</li>
              <li>gesetze-im-internet.de</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1.5">Sozialversicherung</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
              <li>GKV-Spitzenverband</li>
              <li>Deutsche Rentenversicherung</li>
              <li>BMAS</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1.5">Statistik &amp; Wirtschaft</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
              <li>Statistisches Bundesamt (Destatis)</li>
              <li>Deutsche Bundesbank</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1.5">Wohnen &amp; Energie</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
              <li>Bundesnetzagentur</li>
              <li>BDEW</li>
              <li>KfW</li>
              <li>Deutscher Mieterbund (Betriebskostenspiegel)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 7. Datenschutz und Transparenz (BESTEHEND, war S5) */}
      <section className="card p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Datenschutz und Transparenz
        </h2>
        <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
          <p className="mb-4">
            <strong>Berechnungen erfolgen lokal in Ihrem Browser.</strong> Eingaben
            werden nicht an Rechenfix übermittelt, nicht protokolliert und nicht
            gespeichert. Sie können jeden Rechner nutzen, ohne sich anzumelden, ohne
            ein Konto anzulegen und ohne Cookies zu akzeptieren.
          </p>
          <p className="mb-4">
            <strong>Werbung und Affiliate-Links:</strong> Rechenfix.de finanziert
            sich durch Werbeeinblendungen und Affiliate-Partnerschaften. Affiliate-Links
            sind als solche gekennzeichnet. Die fachlichen Inhalte und Berechnungsergebnisse
            werden davon nicht beeinflusst — Empfehlungen erfolgen ausschließlich nach
            thematischer Passung, nicht nach Provisionshöhe.
          </p>
          <p>
            Detaillierte Angaben zur Datenverarbeitung finden Sie in der{' '}
            <Link href="/datenschutz" className="text-primary-600 dark:text-primary-400 hover:underline">Datenschutzerklärung</Link>.
          </p>
        </div>
      </section>

      {/* 8. Kontakt (BESTEHEND, war S6) */}
      <section className="card p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Kontakt
        </h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
          Fehler entdeckt, Verbesserungsvorschlag oder Wunsch für einen neuen
          Rechner? Schreiben Sie an{' '}
          <a href="mailto:info@rechenfix.de" className="text-primary-600 dark:text-primary-400 hover:underline">
            info@rechenfix.de
          </a>
          . Antwort in der Regel innerhalb von 14 Tagen.
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          Anbieter-Angaben nach § 5 TMG:{' '}
          <Link href="/impressum" className="text-primary-600 dark:text-primary-400 hover:underline">Impressum</Link>.
        </p>
      </section>

      {/* 9. Aktualisiert-Block (NEU, ganz am Ende) */}
      <p className="text-xs text-gray-500 dark:text-gray-400 text-right mt-2">
        Diese Seite zuletzt aktualisiert: {LAST_UPDATED}
      </p>
    </div>
  );
}
