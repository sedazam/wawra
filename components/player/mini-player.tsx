"use client";

import Link from "next/link";
import Button from "@/components/ui/button";
import ProgressBar from "@/components/player/progress-bar";
import { formatDuration } from "@/lib/utils/format";
import { usePlayerContext } from "@/components/player/player-context";

export default function MiniPlayer() {
  const {
    currentAudio,
    isPlaying,
    currentTime,
    duration,
    toggleAudio,
    seekTo,
  } = usePlayerContext();

  if (!currentAudio) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-black/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 md:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href={`/audio/${currentAudio.slug}`} className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              {currentAudio.title}
            </p>
            <p className="truncate text-xs text-zinc-400">
              {currentAudio.speaker}
            </p>
          </Link>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              onClick={() => toggleAudio(currentAudio)}
            >
              {isPlaying ? "Pause" : "Play"}
            </Button>
          </div>
        </div>

        <div className="space-y-1">
          <ProgressBar
            value={currentTime}
            max={duration || 0}
            onChange={seekTo}
          />

          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>{formatDuration(Math.floor(currentTime))}</span>
            <span>{formatDuration(Math.floor(duration || 0))}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
