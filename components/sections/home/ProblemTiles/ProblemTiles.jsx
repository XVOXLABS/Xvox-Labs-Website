import Image from "next/image";
import Appear from "@/components/motion/Appear/Appear";
import Card from "@/components/ui/Card/Card";
import Category from "@/components/ui/Category/Category";
import Frame from "@/components/ui/Frame/Frame";
import IconButton from "@/components/ui/IconButton/IconButton";
import Section from "@/components/ui/Section/Section";
import { departments } from "@/data/departments";
import { block, blocksByTag, homeSection } from "@/lib/content";
import SectionHead from "../../shared/SectionHead/SectionHead";
import NotSureTile from "./NotSureTile";
import styles from "./ProblemTiles.module.css";

const SIZES = "(max-width: 809px) 100vw, (max-width: 1199px) 50vw, 360px";

// Section 4: "What's getting in your way?" Five department tiles (prototype deptTile) and the
// "06 / Not sure yet" tile that opens Vox. Framer use-case cards inside a grey frame.
export default function ProblemTiles() {
  const s = homeSection(4);
  const links = blocksByTag(s, "a.icard");
  const heading = block(s, "h3", 5).text;
  const tile = block(s, "button.icard").text; // "→ 06 / Not sure yet <heading> <text>"
  const notSure = { label: tile.slice(tile.indexOf(" ") + 1, tile.indexOf(heading)).trim(), heading, text: block(s, "p.muted", 5).text };
  return (
    <Section>
      <SectionHead eyebrow={block(s, "span.eb2").text} title={block(s, "h2.big").text} lead={block(s, "p.lead").text} />
      <Frame className={styles.grid}>
        {departments.map((d, i) => (
          <Appear key={d.id} delay={Math.min(i, 10) * 70} className={styles.cell}>
            <Card href={links[i].href} className={styles.tile}>
              <span className={styles.media}>
                <Image src={d.image} alt="" fill sizes={SIZES} className={styles.img} />
                <IconButton tone="light" className={styles.arrow}>
                  ↗
                </IconButton>
              </span>
              <Category color={d.color}>{`0${i + 1} / ${d.name}`}</Category>
              <h3 className={styles.title}>{d.pain}</h3>
              <p className={styles.text}>{d.line}</p>
            </Card>
          </Appear>
        ))}
        <Appear delay={departments.length * 70} className={styles.cell}>
          <NotSureTile label={notSure.label} heading={notSure.heading} text={notSure.text} sizes={SIZES} />
        </Appear>
      </Frame>
    </Section>
  );
}
