import { NextRequest, NextResponse } from "next/server";
import { PaymentCallbackDataFondyType } from "../../../../@types/fondy";
import { prisma } from "../../../../prisma/prisma-client";
import { OrderStatus } from "@prisma/client";
import { CartItemDTO } from "../../../../shared/servises/dto/cart.dto";
import { sendEmail } from "../../../../shared/lib";
import { OrderSuccessTemplate } from "../../../../shared/components/shared/email-templates/order-success-template";
import { ReactNode } from "react";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  console.log('NextRequest POST', req.headers);
  
  try {
    let body: PaymentCallbackDataFondyType | Record<string, string> | string;
    const contentType = req.headers.get('content-type') || '';

    // перевіряємо тип відповіді щоб впевнитися в правильності парсингу цих даних
    if (contentType.includes('application/json')) {
      body = (await req.json()) as PaymentCallbackDataFondyType;
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const text = await req.text();
      const form = new URLSearchParams(text);
      body = Object.fromEntries(form.entries()) as Record<string, string>;
      return NextResponse.json({ error: "Fondy: Неправильний формат відповіді" });
    } else {
      body = await req.text() as string;
      return NextResponse.json({ error: "Fondy: Неправильний формат відповіді" });
    }

    console.log("[Checkout Callback] Parsed body:", body);

    // const FONDY_SECRET_KEY = process.env.FONDY_TEST_SECRET_KEY as string; // власний ключ для sandbox
    const FONDY_SECRET_KEY = process.env.FONDY_TEST_SECRET_KEY as string; // тестовий "test" для sandbox

    // перевіряємо сигнатуру платежу, щоб впевнитися що це саме той платіж який було здійснено нашим користувачем
    // якщо цього не зробити, то можна відправити в БД фейковий платіж
    if (!body.response_signature_string || !body.signature) { // перевіряємо присутність сигнатури
      return NextResponse.json({ error: "Signature is not found" });
    } else {
      const signatureString = body.response_signature_string.replace(/\*+/g, FONDY_SECRET_KEY);
      const hash = crypto
        .createHash("sha1")
        .update(signatureString, "utf8") // кодування "utf8" за замовчуванням, але можна і перестрахуватися
        .digest("hex");
      
      console.log("Fondy check:", { hash, signature: body.signature });

      if (hash.toLowerCase() !== body.signature.toLowerCase()) {
        console.log("[Checkout Callback] Signature is wrong", { hash, signature: body.signature });
        return NextResponse.json({ error: "Signature is wrong" });
      }
    }

    const order = await prisma.order.findFirst({
      where: {
        id: parseInt(body.order_id),
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order is not found" });
    }

    const isSucceeded = body.response_status === "success" && body.order_status === 'approved';

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