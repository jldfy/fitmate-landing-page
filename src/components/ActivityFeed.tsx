import { Heart, MessageCircle, Share2, Award, TrendingUp } from 'lucide-react';

const posts = [
  {
    id: 1,
    user: {
      name: 'Marie Dubois',
      avatar: 'MD',
      badge: 'Top Runner',
    },
    activity: 'Course à pied',
    content: 'Nouveau record personnel ! 10km en 45 minutes 🎉',
    image: '/screenshot_homescreen.png',
    likes: 124,
    comments: 18,
    time: 'Il y a 2 heures',
  },
  {
    id: 2,
    user: {
      name: 'Thomas Martin',
      avatar: 'TM',
      badge: 'MVP',
    },
    activity: 'Cyclisme',
    content: 'Belle sortie matinale de 50km avec le groupe ! Le soleil était au rendez-vous ☀️',
    likes: 89,
    comments: 12,
    time: 'Il y a 5 heures',
  },
  {
    id: 3,
    user: {
      name: 'Sophie Laurent',
      avatar: 'SL',
      badge: 'Yoga Master',
    },
    activity: 'Yoga',
    content: 'Session de méditation incroyable ce matin. Qui se joint à moi demain ?',
    likes: 67,
    comments: 9,
    time: 'Il y a 8 heures',
  },
];

export default function ActivityFeed() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full mb-4">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-semibold">COMMUNAUTÉ ACTIVE</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Fil d'actualité de la{' '}
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              communauté
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Suivez les activités de vos amis, partagez vos réussites et inspirez-vous mutuellement
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  {post.user.avatar}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-900">{post.user.name}</h3>
                        <span className="inline-flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-2 py-1 rounded-full">
                          <Award className="w-3 h-3" />
                          {post.user.badge}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{post.activity} • {post.time}</p>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>

                  {post.image && (
                    <div className="mb-4 rounded-2xl overflow-hidden">
                      <img
                        src={post.image}
                        alt="Post"
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  )}

                  <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
                    <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
                      <Heart className="w-5 h-5" />
                      <span className="font-semibold">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span className="font-semibold">{post.comments}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors">
                      <Share2 className="w-5 h-5" />
                      <span className="font-semibold">Partager</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full hover:shadow-xl transition-all hover:scale-105 font-semibold">
            Voir plus de publications
          </button>
        </div>
      </div>
    </section>
  );
}
