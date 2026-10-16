import { Link } from 'react-router-dom';
import PageShell, { Breadcrumb } from '../components/PageShell';
import EventCard from '../components/EventCard';
import LeadForm from '../components/LeadForm';
import { upcomingEvents } from '../data/events';
import { SPORTS } from '../data/sports';
import { ZONES } from '../data/zones';
import { eventsIndexMeta } from '../seo/meta';
import { SITE } from '../seo/site';

export default function EventsPage() {
  const events = upcomingEvents();
  const bySport = SPORTS.map((s) => ({ sport: s, n: events.filter((e) => e.sport === s.slug).length })).filter((x) => x.n > 0);
  const byZone = ZONES.map((z) => ({ zone: z, n: events.filter((e) => e.zone === z.slug).length })).filter((x) => x.n > 0);
  return (
    <PageShell meta={eventsIndexMeta()}>
      <div className="container mx-auto px-4 max-w-5xl">
        <Breadcrumb items={[{ name: 'Accueil', to: '/' }, { name: 'Événements' }]} />
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Sorties sportives{' '}
          <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">à venir en Île-de-France</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl">
          Toutes les sorties publiques organisées par la communauté Fitmates : randonnées, sorties running, vélo et plus. Rejoins-les gratuitement
          depuis l’app.
        </p>

        {events.length > 0 ? (
          <>
            <div className="flex flex-wrap gap-2 mb-8 text-sm">
              {bySport.map(({ sport, n }) => (
                <Link key={sport.slug} to={`/sport/${sport.slug}`} className="rounded-full border border-gray-200 px-3 py-1 hover:border-orange-400">
                  {sport.name} ({n})
                </Link>
              ))}
              {byZone.map(({ zone, n }) => (
                <span key={zone.slug} className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">
                  {zone.name} ({n})
                </span>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {events.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-3xl bg-gradient-to-br from-orange-50 to-white border border-orange-100 p-8 mb-12">
            <h2 className="text-2xl font-bold mb-2">Les sorties sont dans l’app</h2>
            <p className="text-gray-700 mb-4">
              Cette page affiche les sorties publiques dès que le flux d’événements est connecté. En attendant, la communauté randonnée en
              Île-de-France organise environ {SITE.facts.weeklyParticipations} participations par semaine, visibles dans Fitmates.
            </p>
            <a href={SITE.appUrl} className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-semibold">
              Ouvrir Fitmates
            </a>
          </div>
        )}

        <div className="mt-12">
          <LeadForm source="/evenements" title="Reçois les sorties de ta zone" subtitle="Choisis ton sport et ta zone : on te prévient quand une sortie de ton niveau est publiée." compact />
        </div>
      </div>
    </PageShell>
  );
}
