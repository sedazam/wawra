import Link from "next/link";
import type { Category } from "@/types";

type CategoryCardProps = {
  category: Category;
};

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07]"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/15 text-lg text-amber-400">
        ♪
      </div>

      <h3 className="text-lg font-semibold text-white">{category.name}</h3>

      <p className="mt-2 text-sm leading-6 text-zinc-400">
        {category.description}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-zinc-500">
          {category.count ?? 0} audio items
        </p>

        <span className="text-sm text-amber-400 transition group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  );
}
