// components/product-table/table-filters.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Search, X } from "lucide-react";
import { Table } from "@tanstack/react-table";
import { Product } from "../products/product-card";

interface TableFiltersProps {
  table: Table<Product>;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  onResetFilters: () => void;
}

export function TableFilters({
  table,
  globalFilter,
  setGlobalFilter,
  onResetFilters,
}: TableFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
      {/* Buscador */}
      <SearchInput
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />

      {/* Dropdown para ordenar */}
      <SortDropdown table={table} />

      {/* Botón para resetear filtros */}
      <ResetFiltersButton
        table={table}
        globalFilter={globalFilter}
        onResetFilters={onResetFilters}
      />
    </div>
  );
}

// Componente de búsqueda
function SearchInput({
  globalFilter,
  setGlobalFilter,
}: {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}) {
  return (
    <div className="relative w-full sm:w-auto sm:flex-1 max-w-md">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Buscar productos por nombre..."
        value={globalFilter ?? ""}
        onChange={(event) => setGlobalFilter(event.target.value)}
        className="pl-8"
      />
    </div>
  );
}

// Componente de ordenamiento
function SortDropdown({ table }: { table: Table<Product> }) {
  const sortOptions = [
    {
      label: "Nombre (A-Z)",
      onClick: () => table.getColumn("name")?.toggleSorting(false),
    },
    {
      label: "Nombre (Z-A)",
      onClick: () => table.getColumn("name")?.toggleSorting(true),
    },
    {
      label: "Precio (Menor a Mayor)",
      onClick: () => table.getColumn("price")?.toggleSorting(false),
    },
    {
      label: "Precio (Mayor a Menor)",
      onClick: () => table.getColumn("price")?.toggleSorting(true),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto">
          <ChevronDown className="mr-2 h-4 w-4" />
          Ordenar por
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {sortOptions.map((option) => (
          <DropdownMenuItem key={option.label} onClick={option.onClick}>
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Componente para resetear filtros
function ResetFiltersButton({
  table,
  globalFilter,
  onResetFilters,
}: {
  table: Table<Product>;
  globalFilter: string;
  onResetFilters: () => void;
}) {
  const hasSorting = table.getState().sorting.length > 0;
  const hasFilter = globalFilter.length > 0;

  return (
    <Button
      variant="outline"
      onClick={onResetFilters}
      disabled={!hasSorting && !hasFilter}
      className="whitespace-nowrap"
    >
      <X className="mr-2 h-4 w-4" />
      Limpiar Filtros
    </Button>
  );
}
