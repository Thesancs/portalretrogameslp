"use client";

import Image from 'next/image';
import { useRef } from 'react';
import { Check, CheckCircle, Gamepad2, Tv, Wifi } from 'lucide-react';
import { ControllerIcon } from '@/components/app/pixel-art-icons';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

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
  { text: '100 mil jogos nostalgicos', icon: ControllerIcon },
  { text: 'Pagamento unico', icon: Check },
  { text: 'E so baixar, instalar e jogar', icon: Check },
  { text: 'Jogue no celular, computador, TV, TV Box e videogame', icon: Tv },
  { text: 'Acesso de qualquer lugar', icon: Wifi },
  { text: 'Instalacao guiada e simples', icon: Check },
  { text: 'Suporte tecnico dedicado', icon: Check },
  { text: 'Diversao garantida', icon: Check },
  { text: 'Bonus: jogos traduzidos para portugues', icon: Check },
  { text: 'Colecoes de PS1, PS2, PS3 e Xbox 360', icon: Gamepad2 },
  { text: 'Bonus extra: jogos em Full HD', icon: Check },
];

const consoleList = [
  'PlayStation 1',
  'PlayStation 2',
  'PlayStation 3',
  'PSP',
  'Super Nintendo',
  'Nintendo 64',
  'Nintendo Wii',
  'Nintendo 3DS',
  'Atari',
  'Mega Drive',
  'Master System',
  'Game Boy',
  'Dreamcast',
  'Sega Saturn',
  'Arcade',
  'Fliperamas e muito mais...',
];

export default function SalesPage() {
  const autoplayPlugin = useRef(Autoplay({ delay: 2200, stopOnInteraction: false, stopOnMouseEnter: true }));

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-160px)] flex-col justify-center px-3 py-10 sm:px-4 sm:py-12">
      <div className="space-y-12 sm:space-y-16">
        <section className="retro-panel mx-auto max-w-5xl p-4 sm:p-8 lg:p-10">
          <div className="retro-panel-content grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div className="space-y-6 text-left">
              <span className="retro-badge">Portal Retro Games</span>
              <h2 className="text-3xl font-headline uppercase text-glow sm:text-4xl">
                Lembra do clique do controle, do cheiro da locadora, de zerar sem poder salvar?
              </h2>
              <p className="text-base text-muted-foreground sm:text-lg">
                Essa era nao acabou. Ela so estava esperando voce voltar. Reunimos tudo em uma plataforma com
                instalacao guiada, suporte real e acesso vitalicio.
              </p>
              <div className="rounded-3xl border border-primary/25 bg-background/70 p-6 text-sm text-muted-foreground backdrop-blur-xl">
                <p>
                  Sao mais de <span className="font-semibold text-accent">100.000 jogos lendarios</span> para PC, TV Box,
                  celular ou tablet. Voce escolhe onde jogar  nos entregamos o portal completo.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground/90">
                <div className="rounded-full border border-primary/25 bg-secondary/40 px-4 py-2 uppercase tracking-[0.35em]">
                  Compativel com tudo
                </div>
                <div className="rounded-full border border-primary/25 bg-secondary/40 px-4 py-2 uppercase tracking-[0.35em]">
                  Pagamento unico
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-full max-w-[260px] sm:max-w-sm lg:max-w-full rounded-3xl border border-primary/20 bg-secondary/30 p-4 shadow-[0_20px_45px_rgba(0,0,0,0.45)]">
                <Carousel plugins={[autoplayPlugin.current]} opts={{ align: 'center', loop: true }} className="w-full">
                  <CarouselContent className="items-center">
                    {gameIcons.map(icon => (
                      <CarouselItem key={icon.src} className="flex items-center justify-center">
                        <Image
                          src={icon.src}
                          alt={icon.alt}
                          width={140}
                          height={140}
                          className="rounded-2xl border border-primary/30 bg-black/40 p-3 object-contain"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden sm:flex ml-2" />
                  <CarouselNext className="hidden sm:flex mr-2" />
                </Carousel>
              </div>
            </div>
          </div>
        </section>

        <section className="retro-panel mx-auto max-w-5xl p-4 sm:p-8 lg:p-10">
          <div className="retro-panel-content space-y-10">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-headline uppercase text-primary sm:text-3xl">
                Tenha acesso imediato a jogos de:
              </h3>
              <p className="text-sm text-muted-foreground sm:text-base">
                Bibliotecas completas, organizadas e prontas para jogar em minutos.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {consoleList.map(consoleName => (
                <div
                  key={consoleName}
                  className="flex items-center gap-3 rounded-2xl border border-primary/20 bg-secondary/40 px-4 py-3 text-left"
                >
                  <CheckCircle className="h-6 w-6 text-accent" />
                  <span className="text-base font-semibold">{consoleName}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="retro-panel mx-auto max-w-5xl p-4 sm:p-8 lg:p-10">
          <div className="retro-panel-content space-y-10">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
              <div className="space-y-5">
                <span className="retro-badge">Oferta definitiva</span>
                <h3 className="text-3xl font-headline uppercase text-primary sm:text-4xl">
                  Acesso imediato a nostalgia
                </h3>
                <p className="text-sm text-muted-foreground sm:text-base">
                  Tudo o que voce precisa para reviver a era de ouro dos games  organizado, atualizado e com suporte
                  real de quem tambem viveu isso.
                </p>
                <div className="grid gap-3 text-sm sm:grid-cols-2">
                  {features.map(feature => (
                    <div key={feature.text} className="flex items-center gap-3 rounded-2xl border border-primary/20 bg-secondary/40 px-4 py-3">
                      <feature.icon className="h-5 w-5 text-primary" />
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-6 rounded-3xl border border-primary/30 bg-background/80 p-5 text-center text-sm text-muted-foreground shadow-[0_25px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-6">
                <p className="text-xs uppercase tracking-[0.35em] text-primary sm:text-[0.7rem]">De R$127,90 por apenas</p>
                <p className="font-pixel text-4xl text-primary text-glow sm:text-5xl md:text-6xl">R$27,90</p>
                <p className="text-xs leading-relaxed sm:text-sm">
                  Menos que um lanche para ter uma vida inteira de memorias desbloqueadas, com atualizacoes e suporte.
                </p>
                <Image
                  src="/image/icons/cartoes.png"
                  alt="Metodos de pagamento"
                  width={260}
                  height={44}
                  className="mx-auto h-9 w-auto max-w-full object-contain sm:h-10"
                />
                <a
                  href="https://checkout.imperiumpay.app/checkout/cmh5gys2g0206nif9y56lh5bb?offer=GFKF3X0"
                  className="btn-pixel w-full px-6 py-4 text-sm tracking-[0.12em] sm:w-auto sm:px-10 sm:py-5 sm:text-lg sm:tracking-[0.28em]"
                  rel="noreferrer"
                >
                  Quero reviver agora
                </a>
                <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
                  Acesso imediato  garantia de 7 dias  suporte vitalicio
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
