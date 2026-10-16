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
import SiteNav from './components/SiteNav';
import Seo from './seo/Seo';
import { homeMeta } from './seo/meta';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Seo meta={homeMeta()} />
      <SiteNav />

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
