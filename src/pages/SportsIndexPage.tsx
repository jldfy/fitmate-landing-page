import { Link } from 'react-router-dom';
import PageShell, { Breadcrumb } from '../components/PageShell';
import { SPORTS } from '../data/sports';
import { upcomingEvents } from '../data/events';
import { sportsIndexMeta } from '../seo/meta';
import LeadForm from '../components/LeadForm';

export default function SportsIndexPage() {
  const live = SPORTS.filter((s) => s.live);
  const next = SPORTS.filter((s) => !s.live).sort((a, b) => a.priority - b.priority);
  return (
    <PageShell meta={sportsIndexMeta()}>
      <div className="container mx-auto px-4 max-w-5xl">
        <Breadcrumb items={[{ name: 'Accueil', to: '/' }, { name: 'Sports' }]} />
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Trouve un groupe pour{' '}
          <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">ton sport</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-3xl">
          Fitmates est l’application gratuite pour faire du sport à plusieurs près de chez soi. Choisis ton sport : tu vois les
          sorties à venir, les groupes actifs dans ta zone et tu rejoins en un clic.
        </p>

        <h2 className="text-2xl font-bold mb-4">Déjà actif en Île-de-France</h2>
        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {live.map((s) => {
            const n = upcomingEvents({ sport: s.slug }).length;
            return (
              <Link
                key={s.slug}
                to={`/sport/${s.slug}`}
                className="rounded-3xl border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-6 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="text-xs font-semibold uppercase tracking-wide text-orange-600 mb-2">En ligne</div>
                <h3 className="text-2xl font-bold text-gray-900">{s.name}</h3>
                <p className="text-gray-600 mt-2">{s.short}</p>
                <p className="text-sm text-orange-600 font-semibold mt-3">
                  {n > 0 ? `${n} sortie${n > 1 ? 's' : ''} à venir →` : 'Voir les zones et rejoindre →'}
                </p>
              </Link>
            );
          })}
        </div>

        <h2 className="text-2xl font-bold mb-2">Prochains sports ouverts</h2>
        <p className="text-gray-600 mb-6">
          On ouvre un sport dans une zone dès qu’il y a assez d’organisateurs et de participants pour que les sorties aient lieu
          chaque semaine. Inscris-toi pour être prévenu·e et peser dans l’ordre d’ouverture.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {next.map((s) => (
            <Link
              key={s.slug}
              to={`/sport/${s.slug}`}
              className="rounded-2xl border border-gray-200 bg-white p-5 hover:border-orange-300 hover:shadow-lg transition-all"
            >
              <h3 className="font-bold text-gray-900">{s.name}</h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{s.short}</p>
            </Link>
          ))}
        </div>

        <LeadForm source="/sports" title="Préviens-moi quand mon sport ouvre près de chez moi" subtitle="Un seul email quand ta zone et ton sport sont lancés. Pas de newsletter." />
      </div>
    </PageShell>
  );
}
