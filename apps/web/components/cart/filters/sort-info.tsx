"use client";

import { SortConfig } from "@/types/cart-table";
import { useTranslations } from "next-intl";

interface SortInfoProps {
  sortConfig: SortConfig;
}

export function SortInfo({ sortConfig }: SortInfoProps) {
  const t = useTranslations("CartSummary");

  if (sortConfig.key === "none") return null;

  const getSortKeyLabel = () => {
    switch (sortConfig.key) {
      case "name":
        return t("sortByName", { defaultValue: "Nombre" });
      case "price":
        return t("sortByPrice", { defaultValue: "Precio unitario" });
      case "subtotal":
        return t("sortBySubtotal", { defaultValue: "Subtotal" });
      default:
        return "";
    }
  };

  return (
    <div className="mt-4 text-sm text-muted-foreground">
      {t("sortedBy", { defaultValue: "Ordenado por" })}:{" "}
      <span className="font-medium">{getSortKeyLabel()}</span> (
      {sortConfig.direction === "asc"
        ? t("ascending", { defaultValue: "ascendente" })
        : t("descending", { defaultValue: "descendente" })}
      )
    </div>
  );
}
