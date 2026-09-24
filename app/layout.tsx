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
      <body>
        {children}
      </body>
    </html>
  );
}
