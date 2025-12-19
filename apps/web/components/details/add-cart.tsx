import { ShoppingBag } from "lucide-react";
import { Button } from "../ui/button";

export function AddCart() {
  return (
    <Button
      className="h-8 bg-orange-700 hover:bg-orange-600 transition-all ease-in-out duration-200"
      asChild
    >
      <ShoppingBag />
      Add to Cart
    </Button>
  );
}
