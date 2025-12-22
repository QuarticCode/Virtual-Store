"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export function ClearCartButton() {
  const { clearCart } = useCart();
  const t = useTranslations("Cart.confirmClearCart");
  return (
    <Button
      variant={"outline"}
      size="sm"
      onClick={() =>
        toast.warning(t("title"), {
          description: t("description"),
          action: {
            label: t("action"),
            onClick: () => clearCart(),
          },
          position: "top-center",
        })
      }
      className="flex items-center gap-1"
    >
      {t("title")}
    </Button>
  );
}
