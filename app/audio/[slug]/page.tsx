import { notFound } from "next/navigation";
import AudioCard from "@/components/audio/audio-card";
import PageContainer from "@/components/layout/page-container";
import SectionHeader from "@/components/layout/section-header";
import SiteFooter from "@/components/layout/site-footer";
import SiteHeader from "@/components/layout/site-header";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import { audios } from "@/lib/queries/mock-data";
import { formatDuration, formatDate } from "@/lib/utils/format";

type AudioDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function AudioDetailPage({
  params,
}: AudioDetailPageProps) {
  const { slug } = await params;

  const audio = audios.find((item) => item.slug === slug);

  if (!audio) {
    notFound();
  }

  const relatedAudios = audios
    .filter(
      (item) => item.categoryId === audio.categoryId && item.id !== audio.id,
    )
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-[#0B0B0F]">
      <SiteHeader />

      <PageContainer className="py-10 md:py-14">
        <div className="grid gap-8 md:grid-cols-[380px_minmax(0,1fr)]">
          <div className="flex aspect-square items-center justify-center rounded-3xl border border-white/10 bg-zinc-800 text-zinc-500">
            Cover
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

            <div className="flex flex-wrap gap-3">
              <Button>Play now</Button>
              <Button variant="secondary">Save for later</Button>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-zinc-400">
              Audio player UI will go here in the next step.
            </div>
          </div>
        </div>

        <section className="py-12">
          <SectionHeader title="Related Audio" />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedAudios.map((item) => (
              <AudioCard key={item.id} audio={item} />
            ))}
          </div>
        </section>
      </PageContainer>

      <SiteFooter />
    </main>
  );
}
