'use server';

import { OrderStatus } from "@prisma/client";
import { prisma } from "../prisma/prisma-client";
import { CheckoutFormSchemaType } from "../shared/constants/checkout-form-schema";
import { cookies } from "next/headers";
import { createPayment, sendEmail } from "../shared/lib";
import { PayOrderTemplate } from "../shared/components/shared/email-templates/pay-order-template";
import { ReactNode } from "react";

export async function createOrder(data: CheckoutFormSchemaType) { // 18:05:25
  try {
    const cookiesStore = cookies();
    const cartToken = (await cookiesStore).get('cartToken')?.value;

    if (!cartToken) {
      throw new Error('Cart token not found');
    }

    // Знаходимо кошик по токену
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    // Якщо кошик не знайдений, повертаємо помилку
    if (!userCart) {
      throw new Error('Cart not found');
    }

    // Якщо кошик пустий, повертаємо помилку
    if (userCart?.totalAmount === 0) {
      throw new Error('Cart is empty');
    }

    // Створюємо замовлення в таблиці Order
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    // Очищуємо ціну за все, totalAmount, у кошику користувача Cart
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    // Видаляємо самі товари, які було додані у замовлення CartItem
    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    // Створення посилання оплати замовлення
    const paymentData = await createPayment({
      orderId: order.id,
      description: "Оплата замовлення №" + order.id,
      amount: order.totalAmount,
    });

    if (!paymentData) {
      throw new Error("Payment data not found");
    }

    // await prisma.order.update({
    //   where: {
    //     id: order.id,
    //   },
    //   data: {
    //     paymentId: paymentData.response.payment_id, // payment_id у відповіді Fondy
    //   },
    // });

    // Створюємо повідомлення на електронну пошту користувача про оплату замовлення
    await sendEmail(
      data.email, 
      "Next Pizza / Оплатіть замовлення №" + order.id, 
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl: "https://resend.com/docs/send-with-nextjs",
      }) as ReactNode,
    );


  } catch (error) {
    console.error(error);
  }
}