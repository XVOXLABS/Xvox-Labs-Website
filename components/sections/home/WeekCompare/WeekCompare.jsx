import Appear from "@/components/motion/Appear/Appear";
import Card from "@/components/ui/Card/Card";
import Frame from "@/components/ui/Frame/Frame";
import Section from "@/components/ui/Section/Section";
import { block, blocksByTag, homeSection } from "@/lib/content";
import SectionHead from "../../shared/SectionHead/SectionHead";
import styles from "./WeekCompare.module.css";

// Section 9: "Same business. More breathing room." Without us / With Xvox Labs (prototype weekSection).
export default function WeekCompare() {
  const s = homeSection(9);
  const labels = blocksByTag(s, "span.inum");
  const headings = blocksByTag(s, "h3");
  const items = blocksByTag(s, "li");
  const per = items.length / 2;
  const sides = [
    { kind: "without", label: labels[0].text, heading: headings[0].text, list: items.slice(0, per) },
    { kind: "with", label: labels[1].text, heading: headings[1].text, list: items.slice(per) },
  ];
  return (
    <Section>
      <SectionHead eyebrow={block(s, "span.eb2").text} title={block(s, "h2.big").text} />
      <Frame className={styles.grid}>
        {sides.map((side, i) => (
          <Appear key={side.kind} delay={i * 70} className={styles.cell}>
            <Card padding="lg" className={`${styles.card} ${styles[side.kind]}`}>
              <span className={styles.label}>{side.label}</span>
              <h3 className={styles.title}>{side.heading}</h3>
              <ul className={styles.list}>
                {side.list.map((li) => (
                  <li key={li.text}>{li.text}</li>
                ))}
              </ul>
            </Card>
          </Appear>
        ))}
      </Frame>
    </Section>
  );
}
