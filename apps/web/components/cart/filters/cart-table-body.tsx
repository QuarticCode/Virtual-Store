"use client";

import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { CartItem } from "../cart-item";
import { useTranslations } from "next-intl";

interface CartTableBodyProps {
  items: CartItem[];
}

export function CartTableBody({ items }: CartTableBodyProps) {
  const t = useTranslations("CartSummary");

  if (items.length === 0) {
    return (
      <TableBody className="lg:w-full w-screen">
        <TableRow>
          <TableCell
            colSpan={5}
            className="text-center py-8 text-muted-foreground"
          >
            {t("noResults", {
              defaultValue:
                "No se encontraron productos con los filtros aplicados",
            })}
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {items.map((cartItem) => (
        <CartItem key={cartItem.product.id} cartItem={cartItem} />
      ))}
    </TableBody>
  );
}
