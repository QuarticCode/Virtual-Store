import Image from "next/image";
import { Button } from "../ui/button";

export function AddCart() {
  return (
    <Button
      className="h-8 bg-orange-600 hover:bg-orange-700 
      transition-all ease-in-out duration-200"
    >
      <div className="flex items-center gap-2">
        <Image 
          src="/icons/cart.svg" 
          alt="cart" 
          width={18}
          height={18}
          className="filter brightness-0 invert" 
        />
        <span>Add to Cart</span>
      </div>
    </Button>
  );
}