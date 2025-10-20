
"use client";

import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SoundContext } from '@/context/sound-context';

export default function WaitingRoomPage() {
  const [position, setPosition] = useState(3127);
  const [showButton, setShowButton] = useState(false);
  const router = useRouter();
  const soundContext = useContext(SoundContext);

  useEffect(() => {
    if (soundContext && !soundContext.isSoundOn) {
      soundContext.playSound();
    }

    const startValue = 3127;
    const duration = 5000; // 5 seconds
    const intervalTime = 50; // update every 50ms
    const steps = duration / intervalTime;
    const decrement = startValue / steps;

    const positionInterval = setInterval(() => {
      setPosition(prev => {
        const newPosition = prev - decrement;
        if (newPosition <= 0) {
          clearInterval(positionInterval);
          setShowButton(true);
          return 0;
        }
        return Math.floor(newPosition);
      });
    }, intervalTime);

    return () => {
      clearInterval(positionInterval);
    };
  }, [soundContext]);

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
              <h2 className="text-2xl md:text-3xl font-headline text-primary text-glow mb-4">
                🍄✨ "A Jornada Começa..."
              </h2>

              <div className="text-lg text-foreground/90 space-y-3 prose prose-invert prose-p:my-2 mx-auto">
                <p>🎵 Você lembra disso, né?</p>
                <p>Esse som... essa melodia...<br />Já fez você sorrir.<br />Já te teleportou pra outro mundo, mesmo sentado no chão da sala.</p>
                <p>Hoje, ela volta.<br />Não pra te entreter.<br />Mas pra te lembrar de quem você era quando tudo era simples, divertido e mágico.</p>
              </div>

              <div className="my-8 p-4 bg-muted/50 rounded-lg border border-dashed border-accent/50 space-y-4">
                <p className="text-lg font-semibold text-accent">
                  🟨 Você está na fila para acessar o Portal Gamer do Passado™
                </p>
                <div className='flex items-center justify-center gap-4 text-2xl font-pixel'>
                    <div className="loader"></div>
                    <span>Posição: <span className='text-primary text-glow'>{position}</span></span>
                </div>
              </div>

              <div className="text-lg text-foreground/90 space-y-3 prose prose-invert prose-p:my-2 mx-auto">
                <p>Enquanto o portal se abre, respira fundo...<br/>Deixa essa trilha invadir teu coração...</p>
                <p>Porque o próximo passo... é reviver tudo aquilo que você achou que tinha esquecido. 🍄</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="h-16 flex items-center justify-center pt-4">
            <AnimatePresence>
              {showButton && (
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
