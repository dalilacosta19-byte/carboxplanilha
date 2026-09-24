import './globals.css';

export const metadata = {
  title: 'CARBOX77',
  description: 'Sistema de Gestão CARBOX',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className="bg-slate-950 text-slate-100 min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
