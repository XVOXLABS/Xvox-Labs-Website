import { notFound } from "next/navigation";
import { serviceDetail, serviceDetails } from "@/data/servicesPages";
import { Detail, SafeReview } from "../../ServiceSections";

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceDetails.map(({ record }) => ({ area: record.pillar, id: record.id }));
}

export async function generateMetadata({ params }) {
  const { area, id } = await params;
  const entry = serviceDetail(area, id);
  if (!entry) notFound();
  return { title: entry.title };
}

export default async function ServicePage({ params }) {
  const { area, id } = await params;
  const entry = serviceDetail(area, id);
  if (!entry) notFound();
  return id === "safe-review" ? <SafeReview entry={entry} /> : <Detail entry={entry} />;
}
