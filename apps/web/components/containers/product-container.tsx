import { fetchProductsServer } from "@/lib/api/services/products/service";
import { FC } from "react";
import ProductsView from "../sections/products-view";

interface Props {}

export const ProductContainer: FC<Props> = async () => {
  const initialData = await fetchProductsServer({
    lastProductIndex: 0,
    itemsPerPage: 10,
  });

  return <ProductsView initialData={initialData} />;
};
