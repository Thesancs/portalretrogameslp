"use client";

import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { BadgeIcon, HeartIcon } from '@/components/app/pixel-art-icons';

const bonusImage = PlaceHolderImages.find(image => image.id === 'checkout-bonus')!;

export default function CheckoutPage() {
  const { toast } = useToast();

  const handlePurchase = () => {
    toast({
      title: 'Level Up!',
      description: 'Compra finalizada com sucesso! Verifique seu e-mail para o acesso.',
    });
  };

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-160px)] flex-col justify-center px-4 py-12">
      <div className="retro-panel mx-auto w-full max-w-5xl p-6 sm:p-10">
        <div className="retro-panel-content space-y-10">
          <header className="text-center space-y-4">
            <span className="retro-badge">Ultima fase</span>
            <h1 className="text-3xl font-headline uppercase text-glow text-primary sm:text-4xl">
              Voce esta a um clique de reviver a maior era dos videogames
            </h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              Nao deixe essa chance passar como aquele save corrompido. Complete seus dados e receba o acesso imediato.
            </p>
          </header>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div className="space-y-6 rounded-3xl border border-primary/25 bg-background/80 p-6 text-sm text-muted-foreground backdrop-blur-xl">
              <h2 className="text-lg font-semibold text-primary">Informacoes de pagamento</h2>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input id="name" placeholder="Seu nome gamer" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" placeholder="Para receber seu acesso" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="card">Cartao de credito</Label>
                  <Input id="card" placeholder="**** **** **** ****" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Validade</Label>
                    <Input id="expiry" placeholder="MM/AA" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="***" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 rounded-3xl border border-primary/25 bg-secondary/40 p-6 text-sm text-muted-foreground backdrop-blur-xl">
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-primary">Resumo do pedido</h2>
                <div className="flex items-center justify-between text-base text-foreground">
                  <span>Acesso vitalicio  Portal Retro Games</span>
                  <span className="font-bold">R$ 19,90</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span>Descontos</span>
                  <span className="font-semibold">- R$ 0,00</span>
                </div>
                <div className="retro-divider" />
                <div className="flex items-center justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-primary text-glow">R$ 19,90</span>
                </div>
              </div>

              <div className="space-y-4 border-t border-primary/20 pt-4">
                <h3 className="text-center text-sm font-semibold text-primary">Bonus inclusos</h3>
                <div className="flex items-center gap-4 rounded-2xl border border-primary/25 bg-background/80 p-4">
                  <Image
                    src={bonusImage.imageUrl}
                    alt={bonusImage.description}
                    data-ai-hint={bonusImage.imageHint}
                    width={64}
                    height={48}
                    className="rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-semibold text-foreground">Top 100 Jogos de Todos os Tempos</p>
                    <p className="text-xs text-muted-foreground">Lista curada, testada e pronta para jogar.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-xs text-accent">
                  <BadgeIcon className="h-5 w-5" />
                  <span>Garantia de 7 dias ou seu dinheiro de volta.</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-xs text-accent">
                  <HeartIcon className="h-5 w-5" />
                  <span>Acesso imediato apos a confirmacao.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 text-center">
            <Button onClick={handlePurchase} size="lg" className="btn-pixel-accent !px-12 !py-5 !text-lg">
              Finalizar compra
            </Button>
            <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
              Checkout seguro  Suporte humano  Entrega imediata
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
