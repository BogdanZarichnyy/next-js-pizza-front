'use client';

import { User } from "@prisma/client";
import { cn } from "../../lib/utils";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formUpdateUserSchema, TypeFormUpdateUserValues } from "./modal/auth-modal/forms/schemas";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { Container } from "./container";
import { Title } from "./title";
import { FormInput } from "./form-components";
import { Button } from "../ui";
import { updateUserInfo } from "../../../app/actions";

interface Props {
  data: User;
  className?: string;
}

export const ProfileForm: React.FC<Props> = ({ data, className }) => {
  const form = useForm({
    resolver: zodResolver(formUpdateUserSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: '',
      confirmPassword: '',
    },
  });

    const onSubmit = async (data: TypeFormUpdateUserValues) => {
    try {
      await updateUserInfo({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.error('Дані обновлені 📝', {
        icon: '✅',
      });
    } catch (error) {
      return toast.error('Помилка при обновлені даних', {
        icon: '❌',
      });
    }
  };

  const onClickSignOut = () => {
    signOut({
      callbackUrl: '/',
    });
  };

  return (
    <Container className={cn("my-10", className)}>

      <Title text={`Особисті дані | №${data.id}`} size="md" className="font-bold" />

      <FormProvider {...form}>
        <form className="flex flex-col gap-5 w-96 mt-10" onSubmit={form.handleSubmit(onSubmit)}>

          <FormInput name="email" label="E-Mail" required />
          <FormInput name="fullName" label="Повне ім'я" required />

          <FormInput type="password" name="password" label="Новий пароль" />
          <FormInput type="password" name="confirmPassword" label="Повторіть пароль" />

          <Button disabled={form.formState.isSubmitting} className="text-base mt-10" type="submit">
            Зберегти
          </Button>

          <Button
            onClick={onClickSignOut}
            variant="secondary"
            disabled={form.formState.isSubmitting}
            className="text-base"
            type="button"
          >
            Вийти
          </Button>

        </form>
      </FormProvider>

    </Container>
  );
}