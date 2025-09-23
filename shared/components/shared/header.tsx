'use client';

import { cn } from "../../lib/utils";
import { Container } from "./container";
import Image from "next/image";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { CartButton } from "./cart-button";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { ProfileButton } from "./profile-button";
import { AuthModal } from "./modal";

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string
}

export const Header: React.FC<Props> = ({ hasSearch = true, hasCart= true, className }) => {
  const router = useRouter();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    let toastMessage = '';

    if (searchParams.has("paid")) {
      toastMessage = "Замовлення успішно оплачено! Детальна інформація відправлена на пошту.";
    }

    if (searchParams.has("verified")) {
      toastMessage = "Пошта успішно підтверджена.";
    }

    if (toastMessage) {
      router.replace('/');
      toast.success(toastMessage);
    }
  }, []);

  return (
    <header className={cn('border-b', className)}>
      <Container className="flex items-center justify-between py-8">

        {/* Ліва частина хедера */}
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
              <p className="text-s text-gray-400 leading-3">Next Pizza</p>
            </div>
          </div>
        </Link>

        {/* Поле пошуку продуктів, середина хедера */}
        {hasSearch &&
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        }

        {/* Права частина хедера */}
        <div className="flex items-center gap-3">

          <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />

          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

          {hasCart && <CartButton />}

        </div>

      </Container>
    </header>
  );
}