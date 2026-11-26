import Link from "next/link";
import ItemCard from "@/components/sections/shared/ItemCard/ItemCard";
import SectionHead from "@/components/sections/shared/SectionHead/SectionHead";
import Accordion from "@/components/ui/Accordion/Accordion";
import Button from "@/components/ui/Button/Button";
import Card from "@/components/ui/Card/Card";
import Category from "@/components/ui/Category/Category";
import Frame from "@/components/ui/Frame/Frame";
import Price from "@/components/ui/Price/Price";
import Section from "@/components/ui/Section/Section";
import SectionHeader from "@/components/ui/SectionHeader/SectionHeader";
import { pricingDisplay } from "@/data/pricing";
import { checks } from "@/data/safe-ai";
import { areasInOrder, safeReview as safe, serviceAreaById, serviceRelated, servicesForArea, servicesText as T } from "@/data/servicesPages";
import { VOX_HREF } from "@/lib/actions";
import { block, blocksByTag, fill } from "@/lib/content";
import ServiceBooking from "./ServiceBooking";
import styles from "./services.module.css";
import EnquiryButton from "@/components/ui/EnquiryButton/EnquiryButton";
import { PURCHASE_ENABLED } from "@/lib/commerce";

function section(entry, index) {
  return entry.sections.find((part) => part.index === index).blocks;
}

function ServiceHero({ eyebrow, title, lead, breadcrumbs, children }) {
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
      <SectionHeader level={1} title={title} lead={lead} eyebrow={<Category>{eyebrow}</Category>}
        action={<div className={styles.actions}>{children}</div>} />
    </Section>
  );
}

function Closing({ blocks }) {
  const book = block(blocks, "a.btn");
  return (
    <Section>
      <SectionHeader layout="closing" title={block(blocks, "h2").text} lead={block(blocks, "p.lead").text}
          action={<div className={styles.actions}>
            <Button href={VOX_HREF}>{block(blocks, "button.btn").text}</Button>
            <Button href={book.href} variant="secondary">{book.text}</Button>
          </div>} />
    </Section>
  );
}

function ServiceRow({ href, title, summary }) {
  return (
    <Card href={href} className={styles.row}>
      <div><h3>{title}</h3><p className={styles.muted}>{summary}</p></div>
      <span className={styles.arrow} aria-hidden="true">›</span>
    </Card>
  );
}

export function Hub({ entry }) {
  const hero = section(entry, 0);
  const book = block(hero, "a.btn");
  const studio = section(entry, 2);
  const ready = section(entry, 3);
  const browse = block(ready, "a.btn");
  return (
    <>
      <ServiceHero eyebrow={block(hero, "span.eyebrow").text} title={entry.title} lead={block(hero, "p.lead").text}>
        <ServiceBooking href={book.href} about={block(hero, "span.eyebrow").text} path={T.bookPath}>{book.text}</ServiceBooking>
        <Button href={VOX_HREF} variant="secondary">{block(hero, "button.btn").text}</Button>
      </ServiceHero>
      <Section className={styles.following}>
        <Frame className={styles.two}>
          {areasInOrder.map(({ href, record }) => {
            const rows = servicesForArea(record.id);
            return (
              <Card key={href} href={href} tint={record.tint} className={styles.stack}>
                <Category color={record.color}>{T.areaCard}</Category>
                <h2>{record.name}</h2>
                <p>{record.line}</p>
                <ul className={styles.chips}>
                  {rows.slice(0, 4).map((row) => <li key={row.href}>{row.title}</li>)}
                  {rows.length > 4 ? <li>{fill(T.more, { count: rows.length - 4 })}</li> : null}
                </ul>
                <span className={styles.cardEnd}>{fill(T.explore, record)} <span aria-hidden="true">→</span></span>
              </Card>
            );
          })}
        </Frame>
        <Card href={block(studio, "a.studio").href} className={styles.studio}>
          <div>
            <Category>{T.sisterCompany}</Category>
            <h2>{block(studio, "h3").text}</h2>
            <p className={styles.muted}>{block(studio, "p.muted").text}</p>
          </div>
          <span className={styles.arrow} aria-hidden="true">↗</span>
        </Card>
      </Section>
      <Section className={styles.following}>
        <SectionHead eyebrow={block(ready, "span.eyebrow").text} title={block(ready, "h2.big").text}
          action={<Button href={browse.href}>{browse.text}</Button>} />
      </Section>
      <Closing blocks={section(entry, 4)} />
    </>
  );
}

export function Area({ entry }) {
  const area = entry.record;
  const hero = section(entry, 0);
  const book = block(hero, "a.btn");
  const process = section(entry, 2);
  const studio = block(section(entry, 3), "a.chip");
  const isAI = area.id === "ai";
  const [introPrefix, introSuffix] = isAI ? entry.computedText[0].split(entry.computedText[1]) : [];
  const lead = isAI ? <>{introPrefix}<Link href="/solutions">{entry.computedText[1]}</Link>{introSuffix}</> : entry.computedText[0];
  const steps = blocksByTag(process, "strong");
  const descriptions = blocksByTag(process, "span");
  const numbers = blocksByTag(process, "b");
  return (
    <>
      <ServiceHero eyebrow={area.name} title={area.line} lead={lead} breadcrumbs={[block(hero, "a"), { text: area.name }]}>
        <ServiceBooking href={book.href} about={area.name} path={T.bookPath}>{book.text}</ServiceBooking>
        <Button href={area.id === "safe" ? safe.selfCheckHref : VOX_HREF} variant="secondary">{entry.computedText[isAI ? 2 : 1]}</Button>
      </ServiceHero>
      <Section className={styles.following}>
        <Frame>
          {servicesForArea(area.id).map(({ href, record }) => <ServiceRow key={href} {...record} href={href} />)}
          {isAI ? <ServiceRow {...T.packagedAutomation} /> : null}
        </Frame>
      </Section>
      <Section className={styles.following}>
        <SectionHead eyebrow={block(process, "span.eyebrow").text} title={block(process, "h2.big").text} />
        <Frame as="ol" className={styles.timeline}>
          {steps.map(({ text }, i) => (
            <Card as="li" key={text} className={styles.step}>
              <b className={styles.arrow}>{numbers[i].text}</b>
              <p><strong>{text}</strong>{descriptions[i].text.slice(text.length)}</p>
            </Card>
          ))}
        </Frame>
      </Section>
      <Section className={styles.following}>
        <div className={styles.siblings}>
          {areasInOrder.filter(({ href }) => href !== entry.href).map(({ href, title }) =>
            <Link key={href} href={href}>{title}<span aria-hidden="true">→</span></Link>)}
          <Link href={studio.href}>{studio.text}</Link>
        </div>
      </Section>
      <Closing blocks={section(entry, 4)} />
    </>
  );
}

function DraftPrice({ note }) {
  if (!PURCHASE_ENABLED) return null;
  return (
    <p className={styles.note}>
      <span title={T.draftPriceTitle}>{pricingDisplay.prototypePriceToSetLabel}</span>{note ? ` ${note}` : null}
    </p>
  );
}

function RelatedSolutions({ entries }) {
  return (
    <Section className={styles.following}>
      <SectionHead eyebrow={T.related} title={T.relatedTitle} />
      <Frame className={styles.three}>
        {entries.map((solution) => (
          <Card key={solution.slug} href={solution.href} className={styles.stack}>
            <Category color={solution.category.color}>{solution.category.name}</Category>
            <h3>{solution.title}</h3>
            <p className={styles.muted}>{solution.description}</p>
            <span className={`${styles.cardEnd} ${styles.arrowOnly}`} aria-hidden="true">→</span>
          </Card>
        ))}
      </Frame>
    </Section>
  );
}

function RelatedItems({ items }) {
  const samples = items.filter(({ priceStatus }) => priceStatus === "placeholder");
  return (
    <Section className={styles.following}>
      <SectionHead eyebrow={T.marketplace} title={T.marketplaceTitle} />
      <Frame className={styles.four}>
        {items.map((item) => <ItemCard key={item.id} item={item} />)}
      </Frame>
      {PURCHASE_ENABLED && samples.length ? (
        <details className={styles.note}>
          <summary>{T.sampleCatalogue}</summary>
          <ul>{samples.map(({ id, name, price, unit }) =>
            <li key={id}><Link href={`/marketplace/${id}`}>{name}</Link> · ${price.toLocaleString("en-US")}{unit === "/month" ? " / month" : ""}</li>)}</ul>
        </details>
      ) : null}
    </Section>
  );
}

export function Detail({ entry }) {
  const service = entry.record;
  const area = serviceAreaById.get(service.pillar);
  const hero = section(entry, 0);
  const book = block(hero, "a.btn");
  // The second computed line is the prototype's "Timeline" label, which is not shown.
  const [deliverables, , price] = entry.computedText;
  const related = serviceRelated(entry);
  return (
    <>
      <ServiceHero eyebrow={area.title} title={service.title} lead={service.summary}
        breadcrumbs={[block(hero, "a"), { text: area.title, href: area.href }, { text: service.title }]}>
        <ServiceBooking href={book.href} about={service.title} path={T.bookPath}>{book.text}</ServiceBooking>
        <Button href={VOX_HREF} variant="secondary">{block(hero, "button.btn").text}</Button>
      </ServiceHero>
      <Section className={styles.following}>
        <Frame>
          <div className={styles.three}>
            {service.deliverables.map((text, i) => (
              <Card key={text} tint={`p${(i % 4) + 1}`} className={styles.deliverable}>
                <Category>{deliverables}</Category>
                <h2>{text}</h2>
              </Card>
            ))}
          </div>
          {PURCHASE_ENABLED ? (
            <div className={styles.one}>
              <Card>
                <h2>{price}</h2><Price showCta={false} status="to-set" />
                <DraftPrice note={T.priceNote} />
              </Card>
            </div>
          ) : null}
        </Frame>
      </Section>
      {related.solutions.length ? <RelatedSolutions entries={related.solutions} /> : null}
      {related.items.length ? <RelatedItems items={related.items} /> : null}
      <Section className={styles.following}>
        <SectionHead eyebrow={fill(T.moreIn, area.record)} title={T.otherServices} />
        <Frame>
          {related.services.map(({ href, record }) => <ServiceRow key={href} {...record} href={href} />)}
        </Frame>
      </Section>
      <Closing blocks={section(entry, 3)} />
    </>
  );
}

export function SafeReview({ entry }) {
  const hero = section(entry, 0);
  const parent = serviceAreaById.get(entry.record.pillar);
  const [title, lead, selfCheck, book] = entry.computedText;
  const copy = (prefix) => entry.computedText.find((text) => text.startsWith(prefix));
  const verdict = copy("Verdict: ");
  const bookHref = block(hero, "a.btn").href;
  return (
    <>
      <ServiceHero eyebrow={parent.title} title={title} lead={lead}
        breadcrumbs={[block(hero, "a"), { text: parent.title, href: parent.href }, { text: entry.title }]}>
        <Button href={safe.selfCheckHref}>{selfCheck}</Button>
        <ServiceBooking href={bookHref} about={safe.serviceName} path={safe.initialPath} variant="secondary">{book}</ServiceBooking>
      </ServiceHero>
      <Section className={styles.following}>
        <div className={styles.builders}>
          <span className={styles.muted}>{copy("Built with")}</span>
          <ul className={styles.chips}>{safe.builders.map((builder) => <li key={builder}>{builder}</li>)}</ul>
        </div>
      </Section>
      <Section className={styles.following}>
        <SectionHead eyebrow={copy("Five checks")} title={copy("What we look")} />
        <Frame className={styles.five}>
          {checks.map(({ name, text }, i) => (
            <Card key={name} tint={`p${(i % 4) + 1}`} className={styles.stack}>
              <h3>{name}</h3><p>{text}</p>
            </Card>
          ))}
        </Frame>
      </Section>
      <Section className={styles.following}>
        <SectionHead layout="center" eyebrow={copy("Packages")} title={copy("From a quick scan")} />
        <Frame className={styles.five}>
          {safe.packages.map((pack) => (
            <Card key={pack.name} tint={pack.highlight ? "p2" : undefined} className={styles.stack}>
              <h3>{pack.name}</h3>
              <p>{pack.text}</p>
              <Price showCta={false} status={pack.price ? "published" : "to-set"} price={pack.price} />
              {pack.price ? <Button href={safe.selfCheckHref} full variant="secondary">{pack.cta}</Button> : PURCHASE_ENABLED ?
                <ServiceBooking href={bookHref} about={safe.serviceName} path={pack.path} full variant={pack.highlight ? "primary" : "secondary"}>{pack.cta}</ServiceBooking>
                : <EnquiryButton about={safe.serviceName} path={pack.path} full variant={pack.highlight ? "primary" : "secondary"} />}
              {pack.price ? null : <DraftPrice note={pack.draftUnit} />}
            </Card>
          ))}
        </Frame>
      </Section>
      <Section className={styles.following}>
        <SectionHead eyebrow={copy("The report")} title={copy("What you get back")} />
        <Frame className={styles.two}>
          <Card className={styles.stack}>
            <Category>{copy("Sample report")}</Category>
            <h3>{verdict.slice(0, -safe.report.verdict.length)}<span className={styles.verdict}>{safe.report.verdict}</span></h3>
            <p className={styles.muted}>{copy("Customer support agent")}</p>
            <ul className={styles.scores}>
              {checks.map(({ name }, i) => (
                <li key={name}>
                  <span>{name}</span>
                  <meter min="0" max="100" value={safe.report.scores[i]} aria-label={name} />
                  <b>{safe.report.scores[i]}</b>
                </li>
              ))}
            </ul>
          </Card>
          <Card className={styles.stack}>
            <h3>{copy("Top findings")}</h3>
            <ol className={styles.findings}>{safe.report.findings.map(({ severity, text }) => (
              <li key={text}><b className={styles.severity}>{severity}</b> {text}</li>
            ))}</ol>
            <p className={styles.muted}>{copy("Each finding comes")}</p>
          </Card>
        </Frame>
        <p className={styles.muted}>{copy("We call it a review")}</p>
      </Section>
      <Section className={styles.following}>
        <div className={styles.two}>
          <SectionHead eyebrow={copy("FAQ")} title={copy("About the review.")} lead={copy("Still unsure?")}
            action={<Button href={VOX_HREF} variant="secondary">{block(hero, "button.btn").text}</Button>} />
          <Accordion items={safe.faq} numbered={false} defaultOpen={-1} />
        </div>
      </Section>
      <Closing blocks={section(entry, 3)} />
    </>
  );
}
