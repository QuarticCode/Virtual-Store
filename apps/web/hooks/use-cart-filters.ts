import { useState, useMemo } from "react";
import { CartTableFilters, PriceRange, SortConfig } from "@/types/cart-table";
import { CartItem } from "@/components/cart/cart-item";
import { removeAccents } from "@/lib/utils/remove-accents";

export function useCartFilters(items: CartItem[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState<PriceRange>("all");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "none",
    direction: "asc",
  });

  const filteredItems = useMemo(() => {
    let result = items;

    // Aplicar filtro de búsqueda
    if (searchTerm) {
      result = result.filter(
        (item) =>
          removeAccents(item.product.name.toLowerCase()).includes(
            removeAccents(searchTerm.toLowerCase())
          ) ||
          removeAccents(item.product.description?.toLowerCase()).includes(
            removeAccents(searchTerm.toLowerCase())
          )
      );
    }

    // Aplicar filtro de precio
    if (priceRange !== "all") {
      result = result.filter((item) => {
        const price = item.product.price;
        switch (priceRange) {
          case "low":
            return price < 50;
          case "medium":
            return price >= 50 && price <= 100;
          case "high":
            return price > 100;
          default:
            return true;
        }
      });
    }

    // Aplicar ordenamiento
    if (sortConfig.key !== "none") {
      result = [...result].sort((a, b) => {
        let aValue: string | number;
        let bValue: string | number;

        switch (sortConfig.key) {
          case "name":
            aValue = a.product.name.toLowerCase();
            bValue = b.product.name.toLowerCase();
            break;
          case "price":
            aValue = a.product.price;
            bValue = b.product.price;
            break;
          case "subtotal":
            aValue = a.product.price * a.quantity;
            bValue = b.product.price * b.quantity;
            break;
          default:
            return 0;
        }

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [items, searchTerm, priceRange, sortConfig]);

  const handleSort = (key: "name" | "price" | "subtotal") => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const clearFilters = () => {
    setSearchTerm("");
    setPriceRange("all");
    setSortConfig({ key: "none", direction: "asc" });
  };

  const filters: CartTableFilters = {
    searchTerm,
    priceRange,
    sortConfig,
  };

  const actions = {
    setSearchTerm,
    setPriceRange,
    setSortConfig,
    clearFilters,
    handleSort,
  };

  return {
    filteredItems,
    filters,
    actions,
    getTotalFilteredItems: filteredItems.reduce((accumulator, item) => {
      return accumulator + item.quantity;
    }, 0),
  };
}
