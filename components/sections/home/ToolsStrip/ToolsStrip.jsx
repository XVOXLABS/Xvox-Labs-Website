import Marquee from "@/components/motion/Marquee/Marquee";
import { block, blocksByTag, homeSection } from "@/lib/content";
import styles from "./ToolsStrip.module.css";

// Section 3: "Works inside the tools you already use". The prototype lists the 14 tools twice
// for its loop; Marquee already duplicates (and hides) the copy, so each tool is rendered once.
export default function ToolsStrip() {
  const label = block(homeSection(2), "div.mq-l").text;
  const all = blocksByTag(homeSection(3), "span").map((b) => b.text);
  const tools = all.slice(0, all.length / 2);
  return (
    <section className={styles.strip} aria-labelledby="tools-label">
      <p id="tools-label" className={styles.label}>
        {label}
      </p>
      <Marquee label={label} duration={40}>
        {tools.map((tool) => (
          <span key={tool} className={styles.tile}>
            {tool}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
