import { TrendingUp, Users, MessageCircle, Award, Trophy, Medal } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '10,000+',
    label: 'Communauté active',
    description: 'Membres engagés et passionnés',
  },
  {
    icon: TrendingUp,
    value: '125,000+',
    label: 'Connexions créées ce mois-ci',
    description: 'Sportifs connectés et motivés',
  },
  {
    icon: MessageCircle,
    value: '500,000+',
    label: 'Messages échangés',
    description: 'Conversations actives chaque semaine',
  },
  {
    icon: Award,
    value: '50,000+',
    label: 'Badges débloqués',
    description: 'Réalisations et succès célébrés',
  },
];

const topContributors = [
  { name: 'Alexandra P.', avatar: 'AP', points: 4520, rank: 1 },
  { name: 'Lucas B.', avatar: 'LB', points: 4230, rank: 2 },
  { name: 'Camille R.', avatar: 'CR', points: 3980, rank: 3 },
];

export default function Stats() {
  return (
    <section className="py-20 bg-gradient-to-br from-orange-500 to-red-500 text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Une communauté dynamique
          </h2>
          <p className="text-xl text-white/90">
            Des milliers d'interactions chaque jour
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold">{stat.value}</div>
                  <h3 className="text-lg font-semibold">{stat.label}</h3>
                  <p className="text-sm text-white/80">{stat.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-2 flex items-center justify-center gap-3">
              <Trophy className="w-8 h-8" />
              Top Contributeurs du Mois
            </h3>
            <p className="text-white/80">Les membres les plus actifs de notre communauté</p>
          </div>

          <div className="flex items-end justify-center gap-4">
            {topContributors.map((contributor) => {
              const icons = [Trophy, Medal, Award];
              const heights = ['h-64', 'h-56', 'h-52'];
              const Icon = icons[contributor.rank - 1];

              return (
                <div
                  key={contributor.rank}
                  className={`flex-1 max-w-xs ${heights[contributor.rank - 1]}`}
                >
                  <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 h-full flex flex-col items-center justify-end hover:bg-white/20 transition-all">
                    <div className="mb-4">
                      <Icon className="w-12 h-12 text-yellow-300" />
                    </div>
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4">
                      {contributor.avatar}
                    </div>
                    <h4 className="text-xl font-bold mb-2">{contributor.name}</h4>
                    <div className="text-3xl font-bold text-yellow-300 mb-1">
                      {contributor.points.toLocaleString()}
                    </div>
                    <p className="text-sm text-white/80">points</p>
                    <div className="mt-4 w-12 h-12 bg-yellow-300 text-gray-900 rounded-full flex items-center justify-center font-bold text-xl">
                      #{contributor.rank}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
