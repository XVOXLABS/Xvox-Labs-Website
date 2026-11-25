import { Inter } from "next/font/google";
import CartDrawer from "@/components/layout/CartDrawer/CartDrawer";
import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
import Toast from "@/components/layout/Toast/Toast";
import VoxChat from "@/components/layout/VoxChat/VoxChat";
import "./globals.css";
import { PURCHASE_ENABLED } from "@/lib/commerce";

// Inter: the primary font for the whole site (SIL Open Font License 1.1).
// next/font/google self-hosts the official files at build time; no npm font package.
// Loaded as the variable font so every weight in use (400-700) renders as a real weight.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  robots: { index: false, follow: false },
  title: {
    default: "Xvox Labs",
    template: "%s | Xvox Labs",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        {PURCHASE_ENABLED ? <CartDrawer /> : null}
        <VoxChat />
        <Toast />
      </body>
    </html>
  );
}
