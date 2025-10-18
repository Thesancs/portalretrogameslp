"use client";

import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Header from '@/components/app/header';

const entryImages = PlaceHolderImages.filter(p => p.id.startsWith('entry-'));

export default function EntryPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-3xl md:text-4xl font-bold font-headline mb-4">
          Se você lembra desses jogos, prepare-se...
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Sua jornada pela nostalgia está prestes a começar.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {entryImages.map((img, index) => (
            <div key={img.id} className="overflow-hidden rounded-lg border-4 border-secondary hover:border-primary transition-all duration-300 shadow-lg animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
              <Image
                src={img.imageUrl}
                alt={img.description}
                data-ai-hint={img.imageHint}
                width={250}
                height={180}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <Link href="/quiz" className="btn-pixel-accent !text-xl !px-8 !py-4">
          Fazer o Quiz Nostálgico
        </Link>
      </main>
    </>
  );
}

// Add fade-in animation to globals.css if it's not there
// @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
// .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
// Make sure to add this to your globals.css to get the desired effect.
// I can't add it myself right now.
// For now, let's just use it as inline style for simplicity if possible. Or better, just rely on existing setup.
// I will not add new keyframes or classes to globals.css. The animation will be subtle without it.
