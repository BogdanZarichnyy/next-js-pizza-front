'use client';

import Link from "next/link";
import { cn } from "../../lib/utils";
import { Button, Sheet } from "../ui";
import { SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "../../lib";
import { useCartStore } from "../../store";
import { useEffect } from "react";
import { PizzaSize, PizzaType } from "../../constants/pizza";
import { useShallow } from 'zustand/shallow';

interface Props {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
  const [totalAmount, items, fetchCartItems, updateItemQuantity, removeCartItem] = useCartStore(useShallow(state => [
    state.totalAmount, 
    state.items,
    state.fetchCartItems,
    state.updateItemQuantity,
    state.removeCartItem,
  ]));

  useEffect(() => {
    fetchCartItems();
  }, []);

  const onClickCountButton = (id: number, quantity: number, type: "plus" | "minus") => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">

        <SheetHeader>
          <SheetTitle>
            В кошику <span className="font-bold">{items.length} товари</span>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-5 overflow-auto flex-1">
          {
            items.map((item) => (
              <div className="mb-2" key={item.id}>
                <CartDrawerItem 
                  id={item.id}
                  imageUrl={item.imageUrl}
                  details={
                    item.pizzaType && item.pizzaSize 
                      ? getCartItemDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize) 
                      : ''
                  }
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                  onClickRemove={() => removeCartItem(item.id)}
                />
              </div>
            ))
          }
        </div>

        <SheetFooter className="bg-white p-8">
          {/* <div className="w-full"> */}

            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                Разом
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
              </span>

              <span className="font-bold text-lg">{totalAmount} ₴</span>
            </div>

            <Link href="/checkout">
              <Button
                // onClick={() => setRedirecting(true)}
                // loading={redirecting}
                type="submit"
                className="w-full h-12 text-base">
                Оформити замовлення
                <ArrowRight className="w-5 ml-2" />
              </Button>
            </Link>

          {/* </div> */}
        </SheetFooter>

      </SheetContent>
    </Sheet>
  );
}