import { create } from 'zustand';
import { Api } from '../servises/api-client';
import { getCartDetails } from '../lib';
import { CartStateItem } from '../lib/get-cart-details';
import { CreateCartItemValues } from '../servises/dto/cart.dto';

export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];

  /* Отримання всіх товарів із кошику */
  fetchCartItems: () => Promise<void>;

  /* Запит на обновлення кількості товарів */
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;

  /* Запит на додавання товару в кошик */
  addCartItem: (values: any) => Promise<void>;

  /* Запит на видалення товару із кошика */
  removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>()((set, get) => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.getCart();
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  updateItemQuantity: async (id: number, quantity: number) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.updateItemQuantity(id, quantity);
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  removeCartItem: async (id: number) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.removeCartItem(id);
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  addCartItem: async (values: CreateCartItemValues) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.addCartItem(values);
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
}));