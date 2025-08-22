import Link from "next/link";
import { cn } from "../../lib/utils";
import { Button, Sheet } from "../ui";
import { SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Props {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">

        <SheetHeader>
          <SheetTitle>
            В кошику <span className="font-bold">3 товари</span>
          </SheetTitle>
        </SheetHeader>



        <SheetFooter className="bg-white p-8">
          {/* <div className="w-full"> */}

            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                Разом
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
              </span>

              <span className="font-bold text-lg">500 ₴</span>
            </div>

            <Link href="/checkout">
              <Button
                // onClick={() => setRedirecting(true)}
                // loading={redirecting}
                type="submit"
                className="w-full h-12 text-base">
                Оформити замовлення
                <ArrowRight className="w-5 ml-2" />
              </Button>
            </Link>

          {/* </div> */}
        </SheetFooter>

      </SheetContent>
    </Sheet>
  );
}