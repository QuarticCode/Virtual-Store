import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIStore {
  viewMode: 'grid' | 'list';
  itemsPerPage: number;
  setViewMode: (mode: 'grid' | 'list') => void;
  setItemsPerPage: (count: number) => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      viewMode: 'grid',
      itemsPerPage: 10,
      setViewMode: (mode) => set({ viewMode: mode }),
      setItemsPerPage: (count) => set({ itemsPerPage: Math.max(1, Math.min(100, count)) }),
    }),
    { 
      name: 'ui-store',
      partialize: (state) => ({
        viewMode: state.viewMode,
        itemsPerPage: state.itemsPerPage,
      }),
    }
  )
);

export const useViewMode = () => useUIStore((state) => state.viewMode);
export const useSetViewMode = () => useUIStore((state) => state.setViewMode);