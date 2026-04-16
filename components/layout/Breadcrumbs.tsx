import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-500 dark:text-gray-400 mb-6">
      <ol className="flex flex-wrap items-center gap-1">
        <li>
          <Link href="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            Startseite
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            <span className="mx-1">/</span>
            {item.href ? (
              <Link href={item.href} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-700 dark:text-gray-200 font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
