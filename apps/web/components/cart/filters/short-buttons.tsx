"use client";

import { Button } from "@/components/ui/button";
import { SortConfig } from "@/types/cart-table";
import { ArrowUpDown } from "lucide-react";
import { useTranslations } from "next-intl";

interface SortButtonsProps {
  sortConfig: SortConfig;
  onSort: (key: "name" | "price" | "subtotal") => void;
}

export function SortButtons({ sortConfig, onSort }: SortButtonsProps) {
  const t = useTranslations("CartSummary");

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Button
        variant={sortConfig.key === "name" ? "default" : "outline"}
        size="sm"
        onClick={() => onSort("name")}
        className="flex items-center gap-1"
      >
        {t("sortByName", { defaultValue: "Nombre" })}
        {sortConfig.key === "name" && (
          <ArrowUpDown
            className={`h-3 w-3 ${sortConfig.direction === "desc" ? "rotate-180" : ""}`}
          />
        )}
      </Button>
      <Button
        variant={sortConfig.key === "price" ? "default" : "outline"}
        size="sm"
        onClick={() => onSort("price")}
        className="flex items-center gap-1"
      >
        {t("sortByPrice", { defaultValue: "Precio unitario" })}
        {sortConfig.key === "price" && (
          <ArrowUpDown
            className={`h-3 w-3 ${sortConfig.direction === "desc" ? "rotate-180" : ""}`}
          />
        )}
      </Button>
      <Button
        variant={sortConfig.key === "subtotal" ? "default" : "outline"}
        size="sm"
        onClick={() => onSort("subtotal")}
        className="flex items-center gap-1"
      >
        {t("sortBySubtotal", { defaultValue: "Subtotal" })}
        {sortConfig.key === "subtotal" && (
          <ArrowUpDown
            className={`h-3 w-3 ${sortConfig.direction === "desc" ? "rotate-180" : ""}`}
          />
        )}
      </Button>
    </div>
  );
}
