import { notFound } from "next/navigation";
import { agentById } from "@/data/agentsPages";
import AgentProfile from "../../AgentProfile";

export const dynamicParams = false;

export function generateStaticParams() {
  return [...agentById.keys()].map((id) => ({ id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const entry = agentById.get(id);
  if (!entry) notFound();
  return { title: entry.title };
}

export default async function AgentPage({ params }) {
  const { id } = await params;
  const entry = agentById.get(id);
  if (!entry) notFound();
  return <AgentProfile entry={entry} />;
}
