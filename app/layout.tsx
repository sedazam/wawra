import type { Metadata } from "next";
import "./globals.css";
import { PlayerProvider } from "@/components/player/player-context";
import MiniPlayer from "@/components/player/mini-player";
import PodcastMenuBar from "@/components/layout/podcast-menu-bar";

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
          <PodcastMenuBar />
        </PlayerProvider>
      </body>
    </html>
  );
}
