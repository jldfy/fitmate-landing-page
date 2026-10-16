import { SITE, abs } from './site';
import { SPORTS, getSport, type Sport } from '../data/sports';
import { ZONES, getZone, type Zone } from '../data/zones';
import { EVENTS, upcomingEvents, getEvent, LEVEL_LABEL, type FitmatesEvent } from '../data/events';

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  /** noindex pour les pages privées (admin) ou vides */
  noindex?: boolean;
  jsonLd?: Record<string, unknown>[];
  lastmod?: string;
}

export function organizationLd() {
  return {
    '@type': 'Organization',
    '@id': `${SITE.url}/#organization`,
    name: SITE.name,
    url: SITE.url,
    logo: SITE.logo,
    email: SITE.email,
    foundingLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: 'Paris', addressCountry: 'FR' } },
    areaServed: { '@type': 'AdministrativeArea', name: 'Île-de-France, France' },
    sameAs: [SITE.ios, SITE.android, SITE.facebook],
  };
}

export function appLd() {
  return {
    '@type': ['SoftwareApplication', 'MobileApplication'],
    '@id': `${SITE.url}/#app`,
    name: SITE.name,
    alternateName: 'Fitmates – Sports Social',
    description:
      'Fitmates est une application française gratuite (iOS, Android, web) pour trouver des partenaires sportifs et rejoindre ou organiser des événements sportifs près de chez soi, sport par sport et zone par zone. Lancée avec la randonnée en Île-de-France.',
    applicationCategory: 'HealthApplication',
    applicationSubCategory: 'Sport social, événements sportifs',
    operatingSystem: 'iOS, Android, Web',
    inLanguage: 'fr',
    url: SITE.url,
    installUrl: SITE.ios,
    downloadUrl: [SITE.ios, SITE.android],
    screenshot: [abs('/screenshot_homescreen.png'), abs('/screenshot_event_details.png'), abs('/screenshot_join_event.png')],
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    featureList: [
      'Découverte d’événements sportifs locaux par sport et par zone',
      'Création d’une sortie en langage naturel (IA)',
      'Chat de groupe par événement',
      'Suivi des amis et de leurs activités',
      'Profil avec statistiques et sports préférés',
    ],
    author: { '@id': `${SITE.url}/#organization` },
    publisher: { '@id': `${SITE.url}/#organization` },
  };
}

export function websiteLd() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    inLanguage: 'fr',
    publisher: { '@id': `${SITE.url}/#organization` },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function faqLd(faq: { q: string; a: string }[]) {
  if (!faq.length) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function eventLd(e: FitmatesEvent) {
  const sport = getSport(e.sport);
  const zone = getZone(e.zone);
  const remaining =
    e.max_participants != null && e.participants_count != null
      ? Math.max(0, e.max_participants - e.participants_count)
      : undefined;
  const status =
    e.status === 'cancelled' ? 'https://schema.org/EventCancelled' : 'https://schema.org/EventScheduled';
  return {
    '@type': 'SportsEvent',
    '@id': abs(`/evenements/${e.slug}#event`),
    name: e.title,
    description: e.description,
    sport: sport?.name ?? e.sport,
    startDate: e.start_at,
    ...(e.end_at ? { endDate: e.end_at } : {}),
    eventStatus: status,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    inLanguage: 'fr',
    url: abs(`/evenements/${e.slug}`),
    ...(e.image_url ? { image: e.image_url } : { image: SITE.ogImage }),
    location: {
      '@type': 'Place',
      name: e.location.name,
      address: {
        '@type': 'PostalAddress',
        ...(e.location.address ? { streetAddress: e.location.address } : {}),
        ...(e.location.postal_code ? { postalCode: e.location.postal_code } : {}),
        addressLocality: e.location.city,
        addressRegion: zone?.region ?? 'Île-de-France',
        addressCountry: 'FR',
      },
      ...(e.location.lat != null && e.location.lng != null
        ? { geo: { '@type': 'GeoCoordinates', latitude: e.location.lat, longitude: e.location.lng } }
        : {}),
    },
    organizer: { '@type': 'Person', name: e.organizer.display_name },
    offers: {
      '@type': 'Offer',
      url: e.app_url ?? SITE.appUrl,
      price: String(e.price_eur ?? 0),
      priceCurrency: 'EUR',
      availability: e.status === 'full' ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
      ...(e.created_at ? { validFrom: e.created_at } : {}),
    },
    isAccessibleForFree: !e.price_eur,
    ...(e.max_participants != null ? { maximumAttendeeCapacity: e.max_participants } : {}),
    ...(remaining != null ? { remainingAttendeeCapacity: remaining } : {}),
    audience: { '@type': 'Audience', audienceType: `Adultes, niveau ${LEVEL_LABEL[e.level].toLowerCase()}` },
    superEvent: {
      '@type': 'EventSeries',
      name: `${sport?.name ?? e.sport} Fitmates – ${zone?.region ?? 'Île-de-France'}`,
      url: abs(`/sport/${e.sport}`),
    },
    publisher: { '@id': `${SITE.url}/#organization` },
  };
}

function graph(items: (Record<string, unknown> | null)[]) {
  return [{ '@context': 'https://schema.org', '@graph': items.filter(Boolean) }];
}

/* ---------- Métadonnées par route ---------- */

export function homeMeta(): PageMeta {
  return {
    path: '/',
    title: 'Fitmates – Trouvez des partenaires sportifs et des événements près de chez vous',
    description:
      'Fitmates est l’application gratuite pour faire du sport à plusieurs : rejoignez ou organisez des randonnées, sorties running, vélo et plus en Île-de-France. Chat de groupe, niveaux, amis. iOS, Android et web.',
    canonical: abs('/'),
    jsonLd: graph([organizationLd(), websiteLd(), appLd()]),
  };
}

export function sportsIndexMeta(): PageMeta {
  return {
    path: '/sports',
    title: 'Tous les sports – Trouver un groupe ou un partenaire | Fitmates',
    description:
      'Randonnée, course à pied, vélo, padel, escalade, yoga… Choisissez votre sport et trouvez des sorties en groupe et des partenaires près de chez vous avec Fitmates.',
    canonical: abs('/sports'),
    jsonLd: graph([breadcrumbLd([{ name: 'Accueil', path: '/' }, { name: 'Sports', path: '/sports' }])]),
  };
}

export function sportMeta(sport: Sport): PageMeta {
  const n = upcomingEvents({ sport: sport.slug }).length;
  const liveNote = sport.live ? ` ${n > 0 ? `${n} sortie(s) à venir.` : ''}` : '';
  return {
    path: `/sport/${sport.slug}`,
    title: `${sport.name} en groupe : sorties et partenaires près de chez vous | Fitmates`,
    description: `${sport.short}${liveNote} Application gratuite, Île-de-France.`.trim(),
    canonical: abs(`/sport/${sport.slug}`),
    jsonLd: graph([
      breadcrumbLd([{ name: 'Accueil', path: '/' }, { name: 'Sports', path: '/sports' }, { name: sport.name, path: `/sport/${sport.slug}` }]),
      faqLd(sport.faq),
    ]),
  };
}

export function sportZoneMeta(sport: Sport, zone: Zone): PageMeta {
  const events = upcomingEvents({ sport: sport.slug, zone: zone.slug });
  const spots = zone.spots[sport.slug] ?? [];
  const desc =
    events.length > 0
      ? `${events.length} sortie(s) ${sport.name.toLowerCase()} à venir dans ${zone.name} : ${events
          .slice(0, 2)
          .map((e) => e.title)
          .join(', ')}. Rejoignez un groupe sur Fitmates, gratuit.`
      : `${sport.name} dans ${zone.name} (${zone.region}) : ${spots
          .slice(0, 3)
          .map((s) => s.name)
          .join(', ')}. Trouvez un groupe ou des partenaires et rejoignez une sortie avec Fitmates.`;
  return {
    path: `/sport/${sport.slug}/${zone.slug}`,
    title: `${sport.name} ${zone.slug === 'paris' ? 'à' : 'en'} ${zone.name} : groupes, sorties et partenaires | Fitmates`,
    description: desc,
    canonical: abs(`/sport/${sport.slug}/${zone.slug}`),
    jsonLd: graph([
      breadcrumbLd([
        { name: 'Accueil', path: '/' },
        { name: 'Sports', path: '/sports' },
        { name: sport.name, path: `/sport/${sport.slug}` },
        { name: zone.name, path: `/sport/${sport.slug}/${zone.slug}` },
      ]),
      faqLd(sport.faq.slice(0, 3)),
      ...events.slice(0, 20).map(eventLd),
    ]),
  };
}

export function eventsIndexMeta(): PageMeta {
  const n = upcomingEvents().length;
  return {
    path: '/evenements',
    title: 'Événements sportifs à venir en Île-de-France | Fitmates',
    description: `${n > 0 ? `${n} sorties sportives à venir` : 'Sorties sportives à venir'} : randonnées, running, vélo et plus, organisées par la communauté Fitmates. Rejoignez en un clic.`,
    canonical: abs('/evenements'),
    jsonLd: graph([breadcrumbLd([{ name: 'Accueil', path: '/' }, { name: 'Événements', path: '/evenements' }])]),
  };
}

export function eventMeta(e: FitmatesEvent): PageMeta {
  const sport = getSport(e.sport);
  const zone = getZone(e.zone);
  const day = new Date(e.start_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', timeZone: 'Europe/Paris' });
  return {
    path: `/evenements/${e.slug}`,
    title: `${e.title} – ${day} | ${sport?.name ?? ''} ${zone?.name ?? ''} | Fitmates`.replace(/\s+/g, ' '),
    description: `${e.description.slice(0, 150)}${e.description.length > 150 ? '…' : ''} Niveau ${LEVEL_LABEL[e.level].toLowerCase()}, rendez-vous ${e.location.name}, ${e.location.city}.`,
    canonical: abs(`/evenements/${e.slug}`),
    ogImage: e.image_url ?? undefined,
    lastmod: e.updated_at,
    jsonLd: graph([
      breadcrumbLd([
        { name: 'Accueil', path: '/' },
        { name: 'Événements', path: '/evenements' },
        { name: e.title, path: `/evenements/${e.slug}` },
      ]),
      eventLd(e),
    ]),
  };
}

export function organiserMeta(): PageMeta {
  return {
    path: '/organiser',
    title: 'Organiser une sortie sportive ou un run club : outils gratuits | Fitmates',
    description:
      'Coach, run club, association, groupe d’amis : publiez vos sorties, gérez les inscriptions et le chat, recrutez des participants près de chez vous. Gratuit pour les organisateurs.',
    canonical: abs('/organiser'),
    jsonLd: graph([
      breadcrumbLd([{ name: 'Accueil', path: '/' }, { name: 'Organiser', path: '/organiser' }]),
      faqLd([
        { q: 'Est-ce gratuit pour les organisateurs ?', a: 'Oui. Créer un événement, gérer les inscriptions et discuter avec les participants est gratuit, sans limite de nombre d’événements.' },
        { q: 'Puis-je faire payer ma séance ?', a: 'Les coachs et associations peuvent indiquer un prix sur la fiche de l’événement. Les paiements intégrés arrivent progressivement.' },
        { q: 'Comment trouver des participants ?', a: 'Votre sortie apparaît dans le fil local des membres de votre zone et de votre sport, et sur une page publique indexée par Google que vous pouvez partager.' },
      ]),
    ]),
  };
}

export function notFoundMeta(path: string): PageMeta {
  return { path, title: 'Page introuvable | Fitmates', description: 'Cette page n’existe pas.', canonical: abs(path), noindex: true };
}

/** Résout les métadonnées pour n'importe quelle URL (client et prérendu). */
export function metaForPath(pathname: string): PageMeta {
  const p = pathname.replace(/\/+$/, '') || '/';
  if (p === '/') return homeMeta();
  if (p === '/sports') return sportsIndexMeta();
  if (p === '/evenements') return eventsIndexMeta();
  if (p === '/organiser') return organiserMeta();
  let m = p.match(/^\/sport\/([^/]+)\/([^/]+)$/);
  if (m) {
    const s = getSport(m[1]);
    const z = getZone(m[2]);
    if (s && z) return sportZoneMeta(s, z);
    return notFoundMeta(p);
  }
  m = p.match(/^\/sport\/([^/]+)$/);
  if (m) {
    const s = getSport(m[1]);
    return s ? sportMeta(s) : notFoundMeta(p);
  }
  m = p.match(/^\/evenements\/([^/]+)$/);
  if (m) {
    const e = getEvent(m[1]);
    return e ? eventMeta(e) : notFoundMeta(p);
  }
  return notFoundMeta(p);
}

/** Vrai si une page sport × zone mérite d'exister (évite les pages « doorway » vides). */
export function sportZoneHasContent(sport: Sport, zone: Zone): boolean {
  return (zone.spots[sport.slug]?.length ?? 0) > 0 || upcomingEvents({ sport: sport.slug, zone: zone.slug }).length > 0;
}

/** Liste des routes publiques à prérendre et à mettre dans le sitemap. */
export function publicRoutes(): { path: string; lastmod?: string; priority: number }[] {
  const routes: { path: string; lastmod?: string; priority: number }[] = [
    { path: '/', priority: 1 },
    { path: '/sports', priority: 0.8 },
    { path: '/evenements', priority: 0.9 },
    { path: '/organiser', priority: 0.8 },
  ];
  for (const s of SPORTS) {
    routes.push({ path: `/sport/${s.slug}`, priority: s.live ? 0.9 : 0.6 });
    for (const z of ZONES) {
      if (sportZoneHasContent(s, z)) routes.push({ path: `/sport/${s.slug}/${z.slug}`, priority: s.live ? 0.8 : 0.5 });
    }
  }
  for (const e of EVENTS) {
    routes.push({ path: `/evenements/${e.slug}`, lastmod: e.updated_at, priority: 0.7 });
  }
  return routes;
}
