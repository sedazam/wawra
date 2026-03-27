"use client";

import type { AudioItem } from "@/types";
import Button from "@/components/ui/button";
import ProgressBar from "@/components/player/progress-bar";
import { formatDuration } from "@/lib/utils/format";
import { usePlayerContext } from "@/components/player/player-context";

type AudioPlayerProps = {
  audio: AudioItem;
};

export default function AudioPlayer({ audio }: AudioPlayerProps) {
  const {
    currentAudio,
    isPlaying,
    currentTime,
    duration,
    toggleAudio,
    seekTo,
  } = usePlayerContext();

  const isCurrentAudio = currentAudio?.id === audio.id;
  const shownTime = isCurrentAudio ? currentTime : 0;
  const shownDuration = isCurrentAudio ? duration : audio.durationSeconds;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="mb-4 flex flex-wrap gap-3">
        <Button onClick={() => toggleAudio(audio)}>
          {isCurrentAudio && isPlaying ? "Pause" : "Play now"}
        </Button>

        <Button
          variant="secondary"
          onClick={() => seekTo(Math.max(shownTime - 15, 0))}
          disabled={!isCurrentAudio}
        >
          -15s
        </Button>

        <Button
          variant="secondary"
          onClick={() => seekTo(Math.min(shownTime + 15, shownDuration || 0))}
          disabled={!isCurrentAudio}
        >
          +15s
        </Button>
      </div>

      <div className="space-y-2">
        <ProgressBar
          value={shownTime}
          max={shownDuration || 0}
          onChange={seekTo}
        />

        <div className="flex items-center justify-between text-sm text-zinc-400">
          <span>{formatDuration(Math.floor(shownTime))}</span>
          <span>{formatDuration(Math.floor(shownDuration || 0))}</span>
        </div>
      </div>
    </div>
  );
}
