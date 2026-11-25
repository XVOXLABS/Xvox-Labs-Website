import Image from "next/image";
import Link from "next/link";
import ItemCard from "@/components/sections/shared/ItemCard/ItemCard";
import SectionHead from "@/components/sections/shared/SectionHead/SectionHead";
import Button from "@/components/ui/Button/Button";
import Card from "@/components/ui/Card/Card";
import Category from "@/components/ui/Category/Category";
import Frame from "@/components/ui/Frame/Frame";
import Price from "@/components/ui/Price/Price";
import Section from "@/components/ui/Section/Section";
import SectionHeader from "@/components/ui/SectionHeader/SectionHeader";
import { vox } from "@/data/agents";
import { agentHireSection, agentPageText, agentProfiles, profileCollections, sectionBlocks } from "@/data/agentsPages";
import { pricingDisplay, waysToBuy } from "@/data/pricing";
import { VOX_HREF } from "@/lib/actions";
import { block, fill } from "@/lib/content";
import { BlueprintButton, SolutionsBooking } from "../solutions/SolutionsInteractions";
import { AgentArt, AgentQuickViews } from "./AgentInteractions";
import { AgentClosing } from "./HowItWorksSections";
import styles from "./how-it-works.module.css";
import EnquiryButton from "@/components/ui/EnquiryButton/EnquiryButton";
import { PURCHASE_ENABLED } from "@/lib/commerce";

function Chips({ items }) {
  return <ul className={styles.chips}>{items.map((text) => <li key={text}>{text}</li>)}</ul>;
}

function Hero({ agent, back, worksWith, quote, hire, marketplace, count }) {
  return (
    <Section>
      <Link href={back.href} className={styles.back}>{back.text}</Link>
      <div className={styles.profileHero}>
        <Card tint={agent.tint} className={styles.portrait}>
          <blockquote>{quote}</blockquote>
          <AgentArt agent={agent} className={styles.portraitArt} />
        </Card>
        <div className={styles.profileIntro}>
          <SectionHeader level={1} eyebrow={<Category color={agent.color}>{agent.role}</Category>} title={agent.name} />
          <p className={styles.profileLead}>{agent.line}</p>
          <Chips items={agent.traits} />
          <div><strong>{worksWith}</strong><Chips items={agent.tools} /></div>
          <div className={styles.actions}>
            <Button href={`#${agentHireSection}`}>{hire}</Button><Button href={marketplace} variant="secondary">{count}</Button>
          </div>
        </div>
      </div>
    </Section>
  );
}

function ProfileMarket({ blocks, catalogue, href, title, all }) {
  const visible = catalogue.slice(0, 8);
  const samples = visible.filter(({ priceStatus }) => priceStatus === "placeholder");
  return (
    <Section className={styles.following}>
      <SectionHead eyebrow={block(blocks, "span.eyebrow").text} title={title} action={<Button href={href} variant="secondary">{all}</Button>} />
      <Frame className={styles.four}>
        {visible.map((item) => <ItemCard key={item.id} item={item} />)}
      </Frame>
      {PURCHASE_ENABLED && samples.length ? <details className={styles.sourceNote}>
        <summary>{agentPageText.sampleCatalogue}</summary>
        <ul className={styles.list}>{samples.map(({ id, name, price, unit }) => (
          <li key={id}><Link href={`/marketplace/${id}`}>{name}</Link> · ${price.toLocaleString("en-US")}{unit === "/month" ? " / month" : ""}</li>
        ))}</ul>
      </details> : null}
    </Section>
  );
}

function BuyingPaths({ blocks, agent, blueprint, title }) {
  const book = block(blocks, "a.btn");
  const pricing = block(blocks, "a");
  const unsure = block(blocks, "p.muted").text;
  const about = `${agent.name} (${agent.role})`;
  return (
    <Section id={agentHireSection} className={styles.following}>
      <SectionHead layout="center" eyebrow={block(blocks, "span.eyebrow").text} title={title} />
      <Frame className={styles.four}>
        {waysToBuy.map((path) => (
          <Card key={path.name} tint={path.highlight ? "p2" : undefined}>
            <h3>{path.name}</h3><p>{path.summary}</p>
            <Price status={path.priceStatus} price={path.price} unit={path.note?.trim()} showCta={false} />
            {path.action === "buy" ? (PURCHASE_ENABLED ? <BlueprintButton id={blueprint.id} full>{block(blocks, "button.btn").text}</BlueprintButton>
              : <EnquiryButton about={about} path={path.name} full />) : PURCHASE_ENABLED ? (
              <SolutionsBooking href={book.href} about={about} path={path.name} full variant={path.highlight ? "primary" : "secondary"}>
                {book.text}
              </SolutionsBooking>
            ) : <EnquiryButton about={about} path={path.name} full variant={path.highlight ? "primary" : "secondary"} />}
            <div className={styles.checklist}>
              <strong>{path.listHeading}</strong><ul className={styles.list}>{path.includes.map((text) => <li key={text}>{text}</li>)}</ul>
            </div>
          </Card>
        ))}
      </Frame>
      {PURCHASE_ENABLED ? <details className={styles.sourceNote}>
        <summary>{pricingDisplay.prototypePriceToSetLabel}</summary>
        <ul className={styles.list}>{waysToBuy.filter(({ priceStatus }) => priceStatus === "to-set").map(({ name }) => (
          <li key={name}>{name} · {pricingDisplay.prototypePriceToSetLabel}{name === "Hire" ? ` ${block(blocks, "small", 1).text}` : ""}</li>
        ))}</ul>
      </details> : null}
      <Card className={styles.unsure}>
        <Image src={vox.image} alt="" width={48} height={48} />
        <div><strong>{block(blocks, "b").text}</strong><p>{unsure.slice(0, -pricing.text.length)}<Link href={pricing.href}>{pricing.text}</Link></p></div>
        <Button href={VOX_HREF}>{block(blocks, "button.btn", 1).text}</Button>
      </Card>
    </Section>
  );
}

export default function AgentProfile({ entry }) {
  const agent = entry.record;
  const section = (index) => sectionBlocks(entry, index);
  const copy = (prefix) => entry.computedText.find((text) => text.startsWith(prefix));
  const { catalogue, blueprint, related, jobs } = profileCollections(agent);
  const [quote, hire, count] = entry.computedText;
  const market = `/marketplace?agent=${agent.id}`;
  const persona = section(2);
  const skills = section(3);
  const week = section(4);
  const uses = section(5);
  const allUses = block(uses, "a.btn");
  const team = section(8);
  return (
    <>
      <Hero agent={agent} back={block(section(0), "a.chip")} worksWith={block(section(1), "h5").text}
        quote={quote} hire={hire} marketplace={market} count={count} />
      <Section className={styles.following}>
        <SectionHead eyebrow={block(persona, "span.eyebrow").text} title={copy("Who ")} />
        <Frame className={styles.four}>
          {[copy(agent.traits.join(", ")), agent.bestFor, agent.never, agent.check].map((text, i) => (
            <Card key={text} tint={i === 3 ? "p2" : undefined}><h3>{block(persona, "h4", i).text}</h3><p>{text}</p></Card>
          ))}
        </Frame>
      </Section>
      <Section className={styles.following}>
        <SectionHead eyebrow={block(skills, "span.eyebrow").text} title={copy("What ")} />
        <Frame className={styles.three}>
          <Card><h3>{block(skills, "h4").text}</h3><ul className={styles.list}>{agent.skills.map((text) => <li key={text}>{text}</li>)}</ul></Card>
          <Card><h3>{block(skills, "h4", 1).text}</h3>
            <ul className={styles.jobs}>{jobs.map(({ mission, name, job }) => (
              <li key={`${mission}-${job}`}><Link href={`/build?mission=${mission}`}><span><small>{name}</small>{job}</span><span aria-hidden="true">→</span></Link></li>
            ))}</ul>
          </Card>
          <Card><h3>{block(skills, "h4", 2).text}</h3><Chips items={agent.tools} /><p>{block(skills, "p.muted").text}</p></Card>
        </Frame>
      </Section>
      <Section className={styles.following}>
        <SectionHead eyebrow={copy("A week with ")} title={block(week, "h2.big").text} />
        <Frame as="ol" className={styles.week}>
          {agent.day.map(({ time, task, by }) => <Card as="li" key={task} className={styles.weekRow}>
            <strong>{time}</strong><span>{task}</span><Category>{by === "you" ? block(week, "span.who").text : agent.name}</Category>
          </Card>)}
        </Frame>
      </Section>
      <Section className={styles.following}>
        <SectionHead eyebrow={block(uses, "span.eyebrow").text} title={copy(`${agent.name} solves`)}
          action={<Button href={allUses.href} variant="secondary">{allUses.text}</Button>} />
        <Frame className={styles.three}>
          {related.map((solution) => <Card key={solution.href} href={solution.href}>
            <Category color={solution.category.color}>{solution.category.name}</Category><h3>{solution.title}</h3>
            <p className={styles.muted}>{solution.description}</p>
            <span className={styles.relatedEnd}>{fill(agentPageText.liveIn, solution.workflow)} <span aria-hidden="true">→</span></span>
          </Card>)}
        </Frame>
      </Section>
      <ProfileMarket blocks={section(6)} catalogue={catalogue} href={market} title={copy("Skills, blueprints and tools for ")} all={copy("See all ")} />
      <BuyingPaths blocks={section(7)} agent={agent} blueprint={blueprint} title={copy("Put ")} />
      <Section className={styles.following}>
        <SectionHead eyebrow={block(team, "span.eyebrow").text} title={block(team, "h2.big").text} />
        <AgentQuickViews>
          <div className={styles.actions}>
            {agentProfiles.filter(({ record }) => record.id !== agent.id).map(({ href, record }) => (
              <Link key={href} href={href} className={styles.teammate} data-agent-popup={record.id} aria-haspopup="dialog">
                <AgentArt agent={record} className={styles.teammateArt} />
                <span><strong>{record.name}</strong><small>{record.role}</small></span>
              </Link>
            ))}
          </div>
        </AgentQuickViews>
      </Section>
      <AgentClosing blocks={section(9)} />
    </>
  );
}
