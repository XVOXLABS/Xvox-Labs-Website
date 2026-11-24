"use client";

import Appear from "@/components/motion/Appear/Appear";
import Frame from "@/components/ui/Frame/Frame";
import Tabs from "@/components/ui/Tabs/Tabs";
import { itemTypes, items } from "@/data/marketplace";
import ItemCard from "../ItemCard/ItemCard";
import styles from "./MarketplaceFeatured.module.css";

const byId = Object.fromEntries(items.map((i) => [i.id, i]));
const PER_TAB = 8;

// Marketplace tabs (prototype drawFeat + mtabs, shared Tabs with wrapping, decision D5):
// "Featured" shows the given fixed list; each type tab shows the first 8 items of that type,
// in data order. labels: [featured, ...one per type in itemTypes order]; label: tab list name.
export default function MarketplaceFeatured({ featuredIds, labels, label }) {
  const tabs = [
    { id: "featured", label: labels[0], list: featuredIds.map((id) => byId[id]) },
    ...Object.keys(itemTypes).map((type, i) => ({ id: type, label: labels[i + 1], list: items.filter((x) => x.type === type).slice(0, PER_TAB) })),
  ];

  return (
    <Tabs
      label={label}
      className={styles.tabs}
      defaultId="featured"
      items={tabs.map((t) => ({
        id: t.id,
        label: t.label,
        content: (
          <Frame>
            <ul role="list" className={styles.grid}>
              {t.list.map((item, i) => (
                <Appear as="li" key={item.id} delay={i * 70} className={styles.cell}>
                  <ItemCard item={item} />
                </Appear>
              ))}
            </ul>
          </Frame>
        ),
      }))}
    />
  );
}
