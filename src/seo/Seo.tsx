import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { metaForPath, type PageMeta } from './meta';

/**
 * Met à jour <head> côté client lors de la navigation SPA.
 * Au prérendu, scripts/prerender.mjs injecte les mêmes balises dans le HTML statique.
 */
export function applyMeta(meta: PageMeta) {
  if (typeof document === 'undefined') return;
  document.title = meta.title;
  const set = (selector: string, attr: string, value: string, create: () => HTMLElement) => {
    let el = document.head.querySelector<HTMLElement>(selector);
    if (!el) {
      el = create();
      document.head.appendChild(el);
    }
    el.setAttribute(attr, value);
  };
  const metaTag = (name: string, value: string, prop = false) =>
    set(`meta[${prop ? 'property' : 'name'}="${name}"]`, 'content', value, () => {
      const m = document.createElement('meta');
      m.setAttribute(prop ? 'property' : 'name', name);
      return m;
    });
  metaTag('description', meta.description);
  metaTag('og:title', meta.title, true);
  metaTag('og:description', meta.description, true);
  metaTag('og:url', meta.canonical, true);
  if (meta.ogImage) metaTag('og:image', meta.ogImage, true);
  metaTag('twitter:title', meta.title);
  metaTag('twitter:description', meta.description);
  metaTag('robots', meta.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');
  set('link[rel="canonical"]', 'href', meta.canonical, () => {
    const l = document.createElement('link');
    l.setAttribute('rel', 'canonical');
    return l;
  });
  document.head.querySelectorAll('script[data-seo-jsonld]').forEach((n) => n.remove());
  for (const ld of meta.jsonLd ?? []) {
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.setAttribute('data-seo-jsonld', '1');
    s.text = JSON.stringify(ld);
    document.head.appendChild(s);
  }
}

export default function Seo({ meta }: { meta?: PageMeta }) {
  const { pathname } = useLocation();
  useEffect(() => {
    applyMeta(meta ?? metaForPath(pathname));
  }, [pathname, meta]);
  return null;
}
