import Button from "@/components/ui/Button/Button";
import Section from "@/components/ui/Section/Section";
import { block, blocksByTag } from "@/lib/content";
import SectionHead from "../SectionHead/SectionHead";
import MissionBoard from "./MissionBoard";
import styles from "./MissionBoard.module.css";

// Mission Board section (prototype buildHTML): heading, lead, optional "Open full screen" button, and the
// interactive board. Labels come from the extracted page blocks (data/pages/how-it-works.js section 8,
// the same blocks as data/pages/build.js section 1). `fullScreen` is off on /build itself (decision D1).
export default function MissionBoardSection({ blocks, fullScreen = false, readParam = false, id }) {
  const full = block(blocks, "a.btn");
  const [fillButton, resetButton, askButton] = blocksByTag(blocks, "button.btn");
  const labels = {
    drop: block(blocks, "div.drop").text,
    lock: block(blocks, "span.lock").text,
    tray: block(blocks, "h5", 0).text,
    systems: block(blocks, "h5", 1).text,
    live: block(blocks, "span.eyebrow", 1).text,
    fill: fillButton.text,
    reset: resetButton.text,
    ask: askButton.text,
  };
  return (
    <Section id={id} className={styles.following}>
      <SectionHead layout={fullScreen ? "side" : "stack"} eyebrow={block(blocks, "span.eyebrow").text} title={block(blocks, "h2.big").text} lead={block(blocks, "p.lead").text}
        action={fullScreen ? <Button href={full.href} variant="secondary" className={styles.tall}>{full.text}</Button> : undefined} />
      <MissionBoard labels={labels} readParam={readParam} />
    </Section>
  );
}
