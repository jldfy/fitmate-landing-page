import type { ReactNode } from 'react';
import SiteNav from './SiteNav';
import Footer from './Footer';
import Seo from '../seo/Seo';
import type { PageMeta } from '../seo/meta';

export default function PageShell({ meta, children }: { meta?: PageMeta; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <Seo meta={meta} />
      <SiteNav solid />
      <main className="pt-24 pb-16">{children}</main>
      <Footer />
    </div>
  );
}

export function Breadcrumb({ items }: { items: { name: string; to?: string }[] }) {
  return (
    <nav aria-label="Fil d’Ariane" className="text-sm text-gray-500 mb-6">
      <ol className="flex flex-wrap gap-2">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2">
            {it.to ? (
              <a href={it.to} className="hover:text-orange-500">
                {it.name}
              </a>
            ) : (
              <span className="text-gray-800">{it.name}</span>
            )}
            {i < items.length - 1 && <span aria-hidden="true">›</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
