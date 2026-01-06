import { Award, TrendingUp, Users, Trophy, Star, Zap } from 'lucide-react';

const profiles = [
  {
    name: 'Alexandra Petit',
    avatar: 'AP',
    bio: 'Passionnée de trail running 🏃‍♀️ | Coach sportif | Toujours partante pour de nouvelles aventures',
    stats: {
      events: 156,
      followers: 2340,
      following: 890,
      posts: 234,
    },
    badges: [
      { name: 'MVP', icon: Trophy, color: 'from-yellow-400 to-orange-500' },
      { name: 'Top Organisateur', icon: Star, color: 'from-purple-400 to-pink-500' },
      { name: 'Frequent Runner', icon: Zap, color: 'from-blue-400 to-cyan-500' },
    ],
    recentPosts: [
      { activity: 'Trail 15km', date: 'Hier' },
      { activity: 'Course en montagne', date: 'Il y a 3 jours' },
    ],
  },
  {
    name: 'Lucas Bernard',
    avatar: 'LB',
    bio: 'Cycliste urbain 🚴 | Amateur de yoga | On pédale ensemble ?',
    stats: {
      events: 89,
      followers: 1240,
      following: 456,
      posts: 167,
    },
    badges: [
      { name: 'Top Cycliste', icon: Award, color: 'from-green-400 to-emerald-500' },
      { name: 'Community Builder', icon: Users, color: 'from-orange-400 to-red-500' },
    ],
    recentPosts: [
      { activity: 'Sortie vélo 50km', date: 'Aujourd\'hui' },
      { activity: 'Session yoga', date: 'Il y a 2 jours' },
    ],
  },
  {
    name: 'Camille Rousseau',
    avatar: 'CR',
    bio: 'Yoga instructor ☀️ | Méditation | Wellness advocate',
    stats: {
      events: 234,
      followers: 3120,
      following: 1200,
      posts: 456,
    },
    badges: [
      { name: 'Yoga Master', icon: Star, color: 'from-purple-400 to-pink-500' },
      { name: 'Inspirational', icon: TrendingUp, color: 'from-pink-400 to-rose-500' },
    ],
    recentPosts: [
      { activity: 'Méditation matinale', date: 'Aujourd\'hui' },
      { activity: 'Yoga en plein air', date: 'Hier' },
    ],
  },
];

export default function CommunityProfiles() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full mb-4">
            <Users className="w-4 h-4" />
            <span className="text-sm font-semibold">PROFILS DE LA COMMUNAUTÉ</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Rencontrez les{' '}
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              membres actifs
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Des profils riches avec badges, statistiques et historique d'activités
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {profiles.map((profile, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-orange-50 rounded-3xl p-6 border border-orange-100 hover:border-orange-300 hover:shadow-xl transition-all hover:-translate-y-2"
            >
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4">
                  {profile.avatar}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{profile.name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{profile.bio}</p>

                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {profile.badges.map((badge, badgeIndex) => (
                    <div
                      key={badgeIndex}
                      className={`inline-flex items-center gap-1 bg-gradient-to-r ${badge.color} text-white text-xs px-3 py-1 rounded-full`}
                    >
                      <badge.icon className="w-3 h-3" />
                      {badge.name}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6 pb-6 border-b border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">{profile.stats.events}</div>
                  <div className="text-xs text-gray-500">Événements</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">{profile.stats.followers}</div>
                  <div className="text-xs text-gray-500">Abonnés</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">{profile.stats.following}</div>
                  <div className="text-xs text-gray-500">Abonnements</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">{profile.stats.posts}</div>
                  <div className="text-xs text-gray-500">Posts</div>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Publications récentes</h4>
                {profile.recentPosts.map((post, postIndex) => (
                  <div key={postIndex} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{post.activity}</span>
                    <span className="text-gray-400">{post.date}</span>
                  </div>
                ))}
              </div>

              <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-full hover:shadow-lg transition-all font-semibold">
                Suivre
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
