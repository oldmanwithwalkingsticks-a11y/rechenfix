import Breadcrumbs from '@/components/layout/Breadcrumbs';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description: 'Datenschutzerklärung von Rechenfix.de — Informationen zum Datenschutz gemäß DSGVO.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.rechenfix.de/datenschutz' },
  openGraph: {
    title: 'Datenschutzerklärung',
    description: 'Datenschutzerklärung von Rechenfix.de — Informationen zum Datenschutz gemäß DSGVO.',
    url: 'https://www.rechenfix.de/datenschutz',
    siteName: 'Rechenfix.de',
    type: 'website',
    locale: 'de_DE',
    images: [{ url: 'https://www.rechenfix.de/opengraph-image', width: 1200, height: 630, alt: 'Datenschutzerklärung — Rechenfix.de' }],
  },
};

export default function DatenschutzSeite() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Datenschutz' }]} />

      <div className="card p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary-700 dark:text-primary-300 mb-2">
          Datenschutzerklärung
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Stand: 17. August 2026</p>

        <div className="space-y-10 text-gray-700 dark:text-gray-300 text-[15px] leading-relaxed">

          {/* 1. Verantwortlicher */}
          <Section nr="1" titel="Verantwortlicher">
            <p>Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) und anderer nationaler Datenschutzgesetze sowie sonstiger datenschutzrechtlicher Bestimmungen ist:</p>
            <Adresse />
          </Section>

          {/* 2. Übersicht der Verarbeitungstätigkeiten */}
          <Section nr="2" titel="Übersicht der Verarbeitungstätigkeiten">
            <p>Die folgende Übersicht fasst die Arten der verarbeiteten Daten und die Zwecke ihrer Verarbeitung zusammen:</p>
            <ul className="list-disc pl-5 space-y-1 mt-3">
              <li>Bereitstellung der Website und Gewährleistung ihrer Funktionalität</li>
              <li>Hosting und technische Infrastruktur</li>
              <li>Anonyme Reichweitenmessung über Vercel Analytics (cookielos, ohne Personenbezug)</li>
              <li>Einbindung von Affiliate-Links</li>
              <li>Serverseitige, anonyme Nutzungsstatistik (Klicks, Feedback, Berechnungszähler, PDF-Downloads, KI-Nutzung)</li>
              <li>Kontaktaufnahme per E-Mail</li>
              <li>Optionale Offline-Nutzung über lokal gespeicherte Websitebestandteile</li>
              <li>Optionaler Rechenverlauf, der ausschließlich im Browser des Nutzers verbleibt</li>
            </ul>
          </Section>

          {/* 3. Rechtsgrundlagen */}
          <Section nr="3" titel="Rechtsgrundlagen der Verarbeitung">
            <p>Wir verarbeiten personenbezogene Daten auf Grundlage folgender Rechtsgrundlagen gemäß Art. 6 Abs. 1 DSGVO:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>
                <strong>Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO):</strong> Soweit die Verarbeitung zur Bereitstellung unserer kostenlosen Online-Rechner erforderlich ist.
              </li>
              <li>
                <strong>Berechtigte Interessen (Art. 6 Abs. 1 lit. f DSGVO):</strong> Für das Hosting der Website, die SSL/TLS-Verschlüsselung, die anonyme Reichweitenmessung über Vercel Analytics sowie die Einbindung von Affiliate-Links zur Finanzierung des Angebots.
              </li>
            </ul>
            <p className="mt-3">
              Für Speicherungen auf Ihrem Endgerät gilt zusätzlich <strong>§ 25 TDDDG</strong>. Diese Vorschrift schützt das Endgerät als solches, unabhängig davon, ob personenbezogene Daten betroffen sind. Die Offline-Nutzung und der Rechenverlauf beruhen dort auf <strong>Ihrer Einwilligung nach § 25 Abs. 1 TDDDG</strong>, die Sie über den jeweiligen Schalter erteilen und ebenso wieder zurücknehmen. Welche Speicherungen es im Einzelnen gibt und worauf sie beruhen, steht in Abschnitt 7.
            </p>
          </Section>

          {/* 4. SSL/TLS */}
          <Section nr="4" titel="SSL- bzw. TLS-Verschlüsselung">
            <p>
              Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung personenbezogener Daten eine SSL- bzw. TLS-Verschlüsselung. Sie erkennen eine verschlüsselte Verbindung am Schloss-Symbol in der Browserzeile und daran, dass die Adresszeile mit <em>https://</em> beginnt.
            </p>
            <p className="mt-3">
              Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.
            </p>
          </Section>

          {/* 5. Hosting */}
          <Section nr="5" titel="Hosting">
            <p>
              Diese Website wird bei <strong>Vercel Inc.</strong> (440 N Barranca Avenue #4133, Covina, CA 91723, USA) gehostet. Beim Besuch unserer Website erfasst Vercel automatisch technische Zugriffsdaten in sogenannten Server-Logfiles. Dazu gehören:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-3">
              <li>IP-Adresse des zugreifenden Geräts</li>
              <li>Datum und Uhrzeit des Zugriffs</li>
              <li>Aufgerufene Seite bzw. Datei</li>
              <li>Übertragene Datenmenge</li>
              <li>Browsertyp und -version</li>
              <li>Betriebssystem</li>
              <li>Referrer-URL</li>
            </ul>
            <p className="mt-3">
              Die Verarbeitung erfolgt auf Grundlage unseres berechtigten Interesses an einer sicheren und effizienten Bereitstellung der Website (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
            <Hinweisbox>
              <strong>Datenübermittlung in die USA:</strong> Vercel Inc. ist unter dem EU-US Data Privacy Framework (DPF) zertifiziert, wodurch ein angemessenes Datenschutzniveau im Sinne von Art. 45 DSGVO gewährleistet wird. Weitere Informationen finden Sie unter{' '}
              <a href="https://www.dataprivacyframework.gov" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 underline">
                dataprivacyframework.gov
              </a>.
            </Hinweisbox>
          </Section>

          {/* 6. Vercel Analytics */}
          <Section nr="6" titel="Vercel Analytics (anonyme Reichweitenmessung)">
            <p>
              Wir nutzen <strong>Vercel Analytics</strong>, einen Dienst der Vercel Inc. (440 N Barranca Avenue #4133, Covina, CA 91723, USA), zur anonymen Reichweitenmessung. Vercel Analytics erfasst aggregierte Nutzungsdaten wie Seitenaufrufe, Verweildauer, ungefähren Standort (Land), Gerätekategorie sowie Referrer.
            </p>
            <p className="mt-3">
              Die Messung erfolgt <strong>cookielos</strong> und <strong>ohne Personenbezug</strong>. IP-Adressen werden nicht gespeichert; statt eindeutiger Kennungen wird ein anonymer Tageshash gebildet, der keine wiederkehrenden Nutzer identifiziert. Es findet kein Tracking über Geräte oder Sitzungen hinweg statt.
            </p>
            <p className="mt-3">
              Da keine personenbezogenen Daten verarbeitet werden, ist eine Einwilligung nach § 25 TDDDG nicht erforderlich. Rechtsgrundlage für die Verarbeitung ist unser berechtigtes Interesse an einer datensparsamen Messung der Reichweite und Performance unseres Angebots gemäß Art. 6 Abs. 1 lit. f DSGVO.
            </p>
            <p className="mt-3">
              Weitere Informationen finden Sie in den{' '}
              <a href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 underline">
                Datenschutzhinweisen zu Vercel Analytics
              </a>.
            </p>
          </Section>

          {/* 7. Cookies */}
          <Section nr="7" titel="Cookies und Speicherung auf Ihrem Endgerät">
            <p>
              Diese Website setzt <strong>keine Cookies zu Werbe- oder Analysezwecken</strong> ein und bindet keine Dienste Dritter ein, die auf Ihr Endgerät zugreifen. Im Browser gespeichert wird ausschließlich, was Sie selbst einschalten: Ihre Darstellungseinstellung, die Offline-Nutzung und &mdash; falls von Ihnen aktiviert &mdash; Ihr Rechenverlauf. Diese Angaben verlassen Ihr Gerät nicht.
            </p>
            <p className="mt-3">
              Beim gewöhnlichen Besuch dieser Website wird nichts auf Ihrem Gerät abgelegt. Deshalb gibt es auch keinen Einwilligungsbanner: Über jede Speicherung entscheiden Sie dort, wo die zugehörige Funktion steht. Schalten Sie eine Funktion wieder ab, werden die dazu gespeicherten Angaben gelöscht.
            </p>

            <h3 className="font-bold text-gray-800 dark:text-gray-100 mt-6 mb-2">7.1 Was im Einzelnen gespeichert wird</h3>
            <div className="overflow-x-auto mt-3">
              <table className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/50">
                    <th className="text-left p-3 font-semibold text-gray-800 dark:text-gray-200">Was</th>
                    <th className="text-left p-3 font-semibold text-gray-800 dark:text-gray-200">Wodurch ausgelöst</th>
                    <th className="text-left p-3 font-semibold text-gray-800 dark:text-gray-200">Rechtsgrundlage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="p-3">Darstellungseinstellung (heller oder dunkler Modus)</td>
                    <td className="p-3">Ihr Klick auf den Umschalter im Seitenkopf</td>
                    <td className="p-3">§ 25 Abs. 2 Nr. 2 TDDDG</td>
                  </tr>
                  <tr>
                    <td className="p-3">Ihre Entscheidung zur Offline-Nutzung und die dafür gespeicherten Websitebestandteile (siehe Abschnitt 7a)</td>
                    <td className="p-3">Ihr Schalter auf der Seite Offline-Nutzung; im installierten Zustand der Start über das Symbol</td>
                    <td className="p-3">§ 25 Abs. 1 TDDDG bzw. § 25 Abs. 2 Nr. 2 TDDDG</td>
                  </tr>
                  <tr>
                    <td className="p-3">Rechenverlauf im Prozentrechner (siehe Abschnitt 7b)</td>
                    <td className="p-3">Ihr Schalter unterhalb der Verlaufsanzeige</td>
                    <td className="p-3">§ 25 Abs. 1 TDDDG</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Vercel Analytics ist nicht in dieser Tabelle aufgeführt, da der Dienst cookielos arbeitet (siehe Abschnitt 6).
              </p>
            </div>
          </Section>

          {/* 7a. Offline-Nutzung (Service Worker) */}
          <Section nr="7a" titel="Offline-Nutzung (Service Worker)">
            <p>
              Rechenfix.de bietet die Möglichkeit, Seiten für die Nutzung ohne Internetverbindung auf Ihrem Endgerät zu speichern. Technisch geschieht dies über einen sogenannten <strong>Service Worker</strong> — ein kleines Programm, das Ihr Browser lokal ausführt — sowie über einen zugehörigen Zwischenspeicher.
            </p>

            <h3 className="font-bold text-gray-800 dark:text-gray-100 mt-6 mb-2">7a.1 Was gespeichert wird</h3>
            <p>
              Gespeichert werden ausschließlich Bestandteile dieser Website: Seiteninhalte, Programmcode, Gestaltungsangaben, Bilder und Schriften. <strong>Ihre Eingaben in die Rechner werden nicht gespeichert und nicht übertragen</strong>; sie werden ausschließlich in Ihrem Browser verarbeitet und verlassen Ihr Gerät nicht.
            </p>
            <p className="mt-3">
              Es findet keine Analyse Ihres Nutzungsverhaltens statt, es werden keine Kennungen vergeben, und es werden keine Daten an uns oder an Dritte übermittelt. Die gespeicherten Inhalte verbleiben auf Ihrem Gerät.
            </p>

            <h3 className="font-bold text-gray-800 dark:text-gray-100 mt-6 mb-2">7a.2 Wann dies geschieht</h3>
            <p>
              Beim gewöhnlichen Besuch dieser Website wird <strong>nichts</strong> gespeichert. Die Funktion wird erst aktiv, wenn Sie sie auf der Seite{' '}
              <Link href="/offline-nutzung" className="text-primary-600 dark:text-primary-400 hover:underline">
                Offline-Nutzung
              </Link>{' '}
              ausdrücklich einschalten, oder wenn Sie Rechenfix zuvor auf Ihrem Startbildschirm abgelegt haben und die Website über dieses Symbol starten.
            </p>

            <h3 className="font-bold text-gray-800 dark:text-gray-100 mt-6 mb-2">7a.3 Rechtsgrundlage</h3>
            <p>
              Für die Aktivierung über den Schalter: Ihre Einwilligung nach <strong>§ 25 Abs. 1 TDDDG</strong>. Beim Start aus dem installierten Zustand: <strong>§ 25 Abs. 2 Nr. 2 TDDDG</strong>, da die Speicherung dann unbedingt erforderlich ist, um den von Ihnen ausdrücklich gewünschten Dienst — die Nutzung ohne Internetverbindung — bereitzustellen.
            </p>
            <p className="mt-3">
              Eine Verarbeitung personenbezogener Daten im Sinne der Datenschutz-Grundverordnung ist mit der Offline-Funktion nicht verbunden. § 25 TDDDG schützt das Endgerät als solches und gilt unabhängig davon, ob ein Personenbezug vorliegt.
            </p>

            <h3 className="font-bold text-gray-800 dark:text-gray-100 mt-6 mb-2">7a.4 Speicherdauer und Widerruf</h3>
            <p>
              Die gespeicherten Inhalte bleiben erhalten, bis sie durch eine neuere Fassung der Website ersetzt werden, bis Sie die Websitedaten in Ihrem Browser löschen oder bis Sie die Funktion abschalten.
            </p>
            <p className="mt-3">
              Sie können die Offline-Nutzung jederzeit auf der Seite{' '}
              <Link href="/offline-nutzung" className="text-primary-600 dark:text-primary-400 hover:underline">
                Offline-Nutzung
              </Link>{' '}
              wieder abschalten. Dabei werden der Service Worker abgemeldet und sämtliche zugehörigen Zwischenspeicher gelöscht. Der Widerruf ist damit ebenso einfach möglich wie die Erteilung.
            </p>

            <h3 className="font-bold text-gray-800 dark:text-gray-100 mt-6 mb-2">7a.5 Hinweis zur Aktualität</h3>
            <p>
              Solange eine Internetverbindung besteht, wird jede Seite frisch geladen; Sie sehen dann stets den aktuellen Stand. Gespeicherte Fassungen werden ausschließlich dann angezeigt, wenn keine Verbindung erreichbar ist. Da zahlreiche Berechnungen auf gesetzlich festgelegten Werten beruhen, die sich ändern können, sollten Sie Ergebnisse, auf die es ankommt, mit bestehender Verbindung erneut prüfen.
            </p>
          </Section>

          {/* 7b. Rechenverlauf */}
          <Section nr="7b" titel="Rechenverlauf (optional)">
            <p>
              Einzelne Rechner &mdash; derzeit der{' '}
              <Link href="/alltag/prozentrechner" className="text-primary-600 dark:text-primary-400 hover:underline">
                Prozentrechner
              </Link>{' '}
              &mdash; können Ihre letzten Ergebnisse als Verlauf anzeigen. Ob dieser Verlauf über die laufende Sitzung hinaus auf Ihrem Gerät erhalten bleibt, entscheiden Sie selbst.
            </p>

            <h3 className="font-bold text-gray-800 dark:text-gray-100 mt-6 mb-2">7b.1 Was gespeichert wird</h3>
            <p>
              Gespeichert werden höchstens die <strong>fünf zuletzt angezeigten Ergebnisse</strong> des jeweiligen Rechners: die Beschriftung der Rechnung, das Ergebnis, die gewählte Rechenart und die Uhrzeit. <strong>Ihre Eingaben werden darüber hinaus nicht gespeichert und nicht übertragen</strong>; sie werden ausschließlich in Ihrem Browser verarbeitet und verlassen Ihr Gerät nicht.
            </p>
            <p className="mt-3">
              Es findet keine Analyse Ihres Nutzungsverhaltens statt, es werden keine Kennungen vergeben, und es werden keine Daten an uns oder an Dritte übermittelt. Die gespeicherten Angaben verbleiben auf Ihrem Gerät.
            </p>

            <h3 className="font-bold text-gray-800 dark:text-gray-100 mt-6 mb-2">7b.2 Wann dies geschieht</h3>
            <p>
              Beim gewöhnlichen Benutzen des Rechners wird <strong>nichts</strong> auf Ihrem Gerät abgelegt. Der Verlauf besteht dann allein im Arbeitsspeicher und endet, sobald Sie die Seite verlassen. Erst wenn Sie den Schalter <em>&bdquo;Rechenverlauf auf diesem Gerät speichern&ldquo;</em> unterhalb der Verlaufsanzeige einschalten, wird er dauerhaft abgelegt.
            </p>

            <h3 className="font-bold text-gray-800 dark:text-gray-100 mt-6 mb-2">7b.3 Rechtsgrundlage</h3>
            <p>
              Für die Aktivierung über den Schalter: Ihre Einwilligung nach <strong>§ 25 Abs. 1 TDDDG</strong>. Sie erteilen sie, indem Sie den Schalter einschalten; ohne diese Handlung wird nichts auf Ihrem Gerät abgelegt.
            </p>
            <p className="mt-3">
              Eine Verarbeitung personenbezogener Daten im Sinne der Datenschutz-Grundverordnung ist mit dem Rechenverlauf nicht verbunden. § 25 TDDDG schützt das Endgerät als solches und gilt unabhängig davon, ob ein Personenbezug vorliegt.
            </p>

            <h3 className="font-bold text-gray-800 dark:text-gray-100 mt-6 mb-2">7b.4 Speicherdauer und Widerruf</h3>
            <p>
              Der Verlauf bleibt erhalten, bis Sie ihn abschalten oder die Websitedaten in Ihrem Browser löschen. Beim <strong>Abschalten werden sowohl der gespeicherte Verlauf als auch das Kennzeichen Ihrer Entscheidung gelöscht</strong> und die Anzeige geleert. Der Widerruf ist damit ebenso einfach möglich wie die Erteilung.
            </p>
            <p className="mt-3">
              Verläufe, die vor der Einführung dieses Schalters ohne Ihre Entscheidung angelegt wurden, werden beim ersten Aufruf des Rechners automatisch gelöscht.
            </p>
          </Section>

          {/* 8. Affiliate-Links und Werbung */}
          <Section nr="8" titel="Affiliate-Links und Werbung">
            <p>
              Einige Seiten auf rechenfix.de enthalten Empfehlungen und Links zu Produkten und Dienstleistungen Dritter (sog. Affiliate-Links). Diese Links sind als &bdquo;Anzeige&ldquo; gekennzeichnet. Wenn Sie auf einen solchen Link klicken und ein Produkt kaufen oder einen Vertrag abschließen, erhalten wir möglicherweise eine Provision vom Anbieter. Für Sie entstehen dabei keine zusätzlichen Kosten.
            </p>
            <p className="mt-3">
              Die Auswahl der empfohlenen Produkte erfolgt redaktionell und unabhängig. Die Platzierung von Affiliate-Links beeinflusst nicht die Ergebnisse unserer Rechner.
            </p>
            <p className="mt-3">Wir arbeiten derzeit mit folgenden Partnerprogrammen (über das Awin-Netzwerk):</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>
                <strong>congstar</strong> (Mobilfunk)
              </li>
              <li>
                <strong>Lexware Office</strong> (Buchhaltungssoftware)
              </li>
              <li>
                <strong>WISO Steuer / Buhl Data</strong> (Steuersoftware)
              </li>
              <li>
                <strong>smartsteuer</strong> (Online-Steuererklärung)
              </li>
              <li>
                <strong>CHECK24</strong> (Vergleichsportal)
              </li>
              <li>
                <strong>KS Auxilia</strong> (Rechtsschutzversicherung)
              </li>
              <li>
                <strong>Verivox</strong> (Vergleichsportal)
              </li>
            </ul>
            <p className="mt-3">
              Bei Klick auf einen Affiliate-Link werden Sie auf die Website des Anbieters weitergeleitet. Dort gelten die Datenschutzbestimmungen des jeweiligen Anbieters. Die Affiliate-Links werden über das Netzwerk der <strong>Awin AG</strong> (Eichhornstraße 3, 10785 Berlin) vermittelt. Awin kann dabei einen Tracking-Cookie setzen, um die Zuordnung des Kaufs zu ermöglichen.
            </p>
            <p className="mt-3">
              Zusätzlich speichern wir bei Klick auf einen Affiliate-Link anonymisierte Klickdaten (Programm-ID, Rechner-Seitenpfad, Zeitstempel und Kontext der angeklickten Fläche) auf unserem Server, um die Nutzung der Empfehlungen intern statistisch auszuwerten. Es werden <strong>keine IP-Adressen, keine User-Agents und keine sonstigen personenbezogenen Daten</strong> gespeichert. Eine Zuordnung zu einer konkreten Person ist uns nicht möglich. Zu den Angaben, die beim Absenden des Feedback-Formulars übermittelt werden, siehe Abschnitt 11. Die technische Speicherung erfolgt bei unserem Auftragsverarbeiter <strong>Upstash, Inc.</strong> in einer Redis-Datenbank mit Standort in der Europäischen Union (Frankfurt/Irland). Mit Upstash besteht ein Auftragsverarbeitungsvertrag gemäß Art. 28 DSGVO. Die Liste ist auf maximal 20.000 Einträge begrenzt; ältere Einträge werden automatisch überschrieben.
            </p>
            <p className="mt-3">
              Die Einbindung von Affiliate-Links erfolgt auf Grundlage unseres berechtigten Interesses an der Finanzierung unseres kostenlosen Angebots (Art. 6 Abs. 1 lit. f DSGVO). Affiliate-Links sind auf unserer Website stets als &bdquo;Anzeige&ldquo; gekennzeichnet.
            </p>
          </Section>

          {/* 8a. Serverseitige Nutzungsstatistik */}
          <Section nr="8a" titel="Serverseitige Nutzungsstatistik (Upstash Redis)">
            <p>
              Um unser Angebot zu verbessern und die Nutzung nachvollziehen zu können, speichern wir ausgewählte anonyme Nutzungsereignisse auf unserem Server. Konkret verarbeiten wir:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-3">
              <li><strong>Berechnungszähler:</strong> Ein einfacher, aggregierter Zählerstand, der bei jeder durchgeführten Berechnung um 1 erhöht wird. Es wird ausschließlich eine einzelne Zahl gespeichert — keine Zuordnung zu einer Person, Sitzung oder einem Gerät.</li>
              <li><strong>Affiliate-Klicks:</strong> Programm-ID, Rechner-Seitenpfad, Zeitstempel sowie der Kontext der angeklickten Fläche (etwa die gewählte Tarifart), höchstens 100 Zeichen (siehe Abschnitt 8).</li>
              <li><strong>Rechner-Feedback:</strong> Wenn Sie auf den &bdquo;Daumen hoch&ldquo;/&bdquo;Daumen runter&ldquo;-Button unter einem Rechner klicken, speichern wir die Bewertung (ja/nein), den Pfad des Rechners und den Zeitstempel. Bei negativem Feedback können Sie zusätzlich freiwillig einen Freitext-Hinweis absenden. Dieser wird <strong>nicht</strong> in der Nutzungsstatistik gespeichert, sondern ausschließlich per E-Mail an uns übermittelt; Näheres dazu in Abschnitt 11. Geben Sie dort bitte keine personenbezogenen Daten ein.</li>
              <li><strong>PDF-Downloads:</strong> Wenn Sie ein Ergebnis als PDF herunterladen, speichern wir die Bezeichnung des Rechners und den Zeitstempel. Der Inhalt des PDFs und die zugrunde liegenden Eingaben werden dabei nicht übertragen; das PDF entsteht ausschließlich in Ihrem Browser.</li>
              <li><strong>Nutzung der KI-Funktionen:</strong> Wenn Sie eine KI-Funktion auslösen (etwa &bdquo;Fix erklärt&ldquo; oder den KI-Rechner), speichern wir die Bezeichnung der Funktion, die Bezeichnung des Rechners, ob die Anfrage erfolgreich war, und den Zeitstempel. <strong>Ihre Eingaben, Ihre Frage und die erzeugte Antwort werden dabei nicht gespeichert.</strong> Zur Übermittlung an unseren KI-Dienstleister siehe Abschnitt 9.</li>
            </ul>
            <p className="mt-3">
              Für diese Nutzungsstatistik gilt: Wir erfassen dabei <strong>keine IP-Adressen, keine User-Agents, keine Cookies und keine sonstigen Merkmale</strong>, die einen Rückschluss auf Ihre Person erlauben würden. Eine Identifizierung einzelner Nutzer ist für uns anhand dieser Daten technisch nicht möglich. Zu den Angaben, die beim Absenden des Feedback-Formulars übermittelt werden, siehe Abschnitt 11.
            </p>
            <p className="mt-3">
              Die technische Speicherung erfolgt in einer Redis-Datenbank bei <strong>Upstash, Inc.</strong> (Auftragsverarbeiter gemäß Art. 28 DSGVO). Der Datenbank-Standort liegt innerhalb der Europäischen Union (Frankfurt/Irland). Die Listen sind auf jeweils 20.000 Einträge begrenzt, ältere Einträge werden automatisch überschrieben.
            </p>
            <p className="mt-3">
              Rechtsgrundlage ist unser berechtigtes Interesse an einer anonymen Auswertung der Nutzung zur Verbesserung unseres kostenlosen Angebots sowie an der Finanzierung über Affiliate-Partnerschaften (Art. 6 Abs. 1 lit. f DSGVO). Da keine personenbezogenen Daten verarbeitet werden, ist eine Einwilligung nicht erforderlich.
            </p>
          </Section>

          {/* 9. KI-Funktionen */}
          <Section nr="9" titel="KI-Funktionen (KI-Rechner und KI-Erklärungen)">
            <p>
              Rechenfix.de bietet KI-gestützte Funktionen an: den <strong>KI-Rechner</strong>, bei dem Sie
              eine Rechenfrage in natürlicher Sprache stellen können, sowie <strong>KI-Erklärungen</strong>,
              die auf Klick eine Erläuterung zu einem Rechenergebnis erzeugen. Beide Funktionen sind
              freiwillig. Alle Rechner funktionieren vollständig ohne sie.
            </p>
            <p className="mt-3">
              Wenn Sie eine dieser Funktionen nutzen, werden die dafür erforderlichen Daten an unseren
              Dienstleister übermittelt und dort verarbeitet:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-1">
              <li><strong>Beim KI-Rechner:</strong> der von Ihnen eingegebene Fragetext (maximal 500 Zeichen)</li>
              <li><strong>Bei KI-Erklärungen:</strong> die Bezeichnung des Rechners sowie die eingegebenen und berechneten Werte</li>
              <li>technisch notwendige Verbindungsdaten</li>
            </ul>
            <p className="mt-3">
              Dienstleister ist <strong>Anthropic PBC, 500 Howard Street, San Francisco, CA 94105, USA</strong>.
              Anthropic verarbeitet die Daten für uns als Auftragsverarbeiter auf Grundlage eines
              Auftragsverarbeitungsvertrags. Rechtsgrundlage ist unser berechtigtes Interesse an einer
              verständlichen und komfortablen Bedienung (Art. 6 Abs. 1 lit. f DSGVO); durch das bewusste
              Auslösen der Funktion entscheiden Sie selbst über deren Nutzung.
            </p>
            <p className="mt-3">
              <strong>Ihre Eingaben werden von uns nicht gespeichert.</strong> Um Missbrauch zu begrenzen,
              halten wir lediglich einen Zähler der Anfragen je Gerät für die Dauer einer Stunde vor; er
              wird danach automatisch gelöscht. Der Inhalt Ihrer Frage wird dabei nicht erfasst.
            </p>
            <p className="mt-3">
              <strong>Bitte geben Sie in die KI-Funktionen keine personenbezogenen Daten ein</strong> — weder
              zu Ihrer eigenen Person noch zu Dritten. Für die Berechnung sind sie nicht erforderlich.
            </p>
            <Hinweisbox>
              <strong>Datenübermittlung in die USA:</strong> Die Übermittlung an Anthropic PBC erfolgt auf
              Grundlage der von der EU-Kommission erlassenen Standardvertragsklauseln nach Art. 46 Abs. 2
              lit. c DSGVO, die Bestandteil des Auftragsverarbeitungsvertrags sind. Ein dem europäischen
              Niveau entsprechender Datenschutz kann für Übermittlungen in die USA trotz dieser Garantien
              nicht vollständig gewährleistet werden; insbesondere ist ein Zugriff durch US-Behörden nicht
              in jedem Fall auszuschließen. Sie können die Übermittlung vollständig vermeiden, indem Sie die
              KI-Funktionen nicht nutzen.
            </Hinweisbox>
            <p className="mt-3">
              Welche KI-Systeme an welcher Stelle eingesetzt werden und wo bewusst auf KI verzichtet wird,
              legen wir gesondert auf der Seite{' '}
              <a href="/ki-transparenz" className="text-primary-600 dark:text-primary-400 underline">
                KI-Transparenz
              </a>{' '}
              offen.
            </p>
          </Section>

          {/* 10. Social Media */}
          <Section nr="10" titel="Präsenzen in sozialen Netzwerken">
            <p>
              Wir unterhalten öffentlich zugängliche Profile in sozialen Netzwerken, um über unsere Rechner und Inhalte zu informieren und mit interessierten Nutzern zu kommunizieren. Konkret betreiben wir Auftritte bei Instagram, Facebook, TikTok und YouTube (jeweils unter dem Namen &bdquo;rechenfix&ldquo;).
            </p>
            <p className="mt-3">
              Wenn Sie eines dieser Profile aufrufen oder damit interagieren (z.&nbsp;B. Abonnieren, Kommentieren, Liken, Teilen), verarbeitet der jeweilige Plattformbetreiber personenbezogene Daten von Ihnen — etwa Ihre IP-Adresse, Geräteinformationen und, sofern Sie bei der Plattform eingeloggt sind, Ihre dortigen Profildaten. Diese Verarbeitung erfolgt nach den Datenschutzbestimmungen des jeweiligen Anbieters; auf ihren Umfang und ihre Zwecke haben wir keinen Einfluss. Dabei können Daten auch in Länder außerhalb der EU (insbesondere in die USA) übertragen werden.
            </p>
            <p className="mt-3">Anbieter der Plattformen und weiterführende Datenschutzinformationen:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>
                <strong>Instagram &amp; Facebook:</strong> Meta Platforms Ireland Limited, 4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland —{' '}
                <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 underline">
                  Datenschutzrichtlinie von Meta
                </a>
              </li>
              <li>
                <strong>TikTok:</strong> TikTok Technology Limited, 10 Earlsfort Terrace, Dublin, D02 T380, Irland (gemeinsam mit TikTok Information Technologies UK Limited) —{' '}
                <a href="https://www.tiktok.com/legal/page/eea/privacy-policy/de" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 underline">
                  Datenschutzrichtlinie von TikTok
                </a>
              </li>
              <li>
                <strong>YouTube:</strong> Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland —{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 underline">
                  Datenschutzerklärung von Google
                </a>
              </li>
            </ul>
            <p className="mt-3">
              Soweit wir gemeinsam mit den Plattformbetreibern verantwortlich sind — dies betrifft insbesondere die uns von Meta (&bdquo;Seiten-Insights&ldquo;) und TikTok (&bdquo;TikTok Analytics&ldquo;) bereitgestellten anonymisierten Nutzungsstatistiken unserer Auftritte — geschieht dies auf Grundlage von Vereinbarungen zur gemeinsamen Verantwortlichkeit gemäß Art. 26 DSGVO. Wir erhalten dabei ausschließlich aggregierte, nicht auf einzelne Personen rückführbare Auswertungen. Die Datenverarbeitung beim Besuch unserer YouTube-Präsenz erfolgt in alleiniger Verantwortung von Google.
            </p>
            <p className="mt-3">
              Rechtsgrundlage für den Betrieb unserer Social-Media-Präsenzen ist unser berechtigtes Interesse an Öffentlichkeitsarbeit und Kommunikation gemäß Art. 6 Abs. 1 lit. f DSGVO. Soweit Sie gegenüber dem jeweiligen Anbieter eine Einwilligung erteilt haben, ist zusätzlich Art. 6 Abs. 1 lit. a DSGVO Rechtsgrundlage.
            </p>
            <p className="mt-3">
              Ihre Betroffenenrechte (siehe Abschnitt &bdquo;Ihre Rechte als betroffene Person&ldquo;) können Sie sowohl uns gegenüber als auch unmittelbar gegenüber dem jeweiligen Plattformbetreiber geltend machen. Da wir auf die plattformseitige Verarbeitung nur eingeschränkten Zugriff haben, empfehlen wir, entsprechende Anliegen direkt an den jeweiligen Anbieter zu richten. Unsere Inhalte erreichen Sie weitgehend auch direkt und ohne diese Verarbeitung über{' '}
              <a href="https://www.rechenfix.de" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 underline">
                www.rechenfix.de
              </a>.
            </p>
          </Section>

          {/* 11. Kontakt per E-Mail */}
          <Section nr="11" titel="Kontaktaufnahme per E-Mail">
            <p>
              Wenn Sie uns per E-Mail kontaktieren, werden die von Ihnen mitgeteilten Daten (z.&nbsp;B. Name, E-Mail-Adresse, Inhalt der Anfrage) von uns gespeichert und verarbeitet, um Ihre Anfrage zu beantworten.
            </p>
            <p className="mt-3">
              Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung Ihrer Anfrage). Ihre Daten werden gelöscht, sobald die Anfrage abschließend bearbeitet ist und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
            </p>
            <p className="mt-3">
              Im Feedback-Feld unter jedem Rechner können Sie uns freiwillig eine E-Mail-Adresse
              hinterlassen, damit wir bei Rückfragen auf Ihre Rückmeldung antworten können. Die
              Angabe ist optional — das Feedback lässt sich auch vollständig ohne sie absenden.
              Rechtsgrundlage ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO, die Sie
              jederzeit widerrufen können. Wir verwenden die Adresse ausschließlich zur Beantwortung
              Ihrer Rückmeldung und löschen sie, sobald die Anfrage erledigt ist.
            </p>
            <p className="mt-3">
              Für den Versand von E-Mails, die aus Formularen dieser Website ausgelöst werden — etwa
              Rückmeldungen über das Feedback-Feld —, nutzen wir den Dienst <strong>Resend</strong> der
              Resend, Inc. (USA). Übermittelt werden dabei der Inhalt Ihrer Nachricht, technische Angaben
              zu Ihrem Browser (User-Agent) sowie, sofern von Ihnen angegeben, Ihre E-Mail-Adresse. Der
              User-Agent hilft uns, gemeldete Darstellungs- und Bedienfehler nachzuvollziehen;
              Rechtsgrundlage ist unser berechtigtes Interesse an der Fehlerbehebung nach
              Art. 6 Abs. 1 lit. f DSGVO.
            </p>
            <Hinweisbox>
              <strong>Datenübermittlung in die USA:</strong> Die Übermittlung an Resend, Inc. erfolgt auf
              Grundlage der Standardvertragsklauseln nach Art. 46 Abs. 2 lit. c DSGVO. Es gelten dieselben
              Einschränkungen wie im Abschnitt zu den KI-Funktionen beschrieben.
            </Hinweisbox>
          </Section>

          {/* 12. Rechte der Betroffenen */}
          <Section nr="12" titel="Ihre Rechte als betroffene Person">
            <p>Sie haben gemäß DSGVO folgende Rechte hinsichtlich Ihrer personenbezogenen Daten:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>
                <strong>Recht auf Auskunft (Art. 15 DSGVO):</strong> Sie können Auskunft darüber verlangen, ob und welche personenbezogenen Daten wir von Ihnen verarbeiten.
              </li>
              <li>
                <strong>Recht auf Berichtigung (Art. 16 DSGVO):</strong> Sie können die Berichtigung unrichtiger oder die Vervollständigung unvollständiger Daten verlangen.
              </li>
              <li>
                <strong>Recht auf Löschung (Art. 17 DSGVO):</strong> Sie können die Löschung Ihrer personenbezogenen Daten verlangen, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
              </li>
              <li>
                <strong>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO):</strong> Sie können unter bestimmten Voraussetzungen die Einschränkung der Verarbeitung Ihrer Daten verlangen.
              </li>
              <li>
                <strong>Recht auf Datenübertragbarkeit (Art. 20 DSGVO):</strong> Sie haben das Recht, Ihre Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten oder deren Übermittlung an einen anderen Verantwortlichen zu verlangen.
              </li>
              <li>
                <strong>Widerspruchsrecht (Art. 21 DSGVO):</strong> Sie können der Verarbeitung Ihrer Daten jederzeit widersprechen, sofern die Verarbeitung auf Art. 6 Abs. 1 lit. f DSGVO beruht. Wir verarbeiten Ihre Daten dann nicht mehr, es sei denn, wir können zwingende schutzwürdige Gründe nachweisen.
              </li>
            </ul>
            <p className="mt-3">
              Zur Ausübung Ihrer Rechte wenden Sie sich bitte per E-Mail an:{' '}
              <a href="mailto:info@rechenfix.de" className="text-primary-600 dark:text-primary-400 underline">
                info@rechenfix.de
              </a>
            </p>
          </Section>

          {/* 13. Widerrufsrecht */}
          <Section nr="13" titel="Widerrufsrecht für erteilte Einwilligungen">
            <p>
              Gemäß Art. 7 Abs. 3 DSGVO haben Sie das Recht, eine einmal erteilte Einwilligung jederzeit mit Wirkung für die Zukunft zu widerrufen. Die Rechtmäßigkeit der aufgrund der Einwilligung bis zum Widerruf erfolgten Verarbeitung wird dadurch nicht berührt.
            </p>
            <p className="mt-3">
              Über jede Speicherung auf Ihrem Endgerät entscheiden Sie unmittelbar dort, wo die zugehörige Funktion steht. Einen Einwilligungsbanner gibt es nicht, weil beim gewöhnlichen Besuch nichts gespeichert wird. Die einzelnen Schalter finden Sie hier:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-3">
              <li>
                <strong>Darstellung (heller oder dunkler Modus):</strong> Umschalter im Seitenkopf
              </li>
              <li>
                <strong>Offline-Nutzung:</strong> auf der Seite{' '}
                <Link href="/offline-nutzung" className="text-primary-600 dark:text-primary-400 hover:underline">Offline-Nutzung</Link>{' '}
                &mdash; Abschalten löscht zugleich alle gespeicherten Inhalte
              </li>
              <li>
                <strong>Rechenverlauf:</strong> Schalter unterhalb der Verlaufsanzeige im jeweiligen Rechner &mdash; Abschalten löscht den gespeicherten Verlauf
              </li>
              <li>Darüber hinaus können Sie die Websitedaten jederzeit in Ihrem Browser löschen</li>
              <li>Oder uns per E-Mail an <a href="mailto:info@rechenfix.de" className="text-primary-600 dark:text-primary-400 underline">info@rechenfix.de</a> kontaktieren</li>
            </ul>
          </Section>

          {/* 14. Beschwerderecht */}
          <Section nr="14" titel="Recht auf Beschwerde bei einer Aufsichtsbehörde">
            <p>
              Gemäß Art. 77 DSGVO haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren, wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten gegen die DSGVO verstößt.
            </p>
            <p className="mt-3">Die für uns zuständige Aufsichtsbehörde ist:</p>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mt-3">
              <p className="font-semibold text-gray-800 dark:text-gray-100">Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen</p>
              <p>Kavalleriestraße 2–4</p>
              <p>40213 Düsseldorf</p>
              <p className="mt-2">
                Website:{' '}
                <a href="https://www.ldi.nrw.de" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 underline">
                  www.ldi.nrw.de
                </a>
              </p>
            </div>
          </Section>

          {/* 15. Änderungen */}
          <Section nr="15" titel="Änderungen dieser Datenschutzerklärung">
            <p>
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um sie an geänderte Rechtslagen oder bei Änderungen des Dienstes bzw. der Datenverarbeitung anzupassen. Die aktuelle Version ist stets auf dieser Seite abrufbar.
            </p>
          </Section>

        </div>
      </div>
    </div>
  );
}

function Section({ nr, titel, children }: { nr: string; titel: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
        {nr}. {titel}
      </h2>
      {children}
    </section>
  );
}

function Adresse() {
  return (
    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mt-3">
      <p className="font-semibold text-gray-800 dark:text-gray-100">Karsten Kautz</p>
      <p>Dülkener Straße 35</p>
      <p>47804 Krefeld</p>
      <p className="mt-2">
        E-Mail:{' '}
        <a href="mailto:info@rechenfix.de" className="text-primary-600 dark:text-primary-400 underline">
          info@rechenfix.de
        </a>
      </p>
    </div>
  );
}

function Hinweisbox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/30 rounded-xl p-4 mt-4 text-sm">
      {children}
    </div>
  );
}
