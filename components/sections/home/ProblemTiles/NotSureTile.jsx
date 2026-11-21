"use client";

import Image from "next/image";
import Card from "@/components/ui/Card/Card";
import Category from "@/components/ui/Category/Category";
import IconButton from "@/components/ui/IconButton/IconButton";
import { openVox } from "@/lib/actions";
import styles from "./ProblemTiles.module.css";

// "06 / Not sure yet": the prototype tile is a button that opens Vox (data-ask).
export default function NotSureTile({ label, heading, text, sizes }) {
  return (
    <Card as="button" type="button" className={`${styles.tile} ${styles.button}`} onClick={openVox}>
      <span className={styles.media}>
        <Image src="/images/x-9.webp" alt="" fill sizes={sizes} className={styles.img} />
        <IconButton tone="dark" className={styles.arrowDark}>
          →
        </IconButton>
      </span>
      <Category color="var(--color-ink)">{label}</Category>
      <span className={styles.title}>{heading}</span>
      <span className={styles.text}>{text}</span>
    </Card>
  );
}
