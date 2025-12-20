import { Category } from "@/components/category/category";

export type RawCategory = {
  id: number;
  name: string;
  parent: number;
  imageUrl: string;
  icon_name: string;
  enabled: boolean;
};

export type CategoryResults = {
  categories: Category[];
};
