import type { Metadata } from "next";
import "./globals.css";
import { PlayerProvider } from "@/components/player/player-context";
import MiniPlayer from "@/components/player/mini-player";

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
      <body>
        <PlayerProvider>
          {children}
          <MiniPlayer />
        </PlayerProvider>
      </body>
    </html>
  );
}
