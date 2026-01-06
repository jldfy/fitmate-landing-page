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
