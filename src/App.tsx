import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Hero from './components/Hero';
import CommunityProfiles from './components/CommunityProfiles';
import UserGeneratedContent from './components/UserGeneratedContent';
import Features from './components/Features';
import SportsSupported from './components/SportsSupported';
import HowItWorks from './components/HowItWorks';
import Screenshots from './components/Screenshots';
import Stats from './components/Stats';
import DownloadCTA from './components/DownloadCTA';
import Footer from './components/Footer';
import { detectDevice, getDownloadLink, getButtonText } from './utils/deviceDetection';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [deviceType, setDeviceType] = useState(() => detectDevice());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-lg py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/fitmate_logo_short.png"
              alt="Fitmates Logo"
              className="h-10 w-10"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              FITMATES
            </span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700 hover:text-orange-500 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          <div className="hidden md:flex items-center gap-6">
            <a href="#feed" className="text-gray-700 hover:text-orange-500 transition-colors">
              Explorer
            </a>
            <a href="#community" className="text-gray-700 hover:text-orange-500 transition-colors">
              Communauté
            </a>
            <a href="#groups" className="text-gray-700 hover:text-orange-500 transition-colors">
              Groupes
            </a>
            <a href="#leaderboard" className="text-gray-700 hover:text-orange-500 transition-colors">
              Leaderboard
            </a>
            <a href="#events" className="text-gray-700 hover:text-orange-500 transition-colors">
              Événements
            </a>
            <a
              href={getDownloadLink(deviceType)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-shadow"
            >
              {getButtonText(deviceType)}
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white z-40 md:hidden transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{ top: scrolled ? '64px' : '80px' }}
      >
        <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
          <a
            href="#feed"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl text-gray-700 hover:text-orange-500 transition-colors py-3 border-b border-gray-100"
          >
            Explorer
          </a>
          <a
            href="#community"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl text-gray-700 hover:text-orange-500 transition-colors py-3 border-b border-gray-100"
          >
            Communauté
          </a>
          <a
            href="#groups"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl text-gray-700 hover:text-orange-500 transition-colors py-3 border-b border-gray-100"
          >
            Groupes
          </a>
          <a
            href="#leaderboard"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl text-gray-700 hover:text-orange-500 transition-colors py-3 border-b border-gray-100"
          >
            Leaderboard
          </a>
          <a
            href="#events"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl text-gray-700 hover:text-orange-500 transition-colors py-3 border-b border-gray-100"
          >
            Événements
          </a>
          <a
            href={getDownloadLink(deviceType)}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-full hover:shadow-lg transition-shadow text-center text-xl font-semibold mt-4"
          >
            {getButtonText(deviceType)}
          </a>
        </div>
      </div>

      <Hero />
      <CommunityProfiles />
      <UserGeneratedContent />
      <HowItWorks />
      <Screenshots />
      <Features />
      <SportsSupported />
      <Stats />
      <DownloadCTA />
      <Footer />
    </div>
  );
}

export default App;
