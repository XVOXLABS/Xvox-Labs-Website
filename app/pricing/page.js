import { PricingPage } from "../company/Pages";
import { companyPages } from "@/data/companyPages";

export const metadata = { title: "Pricing" };

export default function Page() {
  return <PricingPage entry={companyPages.pricing} />;
}
