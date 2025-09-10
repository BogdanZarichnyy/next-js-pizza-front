import axios from "axios";
import crypto from "crypto";
import { FondyType } from "../../@types/fondy";

interface Props {
  orderId: number;
  description: string;
  amount: number;
}

export async function createPayment(details: Props) {
  const merchantId = process.env.NEXT_PUBLIC_FONDY_MERCHANT_ID || "1397120"; // свій 1397120
  // const merchantId = "1396424"; // тестовий 1396424
  const secretKey = process.env.NEXT_PUBLIC_FONDY_SECRET_KEY || "test"; // обов'язково "test" для sandbox
  const responseUrl = process.env.NEXT_PUBLIC_FONDY_CALLBACK_URL || "http://localhost:3000/?paid";

  const payload: FondyType = {
    order_id: String(details.orderId), // ⚠ рядок
    merchant_id: merchantId,
    // order_desc: details.description.trim(), // ⚠ без зайвих пробілів
    order_desc: details.description,
    currency: "UAH", // в гривнях
    amount: Math.round(details.amount * 100), // ⚠ integer - 100.00 грн (Fondy працює в копійках)
    response_url: responseUrl, // куди повернути після оплати
    // server_callback_url: "http://localhost:3000/api/fondy/callback", // для перевірки платежу на бекенді, в даному проекті це не потрібно
  };

  // 🔑 Формуємо підпис SHA1 - потрібен для уніфікації платежів сервісу Fondy, інакше платіж не пройде
  const signatureString = [
    secretKey,
    payload.amount,
    payload.currency,
    payload.merchant_id,
    payload.order_desc,
    payload.order_id,
    payload.response_url
  ].join("|"); // 🔑 Фіксований порядок полів для redirect flow

  // SHA1 підпис
  payload.signature = crypto
    .createHash("sha1")
    .update(signatureString)
    .digest("hex");

  // Відправка платежу
  const { data } = await axios.post(
    "https://pay.fondy.eu/api/checkout/url/",
    { request: payload },
    { headers: { "Content-Type": "application/json" } }
  );

  console.log(data);

  if (!data?.response?.checkout_url) {
    throw new Error("Fondy не повернув checkout_url");
  }

  return data;
}