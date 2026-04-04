import Breadcrumbs from '@/components/layout/Breadcrumbs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description: 'Datenschutzerklärung von Rechenfix.de — Informationen zum Datenschutz gemäß DSGVO.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://rechenfix.de/datenschutz' },
  openGraph: {
    title: 'Datenschutzerklärung | Rechenfix.de',
    description: 'Datenschutzerklärung von Rechenfix.de — Informationen zum Datenschutz gemäß DSGVO.',
    url: 'https://rechenfix.de/datenschutz',
    siteName: 'Rechenfix.de',
    type: 'website',
    locale: 'de_DE',
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
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Stand: April 2026</p>

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
              <li>Analyse des Nutzerverhaltens (nur nach Einwilligung)</li>
              <li>Anzeige personalisierter Werbung (nur nach Einwilligung)</li>
              <li>Einbindung von Affiliate-Links</li>
              <li>Kontaktaufnahme per E-Mail</li>
              <li>Cookie-Verwaltung über eigenen Consent-Banner</li>
            </ul>
          </Section>

          {/* 3. Rechtsgrundlagen */}
          <Section nr="3" titel="Rechtsgrundlagen der Verarbeitung">
            <p>Wir verarbeiten personenbezogene Daten auf Grundlage folgender Rechtsgrundlagen gemäß Art. 6 Abs. 1 DSGVO:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>
                <strong>Einwilligung (Art. 6 Abs. 1 lit. a DSGVO):</strong> Für den Einsatz von Google Analytics, Google AdSense und nicht-essenzielle Cookies. Die Einwilligung kann jederzeit über unseren Cookie-Banner oder per E-Mail an uns widerrufen werden.
              </li>
              <li>
                <strong>Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO):</strong> Soweit die Verarbeitung zur Bereitstellung unserer kostenlosen Online-Rechner erforderlich ist.
              </li>
              <li>
                <strong>Berechtigte Interessen (Art. 6 Abs. 1 lit. f DSGVO):</strong> Für technisch notwendige Cookies, das Hosting der Website, die SSL/TLS-Verschlüsselung sowie die Einbindung von Affiliate-Links zur Finanzierung des Angebots.
              </li>
            </ul>
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
              <a href="https://www.dataprivacyframework.gov" target="_blank" rel="noopener noreferrer" className="text-primary-500 dark:text-primary-400 hover:underline">
                dataprivacyframework.gov
              </a>.
            </Hinweisbox>
          </Section>

          {/* 6. Cookies */}
          <Section nr="6" titel="Cookies und Einwilligung">
            <h3 className="font-bold text-gray-800 dark:text-gray-100 mt-4 mb-2">6.1 Was sind Cookies?</h3>
            <p>
              Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden. Sie richten keinen Schaden an und enthalten keine Viren. Cookies ermöglichen es, unser Angebot nutzerfreundlicher und effektiver zu gestalten.
            </p>

            <h3 className="font-bold text-gray-800 dark:text-gray-100 mt-6 mb-2">6.2 Cookie-Consent-Banner</h3>
            <p>
              Wir verwenden einen <strong>selbst programmierten Cookie-Consent-Banner</strong> (kein Drittanbieter-Tool). Beim ersten Besuch unserer Website werden Sie gefragt, ob Sie der Verwendung nicht-essenzieller Cookies zustimmen. Ihre Entscheidung wird in einem lokalen Cookie gespeichert, sodass Sie nicht bei jedem Besuch erneut gefragt werden.
            </p>
            <p className="mt-3">
              Sie können Ihre Einwilligung jederzeit widerrufen, indem Sie den entsprechenden Cookie in Ihrem Browser löschen oder uns per E-Mail kontaktieren.
            </p>

            <h3 className="font-bold text-gray-800 dark:text-gray-100 mt-6 mb-2">6.3 Arten von Cookies</h3>
            <div className="overflow-x-auto mt-3">
              <table className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/50">
                    <th className="text-left p-3 font-semibold text-gray-800 dark:text-gray-200">Kategorie</th>
                    <th className="text-left p-3 font-semibold text-gray-800 dark:text-gray-200">Zweck</th>
                    <th className="text-left p-3 font-semibold text-gray-800 dark:text-gray-200">Rechtsgrundlage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="p-3">Essenziell</td>
                    <td className="p-3">Cookie-Einwilligung, Dark-Mode-Einstellung</td>
                    <td className="p-3">Art. 6 Abs. 1 lit. f DSGVO</td>
                  </tr>
                  <tr>
                    <td className="p-3">Analyse</td>
                    <td className="p-3">Google Analytics 4</td>
                    <td className="p-3">Art. 6 Abs. 1 lit. a DSGVO</td>
                  </tr>
                  <tr>
                    <td className="p-3">Werbung</td>
                    <td className="p-3">Google AdSense</td>
                    <td className="p-3">Art. 6 Abs. 1 lit. a DSGVO</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          {/* 7. Google Analytics */}
          <Section nr="7" titel="Google Analytics 4">
            <p>
              Wir verwenden Google Analytics 4, einen Webanalysedienst der Google Ireland Limited (Gordon House, Barrow Street, Dublin 4, Irland). Google Analytics wird <strong>ausschließlich nach Ihrer ausdrücklichen Einwilligung</strong> über unseren Cookie-Banner aktiviert.
            </p>
            <p className="mt-3">Google Analytics verwendet Cookies, um eine Analyse der Benutzung der Website zu ermöglichen. Dabei werden folgende Daten erfasst:</p>
            <ul className="list-disc pl-5 space-y-1 mt-3">
              <li>Besuchte Seiten und Verweildauer</li>
              <li>Verwendetes Endgerät, Betriebssystem und Browser</li>
              <li>Ungefährer Standort (Land/Stadt, basierend auf anonymisierter IP-Adresse)</li>
              <li>Referrer (woher Sie auf unsere Website gekommen sind)</li>
            </ul>
            <p className="mt-3">
              Wir haben die <strong>IP-Anonymisierung</strong> aktiviert. Ihre IP-Adresse wird von Google innerhalb der EU/des EWR vor der Übermittlung in die USA gekürzt. Google ist unter dem EU-US Data Privacy Framework zertifiziert.
            </p>
            <p className="mt-3">
              Rechtsgrundlage ist Ihre Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO. Sie können Ihre Einwilligung jederzeit über den Cookie-Banner widerrufen.
            </p>
          </Section>

          {/* 8. Google AdSense */}
          <Section nr="8" titel="Google AdSense">
            <p>
              Wir nutzen Google AdSense, einen Anzeigendienst der Google Ireland Limited, zur Einblendung von Werbeanzeigen. Google AdSense wird <strong>ausschließlich nach Ihrer ausdrücklichen Einwilligung</strong> über unseren Cookie-Banner geladen.
            </p>
            <p className="mt-3">
              Google AdSense verwendet Cookies und sogenannte Web Beacons, um die Website-Nutzung zu analysieren und relevante Werbung auszuspielen. Dabei können Daten (einschließlich Ihrer IP-Adresse) an Server von Google in den USA übertragen werden. Google ist unter dem EU-US Data Privacy Framework zertifiziert.
            </p>
            <p className="mt-3">
              Rechtsgrundlage ist Ihre Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO. Sie können Ihre Einwilligung jederzeit über den Cookie-Banner widerrufen. Darüber hinaus können Sie personalisierte Werbung in den{' '}
              <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-primary-500 dark:text-primary-400 hover:underline">
                Google Ads-Einstellungen
              </a>{' '}
              deaktivieren.
            </p>
          </Section>

          {/* 9. Affiliate-Links */}
          <Section nr="9" titel="Affiliate-Links">
            <p>
              Unsere Website enthält sogenannte Affiliate-Links zu folgenden Partnerprogrammen:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>
                <strong>Amazon PartnerNet:</strong> Betrieben von Amazon Europe Core S.à r.l. (38 avenue John F. Kennedy, L-1855 Luxemburg). Wenn Sie über einen Affiliate-Link ein Produkt kaufen, erhalten wir eine Provision. Amazon setzt dabei eigene Cookies, um die Zuordnung zu ermöglichen.
              </li>
              <li>
                <strong>Check24:</strong> Betrieben von CHECK24 GmbH (Erika-Mann-Straße 62-66, 80636 München). Bei Klick auf einen Check24-Link werden Sie auf die Check24-Website weitergeleitet, wobei ein Tracking-Cookie gesetzt werden kann.
              </li>
            </ul>
            <p className="mt-3">
              Die Einbindung von Affiliate-Links erfolgt auf Grundlage unseres berechtigten Interesses an der Finanzierung unseres kostenlosen Angebots (Art. 6 Abs. 1 lit. f DSGVO). Affiliate-Links sind auf unserer Website als solche gekennzeichnet.
            </p>
          </Section>

          {/* 10. Kontakt per E-Mail */}
          <Section nr="10" titel="Kontaktaufnahme per E-Mail">
            <p>
              Wenn Sie uns per E-Mail kontaktieren, werden die von Ihnen mitgeteilten Daten (z.&nbsp;B. Name, E-Mail-Adresse, Inhalt der Anfrage) von uns gespeichert und verarbeitet, um Ihre Anfrage zu beantworten.
            </p>
            <p className="mt-3">
              Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung Ihrer Anfrage). Ihre Daten werden gelöscht, sobald die Anfrage abschließend bearbeitet ist und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
            </p>
          </Section>

          {/* 11. Rechte der Betroffenen */}
          <Section nr="11" titel="Ihre Rechte als betroffene Person">
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
              <a href="mailto:info@rechenfix.de" className="text-primary-500 dark:text-primary-400 hover:underline">
                info@rechenfix.de
              </a>
            </p>
          </Section>

          {/* 12. Widerrufsrecht */}
          <Section nr="12" titel="Widerrufsrecht für erteilte Einwilligungen">
            <p>
              Gemäß Art. 7 Abs. 3 DSGVO haben Sie das Recht, eine einmal erteilte Einwilligung jederzeit mit Wirkung für die Zukunft zu widerrufen. Die Rechtmäßigkeit der aufgrund der Einwilligung bis zum Widerruf erfolgten Verarbeitung wird dadurch nicht berührt.
            </p>
            <p className="mt-3">
              Sie können Ihre Einwilligung widerrufen, indem Sie:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-3">
              <li>Den Cookie-Banner erneut aufrufen und Ihre Einstellungen ändern</li>
              <li>Die entsprechenden Cookies in Ihrem Browser löschen</li>
              <li>Uns per E-Mail an <a href="mailto:info@rechenfix.de" className="text-primary-500 dark:text-primary-400 hover:underline">info@rechenfix.de</a> kontaktieren</li>
            </ul>
          </Section>

          {/* 13. Beschwerderecht */}
          <Section nr="13" titel="Recht auf Beschwerde bei einer Aufsichtsbehörde">
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
                <a href="https://www.ldi.nrw.de" target="_blank" rel="noopener noreferrer" className="text-primary-500 dark:text-primary-400 hover:underline">
                  www.ldi.nrw.de
                </a>
              </p>
            </div>
          </Section>

          {/* 14. Änderungen */}
          <Section nr="14" titel="Änderungen dieser Datenschutzerklärung">
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
        <a href="mailto:info@rechenfix.de" className="text-primary-500 dark:text-primary-400 hover:underline">
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
