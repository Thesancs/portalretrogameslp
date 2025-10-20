
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/app/header';
import { SoundProvider } from '@/context/sound-context';

export const metadata: Metadata = {
  title: 'Portal Retro Games',
  description: 'Reviva a Era Gamer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Press+Start+2P&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <SoundProvider>
          <Header />
          {children}
        </SoundProvider>
        <Toaster />
      </body>
    </html>
  );
}
