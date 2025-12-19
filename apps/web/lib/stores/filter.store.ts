import { Category } from "@/components/category/category";
import { create } from "zustand";

interface FilterStore {
  categories: Category[];
}

export const useFilterStore = create<FilterStore>()(() => ({ categories: [] }));
