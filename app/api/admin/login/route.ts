import { NextResponse } from 'next/server';
import {
  ADMIN_COOKIE_NAME,
  cookieOptionen,
  erzeugeSitzung,
  istKonfiguriert,
  pruefeKennwort,
} from '@/lib/admin-session';

/**
 * Anmeldung für den internen Admin-Bereich (Welle S1).
 *
 * Das Kennwort wird hier einmal entgegengenommen, serverseitig gegen
 * `ADMIN_STATS_PASSWORD` geprüft und danach verworfen. Zurück geht nur ein
 * `HttpOnly`-Cookie mit einem signierten Sitzungskennzeichen.
 *
 * Das eingegebene Kennwort wird NICHT protokolliert — weder bei Erfolg noch bei
 * Misserfolg. Sonst wäre es nur aus dem Sitzungsspeicher in die Server-Logs
 * umgezogen.
 */

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  if (!istKonfiguriert()) {
    return NextResponse.json({ error: 'nicht_konfiguriert' }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 });
  }

  const passwort =
    typeof body === 'object' && body !== null && typeof (body as { passwort?: unknown }).passwort === 'string'
      ? (body as { passwort: string }).passwort
      : '';

  if (!(await pruefeKennwort(passwort))) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, await erzeugeSitzung(), cookieOptionen());
  return res;
}
