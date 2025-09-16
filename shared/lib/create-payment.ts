import axios from "axios";
import crypto from "crypto";
import { FondyType } from "../../@types/fondy";

interface Props {
  orderId: number;
  description: string;
  amount: number;
}

export async function createPayment(details: Props) {
  // const merchantId = process.env.NEXT_PUBLIC_FONDY_MERCHANT_ID; // свій MERCHANT_ID
  // const secretKey = process.env.NEXT_PUBLIC_FONDY_SECRET_KEY; // свій SECRET_KEY, якого ще немає

  const merchantId = process.env.NEXT_PUBLIC_FONDY_TEST_MERCHANT_ID as string; // тестовий 1396424 працює тільки з ключем "test", інакше буде помилка
  const secretKey = process.env.NEXT_PUBLIC_FONDY_TEST_SECRET_KEY as string; // тестовий "test" для sandbox

  const responseUrl = process.env.NEXT_PUBLIC_FONDY_SERVER_REDIRECT_URL as string; // сторінка переадресації після оплати
  const responseServerUrl = process.env.NEXT_PUBLIC_FONDY_SERVER_CALLBACK_URL as string; // сторінка переадресації після оплати для сервера

  // унікальний order_id, інакше сервіс поверне помилку, йому потрібні унікальні order_id
  const uniqueOrderId = `${details.orderId}_${Date.now()}`;

  const payload: FondyType = {
    // order_id: String(details.orderId), // ⚠ рядок
    order_id: uniqueOrderId,
    merchant_id: merchantId,
    order_desc: details.description,
    currency: "UAH", // в гривнях
    amount: Math.round(details.amount * 100), // ⚠ integer - 100.00 грн (Fondy працює в копійках)
    response_url: responseUrl, // куди повернути після оплати
    server_callback_url: responseServerUrl, // для відправки POST параметрів фінальної відповіді Fondy платежу для бекенду
  };

  // 🔑 Формуємо підпис SHA1 - потрібен для уніфікації платежів сервісу Fondy, інакше платіж не пройде
  const signatureString = [
    secretKey,
    payload.amount,
    payload.currency,
    payload.merchant_id,
    payload.order_desc,
    payload.order_id,
    payload.response_url,
    payload.server_callback_url,
  ].join("|"); // 🔑 Фіксований порядок полів для redirect flow

  // SHA1 підпис
  payload.signature = crypto
    .createHash("sha1")
    .update(signatureString, "utf8") // кодування "utf8" за замовчуванням, але можна і перестрахуватися
    .digest("hex");

  // Відправка платежу
  const { data } = await axios.post(
    "https://pay.fondy.eu/api/checkout/url/",
    { request: payload },
    { headers: { "Content-Type": "application/json" } }
  );

  console.log('fondy response', data);

  if (!data?.response?.checkout_url) {
    throw new Error("Fondy не повернув checkout_url");
  }

  return data;
}