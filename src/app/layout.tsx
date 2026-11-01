import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VasuPrint',
  description: 'Custom printing and packaging solutions',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <body>{children}</body>
    </html>
  );
}
