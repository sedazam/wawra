"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import Textarea from "@/components/ui/textarea";
import Toggle from "@/components/ui/toggle";
import { updateAudioMetadata } from "@/lib/supabase/edit-audios";

type CategoryItem = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
};

type EditAudioFormProps = {
  audio: {
    id: string;
    title: string;
    speaker: string;
    description: string;
    categorySlug: string;
    isPublished: boolean;
    isFeatured: boolean;
  };
  categories: CategoryItem[];
};

export default function EditAudioForm({
  audio,
  categories,
}: EditAudioFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(audio.title);
  const [speaker, setSpeaker] = useState(audio.speaker);
  const [description, setDescription] = useState(audio.description);
  const [categorySlug, setCategorySlug] = useState(audio.categorySlug);
  const [isPublished, setIsPublished] = useState(audio.isPublished);
  const [isFeatured, setIsFeatured] = useState(audio.isFeatured);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!title.trim()) {
      setErrorMessage("Title is required.");
      return;
    }

    if (!speaker.trim()) {
      setErrorMessage("Speaker is required.");
      return;
    }

    if (!description.trim()) {
      setErrorMessage("Description is required.");
      return;
    }

    if (!categorySlug) {
      setErrorMessage("Category is required.");
      return;
    }

    const category = categories.find((item) => item.slug === categorySlug);

    if (!category) {
      setErrorMessage("Selected category is invalid.");
      return;
    }

    try {
      setIsSubmitting(true);

      await updateAudioMetadata({
        id: audio.id,
        title,
        speaker,
        description,
        categorySlug,
        categoryName: category.name,
        isPublished,
        isFeatured,
      });

      setSuccessMessage("Audio updated successfully.");
      router.push("/admin/audios");
      router.refresh();
    } catch (error: unknown) {
      console.error("Audio update failed:", error);

      let message = "Update failed.";

      if (error instanceof Error) {
        message = error.message;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof (error as { message: unknown }).message === "string"
      ) {
        message = (error as { message: string }).message;
      }

      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-white">Edit Audio</h2>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm text-zinc-300">Title</label>
            <Input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter audio title"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Speaker / Author
            </label>
            <Input
              value={speaker}
              onChange={(event) => setSpeaker(event.target.value)}
              placeholder="Enter speaker name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">Category</label>
            <Select
              value={categorySlug}
              onChange={(event) => setCategorySlug(event.target.value)}
            >
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
            <Textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Write a short description..."
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold text-white">Publishing</h2>

        <div className="mt-5 space-y-4">
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div>
              <p className="font-medium text-white">Featured Audio</p>
              <p className="text-sm text-zinc-400">Show this on the homepage</p>
            </div>
            <Toggle checked={isFeatured} onChange={setIsFeatured} />
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div>
              <p className="font-medium text-white">Published</p>
              <p className="text-sm text-zinc-400">Visible to listeners</p>
            </div>
            <Toggle checked={isPublished} onChange={setIsPublished} />
          </div>
        </div>
      </Card>

      {successMessage ? (
        <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-400">
          {successMessage}
        </div>
      ) : null}

      {errorMessage ? (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          {errorMessage}
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push("/admin/audios")}
        >
          Back
        </Button>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
