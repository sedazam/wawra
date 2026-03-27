import Link from "next/link";

export default function AudioCard({ audio }: any) {
  return (
    <Link
      href={`/audio/${audio.slug}`}
      className="block rounded-xl border border-white/10 p-4 text-white"
    >
      <h3 className="font-semibold">{audio.title}</h3>
      <p className="text-sm text-zinc-400">{audio.speaker}</p>
    </Link>
  );
}
