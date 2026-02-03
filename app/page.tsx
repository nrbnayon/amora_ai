import { Footer } from "@/components/common/Footer";
import AIFeaturesSection from "@/components/landing/AIFeaturesSection";
import { FeaturedPlannerSection } from "@/components/landing/FeaturedPlannerSection";
import HeroScetion from "@/components/landing/HeroScetion";
import { PlannerSection } from "@/components/landing/PlannerSection";
import ServicesOverviewSection from "@/components/landing/ServicesOverviewSection";
import { VenueDescriptionSection } from "@/components/landing/VenueDescriptionSection";
import { WeddingPlanningSection } from "@/components/landing/WeddingPlanningSection";
import Navbar from "@/components/layout/navbar";
import { generateSEO } from "@/lib/seo";
import { AnimatedSection } from "@/components/animations/AnimatedSection";

export const metadata = generateSEO({
  title: "AI-Powered Wedding Planning Platform",
  description:
    "Plan your dream wedding with AI assistance. From venue selection to guest management, budget tracking, and timeline coordination - all in one intelligent platform.",
  tags: [
    "wedding planning",
    "AI wedding planner",
    "wedding organizer",
    "event planning",
    "wedding budget",
    "venue selection",
  ],
  type: "website",
});
export default function Home() {
  return (
    <>
      <Navbar />
      <HeroScetion />
      <AnimatedSection direction="up" delay={0.1}>
        <PlannerSection />
      </AnimatedSection>
      <AnimatedSection direction="up" delay={0.1}>
        <AIFeaturesSection />
      </AnimatedSection>
      <AnimatedSection direction="up" delay={0.1}>
        <WeddingPlanningSection />
      </AnimatedSection>
      <AnimatedSection direction="up" delay={0.1}>
        <ServicesOverviewSection />
      </AnimatedSection>
      <AnimatedSection direction="up" delay={0.1}>
        <FeaturedPlannerSection />
      </AnimatedSection>
      <AnimatedSection direction="up" delay={0.1}>
        <VenueDescriptionSection />
      </AnimatedSection>
      <AnimatedSection direction="up" delay={0.1}>
        <Footer />
      </AnimatedSection>
    </>
  );
}
