import { endpoints } from "@/lib/api/client/endpoints";
import { getAuthHeaders } from "@/lib/api/client/config";
import { ProductDetails } from "./types";

export async function fetchProductDetails(id: number): Promise<ProductDetails> {
  const url = endpoints.details(id);

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

  return (await res.json()) as ProductDetails;
}
