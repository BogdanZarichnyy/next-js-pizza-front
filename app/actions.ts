'use server';

import { OrderStatus } from "@prisma/client";
import { prisma } from "../prisma/prisma-client";
import { CheckoutFormSchemaType } from "../shared/constants/checkout-form-schema";

export async function createOrder(data: CheckoutFormSchemaType) { // 18:05:25
  console.log(data);

  const token = '11111';

  await prisma.order.create({
    data: {
      token,
      totalAmount: 1500,
      status: OrderStatus.PENDING,
      items: [],
      fullName: data.firstName + ' ' + data.lastName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      comment: data.comment
    }
  });

  return 'https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding?utm_source=vercel&utm_medium=marketplace';
}