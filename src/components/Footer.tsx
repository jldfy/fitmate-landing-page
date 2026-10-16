import { Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img
                src="/fitmate_logo_short.png"
                alt="Fitmates Logo"
                className="h-10 w-10"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Fitmates
              </span>
            </div>
            <p className="text-gray-400">
              La plateforme sociale qui connecte les passionnés de sport et facilite l'organisation d'événements sportifs.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Découvrir</h3>
            <ul className="space-y-2">
              <li>
                <a href="/sports" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Tous les sports
                </a>
              </li>
              <li>
                <a href="/sport/randonnee" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Randonnée en Île-de-France
                </a>
              </li>
              <li>
                <a href="/evenements" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Événements à venir
                </a>
              </li>
              <li>
                <a href="/organiser" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Organiser une sortie
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:support@fitmates.app" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="/terms.html" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Conditions d'utilisation
                </a>
              </li>
              <li>
                <a href="/privacy-policy.html" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Confidentialité
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold text-lg mb-4">Suivez-nous</h3>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/fitmatestrongertogether"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
            <p className="text-gray-400 text-sm mt-6">
              Disponible sur iOS et Android
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>© 2026 Fitmates. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
