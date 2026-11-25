"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import ItemCard from "@/components/sections/shared/ItemCard/ItemCard";
import Frame from "@/components/ui/Frame/Frame";
import { items } from "@/data/marketplace";
import styles from "./marketplace.module.css";
import { PURCHASE_ENABLED } from "@/lib/commerce";

const GROUPS = ["type", "agent", "cat"];
const PRICE_SORTS = ["low", "high"];

// Prototype drawMarket: filters AND together; search matches name, description and tools;
// Featured keeps catalogue order; price sorts use the catalogue's original (sample) values.
function visibleItems(state, index) {
  const query = state.q.trim().toLowerCase();
  const list = items.filter((item) =>
    (state.type === "all" || item.type === state.type) &&
    (state.agent === "all" || item.agent === state.agent) &&
    (state.cat === "all" || index[item.id].categories.includes(state.cat)) &&
    (!query || index[item.id].text.includes(query)));
  if (state.sort === "low") list.sort((a, b) => a.price - b.price);
  else if (state.sort === "high") list.sort((a, b) => b.price - a.price);
  else if (state.sort === "name") list.sort((a, b) => (a.name < b.name ? -1 : 1));
  return list;
}

function Browser({ initialAgent, filters, sorts, index, text, search, install, sample }) {
  const [state, setState] = useState({ type: "all", agent: initialAgent, cat: "all", q: "", sort: "featured" });
  const list = visibleItems(state, index);
  const set = (key, value) => setState((prev) => ({ ...prev, [key]: value }));
  const count = `${list.length} ${list.length === 1 ? text.countOne : text.countMany}`;
  const samples = list.filter(({ priceStatus }) => priceStatus === "placeholder");

  return (
    <div className={styles.layout}>
      <div className={styles.side}>
        <div className={styles.searchBox}>
          <span aria-hidden="true">⌕</span>
          <label htmlFor="marketplace-search" className={styles.srOnly}>{search.label}</label>
          <input id="marketplace-search" type="search" placeholder={search.placeholder} value={state.q}
            autoComplete="off" onChange={(e) => set("q", e.target.value)} />
        </div>
        {GROUPS.map((key) => (
          <div key={key} role="group" aria-labelledby={`marketplace-filter-${key}`}>
            <h2 id={`marketplace-filter-${key}`} className={styles.filterHeading}>{filters[key].label}</h2>
            <div className={styles.options}>
              {filters[key].options.map(({ value, label, count: n }) => (
                <button key={value} type="button" aria-pressed={state[key] === value} onClick={() => set(key, value)}>
                  <span>{label}</span><span className={styles.optionCount}>{n}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.results}>
        <div className={styles.bar}>
          <p role="status" className={styles.count}>{count}</p>
          <label className={styles.sort}>
            <span>{sorts.label}</span>
            <select value={state.sort} onChange={(e) => set("sort", e.target.value)}>
              {sorts.options.filter(({ value }) => PURCHASE_ENABLED || !PRICE_SORTS.includes(value)).map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
            </select>
          </label>
        </div>
        <Frame>
          {list.length ? (
            <div className={styles.grid}>{list.map((item) => <ItemCard key={item.id} item={item} />)}</div>
          ) : (
            <p className={styles.empty}>{text.empty}</p>
          )}
        </Frame>
        {PURCHASE_ENABLED && sample ? (
          <details className={styles.sourceNote}>
            <summary>{sample.label}</summary>
            <p>{sample.body}</p>
            {samples.length ? (
              <ul>
                {samples.map(({ id, name, price, unit }) => (
                  <li key={id}><Link href={`/marketplace/${id}`}>{name}</Link> · ${price.toLocaleString("en-US")}{unit === "/month" ? ` ${text.units["/month"]}` : ""}</li>
                ))}
              </ul>
            ) : null}
          </details>
        ) : null}
        {install}
      </div>
    </div>
  );
}

// ?agent=<id> (Agent profiles and the agent popup link here) pre-selects that agent filter.
function WithParams(props) {
  const requested = useSearchParams().get("agent");
  const agent = props.filters.agent.options.some(({ value }) => value === requested) ? requested : "all";
  return <Browser key={agent} initialAgent={agent} {...props} />;
}

export default function MarketplaceBrowser(props) {
  return (
    <Suspense fallback={<Browser initialAgent="all" {...props} />}>
      <WithParams {...props} />
    </Suspense>
  );
}
