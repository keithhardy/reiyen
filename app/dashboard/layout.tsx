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
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth0.getSession()

  if (!session) redirect("/auth/login")

  return (
    <>
      <Header/>
      <main className='flex-grow'>
        {children}
      </main>
      <Footer />
    </>
  );
}
