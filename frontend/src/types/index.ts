export type Project = {
  id: number;
  title: string;
  description?: string | null;
  category?: string | null;
  author?: string | null;
  imageUrl?: string | null;
  createdAt: string;
  updatedAt: string;
  savedAt?: string;
};
