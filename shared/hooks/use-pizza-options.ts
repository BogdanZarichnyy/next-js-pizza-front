import { useEffect, useState } from "react";
import { Variant } from "../components/shared/group-variants";
import { PizzaSize, PizzaType } from "../constants/pizza";
import { useSet } from "react-use";
import { getAvailablePizzaSizes } from "../lib";
import { ProductItem } from "@prisma/client";

interface ReturnProps {
  size: PizzaSize,
  type: PizzaType,
  // setSize: Dispatch<SetStateAction<PizzaSize>>,
  setSize: (size: PizzaSize) => void,
  // setType: Dispatch<SetStateAction<PizzaType>>,
  setType: (type: PizzaType) => void,
  selectedIngredients: Set<number>,
  addIngredient: (id: number) => void,
  availablePizzaSizes: Variant[]
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);
  const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));

  const availablePizzaSizes = getAvailablePizzaSizes(type, items);

  useEffect(() => {
    const isAvailableSize = availablePizzaSizes?.find((item) => Number(item.value) === size && !item.disabled);
    const availableSize = availablePizzaSizes?.find((item) => !item.disabled);

    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [type]);

  return { size, type, setSize, setType, selectedIngredients, addIngredient, availablePizzaSizes };
}