import { Footer } from "@/components/common/Footer";
import AIFeaturesSection from "@/components/landing/AIFeaturesSection";
import { FeaturedPlannerSection } from "@/components/landing/FeaturedPlannerSection";
import HeroScetion from "@/components/landing/HeroScetion";
import { PlannerSection } from "@/components/landing/PlannerSection";
import ServicesOverviewSection from "@/components/landing/ServicesOverviewSection";
import { VenueDescriptionSection } from "@/components/landing/VenueDescriptionSection";
import { WeddingPlanningSection } from "@/components/landing/WeddingPlanningSection";
import Navbar from "@/components/layout/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroScetion />
      <PlannerSection />
      <AIFeaturesSection />
      <WeddingPlanningSection />
      <ServicesOverviewSection />
      <FeaturedPlannerSection />
      <VenueDescriptionSection />
      <Footer />
    </>
  );
}
