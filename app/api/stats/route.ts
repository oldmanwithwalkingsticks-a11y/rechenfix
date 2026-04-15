import { NextResponse } from 'next/server';
import { redis, KEYS } from '@/lib/redis';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

interface ClickEntry {
  p: string;
  c: string;
  r: string;
  t: number;
}

interface FeedbackEntry {
  v: 'ja' | 'nein';
  r: string;
  t: number;
}

// Upstash/Redis LPUSH+LRANGE liefert Einträge je nach Client bereits als
// deserialisierte Objekte oder als JSON-Strings — wir akzeptieren beides.
function parseEntry<T>(raw: unknown): T | null {
  if (raw && typeof raw === 'object') return raw as T;
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }
  return null;
}

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization') || '';
  const token = (authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '').trim();
  const expected = (process.env.ADMIN_STATS_PASSWORD || '').trim();

  // Diagnose-Modus: /api/stats?diag=1 — verrät nur, ob die Env-Variable gesetzt ist
  const { searchParams } = new URL(req.url);
  if (searchParams.get('diag') === '1') {
    return NextResponse.json({
      envSet: expected.length > 0,
      envLength: expected.length,
      tokenLength: token.length,
      match: expected.length > 0 && token === expected,
    });
  }

  if (!expected || token !== expected) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  try {
    const [clicksRaw, feedbacksRaw] = await Promise.all([
      redis.lrange(KEYS.clicks, 0, -1),
      redis.lrange(KEYS.feedbacks, 0, -1),
    ]);

    const clicks = (clicksRaw as unknown[])
      .map(r => parseEntry<ClickEntry>(r))
      .filter((c): c is ClickEntry => !!c);

    const feedbacks = (feedbacksRaw as unknown[])
      .map(r => parseEntry<FeedbackEntry>(r))
      .filter((f): f is FeedbackEntry => !!f);

    return NextResponse.json({ clicks, feedbacks });
  } catch {
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}

// DELETE: löscht alle Einträge eines bestimmten Monats (YYYY-MM)
export async function DELETE(req: Request) {
  const authHeader = req.headers.get('authorization') || '';
  const token = (authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '').trim();
  const expected = (process.env.ADMIN_STATS_PASSWORD || '').trim();

  if (!expected || token !== expected) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const monat = searchParams.get('monat');
  if (!monat || !/^\d{4}-\d{2}$/.test(monat)) {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  }

  try {
    const [clicksRaw, feedbacksRaw] = await Promise.all([
      redis.lrange(KEYS.clicks, 0, -1),
      redis.lrange(KEYS.feedbacks, 0, -1),
    ]);

    const imMonat = (t: number) => {
      const d = new Date(t);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      return key === monat;
    };

    const keepClicks = (clicksRaw as unknown[])
      .map(r => parseEntry<ClickEntry>(r))
      .filter((c): c is ClickEntry => !!c && !imMonat(c.t));
    const keepFeedbacks = (feedbacksRaw as unknown[])
      .map(r => parseEntry<FeedbackEntry>(r))
      .filter((f): f is FeedbackEntry => !!f && !imMonat(f.t));

    // Neu schreiben: alte Liste löschen, dann RPUSH in Originalreihenfolge
    // (LRANGE 0..-1 liefert neueste zuerst; für LPUSH-History wieder umdrehen)
    await redis.del(KEYS.clicks);
    if (keepClicks.length > 0) {
      await redis.rpush(KEYS.clicks, ...keepClicks.map(c => JSON.stringify(c)));
    }
    await redis.del(KEYS.feedbacks);
    if (keepFeedbacks.length > 0) {
      await redis.rpush(KEYS.feedbacks, ...keepFeedbacks.map(f => JSON.stringify(f)));
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
