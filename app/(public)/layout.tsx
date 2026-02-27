export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen items-center justify-center">
      {children}
    </main>
  );
}
