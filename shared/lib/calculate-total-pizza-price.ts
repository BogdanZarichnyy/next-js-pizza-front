import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants/pizza";

/**
 * Функція для підрахунку загальної ціни піцци разом з вибраними інгредієнтами
 * 
 * @example ```calculateTotalPizzaPrice(1, 20, items, ingredients, selectedIngredients)```
 * 
 * @param type - тип тіста вибраної піцци
 * @param size - розмір вибраної піцци
 * @param items - список варіацій піцц
 * @param ingredients - список інгредієнтів
 * @param selectedIngredients - вибрані інгредієнти
 * 
 * @returns number - загальна ціна вибраної піцци по типу тіста та її розміру, разом з вибраними інгредієнтами
 */
export const calculateTotalPizzaPrice = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[], 
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
): number => {
  const pizzaPrice = items
    .find((item) => item.pizzaType === type && item.size === size)?.price || 0;
    
  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  return pizzaPrice + totalIngredientsPrice;
}