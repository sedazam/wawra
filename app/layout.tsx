import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wawra",
  description: "A modern home for audio.",
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
