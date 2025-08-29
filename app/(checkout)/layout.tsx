import type { Metadata } from "next";

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
      {children}
    </main>
  );
}