export default function Screenshots() {
  const screenshots = [
    {
      title: 'Fil d\'actualité',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=800&fit=crop',
    },
    {
      title: 'Détails d\'événement',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=800&fit=crop',
    },
    {
      title: 'Profil utilisateur',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=800&fit=crop',
    },
    {
      title: 'Chat de groupe',
      image: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=400&h=800&fit=crop',
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
