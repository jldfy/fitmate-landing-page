import { CalendarPlus, MessageCircle, Sparkles, Users, BadgeCheck, Megaphone } from 'lucide-react';
import PageShell, { Breadcrumb } from '../components/PageShell';
import LeadForm from '../components/LeadForm';
import { organiserMeta } from '../seo/meta';
import { SITE } from '../seo/site';
import { ORGANISER_GUIDES } from '../data/organiserGuides';
import { Link } from 'react-router-dom';

const benefits = [
  { icon: Sparkles, title: 'Créer une sortie en une phrase', text: 'Décris ta sortie (« dimanche 10h, 15 km depuis Bois-le-Roi, niveau intermédiaire »), l’IA remplit la fiche.' },
  { icon: Users, title: 'Des participants près de chez toi', text: 'Ta sortie apparaît dans le fil local des membres de ta zone et de ton sport, plus sur une page publique indexée par Google.' },
  { icon: MessageCircle, title: 'Chat de groupe intégré', text: 'Fini WhatsApp : un chat par sortie, les absents se désinscrivent, la liste d’attente se remplit.' },
  { icon: CalendarPlus, title: 'Inscriptions gérées', text: 'Places limitées, validation automatique ou manuelle, annulations avec notification des inscrits.' },
  { icon: BadgeCheck, title: 'Reconnaissance', text: 'Badge organisateur, statistiques, mise en avant des organisateurs réguliers dans leur zone.' },
  { icon: Megaphone, title: 'Gratuit, sans limite', text: 'Aucun abonnement pour organiser. Les coachs peuvent indiquer un tarif sur leurs séances.' },
];

const profiles = [
  ['Run club ou groupe Instagram', 'Tu as un rendez-vous hebdo et un groupe WhatsApp qui déborde. Fitmates gère les inscriptions et attire les nouveaux de ta zone.'],
  ['Coach indépendant', 'Tu veux remplir tes séances collectives et te faire connaître localement. Tes séances sont visibles par les membres autour de toi.'],
  ['Association ou club', 'Tes sorties ouvertes aux non-adhérents touchent des publics que l’affichage papier n’atteint plus.'],
  ['Groupe d’amis', 'Tu organises déjà des sorties pour tes potes. Ouvre-les, ou garde-les privées, et laisse l’app faire l’administratif.'],
];

export default function OrganiserPage() {
  return (
    <PageShell meta={organiserMeta()}>
      <div className="container mx-auto px-4 max-w-5xl">
        <Breadcrumb items={[{ name: 'Accueil', to: '/' }, { name: 'Organiser' }]} />
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Organise tes sorties sportives,{' '}
          <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">on s’occupe du reste</span>
        </h1>
        <p className="text-xl text-gray-600 mb-4 max-w-3xl">
          Run clubs, coachs, associations, groupes d’amis : Fitmates est l’outil gratuit pour publier vos sorties, gérer les inscriptions et recruter des
          participants près de chez vous.
        </p>
        <p className="text-gray-700 mb-10 max-w-3xl">
          En Île-de-France, la communauté randonnée réunit déjà {SITE.facts.activeUsers.toLocaleString('fr-FR')} membres actifs et environ{' '}
          {SITE.facts.weeklyParticipations} participations par semaine ({SITE.facts.asOf}), sans un euro de publicité. Les organisateurs sont le cœur de
          Fitmates : chaque sortie publiée amène en moyenne de nouveaux membres dans sa zone.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {benefits.map((b) => (
            <div key={b.title} className="rounded-3xl bg-gradient-to-br from-white to-orange-50 border border-orange-100 p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-4">
                <b.icon className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <h2 className="font-bold text-gray-900 mb-1">{b.title}</h2>
              <p className="text-gray-600 text-sm">{b.text}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-4">Pour qui ?</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-14">
          {profiles.map(([t, d]) => (
            <div key={t} className="rounded-2xl border border-gray-200 p-5">
              <h3 className="font-bold text-gray-900">{t}</h3>
              <p className="text-gray-600 text-sm mt-1">{d}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-4">Guides pour démarrer</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-14">
          {ORGANISER_GUIDES.map((g) => (
            <Link key={g.slug} to={`/organiser/${g.slug}`} className="rounded-2xl border border-gray-200 p-5 hover:border-orange-300 hover:shadow-lg transition-all">
              <h3 className="font-bold text-gray-900">{g.h1}</h3>
              <p className="text-gray-600 text-sm mt-1">{g.description}</p>
            </Link>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-2">Programme Capitaines Fitmates</h2>
        <p className="text-gray-700 mb-6 max-w-3xl">
          Les premiers organisateurs d’un sport ou d’une zone deviennent « Capitaines » : mise en avant dans l’app et sur ce site, accès anticipé aux outils
          (récurrence, co-organisateurs, liste d’attente), kit de communication et ligne directe avec l’équipe. Candidature via le formulaire ci-dessous.
        </p>

        <LeadForm
          source="/organiser"
          defaultType="organisateur"
          title="Dis-nous ce que tu organises"
          subtitle="On te répond sous 48 h avec les prochaines étapes et, si tu le souhaites, un appel de 15 minutes."
        />
      </div>
    </PageShell>
  );
}
