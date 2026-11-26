import Image from "next/image";
import MissionBoardSection from "@/components/sections/shared/MissionBoard/MissionBoardSection";
import SectionHead from "@/components/sections/shared/SectionHead/SectionHead";
import Accordion from "@/components/ui/Accordion/Accordion";
import Button from "@/components/ui/Button/Button";
import Card from "@/components/ui/Card/Card";
import Category from "@/components/ui/Category/Category";
import Frame from "@/components/ui/Frame/Frame";
import Section from "@/components/ui/Section/Section";
import SectionHeader from "@/components/ui/SectionHeader/SectionHeader";
import { vox } from "@/data/agents";
import { agentPageText, agentProfiles, agentWorkflows, sectionBlocks, teamBanner } from "@/data/agentsPages";
import { faq } from "@/data/faq";
import { models } from "@/data/how-it-works";
import { VOX_HREF } from "@/lib/actions";
import { block, blocksByTag } from "@/lib/content";
import { DepartmentWork } from "../solutions/SolutionsInteractions";
import { AgentArt, AgentQuickViews, ModelSelector } from "./AgentInteractions";
import styles from "./how-it-works.module.css";
import SafeAiBox from "@/components/sections/home/SafeAiBox/SafeAiBox";

function Head({ blocks, title = "h2.big", lead = false, ...props }) {
  return <SectionHead eyebrow={block(blocks, "span.eyebrow").text} title={block(blocks, title).text}
    lead={lead ? block(blocks, "p.lead").text : undefined} {...props} />;
}

export function AgentClosing({ blocks }) {
  const book = block(blocks, "a.btn");
  return (
    <Section className={styles.following}>
      <SectionHeader layout="closing" title={block(blocks, "h2").text} lead={block(blocks, "p.lead").text}
          action={<div className={styles.actions}><Button href={VOX_HREF}>{block(blocks, "button.btn").text}</Button>
            <Button href={book.href} variant="secondary">{book.text}</Button></div>} />
    </Section>
  );
}

function Team({ directory, banner }) {
  const custom = block(directory, "a.btn");
  const labels = blocksByTag(banner, "button.hot");
  return (
    <AgentQuickViews>
      <Section id="team" className={styles.following}>
        <Head blocks={directory} lead layout="side" action={<Button href={custom.href} variant="secondary">{custom.text}</Button>} />
        <Frame className={styles.directory}>
          {agentProfiles.map(({ href, record }) => (
            <Card key={href} href={href} tint={record.tint} className={styles.agentCard} data-agent-popup={record.id} aria-haspopup="dialog">
              <Category color={record.color}>{record.role}</Category>
              <h3>{record.name}</h3>
              <p>{record.result}</p>
              <AgentArt agent={record} className={styles.cardArt} />
              <span className={styles.cardArrow} aria-hidden="true">→</span>
            </Card>
          ))}
          <Button href={VOX_HREF} className={styles.voxCard}>
            <span className={styles.voxContent}>
              <span>{agentPageText.voxRole}</span>
              <strong>{block(directory, "h3", agentProfiles.length).text}</strong>
              <span>{block(directory, "p").text}</span>
            </span>
            <AgentArt agent={vox} className={styles.cardArt} />
            <span className={styles.cardArrow} aria-hidden="true">→</span>
          </Button>
        </Frame>
      </Section>
      <Section className={styles.following}>
        <Frame>
          <div className={styles.banner}>
            <Image src={teamBanner.image} alt={teamBanner.alt} width={1600} height={685} sizes="(max-width: 1199px) 100vw, 1136px" />
            {teamBanner.hotspots.map(([id, left, top], i) => {
              const props = { className: styles.hotspot, style: { "--x": `${left}%`, "--y": `${top}%` }, "aria-label": labels[i].text };
              const label = <span className={styles.hotLabel} aria-hidden="true">{labels[i].text}</span>;
              return id === "vox" ? <Button key={id} {...props} href={VOX_HREF}>{label}</Button> : (
                <button key={id} type="button" {...props} data-agent-popup={id} data-agent-tab="skills" aria-haspopup="dialog">{label}</button>
              );
            })}
          </div>
        </Frame>
      </Section>
    </AgentQuickViews>
  );
}

// The four delivery phases (prototype gantt()). The week columns, bars and duration are not published (REF-9).
function Delivery({ blocks }) {
  const notes = blocksByTag(blocks, "span");
  const summary = block(blocks, "div.g-done").text;
  return (
    <Section className={styles.following}>
      {/* The prototype heading was the duration, so the introduction line is the heading */}
      <SectionHead eyebrow={block(blocks, "span.eyebrow").text} title={block(blocks, "p.lead").text} />
      <Frame>
        <ol className={styles.timeline}>
          {blocksByTag(blocks, "b").map(({ text }, i) => (
            <li key={text} className={styles.phase}>
              <strong>{text}</strong>
              <p className={styles.muted}>{notes[i].text}</p>
            </li>
          ))}
        </ol>
        <p>{summary}</p>
      </Frame>
    </Section>
  );
}

export default function HowItWorksSections({ entry }) {
  const section = (index) => sectionBlocks(entry, index);
  const hero = section(0);
  const book = block(hero, "a.btn");
  const steps = section(1);
  const work = section(2);
  const compatibility = section(7);
  const questions = section(9);
  return (
    <>
      <Section>
        <SectionHeader level={1} title={entry.title} eyebrow={<Category>{block(hero, "span.eyebrow").text}</Category>}
          lead={block(hero, "p.lead").text} action={<div className={styles.actions}>
            <Button href={VOX_HREF}>{block(hero, "button.btn").text}</Button><Button href={book.href} variant="secondary">{book.text}</Button>
          </div>} />
      </Section>
      <Section className={styles.following}>
        <Frame className={styles.four}>
          {blocksByTag(steps, "h4").map(({ text }, i) => <Card key={text} tint={`p${i + 1}`}><h2 className={styles.smallHead}>{text}</h2><p>{block(steps, "p", i).text}</p></Card>)}
        </Frame>
      </Section>
      <Section className={styles.following}>
        <Head blocks={work} layout="center" />
        <DepartmentWork flows={agentWorkflows} label={block(work, "span.eyebrow").text} seeSolution={block(work, "a.btn").text} />
      </Section>
      <Team directory={section(3)} banner={section(4)} />
      <SafeAiBox className={styles.following} />
      <Delivery blocks={section(6)} />
      <Section className={styles.following}>
        <Head blocks={compatibility} lead />
        <Frame><ModelSelector models={models} label={block(compatibility, "span.eyebrow").text} toast={agentPageText.modelToast}
          note={block(compatibility, "p.note").text} agents={agentProfiles.filter(({ record }) => record.id !== "sage").map(({ record }) => record).concat(agentProfiles.find(({ record }) => record.id === "sage").record)} /></Frame>
      </Section>
      <MissionBoardSection blocks={section(8)} id="build-sec" fullScreen />
      <Section className={styles.following} containerClassName={styles.two}>
        <Head blocks={questions} lead action={<Button href={VOX_HREF} variant="secondary">{block(questions, "button.btn").text}</Button>} />
        <Accordion items={faq} numbered={false} defaultOpen={-1} />
      </Section>
      <AgentClosing blocks={section(10)} />
    </>
  );
}
