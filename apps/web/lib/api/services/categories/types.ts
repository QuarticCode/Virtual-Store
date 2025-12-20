import { Category } from "@/components/category/category";

export type RawCategory = {
  id: number;
  name: string;
  parent: number;
  thumbnail: string;
  icon_name: string;
  enabled: boolean;
};

export type CategoryResults = {
  categories: Category[];
};
