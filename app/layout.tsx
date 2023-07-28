import './globals.css';
import type { Metadata } from 'next';

export const runtime = process.env.NODE_ENV === 'production' ? 'edge' : 'node';

export const metadata: Metadata = {
  title: 'Desolaris',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body>{children}</body>
    </html>
  );
}
