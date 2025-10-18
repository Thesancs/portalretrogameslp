"use client";

import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Header from '@/components/app/header';
import { BadgeIcon, HeartIcon } from '@/components/app/pixel-art-icons';

const bonusImage = PlaceHolderImages.find(p => p.id === 'checkout-bonus')!;

export default function CheckoutPage() {
  const { toast } = useToast();

  const handlePurchase = () => {
    // In a real app, this would trigger payment processing
    toast({
      title: "Level Up!",
      description: "Compra finalizada com sucesso! Verifique seu e-mail para o acesso.",
    });
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-primary/30">
            <CardHeader className="text-center">
              <p className="font-pixel text-primary text-sm">ÚLTIMA FASE</p>
              <CardTitle className="text-3xl font-headline">Você está a um clique de reviver a maior era dos videogames.</CardTitle>
              <CardDescription>Não deixe essa chance passar igual aquele save corrompido.</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8">
              {/* Form Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">Informações de Pagamento</h3>
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input id="name" placeholder="Seu Nome Gamer" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" placeholder="Para receber seu acesso" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="card">Cartão de Crédito</Label>
                  <Input id="card" placeholder="**** **** **** ****" />
                </div>
                <div className="grid grid-cols-2 gap-4">
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

              {/* Summary Section */}
              <div className="space-y-6 bg-muted/50 p-6 rounded-lg border">
                <h3 className="text-xl font-semibold">Resumo do Pedido</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Acesso Vitalício - Retro Rewind</span>
                    <span className="font-bold">R$97,00</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>Descontos</span>
                    <span className="font-bold">-R$0,00</span>
                  </div>
                </div>
                <div className="border-t pt-4 mt-4 flex justify-between items-center font-bold text-xl">
                  <span>Total</span>
                  <span className="text-primary">R$97,00</span>
                </div>
                
                <div className="space-y-4 pt-4 border-t">
                    <h4 className="font-semibold text-center">Bônus Inclusos:</h4>
                    <div className="flex items-center gap-4 p-3 bg-background rounded">
                        <Image src={bonusImage.imageUrl} alt={bonusImage.description} data-ai-hint={bonusImage.imageHint} width={60} height={45} className="rounded" />
                        <div>
                            <p className="font-bold">Top 100 Jogos de Todos os Tempos</p>
                            <p className="text-xs text-muted-foreground">Lista curada e pronta para jogar.</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-4 text-sm text-accent">
                        <BadgeIcon className="h-5 w-5" />
                        <span>Garantia de 7 dias ou seu dinheiro de volta.</span>
                    </div>
                     <div className="flex items-center gap-4 text-sm text-accent">
                        <HeartIcon className="h-5 w-5" />
                        <span>Acesso imediato após a confirmação.</span>
                    </div>
                </div>

              </div>
            </CardContent>
            <div className="p-6 text-center">
                 <Button onClick={handlePurchase} size="lg" className="w-full md:w-auto btn-pixel-accent !text-lg">
                    Finalizar compra
                 </Button>
            </div>
          </Card>
        </div>
      </main>
    </>
  );
}
