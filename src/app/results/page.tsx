
"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Trophy, Star } from 'lucide-react';
import { Suspense } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    name: 'João "Gamer" Silva',
    title: 'Jogador das Antigas',
    avatar: 'JS',
    comment: 'Eu achei que nunca mais ia sentir a emoção de jogar Street Fighter no fliperama. Essa plataforma me levou de volta no tempo. Incrível!',
  },
  {
    name: 'Mariana "LevelUp" Costa',
    title: 'Fã de RPGs Clássicos',
    avatar: 'MC',
    comment: 'Final Fantasy VII, Chrono Trigger... todos os jogos que marcaram minha adolescência estão aqui. É a melhor compra que fiz em anos.',
  },
  {
    name: 'Pedro "16-Bit" Almeida',
    title: 'Colecionador de Consoles',
    avatar: 'PA',
    comment: 'A quantidade de consoles e jogos é absurda. Acesso vitalício por esse preço? É simplesmente imperdível pra quem ama a história dos games.',
  },
    {
    name: 'Carla "Pixel" Souza',
    title: 'Speedrunner Amadora',
    avatar: 'CS',
    comment: 'A performance é ótima, consigo treinar minhas runs de Super Metroid sem nenhum lag. Recomendo pra qualquer um que leva a jogatina a sério.',
  },
];


function ResultsContent() {
  const searchParams = useSearchParams();
  const score = searchParams.get('score');

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
        
        <Link href="/sales" className="btn-pixel-accent !text-lg !px-8 !py-4">
            Ver Plataforma Agora
        </Link>
      </div>
      
       {/* Testimonials Section */}
       <section className="w-full max-w-4xl mx-auto pt-16 text-center">
            <h3 className="text-3xl font-headline mb-8">O que outros players estão dizendo:</h3>
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent>
                    {testimonials.map((testimonial, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1 h-full">
                                <Card className="h-full flex flex-col justify-between bg-card/80 border-primary/20">
                                    <CardContent className="p-6 text-left space-y-4">
                                        <div className="flex items-center gap-4">
                                            <Avatar>
                                                <AvatarImage src={`https://i.pravatar.cc/40?u=${testimonial.avatar}`} />
                                                <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-bold">{testimonial.name}</p>
                                                <p className="text-xs text-muted-foreground">{testimonial.title}</p>
                                            </div>
                                        </div>
                                        <p className="text-sm italic text-foreground/80">"{testimonial.comment}"</p>
                                        <div className="flex text-yellow-400">
                                          {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="ml-12" />
                <CarouselNext className="mr-12" />
            </Carousel>
        </section>

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
