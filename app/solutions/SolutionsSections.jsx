import Image from "next/image";
import Link from "next/link";
import BuyingLadder from "@/components/sections/shared/BuyingLadder/BuyingLadder";
import ItemCard from "@/components/sections/shared/ItemCard/ItemCard";
import Orchestration from "@/components/sections/shared/Orchestration/Orchestration";
import SectionHead from "@/components/sections/shared/SectionHead/SectionHead";
import Accordion from "@/components/ui/Accordion/Accordion";
import Button from "@/components/ui/Button/Button";
import Card from "@/components/ui/Card/Card";
import Category from "@/components/ui/Category/Category";
import Frame from "@/components/ui/Frame/Frame";
import Price from "@/components/ui/Price/Price";
import Section from "@/components/ui/Section/Section";
import SectionHeader from "@/components/ui/SectionHeader/SectionHeader";
import { agents, vox } from "@/data/agents";
import { departments } from "@/data/departments";
import { faq } from "@/data/faq";
import { orchestrationText } from "@/data/orchestration";
import { ladder, pricingDisplay, waysToBuy } from "@/data/pricing";
import { departmentSolutions, solutionInfo, solutionMarketplace, solutionOrchestration, solutionsText as T } from "@/data/solutionsPages";
import { VOX_HREF } from "@/lib/actions";
import { block, blocksByTag, fill } from "@/lib/content";
import { BlueprintButton, DepartmentFilter, DepartmentWork, SolutionsBooking } from "./SolutionsInteractions";
import styles from "./solutions.module.css";
import EnquiryButton from "@/components/ui/EnquiryButton/EnquiryButton";
import { PURCHASE_ENABLED } from "@/lib/commerce";

function section(entry, index) {
  return entry.sections.find((part) => part.index === index).blocks;
}

function Hero({ title, lead, eyebrow, breadcrumbs, image, children }) {
  return (
    <Section>
      {breadcrumbs ? (
        <nav aria-label="Breadcrumb" className={styles.crumbs}>
          <ol>
            {breadcrumbs.map(({ href, text }) => (
              <li key={text}>{href ? <Link href={href}>{text}</Link> : <span aria-current="page">{text}</span>}</li>
            ))}
          </ol>
        </nav>
      ) : null}
      <SectionHeader
        level={1}
        title={title}
        eyebrow={<Category>{eyebrow}</Category>}
        lead={lead}
        action={<div className={styles.actions}>{children}</div>}
      />
      {image ? (
        <div className={styles.heroImage}>
          <Image src={image} alt="" fill sizes="(max-width: 1199px) 100vw, 1136px" />
        </div>
      ) : null}
    </Section>
  );
}

function Closing({ blocks }) {
  const book = block(blocks, "a.btn");
  return (
    <Section>
      <Frame className={styles.closing}>
        <SectionHeader
          layout="center"
          size="h1"
          title={block(blocks, "h2").text}
          lead={block(blocks, "p.lead").text}
          action={<div className={styles.actions}><Button href={VOX_HREF}>{block(blocks, "button.btn").text}</Button><Button href={book.href} variant="secondary">{book.text}</Button></div>}
        />
      </Frame>
    </Section>
  );
}

function SolutionCard({ solution }) {
  return (
    <Card href={solution.href} className={styles.tile}>
      <Category color={solution.category.color}>{solution.category.name}</Category>
      <h3>{solution.title}</h3>
      <p className={styles.muted}>{solution.description}</p>
      <span className={styles.cardEnd}>{fill(T.liveIn, solution.workflow)} <span aria-hidden="true">→</span></span>
    </Card>
  );
}

function SolutionGrid({ solutions }) {
  return (
    <Frame className={styles.grid}>
      {solutions.map((solution) => <SolutionCard key={solution.slug} solution={solution} />)}
    </Frame>
  );
}

export function HubSections({ entry }) {
  const hero = section(entry, 0);
  const tiles = blocksByTag(section(entry, 1), "a.icard");
  const filter = section(entry, 2);
  const custom = section(entry, 3);
  const options = blocksByTag(filter, "button").map(({ text }, i) => ({ id: departments[i - 1]?.id ?? "all", label: text }));
  const cards = departmentSolutions.map((solution) => ({
    department: solution.group.id,
    content: <SolutionCard key={solution.slug} solution={solution} />,
  }));
  const book = block(hero, "a.btn");
  const customLink = block(custom, "a.btn");

  return (
    <>
      <Hero title={entry.title} eyebrow={block(hero, "span.eyebrow").text} lead={block(hero, "p.lead").text}>
        <Button href={VOX_HREF}>{block(hero, "button.btn").text}</Button>
        <Button href={book.href} variant="secondary">{book.text}</Button>
      </Hero>
      <Section className={styles.following}>
        <Frame className={styles.departmentGrid}>
          {departments.map((department, i) => (
            <Card key={department.id} href={tiles[i].href} className={`${styles.tile} ${styles.departmentCard}`}>
              <span className={styles.tileImage}>
                <Image src={department.image} alt="" fill sizes="(max-width: 809px) 100vw, (max-width: 1023px) 50vw, (max-width: 1199px) 33vw, 336px" />
                <span className={styles.imageArrow} aria-hidden="true">↗</span>
              </span>
              <Category color={department.color}>{`0${i + 1} / ${department.name}`}</Category>
              <h3>{department.pain}</h3>
              <p className={styles.muted}>{department.line}</p>
            </Card>
          ))}
        </Frame>
      </Section>
      <Section>
        <SectionHead eyebrow={block(filter, "span.eyebrow").text} title={block(filter, "h2.big").text} />
        <DepartmentFilter options={options} label={block(filter, "span.eyebrow").text} cards={cards} />
      </Section>
      <Section className={styles.following}>
        <Card className={styles.callout}>
          <div>
            <h2>{block(custom, "h4").text}</h2>
            <p>{block(custom, "p").text}</p>
          </div>
          <Button href={customLink.href} variant="secondary">{customLink.text}</Button>
        </Card>
      </Section>
      <Closing blocks={section(entry, 4)} />
    </>
  );
}

function DraftPrices({ steps }) {
  if (!PURCHASE_ENABLED) return null;
  return (
    <details className={styles.sourceNote}>
      <summary>{pricingDisplay.prototypePriceToSetLabel}</summary>
      <ul>
        {steps.map(({ name, unit }) => (
          <li key={name}>{name} · {pricingDisplay.prototypePriceToSetLabel}{unit ? ` ${unit}` : null}</li>
        ))}
      </ul>
    </details>
  );
}

export function DepartmentSections({ entry }) {
  const department = entry.record;
  const solutions = departmentSolutions.filter(({ group }) => group.id === department.id);
  const hero = section(entry, 0);
  const work = section(entry, 2);
  const buy = section(entry, 3);
  const book = block(hero, "a.btn");
  const note = block(buy, "p.note");
  const noteLink = block(buy, "a");
  const draftUnit = block(buy, "small").text;
  const flows = solutions.slice(0, 4).map((solution) => ({
    slug: solution.slug,
    label: solution.label,
    href: solution.href,
    spec: solutionOrchestration(solution),
    footer: fill(orchestrationText.footer, { blueprint: solution.title, timeline: solution.workflow.timeline }),
  }));

  return (
    <>
      <Hero eyebrow={department.name} title={department.pain} lead={entry.computedText[0]} image={department.image}
        breadcrumbs={[block(hero, "a"), { text: department.name }]}>
        <Button href={VOX_HREF}>{block(hero, "button.btn").text}</Button>
        <SolutionsBooking href={book.href} about={department.name} path={T.groupAbout} variant="secondary">{book.text}</SolutionsBooking>
      </Hero>
      <Section className={styles.following}><SolutionGrid solutions={solutions} /></Section>
      <Section>
        <SectionHead layout="center" eyebrow={block(work, "span.eyebrow").text} title={fill(T.departmentWorkflow, department)} />
        <DepartmentWork flows={flows} label={block(work, "span.eyebrow").text} seeSolution={block(work, "a.btn").text} />
      </Section>
      <Section className={styles.following}>
        <SectionHead layout="center" eyebrow={block(buy, "span.eyebrow").text} title={block(buy, "h2.big").text} />
        <BuyingLadder about={department.name} stepLabels={blocksByTag(buy, "span.ln").map(({ text }) => text)}
          note={{ sentences: note.text.slice(0, -noteLink.text.length).trim().split(/(?<=\.)\s+/), link: noteLink }} />
        <DraftPrices steps={ladder.filter(({ priceStatus }) => priceStatus === "to-set").map(({ title }) => ({
          name: title, unit: title === "Hire" ? draftUnit : null,
        }))} />
      </Section>
      <Section className={styles.following}>
        <div className={styles.chips}>
          {departments.filter(({ id }) => id !== department.id).map(({ id, name }) => (
            <Button key={id} href={`/solutions/${id}`} variant="secondary" arrow>{name}</Button>
          ))}
        </div>
      </Section>
      <Closing blocks={section(entry, 5)} />
    </>
  );
}

function Comparison({ blocks, solution }) {
  const trust = block(blocks, "a");
  const data = block(blocks, "p");
  const tools = agents.find(({ id }) => id === solution.agentIds[0]).tools;
  const headings = blocksByTag(blocks, "h4");
  return (
    <Section className={styles.following}>
      <Frame>
        <div className={styles.comparison}>
          {[solution.without, solution.with].map((entries, i) => (
            <Card key={headings[i].text} tint={i ? "p3" : undefined}>
              <h3>{headings[i].text}</h3>
              <ul>{entries.map((text) => <li key={text}>{text}</li>)}</ul>
            </Card>
          ))}
        </div>
        <div className={styles.facts}>
          <Card><h3>{headings[2].text}</h3><p>{fill(T.timeline, solution.workflow)}</p></Card>
          <Card><h3>{headings[3].text}</h3><ul className={styles.tools}>{tools.map((tool) => <li key={tool}>{tool}</li>)}</ul></Card>
          <Card><h3>{headings[4].text}</h3><p>{data.text.slice(0, -trust.text.length)}<Link href={trust.href}>{trust.text}</Link></p></Card>
        </div>
        <Card tint={solution.category.tint} className={styles.proof}>
          <Category>{blocksByTag(blocks, "span.chip", { includeHidden: true })[0].text}</Category>
          <h3>{blocksByTag(blocks, "h3", { includeHidden: true })[0].text}</h3>
          <p>{block(blocks, "p.muted").text}</p>
        </Card>
      </Frame>
    </Section>
  );
}

function BuyingPaths({ blocks, solution, blueprint }) {
  const link = block(blocks, "a");
  const note = block(blocks, "p.muted");
  return (
    <Section className={styles.following}>
      <SectionHead layout="center" eyebrow={block(blocks, "span.eyebrow").text} title={block(blocks, "h2.big").text} />
      <Frame className={styles.buying}>
        {waysToBuy.map((path) => (
          <Card key={path.name} tint={path.highlight ? "p2" : undefined} className={styles.tile}>
            <h3>{path.name}</h3>
            <p>{path.summary}</p>
            <Price status={path.priceStatus} price={path.price} unit={path.note?.trim()} showCta={false} />
            {path.action === "buy" ? (
              blueprint ? (PURCHASE_ENABLED ? <BlueprintButton id={blueprint.id} full>{block(blocks, "button.btn").text}</BlueprintButton>
                : <EnquiryButton about={solution.pain} path={path.name} full />)
                : <Button href="/marketplace" full>{T.browseBlueprints}</Button>
            ) : PURCHASE_ENABLED ? (
              <SolutionsBooking href={pricingDisplay.consultationCta.href} about={solution.pain} path={path.name} full variant={path.highlight ? "primary" : "secondary"}>
                {block(blocks, "a.btn").text}
              </SolutionsBooking>
            ) : (
              <EnquiryButton about={solution.pain} path={path.name} full variant={path.highlight ? "primary" : "secondary"} />
            )}
            <div className={styles.checklist}>
              <b>{path.listHeading}</b>
              <ul>{path.includes.map((text) => <li key={text}>{text}</li>)}</ul>
            </div>
          </Card>
        ))}
      </Frame>
      <DraftPrices steps={waysToBuy.filter(({ priceStatus }) => priceStatus === "to-set").map(({ name }) => ({
        name, unit: name === "Hire" ? block(blocks, "small", 1).text : null,
      }))} />
      <Card className={styles.unsure}>
        <Image src={vox.image} alt="" width={48} height={48} />
        <div>
          <b>{block(blocks, "b").text}</b>
          <p>{note.text.slice(0, -link.text.length)}<Link href={link.href}>{link.text}</Link></p>
        </div>
        <Button href={VOX_HREF}>{block(blocks, "button.btn", 1).text}</Button>
      </Card>
    </Section>
  );
}

function RelatedItems({ blocks, items }) {
  const market = block(blocks, "a.btn");
  const samples = items.filter(({ priceStatus }) => priceStatus === "placeholder");
  return (
    <Section className={styles.following}>
      <SectionHead eyebrow={block(blocks, "span.eyebrow").text} title={block(blocks, "h2.big").text}
        action={<Button href={market.href} variant="secondary">{market.text}</Button>} />
      <Frame className={styles.market}>
        {items.map((item) => <ItemCard key={item.id} item={item} compact />)}
      </Frame>
      {PURCHASE_ENABLED && samples.length ? (
        <details className={styles.sourceNote}>
          <summary>{T.sampleCatalogue}</summary>
          <ul>{samples.map(({ id, name, price, unit }) => (
            <li key={id}><Link href={`/marketplace/${id}`}>{name}</Link> · ${price.toLocaleString("en-US")}{unit === "/month" ? " / month" : ""}</li>
          ))}</ul>
        </details>
      ) : null}
    </Section>
  );
}

export function DetailSections({ entry }) {
  const solution = solutionInfo(entry);
  const hero = section(entry, 0);
  const team = section(entry, 1);
  const questions = section(entry, 6);
  const items = solutionMarketplace(solution);
  const blueprint = items.find(({ type }) => type === "blueprint");
  const parent = solution.group
    ? { href: `/solutions/${solution.group.id}`, text: solution.category.name }
    : { href: entry.parentHref, text: solution.category.name };
  const siblings = solution.group ? departmentSolutions.filter(({ group, slug }) => group.id === solution.group.id && slug !== solution.slug).slice(0, 3) : [];
  const book = block(hero, "a.btn");
  const root = solution.group ? { href: "/solutions", text: entry.computedText[0] } : { href: "/services", text: entry.computedText[0] };

  return (
    <>
      <Hero title={solution.title} lead={entry.computedText.find((text) => text.includes(" Typically live in "))}
        eyebrow={solution.category.name} breadcrumbs={[root, parent, { text: solution.title }]}>
        {blueprint ? (PURCHASE_ENABLED ? <BlueprintButton id={blueprint.id}>{block(hero, "button.btn").text}</BlueprintButton>
          : <EnquiryButton about={solution.pain} path={waysToBuy.find(({ action }) => action === "buy").name} />) : null}
        <SolutionsBooking href={book.href} about={solution.pain} path={T.bookAbout} variant="secondary">{book.text}</SolutionsBooking>
        <Button href={VOX_HREF} variant="secondary">{block(hero, "button.btn", 1).text}</Button>
      </Hero>
      <Section className={styles.following}>
        <SectionHead eyebrow={block(team, "span.eyebrow").text} title={block(team, "h2.big").text} lead={block(team, "p.lead").text} />
        <Frame><Orchestration slug={solution.slug} spec={solutionOrchestration(solution)} /></Frame>
      </Section>
      <Comparison blocks={section(entry, 2)} solution={solution} />
      <BuyingPaths blocks={section(entry, 3)} solution={solution} blueprint={blueprint} />
      {items.length ? <RelatedItems blocks={section(entry, 4)} items={items} /> : null}
      {siblings.length ? (
        <Section className={styles.following}>
          <SectionHead eyebrow={T.related} title={fill(T.moreIn, solution.category)} />
          <SolutionGrid solutions={siblings} />
        </Section>
      ) : null}
      <Section className={styles.following}>
        <div className={styles.faq}>
          <SectionHead eyebrow={block(questions, "span.eyebrow").text} title={block(questions, "h2.big").text}
            lead={block(questions, "p.lead").text} action={<Button href={VOX_HREF} variant="secondary">{block(questions, "button.btn").text}</Button>} />
          <Accordion items={faq} numbered={false} defaultOpen={-1} />
        </div>
      </Section>
      <Closing blocks={section(entry, 7)} />
    </>
  );
}
