import type { Metadata } from "next";
import "./globals.css";
import { Experience } from "@/components/experience";
export const metadata: Metadata = {
  title: "Samruddhi Jeevan | Souharda Credit Co-operative Society, Hubballi",
  description: "Explore savings, fixed deposits, recurring deposits and loan services at Samruddhi Jeevan Souharda Credit Co-operative Society Ltd., Hubballi.",
  icons: { icon: "/society-logo.jpg" },
};
// Each page's main content declares its language; this default covers the redirect and 404.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><Experience/>{children}</body></html>;
}
