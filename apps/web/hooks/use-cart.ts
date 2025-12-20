import { useCartStore } from "@/lib/stores/cart.store";

export const useCart = () => {
  const store = useCartStore();

  return {
    items: store.items,
    totalItems: store.getTotalItems(),
    totalPrice: store.getTotalPrice(),
    
    addToCart: store.addItem,
    removeFromCart: store.removeItem,
    updateQuantity: store.updateQuantity,
    clearCart: store.clearCart,
    getItemQuantity: store.getItemQuantity,
    
    isCartEmpty: store.items.length === 0,
    hasProduct: (productId: string) => store.getItemQuantity(productId) > 0,
  };
};