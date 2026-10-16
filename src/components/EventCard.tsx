import { Link } from 'react-router-dom';
import { CalendarDays, MapPin, Users, Mountain } from 'lucide-react';
import { formatEventDate, LEVEL_LABEL, type FitmatesEvent } from '../data/events';
import { getSport } from '../data/sports';

export default function EventCard({ event }: { event: FitmatesEvent }) {
  const sport = getSport(event.sport);
  const remaining =
    event.max_participants != null && event.participants_count != null
      ? Math.max(0, event.max_participants - event.participants_count)
      : null;
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 hover:border-orange-300 hover:shadow-lg transition-all">
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-orange-600 mb-2">
        <span>{sport?.name ?? event.sport}</span>
        <span className="rounded-full bg-orange-50 px-2 py-0.5 text-orange-700 normal-case tracking-normal">
          {LEVEL_LABEL[event.level]}
        </span>
      </div>
      <h3 className="text-lg font-bold text-gray-900 leading-snug">
        <Link to={`/evenements/${event.slug}`} className="hover:text-orange-600">
          {event.title}
        </Link>
      </h3>
      <dl className="mt-3 space-y-1.5 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-orange-500" aria-hidden="true" />
          <dd>
            <time dateTime={event.start_at}>{formatEventDate(event.start_at, event.timezone)}</time>
          </dd>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-orange-500" aria-hidden="true" />
          <dd>
            {event.location.name}, {event.location.city}
          </dd>
        </div>
        {(event.distance_km || event.elevation_m) && (
          <div className="flex items-center gap-2">
            <Mountain className="w-4 h-4 text-orange-500" aria-hidden="true" />
            <dd>
              {event.distance_km ? `${event.distance_km} km` : ''}
              {event.distance_km && event.elevation_m ? ' · ' : ''}
              {event.elevation_m ? `${event.elevation_m} m D+` : ''}
            </dd>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-orange-500" aria-hidden="true" />
          <dd>
            {event.participants_count ?? 0} inscrit{(event.participants_count ?? 0) > 1 ? 's' : ''}
            {remaining != null ? ` · ${remaining} place${remaining > 1 ? 's' : ''} restante${remaining > 1 ? 's' : ''}` : ''}
          </dd>
        </div>
      </dl>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-gray-500">Par {event.organizer.display_name}</span>
        <Link to={`/evenements/${event.slug}`} className="text-sm font-semibold text-orange-600 hover:text-orange-700">
          Voir la sortie →
        </Link>
      </div>
    </article>
  );
}
