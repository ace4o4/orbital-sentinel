import GlassNavbar from '@/components/GlassNavbar';
import HeroSection from '@/components/HeroSection';
import BentoGrid from '@/components/BentoGrid';
import Footer from '@/components/Footer';
import SparklesBackground from '@/components/SparklesBackground';

const Index = () => {
  return (
    <div className="min-h-screen bg-void relative overflow-x-hidden">
      {/* Particle Background */}
      <SparklesBackground particleCount={40} />
      
      {/* Navigation */}
      <GlassNavbar />
      
      {/* Hero Section with Globe */}
      <HeroSection />
      
      {/* Features Bento Grid */}
      <BentoGrid />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
