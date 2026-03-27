"use client";

import { useMemo, useState } from "react";
import type { AudioItem } from "@/types";

export type SortOption = "newest" | "oldest" | "title";

export function useAudioFilters(audios: AudioItem[]) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sort, setSort] = useState<SortOption>("newest");

  const filteredAudios = useMemo(() => {
    let result = [...audios];

    const trimmedSearch = search.trim().toLowerCase();

    if (trimmedSearch) {
      result = result.filter((audio) => {
        return (
          audio.title.toLowerCase().includes(trimmedSearch) ||
          audio.speaker.toLowerCase().includes(trimmedSearch) ||
          audio.description.toLowerCase().includes(trimmedSearch)
        );
      });
    }

    if (activeCategory !== "All") {
      result = result.filter((audio) => audio.categoryName === activeCategory);
    }

    if (sort === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    }

    if (sort === "oldest") {
      result.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    }

    if (sort === "title") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [audios, search, activeCategory, sort]);

  return {
    search,
    setSearch,
    activeCategory,
    setActiveCategory,
    sort,
    setSort,
    filteredAudios,
  };
}
