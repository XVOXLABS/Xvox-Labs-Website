import Contact from "@/components/sections/home/Contact/Contact";
import Faq from "@/components/sections/home/Faq/Faq";
import ForkCards from "@/components/sections/home/ForkCards/ForkCards";
import HeroSequence from "@/components/sections/home/HeroSequence/HeroSequence";
import HowSteps from "@/components/sections/home/HowSteps/HowSteps";
import MarketplacePreview from "@/components/sections/home/MarketplacePreview/MarketplacePreview";
import ProblemTiles from "@/components/sections/home/ProblemTiles/ProblemTiles";
import PuzzleStage from "@/components/sections/home/PuzzleStage/PuzzleStage";
import SafeAiBox from "@/components/sections/home/SafeAiBox/SafeAiBox";
import TeamAtWork from "@/components/sections/home/TeamAtWork/TeamAtWork";
import ServicePillars from "@/components/sections/home/ServicePillars/ServicePillars";
import ToolsStrip from "@/components/sections/home/ToolsStrip/ToolsStrip";
import WaysToBuy from "@/components/sections/home/WaysToBuy/WaysToBuy";
import WeekCompare from "@/components/sections/home/WeekCompare/WeekCompare";
import ClosingCta from "@/components/sections/shared/ClosingCta/ClosingCta";

// Homepage, in the prototype's section order (Phase 4 plan, section B).
// Sections still to be built are marked by step; nothing stands in for them.
export default function Home() {
  return (
    <>
      <HeroSequence />
      <PuzzleStage />
      <ToolsStrip />
      <ProblemTiles />
      <ForkCards />
      <TeamAtWork />
      <HowSteps />
      <ServicePillars />
      <WeekCompare />
      <SafeAiBox />
      {/* 11. Proof: hidden (Phase 2 decision) */}
      <WaysToBuy />
      <MarketplacePreview />
      <Faq />
      <Contact />
      <ClosingCta />
    </>
  );
}
