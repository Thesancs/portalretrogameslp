"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Flame } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import SoundToggle from '@/components/app/sound-toggle';

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

const timeline = [
  { label: 'PASSO 01', text: 'Aqueca a nostalgia e ligue o som.' },
  { label: 'PASSO 02', text: 'Entre na sala, desbloqueie memorias e responda ao quiz.' },
  { label: 'PASSO 03', text: 'Garanta o acesso e volte a zerar como nos velhos tempos.' },
];

export default function EntryPage() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-200px)] flex-col justify-center px-3 py-10 sm:px-4 sm:py-14">
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
                  Se voce lembra desses jogos, prepare-se para apertar Start novamente.
                </h1>
                <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
                  A jornada pela sua era gamer comeca aqui. Relembre locadoras, fliperamas e finais de semana
                  zerando com os amigos  tudo em um so portal.
                </p>
              </div>

              <div className="space-y-6">
                <div className="retro-panel p-4 sm:p-5">
                  <div className="retro-panel-content grid gap-4 text-center sm:grid-cols-3 sm:gap-6">
                    {timeline.map(step => (
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
                  <Link href="/waiting-room" className="btn-pixel !px-8 !py-4 !text-base sm:!px-10 sm:!text-lg animate-pulse-press">
                    Fazer o quiz nostalgico
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
    </div>
  );
}
