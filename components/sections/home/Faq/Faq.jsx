import Accordion from "@/components/ui/Accordion/Accordion";
import Button from "@/components/ui/Button/Button";
import Category from "@/components/ui/Category/Category";
import Section from "@/components/ui/Section/Section";
import { faq } from "@/data/faq";
import { VOX_HREF } from "@/lib/actions";
import { block, homeSection } from "@/lib/content";
import styles from "./Faq.module.css";

export default function Faq() {
  const section = homeSection(14);

  return (
    <Section aria-labelledby="home-faq-title">
      <div className={styles.layout}>
        <header className={styles.intro}>
          <Category color="var(--color-ink)">{block(section, "span.eyebrow").text}</Category>
          <h2 id="home-faq-title" className={styles.title}>
            {block(section, "h2.big").text}
          </h2>
          <p className={styles.lead}>{block(section, "p.lead").text}</p>
          <Button href={VOX_HREF} variant="secondary" className={styles.ask}>
            {block(section, "button.btn").text}
          </Button>
        </header>
        <Accordion items={faq} numbered={false} defaultOpen={-1} />
      </div>
    </Section>
  );
}
