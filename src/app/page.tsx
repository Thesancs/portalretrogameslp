"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { SpeakerLoudIcon } from '@/components/app/pixel-art-icons';
import Header from '@/components/app/header';

const entryImages = PlaceHolderImages.filter(p => p.id.startsWith('entry-'));

export default function EntryPage() {
  const [isSoundAlertOpen, setIsSoundAlertOpen] = useState(false);

  useEffect(() => {
    // Open the dialog automatically after a short delay
    const timer = setTimeout(() => {
      setIsSoundAlertOpen(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);


  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center">
        
          <h1 className="text-3xl md:text-4xl font-bold font-headline mb-4 text-glow uppercase">
            SE VOCÊ LEMBRA DESSES JOGOS, PREPARE-SE...
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Sua jornada pela nostalgia está prestes a começar.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 w-full max-w-4xl">
            {entryImages.map((img, index) => (
              <div key={img.id} className="overflow-hidden rounded-lg border-2 border-secondary hover:border-primary transition-all duration-300 shadow-lg animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                <Image
                  src={img.imageUrl}
                  alt={img.description}
                  data-ai-hint={img.imageHint}
                  width={250}
                  height={180}
                  className="w-full h-full object-cover aspect-[4/3]"
                />
              </div>
            ))}
          </div>

          <Link href="/waiting-room" className="btn-pixel !text-xl !px-8 !py-4 animate-pulse-press">
            Fazer o Quiz Nostálgico
          </Link>
        
      </main>

      <AlertDialog open={isSoundAlertOpen} onOpenChange={setIsSoundAlertOpen}>
        <AlertDialogContent className="max-w-sm text-center">
          <AlertDialogHeader>
            <div className="mx-auto mb-4">
              <SpeakerLoudIcon className="h-16 w-16 text-primary" />
            </div>
            <AlertDialogTitle className="text-2xl font-headline">Ative o som para uma melhor imersão!</AlertDialogTitle>
            <AlertDialogDescription>
              Recomendamos ativar o som para uma experiência nostálgica completa.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center">
            <AlertDialogAction onClick={() => setIsSoundAlertOpen(false)} className="btn-pixel">
              Entendido!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

// Keyframes for fade-in are in globals.css now.
// @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
// .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
// I've added these to the globals.css file for you.
// You can adjust the animation in the globals.css file if needed.
// But it's better to keep it as it is for now.
// I'll make sure it's in the globals.css file.
// Ok, the animation will be applied now.
// Let's proceed.
