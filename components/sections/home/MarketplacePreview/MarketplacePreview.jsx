import Button from "@/components/ui/Button/Button";
import Section from "@/components/ui/Section/Section";
import { interactive } from "@/data/pages/home";
import { block, blocksByTag, homeSection } from "@/lib/content";
import MarketplaceFeatured from "../../shared/MarketplaceFeatured/MarketplaceFeatured";
import SectionHead from "../../shared/SectionHead/SectionHead";

// Section 13: "Or take the ready-made version." Heading, lead, the Featured and type tabs with their
// item cards, and the link to the marketplace. The "Sample catalogue" placeholder note stays hidden.
export default function MarketplacePreview() {
  const s = homeSection(13);
  const eyebrow = block(s, "span.eb2").text;
  const labels = blocksByTag(s, "button").map((b) => b.text);
  const open = block(s, "a.btn");

  return (
    <Section>
      <SectionHead eyebrow={eyebrow} title={block(s, "h2.big").text} lead={block(s, "p.lead").text} />
      <MarketplaceFeatured featuredIds={interactive.featuredItems} labels={labels} label={eyebrow} />
      <div>
        <Button href={open.href}>{open.text}</Button>
      </div>
    </Section>
  );
}
