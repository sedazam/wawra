"use client";

import { useEffect, useMemo, useState } from "react";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import Textarea from "@/components/ui/textarea";
import Toggle from "@/components/ui/toggle";
import type { Category } from "@/types";
import {
  validateAudioForm,
  type AudioFormValues,
  type AudioFormErrors,
} from "@/lib/validations/audio";
import { uploadAudioFile, uploadCoverFile } from "@/lib/supabase/storage";
import { createAudioRecord } from "@/lib/supabase/audios";

type UploadAudioFormProps = {
  categories: Category[];
};

const initialValues: AudioFormValues = {
  title: "",
  speaker: "",
  category: "",
  description: "",
  isFeatured: false,
  isPublished: true,
  audioFile: null,
  coverFile: null,
};

function formatDuration(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function UploadAudioForm({ categories }: UploadAudioFormProps) {
  const [values, setValues] = useState<AudioFormValues>(initialValues);
  const [errors, setErrors] = useState<AudioFormErrors>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [detectedDuration, setDetectedDuration] = useState<number | null>(null);

  const coverPreviewUrl = useMemo(() => {
    if (!values.coverFile) return "";
    return URL.createObjectURL(values.coverFile);
  }, [values.coverFile]);

  useEffect(() => {
    return () => {
      if (coverPreviewUrl) {
        URL.revokeObjectURL(coverPreviewUrl);
      }
    };
  }, [coverPreviewUrl]);

  useEffect(() => {
    if (!values.audioFile) {
      setDetectedDuration(null);
      return;
    }

    const objectUrl = URL.createObjectURL(values.audioFile);
    const audio = document.createElement("audio");

    const handleLoadedMetadata = () => {
      setDetectedDuration(audio.duration || 0);
      URL.revokeObjectURL(objectUrl);
    };

    const handleError = () => {
      setDetectedDuration(null);
      URL.revokeObjectURL(objectUrl);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("error", handleError);
    audio.src = objectUrl;

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("error", handleError);
      URL.revokeObjectURL(objectUrl);
    };
  }, [values.audioFile]);

  function updateField<K extends keyof AudioFormValues>(
    field: K,
    value: AudioFormValues[K],
  ) {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));

    setSuccessMessage("");
    setErrorMessage("");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formErrors = validateAudioForm(values);
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      setSuccessMessage("");
      setErrorMessage("");
      return;
    }

    try {
      setIsSubmitting(true);
      setSuccessMessage("");
      setErrorMessage("");

      const category = categories.find((item) => item.slug === values.category);

      if (!category) {
        setErrors((prev) => ({
          ...prev,
          category: "Selected category is invalid.",
        }));
        return;
      }

      const audioUrl = await uploadAudioFile(values.audioFile!);
      const coverImageUrl = await uploadCoverFile(values.coverFile!);

      await createAudioRecord({
        values,
        audioUrl,
        coverImageUrl,
        categoryName: category.name,
        durationSeconds: detectedDuration ? Math.floor(detectedDuration) : 0,
      });

      setValues(initialValues);
      setErrors({});
      setDetectedDuration(null);
      setSuccessMessage("Audio uploaded and saved successfully.");
    } catch (error: unknown) {
      console.error("Upload failed:", error);

      let message = "Unknown error occurred.";

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
      setSuccessMessage("");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-white">Basic Details</h2>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm text-zinc-300">Title</label>
            <Input
              placeholder="Enter audio title"
              value={values.title}
              onChange={(event) => updateField("title", event.target.value)}
            />
            {errors.title ? (
              <p className="mt-2 text-sm text-red-400">{errors.title}</p>
            ) : null}
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">
              Speaker / Author
            </label>
            <Input
              placeholder="Enter speaker name"
              value={values.speaker}
              onChange={(event) => updateField("speaker", event.target.value)}
            />
            {errors.speaker ? (
              <p className="mt-2 text-sm text-red-400">{errors.speaker}</p>
            ) : null}
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">Category</label>
            <Select
              value={values.category}
              onChange={(event) => updateField("category", event.target.value)}
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
            {errors.category ? (
              <p className="mt-2 text-sm text-red-400">{errors.category}</p>
            ) : null}
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm text-zinc-300">
              Description
            </label>
            <Textarea
              placeholder="Write a short description..."
              value={values.description}
              onChange={(event) =>
                updateField("description", event.target.value)
              }
            />
            {errors.description ? (
              <p className="mt-2 text-sm text-red-400">{errors.description}</p>
            ) : null}
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold text-white">Media</h2>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm font-medium text-white">Audio File</p>
            <p className="mt-2 text-sm text-zinc-400">Upload MP3 / M4A</p>
            <Input
              type="file"
              accept=".mp3,.m4a,audio/*"
              className="mt-4"
              onChange={(event) =>
                updateField("audioFile", event.target.files?.[0] ?? null)
              }
            />
            {values.audioFile ? (
              <div className="mt-3 space-y-1 text-sm">
                <p className="text-green-400">
                  Selected: {values.audioFile.name}
                </p>
                {detectedDuration !== null ? (
                  <p className="text-zinc-400">
                    Duration: {formatDuration(detectedDuration)}
                  </p>
                ) : null}
              </div>
            ) : null}
            {errors.audioFile ? (
              <p className="mt-2 text-sm text-red-400">{errors.audioFile}</p>
            ) : null}
          </div>

          <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm font-medium text-white">Cover Image</p>
            <p className="mt-2 text-sm text-zinc-400">Upload cover image</p>
            <Input
              type="file"
              accept=".jpg,.jpeg,.png,.webp,image/*"
              className="mt-4"
              onChange={(event) =>
                updateField("coverFile", event.target.files?.[0] ?? null)
              }
            />

            {coverPreviewUrl ? (
              <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
                <img
                  src={coverPreviewUrl}
                  alt="Cover preview"
                  className="aspect-square w-full object-cover"
                />
              </div>
            ) : null}

            {values.coverFile ? (
              <p className="mt-3 text-sm text-green-400">
                Selected: {values.coverFile.name}
              </p>
            ) : null}

            {errors.coverFile ? (
              <p className="mt-2 text-sm text-red-400">{errors.coverFile}</p>
            ) : null}
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
            <Toggle
              checked={values.isFeatured}
              onChange={(value) => updateField("isFeatured", value)}
            />
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div>
              <p className="font-medium text-white">Published</p>
              <p className="text-sm text-zinc-400">Visible to listeners</p>
            </div>
            <Toggle
              checked={values.isPublished}
              onChange={(value) => updateField("isPublished", value)}
            />
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
          onClick={() => {
            setValues(initialValues);
            setErrors({});
            setSuccessMessage("");
            setErrorMessage("");
            setDetectedDuration(null);
          }}
          disabled={isSubmitting}
        >
          Reset Form
        </Button>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Uploading..." : "Publish Audio"}
        </Button>
      </div>
    </form>
  );
}
