import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { detectDevice, getDownloadLink, getButtonText, type DeviceType } from '../utils/deviceDetection';

export default function SiteNav({ solid = false }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(solid);
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');

  useEffect(() => {
    setDeviceType(detectDevice());
    if (solid) return;
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [solid]);

  const cta = (
    <a
      href={getDownloadLink(deviceType)}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-shadow"
    >
      {getButtonText(deviceType)}
    </a>
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" aria-label="Fitmates – accueil">
          <img src="/fitmate_logo_short.png" alt="Logo Fitmates" className="h-10 w-10" width={40} height={40} />
          <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            FITMATES
          </span>
        </Link>
        <div className="md:hidden">{cta}</div>
        <div className="hidden md:flex items-center gap-6">
          <Link to="/sports" className="text-gray-700 hover:text-orange-500 transition-colors">
            Sports
          </Link>
          <Link to="/evenements" className="text-gray-700 hover:text-orange-500 transition-colors">
            Événements
          </Link>
          <Link to="/organiser" className="text-gray-700 hover:text-orange-500 transition-colors">
            Organiser
          </Link>
          <a href="/#fonctionnalites" className="text-gray-700 hover:text-orange-500 transition-colors">
            L’app
          </a>
          {cta}
        </div>
      </div>
    </nav>
  );
}
