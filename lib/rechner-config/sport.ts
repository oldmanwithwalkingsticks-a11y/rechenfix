import type { RechnerConfig } from './types';

export const sportRechner: RechnerConfig[] = [
  {
    slug: 'pace-rechner',
    letzteAktualisierung: '2026-05-21',
    titel: 'Pace-Rechner',
    beschreibung: 'Pace, Zeit oder Distanz beim Laufen berechnen: min/km, km/h, Split-Zeiten und Zielzeit-Tabellen.',
    kategorie: 'Sport & Fitness',
    kategorieSlug: 'sport',
    metaTitle: 'Pace-Rechner — min/km, Zielzeit & Splits',
    metaDescription: 'Pace berechnen beim Laufen: min/km, km/h, Zielzeit und Split-Tabellen für 5k, 10k, Halbmarathon und Marathon. Kostenlos mit KI-Erklärung.',
    keywords: ['pace rechner', 'pace berechnen laufen', 'min/km rechner', 'laufgeschwindigkeit', 'marathon pace', 'halbmarathon pace', 'pace in km/h', 'split zeiten laufen', 'laufzeit rechner'],
    icon: '🏃',
    formel: 'Pace (min/km) = Gesamtzeit (Sek) ÷ Distanz (km) ÷ 60 | Zeit = Pace × Distanz | km/h = 60 ÷ Pace | 1 mi = 1,60934 km',
    beispiel: '10 km in 55:00 → Pace 5:30 min/km = 10,91 km/h. Marathon (42,195 km) in 4:00:00 → Pace 5:41 min/km. 5 km in 25:00 → Pace 5:00 min/km = 12,0 km/h.',
    erklaerung: `**Pace berechnen — das wichtigste Maß beim Laufen**

Pace ist die Zeit, die Sie für einen Kilometer benötigen — ausgedrückt als Minuten:Sekunden pro Kilometer (z. B. 5:30 min/km). Im Gegensatz zur Geschwindigkeit in km/h ist Pace beim Laufen das weltweit verwendete Maß, weil es sich schneller im Kopf rechnen lässt: Bei 5:30 min/km läuft man 10 km in 55 Minuten — einfache Mathematik.

Unser Pace-Rechner bietet drei Modi: Pace berechnen (aus Zeit + Distanz), Zielzeit berechnen (aus Pace + Distanz) und benötigte Distanz berechnen (aus Zeit + Pace). Zusätzlich gibt es eine Split-Tabelle mit den Zwischenzeiten bei jedem Kilometer — praktisch für Trainingsläufe und Wettkampfplanung.

**Pace vs. Geschwindigkeit (km/h)**

Beide Werte beschreiben dasselbe, nur anders:

- **Pace (min/km):** Je niedriger, desto schneller. 4:00 min/km ist schneller als 5:00 min/km.
- **Geschwindigkeit (km/h):** Je höher, desto schneller. 15 km/h ist schneller als 12 km/h.

Umrechnung: km/h = 60 ÷ Pace(min/km). Beispiel: 5:00 min/km = 12 km/h, 4:00 min/km = 15 km/h.

**Typische Pace-Werte und Leistungseinordnung**

- **Anfänger:** 6:30–7:30 min/km (8–9 km/h). Noch locker unterhaltungsfähig.
- **Fortgeschritten:** 5:00–6:00 min/km (10–12 km/h). Wettkampftempo für Hobbyläufer.
- **Ambitioniert:** 4:00–5:00 min/km (12–15 km/h). Ehrgeizige Freizeitsportler.
- **Elite:** unter 3:30 min/km (über 17 km/h). Profis und Spitzensportler.

Ein Marathon-Weltrekord liegt bei unter 3:00 min/km über 42 Kilometer — Tempo, das die meisten Hobbyläufer nicht mal 1 Kilometer durchhalten.

**Pace-Werte für gängige Zielzeiten**

- **5 km in 25 Minuten:** Pace 5:00 min/km — solider Freizeitläufer.
- **10 km in 50 Minuten:** Pace 5:00 min/km — fortgeschritten.
- **Halbmarathon in 2:00 h:** Pace 5:41 min/km — ambitionierter Freizeitläufer.
- **Marathon in 4:00 h:** Pace 5:41 min/km — typisches Ziel erster Marathonläufer.
- **Marathon in 3:30 h:** Pace 4:58 min/km — ambitioniert.
- **Marathon in 3:00 h:** Pace 4:16 min/km — sehr schnell.

**Die 80/20-Trainingsregel**

Studien zeigen: Wer im Training 80 % der Zeit langsam läuft (Grundlagenausdauer) und nur 20 % schnell (Tempo-/Intervalltraining), verbessert seine Bestzeiten schneller als wer immer mit gleichem Tempo läuft. Das langsame Tempo liegt typischerweise 60–90 Sekunden über der Wettkampfpace.

**Split-Strategien: Even vs. Negative Splits**

Profis laufen meist mit Negative Splits — die zweite Hälfte schneller als die erste. Das schont die Kräfte für den Schluss. Viele Anfänger starten zu schnell und brechen am Ende ein (Positive Splits). Faustregel: Die ersten 10 % eines Laufs mindestens 10 Sekunden langsamer als die Zielpace.

**Kilometer vs. Meilen (mi/min → min/km)**

Amerikanische und britische Läufer verwenden oft min/mi (Minuten pro Meile). Umrechnung: 1 Meile = 1,60934 km. Eine Pace von 8:00 min/mi entspricht etwa 4:58 min/km — das ist Tempo für ambitionierte Marathonläufer.`,
    faq: [
      {
        frage: 'Was ist Pace beim Laufen?',
        antwort: 'Pace ist die Zeit, die Sie für einen Kilometer benötigen — angegeben als Minuten:Sekunden pro Kilometer (z. B. 5:30 min/km). Je niedriger die Pace, desto schneller laufen Sie. Pace ist das Standardmaß beim Laufen, weil es leichter zu rechnen ist als km/h.',
      },
      {
        frage: 'Wie berechne ich meinen Pace?',
        antwort: 'Pace (min/km) = Gesamtzeit in Minuten ÷ Distanz in km. Beispiel: 10 km in 55 Minuten → 55 ÷ 10 = 5,5 min/km = 5:30 min/km. Mit unserem Pace-Rechner geht das automatisch, inklusive Sekundenumrechnung und Split-Tabelle.',
      },
      {
        frage: 'Welcher Pace für einen Marathon unter 4 Stunden?',
        antwort: 'Um einen Marathon (42,195 km) unter 4:00:00 h zu laufen, brauchen Sie eine Pace von etwa 5:41 min/km (10,55 km/h). Das entspricht 14:13 Minuten pro 2,5 km. Wichtig: Pace im Training regelmäßig auf langen Läufen üben, nicht erst am Wettkampftag.',
      },
      {
        frage: 'Wie rechne ich Pace in km/h um?',
        antwort: 'Die Formel lautet: km/h = 60 ÷ Pace (min/km, als Dezimalzahl). Beispiel: 5:30 min/km = 5,5 min → 60 ÷ 5,5 = 10,91 km/h. Beispiele: 4:00 min/km = 15 km/h, 5:00 min/km = 12 km/h, 6:00 min/km = 10 km/h. Unser Rechner zeigt beide Werte automatisch.',
      },
      {
        frage: 'Was ist ein guter Pace für Anfänger?',
        antwort: 'Für Anfänger ist ein Pace von 6:30 bis 7:30 min/km (8–9 km/h) realistisch. Wichtiger als das Tempo: Sie sollten nebenher noch reden können (Grundlagentempo). Erst nach einigen Monaten regelmäßigen Trainings lohnt es sich, an der Geschwindigkeit zu arbeiten — vorher verhindert zu schnelles Laufen Fortschritt und erhöht das Verletzungsrisiko.',
      },
      {
        frage: 'Was bedeuten Split-Zeiten?',
        antwort: 'Split-Zeiten sind die Zwischenzeiten bei definierten Distanzen (meist jeden Kilometer). Sie zeigen, ob Sie gleichmäßig laufen (Even Splits) oder am Ende schneller werden (Negative Splits, ideal) bzw. abbauen (Positive Splits). Unser Rechner zeigt alle Splits bei konstanter Pace.',
      },
    ],
  },
  {
    slug: 'herzfrequenz-zonen-rechner',
    letzteAktualisierung: '2026-05-21',
    titel: 'Herzfrequenz-Zonen-Rechner',
    beschreibung: 'Trainingszonen berechnen: HFmax nach Tanaka und Karvonen, 5 Zonen, 80/20-Training und Fettverbrennungszone.',
    kategorie: 'Sport & Fitness',
    kategorieSlug: 'sport',
    metaTitle: 'Herzfrequenz-Zonen — Training nach Karvonen',
    metaDescription: 'Herzfrequenz-Trainingszonen berechnen: HFmax nach Tanaka und Karvonen-Formel, 5 Zonen, Fettverbrennung und 80/20-Regel. Kostenlos mit KI-Erklärung.',
    keywords: ['herzfrequenz zonen', 'trainingszonen rechner', 'karvonen formel', 'hfmax berechnen', 'maximale herzfrequenz', 'fettverbrennungszone', 'puls trainingszonen', '80/20 training', 'herzfrequenz laufen'],
    icon: '❤️',
    formel: 'HFmax (Standard) = 220 − Alter | HFmax (Tanaka) = 208 − 0,7 × Alter | Karvonen: Zielpuls = Ruhepuls + (HFmax − Ruhepuls) × Intensität',
    beispiel: '30 Jahre, Ruhepuls 65: HFmax (Tanaka) = 187. Zone 2 Grundlagenausdauer nach Karvonen: 65 + (187 − 65) × 0,6 = 138 bpm bis 150 bpm. Ideal für den Grundlagenausdauer-Aufbau.',
    erklaerung: `**Herzfrequenz-Zonen — so trainierst du gezielt**

Die Herzfrequenz (Puls) ist der beste Indikator für die Trainingsintensität. Statt nur auf Tempo oder Gefühl zu achten, orientieren sich Profi- und ambitionierte Freizeitsportler an 5 Herzfrequenz-Zonen. Jede Zone hat einen anderen Trainingseffekt: Regeneration, Fettverbrennung, Ausdauer, Leistung oder Maximum.

Unser Rechner ermittelt Ihre individuelle maximale Herzfrequenz (HFmax) nach verschiedenen Formeln und teilt die Zonen auf Basis der Karvonen-Methode auf — der genaueren Variante, die auch Ihren Ruhepuls berücksichtigt.

**Die maximale Herzfrequenz (HFmax) berechnen**

Es gibt verschiedene Formeln zur Schätzung der HFmax. Keine ist 100 % genau — der wahre Wert kann nur per Belastungstest ermittelt werden. Die wichtigsten Formeln:

- **Standardformel (Fox):** HFmax = 220 − Alter. Einfach, aber ungenau (Abweichung ±10 bpm).
- **Tanaka-Formel (2001):** HFmax = 208 − 0,7 × Alter. Wissenschaftlich validiert, genauer als die Standardformel.
- **Karvonen-Methode:** Nutzt HFmax und Ruhepuls — dadurch werden die Zonen individueller.

Für die meisten Menschen ist Tanaka zu empfehlen. Bei 30 Jahren liefert die Standardformel 190, Tanaka 187 — bei 60 Jahren liegen beide weit auseinander (160 vs. 166).

**Die 5 Trainingszonen im Detail**

- **Zone 1 (50–60 % HFmax) — Regeneration:** Sehr lockeres Tempo, z. B. nach hartem Training oder Wettkampf. Puls typ. 100–120 bpm.
- **Zone 2 (60–70 %) — Grundlagenausdauer:** „Lauf-Grundlage", hier verbringen Marathonis 80 % ihrer Zeit. Fettverbrennung optimal. Puls typ. 120–140 bpm.
- **Zone 3 (70–80 %) — Aerobe Zone:** Zielzeit-Tempo für lange Wettkämpfe. Schwitzen deutlich, Atmung kontrollierbar. Puls typ. 140–160 bpm.
- **Zone 4 (80–90 %) — Anaerobe Schwelle:** Tempo, das gerade noch lange haltbar ist. Hartes Training, Intervalle, Tempodauerläufe. Puls typ. 160–180 bpm.
- **Zone 5 (90–100 %) — Maximum:** Sprint, Maximalintensität, nur für kurze Zeit haltbar. Kurze Intervalle, Wettkampf-Endspurt. Puls typ. 180+ bpm.

**Die Fettverbrennungszone — ein Mythos?**

Jahrzehntelang galt Zone 2 als „Fettverbrennungszone". Stimmt teilweise: Bei niedriger Intensität holt der Körper einen höheren Anteil der Energie aus Fett. Absolut gesehen verbrennen Sie aber in höheren Zonen MEHR Fett pro Stunde, weil der Gesamtverbrauch steigt. Fürs Abnehmen zählt am Ende die Kalorienbilanz — egal in welcher Zone.

Für Ausdauersport ist Zone 2 trotzdem essenziell: Sie baut die „aerobe Basis" auf, ohne die höhere Zonen nicht lange haltbar sind.

**Die Karvonen-Formel: Individuelle Zonen**

Die Karvonen-Methode berücksichtigt den Ruhepuls und liefert realistischere Zonen:

Zielpuls = Ruhepuls + (HFmax − Ruhepuls) × Intensität

Beispiel: 30 Jahre, HFmax 187 bpm, Ruhepuls 65 bpm, Zone 2 (60 %): Zielpuls = 65 + (187 − 65) × 0,6 = 65 + 73 = 138 bpm. Die einfache Formel (ohne Ruhepuls) ergäbe 187 × 0,6 = 112 bpm — deutlich niedriger. Karvonen ist für Trainierte genauer.

**Die 80/20-Regel im Training**

Der Trainingswissenschaftler Stephen Seiler hat nachgewiesen: Elite-Ausdauersportler verbringen 80 % ihrer Trainingszeit in Zone 1–2 (locker) und nur 20 % in Zone 4–5 (hart). Die Mittelzone 3 wird gemieden („Polarized Training"). Diese Verteilung führt zu schnellerem Fortschritt als permanentes Mittelzonentraining.

**Ruhepuls messen — morgens im Bett**

Der Ruhepuls ist der Puls im absoluten Ruhezustand. Am besten morgens direkt nach dem Aufwachen im Bett messen, bevor Sie aufstehen. Bei trainierten Menschen liegt er bei 50–60 bpm, bei Untrainierten bei 70–80 bpm. Ausdauersportler haben oft 40–50 bpm. Ein sinkender Ruhepuls ist ein Zeichen für steigende Fitness.`,
    faq: [
      {
        frage: 'Wie berechne ich meine maximale Herzfrequenz?',
        antwort: 'Die einfachste Formel ist 220 minus Alter. Genauer ist die Tanaka-Formel: 208 − 0,7 × Alter. Beide sind aber nur Schätzungen — der wahre Wert kann um ±10 bpm abweichen. Für exakte HFmax braucht es einen Belastungstest (Laufbandtest, Stufentest) unter medizinischer Aufsicht.',
      },
      {
        frage: 'Was sind Herzfrequenz-Zonen?',
        antwort: 'Die 5 Trainingszonen sind Intensitätsbereiche des Pulses, die jeweils einen anderen Trainingseffekt haben: Zone 1 (Regeneration), Zone 2 (Grundlagenausdauer), Zone 3 (Aerob), Zone 4 (Anaerobe Schwelle), Zone 5 (Maximum). Durch gezieltes Training in verschiedenen Zonen verbessern Sie unterschiedliche Aspekte: Ausdauer, Tempo, VO2max.',
      },
      {
        frage: 'In welcher Zone verbrennt man am meisten Fett?',
        antwort: 'Prozentual kommt in Zone 2 (60–70 % HFmax) der höchste Anteil der Energie aus Fett. ABSOLUT betrachtet verbrennen Sie aber in höheren Zonen mehr Fett pro Stunde, weil der Gesamtenergieumsatz steigt. Fürs Abnehmen zählt die Gesamtkalorienbilanz — nicht die Zone. Zone 2 ist trotzdem wichtig für den Ausdaueraufbau.',
      },
      {
        frage: 'Was ist die Karvonen-Formel?',
        antwort: 'Die Karvonen-Formel berechnet Trainingszonen mit Ruhepuls: Zielpuls = Ruhepuls + (HFmax − Ruhepuls) × Intensität. Sie ist genauer als die einfache Prozentrechnung (HFmax × Intensität), weil sie den Ruhepuls berücksichtigt. Trainierte Sportler mit niedrigem Ruhepuls bekommen dadurch realistischere Zonen.',
      },
      {
        frage: 'Wie messe ich meinen Ruhepuls?',
        antwort: 'Am besten morgens direkt nach dem Aufwachen, noch im Bett liegend — bevor Sie aufstehen oder Kaffee trinken. Messen Sie 60 Sekunden lang (Finger auf Handgelenk/Hals) oder nutzen einen Pulsmesser. Ideal: 3–5 Tage hintereinander messen und Durchschnitt bilden. Trainierte: 50–60 bpm, Untrainierte: 70–80 bpm.',
      },
      {
        frage: 'Was ist die 80/20-Regel beim Training?',
        antwort: 'Die 80/20-Regel (Polarized Training): 80 % der Trainingszeit in Zone 1–2 (locker), nur 20 % in Zone 4–5 (hart). Die Mittelzone 3 wird gemieden. Studien zeigen, dass diese Verteilung Bestzeiten schneller verbessert als permanentes Mittelzonentraining. Für Hobby-Läufer besonders effektiv.',
      },
    ],
    contentBloecke: [
      {
        typ: 'text',
        titel: 'Training nach Puls: Warum Herzfrequenz-Zonen die Belastung steuern',
        html: `<p>Die <strong>Herzfrequenz</strong> ist der unmittelbarste Messwert für die innere Belastung beim Ausdauertraining. Während Tempo, Wattzahl oder Gefühl von Tagesform, Wind, Steigung und Untergrund abhängen, spiegelt der Puls direkt wider, wie hart das Herz-Kreislauf-System gerade arbeitet. Genau deshalb teilen Sportwissenschaft und Trainingspraxis das Spektrum zwischen Ruhe und Maximalbelastung in <strong>fünf Herzfrequenz-Zonen</strong> ein — jede mit einem eigenen physiologischen Trainingsreiz.</p><p>Der Grundgedanke: Nicht jede Einheit soll gleich anstrengend sein. Lockere Zonen entwickeln die aerobe Grundlage und fördern die Regeneration, mittlere Zonen schulen das Renntempo, harte Zonen verschieben die anaerobe Schwelle und die maximale Sauerstoffaufnahme. Wer alle Einheiten im selben mittleren Bereich absolviert, trainiert chronisch zu hart für lockere und zu locker für harte Reize — die berüchtigte „graue Zone". Eine bewusste Verteilung über die Zonen bringt mehr Fortschritt bei geringerer Ermüdung.</p><p>Voraussetzung dafür sind zwei persönliche Bezugswerte: die <strong>maximale Herzfrequenz (HFmax)</strong> als obere Grenze und der <strong>Ruhepuls</strong> als untere Grenze. Aus ihrer Differenz, der Herzfrequenzreserve, lassen sich die Zonen individuell berechnen. Dieser Rechner ermittelt beide Werte, schätzt die HFmax über etablierte Formeln und zeigt die fünf Zonen als konkrete Pulsbereiche in Schlägen pro Minute (bpm). Wichtig vorweg: Alle Formelwerte sind Schätzungen. Sie ersetzen weder einen Belastungstest noch — bei Vorerkrankungen — die ärztliche Abklärung. Die Belastung gehört immer an das eigene Fitnesslevel angepasst.</p><p>Der größte praktische Nutzen der Zonen liegt in der <strong>Verteilung</strong> über die Trainingswoche. Der Trainingswissenschaftler Stephen Seiler hat gezeigt, dass Ausdauersportler auf hohem Niveau rund 80 Prozent ihrer Zeit locker in den Zonen 1 und 2 verbringen und nur etwa 20 Prozent hart in den Zonen 4 und 5 — die Mittelzone 3 wird bewusst gemieden. Dieses „polarisierte" Muster führt zu größerem Fortschritt als ständiges Training im mittleren Bereich, weil lockere Einheiten die aerobe Basis aufbauen, ohne zu ermüden, und die wenigen harten Einheiten dadurch mit voller Qualität absolviert werden können.</p><p>Pulsgesteuertes Training hat allerdings Grenzen, die man kennen sollte. Die Herzfrequenz reagiert verzögert auf Belastungswechsel und steigt im Verlauf langer Einheiten bei gleichem Tempo an — der sogenannte Herzfrequenz-Drift durch Wärme und Flüssigkeitsverlust. Auch Koffein, Hitze, Höhe, Stress und Schlafmangel verschieben den Puls. Bei sehr kurzen, explosiven Intervallen hinkt die Herzfrequenz dem tatsächlichen Tempo hinterher und taugt schlechter zur Steuerung als bei gleichmäßigen Dauerbelastungen. Die Zonen sind deshalb ein Rahmen, kein starres Korsett — Körpergefühl und, wo vorhanden, Tempo oder Wattzahl ergänzen das Bild.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'Die fünf Herzfrequenz-Zonen im Überblick',
        kopf: ['Zone', '% der HFmax', 'Bezeichnung', 'Trainingswirkung'],
        zeilen: [
          ['Zone 1', '50–60 %', 'Regeneration', 'Sehr locker; aktive Erholung nach harten Einheiten, fördert die Durchblutung ohne zusätzliche Ermüdung'],
          ['Zone 2', '60–70 %', 'Grundlagenausdauer', 'Lockeres Dauertempo; baut die aerobe Basis und den Fettstoffwechsel auf, Kernbereich langer Einheiten'],
          ['Zone 3', '70–80 %', 'Aerobe Zone', 'Zügiges, noch kontrollierbares Tempo; Renntempo für lange Wettkämpfe, Atmung gleichmäßig'],
          ['Zone 4', '80–90 %', 'Anaerobe Schwelle', 'Hart, aber über längere Intervalle haltbar; verschiebt die Laktatschwelle nach oben'],
          ['Zone 5', '90–100 %', 'Maximum', 'Maximalintensität; nur kurze Intervalle, schult Spitzenleistung und maximale Sauerstoffaufnahme'],
        ],
        fussnote: 'Die Prozentwerte beziehen sich auf die maximale Herzfrequenz. Zone 2 trägt den Großteil des Ausdauertrainings (Stichwort 80/20-Verteilung). Zone 2 als „Grundlagenausdauer" beschreibt einen trainingsphysiologischen Reiz — nicht ein Werkzeug zum Abnehmen; der Energieumsatz hängt vom Gesamttraining und der Lebensweise ab. Berechnet man die Zonen nach Karvonen, beziehen sich die Prozentwerte nicht auf die HFmax allein, sondern auf die Herzfrequenzreserve (HFmax minus Ruhepuls), die zum Ruhepuls addiert wird — die Untergrenze von Zone 1 liegt dann nicht bei 50 Prozent der HFmax, sondern spürbar höher. Die Grenzen sind fließend: Ein Puls knapp an einer Zonengrenze ist kein Fehler, sondern Teil eines kontinuierlichen Übergangs zwischen den Belastungsbereichen.',
      },
      {
        typ: 'beispielrechnung',
        titel: 'Karvonen-Beispiel: Zielpuls Zone 2 für 40 Jahre, Ruhepuls 60',
        schritte: [
          { label: 'HFmax nach Tanaka schätzen', formel: '208 − 0,7 × 40', ergebnis: '180 bpm' },
          { label: 'Herzfrequenzreserve bestimmen (HFmax − Ruhepuls)', formel: '180 − 60', ergebnis: '120 bpm' },
          { label: 'Zone-2-Untergrenze (60 % der Reserve über Ruhepuls)', formel: '60 + 120 × 0,60', ergebnis: '132 bpm' },
          { label: 'Zone-2-Obergrenze (70 % der Reserve über Ruhepuls)', formel: '60 + 120 × 0,70', ergebnis: '144 bpm' },
        ],
        fazit: 'Der Grundlagenausdauer-Bereich (Zone 2) liegt für diese Person bei rund 132 bis 144 bpm. Zum Vergleich: Die einfache Prozentmethode ohne Ruhepuls (180 × 0,60 = 108 bis 180 × 0,70 = 126) liefert deutlich niedrigere Werte. Karvonen berücksichtigt mit der Herzfrequenzreserve den individuellen Ruhepuls und ergibt gerade für Trainierte realistischere Zonen. Nach demselben Schema lassen sich alle fünf Zonen berechnen: Man setzt für die Intensität nacheinander die Anteilsgrenzen 0,50 bis 1,00 ein. Für 40 Jahre und Ruhepuls 60 ergeben sich so Zone 1 mit 120 bis 132 bpm, Zone 3 mit 144 bis 156 bpm, Zone 4 mit 156 bis 168 bpm und Zone 5 mit 168 bis 180 bpm. Sinkt der Ruhepuls mit besserer Fitness, verschiebt sich die gesamte Zonenleiter — deshalb lohnt es, die Werte regelmäßig neu zu berechnen.',
      },
      {
        typ: 'text',
        titel: 'HFmax schätzen: Fox-Faustformel gegen Tanaka',
        html: `<p>Die maximale Herzfrequenz ist genetisch festgelegt und sinkt mit dem Alter. Exakt bestimmen lässt sie sich nur in einem <strong>Belastungstest</strong> (Laufband- oder Stufentest unter Aufsicht). Für den Alltag nutzt man Schätzformeln — und hier lohnt der Blick auf die Unterschiede.</p><p>Die bekannteste ist die <strong>Fox-Faustformel</strong> aus dem Jahr 1971: HFmax = 220 − Alter. Sie ist leicht zu merken und weit verbreitet, hat aber eine erhebliche Streuung von etwa ±10 bis 12 Schlägen. Vor allem bei älteren Trainierenden unterschätzt sie die tatsächliche HFmax systematisch, weil der lineare Abzug von einem Schlag pro Lebensjahr empirisch zu steil ist.</p><p>Die <strong>Tanaka-Formel</strong> von 2001 (HFmax = 208 − 0,7 × Alter) entstand aus einer Meta-Analyse zahlreicher Studien und bildet den altersbedingten Rückgang flacher und damit realistischer ab. Der Unterschied wächst mit dem Alter: Mit 30 Jahren liefern beide noch ähnliche Werte (190 gegenüber 187), mit 60 Jahren dagegen 160 nach Fox, aber 166 nach Tanaka — sechs Schläge, die ganze Zonengrenzen verschieben. Deshalb ist Tanaka für die meisten Menschen die bessere Wahl.</p><p>Die <strong>Karvonen-Methode</strong> ist keine HFmax-Formel, sondern ein Weg, aus HFmax und Ruhepuls individuelle Zonen zu berechnen. Sie kombiniert sich am besten mit einem Tanaka-HFmax-Wert. Wer einen echten, im Test gemessenen HFmax-Wert kennt, sollte diesen statt jeder Schätzung einsetzen.</p><p>Wichtig ist, die Grenzen aller Formeln nüchtern zu sehen. Die maximale Herzfrequenz streut zwischen Menschen gleichen Alters erheblich: Zwei 40-Jährige können sich um 20 Schläge und mehr unterscheiden, ohne dass einer von beiden untrainiert oder ungesund wäre. Eine Formel trifft also bestenfalls den Durchschnitt einer Altersgruppe, nicht zwingend die eigene Physiologie. Wer feststellt, dass der Puls im Training regelmäßig deutlich über dem geschätzten Maximum liegt oder die berechneten Zonen sich durchgängig zu hart oder zu locker anfühlen, sollte die HFmax über einen Belastungstest präzisieren.</p><p>Der <strong>Ruhepuls</strong> ist der zweite Bezugswert und verändert sich mit der Fitness. Mit steigender Ausdauerleistung sinkt er häufig über Wochen und Monate, weil das Herz pro Schlag mehr Blut auswirft. Trainierte liegen oft bei 50 bis 60 Schlägen pro Minute, Ausdauersportler mitunter bei 40 bis 50. Weil die Karvonen-Methode den Ruhepuls einrechnet, lohnt es sich, ihn ein- bis zweimal pro Saison neu zu bestimmen und die Zonen zu aktualisieren — sonst rechnet man mit veralteten Untergrenzen. Ein plötzlich erhöhter Ruhepuls dagegen ist kein Fitnesssignal, sondern ein Warnzeichen für Infekt, Übertraining oder Schlafmangel. In der Praxis bietet sich an, HFmax und Ruhepuls einmal zu Saisonbeginn festzulegen, die Zonen daraus zu berechnen und sie dann über den Trainingszyklus zu nutzen — eine kurze Überprüfung nach einigen Monaten konsequenten Trainings reicht meist aus, um die Werte aktuell zu halten.</p>`,
      },
      {
        typ: 'tabelle',
        titel: 'HFmax-Formeln und Karvonen im Vergleich',
        kopf: ['Methode', 'Formel', 'Stärke und Schwäche'],
        zeilen: [
          ['Fox / Standard (1971)', 'HFmax = 220 − Alter', 'Sehr einfach und verbreitet; ungenau (±10–12 bpm), unterschätzt HFmax im höheren Alter'],
          ['Tanaka (2001)', 'HFmax = 208 − 0,7 × Alter', 'Aus Meta-Analyse validiert, altersgerechter; für die meisten die empfohlene Schätzung'],
          ['Karvonen (1957)', 'Zielpuls = Ruhepuls + (HFmax − Ruhepuls) × Intensität', 'Bezieht den Ruhepuls ein, individuellere Zonen; nur so genau wie der eingesetzte HFmax-Wert'],
        ],
        fussnote: 'Faustformeln sind Schätzungen mit individueller Streuung. Der zuverlässigste HFmax-Wert stammt aus einem sportmedizinischen Belastungstest; ein dort gemessener Wert hat Vorrang vor jeder Formel. Tanaka und Fox schätzen nur die obere Grenze (HFmax); erst die Karvonen-Methode macht aus dieser Grenze gemeinsam mit dem Ruhepuls konkrete Trainingszonen. Wer einen gemessenen HFmax-Wert in den Rechner einträgt, überschreibt die Formelschätzung — die Zonen werden dann auf dieser belastbaren Basis gebildet.',
      },
      {
        typ: 'infobox',
        variante: 'warnung',
        titel: 'Bei Vorerkrankungen ärztlich abklären',
        text: 'Pulsbasierte Trainingsbereiche sind Orientierungswerte für gesunde Freizeitsportler. Wer eine Herz-Kreislauf-Erkrankung hat, Medikamente nimmt, die den Puls beeinflussen (etwa Betablocker), schwanger ist, lange nicht trainiert hat oder Symptome wie Brustschmerz, Atemnot, Schwindel oder Herzstolpern bemerkt, sollte die Belastung vor dem Training ärztlich oder sportmedizinisch abklären lassen. Die berechneten Zonen ersetzen keine medizinische Beratung. Belastung grundsätzlich an das eigene Fitnesslevel anpassen und schrittweise steigern. Auch wer lange pausiert hat oder neu mit Ausdauersport beginnt, startet besser konservativ in den unteren Zonen und tastet sich über Wochen heran, statt sofort an die Schwellenbereiche zu gehen.',
      },
      {
        typ: 'checkliste',
        titel: 'Ruhe- und Trainingspuls richtig messen',
        punkte: [
          'Ruhepuls morgens direkt nach dem Aufwachen im Liegen messen — vor dem Aufstehen, Kaffee oder Blick aufs Handy.',
          'Über 3 bis 5 Tage messen und den Durchschnitt nehmen; einzelne Tage schwanken durch Schlaf, Stress und Koffein.',
          'Manuell 60 Sekunden zählen (Zeigefinger an Handgelenk oder Hals, nicht den Daumen) oder einen Brustgurt nutzen.',
          'Brustgurte messen den Trainingspuls in der Regel zuverlässiger als optische Handgelenk-Sensoren, die bei Intervallen nachhängen können.',
          'Einen dauerhaft erhöhten Ruhepuls (mehrere Schläge über dem Normalwert) als mögliches Zeichen für Infekt, Übertraining oder Schlafmangel ernst nehmen und die Belastung anpassen.',
          'HFmax nicht aus einer einzelnen erschöpfenden Maximaleinheit ableiten — ein strukturierter Belastungstest unter Aufsicht ist sicherer und genauer.',
          'Den Ruhepuls saisonal neu bestimmen: Sinkt er mit besserer Fitness, verschiebt sich die ganze Karvonen-Zonenleiter, und veraltete Werte führen zu zu niedrigen Untergrenzen.',
        ],
      },
    ],
    quellen: [
      {
        titel: 'Tanaka, Monahan, Seals (2001), J Am Coll Cardiol 37(1):153–156',
        hinweis: 'Age-predicted maximal heart rate revisited — HFmax = 208 − 0,7 × Alter (Meta-Analyse, wissenschaftlich validiert).',
      },
      {
        titel: 'Karvonen, Kentala, Mustala (1957), Ann Med Exp Biol Fenn 35(3):307–315',
        hinweis: 'Herzfrequenzreserve-Formel: Zielpuls = Ruhepuls + (HFmax − Ruhepuls) × Intensität.',
      },
      {
        titel: 'Fox, Naughton, Haskell (1971)',
        hinweis: 'Klassische Faustformel HFmax = 220 − Alter — gebräuchlich, aber mit größerer Streuung als Tanaka.',
      },
    ],
  },
];
