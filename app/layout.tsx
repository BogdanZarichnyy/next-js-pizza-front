import type { Metadata } from 'next';
import { Nunito } from "next/font/google";
import "./globals.css";
import { Providers } from "../shared/components/shared/providers";

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap'
});

export const metadata: Metadata = {
  icons: {
    icon: '/logo.png', // favicon вказується тут
  },
};

export default function MainLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="uk-UA" data-scroll-behavior="smooth">
      {/* <head>
        <link data-rh="true" rel="icon" href="/logo.png" />
      </head> */}
      <body className={nunito.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}