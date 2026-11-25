import Link from "next/link";
import SafeAiBox from "@/components/sections/home/SafeAiBox/SafeAiBox";
import SectionHead from "@/components/sections/shared/SectionHead/SectionHead";
import BuyingLadder from "@/components/sections/shared/BuyingLadder/BuyingLadder";
import Accordion from "@/components/ui/Accordion/Accordion";
import Button from "@/components/ui/Button/Button";
import Frame from "@/components/ui/Frame/Frame";
import Section from "@/components/ui/Section/Section";
import { leadForm } from "@/data/site";
import { companyText as T, placeholderNote, sectionBlocks } from "@/data/companyPages";
import { pricingDisplay } from "@/data/pricing";
import { VOX_HREF } from "@/lib/actions";
import { PURCHASE_ENABLED } from "@/lib/commerce";
import { block, blocksByTag, display, homeSection } from "@/lib/content";
import ContactForm from "@/components/sections/home/Contact/ContactForm";
import { WaitlistForm, TopicLink } from "./Interactions";
import { Cell, Cells, Closing, Intro, PlaceholderNote } from "./Shared";
import styles from "./company.module.css";

const TINTS = ["p1", "p2", "p3", "p4"];

// [heading, text] pairs from consecutive h4 / p blocks.
function pairs(blocks) {
  const heads = blocksByTag(blocks, "h4");
  const texts = blocksByTag(blocks, "p");
  return heads.map((h, i) => ({ title: h.text, text: texts[i].text }));
}

// ---- /pricing -------------------------------------------------------------------------------
function CompareTable({ blocks }) {
  const cells = blocks.filter(({ tag }) => /^t[hd](\.hi)?$/.test(tag));
  const head = cells.slice(0, 4);
  const rows = [];
  for (const cell of cells.slice(4)) {
    if (cell.tag === "th") rows.push({ label: cell.text, cells: [] });
    else rows.at(-1).cells.push(cell);
  }
  // Approved pricing rule: only $1,500 is shown; every other price cell shows the consultation label.
  const priceText = (row, cell) => (row.label !== "Price" ? cell.text : cell.text.includes("$1,500") ? "$1,500" : pricingDisplay.placeholderLabel);
  return (
    <div className={styles.tableWrap} role="region" aria-label={T.tableScroll} tabIndex={0}>
      <table className={styles.table}>
        <thead>
          <tr>
            <td />
            {head.map(({ text, tag }) => <th key={text} scope="col" className={tag.endsWith(".hi") ? styles.hi : undefined}>{text}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.filter((row) => PURCHASE_ENABLED || row.label !== "Price").map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              {row.cells.map((cell, i) => <td key={i} className={cell.tag.endsWith(".hi") ? styles.hi : undefined}>{priceText(row, cell)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function PricingPage({ entry }) {
  const [head, ladder, compare, review, market, faq, closing] = [0, 1, 2, 3, 4, 5, 6].map((i) => sectionBlocks(entry, i));
  // Decision A3 (ladder footnote) applied to this page: sentences about prices "to set" stay hidden.
  const withoutToSet = (text) => text.split(/(?<=\.)\s+/).filter((t) => !t.includes("“to set”")).join(" ");
  const link = blocksByTag(ladder, "a").find((b) => b.href === "/pricing");
  const sentences = withoutToSet(block(ladder, "p.note").text.replace(link.text, "")).split(/(?<=\.)\s+/).map((t) => t.trim()).filter(Boolean);
  const [reviewPackages, selfCheck] = blocksByTag(review, "a.btn");
  return (
    <>
      <Intro blocks={head} lead={withoutToSet(block(head, "p.lead").text)}>
        <Button href={VOX_HREF}>{block(head, "button.btn").text}</Button>
        <Button href={block(head, "a.btn").href} variant="secondary">{block(head, "a.btn").text}</Button>
      </Intro>
      <Section id="hire" className={styles.following}>
        <BuyingLadder about={T.pricingLadderAbout} stepLabels={blocksByTag(ladder, "span.ln").map((b) => b.text)}
          note={{ sentences, link: { text: link.text, href: link.href } }} />
      </Section>
      <Section className={styles.following}>
        <SectionHead eyebrow={block(compare, "span.eyebrow").text} title={block(compare, "h2.big").text} />
        <CompareTable blocks={compare} />
      </Section>
      <Section className={styles.following}>
        <SectionHead eyebrow={block(review, "span.eyebrow").text} title={block(review, "h2.big").text}
          action={<div className={styles.actions}>
            <Button href={reviewPackages.href}>{reviewPackages.text}</Button>
            <Button href={selfCheck.href} variant="secondary">{selfCheck.text}</Button>
          </div>} />
      </Section>
      <Section className={styles.following}>
        <SectionHead eyebrow={block(market, "span.eyebrow").text} title={block(market, "h2.big").text}
          action={<Button href={block(market, "a.btn").href} className={styles.tall}>{block(market, "a.btn").text}</Button>} />
      </Section>
      <Section className={styles.following}>
        <div className={styles.faqLayout}>
          <div className={styles.faqHead}>
            <SectionHead eyebrow={block(faq, "span.eyebrow").text} title={block(faq, "h2.big").text} />
            <p>{block(faq, "p.lead").text}</p>
            <Button href={VOX_HREF} variant="secondary" className={styles.tall}>{block(faq, "button.btn").text}</Button>
          </div>
          <Accordion numbered={false} defaultOpen={-1}
            items={blocksByTag(faq, "button").map((q, i) => ({ question: q.text, answer: blocksByTag(faq, "p")[i].text }))} />
        </div>
      </Section>
      <Closing blocks={closing} />
    </>
  );
}

// ---- /book ----------------------------------------------------------------------------------
export function BookPage({ entry }) {
  const head = sectionBlocks(entry, 0);
  const body = sectionBlocks(entry, 1);
  // Options belong to the label before them (Interested in, Budget, Start).
  const byLabel = [];
  for (const b of body) {
    if (b.tag === "label") byLabel.push({ label: b.text, options: [] });
    else if (b.tag === "option") byLabel.at(-1).options.push(b.text);
  }
  const [name, email, company, interest, budget, start, tools, message] = byLabel.map(({ label }) => label);
  const home = homeSection(15);
  const groupOf = new Map(home.filter((b) => b.field === "interest" && b.group).map((b) => [b.text, b.group]));
  const interestOptions = byLabel[3].options;
  const groups = Object.entries(leadForm.groups).map(([key, label]) => ({
    label,
    options: interestOptions.slice(1).filter((text) => (groupOf.get(text) ?? "other") === key),
  }));
  return (
    <>
      <Intro blocks={head} />
      <Section className={styles.following}>
        <Frame className={styles.layout}>
          <div className={styles.aside}>
            <div className={styles.callout}>
              <h2>{block(body, "h4").text}</h2>
              <ul className={styles.steps}>{blocksByTag(body, "li").map((li) => <li key={li.text}>{li.text}</li>)}</ul>
            </div>
            <div><Button href={VOX_HREF} variant="secondary" className={styles.tall}>{block(body, "button.btn").text}</Button></div>
          </div>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>{block(body, "h3").text}</h2>
            <ContactForm
              labels={{ name, email, company, interest, budget, start, tools, message }}
              interestDefault={interestOptions[0]}
              interestGroups={groups}
              budgetOptions={byLabel[4].options}
              startOptions={byLabel[5].options}
              toolsPlaceholder={block(body, "input[placeholder]").text}
              submitLabel={blocksByTag(body, "button.btn").at(-1).text}
              note={display(block(home, "p"))}
            />
          </div>
        </Frame>
      </Section>
    </>
  );
}

// ---- /trust ---------------------------------------------------------------------------------
export function TrustPage({ entry }) {
  const [head, cells, status, , closing] = [0, 1, 2, 3, 4].map((i) => sectionBlocks(entry, i));
  const [dpa, review] = blocksByTag(head, "a.btn");
  return (
    <>
      <Intro blocks={head}>
        <TopicLink href={dpa.href} about={T.trustTopic[0]} path={T.trustTopic[1]}>{dpa.text}</TopicLink>
        <Button href={review.href} variant="secondary">{review.text}</Button>
      </Intro>
      <Section className={styles.following}>
        <Cells cols={3}>
          {pairs(cells).map(({ title, text }, i) => (
            <Cell key={title} tint={TINTS[i % 4]}><h3>{title}</h3><p>{text}</p></Cell>
          ))}
        </Cells>
      </Section>
      <Section className={styles.following}>
        <Cells cols={2}>
          {pairs(status).map(({ title, text }) => {
            const draft = text.match(/(To confirm|To publish)$/)?.[0];
            return (
              <Cell key={title}><h3>{title}</h3><p>{draft ? text.slice(0, -draft.length) : text}{draft ? <span className={styles.draft}>{draft}</span> : null}</p></Cell>
            );
          })}
        </Cells>
      </Section>
      <SafeAiBox />
      <Closing blocks={closing} />
    </>
  );
}

// ---- /about ---------------------------------------------------------------------------------
export function AboutPage({ entry }) {
  const [head, team, rules, , closing] = [0, 1, 2, 3, 4].map((i) => sectionBlocks(entry, i));
  const [book, how] = blocksByTag(head, "a.btn");
  const links = pairs(sectionBlocks(entry, 3));
  return (
    <>
      <Intro blocks={head}>
        <Button href={book.href}>{book.text}</Button>
        <Button href={how.href} variant="secondary">{how.text}</Button>
      </Intro>
      <Section className={styles.following}>
        <Cells cols={4}>
          {pairs(team).map(({ title, text }, i) => (
            <Cell key={title} tint={TINTS[i]}><span className={styles.avatar} aria-hidden="true" /><h3>{title}</h3><p>{text}</p></Cell>
          ))}
        </Cells>
        <PlaceholderNote note={placeholderNote(team, "Real")} />
      </Section>
      <Section className={styles.following}>
        <SectionHead eyebrow={block(rules, "span.eyebrow").text} title={block(rules, "h2.big").text} />
        <Cells cols={4}>
          {pairs(rules).map(({ title, text }, i) => <Cell key={title} tint={TINTS[i]}><h3>{title}</h3><p>{text}</p></Cell>)}
        </Cells>
      </Section>
      <Section className={styles.following}>
        <Cells cols={3}>
          {links.map(({ title, text }, i) => (
            <Cell key={title} as={Link} href={T.aboutLinks[i]}><h3>{title}</h3><p>{text}</p></Cell>
          ))}
        </Cells>
      </Section>
      <Closing blocks={closing} />
    </>
  );
}

// ---- /blog ----------------------------------------------------------------------------------
export function BlogPage({ entry }) {
  const [head, list, closing] = [0, 1, 2].map((i) => sectionBlocks(entry, i));
  const chips = list.filter(({ tag }) => tag === "span.chip");
  const reads = blocksByTag(list, "span");
  const arrows = blocksByTag(list, "b");
  return (
    <>
      <Intro blocks={head} />
      <Section className={styles.following}>
        <Cells cols={3}>
          {blocksByTag(list, "h3").map(({ text }, i) => (
            <Cell key={text} tint={TINTS[i]} as="article">
              <span className={styles.chip}>{chips[i].text}</span>
              <h3>{text}</h3>
              <p className={styles.read}><span>{reads[i].text}</span><span aria-hidden="true">{arrows[i].text}</span></p>
            </Cell>
          ))}
        </Cells>
      </Section>
      <Closing blocks={closing} />
    </>
  );
}

// ---- /talent --------------------------------------------------------------------------------
export function TalentPage({ entry }) {
  const [head, body] = [0, 1].map((i) => sectionBlocks(entry, i));
  const cats = blocksByTag(body, "span.cat");
  const titles = blocksByTag(body, "h3");
  const labels = blocksByTag(body, "label").map(({ text }) => text);
  return (
    <>
      <Intro blocks={head} />
      <Section className={styles.following}>
        <Frame className={styles.layout}>
          <div className={styles.aside}>
            {cats.map(({ text }, i) => <Cell key={text} tint={i === 0 ? "p2" : "p1"}><p>{text}</p><h2>{titles[i].text}</h2></Cell>)}
          </div>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>{titles[2].text}</h2>
            <WaitlistForm labels={labels} options={blocksByTag(body, "option").map(({ text }) => text)}
              submitLabel={block(body, "button.btn").text} invalidEmail={T.invalidEmail} note={display(block(homeSection(15), "p"))} />
          </div>
        </Frame>
      </Section>
    </>
  );
}

// ---- Careers, Results, Studio, Privacy, Inbox, Not found ---------------------------------------
export function StubPage({ entry }) {
  const head = sectionBlocks(entry, 0);
  const more = entry.sections.length > 1 ? sectionBlocks(entry, 1) : [];
  const headButtons = blocksByTag(head, "a.btn");
  const moreButtons = blocksByTag(more, "a.btn");
  return (
    <>
      {/* P4: the prototype lead points to a sitemap button this site does not have, so it is not shown. */}
      <Intro blocks={head} lead={entry.hash === "#notfound" ? null : undefined}>
        {headButtons.map(({ href, text }) => <Button key={text} href={href} variant="secondary">{text}</Button>)}
      </Intro>
      {moreButtons.length ? (
        <Section className={styles.following}>
          <div className={styles.actions}>
            {moreButtons.map(({ href, text }, i) => <Button key={`${text}-${i}`} href={href} variant={entry.hash === "#careers" ? "primary" : "secondary"}>{text}</Button>)}
          </div>
        </Section>
      ) : null}
      {more.some(({ tag }) => tag === "h3") ? (
        <Section className={styles.following}>
          <Frame className={styles.closing}>
            <h2 className={styles.cardTitle}>{block(more, "h3").text}</h2>
            <p>{block(more, "p").text}</p>
          </Frame>
        </Section>
      ) : null}
    </>
  );
}
