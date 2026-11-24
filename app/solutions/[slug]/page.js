import { notFound } from "next/navigation";
import { solutionsBySlug } from "@/data/solutionsPages";
import { DepartmentSections, DetailSections } from "../SolutionsSections";

export const dynamicParams = false;

export function generateStaticParams() {
  return [...solutionsBySlug.keys()].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const entry = solutionsBySlug.get(slug);
  if (!entry) notFound();
  return { title: entry.title };
}

export default async function SolutionPage({ params }) {
  const { slug } = await params;
  const entry = solutionsBySlug.get(slug);
  if (!entry) notFound();
  return entry.hash.startsWith("#dept-") ? <DepartmentSections entry={entry} /> : <DetailSections entry={entry} />;
}
