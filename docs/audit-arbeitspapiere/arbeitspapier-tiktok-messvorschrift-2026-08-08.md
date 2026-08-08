# TikTok-Auswertung ab 20.08.2026 — Messvorschrift

**Stand:** 08.08.2026 · ersetzt das Kriterium aus dem Handoff vom 07.08.

---

## Warum diese Vorschrift nötig wurde

Der Handoff vom 07.08. nannte ein einziges Kriterium: „Verschwindet
`reached_active_user_cap` am 05 UTC nach dem 20.08., war die Uhrzeit das Problem."

Dieses Kriterium ist unbrauchbar, und zwar aus zwei Gründen.

**Erstens fehlt die Vergleichsbasis.** Die Fehlermessung war bis Welle 58 blind: PostPeer
antwortet laut eigener Doku mit HTTP 202 auf alles, auch auf `failed`, und
`publishViaPostPeer` prüfte nur `res.ok`. Jeder gescheiterte Post galt als Erfolg, `logError`
wurde nie erreicht. Erst ab Welle 58 (Commit `02c0f85`, 06.08.) schreibt der Code überhaupt
Fehler nach KV.

In dem Fenster zwischen der Reparatur und dem Anbieterwechsel steht genau **ein** Eintrag im
Log:

```
social:errors:2026-08-02:tiktok
{
  "error": "PostPeer HTTP 402: {\"success\":false,\"message\":\"Not enough credits.
             This request requires 1 credit. Add more credits or wait for your
             billing cycle to reset.\"}",
  "ts": "2026-08-02T17:01:14.953Z"
}
```

Das ist **kein** Cap-Fehler, sondern ein aufgebrauchtes Kontingent. Aus eigenen Daten ist der
Cap damit nie belegt worden — die Cap-Meldungen stammen ausschließlich aus PostPeers
Oberfläche. Ein Vorher-Nachher-Vergleich auf `reached_active_user_cap` hat folglich kein
Vorher.

**Zweitens verwechselt das alte Kriterium zwei Fehlerbilder.** Cap und 402 bedeuten beide
„kein Post", haben aber verschiedene Ursachen und erfordern gegensätzliche Reaktionen. Wer nur
auf den Cap prüft, hält ein Kontingentproblem für Erfolg.

---

## Die drei Fälle

| Befund im Log | Bedeutung | Konsequenz |
|---|---|---|
| `reached_active_user_cap` | TikToks 24-Stunden-Creator-Cap des Anbieter-Clients. Wird pro API-Client vergeben und über alle Kunden des Anbieters geteilt. | **Strukturell.** Nicht durch Bezahlung, Uhrzeit oder Takt lösbar. Anbietersuche starten. |
| HTTP 402 / „Not enough credits" | Das Kontingent des Gratistarifs ist erschöpft. | **Nicht strukturell.** Frage von Takt oder Tarif. Takt prüfen, ggf. Kleintarif. |
| Kein Eintrag, Post sichtbar | Läuft. | Nichts tun. |
| Kein Eintrag, Post **nicht** sichtbar | Stiller Ausfall — der gefährlichste Fall. | Sofort prüfen: Lief der Cron? Wurde `istTikTokTag` falsch ausgewertet? Ist die Antwortauswertung wieder blind? |

**Der letzte Fall ist der Grund, warum die Fehlerliste allein nie genügt.** Beide Belege müssen
zusammenpassen: sichtbarer Post auf @rechenfix **und** leeres Fehlerlog. Genau diese Kombination
lag am 08.08. vor — erster Post über bundle.social sichtbar, `social:errors:2026-08-08:tiktok`
existiert nicht.

---

## Eigenheiten des Fehlerlogs

Zwei Dinge, die man beim Auslesen kennen muss (aus `lib/social/state.ts`):

- `logError` schreibt per `redis.set`, **überschreibt** also einen vorhandenen Eintrag. Bei
  mehreren Fehlversuchen am selben Tag ist nur der jüngste sichtbar.
- Der Key wird bei Erfolg **nicht** gelöscht — es gibt im ganzen Modul kein `del` auf
  `errorKey`. Ein vorhandener Eintrag bedeutet deshalb **nicht**, dass der Post gescheitert
  ist. Er kann von einem abgefangenen Fehlversuch stammen, dem ein erfolgreicher folgte.
- Kein TTL. Die Einträge bleiben dauerhaft und taugen als Beleg.

Auslesen: Vercel → `rechenfix` → Storage → `rechenfix-stats` → Open in Upstash → Data Browser,
Suchmuster `social:errors:*`. Der Store ist über die persönliche Upstash-Konsole nicht
erreichbar.

---

## Kontingent und Zyklusgrenze

**Die Zyklusgrenze liegt nicht am Monatsersten.** Der 402 vom 02.08. beweist es: An Tag zwei
eines Kalendermonats kann ein Monatskontingent nicht erschöpft sein. PostPeer rechnete also ab
Registrierungsdatum ab. Für bundle.social ist dieselbe Annahme zu treffen — Registrierung
Anfang August, Zyklusgrenze folglich um den **06./07. September**, nicht am 01.

**Stand 08.08.: 2 von 20 verbraucht** (Testlauf 06.08. und erster Post 08.08.).

Hochrechnung bei striktem Zwei-Tage-Takt ab `TIKTOK_TAKT_START = 2026-08-06`:

| Zyklusende | Posts im Takt | gesamt | Puffer |
|---|---|---|---|
| 06.09. | 15 | 16 von 20 | 4 |
| 07.09. | 16 | 17 von 20 | 3 |

Das reicht, lässt aber nur Raum für **zwei bis drei zusätzliche Handtests**. Wer mehr testet,
verbraucht den Puffer und riskiert einen 402 gegen Zyklusende — der dann fälschlich als
Anbieterproblem gelesen werden könnte.

**Erwartungswert für den 20.08.: rund 8 verbrauchte Posts.** Deutlich mehr heißt, die
Taktlogik greift nicht. Deutlich weniger heißt, Posts sind ausgefallen, ohne dass ein Fehler
geloggt wurde — Fall vier der Tabelle.

---

## Was am 20.08. konkret zu tun ist

1. Zählerstand bei bundle.social ablesen und gegen den Erwartungswert von rund 8 halten.
2. Im Data Browser `social:errors:*` prüfen und jeden TikTok-Eintrag seit dem 08.08. den drei
   Fällen zuordnen.
3. Stichprobe auf @rechenfix: Sind die Posts der Takttage tatsächlich sichtbar?
4. Erst wenn Fall eins auftritt — Cap — beginnt die Anbietersuche. Kriterien unverändert:
   Cap-Verhalten, Quota, AVV verfügbar, identifizierbare Firmierung, Preis. Kandidaten immer
   zuerst parallel im Gratistarif testen.

Bei Fall zwei (402) ist die Reihenfolge umgekehrt: erst Takt und Testverbrauch prüfen, dann
Tarif — ein Anbieterwechsel würde daran nichts ändern, weil die 20er-Grenze bei allen
untersuchten Gratistarifen gilt.
