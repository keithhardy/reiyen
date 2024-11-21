import type { Metadata } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Reiyen | Dashboard",
  description: "Forms based of the BS7671 model forms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className='flex-grow'>
        {children}
      </main>
      <Footer />
    </>
  );
}
