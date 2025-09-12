import { NextRequest, NextResponse } from "next/server";
import { PaymentCallbackDataFondyType } from "../../../../@types/fondy";
import { prisma } from "../../../../prisma/prisma-client";
import { OrderStatus } from "@prisma/client";
import { CartItemDTO } from "../../../../shared/servises/dto/cart.dto";
import { sendEmail } from "../../../../shared/lib";
import { OrderSuccessTemplate } from "../../../../shared/components/shared/email-templates/order-success-template";
import { ReactNode } from "react";

export async function POST(req: NextRequest) {
  console.log('reqPOST', req.headers);
  
  try {

    // const body = (await req.json()) as PaymentCallbackDataFondyType;
    // const body = await req.json();

    let body: any;
    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      console.log(1);
      body = await req.json();
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      console.log(2);
      const text = await req.text();
      const form = new URLSearchParams(text);
      body = Object.fromEntries(form.entries());
    } else {
      console.log(3);
      body = await req.text();
    }

    console.log("[Checkout Callback] Parsed body:", body);

    const order = await prisma.order.findFirst({
      where: {
        id: parseInt(body.order_id),
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order is not found" });
    }

    const isSucceeded = body.order_status === "success";

    await prisma.order.update({
      where: {
        id: parseInt(body.order_id),
      },
      data: {
        status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
      }
    });

    const items = JSON.parse(order?.items as string) as CartItemDTO[];

    if (isSucceeded) {
      await sendEmail(
        order.email,
        "Next Pizza / Ваше замовлення успішно оформлено 🎉",
        OrderSuccessTemplate({ orderId: order.id, items }) as ReactNode,
      );
    } else {
      console.log("[Checkout Callback] Error: Оплата замовлення не пройшла");
      // Відправити лист про неуспішну оплату - потрібно створити шаблон
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[Checkout Callback] Error", error);
    return NextResponse.json({ error: "Server error" });
  }
}