"use client";

import { Table, TableHead, TableHeader, TableRow } from "../ui/table";
import { useCart } from "@/hooks/use-cart";
import { useTranslations } from "next-intl";
import { CartHeader } from "./filters/cart-header";
import { FilterControls } from "./filters/filter-controls";
import { CartTableBody } from "./filters/cart-table-body";
import { SortInfo } from "./filters/sort-info";
import { useCartFilters } from "@/hooks/use-cart-filters";
import { SortButtons } from "./filters/short-buttons";

export function CartTable() {
  const { items } = useCart();
  const t = useTranslations("CartSummary");
  const { filteredItems, filters, actions } = useCartFilters(items);

  if (items.length === 0) {
    return (
      <div className="lg:w-full flex justify-center items-center">
        <p className="text-muted-foreground">{t("empty")}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col xl:w-full w-screen xl:m-0 p-8">
      <div className="flex flex-col md:flex-row md:justify-between justify-center items-start md:items-center mb-6 gap-4">
        <div className="flex flex-col">
          <CartHeader
            totalItems={items.length}
            filteredItemsCount={filteredItems.length}
          />
          <FilterControls
            searchTerm={filters.searchTerm}
            priceRange={filters.priceRange}
            sortConfig={filters.sortConfig}
            onSearchChange={actions.setSearchTerm}
            onPriceRangeChange={actions.setPriceRange}
            onClearFilters={actions.clearFilters}
          />
        </div>
        <SortButtons
          sortConfig={filters.sortConfig}
          onSort={actions.handleSort}
        />
      </div>

      <Table className="xl:w-4xl w-screen">
        <TableHeader>
          <TableRow>
            <TableHead className="text-foreground">{t("items")}</TableHead>
            <TableHead>
              <div className="flex items-center gap-1">
                {t("details", { defaultValue: "Detalles" })}
              </div>
            </TableHead>
            <TableHead className="text-foreground">{t("quantity")}</TableHead>
            <TableHead className="text-foreground">{t("subtotal")}</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <CartTableBody items={filteredItems} />
      </Table>

      <SortInfo sortConfig={filters.sortConfig} />
    </div>
  );
}
