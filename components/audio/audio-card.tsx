"use client";

import Image from "next/image";
import Link from "next/link";
import type { AudioItem } from "@/types";
import Badge from "@/components/ui/badge";
import { formatDuration } from "@/lib/utils/format";
import { usePlayerContext } from "@/components/player/player-context";

type AudioCardProps = {
  audio: AudioItem;
};

export default function AudioCard({ audio }: AudioCardProps) {
  const { toggleAudio, currentAudio, isPlaying } = usePlayerContext();
  const isCurrent = currentAudio?.id === audio.id;

  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition duration-200 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07]">
      <Link href={`/audio/${audio.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-zinc-800">
          <Image
            src={audio.coverImageUrl}
            alt={audio.title}
            fill
            loading="eager"
            className="object-cover transition duration-300 group-hover:scale-105"
          />

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4">
            <span className="rounded-full bg-black/50 px-3 py-1 text-xs text-zinc-200">
              {formatDuration(audio.durationSeconds)}
            </span>

            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                toggleAudio(audio);
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500 text-sm font-semibold text-black shadow-lg transition group-hover:scale-105"
            >
              {isCurrent && isPlaying ? "❚❚" : "▶"}
            </button>
          </div>
        </div>
      </Link>

      <div className="space-y-3 p-4">
        <Badge>{audio.categoryName}</Badge>

        <Link href={`/audio/${audio.slug}`} className="block">
          <h3 className="line-clamp-2 text-base font-semibold leading-6 text-white">
            {audio.title}
          </h3>
        </Link>

        <p className="text-sm text-zinc-400">{audio.speaker}</p>
      </div>
    </div>
  );
}
