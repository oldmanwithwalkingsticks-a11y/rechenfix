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
  {
    slug: 'download-rechner',
    letzteAktualisierung: '2026-06-30',
    titel: 'Download-Rechner',
    beschreibung: 'Downloadzeit berechnen: Wie lange dauert ein Download bei Ihrer Internetgeschwindigkeit? Inklusive MB-Mbit-Umrechnung und realistischem Overhead.',
    kategorie: 'Technik',
    kategorieSlug: 'technik',
    metaTitle: 'Download-Rechner — Downloadzeit berechnen',
    metaDescription: 'Downloadzeit berechnen: Wie lange dauert ein Download bei Ihrer Internetgeschwindigkeit? Mit MB-Mbit-Umrechnung, Overhead und Rechenweg.',
    keywords: ['download rechner', 'downloadzeit berechnen', 'download dauer', 'mbit in mb', 'mbit/s in mb/s', 'wie lange dauert download', 'downloadzeit internetgeschwindigkeit', 'datei download zeit'],
    icon: '⬇️',
    formel: 'Downloadzeit = Dateigröße(MB) × 8 ÷ Bandbreite(Mbit/s) ÷ Wirkungsgrad | 1 GB = 1.000 MB',
    beispiel: '1.500 MB bei 50 Mbit/s: 1.500 × 8 = 12.000 Mbit ÷ 50 = 240 s (ideal) ÷ 0,85 ≈ 282 s = 4 min 42 s (real).',
    erklaerung: `**Downloadzeit berechnen — Dateigröße, Bandbreite und Overhead**

Wie lange ein Download dauert, hängt von der Dateigröße und der Internetgeschwindigkeit ab. Die Tücke steckt in den Einheiten: Dateigrößen werden in Megabyte (MB) angegeben, Internetgeschwindigkeiten dagegen in Megabit pro Sekunde (Mbit/s). Da ein Byte aus acht Bit besteht, muss die Dateigröße zuerst mit 8 multipliziert werden. Dieser Rechner nimmt Ihnen die Umrechnung ab und zeigt die ideale wie die realistische Downloadzeit.

**Die Megabit-vs.-Megabyte-Falle**

Der häufigste Fehler: Ein 50-Mbit/s-Anschluss überträgt nicht 50 Megabyte pro Sekunde, sondern nur 50 ÷ 8 = 6,25 MB/s. Wer das übersieht, schätzt Downloadzeiten achtmal zu kurz. Die Faustregel lautet daher: Mbit/s geteilt durch 8 ergibt MB/s.

**Warum die reale Zeit länger ist**

Die ideale Zeit unterstellt, dass jede Sekunde die volle Bandbreite ankommt. In der Praxis kosten Protokoll-Overhead (TCP/IP), WLAN-Verluste, Server-Drosselung und Auslastung zur Hauptverkehrszeit Tempo. Der Rechner bildet das über einen Wirkungsgrad ab: 85 Prozent als realistischer Standard, 70 Prozent bei schwachem WLAN, 100 Prozent nur als theoretischer Bestwert.

**Typische Dateigrößen**

Ein Foto wiegt 5 bis 25 MB, ein Song 3 bis 5 MB, ein HD-Film 1 bis 4 GB, ein 4K-Film 15 bis 40 GB und ein aktuelles Spiel 50 bis 150 GB. Daran zeigt sich, warum sich ein schneller Anschluss vor allem bei großen Dateien auszahlt.`,
    faq: [
      {
        frage: 'Wie berechne ich die Downloadzeit?',
        antwort: 'Multiplizieren Sie die Dateigröße in MB mit 8, um Megabit zu erhalten, und teilen Sie durch die Bandbreite in Mbit/s. Das ergibt die ideale Zeit in Sekunden. Für die realistische Zeit teilen Sie zusätzlich durch den Wirkungsgrad (Standard 0,85). Beispiel: 1.500 MB × 8 = 12.000 Mbit ÷ 50 Mbit/s = 240 s ÷ 0,85 ≈ 282 s, also rund 4 Minuten 42 Sekunden.',
      },
      {
        frage: 'Was ist der Unterschied zwischen Mbit/s und MB/s?',
        antwort: 'Mbit/s (Megabit pro Sekunde) ist die Einheit der Internetgeschwindigkeit, MB/s (Megabyte pro Sekunde) die Einheit der übertragenen Datenmenge. Da ein Byte aus acht Bit besteht, gilt: Mbit/s ÷ 8 = MB/s. Ein 50-Mbit/s-Anschluss schafft also höchstens 6,25 MB/s. Anbieter werben bewusst mit der größeren Bit-Zahl.',
      },
      {
        frage: 'Warum dauert mein Download länger als berechnet?',
        antwort: 'Die ideale Zeit ist ein theoretischer Bestwert. In der Praxis kosten Protokoll-Overhead (rund 10 bis 15 Prozent), schwaches WLAN, ein drosselnder Server und die Auslastung zur Hauptverkehrszeit Geschwindigkeit. Deshalb rechnet der Rechner mit einem Wirkungsgrad von standardmäßig 85 Prozent. Bei schlechtem WLAN können Sie auf 70 Prozent stellen.',
      },
      {
        frage: 'Wie lange dauert der Download eines 50-GB-Spiels?',
        antwort: 'Bei 100 Mbit/s und 85 Prozent Wirkungsgrad rund 1 Stunde 18 Minuten, bei einem Gigabit-Anschluss (1.000 Mbit/s) nur knapp 8 Minuten. Große Spiele sind mit 50 bis 150 GB die größten Downloads im Alltag — hier macht sich ein schneller Anschluss am stärksten bemerkbar.',
      },
      {
        frage: 'Rechnet der Rechner mit 1 GB = 1.000 MB oder 1.024 MB?',
        antwort: 'Dieser Rechner verwendet 1 GB = 1.000 MB (dezimale Zählung), wie sie bei Festplatten- und Internettarif-Angaben üblich ist. Die binäre Zählung (1 GiB = 1.024 MiB) wird vor allem von Betriebssystemen genutzt und erklärt, warum eine „500-GB"-Festplatte dort als rund 465 GiB erscheint.',
      },
      {
        frage: 'Warum ist der Upload oft langsamer als der Download?',
        antwort: 'Die meisten Anschlüsse sind asymmetrisch: Die Download-Rate ist höher als die Upload-Rate, weil Privatnutzer mehr empfangen als senden. Ein 100-Mbit/s-Anschluss bietet im Upload oft nur 10 bis 40 Mbit/s. Beim Versenden großer Dateien (Cloud-Backup, Video-Upload) dauert es daher länger. Echte Glasfaseranschlüsse sind häufig symmetrisch.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Wie die Downloadzeit berechnet wird',
        html: `<p>Die Downloadzeit hängt von zwei Größen ab: der <strong>Dateigröße</strong> und der <strong>Internetgeschwindigkeit</strong>. Der Haken dabei: Dateigrößen werden in <strong>Megabyte (MB)</strong> angegeben, Internetgeschwindigkeiten aber in <strong>Megabit pro Sekunde (Mbit/s)</strong>. Da ein Byte aus acht Bit besteht, muss die Dateigröße zuerst mit 8 multipliziert werden, um sie mit der Bandbreite vergleichbar zu machen.</p><p>Die Grundrechnung lautet also: Dateigröße in MB × 8 ergibt die Datenmenge in Megabit; geteilt durch die Bandbreite in Mbit/s ergibt das die theoretische Downloadzeit in Sekunden. In der Praxis kommt nie die volle beworbene Geschwindigkeit an — Protokoll-Overhead, WLAN und Servergrenzen kosten Tempo. Deshalb rechnet dieser Rechner zusätzlich mit einem <strong>Wirkungsgrad</strong> (Standard 85 %), der diesen realistischen Verlust abbildet. Das Ergebnis ist eine fundierte Schätzung, kein garantierter Wert — die tatsächliche Zeit schwankt je nach Tageszeit, Auslastung und Gegenstelle.</p>`,
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Megabit vs. Megabyte — die häufigste Verwechslung',
        text: 'Der mit Abstand häufigste Fehler beim Schätzen von Downloadzeiten: Megabit und Megabyte werden verwechselt. Ein Byte besteht aus acht Bit, daher gilt die Faustregel „durch 8". Ein 50-Mbit/s-Anschluss überträgt also höchstens 50 ÷ 8 = 6,25 Megabyte pro Sekunde — nicht 50 MB/s. Eine 1.500-MB-Datei braucht damit theoretisch mindestens 240 Sekunden, nicht 30. Internetanbieter werben bewusst mit der größeren Bit-Zahl, weil 50 Mbit/s eindrucksvoller klingt als 6,25 MB/s. Wer das im Kopf behält, schätzt Downloadzeiten nie wieder achtmal zu kurz. Merksatz: Mbit/s geteilt durch 8 ergibt MB/s. Dieselbe Verwechslung steckt hinter vielen enttäuschten Erwartungen: Wer einen 100-Mbit/s-Tarif bucht und glaubt, ein 1-GB-Update lade in 10 Sekunden, rechnet in Wahrheit mit 1.000 ÷ 12,5 = 80 Sekunden — und das nur im Idealfall. Die Bit-Angabe ist also kein Etikettenschwindel, sondern schlicht eine andere Einheit, die man konsequent durch 8 teilen muss.',
      },
      {
        typ: 'beispielrechnung',
        titel: '1.500 MB bei 50 Mbit/s',
        schritte: [
          { label: 'Dateigröße in Megabit', formel: '1.500 MB × 8', ergebnis: '12.000 Mbit' },
          { label: 'Theoretische Zeit (ideal)', formel: '12.000 Mbit ÷ 50 Mbit/s', ergebnis: '240 s = 4 min 0 s' },
          { label: 'Realistische Zeit (Wirkungsgrad 85 %)', formel: '240 s ÷ 0,85', ergebnis: '≈ 282 s = 4 min 42 s' },
        ],
        fazit: 'Eine 1.500-MB-Datei (etwa ein Spielfilm in guter Qualität) lädt an einem 50-Mbit/s-Anschluss theoretisch in 4 Minuten — realistisch in rund 4 Minuten 42 Sekunden. Die gut 40 Sekunden Unterschied sind der Overhead: Daten werden nicht roh übertragen, sondern in Pakete verpackt, quittiert und bei Bedarf erneut gesendet. Dieser Anteil von rund 15 Prozent ist normal und steckt im Wirkungsgrad von 85 Prozent. Bei schwachem WLAN oder einem stark ausgelasteten Server kann er deutlich höher liegen, sodass derselbe Download merklich länger dauert.',
      },
      {
        typ: 'text',
        titel: 'Warum die echte Zeit länger ist als die ideale',
        html: `<p>Die ideale Downloadzeit ist eine reine Rechengröße — sie unterstellt, dass jede Sekunde die volle Bandbreite ankommt und kein einziges Bit verloren geht. In der Realität ist das nie der Fall. Mehrere Faktoren bremsen jeden Download.</p><p>Der <strong>Protokoll-Overhead</strong> ist unvermeidbar: TCP/IP zerlegt die Datei in Pakete, versieht jedes mit Adress- und Prüfinformationen und lässt sich den Empfang bestätigen — das kostet rund 10 bis 15 Prozent. <strong>WLAN</strong> verliert zusätzlich durch Funkstörungen, Entfernung zum Router und geteilte Bandbreite mit anderen Geräten. Der <strong>Server</strong> auf der Gegenseite kann die Geschwindigkeit drosseln oder unter Last langsamer ausliefern. Schließlich liefern viele Anschlüsse „bis zu"-Geschwindigkeiten, die zur Hauptverkehrszeit am Abend spürbar sinken. Der Wirkungsgrad im Rechner bündelt all diese Effekte: 85 % für einen normalen Anschluss, 70 % für schwaches WLAN, 100 % nur als theoretischer Bestwert. Realistisch ist fast immer der mittlere Wert.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: '50-GB-Spiel: 100 vs. 1.000 Mbit/s',
        schritte: [
          { label: 'Dateigröße in Megabit', formel: '50 GB × 1.000 × 8', ergebnis: '400.000 Mbit' },
          { label: 'Bei 100 Mbit/s (real)', formel: '400.000 ÷ 100 ÷ 0,85', ergebnis: '≈ 1 h 18 min' },
          { label: 'Bei 1.000 Mbit/s (real)', formel: '400.000 ÷ 1.000 ÷ 0,85', ergebnis: '≈ 7 min 51 s' },
        ],
        fazit: 'Ein modernes AAA-Spiel mit 50 GB zeigt, wie stark die Anschlussgeschwindigkeit zählt. Am verbreiteten 100-Mbit/s-Anschluss dauert der Download rund 1 Stunde 18 Minuten, an einem Gigabit-Glasfaseranschluss (1.000 Mbit/s) nur knapp 8 Minuten — fast zehnmal schneller. Solche Dateigrößen erklären, warum Gamer und Vielnutzer von schnellen Leitungen am meisten profitieren. Wichtig: 1 GB sind hier 1.000 MB (dezimale Zählung, wie bei Festplatten- und Tarif-Angaben üblich).',
      },
      {
        typ: 'tabelle',
        titel: 'Downloadzeit eines 4,7-GB-Films',
        kopf: ['Anschluss', 'Geschwindigkeit', 'Downloadzeit (real)'],
        zeilen: [
          ['DSL (alt)', '16 Mbit/s', '46 min 5 s'],
          ['VDSL', '50 Mbit/s', '14 min 45 s'],
          ['VDSL / Kabel', '100 Mbit/s', '7 min 22 s'],
          ['Kabel / Glasfaser', '250 Mbit/s', '2 min 57 s'],
          ['Glasfaser (Gigabit)', '1.000 Mbit/s', '44,2 s'],
        ],
        fussnote: 'Beispiel-Datei: ein Film mit 4,7 GB (4.700 MB, klassische DVD-Größe), Wirkungsgrad 85 %. Die Zeiten zeigen, wie stark moderne Anschlüsse den Download beschleunigen — von über 46 Minuten am alten DSL bis unter eine Minute am Gigabit-Anschluss. Die ideale Zeit ohne Overhead wäre jeweils rund 15 Prozent kürzer. Auffällig ist, dass der Sprung von 16 auf 50 Mbit/s die größte absolute Zeitersparnis bringt, während der Schritt von 250 auf 1.000 Mbit/s bei dieser Dateigröße nur noch wenige Sekunden ausmacht: Je schneller die Leitung, desto kleiner der spürbare Gewinn bei einzelnen mittelgroßen Dateien — erst bei sehr großen Downloads zahlt sich ein Gigabit-Anschluss richtig aus.',
      },
      {
        typ: 'text',
        titel: 'Typische Dateigrößen im Überblick',
        html: `<p>Um Downloadzeiten einschätzen zu können, hilft ein Gefühl für gängige Dateigrößen. Ein <strong>Foto</strong> vom Smartphone wiegt je nach Auflösung 5 bis 25 MB, ein <strong>MP3-Song</strong> nur 3 bis 5 MB. Ein <strong>HD-Spielfilm</strong> liegt bei 1 bis 4 GB, ein <strong>4K-Film</strong> schon bei 15 bis 40 GB. Aktuelle <strong>Computerspiele</strong> sind mit 50 bis 150 GB die größten Brocken im Alltag.</p><p>Daran wird schnell klar, warum ein einzelnes Foto selbst an einer langsamen Leitung in Sekunden lädt, ein großes Spiel aber Stunden dauern kann. Auch Betriebssystem-Updates erreichen oft mehrere Gigabyte. Wer regelmäßig große Dateien lädt, merkt den Unterschied zwischen einem 50- und einem 250-Mbit/s-Anschluss sehr deutlich. Wie sich die Einheiten Byte, Kilobyte, Megabyte und Gigabyte ineinander umrechnen — und warum „500 GB" auf der Festplatte als rund 465 GiB erscheinen — zeigt der <a href="/technik/datenmengen-umrechner">Datenmengen-Umrechner</a>.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Was bei 50 Mbit/s in welcher Zeit lädt',
        kopf: ['Datei', 'Größe', 'Zeit (real, 50 Mbit/s)'],
        zeilen: [
          ['Foto (Smartphone)', '15 MB', '2,8 s'],
          ['MP3-Song', '5 MB', '0,9 s'],
          ['App-Update', '300 MB', '56,5 s'],
          ['HD-Film', '4 GB', '12 min 33 s'],
          ['4K-Film', '25 GB', '1 h 18 min'],
          ['AAA-Spiel', '80 GB', '4 h 11 min'],
        ],
        fussnote: 'Alle Zeiten bei 50 Mbit/s und 85 % Wirkungsgrad, 1 GB = 1.000 MB. Die Werte verdeutlichen die Spannweite: vom Sekundenbruchteil für einen Song bis zu mehreren Stunden für ein großes Spiel. An schnelleren Anschlüssen verkürzen sich alle Zeiten proportional — bei 250 Mbit/s etwa auf ein Fünftel der hier genannten Dauer. Ein Foto oder ein Song lädt damit praktisch unmerklich, während ein 4K-Film oder ein großes Spiel selbst an einer ordentlichen Leitung spürbar Geduld verlangt. Genau hier hilft die Vorab-Schätzung: Sie zeigt, ob sich der Download nebenbei erledigt oder ob man ihn besser über Nacht laufen lässt.',
      },
      {
        typ: 'text',
        titel: 'Upload vs. Download — warum Hochladen oft länger dauert',
        html: `<p>Die meisten Internetanschlüsse sind <strong>asymmetrisch</strong>: Die Download-Geschwindigkeit (Daten empfangen) ist deutlich höher als die Upload-Geschwindigkeit (Daten senden). Ein typischer Kabel- oder DSL-Anschluss mit 100 Mbit/s im Download bietet oft nur 10 bis 40 Mbit/s im Upload.</p><p>Der Grund ist historisch und technisch: Privatnutzer laden traditionell viel mehr herunter, als sie hochladen — Streaming, Surfen und Downloads dominieren. Die Anbieter haben die verfügbare Bandbreite deshalb zugunsten des Downloads aufgeteilt. Spürbar wird das, sobald man selbst große Dateien <strong>versendet</strong>: ein Video in die Cloud sichern, Fotos teilen oder in einer Videokonferenz senden. Diese Vorgänge nutzen den schmaleren Upload-Kanal und dauern entsprechend länger. Nur echte <strong>Glasfaseranschlüsse</strong> bieten häufig symmetrische Raten, bei denen Up- und Download gleich schnell sind. Für die Berechnung der Sendezeit gilt dieselbe Formel — nur mit der Upload-Geschwindigkeit statt der Download-Bandbreite.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Download zu langsam? Das sollten Sie prüfen',
        punkte: [
          'Per LAN-Kabel statt WLAN verbinden — Kabel ist stabiler und meist schneller.',
          'Laufende Hintergrund-Downloads, Updates oder Streams auf anderen Geräten pausieren.',
          'Prüfen, ob die Gegenstelle drosselt — einen anderen Download zum Vergleich starten.',
          'Den gebuchten Tarif kontrollieren: Liefert der Anschluss überhaupt die beworbene Geschwindigkeit?',
          'Router neu starten und auf aktuelle Firmware prüfen.',
          'Mit einem Speedtest die tatsächliche Geschwindigkeit messen, statt auf die Tarif-Angabe zu vertrauen.',
          'Bei dauerhaft zu langsamer Leitung die Breitbandmessung der Bundesnetzagentur als Nachweis nutzen.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Erst die echte Geschwindigkeit messen',
        text: 'Dieser Rechner geht von der Geschwindigkeit aus, die Sie eingeben — meist dem gebuchten Tarifwert. Tatsächlich kommt davon selten die volle Leistung an. Bevor Sie eine zu lange Downloadzeit dem Rechner anlasten, messen Sie die reale Anschlussgeschwindigkeit mit einem Speedtest und tragen den gemessenen Wert ein. So erhalten Sie eine realistische Schätzung. Den tatsächlichen Wert ermitteln und Mbit/s in MB/s umrechnen können Sie mit dem Internetgeschwindigkeit-Rechner; für offizielle Nachweise gegenüber dem Anbieter dient die Breitbandmessung der Bundesnetzagentur. Messen Sie am besten mehrmals zu unterschiedlichen Tageszeiten und idealerweise per LAN-Kabel — so trennen Sie eine generell langsame Leitung von einer nur abends überlasteten und erhalten einen belastbaren Durchschnittswert für die Schätzung.',
      },
      {
        typ: 'text',
        titel: 'Glasfaser-Ausbau und die „bis zu"-Tarife',
        html: `<p>Downloadzeiten werden in den kommenden Jahren weiter sinken, weil der <strong>Glasfaser-Ausbau</strong> in Deutschland voranschreitet. Glasfaser liefert nicht nur höhere Geschwindigkeiten von 250 Mbit/s bis über 1.000 Mbit/s, sondern oft auch symmetrische Up- und Download-Raten und stabilere Verbindungen als Kupfer- oder Kabelnetze.</p><p>Wichtig bleibt der Blick aufs Kleingedruckte: Viele Tarife werben mit <strong>„bis zu"</strong>-Geschwindigkeiten. Das ist der theoretische Bestwert, nicht die garantierte Dauerleistung. Anbieter müssen eine Mindestgeschwindigkeit nennen; wird sie dauerhaft unterschritten, haben Kunden das Recht auf Minderung oder Kündigung. Wer wissen will, was die eigene Leitung wirklich leistet, sollte regelmäßig messen und den realen Wert in diesen Rechner eintragen. Eine genaue Messung samt Umrechnung von Mbit/s in MB/s bietet der <a href="/technik/internetgeschwindigkeit-rechner">Internetgeschwindigkeit-Rechner</a> — er zeigt auch, wie viel von der beworbenen Bandbreite tatsächlich ankommt.</p>`,
      },
    ],
    quellen: [
      {
        titel: 'Bundesnetzagentur — Breitbandmessung',
        url: 'https://www.bundesnetzagentur.de/breitbandmessung',
        hinweis: 'Offizielles Tool zur Messung der tatsächlichen Anschlussgeschwindigkeit.',
      },
      {
        titel: 'Einheiten Bit/Byte (IEC/SI)',
        hinweis: '1 Byte = 8 Bit; Bandbreiten werden in Mbit/s, Dateigrößen in MB/GB angegeben — Faktor 8 beachten.',
      },
    ],
  },
  {
    slug: 'akku-ladezeit-rechner',
    letzteAktualisierung: '2026-06-30',
    titel: 'Akku-Ladezeit-Rechner',
    beschreibung: 'Akku-Ladezeit berechnen: Wie lange lädt ein Handy, Tablet oder eine Powerbank bei gegebener Kapazität und Ladestrom? Inklusive Watt-Umrechnung.',
    kategorie: 'Technik',
    kategorieSlug: 'technik',
    metaTitle: 'Akku-Ladezeit-Rechner — Ladedauer berechnen',
    metaDescription: 'Akku-Ladezeit berechnen: Wie lange lädt ein Akku bei gegebener Kapazität und Ladestrom? Mit Watt-Umrechnung, Ladekurve und Rechenweg.',
    keywords: ['akku ladezeit rechner', 'ladezeit berechnen', 'wie lange lädt akku', 'mah ladezeit', 'powerbank ladezeit', 'handy ladezeit berechnen', 'watt in ma', 'akku laden dauer'],
    icon: '🔋',
    formel: 'Ladezeit = Kapazität(mAh) ÷ Ladestrom(mA) × Effizienzfaktor | Ladestrom(mA) = Leistung(W) ÷ Spannung(V) × 1.000',
    beispiel: '5.000 mAh bei 2.000 mA: 5.000 ÷ 2.000 = 2,5 h (ideal) × 1,2 = 3 h 00 min (real).',
    erklaerung: `**Akku-Ladezeit berechnen — Kapazität, Ladestrom und Effizienz**

Wie lange ein Akku lädt, hängt von seiner Kapazität (in Milliamperestunden, mAh) und dem Ladestrom (in Milliampere, mA) ab. Die Grundrechnung ist einfach: Kapazität geteilt durch Ladestrom ergibt die theoretische Ladezeit in Stunden. Ein 5.000-mAh-Akku an einem 2.000-mA-Ladegerät bräuchte demnach 2,5 Stunden. In der Praxis dauert es länger.

**Warum die reale Ladezeit länger ist**

Lithium-Ionen-Akkus laden nach dem CC/CV-Verfahren (Konstantstrom, dann Konstantspannung). Bis etwa 80 Prozent fließt der volle Strom, danach drosselt der Akku stark, um die Zellen zu schonen. Die letzten 20 Prozent dauern deshalb überproportional lange. Hinzu kommen Wärmeverluste. Dieser Rechner bildet das über einen Effizienzfaktor ab: standardmäßig 1,2 (rund 20 Prozent Aufschlag), 1,3 bei schwachem Netzteil oder Kälte.

**Watt in Milliampere umrechnen**

Viele Ladegeräte geben statt des Stroms eine Leistung in Watt an. Es gilt: Ladestrom (mA) = Leistung (W) ÷ Spannung (V) × 1.000. Ein 10-Watt-Netzteil bei 5 Volt liefert also 2.000 mA. Achtung: Schnellladen nutzt höhere Spannungen (9, 12 oder 20 Volt), weshalb die mAh-Schätzung dort nur eine grobe Näherung ist.`,
    faq: [
      {
        frage: 'Wie berechne ich die Ladezeit eines Akkus?',
        antwort: 'Teilen Sie die Kapazität in mAh durch den Ladestrom in mA — das ergibt die theoretische Ladezeit in Stunden. Für die realistische Zeit multiplizieren Sie mit einem Effizienzfaktor (Standard 1,2). Beispiel: 5.000 mAh ÷ 2.000 mA = 2,5 h × 1,2 = 3 Stunden.',
      },
      {
        frage: 'Warum dauert das Laden länger als berechnet?',
        antwort: 'Lithium-Ionen-Akkus laden nach dem CC/CV-Verfahren: Ab etwa 80 Prozent drosselt der Akku den Strom deutlich, um die Zellen zu schonen. Die letzte Ladephase dauert daher überproportional lange. Zusätzlich entstehen Wärmeverluste. Der Effizienzfaktor von 1,2 bildet diesen Aufschlag von rund 20 Prozent ab.',
      },
      {
        frage: 'Wie rechne ich Watt in Milliampere um?',
        antwort: 'Ladestrom (mA) = Leistung (W) ÷ Spannung (V) × 1.000. Ein 10-Watt-Netzteil bei 5 Volt liefert 2.000 mA. Wichtig: Schnellladegeräte nutzen höhere Spannungen (9, 12, 15 oder 20 Volt), sodass dieselbe Wattzahl einen anderen Strom ergibt — die mAh-Schätzung ist dann nur eine Näherung.',
      },
      {
        frage: 'Warum ist die mAh-Schätzung beim Schnellladen ungenau?',
        antwort: 'mAh-Angaben beziehen sich auf die Zellspannung von rund 3,7 Volt. Schnellladegeräte laden aber mit 9, 12 oder 20 Volt und wandeln die Spannung im Gerät um. Dadurch lässt sich aus der Wattzahl nicht exakt auf den Ladestrom am Akku schließen. Die Berechnung liefert daher eine Orientierung, keinen Laborwert.',
      },
      {
        frage: 'Wie lange lädt eine 20.000-mAh-Powerbank?',
        antwort: 'Bei einem Ladestrom von 2.000 mA (10 W bei 5 V) und Effizienzfaktor 1,2 dauert es rund 12 Stunden. Große Powerbanks laden deshalb am besten über Nacht oder an einem schnelleren Anschluss. Viele Modelle unterstützen Schnellladen mit 18 bis 30 W, was die Zeit deutlich verkürzt.',
      },
      {
        frage: 'Schadet häufiges Schnellladen dem Akku?',
        antwort: 'Schnellladen erzeugt mehr Wärme, was die Alterung leicht beschleunigt. Moderne Akkus und Ladegeräte regeln das aber gut. Wer die Lebensdauer maximieren will, lädt idealerweise zwischen 20 und 80 Prozent und vermeidet dauerhaftes Laden bei 100 Prozent oder großer Hitze. Gelegentliches Schnellladen ist unkritisch.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Wie die Akku-Ladezeit berechnet wird',
        html: `<p>Die Ladezeit eines Akkus hängt von zwei Größen ab: seiner <strong>Kapazität</strong> in Milliamperestunden (mAh) und dem <strong>Ladestrom</strong> in Milliampere (mA). Die Grundrechnung ist denkbar einfach: Kapazität geteilt durch Ladestrom ergibt die theoretische Ladezeit in Stunden. Ein 5.000-mAh-Akku an einem 2.000-mA-Ladegerät bräuchte rechnerisch 2,5 Stunden.</p><p>In der Praxis dauert es jedoch länger. Akkus laden nicht gleichmäßig durch, es entstehen Wärmeverluste, und die letzte Ladephase ist bewusst gedrosselt. Dieser Rechner berücksichtigt das über einen <strong>Effizienzfaktor</strong> — standardmäßig 1,2, also rund 20 Prozent Aufschlag auf die ideale Zeit. Wer die Ladeleistung nur in Watt kennt, kann sie umrechnen: Leistung geteilt durch Spannung mal 1.000 ergibt den Ladestrom in Milliampere. Das Ergebnis ist eine realistische Orientierung — der genaue Wert hängt vom Gerät, vom Ladegerät und vom Ladezustand ab.</p>`,
      },
      {
        typ: 'statistik',
        titel: 'Typische Akkukapazitäten',
        werte: [
          { label: 'Smartphone', wert: '4.000–5.000 mAh', hinweis: 'je nach Modell und Displaygröße' },
          { label: 'Tablet', wert: '7.000–11.000 mAh', hinweis: 'größeres Display, mehr Kapazität' },
          { label: 'Powerbank', wert: '10.000–27.000 mAh', hinweis: 'lädt ein Handy oft mehrfach' },
          { label: 'Smartwatch', wert: '300–600 mAh', hinweis: 'kleiner Akku, kurze Ladezeit' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: '5.000 mAh bei 2.000 mA',
        schritte: [
          { label: 'Theoretische Zeit (ideal)', formel: '5.000 mAh ÷ 2.000 mA', ergebnis: '2,5 h = 2 h 30 min' },
          { label: 'Realistische Zeit (Effizienz 1,2)', formel: '2,5 h × 1,2', ergebnis: '3 h = 3 h 00 min' },
        ],
        fazit: 'Ein typischer 5.000-mAh-Smartphone-Akku lädt an einem 2.000-mA-Netzteil (rund 10 Watt) rechnerisch in 2,5 Stunden — realistisch in etwa 3 Stunden. Die zusätzliche halbe Stunde entsteht durch Wärmeverluste und die gedrosselte Ladeschlussphase ab rund 80 Prozent. Mit einem stärkeren Schnellladegerät (z. B. 20 bis 30 Watt) sinkt die Zeit deutlich, weil bis zur 80-Prozent-Marke mehr Strom fließt. Genau diese erste Phase geht beim Schnellladen besonders flott, während die letzten 20 Prozent bei jedem Ladegerät vergleichsweise zäh bleiben. Wer es eilig hat, gewinnt also mit einem stärkeren Netzteil vor allem im unteren und mittleren Ladebereich Zeit — bis voll geladen ist der Unterschied kleiner, als die reine Wattzahl vermuten lässt.',
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'mAh-Schätzung und die Spannungs-Falle',
        text: 'Ein 20-Watt-Netzteil liefert nicht automatisch 4.000 mA an den Akku. Der Grund: Schnellladen nutzt höhere Spannungen. Während ein einfaches USB-Netzteil mit 5 Volt arbeitet (20 W ÷ 5 V = 4.000 mA), lädt ein Schnellladegerät oft mit 9, 12 oder 20 Volt — bei 20 W und 9 V wären das nur rund 2.200 mA auf der Netzteil-Seite. Zusätzlich beziehen sich mAh-Angaben des Akkus auf dessen Zellspannung von etwa 3,7 Volt, während das Ladegerät mit anderer Spannung arbeitet und im Gerät umgewandelt wird. Deshalb ist jede mAh-Berechnung aus einer Wattzahl nur eine grobe Näherung. Für eine verlässliche Schätzung den tatsächlichen Ladestrom in mA verwenden, falls er bekannt ist. Als Faustregel gilt: Je weiter die Schnellladespannung über den 5 Volt eines einfachen Netzteils liegt, desto stärker weicht die einfache mAh-Rechnung nach unten ab. Wer es genau wissen will, schaut auf das Datenblatt des Ladegeräts, das die unterstützten Spannungs- und Stromstufen auflistet — etwa „9 V / 2 A" für 18-Watt-Schnellladen. Daraus lässt sich der reale Ladestrom an der jeweiligen Stufe deutlich präziser ableiten als aus der reinen Wattzahl.',
      },
      {
        typ: 'text',
        titel: 'Warum die echte Ladezeit länger ist als die ideale',
        html: `<p>Lithium-Ionen-Akkus laden nach dem <strong>CC/CV-Verfahren</strong> (Constant Current, Constant Voltage). In der ersten Phase fließt ein konstanter, hoher Strom — der Akku füllt sich zügig bis etwa <strong>80 Prozent</strong>. Danach schaltet das Lademanagement auf konstante Spannung um, und der Strom sinkt kontinuierlich, um die Zellen nicht zu überlasten.</p><p>Diese zweite Phase ist der Grund, warum die letzten 20 Prozent oft genauso lange dauern wie die ersten 80. Wer schon einmal beobachtet hat, dass das Handy in 30 Minuten von 20 auf 80 Prozent springt, dann aber für die restlichen 20 Prozent fast ebenso lange braucht, hat genau diesen Effekt gesehen. Hinzu kommen <strong>Wärmeverluste</strong>: Ein Teil der zugeführten Energie wird nicht gespeichert, sondern in Wärme umgesetzt — besonders beim Schnellladen oder in einer warmen Umgebung. Der Effizienzfaktor von 1,2 bündelt beide Effekte zu einem realistischen Aufschlag von rund 20 Prozent. Bei Kälte oder einem schwachen Netzteil kann er auf 1,3 steigen.</p>`,
      },
      {
        typ: 'statistik',
        titel: 'Typische Ladeleistungen',
        werte: [
          { label: 'Standard-Netzteil', wert: '5–10 W', hinweis: 'ältere und einfache Ladegeräte' },
          { label: 'Schnellladen', wert: '20–45 W', hinweis: 'USB Power Delivery, höhere Spannung' },
          { label: 'Laptop (USB-C)', wert: '65–100 W', hinweis: 'für Notebooks und große Geräte' },
          { label: 'Kabellos (Qi)', wert: '5–15 W', hinweis: 'bequem, aber mehr Wärmeverlust' },
        ],
      },
      {
        typ: 'tabelle',
        titel: 'Ladezeit eines 5.000-mAh-Akkus je Ladestrom',
        kopf: ['Ladestrom', 'grobe Leistung (5 V)', 'Ladezeit (real)'],
        zeilen: [
          ['1.000 mA', '5 W', '6 h 00 min'],
          ['2.000 mA', '10 W', '3 h 00 min'],
          ['3.000 mA', '15 W', '2 h 00 min'],
          ['5.000 mA', '25 W', '1 h 12 min'],
        ],
        fussnote: 'Berechnet für einen 5.000-mAh-Akku bei Effizienzfaktor 1,2. Die Leistungsangabe (5 V) ist eine grobe Orientierung — Schnellladegeräte nutzen höhere Spannungen, sodass dieselbe Wattzahl einen anderen Strom liefert. Gut zu sehen ist der abnehmende Nutzen: Die Verdopplung von 1.000 auf 2.000 mA halbiert die Zeit, während der Sprung von 3.000 auf 5.000 mA nur noch rund 48 Minuten spart. Sehr hohe Ladeströme bringen außerdem mehr Wärme und damit mehr Verlust. In der Praxis akzeptiert nicht jeder Akku jeden Ladestrom: Das Lademanagement im Gerät begrenzt den Strom auf einen für die Zellen sicheren Wert. Ein sehr starkes Netzteil lädt einen kleinen Akku deshalb nicht beliebig schneller — der Akku zieht nur so viel, wie er verträgt. Die Tabellenwerte sind daher eine Obergrenze des theoretisch Möglichen.',
      },
      {
        typ: 'text',
        titel: 'Watt in Milliampere umrechnen — warum die Spannung zählt',
        html: `<p>Viele Ladegeräte sind in <strong>Watt</strong> (Leistung) statt in Milliampere (Strom) beschriftet. Die Umrechnung lautet: <strong>Ladestrom (mA) = Leistung (W) ÷ Spannung (V) × 1.000</strong>. Ein 10-Watt-Netzteil bei 5 Volt liefert also 2.000 mA, ein 20-Watt-Netzteil bei 5 Volt entsprechend 4.000 mA.</p><p>Entscheidend ist die <strong>Spannung</strong>. Moderne Schnellladestandards wie USB Power Delivery handeln zwischen Gerät und Netzteil eine passende Spannung aus — die Stufen sind typischerweise <strong>5, 9, 12, 15 und 20 Volt</strong>. Ein 20-Watt-Ladegerät, das mit 9 Volt lädt, liefert nur rund 2.200 mA statt 4.000 mA bei 5 Volt. Die Leistung bleibt gleich, der Strom unterscheidet sich. Deshalb ist die mAh-Schätzung beim Schnellladen ungenauer als bei einfachen 5-Volt-Netzteilen. Wer den tatsächlichen Stromverbrauch und die Kosten seiner Geräte über die Leistung abschätzen will, findet im <a href="/technik/stromverbrauch-geraete-rechner">Stromverbrauch-Rechner</a> die passende Ergänzung.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Akkutypen und grobe Ladezeit bei Standardladung',
        kopf: ['Gerät', 'Kapazität', 'Ladestrom (Standard)', 'Ladezeit (real)'],
        zeilen: [
          ['Smartwatch', '400 mAh', '400 mA (2 W)', '1 h 12 min'],
          ['Smartphone', '5.000 mAh', '2.000 mA (10 W)', '3 h 00 min'],
          ['Tablet', '8.000 mAh', '2.400 mA (12 W)', '4 h 00 min'],
          ['Powerbank', '20.000 mAh', '2.000 mA (10 W)', '12 h 00 min'],
        ],
        fussnote: 'Richtwerte bei Standardladung und Effizienzfaktor 1,2. Mit Schnellladegeräten (20 bis 45 W) verkürzen sich diese Zeiten deutlich, vor allem bis zur 80-Prozent-Marke. Große Powerbanks laden an einfachen Netzteilen am längsten — hier lohnt sich ein Anschluss mit höherer Leistung oder das Laden über Nacht besonders. Die tatsächliche Zeit hängt zusätzlich vom Alter des Akkus und der Temperatur ab. Wichtig bei Powerbanks: Beim Laden gehen durch die Wandlung Verluste verloren, und beim späteren Entladen ans Handy noch einmal — von der aufgedruckten Kapazität kommt am Endgerät real oft nur rund 60 bis 70 Prozent an. Die hier genannten Zeiten beziehen sich auf das Aufladen der Powerbank selbst, nicht auf das spätere Weitergeben der Energie.',
      },
      {
        typ: 'checkliste',
        titel: 'Akku lädt langsam? Das sollten Sie prüfen',
        punkte: [
          'Das mitgelieferte Original-Netzteil verwenden — schwache Ladegeräte liefern oft nur 5 W.',
          'Ein hochwertiges Kabel mit ausreichendem Querschnitt nutzen; dünne Billigkabel bremsen den Strom.',
          'Nicht mehrere Geräte gleichzeitig an einem Mehrfach-USB-Port laden — die Leistung teilt sich auf.',
          'Stromhungrige Hintergrund-Apps schließen oder das Gerät im Flugmodus laden.',
          'Die Akkutemperatur beachten — Hitze und Kälte verlangsamen das Laden spürbar.',
          'Bei alten Geräten den Akkuverschleiß prüfen; ein gealterter Akku lädt langsamer und hält kürzer.',
          'Die Ladebuchse auf Schmutz oder lose Kontakte kontrollieren.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Bei rund 80 Prozent stoppen schont den Akku',
        text: 'Lithium-Ionen-Akkus altern am wenigsten, wenn sie überwiegend zwischen 20 und 80 Prozent betrieben werden. Dauerhaftes Laden auf volle 100 Prozent und das Liegenlassen bei hohem Ladestand setzen den Zellen stärker zu. Viele Geräte bieten daher eine Funktion zum Begrenzen der Ladung oder ein optimiertes Laden, das die letzten Prozente erst kurz vor dem üblichen Weckzeitpunkt auffüllt. Praktischer Nebeneffekt: Wer ohnehin meist nur bis 80 Prozent lädt, profitiert von der schnellen CC-Phase und spart sich die zähe Ladeschlussphase. Schnellladen selbst ist unkritisch, solange der Akku dabei nicht dauerhaft heiß wird — moderne Geräte regeln Strom und Temperatur automatisch. Ebenfalls hilfreich: das Gerät beim Laden nicht unter dicke Kissen oder Decken legen, damit die Wärme abziehen kann, und es bei sommerlicher Hitze nicht zusätzlich in der prallen Sonne laden. Wärme ist der größte Feind der Akku-Lebensdauer — noch vor der reinen Zahl der Ladezyklen.',
      },
      {
        typ: 'text',
        titel: 'Akkuverschleiß: Warum die Ladezeit mit dem Alter steigt',
        html: `<p>Akkus verlieren über ihre Lebensdauer an Kapazität. Nach mehreren hundert <strong>Ladezyklen</strong> — ein Zyklus entspricht einer vollen Ladung — sinkt die nutzbare Kapazität spürbar, oft auf 80 Prozent oder weniger nach etwa 500 bis 1.000 Zyklen. Ein gealterter Akku nimmt nicht nur weniger Energie auf, er lädt häufig auch langsamer, weil das Lademanagement vorsichtiger wird, um die müden Zellen zu schonen.</p><p>Das erklärt, warum ein zwei Jahre altes Smartphone gefühlt länger an der Steckdose hängt als am ersten Tag — und gleichzeitig schneller leer ist. Wer die Lebensdauer verlängern will, vermeidet Tiefentladung, dauerhafte Hitze und konstantes Laden bei 100 Prozent. Für eine grobe Vorstellung, wie lange einzelne Vorgänge im Alltag dauern, hilft auch der <a href="/technik/download-rechner">Download-Rechner</a> als verwandtes Werkzeug aus der Technik-Kategorie. Bleibt die reale Ladezeit deutlich hinter den hier berechneten Werten zurück, ist meist ein verschlissener Akku oder ein schwaches Netzteil die Ursache.</p>`,
      },
    ],
    quellen: [
      {
        titel: 'USB Power Delivery (USB-IF Spezifikation)',
        hinweis: 'Definiert die Spannungsstufen 5/9/12/15/20 V beim Schnellladen — Grund, warum mAh-Schätzungen nur Näherungen sind.',
      },
      {
        titel: 'Li-Ion-Ladeverfahren CC/CV',
        hinweis: 'Konstantstrom-/Konstantspannungs-Laden: ab ca. 80 % sinkt der Ladestrom, dadurch dauert die letzte Ladephase überproportional lange.',
      },
    ],
  },
  {
    slug: 'powerbank-rechner',
    letzteAktualisierung: '2026-06-30',
    titel: 'Powerbank-Rechner',
    beschreibung: 'Powerbank-Ladungen berechnen: Wie oft lädt eine Powerbank Ihr Handy oder Tablet? Mit nutzbarer statt aufgedruckter Kapazität.',
    kategorie: 'Technik',
    kategorieSlug: 'technik',
    metaTitle: 'Powerbank-Rechner — Ladungen berechnen',
    metaDescription: 'Powerbank-Rechner: Wie oft lädt eine Powerbank Ihr Handy? Mit nutzbarer statt aufgedruckter Kapazität — realistisch dank Wirkungsgrad.',
    keywords: ['powerbank rechner', 'wie oft lädt powerbank handy', 'powerbank kapazität nutzbar', 'powerbank ladungen berechnen', 'nutzbare kapazität powerbank', '20000 mah powerbank', 'powerbank wirkungsgrad', 'powerbank handy laden'],
    icon: '🔋',
    formel: 'Nutzbare Kapazität = Nennkapazität(mAh) × Wirkungsgrad | Ladungen = Nutzbare Kapazität ÷ Geräte-Akku(mAh)',
    beispiel: '20.000 mAh × 0,65 = 13.000 mAh nutzbar ÷ 5.000 mAh Handy = 2,6 volle Ladungen.',
    erklaerung: `**Powerbank-Ladungen berechnen — warum die aufgedruckte Kapazität täuscht**

Wie oft eine Powerbank ein Gerät lädt, lässt sich nicht einfach durch Teilen der aufgedruckten Kapazität durch den Geräte-Akku ermitteln. Eine 20.000-mAh-Powerbank lädt ein 5.000-mAh-Handy nämlich nicht vier Mal, sondern nur rund 2,6 Mal. Der Grund liegt in der Spannungswandlung.

**Nutzbare statt aufgedruckte Kapazität**

Die aufgedruckte Kapazität gilt für die verbauten Lithium-Ionen-Zellen mit rund 3,7 Volt. Geladen wird ein Handy aber über den USB-Anschluss mit 5 Volt. Die Powerbank muss die Spannung also hochwandeln — und dabei gehen rund ein Drittel der Energie als Wärme und Wandlungsverlust verloren. Real nutzbar bleiben typisch 60 bis 70 Prozent. Dieser Rechner setzt standardmäßig einen Wirkungsgrad von 0,65 an.

**Die Rechnung**

Nutzbare Kapazität = Nennkapazität × Wirkungsgrad; Ladungen = nutzbare Kapazität ÷ Geräte-Akku. Eine 20.000-mAh-Powerbank hat also rund 13.000 mAh nutzbar und lädt damit ein 5.000-mAh-Handy etwa 2,6 Mal voll. Wer kürzere, dickere Kabel nutzt und nicht schnelllädt, kommt näher an 70 Prozent.`,
    faq: [
      {
        frage: 'Warum lädt eine 20.000-mAh-Powerbank mein 5.000-mAh-Handy nicht 4-mal?',
        antwort: 'Weil die aufgedruckte Kapazität für die Zellspannung von 3,7 Volt gilt, das Handy aber über 5 Volt geladen wird. Bei der Spannungswandlung gehen rund 35 Prozent als Wärme und Wandlerverlust verloren. Aus 20.000 mAh werden so nur rund 13.000 mAh nutzbar — das reicht für etwa 2,6 statt 4 volle Ladungen.',
      },
      {
        frage: 'Was ist der Unterschied zwischen aufgedruckter und nutzbarer Kapazität?',
        antwort: 'Die aufgedruckte (Nenn-)Kapazität beschreibt die Energie der Akkuzellen bei 3,7 Volt. Die nutzbare Kapazität ist das, was nach Spannungswandlung auf 5 Volt und Verlusten tatsächlich beim Endgerät ankommt — typisch 60 bis 70 Prozent. Bei einer 10.000-mAh-Powerbank sind das nur rund 6.500 mAh.',
      },
      {
        frage: 'Wie viele Ladungen schafft eine 10.000-mAh-Powerbank?',
        antwort: 'Mit rund 6.500 mAh nutzbarer Kapazität lädt sie ein modernes 5.000-mAh-Handy nur etwa 1,3-mal voll — also gut einmal mit kleiner Reserve. Wer mehrere Ladungen braucht, sollte zu 20.000 mAh oder mehr greifen. Ältere Handys mit 3.000 mAh lädt eine 10.000er rund 2-mal.',
      },
      {
        frage: 'Welchen Wirkungsgrad soll ich ansetzen?',
        antwort: 'Realistisch sind 65 Prozent (Standard im Rechner). Bei kurzen, dicken Kabeln und langsamem Laden sind bis zu 70 Prozent möglich. Schnellladen, lange oder dünne Kabel und Kälte drücken den Wert auf 60 Prozent oder darunter. Der genaue Wert schwankt je nach Powerbank, Kabel und Gerät.',
      },
      {
        frage: 'Welche Powerbank darf ich im Flugzeug mitnehmen?',
        antwort: 'Powerbanks bis 100 Wattstunden (Wh) sind im Handgepäck ohne Genehmigung erlaubt — das entspricht bei 3,7 Volt rund 27.000 mAh. Zwischen 100 und 160 Wh ist die Zustimmung der Airline nötig, darüber ist die Mitnahme verboten. Powerbanks gehören immer ins Handgepäck, nie in den Koffer.',
      },
      {
        frage: 'Warum schafft meine alte Powerbank weniger Ladungen?',
        antwort: 'Wie jeder Lithium-Ionen-Akku verliert auch eine Powerbank über die Ladezyklen an Kapazität. Nach einigen hundert Zyklen sinkt die nutzbare Energie spürbar. Zusätzlich entladen sich Powerbanks langsam von selbst (Selbstentladung), wenn sie ungenutzt liegen. Beides senkt die Zahl der realen Ladungen mit dem Alter.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Wie man Powerbank-Ladungen berechnet',
        html: `<p>Die naheliegende Rechnung führt in die Irre: Eine 20.000-mAh-Powerbank lädt ein 5.000-mAh-Handy <strong>nicht</strong> vier Mal voll. Der Grund ist die <strong>nutzbare Kapazität</strong>, die deutlich unter dem aufgedruckten Wert liegt.</p><p>Die korrekte Rechnung läuft in zwei Schritten: Zuerst wird die <strong>Nennkapazität mit einem Wirkungsgrad multipliziert</strong>, um die tatsächlich abgebbare Energie zu erhalten — standardmäßig 0,65, also rund 65 Prozent. Anschließend wird diese nutzbare Kapazität durch den <strong>Geräte-Akku</strong> geteilt. Für die 20.000-mAh-Powerbank bedeutet das: 20.000 × 0,65 = 13.000 mAh nutzbar, geteilt durch 5.000 mAh ergibt rund 2,6 volle Ladungen. Das Ergebnis ist eine realistische Schätzung — der genaue Wert hängt vom Kabel, der Ladegeschwindigkeit und dem Zustand der Powerbank ab. Wer den aufgedruckten Wert einfach durch den Handy-Akku teilt, überschätzt die Zahl der Ladungen dagegen systematisch um die Hälfte.</p>`,
      },
      {
        typ: 'vergleich',
        titel: 'Aufgedruckt vs. nutzbar',
        spalteA: 'Nennkapazität (3,7 V)',
        spalteB: 'Nutzbar (5 V, ~65 %)',
        zeilen: [
          { kriterium: 'Mini-Powerbank', a: '10.000 mAh', b: '≈ 6.500 mAh' },
          { kriterium: 'Standard', a: '20.000 mAh', b: '≈ 13.000 mAh' },
          { kriterium: 'XL / Reise', a: '27.000 mAh', b: '≈ 17.550 mAh' },
          { kriterium: 'Faustregel', a: 'aufgedruckter Wert', b: 'mal 0,6 bis 0,7 rechnen' },
        ],
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Die mAh-Falle',
        text: 'Aufgedruckte 20.000 mAh klingen nach vier vollen Handyladungen — tatsächlich sind es nur etwa 2,6. Der Trick steckt in der Spannung: Die Kapazitätsangabe gilt für die Akkuzellen mit 3,7 Volt, geladen wird das Handy aber über 5 Volt am USB-Anschluss. Beim Hochwandeln der Spannung gehen rund 35 Prozent der Energie verloren. Von 20.000 mAh bleiben so real nur rund 13.000 mAh übrig. Deshalb darf man niemals die aufgedruckte Kapazität direkt durch den Handy-Akku teilen — das überschätzt die Ladungen um etwa die Hälfte. Wer ehrlich plant, rechnet mit dem nutzbaren Wert von 60 bis 70 Prozent der Nennkapazität. Hersteller geben die größere Zahl an, weil sie auf dem Datenblatt eindrucksvoller wirkt. Seriöse Tests bestätigen diesen Bereich quer durch alle Marken: Egal ob günstiges No-Name-Modell oder Markengerät, am Ende kommen nur selten mehr als zwei Drittel der aufgedruckten Energie beim Handy an. Unterschiede gibt es vor allem in der zweiten Nachkommastelle, nicht in der Größenordnung. Manche Anbieter drucken inzwischen zusätzlich die nutzbare Kapazität oder die Wattstunden auf — ein Blick darauf erspart die Umrechnung. Steht nur die Nennkapazität in mAh auf dem Gehäuse, ist die Faustregel „mal 0,65" der sicherste Weg zu einer ehrlichen Erwartung. Wer mehrere Geräte über mehrere Tage versorgen will, sollte diese Reserve von vornherein einplanen, statt sich auf die optimistische Zahl auf der Verpackung zu verlassen.',
      },
      {
        typ: 'beispielrechnung',
        titel: '20.000-mAh-Powerbank lädt ein 5.000-mAh-Handy',
        schritte: [
          { label: 'Nutzbare Kapazität', formel: '20.000 mAh × 0,65', ergebnis: '13.000 mAh' },
          { label: 'Volle Ladungen', formel: '13.000 mAh ÷ 5.000 mAh', ergebnis: '2,6 ×' },
        ],
        fazit: 'Eine handelsübliche 20.000-mAh-Powerbank lädt ein modernes Smartphone mit 5.000 mAh rund 2,6 Mal voll — nicht vier Mal, wie die aufgedruckte Zahl suggeriert. In der Praxis heißt das: gut zwei volle Ladungen plus eine halbe als Reserve. Für ein verlängertes Wochenende ohne Steckdose reicht das meist aus. Wer ein größeres Gerät wie ein Tablet (8.000 mAh) laden will, kommt mit derselben Powerbank nur noch auf rund 1,6 Ladungen. Die nutzbaren 13.000 mAh sind also der ehrliche Wert, mit dem man planen sollte. Rechnet man stattdessen naiv mit den aufgedruckten 20.000 mAh, landet man bei vier Ladungen — und steht am dritten Tag ohne Strom da. Genau diese Differenz zwischen Erwartung und Realität ist der häufigste Grund für Enttäuschung mit Powerbanks. Wer die 0,65 von Anfang an mitrechnet, plant verlässlich und wird unterwegs nicht überrascht.',
      },
      {
        typ: 'text',
        titel: 'Warum der Verlust entsteht',
        html: `<p>Der Energieverlust einer Powerbank hat mehrere Ursachen, die sich addieren. Der größte Brocken ist die <strong>Spannungswandlung</strong>: Die Akkuzellen liefern rund 3,7 Volt, der USB-Anschluss gibt 5 Volt aus. Diesen Schritt erledigt ein Wandler im Inneren der Powerbank — und jeder Wandler arbeitet nicht verlustfrei, sondern erzeugt <strong>Wärme</strong>.</p><p>Hinzu kommt die <strong>Ladeeffizienz des Endgeräts</strong>: Auch das Handy wandelt die 5 Volt wieder auf seine eigene Zellspannung herunter und verliert dabei Energie. Schließlich spielt der <strong>Kabelwiderstand</strong> eine Rolle — lange oder dünne Kabel kosten zusätzliche Prozente, dicke und kurze Kabel sparen sie. In Summe kommen am Geräteakku typischerweise nur 60 bis 70 Prozent der aufgedruckten Energie an. Beim Schnellladen mit höheren Spannungen oder bei Kälte sinkt der Wert weiter. Wie lange das eigentliche Laden des Geräts dann dauert, zeigt der <a href="/technik/akku-ladezeit-rechner">Akku-Ladezeit-Rechner</a>.</p>`,
      },
      {
        typ: 'statistik',
        titel: 'Typische Powerbank-Größen',
        werte: [
          { label: 'Mini', wert: '5.000 mAh', hinweis: 'Notfall, Schlüsselbund-Format' },
          { label: 'Standard', wert: '10.000 mAh', hinweis: 'Alltag, ein Tag unterwegs' },
          { label: 'Groß', wert: '20.000 mAh', hinweis: 'Wochenende, mehrere Ladungen' },
          { label: 'XL (Fluglimit)', wert: '26.800 mAh', hinweis: '≈ 99 Wh, knapp unter der 100-Wh-Grenze' },
        ],
      },
      {
        typ: 'tabelle',
        titel: '20.000-mAh-Powerbank: Ladungen je Gerät',
        kopf: ['Geräte-Akku', 'Beispiel', 'Volle Ladungen'],
        zeilen: [
          ['3.000 mAh', 'kleines oder älteres Handy', '4,3 ×'],
          ['4.000 mAh', 'Standard-Handy', '3,3 ×'],
          ['5.000 mAh', 'großes Handy', '2,6 ×'],
          ['8.000 mAh', 'kleines Tablet', '1,6 ×'],
        ],
        fussnote: 'Berechnet mit der nutzbaren Kapazität von rund 13.000 mAh (20.000 mAh × Wirkungsgrad 0,65). Je größer der Geräteakku, desto weniger volle Ladungen — ein Tablet zieht so viel Energie wie zwei Handys. Die Werte sind Richtwerte: Schnellladen, lange Kabel oder Kälte senken die Zahl der Ladungen, kurze Kabel und langsames Laden erhöhen sie leicht. Zu beachten ist außerdem, dass moderne Geräte selten von 0 auf 100 Prozent geladen werden — wer sein Handy schon bei 30 Prozent ansteckt, holt entsprechend mehr Teilladungen aus der Powerbank. Die Tabelle geht von einer vollständigen Ladung des leeren Geräts aus und bildet damit den ungünstigsten, aber gut planbaren Fall ab.',
      },
      {
        typ: 'vergleich',
        titel: 'Welche Powerbank für wen',
        spalteA: 'Powerbank-Klasse',
        spalteB: 'Passt für',
        zeilen: [
          { kriterium: '5.000 mAh', a: 'Mini, Schlüsselbund-Format', b: 'Notfall: rund eine halbe bis ganze Handyladung' },
          { kriterium: '10.000 mAh', a: 'Kompakt, Alltag', b: 'gut eine volle Handyladung, ein Tag unterwegs' },
          { kriterium: '20.000 mAh', a: 'Standard, Wochenende', b: 'rund 2 bis 3 Handyladungen oder Handy plus Tablet' },
          { kriterium: '26.800 mAh', a: 'XL, gerade noch fluggeeignet', b: 'Reise, Tablet, mehrere Geräte über Tage' },
        ],
      },
      {
        typ: 'text',
        titel: 'Flugreise: die 100-Wattstunden-Grenze',
        html: `<p>Wer mit einer Powerbank fliegt, muss die <strong>Wattstunden (Wh)</strong> kennen, nicht nur die mAh. Die Umrechnung lautet: Wattstunden = mAh × Spannung (V) ÷ 1.000. Bei der Zellspannung von 3,7 Volt entsprechen 27.000 mAh also rund <strong>100 Wh</strong> (27.000 × 3,7 ÷ 1.000 ≈ 99,9).</p><p>Diese 100 Wh sind die entscheidende Grenze: Powerbanks bis 100 Wh dürfen ohne Genehmigung im <strong>Handgepäck</strong> mitgeführt werden. Zwischen 100 und 160 Wh ist die ausdrückliche <strong>Zustimmung der Fluggesellschaft</strong> nötig, darüber ist die Mitnahme grundsätzlich verboten. Powerbanks gehören außerdem immer ins Handgepäck, niemals in den aufgegebenen Koffer — wegen der Brandgefahr von Lithium-Akkus im Frachtraum. Viele Reise-Powerbanks sind genau deshalb mit 26.800 mAh angegeben: Das liegt knapp unter der 100-Wh-Schwelle und ist ohne Rückfrage flugtauglich. Auf vielen Modellen ist die Wh-Zahl deshalb direkt aufgedruckt. Wer eine größere Powerbank besitzt, sollte vor dem Flug die Wattstunden prüfen und im Zweifel bei der Airline nachfragen — am Sicherheitscheck zählt allein der Wh-Wert, nicht die mAh-Zahl auf der Verpackung.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Mehr aus der Powerbank holen',
        punkte: [
          'Ein kurzes, dickes Kabel verwenden — lange dünne Kabel kosten spürbar Energie.',
          'Auf Schnellladen verzichten, wenn es auf maximale Ladungszahl ankommt; langsames Laden ist effizienter.',
          'Das Gerät möglichst nicht gleichzeitig benutzen und laden — das verlängert und verteuert den Vorgang.',
          'Die Powerbank nicht bei Kälte einsetzen; niedrige Temperaturen senken die nutzbare Kapazität.',
          'Vor der Reise die Powerbank voll aufladen — sie entlädt sich mit der Zeit auch von selbst.',
          'Auf die Wattstunden achten, wenn die Powerbank ins Flugzeug soll (Grenze 100 Wh).',
          'Eine zur Nutzung passende Größe wählen, statt die größte zu kaufen — XL-Powerbanks sind schwer und laden langsam.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Realistisch mit rund 65 Prozent rechnen',
        text: 'Als Faustregel liefert eine Powerbank etwa 60 bis 70 Prozent ihrer aufgedruckten Kapazität an das Endgerät. Wer plant, sollte deshalb mit rund 65 Prozent rechnen — nicht mit dem vollen Nennwert. Konkret heißt das: Eine 10.000-mAh-Powerbank lädt ein modernes Smartphone (4.000 bis 5.000 mAh) meist nur gut einmal komplett voll, nicht zwei Mal. Für zwei sichere Ladungen sollte man eher zu einer 20.000-mAh-Powerbank greifen. Diese realistische Einschätzung erspart böse Überraschungen unterwegs, wenn der vermeintliche Energievorrat schneller leer ist als gedacht. Im Zweifel lieber eine Nummer größer wählen, als sich auf die optimistische Herstellerangabe zu verlassen. Ein einfacher Gegencheck im Alltag: Hält die Powerbank, was die Rechnung verspricht, oder ist sie schon nach anderthalb statt den erwarteten zwei Ladungen leer? Weicht der reale Wert stark nach unten ab, liegt es meist am Kabel, am Schnellladen oder am Alter der Powerbank — nicht an einer falschen Rechnung. Wer dagegen nur sein Handy für einen langen Tag absichern will, ist mit einer kompakten 10.000er meist besser bedient als mit einem schweren XL-Modell, das ständig halb voll in der Tasche liegt. Das Gewicht und die Ladezeit der Powerbank selbst wachsen mit der Kapazität — die größte Powerbank ist also nicht automatisch die beste Wahl, sondern die, die zur tatsächlichen Nutzung passt.',
      },
      {
        typ: 'text',
        titel: 'Powerbank-Verschleiß: Warum die Ladungen mit dem Alter sinken',
        html: `<p>Eine Powerbank ist selbst ein Lithium-Ionen-Akku und unterliegt demselben Verschleiß wie der Handy-Akku. Mit jedem <strong>Ladezyklus</strong> altert sie ein Stück; nach einigen hundert Zyklen sinkt die nutzbare Kapazität merklich, oft auf 80 Prozent oder weniger. Eine zwei Jahre alte Powerbank liefert deshalb spürbar weniger Ladungen als am ersten Tag.</p><p>Hinzu kommt die <strong>Selbstentladung</strong>: Auch ungenutzt verliert eine Powerbank langsam Ladung — wer sie monatelang im Schrank liegen lässt, findet sie oft halb leer vor. Für eine lange Lebensdauer hilft es, die Powerbank weder dauerhaft voll noch ganz leer zu lagern und sie vor Hitze zu schützen. Wer den Stromverbrauch und die Lade­kosten der eigenen Geräte einschätzen will, findet im <a href="/technik/stromverbrauch-geraete-rechner">Stromverbrauch-Rechner</a> ein passendes Werkzeug. Bleibt die reale Ladungszahl deutlich hinter den hier berechneten Werten zurück, ist die Powerbank meist schlicht in die Jahre gekommen und sollte bei häufigem Einsatz ersetzt werden.</p>`,
      },
    ],
    quellen: [
      {
        titel: 'IATA-Bestimmungen Lithium-Akkus im Handgepäck',
        hinweis: 'Powerbanks bis 100 Wh (~27.000 mAh bei 3,7 V) sind ohne Genehmigung erlaubt, 100–160 Wh nur mit Airline-Zustimmung.',
      },
      {
        titel: 'Wirkungsgrad Spannungswandlung (3,7 V → 5 V)',
        hinweis: 'Die Nennkapazität gilt bei Zellspannung 3,7 V; die Umwandlung auf 5 V USB plus Verluste senkt die nutzbare Kapazität auf typisch 60–70 %.',
      },
    ],
  },
  {
    slug: 'aufloesung-seitenverhaeltnis-rechner',
    letzteAktualisierung: '2026-06-30',
    titel: 'Seitenverhältnis-Rechner',
    beschreibung: 'Seitenverhältnis aus der Auflösung berechnen (16:9, 21:9, 4:5) oder eine fehlende Seite aus dem Verhältnis bestimmen — mit Rechenweg.',
    kategorie: 'Technik',
    kategorieSlug: 'technik',
    metaTitle: 'Seitenverhältnis-Rechner — Format berechnen',
    metaDescription: 'Seitenverhältnis-Rechner: aus der Auflösung das Format (16:9, 21:9, 4:5) bestimmen oder eine fehlende Seite berechnen — mit Rechenweg.',
    keywords: ['seitenverhältnis rechner', 'aspect ratio rechner', '16:9 berechnen', 'auflösung seitenverhältnis', 'bildformat berechnen', 'fehlende seite berechnen', '21:9 64:27', 'pixel verhältnis'],
    icon: '📐',
    formel: 'Verhältnis = Breite ÷ ggT : Höhe ÷ ggT | Fehlende Höhe = Breite × Höhen-Anteil ÷ Breiten-Anteil',
    beispiel: '1920 × 1080: ggT = 120 → 1920 ÷ 120 : 1080 ÷ 120 = 16:9 (Full HD).',
    erklaerung: `**Seitenverhältnis berechnen — aus der Auflösung das Bildformat bestimmen**

Das Seitenverhältnis beschreibt das Verhältnis von Breite zu Höhe eines Bildes oder Bildschirms — unabhängig von der absoluten Pixelzahl. Es wird als gekürztes Zahlenpaar geschrieben, etwa 16:9 oder 4:3. Dieser Rechner ermittelt aus einer Auflösung das Seitenverhältnis und kann umgekehrt aus einem Verhältnis und einer bekannten Seite die fehlende Dimension berechnen.

**Vom Pixelmaß zum gekürzten Verhältnis**

Um aus einer Auflösung wie 1920 × 1080 das Verhältnis zu erhalten, werden beide Werte durch ihren größten gemeinsamen Teiler (ggT) geteilt. Für 1920 und 1080 ist der ggT 120, woraus sich 16:9 ergibt. Das funktioniert für jede Auflösung über den Euklidischen Algorithmus.

**Warum 2560 × 1080 nicht glatt 21:9 ist**

Manche Ultrawide-Auflösungen kürzen sich nicht auf das beworbene Verhältnis. 2560 × 1080 ergibt mathematisch exakt 64:27, nicht 21:9 — die Hersteller runden auf die griffigere Zahl. Auch 1366 × 768, eine verbreitete Notebook-Auflösung, ist nur näherungsweise 16:9 und kürzt sich auf 683:384.

**Eine fehlende Seite berechnen**

Kennt man das gewünschte Verhältnis und eine Seite, ergibt sich die andere durch einfache Multiplikation: Bei 16:9 und einer Breite von 2560 Pixeln ist die Höhe 2560 × 9 ÷ 16 = 1440 Pixel. Das ist praktisch für Video-Exporte, Canvas-Größen oder Bannerformate.`,
    faq: [
      {
        frage: 'Wie berechne ich das Seitenverhältnis aus einer Auflösung?',
        antwort: 'Teilen Sie Breite und Höhe durch ihren größten gemeinsamen Teiler (ggT). Beispiel: 1920 und 1080 haben den ggT 120, also 1920 ÷ 120 : 1080 ÷ 120 = 16:9. Der Rechner übernimmt das automatisch und nennt zusätzlich das passende Standardformat.',
      },
      {
        frage: 'Warum ist mein Monitor 64:27 und nicht 21:9?',
        antwort: 'Viele Ultrawide-Monitore mit 2560 × 1080 kürzen sich mathematisch exakt auf 64:27, nicht auf glatte 21:9. Die Hersteller bewerben die griffigere Zahl 21:9, weil sie näher an der gewohnten Schreibweise liegt. 64:27 ist rechnerisch das tatsächliche Verhältnis — beide meinen denselben Ultrawide-Bildschirm.',
      },
      {
        frage: 'Wie rechne ich eine fehlende Seite aus dem Verhältnis aus?',
        antwort: 'Multiplizieren Sie die bekannte Seite mit dem Anteil der gesuchten Seite und teilen durch den Anteil der bekannten Seite. Bei 16:9 und einer Breite von 2560 Pixeln: 2560 × 9 ÷ 16 = 1440 Pixel Höhe. Umgekehrt: Höhe 1080 bei 21:9 ergibt 1080 × 21 ÷ 9 = 2520 Pixel Breite.',
      },
      {
        frage: 'Ist 1366 × 768 ein echtes 16:9-Format?',
        antwort: 'Nicht ganz. 1366 × 768 kürzt sich auf 683:384 und ist damit nur näherungsweise 16:9 (echtes 16:9 wären 1366 × 768,4). Diese Auflösung entstand aus Panel-Fertigungsgründen und ist auf vielen älteren Notebooks verbaut. Optisch fällt der winzige Unterschied nicht auf.',
      },
      {
        frage: 'Welches Seitenverhältnis brauche ich für Social Media?',
        antwort: 'Für Instagram-Feed 1:1 oder 4:5 (1080 × 1350), für Stories und Reels 9:16 (1080 × 1920), für YouTube-Videos 16:9 (1920 × 1080) und für YouTube-Shorts 9:16. Wer im falschen Verhältnis exportiert, riskiert schwarze Balken oder einen automatischen Zuschnitt durch die Plattform.',
      },
      {
        frage: 'Bedeutet gleiches Seitenverhältnis gleiche Schärfe?',
        antwort: 'Nein. 1280 × 720 und 3840 × 2160 sind beide 16:9, unterscheiden sich aber um den Faktor 9 in der Pixelzahl. Das Seitenverhältnis beschreibt nur die Form, nicht die Auflösung. Für die Schärfe und Druckgröße zählt die absolute Pixelzahl, die der Megapixel-Rechner ermittelt.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Was ein Seitenverhältnis ist',
        html: `<p>Das <strong>Seitenverhältnis</strong> (englisch aspect ratio) beschreibt das Verhältnis von Breite zu Höhe eines Bildes, Videos oder Bildschirms — und zwar <strong>unabhängig von der absoluten Pixelzahl</strong>. Es wird als gekürztes Zahlenpaar mit Doppelpunkt geschrieben, etwa 16:9, 4:3 oder 1:1. Ein 16:9-Bild ist genau 16 Einheiten breit und 9 Einheiten hoch, gleich ob es 1.280 oder 3.840 Pixel breit ist.</p><p>Genau das ist der Kern: Form und Auflösung sind zwei verschiedene Dinge. Ein winziges Vorschaubild und ein riesiger 4K-Fernseher können dasselbe Seitenverhältnis 16:9 haben, obwohl der eine ein Tausendstel der Pixel des anderen besitzt. Das Verhältnis entscheidet, ob ein Bild quadratisch, breit oder hochkant wirkt — und ob es ohne schwarze Balken oder Zuschnitt auf einen bestimmten Bildschirm oder in ein Social-Media-Format passt. Dieser Rechner bestimmt aus einer Auflösung das gekürzte Verhältnis und nennt das passende Standardformat; im zweiten Modus berechnet er aus einem Verhältnis und einer bekannten Seite die fehlende Dimension.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Gängige Auflösungen und ihr Seitenverhältnis',
        kopf: ['Auflösung', 'Verhältnis', 'Format'],
        zeilen: [
          ['640 × 480', '4:3', 'VGA, klassisch'],
          ['1280 × 720', '16:9', 'HD (720p)'],
          ['1920 × 1080', '16:9', 'Full HD (1080p)'],
          ['2560 × 1440', '16:9', 'QHD (1440p)'],
          ['3840 × 2160', '16:9', '4K UHD (2160p)'],
          ['1366 × 768', '683:384', 'Notebook (≈ 16:9)'],
          ['1920 × 1200', '8:5', '16:10 (WUXGA)'],
          ['2560 × 1080', '64:27', '21:9 Ultrawide'],
          ['3440 × 1440', '43:18', '21:9 Ultrawide'],
        ],
        fussnote: 'Das Verhältnis entsteht durch Kürzen der Auflösung mit dem größten gemeinsamen Teiler. Auffällig: Die vier Standard-Monitorauflösungen von HD bis 4K sind alle 16:9 — sie unterscheiden sich nur in der Pixelzahl, nicht in der Form. Die Ultrawide-Formate 64:27 und 43:18 werden im Handel meist als 21:9 beworben, obwohl sie sich mathematisch nicht glatt auf 21:9 kürzen lassen. Und 1366 × 768 ist mit 683:384 nur fast 16:9. Wer eine Auflösung in dieser Tabelle nicht findet, gibt sie einfach oben in den Rechner ein — er kürzt jedes beliebige Pixelmaß auf das exakte Verhältnis und nennt, sofern vorhanden, das passende Standardformat oder das nächstliegende.',
      },
      {
        typ: 'beispielrechnung',
        titel: '1920 × 1080 in ein Verhältnis kürzen',
        schritte: [
          { label: 'Größten gemeinsamen Teiler suchen', formel: 'ggT(1920, 1080)', ergebnis: '120' },
          { label: 'Beide Seiten durch den ggT teilen', formel: '1920 ÷ 120 : 1080 ÷ 120', ergebnis: '16:9' },
        ],
        fazit: 'Full HD (1920 × 1080) kürzt sich über den größten gemeinsamen Teiler 120 auf das Seitenverhältnis 16:9. Der Euklidische Algorithmus findet diesen Teiler in wenigen Schritten: Er teilt wiederholt die größere durch die kleinere Zahl und rechnet mit dem Rest weiter, bis dieser null ist. Das Verfahren funktioniert für jede beliebige Auflösung und liefert immer die kleinstmögliche Ganzzahl-Schreibweise. Genau deshalb erscheinen 1280 × 720, 1920 × 1080 und 3840 × 2160 alle als 16:9 — sie haben dieselbe Form, nur unterschiedlich viele Pixel.',
      },
      {
        typ: 'text',
        titel: 'Eine fehlende Seite aus dem Verhältnis berechnen',
        html: `<p>Oft kennt man das gewünschte <strong>Verhältnis</strong> und eine Seite, sucht aber die andere — etwa beim Anlegen einer Arbeitsfläche, beim Video-Export oder beim Erstellen einer Bannergrafik. Die Rechnung ist einfach: Die gesuchte Seite ergibt sich aus der bekannten Seite, multipliziert mit dem Anteil der gesuchten Seite, geteilt durch den Anteil der bekannten Seite.</p><p>Ein Beispiel: Soll ein Bild im Format <strong>16:9</strong> genau 2.560 Pixel breit sein, ergibt sich die Höhe zu 2.560 × 9 ÷ 16 = 1.440 Pixel. Umgekehrt: Ist die Höhe mit 1.080 Pixeln vorgegeben und das Format 21:9, beträgt die Breite 1.080 × 21 ÷ 9 = 2.520 Pixel. So lässt sich jedes Format auf eine konkrete Zielgröße bringen, ohne das Bild zu verzerren. Wichtig ist nur, beim Skalieren das Verhältnis beizubehalten — ein nachträgliches Stauchen oder Strecken auf ein falsches Verhältnis macht Gesichter breit oder schmal und wirkt sofort unnatürlich.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Fehlende Höhe: 2560 px breit bei 16:9',
        schritte: [
          { label: 'Bekannt: Breite 2.560 px, Zielformat 16:9', formel: 'Höhe = Breite × 9 ÷ 16', ergebnis: 'Formel' },
          { label: 'Werte einsetzen', formel: '2.560 × 9 ÷ 16', ergebnis: '1.440 px' },
        ],
        fazit: 'Wer ein 16:9-Bild mit 2.560 Pixeln Breite anlegen will, braucht eine Höhe von 1.440 Pixeln — das ergibt die bekannte QHD-Auflösung 2560 × 1440. Die Rechnung multipliziert die Breite mit dem Höhen-Anteil (9) und teilt durch den Breiten-Anteil (16). Dasselbe Prinzip liefert für jede Zielbreite die passende Höhe und umgekehrt. So entstehen verzerrungsfreie Formate für Monitore, Videos oder Druckvorlagen, ohne dass man die exakte Standardauflösung auswendig kennen muss.',
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: '64:27 statt 21:9 — warum Ultrawide krumm wirkt',
        text: 'Ultrawide-Monitore werden fast immer als 21:9 beworben, kürzen sich mathematisch aber oft auf andere Zahlen. Die Auflösung 2560 × 1080 ergibt exakt 64:27, die größere Variante 3440 × 1440 ergibt 43:18. Beide sind echte Ultrawide-Formate, nur lässt sich keines glatt auf 21:9 kürzen — die Hersteller runden auf die eingängigere Zahl. Ähnlich verhält es sich mit der verbreiteten Notebook-Auflösung 1366 × 768: Sie ist mit 683:384 nur näherungsweise 16:9. Wenn dieser Rechner also 64:27 oder 683:384 ausgibt, ist das kein Fehler, sondern das exakte gekürzte Verhältnis. Die beworbene Marketing-Zahl steht jeweils in Klammern als bekanntes Format dahinter, damit man beide Schreibweisen sofort zuordnen kann. Praktisch heißt das: Wenn ein Bildbearbeitungsprogramm oder ein Datenblatt ein scheinbar krummes Verhältnis wie 64:27 nennt, muss man nicht stutzig werden — es ist schlicht die exakte, ungerundete Form des gewohnten 21:9. Für den Alltag genügt die Marketing-Zahl, für eine pixelgenaue Vorlage ist die exakte Form die verlässlichere Grundlage.',
      },
      {
        typ: 'tabelle',
        titel: 'Seitenverhältnisse nach Einsatzzweck',
        kopf: ['Format', 'Verhältnis', 'Typische Nutzung'],
        zeilen: [
          ['Querformat-Standard', '16:9', 'Web, TV, YouTube, Monitore'],
          ['Reels / Stories', '9:16', 'Hochkant-Videos, TikTok, Shorts'],
          ['Instagram-Feed', '1:1', 'quadratische Beiträge'],
          ['Instagram-Hochformat', '4:5', 'Feed-Beiträge mit mehr Höhe'],
          ['Präsentation (alt)', '4:3', 'ältere Beamer und Folien'],
          ['Notebook', '16:10', 'mehr vertikale Arbeitsfläche'],
          ['Gaming / Kino', '21:9', 'Ultrawide-Monitore, Filme'],
        ],
        fussnote: 'Welches Verhältnis sinnvoll ist, hängt vom Ziel ab. Bewegtbild fürs Web und Fernsehen ist überwiegend 16:9, während Social-Media-Plattformen zunehmend auf Hochformate (9:16, 4:5) setzen, weil am Smartphone hochkant gescrollt wird. Das ältere 4:3 begegnet einem noch bei Präsentationen und alten Beamern. Notebooks kehren vermehrt zu 16:10 zurück, weil das etwas höhere Format mehr Platz für Text und Code bietet. Für die Praxis bedeutet das vor allem eins: Es gibt nicht das eine richtige Verhältnis, sondern für jeden Kanal ein passendes. Wer denselben Inhalt auf mehreren Plattformen ausspielt, legt ihn am besten gleich in mehreren Formaten an, statt ein einziges Verhältnis überall hinzubiegen.',
      },
      {
        typ: 'text',
        titel: 'Letterbox und Pillarbox: schwarze Balken verstehen',
        html: `<p>Passt das Seitenverhältnis des Materials nicht zum Bildschirm, entstehen <strong>schwarze Balken</strong>. Läuft ein breites 16:9- oder 21:9-Video auf einem schmaleren 4:3-Bildschirm, erscheinen Balken oben und unten — das nennt man <strong>Letterbox</strong>. Umgekehrt, wenn ein 4:3-Bild auf einem breiten 16:9-Monitor läuft, sitzen die Balken links und rechts; das heißt <strong>Pillarbox</strong>.</p><p>Die Balken sind kein Fehler, sondern der ehrliche Weg, ein Bild ohne Verzerrung und ohne Beschnitt darzustellen. Die Alternativen sind schlechter: Streckt man das Bild auf das falsche Verhältnis, werden Personen und Objekte verzerrt; schneidet man es zu (Crop), geht Bildinhalt am Rand verloren. Wer das Zielverhältnis von Anfang an kennt, vermeidet beides und produziert passgenau. Genau deshalb lohnt es sich, vor dem Export oder dem Zuschnitt das Verhältnis bewusst festzulegen. Wie groß ein Bildschirm bei einem bestimmten Verhältnis tatsächlich ausfällt und wie dicht die Pixel sitzen, zeigt der <a href="/technik/bildschirmgroesse-ppi-rechner">Bildschirmgröße- und PPI-Rechner</a>.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Social-Media-Formate 2026',
        kopf: ['Plattform / Typ', 'Empfohlene Auflösung', 'Verhältnis'],
        zeilen: [
          ['Instagram-Post', '1080 × 1350', '4:5'],
          ['Instagram-Story', '1080 × 1920', '9:16'],
          ['YouTube-Video', '1920 × 1080', '16:9'],
          ['YouTube-Short', '1080 × 1920', '9:16'],
          ['X-Post (Bild)', '1600 × 900', '16:9'],
        ],
        fussnote: 'Empfohlene Upload-Auflösungen und ihre Seitenverhältnisse für die wichtigsten Plattformen. Wer im passenden Verhältnis exportiert, vermeidet automatische Zuschnitte und schwarze Balken — die Plattformen schneiden abweichende Formate sonst eigenmächtig zu oder zeigen sie verkleinert. Die absoluten Pixelmaße sind Richtwerte; höhere Auflösungen im selben Verhältnis werden ohne Qualitätsverlust verkleinert, niedrigere dagegen unscharf hochskaliert. Plattformen ändern ihre Empfehlungen gelegentlich, das Verhältnis bleibt aber meist stabil — wer im richtigen Verhältnis exportiert, ist auf der sicheren Seite.',
      },
      {
        typ: 'checkliste',
        titel: 'Das richtige Format wählen',
        punkte: [
          'Das Seitenverhältnis der Zielplattform oder des Zielbildschirms vorab klären.',
          'Die native Auflösung des Geräts kennen — dort sitzt jeder Pixel exakt.',
          'Material nicht hochskalieren; das macht es unscharf, nicht schärfer.',
          'Das Verhältnis vor dem Zuschneiden festlegen, nicht hinterher korrigieren.',
          'Beim Skalieren das Verhältnis sperren, damit nichts verzerrt wird.',
          'Vorhandene Export-Presets (z. B. „YouTube 1080p") nutzen, statt Werte von Hand einzutippen.',
          'Bei mehreren Zielformaten von der höchsten Auflösung ausgehen und herunterrechnen.',
        ],
      },
      {
        typ: 'text',
        titel: 'Pixel oder Verhältnis: gleiches Format, andere Schärfe',
        html: `<p>Ein häufiges Missverständnis: Gleiches Seitenverhältnis bedeutet nicht gleiche Schärfe. <strong>1280 × 720 und 3840 × 2160 sind beide 16:9</strong>, unterscheiden sich aber um den Faktor 9 in der Gesamtzahl der Pixel. Das Verhältnis beschreibt allein die Form, nicht die Detailmenge.</p><p>Für die wahrgenommene Schärfe, die maximale Druckgröße und den Zoom-Spielraum zählt die <strong>absolute Pixelzahl</strong>. Ein 16:9-Bild mit 720 Pixeln Höhe wirkt auf einem großen Monitor grob, dasselbe Verhältnis mit 2.160 Pixeln dagegen gestochen scharf. Beim Skalieren bleibt das Verhältnis erhalten, die Pixelzahl ändert sich — und mit ihr die Qualität. Wer wissen will, wie viele Megapixel eine Auflösung ergibt und wie groß sie sich drucken lässt, findet die Antwort im <a href="/technik/megapixel-rechner">Megapixel-Rechner</a>. Seitenverhältnis und Auflösung sind also zwei getrennte Kennzahlen, die man immer zusammen betrachten sollte.</p>`,
      },
      {
        typ: 'text',
        titel: 'Warum sich 16:9 durchsetzte — und der Trend zum Hochformat',
        html: `<p>Lange dominierte das fast quadratische <strong>4:3</strong> bei Röhrenfernsehern und frühen Monitoren. Mit Flachbildschirmen, HD-Fernsehen und Kinofilmen setzte sich das breitere <strong>16:9</strong> durch — es ist ein guter Kompromiss zwischen klassischem Film (oft noch breiter) und der quadratischen Vergangenheit und wurde zum Standard für TV, Web und nahezu alle Monitore.</p><p>Inzwischen verschiebt sich das Bild erneut. Am Smartphone wird hochkant gescrollt, weshalb <strong>Hochformate wie 9:16 und 4:5</strong> für Reels, Stories und Feed-Beiträge stark zugenommen haben. Gleichzeitig wachsen am Schreibtisch die extrabreiten <strong>Ultrawide-Formate</strong> (21:9, 32:9) für Gaming, Film und produktives Arbeiten mit mehreren Fenstern. Das Ergebnis ist eine größere Vielfalt als je zuvor: Statt eines einzigen vorherrschenden Formats existieren heute mehrere nebeneinander, jeweils passend zum Gerät und zum Nutzungskontext. Genau deshalb lohnt es sich, das Seitenverhältnis bewusst zu wählen — es entscheidet darüber, ob Inhalte auf dem jeweiligen Bildschirm wie vorgesehen wirken.</p>`,
      },
    ],
    quellen: [
      {
        titel: 'VESA Display-Standards',
        hinweis: 'Standardisierte Auflösungen und Seitenverhältnisse für Monitore (16:9, 16:10, 21:9 u. a.).',
      },
      {
        titel: 'Größter gemeinsamer Teiler (Euklidischer Algorithmus)',
        hinweis: 'Mathematische Grundlage zum Kürzen eines Auflösungs-Verhältnisses auf die kleinste Ganzzahl-Form.',
      },
    ],
  },
  {
    slug: 'dpi-druck-rechner',
    letzteAktualisierung: '2026-06-30',
    titel: 'DPI-Rechner & Druckgröße',
    beschreibung: 'Druckgröße aus Pixeln und DPI berechnen oder die nötige Auflösung für ein Druckformat bestimmen — A4, Foto, Poster.',
    kategorie: 'Technik',
    kategorieSlug: 'technik',
    metaTitle: 'DPI-Rechner — Druckgröße & Auflösung',
    metaDescription: 'DPI-Rechner: Druckgröße aus Pixeln und DPI berechnen oder die nötige Auflösung fürs Druckformat — A4, Foto, Poster, mit Rechenweg.',
    keywords: ['dpi rechner', 'druckgröße pixel', 'ppi druck', 'a4 auflösung dpi', 'pixel in cm', 'druckauflösung berechnen', '300 dpi pixel', 'foto drucken auflösung'],
    icon: '🖨️',
    formel: 'Druckgröße (cm) = Pixel ÷ DPI × 2,54 | Nötige Pixel = Druckgröße(cm) ÷ 2,54 × DPI',
    beispiel: '6.000 × 4.000 px @ 300 dpi: 6.000 ÷ 300 × 2,54 = 50,8 cm breit, 4.000 ÷ 300 × 2,54 = 33,9 cm hoch.',
    erklaerung: `**DPI und Druckgröße berechnen — wie viele Pixel braucht ein Druck?**

DPI (dots per inch) gibt an, wie viele Bildpunkte pro Zoll gedruckt werden. Die Druckdichte entscheidet, wie groß und wie scharf ein Bild auf Papier erscheint. Dieser Rechner ermittelt aus Pixelmaßen und DPI die physische Druckgröße in Zentimetern — und umgekehrt die nötige Pixelzahl für ein gewünschtes Druckformat.

**Von Pixeln zur Druckgröße**

Die Formel lautet: Druckgröße in cm = Pixel ÷ DPI × 2,54 (ein Zoll entspricht 2,54 cm). Ein 6.000 Pixel breites Bild druckt bei 300 dpi also 6.000 ÷ 300 × 2,54 = 50,8 cm breit — größer als A3. Dasselbe Bild bei nur 72 dpi würde über zwei Meter breit, aber grob und unscharf.

**DPI ist keine Bildeigenschaft**

Wichtig: Die DPI-Angabe in einer Bilddatei ändert die Pixel nicht. Sie ist nur ein Hinweis für den Druck. Entscheidend für die mögliche Druckgröße ist allein die Pixelzahl. Ein 6.000-Pixel-Bild lässt sich klein und scharf oder groß und grob drucken — die DPI legen nur fest, auf welche Fläche die vorhandenen Pixel verteilt werden.

**Web 72, Druck 300**

Für die Bildschirmanzeige ist DPI bedeutungslos — dort zählt nur die Pixelzahl. Für scharfen Fotodruck aus Leseabstand gelten 300 dpi als Richtwert. Bei Postern, die man aus Distanz betrachtet, genügen 150 dpi oder weniger.`,
    faq: [
      {
        frage: 'Wie viele Pixel braucht A4 in Druckqualität?',
        antwort: 'Für A4 (21 × 29,7 cm) bei 300 dpi sind es exakt 2.480 × 3.508 Pixel, also rund 8,7 Megapixel. Die Rechnung: 21 ÷ 2,54 × 300 = 2.480 und 29,7 ÷ 2,54 × 300 = 3.508. Schon eine einfache 12-Megapixel-Kamera liefert damit genug Auflösung für einen scharfen A4-Druck.',
      },
      {
        frage: 'Was ist der Unterschied zwischen DPI und PPI?',
        antwort: 'PPI (pixels per inch) bezeichnet die Pixeldichte einer Bilddatei oder eines Bildschirms, DPI (dots per inch) die Tintenpunkte eines Druckers. Im Alltag werden beide oft synonym verwendet. Für die Druckgröße-Berechnung ist der Unterschied unerheblich — entscheidend ist die Pixelzahl des Bildes im Verhältnis zur gewünschten Größe.',
      },
      {
        frage: 'Reicht mein Handyfoto für ein Poster?',
        antwort: 'Das hängt von der Postergröße und dem Betrachtungsabstand ab. Ein 12-Megapixel-Foto (4.000 × 3.000 px) reicht bei 150 dpi für rund 67 × 50 cm — also ein ordentliches Poster, das man aus etwas Abstand betrachtet. Für gestochen scharfen Fotodruck bei 300 dpi wäre dasselbe Bild nur bis etwa 34 × 25 cm geeignet.',
      },
      {
        frage: 'Warum wird mein Bild beim Drucken unscharf?',
        antwort: 'Meist, weil zu wenige Pixel auf zu große Fläche verteilt werden. Wird ein kleines Bild stark vergrößert gedruckt, sinkt die effektive DPI unter die Druckqualität und einzelne Pixel werden sichtbar. Hochskalieren im Bildprogramm hilft nicht, da keine echten Details hinzukommen — es werden nur vorhandene Pixel interpoliert.',
      },
      {
        frage: 'Welche DPI brauche ich für welchen Zweck?',
        antwort: 'Für die Bildschirmanzeige ist DPI egal, dort zählt nur die Pixelzahl. Für Fotodruck und Hochglanz gelten 300 dpi, für Poster aus normalem Abstand reichen 150 bis 200 dpi, für Großflächenwerbung oder Banner aus großer Distanz genügen 72 bis 150 dpi. Je größer der Betrachtungsabstand, desto weniger DPI sind nötig.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Was DPI bedeutet',
        html: `<p><strong>DPI</strong> steht für „dots per inch", also Bildpunkte pro Zoll. Der Wert gibt an, wie dicht die Pixel beim Druck auf dem Papier sitzen — und bestimmt damit, wie groß und wie scharf ein Bild gedruckt erscheint. Je höher die DPI, desto kleiner und feiner der Druck; je niedriger, desto größer und gröber.</p><p>Die Grundformel ist einfach: <strong>Druckgröße in Zentimetern = Pixel ÷ DPI × 2,54</strong>, weil ein Zoll genau 2,54 cm entspricht. Ein Bild mit 6.000 Pixeln Breite ergibt bei 300 dpi eine Druckbreite von 6.000 ÷ 300 × 2,54 = 50,8 cm. Umgekehrt lässt sich auch die nötige Pixelzahl für ein gewünschtes Format berechnen, indem man die Größe in cm durch 2,54 teilt und mit der DPI multipliziert. Dieser Rechner beherrscht beide Richtungen und ordnet das Ergebnis zusätzlich einer Qualitätsstufe zu — von der Bildschirm-Vorschau bis zum hochwertigen Fotodruck.</p>`,
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Der DPI-Mythos: die Zahl in der Datei ändert nichts',
        text: 'Ein weit verbreiteter Irrtum: Die „72 dpi"- oder „300 dpi"-Angabe, die in einer Bilddatei gespeichert ist, würde die Bildqualität bestimmen. Das stimmt nicht. Diese Zahl ändert kein einziges Pixel — sie ist nur ein Hinweis für das Druckprogramm, wie groß das Bild standardmäßig ausgegeben werden soll. Entscheidend für die mögliche Druckgröße ist allein die tatsächliche Pixelzahl. Ein Foto mit 6.000 × 4.000 Pixeln kann als winziges scharfes Bildchen oder als großes grobes Poster gedruckt werden — die DPI legen nur fest, auf welche Fläche dieselben Pixel verteilt werden. Wer ein Bild fürs Web auf „72 dpi" stellt, verschlechtert es also nicht; und wer es auf „300 dpi" stellt, verbessert es nicht. Was zählt, sind die Pixel. Deshalb sollte man beim Beurteilen eines Bildes immer die Auflösung in Pixeln betrachten, nicht die DPI-Angabe in den Metadaten.',
      },
      {
        typ: 'text',
        titel: 'Web 72, Druck 300 — warum der Unterschied?',
        html: `<p>Für die Anzeige auf einem <strong>Bildschirm</strong> ist DPI bedeutungslos: Ein Monitor zeigt schlicht so viele Pixel, wie das Bild hat. Ein Foto mit 1.920 Pixeln Breite füllt einen Full-HD-Monitor exakt aus — egal, ob in den Metadaten „72" oder „300" steht. Fürs Web genügen daher Pixel in der Größe, in der das Bild angezeigt wird; die historische „72 dpi"-Angabe ist nur ein Relikt.</p><p>Beim <strong>Druck</strong> dagegen wird das Bild auf eine feste physische Fläche gebracht, und hier zählt die Dichte. Aus normalem Leseabstand kann das menschliche Auge bei etwa <strong>300 dpi</strong> keine einzelnen Punkte mehr unterscheiden — das gilt als Schwelle zur Fotoqualität. Weniger DPI bedeuten sichtbare Pixel oder Unschärfe, mehr bringen fürs Auge kaum Gewinn. Deshalb ist 300 dpi der gängige Zielwert für Fotos und Broschüren. Wer vorab das passende Bildformat festlegen will, findet im <a href="/technik/aufloesung-seitenverhaeltnis-rechner">Seitenverhältnis-Rechner</a> die nötige Ergänzung, damit der Druck ohne Verzerrung und ohne Beschnitt gelingt.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: '6.000 × 4.000 px bei 300 dpi drucken',
        schritte: [
          { label: 'Breite in cm', formel: '6.000 px ÷ 300 dpi × 2,54', ergebnis: '50,8 cm' },
          { label: 'Höhe in cm', formel: '4.000 px ÷ 300 dpi × 2,54', ergebnis: '33,9 cm' },
        ],
        fazit: 'Ein 24-Megapixel-Foto (6.000 × 4.000 px) druckt bei 300 dpi scharf bis rund 50,8 × 33,9 cm — also größer als A3. Die Rechnung teilt die Pixelzahl durch die DPI (das ergibt die Größe in Zoll) und multipliziert mit 2,54 (das ergibt Zentimeter). Dasselbe Bild bei nur 72 dpi würde rechnerisch über zwei Meter breit, wäre dann aber grob und unscharf, weil dieselben Pixel auf eine viel größere Fläche verteilt würden. Die Pixelzahl bleibt gleich, allein die DPI verschieben die mögliche Druckgröße.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'A4 in Druckqualität: wie viele Pixel?',
        schritte: [
          { label: 'Breite in Pixel', formel: '21 cm ÷ 2,54 × 300 dpi', ergebnis: '2.480 px' },
          { label: 'Höhe in Pixel', formel: '29,7 cm ÷ 2,54 × 300 dpi', ergebnis: '3.508 px' },
          { label: 'Gesamtauflösung', formel: '2.480 × 3.508', ergebnis: '≈ 8,7 MP' },
        ],
        fazit: 'Ein A4-Blatt (21 × 29,7 cm) braucht bei 300 dpi exakt 2.480 × 3.508 Pixel, also rund 8,7 Megapixel. Das ist der DIN-Druckstandard, der hinter vielen Vorlagen steckt. Die gute Nachricht: Schon eine einfache 12-Megapixel-Kamera oder ein modernes Smartphone liefert genug Auflösung für einen gestochen scharfen A4-Druck. Für A3 verdoppelt sich die Fläche und damit der Pixelbedarf auf rund 17,4 Megapixel. Wer also nur A4 drucken will, braucht keine teure Hochauflösungskamera — die Reserven moderner Sensoren reichen längst aus.',
      },
      {
        typ: 'tabelle',
        titel: 'Welche Pixelzahl für welches Format bei 300 dpi',
        kopf: ['Format', 'Größe (cm)', 'Pixel bei 300 dpi', 'Megapixel'],
        zeilen: [
          ['Foto 10 × 15', '10 × 15', '1.181 × 1.772', '2,1 MP'],
          ['A5', '14,8 × 21', '1.748 × 2.480', '4,3 MP'],
          ['A4', '21 × 29,7', '2.480 × 3.508', '8,7 MP'],
          ['A3', '29,7 × 42', '3.508 × 4.961', '17,4 MP'],
          ['A2-Poster', '42 × 59,4', '4.961 × 7.016', '34,8 MP'],
        ],
        fussnote: 'Nötige Auflösung für gängige Druckformate bei 300 dpi (Fotoqualität). Mit jeder DIN-Stufe nach oben verdoppelt sich die Fläche und damit auch die benötigte Pixelzahl. Reicht die vorhandene Auflösung nicht für 300 dpi, lässt sich das Format trotzdem drucken — dann sinkt aber die effektive Dichte, und das Bild wird aus der Nähe unschärfer. Bei größerem Betrachtungsabstand ist das oft unproblematisch.',
      },
      {
        typ: 'text',
        titel: 'Qualitätsstufen: der Betrachtungsabstand zählt',
        html: `<p>Wie viele DPI ein Druck braucht, hängt weniger vom Format ab als vom <strong>Betrachtungsabstand</strong>. Grob gelten vier Stufen: Ab <strong>300 dpi</strong> ist Fotodruck- und Hochglanzqualität erreicht — scharf auch beim genauen Hinsehen. <strong>150 bis 300 dpi</strong> liefern guten Druck und Poster, die man aus etwas Abstand betrachtet.</p><p><strong>72 bis 150 dpi</strong> genügen für Großflächenwerbung und Banner, die ohnehin aus mehreren Metern gesehen werden, und <strong>unter 72 dpi</strong> taugen nur für Bildschirm und Vorschau. Der Grund ist das Auflösungsvermögen des Auges: Aus großer Entfernung kann es feine Punkte nicht mehr trennen, weshalb eine Plakatwand an der Autobahn teils mit nur 10 bis 20 dpi gedruckt wird und trotzdem scharf wirkt. Eine Visitenkarte hingegen, die man in der Hand hält, braucht die vollen 300 dpi. Die Faustregel lautet daher: Je näher das Bild betrachtet wird, desto höher muss die Druckdichte sein — und desto mehr Pixel werden gebraucht.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Reicht mein Bild? Maximale Druckgröße je Auflösung',
        kopf: ['Vorhandene Pixel', 'Megapixel', 'Max. bei 300 dpi', 'Max. bei 150 dpi'],
        zeilen: [
          ['1.920 × 1.080', '2,1 MP', '16,3 × 9,1 cm', '32,5 × 18,3 cm'],
          ['4.000 × 3.000', '12 MP', '33,9 × 25,4 cm', '67,7 × 50,8 cm'],
          ['6.000 × 4.000', '24 MP', '50,8 × 33,9 cm', '101,6 × 67,7 cm'],
          ['8.000 × 6.000', '48 MP', '67,7 × 50,8 cm', '135,5 × 101,6 cm'],
        ],
        fussnote: 'Maximale sinnvolle Druckgröße bei voller Schärfe (300 dpi) und bei Poster-Qualität (150 dpi). Ein Full-HD-Bild reicht damit nur für kleine Abzüge, während ein 24-Megapixel-Foto bereits ein gutes A3-Plakat ermöglicht. Bei 150 dpi verdoppelt sich die mögliche Kantenlänge, weil dieselben Pixel auf die doppelte Fläche verteilt werden — vertretbar, solange das Ergebnis aus Abstand betrachtet wird. Als schnelle Orientierung gilt: Megapixel grob durch 8 teilen ergibt die Fläche in Quadratdezimetern bei 300 dpi. Wer also die genaue Grenze wissen will, gibt seine Pixelmaße einfach oben in den Rechner ein und liest die maximale Druckgröße direkt ab.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Poster 60 × 90 cm: reichen 150 dpi?',
        schritte: [
          { label: 'Breite in Pixel', formel: '60 cm ÷ 2,54 × 150 dpi', ergebnis: '3.543 px' },
          { label: 'Höhe in Pixel', formel: '90 cm ÷ 2,54 × 150 dpi', ergebnis: '5.315 px' },
          { label: 'Gesamtauflösung', formel: '3.543 × 5.315', ergebnis: '≈ 18,8 MP' },
        ],
        fazit: 'Für ein großes 60 × 90-cm-Poster genügen bei 150 dpi rund 3.543 × 5.315 Pixel, also etwa 18,8 Megapixel — deutlich weniger, als 300 dpi verlangen würden (dann wären es rund 75 Megapixel). Der Grund: Ein Poster betrachtet man aus ein bis zwei Metern Abstand, und auf diese Distanz reichen 150 dpi für einen scharfen Eindruck völlig aus. Wer also ein Poster drucken lassen will, braucht keine extrem hochauflösende Vorlage — eine gute 20-Megapixel-Kamera genügt. Erst beim Druck, den man aus nächster Nähe betrachtet, lohnen sich die vollen 300 dpi.',
      },
      {
        typ: 'checkliste',
        titel: 'Vor dem Druck prüfen',
        punkte: [
          'Die Pixelzahl des Bildes prüfen, nicht die DPI-Angabe in den Metadaten.',
          'Zielformat und Betrachtungsabstand festlegen — daraus ergibt sich die nötige DPI.',
          'Das Bild nicht hochskalieren oder interpolieren; echte Details kommen dabei nicht hinzu.',
          'Im richtigen Farbraum arbeiten (für Druck meist CMYK statt RGB).',
          'Etwas Beschnitt (Rand) einplanen, damit beim Schneiden kein Motiv verloren geht.',
          'Bei wichtigen Aufträgen einen Probedruck oder Soft-Proof machen.',
          'Im Zweifel die native Auflösung behalten und erst fürs Ziel herunterrechnen.',
        ],
      },
      {
        typ: 'text',
        titel: 'DPI, PPI und LPI — die feinen Unterschiede',
        html: `<p>Im Alltag werden die Begriffe oft vermischt, genau genommen meinen sie aber Verschiedenes. <strong>PPI</strong> (pixels per inch) beschreibt die Pixeldichte einer Bilddatei oder eines Bildschirms — also die Welt der Pixel. <strong>DPI</strong> (dots per inch) bezieht sich auf die einzelnen Tintenpunkte eines Druckers, der für ein einziges Pixel oft mehrere Farbpunkte setzt.</p><p><strong>LPI</strong> (lines per inch) schließlich beschreibt das Raster im professionellen Offsetdruck. Für die Praxis der Druckgröße-Berechnung ist die Unterscheidung jedoch zweitrangig: Entscheidend bleibt das Verhältnis von Pixelzahl zur gewünschten physischen Größe. Wer ein Bild mit ausreichend Pixeln für die Zielgröße hat, bekommt einen scharfen Druck — unabhängig davon, ob man den Wert nun PPI oder DPI nennt. Wie viele Megapixel eine Auflösung ergibt und welche Druckgröße daraus folgt, lässt sich auch direkt mit dem <a href="/technik/megapixel-rechner">Megapixel-Rechner</a> bestimmen, der dieselbe Logik aus Sicht der Gesamtpixelzahl betrachtet.</p>`,
      },
      {
        typ: 'text',
        titel: 'Hochskalieren bringt keine echten Details',
        html: `<p>Reicht die Auflösung nicht für die gewünschte Druckgröße, liegt der Gedanke nahe, das Bild im Bearbeitungsprogramm einfach <strong>hochzurechnen</strong>. Das funktioniert jedoch nur begrenzt: Beim Hochskalieren werden vorhandene Pixel <strong>interpoliert</strong>, also Zwischenwerte geschätzt — echte neue Details entstehen dabei nicht. Aus einem unscharfen kleinen Bild wird so ein größeres, aber immer noch unscharfes Bild.</p><p>Moderne <strong>KI-Upscaler</strong> können erstaunlich gute Ergebnisse liefern, indem sie plausible Details ergänzen, doch auch sie erfinden Informationen, die im Original nicht vorhanden waren — bei feinen Strukturen oder Text stößt das an Grenzen. Die zuverlässigste Lösung bleibt deshalb, von Anfang an mit ausreichender <strong>nativer Auflösung</strong> zu arbeiten: lieber etwas höher aufnehmen und später herunterrechnen, als knapp kalkulieren und am Ende vergrößern zu müssen. Wer die nötige Auflösung vorab mit diesem Rechner bestimmt, weiß genau, welche Pixelzahl das Ausgangsbild mitbringen muss — und erspart sich die Enttäuschung eines unscharfen Drucks.</p>`,
      },
    ],
    quellen: [
      {
        titel: 'DIN 476 / ISO 216 (A-Papierformate)',
        hinweis: 'A4 = 21,0 × 29,7 cm; daraus folgen bei 300 dpi exakt 2.480 × 3.508 Pixel.',
      },
      {
        titel: 'Auflösung & Betrachtungsabstand (Druckpraxis)',
        hinweis: 'Für Fotodruck gelten ~300 dpi als Richtwert; bei großem Betrachtungsabstand (Poster, Plakat) genügen 100–150 dpi.',
      },
    ],
  },
  {
    slug: 'video-dateigroesse-rechner',
    letzteAktualisierung: '2026-06-30',
    titel: 'Video-Dateigröße-Rechner',
    beschreibung: 'Video-Dateigröße berechnen: Wie groß wird ein Video bei gegebener Bitrate, Länge und Auflösung? Mit Bitrate-Profilen von 720p bis 8K.',
    kategorie: 'Technik',
    kategorieSlug: 'technik',
    metaTitle: 'Video-Dateigröße-Rechner — Größe berechnen',
    metaDescription: 'Video-Dateigröße berechnen: Wie groß wird ein Video bei Bitrate, Länge und Auflösung? Mit Bitrate-Richtwerten für 1080p bis 8K.',
    keywords: ['video dateigröße', 'bitrate rechner', '4k speicherbedarf', 'video größe berechnen', 'video bitrate dateigröße', 'wie groß wird mein video', 'speicherbedarf video', 'mbit/s video'],
    icon: '🎬',
    formel: 'Größe (MB) = Bitrate(Mbit/s) × Länge(Sekunden) ÷ 8 | Größe (GB) = MB ÷ 1.000',
    beispiel: '1080p mit 8 Mbit/s, 10 min: 8 × 600 s ÷ 8 = 600 MB.',
    erklaerung: `**Video-Dateigröße berechnen — Bitrate, Länge und die ÷8-Regel**

Wie groß eine Videodatei wird, hängt fast nur von zwei Werten ab: der Bitrate und der Länge. Die Auflösung (720p, 1080p, 4K) wirkt dabei nur indirekt — nämlich darüber, welche Bitrate für eine gute Bildqualität nötig ist. Dieser Rechner ermittelt aus Bitrate und Länge die zu erwartende Dateigröße und bietet Bitrate-Richtwerte für die gängigen Auflösungen.

**Die Formel**

Größe in MB = Bitrate (Mbit/s) × Länge (Sekunden) ÷ 8. Die Division durch 8 stammt aus der Umrechnung von Bit in Byte: Ein Byte besteht aus acht Bit. Ein 10-minütiges 1080p-Video mit 8 Mbit/s ergibt also 8 × 600 ÷ 8 = 600 MB. Für Stunden- oder Gigabyte-Werte rechnet man einfach weiter: 1.000 MB entsprechen 1 GB.

**Warum 4K so viel Speicher frisst**

Eine höhere Auflösung verlangt eine deutlich höhere Bitrate, um scharf zu bleiben. Während 1080p mit rund 8 Mbit/s auskommt, braucht 4K etwa 45 Mbit/s — also ungefähr das Fünf- bis Sechsfache. Entsprechend ist ein 4K-Video bei gleicher Länge rund fünfmal so groß wie ein 1080p-Video. Eine Stunde 4K bei 45 Mbit/s belegt rund 20 GB.

**Codec und Inhalt zählen mit**

Die genannten Bitraten sind Richtwerte für gängige Codecs (H.264, H.265). Neuere Codecs wie AV1 liefern bei gleicher Qualität kleinere Dateien, und ruhige Szenen brauchen weniger Daten als schnelle Action. Die Berechnung ist daher eine gute Schätzung, kein exakter Laborwert.`,
    faq: [
      {
        frage: 'Wie groß wird eine Stunde 4K-Video?',
        antwort: 'Bei der üblichen 4K-Bitrate von 45 Mbit/s ergibt eine Stunde rund 20,3 GB (45 × 3.600 s ÷ 8 = 20.250 MB). Mit höherer Bitrate für 4K60 (68 Mbit/s) sind es schon über 30 GB pro Stunde. 4K-Aufnahmen füllen Speicherkarten daher sehr schnell — eine 64-GB-Karte reicht bei 45 Mbit/s nur für rund drei Stunden.',
      },
      {
        frage: 'Welche Bitrate brauche ich für YouTube oder Instagram?',
        antwort: 'YouTube empfiehlt für den Upload höhere Bitraten als fürs Streaming: rund 8 Mbit/s für 1080p und 35 bis 45 Mbit/s für 4K, weil die Plattform danach noch einmal komprimiert. Instagram und TikTok komprimieren stark nach, weshalb sehr hohe Bitraten dort wenig bringen — 1080p mit 8 bis 12 Mbit/s ist ein guter Kompromiss.',
      },
      {
        frage: 'Warum ist mein Video so groß?',
        antwort: 'Meist liegt es an einer hohen Bitrate, hoher Auflösung oder hoher Bildrate (FPS). Eine 4K60-Aufnahme mit 68 Mbit/s ist rund achtmal so groß wie 1080p30 mit 8 Mbit/s. Auch ein veralteter Codec (älteres H.264 statt H.265 oder AV1) vergrößert die Datei. Wer Speicher sparen will, senkt die Bitrate oder nutzt einen moderneren Codec.',
      },
      {
        frage: 'Was bedeutet Bitrate genau?',
        antwort: 'Die Bitrate gibt an, wie viele Daten pro Sekunde Video gespeichert werden, gemessen in Megabit pro Sekunde (Mbit/s). Eine höhere Bitrate bedeutet mehr Details und weniger Komprimierungsartefakte, aber auch eine größere Datei. Sie ist der wichtigste Hebel für die Dateigröße — wichtiger als die Auflösung allein.',
      },
      {
        frage: 'Ist ein 4K-Video immer größer als ein 1080p-Video?',
        antwort: 'Nicht zwangsläufig. Entscheidend ist die Bitrate, nicht die Auflösung. Ein 4K-Video mit niedrig eingestellter Bitrate kann kleiner sein als ein 1080p-Video mit sehr hoher Bitrate — es sieht dann aber meist unschärfer aus. In der Praxis werden 4K-Videos mit hoher Bitrate aufgenommen und sind deshalb deutlich größer.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Wie sich die Videogröße ergibt',
        html: `<p>Die Dateigröße eines Videos hängt überraschend wenig von der Auflösung ab und fast vollständig von zwei Werten: der <strong>Bitrate</strong> und der <strong>Länge</strong>. Die Formel lautet: Größe in MB = Bitrate (Mbit/s) × Länge (Sekunden) ÷ 8. Die Division durch 8 ist nötig, weil Bitraten in <strong>Megabit</strong> und Dateigrößen in <strong>Megabyte</strong> angegeben werden — und ein Byte besteht aus acht Bit.</p><p>Die <strong>Auflösung</strong> wirkt nur indirekt: Ein scharfes 4K-Bild verlangt eine deutlich höhere Bitrate als 1080p, und genau diese höhere Bitrate macht die Datei groß. Die Auflösung selbst steht in keiner Formel — sie bestimmt nur, welche Bitrate für ein gutes Ergebnis sinnvoll ist. Deshalb kann ein sparsam komprimiertes 4K-Video theoretisch sogar kleiner sein als ein hoch-bitratiges 1080p-Video. Dieser Rechner nimmt die Bitrate direkt entgegen und bietet zusätzlich Richtwerte für die gängigen Auflösungen, damit man auch ohne genaue Kenntnis der eigenen Aufnahme eine verlässliche Schätzung bekommt.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: '1080p mit 8 Mbit/s, 10 Minuten',
        schritte: [
          { label: 'Länge in Sekunden', formel: '10 min × 60', ergebnis: '600 s' },
          { label: 'Größe in MB', formel: '8 Mbit/s × 600 s ÷ 8', ergebnis: '600 MB' },
        ],
        fazit: 'Ein zehnminütiges Full-HD-Video mit der Standard-Bitrate von 8 Mbit/s ergibt genau 600 MB. Die Rechnung multipliziert die Bitrate mit der Länge in Sekunden und teilt durch 8, um von Megabit auf Megabyte zu kommen. Praktisch heißt das: Etwa 60 MB pro Minute bei 1080p. Auf eine 16-GB-Speicherkarte passen damit rund 26 solcher Clips oder gut viereinhalb Stunden Material. Wer die Bitrate oder die Auflösung erhöht, treibt diesen Wert schnell nach oben — bei 4K wird aus demselben Zehnminüter ein Vielfaches.',
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Bit, Byte und „Bitrate ist nicht Auflösung"',
        text: 'Zwei Stolperfallen führen beim Schätzen von Videogrößen regelmäßig in die Irre. Erstens die Bit-Byte-Verwechslung: Bitraten werden in Megabit pro Sekunde (Mbit/s) angegeben, Dateigrößen in Megabyte (MB). Weil ein Byte aus acht Bit besteht, muss durch 8 geteilt werden — 8 Mbit/s ergeben also nur 1 MB pro Sekunde, nicht 8. Wer das übersieht, überschätzt die Größe um das Achtfache. Zweitens die Annahme, die Auflösung bestimme die Größe: Das stimmt nur indirekt. Allein die Bitrate legt fest, wie viele Daten pro Sekunde gespeichert werden. Ein 4K-Video mit niedriger Bitrate kann kleiner sein als ein 1080p-Video mit hoher Bitrate — es sieht dann nur weniger detailreich aus. Für die Dateigröße zählt also immer die tatsächliche Bitrate, nicht die Pixelzahl auf dem Papier.',
      },
      {
        typ: 'text',
        titel: 'Was Bitrate bedeutet — und CBR gegen VBR',
        html: `<p>Die <strong>Bitrate</strong> beschreibt, wie viele Daten pro Sekunde Video gespeichert werden. Eine höhere Bitrate bedeutet mehr Details, weniger Komprimierungsartefakte — und eine größere Datei. Sie ist der wichtigste Hebel für Qualität und Größe zugleich. Gemessen wird sie meist in Megabit pro Sekunde; wie sich die zugrunde liegenden Datenmengen umrechnen, zeigt der <a href="/technik/datenmengen-umrechner">Datenmengen-Umrechner</a>.</p><p>Zwei Verfahren sind verbreitet: Bei <strong>konstanter Bitrate (CBR)</strong> bleibt der Datenstrom gleichmäßig — gut für Live-Streaming, weil die Größe exakt planbar ist. Bei <strong>variabler Bitrate (VBR)</strong> passt der Encoder die Datenmenge an den Inhalt an: Ruhige Szenen bekommen weniger, actionreiche mehr Daten. Das liefert bei gleicher Dateigröße meist die bessere Qualität, macht die exakte Größe aber schwerer vorhersagbar. Die Rechnung in diesem Werkzeug geht von einer durchschnittlichen Bitrate aus und trifft damit beide Verfahren als realistische Schätzung — die tatsächliche Datei kann je nach Inhalt etwas kleiner oder größer ausfallen.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Empfohlene Bitrate je Auflösung',
        kopf: ['Auflösung', 'Bitrate (Richtwert)', 'Typischer Einsatz'],
        zeilen: [
          ['720p (HD)', '5 Mbit/s', 'einfache Clips, ältere Geräte'],
          ['1080p (Full HD)', '8 Mbit/s', 'Standard für Web und Streaming'],
          ['1080p60', '12 Mbit/s', 'flüssige Bewegung, Gaming'],
          ['1440p (QHD)', '16 Mbit/s', 'hochwertige Monitore'],
          ['4K', '45 Mbit/s', 'moderne TVs, YouTube 4K'],
          ['4K60', '68 Mbit/s', 'Sport, schnelle Action'],
          ['8K', '100 Mbit/s', 'Profi, Zukunftssicherheit'],
        ],
        fussnote: 'Richtwerte für gute Streaming-Qualität mit H.264/H.265. Auffällig ist der große Sprung von 1080p (8 Mbit/s) zu 4K (45 Mbit/s) — die vierfache Pixelzahl verlangt rund die fünf- bis sechsfache Bitrate. Wer mit modernen Codecs wie H.265 oder AV1 arbeitet, kommt bei gleicher Qualität mit niedrigeren Werten aus. Die tatsächlich nötige Bitrate hängt zusätzlich vom Bildinhalt ab: Viel Bewegung und feine Strukturen brauchen mehr Daten. Diese Werte beziehen sich auf eine angenehme Streaming-Qualität; für die Archivierung oder professionelle Nachbearbeitung werden oft deutlich höhere Bitraten gewählt, um Reserven zu behalten. Wer einfach nur ein Video für Familie oder Web teilen will, kommt mit den genannten Richtwerten dagegen bestens aus.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Eine Stunde 4K bei 45 Mbit/s',
        schritte: [
          { label: 'Länge in Sekunden', formel: '60 min × 60', ergebnis: '3.600 s' },
          { label: 'Größe in MB', formel: '45 Mbit/s × 3.600 s ÷ 8', ergebnis: '20.250 MB' },
          { label: 'In Gigabyte', formel: '20.250 ÷ 1.000', ergebnis: '≈ 20,3 GB' },
        ],
        fazit: 'Eine Stunde 4K-Video bei 45 Mbit/s belegt rund 20,3 GB — etwa das Fünffache derselben Stunde in 1080p (rund 3,6 GB). Das zeigt eindrücklich, warum 4K-Aufnahmen Speicher fressen: Nicht die Auflösung an sich, sondern die für scharfes 4K nötige hohe Bitrate treibt die Größe. Eine 64-GB-Speicherkarte reicht damit nur für gut drei Stunden 4K, während sie in 1080p rund 17 Stunden fasst. Wer länger in hoher Auflösung filmt, sollte Karten und Cloud-Speicher entsprechend großzügig einplanen.',
      },
      {
        typ: 'tabelle',
        titel: '10-Minuten-Clip: Größe je Auflösung',
        kopf: ['Auflösung', 'Bitrate', 'Größe (10 min)'],
        zeilen: [
          ['720p', '5 Mbit/s', '375 MB'],
          ['1080p', '8 Mbit/s', '600 MB'],
          ['1080p60', '12 Mbit/s', '900 MB'],
          ['1440p', '16 Mbit/s', '1,2 GB'],
          ['4K', '45 Mbit/s', '3,4 GB'],
          ['4K60', '68 Mbit/s', '5,1 GB'],
          ['8K', '100 Mbit/s', '7,5 GB'],
        ],
        fussnote: 'Dateigröße eines zehnminütigen Clips bei der jeweils typischen Bitrate. Der Unterschied ist enorm: Ein 8K-Clip ist mit 7,5 GB rund zwanzigmal so groß wie derselbe Clip in 720p. Die Werte skalieren linear mit der Länge — ein Fünf-Minuten-Clip ist halb so groß, ein 20-Minüter doppelt so groß. So lässt sich aus dieser Tabelle die Größe beliebiger Aufnahmen schnell überschlagen. Praktisch als Merkregel: 1080p belegt rund 60 MB pro Minute, 4K rund 340 MB pro Minute. Wer diese beiden Zahlen im Kopf hat, kann den Speicherbedarf einer Aufnahme schon vor dem Dreh grob abschätzen, ohne jedes Mal zu rechnen.',
      },
      {
        typ: 'text',
        titel: 'Der Codec entscheidet mit',
        html: `<p>Die Bitrate allein bestimmt die Dateigröße, doch welche Bitrate für eine bestimmte Qualität nötig ist, hängt stark vom <strong>Codec</strong> ab — dem Verfahren, mit dem das Video komprimiert wird. Der weit verbreitete <strong>H.264</strong> (AVC) ist überall abspielbar, aber nicht der effizienteste. <strong>H.265</strong> (HEVC) liefert bei gleicher Qualität rund 30 bis 50 Prozent kleinere Dateien.</p><p>Noch effizienter ist der lizenzfreie <strong>AV1</strong>, der vor allem von Streaming-Diensten und neueren Geräten genutzt wird. Konkret heißt das: Dasselbe Video sieht mit H.265 bei halber Bitrate genauso gut aus wie mit H.264 — und ist entsprechend kleiner. Die in den Tabellen genannten Richtwerte gelten für H.264/H.265; mit AV1 lassen sie sich oft noch unterbieten. Der Haken: Effizientere Codecs brauchen mehr Rechenleistung beim Kodieren und Abspielen, und ältere Geräte unterstützen sie nicht immer. Wer maximale Kompatibilität braucht, bleibt bei H.264; wer Speicher sparen will, wählt H.265 oder AV1. Deshalb sind alle Größenangaben Richtwerte und keine festen Zahlen.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Speicherkarten-Praxis: 90 Minuten 4K',
        schritte: [
          { label: 'Länge in Sekunden', formel: '90 min × 60', ergebnis: '5.400 s' },
          { label: 'Größe in MB', formel: '45 Mbit/s × 5.400 s ÷ 8', ergebnis: '30.375 MB' },
          { label: 'In Gigabyte', formel: '30.375 ÷ 1.000', ergebnis: '≈ 30,4 GB' },
        ],
        fazit: 'Ein 90-minütiger 4K-Film bei 45 Mbit/s belegt rund 30,4 GB — er passt damit knapp auf eine 32-GB-Speicherkarte, lässt aber kaum Reserve. Umgekehrt gerechnet: Eine 128-GB-Karte fasst bei dieser Bitrate rund sechseinhalb Stunden 4K-Material am Stück. Solche Überschläge helfen bei der Reise- oder Drehplanung — etwa um zu entscheiden, ob eine Karte für einen Drehtag reicht oder ob man zwischendurch sichern muss. Wer auf Nummer sicher geht, plant immer etwas Puffer ein, weil hohe Bewegung im Bild die tatsächliche Bitrate über den Richtwert treiben kann.',
      },
      {
        typ: 'checkliste',
        titel: 'Videogröße gezielt reduzieren',
        punkte: [
          'Die Bitrate senken — der direkteste Hebel, kostet aber Bilddetails.',
          'Auflösung oder Bildrate (FPS) anpassen, wenn 4K oder 60 fps nicht nötig sind.',
          'Einen modernen Codec wählen (H.265 oder AV1) statt älterem H.264.',
          'Unnötige Passagen herausschneiden — kürzere Videos sind direkt kleiner.',
          'Zwei-Pass-Encoding nutzen für die beste Qualität bei vorgegebener Größe.',
          'Für reine Web-Nutzung gezielt komprimieren statt die Rohdatei hochzuladen.',
          'Vor dem Export die Zielplattform prüfen — viele komprimieren ohnehin noch einmal nach.',
        ],
      },
      {
        typ: 'text',
        titel: 'Plattform-Vorgaben und Upload',
        html: `<p>Jede Plattform hat eigene Vorstellungen von Bitrate und Format. <strong>YouTube</strong> empfiehlt für den Upload bewusst höhere Bitraten (etwa 8 Mbit/s für 1080p, 35 bis 45 Mbit/s für 4K), weil das Video nach dem Hochladen noch einmal komprimiert wird — eine gute Ausgangsqualität überlebt diesen Schritt besser. <strong>Instagram</strong> und <strong>TikTok</strong> dagegen komprimieren sehr stark nach, sodass extrem hohe Bitraten dort kaum sichtbaren Mehrwert bringen.</p><p>Für die Praxis heißt das: Lieber in solider Qualität exportieren, als die Datei künstlich aufzublähen. Wichtig ist neben der Größe auch die <strong>Upload-Zeit</strong>, denn die hängt vom schmaleren Upload-Kanal des Internetanschlusses ab — ein großes 4K-Video kann beim Hochladen länger brauchen als beim späteren Herunterladen. Wie lange das dauert, lässt sich mit dem <a href="/technik/download-rechner">Download-Rechner</a> abschätzen, der dieselbe Bit-Byte-Logik nutzt. Wer regelmäßig hochlädt, plant die Übertragungszeit am besten gleich mit ein.</p>`,
      },
      {
        typ: 'text',
        titel: 'Warum dein Download oft kleiner ist als die Rohaufnahme',
        html: `<p>Es überrascht viele: Ein 4K-Film, den man bei einem Streaming-Dienst herunterlädt, ist oft deutlich kleiner als die Rohaufnahme derselben Länge aus einer Kamera. Der Grund liegt in der <strong>Komprimierung</strong>. Streaming-Anbieter optimieren ihre Dateien mit effizienten Codecs und sorgfältig abgestimmten Bitraten, um bei guter Bildqualität möglichst wenig Daten zu übertragen.</p><p>Eine Kamera dagegen zeichnet mit hoher Bitrate auf, um beim späteren Schnitt maximale Reserven zu haben — diese Rohdateien sind bewusst groß. Zwischen einer professionellen <strong>Rohaufnahme</strong> und der fertig komprimierten <strong>Streaming-Datei</strong> kann der Faktor leicht bei fünf bis zehn liegen. Die hier berechneten Werte beziehen sich auf eine fertig kodierte Datei mit der angegebenen Bitrate und liegen damit zwischen diesen Extremen. Wer die Größe einer konkreten Datei genau wissen will, schaut am verlässlichsten in die Dateieigenschaften — die Rechnung liefert die belastbare Schätzung, wenn die Datei noch gar nicht existiert, etwa bei der Planung von Aufnahmen oder Speicherbedarf.</p>`,
      },
    ],
    quellen: [
      {
        titel: 'Video-Bitrate & Codecs (H.264/H.265/AV1)',
        hinweis: 'Bei gleicher Bildqualität liefern neuere Codecs deutlich kleinere Dateien; angegebene Bitraten sind Richtwerte für H.264/H.265.',
      },
      {
        titel: 'Einheiten Bit/Byte',
        hinweis: 'Bitraten in Mbit/s, Dateigrößen in MB/GB — Umrechnung über Faktor 8 (1 Byte = 8 Bit).',
      },
    ],
  },
  {
    slug: 'netzteil-watt-rechner',
    letzteAktualisierung: '2026-06-30',
    titel: 'Netzteil-Rechner (PC-Watt)',
    beschreibung: 'Netzteil-Wattzahl für den PC berechnen: aus dem Verbrauch von CPU, GPU und Co. plus Reserve die passende Netzteilgröße bestimmen.',
    kategorie: 'Technik',
    kategorieSlug: 'technik',
    metaTitle: 'Netzteil-Rechner — PC-Wattzahl bestimmen',
    metaDescription: 'Netzteil-Rechner: passende PC-Wattzahl aus CPU, GPU und Komponenten plus Reserve berechnen — mit Beispiel-Konfigurationen und Rechenweg.',
    keywords: ['netzteil rechner', 'pc watt berechnen', 'psu calculator deutsch', 'wieviel watt netzteil', 'netzteil wattzahl', 'pc stromverbrauch netzteil', 'gaming pc netzteil', 'netzteil größe'],
    icon: '🔌',
    formel: 'Gesamtlast = CPU + GPU + RAM×5 + SSD×5 + HDD×8 + Lüfter×2 | Empfohlen = Gesamtlast × (1 + Reserve)',
    beispiel: 'Gaming-Mittelklasse: 95 + 170 + 10 + 5 + 8 + 8 = 296 W × 1,30 = 385 W → 400-W-Netzteil.',
    erklaerung: `**Netzteil-Wattzahl berechnen — wie viel Watt braucht mein PC?**

Die richtige Netzteilgröße ergibt sich nicht aus einer Wunschzahl, sondern aus dem tatsächlichen Verbrauch der verbauten Komponenten plus einer sinnvollen Reserve. Dieser Rechner addiert die Volllast-Verbräuche von CPU, Grafikkarte, Arbeitsspeicher, Laufwerken und Lüftern und schlägt eine passende, gängige Netzteilgröße vor.

**Die Rechnung**

Gesamtlast = CPU + GPU + (RAM-Riegel × 5 W) + (SSD × 5 W) + (HDD × 8 W) + (Lüfter × 2 W). Auf diese Summe kommt eine Reserve von standardmäßig 30 Prozent, anschließend wird auf die nächste handelsübliche Netzteilgröße aufgerundet. Beispiel: Ein Gaming-PC mit 95-W-CPU und 170-W-Grafikkarte landet bei rund 296 W Gesamtlast, mit Reserve bei 385 W — empfohlen wird also ein 400-W-Netzteil.

**Warum nicht die exakte Last?**

Man wählt bewusst etwas mehr als die reine Summe. Grafikkarten erzeugen kurze Lastspitzen, die deutlich über dem Durchschnitt liegen; Netzteile arbeiten bei rund 50 Prozent Auslastung am effizientesten; und Kondensatoren altern über die Jahre. Eine Reserve von etwa 30 Prozent deckt all das ab und lässt zugleich Spielraum für spätere Aufrüstungen.

**Qualität vor reiner Wattzahl**

Ein Netzteil zieht nie mehr, als der PC tatsächlich braucht — eine 600-W-PSU verbraucht im Leerlauf nur 60 bis 90 W, nicht 600. Wichtiger als eine möglichst hohe Wattzahl sind daher eine gute 80-PLUS-Effizienz, saubere Schutzschaltungen und genügend Stromstecker für die Grafikkarte.`,
    faq: [
      {
        frage: 'Wie viel Watt braucht mein PC wirklich?',
        antwort: 'Addieren Sie die Volllast-Verbräuche der Komponenten: CPU (65–170 W), Grafikkarte (75–450 W), je RAM-Riegel rund 5 W, je SSD 5 W, je HDD 8 W und je Lüfter 2 W. Ein typischer Gaming-PC kommt so auf rund 300 W Gesamtlast. Das Netzteil sollte mit etwa 30 Prozent Reserve darüber liegen, hier also rund 400 W.',
      },
      {
        frage: 'Ist ein größeres Netzteil verschwenderisch?',
        antwort: 'Nicht direkt, aber unnötig. Ein Netzteil zieht nur so viel Strom, wie der PC braucht — ein 1000-W-Netzteil im Office-PC verbraucht nicht mehr als ein 400-W-Modell. Allerdings arbeitet es im sehr niedrigen Teillastbereich ineffizienter und ist teurer. Sinnvoll ist die goldene Mitte: genug Reserve, aber nicht maßlos überdimensioniert.',
      },
      {
        frage: 'Was bedeutet 80 PLUS?',
        antwort: 'Die 80-PLUS-Zertifizierung gibt den Wirkungsgrad eines Netzteils an, also wie viel des aus der Steckdose gezogenen Stroms tatsächlich beim PC ankommt und wie viel als Wärme verloren geht. Die Stufen reichen von Bronze über Gold und Platinum bis Titanium. Höhere Stufen sparen Strom und erzeugen weniger Abwärme, am effizientesten meist bei rund 50 Prozent Auslastung.',
      },
      {
        frage: 'Was passiert, wenn das Netzteil zu klein ist?',
        antwort: 'Reicht die Leistung nicht aus, kann der PC unter Last instabil werden: Es kommt zu plötzlichen Abschaltungen, Neustarts oder Bluescreens, besonders in Spielen oder bei Lastspitzen der Grafikkarte. Im schlimmsten Fall leidet die Hardware. Deshalb sollte man immer eine Reserve einplanen, statt das Netzteil exakt auf die berechnete Last zu wählen.',
      },
      {
        frage: 'Brauche ich ein ATX-3.0-Netzteil?',
        antwort: 'Für moderne High-End-Grafikkarten mit 12VHPWR-Stecker (PCIe 5.0) ist ein ATX-3.0-Netzteil empfehlenswert, weil es die kurzen Lastspitzen dieser Karten besser abfängt. Für ältere oder sparsamere Systeme genügt ein gutes ATX-2.x-Netzteil mit passenden PCIe-Steckern. Entscheidend ist, dass die Grafikkarte die nötigen Stromanschlüsse erhält.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Wie man die Netzteilgröße bestimmt',
        html: `<p>Die passende <strong>Netzteilgröße</strong> ergibt sich nicht aus einer runden Wunschzahl, sondern aus dem tatsächlichen Verbrauch der verbauten Teile. Dazu addiert man die <strong>Volllast-Verbräuche</strong> aller Komponenten: Prozessor und Grafikkarte machen den Löwenanteil aus, dazu kommen Arbeitsspeicher, Laufwerke und Lüfter mit kleineren Beträgen.</p><p>Auf diese Gesamtlast schlägt man eine <strong>Reserve</strong> von rund 30 Prozent auf und rundet auf die nächste handelsübliche Netzteilgröße auf. Warum nicht einfach die exakte Last wählen? Weil ein PC nie gleichmäßig verbraucht: Grafikkarten erzeugen kurze, heftige Lastspitzen, Netzteile laufen bei etwa halber Auslastung am effizientesten, und ihre Bauteile altern über die Jahre. Die Reserve fängt all das ab und lässt Platz für spätere Aufrüstungen. Dieser Rechner nimmt die Auswahl der Komponenten entgegen, bildet die Summe, schlägt die Reserve auf und nennt die empfohlene Netzteilgröße — als belastbare Orientierung für den Kauf, nicht als starre Vorgabe.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Beispiel-PCs und empfohlenes Netzteil',
        kopf: ['Konfiguration', 'Kernkomponenten', 'Gesamtlast', 'Netzteil'],
        zeilen: [
          ['Office / Büro', '65-W-CPU, integrierte Grafik', '84 W', '300 W'],
          ['Gaming-Mittelklasse', '95-W-CPU, 170-W-GPU', '296 W', '400 W'],
          ['High-End', '125-W-CPU, 290-W-GPU', '457 W', '600 W'],
          ['Enthusiast', '170-W-CPU, 450-W-GPU', '674 W', '1.000 W'],
        ],
        fussnote: 'Vier typische PC-Klassen mit ihrer Gesamtlast und dem empfohlenen Netzteil (jeweils inklusive 30 Prozent Reserve und auf die nächste gängige Größe aufgerundet). Auffällig ist die Spannweite: Ein sparsamer Büro-PC kommt mit 300 W aus, während ein Enthusiasten-System mit dicker Grafikkarte das Dreifache benötigt. Den größten Unterschied macht fast immer die Grafikkarte, nicht der Prozessor. Die Last-Werte beziehen sich auf Volllast, also den ungünstigsten Fall — im Alltag liegt der Verbrauch meist deutlich darunter. Für die Netzteilwahl ist aber genau diese Spitzenlast maßgeblich, damit das System auch im Spiel oder beim Rendern stabil bleibt.',
      },
      {
        typ: 'statistik',
        titel: 'Typische Komponenten-Verbräuche unter Volllast',
        werte: [
          { label: 'Prozessor (CPU)', wert: '65–170 W', hinweis: 'je nach Modell und Last' },
          { label: 'Grafikkarte (GPU)', wert: '75–450 W', hinweis: 'meist der größte Verbraucher' },
          { label: 'RAM-Riegel', wert: '~5 W', hinweis: 'pro Modul' },
          { label: 'SSD / NVMe', wert: '~5 W', hinweis: 'pro Laufwerk' },
          { label: 'Festplatte (HDD)', wert: '~8 W', hinweis: 'mechanisch, mehr als SSD' },
          { label: 'Lüfter / Pumpe', wert: '~2 W', hinweis: 'pro Stück' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: 'Gaming-Mittelklasse Schritt für Schritt',
        schritte: [
          { label: 'Komponenten addieren', formel: '95 (CPU) + 170 (GPU) + 10 (2× RAM) + 5 (SSD) + 8 (HDD) + 8 (4× Lüfter)', ergebnis: '296 W' },
          { label: 'Reserve aufschlagen', formel: '296 W × 1,30', ergebnis: '385 W' },
          { label: 'Auf gängige Größe aufrunden', formel: 'nächste Größe ab 385 W', ergebnis: '400 W' },
        ],
        fazit: 'Ein Gaming-PC der Mittelklasse mit 95-W-Prozessor und 170-W-Grafikkarte kommt auf rund 296 W Gesamtlast. Mit 30 Prozent Reserve sind das 385 W, aufgerundet auf die nächste handelsübliche Größe also ein 400-W-Netzteil. Das deckt die Lastspitzen der Grafikkarte ab und lässt etwas Luft für eine spätere kleine Aufrüstung. Wer hier zu 300 W greifen würde, riskiert Abschaltungen unter Last; wer ein 750-W-Modell kauft, zahlt unnötig drauf und betreibt es dauerhaft im ineffizienten Niedriglastbereich. Die 400 W treffen hier genau die goldene Mitte zwischen Sicherheit und Effizienz.',
      },
      {
        typ: 'text',
        titel: 'Warum 30 Prozent Reserve?',
        html: `<p>Die Reserve ist kein Sicherheitsfetisch, sondern hat handfeste Gründe. Der wichtigste sind die <strong>Lastspitzen der Grafikkarte</strong>: Moderne GPUs ziehen für Sekundenbruchteile deutlich mehr als ihre durchschnittliche Leistungsaufnahme — diese „transient spikes" können das Doppelte des Nennwerts erreichen. Ein zu knapp dimensioniertes Netzteil schaltet dann zum Schutz ab.</p><p>Zweitens arbeiten Netzteile nicht überall gleich effizient: Der beste Wirkungsgrad liegt typischerweise bei rund <strong>50 Prozent Auslastung</strong>. Wer sein Netzteil so wählt, dass es im normalen Betrieb etwa in diesem Bereich läuft, spart Strom und Abwärme. Drittens <strong>altern</strong> die Bauteile, vor allem die Kondensatoren — ein Netzteil liefert nach Jahren etwas weniger als am Anfang. Und schließlich gibt die Reserve einen <strong>Aufrüst-Puffer</strong> für eine stärkere Grafikkarte oder zusätzliche Laufwerke. Rund 30 Prozent sind dafür ein bewährter Mittelwert: genug Sicherheit, ohne maßlos zu überdimensionieren. Wer eine baldige Aufrüstung plant, darf auch 40 Prozent ansetzen.</p>`,
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: '80 PLUS: Effizienz schlägt rohe Wattzahl',
        text: 'Die 80-PLUS-Zertifizierung verrät, wie viel des aus der Steckdose gezogenen Stroms tatsächlich beim PC ankommt und wie viel als Wärme verpufft. Die Stufen Bronze, Gold, Platinum und Titanium stehen für steigenden Wirkungsgrad — ein Gold-Netzteil verschwendet weniger Energie als ein Bronze-Modell und bleibt kühler und leiser. Wichtig zu wissen: Der beste Wirkungsgrad liegt meist bei rund 50 Prozent Auslastung. Genau deshalb ist eine moderate Reserve sinnvoll, eine maßlose Überdimensionierung aber kontraproduktiv: Ein 1.000-W-Netzteil, das im Alltag nur zu 10 Prozent ausgelastet ist, läuft außerhalb seines Effizienz-Sweetspots. Für die meisten Systeme ist ein gutes Gold-Netzteil mit passender Wattzahl die beste Wahl — es spart über die Jahre Strom und schont durch geringere Abwärme die übrige Hardware. Über die gesamte Nutzungsdauer kann der Effizienzunterschied zwischen Bronze und Gold mehrere zehn Euro Stromkosten ausmachen, sodass sich das hochwertigere Netzteil oft von selbst bezahlt macht. Die reine Wattzahl sagt nämlich nichts über die Qualität aus. Ein günstiges 800-W-Netzteil ohne Zertifizierung ist einem hochwertigen 550-W-Gold-Modell in fast jeder Hinsicht unterlegen: weniger effizient, lauter und im Zweifel ohne verlässliche Schutzschaltungen. Beim Netzteil zu sparen rächt sich oft an der übrigen, teureren Hardware, denn ein schlechtes Netzteil kann im Defektfall andere Komponenten mitnehmen.',
      },
      {
        typ: 'tabelle',
        titel: 'Die Grafikkarte als Hauptverbraucher',
        kopf: ['GPU-Klasse', 'Verbrauch', 'PC-Gesamtlast (grob)', 'Netzteil-Empfehlung'],
        zeilen: [
          ['Einsteiger', '75 W', '~180 W', '300–400 W'],
          ['Mittelklasse', '170 W', '~300 W', '400–500 W'],
          ['High-End', '290 W', '~460 W', '600–650 W'],
          ['Enthusiast', '450 W', '~680 W', '850–1.000 W'],
        ],
        fussnote: 'Die Grafikkarte bestimmt die Netzteilgröße stärker als jede andere Komponente. Während sich Prozessoren zwischen 65 und 170 W bewegen, reicht die Spanne bei Grafikkarten von 75 bis 450 W. Wer die GPU-Klasse kennt, kann die nötige Netzteilgröße schon grob abschätzen — der Rest des Systems addiert meist nur 120 bis 180 W obendrauf. Bei einer geplanten GPU-Aufrüstung lohnt es sich, das Netzteil von Anfang an entsprechend größer zu wählen. Gerade die Grafikkarte ist auch die Komponente, die am häufigsten getauscht wird — ein knapp bemessenes Netzteil zwingt dann zum Doppelkauf. Wer langfristig plant, orientiert sich daher besser an der angepeilten GPU-Oberklasse als am aktuellen Sparmodell.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'High-End-Build und was bei zu knapp passiert',
        schritte: [
          { label: 'Komponenten addieren', formel: '125 (CPU) + 290 (GPU) + 20 (4× RAM) + 10 (2× SSD) + 12 (6× Lüfter)', ergebnis: '457 W' },
          { label: 'Reserve aufschlagen', formel: '457 W × 1,30', ergebnis: '594 W' },
          { label: 'Aufrunden', formel: 'nächste Größe ab 594 W', ergebnis: '600 W' },
        ],
        fazit: 'Ein High-End-PC mit 125-W-CPU und 290-W-Grafikkarte braucht rund 457 W, mit Reserve also ein 600-W-Netzteil. Würde man hier zu einem 450-W-Modell greifen, läge die reine Last bereits nahe der Grenze — schon eine Lastspitze der Grafikkarte könnte das Netzteil in die Schutzabschaltung treiben. Die Folge sind plötzliche Neustarts mitten im Spiel oder Instabilität unter Volllast. Solche Symptome werden oft fälschlich der Grafikkarte oder dem Mainboard zugeschrieben, obwohl schlicht das Netzteil zu klein ist. Die Reserve ist also kein Luxus, sondern der Unterschied zwischen einem stabilen und einem zickigen System. Wer bei einem High-End-System ohnehin viel Geld in CPU und Grafikkarte investiert, sollte am Netzteil zuletzt sparen — die paar Euro Aufpreis zum nächstgrößeren, hochwertigen Modell sind gut angelegt und ersparen mühsame Fehlersuche.',
      },
      {
        typ: 'text',
        titel: 'Zu groß oder zu klein — die goldene Mitte',
        html: `<p>Beide Extreme haben Nachteile. Ein <strong>zu kleines</strong> Netzteil führt zu Überlastung, Schutzabschaltungen und im Dauerbetrieb zu vorzeitigem Verschleiß. Ein <strong>zu großes</strong> Netzteil verbraucht zwar nicht mehr Strom als nötig, läuft aber im ineffizienten Niedriglastbereich: Ein 1.000-W-Netzteil in einem Office-PC, der nur 80 W zieht, arbeitet bei 8 Prozent Auslastung weit unter seinem Effizienz-Sweetspot.</p><p>Die <strong>goldene Mitte</strong> ist ein Netzteil, dessen empfohlene Größe etwa 30 Prozent über der Gesamtlast liegt — dann bewegt sich der typische Betrieb im effizienten Bereich, und es bleibt Reserve für Spitzen und Aufrüstung. Wie viel der PC im Alltag tatsächlich aus der Steckdose zieht und was das über das Jahr kostet, lässt sich mit dem <a href="/technik/stromverbrauch-geraete-rechner">Stromverbrauch-Rechner</a> abschätzen — denn die Netzteilgröße ist eine Obergrenze, nicht der reale Verbrauch. Genau deshalb ist es unsinnig, allein nach der höchsten Wattzahl zu kaufen.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'Netzteil richtig wählen',
        punkte: [
          'Die reale Leistungsaufnahme (TDP) der konkreten CPU und GPU nachschlagen, nicht schätzen.',
          'Rund 30 Prozent Reserve einplanen, mehr nur bei geplanter Aufrüstung.',
          'Auf eine gute 80-PLUS-Effizienz achten (Gold ist für die meisten ideal).',
          'Genug PCIe-Stromstecker für die Grafikkarte sicherstellen.',
          'Ein Marken-Netzteil mit Schutzschaltungen (Über-/Unterspannung, Kurzschluss) wählen.',
          'Die ATX-Version zum Mainboard und zur Grafikkarte passend wählen (ATX 3.0 für 12VHPWR).',
          'Die Wattzahl nicht maßlos überziehen — Qualität geht vor roher Leistung.',
        ],
      },
      {
        typ: 'text',
        titel: 'Realverbrauch ist nicht die Netzteilgröße',
        html: `<p>Ein verbreitetes Missverständnis: Ein 600-W-Netzteil würde 600 W aus der Steckdose ziehen. Das stimmt nicht. Ein Netzteil liefert nur so viel, wie der PC im jeweiligen Moment <strong>tatsächlich anfordert</strong>. Im Leerlauf, beim Surfen oder bei Büroarbeit zieht ein typischer PC nur rund <strong>60 bis 90 W</strong> — die 600 W sind allein die Obergrenze für Lastspitzen.</p><p>Die volle Wattzahl wird nur unter <strong>Volllast</strong> erreicht, etwa in einem anspruchsvollen Spiel oder beim Videorendern. Für die Stromrechnung zählt deshalb der reale Durchschnittsverbrauch, nicht die Netzteilgröße. Wer wissen will, was der PC-Betrieb übers Jahr kostet, rechnet mit dem geschätzten Durchschnittsverbrauch und dem eigenen Strompreis — der <a href="/wohnen/stromkosten-rechner">Stromkosten-Rechner</a> übernimmt das. Die Netzteilgröße sagt also nichts über die laufenden Kosten aus; sie stellt nur sicher, dass auch in Spitzenmomenten genug Leistung bereitsteht.</p>`,
      },
      {
        typ: 'text',
        titel: 'ATX 3.0, 12VHPWR und Zukunftssicherheit',
        html: `<p>Mit den neuesten Grafikkarten kam der Standard <strong>ATX 3.0</strong> auf, der vor allem die kurzen, heftigen Lastspitzen moderner GPUs besser verkraftet. Dazu gehört der neue <strong>12VHPWR</strong>-Stecker (PCIe 5.0), der bis zu 600 W über ein einziges Kabel liefert und das frühere Gewirr mehrerer Stromstecker ersetzt.</p><p>Für aktuelle High-End-Systeme ist ein ATX-3.0-Netzteil deshalb eine sinnvolle, zukunftssichere Wahl. Für sparsamere oder ältere PCs genügt aber weiterhin ein gutes ATX-2.x-Netzteil mit den passenden Steckern — ein Zwang zum Neukauf besteht nicht. Wichtiger als die Norm-Nummer bleibt am Ende die <strong>Qualität</strong>: ein renommierter Hersteller, eine solide 80-PLUS-Einstufung, zuverlässige Schutzschaltungen und genügend Anschlüsse für die eigene Hardware. Diese Faktoren entscheiden über Stabilität und Lebensdauer weit mehr als eine besonders hohe Wattzahl. Ein durchdacht gewähltes Netzteil hält oft mehrere PC-Generationen und ist damit eine der nachhaltigsten Komponenten im Rechner.</p>`,
      },
    ],
    quellen: [
      {
        titel: '80 PLUS Effizienz-Zertifizierung',
        hinweis: 'Bronze/Gold/Platinum/Titanium geben den Wirkungsgrad an; höchste Effizienz meist bei ~50 % Auslastung — Grund für moderate Reserve.',
      },
      {
        titel: 'ATX-Netzteil-Spezifikation (Intel)',
        hinweis: 'Definiert Bauform, Stecker und Lastverhalten; ATX 3.0 ergänzt PCIe-5-Stromspitzen (12VHPWR) für moderne Grafikkarten.',
      },
    ],
  },
  {
    slug: 'usv-laufzeit-rechner',
    letzteAktualisierung: '2026-06-30',
    titel: 'USV-Laufzeit-Rechner',
    beschreibung: 'USV-Laufzeit berechnen: Wie lange überbrückt eine USV einen Stromausfall bei gegebener Last? Mit VA-zu-Watt-Umrechnung und Akku-Kapazität.',
    kategorie: 'Technik',
    kategorieSlug: 'technik',
    metaTitle: 'USV-Laufzeit-Rechner — Überbrückungszeit',
    metaDescription: 'USV-Laufzeit berechnen: Wie lange überbrückt eine USV den Stromausfall bei gegebener Last? Mit VA-zu-Watt-Umrechnung und Rechenweg.',
    keywords: ['usv laufzeit', 'ups laufzeit berechnen', 'va in watt', 'überbrückungszeit usv', 'usv akku laufzeit', 'usv dimensionieren', 'unterbrechungsfreie stromversorgung laufzeit', 'usv watt'],
    icon: '🔋',
    formel: 'Laufzeit (min) = Kapazität(Wh) × Wirkungsgrad ÷ Last(W) × 60 | W = VA × Leistungsfaktor | Wh = V × Ah',
    beispiel: '216-Wh-USV bei 200 W: 216 × 0,9 ÷ 200 × 60 = 58,3 min Überbrückung.',
    erklaerung: `**USV-Laufzeit berechnen — wie lange überbrückt eine USV den Stromausfall?**

Eine USV (unterbrechungsfreie Stromversorgung, englisch UPS) hält Geräte bei einem Stromausfall am Laufen — lange genug, um Daten zu sichern und sauber herunterzufahren oder eine kurze Lücke ganz zu überbrücken. Wie lange das gelingt, hängt von der Akku-Kapazität und der angeschlossenen Last ab. Dieser Rechner ermittelt die Überbrückungszeit und rechnet dabei auch VA in Watt um.

**Die Rechnung**

Laufzeit in Minuten = Akku-Kapazität (Wh) × Wirkungsgrad ÷ Last (W) × 60. Der Wirkungsgrad (standardmäßig 0,9) berücksichtigt die Verluste des Wechselrichters. Eine 216-Wh-USV bei 200 W Last überbrückt also 216 × 0,9 ÷ 200 × 60 = rund 58 Minuten.

**VA ist nicht Watt**

USV-Geräte tragen meist eine VA-Angabe (Scheinleistung), etwa „1500 VA". Nutzbar ist davon nur die Wirkleistung in Watt: W = VA × Leistungsfaktor. Bei älteren Geräten liegt dieser Faktor oft bei 0,6, sodass aus 1500 VA nur 900 W werden. Wer mit der VA-Zahl statt mit Watt rechnet, schätzt die Laufzeit deutlich zu optimistisch.

**Akku-Kapazität selbst bestimmen**

Steht die Wh-Zahl nicht auf dem Gerät, lässt sie sich aus dem Akku berechnen: Wh = Spannung (V) × Kapazität (Ah). Ein 24-V-Akku mit 9 Ah hat also 216 Wh.`,
    faq: [
      {
        frage: 'Was bedeutet VA bei einer USV?',
        antwort: 'VA steht für Voltampere, die Scheinleistung. Sie ist die auf dem Gerät beworbene Maximalleistung. Nutzbar ist davon nur die Wirkleistung in Watt: W = VA × Leistungsfaktor. Bei älteren USV liegt dieser Faktor oft bei 0,6, bei modernen bei 0,9 bis 1,0. Eine 1500-VA-USV liefert also je nach Faktor zwischen 900 und 1500 W.',
      },
      {
        frage: 'Wie lange hält eine USV bei Stromausfall?',
        antwort: 'Das hängt von Akku-Kapazität und Last ab. Eine typische 1500-VA-Tower-USV mit rund 216 Wh überbrückt bei 200 W Last etwa 58 Minuten, bei 600 W nur noch rund 19 Minuten. USV sind meist nicht für stundenlangen Betrieb gedacht, sondern für die Zeit bis zum geordneten Herunterfahren oder zum Überbrücken kurzer Ausfälle.',
      },
      {
        frage: 'Wofür braucht man eine USV?',
        antwort: 'Eine USV schützt vor Datenverlust und Hardwareschäden bei Stromausfällen und Spannungsschwankungen. Besonders sinnvoll ist sie für NAS-Systeme, Heimserver, Arbeitsplätze mit ungespeicherten Daten und Netzwerktechnik (Router, ONT) im Homeoffice. Sie verschafft die Zeit, kritische Systeme sauber herunterzufahren, statt sie hart abstürzen zu lassen.',
      },
      {
        frage: 'Warum fällt die Laufzeit bei doppelter Last nicht genau auf die Hälfte?',
        antwort: 'Grob gilt: doppelte Last, halbe Laufzeit. Bei hoher Last sinkt jedoch zusätzlich der nutzbare Akku-Wirkungsgrad (Peukert-Effekt), sodass die Laufzeit etwas stärker fällt als rein rechnerisch. Bei sehr niedriger Last spielen dagegen die Grundverluste der USV-Elektronik eine größere Rolle. Die Berechnung liefert daher eine gute Näherung, keinen Laborwert.',
      },
      {
        frage: 'Wie groß muss meine USV sein?',
        antwort: 'Summieren Sie die reale Watt-Last aller kritischen Geräte und legen Sie die gewünschte Überbrückungszeit fest. Schließen Sie nur an, was wirklich geschützt werden muss — Laserdrucker etwa gehören nie an eine USV, weil ihre Heizung kurzzeitig sehr hohe Lasten zieht. Planen Sie zudem etwas Reserve für die Akku-Alterung ein.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Was eine USV macht und wie die Laufzeit entsteht',
        html: `<p>Eine <strong>USV</strong> (unterbrechungsfreie Stromversorgung) springt bei einem Stromausfall sofort ein und versorgt die angeschlossenen Geräte aus ihrem Akku weiter. Ziel ist meist nicht stundenlanger Betrieb, sondern eine sichere <strong>Überbrückung</strong>: genug Zeit, um Daten zu speichern und Systeme geordnet herunterzufahren — oder um kurze Ausfälle ganz unbemerkt zu überstehen.</p><p>Wie lange das gelingt, ergibt sich aus zwei Werten: der <strong>Akku-Kapazität</strong> in Wattstunden (Wh) und der angeschlossenen <strong>Last</strong> in Watt (W). Die Formel lautet: Laufzeit in Minuten = Kapazität × Wirkungsgrad ÷ Last × 60. Der Wirkungsgrad von rund 0,9 berücksichtigt die Verluste des Wechselrichters, der den Gleichstrom des Akkus in den Wechselstrom der Geräte umwandelt. Je mehr Last anliegt, desto kürzer die Laufzeit — und zwar in etwa umgekehrt proportional. Dieser Rechner nimmt Kapazität und Last entgegen, rechnet bei Bedarf Akku-Werte und VA-Angaben um und nennt die zu erwartende Überbrückungszeit als realistische Schätzung.</p>`,
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'VA ist nicht Watt — die häufigste USV-Falle',
        text: 'Auf fast jeder USV prangt eine VA-Zahl, etwa „1500 VA". Das ist die Scheinleistung, nicht die nutzbare Leistung. Tatsächlich abrufbar ist nur die Wirkleistung in Watt, und die ergibt sich aus W = VA × Leistungsfaktor (cos φ). Bei älteren USV liegt dieser Faktor oft bei nur 0,6 — aus 1500 VA werden dann gerade einmal 900 W. Moderne Geräte erreichen 0,9 bis 1,0 und liefern entsprechend mehr. Wer für die Laufzeit-Berechnung einfach die VA-Zahl als Watt einsetzt, überschätzt die mögliche Last und damit die Schutzwirkung deutlich. Maßgeblich ist immer die Watt-Angabe der USV und die reale Watt-Last der Geräte. Die VA-Zahl taugt allenfalls als grober Anhaltspunkt für die Größenklasse, nicht für eine ernsthafte Dimensionierung. Im Zweifel die kleinere, ehrliche Watt-Zahl zugrunde legen.',
      },
      {
        typ: 'beispielrechnung',
        titel: '216-Wh-USV bei 200 W Last',
        schritte: [
          { label: 'Nutzbare Energie', formel: '216 Wh × 0,9', ergebnis: '194,4 Wh' },
          { label: 'Laufzeit in Stunden', formel: '194,4 Wh ÷ 200 W', ergebnis: '0,97 h' },
          { label: 'In Minuten', formel: '0,97 h × 60', ergebnis: '≈ 58,3 min' },
        ],
        fazit: 'Eine typische 1500-VA-Tower-USV mit einem 216-Wh-Akku (24 V × 9 Ah) überbrückt bei 200 W Last — etwa einem Office-PC samt Monitor — rund 58 Minuten. Das reicht locker, um in Ruhe zu speichern und herunterzufahren, und überbrückt die meisten kurzen Ausfälle komplett. Der Wirkungsgrad von 0,9 zieht dabei die Verluste des Wechselrichters ab; ohne diesen Faktor käme man auf optimistische 64,8 Minuten. Wird mehr angeschlossen, sinkt die Zeit rasch: Schon bei 400 W halbiert sie sich auf rund 29 Minuten.',
      },
      {
        typ: 'text',
        titel: 'Warum die Laufzeit nicht-linear fällt',
        html: `<p>Die Grundregel ist einfach: <strong>doppelte Last, halbe Laufzeit</strong>. Wer statt 100 W plötzlich 200 W anschließt, halbiert die Überbrückungszeit ungefähr. Diese umgekehrte Proportionalität steckt direkt in der Formel und macht den größten Teil des Effekts aus.</p><p>In der Praxis fällt die Laufzeit bei hoher Last aber sogar <strong>etwas stärker</strong> als rein rechnerisch. Der Grund ist der <strong>Peukert-Effekt</strong>: Je höher der Entladestrom, desto geringer die effektiv nutzbare Akku-Kapazität — ein Bleiakku gibt unter starker Belastung anteilig weniger Energie ab als bei sanfter Entladung. Bei sehr niedriger Last dagegen machen sich die konstanten <strong>Grundverluste</strong> der USV-Elektronik stärker bemerkbar. Beide Effekte sind in einer einfachen Rechnung nicht exakt abbildbar, weshalb die hier ausgegebene Laufzeit eine gute Näherung ist und reale Geräte je nach Akku-Typ und Alter etwas darunter liegen können. Für die Dimensionierung gilt deshalb: lieber etwas großzügiger rechnen und einen Puffer einplanen, als die berechnete Zeit als garantierten Wert zu betrachten.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Laufzeit einer 216-Wh-USV je Last',
        kopf: ['Last', 'Typisches Gerät', 'Laufzeit'],
        zeilen: [
          ['50 W', 'Router + ONT', '3 h 53 min'],
          ['100 W', 'NAS + Netzwerk', '1 h 57 min'],
          ['200 W', 'Office-PC + Monitor', '58,3 min'],
          ['400 W', 'starker PC', '29,2 min'],
          ['600 W', 'Gaming-PC', '19,4 min'],
        ],
        fussnote: 'Überbrückungszeit einer 216-Wh-USV (Wirkungsgrad 0,9) bei steigender Last. Schön sichtbar ist die umgekehrte Proportionalität: Jede Verdopplung der Last halbiert die Laufzeit. Eine sparsame Netzwerk-Last von 50 W lässt sich fast vier Stunden überbrücken, ein stromhungriger Gaming-PC dagegen nur knapp 20 Minuten. Wer lange Laufzeiten braucht, schließt deshalb nur die wirklich kritischen, sparsamen Geräte an. Soll die USV nicht nur den geordneten Shutdown sichern, sondern längere Ausfälle überbrücken, führt am Ende kein Weg an einem größeren Akku oder einem zusätzlichen Akkupack vorbei — die reine VA-Klasse hilft dabei nicht weiter.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Akku-Kapazität selbst bestimmen',
        schritte: [
          { label: 'Wh einer großen USV', formel: '24 V × 9 Ah', ergebnis: '216 Wh' },
          { label: 'Wh einer kleinen USV', formel: '12 V × 7 Ah', ergebnis: '84 Wh' },
          { label: 'Kleine USV bei 80 W (Router)', formel: '84 Wh × 0,9 ÷ 80 W × 60', ergebnis: '≈ 56,7 min' },
        ],
        fazit: 'Steht die Wh-Zahl nicht auf dem Gerät, lässt sie sich aus dem Akku berechnen: Spannung mal Kapazität in Amperestunden. Ein 24-V-Akku mit 9 Ah ergibt 216 Wh, ein kleiner 12-V-Akku mit 7 Ah nur 84 Wh. Letzterer überbrückt einen sparsamen Router mit ONT (rund 80 W) immerhin knapp eine Stunde — genug, um die meisten kurzen Ausfälle im Homeoffice zu überstehen und die Internetverbindung aufrechtzuerhalten. Für längere Ausfälle oder größere Lasten braucht es entsprechend mehr Akku-Kapazität.',
      },
      {
        typ: 'text',
        titel: 'Was anschließen? Typische Lasten',
        html: `<p>An eine USV gehört nur das, was im Ausfall wirklich weiterlaufen muss — jedes zusätzliche Gerät verkürzt die Laufzeit. Typische Verbräuche helfen bei der Einschätzung: Ein <strong>Router mit ONT</strong> zieht rund 10 bis 20 W, ein <strong>NAS</strong> je nach Plattenzahl 30 bis 60 W, ein <strong>Monitor</strong> 20 bis 40 W.</p><p>Ein <strong>Office-PC</strong> liegt bei 80 bis 150 W, ein <strong>Gaming-PC</strong> unter Last dagegen schnell bei 300 bis 500 W — und frisst die Akkureserve entsprechend rasch. Wer die genaue Leistungsaufnahme seiner Geräte kennen will, kann sie mit dem <a href="/technik/netzteil-watt-rechner">Netzteil-Rechner</a> für den PC abschätzen oder mit einem Messgerät an der Steckdose ermitteln. Die Faustregel lautet: An die USV nur die kritischen, sparsamen Komponenten — typischerweise Netzwerktechnik, NAS und der Rechner selbst, aber ohne Drucker, Lautsprecher oder Ladegeräte. So bleibt die wertvolle Akkuenergie für das reserviert, was im Ernstfall wirklich zählt.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'USV-Größen und grobe Überbrückung',
        kopf: ['USV-Klasse', 'Schein- / Wirkleistung', 'Typischer Akku', 'Laufzeit bei mittlerer Last'],
        zeilen: [
          ['Klein', '650 VA / 390 W', '~84 Wh (12 V × 7 Ah)', '~25 min bei 180 W'],
          ['Mittel', '1.000 VA / 600 W', '~150 Wh', '~30 min bei 270 W'],
          ['Groß', '1.500 VA / 900 W', '~216 Wh (24 V × 9 Ah)', '~29 min bei 400 W'],
        ],
        fussnote: 'Grobe Einordnung gängiger USV-Klassen. Wichtig: Die VA- und Watt-Angaben beschreiben die maximal mögliche Last, nicht die Laufzeit — diese hängt allein vom Akku und der tatsächlichen Last ab. Eine größere VA-Klasse verträgt mehr Geräte, hält aber bei voller Auslastung nicht länger durch als eine kleinere bei geringer Last. Wer lange Laufzeiten braucht, achtet auf die Akku-Kapazität in Wh, nicht auf die VA-Zahl. Manche Modelle lassen sich mit externen Akkupacks erweitern und erreichen so deutlich längere Laufzeiten, ohne dass eine größere VA-Klasse nötig wäre.',
      },
      {
        typ: 'text',
        titel: 'Leistungsfaktor und moderne USV',
        html: `<p>Der <strong>Leistungsfaktor</strong> (cos φ) entscheidet, wie viel der beworbenen VA-Leistung tatsächlich als nutzbare Watt zur Verfügung steht. Ältere USV-Modelle kommen oft nur auf <strong>0,6</strong>: Aus 1500 VA werden dann 900 W. Moderne Geräte mit aktiver Leistungsfaktor-Korrektur erreichen <strong>0,9 bis 1,0</strong> und stellen damit nahezu die volle Scheinleistung als Wirkleistung bereit.</p><p>Für die Praxis heißt das: Die <strong>Watt-Angabe</strong> einer USV ist aussagekräftiger als die VA-Zahl, denn sie nennt direkt die nutzbare Leistung. Beim Vergleich zweier Geräte mit gleicher VA-Zahl kann das mit dem höheren Leistungsfaktor deutlich mehr leisten. Achten Sie deshalb beim Kauf auf die in Watt angegebene Ausgangsleistung und gleichen Sie sie mit der summierten realen Last Ihrer Geräte ab. Eine USV, deren Watt-Leistung nur knapp über der Last liegt, läuft im Ernstfall an ihrer Grenze — etwas Reserve sorgt hier für Stabilität und schont den Akku.</p>`,
      },
      {
        typ: 'checkliste',
        titel: 'USV richtig dimensionieren',
        punkte: [
          'Die reale Watt-Last aller kritischen Geräte summieren — nicht die VA-Zahlen.',
          'Die gewünschte Überbrückungszeit festlegen (oft reichen wenige Minuten bis zum Shutdown).',
          'Nur wirklich kritische Geräte anschließen, jedes weitere verkürzt die Laufzeit.',
          'Keine Laserdrucker an die USV — ihre Heizung zieht kurzzeitig extreme Lasten.',
          'Die Akku-Alterung einplanen: Nach Jahren sinkt die reale Kapazität spürbar.',
          'Den automatischen Shutdown per USB/Software einrichten, damit Systeme geordnet herunterfahren.',
          'Auf die Watt-Ausgangsleistung achten, nicht nur auf die VA-Angabe.',
        ],
      },
      {
        typ: 'text',
        titel: 'Akku-Verschleiß: Laufzeit sinkt mit der Zeit',
        html: `<p>USV-Akkus sind Verschleißteile. Die verbauten Blei- oder Lithium-Akkus altern und verlieren über die Jahre an Kapazität — bei klassischen Blei-Akkus ist nach <strong>drei bis fünf Jahren</strong> oft ein Tausch fällig. Die reale Überbrückungszeit liegt dann deutlich unter dem Neuwert, ohne dass man es sofort merkt.</p><p>Deshalb sollte man regelmäßig den <strong>Selbsttest</strong> der USV nutzen und die tatsächliche Laufzeit gelegentlich überprüfen, etwa durch einen kontrollierten Test unter realer Last. Sinkt sie merklich, ist der Akku reif für den Austausch — viele USV erlauben einen einfachen Wechsel der Akkupacks. Auch die Umgebung spielt eine Rolle: Hitze verkürzt die Akku-Lebensdauer erheblich, weshalb die USV nicht eingeengt neben Wärmequellen stehen sollte. Wer den tatsächlichen Stromverbrauch der angeschlossenen Geräte im Blick behalten will, findet im <a href="/technik/stromverbrauch-geraete-rechner">Stromverbrauch-Rechner</a> ein passendes Werkzeug — damit lässt sich die reale Last und damit die zu erwartende Laufzeit verlässlich abschätzen.</p>`,
      },
      {
        typ: 'text',
        titel: 'Offline, Line-Interactive oder Online — und wann es sich lohnt',
        html: `<p>USV gibt es in drei Bauarten mit steigendem Schutzgrad. Die einfache <strong>Offline-USV</strong> (VFD) schaltet bei Ausfall auf den Akku um und genügt für unkritische Heim-Anwendungen. Die <strong>Line-Interactive-USV</strong> (VI) gleicht zusätzlich Spannungsschwankungen aus, ohne gleich auf den Akku zu wechseln — der gängige Kompromiss für Arbeitsplätze, NAS und Heimserver.</p><p>Die <strong>Online-USV</strong> (VFI) versorgt die Geräte permanent über den Wechselrichter und bietet damit den lückenlosesten Schutz, ist aber teurer und weniger effizient — sie lohnt sich vor allem für empfindliche oder geschäftskritische Technik. Für die meisten privaten und kleinen geschäftlichen Anwendungen reicht eine Line-Interactive-USV mit ausreichend Akku-Kapazität für den geordneten Shutdown. Ob sich der Aufwand lohnt, hängt vom Schadenspotenzial ab: Wer ein NAS mit wichtigen Daten, einen Heimserver oder einen Arbeitsplatz mit ungespeicherter Arbeit betreibt, schützt mit einer USV für vergleichsweise wenig Geld vor Datenverlust und Hardwareschäden. Für einen reinen Surf-PC ist sie dagegen meist verzichtbar.</p>`,
      },
    ],
    quellen: [
      {
        titel: 'Scheinleistung, Wirkleistung & Leistungsfaktor',
        hinweis: 'USV-Angaben in VA (Scheinleistung); nutzbare Wirkleistung in Watt = VA × Leistungsfaktor (cos φ).',
      },
      {
        titel: 'USV-Topologien (VFD/VI/VFI nach IEC 62040-3)',
        hinweis: 'Offline-, Line-Interactive- und Online-USV unterscheiden sich in Schutzgrad und Wirkungsgrad.',
      },
    ],
  },
  {
    slug: 'datenmengen-umrechner',
    letzteAktualisierung: '2026-06-19',
    titel: 'Datenmengen-Umrechner',
    beschreibung: 'Datenmengen umrechnen: Byte, KB, MB, GB, TB sowie binäre KiB/MiB/GiB — und warum „500 GB“ als 465 GiB erscheinen.',
    kategorie: 'Technik',
    kategorieSlug: 'technik',
    metaTitle: 'Datenmengen-Umrechner — GB, GiB, MB & TB',
    metaDescription: 'Datenmengen umrechnen: Byte, KB, MB, GB, TB und binäre KiB/MiB/GiB ✓ dezimal vs. binär ✓ warum 500 GB als 465 GiB erscheinen ✓ KI-Erklärung.',
    keywords: ['datenmengen umrechner', 'gb in gib', 'mb in mib', 'byte umrechnen', 'gibibyte', 'dezimal binär datenmenge', '500 gb festplatte', 'speichergröße umrechnen'],
    icon: '💾',
    formel: 'Umrechnung über Byte: dezimal × 1.000 (KB/MB/GB/TB), binär × 1.024 (KiB/MiB/GiB/TiB); 1 Byte = 8 Bit',
    beispiel: '500 GB (dezimal) = 500.000.000.000 Byte ÷ 1.073.741.824 ≈ 465,66 GiB. 8 Mbit = 1 MB (1 Byte = 8 Bit).',
    erklaerung: `**Datenmengen umrechnen — dezimal und binär**

Datenmengen werden in zwei unterschiedlichen Systemen gezählt, und genau das sorgt für Verwirrung. Unser Rechner wandelt zwischen allen gängigen Einheiten um — von Bit und Byte über Kilo-, Mega-, Giga- und Terabyte bis zu den binären Einheiten Kibibyte (KiB), Mebibyte (MiB) und Gibibyte (GiB).

**Bit und Byte**

Die kleinste Einheit ist das Bit (eine 0 oder 1). Acht Bit ergeben ein Byte. Daraus folgt: 8 Megabit (Mbit) sind 1 Megabyte (MB). Internetanbieter werben in Megabit pro Sekunde, Dateigrößen rechnen in Megabyte — der Faktor 8 trennt beide.

**Dezimal vs. binär**

Dezimale Einheiten (SI) rechnen in Tausenderschritten: 1 KB = 1.000 Byte, 1 MB = 1.000.000 Byte, 1 GB = 1.000.000.000 Byte. So zählen Festplatten- und SSD-Hersteller sowie Internetanbieter.

Binäre Einheiten (IEC 80000-13) rechnen in 1.024er-Schritten: 1 KiB = 1.024 Byte, 1 MiB = 1.048.576 Byte, 1 GiB = 1.073.741.824 Byte. So zählen Betriebssysteme den Arbeitsspeicher und oft auch Dateigrößen.

**Warum „500 GB" als 465 GiB erscheinen**

Eine Festplatte mit 500 GB hat 500.000.000.000 Byte (dezimal). Das Betriebssystem teilt diese Zahl durch 1.073.741.824 und zeigt rund 465 an — beschriftet es aber meist trotzdem als „GB", obwohl GiB gemeint ist. Es fehlt kein Byte; nur die Einheit ist eine andere. Je größer die Kapazität, desto größer die scheinbare Lücke.`,
    faq: [
      {
        frage: 'Warum zeigt meine 500-GB-Festplatte weniger an?',
        antwort: 'Hersteller rechnen dezimal: 500 GB = 500.000.000.000 Byte. Das Betriebssystem rechnet binär und teilt durch 1.073.741.824, was rund 465 ergibt — beschriftet als „GB", gemeint ist aber GiB. Es fehlt kein Byte, nur die Einheit unterscheidet sich.',
      },
      {
        frage: 'Was ist der Unterschied zwischen GB und GiB?',
        antwort: 'GB (Gigabyte) ist dezimal: 1 GB = 1.000.000.000 Byte. GiB (Gibibyte) ist binär: 1 GiB = 1.073.741.824 Byte, also rund 7,4 Prozent mehr. Festplatten werden in GB beworben, Betriebssysteme zeigen meist GiB an.',
      },
      {
        frage: 'Wie viele Byte hat ein Megabyte?',
        antwort: 'Dezimal hat 1 MB genau 1.000.000 Byte. Binär (1 MiB) sind es 1.048.576 Byte. Der Unterschied beträgt auf Mega-Ebene rund 4,9 Prozent und wächst mit jeder weiteren Präfix-Stufe.',
      },
      {
        frage: 'Was ist der Unterschied zwischen Bit und Byte?',
        antwort: 'Ein Byte besteht aus 8 Bit. Bit (kleines b) wird vor allem bei Übertragungsraten verwendet (Mbit/s), Byte (großes B) bei Dateigrößen (MB). 8 Megabit entsprechen 1 Megabyte, ein 100-Mbit-Anschluss überträgt also 12,5 MB/s.',
      },
      {
        frage: 'Wird RAM dezimal oder binär gezählt?',
        antwort: 'Arbeitsspeicher wird binär gezählt: 8 GB RAM sind tatsächlich 8 GiB (8 × 1.073.741.824 Byte), weil die Hardware binär adressiert wird. Festplatten und SSDs werden dagegen dezimal beworben.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Bit, Byte und die Einheiten-Präfixe',
        html: `<p>Die kleinste Informationseinheit ist das <strong>Bit</strong> — eine 0 oder 1. Acht Bit ergeben ein <strong>Byte</strong>, die Grundeinheit für Datenmengen. Ein Buchstabe belegt etwa ein Byte, ein Foto einige Millionen, ein Film mehrere Milliarden. Damit man nicht mit endlosen Nullen hantiert, gibt es <strong>Präfixe</strong>: Kilo, Mega, Giga, Tera, Peta.</p><p>Hier beginnt die Tücke: Es gibt <strong>zwei</strong> Präfix-Systeme. Das <strong>dezimale</strong> (SI) rechnet in Tausenderschritten — 1 Kilobyte (KB) = 1.000 Byte, 1 Megabyte (MB) = 1.000.000 Byte. Das <strong>binäre</strong> (IEC) rechnet in 1.024er-Schritten, passend zur Zweierlogik der Computer — 1 Kibibyte (KiB) = 1.024 Byte, 1 Mebibyte (MiB) = 1.048.576 Byte. Beide sind korrekt, liefern aber unterschiedliche Zahlen für dieselbe Datenmenge. Genau daraus entsteht die bekannte Verwirrung, warum eine „500-GB"-Festplatte im Computer als nur 465 „GB" erscheint. Dieser Rechner wandelt zwischen allen Einheiten beider Systeme um und zeigt zusätzlich den Rechenweg über die Basiseinheit Byte — so wird jede Datenmenge vergleichbar, egal in welcher Schreibweise sie ursprünglich angegeben war.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Dezimale Einheiten (Faktor 1.000)',
        kopf: ['Einheit', 'Symbol', 'in Byte'],
        zeilen: [
          ['Byte', 'B', '1'],
          ['Kilobyte', 'KB', '1.000'],
          ['Megabyte', 'MB', '1.000.000'],
          ['Gigabyte', 'GB', '1.000.000.000'],
          ['Terabyte', 'TB', '1.000.000.000.000'],
          ['Petabyte', 'PB', '1.000.000.000.000.000'],
        ],
        fussnote: 'Dezimale Präfixe nach dem SI-System — jede Stufe ist das 1.000-Fache der vorigen. So zählen Festplatten- und SSD-Hersteller, USB-Sticks und Internetanbieter (Mbit/s). Grundlage bleibt: 1 Byte = 8 Bit.',
      },
      {
        typ: 'tabelle',
        titel: 'Binäre Einheiten (Faktor 1.024)',
        kopf: ['Einheit', 'Symbol', 'in Byte'],
        zeilen: [
          ['Kibibyte', 'KiB', '1.024'],
          ['Mebibyte', 'MiB', '1.048.576'],
          ['Gibibyte', 'GiB', '1.073.741.824'],
          ['Tebibyte', 'TiB', '1.099.511.627.776'],
          ['Pebibyte', 'PiB', '1.125.899.906.842.624'],
        ],
        fussnote: 'Binäre Präfixe nach IEC 80000-13 — jede Stufe ist das 1.024-Fache (2¹⁰) der vorigen. So zählen Betriebssysteme den Arbeitsspeicher und häufig auch Datei- und Speichergrößen. Das eingeschobene „bi" (KiBi, MeBi, GiBi) steht für „binär". Diese Einheiten wirken ungewohnt, sind aber die einzig eindeutigen: Wer „GiB" schreibt, meint zweifelsfrei 1.073.741.824 Byte, während „GB" je nach Quelle dezimal oder binär gemeint sein kann.',
      },
      {
        typ: 'beispielrechnung',
        titel: '500-GB-Festplatte in GiB',
        schritte: [
          { label: 'Hersteller-Angabe in Byte', formel: '500 GB × 1.000.000.000', ergebnis: '500.000.000.000 Byte' },
          { label: 'In GiB umrechnen (÷ 1.073.741.824)', formel: '500.000.000.000 ÷ 1.073.741.824', ergebnis: '≈ 465,66 GiB' },
        ],
        fazit: 'Eine 500-GB-Platte hat tatsächlich 500 Milliarden Byte — so zählt der Hersteller (dezimal). Das Betriebssystem rechnet binär und teilt durch 1.073.741.824, kommt auf rund 465,66 und beschriftet das meist trotzdem als „GB", obwohl GiB gemeint ist. Es fehlt also kein einziges Byte; die Kapazität stimmt exakt, nur die Zähleinheit ist eine andere. Wer das weiß, hält die „fehlenden" 35 GB nicht mehr für einen Defekt. Gegenprobe: 465,66 wieder mit 1.073.741.824 multipliziert ergibt erneut die 500 Milliarden Byte — die Datenmenge ist in beiden Schreibweisen identisch, nur die Verpackung ist eine andere. Genau dieselbe Logik gilt für SSDs und USB-Sticks.',
      },
      {
        typ: 'text',
        titel: 'Warum Hersteller und Betriebssystem unterschiedlich zählen',
        html: `<p>Festplatten-, SSD- und USB-Hersteller geben die Kapazität <strong>dezimal</strong> an: Eine „500-GB"-Platte hat genau 500.000.000.000 Byte (500 × 1 Milliarde). Das ist mathematisch sauber — und ergibt nebenbei die größere, werbewirksamere Zahl.</p><p>Das <strong>Betriebssystem</strong> — vor allem Windows — zählt dagegen <strong>binär</strong>: Es teilt die Byte-Zahl durch 1.073.741.824 (= 2³⁰) und kommt so auf rund 465. Verwirrend ist, dass Windows das Ergebnis trotzdem mit „GB" beschriftet, obwohl es eigentlich <strong>GiB</strong> meint. Es fehlt also kein einziges Byte — die Platte ist exakt so groß wie angegeben. Nur die Einheit, in der gezählt wird, ist eine andere. Und je größer die Kapazität, desto größer die scheinbare Lücke: Bei einer „1-TB"-Platte sind es schon rund 9 Prozent, die im System zu „fehlen" scheinen, obwohl alles korrekt ist. Historisch ist das gewachsen: Lange nutzten alle dieselben Buchstaben (KB, MB, GB) für beide Bedeutungen. Erst 1998 führte die IEC die eindeutigen Bezeichnungen KiB, MiB und GiB für die binären Größen ein — durchgesetzt haben sie sich bis heute nur teilweise, weshalb die Doppeldeutigkeit bestehen bleibt.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: '1-TB-Backup: dezimal vs. binär',
        schritte: [
          { label: 'Dezimal (Hersteller)', formel: '1 TB = 1.000.000.000.000 Byte', ergebnis: '10¹² Byte' },
          { label: 'In GiB (Systemanzeige)', formel: '10¹² ÷ 1.073.741.824', ergebnis: '≈ 931,32 GiB' },
          { label: 'In TiB', formel: '10¹² ÷ 1.099.511.627.776', ergebnis: '≈ 0,909 TiB' },
        ],
        fazit: 'Ein 1-TB-Backup-Ziel (dezimal, 10¹² Byte) erscheint im binär zählenden System als rund 931 GiB oder 0,909 TiB. Das ist praxisrelevant: Eine Datei, die das System als „1 TB" anzeigt, ist binär gemeint (= 1 TiB ≈ 1,1 dezimale TB) und passt dann nicht mehr auf eine dezimal beworbene 1-TB-Platte. Wer dezimal und binär auseinanderhält, vermeidet die böse Überraschung, dass der Speicher angeblich „zu klein" ist. Praktischer Merksatz für Backups: Planen Sie immer etwas Reserve ein — eine dezimal beworbene 1-TB-Platte bietet nur rund 0,9 TiB nutzbaren Platz, und Dateisystem-Verwaltung kostet zusätzlich ein paar Prozent. Für ein echtes 1-TiB-Backup sollte das Ziel also eher 1,2 dezimale TB groß sein.',
      },
      {
        typ: 'tabelle',
        titel: 'Abweichung dezimal ↔ binär',
        kopf: ['Präfix', 'dezimal (Byte)', 'binär (Byte)', 'binär größer um'],
        zeilen: [
          ['Kilo', '1.000', '1.024', '+2,4 %'],
          ['Mega', '1.000.000', '1.048.576', '+4,9 %'],
          ['Giga', '1.000.000.000', '1.073.741.824', '+7,4 %'],
          ['Tera', '10¹² (1 Bio.)', '1.099.511.627.776', '+10,0 %'],
          ['Peta', '10¹⁵', '1.125.899.906.842.624', '+12,6 %'],
        ],
        fussnote: 'Die Abweichung wächst mit jeder Präfix-Stufe, weil sich der kleine Unterschied (1.024 statt 1.000) bei jeder Stufe erneut multipliziert. Deshalb erscheint eine dezimal beworbene „1-TB"-Platte im binär zählenden System als nur rund 931 GiB — gut 9 Prozent „weniger", obwohl kein Byte fehlt. Auf KB-Ebene ist der Unterschied mit 2,4 Prozent kaum spürbar, auf PB-Ebene sind es bereits 12,6 Prozent — die Lücke ist also kein fester Wert, sondern hängt davon ab, wie hoch das Präfix ist.',
      },
      {
        typ: 'text',
        titel: 'Wo binär gilt, wo dezimal (RAM vs. Speicher/Netz)',
        html: `<p>Welches System gilt, hängt vom Bereich ab. <strong>Binär</strong> wird beim <strong>Arbeitsspeicher (RAM)</strong> gerechnet: Ein 8-GB-Riegel ist tatsächlich 8 GiB, also 8 × 1.073.741.824 Byte. Das liegt an der Hardware — Speicher wird über Adressleitungen in Zweierpotenzen angesprochen, weshalb RAM-Größen immer 2, 4, 8, 16, 32 GiB sind und nie krumme Werte.</p><p><strong>Dezimal</strong> rechnen dagegen <strong>Festplatten, SSDs, USB-Sticks</strong> und die <strong>Netzwerk-Bandbreite</strong>: Eine 1-TB-SSD hat 10¹² Byte, ein 100-Mbit-Anschluss überträgt 100 Millionen Bit pro Sekunde. Die Betriebssysteme zeigen Speichergrößen dann je nach Hersteller unterschiedlich an — Windows rechnet binär (und beschriftet es leider als „GB"), macOS und viele Linux-Dateimanager zeigen dezimale GB. Dieselbe Datei kann deshalb auf verschiedenen Systemen mit leicht unterschiedlichen Zahlen erscheinen, ohne dass sich ihre echte Größe ändert. Für den Alltag heißt das: Beim Kauf von Speicher die dezimale Hersteller-Angabe als das nehmen, was sie ist, und bei der Frage „passt das noch drauf?" mit den binären Werten des Systems rechnen. Wer beides kennt, wird von keiner der beiden Zahlen mehr überrascht.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Bit vs. Byte (8 Mbit = 1 MB)',
        schritte: [
          { label: '1 Byte besteht aus', formel: '8 Bit', ergebnis: 'Grundbeziehung' },
          { label: '8 Megabit in Megabyte', formel: '8 Mbit ÷ 8', ergebnis: '1 MB' },
          { label: 'Beispiel: 100 Mbit/s', formel: '100 ÷ 8', ergebnis: '12,5 MB/s' },
        ],
        fazit: 'Bit (kleines b) und Byte (großes B) werden ständig verwechselt. Weil 8 Bit = 1 Byte sind, entsprechen 8 Megabit genau 1 Megabyte. Internetanbieter werben in Megabit pro Sekunde (Mbit/s), Dateigrößen und Downloads rechnen in Megabyte (MB) — der Faktor 8 trennt beide Welten. Ein 100-Mbit-Anschluss überträgt deshalb höchstens 12,5 MB/s. Wer Bit und Byte gleichsetzt, verschätzt sich um den Faktor acht. Faustregel zum Mitnehmen: Großes B steht für Byte (Dateien, Speicher), kleines b für Bit (Übertragung). Eine 200-MB-Datei über eine 50-Mbit-Leitung zu laden, dauert also nicht 4, sondern 32 Sekunden — weil 50 Mbit nur 6,25 MB/s sind.',
      },
      {
        typ: 'vergleich',
        titel: 'Dezimal vs. binär im Überblick',
        spalteA: 'Dezimal (SI: KB, MB, GB)',
        spalteB: 'Binär (IEC: KiB, MiB, GiB)',
        zeilen: [
          { kriterium: 'Faktor pro Stufe', a: '1.000 (10³)', b: '1.024 (2¹⁰)' },
          { kriterium: 'Typische Verwendung', a: 'Festplatten, SSDs, USB, Netz-Bandbreite', b: 'Arbeitsspeicher (RAM), System-Anzeige' },
          { kriterium: '1 Einheit auf Giga-Ebene', a: '1 GB = 1.000.000.000 Byte', b: '1 GiB = 1.073.741.824 Byte' },
          { kriterium: 'Vorteil', a: 'einfach zu rechnen, größere Marketing-Zahl', b: 'passt zur binären Hardware-Adressierung' },
          { kriterium: 'Norm', a: 'SI-Präfixe', b: 'IEC 80000-13' },
        ],
      },
      {
        typ: 'checkliste',
        titel: 'Datenmengen richtig einordnen',
        punkte: [
          'Steht die Größe in dezimalen Einheiten (KB/MB/GB) oder binären (KiB/MiB/GiB)?',
          'Festplatten-, SSD- und USB-Angaben sind dezimal: 1 GB = 1 Milliarde Byte (Hersteller-Marketing).',
          'Windows zeigt Speichergrößen binär an, beschriftet sie aber oft trotzdem als „GB".',
          'Bit (b) und Byte (B) nicht verwechseln: 8 Bit = 1 Byte, also 8 Mbit = 1 MB.',
          'Bei knappem Speicher binär rechnen — eine dezimale 1-TB-Platte fasst nur rund 0,9 TiB.',
          'Internet-Bandbreite in Mbit/s ist dezimal; für MB/s durch 8 teilen.',
          'Die Abweichung wächst mit der Größe: auf TB/TiB-Ebene sind es schon rund 10 Prozent.',
          'Im Zweifel alles in Byte umrechnen — das ist die eindeutige Basiseinheit.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'RAM wird binär gezählt, Festplatten meist dezimal beworben',
        text: 'Eine gute Eselsbrücke: Arbeitsspeicher (RAM) kommt immer in binären Größen — 8 GB RAM sind tatsächlich 8 GiB (8 × 1.073.741.824 Byte), weil die Hardware binär adressiert wird. Festplatten, SSDs und USB-Sticks werden dagegen dezimal beworben — eine 1-TB-SSD hat 1.000.000.000.000 Byte. Das Betriebssystem rechnet sie dann in binäre Einheiten um und zeigt rund 931 „GB" an, obwohl es GiB meint. Wer das weiß, hält die fehlenden Gigabyte nicht mehr für einen Defekt oder Betrug — es ist nur ein Einheiten-Unterschied. Internetanbieter zählen übrigens wie die Festplatten dezimal. Daher die kurze Merkregel: Was man kauft und überträgt, wird dezimal gezählt; was im Speicher steckt und das System anzeigt, eher binär. Mit dieser Unterscheidung lösen sich die meisten Datenmengen-Rätsel von selbst auf.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Werte sind exakt — nur die Anzeige unterscheidet sich je Gerät',
        text: 'An den Datenmengen selbst ändert sich nichts: Ein Byte ist ein Byte. Unterschiedlich ist nur, in welche Einheit ein Gerät die Byte-Zahl umrechnet und wie es sie beschriftet. Windows zeigt binäre Größen, beschriftet sie aber meist mit „GB" statt korrekt mit „GiB" — das sorgt für zusätzliche Verwirrung. macOS und viele Linux-Dateimanager zeigen dagegen dezimale GB. Dieselbe Datei kann also je nach System mit leicht verschiedenen Zahlen erscheinen, ohne dass sich ihre tatsächliche Größe ändert. Die Umrechnungen dieses Rechners sind exakt; welche Schreibweise ein konkretes Gerät verwendet, hängt vom Betriebssystem ab. Im Zweifel hilft der Blick auf die Byte-Zahl: Sie ist über alle Systeme hinweg identisch und damit der einzig verlässliche Vergleichsmaßstab. Erst die Umrechnung in ein Präfix — dezimal oder binär — bringt die scheinbaren Unterschiede ins Spiel.',
      },
    ],
    quellen: [
      {
        titel: 'IEC 80000-13 — binäre vs. dezimale Präfixe',
        hinweis: 'KiB/MiB (×1024) vs. KB/MB (×1000); SI-Präfixe sind dezimal, IEC-Präfixe binär.',
      },
    ],
  },
  {
    slug: 'megapixel-rechner',
    letzteAktualisierung: '2026-06-19',
    titel: 'Megapixel-Rechner',
    beschreibung: 'Megapixel aus Pixelmaßen berechnen, Druckgröße bei DPI und Seitenverhältnis bestimmen.',
    kategorie: 'Technik',
    kategorieSlug: 'technik',
    metaTitle: 'Megapixel-Rechner — Auflösung, DPI & Druckgröße',
    metaDescription: 'Megapixel aus Pixeln berechnen ✓ maximale Druckgröße bei 300 DPI ✓ Seitenverhältnis ✓ warum mehr MP nicht mehr Qualität sind ✓ mit KI-Erklärung.',
    keywords: ['megapixel rechner', 'pixel in megapixel', 'druckgröße dpi', 'auflösung berechnen', 'megapixel druckgröße', 'dpi rechner', 'seitenverhältnis', 'bildauflösung'],
    icon: '📷',
    formel: 'Megapixel = (Breite × Höhe) ÷ 1.000.000 | Druckgröße = Pixel ÷ DPI (Zoll), × 2,54 = cm',
    beispiel: '6.000 × 4.000 px = 24 MP (Seitenverhältnis 3:2). Bei 300 DPI: 6.000 ÷ 300 × 2,54 ≈ 50,8 cm breit.',
    erklaerung: `**Megapixel berechnen — Auflösung, DPI und Druckgröße**

Ein Megapixel (MP) ist eine Million Bildpunkte. Die Megapixel-Zahl eines Fotos ergibt sich aus Breite × Höhe in Pixeln, geteilt durch eine Million. Unser Rechner ermittelt aus den Pixelmaßen die Megapixel, das Seitenverhältnis und die maximale Druckgröße bei einer gewünschten Auflösung.

**Megapixel aus der Auflösung**

Ein Bild mit 6.000 × 4.000 Pixeln hat 24.000.000 Bildpunkte, also 24 MP. Die Megapixel sagen aus, wie viele Bildpunkte ein Foto enthält — und damit, wie groß man es drucken oder zuschneiden kann, ohne dass einzelne Pixel sichtbar werden.

**Megapixel sind kein Qualitätsmaß**

Eine höhere MP-Zahl bedeutet nicht automatisch ein besseres Bild. Schärfe, Farbtreue und Rauschverhalten hängen viel stärker von Sensorgröße, Objektiv und Licht ab. Ein 24-MP-Bild aus einer Kamera mit großem Sensor kann besser aussehen als ein 108-MP-Handyfoto.

**Druckgröße und DPI**

DPI (dots per inch) legt fest, wie eng die Pixel beim Druck sitzen. Druckgröße = Pixel ÷ DPI ergibt Zoll, mal 2,54 ergibt Zentimeter. Bei 300 DPI druckt ein 6.000-Pixel-Bild rund 50,8 cm breit. Für das Web ist DPI bedeutungslos — dort zählt nur die Pixelzahl.

**Seitenverhältnis**

Kameras nutzen meist 3:2 oder 4:3, Videos 16:9. Beim Zuschnitt auf ein anderes Format geht Bildfläche und damit Auflösung verloren.`,
    faq: [
      {
        frage: 'Wie berechne ich Megapixel aus der Auflösung?',
        antwort: 'Multiplizieren Sie Breite und Höhe in Pixeln und teilen Sie durch eine Million. Beispiel: 6.000 × 4.000 = 24.000.000 Pixel ÷ 1.000.000 = 24 Megapixel.',
      },
      {
        frage: 'Wie groß kann ich ein Foto drucken?',
        antwort: 'Druckgröße = Pixel ÷ DPI (in Zoll), mal 2,54 ergibt Zentimeter. Bei 300 DPI (Fotoqualität) druckt ein 6.000 × 4.000-Bild rund 50,8 × 33,9 cm — größer als A3. Für A4 reichen schon etwa 9 Megapixel.',
      },
      {
        frage: 'Bedeuten mehr Megapixel ein besseres Bild?',
        antwort: 'Nein. Megapixel sind nur die Pixelzahl. Bildqualität hängt von Sensorgröße, Objektiv, Licht und Bildverarbeitung ab. Mehr Megapixel auf einem kleinen Sensor führen oft zu mehr Rauschen bei wenig Licht.',
      },
      {
        frage: 'Was bedeutet DPI?',
        antwort: 'DPI (dots per inch) gibt an, wie viele Bildpunkte pro Zoll gedruckt werden. Je höher die DPI, desto kleiner und schärfer der Druck. 300 DPI gilt als Fotoqualität, für Poster aus Distanz reichen 150 DPI. Für die Bildschirmanzeige ist DPI irrelevant.',
      },
      {
        frage: 'Wie viele Megapixel brauche ich fürs Web?',
        antwort: 'Fürs Web zählt nur die Pixelzahl, nicht die DPI. Ein Full-HD-Bild (1.920 × 1.080) hat rund 2 MP und füllt einen großen Monitor. Für Social Media reichen meist 2 bis 4 MP; höhere Auflösungen werden ohnehin herunterskaliert.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Was Megapixel sind und was sie aussagen',
        html: `<p>Ein <strong>Megapixel</strong> (MP) ist eine Million Bildpunkte. Die Megapixel-Zahl einer Kamera oder eines Fotos ergibt sich einfach aus <strong>Breite × Höhe in Pixeln, geteilt durch eine Million</strong>. Ein Bild mit 6.000 × 4.000 Pixeln hat 24.000.000 Bildpunkte — also 24 MP.</p><p>Die Megapixel sagen damit aus, <strong>wie viele Bildpunkte</strong> ein Foto enthält — und damit, wie groß man es darstellen oder drucken kann, ohne dass einzelne Pixel sichtbar werden. Mehr Megapixel bedeuten mehr Spielraum für <strong>Ausschnitte (Crop)</strong> und große Drucke. Sie sagen aber <strong>nichts über die Bildqualität</strong> aus: Schärfe, Farbtreue und Rauschverhalten hängen viel stärker von Sensorgröße, Objektiv und Licht ab. Dieser Rechner ermittelt aus den Pixelmaßen die Megapixel, das Seitenverhältnis und die maximale Druckgröße bei einer gewünschten Auflösung (DPI). So lässt sich vor dem Kauf einer Kamera oder vor dem Druck schnell einschätzen, ob die Auflösung für den geplanten Zweck reicht — vom kleinen Web-Bild bis zum großformatigen Poster.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: '6.000 × 4.000 px in Megapixel',
        schritte: [
          { label: 'Pixel gesamt', formel: '6.000 × 4.000', ergebnis: '24.000.000 px' },
          { label: 'Durch eine Million teilen', formel: '24.000.000 ÷ 1.000.000', ergebnis: '24 MP' },
        ],
        fazit: 'Ein Bild mit 6.000 × 4.000 Pixeln besteht aus 24 Millionen Bildpunkten — das sind 24 Megapixel. Die Rechnung ist immer dieselbe: Breite mal Höhe ergibt die Gesamtzahl der Pixel, geteilt durch eine Million ergibt die Megapixel. Eine typische Spiegelreflex- oder Systemkamera liefert 24 MP, moderne Handys oft 12 oder 48 MP (durch Pixel-Binning meist effektiv 12). Diese 24 MP reichen für scharfe Drucke deutlich über A3 hinaus.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Megapixel zurück in eine Auflösung (12 MP bei 3:2)',
        schritte: [
          { label: '12 MP in Pixel', formel: '12 × 1.000.000', ergebnis: '12.000.000 px' },
          { label: 'Bei 3:2: Höhe = √(Pixel ÷ 1,5)', formel: '√(12.000.000 ÷ 1,5)', ergebnis: '≈ 2.828 px' },
          { label: 'Breite = Höhe × 1,5', formel: '2.828 × 1,5', ergebnis: '≈ 4.243 px' },
        ],
        fazit: 'Will man aus einer Megapixel-Zahl auf die Pixelmaße schließen, braucht man das Seitenverhältnis. Bei 12 MP im Format 3:2 ergeben sich rund 4.243 × 2.828 Pixel — keine glatte Zahl, was völlig normal ist. Kameras runden auf saubere Werte wie 4.240 × 2.832. Im Format 4:3 käme dieselbe Megapixel-Zahl auf die runden 4.000 × 3.000 Pixel. Die Megapixel allein legen die Auflösung also nicht eindeutig fest — erst zusammen mit dem Seitenverhältnis. Deshalb können zwei Kameras mit identischer „12 MP"-Angabe unterschiedliche Pixelmaße liefern, je nachdem, ob sie im 3:2- oder 4:3-Format aufnehmen.',
      },
      {
        typ: 'tabelle',
        titel: 'Gängige Auflösungen und ihre Megapixel',
        kopf: ['Bezeichnung', 'Pixel', 'Megapixel'],
        zeilen: [
          ['HD (720p)', '1.280 × 720', '0,9 MP'],
          ['Full HD (1080p)', '1.920 × 1.080', '2,1 MP'],
          ['4K UHD', '3.840 × 2.160', '8,3 MP'],
          ['8K UHD', '7.680 × 4.320', '33,2 MP'],
          ['12-MP-Kamera (4:3)', '4.000 × 3.000', '12,0 MP'],
          ['24-MP-Kamera (3:2)', '6.000 × 4.000', '24,0 MP'],
          ['48-MP-Kamera (4:3)', '8.000 × 6.000', '48,0 MP'],
        ],
        fussnote: 'MP = Breite × Höhe ÷ 1.000.000. Bildschirm-Auflösungen (HD/4K/8K) sind oft kleiner als Kamera-Auflösungen: Ein 4K-Monitor zeigt nur 8,3 MP, ein 24-MP-Foto wird zum Anzeigen also heruntergerechnet. Erst beim Druck oder beim Zuschnitt zahlen sich die zusätzlichen Pixel aus.',
      },
      {
        typ: 'text',
        titel: 'Megapixel ≠ Bildqualität (Sensor, Optik, Pixelgröße)',
        html: `<p>Eine höhere Megapixel-Zahl wirkt nach „besser", ist aber kein Qualitätsmaß. Entscheidend ist, <strong>wie groß die einzelnen Pixel</strong> auf dem Sensor sind. Quetscht man sehr viele Pixel auf einen kleinen Handy-Sensor, wird jeder Pixel winzig und fängt weniger Licht ein — die Folge ist mehr <strong>Bildrauschen</strong> bei wenig Licht.</p><p>Ein größerer Sensor mit weniger, aber größeren Pixeln liefert deshalb oft das sauberere Bild als ein kleiner Sensor mit mehr Megapixeln. Hinzu kommt die <strong>Optik</strong>: Ein mittelmäßiges Objektiv kann die feinen Details, die der Sensor theoretisch auflösen könnte, gar nicht scharf abbilden. Auch <strong>Belichtung, Bildstabilisierung und Bildverarbeitung</strong> beeinflussen das Ergebnis stark. Megapixel bestimmen also nur, wie groß ein Bild maximal sinnvoll dargestellt werden kann — nicht, wie gut es aussieht. Für die allermeisten Zwecke reichen 12 bis 24 MP völlig aus. Der Megapixel-Wettlauf bei Smartphones ist deshalb vor allem Marketing: Ein 200-MP-Sensor fasst viele Pixel zu größeren „Superpixeln" zusammen (Pixel-Binning) und gibt am Ende oft ein 12,5-MP-Bild aus, das bei wenig Licht besser ist als die volle Auflösung.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Maximale Druckgröße bei 300 DPI',
        schritte: [
          { label: 'Breite in Zoll (Pixel ÷ DPI)', formel: '6.000 ÷ 300', ergebnis: '20 Zoll' },
          { label: 'Zoll in Zentimeter (× 2,54)', formel: '20 × 2,54', ergebnis: '50,8 cm' },
          { label: 'Höhe analog', formel: '4.000 ÷ 300 × 2,54', ergebnis: '≈ 33,9 cm' },
        ],
        fazit: 'Bei 300 DPI — der gängigen Fotoqualität fürs nahe Betrachten — druckt ein 24-MP-Foto (6.000 × 4.000 px) scharf bis rund 50,8 × 33,9 cm, also größer als A3. Die Rechnung: Pixel durch DPI ergibt die Größe in Zoll, mal 2,54 die Größe in Zentimetern. Umgekehrt heißt das auch: Für einen A4-Druck (21 × 29,7 cm) bei 300 DPI genügen schon rund 9 Megapixel. Wer nur A4 drucken will, braucht also keine 48-MP-Kamera. Als grobe Merkhilfe: A4 bei 300 DPI braucht rund 2.480 × 3.508 Pixel, A3 entsprechend das Doppelte an Fläche, also etwa 18 Megapixel. Jede Verdopplung des Druckformats verlangt doppelt so viele Pixel, um die Schärfe zu halten.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Gleiches Foto bei 72 vs. 300 DPI',
        schritte: [
          { label: 'Bei 300 DPI (Fotodruck)', formel: '6.000 ÷ 300 × 2,54', ergebnis: '50,8 cm breit' },
          { label: 'Bei 72 DPI (grob)', formel: '6.000 ÷ 72 × 2,54', ergebnis: '≈ 211,7 cm breit' },
        ],
        fazit: 'Dasselbe Bild mit 6.000 Pixeln Breite ergibt bei 300 DPI einen scharfen 50,8-cm-Druck, bei 72 DPI einen über 2 Meter breiten, aber groben Druck. Die DPI verteilen dieselbe Pixelzahl nur auf mehr oder weniger Fläche — je niedriger die DPI, desto größer und unschärfer. Fürs Web ist das alles irrelevant: Ein Monitor zeigt schlicht so viele Pixel, wie das Bild hat. Ein „72-DPI"- und ein „300-DPI"-Bild mit gleicher Pixelzahl sehen am Bildschirm identisch aus.',
      },
      {
        typ: 'tabelle',
        titel: 'DPI-Empfehlungen je Nutzung',
        kopf: ['Nutzung', 'DPI/PPI', 'Hinweis'],
        zeilen: [
          ['Web & Bildschirm', '72', 'nur die Pixelzahl zählt, DPI irrelevant fürs Display'],
          ['Fotodruck (Standard)', '300', 'scharfe Drucke bis A4 und größer, nahes Betrachten'],
          ['Großformat / Poster', '150', 'aus normalem Betrachtungsabstand ausreichend'],
          ['Plakat / Banner (Ferne)', '72–100', 'wird ohnehin aus großer Distanz gesehen'],
        ],
        fussnote: 'DPI bzw. PPI bestimmt nur die Druckgröße, nicht die Bildschirmanzeige. Je höher die DPI, desto kleiner und schärfer der Druck. 300 DPI gilt als Fotoqualität fürs nahe Betrachten; bei Postern reichen weniger, weil der Betrachtungsabstand größer ist — das Auge kann die einzelnen Punkte dann nicht mehr unterscheiden. Eine Werbetafel an der Autobahn wird teils mit nur 10 bis 20 DPI gedruckt und sieht aus der Entfernung trotzdem scharf aus. Die nötige DPI hängt also weniger vom Format ab als vom Abstand, aus dem man das Bild betrachtet.',
      },
      {
        typ: 'text',
        titel: 'Seitenverhältnis & Zuschnitt (3:2, 4:3, 16:9)',
        html: `<p>Das <strong>Seitenverhältnis</strong> beschreibt das Verhältnis von Breite zu Höhe — unabhängig von der absoluten Pixelzahl. Spiegelreflex- und Systemkameras nutzen meist <strong>3:2</strong> (z. B. 6.000 × 4.000), Kompakt- und Handykameras oft <strong>4:3</strong> (z. B. 4.000 × 3.000), Videos und Monitore <strong>16:9</strong>.</p><p>Wichtig wird das beim <strong>Zuschnitt</strong>: Wer ein 3:2-Foto auf ein quadratisches Format (1:1) oder auf 4:5 für Instagram beschneidet, verliert Bildfläche — und damit Megapixel. Aus einem 24-MP-Foto im 3:2-Format wird bei einem 1:1-Zuschnitt nur noch ein Teil genutzt. Auch <strong>Standard-Druckformate</strong> passen selten exakt: 10 × 15 cm entspricht 3:2 und passt zu Kamerafotos, 13 × 18 cm dagegen nicht ganz, sodass ein schmaler Rand abgeschnitten wird. Wer den späteren Beschnitt schon bei der Aufnahme bedenkt, lässt rundherum etwas Luft und behält die volle Auflösung im gewünschten Ausschnitt. Praktisch heißt das: Lieber etwas weiter aufnehmen und später gezielt zuschneiden, als zu knapp zu fotografieren. Genau hier zahlt sich eine höhere Megapixel-Zahl aus — sie gibt Spielraum, ohne dass der Ausschnitt am Ende zu klein für den geplanten Druck wird.</p>`,
      },
      {
        typ: 'vergleich',
        titel: 'Mehr Megapixel vs. größerer Sensor',
        spalteA: 'Mehr Megapixel',
        spalteB: 'Größerer Sensor',
        zeilen: [
          { kriterium: 'Detailauflösung', a: 'mehr Details, größere Crops und Drucke', b: 'durch die Pixelzahl begrenzt' },
          { kriterium: 'Verhalten bei wenig Licht', a: 'kleinere Pixel → mehr Rauschen', b: 'größere Pixel → weniger Rauschen' },
          { kriterium: 'Dateigröße', a: 'größere Dateien, mehr Speicherbedarf', b: 'moderater bei gleicher MP-Zahl' },
          { kriterium: 'Profitiert von', a: 'gutem Licht und scharfem Objektiv', b: 'nahezu allen Aufnahmesituationen' },
          { kriterium: 'Typisch für', a: 'High-Res-Kameras, Smartphones', b: 'Vollformat- und APS-C-Kameras' },
        ],
      },
      {
        typ: 'checkliste',
        titel: 'Die Auflösung für den Zweck wählen',
        punkte: [
          'Nur fürs Web oder Social Media? Pixelzahl zählt, DPI ist egal — oft reichen 2–4 MP.',
          'A4-Fotodruck bei 300 DPI? Rund 9 MP genügen (2.480 × 3.508 px).',
          'Große Poster aus der Nähe? Hohe MP-Zahl hilft; aus Distanz reichen 150 DPI.',
          'Planen Sie Ausschnitte (Crop)? Mehr Megapixel geben Reserve.',
          'Bei wenig Licht zählt der Sensor mehr als die reine Megapixel-Zahl.',
          'Seitenverhältnis zum Zielformat passen, sonst geht beim Zuschnitt Fläche verloren.',
          'Für Druck die DPI auf 300 setzen; mehr bringt fürs Auge meist nichts.',
          'Im Zweifel die native Pixelzahl behalten und erst fürs Ziel herunterskalieren.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Fürs Web reichen 72 DPI, für Druck 300 DPI anpeilen',
        text: 'Für die Anzeige auf Bildschirmen ist die DPI-Angabe bedeutungslos — ein Monitor zeigt schlicht so viele Pixel, wie das Bild hat. Ein 72-DPI-Bild und ein 300-DPI-Bild mit derselben Pixelzahl sehen am Bildschirm identisch aus. Erst beim Druck wird DPI wichtig: Sie legt fest, wie eng die Pixel auf dem Papier sitzen. 300 DPI gilt als Fotoqualität fürs nahe Betrachten; für Poster, die man aus Abstand ansieht, reichen 150 DPI oder weniger. Faustregel: fürs Web nur auf die Pixelzahl achten, für den Druck 300 DPI als Ziel nehmen und prüfen, wie groß das Bild dann noch wird.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'MP-Werte sind die Pixelzahl, kein Qualitätsmaß',
        text: 'Eine hohe Megapixel-Zahl bedeutet nur, dass ein Bild aus vielen Bildpunkten besteht — nicht, dass es scharf, farbtreu oder rauscharm ist. Ein 108-MP-Handyfoto kann schlechter aussehen als ein 24-MP-Bild aus einer Kamera mit größerem Sensor und besserem Objektiv. Megapixel bestimmen die maximale sinnvolle Darstellungs- und Druckgröße, mehr nicht. Wer ein Foto nur auf dem Smartphone oder im Web ansieht, sieht von 12, 24 oder 48 MP praktisch keinen Unterschied, weil das Bild ohnehin auf die Bildschirmauflösung heruntergerechnet wird. Mehr Megapixel lohnen sich vor allem für große Drucke und für nachträgliche Ausschnitte.',
      },
    ],
    quellen: [
      {
        titel: 'Bildauflösung, Megapixel & DPI — Grundlagen',
        hinweis: 'MP = Breite×Höhe/1.000.000; Druckgröße = Pixel/DPI; 1 Zoll = 2,54 cm.',
      },
    ],
  },
  {
    slug: 'stromverbrauch-geraete-rechner',
    letzteAktualisierung: '2026-06-19',
    titel: 'Stromverbrauch-Rechner für Geräte',
    beschreibung: 'Stromverbrauch und -kosten einzelner Geräte berechnen: Watt × Nutzungszeit, Standby und Gerätevergleich.',
    kategorie: 'Technik',
    kategorieSlug: 'technik',
    metaTitle: 'Stromverbrauch-Rechner — Geräte & Standby',
    metaDescription: 'Stromverbrauch einzelner Geräte berechnen: Watt × Stunden = kWh, Kosten pro Jahr ✓ Standby ✓ Gerätevergleich ✓ Strompreis frei wählbar.',
    keywords: ['stromverbrauch rechner', 'geräte stromverbrauch', 'watt in kwh', 'stromkosten gerät', 'standby verbrauch', 'kwh berechnen', 'stromfresser', 'stromverbrauch berechnen'],
    icon: '⚡',
    formel: 'kWh = Watt × Stunden ÷ 1.000 | Kosten = kWh × Strompreis (€/kWh)',
    beispiel: 'PC 200 W, 5 h/Tag: 200 × 5 ÷ 1.000 = 1 kWh/Tag → 365 kWh/Jahr × 0,35 € ≈ 128 €/Jahr.',
    erklaerung: `**Stromverbrauch eines Geräts berechnen**

Der Stromverbrauch eines Geräts ergibt sich aus seiner Leistung in Watt und der Nutzungsdauer. Multipliziert man beides und teilt durch 1.000, erhält man den Verbrauch in Kilowattstunden (kWh) — der Einheit, nach der Strom abgerechnet wird.

**Die Formel**

kWh = Watt × Stunden ÷ 1.000. Ein Gerät mit 200 Watt, das 5 Stunden täglich läuft, verbraucht 200 × 5 ÷ 1.000 = 1 kWh pro Tag, also rund 365 kWh im Jahr. Die Kosten ergeben sich aus kWh × Strompreis: bei 0,35 €/kWh sind das etwa 128 Euro pro Jahr.

**Wo steht die Leistung?**

Die Leistungsaufnahme in Watt steht auf dem Typenschild des Geräts oder im Datenblatt. Manche Geräte verbrauchen je nach Betriebszustand unterschiedlich viel — ein Kühlschrank zieht nur Strom, während der Verdichter läuft.

**Standby nicht vergessen**

Viele Geräte verbrauchen auch im Standby Strom. Über das ganze Jahr summieren sich ein paar Watt Dauerlast zu mehreren Hundert Kilowattstunden. Eine schaltbare Steckdosenleiste trennt die Geräte vollständig vom Netz.

**Strompreis als Eingabe**

Der tatsächliche Strompreis steht auf Ihrer Abrechnung. Tragen Sie ihn ein, um realistische Kosten zu erhalten. Alle Werte sind Orientierung; für genaue Messungen hilft eine Messsteckdose.`,
    faq: [
      {
        frage: 'Wie berechne ich den Stromverbrauch eines Geräts?',
        antwort: 'kWh = Watt × Stunden ÷ 1.000. Ein 200-Watt-Gerät über 5 Stunden verbraucht 1 kWh. Mal 365 ergibt den Jahresverbrauch, mal dem Strompreis die Kosten. Die Leistung in Watt steht auf dem Typenschild.',
      },
      {
        frage: 'Wie viel kostet 1 kWh Strom?',
        antwort: 'Der Strompreis liegt 2026 im Schnitt bei rund 35 Cent pro Kilowattstunde, variiert aber je nach Tarif und Region. Ihren genauen Preis finden Sie auf der letzten Stromabrechnung — tragen Sie ihn für realistische Kosten in den Rechner ein.',
      },
      {
        frage: 'Wie viel kostet Standby im Jahr?',
        antwort: 'Im Standby ziehen Geräte oft 3 bis 15 Watt dauerhaft. In einem Haushalt summieren sich 30 bis 50 Watt Dauerlast — über das Jahr mehrere Hundert kWh und schnell über 100 Euro, nur für scheinbar ausgeschaltete Geräte.',
      },
      {
        frage: 'Welche Geräte verbrauchen am meisten Strom?',
        antwort: 'Dauerläufer wie Kühl- und Gefriergeräte sowie Heizungspumpen, dazu Geräte mit hoher Heizleistung wie Wäschetrockner, Waschmaschine, Backofen und Wasserkocher. Bei Dauerläufern lohnt sich Effizienz besonders, weil sie das ganze Jahr laufen.',
      },
      {
        frage: 'Lohnt sich der Austausch eines alten Geräts?',
        antwort: 'Bei Dauerläufern oft ja. Ein alter Kühlschrank kann das Drei- bis Vierfache eines neuen, effizienten Geräts verbrauchen. Über 10 bis 15 Jahre Lebensdauer übersteigt die Stromersparnis dann häufig den Neupreis.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Stromverbrauch eines Geräts berechnen (Watt × Zeit)',
        html: `<p>Der Stromverbrauch eines Geräts ergibt sich aus zwei Größen: seiner <strong>Leistung in Watt (W)</strong> und der <strong>Nutzungsdauer</strong>. Multipliziert man beides und teilt durch 1.000, erhält man den Verbrauch in <strong>Kilowattstunden (kWh)</strong> — der Einheit, nach der Strom abgerechnet wird. Die Formel lautet: <strong>kWh = Watt × Stunden ÷ 1.000</strong>.</p><p>Ein Gerät mit 200 Watt, das 5 Stunden am Tag läuft, verbraucht also 200 × 5 ÷ 1.000 = 1 kWh pro Tag, über das Jahr rund 365 kWh. Die <strong>Kosten</strong> ergeben sich, indem man die kWh mit dem <strong>Strompreis</strong> multipliziert — bei rund 35 Cent pro kWh sind das etwa 128 Euro im Jahr. Die Leistung steht auf dem <strong>Typenschild</strong> des Geräts oder im Datenblatt. Anders als ein Haushalts-Stromrechner betrachtet dieser Rechner gezielt <strong>einzelne Geräte</strong> — ideal, um Stromfresser aufzuspüren und gegeneinander zu vergleichen. Wer den Gesamtverbrauch des Haushalts wissen will, addiert die Einzelwerte oder nutzt den Stromkosten-Rechner; wer den Beitrag eines bestimmten Geräts kennen möchte, ist hier richtig.</p>`,
      },
      {
        typ: 'statistik',
        titel: 'Typische Leistung gängiger Geräte',
        werte: [
          { label: 'Kühl-Gefrier-Kombi', wert: '~100 W', hinweis: 'läuft im Takt; je nach Effizienz rund 150–300 kWh im Jahr' },
          { label: 'Fernseher (LED, 55 Zoll)', wert: '~90 W', hinweis: 'im Betrieb; ältere Plasma-Geräte ziehen deutlich mehr' },
          { label: 'Desktop-PC', wert: '100–300 W', hinweis: 'Gaming-PCs unter Volllast bis 500 W' },
          { label: 'Waschmaschine', wert: '~2.000 W', hinweis: 'nur während des Heizens; pro Waschgang rund 0,7–1,5 kWh' },
          { label: 'Wasserkocher', wert: '~2.000 W', hinweis: 'hohe Leistung, aber nur wenige Minuten in Betrieb' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: 'PC mit 200 W, 5 h/Tag, 0,35 €/kWh',
        schritte: [
          { label: 'Verbrauch pro Tag', formel: '200 W × 5 h ÷ 1.000', ergebnis: '1 kWh' },
          { label: 'Verbrauch pro Jahr', formel: '1 kWh × 365', ergebnis: '365 kWh' },
          { label: 'Kosten pro Jahr', formel: '365 kWh × 0,35 €', ergebnis: '127,75 €' },
        ],
        fazit: 'Ein PC mit 200 Watt, der täglich 5 Stunden läuft, verbraucht 365 kWh im Jahr und kostet bei 0,35 €/kWh rund 128 Euro — etwa 10,65 Euro im Monat. Wer den Rechner nur halb so lange nutzt, halbiert auch die Kosten. Die Rechnung ist immer dieselbe: Watt mal Stunden geteilt durch 1.000 ergibt die kWh, mal dem Strompreis die Kosten. So lässt sich für jedes Gerät der Jahresbeitrag zur Stromrechnung abschätzen. Eine Plausibilitätskontrolle: 1 kWh am Tag entspricht 365 kWh im Jahr — bei 0,35 €/kWh also rund 128 Euro. Wer diese Bezugsgröße im Kopf hat, ordnet jeden Verbraucher schnell ein: Ein Gerät, das täglich 1 kWh zieht, kostet ungefähr so viel wie ein Wochenend-Tankstopp im Monat.',
      },
      {
        typ: 'text',
        titel: 'Standby frisst unbemerkt Strom',
        html: `<p>Viele Geräte verbrauchen Strom, obwohl sie scheinbar <strong>ausgeschaltet</strong> sind. Im <strong>Standby</strong> halten sie Empfangsbereitschaft, Uhrzeit oder die Fernbedienungs-Funktion aufrecht — und ziehen dafür dauerhaft ein paar Watt. Einzeln wirkt das harmlos, doch weil diese Last <strong>rund um die Uhr</strong> anliegt, summiert sie sich über das Jahr beträchtlich.</p><p>Ein Fernseher mit Receiver, eine Spielkonsole, der PC mit Monitor, die Stereoanlage, das Mikrowellen-Display: Zusammen kommen in einem Haushalt schnell <strong>30 bis 50 Watt</strong> Dauerlast zusammen. Über ein Jahr (8.760 Stunden) sind das mehrere Hundert Kilowattstunden — oft <strong>100 Euro und mehr</strong>, nur für den Ruhezustand. Die einfachste Abhilfe ist eine <strong>schaltbare Steckdosenleiste</strong>: Ein Klick trennt alle angeschlossenen Geräte vollständig vom Netz. Geräte, die ständig erreichbar sein müssen — etwa der WLAN-Router —, bleiben ausgenommen, alle anderen lassen sich bedenkenlos ganz abschalten. Seit der EU-Ökodesign-Richtlinie dürfen neue Geräte im Standby nur noch sehr wenig verbrauchen, oft unter 0,5 Watt. Bei älteren Geräten lohnt der Blick aber weiterhin, denn dort liegen die Standby-Werte teils zehnmal so hoch.</p>`,
      },
      {
        typ: 'statistik',
        titel: 'Standby-Verbrauch typischer Geräte',
        werte: [
          { label: 'TV + Receiver (Standby)', wert: '~3–10 W', hinweis: 'rund 9–30 € im Jahr, nur im Ruhemodus' },
          { label: 'PC mit Peripherie (Standby)', wert: '~5–15 W', hinweis: 'das Netzteil zieht auch im ausgeschalteten Zustand Strom' },
          { label: 'WLAN-Router (Dauerbetrieb)', wert: '~10 W', hinweis: '24/7 an: rund 88 kWh und etwa 31 € im Jahr' },
          { label: 'Ladegeräte ohne Gerät', wert: '~0,1–1 W', hinweis: 'einzeln wenig, in Summe über viele Stecker spürbar' },
          { label: 'Haushalt gesamt (Standby)', wert: '~300–400 kWh/Jahr', hinweis: 'oft über 100 € im Jahr nur für „aus"-Geräte' },
        ],
      },
      {
        typ: 'beispielrechnung',
        titel: 'Standby-Kosten im Haushalt (mehrere Geräte)',
        schritte: [
          { label: 'Dauer-Standby-Leistung addieren', formel: 'TV 8 + PC 10 + Router 10 + Sonstiges 12', ergebnis: '40 W' },
          { label: 'Verbrauch pro Jahr (× 8.760 h)', formel: '40 W × 8.760 ÷ 1.000', ergebnis: '≈ 350 kWh' },
          { label: 'Kosten pro Jahr', formel: '350 kWh × 0,35 €', ergebnis: '≈ 123 €' },
        ],
        fazit: 'Rechnet man die ständige Standby-Last eines Haushalts zusammen — Fernseher, PC, Router und diverse Kleingeräte — kommen leicht 40 Watt Dauerlast zustande. Weil diese rund um die Uhr anliegen, ergeben sich über das Jahr etwa 350 kWh und damit rund 123 Euro, nur für Geräte, die scheinbar aus sind. Eine schaltbare Steckdosenleiste eliminiert den größten Teil davon. Der Router muss meist anbleiben, aber Fernseher, Konsole, PC und Audio lassen sich nachts und tagsüber komplett trennen. Praktisch sind Steckdosenleisten mit Fußschalter oder Funksteckdosen, die mehrere Geräte auf einen Griff vom Netz nehmen. Schon das spart in vielen Haushalten den größten Teil der hier gerechneten 123 Euro — Geld, das ohne jeden Komfortverlust eingespart wird.',
      },
      {
        typ: 'tabelle',
        titel: 'Gerätevergleich: Verbrauch und Jahreskosten',
        kopf: ['Gerät', 'Watt', 'h/Tag', 'kWh/Jahr', '€/Jahr (0,35 €)'],
        zeilen: [
          ['Kühl-Gefrier-Kombi', '100', '6*', '219', '77 €'],
          ['Fernseher (LED)', '90', '4', '131', '46 €'],
          ['Desktop-PC', '150', '5', '274', '96 €'],
          ['WLAN-Router', '10', '24', '88', '31 €'],
          ['Waschmaschine', '2.000', '0,3*', '219', '77 €'],
          ['Wäschetrockner', '2.500', '0,4*', '365', '128 €'],
          ['LED-Lampe', '10', '5', '18', '6 €'],
        ],
        fussnote: 'Beispielwerte bei 0,35 €/kWh; die tatsächlichen Stunden variieren stark. *Bei Kühlschrank und Waschmaschine/Trockner ist die Stundenangabe die effektive Laufzeit (Verdichter-Takt bzw. Heizphase), nicht die Anschlusszeit. Die genaue Leistung steht auf dem Typenschild des Geräts. Auffällig ist, dass die Geräte mit der höchsten Watt-Zahl (Trockner, Waschmaschine) nicht zwingend die höchsten Jahreskosten haben — entscheidend ist immer das Produkt aus Leistung und Laufzeit. Der dauerlaufende Router mit nur 10 Watt kommt auf ähnliche Jahreswerte wie kurz, aber kräftig heizende Geräte.',
      },
      {
        typ: 'text',
        titel: 'Energieeffizienzklassen & Sparpotenzial',
        html: `<p>Seit 2021 gilt in der EU ein neues <strong>Energielabel</strong> mit den Klassen <strong>A bis G</strong>. Die früheren Plus-Klassen (A+++, A++) sind entfallen, die Skala wurde verschärft — viele Geräte, die früher A+++ waren, liegen heute bei C oder D. Das Label zeigt neben der Klasse den <strong>Verbrauch in kWh pro Jahr</strong> unter genormten Bedingungen, was Geräte direkt vergleichbar macht.</p><p>Das größte Sparpotenzial steckt bei <strong>Dauerläufern</strong>: Kühlschrank, Gefriertruhe und Heizungspumpe laufen das ganze Jahr, weshalb sich dort schon kleine Effizienzunterschiede stark auswirken. Ein alter Kühlschrank kann das <strong>Drei- bis Vierfache</strong> eines neuen, effizienten Geräts verbrauchen. Über die lange Lebensdauer von 10 bis 15 Jahren übersteigt die Stromersparnis dann oft den Anschaffungspreis. Bei selten genutzten Geräten wie dem Wasserkocher lohnt ein Austausch allein wegen der Effizienz dagegen kaum — hier zählt eher die richtige Nutzung, etwa nur so viel Wasser zu kochen wie nötig. Faustregel fürs Sparen: zuerst die Dauerläufer optimieren, dann die heizenden Großgeräte (Trockner, Backofen) bewusster einsetzen und zuletzt die vielen kleinen Standby-Verbraucher abschalten.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Alter vs. neuer Kühlschrank — die Ersparnis',
        schritte: [
          { label: 'Alter Kühlschrank', formel: '~330 kWh/Jahr × 0,35 €', ergebnis: '≈ 116 €/Jahr' },
          { label: 'Neues, effizientes Gerät', formel: '~100 kWh/Jahr × 0,35 €', ergebnis: '≈ 35 €/Jahr' },
          { label: 'Ersparnis pro Jahr', formel: '116 € − 35 €', ergebnis: '≈ 81 €' },
        ],
        fazit: 'Ein alter Kühlschrank mit rund 330 kWh im Jahr gegen ein modernes, effizientes Gerät mit etwa 100 kWh getauscht, spart rund 230 kWh oder 81 Euro pro Jahr. Über die typische Lebensdauer von 15 Jahren sind das rund 1.200 Euro — oft mehr, als ein neues Gerät kostet. Weil Kühl- und Gefriergeräte rund um die Uhr laufen, lohnt sich Effizienz hier am stärksten. Bei einem alten, ständig brummenden Gerät kann sich der Neukauf allein über die Stromrechnung rechnen. Zur Einordnung lohnt eine einfache Amortisationsrechnung: Kostet ein neues Gerät 500 Euro und spart 80 Euro im Jahr, ist es nach gut sechs Jahren bezahlt — und alle weiteren Jahre bis zum Lebensende sind reiner Gewinn. Genau diese Rechnung kippt bei alten Kühl- und Gefriergeräten oft zugunsten des Austauschs.',
      },
      {
        typ: 'statistik',
        titel: 'Größte Stromverbraucher im Haushalt (Anteile)',
        werte: [
          { label: 'Kühlen & Gefrieren', wert: '~11–17 %', hinweis: 'läuft das ganze Jahr durch' },
          { label: 'Waschen, Trocknen, Spülen', wert: '~12–20 %', hinweis: 'vor allem das Aufheizen von Wasser' },
          { label: 'Unterhaltung & Büro (TV/PC)', wert: '~10–28 %', hinweis: 'inklusive des Standby-Anteils' },
          { label: 'Kochen & Backen', wert: '~9–14 %', hinweis: 'Herd, Backofen, Wasserkocher' },
          { label: 'Beleuchtung', wert: '~8–10 %', hinweis: 'mit LED-Lampen deutlich gesunken' },
        ],
      },
      {
        typ: 'checkliste',
        titel: 'Stromfresser identifizieren',
        punkte: [
          'Leistung (Watt) auf dem Typenschild oder im Datenblatt ablesen.',
          'Tägliche Nutzungsdauer realistisch schätzen — im Zweifel etwas großzügig.',
          'Dauerläufer zuerst prüfen: Kühlschrank, Gefriertruhe, Router, Aquarium-Pumpe.',
          'Standby-Geräte aufspüren: Was leuchtet oder ist warm, obwohl es „aus" ist?',
          'Eine Messsteckdose nutzen, um den echten Verbrauch über mehrere Tage zu messen.',
          'Alte Dauerläufer auf Ersatz prüfen — die Ersparnis kann den Neukauf tragen.',
          'Schaltbare Steckdosenleisten für die TV-, PC- und Audio-Ecke einsetzen.',
          'Den eigenen Strompreis (€/kWh) aus der letzten Abrechnung in die Rechnung einsetzen.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Eine Messsteckdose deckt heimliche Verbraucher auf',
        text: 'Wer wissen will, was ein Gerät wirklich verbraucht, steckt ein Energiekosten-Messgerät (Messsteckdose) zwischen Steckdose und Gerät. Es zeigt die aktuelle Leistung in Watt und summiert den Verbrauch über Stunden oder Tage in kWh — gerade bei Geräten mit schwankender Last wie Kühlschrank, PC oder Waschmaschine viel genauer als jede Schätzung. So entlarvt man auch heimliche Standby-Verbraucher und vergessene Dauerläufer. Solche Messgeräte kosten nur wenige Euro und werden von vielen Verbraucherzentralen sogar kostenlos verliehen. Eine Woche Messung pro Gerät genügt meist, um die größten Stromfresser im Haushalt sicher zu finden.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'Strompreis als Eingabe — die Werte sind Orientierung',
        text: 'Die Kostenangaben dieses Rechners hängen direkt vom Strompreis ab, den Sie eingeben. Als Voreinstellung dienen rund 35 Cent pro Kilowattstunde — Ihr tatsächlicher Preis steht auf der letzten Stromabrechnung und kann je nach Tarif und Region spürbar abweichen. Setzen Sie diesen Wert ein, um realistische Zahlen zu erhalten. Auch die Geräteleistung und die Nutzungsdauer sind Schätzwerte: Viele Geräte verbrauchen je nach Betriebszustand sehr unterschiedlich, ein Kühlschrank etwa nur, während der Verdichter läuft. Für eine genaue Messung hilft eine Messsteckdose. Die genannten Verbrauchswerte sind typische Richtwerte und kein Ersatz für die Angaben auf dem Typenschild. Auch der Strompreis ändert sich über die Jahre — eine Rechnung von heute kann morgen schon anders ausfallen. Für langfristige Vergleiche lohnt es sich daher, eher den kWh-Verbrauch als die Euro-Kosten im Blick zu behalten.',
      },
    ],
    quellen: [
      {
        titel: 'Stromverbrauch berechnen — Methodik',
        hinweis: 'kWh = Watt × Stunden / 1000; Kosten = kWh × Strompreis. Die Geräteleistung steht auf dem Typenschild.',
      },
      {
        titel: 'BMWK / co2online — Stromspar-Infos',
        url: 'https://www.bmwk.de',
        hinweis: 'Effizienz & Verbrauch',
      },
    ],
  },
  {
    slug: 'bildschirmgroesse-ppi-rechner',
    letzteAktualisierung: '2026-06-19',
    titel: 'Bildschirmgröße- & PPI-Rechner',
    beschreibung: 'Bildschirmdiagonale in cm, Pixeldichte (PPI) und physische Maße aus Zoll und Auflösung berechnen.',
    kategorie: 'Technik',
    kategorieSlug: 'technik',
    metaTitle: 'PPI-Rechner — Bildschirmgröße in cm & Pixeldichte',
    metaDescription: 'Bildschirmdiagonale in cm, Pixeldichte (PPI) und Breite × Höhe aus Zoll und Auflösung berechnen ✓ Phone, Laptop, Monitor, TV ✓ mit KI-Erklärung.',
    keywords: ['ppi rechner', 'bildschirmdiagonale cm', 'zoll in cm bildschirm', 'pixeldichte berechnen', 'monitor größe', 'bildschirmgröße rechner', 'dpi monitor', 'display ppi'],
    icon: '🖥️',
    formel: 'Diagonale cm = Zoll × 2,54 | PPI = √(Breite² + Höhe² in px) ÷ Diagonale in Zoll',
    beispiel: '27 Zoll = 68,58 cm. 27" 4K (3.840 × 2.160): √(3.840² + 2.160²) ÷ 27 ≈ 163 PPI. Fläche ≈ 59,8 × 33,6 cm.',
    erklaerung: `**Bildschirmgröße und Pixeldichte berechnen**

Bildschirme werden in Zoll gemessen — und zwar immer die Diagonale. Ein Zoll sind exakt 2,54 cm, ein 27-Zoll-Monitor hat also 27 × 2,54 = 68,58 cm Diagonale. Unser Rechner ermittelt aus Diagonale und Auflösung die Pixeldichte (PPI), die physischen Maße und das Seitenverhältnis.

**Zoll in Zentimeter**

Diagonale in cm = Zoll × 2,54. Aus der Diagonale und dem Seitenverhältnis ergeben sich über den Satz des Pythagoras auch Breite und Höhe in Zentimetern — praktisch, um zu prüfen, ob ein Gerät auf den Schreibtisch oder an die Wand passt.

**Was ist PPI?**

PPI (pixels per inch) ist die Pixeldichte: wie viele Bildpunkte auf einem Zoll liegen. Berechnet wird sie als PPI = √(Breite² + Höhe² in Pixeln) ÷ Diagonale in Zoll. Der Wurzelterm ist die Bildschirmdiagonale in Pixeln (Pythagoras). Ein 27-Zoll-4K-Monitor kommt so auf rund 163 PPI.

**Pixeldichte und Betrachtungsabstand**

Ob man einzelne Pixel sieht, hängt von PPI und Abstand ab. Smartphones (nah, ~400+ PPI), Monitore (~110 PPI) und Fernseher (~80 PPI) wirken aus ihrem typischen Abstand alle scharf. Die PPI ist ein Schärfe-Baustein, kein Gesamtqualitätsmaß.`,
    faq: [
      {
        frage: 'Wie viel cm sind 27 Zoll Bildschirm?',
        antwort: '27 Zoll entsprechen 27 × 2,54 = 68,58 cm. Gemeint ist immer die Bildschirmdiagonale, nicht Breite oder Höhe. Bei 16:9 ist ein 27-Zoll-Display rund 59,8 cm breit und 33,6 cm hoch.',
      },
      {
        frage: 'Wie berechne ich die PPI eines Bildschirms?',
        antwort: 'PPI = √(Breite² + Höhe² in Pixeln) ÷ Diagonale in Zoll. Beispiel 27 Zoll, 3.840 × 2.160: √(3.840² + 2.160²) = 4.406 Pixel ÷ 27 = rund 163 PPI. Der Wurzelterm ist die Bildschirmdiagonale in Pixeln (Pythagoras).',
      },
      {
        frage: 'Was bedeutet PPI?',
        antwort: 'PPI (pixels per inch) ist die Pixeldichte — wie viele Bildpunkte auf einem Zoll liegen. Je höher die PPI, desto feiner das Bild. Ob man einzelne Pixel sieht, hängt zusätzlich vom Betrachtungsabstand ab.',
      },
      {
        frage: 'Warum sieht ein großer Monitor mit Full HD körnig aus?',
        antwort: 'Weil dieselbe Auflösung über eine größere Fläche verteilt wird, sinkt die Pixeldichte. Full HD ergibt auf 24 Zoll rund 92 PPI, auf 32 Zoll nur rund 69 PPI — die Pixel werden größer und sichtbarer. Für große Monitore empfiehlt sich 1440p oder 4K.',
      },
      {
        frage: 'Wie viele PPI braucht ein Bildschirm?',
        antwort: 'Das hängt vom Abstand ab. Smartphones (rund 30 cm) brauchen über 300 PPI, Monitore (50–70 cm) rund 110 PPI, Fernseher (mehrere Meter) genügen 40–80 PPI. Je näher das Display, desto höher muss die Pixeldichte sein.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Zoll, Zentimeter & Pixeldichte beim Display',
        html: `<p>Bildschirme werden in <strong>Zoll</strong> (englisch inch) gemessen — und zwar immer die <strong>Diagonale</strong>, nicht Breite oder Höhe. Ein Zoll sind exakt <strong>2,54 cm</strong>, ein 27-Zoll-Monitor hat also eine Bildschirmdiagonale von 27 × 2,54 = 68,58 cm. Aus der Diagonale und dem Seitenverhältnis lassen sich Breite und Höhe in Zentimetern berechnen.</p><p>Die zweite wichtige Größe ist die <strong>Pixeldichte</strong>, gemessen in <strong>PPI</strong> (pixels per inch). Sie sagt, wie viele Bildpunkte auf einem Zoll Bildschirm liegen — und damit, wie fein das Bild ist. Berechnet wird sie aus der Auflösung und der Diagonale: <strong>PPI = √(Breite² + Höhe² in Pixeln) ÷ Diagonale in Zoll</strong>. Der Wurzelterm ist dabei nichts anderes als die <strong>Bildschirmdiagonale in Pixeln</strong> (Satz des Pythagoras). Dieser Rechner ermittelt aus Diagonale und Auflösung die Pixeldichte, die physischen Maße und das Seitenverhältnis. So lässt sich vor dem Kauf einschätzen, ob ein Monitor scharf genug ist und ob er überhaupt auf den vorgesehenen Platz passt — zwei Fragen, die die nackte Zoll-Angabe für sich genommen offenlässt.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: '27 Zoll in Zentimeter (Diagonale)',
        schritte: [
          { label: 'Zoll in cm umrechnen', formel: '27 Zoll × 2,54', ergebnis: '68,58 cm' },
          { label: 'Gegenrichtung (cm → Zoll)', formel: '68,58 ÷ 2,54', ergebnis: '27 Zoll' },
        ],
        fazit: 'Ein 27-Zoll-Bildschirm misst 68,58 cm — und zwar von Ecke zu Ecke, denn die Zoll-Angabe bezeichnet immer die Diagonale. Ein Zoll ist per Definition exakt 2,54 cm, die Umrechnung also eine simple Multiplikation. Wichtig beim Möbelkauf: Die Diagonale allein sagt nichts über Breite und Höhe — ein 27-Zoll-16:9-Monitor ist rund 60 cm breit, ein 27-Zoll-21:9-Gerät dagegen deutlich breiter. Erst Diagonale plus Seitenverhältnis ergeben die tatsächlichen Außenmaße. Hinzu kommt der Rahmen: Das Gehäuse ist je nach Modell ein bis mehrere Zentimeter größer als die reine Bildfläche, was beim Ausmessen einer Nische oder einer Monitorhalterung zu beachten ist. Im Zweifel lieber etwas Spielraum einplanen, als sich am Ende um wenige Millimeter zu vertun.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'PPI eines 27-Zoll-4K-Monitors',
        schritte: [
          { label: 'Diagonale in Pixeln (Pythagoras)', formel: '√(3.840² + 2.160²)', ergebnis: '≈ 4.406 px' },
          { label: 'Durch Diagonale in Zoll teilen', formel: '4.406 ÷ 27', ergebnis: '≈ 163 PPI' },
        ],
        fazit: 'Ein 27-Zoll-Monitor mit 4K-Auflösung (3.840 × 2.160) hat rund 163 PPI. Der erste Schritt ist der Satz des Pythagoras: Aus Breite und Höhe in Pixeln ergibt sich die Bildschirmdiagonale in Pixeln (rund 4.406). Geteilt durch die Diagonale in Zoll erhält man die Pixeldichte. 163 PPI sind für einen Schreibtisch-Monitor auf Armlänge sehr scharf — viele stellen die Oberfläche dann auf 125 bis 150 % Skalierung, damit Text und Symbole nicht zu klein werden.',
      },
      {
        typ: 'tabelle',
        titel: 'Gängige Displays und ihre Pixeldichte',
        kopf: ['Gerät', 'Diagonale', 'Auflösung', 'PPI'],
        zeilen: [
          ['Smartphone', '6,1"', '2.532 × 1.170', '~460'],
          ['Tablet', '11"', '2.388 × 1.668', '~265'],
          ['Laptop (FHD)', '15,6"', '1.920 × 1.080', '~141'],
          ['Laptop (4K)', '15,6"', '3.840 × 2.160', '~282'],
          ['Monitor (FHD)', '24"', '1.920 × 1.080', '~92'],
          ['Monitor (4K)', '27"', '3.840 × 2.160', '~163'],
          ['Fernseher (4K)', '55"', '3.840 × 2.160', '~80'],
        ],
        fussnote: 'PPI = √(Breite² + Höhe² in Pixeln) ÷ Diagonale in Zoll. Smartphones haben die höchste Pixeldichte, weil man sie nah hält; Fernseher die niedrigste, weil man weit weg sitzt — bei normalem Betrachtungsabstand wirken trotzdem alle scharf.',
      },
      {
        typ: 'text',
        titel: 'Was PPI bedeutet — wann Pixel sichtbar werden',
        html: `<p>Die <strong>Pixeldichte (PPI)</strong> entscheidet, ob man auf einem Display einzelne Pixel erkennt oder ein gleichmäßig scharfes Bild sieht. Je höher die PPI, desto kleiner und dichter die Bildpunkte. Ab welcher Dichte das Auge keine einzelnen Pixel mehr unterscheidet, hängt entscheidend vom <strong>Betrachtungsabstand</strong> ab.</p><p>Ein Smartphone hält man rund 30 cm vor die Augen, dort braucht es über 300 PPI, damit alles glatt wirkt — deshalb haben Handys oft 400 bis 500 PPI. Einen Monitor betrachtet man aus 50 bis 70 cm; hier reichen schon rund 110 PPI für ein sauberes Bild. Beim Fernseher, den man aus mehreren Metern ansieht, genügen 40 bis 80 PPI. Die Pixeldichte allein sagt also wenig — erst zusammen mit dem typischen Abstand ergibt sie ein sinnvolles Maß für die wahrgenommene Schärfe. Ein 4K-Fernseher mit 80 PPI wirkt aus dem Sofa-Abstand genauso scharf wie ein 460-PPI-Handy in der Hand. In kleinen Wohnzimmern ist der Sprung von 4K auf 8K für die meisten deshalb gar nicht sichtbar.</p>`,
      },
      {
        typ: 'beispielrechnung',
        titel: 'Gleiche Auflösung, andere Größe (24" vs. 32" FHD)',
        schritte: [
          { label: 'Full-HD-Diagonale in Pixeln', formel: '√(1.920² + 1.080²)', ergebnis: '≈ 2.203 px' },
          { label: '24-Zoll-Monitor', formel: '2.203 ÷ 24', ergebnis: '≈ 92 PPI' },
          { label: '32-Zoll-Monitor', formel: '2.203 ÷ 32', ergebnis: '≈ 69 PPI' },
        ],
        fazit: 'Dieselbe Full-HD-Auflösung (1.920 × 1.080) ergibt auf einem 24-Zoll-Monitor rund 92 PPI, auf einem 32-Zoll-Monitor aber nur 69 PPI. Der größere Bildschirm verteilt die gleiche Pixelzahl auf mehr Fläche, jeder Pixel wird größer und das Bild wirkt gröber. Genau deshalb sollte ein 32-Zoll-Schreibtischmonitor mindestens 1440p, besser 4K bieten. Die Auflösung allein sagt nichts über die Schärfe — erst zusammen mit der Größe, also als PPI, wird sie aussagekräftig. Dieselbe Logik erklärt, warum ein 6-Zoll-Handy mit Full HD gestochen scharf wirkt: Auf der winzigen Fläche ergeben 1.920 × 1.080 Pixel über 400 PPI, während dieselbe Auflösung auf 32 Zoll grob aussieht. Größe und Auflösung gehören immer zusammen betrachtet.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Breite & Höhe aus Diagonale + 16:9 (Pythagoras)',
        schritte: [
          { label: 'Diagonal-Faktor für 16:9', formel: '√(16² + 9²)', ergebnis: '√337 ≈ 18,36' },
          { label: 'Breite = 27 × 16 ÷ 18,36', formel: '27 × 16 ÷ 18,36', ergebnis: '≈ 23,5 Zoll = 59,8 cm' },
          { label: 'Höhe = 27 × 9 ÷ 18,36', formel: '27 × 9 ÷ 18,36', ergebnis: '≈ 13,2 Zoll = 33,6 cm' },
        ],
        fazit: 'Aus der 27-Zoll-Diagonale und dem Seitenverhältnis 16:9 liefert der Satz des Pythagoras die physischen Maße: rund 59,8 cm breit und 33,6 cm hoch. Der Diagonal-Faktor √(16² + 9²) = √337 ≈ 18,36 teilt die Diagonale in den Breiten-Anteil (× 16) und den Höhen-Anteil (× 9). Das ist genau die Rechnung, die man braucht, um zu prüfen, ob ein Monitor auf den Schreibtisch oder ein Fernseher in eine Wandnische passt — die bloße Zoll-Zahl verrät die Breite nämlich nicht.',
      },
      {
        typ: 'tabelle',
        titel: 'PPI-Richtwerte je Gerätetyp',
        kopf: ['Gerätetyp', 'typische PPI', 'Betrachtungsabstand'],
        zeilen: [
          ['Smartphone', '400–500', '~25–35 cm'],
          ['Tablet', '220–280', '~35–45 cm'],
          ['Laptop', '130–230', '~50–60 cm'],
          ['Monitor', '90–160', '~50–70 cm'],
          ['Fernseher', '40–80', '~2–4 m'],
        ],
        fussnote: 'Je näher man ein Display hält, desto höher muss die Pixeldichte sein, damit einzelne Pixel unsichtbar bleiben. Deshalb haben Smartphones die höchsten PPI-Werte und Fernseher die niedrigsten — trotzdem wirken beide aus ihrem üblichen Abstand scharf. Als grobe Orientierung gilt: Was man auf Armlänge nutzt, sollte rund 100 PPI oder mehr haben; was man in der Hand hält, eher 300 oder mehr. Die Werte in der Tabelle sind typische Bereiche, keine festen Grenzen.',
      },
      {
        typ: 'text',
        titel: 'Betrachtungsabstand & die „Retina"-Schwelle',
        html: `<p>Apple prägte den Begriff <strong>„Retina"</strong> für Displays, bei denen man aus dem üblichen Abstand keine einzelnen Pixel mehr erkennt. Dahinter steckt die Auflösungsgrenze des menschlichen Auges: Es kann etwa eine <strong>Bogenminute</strong> auflösen — zwei Punkte, die enger beieinanderliegen, verschmelzen zu einem.</p><p>Daraus folgt eine einfache Regel: Die nötige Pixeldichte hängt vom <strong>Abstand</strong> ab. Verdoppelt man den Betrachtungsabstand, halbiert sich die nötige PPI für denselben Schärfeeindruck. Ein Handy auf 30 cm braucht rund 300 PPI, ein Monitor auf 60 cm nur die Hälfte, ein Fernseher auf 3 Meter noch deutlich weniger. Deshalb ist es wenig sinnvoll, einen 8K-Fernseher aus großer Entfernung mit einem hochauflösenden Handy zu vergleichen — beide sind für ihren Abstand optimiert. Wer dagegen sehr nah an einem großen, niedrig aufgelösten Display sitzt, sieht schnell die einzelnen Pixel, etwa als sogenannten „Fliegengitter"-Effekt. Eine praktische Konsequenz: Beim Fernseher entscheidet der Sitzabstand über die sinnvolle Größe — für rund 3 Meter gilt ein 55- bis 65-Zoll-4K-Gerät als guter Kompromiss.</p>`,
      },
      {
        typ: 'vergleich',
        titel: 'Höhere Auflösung vs. größeres Display',
        spalteA: 'Höhere Auflösung (gleiche Größe)',
        spalteB: 'Größeres Display (gleiche Auflösung)',
        zeilen: [
          { kriterium: 'Pixeldichte (PPI)', a: 'steigt → feineres Bild', b: 'sinkt → gröberes Bild' },
          { kriterium: 'Schärfe aus der Nähe', a: 'schärfer, keine sichtbaren Pixel', b: 'Pixel werden eher sichtbar' },
          { kriterium: 'Sichtbare Fläche', a: 'unverändert', b: 'größer, mehr Übersicht' },
          { kriterium: 'UI-Skalierung nötig?', a: 'ja, sonst wird alles winzig', b: 'meist nein' },
          { kriterium: 'Sinnvoll für', a: 'nahes Arbeiten, feine Grafik', b: 'Abstand, Film, mehrere Fenster' },
        ],
      },
      {
        typ: 'checkliste',
        titel: 'Das passende Display wählen',
        punkte: [
          'Diagonale in Zoll mal 2,54 nehmen, um die Größe in Zentimetern einzuschätzen.',
          'Physische Breite und Höhe prüfen, ob das Gerät auf den Schreibtisch oder an die Wand passt.',
          'PPI aus Auflösung und Diagonale berechnen — nicht nur auf die Auflösung schauen.',
          'Betrachtungsabstand bedenken: nah erfordert hohe PPI, fern kommt mit weniger aus.',
          'Großer Monitor (27 Zoll und mehr)? Mindestens 1440p, besser 4K, sonst sinkt die Schärfe.',
          'Beim Fernseher zählt der Sitzabstand mehr als die reine Zoll-Zahl.',
          'Bei sehr hoher PPI an die UI-Skalierung denken (z. B. 150 %), damit Text lesbar bleibt.',
          'Seitenverhältnis beachten: 16:9 für Film, 16:10 oder 21:9 für mehr Arbeitsfläche.',
        ],
      },
      {
        typ: 'infobox',
        variante: 'tipp',
        titel: 'Bei gleichem Abstand zählt die PPI, nicht nur die Auflösung',
        text: 'Zwei Monitore mit derselben Auflösung können völlig unterschiedlich scharf wirken — entscheidend ist die Pixeldichte (PPI), also die Auflösung im Verhältnis zur Größe. Ein 24-Zoll-Full-HD-Monitor (rund 92 PPI) zeigt ein deutlich feineres Bild als ein 32-Zoll-Full-HD-Monitor (rund 69 PPI), obwohl beide „Full HD" sind. Wer am Schreibtisch nah vor einem großen Bildschirm sitzt, sollte daher auf die PPI achten und im Zweifel zur höheren Auflösung greifen. Faustregel fürs Arbeiten am Monitor: rund 100 PPI oder mehr wirken sauber, darunter werden Schriftkanten zunehmend treppig.',
      },
      {
        typ: 'infobox',
        variante: 'hinweis',
        titel: 'PPI ist die Pixeldichte, kein alleiniges Qualitätsmaß',
        text: 'Eine hohe PPI bedeutet ein feines, pixelarmes Bild — aber sie sagt nichts über Farbtreue, Kontrast, Helligkeit, Reaktionszeit oder Blickwinkel aus. Ein OLED-Panel mit nur 100 PPI kann durch tiefes Schwarz und kräftige Farben besser aussehen als ein blasses LCD mit höherer Pixeldichte. Auch die Panel-Technik (IPS, VA, OLED), die Bildwiederholrate (Hz) und die Werkskalibrierung prägen den Bildeindruck stark. Die PPI ist also nur ein Baustein: Sie bestimmt die maximale Schärfe für einen gegebenen Abstand, nicht die Gesamtqualität eines Displays. Für die Kaufentscheidung lohnt der Blick auf das ganze Datenblatt. Ein praktischer Test: Lässt sich ein Display im Geschäft mit Text und Fotos in Ruhe ansehen, sagt der eigene Eindruck oft mehr als jede Datenblatt-Zahl. Die PPI hilft beim Vorsortieren, das letzte Urteil fällt das Auge aus dem geplanten Nutzungsabstand.',
      },
    ],
    quellen: [
      {
        titel: 'Bildschirmdiagonale & PPI — Berechnung',
        hinweis: 'Diagonale cm = Zoll × 2,54; PPI = √(Breite²+Höhe² in px) / Diagonale in Zoll (Pythagoras).',
      },
    ],
  },
];
