import { StubPage } from "../company/Pages";
import { companyPages } from "@/data/companyPages";

export const metadata = { title: "Careers" };

export default function Page() {
  return <StubPage entry={companyPages.careers} />;
}
