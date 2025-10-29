"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Autoplay, { type AutoplayType } from 'embla-carousel-autoplay';
import {
  Flame,
  Check,
  CheckCircle,
  Gamepad2,
  Gift,
  Monitor,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Tv,
  Wifi,
} from 'lucide-react';
import SoundToggle from '@/components/app/sound-toggle';
import { ControllerIcon } from '@/components/app/pixel-art-icons';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const entryImages = PlaceHolderImages.filter(image => image.id.startsWith('entry-'));

const highlightItems = [
  {
    title: '100 mil jogos lendarios',
    description: 'Classicos de Super Nintendo, PlayStation, Mega Drive, arcades e muito mais.',
  },
  {
    title: 'Compativel com tudo',
    description: 'PC, TV Box, celular e tablet. Instalacao simples e suporte vitalicio.',
  },
  {
    title: 'Bonus exclusivos',
    description: 'Bibliotecas traduzidas para portugues e atualizadas com frequencia.',
  },
  {
    title: 'Experiencia imersiva',
    description: 'Trilhas, efeitos e ambientacao pensadas para resgatar a sua memoria gamer.',
  },
];

const flowSteps = [
  { label: 'PASSO 01', text: 'Aperte play nos classicos e sinta o portal abrir.' },
  { label: 'PASSO 02', text: 'Reviva as memorias resumidas pelo quiz nostalgico.' },
  { label: 'PASSO 03', text: 'Liberte o acesso vitalicio e volte a zerar hoje mesmo.' },
];

const quizNarratives = [
  {
    badge: 'Memoria 01',
    title: 'Voce lembra desse momento?',
    description: 'Tela de tubo, controle com fio e a trilha 16-bit marcando cada fase. A cena que abre o portal continua intacta nas colecoes do Retro Games.',
  },
  {
    badge: 'Memoria 02',
    title: 'Qual foi seu primeiro console?',
    description: 'Snes, PS1, Mega ou outro setup lendario. Sabendo onde tudo comecou conseguimos liberar a biblioteca certa logo no primeiro acesso.',
  },
  {
    badge: 'Memoria 03',
    title: 'Onde voce mais jogava?',
    description: 'Locadora, casa dos amigos ou fliperama. O clima muda, mas nossa esteira de jogos entrega cada vibe com playlists prontas.',
  },
  {
    badge: 'Memoria 04',
    title: 'O que te deixava na pilha?',
    description: 'Zerar sem password, descobrir easter egg ou encarar chefes impossiveis. Os desafios continuam ali, com save state opcional.',
  },
  {
    badge: 'Memoria 05',
    title: 'Com quem voce quer reviver?',
    description: 'Modo solo, couch co-op ou familia reunida. Montamos guias para compartilhar nostalgia e conectar novas jogatinas.',
  },
];

const gameIcons = [
  { src: '/image/icons/gow-icon.png', alt: 'God of War icon' },
  { src: '/image/icons/gta-icon.png', alt: 'GTA icon' },
  { src: '/image/icons/mk-1-icon.png', alt: 'Mortal Kombat 1 icon' },
  { src: '/image/icons/resident-evil-icon.png', alt: 'Resident Evil icon' },
  { src: '/image/icons/street fighter-icon.png', alt: 'Street Fighter icon' },
  { src: '/image/icons/tekken-icon.png', alt: 'Tekken icon' },
  { src: '/image/icons/top-gear-icon.png', alt: 'Top Gear icon' },
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

const playAnywhere = [
  {
    title: 'PC ou notebook',
    description: 'Instalacao guiada passo a passo. Compatibilidade com Windows e setups gamer com controle ou teclado.',
    icon: Monitor,
  },
  {
    title: 'TV e TV Box',
    description: 'Transforme qualquer tela em fliperama moderno. Apenas plug and play com controle USB ou Bluetooth.',
    icon: Tv,
  },
  {
    title: 'Celular e tablet',
    description: 'Biblioteca otimizada para toque ou controle mobile. Perfeito para viajar revivendo cada fase.',
    icon: Smartphone,
  },
  {
    title: 'Consoles retro',
    description: 'Suporte para Raspberry, portateis e arcades caseiros. Ajuste fino, shaders e overlay nostalgico.',
    icon: Gamepad2,
  },
];

const bonusHighlights = [
  {
    title: 'Jogos traduzidos e otimizados',
    description: 'Bibliotecas classicas com patches em portugues, configuracoes de video ajustes de performance e saves prontos.',
    icon: Gift,
  },
  {
    title: 'Colecoes premium desbloqueadas',
    description: 'PS1, PS2, PS3, Xbox 360 e arcades raros organizados por genero com filtros e playlists curadas.',
    icon: Gamepad2,
  },
  {
    title: 'Suporte vitalicio + atualizacoes',
    description: 'Equipe para resolver instalacao, setups de controle e novidades periodicas com novos packs e melhorias.',
    icon: ShieldCheck,
  },
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

const testimonialImages = [
  { src: '/image/depoimentos/depoimento4games.png', alt: 'Depoimento 1' },
  { src: '/image/depoimentos/depoimento 5 games.png', alt: 'Depoimento 2' },
  { src: '/image/depoimentos/depoimento3games.png', alt: 'Depoimento 3' },
];

export default function LandingPage() {
  const [narrativeIndex, setNarrativeIndex] = useState(0);
  const [motionEnabled, setMotionEnabled] = useState(true);
  const [enableGameAutoplay, setEnableGameAutoplay] = useState(false);
  const [enableTestimonialAutoplay, setEnableTestimonialAutoplay] = useState(false);

  const storyIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const gameCarouselAutoplay = useRef<AutoplayType>(Autoplay({ delay: 2200, stopOnInteraction: false, stopOnMouseEnter: true }));
  const testimonialCarouselAutoplay = useRef<AutoplayType>(Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true }));
  const gameCarouselViewportRef = useRef<HTMLDivElement | null>(null);
  const testimonialCarouselViewportRef = useRef<HTMLDivElement | null>(null);
  const enableGameAutoplayRef = useRef(enableGameAutoplay);
  const enableTestimonialAutoplayRef = useRef(enableTestimonialAutoplay);

  const clearNarrativeCycle = useCallback(() => {
    if (storyIntervalRef.current) {
      clearInterval(storyIntervalRef.current);
      storyIntervalRef.current = null;
    }
  }, []);

  const startNarrativeCycle = useCallback(() => {
    if (!motionEnabled || quizNarratives.length <= 1) {
      return;
    }

    clearNarrativeCycle();
    storyIntervalRef.current = setInterval(() => {
      setNarrativeIndex(prev => (prev + 1) % quizNarratives.length);
    }, 5200);
  }, [clearNarrativeCycle, motionEnabled]);

  const handleVisibilityChange = useCallback(() => {
    if (document.hidden) {
      clearNarrativeCycle();
      gameCarouselAutoplay.current.stop();
      testimonialCarouselAutoplay.current.stop();
      return;
    }

    startNarrativeCycle();
    if (enableGameAutoplayRef.current) {
      gameCarouselAutoplay.current.reset();
      gameCarouselAutoplay.current.play();
    }
    if (enableTestimonialAutoplayRef.current) {
      testimonialCarouselAutoplay.current.reset();
      testimonialCarouselAutoplay.current.play();
    }
  }, [clearNarrativeCycle, startNarrativeCycle]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => {
      setMotionEnabled(!mediaQuery.matches);
    };

    updatePreference();
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updatePreference);
      return () => mediaQuery.removeEventListener('change', updatePreference);
    }

    mediaQuery.addListener(updatePreference);
    return () => mediaQuery.removeListener(updatePreference);
  }, []);

  useEffect(() => {
    if (!motionEnabled) {
      clearNarrativeCycle();
      setNarrativeIndex(0);
    }
  }, [motionEnabled, clearNarrativeCycle]);

  useEffect(() => {
    if (!motionEnabled || quizNarratives.length <= 1) {
      return;
    }

    startNarrativeCycle();
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearNarrativeCycle();
    };
  }, [motionEnabled, startNarrativeCycle, clearNarrativeCycle, handleVisibilityChange]);

  useEffect(() => {
    if (!motionEnabled) {
      setEnableGameAutoplay(false);
      setEnableTestimonialAutoplay(false);
    }
  }, [motionEnabled]);

  useEffect(() => {
    if (!motionEnabled) {
      return;
    }

    const container = gameCarouselViewportRef.current;
    if (!container) {
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          setEnableGameAutoplay(entry.isIntersecting);
        });
      },
      { threshold: 0.35 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [motionEnabled]);

  useEffect(() => {
    if (!motionEnabled) {
      return;
    }

    const container = testimonialCarouselViewportRef.current;
    if (!container) {
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          setEnableTestimonialAutoplay(entry.isIntersecting);
        });
      },
      { threshold: 0.35 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [motionEnabled]);

  useEffect(() => {
    const plugin = gameCarouselAutoplay.current;
    if (motionEnabled && enableGameAutoplay) {
      plugin.reset();
      plugin.play();
    } else {
      plugin.stop();
    }
  }, [enableGameAutoplay, motionEnabled]);

  useEffect(() => {
    const plugin = testimonialCarouselAutoplay.current;
    if (motionEnabled && enableTestimonialAutoplay) {
      plugin.reset();
      plugin.play();
    } else {
      plugin.stop();
    }
  }, [enableTestimonialAutoplay, motionEnabled]);

  useEffect(() => {
    return () => {
      clearNarrativeCycle();
      gameCarouselAutoplay.current.stop();
      testimonialCarouselAutoplay.current.stop();
    };
  }, [clearNarrativeCycle]);

  useEffect(() => {
    enableGameAutoplayRef.current = enableGameAutoplay;
  }, [enableGameAutoplay]);

  useEffect(() => {
    enableTestimonialAutoplayRef.current = enableTestimonialAutoplay;
  }, [enableTestimonialAutoplay]);

  const activeNarrative = quizNarratives[narrativeIndex];

  return (
    <main className="container mx-auto flex flex-col gap-12 px-3 py-10 sm:px-4 sm:py-14">
      <section className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="relative">
          <div className="retro-panel grid-overlay p-3 sm:p-5">
            <div className="retro-panel-content">
              <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                {entryImages.map((image, index) => {
                  const isVideo = image.imageUrl.endsWith('.webm');
                  return (
                    <div
                      key={image.id}
                      className="relative overflow-hidden rounded-2xl border border-primary/20 bg-black/40 shadow-[0_12px_30px_rgba(0,0,0,0.45)] transition duration-500 hover:border-primary/60 hover:shadow-[0_22px_48px_rgba(0,0,0,0.45)]"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      {isVideo ? (
                        <video
                          src={image.imageUrl}
                          aria-label={image.description}
                          data-ai-hint={image.imageHint}
                          className="h-full w-full rounded-2xl object-cover"
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="metadata"
                        />
                      ) : (
                        <Image
                          src={image.imageUrl}
                          alt={image.description}
                          data-ai-hint={image.imageHint}
                          width={320}
                          height={240}
                          className="h-full w-full rounded-2xl object-cover"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <span className="orb -left-12 -top-16 h-32 w-32" />
        </div>

        <div className="retro-panel p-6 sm:p-10">
          <div className="retro-panel-content space-y-8 text-left">
            <div className="flex flex-col gap-6">
              <div className="space-y-4">
                <h1 className="text-3xl font-headline uppercase text-glow sm:text-4xl md:text-5xl">
                  Portal Retro Games: uma pagina, todos os acessos.
                </h1>
                <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
                  Reunimos quiz, sala de espera e resultados em um unico lugar. Basta apertar Start, sentir a trilha e liberar sua colecao completa.
                </p>
              </div>

              <div className="space-y-6">
                <div className="retro-panel p-4 sm:p-5">
                  <div className="retro-panel-content grid gap-4 text-center sm:grid-cols-3 sm:gap-6">
                    {flowSteps.map(step => (
                      <div key={step.label} className="flex flex-col items-center gap-3 text-center">
                        <span className="retro-badge">{step.label}</span>
                        <p className="max-w-xs text-xs text-muted-foreground/80 sm:text-sm">{step.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <SoundToggle orientation="horizontal" />
                  <span className="retro-badge hidden sm:inline-flex">Nostalgia liberada</span>
                </div>
              </div>

              <div className="retro-divider" />

              <div className="space-y-6">
                <ul className="grid gap-4 sm:grid-cols-2">
                  {highlightItems.map(item => (
                    <li
                      key={item.title}
                      className="group flex flex-col gap-2 rounded-xl border border-primary/20 bg-secondary/40 p-4 backdrop-blur-lg transition hover:border-primary/50"
                    >
                      <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary sm:tracking-[0.35em]">
                        {item.title}
                      </span>
                      <p className="text-sm text-muted-foreground/90">{item.description}</p>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Link href="#oferta" className="btn-pixel !px-8 !py-4 !text-base sm:!px-10 sm:!text-lg animate-pulse-press">
                    Liberar acesso agora
                  </Link>
                  <div className="flex items-center gap-3 rounded-xl border border-primary/30 bg-secondary/40 px-4 py-3 text-sm text-muted-foreground sm:text-base">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/40 bg-background/60 sm:h-10 sm:w-10">
                      <Flame className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
                    </span>
                    <p>
                      Promocao relampago ativa.
                      <br className="hidden sm:block" />
                      Acesso imediato apos a compra.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="memorias" className="retro-panel p-4 sm:p-8 lg:p-10">
        <div className="retro-panel-content grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="space-y-6 text-center lg:text-left">
            <span className="retro-badge">Perguntas transformadas em memoria dinamica</span>
            <div
              key={`${activeNarrative.title}-${narrativeIndex}`}
              className="space-y-4 fade-slide-up"
            >
              <span className="retro-badge inline-flex">{activeNarrative.badge}</span>
              <h2 className="text-2xl font-headline uppercase text-primary sm:text-3xl">
                {activeNarrative.title}
              </h2>
              <p className="text-sm text-muted-foreground sm:text-base">
                {activeNarrative.description}
              </p>
            </div>
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
              Troca automatica a cada poucos segundos  reviva tudo assistindo e lendo.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {quizNarratives.map((narrative, index) => {
              const isActive = index === narrativeIndex;
              return (
                <div
                  key={narrative.title}
                  className={`rounded-2xl border px-4 py-4 transition ${
                    isActive
                      ? 'border-accent/60 bg-accent/10 text-primary'
                      : 'border-primary/15 bg-secondary/30 text-muted-foreground'
                  }`}
                >
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em]">
                    {narrative.badge}
                  </p>
                  <p className="mt-2 font-semibold text-sm">{narrative.title}</p>
                  <p className="mt-2 text-xs leading-relaxed">
                    {narrative.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="esteira" className="retro-panel p-4 sm:p-8 lg:p-10">
        <div className="retro-panel-content space-y-10">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div className="space-y-5 text-left">
              <span className="retro-badge">Esteira de jogos</span>
              <h2 className="text-3xl font-headline uppercase text-primary sm:text-4xl">
                Do 8-bit ao HD em um único portal
              </h2>
              <p className="text-sm text-muted-foreground sm:text-base">
                As colecoes estao prontas para baixar, com playlists tematicas, capas atualizadas e configuracoes ja calibradas.
              </p>
              <div className="rounded-3xl border border-primary/25 bg-background/70 p-6 text-sm text-muted-foreground backdrop-blur-xl">
                <p>
                  Selecione um estilo de jogo e deixe a esteira rodar. Voce pode favoritar, baixar em lote e receber atualizacoes sempre que novos classicos chegarem.
                </p>
              </div>
            </div>

            <div className="flex justify-center" ref={gameCarouselViewportRef}>
              <div className="w-full max-w-[260px] sm:max-w-sm lg:max-w-full rounded-3xl border border-primary/20 bg-secondary/30 p-4 shadow-[0_20px_45px_rgba(0,0,0,0.45)]">
                <Carousel plugins={[gameCarouselAutoplay.current]} opts={{ align: 'center', loop: true }} className="w-full">
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

      <section id="onde-jogar" className="retro-panel p-4 sm:p-8 lg:p-10">
        <div className="retro-panel-content space-y-8">
          <div className="text-center space-y-4">
            <span className="retro-badge">Onde posso jogar</span>
            <h2 className="text-3xl font-headline uppercase text-primary sm:text-4xl">
              Jogue em qualquer tela que voce ja tem
            </h2>
            <p className="text-sm text-muted-foreground sm:text-base">
              Configuramos guias passo a passo para cada dispositivo popular. Em minutos voce ja esta apertando Start.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {playAnywhere.map(option => (
              <div
                key={option.title}
                className="flex items-start gap-4 rounded-2xl border border-primary/20 bg-secondary/40 p-4 text-left"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/30 bg-background/60">
                  <option.icon className="h-6 w-6 text-primary" />
                </span>
                <div className="space-y-2">
                  <p className="text-base font-semibold text-foreground">{option.title}</p>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="depoimentos" className="retro-panel p-4 sm:p-8 lg:p-10">
        <div className="retro-panel-content space-y-6">
          <div className="flex items-center justify-center gap-3 text-sm uppercase tracking-[0.35em] text-muted-foreground">
            <span className="retro-badge">Depoimentos</span>
            <span>Players que ja liberaram o portal</span>
          </div>
          <div ref={testimonialCarouselViewportRef}>
            <Carousel
              plugins={[testimonialCarouselAutoplay.current]}
              opts={{ align: 'start', loop: true }}
              className="w-full"
            >
              <CarouselContent>
                {testimonialImages.map(testimonial => (
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
          </div>
        </div>
      </section>

      <section id="bonus" className="retro-panel p-4 sm:p-8 lg:p-10">
        <div className="retro-panel-content space-y-8">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="retro-badge">Bonus imediatos</span>
            <h2 className="text-3xl font-headline uppercase text-primary sm:text-4xl">
              Mais do que acesso, uma esteira premium
            </h2>
            <p className="max-w-3xl text-sm text-muted-foreground sm:text-base">
              Ao entrar no Portal Retro Games voce recebe upgrades exclusivos que aceleram a jogatina sem
              configuracoes complicadas. Tudo carregado ao lado dos depoimentos para voce ter certeza do que vem junto.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bonusHighlights.map(bonus => (
              <div
                key={bonus.title}
                className="group flex h-full flex-col gap-4 rounded-2xl border border-accent/40 bg-accent/10 p-5 text-left shadow-[0_18px_38px_rgba(0,0,0,0.35)] transition hover:border-accent hover:bg-accent/15"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/40 bg-background/70 text-accent">
                  <bonus.icon className="h-6 w-6" />
                </span>
                <div className="space-y-2">
                  <p className="text-base font-semibold text-foreground">{bonus.title}</p>
                  <p className="text-sm text-muted-foreground">{bonus.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.35em] text-muted-foreground">
            <Sparkles className="h-4 w-4 text-accent" />
            <span>Bonus liberados automaticamente apos a compra</span>
          </div>
        </div>
      </section>

      <section id="oferta" className="retro-panel p-4 sm:p-8 lg:p-10">
        <div className="retro-panel-content space-y-10">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <div className="space-y-5">
              <span className="retro-badge">Oferta definitiva</span>
              <h3 className="text-3xl font-headline uppercase text-primary sm:text-4xl">
                Acesso imediato a nostalgia
              </h3>
              <p className="text-sm text-muted-foreground sm:text-base">
                Tudo o que voce precisa para reviver a era de ouro dos games  organizado, atualizado e com suporte real de quem tambem viveu isso.
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
                href="https://pay.cakto.com.br/93kemsh_626762"
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
    </main>
  );
}
