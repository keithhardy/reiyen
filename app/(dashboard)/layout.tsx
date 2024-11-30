import type { Metadata } from 'next';

import Footer from '@/components/footer';
import Header from '@/components/header';
import { auth0 } from '@/lib/auth0';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Dashboard – Reiyen',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth0.getSession()
  const user = await prisma.user.findUnique({
    where: {
      auth0Id: session?.user.sub
    }
  })
  
  return (
    <>
      <Header user={user!} />
      <main className="container mx-auto max-w-screen-xl flex-grow space-y-4 p-6">
        {children}
      </main>
      <Footer />
    </>
  );
}
