import Image from "next/image";
import { notFound } from "next/navigation";
import AudioCard from "@/components/audio/audio-card";
import AudioPlayer from "@/components/player/audio-player";
import PageContainer from "@/components/layout/page-container";
import SectionHeader from "@/components/layout/section-header";
import SiteFooter from "@/components/layout/site-footer";
import SiteHeader from "@/components/layout/site-header";
import Badge from "@/components/ui/badge";
import {
  getPublishedAudioBySlug,
  getRelatedPublishedAudios,
} from "@/lib/supabase/queries";
import { formatDuration, formatDate } from "@/lib/utils/format";
import { mapSupabaseAudio } from "@/lib/utils/map-audio";

type AudioDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function AudioDetailPage({
  params,
}: AudioDetailPageProps) {
  const { slug } = await params;

  let audioRaw;

  try {
    audioRaw = await getPublishedAudioBySlug(slug);
  } catch {
    notFound();
  }

  const audio = mapSupabaseAudio(audioRaw);

  const relatedRaw = await getRelatedPublishedAudios(
    audio.categoryId,
    audio.id,
  );
  const relatedAudios = relatedRaw.slice(0, 3).map(mapSupabaseAudio);

  return (
    <main className="min-h-screen bg-[#0B0B0F] pb-28">
      <SiteHeader />

      <PageContainer className="py-10 md:py-14">
        <div className="grid gap-8 md:grid-cols-[380px_minmax(0,1fr)]">
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-zinc-800">
            <Image
              src={audio.coverImageUrl}
              alt={audio.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-5">
            <Badge>{audio.categoryName}</Badge>

            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              {audio.title}
            </h1>

            <div className="text-sm text-zinc-400">
              {audio.speaker} • {formatDuration(audio.durationSeconds)} •{" "}
              {formatDate(audio.createdAt)}
            </div>

            <p className="max-w-2xl leading-7 text-zinc-300">
              {audio.description}
            </p>

            <AudioPlayer audio={audio} />
          </div>
        </div>

        <section className="py-12">
          <SectionHeader title="Related Audio" />

          {relatedAudios.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedAudios.map((item) => (
                <AudioCard key={item.id} audio={item} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-zinc-400">
              No related audio found yet.
            </div>
          )}
        </section>
      </PageContainer>

      <SiteFooter />
    </main>
  );
}
