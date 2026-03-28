export default function AdminPage() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <a
        href="/admin/upload"
        className="rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/[0.07]"
      >
        <p className="text-lg font-semibold text-white">Upload Audio</p>
        <p className="mt-2 text-sm text-zinc-400">
          Add a new audio item to your library
        </p>
      </a>

      <a
        href="/admin/audios"
        className="rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/[0.07]"
      >
        <p className="text-lg font-semibold text-white">Manage Audios</p>
        <p className="mt-2 text-sm text-zinc-400">
          Publish, feature, or delete existing audio
        </p>
      </a>

      <a
        href="/admin/categories"
        className="rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/[0.07]"
      >
        <p className="text-lg font-semibold text-white">Manage Categories</p>
        <p className="mt-2 text-sm text-zinc-400">
          Create and organise category groups
        </p>
      </a>
    </div>
  );
}
