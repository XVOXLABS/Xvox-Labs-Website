import { agentsHub } from "@/data/agentsPages";
import HowItWorksSections from "./HowItWorksSections";

export const metadata = { title: "How it works" };

export default function HowItWorksPage() {
  return <HowItWorksSections entry={agentsHub} />;
}
