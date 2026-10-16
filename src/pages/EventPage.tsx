import { Link, useParams } from 'react-router-dom';
import { CalendarDays, MapPin, Users, Mountain, Clock, ShieldCheck } from 'lucide-react';
import PageShell, { Breadcrumb } from '../components/PageShell';
import EventCard from '../components/EventCard';
import NotFoundPage from './NotFoundPage';
import { getEvent, upcomingEvents, formatEventDate, LEVEL_LABEL } from '../data/events';
import { getSport } from '../data/sports';
import { getZone } from '../data/zones';
import { eventMeta } from '../seo/meta';
import { SITE } from '../seo/site';

export default function EventPage() {
  const { slug } = useParams();
  const event = getEvent(slug);
  if (!event) return <NotFoundPage />;
  const sport = getSport(event.sport);
  const zone = getZone(event.zone);
  const remaining =
    event.max_participants != null && event.participants_count != null ? Math.max(0, event.max_participants - event.participants_count) : null;
  const related = upcomingEvents({ sport: event.sport, zone: event.zone }).filter((e) => e.id !== event.id).slice(0, 4);
  const past = new Date(event.start_at).getTime() < Date.now();

  return (
    <PageShell meta={eventMeta(event)}>
      <div className="container mx-auto px-4 max-w-4xl">
        <Breadcrumb items={[{ name: 'Accueil', to: '/' }, { name: 'Événements', to: '/evenements' }, { name: event.title }]} />
        <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide text-orange-600 mb-3">
          {sport && (
            <Link to={`/sport/${sport.slug}`} className="hover:underline">
              {sport.name}
            </Link>
          )}
          {zone && sport && (
            <Link to={`/sport/${sport.slug}/${zone.slug}`} className="hover:underline">
              · {zone.name}
            </Link>
          )}
          <span className="rounded-full bg-orange-50 px-2 py-0.5 normal-case tracking-normal">{LEVEL_LABEL[event.level]}</span>
          {event.status === 'cancelled' && <span className="rounded-full bg-red-100 text-red-700 px-2 py-0.5 normal-case tracking-normal">Annulée</span>}
          {event.status === 'full' && <span className="rounded-full bg-gray-100 text-gray-700 px-2 py-0.5 normal-case tracking-normal">Complet</span>}
          {past && <span className="rounded-full bg-gray-100 text-gray-700 px-2 py-0.5 normal-case tracking-normal">Passée</span>}
        </div>
        <h1 className="text-3xl md:text-5xl font-bold mb-6">{event.title}</h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <dl className="grid sm:grid-cols-2 gap-4 text-gray-700">
              <div className="flex items-start gap-3 rounded-2xl bg-gray-50 p-4">
                <CalendarDays className="w-5 h-5 text-orange-500 mt-0.5" aria-hidden="true" />
                <div>
                  <dt className="text-xs uppercase text-gray-500">Date</dt>
                  <dd className="font-semibold">
                    <time dateTime={event.start_at}>{formatEventDate(event.start_at, event.timezone)}</time>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-gray-50 p-4">
                <MapPin className="w-5 h-5 text-orange-500 mt-0.5" aria-hidden="true" />
                <div>
                  <dt className="text-xs uppercase text-gray-500">Rendez-vous</dt>
                  <dd className="font-semibold">
                    {event.location.name}
                    <br />
                    <span className="font-normal text-sm">
                      {[event.location.address, event.location.postal_code, event.location.city].filter(Boolean).join(', ')}
                    </span>
                  </dd>
                </div>
              </div>
              {(event.distance_km || event.elevation_m) && (
                <div className="flex items-start gap-3 rounded-2xl bg-gray-50 p-4">
                  <Mountain className="w-5 h-5 text-orange-500 mt-0.5" aria-hidden="true" />
                  <div>
                    <dt className="text-xs uppercase text-gray-500">Parcours</dt>
                    <dd className="font-semibold">
                      {event.distance_km ? `${event.distance_km} km` : ''}
                      {event.distance_km && event.elevation_m ? ' · ' : ''}
                      {event.elevation_m ? `${event.elevation_m} m D+` : ''}
                    </dd>
                  </div>
                </div>
              )}
              {event.duration_min && (
                <div className="flex items-start gap-3 rounded-2xl bg-gray-50 p-4">
                  <Clock className="w-5 h-5 text-orange-500 mt-0.5" aria-hidden="true" />
                  <div>
                    <dt className="text-xs uppercase text-gray-500">Durée</dt>
                    <dd className="font-semibold">
                      {Math.floor(event.duration_min / 60)} h{event.duration_min % 60 ? ` ${event.duration_min % 60}` : ''}
                    </dd>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3 rounded-2xl bg-gray-50 p-4">
                <Users className="w-5 h-5 text-orange-500 mt-0.5" aria-hidden="true" />
                <div>
                  <dt className="text-xs uppercase text-gray-500">Participants</dt>
                  <dd className="font-semibold">
                    {event.participants_count ?? 0} inscrit{(event.participants_count ?? 0) > 1 ? 's' : ''}
                    {event.max_participants ? ` / ${event.max_participants}` : ''}
                    {remaining != null && <span className="font-normal text-sm"> · {remaining} place{remaining > 1 ? 's' : ''} restante{remaining > 1 ? 's' : ''}</span>}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-gray-50 p-4">
                <ShieldCheck className="w-5 h-5 text-orange-500 mt-0.5" aria-hidden="true" />
                <div>
                  <dt className="text-xs uppercase text-gray-500">Inscription</dt>
                  <dd className="font-semibold">
                    {event.price_eur ? `${event.price_eur} €` : 'Gratuit'} · {event.approval_mode === 'manual' ? 'validation par l’organisateur' : 'automatique'}
                  </dd>
                </div>
              </div>
            </dl>

            <section aria-labelledby="desc">
              <h2 id="desc" className="text-2xl font-bold mb-2">
                La sortie
              </h2>
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">{event.description}</p>
            </section>

            <section aria-labelledby="orga" className="rounded-2xl border border-gray-200 p-5">
              <h2 id="orga" className="font-bold text-gray-900">
                Organisé par {event.organizer.display_name}
                {event.organizer.is_coach && <span className="ml-2 text-xs rounded-full bg-orange-100 text-orange-700 px-2 py-0.5">Coach</span>}
              </h2>
              {event.organizer.events_organized != null && (
                <p className="text-sm text-gray-600 mt-1">{event.organizer.events_organized} sorties organisées sur Fitmates.</p>
              )}
            </section>
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl bg-gradient-to-br from-orange-500 to-red-500 text-white p-6 sticky top-28">
              <p className="font-bold text-lg mb-1">Rejoindre cette sortie</p>
              <p className="text-white/90 text-sm mb-4">L’inscription et le chat du groupe se font dans l’app Fitmates, gratuitement.</p>
              <a
                href={event.app_url ?? SITE.appUrl}
                className="block text-center bg-white text-orange-600 font-semibold rounded-full px-5 py-3 hover:shadow-lg"
                rel="noopener"
              >
                Ouvrir dans Fitmates
              </a>
              <div className="flex gap-2 mt-3 text-xs">
                <a href={SITE.ios} className="flex-1 text-center rounded-full border border-white/50 px-3 py-2 hover:bg-white/10" rel="noopener noreferrer" target="_blank">
                  App Store
                </a>
                <a href={SITE.android} className="flex-1 text-center rounded-full border border-white/50 px-3 py-2 hover:bg-white/10" rel="noopener noreferrer" target="_blank">
                  Google Play
                </a>
              </div>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-12" aria-labelledby="related">
            <h2 id="related" className="text-2xl font-bold mb-4">
              Autres sorties {sport?.name.toLowerCase()} {zone ? `· ${zone.name}` : ''}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {related.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          </section>
        )}
      </div>
    </PageShell>
  );
}
