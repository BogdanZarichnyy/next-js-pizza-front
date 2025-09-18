import { useForm } from "react-hook-form";
import { cn } from "../../../../../lib/utils";

interface Props {
  onClose: VoidFunction;
  className?: string;
}

export const RegisterForm: React.FC<Props> = ({ className }) => {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  return (
    <div className={cn("", className)}>

    </div>
  );
}