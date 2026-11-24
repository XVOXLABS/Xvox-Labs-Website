"use client";

import Button from "@/components/ui/Button/Button";
import { savePreference } from "@/lib/preference";

export default function ServiceBooking({ href, about, path, children, ...props }) {
  return <Button href={href} onClick={() => savePreference(about, path)} {...props}>{children}</Button>;
}
