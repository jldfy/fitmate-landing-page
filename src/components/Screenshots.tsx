export default function Screenshots() {
  const features = [
    {
      title: 'Connectez-vous',
      description: 'Rejoignez une communauté active de sportifs passionnés',
    },
    {
      title: 'Organisez',
      description: 'Créez vos événements sportifs en quelques secondes',
    },
    {
      title: 'Participez',
      description: 'Découvrez et rejoignez des activités près de chez vous',
    },
  ];

  const screenshots = [
    {
      title: 'Fil d\'actualité',
      image: '/screenshot_homescreen.png',
    },
    {
      title: 'Conversation de groupe',
      image: '/screenshot_conversation.png',
    },
    {
      title: 'Détails d\'événement',
      image: '/screenshot_event_details.png',
    },
    {
      title: 'Rejoindre un événement',
      image: '/screenshot_join_event.png',
    },
    {
      title: 'Créer un événement',
      image: '/screenshot_event_creation_2.png',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            L'expérience{' '}
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Fitmates
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            Une interface intuitive pour une expérience sportive exceptionnelle
          </p>
        </div>

        {/* Three Key Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-orange-500 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Screenshots Carousel */}
        <div className="relative">
          <div className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
            {screenshots.map((screenshot, index) => (
              <div
                key={index}
                className="flex-shrink-0 snap-center group"
              >
                <div className="relative w-72">
                  {/* Phone Frame */}
                  <div className="relative bg-gradient-to-br from-orange-500 to-red-500 rounded-[3rem] p-4 shadow-2xl group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={screenshot.image}
                      alt={screenshot.title}
                      className="w-full rounded-[2.5rem] shadow-xl"
                    />
                    {/* Notch */}
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-full" />
                  </div>

                  {/* Label */}
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-semibold">{screenshot.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
