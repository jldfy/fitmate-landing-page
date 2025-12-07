import {
  CalendarPlus,
  Users,
  MessageCircle,
  UserPlus,
  Sparkles,
  Trophy,
} from 'lucide-react';

const features = [
  {
    icon: CalendarPlus,
    title: 'Créez vos événements',
    description:
      'Organisez des randonnées, courses à pied, séances de vélo et plus encore. Définissez la date, le lieu, le niveau de difficulté et le nombre de participants.',
  },
  {
    icon: Users,
    title: 'Rejoignez des activités',
    description:
      'Parcourez les événements près de chez vous et participez en un clic. Mode d\'approbation automatique ou manuel selon l\'organisateur.',
  },
  {
    icon: MessageCircle,
    title: 'Discutez en groupe',
    description:
      'Chaque événement dispose d\'un chat de groupe pour coordonner et faire connaissance avec les participants.',
  },
  {
    icon: UserPlus,
    title: 'Suivez vos amis',
    description:
      'Créez votre réseau sportif en suivant d\'autres membres et en restant à jour sur leurs activités.',
  },
  {
    icon: Sparkles,
    title: 'Intelligence artificielle',
    description:
      'Décrivez votre événement en langage naturel, notre IA extrait automatiquement les détails (date, lieu, niveau, sport).',
  },
  {
    icon: Trophy,
    title: 'Profil complet',
    description:
      'Affichez vos statistiques (événements organisés, participations), vos sports préférés et vos abonnés.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Tout ce dont vous avez besoin pour{' '}
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              bouger ensemble
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-3xl bg-gradient-to-br from-white to-orange-50 border border-orange-100 hover:border-orange-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative Element */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-200 to-red-200 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity -z-10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
