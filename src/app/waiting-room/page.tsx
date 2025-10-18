"use client";

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getDynamicPhrase } from '@/app/actions';
import Header from '@/components/app/header';

const nostalgicTopics = ["SNES", "PS1", "arcade", "N64", "Game Boy"];

export default function WaitingRoomPage() {
  const [position, setPosition] = useState(406);
  const [progress, setProgress] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState("Carregando memórias...");
  const router = useRouter();

  const phrases = useMemo(() => [
    "Collecting stars, racing karts, and saving princesses in glorious 64-bit.",
    "Blowing into cartridges to make them work... the original bug fix.",
    "Remember the sound of a dial-up modem? That's how we did online gaming.",
    "The satisfaction of a perfect combo in Street Fighter II.",
    "Spending hours in a video rental store choosing the weekend's game."
  ], []);

  useEffect(() => {
    const fetchPhrase = async () => {
      const randomTopic = nostalgicTopics[Math.floor(Math.random() * nostalgicTopics.length)];
      try {
        const phrase = await getDynamicPhrase(randomTopic);
        setCurrentPhrase(phrase);
      } catch (error) {
        // Fallback to a random phrase from the static list
        const randomIndex = Math.floor(Math.random() * phrases.length);
        setCurrentPhrase(phrases[randomIndex]);
      }
    };

    fetchPhrase();

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const next = prev + (100 / 15) / (1000 / 100);
        if (next >= 100) {
          clearInterval(progressInterval);
          router.push('/quiz');
          return 100;
        }
        return next;
      });
    }, 100);
    
    const positionInterval = setInterval(() => {
      setPosition(prev => (prev > 1 ? prev - Math.floor(Math.random() * 5 + 1) : 1));
    }, 500);

    const phraseInterval = setInterval(fetchPhrase, 5000);

    // Countdown to redirect
    const redirectTimeout = setTimeout(() => {
      router.push('/quiz');
    }, 15000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(positionInterval);
      clearInterval(phraseInterval);
      clearTimeout(redirectTimeout);
    };
  }, [router, phrases]);

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <Card className="w-full max-w-lg text-center shadow-2xl border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Você entrou na fila para o acesso...</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="relative">
              <div className="font-pixel text-7xl text-glow text-primary">{position}</div>
              <p className="text-muted-foreground -mt-2">Sua posição na fila</p>
            </div>
            
            <div className="space-y-2">
                <Progress value={progress} className="w-full h-4" />
            </div>

            <div className="h-12 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentPhrase}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-lg italic text-accent"
                >
                  "{currentPhrase}"
                </motion.p>
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
