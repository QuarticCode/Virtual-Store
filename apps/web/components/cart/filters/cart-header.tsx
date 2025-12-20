"use client";

import { useTranslations } from "next-intl";

interface CartHeaderProps {
  totalItems: number;
  filteredItemsCount: number;
}

export function CartHeader({
  totalItems,
  filteredItemsCount,
}: CartHeaderProps) {
  const t = useTranslations("CartSummary");

  return (
    <h1 className="text-2xl font-bold m-2">
      {t("cart", { count: totalItems })}
      <span className="text-sm font-normal text-muted-foreground ml-2">
        ({filteredItemsCount} {t("filtered", { defaultValue: "filtrados" })})
      </span>
    </h1>
  );
}
