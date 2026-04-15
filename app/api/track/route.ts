import { NextResponse } from 'next/server';
import { redis, KEYS } from '@/lib/redis';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

// Maximale Anzahl gespeicherter Einträge (älteste fallen raus)
const MAX_CLICKS = 20000;
const MAX_FEEDBACKS = 20000;

interface TrackClickBody {
  type: 'click';
  programId: string;
  context?: string;
  rechner: string;
}

interface TrackFeedbackBody {
  type: 'feedback';
  feedback: 'ja' | 'nein';
  rechner: string;
}

type TrackBody = TrackClickBody | TrackFeedbackBody;

function isString(v: unknown): v is string {
  return typeof v === 'string' && v.length > 0 && v.length < 500;
}

export async function POST(req: Request) {
  let body: TrackBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    if (body.type === 'click') {
      if (!isString(body.programId) || !isString(body.rechner)) {
        return NextResponse.json({ ok: false }, { status: 400 });
      }
      const entry = {
        p: body.programId,
        c: typeof body.context === 'string' ? body.context.slice(0, 100) : '',
        r: body.rechner.slice(0, 200),
        t: Date.now(),
      };
      await redis.lpush(KEYS.clicks, JSON.stringify(entry));
      await redis.ltrim(KEYS.clicks, 0, MAX_CLICKS - 1);
      return NextResponse.json({ ok: true });
    }

    if (body.type === 'feedback') {
      if ((body.feedback !== 'ja' && body.feedback !== 'nein') || !isString(body.rechner)) {
        return NextResponse.json({ ok: false }, { status: 400 });
      }
      const entry = {
        v: body.feedback,
        r: body.rechner.slice(0, 200),
        t: Date.now(),
      };
      await redis.lpush(KEYS.feedbacks, JSON.stringify(entry));
      await redis.ltrim(KEYS.feedbacks, 0, MAX_FEEDBACKS - 1);
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: false }, { status: 400 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
