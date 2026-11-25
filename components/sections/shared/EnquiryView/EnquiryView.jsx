import EnquiryButton from "@/components/ui/EnquiryButton/EnquiryButton";
import Section from "@/components/ui/Section/Section";
import SectionHeader from "@/components/ui/SectionHeader/SectionHeader";
import { enquiry } from "@/data/enquiry";
import styles from "./EnquiryView.module.css";

// Shown instead of a purchase page (/checkout) while purchases are off.
export default function EnquiryView() {
  return (
    <Section>
      <SectionHeader layout="center" level={1} title={enquiry.label} action={<span className={styles.cta}><EnquiryButton /></span>} />
    </Section>
  );
}
