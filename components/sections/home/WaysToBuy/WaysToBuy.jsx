import Section from "@/components/ui/Section/Section";
import { interactive } from "@/data/pages/home";
import { block, blocksByTag, homeSection } from "@/lib/content";
import BuyingLadder from "../../shared/BuyingLadder/BuyingLadder";
import SectionHead from "../../shared/SectionHead/SectionHead";

// Section 12: "From a free plan to fully run for you." The six-step ladder (prototype ladderHTML)
// and its footnote. Step titles, text, prices and buttons come from data/pricing.js through
// BuyingLadder; "Step n" labels and the footnote come from home section 12.
export default function WaysToBuy() {
  const s = homeSection(12);
  const stepLabels = blocksByTag(s, "span.ln").map((b) => b.text);
  const link = blocksByTag(s, "a").find((b) => b.href === "/pricing");
  // Footnote sentences from the data text, without the link text. Decision A3: the sentence about
  // prices "to set" stays hidden; "Download means you run it. Hire means we run it." stays.
  const sentences = block(s, "p.note")
    .text.replace(link.text, "")
    .split(/(?<=\.)\s+/)
    .map((t) => t.trim())
    .filter((t) => t && !t.includes("“to set”"));

  return (
    <Section>
      <SectionHead eyebrow={block(s, "span.eb2").text} title={block(s, "h2.big").text} />
      <BuyingLadder about={interactive.ladderAbout} stepLabels={stepLabels} note={{ sentences, link: { text: link.text, href: link.href } }} />
    </Section>
  );
}
