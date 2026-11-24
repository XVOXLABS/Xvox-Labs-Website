import { solutionsHub } from "@/data/solutionsPages";
import { HubSections } from "./SolutionsSections";

export const metadata = { title: solutionsHub.title };

export default function SolutionsPage() {
  return <HubSections entry={solutionsHub} />;
}
