import { phase3Pages, sectionBlocks } from "@/data/phase3Pages";
import { block } from "@/lib/content";
import CheckoutDemo from "./CheckoutDemo";

export const metadata = { title: "Checkout" };

// /checkout (prototype PAGES.checkout): the cart review and demo order form. The empty-cart state comes from
// the extracted page blocks; the rest is the demo module, which FINAL-1 later replaces with the Contact Us flow.
export default function CheckoutPage() {
  const blocks = sectionBlocks(phase3Pages.checkout, 0);
  const browse = block(blocks, "a.btn");
  const empty = { eyebrow: block(blocks, "span.eyebrow").text, title: block(blocks, "h1").text, lead: block(blocks, "p.lead").text, browse: { text: browse.text, href: browse.href } };
  return <CheckoutDemo empty={empty} />;
}
