import { getFooter } from "@/lib/navigation";
import Button from "@/components/ui/Button/Button";
import Logo from "../Logo/Logo";
import FooterLink from "./FooterLink";
import styles from "./Footer.module.css";

// Footer (Framer inspiration, original XVOX branding): white card in a grey frame, intro and
// actions, the prototype's four link columns, copyright, and the large XVOX LABS wordmark.
export default function Footer() {
  const { intro, actions, columns, copyright } = getFooter();

  return (
    <footer className={styles.footer}>
      <div className={styles.frame}>
        <div className={styles.card}>
          <div className={styles.top}>
            <div className={styles.brand}>
              <Logo />
              {intro ? <p className={styles.intro}>{intro}</p> : null}
              <div className={styles.actions}>
                {actions.map((a) => (
                  <Button key={a.label} href={a.href} variant={a.href === "#vox" ? "secondary" : "primary"} arrow={a.arrow}>
                    {a.label}
                  </Button>
                ))}
              </div>
            </div>

            <nav className={styles.columns} aria-label="Footer">
              {columns.map((col) => (
                <div key={col.heading} className={styles.column}>
                  <p className={styles.label}>{col.heading}</p>
                  <ul role="list" className={styles.links}>
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

          <div className={styles.bottom}>
            <p className={styles.copyright}>{copyright}</p>
          </div>
        </div>

        <div className={styles.wordmark} aria-hidden="true">
          <span>XVOX LABS</span>
        </div>
      </div>
    </footer>
  );
}
