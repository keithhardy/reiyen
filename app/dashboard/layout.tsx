import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth0 } from "@/lib/auth0"

import Header from "@/components/header";
import Footer from "@/components/footer";


export const metadata: Metadata = {
  title: "Reiyen | Dashboard",
  description: "Forms based of the BS7671 model forms.",
};

export default async function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const session = await auth0.getSession()
  if (!session) redirect("/auth/login")

  return (
    <>
      <Header/>
      <main className='container mx-auto max-w-screen-xl flex-grow space-y-4 p-4'>
        {children}
      </main>
      <Footer />
      
      {modal}
    </>
  );
}
