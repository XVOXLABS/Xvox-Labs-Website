import Link from "next/link";
import Appear from "@/components/motion/Appear/Appear";
import Card from "@/components/ui/Card/Card";
import Category from "@/components/ui/Category/Category";
import Frame from "@/components/ui/Frame/Frame";
import Section from "@/components/ui/Section/Section";
import { interactive } from "@/data/pages/home";
import { servicePillars, services } from "@/data/services";
import { block, blocksByTag, homeSection } from "@/lib/content";
import SectionHead from "../../shared/SectionHead/SectionHead";
import styles from "./ServicePillars.module.css";

const serviceById = Object.fromEntries(services.map((sv) => [sv.id, sv]));
const MAX_CHIPS = 4;

// Section 8: "Expert work, when you need people too." Four tinted service-area cards
// (prototype pillarCard) and the Xvox Studio note (internal /studio route; external URL pending).
export default function ServicePillars() {
  const s = homeSection(8);
  const links = blocksByTag(s, "a.pil");
  const note = block(s, "p.note").text;
  const studio = block(s, "a");
  // Extraction joined the link and the next word with a space ("↗ , our"); the prototype has none.
  const [before, rest] = note.split(studio.text);
  const after = rest.replace(/^\s+(?=[,.])/, "");
  const t = interactive.serviceCard;
  return (
    <Section>
      <SectionHead eyebrow={block(s, "span.eb2").text} title={block(s, "h2.big").text} lead={block(s, "p.lead").text} />
      <Frame className={styles.grid}>
        {servicePillars.map((p, i) => {
          const chips = p.serviceIds.slice(0, MAX_CHIPS).map((id) => serviceById[id].title);
          const extra = p.serviceIds.length - MAX_CHIPS;
          return (
            <Appear key={p.id} delay={i * 70} className={styles.cell}>
              <Card href={links[i].href} tint={p.tint} className={styles.card}>
                <Category color={p.color}>{t.label}</Category>
                <h3 className={styles.title}>{p.name}</h3>
                <p className={styles.text}>{p.line}</p>
                <span className={styles.chips}>
                  {chips.map((c) => (
                    <span key={c} className={styles.chip}>
                      {c}
                    </span>
                  ))}
                  {extra > 0 ? <span className={styles.chip}>{t.more.replace("{count}", extra)}</span> : null}
                </span>
                <span className={styles.more}>
                  <span>{t.explore.replace("{name}", p.name)}</span>
                  <b aria-hidden="true">→</b>
                </span>
              </Card>
            </Appear>
          );
        })}
      </Frame>
      <p className={styles.note}>
        {before}
        <Link href={studio.href}>{studio.text}</Link>
        {after}
      </p>
    </Section>
  );
}
