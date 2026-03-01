import { Navbar } from "@/modules/public/ui/components/landing/navbar";
import { Footer } from "@/modules/public/ui/components/landing/footer";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
