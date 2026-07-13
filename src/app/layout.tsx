import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ministry of Education",
  description: "MOE Corporate Website Prototype",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
