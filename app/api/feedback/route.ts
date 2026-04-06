import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  let body: { typ?: string; felder?: Record<string, unknown>; email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage' }, { status: 400 });
  }

  const { typ, felder, email } = body;

  if (!typ || !felder) {
    return NextResponse.json({ error: 'typ und felder sind erforderlich' }, { status: 400 });
  }

  const timestamp = new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' });
  const userAgent = request.headers.get('user-agent') || 'Unbekannt';

  const felderText = Object.entries(felder)
    .map(([key, value]) => `${key}: ${typeof value === 'object' ? JSON.stringify(value) : String(value)}`)
    .join('\n');

  const textBody = [
    `Feedback-Typ: ${typ}`,
    `Zeitpunkt: ${timestamp}`,
    email ? `E-Mail: ${email}` : null,
    '',
    '--- Felder ---',
    felderText,
    '',
    '--- Meta ---',
    `User-Agent: ${userAgent}`,
  ]
    .filter(line => line !== null)
    .join('\n');

  const apiKey = process.env.RESEND_API_KEY;

  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: 'Rechenfix Feedback <feedback@rechenfix.de>',
        to: 'info@rechenfix.de',
        subject: `[Rechenfix Feedback] Typ: ${typ}`,
        text: textBody,
      });
    } catch (err) {
      console.log('[Feedback] Resend-Fehler, Fallback auf Log:', err);
      console.log('[Feedback]', textBody);
    }
  } else {
    console.log('[Feedback] Kein RESEND_API_KEY, Fallback auf Log:');
    console.log('[Feedback]', textBody);
  }

  return NextResponse.json({ success: true });
}
