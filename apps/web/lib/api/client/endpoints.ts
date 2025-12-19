
export const endpoints = {
  products: {
    list: '/Products' as const,
  },
  categories: new URL("/ProductCategory", process.env.API_BASE_URL).toString(),
  parent_caregories: (parentId: number) =>
    new URL(`/ProductCategory/${parentId}`, process.env.API_BASE_URL).toString(),
  details: (id: number) =>
    new URL(`/Products/${id}`, process.env.API_BASE_URL).toString(),
};
