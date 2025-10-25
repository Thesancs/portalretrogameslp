
import type {Metadata} from 'next';
import Script from 'next/script';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/app/header';
import { SoundProvider } from '@/context/sound-context';
import AudioPlayer from '@/components/app/audio-player';

export const metadata: Metadata = {
  title: 'Portal Retro Games',
  description: 'Reviva a Era Gamer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentDate = new Date().toLocaleDateString('pt-BR');

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Press+Start+2P&display=swap" rel="stylesheet" />
        <Script
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          data-utmify-prevent-xcod-sck
          data-utmify-prevent-subids
          async
          defer
          strategy="afterInteractive"
        />
        <Script
          id="utmify-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.pixelId = "68fcf85f2e10fb7b9068b3ed";
var a = document.createElement("script");
a.setAttribute("async", "");
a.setAttribute("defer", "");
a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
document.head.appendChild(a);`,
          }}
        />
      </head>
      <body className="font-body antialiased">
        <SoundProvider>
          <div className="relative flex min-h-screen flex-col retro-stage">
            <span className="orb -top-40 -left-24 h-72 w-72" />
            <span className="orb bottom-10 right-[-40px] h-60 w-60" />
            <Header />
            <div className="relative z-10 bg-primary/90 text-primary-foreground font-pixel text-center py-2 text-[10px] sm:text-xs tracking-[0.5em] uppercase shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
              {`Aproveite agora nosso desconto exclusivo para o dia ${currentDate}`}
            </div>
            <main className="relative z-10 flex-1">{children}</main>
            <AudioPlayer />
          </div>
        </SoundProvider>
        <Toaster />
      </body>
    </html>
  );
}
