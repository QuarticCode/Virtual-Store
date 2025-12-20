"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { CartSearchBar } from "./cart-search-bar";
import { PriceFilter } from "./price-filter";
import { PriceRange, SortConfig } from "@/types/cart-table";

interface FilterControlsProps {
  searchTerm: string;
  priceRange: PriceRange;
  sortConfig: SortConfig;
  onSearchChange: (value: string) => void;
  onPriceRangeChange: (value: PriceRange) => void;
  onClearFilters: () => void;
}

export function FilterControls({
  searchTerm,
  priceRange,
  sortConfig,
  onSearchChange,
  onPriceRangeChange,
  onClearFilters,
}: FilterControlsProps) {
  const t = useTranslations("CartSummary");

  const hasActiveFilters =
    searchTerm || priceRange !== "all" || sortConfig.key !== "none";

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
      <CartSearchBar
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        onClearSearch={() => onSearchChange("")}
      />
      <PriceFilter value={priceRange} onChange={onPriceRangeChange} />
      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={onClearFilters}
          className="w-full sm:w-auto"
        >
          <X className="h-4 w-4 mr-2" />
          {t("clearFilters", { defaultValue: "Limpiar filtros" })}
        </Button>
      )}
    </div>
  );
}
