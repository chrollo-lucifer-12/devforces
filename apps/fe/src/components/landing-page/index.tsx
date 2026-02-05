"use client";
import { BackgroundRippleEffect } from "@repo/ui/components/ui/background-ripple-effect";
import { CTASection } from "./cta-section";
import { FeaturesSection } from "./features-section";
import { Footer } from "./footer";
import { HeroSection } from "./hero-section";
import { Navbar } from "./navbar";
import { StatsSection } from "./stats-section";
import { HowItWorksSection } from "./working-section";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <div className=" -z-10 w-full ">
        <BackgroundRippleEffect rows={60} />
      </div>

      <div className="relative z-10 w-full">
        <Navbar />
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
