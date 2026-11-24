import { StubPage } from "../company/Pages";
import { companyPages } from "@/data/companyPages";

export const metadata = { title: "Xvox Studio" };

export default function Page() {
  return <StubPage entry={companyPages.studio} />;
}
