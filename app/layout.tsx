import './globals.css';
import type { Metadata } from 'next';
import { Lexend_Deca, Libre_Caslon_Text, Playfair_Display } from 'next/font/google';

const lexendDeca = Lexend_Deca({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-lexend-deca',
});

const libreCaslon = Libre_Caslon_Text({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-libre-caslon',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'SPACEZ - Offers',
  description: 'Exclusive offers and deals on SPACEZ',
  openGraph: {
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${lexendDeca.variable} ${libreCaslon.variable} ${playfair.variable} font-sans`}>{children}</body>
    </html>
  );
}
