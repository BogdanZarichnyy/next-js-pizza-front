import { z } from 'zod';

export const checkoutFormSchema = z.object({
  firstName: z.string().min(2, { message: "Ім'я повинно складатися не менше ніж з 2-х символів" }),
  lastName: z.string().min(2, { message: "Првізвище повинно складатися не менше ніж з 2-х символів" }),
  email: z.string().min(2, { message: "Введіть коректну пошту" }),
  phone: z.string().min(10, { message: "Введіть коректний номер телефону" }),
  address: z.string().min(2, { message: "Введіть коректну адресу" }),
  comment: z.string().optional(),
});

export type CheckoutFormSchemaType = z.infer<typeof checkoutFormSchema>