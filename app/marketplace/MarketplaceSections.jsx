import Button from "@/components/ui/Button/Button";
import Category from "@/components/ui/Category/Category";
import Frame from "@/components/ui/Frame/Frame";
import Section from "@/components/ui/Section/Section";
import SectionHeader from "@/components/ui/SectionHeader/SectionHeader";
import { marketFilters, marketHub, marketIndex, marketSort, marketplaceText, sampleNote, sectionBlocks } from "@/data/marketplacePages";
import { VOX_HREF } from "@/lib/actions";
import { block } from "@/lib/content";
import { TopicLink } from "./ItemActions";
import MarketplaceBrowser from "./MarketplaceBrowser";
import styles from "./marketplace.module.css";

function Closing({ blocks }) {
  const book = block(blocks, "a.btn");
  return (
    <Section className={styles.following}>
      <Frame className={styles.closing}>
        <SectionHeader layout="center" size="h1" title={block(blocks, "h2").text} lead={block(blocks, "p.lead").text}
          action={<div className={styles.actions}>
            <Button href={VOX_HREF}>{block(blocks, "button.btn").text}</Button>
            <Button href={book.href} variant="secondary">{book.text}</Button>
          </div>} />
      </Frame>
    </Section>
  );
}

export default function MarketplaceHub() {
  const head = sectionBlocks(marketHub, 0);
  const body = sectionBlocks(marketHub, 1);
  const book = block(body, "a.btn");
  const sortLabel = block(body, "label.note").text.replace(/\s*Featured.*$/, "");
  const install = (
    <div className={styles.installCta}>
      <div>
        <h2>{block(body, "h4").text}</h2>
        <p>{block(body, "p").text}</p>
      </div>
      <TopicLink variant="secondary" href={book.href} about={marketplaceText.hubInstallAbout} path={marketplaceText.hubInstallPath}>{book.text}</TopicLink>
    </div>
  );
  return (
    <>
      <Section>
        <SectionHeader level={1} eyebrow={<Category>{block(head, "span.eyebrow").text}</Category>}
          title={block(head, "h1").text} lead={block(head, "p.lead").text} />
      </Section>
      <Section className={styles.following}>
        <MarketplaceBrowser
          filters={marketFilters}
          sorts={{ label: sortLabel, options: marketSort }}
          index={marketIndex}
          text={{ ...marketplaceText, units: marketplaceText.sampleUnits }}
          search={{ label: block(body, "label").text, placeholder: block(body, "input[placeholder]").text }}
          install={install}
          sample={sampleNote(head)}
        />
      </Section>
      <Closing blocks={sectionBlocks(marketHub, 2)} />
    </>
  );
}
