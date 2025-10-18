"use client";

import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';

const entryImages = PlaceHolderImages.filter(p => p.id.startsWith('entry-'));

export default function EntryPage() {
  return (
    <main className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen text-center">
      
        <h1 className="text-3xl md:text-4xl font-bold font-headline mb-4 text-glow">
          Se você lembra desses jogos, prepare-se...
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

        <Link href="/waiting-room" className="btn-pixel-accent !text-xl !px-8 !py-4">
          Fazer o Quiz Nostálgico
        </Link>
      
    </main>
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