import generated from './events.generated.json';

export type EventLevel = 'debutant' | 'intermediaire' | 'avance' | 'tous';
export type EventStatus = 'open' | 'full' | 'cancelled' | 'past';

export interface EventLocation {
  name: string;
  address?: string | null;
  city: string;
  postal_code?: string | null;
  department?: string | null;
  lat?: number | null;
  lng?: number | null;
}

export interface EventOrganizer {
  id: string;
  display_name: string;
  avatar_url?: string | null;
  is_coach?: boolean;
  events_organized?: number;
}

export interface FitmatesEvent {
  id: string;
  slug: string;
  title: string;
  sport: string;
  description: string;
  start_at: string;
  end_at?: string | null;
  timezone?: string;
  zone: string;
  location: EventLocation;
  level: EventLevel;
  distance_km?: number | null;
  elevation_m?: number | null;
  duration_min?: number | null;
  max_participants?: number | null;
  participants_count?: number | null;
  price_eur?: number | null;
  organizer: EventOrganizer;
  status: EventStatus;
  approval_mode?: 'auto' | 'manual';
  app_url?: string | null;
  image_url?: string | null;
  created_at?: string;
  updated_at?: string;
}

export const EVENTS: FitmatesEvent[] = (generated as FitmatesEvent[]).filter(
  (e) => e && e.slug && e.start_at,
);

export const LEVEL_LABEL: Record<EventLevel, string> = {
  debutant: 'Débutant',
  intermediaire: 'Intermédiaire',
  avance: 'Sportif',
  tous: 'Tous niveaux',
};

export function isUpcoming(e: FitmatesEvent, now = new Date()): boolean {
  return e.status !== 'cancelled' && new Date(e.start_at).getTime() >= now.getTime() - 3 * 3600 * 1000;
}

export function upcomingEvents(filter?: { sport?: string; zone?: string }, now = new Date()): FitmatesEvent[] {
  return EVENTS.filter((e) => isUpcoming(e, now))
    .filter((e) => (filter?.sport ? e.sport === filter.sport : true))
    .filter((e) => (filter?.zone ? e.zone === filter.zone : true))
    .sort((a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime());
}

export function getEvent(slug: string | undefined): FitmatesEvent | undefined {
  return slug ? EVENTS.find((e) => e.slug === slug) : undefined;
}

export function formatEventDate(iso: string, tz = 'Europe/Paris'): string {
  try {
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: tz,
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function formatEventDay(iso: string, tz = 'Europe/Paris'): string {
  try {
    return new Intl.DateTimeFormat('fr-FR', { weekday: 'short', day: 'numeric', month: 'short', timeZone: tz }).format(
      new Date(iso),
    );
  } catch {
    return iso;
  }
}
