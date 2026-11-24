import { StubPage } from "../company/Pages";
import { companyPages } from "@/data/companyPages";

export const metadata = { title: "Legal" };

export default function Page() {
  return <StubPage entry={companyPages.privacy} />;
}
