import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import Header from '@/components/app/header';

export default function ResultsPage() {
  return (
    <>
    <Header />
    <main className="container mx-auto px-4 py-8 flex-grow flex items-center">
      <div className="text-center w-full max-w-3xl mx-auto space-y-8">
        <div className="relative inline-block">
            <CheckCircle className="h-24 w-24 text-accent animate-pulse" />
        </div>
        
        <h2 
            className="text-5xl md:text-7xl font-pixel uppercase text-glow text-primary"
        >
            Memória Desbloqueada!
        </h2>
        
        <p className="text-xl md:text-2xl text-foreground">
            Você ainda tem o espírito gamer das antigas...
        </p>
        
        <div className="p-6 bg-card border rounded-lg shadow-inner max-w-2xl mx-auto">
            <p className="text-lg md:text-xl">
                Agora é hora de reviver tudo isso com mais de <span className="font-bold text-accent">100.000 jogos lendários</span>, compatíveis com PC, TV Box e celular.
            </p>
        </div>
        
        <Link href="/sales" className="btn-pixel-accent !text-lg !px-8 !py-4">
            Ver Plataforma Agora
        </Link>
      </div>
    </main>
    </>
  );
}
