
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Trophy, Star } from 'lucide-react';
import { Suspense, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const testimonialImages = [
  {
    src: '/image/depoimentos/depoimento4games.png',
    alt: 'Depoimento 1',
  },
  {
    src: '/image/depoimentos/depoimento 5 games.png',
    alt: 'Depoimento 2',
  },
  {
    src: '/image/depoimentos/depoimento3games.png',
    alt: 'Depoimento 3',
  },
];


function ResultsContent() {
  const searchParams = useSearchParams();
  const score = searchParams.get('score');
  const autoplayPlugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true }));

  return (
    <div className="container mx-auto px-4 py-8 flex-grow flex flex-col items-center min-h-[calc(100vh-128px)]">
      <div className="text-center w-full max-w-3xl mx-auto space-y-8">
        <div className="relative inline-block">
            <CheckCircle className="h-24 w-24 text-accent animate-pulse" />
        </div>
        
        <h2 
            className="text-4xl sm:text-5xl md:text-6xl font-pixel uppercase text-glow text-primary"
        >
            Memória Desbloqueada!
        </h2>
        
        <p className="text-xl md:text-2xl text-foreground">
            Você ainda tem o espírito gamer das antigas...
        </p>

        {score && (
          <div className="p-4 bg-card border-2 border-dashed border-accent rounded-lg shadow-inner max-w-md mx-auto flex items-center justify-center gap-4">
            <Trophy className="h-8 w-8 text-accent" />
            <p className="text-xl md:text-2xl font-bold">
              Pontuação Total: <span className="font-pixel text-accent text-glow">{score}</span>
            </p>
          </div>
        )}
        
        <div className="p-6 bg-card border rounded-lg shadow-inner max-w-2xl mx-auto">
            <p className="text-lg md:text-xl">
                Agora é hora de reviver tudo isso com mais de <span className="font-bold text-accent">100.000 jogos lendários</span>, compatíveis com PC, TV Box e celular.
            </p>
        </div>
        
         {/* Testimonials Section */}
       <section className="w-full max-w-4xl mx-auto pt-16 text-center">
            <h3 className="text-3xl font-headline mb-8">O que outros players estão dizendo:</h3>
            <Carousel
                plugins={[autoplayPlugin.current]}
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent>
                    {testimonialImages.map((testimonial, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-full">
                            <div className="p-1 h-full flex justify-center">
                                <Image 
                                  src={testimonial.src}
                                  alt={testimonial.alt}
                                  width={400}
                                  height={200}
                                  className="rounded-lg object-contain"
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="ml-12" />
                <CarouselNext className="mr-12" />
            </Carousel>
        </section>

        <Link href="/sales" className="btn-pixel-accent !text-lg !px-8 !py-4">
            Ver Plataforma Agora
        </Link>
      </div>
      
      

    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultsContent />
    </Suspense>
  );
}
