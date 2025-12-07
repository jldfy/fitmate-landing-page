import { Apple, Smartphone } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-red-50 -z-10" />

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Trouvez vos{' '}
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                partenaires sportifs
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Organisez et rejoignez des événements sportifs près de chez vous
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-3 bg-black text-white px-8 py-4 rounded-2xl hover:scale-105 transition-transform shadow-lg">
                <Apple className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-xs">Télécharger sur</div>
                  <div className="text-lg font-semibold">App Store</div>
                </div>
              </button>
              <button className="flex items-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-2xl hover:scale-105 transition-transform shadow-lg">
                <Smartphone className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-xs">Télécharger sur</div>
                  <div className="text-lg font-semibold">Google Play</div>
                </div>
              </button>
            </div>

            {/* Small Stats */}
            <div className="flex gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-orange-500">10k+</div>
                <div className="text-gray-600">Utilisateurs actifs</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-500">50k+</div>
                <div className="text-gray-600">Événements créés</div>
              </div>
            </div>
          </div>

          {/* Right Content - App Mockup */}
          <div className="relative animate-fade-in-right">
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-[3rem] p-8 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=800&fit=crop"
                  alt="Fitmates App"
                  className="w-full rounded-[2rem] shadow-xl"
                />
              </div>
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-orange-200 rounded-full blur-3xl opacity-50 animate-pulse" />
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-red-200 rounded-full blur-3xl opacity-50 animate-pulse delay-1000" />
          </div>
        </div>
      </div>
    </section>
  );
}
