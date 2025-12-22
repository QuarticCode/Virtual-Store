import { useCartStore } from "@/lib/stores/cart.store";

export const useCart = () => {
  const store = useCartStore();

  return {
    items: store.items,
    getTotalAmount: store.items.reduce((accumulator, item) => {
      return accumulator + item.quantity;
    }, 0),
    totalItems: store.getTotalItems(),
    totalPrice: Number(store.getTotalPrice().toFixed(2)),

    addToCart: store.addItem,
    removeFromCart: store.removeItem,
    updateQuantity: store.updateQuantity,
    clearCart: store.clearCart,
    getItemQuantity: store.getItemQuantity,

    isCartEmpty: store.items.length === 0,
    hasProduct: (productId: string) => store.getItemQuantity(productId) > 0,
  };
};
