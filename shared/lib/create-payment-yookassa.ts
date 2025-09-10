import { PaymentDataYookassa } from '../../@types/yookassa';
import axios from 'axios';

interface Props {
  description: string;
  orderId: number;
  amount: number;
}

export async function createPaymentYookassa(details: Props) {
  const { data } = await axios.post<PaymentDataYookassa>(
    'https://api.yookassa.ru/v3/payments',
    {
      amount: {
        value: details.amount.toString(),
        currency: 'RUB',
      },
      capture: true,
      description: details.description,
      metadata: {
        order_id: details.orderId,
      },
      confirmation: {
        type: 'redirect',
        return_url: process.env.NEXT_PUBLIC_YOOKASSA_CALLBACK_URL,
      },
    },
    {
      auth: {
        username: process.env.NEXT_PUBLIC_YOOKASSA_STORE_ID as string,
        password: process.env.NEXT_PUBLIC_YOOKASSA_API_KEY as string,
      },
      headers: {
        'Content-Type': 'application/json',
        'Idempotence-Key': Math.random().toString(36).substring(7),
      },
    },
  );

  return data;
}