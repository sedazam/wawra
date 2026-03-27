export default function FeaturedHero() {
  return <div>Featured Hero</div>;
}
import Link from "next/link";
import type { AudioItem } from "@/types";
import Button from "@/components/ui/button";
import Badge from "@/components/ui/badge";
import { formatDuration } from "@/lib/utils/format";

type FeaturedHeroProps = {
  audio: AudioItem;
};

export default function FeaturedHero({ audio }: FeaturedHeroProps) {
  return (
    <section className="py-8 md:py-12">
      <div className="grid items-center gap-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.03] p-6 md:grid-cols-2 md:p-8">
        <div className="space-y-4">
          <Badge>Featured</Badge>

          <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            {audio.title}
          </h1>

          <p className="max-w-xl text-sm leading-6 text-zinc-300 md:text-base">
            {audio.description}
          </p>

          <div className="text-sm text-zinc-400">
            {audio.speaker} • {audio.categoryName} •{" "}
            {formatDuration(audio.durationSeconds)}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button>Play now</Button>
            <Link href={`/audio/${audio.slug}`}>
              <Button variant="secondary">View details</Button>
            </Link>
          </div>
        </div>

        <div className="flex aspect-square items-center justify-center rounded-2xl bg-zinc-800 text-zinc-500">
          Featured Cover
        </div>
      </div>
    </section>
  );
}
