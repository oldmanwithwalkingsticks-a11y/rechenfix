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
