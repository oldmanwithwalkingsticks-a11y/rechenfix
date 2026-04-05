import { NextRequest, NextResponse } from 'next/server';

// In-Memory Rate Limiting (pro IP, max 10/min)
const rateLimit = new Map<string, { count: number; reset: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.reset) {
    rateLimit.set(ip, { count: 1, reset: now + 60_000 });
    return true;
  }

  if (entry.count >= 10) return false;
  entry.count++;
  return true;
}

// Alte Einträge periodisch aufräumen
setInterval(() => {
  const now = Date.now();
  rateLimit.forEach((entry, ip) => {
    if (now > entry.reset) rateLimit.delete(ip);
  });
}, 60_000);

const SYSTEM_PROMPT = `Du bist der KI-Assistent von rechenfix.de. Erkläre das Ergebnis einer Berechnung verständlich, persönlich und auf Deutsch. Sprich den Nutzer mit 'Sie' an. Halte dich kurz (max 150 Wörter). Gib 1-2 konkrete, praktische Tipps. Keine Floskeln, kein Smalltalk, direkt zum Punkt. Verwende keine Markdown-Formatierung.`;

export async function POST(request: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API nicht konfiguriert' }, { status: 503 });
  }

  // Rate Limiting
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Zu viele Anfragen. Bitte warten Sie eine Minute.' },
      { status: 429 },
    );
  }

  let body: { rechner_name?: string; eingaben?: Record<string, unknown>; ergebnis?: Record<string, unknown> };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage' }, { status: 400 });
  }

  const { rechner_name, eingaben, ergebnis } = body;
  if (!rechner_name || !ergebnis) {
    return NextResponse.json({ error: 'Fehlende Parameter' }, { status: 400 });
  }

  const userMessage = `Rechner: ${rechner_name}\n\nEingaben: ${JSON.stringify(eingaben, null, 2)}\n\nErgebnis: ${JSON.stringify(ergebnis, null, 2)}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 500,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: userMessage }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Anthropic API error:', response.status, errText);
      return NextResponse.json(
        { error: 'KI-Erklärung derzeit nicht verfügbar' },
        { status: 502 },
      );
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || 'Keine Erklärung verfügbar.';

    return NextResponse.json({ explanation: text });
  } catch (err) {
    console.error('Explain API error:', err);
    return NextResponse.json(
      { error: 'KI-Erklärung derzeit nicht verfügbar' },
      { status: 502 },
    );
  }
}
