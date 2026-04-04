'use client';

import { useRef, useState, useEffect, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  rootMargin?: string;
}

export default function LazySection({ children, className, rootMargin = '200px' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [sichtbar, setSichtbar] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSichtbar(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className}>
      {sichtbar ? children : <div style={{ minHeight: 200 }} />}
    </div>
  );
}
