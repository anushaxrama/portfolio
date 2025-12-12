import { useState, useEffect } from "react";
import SplashScreen from "@/components/SplashScreen";
import ParticleBackground from "@/components/ParticleBackground";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import RecentWork from "@/components/RecentWork";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="relative overflow-x-hidden bg-black">
      <ParticleBackground />
      <Navigation />
      <HeroSection />
      <RecentWork />
    </div>
  );
};

export default Index;
