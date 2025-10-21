
"use client";

import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SoundContext } from '@/context/sound-context';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const waitingRoomImage = PlaceHolderImages.find(p => p.id === 'waiting-room-gif')!;

export default function WaitingRoomPage() {
  const [position, setPosition] = useState(3426);
  const [status, setStatus] = useState<'counting' | 'releasing' | 'ready'>('counting');
  const router = useRouter();
  const soundContext = useContext(SoundContext);

  useEffect(() => {
    if (soundContext && !soundContext.isSoundOn) {
      soundContext.toggleSound();
    }
  }, [soundContext]);

  useEffect(() => {
    if (status !== 'counting') return;

    const startValue = 3426;
    const duration = 10000; // ~10 seconds
    const intervalTime = 100; // update every 100ms
    
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

        // Calculate a random decrement, making it larger as we get closer to the end
        const progress = elapsedTime / duration;
        const randomFactor = Math.random() * (10 + progress * 150); // Jumps get bigger
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
      }, 2000); // Wait for 2 seconds
      return () => clearTimeout(timer);
    }
  }, [status]);


  const handleEnterPortal = () => {
    router.push('/quiz');
  };

  return (
    <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-128px)]">
      <Card className="w-full max-w-2xl text-center shadow-2xl border-primary/20 bg-card/80 backdrop-blur-sm">
        <CardContent className="p-6 md:p-8 space-y-6">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex justify-center mb-4">
                <Image 
                  src={waitingRoomImage.imageUrl} 
                  alt={waitingRoomImage.description}
                  data-ai-hint={waitingRoomImage.imageHint}
                  width={250} 
                  height={250} 
                  unoptimized
                />
              </div>
              <h2 className="text-2xl md:text-3xl font-headline text-primary text-glow mb-4">
                "A JORNADA COMEÇA AGORA..."
              </h2>

              <div className="text-lg text-foreground/90 space-y-3 prose prose-invert prose-p:my-2 mx-auto">
                <p> Eu sei que tirei um sorriso seu...</p>
                <p>Prepare-se para retornar a sua infancia<br />Já te teleportou pra outro mundo, mesmo sentado no chão da sala.</p>
                <p>Hoje, ela volta.<br />Não pra te entreter.<br />Mas pra te lembrar de quem você era quando tudo era simples, divertido e mágico.</p>
              </div>

              <div className="my-8 p-4 bg-muted/50 rounded-lg border border-dashed border-accent/50 space-y-4 min-h-[100px] flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  {status === 'counting' && (
                    <motion.div
                      key="counting"
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      className="w-full"
                    >
                      <p className="text-lg font-semibold text-accent">
                         Você está na fila para acessar o PORTAL RETRÔ GAMES™
                      </p>
                      <div className='flex items-center justify-center gap-4 text-2xl font-pixel'>
                          <div className="loader"></div>
                          <span>Posição: <span className='text-primary text-glow'>{position}</span></span>
                      </div>
                    </motion.div>
                  )}
                  {status === 'releasing' && (
                    <motion.p
                      key="releasing"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-lg font-semibold text-accent"
                    >
                      Aguarde, estamos liberando o acesso...
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="text-lg text-foreground/90 space-y-3 prose prose-invert prose-p:my-2 mx-auto">
                <p>Enquanto o portal se abre, respira fundo...<br/>Deixa essa trilha invadir teu coração...</p>
                <p>Porque o próximo passo... é reviver tudo aquilo que você achou que tinha esquecido. 🍄</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="h-16 flex items-center justify-center pt-4">
            <AnimatePresence>
              {status === 'ready' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-full"
                >
                  <Button
                    onClick={handleEnterPortal}
                    className="btn-pixel-accent text-base md:text-lg px-6 py-4 md:px-8 md:py-5 animate-pulse-press w-full"
                  >
                    👉 ENTRAR NO PORTAL
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
