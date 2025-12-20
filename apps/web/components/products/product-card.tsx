"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { CartButton } from "@/components/products/add-to-cart-button";
import { generateSlug } from "@/lib/utils/slugify";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
  className?: string;
}

export function ProductCard({
  product,
  viewMode = "grid",
  className,
}: Readonly<ProductCardProps>) {
  return (
    <Link
      href={`/products/${generateSlug(product.name)}/${product.id}`}
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded-xl"
    >
      <Card
        className={cn(
          "group relative overflow-hidden border-none p-1 cursor-pointer bg-product-card",
          "w-full shadow-none hover:bg-product-card-hover",
          "hover:scale-105 duration-500",
          viewMode === "grid"
            ? "flex flex-col max-w-[280px] mx-auto h-full"
            : "flex flex-row items-stretch min-h-[100px] sm:min-h-[120px] md:min-h-[140px]",
          className
        )}
        role="article"
      >
        <div
          className={cn(
            "relative shrink-0 bg-white rounded-xl overflow-hidden",
            viewMode === "grid"
              ? "aspect-square w-full max-h-[280px]"
              : "h-full aspect-square w-[100px] sm:w-[120px] md:w-[140px] lg:w-40"
          )}
        >
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className={cn("object-contain rounded-xl")}
            sizes={
              viewMode === "grid"
                ? "(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 280px"
                : "(max-width: 640px) 100px, (max-width: 768px) 120px, (max-width: 1024px) 140px, 160px"
            }
            loading="eager"
          />

          {viewMode === "grid" && (
            <div
              className="absolute bottom-4 right-4"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <CartButton size="md" />
            </div>
          )}
        </div>

        <CardContent
          className={cn(
            "flex flex-col h-full w-full min-w-0 p-0 relative",
            viewMode === "grid"
              ? "px-1 py-3 space-y-3 flex-1"
              : "px-2 pb-2 sm:px-3 md:px-4 lg:px-5 grow min-h-[100px] sm:min-h-[120px] md:min-h-[140px] lg:min-h-40"
          )}
        >
          <h3
            className={cn(
              "font-semibold text-primary",
              viewMode === "grid"
                ? "text-lg line-clamp-2 mt-2 mb-1 min-h-12"
                : "text-sm sm:text-base md:text-lg lg:text-xl line-clamp-1 mb-1 sm:mb-2 md:mb-3"
            )}
          >
            {product.name}
          </h3>

          {viewMode === "list" && (
            <div className="grow min-h-0 overflow-hidden mb-0 sm:mb-3 md:mb-4">
              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          <div className={cn("mt-auto", viewMode === "list" && "w-full")}>
            {viewMode === "grid" ? (
              <span className="font-bold text-foreground text-xl tracking-tight">
                ${product.price.toFixed(2)}
              </span>
            ) : (
              <div className="flex items-center justify-between w-full">
                <span className="font-bold text-foreground text-base sm:text-lg md:text-xl lg:text-2xl tracking-tight">
                  ${product.price.toFixed(2)}
                </span>
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <CartButton
                    size="sm"
                    className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9"
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
