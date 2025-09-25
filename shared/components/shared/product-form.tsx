'use client';

import { ChoosePizzaForm, ChooseProductForm, Container } from ".";
import { useCartStore } from "../../store";
import { useShallow } from "zustand/shallow";
import toast from "react-hot-toast";
import { ProductWithRalationsType } from "../../../@types/prisma";

interface Props {
  product: ProductWithRalationsType;
  onSubmit?: VoidFunction;
  className?: string;
}

export const ProductForm: React.FC<Props> = ({ product, onSubmit: closeModal, className }) => {
  const [addCartItem, loading] = useCartStore(useShallow(state => [state.addCartItem, state.loading]));

  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

  const onSubmitProduct = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id;

      await addCartItem({ productItemId: itemId, ingredients });

      toast.success('Товар доданий в кошик');

      closeModal?.();
    } catch (error) {
      toast.error('Не вдалося додати товар в кошик');
      console.error(error);
    }
  }

  return (
    <Container className="flex flex-col my-10">
      <div className="p-0 w-[1060px] !max-w-[1060px] min-h-[550px] bg-white overflow-hidden">
        {
          isPizzaForm ? (
            <ChoosePizzaForm 
              imageUrl={product.imageUrl} 
              name={product.name} 
              ingredients={product.ingredients} 
              items={product.items} 
              onSubmit={onSubmitProduct}
              loading={loading}
            />
          ) : (
            <ChooseProductForm 
              imageUrl={product.imageUrl} 
              name={product.name} 
              info={product.info} 
              onSubmit={onSubmitProduct} 
              price={firstItem.price}
              loading={loading}
            />
          )
        }
      </div>
    </Container>
  );
}