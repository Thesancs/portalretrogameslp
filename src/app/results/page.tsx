"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Suspense, useRef, useContext, useEffect } from 'react';
import { CheckCircle, Trophy, Sparkles } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { SoundContext } from '@/context/sound-context';

const testimonialImages = [
  { src: '/image/depoimentos/depoimento4games.png', alt: 'Depoimento 1' },
  { src: '/image/depoimentos/depoimento 5 games.png', alt: 'Depoimento 2' },
  { src: '/image/depoimentos/depoimento3games.png', alt: 'Depoimento 3' },
];

function ResultsContent() {
  const searchParams = useSearchParams();
  const score = searchParams.get('score');
  const autoplayPlugin = useRef(Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true }));
  const soundContext = useContext(SoundContext);

  useEffect(() => {
    soundContext?.playSound('background');
  }, [soundContext]);

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-160px)] flex-col justify-center px-4 py-12">
      <div className="retro-panel w-full max-w-5xl self-center p-6 sm:p-10">
        <div className="retro-panel-content space-y-12 text-center">
          <div className="flex flex-col items-center gap-6">
            <span className="glow-ring inline-flex h-28 w-28 items-center justify-center rounded-full border border-accent/50 bg-accent/10">
              <CheckCircle className="h-16 w-16 text-accent" />
            </span>
            <div className="space-y-4">
              <h2 className="text-3xl font-pixel uppercase text-glow text-primary sm:text-5xl">
                Memoria desbloqueada!
              </h2>
              <p className="text-base text-muted-foreground sm:text-lg">
                Voce ainda tem o espirito gamer das antigas vivo  e agora tem o mapa para reviver tudo.
              </p>
            </div>
          </div>

          {score && (
            <div className="grid gap-4 rounded-3xl border border-primary/30 bg-background/70 p-6 text-sm text-muted-foreground shadow-[0_25px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:grid-cols-[auto,1fr] sm:text-left">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/40 bg-accent/15">
                <Trophy className="h-7 w-7 text-accent" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-primary">Score final desbloqueado</p>
                <p className="mt-2 flex items-baseline justify-center gap-2 font-pixel text-4xl text-primary text-glow sm:justify-start">
                  {score}
                  <span className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">pts</span>
                </p>
                <p className="mt-3 text-sm">
                  Quanto maior o score, mais raro e o perfil nostalgico. Voce esta pronto para receber o passe completo.
                </p>
              </div>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: '100 mil jogos lendarios', description: 'PS1, PS2, Mega Drive, SNES, arcades e muito mais.' },
              { label: 'Instalacao rapida', description: 'Compativel com PC, TV Box e celular sem complicacao.' },
              { label: 'Bonus exclusivos', description: 'Bibliotecas traduzidas, suporte vitalicio e atualizacoes.' },
            ].map(info => (
              <div key={info.label} className="rounded-2xl border border-primary/20 bg-secondary/40 p-5 text-sm text-muted-foreground/90">
                <p className="text-xs uppercase tracking-[0.3em] text-primary">{info.label}</p>
                <p className="mt-2">{info.description}</p>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-primary/25 bg-background/70 p-6 text-sm text-muted-foreground">
            <p>
              Agora e hora de transformar nostalgia em jogatina real. O Portal Retro Games libera acesso a mais de{' '}
              <span className="font-semibold text-accent">100.000 jogos lendarios</span> com instalacao guiada e suporte
              dedicado. Mantenha o hype vivo e mergulhe novamente em cada fase marcante da sua historia gamer.
            </p>
          </div>

          <section className="space-y-6">
            <div className="flex items-center justify-center gap-3 text-sm uppercase tracking-[0.35em] text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>O que outros players estao dizendo</span>
            </div>
            <Carousel
              plugins={[autoplayPlugin.current]}
              opts={{ align: 'start', loop: true }}
              className="w-full"
            >
              <CarouselContent>
                {testimonialImages.map((testimonial, index) => (
                  <CarouselItem key={testimonial.src} className="md:basis-1/2 lg:basis-full">
                    <div className="flex h-full items-center justify-center rounded-3xl border border-primary/20 bg-secondary/30 p-4">
                      <Image
                        src={testimonial.src}
                        alt={testimonial.alt}
                        width={420}
                        height={240}
                        className="rounded-2xl object-contain"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="ml-4" />
              <CarouselNext className="mr-4" />
            </Carousel>
          </section>

          <div className="flex flex-col items-center gap-4">
            <Link href="/sales" className="btn-pixel-accent !px-12 !py-5 !text-lg">
              Ver plataforma agora
            </Link>
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
              Acesso imediato  pagamento unico  suporte vitalicio
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ResultsContent />
    </Suspense>
  );
}
