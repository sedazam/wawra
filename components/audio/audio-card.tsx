import Link from "next/link";
import type { AudioItem } from "@/types";
import Badge from "@/components/ui/badge";
import { formatDuration } from "@/lib/utils/format";

type AudioCardProps = {
  audio: AudioItem;
};

export default function AudioCard({ audio }: AudioCardProps) {
  return (
    <Link
      href={`/audio/${audio.slug}`}
      className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:bg-white/[0.07]"
    >
      <div className="aspect-square bg-zinc-800">
        <div className="flex h-full items-center justify-center text-sm text-zinc-500">
          Cover
        </div>
      </div>

      <div className="space-y-2 p-4">
        <Badge>{audio.categoryName}</Badge>

        <h3 className="line-clamp-2 text-base font-semibold text-white">
          {audio.title}
        </h3>

        <p className="text-sm text-zinc-400">{audio.speaker}</p>

        <p className="text-sm text-zinc-500">
          {formatDuration(audio.durationSeconds)}
        </p>
      </div>
    </Link>
  );
}
