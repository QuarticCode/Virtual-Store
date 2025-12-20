// components/product-table/table-body.tsx
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { flexRender, Table } from "@tanstack/react-table";
import { Product } from "../products/product-card";
import { Search } from "lucide-react";

interface TableBodyProps {
  table: Table<Product>;
  columnsCount: number;
}

export function ProductTableBody({ table, columnsCount }: TableBodyProps) {
  return (
    <TableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            className="hover:bg-muted/50 transition-colors"
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id} className="py-4">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <EmptyRow columnsCount={columnsCount} />
      )}
    </TableBody>
  );
}

// Componente para fila vacía
function EmptyRow({ columnsCount }: { columnsCount: number }) {
  return (
    <TableRow>
      <TableCell colSpan={columnsCount} className="h-32 text-center">
        <div className="flex flex-col items-center justify-center">
          <Search className="h-12 w-12 text-muted-foreground mb-2" />
          <p className="text-lg font-medium">No se encontraron productos</p>
          <p className="text-sm text-muted-foreground">
            Intenta con otros términos de búsqueda
          </p>
        </div>
      </TableCell>
    </TableRow>
  );
}
