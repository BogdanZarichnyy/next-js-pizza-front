import { NextResponse } from "next/server";

export async function POST() {
  // Fondy сюди робить POST
  // Ми не обробляємо нічого, а просто редиректимо користувача на фронтову GET сторінку
  return NextResponse.redirect(process.env.ORDER_PAID_REDIRECT_URL as string, 302);
}