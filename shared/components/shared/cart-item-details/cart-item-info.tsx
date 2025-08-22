import { Ingredient } from "@prisma/client";
import { cn } from "../../../lib/utils";
import { mapPizzaType, PizzaSize, PizzaType } from "../../../constants/pizza";

interface Props {
  name: string;
  pizzaSize?: PizzaSize;
  type?: PizzaType;
  ingredients?: Ingredient[];
  // details: string;
  className?: string;
}

export const CartItemInfo: React.FC<Props> = ({ name, pizzaSize, type, ingredients, className }) => {
  const details = [];

  if (pizzaSize && type) {
    const typeName = mapPizzaType[type];
    details.push(`${typeName} ${pizzaSize} см`);
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient) => ingredient.name));
  }

  return (
    <div>
      <div className={cn('flex items-center justify-between', className)}>
        <h2 className="text-lg font-bold flex-1 leading-6">{name}</h2>
      </div>
      {details.length > 0 && <p className="text-xs text-gray-400 w-[90%]">{details.join(', ')}</p>}
    </div>
  );
};
