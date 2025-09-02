import type { Metadata } from "next";
import { Header } from "../../shared/components/shared";

export const metadata: Metadata = {
  title: 'Next Pizza | Кошик',
};

export default function CheckuotLayout({ 
  children 
}: Readonly<{ 
  children: React.ReactNode 
}>) {
  return (
    <main className="min-h-screen bg-[#F4F1EE]">
      <Header className="border-b-gray-200" hasSearch={false} hasCart={false} />
      {children}
    </main>
  );
}