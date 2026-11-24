import { StubPage } from "../company/Pages";
import { companyPages } from "@/data/companyPages";

export const metadata = { title: "Leads inbox" };

export default function Page() {
  return <StubPage entry={companyPages.inbox} />;
}
