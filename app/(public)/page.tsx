import { HeroSection } from "@/modules/public/ui/section/landing/hero-section";
import { FeaturesSection } from "@/modules/public/ui/section/landing/features-section";
import { HowItWorksSection } from "@/modules/public/ui/section/landing/how-it-works-section";
import { TechStackSection } from "@/modules/public/ui/section/landing/tech-stack-section";
import { CTASection } from "@/modules/public/ui/section/landing/cta-section";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TechStackSection />
      <CTASection />
    </>
  );
}
