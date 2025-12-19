import { Category } from "@/components/category/category";

export type ProductDetails = {
  images: string[];
  isFromFutureInventory: boolean;
  id: number;
  reference: string;
  name: string;
  short_description: string;
  long_description: string;
  price: number;
  discount_price: number;
  deliveryPrice: number;
  inventoryAmount: number;
  orderPriority: number;
  thumbnail: string;
  primaryTag: string;
  secondaryTag: string;
  tertiaryTag: string;
  productsGroupId: 0;
  productProviderId: 0;
  metadata: string;
  categories: Category[];
};
