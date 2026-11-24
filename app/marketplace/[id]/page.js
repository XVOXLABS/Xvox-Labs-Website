import { notFound } from "next/navigation";
import { itemById } from "@/data/marketplacePages";
import ItemPage from "../ItemPage";

export const dynamicParams = false;

export function generateStaticParams() {
  return [...itemById.keys()].map((id) => ({ id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const entry = itemById.get(id);
  if (!entry) notFound();
  return { title: entry.title };
}

export default async function MarketplaceItemPage({ params }) {
  const { id } = await params;
  const entry = itemById.get(id);
  if (!entry) notFound();
  return <ItemPage entry={entry} />;
}
