import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Campaign Archive | Interactive Page Index",
  description: "A catalog of 38 interactive gaming, fintech, rewards, and follow-up campaign pages.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}