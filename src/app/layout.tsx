import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Studio | UI foundations",
  description: "A shadcn/ui component workspace powered by a warm amber design system.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}