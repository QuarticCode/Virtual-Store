export interface SortConfig {
  key: "name" | "price" | "subtotal" | "none";
  direction: "asc" | "desc";
}

export type PriceRange = "all" | "low" | "medium" | "high";

export interface CartTableFilters {
  searchTerm: string;
  priceRange: PriceRange;
  sortConfig: SortConfig;
}

export interface FilterActions {
  setSearchTerm: (term: string) => void;
  setPriceRange: (range: PriceRange) => void;
  setSortConfig: (config: SortConfig) => void;
  clearFilters: () => void;
}
