import type { Metadata } from 'next';

import Footer from '@/components/footer';
import Header from '@/components/header';

export const metadata: Metadata = {
  title: 'Dashboard – Reiyen',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="container mx-auto max-w-screen-xl flex-grow space-y-4 p-6">
        {children}
      </main>
      <Footer />
    </>
  );
}
