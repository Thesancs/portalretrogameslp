
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, CheckCircle } from 'lucide-react';
import { ControllerIcon, ConsoleIcon, JoystickIcon } from '@/components/app/pixel-art-icons';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";

const gameIcons = [
    { src: '/image/icons/gow-icon.png', alt: 'God of War icon' },
    { src: '/image/icons/gta-icon.png', alt: 'GTA icon' },
    { src: '/image/icons/mk-1-icon.png', alt: 'Mortal Kombat 1 icon' },
    { src: '/image/icons/resident-evil-icon.png', alt: 'Resident Evil icon' },
    { src: '/image/icons/street fighter-icon.png', alt: 'Street Fighter icon' },
    { src: '/image/icons/tekken-icon.png', alt: 'Tekken icon' },
    { src: '/image/icons/top-gear-icon.png', alt: 'Top Gear icon' },
];

const features = [
  { text: "+100.000 jogos clássicos", icon: ControllerIcon },
  { text: "52 consoles retrô em 1", icon: ConsoleIcon },
  { text: "Acesso vitalício, sem mensalidade", icon: JoystickIcon },
  { text: "Compatível com PC, TV, e mais", icon: Check },
];

const consoleList = [
    "Playstation 1",
    "Playstation 2",
    "Playstation 3",
    "PSP",
    "Super Nintendo",
    "Nintendo 64",
    "Nintendo Wii",
    "Nintendo 3DS",
    "Atari",
    "Mega Drive",
    "Master System",
    "GameBoy",
    "Dreamcast",
    "Sega Saturn",
    "Arcade",
    "Fliperamas e Muito mais..."
];

export default function SalesPage() {
  const autoplayPlugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true }));

  return (
    
      <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-128px)]">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Storytelling Section */}
          <section className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">
              Você lembra do barulho do controle, do cheiro da locadora, da emoção de zerar um jogo sem salvar?
            </h2>
            <p className="text-lg text-muted-foreground">
              Essa era não acabou. Ela apenas estava esperando por você.
            </p>
          </section>

          {/* Gameplay Gallery */}
           <section className="w-full max-w-4xl mx-auto py-8">
            <Carousel
                plugins={[autoplayPlugin.current]}
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-2">
                    {gameIcons.map((icon, index) => (
                        <CarouselItem key={index} className="basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 pl-2">
                            <div className="p-1 flex justify-center items-center">
                                <Image 
                                  src={icon.src}
                                  alt={icon.alt}
                                  width={600}
                                  height={600}
                                  className="object-contain border-2 border-primary rounded-md"
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
          </section>

           {/* Console List Section */}
          <section className="text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold font-headline uppercase">
              Você terá acesso a <span className="text-primary text-glow">Jogos de:</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 max-w-2xl mx-auto text-left">
              {consoleList.map((consoleName) => (
                <div key={consoleName} className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-accent flex-shrink-0" />
                  <span className="text-xl font-semibold">{consoleName}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Offer Section */}
          <section>
            <Card className="shadow-2xl border-4 border-primary/50">
              <CardHeader className="text-center">
                <p className="font-pixel text-accent">A OFERTA DEFINITIVA</p>
                <CardTitle className="text-4xl font-headline">Acesso Imediato à Nostalgia</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-muted/50 rounded-md">
                      <feature.icon className="h-8 w-8 text-primary" />
                      <span className="font-medium">{feature.text}</span>
                    </div>
                  ))}
                </div>
                <div className="text-center space-y-4 pt-6">
                  <p className="text-2xl font-bold">Tudo isso por um pagamento único de</p>
                  <p className="font-pixel text-5xl md:text-6xl text-primary text-glow">R$19,90</p>
                  <p className="text-muted-foreground">Por menos que um lanche, você revive uma vida inteira de memórias.</p>
                </div>
                <div className="text-center pt-4">
                  <Link href="/checkout" className="btn-pixel !text-xl !px-10 !py-5">
                    Quero Reviver Agora
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    
  );
}
