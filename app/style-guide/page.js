import Image from "next/image";
import { agents } from "@/data/agents";
import { departments } from "@/data/departments";
import { faq } from "@/data/faq";
import { items } from "@/data/marketplace";
import { solutions } from "@/data/solutions";
import Accordion from "@/components/ui/Accordion/Accordion";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import Card from "@/components/ui/Card/Card";
import Category from "@/components/ui/Category/Category";
import Frame from "@/components/ui/Frame/Frame";
import IconButton from "@/components/ui/IconButton/IconButton";
import Price from "@/components/ui/Price/Price";
import Section from "@/components/ui/Section/Section";
import SectionHeader from "@/components/ui/SectionHeader/SectionHeader";
import Tag from "@/components/ui/Tag/Tag";
import Appear from "@/components/motion/Appear/Appear";
import CountUp from "@/components/motion/CountUp/CountUp";
import Marquee from "@/components/motion/Marquee/Marquee";
import StyleGuideTabs from "./StyleGuideTabs";
import styles from "./page.module.css";

// Internal review page for the Phase 3 design system. Not for the public site:
// excluded from search engines and to be removed (or kept blocked) before launch.
export const metadata = {
  title: "Style guide",
  robots: { index: false, follow: false },
};

const COLOURS = [
  ["--color-bg", "#FAFAFA"],
  ["--color-surface", "#FFFFFF"],
  ["--color-surface-raised", "#FDFDFF"],
  ["--color-frame", "#EDEDED"],
  ["--color-badge", "#F2F2F2"],
  ["--color-ink", "#0F0F0F"],
  ["--color-ink-muted", "rgba(15,15,15,.6)"],
  ["--color-ink-faint", "rgba(15,15,15,.35)"],
  ["--color-black", "#000000"],
  ["--color-dark", "#121212"],
  ["--color-accent", "#FF6038"],
  ["--tint-p1", "#ECE9F7"],
  ["--tint-p2", "#F6ECE6"],
  ["--tint-p3", "#E7F1E3"],
  ["--tint-p4", "#E5EBF6"],
];

const TYPE = [
  ["Display", "display", "104 / 72 / 37"],
  ["Heading 1", "h1", "60 / 48 / 38"],
  ["Heading 2", "h2", "44 / 36 / 30"],
  ["Heading 3", "h3", "32 / 28 / 24"],
  ["Heading 4", "h4", "24 / 22 / 20"],
  ["Heading 5", "h5", "20 / 18 / 18, 500"],
  ["Lead", "lead", "20 / 18 / 18"],
  ["Body", "body", "16 / 24"],
  ["Small", "small", "14 / 21"],
  ["Label", "label", "15 / 15, 500"],
  ["Micro", "micro", "11 / 15.4, uppercase"],
];

export default function StyleGuidePage() {
  const sample = solutions.find((s) => s.workflow);
  const blueprint = items.find((i) => i.priceStatus === "published");
  const internal = items.find((i) => i.priceStatus !== "published");
  const scout = agents[0];

  return (
    <div className={styles.page}>
      <Section>
        <SectionHeader layout="split" level={1} size="h1" title="Style guide" lead="Phase 3 design system: tokens, type, components and motion. Internal review page." />
      </Section>

      <Section aria-labelledby="sg-colour">
        <h2 id="sg-colour" className={styles.h}>Colour</h2>
        <div className={styles.swatches}>
          {COLOURS.map(([token, value]) => (
            <div key={token} className={styles.swatch}>
              <span className={styles.chip} style={{ background: `var(${token})` }} />
              <code>{token}</code>
              <span className={styles.muted}>{value}</span>
            </div>
          ))}
        </div>
        <div className={styles.row}>
          {departments.map((d) => (
            <Category key={d.id} color={d.color}>
              {d.name}
            </Category>
          ))}
        </div>
      </Section>

      <Section aria-labelledby="sg-type">
        <h2 id="sg-type" className={styles.h}>Typography</h2>
        <p className={styles.muted}>Sizes per breakpoint: desktop ≥ 1200px / tablet 810–1199px / phone &lt; 810px. Primary font: Inter.</p>
        <div className={styles.typeList}>
          {TYPE.map(([name, cls, sizes]) => (
            <div key={cls} className={styles.typeRow}>
              <span className={styles.typeMeta}>
                {name} <span className={styles.muted}>{sizes}</span>
              </span>
              <span className={`${styles.sample} ${styles[`t_${cls}`]}`}>{scout.line}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section aria-labelledby="sg-buttons">
        <h2 id="sg-buttons" className={styles.h}>Buttons and controls</h2>
        <div className={styles.row}>
          <Button href="/book">Book a call</Button>
          <Button href="#vox" variant="secondary" arrow>
            Get your AI plan
          </Button>
          <Button href="/about" variant="small" arrow>
            About
          </Button>
          <Button variant="accent">Send</Button>
          <IconButton tone="dark">+</IconButton>
          <IconButton tone="light">→</IconButton>
        </div>
        <div className={styles.row}>
          {scout.traits.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
          <Badge icon="◷">{sample.workflow.timeline}</Badge>
        </div>
      </Section>

      <Section aria-labelledby="sg-cards">
        <h2 id="sg-cards" className={styles.h}>Frame and cards</h2>
        <Frame columns={3}>
          {departments.slice(0, 3).map((d) => (
            <Card key={d.id}>
              <Category color={d.color}>{d.name}</Category>
              <p className={styles.cardTitle}>{d.pain}</p>
              <p className={styles.muted}>{d.line}</p>
            </Card>
          ))}
        </Frame>
        <Frame columns={2}>
          {agents.slice(0, 2).map((a) => (
            <Card key={a.id} tint={a.tint} padding="lg">
              <span className={styles.role}>{a.role}</span>
              <p className={styles.cardTitle}>{a.name}</p>
              <div className={styles.row}>
                {a.traits.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
              <Image src={a.image} alt={`${a.name}, ${a.role}`} width={180} height={180} className={styles.agentImg} />
            </Card>
          ))}
        </Frame>
      </Section>

      <Section aria-labelledby="sg-headers">
        <h2 id="sg-headers" className={styles.h}>Section headers</h2>
        <SectionHeader layout="split" level={3} size="h1" title={sample.title} lead={sample.summary} action={<Button href={`/solutions/${sample.slug}`} variant="small" arrow>{sample.title}</Button>} />
        <SectionHeader layout="center" level={3} size="h1" title={faq[0].question} lead={faq[0].answer} action={<Button href="/book" variant="secondary">Book a call</Button>} />
      </Section>

      <Section aria-labelledby="sg-price">
        <h2 id="sg-price" className={styles.h}>Price display rule</h2>
        <Frame columns={2}>
          <Card>
            <p className={styles.muted}>{blueprint.name} (published)</p>
            <Price price={blueprint.price} unit={blueprint.unit} status={blueprint.priceStatus} />
          </Card>
          <Card>
            <p className={styles.muted}>{internal.name} (internal price, not shown)</p>
            <Price price={internal.price} unit={internal.unit} status={internal.priceStatus} />
          </Card>
        </Frame>
      </Section>

      <Section aria-labelledby="sg-tabs">
        <h2 id="sg-tabs" className={styles.h}>Tabs</h2>
        <StyleGuideTabs />
      </Section>

      <Section aria-labelledby="sg-faq">
        <h2 id="sg-faq" className={styles.h}>Accordion</h2>
        <Accordion items={faq.slice(0, 4)} name="sg-faq" />
      </Section>

      <Section aria-labelledby="sg-motion">
        <h2 id="sg-motion" className={styles.h}>Motion</h2>
        <p className={styles.muted}>Appear on scroll, count-up and marquee. All respect reduced motion.</p>
        <Frame columns={3}>
          {[items.length, solutions.length, agents.length].map((n, i) => (
            <Appear key={i} delay={i * 100}>
              <Card padding="lg">
                <CountUp value={n} className={styles.count} />
                <span className={styles.muted}>{["Marketplace items", "Solutions", "Agents"][i]}</span>
              </Card>
            </Appear>
          ))}
        </Frame>
        <Marquee label="Agent tools">
          {[...new Set(agents.flatMap((a) => a.tools))].map((tool) => (
            <span key={tool} className={styles.marqueeItem}>
              {tool}
            </span>
          ))}
        </Marquee>
      </Section>
    </div>
  );
}
