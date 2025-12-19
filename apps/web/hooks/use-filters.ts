import { useFilterStore } from "@/lib/stores/filter.store";
import { Category } from "@/components/category/category";

export function useFilters() {
  const { categories } = useFilterStore();

  const setFilter = (filter: Category) => {
    const updatedFilter = categories.find((c) => c === filter);

    if (!updatedFilter) {
      useFilterStore.setState({ categories: [...categories, filter] }, true);
    }
  };

  const removeFilter = (filter: Category) => {
    const updatedFilter: Category[] = categories.filter((c) => c != filter);
    useFilterStore.setState({ categories: updatedFilter }, true);
  };

  const clear = () => {
    useFilterStore.setState({ categories: [] }, true);
  };

  const getFilters = (): number[] => categories.map((c) => c.id);

  return {
    setFilter,
    removeFilter,
    clear,
    getFilters,
    categories,
  };
}
