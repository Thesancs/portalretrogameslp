
"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Trophy } from 'lucide-react';
import { Suspense } from 'react';

function ResultsContent() {
  const searchParams = useSearchParams();
  const score = searchParams.get('score');

  return (
    <div className="container mx-auto px-4 py-8 flex-grow flex items-center min-h-[calc(100vh-128px)]">
      <div className="text-center w-full max-w-3xl mx-auto space-y-8">
        <div className="relative inline-block">
            <CheckCircle className="h-24 w-24 text-accent animate-pulse" />
        </div>
        
        <h2 
            className="text-4xl sm:text-5xl md:text-6xl font-pixel uppercase text-glow text-primary"
        >
            Memória Desbloqueada!
        </h2>
        
        <p className="text-xl md:text-2xl text-foreground">
            Você ainda tem o espírito gamer das antigas...
        </p>

        {score && (
          <div className="p-4 bg-card border-2 border-dashed border-accent rounded-lg shadow-inner max-w-md mx-auto flex items-center justify-center gap-4">
            <Trophy className="h-8 w-8 text-accent" />
            <p className="text-xl md:text-2xl font-bold">
              Pontuação Total: <span className="font-pixel text-accent text-glow">{score}</span>
            </p>
          </div>
        )}
        
        <div className="p-6 bg-card border rounded-lg shadow-inner max-w-2xl mx-auto">
            <p className="text-lg md:text-xl">
                Agora é hora de reviver tudo isso com mais de <span className="font-bold text-accent">100.000 jogos lendários</span>, compatíveis com PC, TV Box e celular.
            </p>
        </div>
        
        <Link href="/sales" className="btn-pixel-accent !text-lg !px-8 !py-4">
            Ver Plataforma Agora
        </Link>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultsContent />
    </Suspense>
  );
}
