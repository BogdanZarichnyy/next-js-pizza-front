'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { registerUser } from '../../../../../../app/actions';
import { formRegisterSchema, TypeFormRegisterValues } from './schemas';
import { FormInput } from '../../../form-components';
import { Button } from '../../../../ui';
import { cn } from "../../../../../lib/utils";

interface Props {
  onClose: VoidFunction;
  onClickLogin?: VoidFunction;
  className?: string;
}

export const RegisterForm: React.FC<Props> = ({ onClose, onClickLogin, className }) => {
  const form = useForm<TypeFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
      confirmPassword: '',
    },
  });

    const onSubmit = async (data: TypeFormRegisterValues) => {
    try {
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.error('Реєгистрація успішна 📝. Підтвердіть свою пошту', {
        icon: '✅',
      });

      onClose?.();
    } catch (error) {
      return toast.error('Невірний E-Mail або пароль', {
        icon: '❌',
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form className={cn("flex flex-col gap-5", className)} onSubmit={form.handleSubmit(onSubmit)}>

        <FormInput name="email" label="E-Mail" required />
        <FormInput name="fullName" label="Повне ім'я" required />
        <FormInput name="password" label="Пароль" type="password" required />
        <FormInput name="confirmPassword" label="Підтвердіть пароль" type="password" required />

        <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
          Зареєструватися
        </Button>

      </form>
    </FormProvider>
  );
}