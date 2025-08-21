import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Next Pizza | DASHBOARD',
};

export default function DashboardLayout({ 
  children 
}: Readonly<{ 
  children: React.ReactNode 
}>) {
  return (
    <main className="min-h-screen">
      DASHBOARD HEADER
      {children}
    </main>
  );
}