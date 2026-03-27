// Type definitions
export type AudioItem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  speaker: string;
  categoryId: string;
  categoryName: string;
  audioUrl: string;
  coverImageUrl: string;
  durationSeconds: number;
  isPublished: boolean;
  isFeatured: boolean;
  createdAt: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  count?: number;
};
