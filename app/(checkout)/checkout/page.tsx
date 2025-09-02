'use client';

import { CheckoutSidebar, Container, Title } from "../../../shared/components/shared";
import { useCart } from "../../../shared/hooks";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckoutAddressForm, CheckoutCart, CheckoutPersonalForm } from "../../../shared/components/shared/checkout-components";
import { checkoutFormSchema, CheckoutFormSchemaType } from "../../../shared/constants/checkout-form-schema";

export default function CheckoutPage() {
  const { totalAmount, items, loading, updateItemQuantity, removeCartItem } = useCart();

  const form = useForm<CheckoutFormSchemaType>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      comment: '',
    },
  });

  // const onSubmitForm: SubmitHandler<CheckoutFormSchemaType> = (data) => { // ✅ ❌
  const onSubmit = (data: CheckoutFormSchemaType) => {
    console.log(data);
  }

  return (
    <Container className="mt-10">
      <Title text="Оформлення замовлення" size="xl" className="font-extrabold mb-8 text-[36px]" />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>

          <div className="flex gap-10">

            {/* Ліва частина */}
            <div className="flex flex-col gap-10 flex-1 mb-20">

              <CheckoutCart items={items} updateItemQuantity={updateItemQuantity} removeCartItem={removeCartItem} />

              <CheckoutPersonalForm />

              <CheckoutAddressForm />

            </div>

            {/* Права частина */}
            <div className="w-[450px]">
              <CheckoutSidebar totalAmount={totalAmount} loading={loading} />
            </div>

          </div>

        </form>
      </FormProvider>

    </Container>
  );
}