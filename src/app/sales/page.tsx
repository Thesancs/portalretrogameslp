import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { ControllerIcon, ConsoleIcon, JoystickIcon } from '@/components/app/pixel-art-icons';

const gameplayImages = PlaceHolderImages.filter(p => p.id.startsWith('sales-gameplay'));

const features = [
  { text: "+100.000 jogos clássicos", icon: ControllerIcon },
  { text: "52 consoles retrô em 1", icon: ConsoleIcon },
  { text: "Acesso vitalício, sem mensalidade", icon: JoystickIcon },
  { text: "Compatível com PC, TV, e mais", icon: Check },
];

export default function SalesPage() {
  return (
    
      <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-128px)]">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Storytelling Section */}
          <section className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">
              Você lembra do barulho do controle, do cheiro da locadora, da emoção de zerar um jogo sem salvar?
            </h2>
            <p className="text-lg text-muted-foreground">
              Essa era não acabou. Ela apenas estava esperando por você.
            </p>
          </section>

          {/* Gameplay Gallery */}
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {gameplayImages.map((img, index) => (
                <div key={img.id} className="overflow-hidden rounded-lg border-4 border-secondary hover:border-primary transition-all duration-300 shadow-lg">
                  <Image
                    src={img.imageUrl}
                    alt={img.description}
                    data-ai-hint={img.imageHint}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Offer Section */}
          <section>
            <Card className="shadow-2xl border-4 border-primary/50">
              <CardHeader className="text-center">
                <p className="font-pixel text-accent">A OFERTA DEFINITIVA</p>
                <CardTitle className="text-4xl font-headline">Acesso Imediato à Nostalgia</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-muted/50 rounded-md">
                      <feature.icon className="h-8 w-8 text-primary" />
                      <span className="font-medium">{feature.text}</span>
                    </div>
                  ))}
                </div>
                <div className="text-center space-y-4 pt-6">
                  <p className="text-2xl font-bold">Tudo isso por um pagamento único de</p>
                  <p className="font-pixel text-5xl md:text-6xl text-primary text-glow">R$19,90</p>
                  <p className="text-muted-foreground">Por menos que um lanche, você revive uma vida inteira de memórias.</p>
                </div>
                <div className="text-center pt-4">
                  <Link href="/checkout" className="btn-pixel !text-xl !px-10 !py-5">
                    Quero Reviver Agora
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    
  );
}
