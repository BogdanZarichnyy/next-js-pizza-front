import { PizzaSize, PizzaType } from "../../../constants/pizza";
import { getCartItemDetails } from "../../../lib";
import { CartStateItem } from "../../../lib/get-cart-details";
import { cn } from "../../../lib/utils";
import { CheckoutItem } from "../checkout-item";
import { CheckoutItemSkeleton } from "../checkout-item-skeleton";
import { WhiteBlock } from "../white-block";

interface Props {
  items: CartStateItem[];
  updateItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
  loading?: boolean;
  className?: string;
}

export const CheckoutCart: React.FC<Props> = ({ items, updateItemQuantity, removeCartItem, loading, className }) => {
  const onClickCountButton = (id: number, quantity: number, type: "plus" | "minus") => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  }
  
  return (
    <WhiteBlock title="1. Кошик" className={cn("", className)}>
      <div className="flex flex-col gap-5">
        {loading 
          ? [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index} />) 
          : items.length > 0 && items.map((item) => (
            <CheckoutItem
              key={item.id}
              id={item.id}
              imageUrl={item.imageUrl}
              details={getCartItemDetails(
                item.ingredients, 
                item.pizzaType as PizzaType, 
                item.pizzaSize as PizzaSize
              )}
              disabled={item.disabled}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
              onClickRemove={() => removeCartItem(item.id)}
            />
          ))
        }
      </div>
    </WhiteBlock>
  );
}