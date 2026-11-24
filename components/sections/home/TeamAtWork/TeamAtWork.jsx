"use client";

import { useState } from "react";
import Button from "@/components/ui/Button/Button";
import Frame from "@/components/ui/Frame/Frame";
import Section from "@/components/ui/Section/Section";
import Tabs from "@/components/ui/Tabs/Tabs";
import { orchestrationText as T } from "@/data/orchestration";
import { solutions } from "@/data/solutions";
import { block, blocksByTag, fill, homeSection } from "@/lib/content";
import Orchestration from "../../shared/Orchestration/Orchestration";
import SectionHead from "../../shared/SectionHead/SectionHead";
import styles from "./TeamAtWork.module.css";

// The four homepage flows, in the prototype's tab order (TW).
const FLOWS = ["leads-go-cold", "consistent-posting", "slow-replies", "proposals"];

// Section 6: "Real orchestration. Watch it run." (prototype teamWork + twStage). Four tabs, each an
// orchestration flow; the first runs when it comes into view, and switching tab runs the new one.
export default function TeamAtWork() {
  const s = homeSection(6);
  const labels = blocksByTag(s, "button");
  const [active, setActive] = useState(FLOWS[0]);
  const [signals, setSignals] = useState({});

  const items = FLOWS.map((slug, i) => {
    const sol = solutions.find((x) => x.slug === slug);
    return {
      id: slug,
      label: labels[i].text,
      content: (
        <>
          <Orchestration slug={slug} active={active === slug} runSignal={signals[slug] || 0} />
          <div className={styles.foot}>
            <span className={styles.muted}>{fill(T.footer, { blueprint: sol.title, timeline: sol.workflow.timeline })}</span>
            <Button href={`/solutions/${slug}`} variant="small" arrow>
              {T.seeSolution}
            </Button>
          </div>
        </>
      ),
    };
  });

  return (
    <Section>
      <SectionHead eyebrow={block(s, "span.eb2").text} title={block(s, "h2.big").text} lead={block(s, "p.lead").text} />
      <Frame>
        <Tabs
          label={block(s, "span.eb2").text}
          items={items}
          defaultId={FLOWS[0]}
          className={styles.tabs}
          onChange={(id) => {
            setActive(id);
            setSignals((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
          }}
        />
      </Frame>
    </Section>
  );
}
