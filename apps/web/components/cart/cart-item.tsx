"use client";

import Image from "next/image";
import { TableCell, TableRow } from "../ui/table";
import { CounterInput } from "../shared/counter-input";
import { useCart } from "@/hooks/use-cart";
import { Product } from "../products/product-card";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";

export interface CartItem {
  product: Product;
  quantity: number;
}

export function CartItem({ cartItem }: Readonly<{ cartItem: CartItem }>) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = cartItem;

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(product.id, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  const subtotal = product.price * quantity;

  const t = useTranslations("CartItem");

  return (
    <TableRow className="h-auto hover:bg-muted/50 transition-colors">
      <TableCell className="py-8 pl-4 md:pl-6">
        <div
          className={cn(
            "relative bg-white rounded-xl overflow-hidden aspect-square",
            "w-20 sm:w-[100px] md:w-[120px]"
          )}
        >
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-contain p-2"
            sizes="(max-width: 640px) 80px, (max-width: 768px) 100px, (max-width: 1024px) 120px, 120px"
          />
        </div>
      </TableCell>

      <TableCell className="py-4 px-2 md:px-4">
        <div className="flex flex-col min-w-0 max-w-[200px] sm:max-w-[250px] md:max-w-[300px]">
          <h3
            className="font-semibold text-sm sm:text-base md:text-lg leading-tight line-clamp-2 mb-1"
            title={product.name}
          >
            {product.name}
          </h3>
          <p
            className="text-xs sm:text-sm text-muted-foreground leading-snug line-clamp-2"
            title={product.description}
          >
            {product.description}
          </p>
          <div className="mt-2">
            <span className="text-sm font-medium">
              ${product.price.toFixed(2)} {t("eachOne")}
            </span>
          </div>
        </div>
      </TableCell>

      <TableCell className="py-4 px-2 md:px-4">
        <div className="flex justify-start">
          <CounterInput
            amount={quantity}
            setAmount={handleQuantityChange}
            className="scale-90 sm:scale-100"
          />
        </div>
      </TableCell>

      <TableCell className="py-4">
        <div className="flex flex-col items-start">
          <span className="font-bold text-base sm:text-lg md:text-xl text-primary">
            ${subtotal.toFixed(2)}
          </span>
        </div>
      </TableCell>

      <TableCell className="py-4 pr-4 md:pr-6">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleRemove}
              className="p-2 hover:bg-general-button-hover transition-all duration-400 rounded-lg"
              aria-label="Eliminar producto"
              variant={"ghost"}
            >
              <div className="relative w-5 h-5 sm:w-6 sm:h-6">
                <Image
                  src="/icons/trash.svg"
                  fill
                  alt="Eliminar producto"
                  className="object-contain filter brightness-50 dark:invert"
                />
              </div>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>{t("remove")}</p>
          </TooltipContent>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
