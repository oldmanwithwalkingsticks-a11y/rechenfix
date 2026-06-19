import type { RechnerConfig } from './types';

export const technikRechner: RechnerConfig[] = [
  {
    slug: 'internetgeschwindigkeit-rechner',
    letzteAktualisierung: '2026-06-19',
    titel: 'Internetgeschwindigkeit-Rechner',
    beschreibung: 'Download-Zeit berechnen und Mbit/s in MB/s umrechnen — für Tarife, Streaming und große Dateien.',
    kategorie: 'Technik',
    kategorieSlug: 'technik',
    metaTitle: 'Internetgeschwindigkeit — Mbit/s in MB/s & Download',
    metaDescription: 'Download-Zeit berechnen und Mbit/s in MB/s umrechnen ✓ Bandbreiten-Bedarf ✓ DSL, Kabel, Glasfaser ✓ kostenlos mit KI-Erklärung.',
    keywords: ['internetgeschwindigkeit rechner', 'mbit in mb umrechnen', 'mbit/s in mb/s', 'download zeit berechnen', 'bandbreite rechner', 'dsl geschwindigkeit', 'mbit mbyte', 'internet geschwindigkeit'],
    icon: '🌐',
    formel: 'MB/s = Mbit/s ÷ 8 (1 Byte = 8 Bit) | Download-Zeit = Dateigröße ÷ Bandbreite',
    beispiel: '100 Mbit/s ÷ 8 = 12,5 MB/s. Eine 5-GB-Datei bei 50 Mbit/s (6,25 MB/s): 5.000 MB ÷ 6,25 = 800 s ≈ 13 min.',
    erklaerung: `**Internetgeschwindigkeit berechnen — Mbit/s, MB/s und Download-Zeit**

Wer einen Internettarif bucht, sieht eine Zahl wie „100 Mbit/s". Wer dann eine Datei herunterlädt, sieht im Browser eine ganz andere Zahl wie „12,5 MB/s". Beide stimmen — sie verwenden nur unterschiedliche Einheiten. Unser Rechner übersetzt zwischen beiden und schätzt, wie lange ein Download bei Ihrer Bandbreite dauert.

**Mbit/s vs. MB/s — der Faktor 8**

Provider geben die Geschwindigkeit in Megabit pro Sekunde (Mbit/s) an, Dateigrößen und Download-Anzeigen rechnen in Megabyte pro Sekunde (MB/s). Ein Byte besteht aus 8 Bit, daher gilt: MB/s = Mbit/s ÷ 8. Ein 100-Mbit-Anschluss liefert also höchstens 12,5 MB/s, ein 16-Mbit-DSL rund 2 MB/s.

**Download-Zeit abschätzen**

Die Dauer eines Downloads ergibt sich aus Dateigröße ÷ Bandbreite. Eine 5-GB-Datei (5.000 MB) bei 50 Mbit/s (6,25 MB/s) braucht rechnerisch 800 Sekunden, also rund 13 Minuten. Verdoppelt sich die Bandbreite, halbiert sich die Zeit.

**Warum die reale Geschwindigkeit unter dem Tarif liegt**

Die beworbene Bandbreite ist ein Bis-zu-Wert. Protokoll-Overhead, WLAN statt LAN-Kabel, ausgelastete Knoten zur Hauptzeit und die Leitungsdämpfung bei DSL kosten Tempo. Realistisch erreicht man per Kabel oft 80 bis 90 Prozent des Tarifs, über WLAN teils weniger. Die Bundesnetzagentur stellt mit der Breitbandmessung ein offizielles Messverfahren bereit.

**Welche Bandbreite brauche ich?**

Surfen und E-Mail kommen mit wenigen Mbit/s aus, HD-Streaming braucht etwa 5–8 Mbit/s, 4K-Streaming rund 25 Mbit/s. In Haushalten mit mehreren Personen addieren sich die Bedarfe. Alle Werte dienen der Orientierung.`,
    faq: [
      {
        frage: 'Wie rechne ich Mbit/s in MB/s um?',
        antwort: 'Teilen Sie die Mbit/s-Zahl durch 8, denn ein Byte besteht aus 8 Bit. Beispiel: 100 Mbit/s ÷ 8 = 12,5 MB/s. Provider werben mit Mbit/s, Ihr Download-Fenster zeigt MB/s — daher der scheinbare Unterschied.',
      },
      {
        frage: 'Wie lange dauert ein Download?',
        antwort: 'Download-Zeit = Dateigröße ÷ Bandbreite. Rechnen Sie die Bandbreite zuerst in MB/s um (Mbit/s ÷ 8). Eine 5-GB-Datei bei 50 Mbit/s (6,25 MB/s) braucht 5.000 MB ÷ 6,25 = 800 Sekunden, also etwa 13 Minuten.',
      },
      {
        frage: 'Warum ist mein Internet langsamer als im Tarif?',
        antwort: 'Die beworbene Bandbreite ist ein Bis-zu-Wert. Protokoll-Overhead, WLAN, ausgelastete Knotenpunkte zur Hauptnutzungszeit und die Leitungsdämpfung bei DSL verringern die reale Geschwindigkeit. Per LAN-Kabel erreicht man meist 80–90 Prozent, über WLAN oft weniger.',
      },
      {
        frage: 'Welche Geschwindigkeit brauche ich für Streaming?',
        antwort: 'HD-Streaming (1080p) benötigt etwa 5–8 Mbit/s, 4K-Streaming rund 25 Mbit/s pro Stream. Bei mehreren gleichzeitigen Streams addieren sich die Werte: Vier HD-Streams brauchen zusammen rund 25–30 Mbit/s.',
      },
      {
        frage: 'Was ist der Unterschied zwischen GB und GiB?',
        antwort: 'GB (Gigabyte) ist dezimal: 1 GB = 1.000 MB. GiB (Gibibyte) ist binär: 1 GiB = 1.024 MiB. Für die Download-Schätzung genügt die dezimale Rechnung. Betriebssysteme zeigen oft GiB, weshalb eine „1.000 GB"-Festplatte als rund 931 GiB erscheint.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Mbit/s vs. MB/s — warum „100 Mbit" nicht 100 MB/s sind',
        html: `<p>Die häufigste Verwirrung beim Internet: Ein Tarif mit <strong>100 Mbit/s</strong> lädt eine Datei nicht mit 100 MB pro Sekunde herunter, sondern nur mit <strong>12,5 MB/s</strong>. Der Grund ist eine simple Einheit: Provider geben die Geschwindigkeit in <strong>Megabit pro Sekunde (Mbit/s)</strong> an, Download-Fenster zeigen aber <strong>Megabyte pro Sekunde (MB/s)</strong>. Und ein Byte besteht aus <strong>8 Bit</strong>.</p><p>Deshalb gilt die zentrale Umrechnung: <strong>MB/s = Mbit/s ÷ 8</strong>. Wer im Kopf abschätzen will, wie schnell ein Download wirklich läuft, teilt die beworbene Mbit-Zahl einfach durch acht. Aus 50 Mbit/s werden 6,25 MB/s, aus 250 Mbit/s rund 31 MB/s. Die eigentliche Download-Zeit ergibt sich dann aus <strong>Dateigröße ÷ Bandbreite</strong>. Dieser Rechner nimmt Ihnen beide Schritte ab — er rechnet die Mbit-Angabe in MB/s um und schätzt daraus die Dauer für eine Datei beliebiger Größe.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: '100 Mbit/s in MB/s umrechnen',
        schritte: [
          { label: 'Tarif-Angabe (Provider)', formel: '100 Mbit/s', ergebnis: 'in Megabit pro Sekunde' },
          { label: 'Durch 8 teilen (1 Byte = 8 Bit)', formel: '100 ÷ 8', ergebnis: '12,5 MB/s' },
        ],
        fazit: 'Ein 100-Mbit-Tarif überträgt höchstens 12,5 Megabyte pro Sekunde — genau diesen Wert zeigt der Browser beim Download an. Der Faktor 8 ist der ganze Trick: Bit (Provider-Angabe) geteilt durch 8 ergibt Byte (Download-Anzeige). Bei diesem Tempo ist eine 1-GB-Datei in rund 80 Sekunden geladen, sofern die Leitung voll ausgereizt wird. Wer den Faktor kennt, wundert sich nicht mehr, warum „100 Mbit" sich beim Herunterladen nach viel weniger anfühlen. Dieselbe Logik gilt nach unten: Ein 16-Mbit-DSL kommt auf nur 2 MB/s, ein 1.000-Mbit-Glasfaseranschluss dagegen auf 125 MB/s. Immer ist es der Tarifwert geteilt durch acht.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Download einer 5-GB-Datei bei 50 Mbit/s',
        schritte: [
          { label: 'Bandbreite in MB/s', formel: '50 Mbit/s ÷ 8', ergebnis: '6,25 MB/s' },
          { label: 'Dateigröße in MB', formel: '5 GB × 1.000', ergebnis: '5.000 MB' },
          { label: 'Zeit = Größe ÷ Tempo', formel: '5.000 ÷ 6,25', ergebnis: '800 s ≈ 13 min 20 s' },
        ],
        fazit: 'Eine 5-GB-Datei — etwa ein Film oder ein Spiele-Update — braucht bei 50 Mbit/s (6,25 MB/s) rechnerisch 800 Sekunden, also rund 13 Minuten. Die Bandbreite wird zuerst durch 8 in MB/s umgerechnet, dann teilt man die Dateigröße durch dieses Tempo. Verdoppelt man die Bandbreite auf 100 Mbit/s, halbiert sich die Zeit auf etwa 6,5 Minuten. In der Praxis dauert es durch Overhead und Leitungsverluste meist etwas länger. Wichtig ist der Dreischritt: erst die Bandbreite durch 8 in MB/s umrechnen, dann die Dateigröße in MB bringen, schließlich Größe durch Tempo teilen. Wer die Bandbreite versehentlich nicht durch 8 teilt, unterschätzt die Download-Zeit um den Faktor acht.',
      },
      {
        typ: 'tabelle',
        titel: 'Download-Zeiten nach Dateigröße und Bandbreite',
        kopf: ['Dateigröße', '16 Mbit/s', '50 Mbit/s', '100 Mbit/s', '250 Mbit/s'],
        zeilen: [
          ['1 GB', '8 min 20 s', '2 min 40 s', '1 min 20 s', '32 s'],
          ['5 GB', '41 min 40 s', '13 min 20 s', '6 min 40 s', '2 min 40 s'],
          ['25 GB', '3 h 28 min', '1 h 7 min', '33 min 20 s', '13 min 20 s'],
        ],
        fussnote: 'Theoretische Zeiten ohne Overhead (Dateigröße × 8 ÷ Mbit/s). 16 Mbit/s entspricht langsamem DSL, 250 Mbit/s schnellem Kabel oder Glasfaser. In der Praxis dauert es etwas länger (siehe „reale Geschwindigkeit"). Gerechnet dezimal mit 1 GB = 1.000 MB. Gut zu erkennen: Eine Verdopplung der Bandbreite halbiert jeweils die Zeit, und eine fünfmal so große Datei dauert fünfmal so lange. Der Sprung von langsamem DSL (16 Mbit/s) auf Glasfaser-Niveau (250 Mbit/s) verkürzt einen 25-GB-Download von über drei Stunden auf rund 13 Minuten.',
      },
      {
        typ: 'text',
        titel: 'Bit, Byte, Kilo/Mega/Giga — die Einheiten',
        html: `<p>Die kleinste Informationseinheit ist das <strong>Bit</strong> — eine 0 oder 1. Acht Bit ergeben ein <strong>Byte</strong>, die übliche Einheit für Dateigrößen. Aus dieser 8er-Beziehung stammt der Faktor, der Tarif-Angaben (in Bit) und Dateigrößen (in Byte) voneinander trennt.</p><p>Darüber stapeln sich die Vorsätze: <strong>Kilo</strong> (Tausend), <strong>Mega</strong> (Million), <strong>Giga</strong> (Milliarde), <strong>Tera</strong> (Billion). Bei Datenraten und Festplatten wird meist dezimal gerechnet — 1 GB = 1.000 MB = 1.000.000 KB. Betriebssysteme nutzen dagegen oft die binären Einheiten (1 GiB = 1.024 MiB), weshalb eine „1.000 GB"-Festplatte im System nur als rund 931 GiB erscheint. Für die Abschätzung der Download-Zeit reicht die dezimale Rechnung völlig: Eine 5-GB-Datei sind 5.000 MB. Achten Sie nur darauf, Bit und Byte nicht zu verwechseln — das ist der mit Abstand häufigste Fehler bei Geschwindigkeitsangaben.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Streaming-Bandbreite: 4K-Video pro Stunde',
        schritte: [
          { label: '4K-Stream benötigt', formel: '~25 Mbit/s', ergebnis: 'laut Anbieter-Empfehlung' },
          { label: 'In MB/s umrechnen', formel: '25 ÷ 8', ergebnis: '3,125 MB/s' },
          { label: 'Pro Stunde (× 3.600 s)', formel: '3,125 × 3.600', ergebnis: '≈ 11.250 MB ≈ 11,3 GB/h' },
        ],
        fazit: '4K-Streaming benötigt rund 25 Mbit/s, das sind etwa 3,1 MB/s. Über eine Stunde summiert sich das auf rund 11 Gigabyte — ein Film in 4K kann also gut 20 GB verbrauchen. Das ist besonders bei mobilen Tarifen mit Datenlimit relevant. HD-Streaming (1080p) ist deutlich genügsamer: Bei etwa 5 Mbit/s sind es nur rund 2,3 GB pro Stunde. Wer ein Datenvolumen im Blick behalten muss, sollte die Streaming-Qualität bewusst wählen. Zum Vergleich: Reines Musik-Streaming kommt mit unter 1 GB pro Stunde aus. Für die nötige Leitungsgeschwindigkeit zählt dagegen nicht das Stundenvolumen, sondern die Mbit/s pro Stream — vier gleichzeitige 4K-Streams würden rund 100 Mbit/s belegen.',
      },
      {
        typ: 'tabelle',
        titel: 'Bandbreiten-Bedarf je Nutzung',
        kopf: ['Nutzung', 'Empfohlene Bandbreite'],
        zeilen: [
          ['E-Mail & Surfen', '1–5 Mbit/s'],
          ['Musik-Streaming', '1–2 Mbit/s'],
          ['HD-Video (1080p)', '5–8 Mbit/s'],
          ['4K-Video (UHD)', '~25 Mbit/s'],
          ['Videocall (HD)', '3–5 Mbit/s'],
          ['Online-Gaming', '3–6 Mbit/s + niedrige Latenz'],
          ['Großer Download / Cloud-Backup', 'so viel wie verfügbar'],
          ['Mehrere Nutzer gleichzeitig', 'Summe der Einzelbedarfe'],
        ],
        fussnote: 'Richtwerte pro gleichzeitigem Stream bzw. Gerät. Beim Online-Gaming zählt weniger die Bandbreite als die niedrige Latenz (Ping). In Haushalten mit mehreren Personen addieren sich die Bedarfe — vier gleichzeitige HD-Streams brauchen zusammen rund 25–30 Mbit/s. Als grobe Faustregel für die Tarifwahl: pro Person im Haushalt etwa 25 Mbit/s einplanen, dann bleibt auch bei paralleler Nutzung genug Reserve. Wichtig ist außerdem ein ausreichender Upload, sobald regelmäßig Videocalls geführt oder große Dateien in die Cloud geladen werden.',
      },
      {
        typ: 'text',
        titel: 'Warum die reale Geschwindigkeit unter dem Tarif liegt',
        html: `<p>Die beworbene Bandbreite ist ein <strong>Bis-zu-Wert</strong> — in der Praxis kommt fast immer weniger an. Mehrere Faktoren zehren an der Geschwindigkeit: <strong>Protokoll-Overhead</strong> (ein Teil der Datenrate geht für Verwaltungsinformationen drauf), <strong>Leitungsdämpfung</strong> bei DSL über lange Kupferstrecken, ausgelastete <strong>Knotenpunkte</strong> zur Hauptnutzungszeit und das geteilte Medium bei Kabelanschlüssen, wo sich viele Haushalte einen Strang teilen.</p><p>Hinzu kommt der eigene Haushalt: ein altes <strong>WLAN</strong>, mehrere gleichzeitig streamende Geräte oder ein überlasteter Router bremsen zusätzlich. Realistisch erreicht man oft <strong>80 bis 90 Prozent</strong> der gebuchten Bandbreite per LAN-Kabel, über WLAN teils deutlich weniger. Die Bundesnetzagentur stellt mit der Breitbandmessung ein offizielles Messverfahren bereit; Anbieter müssen eine bestimmte Mindestleistung tatsächlich liefern. Für die Download-Schätzung lohnt es sich daher, nicht mit dem Tarif-Maximum, sondern mit einem etwas niedrigeren realen Wert zu rechnen.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Effektive vs. beworbene Geschwindigkeit',
        schritte: [
          { label: 'Beworbener Tarif', formel: '100 Mbit/s', ergebnis: 'Bis-zu-Wert' },
          { label: 'Realistisch ~85 % per LAN', formel: '100 × 0,85', ergebnis: '≈ 85 Mbit/s' },
          { label: 'In MB/s', formel: '85 ÷ 8', ergebnis: '≈ 10,6 MB/s' },
        ],
        fazit: 'Mit rund 15 Prozent Verlust durch Overhead, Leitung und Auslastung liefert ein 100-Mbit-Tarif real eher 85 Mbit/s, also etwa 10,6 MB/s statt der theoretischen 12,5 MB/s. Über WLAN kann es noch deutlich weniger sein. Beim Schätzen der Download-Zeit lohnt es sich deshalb, mit einem realistischen statt dem maximalen Wert zu rechnen. Wie viel Ihre Leitung tatsächlich schafft, zeigt die offizielle Breitbandmessung der Bundesnetzagentur — der genaue Verlust hängt von Anschlussart und Tageszeit ab. Liefert ein Anbieter dauerhaft deutlich weniger als vertraglich zugesagt, kann das ein Recht auf Minderung oder Sonderkündigung begründen; die Messung dient dann als Nachweis.',
      },
      {
        typ: 'vergleich',
        titel: 'Kupfer (DSL/Kabel) vs. Glasfaser',
        spalteA: 'Kupfer-Anschluss (DSL / Kabel)',
        spalteB: 'Glasfaser (FTTH)',
        zeilen: [
          { kriterium: 'Typische Download-Rate', a: 'DSL 16–250 Mbit/s, Kabel bis ~1.000 Mbit/s', b: '100 bis über 1.000 Mbit/s' },
          { kriterium: 'Upload (Symmetrie)', a: 'deutlich geringer als Download (asymmetrisch)', b: 'oft symmetrisch (Up = Down)' },
          { kriterium: 'Leitungsdämpfung', a: 'DSL nimmt mit der Leitungslänge ab', b: 'kaum, auch über große Distanzen stabil' },
          { kriterium: 'Geteiltes Medium', a: 'Kabel teilt sich den Strang im Wohngebiet', b: 'dedizierte Faser bis ins Haus' },
          { kriterium: 'Latenz', a: 'höher, schwankt bei Auslastung', b: 'niedrig und stabil' },
          { kriterium: 'Verfügbarkeit', a: 'nahezu flächendeckend', b: 'im Ausbau, regional unterschiedlich' },
        ],
      },
      {
        typ: 'checkliste',
        titel: 'Internetgeschwindigkeit testen & einordnen',
        punkte: [
          'Geschwindigkeitstest per LAN-Kabel machen, nicht über WLAN — WLAN verfälscht das Ergebnis.',
          'Während des Tests andere Downloads, Streams und Geräte pausieren.',
          'Tarif prüfen: Welche Mbit/s sind vertraglich als Maximal- und als Mindestwert zugesagt?',
          'Gemessenen Wert (meist Mbit/s) bei Bedarf ÷ 8 in MB/s umrechnen, um Downloads einzuordnen.',
          'Mehrfach zu verschiedenen Tageszeiten messen — abends ist die Auslastung am höchsten.',
          'Die offizielle Breitbandmessung der Bundesnetzagentur nutzen, wenn der Anbieter zu wenig liefert.',
          'Bandbreitenbedarf abschätzen: Wie viele Personen streamen, spielen oder arbeiten gleichzeitig?',
          'Bei dauerhaft zu geringer Leistung das Minderungs- bzw. Sonderkündigungsrecht prüfen.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Provider geben Mbit/s an, Downloads zeigen MB/s — ÷ 8',
        text: 'Die wichtigste Faustregel rund ums Internet-Tempo: Internetanbieter werben mit Megabit pro Sekunde (Mbit/s), Ihr Browser oder Download-Manager zeigt aber Megabyte pro Sekunde (MB/s). Weil ein Byte aus acht Bit besteht, teilen Sie die beworbene Zahl einfach durch acht. Ein 100-Mbit-Tarif liefert also höchstens 12,5 MB/s, ein 16-Mbit-DSL nur rund 2 MB/s. Wer das im Kopf hat, wundert sich nicht mehr, warum ein Download „so langsam" wirkt — er läuft genau wie erwartet. Umgekehrt: Wenn ein Download mit 6 MB/s läuft, entspricht das rund 48 Mbit/s tatsächlicher Geschwindigkeit. Dieselbe Acht steckt hinter jeder Datenraten-Angabe — egal ob bei DSL, Kabel, Glasfaser oder beim mobilen Netz. Einmal verinnerlicht, lässt sich jede Mbit-Zahl im Kopf in eine greifbare MB/s-Geschwindigkeit übersetzen.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Werte sind Richtwerte — die reale Geschwindigkeit schwankt',
        text: 'Die berechneten Download-Zeiten sind theoretische Bestwerte. In der Praxis liegt die tatsächliche Geschwindigkeit fast immer darunter: Protokoll-Overhead, WLAN statt LAN-Kabel, ausgelastete Server zur Hauptzeit und die Leitungsdämpfung bei DSL kosten Tempo. Auch der herunterladende Server begrenzt die Rate — ist er langsam, hilft der schnellste Anschluss nichts. Rechnen Sie deshalb mit etwas mehr Zeit als hier angezeigt und nutzen Sie für eine belastbare Einschätzung Ihrer echten Leitung die Breitbandmessung der Bundesnetzagentur. Die Angaben hier dienen der Orientierung und ersetzen keine offizielle Messung.',
      },
    ],
    quellen: [
      {
        titel: 'Datenübertragung — Bit/Byte & Bandbreite',
        hinweis: '1 Byte = 8 Bit, daher MB/s = Mbit/s ÷ 8; Download-Zeit = Dateigröße ÷ Bandbreite.',
      },
      {
        titel: 'Bundesnetzagentur — Breitbandmessung',
        url: 'https://www.bundesnetzagentur.de',
        hinweis: 'Reale vs. beworbene Geschwindigkeit',
      },
    ],
  },
];
