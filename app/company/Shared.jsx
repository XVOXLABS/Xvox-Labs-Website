import Button from "@/components/ui/Button/Button";
import Category from "@/components/ui/Category/Category";
import Frame from "@/components/ui/Frame/Frame";
import Section from "@/components/ui/Section/Section";
import SectionHeader from "@/components/ui/SectionHeader/SectionHeader";
import { VOX_HREF } from "@/lib/actions";
import { block } from "@/lib/content";
import styles from "./company.module.css";

// Page header (prototype ph / stub): eyebrow, h1, lead and buttons. Hidden placeholder leads are not shown.
export function Intro({ blocks, lead, children, size, reveal }) {
  const text = lead === undefined ? blocks.find(({ tag, hidden }) => tag === "p.lead" && !hidden)?.text : lead || undefined;
  return (
    <Section>
      <SectionHeader level={1} size={size} reveal={reveal} eyebrow={<Category>{block(blocks, "span.eyebrow").text}</Category>}
        title={block(blocks, "h1").text} lead={text}
        action={children ? <div className={styles.actions}>{children}</div> : undefined} />
    </Section>
  );
}

// Closing call to action from the page's own blocks ("Start with a two-minute plan.").
export function Closing({ blocks }) {
  const book = block(blocks, "a.btn");
  return (
    <Section className={styles.following}>
      <SectionHeader layout="closing" title={block(blocks, "h2").text} lead={block(blocks, "p.lead").text}
          action={<div className={styles.actions}>
            <Button href={VOX_HREF}>{block(blocks, "button.btn").text}</Button>
            <Button href={book.href} variant="secondary">{book.text}</Button>
          </div>} />
    </Section>
  );
}

// Tinted cell grid in a grey frame (prototype .frame .pcell).
export function Cells({ cols = 3, children }) {
  return <Frame className={styles.cells} style={{ "--cols": cols }}>{children}</Frame>;
}

export function Cell({ tint, as: Tag = "div", children, ...props }) {
  return <Tag className={styles.cell} style={tint ? { background: `var(--tint-${tint})` } : undefined} {...props}>{children}</Tag>;
}

// Hidden prototype placeholder text, reviewable inside a labelled disclosure.
export function PlaceholderNote({ note }) {
  if (!note) return null;
  return (
    <details className={styles.sourceNote}>
      <summary>{note.label}</summary>
      <p>{note.body}</p>
    </details>
  );
}
