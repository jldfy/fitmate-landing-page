import { Quote, Camera, Heart } from 'lucide-react';

const testimonials = [
  {
    name: 'Julie Moreau',
    avatar: 'JM',
    text: 'Grâce à Fitmates, j\'ai trouvé un groupe de running incroyable ! On se retrouve chaque samedi matin et c\'est devenu un vrai moment de convivialité.',
    image: '/screenshot_event_details.png',
    likes: 234,
  },
  {
    name: 'Kevin Dubois',
    avatar: 'KD',
    text: 'J\'ai organisé ma première sortie vélo et 15 personnes sont venues ! L\'ambiance était géniale, merci à toute la communauté.',
    image: '/screenshot_join_event.png',
    likes: 189,
  },
  {
    name: 'Sarah Chen',
    avatar: 'SC',
    text: 'Depuis que j\'utilise Fitmates, je ne rate plus aucune session de yoga. La communauté est bienveillante et motivante !',
    image: '/screenshot_conversation.png',
    likes: 312,
  },
];

const stories = [
  {
    user: 'Marc L.',
    activity: 'Trail 20km',
    image: '/screenshot_homescreen.png',
    time: '2h',
  },
  {
    user: 'Emma R.',
    activity: 'Yoga matinal',
    image: '/screenshot_event_creation_2.png',
    time: '5h',
  },
  {
    user: 'Tom B.',
    activity: 'Cycling 50km',
    image: '/screenshot_join_event.png',
    time: '8h',
  },
  {
    user: 'Lisa M.',
    activity: 'Running 10km',
    image: '/screenshot_conversation.png',
    time: '12h',
  },
];

export default function UserGeneratedContent() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full mb-4">
            <Camera className="w-4 h-4" />
            <span className="text-sm font-semibold">TÉMOIGNAGES DE LA COMMUNAUTÉ</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ce que nos{' '}
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              membres disent
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Des histoires inspirantes et des moments partagés par notre communauté active
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Camera className="w-6 h-6 text-orange-500" />
            Stories de la journée
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {stories.map((story, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-32 cursor-pointer group"
              >
                <div className="relative rounded-2xl overflow-hidden mb-2 border-4 border-orange-500">
                  <img
                    src={story.image}
                    alt={story.activity}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-xs font-semibold truncate">{story.activity}</p>
                    <p className="text-white/80 text-xs">Il y a {story.time}</p>
                  </div>
                </div>
                <p className="text-sm text-center text-gray-700 font-medium truncate">{story.user}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-orange-50 rounded-3xl p-6 border border-orange-100 hover:border-orange-300 hover:shadow-xl transition-all"
            >
              <Quote className="w-8 h-8 text-orange-500 mb-4" />

              <p className="text-gray-700 leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              {testimonial.image && (
                <div className="rounded-2xl overflow-hidden mb-4">
                  <img
                    src={testimonial.image}
                    alt="Session photo"
                    className="w-full h-40 object-cover"
                  />
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-xs text-gray-500">Membre actif</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-red-500">
                  <Heart className="w-5 h-5 fill-current" />
                  <span className="font-semibold">{testimonial.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full hover:shadow-xl transition-all hover:scale-105 font-semibold">
            Partager votre histoire
          </button>
        </div>
      </div>
    </section>
  );
}
