// components/product-table/product-table.tsx
"use client";

import * as React from "react";
import { Table } from "@/components/ui/table";
import { getColumns } from "./columns";
import { TableFilters } from "./table-filters";
import { ProductTableHeader } from "./table-header";
import { ProductTableBody } from "./table-body";
import { ArrowUpDown } from "lucide-react";
import { Product } from "../products/product-card";
import { useProductTable } from "@/hooks/use-products-table";

type ProductTableProps = {
  products: Product[];
};

export function ProductTable({ products }: ProductTableProps) {
  const [globalFilter, setGlobalFilter] = React.useState("");

  // Obtener columnas
  const columns = React.useMemo(() => getColumns(), []);

  // Usar hook personalizado
  const { table } = useProductTable(
    products,
    columns,
    globalFilter,
    setGlobalFilter
  );

  // Función para resetear filtros
  const resetFilters = () => {
    table.resetSorting();
    setGlobalFilter("");
  };

  // Función para obtener el nombre de la columna ordenada
  const getColumnName = (columnId: string) => {
    switch (columnId) {
      case "name":
        return "Nombre";
      case "price":
        return "Precio";
      case "description":
        return "Descripción";
      case "imageUrl":
        return "Imagen";
      default:
        return columnId;
    }
  };

  // Función para obtener el ícono de ordenamiento
  const getSortIcon = (isDesc: boolean) => {
    return (
      <ArrowUpDown
        className={`ml-1 h-3 w-3 ${isDesc ? "transform rotate-180" : ""}`}
      />
    );
  };

  return (
    <div className="space-y-6">
      {/* Encabezado con contador */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Productos</h2>
          <p className="text-muted-foreground">
            {products.length} productos disponibles
          </p>
        </div>
        {globalFilter && (
          <div className="text-sm text-muted-foreground">
            {table.getFilteredRowModel().rows.length} resultados encontrados
          </div>
        )}
      </div>

      {/* Filtros */}
      <TableFilters
        table={table}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        onResetFilters={resetFilters}
      />

      {/* Tabla */}
      <div className="rounded-lg border shadow-sm ">
        <Table className="lg:w-full min-w-4xl">
          <ProductTableHeader table={table} />
          <ProductTableBody table={table} columnsCount={columns.length} />
        </Table>
      </div>

      {/* Resumen de filtros */}
      {table.getState().sorting.length > 0 && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
          <span className="font-medium">Ordenado por:</span>
          {table.getState().sorting.map((sort) => {
            const columnName = getColumnName(sort.id);
            const direction = sort.desc ? "descendente" : "ascendente";

            return (
              <div key={sort.id} className="flex items-center gap-1">
                <span className="font-medium">{columnName}</span>
                {getSortIcon(sort.desc)}
                <span>({direction})</span>
              </div>
            );
          })}
          <span className="ml-auto text-xs">
            {table.getFilteredRowModel().rows.length} de {table.getRowCount()}{" "}
            productos
          </span>
        </div>
      )}

      {/* Info de búsqueda */}
      {globalFilter && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-medium">Búsqueda:</span>
          <span className="bg-primary/10 px-2 py-1 rounded">
            &quot;{globalFilter}&quot;
          </span>
          <span>•</span>
          <span>{table.getFilteredRowModel().rows.length} resultados</span>
        </div>
      )}
    </div>
  );
}
