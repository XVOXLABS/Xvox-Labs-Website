"use client";

import Link from "next/link";
import { VOX_HREF, openVox } from "@/lib/actions";

// Footer link: "#vox" opens the Vox chat; everything else is a normal route.
export default function FooterLink({ link, className }) {
  if (link.href === VOX_HREF) {
    return (
      <button type="button" className={className} onClick={openVox}>
        {link.label}
      </button>
    );
  }
  return (
    <Link href={link.href} className={className}>
      {link.label}
    </Link>
  );
}
