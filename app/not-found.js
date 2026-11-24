import { companyPages } from "@/data/companyPages";
import { StubPage } from "./company/Pages";

// Global 404 (Next renders this for unmatched URLs and notFound() calls, with a 404 status).
// Same prototype stub as /notfound: eyebrow, headline and Back home. The prototype's lead points to a
// sitemap button this site does not have, so it is not shown (decision P4).
export const metadata = { title: "Not found" };

export default function NotFound() {
  return <StubPage entry={companyPages.notfound} />;
}
