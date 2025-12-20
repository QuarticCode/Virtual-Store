"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { CartItem } from "./cart-item";
import { useCart } from "@/hooks/use-cart";
import { useTranslations } from "next-intl";

export function CartTable() {
  const { items } = useCart();
  const t = useTranslations("CartSummary");

  if (items.length === 0) {
    return (
      <div className="lg:w-full min-w-4xl flex justify-center items-center">
        <p className="text-muted-foreground">{t("empty")}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:w-full min-w-4xl pb-12">
      <h1 className="text-2xl font-bold m-2 mb-10">{t("cart", { count: items.length })}</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-foreground">{t("items")}</TableHead>
            <TableHead></TableHead>
            <TableHead className="text-foreground">{t("quantity")}</TableHead>
            <TableHead className="text-foreground">{t("subtotal")}</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((cartItem) => (
            <CartItem key={cartItem.product.id} cartItem={cartItem} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
