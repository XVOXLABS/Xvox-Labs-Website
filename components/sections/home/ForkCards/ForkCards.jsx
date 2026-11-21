import Image from "next/image";
import Appear from "@/components/motion/Appear/Appear";
import Card from "@/components/ui/Card/Card";
import Category from "@/components/ui/Category/Category";
import Frame from "@/components/ui/Frame/Frame";
import IconButton from "@/components/ui/IconButton/IconButton";
import Section from "@/components/ui/Section/Section";
import { interactive } from "@/data/pages/home";
import { blocksByTag, homeSection } from "@/lib/content";
import styles from "./ForkCards.module.css";

// Section 5: "I need a team." / "I need one thing." (prototype forkSection).
// Two large cards in a grey frame; the second keeps the prototype's lavender tint.
export default function ForkCards() {
  const s = homeSection(5);
  const cards = blocksByTag(s, "a.fcard");
  const headings = blocksByTag(s, "h3");
  const texts = blocksByTag(s, "p.muted");
  const items = [
    { image: "/images/team.webp", alt: interactive.imageAlt.forkTeam, arrow: "↗", tone: "light", wide: true },
    { image: "/images/x-12.webp", alt: "", arrow: "→", tone: "dark", wide: false, tint: "p1" },
  ];
  return (
    <Section>
      <Frame className={styles.grid}>
        {items.map((item, i) => {
          const label = cards[i].text.slice(0, cards[i].text.indexOf(headings[i].text)).trim();
          return (
            <Appear key={cards[i].href} delay={i * 70} className={styles.cell}>
              <Card href={cards[i].href} tint={item.tint} padding="lg" className={styles.card}>
                <Category color="var(--color-ink)">{label}</Category>
                <h3 className={styles.title}>{headings[i].text}</h3>
                <p className={styles.text}>{texts[i].text}</p>
                <span className={item.wide ? styles.mediaWide : styles.mediaOne}>
                  <Image src={item.image} alt={item.alt} fill sizes="(max-width: 809px) 100vw, 560px" className={styles.img} />
                </span>
                <IconButton tone={item.tone} className={styles.arrow}>
                  {item.arrow}
                </IconButton>
              </Card>
            </Appear>
          );
        })}
      </Frame>
    </Section>
  );
}
