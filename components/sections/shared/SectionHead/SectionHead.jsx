import Category from "@/components/ui/Category/Category";
import SectionHeader from "@/components/ui/SectionHeader/SectionHeader";
import RevealWords from "../RevealWords/RevealWords";

// Section heading (prototype head() and, with layout "row", head2()): label, heading with the word
// reveal, optional lead and action.
export default function SectionHead({ eyebrow, title, lead, action, layout = "stack", tone = "light", className = "" }) {
  return (
    <SectionHeader
      layout={layout}
      level={2}
      size="h2"
      className={className}
      eyebrow={eyebrow ? <Category color={tone === "dark" ? "var(--color-on-dark)" : "var(--color-ink)"}>{eyebrow}</Category> : null}
      title={<RevealWords text={title} tone={tone} />}
      lead={lead}
      action={action}
    />
  );
}
