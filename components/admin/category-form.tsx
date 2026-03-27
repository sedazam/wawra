"use client";

import Button from "@/components/ui/button";
import Card from "@/components/ui/card";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";

export default function CategoryForm() {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-white">Add Category</h2>

      <div className="mt-5 grid gap-4">
        <div>
          <label className="mb-2 block text-sm text-zinc-300">
            Category Name
          </label>
          <Input placeholder="e.g. Podcasts" />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-300">Slug</label>
          <Input placeholder="e.g. podcasts" />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-300">
            Description
          </label>
          <Textarea placeholder="Short category description..." />
        </div>

        <div>
          <Button type="button">Save Category</Button>
        </div>
      </div>
    </Card>
  );
}
