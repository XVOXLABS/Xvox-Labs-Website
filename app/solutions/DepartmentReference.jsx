import Image from "next/image";
import Link from "next/link";
import RevealWords from "@/components/sections/shared/RevealWords/RevealWords";
import SectionHeader from "@/components/ui/SectionHeader/SectionHeader";
import SolutionStagger from "./SolutionStagger";
import styles from "./departmentReference.module.css";

// A section below the cards: the reference's content width and vertical spacing.
export function DepartmentSection({ variant, children }) {
  return (
    <section className={`${styles.section} ${styles[variant] ?? ""}`}>
      <div className={`${styles.wrap} ${styles.stack}`}>{children}</div>
    </section>
  );
}

// Centred section heading with the reference's label tile and word reveal.
export function DepartmentHead({ eyebrow, title }) {
  return (
    <SectionHeader
      layout="center"
      level={2}
      size="h2"
      className={styles.head}
      eyebrow={<span className={styles.eyebrow}>{eyebrow}</span>}
      title={<RevealWords text={title} />}
    />
  );
}

// Links to the other departments (the reference's white bordered chips).
export function DepartmentChips({ links }) {
  return (
    <div className={styles.chips}>
      {links.map(({ href, name }) => (
        <Link key={href} href={href} className={styles.chip}>
          {name}
          <span aria-hidden="true">→</span>
        </Link>
      ))}
    </div>
  );
}

// Closing call to action (.closing): a top line and centred text, without a card.
export function DepartmentClosing({ title, lead, children }) {
  return (
    <div className={styles.closingBox}>
      <h2>
        <RevealWords text={title} />
      </h2>
      <p>{lead}</p>
      <div className={styles.closingActions}>{children}</div>
    </div>
  );
}

// Department page top as in the Artifacts reference (PAGES.dept): single-column hero with the wide
// image, then the solution cards.
export default function DepartmentReference({ breadcrumbs, eyebrow, title, lead, image, solutions, children }) {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.wrap}>
          <nav aria-label="Breadcrumb" className={styles.crumbs}>
            <ol>
              {breadcrumbs.map(({ href, text }) => (
                <li key={text}>{href ? <Link href={href}>{text}</Link> : <span aria-current="page">{text}</span>}</li>
              ))}
            </ol>
          </nav>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1 className={styles.title}>
            <RevealWords text={title} />
          </h1>
          <p className={styles.lead}>{lead}</p>
          <div className={styles.actions}>{children}</div>
          <div className={styles.image}>
            <Image src={image} alt="" fill sizes="(max-width: 1131px) 100vw, 1100px" />
          </div>
        </div>
      </section>

      <section className={styles.solutions}>
        <div className={styles.wrap}>
          <SolutionStagger className={styles.grid}>
            {solutions.map((solution, i) => (
              <Link key={solution.slug} href={solution.href} className={styles.card} style={{ "--i": Math.min(i, 10) }}>
                <span className={styles.category}>
                  <span className={styles.dot} style={{ background: solution.category.color }} aria-hidden="true" />
                  {solution.category.name}
                </span>
                <h3>{solution.title}</h3>
                <p>{solution.description}</p>
                <span className={styles.more}>
                  <span className={styles.arrow} aria-hidden="true">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </SolutionStagger>
        </div>
      </section>
    </>
  );
}
