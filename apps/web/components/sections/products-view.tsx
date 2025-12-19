import ProductsInfiniteScroll from "@/components/products/products-page-content";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { fetchProductsServer } from "@/lib/api/services/products/service";

export default async function ProductsView() {
  const initialData = await fetchProductsServer({
    lastProductIndex: 0,
    itemsPerPage: 10,
  });

  return (
    <div className="container mx-auto px-8 md:px-12 lg:px-20 py-8 mt-20">
      <div className="mb-6 text-2xl font-bold">Catalog</div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-1/4">
          <AppSidebar />
        </aside>

        <main className="lg:w-3/4">
          <ProductsInfiniteScroll initialData={initialData} />
        </main>
      </div>
    </div>
  );
}
