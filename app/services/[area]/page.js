import { notFound } from "next/navigation";
import { serviceAreaById } from "@/data/servicesPages";
import { Area } from "../ServiceSections";

export const dynamicParams = false;

export function generateStaticParams() {
  return [...serviceAreaById.keys()].map((area) => ({ area }));
}

export async function generateMetadata({ params }) {
  const { area } = await params;
  const entry = serviceAreaById.get(area);
  if (!entry) notFound();
  return { title: entry.title };
}

export default async function AreaPage({ params }) {
  const { area } = await params;
  const entry = serviceAreaById.get(area);
  if (!entry) notFound();
  return <Area entry={entry} />;
}
