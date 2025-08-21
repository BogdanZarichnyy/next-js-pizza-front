'use client';

import { cn } from "../../lib/utils";
import { Ingredient, ProductItem } from '@prisma/client';
import { PizzaImage } from "./pizza-image";
import { Title } from "./title";
import { Button } from '../ui';
import { GroupVariants } from "./group-variants";
import { PizzaSize, pizzaSizes, PizzaType, pizzaTypes } from "../../constants/pizza";
import { useState } from "react";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  // items?: ProductItem[];
  items?: any[];
  loading?: boolean;
  // onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({ 
  name,
  items,
  imageUrl,
  ingredients,
  loading,
  // onSubmit,
  className,
}) => {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);
  const textDetails ="textDetails";
  const totalPrice ="350";

  return (
    <div className={cn("flex flex-1", className)}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetails}</p>

        <div className="flex flex-col gap-4 mt-5">
          <GroupVariants items={pizzaSizes} value={String(size)} onClick={value => setSize(Number(value) as PizzaSize)} />
          <GroupVariants items={pizzaTypes} value={String(type)} onClick={value => setType(Number(value) as PizzaType)} />
        </div>

        <div className="grid grid-cols-3 gap-3">
          {
            // 9:21:45
          }
        </div>

        <Button
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Додати в корзину за {totalPrice} ₴
        </Button>
      </div>
    </div>
  );
}