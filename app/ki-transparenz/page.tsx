import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
  title: 'KI-Transparenz — wo auf Rechenfix.de KI eingesetzt wird',
  description:
    'Offenlegung nach Art. 50 der KI-Verordnung: Welche Funktionen auf Rechenfix.de KI nutzen, welche Modelle dahinterstehen, welche Inhalte KI-generiert sind — und wo bewusst keine KI zum Einsatz kommt.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.rechenfix.de/ki-transparenz' },
};

const STAND = '19. August 2026';

function Abschnitt({ titel, children }: { titel: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">{titel}</h2>
      <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

export default function KiTransparenzPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'KI-Transparenz' }]} />

      <div className="card p-6 md:p-8">
      <h1 className="text-2xl md:text-3xl font-extrabold text-primary-700 dark:text-primary-300 mb-2">
        KI-Transparenz
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Auf Rechenfix.de wird an einigen Stellen künstliche Intelligenz eingesetzt — an anderen
        bewusst nicht. Diese Seite legt offen, wo, wofür und mit welchen Systemen. Sie erfüllt
        zugleich die Transparenzpflichten nach Artikel 50 der Verordnung (EU) 2024/1689
        (KI-Verordnung).
      </p>

      <Abschnitt titel="Wo KI eingesetzt wird">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-700 text-left">
                <th className="py-2 pr-4 font-semibold">Funktion</th>
                <th className="py-2 pr-4 font-semibold">Eingesetztes System</th>
                <th className="py-2 font-semibold">Was dabei passiert</th>
              </tr>
            </thead>
            <tbody className="align-top">
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <td className="py-3 pr-4 font-medium">KI-Rechner</td>
                <td className="py-3 pr-4">Claude (Anthropic PBC, USA)</td>
                <td className="py-3">
                  Ihre Frage wird an den KI-Dienst übertragen und dort verarbeitet. Die Antwort
                  wird von einem Sprachmodell erzeugt.
                </td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <td className="py-3 pr-4 font-medium">KI-Erklärung an Rechnern</td>
                <td className="py-3 pr-4">Claude (Anthropic PBC, USA)</td>
                <td className="py-3">
                  Auf Klick wird das Rechenergebnis an den KI-Dienst übertragen und eine
                  Erläuterung dazu erzeugt.
                </td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <td className="py-3 pr-4 font-medium">Titelbilder im Blog</td>
                <td className="py-3 pr-4">Gemini 3 Pro Image (Google-Modell), bezogen über Kling AI (Kuaishou Technology, China)</td>
                <td className="py-3">
                  Die Bilder sind vollständig künstlich erzeugt. Sie zeigen keine realen
                  Aufnahmen und keine realen Personen.
                </td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <td className="py-3 pr-4 font-medium">Videos im Blog</td>
                <td className="py-3 pr-4">Kling AI 3.0 (Kuaishou Technology, China)</td>
                <td className="py-3">
                  Die Videos sind vollständig künstlich erzeugt. Keine realen Aufnahmen,
                  keine realen Personen.
                </td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <td className="py-3 pr-4 font-medium">Blogartikel (Text)</td>
                <td className="py-3 pr-4">Claude (Anthropic PBC, USA)</td>
                <td className="py-3">
                  Entwürfe entstehen KI-gestützt. Jeder Artikel wird vor Veröffentlichung
                  inhaltlich geprüft, gegen die angegebenen Quellen abgeglichen und
                  redaktionell verantwortet (siehe unten).
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium">Erklärtexte an Rechnern</td>
                <td className="py-3 pr-4">Claude (Anthropic PBC, USA)</td>
                <td className="py-3">
                  Entwürfe entstehen KI-gestützt und werden vor Veröffentlichung inhaltlich
                  geprüft und redaktionell verantwortet.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Abschnitt>

      <Abschnitt titel="Wo bewusst keine KI eingesetzt wird">
        <p>
          <strong>Die Rechner selbst rechnen ohne KI.</strong> Jedes Ergebnis auf Rechenfix.de
          entsteht aus fest hinterlegten Formeln und Tabellen — deterministisch, nachvollziehbar
          und bei gleicher Eingabe immer gleich. An den Berechnungen der einzelnen Rechner
          ist kein Sprachmodell beteiligt. Für den KI-Rechner gilt das nicht — siehe unten.
          Das ist eine bewusste Entscheidung: Sprachmodelle rechnen nicht zuverlässig,
          und ein Rechner, dessen Ergebnis sich zwischen zwei Aufrufen unterscheidet, wäre
          wertlos.
        </p>
        <p>
          Der KI-Rechner ist die Ausnahme: Dort versteht die KI Ihre Frage, führt die Berechnung
          selbst durch und verweist anschließend auf den passenden Rechner für eine exakte
          Nachrechnung. Sein Ergebnis entsteht also nicht aus einer hinterlegten Formel und kann
          im Einzelfall abweichen. Verbindlich ist das Ergebnis des jeweiligen Rechners.
        </p>
      </Abschnitt>

      <Abschnitt titel="Was hier nicht stattfindet">
        <ul className="list-disc pl-5 space-y-2">
          <li>Keine automatisierte Entscheidung mit rechtlicher Wirkung im Sinne von Art. 22 DSGVO.</li>
          <li>Keine Emotionserkennung und keine biometrische Kategorisierung.</li>
          <li>Kein Profiling und keine Personalisierung von Inhalten durch KI.</li>
          <li>Keine KI-generierten Abbildungen realer, identifizierbarer Personen.</li>
          <li>Keine KI-generierten Kundenstimmen, Bewertungen oder Testimonials.</li>
        </ul>
      </Abschnitt>

      <Abschnitt titel="Kennzeichnung KI-generierter Inhalte">
        <p>
          Alle künstlich erzeugten Bilder und Videos auf dieser Website sind unmittelbar am
          Inhalt sichtbar als KI-generiert gekennzeichnet. Zusätzlich sind sie maschinenlesbar
          ausgezeichnet, sodass auch automatisierte Systeme sie als synthetische Medien erkennen
          können.
        </p>
        <p>
          Diese Kennzeichnung erfolgt unabhängig davon, ob sie im Einzelfall rechtlich zwingend
          wäre. Der Grundsatz hier lautet: im Zweifel kennzeichnen.
        </p>
      </Abschnitt>

      <Abschnitt titel="Redaktionelle Verantwortung">
        <p>
          Die redaktionelle Verantwortung für sämtliche veröffentlichten Texte trägt
          Karsten Kautz, Betreiber von Rechenfix.de. Kein Text erscheint ohne vorherige
          inhaltliche Prüfung: Zahlen werden gegen die angegebenen Quellen abgeglichen, Aussagen
          auf Plausibilität geprüft, und Entwürfe werden geändert oder verworfen, wenn sie der
          Prüfung nicht standhalten. Die Quellen jedes Blogartikels sind am Artikelende
          vollständig aufgeführt.
        </p>
        <p>
          Die vollständigen Kontaktdaten finden Sie im{' '}
          <Link href="/impressum" className="text-primary-600 dark:text-primary-400 underline">
            Impressum
          </Link>
          .
        </p>
      </Abschnitt>

      <Abschnitt titel="Datenübermittlung">
        <p>
          Die Nutzung der KI-Funktionen ist mit einer Übermittlung Ihrer Eingaben an
          Dienstleister außerhalb der EU verbunden. Welche Daten dabei an wen übermittelt werden,
          auf welcher Rechtsgrundlage das geschieht und welche Rechte Sie haben, steht in der{' '}
          <Link href="/datenschutz" className="text-primary-600 dark:text-primary-400 underline">
            Datenschutzerklärung
          </Link>
          .
        </p>
        <p>
          Die KI-Funktionen sind freiwillig. Sämtliche Rechner funktionieren vollständig ohne
          sie — ohne KI-Nutzung findet auch keine Übermittlung an den KI-Dienstleister statt.
        </p>
      </Abschnitt>

      <Abschnitt titel="Grenzen und Fehler">
        <p>
          KI-Systeme können falsche Angaben erzeugen, die überzeugend formuliert sind. Trotz
          redaktioneller Prüfung lässt sich nicht ausschließen, dass ein Fehler übersehen wird.
          Verlassen Sie sich bei rechtlich oder finanziell bedeutsamen Entscheidungen nicht
          allein auf Angaben dieser Website.
        </p>
        <p>
          Wenn Ihnen ein Fehler auffällt: Bitte melden Sie ihn über das Feedback-Feld am
          jeweiligen Rechner oder per E-Mail. Korrekturen werden zeitnah eingearbeitet.
        </p>
      </Abschnitt>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-12">Stand: {STAND}</p>
      </div>
    </div>
  );
}
