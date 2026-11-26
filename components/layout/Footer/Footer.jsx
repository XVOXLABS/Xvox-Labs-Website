import Link from "next/link";
import { logo } from "@/lib/brand";
import { getFooter } from "@/lib/navigation";
import Button from "@/components/ui/Button/Button";
import FooterLink from "./FooterLink";
import styles from "./Footer.module.css";

// Footer (prototype drawFoot): one white card with the brand, intro and actions beside the four link
// columns, the large "xvox labs" wordmark, and the fine print. The brand stays as text.
export default function Footer() {
  const { intro, actions, columns, copyright } = getFooter();

  return (
    <footer className={styles.footer}>
      <div className={styles.card}>
        <div className={styles.grid}>
          <div>
            <Link href="/" className={styles.logo} aria-label={`${logo.alt} home`}>
              {logo.alt}
            </Link>
            {intro ? <p className={styles.intro}>{intro}</p> : null}
            <div className={styles.actions}>
              {actions.map((a) => (
                <Button key={a.label} href={a.href} variant={a.href === "#vox" ? "primary" : "secondary"} arrow={a.arrow} className={styles.action}>
                  {a.label}
                </Button>
              ))}
            </div>
          </div>

          {/* The columns are grid items of the same grid as the brand block */}
          <nav className={styles.columns} aria-label="Footer">
            {columns.map((col) => (
              <div key={col.heading}>
                <p className={styles.label}>{col.heading}</p>
                <ul role="list">
                  {col.links.map((link) => (
                    <li key={link.href + link.label}>
                      <FooterLink link={link} className={styles.link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className={styles.wordmark} aria-hidden="true">
          xvox labs
        </div>

        <div className={styles.fine}>
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
