import { UserCircle, CalendarCheck, Users } from 'lucide-react';

const steps = [
  {
    icon: UserCircle,
    title: 'Créez votre profil',
    description: 'Ajoutez une photo et sélectionnez vos sports préférés',
    step: '01',
  },
  {
    icon: CalendarCheck,
    title: 'Créez ou rejoignez',
    description: 'Organisez votre propre événement ou parcourez ceux des autres membres',
    step: '02',
  },
  {
    icon: Users,
    title: 'Bougez ensemble',
    description: 'Rencontrez de nouveaux partenaires sportifs et restez actif',
    step: '03',
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple comme{' '}
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              bonjour
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Commencez votre aventure sportive en 3 étapes
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-orange-200 via-orange-300 to-red-300 -translate-y-1/2 -z-10" />

          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative group"
              >
                {/* Step Number */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {step.step}
                </div>

                {/* Card */}
                <div className="pt-16 p-8 rounded-3xl bg-gradient-to-br from-white to-orange-50 border border-orange-100 hover:border-orange-300 transition-all duration-300 hover:shadow-xl group-hover:-translate-y-2">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <step.icon className="w-10 h-10 text-orange-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
