import Link from 'next/link';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import AuthorBio from '@/components/AuthorBio';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }]} />

      <article>{children}</article>

      <div className="mt-12">
        <AuthorBio />
      </div>

      <hr className="my-8 border-gray-200 dark:border-gray-700" />
      <Link
        href="/blog"
        className="text-primary-600 dark:text-primary-400 underline underline-offset-2 hover:no-underline"
      >
        ← Alle Artikel
      </Link>
    </div>
  );
}
