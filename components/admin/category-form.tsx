"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import { createCategory, updateCategory } from "@/lib/supabase/categories";

type CategoryRecord = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
};

type CategoryFormProps = {
  initialCategory?: CategoryRecord | null;
  onCreated?: (category: CategoryRecord) => void;
  onUpdated?: (category: CategoryRecord) => void;
  onCancelEdit?: () => void;
};

export default function CategoryForm({
  initialCategory = null,
  onCreated,
  onUpdated,
  onCancelEdit,
}: CategoryFormProps) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditMode = Boolean(initialCategory);

  useEffect(() => {
    setName(initialCategory?.name ?? "");
    setSlug(initialCategory?.slug ?? "");
    setDescription(initialCategory?.description ?? "");
    setErrorMessage("");
    setSuccessMessage("");
  }, [initialCategory]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!name.trim()) {
      setErrorMessage("Category name is required.");
      return;
    }

    try {
      setIsSubmitting(true);

      if (isEditMode && initialCategory) {
        const updated = await updateCategory({
          id: initialCategory.id,
          name,
          slug,
          description,
        });

        setSuccessMessage("Category updated successfully.");
        onUpdated?.(updated);
      } else {
        const created = await createCategory({
          name,
          slug,
          description,
        });

        setName("");
        setSlug("");
        setDescription("");
        setSuccessMessage("Category created successfully.");
        onCreated?.(created);
      }
    } catch (error: unknown) {
      console.error("Category save failed:", error);

      let message = "Category save failed.";

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
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-white">
        {isEditMode ? "Edit Category" : "Add Category"}
      </h2>

      <form className="mt-5 grid gap-4" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-sm text-zinc-300">
            Category Name
          </label>
          <Input
            placeholder="e.g. Podcasts"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-300">
            Slug (optional)
          </label>
          <Input
            placeholder="e.g. podcasts"
            value={slug}
            onChange={(event) => setSlug(event.target.value)}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-300">
            Description
          </label>
          <Textarea
            placeholder="Short category description..."
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

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

        <div className="flex gap-3">
          {isEditMode ? (
            <Button type="button" variant="secondary" onClick={onCancelEdit}>
              Cancel
            </Button>
          ) : null}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : isEditMode
                ? "Save Changes"
                : "Save Category"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
