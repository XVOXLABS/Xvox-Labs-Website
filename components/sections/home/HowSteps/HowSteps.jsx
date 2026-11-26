import Appear from "@/components/motion/Appear/Appear";
import Button from "@/components/ui/Button/Button";
import Card from "@/components/ui/Card/Card";
import Frame from "@/components/ui/Frame/Frame";
import Section from "@/components/ui/Section/Section";
import { block, blocksByTag, homeSection } from "@/lib/content";
import SectionHead from "../../shared/SectionHead/SectionHead";
import StepArt from "./StepArt";
import styles from "./HowSteps.module.css";

// Prototype howSteps(): tint and illustration per step, in order.
const STEPS = [
  { tint: "p1", art: "tell" },
  { tint: "p2", art: "build" },
  { tint: "p3", art: "run" },
  { tint: "p4", art: "plan" },
];

// Section 7: "Audit, build, live. Then we stay on." Four tinted step cards and a link to How it works.
export default function HowSteps() {
  const s = homeSection(7);
  const titles = blocksByTag(s, "h4");
  const texts = blocksByTag(s, "p");
  const link = block(s, "a.btn");
  return (
    <Section>
      <SectionHead layout="row" eyebrow={block(s, "span.eb2").text} title={block(s, "h2.big").text} />
      <Frame className={styles.grid}>
        {STEPS.map((step, i) => (
          <Appear key={titles[i].text} delay={i * 70} className={styles.cell}>
            <Card tint={step.tint} className={styles.step}>
              <h3 className={styles.title}>{titles[i].text}</h3>
              <p className={styles.text}>{texts[i].text}</p>
              <span className={styles.shot}>
                <StepArt kind={step.art} />
              </span>
            </Card>
          </Appear>
        ))}
      </Frame>
      <div>
        <Button href={link.href} variant="secondary">
          {link.text}
        </Button>
      </div>
    </Section>
  );
}
