"use client";

import { useState } from "react";
import type { AudioItem } from "@/types";
import { formatDate, formatDuration } from "@/lib/utils/format";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import { deleteAudioById, updateAudioFlags } from "@/lib/supabase/admin-audios";
import Link from "next/link";

type AudioTableProps = {
  audios: AudioItem[];
};

export default function AudioTable({ audios: initialAudios }: AudioTableProps) {
  const [audios, setAudios] = useState(initialAudios);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this audio? This will also remove its uploaded audio file and cover image.",
    );

    if (!confirmed) return;

    try {
      setLoadingId(id);
      await deleteAudioById(id);
      setAudios((prev) => prev.filter((audio) => audio.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Delete failed.");
    } finally {
      setLoadingId(null);
    }
  }

  async function handleTogglePublished(id: string, currentValue: boolean) {
    try {
      setLoadingId(id);
      await updateAudioFlags({
        id,
        isPublished: !currentValue,
      });

      setAudios((prev) =>
        prev.map((audio) =>
          audio.id === id ? { ...audio, isPublished: !currentValue } : audio,
        ),
      );
    } catch (error) {
      console.error("Publish toggle failed:", error);
      alert("Publish toggle failed.");
    } finally {
      setLoadingId(null);
    }
  }

  async function handleToggleFeatured(id: string, currentValue: boolean) {
    try {
      setLoadingId(id);
      await updateAudioFlags({
        id,
        isFeatured: !currentValue,
      });

      setAudios((prev) =>
        prev.map((audio) =>
          audio.id === id ? { ...audio, isFeatured: !currentValue } : audio,
        ),
      );
    } catch (error) {
      console.error("Featured toggle failed:", error);
      alert("Featured toggle failed.");
    } finally {
      setLoadingId(null);
    }
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="border-b border-white/10 bg-white/[0.03]">
            <tr>
              <th className="px-5 py-4 text-sm font-medium text-zinc-400">
                Title
              </th>
              <th className="px-5 py-4 text-sm font-medium text-zinc-400">
                Speaker
              </th>
              <th className="px-5 py-4 text-sm font-medium text-zinc-400">
                Category
              </th>
              <th className="px-5 py-4 text-sm font-medium text-zinc-400">
                Duration
              </th>
              <th className="px-5 py-4 text-sm font-medium text-zinc-400">
                Created
              </th>
              <th className="px-5 py-4 text-sm font-medium text-zinc-400">
                Published
              </th>
              <th className="px-5 py-4 text-sm font-medium text-zinc-400">
                Featured
              </th>
              <th className="px-5 py-4 text-sm font-medium text-zinc-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {audios.map((audio) => {
              const busy = loadingId === audio.id;

              return (
                <tr
                  key={audio.id}
                  className="border-b border-white/10 last:border-b-0"
                >
                  <td className="px-5 py-4 text-sm text-white">
                    {audio.title}
                  </td>
                  <td className="px-5 py-4 text-sm text-zinc-300">
                    {audio.speaker}
                  </td>
                  <td className="px-5 py-4 text-sm text-zinc-300">
                    {audio.categoryName}
                  </td>
                  <td className="px-5 py-4 text-sm text-zinc-300">
                    {formatDuration(audio.durationSeconds)}
                  </td>
                  <td className="px-5 py-4 text-sm text-zinc-300">
                    {formatDate(audio.createdAt)}
                  </td>

                  <td className="px-5 py-4 text-sm">
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() =>
                        handleTogglePublished(audio.id, audio.isPublished)
                      }
                      className={`rounded-full px-3 py-1 text-xs transition ${
                        audio.isPublished
                          ? "bg-green-500/15 text-green-400"
                          : "bg-zinc-500/15 text-zinc-400"
                      }`}
                    >
                      {audio.isPublished ? "Published" : "Draft"}
                    </button>
                  </td>

                  <td className="px-5 py-4 text-sm">
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() =>
                        handleToggleFeatured(audio.id, audio.isFeatured)
                      }
                      className={`rounded-full px-3 py-1 text-xs transition ${
                        audio.isFeatured
                          ? "bg-amber-500/15 text-amber-400"
                          : "bg-zinc-500/15 text-zinc-400"
                      }`}
                    >
                      {audio.isFeatured ? "Featured" : "Standard"}
                    </button>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <Link href={`/admin/audios/${audio.id}/edit`}>
                        <Button variant="secondary" type="button">
                          Edit
                        </Button>
                      </Link>

                      <Button
                        variant="ghost"
                        type="button"
                        onClick={() => handleDelete(audio.id)}
                        disabled={busy}
                      >
                        {busy ? "Working..." : "Delete"}
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
