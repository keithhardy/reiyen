import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import Footer from '@/components/footer';
import Header from '@/components/header';
import { auth0 } from '@/lib/auth0';

export const metadata: Metadata = {
  title: 'Dashboard – Reiyen',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth0.getSession();
  if (!session) redirect('/auth/login');

  return (
    <>
      <Header />
      <main className='container mx-auto max-w-screen-xl flex-grow space-y-4 p-6'>
        {children}
      </main>
      <Footer />
    </>
  );
}
