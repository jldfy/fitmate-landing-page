import { Apple, Smartphone, QrCode } from 'lucide-react';

export default function DownloadCTA() {
  return (
    <section id="download" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-[3rem] bg-gradient-to-br from-orange-500 via-red-500 to-red-600 p-12 md:p-16 overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

            <div className="relative z-10 text-center text-white space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold">
                Prêt à rejoindre la communauté?
              </h2>
              <p className="text-xl md:text-2xl text-white/90">
                Téléchargez Fitmates gratuitement
              </p>

              {/* Download Buttons */}
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <button className="flex items-center gap-3 bg-black text-white px-8 py-4 rounded-2xl hover:scale-105 transition-transform shadow-lg">
                  <Apple className="w-7 h-7" />
                  <div className="text-left">
                    <div className="text-xs">Télécharger sur</div>
                    <div className="text-xl font-semibold">App Store</div>
                  </div>
                </button>
                <button className="flex items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-2xl hover:scale-105 transition-transform shadow-lg">
                  <Smartphone className="w-7 h-7" />
                  <div className="text-left">
                    <div className="text-xs">Télécharger sur</div>
                    <div className="text-xl font-semibold">Google Play</div>
                  </div>
                </button>
              </div>

              {/* QR Code Section */}
              <div className="pt-8">
                <div className="inline-flex items-center gap-4 bg-white/20 backdrop-blur-lg rounded-2xl p-6">
                  <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center">
                    <QrCode className="w-20 h-20 text-orange-500" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-lg">Scannez pour télécharger</div>
                    <div className="text-white/80">Disponible sur iOS et Android</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
