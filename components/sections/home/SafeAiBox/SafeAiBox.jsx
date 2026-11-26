import Image from "next/image";
import Appear from "@/components/motion/Appear/Appear";
import Button from "@/components/ui/Button/Button";
import Category from "@/components/ui/Category/Category";
import Section from "@/components/ui/Section/Section";
import { agents } from "@/data/agents";
import { block, blocksByTag, homeSection } from "@/lib/content";
import RevealWords from "../../shared/RevealWords/RevealWords";
import styles from "./SafeAiBox.module.css";

const sage = agents.find((a) => a.id === "sage");

// Section 10: "Your data, your rules, your approval." The prototype's dark Safe AI panel (safeBox):
// ticks, two buttons, and Sage with its "check passed" card.
export default function SafeAiBox({ className }) {
  const s = homeSection(10);
  const [trust, review] = blocksByTag(s, "a.btn");
  return (
    <Section className={className}>
      <Appear className={styles.box}>
        <div className={styles.copy}>
          <Category color="var(--color-on-dark)" className={styles.eyebrow}>
            {block(s, "span.eyebrow").text}
          </Category>
          <h2 className={styles.title}>
            <RevealWords text={block(s, "h2").text} tone="dark" />
          </h2>
          <ul className={styles.ticks}>
            {blocksByTag(s, "li").map((li) => (
              <li key={li.text}>{li.text}</li>
            ))}
          </ul>
          <div className={styles.actions}>
            <Button href={trust.href} variant="accent" className={styles.go}>
              {trust.text}
            </Button>
            <Button href={review.href} variant="secondary">
              {review.text}
            </Button>
          </div>
        </div>
        <div className={styles.figure}>
          <span className={styles.sage}>
            <Image src={sage.image} alt="" width={620} height={602} sizes="240px" className={styles.sageImg} />
          </span>
          <div className={styles.card}>
            <b>{block(s, "b").text}</b>
            <span>{block(s, "span").text}</span>
            <span className={styles.dot} aria-hidden="true" />
          </div>
        </div>
      </Appear>
    </Section>
  );
}
