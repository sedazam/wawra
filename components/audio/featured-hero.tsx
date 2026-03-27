"use client";

import Image from "next/image";
import Link from "next/link";
import type { AudioItem } from "@/types";
import Button from "@/components/ui/button";
import Badge from "@/components/ui/badge";
import { formatDuration } from "@/lib/utils/format";
import { usePlayerContext } from "@/components/player/player-context";

type FeaturedHeroProps = {
  audio: AudioItem;
};

export default function FeaturedHero({ audio }: FeaturedHeroProps) {
  const { toggleAudio, currentAudio, isPlaying } = usePlayerContext();
  const isCurrent = currentAudio?.id === audio.id;

  return (
    <section className="py-8 md:py-12">
      <div className="grid items-center gap-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/[0.06] to-white/[0.02] p-6 md:grid-cols-2 md:p-8 lg:p-10">
        <div className="space-y-5">
          <Badge>Featured Audio</Badge>

          <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-white md:text-5xl md:leading-[1.1]">
            {audio.title}
          </h1>

          <p className="max-w-xl text-sm leading-7 text-zinc-300 md:text-base">
            {audio.description}
          </p>

          <div className="text-sm text-zinc-400">
            {audio.speaker} • {audio.categoryName} •{" "}
            {formatDuration(audio.durationSeconds)}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button onClick={() => toggleAudio(audio)}>
              {isCurrent && isPlaying ? "Pause" : "Play now"}
            </Button>

            <Link href={`/audio/${audio.slug}`}>
              <Button variant="secondary">View details</Button>
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-zinc-800">
            <Image
              src={audio.coverImageUrl}
              alt={audio.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute -bottom-4 -left-4 rounded-2xl border border-white/10 bg-black/70 px-4 py-3 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Now playing
            </p>
            <p className="mt-1 text-sm font-medium text-white">{audio.title}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
