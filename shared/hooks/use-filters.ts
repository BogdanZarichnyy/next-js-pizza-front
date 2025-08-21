import { useSearchParams } from "next/navigation";
import { useSet } from 'react-use';
import { useState } from "react";

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFiltersProps extends PriceProps {
  pizzaTypes: string;
  sizes:string;
  ingredients: string;
}

export interface FiltersProps {
  sizes: Set<string>;
  pizzaTypes: Set<string>; 
  selectedIngredients: Set<string>; 
  prices: PriceProps; 
}

interface ReturnProps extends FiltersProps {
  setPrices: (name: keyof PriceProps, value: number) => void; 
  setPizzaTypes: (value: string) => void;
  setSizes: (value: string) => void;
  setSelectedIngredients: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<keyof QueryFiltersProps, string>;

  // Фільтр інгредієнтів
  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get('ingredients')?.split(','))
  );

  // Фільтр розмірів піцци - 20 см, 30 см, 40 см
  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : [])
  );

  // Фільтр типу піцци - тонке тісто чи класичне
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(searchParams.has('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : [])
  );

  // Фільтр цін
  const [prices, setPrices] = useState<PriceProps>({ 
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  });

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  return { 
    selectedIngredients, 
    sizes, 
    pizzaTypes, 
    prices, 
    setPrices: updatePrice, 
    setPizzaTypes: togglePizzaTypes,
    setSizes: toggleSizes,
    setSelectedIngredients: toggleIngredients
  };
}