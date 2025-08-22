import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza";
import { calculateTotalPizzaPrice } from "./calculate-total-pizza-price";
import { Ingredient, ProductItem } from "@prisma/client";

export const getPizzaDetails = (
  size: PizzaSize,
  type: PizzaType,
  items: ProductItem[], 
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const totalPrice = calculateTotalPizzaPrice(type, size, items, ingredients, selectedIngredients);
  const textDetails =`${size} см, ${mapPizzaType[type]} піцца, інгредієнти: (${selectedIngredients.size})`;

  return { totalPrice, textDetails };
}