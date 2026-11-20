import { Inter } from "next/font/google";
import "./globals.css";

// Inter: used for small UI text, as in the Framer reference.
// Switzer (primary font) is added with next/font/local once its licence is approved;
// until then --font-sans falls back to "Helvetica Neue", Arial, sans-serif.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata = {
  // TODO: replace with the live domain before launch.
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Xvox Labs",
    template: "%s | Xvox Labs",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
