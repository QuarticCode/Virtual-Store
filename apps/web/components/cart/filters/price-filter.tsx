"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PriceRange } from "@/types/cart-table";
import { Filter } from "lucide-react";
import { useTranslations } from "next-intl";

interface PriceFilterProps {
  value: PriceRange;
  onChange: (value: PriceRange) => void;
}

export function PriceFilter({ value, onChange }: PriceFilterProps) {
  const t = useTranslations("CartSummary");

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full sm:w-40">
        <Filter className="h-4 w-4 mr-2" />
        <SelectValue
          placeholder={t("filterPrice", {
            defaultValue: "Filtrar por precio",
          })}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">
          {t("allPrices", { defaultValue: "Todos los precios" })}
        </SelectItem>
        <SelectItem value="low">
          {t("lowPrice", { defaultValue: "Menos de $50" })}
        </SelectItem>
        <SelectItem value="medium">
          {t("mediumPrice", { defaultValue: "$50 - $100" })}
        </SelectItem>
        <SelectItem value="high">
          {t("highPrice", { defaultValue: "Más de $100" })}
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
