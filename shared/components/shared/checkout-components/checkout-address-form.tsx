'use client';

import { cn } from "../../../lib/utils";
import { WhiteBlock } from "../white-block";
import { FormTextarea } from "../form-components";
import { AddressInput } from "../address-input";
import { Controller, useFormContext } from "react-hook-form";
import { ErrorText } from "../error-text";

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  const { control } = useFormContext();

  return (
    <WhiteBlock title="3. Адреса доставки" className={cn("", className)}>
      <div className="flex flex-col gap-5">

        <Controller 
          control={control}
          name="address"
          render={({ field, fieldState }) => (
            <>
              <AddressInput onPlaceSelect={field.onChange} />
              {fieldState.error && <ErrorText text={fieldState.error.message} />}
            </>
          )}
        />        

        <FormTextarea 
          name="comment"
          className="text-base"
          placeholder="Коментарій до замовлення"
          rows={5}
        />
      </div>
    </WhiteBlock>
  );
}