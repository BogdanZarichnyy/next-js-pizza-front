import { cn } from "../../../lib/utils";
import { WhiteBlock } from "../white-block";
import { Input, Textarea } from "../../../../shared/components/ui";
import { FormTextarea } from "../form-components";

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => { // 17:15:30
  return (
    <WhiteBlock title="3. Адреса доставки" className={cn("", className)}>
      <div className="flex flex-col gap-5">
        <Input name="address" className="text-base" placeholder="Введіть адресу..." />
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