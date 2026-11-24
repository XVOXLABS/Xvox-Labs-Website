import Button from "@/components/ui/Button/Button";
import Frame from "@/components/ui/Frame/Frame";
import Section from "@/components/ui/Section/Section";
import { leadForm } from "@/data/site";
import { VOX_HREF } from "@/lib/actions";
import { block, blocksByTag, display, homeSection } from "@/lib/content";
import ContactForm from "./ContactForm";
import styles from "./Contact.module.css";

export default function Contact() {
  const section = homeSection(15);
  const [name, email, company, interest, budget, start, tools, message] =
    blocksByTag(section, "label").map(({ text }) => text);
  const options = blocksByTag(section, "option");
  const interestOptions = options.filter((option) => option.field === "interest");
  const groups = Object.entries(leadForm.groups).map(([key, label]) => ({
    label,
    options: interestOptions.filter((option) => option.group === key).map(({ text }) => text),
  }));

  return (
    <Section aria-labelledby="home-contact-title">
      <Frame className={styles.layout}>
        <header className={styles.intro}>
          <span className={styles.eyebrow}>{block(section, "span.eyebrow").text}</span>
          <h2 id="home-contact-title" className={styles.title}>
            {block(section, "h2.big").text}
          </h2>
          <p className={styles.lead}>{block(section, "p.lead").text}</p>
          <p className={styles.discovery}>
            <strong>{block(section, "b").text}</strong>
            <span>{block(section, "span").text}</span>
          </p>
          <Button href={VOX_HREF} variant="secondary" className={styles.ask}>
            {block(section, "button.btn").text}
          </Button>
        </header>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>{block(section, "h3").text}</h3>
          <ContactForm
            labels={{ name, email, company, interest, budget, start, tools, message }}
            interestDefault={interestOptions.find((option) => !option.group).text}
            interestGroups={groups}
            budgetOptions={options.filter((option) => option.field === "budget").map(({ text }) => text)}
            startOptions={options.filter((option) => option.field === "start").map(({ text }) => text)}
            toolsPlaceholder={block(section, "input[placeholder]").text}
            submitLabel={block(section, "button.btn", 1).text}
            note={display(block(section, "p"))}
          />
        </div>
      </Frame>
    </Section>
  );
}
