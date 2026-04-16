import type { RechnerConfig } from './types';

export const sportRechner: RechnerConfig[] = [
  {
    slug: 'pace-rechner',
    titel: 'Pace-Rechner',
    beschreibung: 'Pace, Zeit oder Distanz beim Laufen berechnen: min/km, km/h, Split-Zeiten und Zielzeit-Tabellen.',
    kategorie: 'Sport & Fitness',
    kategorieSlug: 'sport',
    metaTitle: 'Pace-Rechner 2026 — min/km, Zielzeit & Splits berechnen | Rechenfix',
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
    titel: 'Herzfrequenz-Zonen-Rechner',
    beschreibung: 'Trainingszonen berechnen: HFmax nach Tanaka und Karvonen, 5 Zonen, 80/20-Training und Fettverbrennungszone.',
    kategorie: 'Sport & Fitness',
    kategorieSlug: 'sport',
    metaTitle: 'Herzfrequenz-Zonen-Rechner 2026 — Trainingszonen & Karvonen | Rechenfix',
    metaDescription: 'Herzfrequenz-Trainingszonen berechnen: HFmax nach Tanaka und Karvonen-Formel, 5 Zonen, Fettverbrennung und 80/20-Regel. Kostenlos mit KI-Erklärung.',
    keywords: ['herzfrequenz zonen', 'trainingszonen rechner', 'karvonen formel', 'hfmax berechnen', 'maximale herzfrequenz', 'fettverbrennungszone', 'puls trainingszonen', '80/20 training', 'herzfrequenz laufen'],
    icon: '❤️',
    formel: 'HFmax (Standard) = 220 − Alter | HFmax (Tanaka) = 208 − 0,7 × Alter | Karvonen: Zielpuls = Ruhepuls + (HFmax − Ruhepuls) × Intensität',
    beispiel: '30 Jahre, Ruhepuls 65: HFmax (Tanaka) = 187. Zone 2 Grundlagenausdauer nach Karvonen: 65 + (187 − 65) × 0,6 = 138 bpm bis 147 bpm. Für Fettverbrennung ideal.',
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
  },
];
