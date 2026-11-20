"use client";

import { itemTypes, items } from "@/data/marketplace";
import Tabs from "@/components/ui/Tabs/Tabs";
import styles from "./page.module.css";

// Demo of the Tabs component using the prototype's marketplace types.
export default function StyleGuideTabs() {
  const tabs = Object.entries(itemTypes).map(([id, type]) => ({
    id,
    label: type.name,
    content: (
      <ul role="list" className={styles.tabList}>
        {items
          .filter((i) => i.type === id)
          .slice(0, 3)
          .map((i) => (
            <li key={i.id}>{i.name}</li>
          ))}
      </ul>
    ),
  }));
  return <Tabs items={tabs} label="Marketplace types" />;
}
