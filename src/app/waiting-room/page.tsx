"use client";

import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SoundContext } from '@/context/sound-context';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const waitingRoomImage = PlaceHolderImages.find(image => image.id === 'waiting-room-gif')!;

const timeline = [
  { label: 'Sequencia iniciada', description: 'O portal esta calibrando a viagem temporal.' },
  { label: 'Sintonizando memorias', description: 'Trilhas sonoras e save states sendo restaurados.' },
  { label: 'Entrada liberada', description: 'Prepare os dedos: o quiz nostalgico acaba de abrir.' },
];

export default function WaitingRoomPage() {
  const [position, setPosition] = useState(3426);
  const [status, setStatus] = useState<'counting' | 'releasing' | 'ready'>('counting');
  const router = useRouter();
  const soundContext = useContext(SoundContext);

  useEffect(() => {
    if (soundContext) {
      soundContext.playSound('waiting');
    }
    return () => {
      soundContext?.stopSound('waiting');
    };
  }, [soundContext]);

  useEffect(() => {
    if (status !== 'counting') return;

    const startValue = 3426;
    const duration = 10000;
    const intervalTime = 100;

    let remainingValue = startValue;
    const startTime = Date.now();

    const positionInterval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;

      if (elapsedTime >= duration) {
        setPosition(0);
        setStatus('releasing');
        clearInterval(positionInterval);
        return;
      }

      const progress = elapsedTime / duration;
      const randomFactor = Math.random() * (10 + progress * 150);
      const decrement = Math.min(remainingValue, Math.floor(randomFactor));

      const newPosition = remainingValue - decrement;
      remainingValue = newPosition > 0 ? newPosition : 0;
      setPosition(remainingValue);
    }, intervalTime);

    return () => {
      clearInterval(positionInterval);
    };
  }, [status]);

  useEffect(() => {
    if (status === 'releasing') {
      const timer = setTimeout(() => {
        setStatus('ready');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleEnterPortal = () => {
    soundContext?.stopSound('waiting');
    router.push('/quiz');
  };

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-160px)] items-center justify-center px-4 py-12">
      <div className="retro-panel w-full max-w-5xl overflow-hidden p-6 sm:p-10">
        <div className="retro-panel-content space-y-10">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)]"
            >
              <div className="space-y-8 text-left">
                <div className="relative flex items-center justify-center">
                  <span className="glow-ring absolute inset-8 z-0 opacity-60" />
                  <Image
                    src={waitingRoomImage.imageUrl}
                    alt={waitingRoomImage.description}
                    data-ai-hint={waitingRoomImage.imageHint}
                    width={260}
                    height={260}
                    unoptimized
                    className="relative z-10 h-44 w-44 rounded-full border border-primary/40 bg-black/60 object-cover p-2 shadow-[0_25px_65px_rgba(0,0,0,0.45)] floating"
                  />
                </div>

                <div className="space-y-4">
                  <span className="retro-badge">Portal em sincronia</span>
                  <h2 className="text-3xl font-headline uppercase text-glow sm:text-4xl">
                    A jornada comeca agora.
                  </h2>
                  <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
                    Respira fundo, ajusta o joystick e deixa a trilha invadir. Em poucos segundos voce atravessa
                    o portal para reviver tardes de locadora, campeonatos improvisados e finais dramaticos.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {timeline.map(item => (
                    <div key={item.label} className="rounded-xl border border-primary/20 bg-secondary/40 p-4 text-sm text-muted-foreground/90">
                      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">{item.label}</p>
                      <p className="mt-2">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <div className="rounded-3xl border border-primary/30 bg-background/70 p-6 backdrop-blur-xl">
                  <AnimatePresence mode="wait">
                    {status === 'counting' && (
                      <motion.div
                        key="counting"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92 }}
                        transition={{ duration: 0.35 }}
                        className="space-y-4 text-center"
                      >
                        <p className="text-sm uppercase tracking-[0.35em] text-accent">Pre-carga da nostalgia</p>
                        <div className="flex items-center justify-center gap-4 font-pixel text-xl">
                          <div className="loader" />
                          <span>
                            Posicao: <span className="text-primary text-glow">{position}</span>
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Segure firme, estamos abrindo espaco para voce atravessar.
                        </p>
                      </motion.div>
                    )}

                    {status === 'releasing' && (
                      <motion.div
                        key="releasing"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-3 text-center"
                      >
                        <p className="text-sm uppercase tracking-[0.35em] text-accent">Canal liberado</p>
                        <p className="font-semibold text-primary">
                          Aguente firme, preparando o salto temporal...
                        </p>
                      </motion.div>
                    )}

                    {status === 'ready' && (
                      <motion.div
                        key="ready"
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.45 }}
                        className="space-y-4 text-center"
                      >
                        <p className="text-sm uppercase tracking-[0.35em] text-primary">Portal estavel</p>
                        <p className="text-muted-foreground">
                          O quiz nostalgico esta pronto. Aperte o botao abaixo e atravesse.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="rounded-3xl border border-primary/25 bg-secondary/40 p-6 text-sm text-muted-foreground">
                  <p>
                    Enquanto o portal se abre, deixa a trilha guiar o coracao gamer. O proximo passo e descobrir
                    qual console marcou a sua historia  e destravar a colecao completa pra reviver tudo isso hoje.
                  </p>
                </div>

                <div className="relative flex items-center justify-center pt-2">
                  <AnimatePresence>
                    {status === 'ready' && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.45, delay: 0.2 }}
                        className="w-full"
                      >
                        <Button
                          onClick={handleEnterPortal}
                          className="btn-pixel-accent flex w-full items-center justify-center gap-2 !px-10 !py-5 !text-lg"
                        >
                          Entrar no portal retro
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
