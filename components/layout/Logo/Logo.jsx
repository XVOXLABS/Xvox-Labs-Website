import Image from "next/image";
import Link from "next/link";
import { logo, logoDisplayHeight } from "@/lib/brand";
import styles from "./Logo.module.css";

// Home link with the brand. `image` shows the logo file (the header); without it only the name is shown.
// The file is served as supplied (unoptimized), and its displayed size is set in the CSS module.
export default function Logo({ href = "/", height = logoDisplayHeight, image = false, priority = false }) {
  const ready = image && logo.src && logo.width && logo.height;

  return (
    <Link href={href} className={styles.logo} aria-label={`${logo.alt} home`}>
      {ready ? (
        <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} className={styles.image} preload={priority} unoptimized />
      ) : (
        <span className={styles.pending} style={{ height }} data-logo-pending="true">
          {logo.alt}
        </span>
      )}
    </Link>
  );
}
