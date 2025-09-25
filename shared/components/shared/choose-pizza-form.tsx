'use client';

import { cn } from "../../lib/utils";
import type { Ingredient, ProductItem } from '@prisma/client';
import { PizzaImage } from "./pizza-image";
import { Title } from "./title";
import { Button } from '../ui';
import { GroupVariants } from "./group-variants";
import { PizzaSize, PizzaType, pizzaTypes } from "../../constants/pizza";
import { IngredientItem } from "./ingredient-item";
import { getPizzaDetails } from "../../lib";
import { usePizzaOptions } from "../../hooks";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
  onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
}

// Форма вибору піцци
export const ChoosePizzaForm: React.FC<Props> = ({ 
  name,
  items,
  imageUrl,
  ingredients,
  loading,
  onSubmit,
  className,
}) => {
  const { size, type, pizzaImageUrl, currentItemId, setSize, setType, selectedIngredients, addIngredient, availablePizzaSizes } = usePizzaOptions(items);
  const { totalPrice, textDetails } = getPizzaDetails(size, type, items, ingredients, selectedIngredients);

  const handleClickAdd = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngredients));
    }
  }

  return (
    <div className={cn("flex flex-1", className)}>
      <PizzaImage imageUrl={pizzaImageUrl ?? imageUrl} size={size ?? 30} />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetails}</p>

        <div className="flex flex-col gap-4 mt-5">
          <GroupVariants items={availablePizzaSizes} value={String(size)} onClick={value => setSize(Number(value) as PizzaSize)} />
          <GroupVariants items={pizzaTypes} value={String(type)} onClick={value => setType(Number(value) as PizzaType)} />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
            {
              ingredients.map((ingredient) => (
                <IngredientItem 
                  key={ingredient.id}
                  name={ingredient.name}
                  price={ingredient.price}
                  imageUrl={ingredient.imageUrl}
                  onClick={() => addIngredient(ingredient.id)}
                  active={selectedIngredients.has(ingredient.id)}
                />
              ))
            }
          </div>
        </div>

        <Button
          loading={loading}
          onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Додати в корзину за {totalPrice} ₴
        </Button>
      </div>
    </div>
  );
}