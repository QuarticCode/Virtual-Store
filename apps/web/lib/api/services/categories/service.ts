import { endpoints } from "@/lib/api/client/endpoints";
import { getAuthHeaders } from "@/lib/api/client/config";
import { CategoryResults, RawCategory } from "./types";
import { Category } from "@/components/category/category";

function mapProduct(item: RawCategory): Category {
  return {
    id: item.id,
    name: item.name,
    enabled: item.enabled,
  };
}

export async function fetchCategories(
  parentId: number = -5
): Promise<CategoryResults> {
  const url =
    parentId != -5
      ? endpoints.parent_caregories(parentId)
      : endpoints.categories;

  const res = await fetch(url, {
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
    cache: "no-store",
    signal: AbortSignal.timeout(10000),
  });

  if (!res.ok) {
    throw new Error(`Error getting products: ${res.status}`);
  }

  const json = (await res.json()) as RawCategory[];

  const filteredCategories = json
    .filter((item) => item.name !== "Todos los productos")
    .map(mapProduct);

  return {
    categories: filteredCategories,
  };
}
