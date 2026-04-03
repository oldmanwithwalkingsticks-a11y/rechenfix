import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 text-center">
      <h1 className="text-6xl font-extrabold text-primary-500 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Diese Seite wurde nicht gefunden.</p>
      <Link href="/" className="btn-primary">
        Zur Startseite
      </Link>
    </div>
  );
}
