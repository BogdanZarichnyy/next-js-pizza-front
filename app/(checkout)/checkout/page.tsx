'use client';

import { CheckoutSidebar, Container, Title } from "../../../shared/components/shared";
import { useCart } from "../../../shared/hooks";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckoutAddressForm, CheckoutCart, CheckoutPersonalForm } from "../../../shared/components/shared/checkout-components";
import { checkoutFormSchema, CheckoutFormSchemaType } from "../../../shared/constants/checkout-form-schema";
import { createOrder } from "../../actions";
import toast from "react-hot-toast";
import { useState } from "react";

export default function CheckoutPage() {
  const [submitting, setSubmitting] = useState(false);
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

  const onSubmitForm = async (data: CheckoutFormSchemaType) => {
    // console.log(data);
    try {
      setSubmitting(true);

      const url = await createOrder(data);  // серверні actions (POST) не повертають відповідей; 
                                            // не зважаючи на асинхронність async await у функціях,
                                            // всі викликані серверні actions виконуються по черзі, 
                                            // навіть якщо їх було викликано декілька штук одночасно
      toast.success("Замовлення створено успішно! 📝 Перехід на оплату...", { icon: '✅' });

      if (url) { // якщо url існує, то робимо на нього переадресацію
        location.href = url; // location - це глобальний об'єкт Next.js, тому і немає директиви import
      }

    } catch (error) {
      console.error(error);
      setSubmitting(false);
      toast.error("Не вдалося створити замовлення", { icon: '❌' });
    }
  }

  return (
    <Container className="mt-10">
      <Title text="Оформлення замовлення" size="xl" className="font-extrabold mb-8 text-[36px]" />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmitForm)}>

          <div className="flex gap-10">

            {/* Ліва частина */}
            <div className="flex flex-col gap-10 flex-1 mb-20">

              <CheckoutCart 
                items={items} 
                updateItemQuantity={updateItemQuantity} 
                removeCartItem={removeCartItem} 
                loading={loading} 
              />

              <CheckoutPersonalForm className={loading ? 'opacity-40 pointer-events-none' : ''} />

              <CheckoutAddressForm className={loading ? 'opacity-40 pointer-events-none' : ''} />

            </div>

            {/* Права частина */}
            <div className="w-[450px]">
              <CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting}/>
            </div>

          </div>

        </form>
      </FormProvider>

    </Container>
  );
}