import z from "zod";

export const passwordSchema = z.string().min(4, { message: 'Пароль повинен містити не менше 4 символів' });

export const formLoginSchema = z.object({
    email: z.email('Введіть коректну пошту'),
    password: passwordSchema
  });

export const formRegisterSchema = formLoginSchema.extend({
    fullname: z.string().min(2, { message: 'Введіть ім\'я та прізвище' }),
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Паролі не збігаються',
    path: ['confirmPassword'],
  });

export type TypeFormLoginValues = z.infer<typeof formLoginSchema>;
export type TypeFormRegisterValues = z.infer<typeof formRegisterSchema>;