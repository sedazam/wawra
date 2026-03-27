"use client";

import { useState } from "react";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import Textarea from "@/components/ui/textarea";
import Toggle from "@/components/ui/toggle";
import type { Category } from "@/types";

type UploadAudioFormProps = {
  categories: Category[];
};

export default function UploadAudioForm({ categories }: UploadAudioFormProps) {
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(true);

  return (
    <form className="space-y-6">
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-white">Basic Details</h2>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm text-zinc-300">Title</label>
            <Input placeholder="Enter audio title" />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Speaker / Author
            </label>
            <Input placeholder="Enter speaker name" />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">Category</label>
            <Select defaultValue="">
              <option value="" disabled>
                Select category
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </Select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm text-zinc-300">
              Description
            </label>
            <Textarea placeholder="Write a short description..." />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold text-white">Media</h2>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm font-medium text-white">Audio File</p>
            <p className="mt-2 text-sm text-zinc-400">
              Drag and drop or click to upload MP3 / M4A
            </p>
            <Input type="file" className="mt-4" />
          </div>

          <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm font-medium text-white">Cover Image</p>
            <p className="mt-2 text-sm text-zinc-400">
              Upload a square cover image
            </p>
            <Input type="file" className="mt-4" />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold text-white">Publishing</h2>

        <div className="mt-5 space-y-4">
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div>
              <p className="font-medium text-white">Featured Audio</p>
              <p className="text-sm text-zinc-400">
                Show this audio prominently on the homepage
              </p>
            </div>
            <Toggle checked={isFeatured} onChange={setIsFeatured} />
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div>
              <p className="font-medium text-white">Published</p>
              <p className="text-sm text-zinc-400">
                Make this audio visible to listeners
              </p>
            </div>
            <Toggle checked={isPublished} onChange={setIsPublished} />
          </div>
        </div>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Button type="button" variant="secondary">
          Save Draft
        </Button>
        <Button type="submit">Publish Audio</Button>
      </div>
    </form>
  );
}
