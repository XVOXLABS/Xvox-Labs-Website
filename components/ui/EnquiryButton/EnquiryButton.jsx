"use client";

import Button from "@/components/ui/Button/Button";
import { enquiry } from "@/data/enquiry";
import { savePreference } from "@/lib/preference";

// "Contact Our Team": opens the enquiry form on /book. When "about" is given it is saved as the topic
// (About and Path), which the form shows. Nothing is sent or stored on a server.
export default function EnquiryButton({ about, path, onClick, ...props }) {
  return (
    <Button
      {...props}
      href={enquiry.href}
      onClick={() => {
        if (about) savePreference(about, path);
        onClick?.();
      }}
    >
      {enquiry.label}
    </Button>
  );
}
