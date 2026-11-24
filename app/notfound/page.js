import { StubPage } from "../company/Pages";
import { companyPages } from "@/data/companyPages";

export const metadata = { title: "Not found" };

export default function Page() {
  return <StubPage entry={companyPages.notfound} />;
}
