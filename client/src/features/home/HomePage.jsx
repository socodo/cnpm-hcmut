import { useEffect } from "react";
import HeroSection from "./components/HeroSection";
import WhyChooseUs from "./components/WhyChooseUs";
import HowWork from "./components/HowWorkSection";
import SubjectSection from "./components/SubjectSection";
import ReadytoStarted from "./components/ReadytoStarted";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <HeroSection />
      <WhyChooseUs />
      <HowWork />
      <SubjectSection />
      <ReadytoStarted />
    </div>
  );
};

export default HomePage;
