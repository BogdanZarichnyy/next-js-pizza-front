import { ReactNode } from 'react';
import { Resend } from 'resend';

export const sendEmail = async (to: string, subject: string, template: ReactNode) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    // Якщо у поле from: "...", вписати будь-яку пошту, буде помилка і сервер поверне statusCode: 403
    from: "onboarding@resend.dev",  // У полі from: "...", Resend не дозволяє надсилати листи від імені 
                                    // gmail.com, yahoo.com, outlook.com і т.п. — бо це чужі домени, 
                                    // а не власні. Вони приймають тільки підтверджені (verified) домени.
                                    // Для тестів Resend дає адресу типу: onboarding@resend.dev
                                    // Цей email працює без верифікації домену.
    to,
    subject,
    // text: '',
    react: template,
  });

  if (error) {
    throw error;
  }

  return data;
}