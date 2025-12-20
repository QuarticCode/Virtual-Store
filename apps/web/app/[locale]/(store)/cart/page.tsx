import { CartTable } from "@/components/cart/cart-table";
import { CheckoutCard } from "@/components/cart/checkout-card";
import { CountCartAmmount } from "@/components/cart/count-cart-amount";

export default function CartPage() {
  return (
    <section className="flex xl:flex-row flex-col mt-24 justify-center">
      <div className="max-w-7xl">
        <CountCartAmmount />
        <section className="flex xl:flex-row flex-col xl:items-start items-center mt-8 gap-8">
          <CartTable />
          <CheckoutCard />
        </section>
      </div>
    </section>
  );
}
