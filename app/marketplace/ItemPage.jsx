import Image from "next/image";
import Link from "next/link";
import ItemCard from "@/components/sections/shared/ItemCard/ItemCard";
import SectionHead from "@/components/sections/shared/SectionHead/SectionHead";
import Button from "@/components/ui/Button/Button";
import Frame from "@/components/ui/Frame/Frame";
import Price from "@/components/ui/Price/Price";
import Section from "@/components/ui/Section/Section";
import { agents } from "@/data/agents";
import { itemTypes } from "@/data/marketplace";
import { marketplaceText as T, relatedItems, sampleNote, sectionBlocks } from "@/data/marketplacePages";
import { cartFilled } from "@/data/site";
import { solutions } from "@/data/solutions";
import { block, fill } from "@/lib/content";
import { ItemBuyButtons, TopicLink } from "./ItemActions";
import styles from "./marketplace.module.css";
import EnquiryButton from "@/components/ui/EnquiryButton/EnquiryButton";
import { PURCHASE_ENABLED } from "@/lib/commerce";

const solutionBySlug = new Map(solutions.map((solution) => [solution.slug, solution]));

export default function ItemPage({ entry }) {
  const item = entry.record;
  const type = itemTypes[item.type];
  const agent = agents.find(({ id }) => id === item.agent);
  const nav = sectionBlocks(entry, 0);
  const main = sectionBlocks(entry, 1);
  const fits = sectionBlocks(entry, 2);
  const more = sectionBlocks(entry, 3);
  const back = block(nav, "a.chip");
  const buy = block(main, "button.btn", 0);
  const now = block(main, "button.btn", 1);
  const book = block(fits, "a.btn");
  const all = block(more, "a.btn");
  const sample = item.priceStatus === "placeholder" ? sampleNote(main) : null;
  const related = relatedItems(item);

  return (
    <>
      <Section>
        <div className={styles.crumbRow}>
          <Link href={back.href} className={styles.back}>{back.text}</Link>
          <span className={styles.chip}>{type.name}</span>
        </div>
        <div className={styles.itemPage}>
          <div className={styles.visual} style={{ background: `var(--tint-${type.tint})` }}>
            <span className={styles.bigGlyph} aria-hidden="true">{type.glyph}</span>
            {agent ? (
              <Link href={`/how-it-works/agents/${agent.id}`} className={styles.agentMini} aria-label={agent.name}>
                <Image src={agent.image} alt="" fill sizes="180px" unoptimized draggable={false} />
              </Link>
            ) : null}
          </div>
          <div className={styles.info}>
            <p className={styles.eyebrow}>{type.name}{agent ? ` · ${T.forAgent} ${agent.name}` : ""}</p>
            <h1 className={styles.title}>{item.name}</h1>
            <p className={styles.lead}>{item.description}</p>
            {PURCHASE_ENABLED ? (
              <div className={styles.price}>
                <Price status={item.priceStatus} price={item.price} unit={item.unit} />
              </div>
            ) : null}
            <div className={styles.actions}>
              {PURCHASE_ENABLED ? (
                <ItemBuyButtons id={item.id} addLabel={buy.text} inCartLabel={T.inCart} buyLabel={now.text} checkoutHref={cartFilled.checkout.href} />
              ) : (
                <EnquiryButton about={item.name} path={type.name} />
              )}
            </div>
            {PURCHASE_ENABLED && sample ? (
              <details className={styles.sourceNote}>
                <summary>{sample.label}</summary>
                <p>{sample.body}</p>
                <p>{T.samplePrices}: ${item.price.toLocaleString("en-US")} {T.sampleUnits[item.unit]}</p>
              </details>
            ) : null}
            <div>
              <h2 className={styles.label}>{block(main, "h5", 0).text}</h2>
              <ul className={styles.ticks}>{item.includes.map((text) => <li key={text}>{text}</li>)}</ul>
            </div>
            <div>
              <h2 className={styles.label}>{block(main, "h5", 1).text}</h2>
              <ul className={styles.tools}>{item.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul>
            </div>
          </div>
        </div>
      </Section>
      <Section className={styles.following}>
        <div className={styles.fits}>
          <div>
            <SectionHead eyebrow={block(fits, "span.eyebrow").text} title={block(fits, "h2.big").text} />
            <div className={styles.links}>
              {agent ? (
                <Link href={`/how-it-works/agents/${agent.id}`}>
                  <span><small>{T.agentLabel}</small>{agent.name} · {agent.role}</span><span aria-hidden="true">→</span>
                </Link>
              ) : null}
              {item.solutions.map((slug) => (
                <Link key={slug} href={`/solutions/${slug}`}>
                  <span><small>{T.useCaseLabel}</small>{solutionBySlug.get(slug).pain}</span><span aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </div>
          <div className={styles.installCta}>
            <div>
              <h2>{block(fits, "h4").text}</h2>
              <p>{fill(T.installBody, { name: item.name })}</p>
            </div>
            <TopicLink variant="secondary" href={book.href} about={item.name} path={T.hubInstallPath}>{book.text}</TopicLink>
          </div>
        </div>
      </Section>
      <Section className={styles.following}>
        <SectionHead eyebrow={block(more, "span.eyebrow").text} title={block(more, "h2.big").text}
          action={<Button href={all.href} variant="secondary" className={styles.tall}>{all.text}</Button>} />
        <Frame className={styles.related}>
          {related.map((other) => <ItemCard key={other.id} item={other} />)}
        </Frame>
      </Section>
    </>
  );
}
