
"use client";

import { useState, useEffect, useCallback, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from '@/components/ui/alert-dialog';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { SoundContext } from '@/context/sound-context';
import { Home, Users, Video } from 'lucide-react';

const quizImage = PlaceHolderImages.find(p => p.id === 'quiz-game-scene')!;
const snesImage = PlaceHolderImages.find(p => p.id === 'console-snes')!;
const ps1Image = PlaceHolderImages.find(p => p.id === 'console-ps1')!;
const n64Image = PlaceHolderImages.find(p => p.id === 'console-n64')!;
const megaDriveImage = PlaceHolderImages.find(p => p.id === 'console-megadrive')!;

function ArcadeIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <rect x="2" y="6" width="20" height="16" rx="2" />
            <rect x="6" y="10" width="12" height="6" />
            <path d="M12 10V6" />
            <path d="M10 6h4" />
            <path d="M8 18h2" />
            <path d="M14 18h2" />
        </svg>
    )
}

const quizSteps = [
  {
    question: "Você lembra desse momento?",
    type: "image",
    options: ["Sim, com certeza!", "Acho que não...", "Talvez..."]
  },
  {
    question: "Qual foi seu primeiro console?",
    type: "console-select",
    options: [
      { label: "Super Nintendo", image: snesImage },
      { label: "PlayStation 1", image: ps1Image },
      { label: "Nintendo 64", image: n64Image },
      { label: "Mega Drive", image: megaDriveImage },
      { label: "Outro" }
    ]
  },
  {
    question: "Onde você mais jogava?",
    type: "radio",
    options: [
      { label: "Em casa, no meu console", icon: Home },
      { label: "Na casa de um amigo ou vizinho", icon: Users },
      { label: "Em uma locadora", icon: Video },
      { label: "Fliperamas/Arcades", icon: ArcadeIcon }
    ]
  },
  {
    question: "O que mais te deixava na pilha?",
    type: "radio",
    options: [
        { label: "Finalmente zerar o jogo" },
        { label: "Descobrir um segredo/easter egg" },
        { label: "Jogar multiplayer com amigos" },
        { label: "Superar um chefe impossível" }
    ]
  },
  {
    question: "Com quem você gostaria de reviver esses momentos?",
    type: "radio",
    options: [
        { label: "Sozinho, no meu ritmo" },
        { label: "Com amigos da antiga" },
        { label: "Com minha família/parceiro(a)" },
        { label: "Com a comunidade online" }
    ]
  }
];

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(quizSteps.length).fill(''));
  const [score, setScore] = useState(0);
  const [animatingOption, setAnimatingOption] = useState<string | null>(null);
  const [isBonusModalOpen, setIsBonusModalOpen] = useState(false);
  const router = useRouter();
  const soundContext = useContext(SoundContext);

  useEffect(() => {
    soundContext?.initializeAudio();
  }, [soundContext]);
  
  const handleNext = () => {
    if (step < quizSteps.length - 1) {
      setStep(step + 1);
    } else {
      router.push(`/results?score=${score}`);
    }
     setAnimatingOption(null);
  };
  
  const closeBonusModalAndContinue = () => {
    setIsBonusModalOpen(false);
    handleNext();
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setAnimatingOption(null);
    }
  };
  
  const setAnswer = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  }

  const handleAnswerSelection = (value: string) => {
    if (animatingOption) return;
    
    if (answers[step] === '') {
        const randomPoints = Math.floor(Math.random() * (30 - 15 + 1)) + 15;
        setScore(prevScore => prevScore + randomPoints);
        soundContext?.playSound('coin');
    }

    if (step === 0) {
      soundContext?.playSound('quiz_music');
    }

    setAnswer(step, value);
    setAnimatingOption(value);

    // Show bonus popup after 3rd question (index 2)
    if (step === 2) {
      setTimeout(() => {
        setIsBonusModalOpen(true);
      }, 400); // Small delay for effect
      return;
    }

    // Animation sequence
    setTimeout(() => {
      handleNext();
    }, 1200); 
  };
  
  const currentStep = quizSteps[step];
  const progressPercentage = ((step + 1) / quizSteps.length) * 100;

  return (
    
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-128px)]">
       <div className="mb-6 font-pixel text-lg text-primary text-glow text-center">
            Score: {score}
        </div>
      <Card className={cn("w-full max-w-2xl overflow-hidden", { "animate-flash-red": !!animatingOption && !isBonusModalOpen })}>
        <CardHeader className="text-center relative">
          
          <p className="font-pixel text-primary text-sm">QUIZ NOSTÁLGICO</p>
          <CardTitle className="text-2xl md:text-3xl font-bold">
            {currentStep.question}
          </CardTitle>
          <CardDescription>Responda para desbloquear suas memórias.</CardDescription>
        </CardHeader>
        <div className="px-6">
            <Progress value={progressPercentage} className="w-full h-2" />
        </div>
        <CardContent className="p-6 min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <div className="space-y-4">
                {currentStep.type === 'image' && (
                  <div className="flex flex-col items-center space-y-4">
                    <Image
                      src={quizImage.imageUrl}
                      alt={quizImage.description}
                      data-ai-hint={quizImage.imageHint}
                      width={400}
                      height={267}
                      className="rounded-md border-4 border-secondary shadow-lg"
                    />
                    <RadioGroup onValueChange={handleAnswerSelection} value={answers[step]} className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 w-full">
                      {currentStep.options?.map(opt => {
                        const optionLabel = typeof opt === 'string' ? opt : (opt as {label: string}).label;
                        return (
                           <Label 
                            key={optionLabel} 
                            htmlFor={optionLabel} 
                            className={cn(
                              "btn-pixel !font-body !text-lg !font-bold !normal-case tracking-normal text-center justify-center",
                              {
                                "!bg-primary !text-primary-foreground !translate-y-0 !shadow-[inset_-2px_-2px_0px_0px_hsl(var(--foreground)_/_0.2)]": answers[step] === optionLabel
                              }
                            )}
                          >
                            <RadioGroupItem value={optionLabel} id={optionLabel} className="sr-only" onClick={() => handleAnswerSelection(optionLabel)} />
                            <span>{optionLabel}</span>
                           </Label>
                        )
                      })}
                    </RadioGroup>
                  </div>
                )}
                {currentStep.type === 'console-select' && (
                  <RadioGroup onValueChange={handleAnswerSelection} value={answers[step]} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentStep.options?.map((opt: any) => (
                      <Label 
                        key={opt.label} 
                        htmlFor={opt.label} 
                        className={cn(
                          "flex flex-col items-center justify-center p-2 border rounded-md cursor-pointer transition-all duration-300 hover:bg-muted/50 text-lg font-bold",
                          {
                            "bg-primary text-primary-foreground border-primary": answers[step] === opt.label,
                          }
                        )}
                      >
                        <RadioGroupItem value={opt.label} id={opt.label} className="sr-only" onClick={() => handleAnswerSelection(opt.label)} />
                        {opt.image && (
                          <Image
                            src={opt.image.imageUrl}
                            alt={opt.image.description}
                            data-ai-hint={opt.image.imageHint}
                            width={200}
                            height={150}
                            className={cn("rounded-md mb-2", opt.label === 'Mega Drive' || opt.label === 'PlayStation 1' ? 'object-contain' : 'object-cover', "aspect-[4/3]")}
                          />
                        )}
                        <span className="font-semibold">{opt.label}</span>
                      </Label>
                    ))}
                  </RadioGroup>
                )}
                {currentStep.type === 'radio' && (
                  <RadioGroup onValueChange={handleAnswerSelection} value={answers[step]} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentStep.options?.map(opt => {
                        const optionLabel = typeof opt === 'string' ? opt : (opt as {label: string}).label;
                        const Icon = (opt as {icon?: React.ComponentType<any>}).icon;

                        return (
                           <Label 
                            key={optionLabel} 
                            htmlFor={optionLabel} 
                            className={cn(
                               "btn-pixel !font-body !text-lg !font-bold !normal-case tracking-normal !flex !items-center !justify-center !h-24",
                               {
                                   "!bg-primary !text-primary-foreground !translate-y-0 !shadow-[inset_-2px_-2px_0px_0px_hsl(var(--foreground)_/_0.2)]": answers[step] === optionLabel
                               }
                            )}
                           >
                             <RadioGroupItem value={optionLabel} id={optionLabel} className="sr-only" onClick={() => handleAnswerSelection(optionLabel)} />
                              <div className="flex flex-col items-center justify-center">
                                {Icon && <Icon className="h-6 w-6 mb-2" />}
                                <span className="text-center">{optionLabel}</span>
                              </div>
                           </Label>
                        )
                    })}
                  </RadioGroup>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-between bg-muted/50 p-4">
          <Button variant="outline" onClick={handleBack} disabled={step === 0}>
            Voltar
          </Button>
          <div className='w-24 text-right'>
             {step === quizSteps.length - 1 && (
                <Button onClick={handleNext} disabled={!answers[step]}>
                    Ver Resultado
                </Button>
            )}
          </div>
        </CardFooter>
      </Card>
      
      <AlertDialog open={isBonusModalOpen} onOpenChange={setIsBonusModalOpen}>
        <AlertDialogContent className="bg-background/80 backdrop-blur-md border-accent/50 shadow-lg shadow-accent/20">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-pixel text-accent text-glow text-center">🎉 Parabéns, você liberou um bônus!</AlertDialogTitle>
            <AlertDialogDescription className="text-center text-lg text-foreground/90 pt-4">
              Todos os jogos de PS2, PS1, Xbox 360, e Xbox foram desbloqueados!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="!justify-center pt-4">
            <AlertDialogAction onClick={closeBonusModalAndContinue} className="btn-pixel-accent">Ok</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      </div>
    
  );
}
