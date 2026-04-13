import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  let body: { monat: string; csv: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage' }, { status: 400 });
  }

  const { monat, csv } = body;
  if (!monat || !csv) {
    return NextResponse.json({ error: 'monat und csv sind erforderlich' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log('[Monatsbericht] Kein RESEND_API_KEY');
    return NextResponse.json({ error: 'E-Mail nicht konfiguriert' }, { status: 500 });
  }

  try {
    const resend = new Resend(apiKey);
    const csvBuffer = Buffer.from(csv, 'utf-8');

    await resend.emails.send({
      from: 'Rechenfix Stats <feedback@rechenfix.de>',
      to: 'info@rechenfix.de',
      subject: `[Rechenfix] Monatsbericht ${monat}`,
      text: `Anbei der monatliche Statistik-Bericht für ${monat}.\n\nDer Bericht enthält alle Affiliate-Klicks und Feedback-Daten des Monats.\n\nViele Grüße,\nRechenfix`,
      attachments: [
        {
          filename: `rechenfix-bericht-${monat}.csv`,
          content: csvBuffer,
        },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Monatsbericht] Fehler:', err);
    return NextResponse.json({ error: 'E-Mail konnte nicht gesendet werden' }, { status: 500 });
  }
}
