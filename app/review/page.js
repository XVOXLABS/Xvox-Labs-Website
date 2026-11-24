import Link from "next/link";
import { footer } from "@/data/navigation";
import {
  implementedPrototypePaths,
  prototypeActions,
  prototypeAliases,
  prototypeRoutes,
  reviewAnchor,
  reviewGroups,
} from "@/data/reviewRoutes";
import Frame from "@/components/ui/Frame/Frame";
import Section from "@/components/ui/Section/Section";
import SectionHeader from "@/components/ui/SectionHeader/SectionHeader";
import ReviewNavigation from "./ReviewNavigation";
import styles from "./page.module.css";

export const metadata = { title: "Prototype review" };

const implemented = new Set(implementedPrototypePaths);
const routesByHref = new Map(prototypeRoutes.map((entry) => [entry.href, entry]));
const routesByHash = new Map(prototypeRoutes.map((entry) => [entry.hash, entry]));
const targets = Object.fromEntries([
  ...prototypeRoutes.map(({ hash }) => [hash, reviewAnchor(hash)]),
  ...Object.entries(prototypeAliases).map(([alias, hash]) => [alias, reviewAnchor(hash)]),
]);

function labelsFor({ text, hidden, priceStatus }) {
  const labels = [];
  if (hidden) labels.push("Prototype only");
  if (/placeholder/i.test(text)) labels.push("Placeholder");
  if (priceStatus === "to-set" || /draft wording|price to set/i.test(text)) labels.push("Draft");
  if (priceStatus === "placeholder" || /\bsample\b/i.test(text)) labels.push("Sample");
  return labels;
}

function SourceBlocks({ blocks }) {
  return (
    <ul className={styles.blocks}>
      {blocks.map((block, index) => {
        const { text, prototypeHref, href } = block;
        const target = targets[prototypeHref] ?? targets[routesByHref.get(href)?.hash];
        const action = Object.hasOwn(prototypeActions, prototypeHref) ? prototypeHref : undefined;
        const reviewHref = target ? `#${target}` : action;
        const labels = labelsFor(block);
        return (
          <li key={index}>
            {labels.map((label) => <span key={label} className={styles.label}>{label}</span>)}
            {reviewHref ? <a href={reviewHref}>{text}</a> : text}
          </li>
        );
      })}
    </ul>
  );
}

function ReviewRecord({ entry }) {
  const parent = routesByHref.get(entry.parentHref);
  const ready = implemented.has(entry.href);
  return (
    <details id={reviewAnchor(entry.hash)} className={styles.record} data-prototype-destination>
      <summary>{entry.title} <code>{entry.hash}</code></summary>
      <div className={styles.recordBody}>
        {entry.record?.priceStatus === "placeholder" ? <p><span className={styles.label}>Sample</span></p> : null}
        <p>
          {ready ? <Link href={entry.href}>Open page <code>{entry.href}</code></Link> : <>Planned page <code>{entry.href}</code></>}
        </p>
        {parent ? <p>Parent page <a href={`#${reviewAnchor(parent.hash)}`}><code>{parent.href}</code></a></p> : null}
        <p>Source <code>{entry.source}</code></p>
        {entry.sections.map(({ index, blocks }) => (
          <section key={index} data-hire-section={entry.source === "data/pages/agent.js" && index === 7 ? "" : undefined}>
            <h3>Source section {index + 1}</h3>
            <SourceBlocks blocks={blocks} />
          </section>
        ))}
        {entry.computedText?.length ? (
          <section>
            <h3>Destination-specific source text</h3>
            <SourceBlocks blocks={entry.computedText.map((text) => ({ text }))} />
          </section>
        ) : null}
      </div>
    </details>
  );
}

export default function ReviewPage() {
  return (
    <Section className={styles.page} aria-labelledby="review-title">
      <ReviewNavigation targets={targets} actions={prototypeActions} pricingIsLive={implemented.has("/pricing")} />
      <div id="review-title">
        <SectionHeader
          level={1}
          title="Prototype review"
          lead={`${prototypeRoutes.length} destinations from the original prototype. Open a source record to read its content and see its planned URL.`}
        />
      </div>
      <nav className={styles.categories} aria-label="Review categories">
        {reviewGroups.map(({ id, title }) => <a key={id} href={`#review-category-${id}`}>{title}</a>)}
        <a href="#review-legacy">Legacy navigation</a>
      </nav>
      {reviewGroups.map(({ id, title, entries }) => (
        <section key={id} id={`review-category-${id}`} aria-labelledby={`heading-${id}`} className={styles.group}>
          <h2 id={`heading-${id}`}>{title}</h2>
          <nav aria-label={title}>
            <ul className={styles.index}>
              {entries.map(({ hash, title }) => (
                <li key={hash}><a href={`#${reviewAnchor(hash)}`}>{title}</a></li>
              ))}
            </ul>
          </nav>
          <Frame>{entries.map((entry) => <ReviewRecord key={entry.hash} entry={entry} />)}</Frame>
        </section>
      ))}
      <section id="review-legacy" className={styles.group} aria-labelledby="legacy-title">
        <h2 id="legacy-title">Legacy navigation</h2>
        <Frame>
          <ul className={styles.blocks}>
            {Object.entries(prototypeAliases).map(([alias, hash]) => (
              <li key={alias}><a href={alias}><code>{alias}</code></a> → <code>{routesByHash.get(hash).href}</code></li>
            ))}
            <li><a href="#guide"><code>#guide</code></a> opens Vox.</li>
            <li><a href="#hire"><code>#hire</code></a> opens the pricing review here. From an agent record it scrolls to Ways to buy. The approved pricing URL is <code>{prototypeActions["#hire"].href}</code>.</li>
          </ul>
        </Frame>
      </section>
      <section className={styles.group} aria-labelledby="footer-source-title">
        <h2 id="footer-source-title">Original footer content</h2>
        <Frame><div className={styles.recordBody}><SourceBlocks blocks={footer} /></div></Frame>
      </section>
    </Section>
  );
}
