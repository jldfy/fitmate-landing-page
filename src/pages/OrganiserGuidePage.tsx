import { Link, useParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import PageShell, { Breadcrumb } from '../components/PageShell';
import LeadForm from '../components/LeadForm';
import NotFoundPage from './NotFoundPage';
import { getOrganiserGuide, ORGANISER_GUIDES } from '../data/organiserGuides';
import { organiserGuideMeta } from '../seo/meta';
import { SITE } from '../seo/site';

export default function OrganiserGuidePage() {
  const { slug } = useParams();
  const guide = getOrganiserGuide(slug);
  if (!guide) return <NotFoundPage />;
  const others = ORGANISER_GUIDES.filter((g) => g.slug !== guide.slug);
  return (
    <PageShell meta={organiserGuideMeta(guide)}>
      <div className="container mx-auto px-4 max-w-4xl">
        <Breadcrumb items={[{ name: 'Accueil', to: '/' }, { name: 'Organiser', to: '/organiser' }, { name: guide.h1 }]} />
        <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">{guide.h1}</h1>
        <p className="text-xl text-gray-700 mb-10 leading-relaxed">{guide.intro}</p>

        <section aria-labelledby="steps" className="mb-12">
          <h2 id="steps" className="text-2xl font-bold mb-4">
            La méthode, en {guide.steps.length} étapes
          </h2>
          <ol className="space-y-4 list-none">
            {guide.steps.map((s, i) => (
              <li key={s.title} className="flex gap-4 rounded-2xl border border-gray-200 p-5">
                <div className="w-9 h-9 shrink-0 rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white font-bold flex items-center justify-center">{i + 1}</div>
                <div>
                  <h3 className="font-bold text-gray-900">{s.title}</h3>
                  <p className="text-gray-600 mt-1">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="with" className="mb-12 rounded-3xl bg-gradient-to-br from-orange-50 to-white border border-orange-100 p-6 md:p-8">
          <h2 id="with" className="text-2xl font-bold mb-4">
            Ce que Fitmates fait pour toi
          </h2>
          <ul className="space-y-2">
            {guide.withFitmates.map((w) => (
              <li key={w} className="flex gap-3 text-gray-800">
                <Check className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{w}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-600 mt-4">
            Communauté active : {SITE.facts.activeUsers.toLocaleString('fr-FR')} membres en randonnée en Île-de-France, environ {SITE.facts.weeklyParticipations} participations par semaine ({SITE.facts.asOf}).
          </p>
        </section>

        <section aria-labelledby="faq" className="mb-12">
          <h2 id="faq" className="text-2xl font-bold mb-4">
            Questions fréquentes
          </h2>
          <div className="space-y-3">
            {guide.faq.map((f) => (
              <details key={f.q} className="rounded-2xl border border-gray-200 p-4">
                <summary className="font-semibold cursor-pointer text-gray-900">{f.q}</summary>
                <p className="mt-2 text-gray-600">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <LeadForm
          source={`/organiser/${guide.slug}`}
          defaultType={guide.leadType}
          defaultSport={guide.sport ?? ''}
          title="Lance-toi : on t’accompagne"
          subtitle="Dis-nous ce que tu organises, tu reçois le kit organisateur et un accès prioritaire aux outils. Réponse sous 48 h."
        />

        <nav className="mt-12 text-sm" aria-label="Autres guides">
          <h2 className="font-bold text-gray-900 mb-2">Autres guides organisateurs</h2>
          <ul className="flex flex-wrap gap-2">
            {others.map((g) => (
              <li key={g.slug}>
                <Link to={`/organiser/${g.slug}`} className="rounded-full border border-gray-200 px-3 py-1 hover:border-orange-400">
                  {g.h1}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </PageShell>
  );
}
