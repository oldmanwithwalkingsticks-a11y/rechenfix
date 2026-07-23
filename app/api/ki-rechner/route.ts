import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';
import { KI_TOOLS, dispatchTool } from '@/lib/ki-rechner/tools';

// Kein Edge-Runtime: läuft als Node-Function (Tool-Loop kann mehrere Runden brauchen).
export const dynamic = 'force-dynamic';

const SYSTEM = `Du bist der Rechen-Assistent von rechenfix.de. Für JEDE Rechenaufgabe MUSST du das passende Tool aufrufen und darfst Zahlen NIEMALS selbst schätzen oder ausrechnen.

Die genauen Ergebniszahlen werden dem Nutzer bereits in einer separaten Tabelle angezeigt. Wiederhole daher die Zahlen NICHT als eigene Tabelle und liste sie nicht noch einmal einzeln auf. Gib stattdessen eine kurze, freundliche Einordnung in 1–3 Sätzen (was das Ergebnis praktisch bedeutet). Nenne höchstens die eine wichtigste Kennzahl im Fließtext, wenn es den Satz natürlicher macht.

Erfinde KEINE gesetzlichen Detailbegründungen (konkrete Freibeträge, Steuersätze, Prozentgrenzen, Paragraphen o. Ä.), die nicht aus dem Tool-Ergebnis stammen — solche Details stehen im verlinkten Detailrechner. Bleibe bei allgemeiner, korrekter Einordnung.

Fehlt ein Wert, der das Ergebnis wirklich verändert, frage NUR nach diesen 1–2 entscheidenden Angaben — kurz und konkret. Für unwichtige Nebenparameter nimm sinnvolle Standardwerte an und nenne diese Annahme transparent in einem Halbsatz (z. B. „angenommen: ohne Sondertilgung"). Stelle KEINE langen Fragelisten.

Für Aufgaben ohne passendes Tool: sage ehrlich, dass es dafür keinen exakten Rechner gibt. Antworte knapp, auf Deutsch.`;

// Anthropic liefert content als Array von Blöcken (text / tool_use / ...).
interface AnthropicBlock {
  type: string;
  [key: string]: unknown;
}

export async function POST(req: Request) {
  // 1. Rate-Limit: max 20 Anfragen/Stunde pro IP
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  const key = `rechenfix:kirl:${ip}`;
  const n = await redis.incr(key);
  if (n === 1) await redis.expire(key, 3600);
  if (n > 20) {
    return NextResponse.json(
      { error: 'Zu viele Anfragen. Bitte in einer Stunde erneut.' },
      { status: 429 },
    );
  }

  // 2. Eingabe
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 });
  }
  const frage = (body as { frage?: unknown } | null)?.frage;
  if (typeof frage !== 'string' || frage.trim().length === 0 || frage.length > 500) {
    return NextResponse.json(
      { error: 'Bitte eine Rechenfrage stellen (max. 500 Zeichen).' },
      { status: 400 },
    );
  }

  // 3. API-Key
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API nicht konfiguriert.' }, { status: 500 });
  }

  const tools = KI_TOOLS.map((t) => ({
    name: t.name,
    description: t.description,
    input_schema: t.input_schema,
  }));

  const messages: Array<{ role: 'user' | 'assistant'; content: unknown }> = [
    { role: 'user', content: frage },
  ];
  let letzterSlug: string | null = null;
  let letzteZeilen: unknown[] | null = null;   // NEU: Anzeige-Zeilen des letzten erfolgreichen Tools

  try {
    // 6. Tool-Loop (max 4 Runden Schutz gegen Endlosschleife)
    for (let runde = 0; runde < 4; runde++) {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1024,
          system: SYSTEM,
          tools,
          messages,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error('Anthropic API error:', res.status, errText);
        return NextResponse.json(
          { error: 'KI-Rechner derzeit nicht verfügbar.' },
          { status: 502 },
        );
      }

      const data = await res.json();
      messages.push({ role: 'assistant', content: data.content });

      if (data.stop_reason === 'tool_use') {
        const toolResults: unknown[] = [];
        const blocks: AnthropicBlock[] = Array.isArray(data.content) ? data.content : [];
        for (const block of blocks) {
          if (block.type !== 'tool_use') continue;
          const dispatch = dispatchTool(String(block.name), block.input);
          if (dispatch.ok) {
            if (dispatch.zeilen.length > 0) {
              letzterSlug = dispatch.slug;
              letzteZeilen = dispatch.zeilen;
            }
            toolResults.push({
              type: 'tool_result',
              tool_use_id: block.id,
              content: JSON.stringify(dispatch.result),
              is_error: false,
            });
          } else {
            toolResults.push({
              type: 'tool_result',
              tool_use_id: block.id,
              content: dispatch.error,
              is_error: true,
            });
          }
        }
        messages.push({ role: 'user', content: toolResults });
        continue; // nächste Runde
      }

      break; // end_turn o.ä. → Loop beenden
    }

    // 7. Finale Antwort: Text aus letztem Assistant-Turn zusammenfügen
    const letzterAssistant = [...messages].reverse().find((m) => m.role === 'assistant');
    let antwort = '';
    if (letzterAssistant && Array.isArray(letzterAssistant.content)) {
      antwort = (letzterAssistant.content as AnthropicBlock[])
        .filter((b) => b.type === 'text')
        .map((b) => (typeof b.text === 'string' ? b.text : ''))
        .join('')
        .trim();
    }
    if (!antwort) {
      antwort = 'Dazu konnte ich leider keine Antwort erzeugen. Bitte formulieren Sie Ihre Rechenfrage etwas konkreter.';
    }

    return NextResponse.json({ antwort, rechnerSlug: letzterSlug, ergebnis: letzteZeilen });
  } catch (err) {
    console.error('KI-Rechner error:', err);
    return NextResponse.json(
      { error: 'KI-Rechner derzeit nicht verfügbar.' },
      { status: 502 },
    );
  }
}
