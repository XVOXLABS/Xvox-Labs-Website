import Image from "next/image";
import Link from "next/link";
import { logo, logoDisplayHeight } from "@/lib/brand";
import styles from "./Logo.module.css";

// Logo slot. Renders the approved logo file once it is configured in lib/brand.js.
// Until then it shows only the accessible name, so nothing stands in for the real logo.
export default function Logo({ href = "/", height = logoDisplayHeight, priority = false }) {
  const ready = logo.src && logo.width && logo.height;
  const width = ready ? Math.round((logo.width / logo.height) * height) : undefined;

  return (
    <Link href={href} className={styles.logo} aria-label={`${logo.alt} home`}>
      {ready ? (
        <Image src={logo.src} alt={logo.alt} width={width} height={height} preload={priority} />
      ) : (
        <span className={styles.pending} style={{ height }} data-logo-pending="true">
          {logo.alt}
        </span>
      )}
    </Link>
  );
}
