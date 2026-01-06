import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import ActivityFeed from './components/ActivityFeed';
import CommunityProfiles from './components/CommunityProfiles';
import SocialInteractions from './components/SocialInteractions';
import UserGeneratedContent from './components/UserGeneratedContent';
import Features from './components/Features';
import SportsSupported from './components/SportsSupported';
import HowItWorks from './components/HowItWorks';
import Screenshots from './components/Screenshots';
import Stats from './components/Stats';
import DownloadCTA from './components/DownloadCTA';
import Footer from './components/Footer';

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-shadow">
              Rejoindre
            </button>
          </div>
        </div>
      </nav>

      <Hero />
      <ActivityFeed />
      <CommunityProfiles />
      <SocialInteractions />
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
