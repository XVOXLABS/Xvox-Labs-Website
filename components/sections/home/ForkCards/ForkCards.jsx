import Image from "next/image";
import Appear from "@/components/motion/Appear/Appear";
import Link from "next/link";
import IconButton from "@/components/ui/IconButton/IconButton";
import Section from "@/components/ui/Section/Section";
import { interactive } from "@/data/pages/home";
import { blocksByTag, homeSection } from "@/lib/content";
import styles from "./ForkCards.module.css";

// Section 5: "I need a team." / "I need one thing." (prototype forkSection).
// Two tall cards with full-width artwork anchored to the bottom (prototype .fork; the second card's
// picture is full width like the first, owner decision FORK-1).
export default function ForkCards() {
  const s = homeSection(5);
  const cards = blocksByTag(s, "a.fcard");
  const headings = blocksByTag(s, "h3");
  const texts = blocksByTag(s, "p.muted");
  const items = [
    { image: "/images/team.webp", width: 1100, height: 471, alt: interactive.imageAlt.forkTeam, arrow: "↗", tone: "light" },
    { image: "/images/x-12.webp", width: 736, height: 1104, alt: "", arrow: "→", tone: "dark", one: true },
  ];
  return (
    <Section className={styles.section}>
      <div className={styles.grid}>
        {items.map((item, i) => {
          const label = cards[i].text.slice(0, cards[i].text.indexOf(headings[i].text)).trim();
          return (
            <Appear key={cards[i].href} delay={i * 70} className={styles.cell}>
              <Link href={cards[i].href} className={`${styles.card} ${item.one ? styles.alt : ""}`.trim()}>
                <span className={styles.label}>{label}</span>
                <h3 className={styles.title}>{headings[i].text}</h3>
                <p className={styles.text}>{texts[i].text}</p>
                <Image src={item.image} alt={item.alt} width={item.width} height={item.height}
                  sizes="(max-width: 760px) 100vw, 542px" className={`${styles.picture} ${item.one ? styles.stones : ""}`.trim()} />
                <IconButton tone={item.tone} className={styles.arrow}>
                  {item.arrow}
                </IconButton>
              </Link>
            </Appear>
          );
        })}
      </div>
    </Section>
  );
}
