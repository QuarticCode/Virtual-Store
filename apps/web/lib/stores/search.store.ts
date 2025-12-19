import { create } from "zustand";

interface SearchStore {
  search: string;
}

export const useSearchStore = create<SearchStore>()(() => ({ search: "" }));
