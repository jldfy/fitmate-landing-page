import { Link, useParams } from 'react-router-dom';
import PageShell, { Breadcrumb } from '../components/PageShell';
import EventCard from '../components/EventCard';
import LeadForm from '../components/LeadForm';
import NotFoundPage from './NotFoundPage';
import { getSport } from '../data/sports';
import { ZONES } from '../data/zones';
import { upcomingEvents } from '../data/events';
import { sportMeta, sportZoneHasContent } from '../seo/meta';
import { SITE } from '../seo/site';

export default function SportPage() {
  const { sport: slug } = useParams();
  const sport = getSport(slug);
  if (!sport) return <NotFoundPage />;
  const events = upcomingEvents({ sport: sport.slug });
  const zones = ZONES.filter((z) => sportZoneHasContent(sport, z));

  return (
    <PageShell meta={sportMeta(sport)}>
      <div className="container mx-auto px-4 max-w-5xl">
        <Breadcrumb items={[{ name: 'Accueil', to: '/' }, { name: 'Sports', to: '/sports' }, { name: sport.name }]} />
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {sport.name} en groupe :{' '}
          <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            sorties et partenaires près de chez toi
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-6 max-w-3xl">{sport.short}</p>
        <p className="text-gray-700 mb-8 max-w-3xl">
          <strong>Fitmates</strong> est une application gratuite (iOS, Android, web) qui permet de rejoindre ou d’organiser des sorties{' '}
          {sport.name.toLowerCase()} avec des gens de ton niveau, dans ta zone. {sport.why}
        </p>

        {!sport.live && (
          <div className="rounded-2xl bg-orange-50 border border-orange-200 p-5 mb-10 text-orange-900">
            <p className="font-semibold">Ce sport ouvre bientôt sur Fitmates.</p>
            <p className="text-sm mt-1">
              Aujourd’hui la communauté est active en randonnée en Île-de-France ({SITE.facts.activeUsers.toLocaleString('fr-FR')} membres actifs,
              environ {SITE.facts.weeklyParticipations} participations par semaine, {SITE.facts.asOf}). Tu peux déjà créer ta sortie{' '}
              {sport.name.toLowerCase()} dans l’app : les premières sorties d’un sport sont mises en avant.
            </p>
          </div>
        )}

        <section className="mb-12" aria-labelledby="events">
          <h2 id="events" className="text-2xl font-bold mb-4">
            {events.length > 0 ? `${events.length} sortie${events.length > 1 ? 's' : ''} ${sport.name.toLowerCase()} à venir` : `Prochaines sorties ${sport.name.toLowerCase()}`}
          </h2>
          {events.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {events.slice(0, 12).map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">
              Aucune sortie publique n’est publiée pour le moment sur cette page. Les sorties sont visibles en temps réel dans l’app :{' '}
              <a href={SITE.appUrl} className="text-orange-600 underline">
                ouvrir Fitmates
              </a>
              .
            </p>
          )}
        </section>

        <section className="mb-12" aria-labelledby="zones">
          <h2 id="zones" className="text-2xl font-bold mb-4">
            {sport.name} par zone
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {zones.map((z) => {
              const n = upcomingEvents({ sport: sport.slug, zone: z.slug }).length;
              return (
                <Link key={z.slug} to={`/sport/${sport.slug}/${z.slug}`} className="rounded-2xl border border-gray-200 p-4 hover:border-orange-300 hover:shadow-lg transition-all">
                  <div className="font-bold text-gray-900">{z.name}</div>
                  <div className="text-sm text-gray-500">
                    {n > 0 ? `${n} sortie${n > 1 ? 's' : ''} à venir` : `${z.spots[sport.slug]?.length ?? 0} spots`}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mb-12" aria-labelledby="levels">
          <h2 id="levels" className="text-2xl font-bold mb-4">
            Niveaux proposés
          </h2>
          <ul className="grid sm:grid-cols-3 gap-4">
            {sport.levels.map((l) => (
              <li key={l} className="rounded-2xl bg-gray-50 border border-gray-200 p-4 text-gray-800">
                {l}
              </li>
            ))}
          </ul>
        </section>

        {sport.faq.length > 0 && (
          <section className="mb-12" aria-labelledby="faq">
            <h2 id="faq" className="text-2xl font-bold mb-4">
              Questions fréquentes
            </h2>
            <div className="space-y-4">
              {sport.faq.map((f) => (
                <details key={f.q} className="rounded-2xl border border-gray-200 p-4 group">
                  <summary className="font-semibold cursor-pointer text-gray-900">{f.q}</summary>
                  <p className="mt-2 text-gray-600">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        <LeadForm
          source={`/sport/${sport.slug}`}
          defaultSport={sport.slug}
          defaultType={sport.live ? 'participant' : 'organisateur'}
          title={sport.live ? `Rejoins la communauté ${sport.name.toLowerCase()}` : `Lance ${sport.name.toLowerCase()} dans ta zone`}
          subtitle={
            sport.live
              ? 'Dis-nous ta zone, on te prévient des sorties de ton niveau.'
              : 'Tu organises déjà des sorties ou tu veux en lancer ? Les premiers organisateurs d’un sport sont mis en avant et accompagnés.'
          }
        />
      </div>
    </PageShell>
  );
}
