import { TalentPage } from "../company/Pages";
import { companyPages } from "@/data/companyPages";

export const metadata = { title: "Talent marketplace" };

export default function Page() {
  return <TalentPage entry={companyPages.talent} />;
}
