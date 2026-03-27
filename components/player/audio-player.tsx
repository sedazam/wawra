"use client";

import type { AudioItem } from "@/types";
import Button from "@/components/ui/button";
import ProgressBar from "@/components/player/progress-bar";
import { formatDuration } from "@/lib/utils/format";
import { usePlayerContext } from "@/components/player/player-context";
import { FaPlay, FaPause, FaBackward, FaForward } from "react-icons/fa";

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
    <div className="max-w-md mx-auto rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-800 shadow-lg p-6 flex flex-col items-center">
      <div className="w-24 h-24 rounded-2xl bg-zinc-700 mb-4 flex items-center justify-center text-4xl text-white/60">
        <FaPlay />
      </div>
      <div className="text-center mb-2">
        <div className="text-lg font-semibold text-white mb-1">
          {audio.title}
        </div>
        <div className="text-zinc-400 text-sm">{audio.speaker}</div>
      </div>
      <div className="flex items-center gap-6 my-4">
        <button
          className="rounded-full bg-zinc-700 hover:bg-zinc-600 p-3 text-white/80 transition"
          onClick={() => seekTo(Math.max(shownTime - 15, 0))}
          disabled={!isCurrentAudio}
        >
          <FaBackward />
        </button>
        <button
          className="rounded-full bg-blue-500 hover:bg-blue-600 p-5 text-white text-2xl shadow-lg transition"
          onClick={() => toggleAudio(audio)}
        >
          {isCurrentAudio && isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button
          className="rounded-full bg-zinc-700 hover:bg-zinc-600 p-3 text-white/80 transition"
          onClick={() => seekTo(Math.min(shownTime + 15, shownDuration || 0))}
          disabled={!isCurrentAudio}
        >
          <FaForward />
        </button>
      </div>
      <div className="w-full flex flex-col gap-2">
        <ProgressBar
          value={shownTime}
          max={shownDuration || 0}
          onChange={seekTo}
        />
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>{formatDuration(Math.floor(shownTime))}</span>
          <span>{formatDuration(Math.floor(shownDuration || 0))}</span>
        </div>
      </div>
    </div>
  );
}
