import type { AudioItem } from "@/types";
import { formatDate, formatDuration } from "@/lib/utils/format";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";

type AudioTableProps = {
  audios: AudioItem[];
};

export default function AudioTable({ audios }: AudioTableProps) {
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
                Status
              </th>
              <th className="px-5 py-4 text-sm font-medium text-zinc-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {audios.map((audio) => (
              <tr
                key={audio.id}
                className="border-b border-white/10 last:border-b-0"
              >
                <td className="px-5 py-4 text-sm text-white">{audio.title}</td>
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
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      audio.isPublished
                        ? "bg-green-500/15 text-green-400"
                        : "bg-zinc-500/15 text-zinc-400"
                    }`}
                  >
                    {audio.isPublished ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex gap-2">
                    <Button variant="secondary" type="button">
                      Edit
                    </Button>
                    <Button variant="ghost" type="button">
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
