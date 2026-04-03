import Link from 'next/link';
import { kategorien } from '@/lib/rechner-config';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-3xl font-extrabold text-primary-500">Rechen</span>
          <span className="text-3xl font-extrabold text-accent-500">fix</span>
          <span className="text-sm text-gray-400 hidden sm:inline">.de</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {kategorien.map(k => (
            <Link
              key={k.slug}
              href={`/${k.slug}`}
              className="text-gray-600 hover:text-primary-500 font-medium transition-colors"
            >
              {k.icon} {k.name}
            </Link>
          ))}
        </nav>
        <MobileMenu />
      </div>
    </header>
  );
}

function MobileMenu() {
  return (
    <details className="md:hidden relative">
      <summary className="list-none cursor-pointer p-2">
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </summary>
      <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 p-4 min-w-[200px]">
        {kategorien.map(k => (
          <Link
            key={k.slug}
            href={`/${k.slug}`}
            className="block py-2 text-gray-600 hover:text-primary-500 font-medium"
          >
            {k.icon} {k.name}
          </Link>
        ))}
      </div>
    </details>
  );
}
