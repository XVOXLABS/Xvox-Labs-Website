import { BlogPage } from "../company/Pages";
import { companyPages } from "@/data/companyPages";

export const metadata = { title: "Guides" };

export default function Page() {
  return <BlogPage entry={companyPages.blog} />;
}
