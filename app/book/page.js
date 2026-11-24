import { BookPage } from "../company/Pages";
import { companyPages } from "@/data/companyPages";

export const metadata = { title: "Discovery call" };

export default function Page() {
  return <BookPage entry={companyPages.book} />;
}
