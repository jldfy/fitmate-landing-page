import { MessageCircle, Users, Trophy, Target, Zap, Award } from 'lucide-react';

const groups = [
  {
    name: 'Trail Lovers',
    members: 1234,
    icon: '🏔️',
    description: 'Pour les passionnés de trail et de course en montagne',
    activity: 'Très actif',
    color: 'from-green-400 to-emerald-500',
  },
  {
    name: 'Yoga & Mindfulness',
    members: 2456,
    icon: '🧘',
    description: 'Méditation, yoga et bien-être au quotidien',
    activity: 'Très actif',
    color: 'from-purple-400 to-pink-500',
  },
  {
    name: 'Cycling Community',
    members: 3421,
    icon: '🚴',
    description: 'Sorties vélo, conseils et bons plans',
    activity: 'Actif',
    color: 'from-blue-400 to-cyan-500',
  },
  {
    name: 'Paris Runners',
    members: 1890,
    icon: '🏃',
    description: 'Courses et événements running à Paris',
    activity: 'Très actif',
    color: 'from-orange-400 to-red-500',
  },
];

const achievements = [
  {
    title: 'Participer à 10 événements',
    icon: Target,
    points: 100,
    unlocked: true,
  },
  {
    title: 'Organiser 5 sessions',
    icon: Trophy,
    points: 150,
    unlocked: true,
  },
  {
    title: 'Inviter 10 amis',
    icon: Users,
    points: 200,
    unlocked: false,
  },
  {
    title: 'Série de 30 jours',
    icon: Zap,
    points: 300,
    unlocked: false,
  },
];

export default function SocialInteractions() {
  return (
    <section className="py-20 bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full mb-4">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-semibold">INTERACTIONS SOCIALES</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Rejoignez la{' '}
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              conversation
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Groupes thématiques, chats privés et système de gamification
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              Groupes & Communautés
            </h3>
            <div className="space-y-4">
              {groups.map((group, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-orange-300 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{group.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-bold text-gray-900">{group.name}</h4>
                        <span
                          className={`bg-gradient-to-r ${group.color} text-white text-xs px-3 py-1 rounded-full`}
                        >
                          {group.activity}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{group.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          <Users className="w-4 h-4 inline mr-1" />
                          {group.members.toLocaleString()} membres
                        </span>
                        <button className="text-orange-500 hover:text-orange-600 font-semibold text-sm">
                          Rejoindre →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl text-white">
              <MessageCircle className="w-8 h-8 mb-3" />
              <h4 className="text-xl font-bold mb-2">Chats privés</h4>
              <p className="text-orange-100 mb-4">
                Échangez en direct avec les membres de la communauté
              </p>
              <button className="bg-white text-orange-500 px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all">
                Démarrer une conversation
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              Gamification & Badges
            </h3>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 mb-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full mb-4 shadow-sm">
                  <Award className="w-5 h-5 text-purple-500" />
                  <span className="font-bold text-gray-900">Niveau 12</span>
                </div>
                <div className="flex items-center justify-center gap-4 mb-2">
                  <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    2,450
                  </span>
                  <span className="text-gray-600">points</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full" style={{ width: '65%' }} />
                </div>
                <p className="text-sm text-gray-600 mt-2">550 points jusqu'au niveau 13</p>
              </div>
            </div>

            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`rounded-2xl p-6 border transition-all ${
                    achievement.unlocked
                      ? 'bg-white border-purple-200 shadow-sm'
                      : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        achievement.unlocked
                          ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                          : 'bg-gray-300'
                      }`}
                    >
                      <achievement.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-1">{achievement.title}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-orange-500 font-semibold">
                          +{achievement.points} points
                        </span>
                        {achievement.unlocked && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            Débloqué
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full hover:shadow-xl transition-all hover:scale-105 font-semibold">
                Voir tous les badges
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
