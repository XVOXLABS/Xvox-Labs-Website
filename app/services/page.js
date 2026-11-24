import { servicesHub } from "@/data/servicesPages";
import { Hub } from "./ServiceSections";

export const metadata = { title: servicesHub.title };

export default function ServicesPage() {
  return <Hub entry={servicesHub} />;
}
