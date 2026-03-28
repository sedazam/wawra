"use client";

import { useState } from "react";
import CategoryForm from "@/components/admin/category-form";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import { deleteCategory } from "@/lib/supabase/categories";

type CategoryItem = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
};

type CategoriesManagerProps = {
  initialCategories: CategoryItem[];
};

export default function CategoriesManager({
  initialCategories,
}: CategoriesManagerProps) {
  const [categories, setCategories] = useState(initialCategories);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(
    null,
  );
  const [busyId, setBusyId] = useState<string | null>(null);

  async function handleDelete(category: CategoryItem) {
    const confirmed = window.confirm(`Delete category "${category.name}"?`);

    if (!confirmed) return;

    try {
      setBusyId(category.id);
      await deleteCategory(category.id);

      setCategories((prev) => prev.filter((item) => item.id !== category.id));

      if (editingCategory?.id === category.id) {
        setEditingCategory(null);
      }
    } catch (error) {
      console.error("Category delete failed:", error);
      alert(
        "Category delete failed. If this category is still referenced by audios, update those first.",
      );
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-6">
      <CategoryForm
        initialCategory={editingCategory}
        onCreated={(created) =>
          setCategories((prev) =>
            [...prev, created].sort((a, b) => a.name.localeCompare(b.name)),
          )
        }
        onUpdated={(updated) => {
          setCategories((prev) =>
            prev
              .map((item) => (item.id === updated.id ? updated : item))
              .sort((a, b) => a.name.localeCompare(b.name)),
          );
          setEditingCategory(null);
        }}
        onCancelEdit={() => setEditingCategory(null)}
      />

      <Card className="p-6">
        <h2 className="text-lg font-semibold text-white">
          Existing Categories
        </h2>

        <div className="mt-5 space-y-3">
          {categories.length > 0 ? (
            categories.map((category) => {
              const busy = busyId === category.id;

              return (
                <div
                  key={category.id}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-white">{category.name}</p>
                    <p className="text-sm text-zinc-400">{category.slug}</p>
                    {category.description ? (
                      <p className="mt-1 text-sm text-zinc-500">
                        {category.description}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setEditingCategory(category)}
                    >
                      Edit
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => handleDelete(category)}
                      disabled={busy}
                    >
                      {busy ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-zinc-400">
              No categories yet. Add your first one above.
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}
