import z from "zod";

export const passwordSchema = z.string().min(4, { message: 'Пароль повинен містити не менше 4 символів' });

// *.optional() дозволяє undefined, але не дозволяє порожній рядок ''
const passwordOptionalSchema = z
  .string()
  .transform(value => value === "" ? undefined : value)
  .optional()
  .refine(value => !value || value.length >= 4, {
    message: 'Пароль повинен містити не менше 4 символів',
  });

export const formLoginSchema = z.object({
    email: z.email('Введіть коректну пошту'),
    password: passwordSchema
  });

export const formRegisterSchema = formLoginSchema.extend({
    fullName: z.string().min(2, { message: 'Введіть ім\'я та прізвище' }),
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Паролі не збігаються',
    path: ['confirmPassword'],
  });

export const formUpdateUserSchema = formLoginSchema.extend({
    fullName: z.string().min(2, { message: 'Введіть ім\'я та прізвище' }),
    email: z.email('Введіть коректну пошту'),
    password: passwordOptionalSchema, 
    confirmPassword: passwordOptionalSchema, 
  })
  .refine((data) => {
    // якщо обидва порожні — ок
    if (!data.password && !data.confirmPassword) return true;

    // якщо один із них заповнений, обидва мають збігатися
    return data.password === data.confirmPassword;
  }, {
    message: "Паролі не збігаються",
    path: ["confirmPassword"],
  });

export type TypeFormLoginValues = z.infer<typeof formLoginSchema>;
export type TypeFormRegisterValues = z.infer<typeof formRegisterSchema>;
export type TypeFormUpdateUserValues = z.infer<typeof formUpdateUserSchema>;