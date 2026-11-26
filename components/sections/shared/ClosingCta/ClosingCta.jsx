import Button from "@/components/ui/Button/Button";
import Section from "@/components/ui/Section/Section";
import SectionHeader from "@/components/ui/SectionHeader/SectionHeader";
import { VOX_HREF } from "@/lib/actions";
import { block, display, homeSection } from "@/lib/content";
import styles from "./ClosingCta.module.css";

// Section 16: "Start with a two-minute plan." (prototype finalCTA).
// The lead uses the approved K4 wording (no follow-up promise while nothing is sent).
export default function ClosingCta() {
  const s = homeSection(16);
  const ask = block(s, "button.btn");
  const book = block(s, "a.btn");
  return (
    <Section>
      <SectionHeader
        layout="closing"
        level={2}
        size="h1"
        title={block(s, "h2").text}
        lead={display(block(s, "p.lead"))}
        action={
          <div className={styles.actions}>
            <Button href={VOX_HREF}>{ask.text}</Button>
            <Button href={book.href} variant="secondary">
              {book.text}
            </Button>
          </div>
        }
      />
    </Section>
  );
}
