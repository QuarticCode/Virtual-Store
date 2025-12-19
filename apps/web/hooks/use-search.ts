import { useSearchStore } from "@/lib/stores/search.store";

export function useSearch() {
  const { search } = useSearchStore();

  const setSearch = (param: string) => {
    useSearchStore.setState({ search: param }, true);
  };

  return {
    setSearch,
    search,
  };
}
