"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getDynamicPhrase } from '@/app/actions';
import { Dices } from 'lucide-react';

const TOPICS = ['SNES', 'PS1', 'arcades', 'Nintendo 64', 'Game Boy', 'SEGA Genesis'];
const FALLBACK_PHRASES = [
  'Lembra do primeiro cartucho que você soprou?',
  'Qual era seu herói no SNES?',
  'Aquele som de inicialização do PlayStation...',
  'Esperando a sua vez na locadora.',
  'Fase da água: amor ou ódio?',
];

export default function WaitingRoomPage() {
  const [position, setPosition] = useState(3127);
  const [progress, setProgress] = useState(0);
  const [phrase, setPhrase] = useState(FALLBACK_PHRASES[0]);
  const [showButton, setShowButton] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (position > 0) {
      const positionTimer = setInterval(() => {
        setPosition(prev => Math.max(0, prev - Math.floor(Math.random() * 50 + 20)));
      }, 300);
      return () => clearInterval(positionTimer);
    }
  }, [position]);

  useEffect(() => {
    if (progress < 100) {
      const progressTimer = setInterval(() => {
        setProgress(prev => Math.min(100, prev + 1));
      }, 150);
      return () => clearInterval(progressTimer);
    } else {
      setShowButton(true);
    }
  }, [progress]);

  async function fetchNewPhrase() {
    const randomTopic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
    const newPhrase = await getDynamicPhrase(randomTopic);
    setPhrase(newPhrase || FALLBACK_PHRASES[Math.floor(Math.random() * FALLBACK_PHRASES.length)]);
  }

  useEffect(() => {
    const phraseTimer = setInterval(fetchNewPhrase, 5000);
    return () => clearInterval(phraseTimer);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background dark:bg-gray-900 p-4">
      <Card className="w-full max-w-lg text-center shadow-2xl border-4 border-primary/20 bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="font-pixel text-2xl md:text-3xl text-primary text-glow">
            Portal Gamer do Passado™
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div>
            <p className="text-lg">Você entrou na fila para o acesso...</p>
            <p className="text-5xl font-bold font-pixel text-primary my-4">{position}</p>
            <p className="text-sm text-muted-foreground">Sua posição na fila</p>
          </div>
          <div className="space-y-2">
            <Progress value={progress} className="w-full h-4" />
            <p className="text-xs text-muted-foreground font-pixel">Carregando memórias...</p>
          </div>
          <div className="h-16 flex items-center justify-center p-4 bg-muted/50 rounded-md border">
            <AnimatePresence mode="wait">
              <motion.p
                key={phrase}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-foreground italic"
              >
                "{phrase}"
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="h-14">
            <AnimatePresence>
              {showButton && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                  }}
                >
                  <Link href="/quiz" className="btn-pixel-accent">
                    Entrar no Portal
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
