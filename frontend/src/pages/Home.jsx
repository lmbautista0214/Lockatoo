import { HeroSection } from "../components/Home/HeroSection";
import { FeaturesSection } from "../components/Home/FeaturesSection";
import { ModernSection } from "../components/Home/ModernSection";
import { HowItWorks } from "../components/Home/HowItWorks";
import { GetStarted } from "../components/Home/GetStarted";
import { Footer } from "../components/Home/Footer";

export const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <ModernSection />
      <HowItWorks />
      <GetStarted />
      <Footer />
    </div>
  );
};
