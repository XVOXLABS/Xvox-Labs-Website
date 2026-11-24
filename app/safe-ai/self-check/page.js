import Link from "next/link";
import Category from "@/components/ui/Category/Category";
import Frame from "@/components/ui/Frame/Frame";
import Section from "@/components/ui/Section/Section";
import SectionHeader from "@/components/ui/SectionHeader/SectionHeader";
import { phase3Pages, sectionBlocks } from "@/data/phase3Pages";
import { checks, selfCheckQuestions } from "@/data/safe-ai";
import { block, blocksByTag } from "@/lib/content";
import SelfCheck from "./SelfCheck";
import styles from "./selfcheck.module.css";

export const metadata = { title: "Safe AI self-check" };

export default function SelfCheckPage() {
  const head = sectionBlocks(phase3Pages.selfCheck, 0);
  const crumbs = [...blocksByTag(head, "a"), block(head, "b")];
  return (
    <>
      <Section>
        <nav aria-label="Breadcrumb" className={styles.crumbs}>
          <ol>
            {crumbs.map(({ href, text }) => (
              <li key={text}>{href ? <Link href={href}>{text}</Link> : <span aria-current="page">{text}</span>}</li>
            ))}
          </ol>
        </nav>
        <SectionHeader level={1} eyebrow={<Category>{block(head, "span.eyebrow").text}</Category>}
          title={block(head, "h1").text} lead={block(head, "p.lead").text} />
      </Section>
      <Section className={styles.following}>
        <Frame className={styles.box}>
          <SelfCheck checks={checks.map(({ name }) => ({ name }))} questions={selfCheckQuestions.map(({ check, question }) => ({ check, question }))} />
        </Frame>
      </Section>
    </>
  );
}
