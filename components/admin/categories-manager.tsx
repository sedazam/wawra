"use client";

import { useState } from "react";
import CategoryForm from "@/components/admin/category-form";
import Card from "@/components/ui/card";

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

  return (
    <div className="space-y-6">
      <CategoryForm
        onCreated={(created) =>
          setCategories((prev) =>
            [...prev, created].sort((a, b) => a.name.localeCompare(b.name)),
          )
        }
      />

      <Card className="p-6">
        <h2 className="text-lg font-semibold text-white">
          Existing Categories
        </h2>

        <div className="mt-5 space-y-3">
          {categories.length > 0 ? (
            categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div>
                  <p className="font-medium text-white">{category.name}</p>
                  <p className="text-sm text-zinc-400">{category.slug}</p>
                  {category.description ? (
                    <p className="mt-1 text-sm text-zinc-500">
                      {category.description}
                    </p>
                  ) : null}
                </div>

                <span className="text-sm text-zinc-500">Saved</span>
              </div>
            ))
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
