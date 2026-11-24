import Image from "next/image";
import MissionBoardSection from "@/components/sections/shared/MissionBoard/MissionBoardSection";
import SectionHead from "@/components/sections/shared/SectionHead/SectionHead";
import Button from "@/components/ui/Button/Button";
import Frame from "@/components/ui/Frame/Frame";
import Section from "@/components/ui/Section/Section";
import { missionBoardText } from "@/data/missionBoard";
import { phase3Pages, sectionBlocks } from "@/data/phase3Pages";
import { VOX_HREF } from "@/lib/actions";
import { block } from "@/lib/content";
import { Closing, Intro } from "../company/Shared";
import styles from "./build.module.css";

export const metadata = { title: "Mission board" };

// /build: the full-screen Mission Board (prototype PAGES.build). Same board as the How it works hub, with
// "Open full screen" hidden (decision D1), then "Or start complete" and the closing call to action.
export default function BuildPage() {
  const entry = phase3Pages.build;
  const [head, board, complete, closing] = [0, 1, 2, 3].map((i) => sectionBlocks(entry, i));
  const team = block(complete, "a.btn");
  return (
    <>
      <Intro blocks={head} />
      <MissionBoardSection blocks={board} readParam />
      <Section className={styles.following}>
        <SectionHead eyebrow={block(complete, "span.eyebrow").text} title={block(complete, "h2.big").text} />
        <Frame className={styles.complete}>
          <div className={styles.image}>
            <Image src="/images/team.webp" alt={missionBoardText.teamAlt} fill sizes="(max-width: 809px) 100vw, 640px" />
          </div>
          <div className={styles.actions}>
            <Button href={team.href}>{team.text}</Button>
            <Button href={VOX_HREF} variant="secondary">{block(complete, "button.btn").text}</Button>
          </div>
        </Frame>
      </Section>
      <Closing blocks={closing} />
    </>
  );
}
