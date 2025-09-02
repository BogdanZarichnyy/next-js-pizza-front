import { useEffect } from "react";
import { useCartStore } from "../store";
import { useShallow } from 'zustand/shallow';
import { CreateCartItemValues } from "../servises/dto/cart.dto";
import { CartStateItem } from '../lib/get-cart-details';

type ReturnProps = {
  totalAmount: number;
  items: CartStateItem[];
  loading: boolean;
  updateItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
  addCartItem: (values: CreateCartItemValues) => void;
};

export const useCart = (): ReturnProps => {
  // const [totalAmount, items, loading, fetchCartItems, updateItemQuantity, removeCartItem, addCartItem] = useCartStore(useShallow(state => [
  //   state.totalAmount, 
  //   state.items,
  //   state.loading,
  //   state.fetchCartItems,
  //   state.updateItemQuantity,
  //   state.removeCartItem,
  //   state.addCartItem,
  // ]));

  const cartState = useCartStore(useShallow(state => state));

  useEffect(() => {
    cartState.fetchCartItems();
  }, []);

  return cartState;
}