export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-dvw h-dvh flex items-center justify-center">
      {children}
    </main>
  );
}
