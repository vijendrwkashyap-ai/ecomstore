import HeroSection from "@/components/HeroSection";
import CategoryNav from "@/components/CategoryNav";
import FabricStory from "@/components/FabricStory";
import ProductBreakdown from "@/components/ProductBreakdown";
import ParallaxGallery from "@/components/ParallaxGallery";
import MensCollection from "@/components/MensCollection";
import WomensCollection from "@/components/WomensCollection";
import ProductCTA from "@/components/ProductCTA";
import FinalCTA from "@/components/FinalCTA";

// Premium Sections
import BrandHeritage from "@/components/premium/BrandHeritage";
import SignatureBento from "@/components/premium/SignatureBento";
import ModernInnovation from "@/components/premium/ModernInnovation";
import InteractiveLookbook from "@/components/premium/InteractiveLookbook";
import ExclusiveVip from "@/components/premium/ExclusiveVip";
import PressTrust from "@/components/premium/PressTrust";
import LuxuryReveal from "@/components/premium/LuxuryReveal";
import AtmosphereArchive from "@/components/premium/AtmosphereArchive";
import PremiumVideoCarousel from "@/components/premium/PremiumVideoCarousel";

export default function Home() {
  return (
    <main className="relative bg-white w-full min-h-screen">
      <HeroSection />
      <BrandHeritage />
      <CategoryNav />
      <SignatureBento />
      <FabricStory />
      <ModernInnovation />
      <ProductBreakdown />
      <InteractiveLookbook />
      <ParallaxGallery />
      <PressTrust />
      <MensCollection />
      <WomensCollection />
      
      {/* New Overhauled Premium Sections replacing legacy ones */}
      <LuxuryReveal />
      
      {/* Premium Video Showcase */}
      <PremiumVideoCarousel />
      
      <AtmosphereArchive />
      
      <ExclusiveVip />
      <ProductCTA />
      <FinalCTA />
    </main>
  );
}
