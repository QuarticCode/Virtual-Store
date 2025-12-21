"use client";

import { useCart } from "@/hooks/use-cart";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useTranslations } from "next-intl";

export function CheckoutCard() {
  const { totalPrice } = useCart();
  const t = useTranslations("Checkout");
  return (
    <Card className="sm:w-md w-full m-4">
      <CardHeader className="m-0">
        <CardTitle className="font-bold">{t("summary")}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row justify-between items-center">
        <h3>{t("subTotal")}</h3>
        <p>${totalPrice}</p>
      </CardContent>
      <CardContent className="flex flex-row justify-between items-center">
        <h3>{t("shipping")}</h3>
        <p>$15</p>
      </CardContent>
      <CardFooter className="flex flex-col justify-between items-center">
        <CardContent className="flex flex-col w-full gap-4">
          <div className="flex flex-row justify-between items-center">
            <h3>{t("total")}</h3>
            <p>${Number((totalPrice + 15).toFixed(2))}</p>
          </div>
          <Button className="flex w-full text-center">{t("checkout")}</Button>
        </CardContent>
      </CardFooter>
    </Card>
  );
}
