// components/product-table/columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { Product } from "../products/product-card";

export function getColumns(): ColumnDef<Product>[] {
  return [
    {
      accessorKey: "imageUrl",
      header: "Imagen",
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <Image
            src={row.getValue("imageUrl")}
            alt={row.getValue("name")}
            className="object-cover rounded-md"
            width={80}
            height={80}
          />
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full justify-start hover:bg-transparent"
        >
          Nombre
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.getValue("name")}</div>
          <div className="text-sm text-muted-foreground">
            {row.original.description}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full justify-start hover:bg-transparent"
        >
          Precio
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const price = parseFloat(row.getValue("price"));
        const formatted = new Intl.NumberFormat("es-ES", {
          style: "currency",
          currency: "EUR",
        }).format(price);

        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "description",
      header: "Descripción",
      cell: ({ row }) => (
        <div className="max-w-xs">
          <p className="text-sm line-clamp-2">{row.getValue("description")}</p>
        </div>
      ),
    },
  ];
}
