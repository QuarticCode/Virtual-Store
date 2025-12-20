import { fetchProductsServer } from "@/lib/api";
import ProductsView from "../../components/sections/products-view";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const initialData = await fetchProductsServer({
    lastProductIndex: 0,
    itemsPerPage: 10,
  });

  return <ProductsView initialData={initialData} />;
}
