import { AboutPage } from "../company/Pages";
import { companyPages } from "@/data/companyPages";

export const metadata = { title: "About" };

export default function Page() {
  return <AboutPage entry={companyPages.about} />;
}
