'use client';

import { cn } from "../../../lib/utils";
import { Dialog, DialogContent, DialogTitle } from "../../ui/dialog";
import { useRouter } from "next/navigation";
import type { ProductWithRalationsType } from "../../../../@types/prisma";
import { ProductForm } from "../product-form";

interface Props {
  product: ProductWithRalationsType;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  
  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent 
        aria-describedby={undefined}
        className={cn(
          "p-0 w-[1060px] !max-w-[1060px] min-h-[550px] bg-white overflow-hidden",
          className,
        )}
      >
        <DialogTitle className="sr-only">Виберіть продукт</DialogTitle>
        <ProductForm product={product} onSubmit={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
}