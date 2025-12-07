import { TrendingUp, Users, Smartphone } from 'lucide-react';

const stats = [
  {
    icon: TrendingUp,
    value: '50,000+',
    label: 'Événements organisés',
    description: 'Des milliers d\'activités chaque mois',
  },
  {
    icon: Users,
    value: '10,000+',
    label: 'Communauté grandissante',
    description: 'Rejoignez des milliers de sportifs',
  },
  {
    icon: Smartphone,
    value: 'iOS & Android',
    label: 'Disponible partout',
    description: 'Téléchargez gratuitement',
  },
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
            Rejoignez le mouvement
          </h2>
          <p className="text-xl text-white/90">
            Des milliers d'athlètes nous font déjà confiance
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="p-8 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <stat.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-5xl font-bold">{stat.value}</div>
                  <h3 className="text-2xl font-semibold">{stat.label}</h3>
                  <p className="text-white/80">{stat.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
