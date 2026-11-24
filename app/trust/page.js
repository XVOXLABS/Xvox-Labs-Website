import { TrustPage } from "../company/Pages";
import { companyPages } from "@/data/companyPages";

export const metadata = { title: "Trust and data" };

export default function Page() {
  return <TrustPage entry={companyPages.trust} />;
}
