import ForkCards from "@/components/sections/home/ForkCards/ForkCards";
import HowSteps from "@/components/sections/home/HowSteps/HowSteps";
import ProblemTiles from "@/components/sections/home/ProblemTiles/ProblemTiles";
import SafeAiBox from "@/components/sections/home/SafeAiBox/SafeAiBox";
import ServicePillars from "@/components/sections/home/ServicePillars/ServicePillars";
import ToolsStrip from "@/components/sections/home/ToolsStrip/ToolsStrip";
import WeekCompare from "@/components/sections/home/WeekCompare/WeekCompare";
import ClosingCta from "@/components/sections/shared/ClosingCta/ClosingCta";

// Homepage, in the prototype's section order (Phase 4 plan, section B).
// Sections still to be built are marked by step; nothing stands in for them.
export default function Home() {
  return (
    <>
      {/* 1. Hero sequence: step 3 */}
      {/* 2. Puzzle stage: step 4 */}
      <ToolsStrip />
      <ProblemTiles />
      <ForkCards />
      {/* 6. Team at work (orchestration): step 5 */}
      <HowSteps />
      <ServicePillars />
      <WeekCompare />
      <SafeAiBox />
      {/* 11. Proof: hidden (Phase 2 decision) */}
      {/* 12. Buying ladder, 13. Marketplace: step 6 */}
      {/* 14. FAQ, 15. Contact: step 7 */}
      <ClosingCta />
    </>
  );
}
