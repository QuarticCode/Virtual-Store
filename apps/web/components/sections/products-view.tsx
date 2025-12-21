import ProductsInfiniteScroll from "@/components/products/products-page-content";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { ProductsResult } from "@/lib/api";
import { SearchInput } from "../search-input/search-input";

interface Props {
  initialData: ProductsResult;
}

export default async function ProductsView({ initialData }: Props) {
  return (
    <div className="container mx-auto px-8 md:px-12 lg:px-20 py-8 mt-20">
      <div className="flex flex-row justify-between">
        <div className="mb-6 text-2xl font-bold">Catalog</div>
        <SearchInput />
      </div>

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
