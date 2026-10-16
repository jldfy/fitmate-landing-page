import { Link, useParams } from 'react-router-dom';
import { Train } from 'lucide-react';
import PageShell, { Breadcrumb } from '../components/PageShell';
import EventCard from '../components/EventCard';
import LeadForm from '../components/LeadForm';
import NotFoundPage from './NotFoundPage';
import { getSport, SPORTS } from '../data/sports';
import { getZone, ZONES } from '../data/zones';
import { upcomingEvents } from '../data/events';
import { sportZoneMeta, sportZoneHasContent } from '../seo/meta';
import { SITE } from '../seo/site';

export default function SportZonePage() {
  const { sport: sportSlug, zone: zoneSlug } = useParams();
  const sport = getSport(sportSlug);
  const zone = getZone(zoneSlug);
  if (!sport || !zone || !sportZoneHasContent(sport, zone)) return <NotFoundPage />;
  const events = upcomingEvents({ sport: sport.slug, zone: zone.slug });
  const spots = zone.spots[sport.slug] ?? [];
  const otherZones = ZONES.filter((z) => z.slug !== zone.slug && sportZoneHasContent(sport, z));
  const otherSports = SPORTS.filter((s) => s.slug !== sport.slug && sportZoneHasContent(s, zone));
  const prep = zone.slug === 'paris' ? 'à' : 'en';

  return (
    <PageShell meta={sportZoneMeta(sport, zone)}>
      <div className="container mx-auto px-4 max-w-5xl">
        <Breadcrumb
          items={[{ name: 'Accueil', to: '/' }, { name: 'Sports', to: '/sports' }, { name: sport.name, to: `/sport/${sport.slug}` }, { name: zone.name }]}
        />
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {sport.name} {prep} {zone.name} :{' '}
          <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">groupes, sorties et partenaires</span>
        </h1>
        <p className="text-xl text-gray-600 mb-6 max-w-3xl">{zone.intro}</p>
        <p className="text-gray-700 mb-8 max-w-3xl">
          Avec <strong>Fitmates</strong>, tu trouves des sorties {sport.name.toLowerCase()} {prep} {zone.name} organisées par des membres de la communauté, avec le niveau, la
          distance et le point de rendez-vous indiqués. {sport.why}
        </p>

        <section className="mb-12" aria-labelledby="events">
          <h2 id="events" className="text-2xl font-bold mb-4">
            {events.length > 0
              ? `${events.length} sortie${events.length > 1 ? 's' : ''} ${sport.name.toLowerCase()} à venir ${prep} ${zone.name}`
              : `Sorties ${sport.name.toLowerCase()} à venir ${prep} ${zone.name}`}
          </h2>
          {events.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {events.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-gray-50 border border-gray-200 p-5 text-gray-700">
              <p>
                Aucune sortie publique n’est affichée ici pour l’instant. Les sorties en cours sont dans l’app, et tu peux créer la tienne en une phrase :
                l’IA remplit la date, le lieu et le niveau.
              </p>
              <a href={SITE.appUrl} className="inline-block mt-3 text-orange-600 font-semibold">
                Ouvrir Fitmates →
              </a>
            </div>
          )}
        </section>

        {spots.length > 0 && (
          <section className="mb-12" aria-labelledby="spots">
            <h2 id="spots" className="text-2xl font-bold mb-2">
              Où {sport.verb} {prep} {zone.name}
            </h2>
            <p className="text-gray-600 mb-4">Les spots les plus utilisés par les groupes Fitmates, avec l’accès en transports.</p>
            <div className="grid md:grid-cols-2 gap-4">
              {spots.map((s) => (
                <div key={s.name} className="rounded-2xl border border-gray-200 bg-white p-5">
                  <h3 className="font-bold text-gray-900">{s.name}</h3>
                  <p className="text-gray-600 mt-1">{s.detail}</p>
                  {s.access && (
                    <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                      <Train className="w-4 h-4 text-orange-500" aria-hidden="true" /> {s.access}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mb-12" aria-labelledby="how">
          <h2 id="how" className="text-2xl font-bold mb-4">
            Comment rejoindre une sortie
          </h2>
          <ol className="grid md:grid-cols-3 gap-4 list-none">
            {[
              ['Télécharge Fitmates', 'Gratuit sur iOS et Android. Crée ton profil et choisis tes sports.'],
              [`Filtre ${sport.name} · ${zone.name}`, 'Tu vois les sorties à venir avec la date, le niveau, la distance et les places restantes.'],
              ['Rejoins et discute', 'Un clic pour t’inscrire, puis le chat du groupe pour caler le rendez-vous et le covoiturage.'],
            ].map(([t, d], i) => (
              <li key={t} className="rounded-2xl bg-gradient-to-br from-orange-50 to-white border border-orange-100 p-5">
                <div className="text-orange-500 font-bold text-sm mb-1">0{i + 1}</div>
                <div className="font-bold text-gray-900">{t}</div>
                <p className="text-gray-600 text-sm mt-1">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        {sport.faq.length > 0 && (
          <section className="mb-12" aria-labelledby="faq">
            <h2 id="faq" className="text-2xl font-bold mb-4">
              Questions fréquentes
            </h2>
            <div className="space-y-4">
              {sport.faq.slice(0, 3).map((f) => (
                <details key={f.q} className="rounded-2xl border border-gray-200 p-4">
                  <summary className="font-semibold cursor-pointer text-gray-900">{f.q}</summary>
                  <p className="mt-2 text-gray-600">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        <LeadForm
          source={`/sport/${sport.slug}/${zone.slug}`}
          defaultSport={sport.slug}
          defaultZone={zone.slug}
          title={`Être prévenu·e des sorties ${sport.name.toLowerCase()} ${prep} ${zone.name}`}
          subtitle="Participant ou organisateur : dis-nous qui tu es, on te met en relation avec le groupe local."
          compact
        />

        <nav className="mt-12 grid md:grid-cols-2 gap-8 text-sm" aria-label="Pages liées">
          {otherZones.length > 0 && (
            <div>
              <h2 className="font-bold text-gray-900 mb-2">{sport.name} ailleurs en {zone.region}</h2>
              <ul className="flex flex-wrap gap-2">
                {otherZones.map((z) => (
                  <li key={z.slug}>
                    <Link to={`/sport/${sport.slug}/${z.slug}`} className="rounded-full border border-gray-200 px-3 py-1 hover:border-orange-400">
                      {z.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {otherSports.length > 0 && (
            <div>
              <h2 className="font-bold text-gray-900 mb-2">Autres sports {prep} {zone.name}</h2>
              <ul className="flex flex-wrap gap-2">
                {otherSports.map((s) => (
                  <li key={s.slug}>
                    <Link to={`/sport/${s.slug}/${zone.slug}`} className="rounded-full border border-gray-200 px-3 py-1 hover:border-orange-400">
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>
      </div>
    </PageShell>
  );
}
