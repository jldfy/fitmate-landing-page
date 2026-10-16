import {
  Bike,
  Footprints,
  Mountain,
  Waves,
  Dumbbell,
  CircleDot,
  Trophy,
  Users,
} from 'lucide-react';

const sports = [
  { name: 'Randonnée', slug: 'randonnee', icon: Mountain, color: 'from-green-400 to-green-600' },
  { name: 'Course à pied', slug: 'course-a-pied', icon: Footprints, color: 'from-blue-400 to-blue-600' },
  { name: 'Vélo', slug: 'velo', icon: Bike, color: 'from-orange-400 to-orange-600' },
  { name: 'Natation', slug: 'natation', icon: Waves, color: 'from-cyan-400 to-cyan-600' },
  { name: 'Escalade', slug: 'escalade', icon: Mountain, color: 'from-gray-400 to-gray-600' },
  { name: 'Yoga', slug: 'yoga', icon: Users, color: 'from-purple-400 to-purple-600' },
  { name: 'Fitness', slug: 'fitness', icon: Dumbbell, color: 'from-red-400 to-red-600' },
  { name: 'Tennis', slug: 'tennis', icon: CircleDot, color: 'from-yellow-400 to-yellow-600' },
  { name: 'Football', slug: 'football', icon: Trophy, color: 'from-green-400 to-green-600' },
  { name: 'Padel', slug: 'padel', icon: CircleDot, color: 'from-blue-400 to-blue-600' },
  { name: 'Basketball', slug: 'basketball', icon: Trophy, color: 'from-orange-400 to-orange-600' },
];

export default function SportsSupported() {
  return (
    <section id="sports" className="py-20 bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Tous les sports,{' '}
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              une seule app
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Pratiquez votre sport préféré ou découvrez-en de nouveaux
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sports.map((sport, index) => (
            <a
              key={index}
              href={`/sport/${sport.slug}`}
              className="group relative p-6 rounded-2xl bg-white border border-gray-200 hover:border-orange-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
            >
              <div className="flex flex-col items-center gap-3">
                <div className={`w-16 h-16 bg-gradient-to-br ${sport.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <sport.icon className="w-8 h-8 text-white" />
                </div>
                <span className="text-center font-semibold text-gray-800">
                  {sport.name}
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="/sports" className="text-orange-600 font-semibold text-lg hover:underline">
            Voir tous les sports et les zones →
          </a>
        </div>
      </div>
    </section>
  );
}
