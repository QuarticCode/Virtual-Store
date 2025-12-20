"use client";

import { Link } from "@/i18n/navigation";
import { Button } from "../ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useTranslations } from "next-intl";

export function ShoppingCartButton() {
  const pathname = usePathname();
  const isActive = pathname.endsWith("/cart");
  const t = useTranslations("Cart");

  return (
    <Link href="/cart" className="flex items-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={"ghost"}
            size={"icon"}
            className={isActive ? "bg-accent" : ""}
          >
            <Image
              src="/icons/cart.svg"
              alt="Shopping Cart"
              width={18}
              height={18}
              className="filter brightness-0 dark:invert"
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t("title")}</p>
        </TooltipContent>
      </Tooltip>
    </Link>
  );
}
