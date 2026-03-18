import "./globals.css";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params?: Promise<{ locale?: string }>;
}>) {
  const resolvedParams = params ? await params : undefined;
  const lang = resolvedParams?.locale ?? "en";

  return (
    <html lang={lang}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
