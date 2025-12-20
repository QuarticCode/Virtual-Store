"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CounterInput } from "../shared/counter-input";
import { AddCart } from "./add-cart";
import { Share2 } from "lucide-react";
import { Button } from "../ui/button";
import { DetailsSkeleton } from "./details-skeleton";
import { ProductDetails } from "@/lib/api";
import { NotFoundProduct } from "./not-found-product";
import { Badge } from "../ui/badge";
import { BreadCrumbCategory } from "./bread-crumb-category";

type Props = {
  productId: number;
};

export default function Details({ productId }: Props) {
  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<ProductDetails>();
  const [amount, setAmount] = useState<number>(1);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch(`/api/details/${productId}`);

        if (!response.ok) {
          throw new Error("Error al cargar categorías");
        }

        const productDetailsResults = (await response.json()) as ProductDetails;

        setProduct(productDetailsResults);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        return <NotFoundProduct />;
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, [productId]);

  if (loading || !product) {
    return <DetailsSkeleton />;
  }

  return (
    <section className="container mx-auto px-4 py-8 flex flex-col gap-8 m-32">
      <BreadCrumbCategory category={product.categories} name={product.name} />
      <section className="flex lg:flex-row lg:h-lg flex-col gap-8 justify-between items-center">
        <Image
          alt="Product Image"
          width={500}
          height={500}
          src={product.imageUrl}
          className="lg:max-w-lg lg:max-h-lg lg:w-lg lg:h-lg md:max-w-md md:max-h-md w-full h-full"
        />
        <div className="flex flex-col justify-evenly lg:w-md w-full gap-8 p-4 rounded-2xl">
          <div className="flex w-full flex-wrap">
            {product.inventoryAmount > 0 ? (
              <Badge
                variant={"secondary"}
                className="bg-green-500 text-white dark:bg-green-600 hover:bg-green-600"
              >
                In Stack
              </Badge>
            ) : (
              <Badge
                variant={"destructive"}
                className="bg-red-500 text-white dark:bg-red-600 hover:bg-red-600"
              >
                Sold
              </Badge>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <h3 className="text-xl font-bold">${product.price}</h3>
            <p className="text-md font-light">{product.long_description}</p>
          </div>
          <div className="flex flex-row md:flex-nowrap flex-wrap gap-4 items-center max-h-8">
            <CounterInput amount={amount} setAmount={setAmount} />
            <AddCart />
            <Button className=" max-h-8 font-semibold">
              <Share2 />
              Share
            </Button>
          </div>
        </div>
      </section>
    </section>
  );
}
