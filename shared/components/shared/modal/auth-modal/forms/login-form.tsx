import { FormProvider, useForm } from "react-hook-form";
import { cn } from "../../../../../lib/utils";
import { formLoginSchema, TypeFormLoginValues } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Title } from "../../../title";
import { FormInput } from "../../../form-components";
import { Button } from "../../../../ui";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

interface Props {
  onClose?: VoidFunction;
  className?: string;
}

export const LoginForm: React.FC<Props> = ({ onClose, className }) => {
  const form = useForm<TypeFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = async (data: TypeFormLoginValues) => {
    try {
      const responce = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (!responce?.ok) {
        throw Error();
      }

      toast.success('Ви успішно увійшли в аккаунт', {
        icon: '✅',
      });

      onClose?.();
    } catch (error) {
      console.error('Error [LOGIN]', error);
      toast.error('Не вдалося увійти в аккаунт', {
        icon: '❌',
      });
    }
  }

  return (
    <FormProvider {...form}>
      <form className={cn("flex flex-col gap-5", className)} onSubmit={form.handleSubmit(onSubmit)}>

        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Вхід в аккаунт" size="md" className="font-bold" />
            <p className="text-gray-400">Введіть свою пошту, щоб увійти в свій аккаунт</p>
          </div>
          <img src="/assets/images/phone-icon.png" alt="phone-icon" width={60} height={60} />
        </div>

        <FormInput name="email" label="E-Mail" required />
        <FormInput name="password" label="Пароль" type="password" required />

        <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
          Увійти
        </Button>

      </form>
    </FormProvider>
  );
}