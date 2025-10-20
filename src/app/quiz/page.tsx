
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
import { PlaceHolderImages } from '@/lib/placeholder-images';
import * as Tone from 'tone';
import { SoundContext } from '@/context/sound-context';

const quizImage = PlaceHolderImages.find(p => p.id === 'quiz-game-scene')!;
const snesImage = PlaceHolderImages.find(p => p.id === 'console-snes')!;
const ps1Image = PlaceHolderImages.find(p => p.id === 'console-ps1')!;
const n64Image = PlaceHolderImages.find(p => p.id === 'console-n64')!;
const megaDriveImage = PlaceHolderImages.find(p => p.id === 'console-megadrive')!;

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
    options: ["Em casa, no meu console", "Na casa de um amigo ou vizinho", "Em uma locadora", "Fliperamas/Arcades"]
  },
  {
    question: "O que mais te deixava na pilha?",
    type: "radio",
    options: ["Finalmente zerar o jogo", "Descobrir um segredo/easter egg", "Jogar multiplayer com amigos", "Superar um chefe impossível"]
  },
  {
    question: "Com quem você gostaria de reviver esses momentos?",
    type: "radio",
    options: ["Sozinho, no meu ritmo", "Com amigos da antiga", "Com minha família/parceiro(a)", "Com a comunidade online"]
  }
];

let selectionSynth: Tone.Synth;

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(quizSteps.length).fill(''));
  const [animatingOption, setAnimatingOption] = useState<string | null>(null);
  const [isAudioInitialized, setIsAudioInitialized] = useState(false);
  const router = useRouter();
  const soundContext = useContext(SoundContext);

  const initializeQuizAudio = useCallback(async () => {
    if (isAudioInitialized) return;
    
    // Tone.start might already be called by the global context
    if (soundContext && !soundContext.isInitialized) {
      await Tone.start();
    }
    
    selectionSynth = new Tone.Synth({
      oscillator: {
        type: 'sine',
      },
      envelope: {
        attack: 0.01,
        decay: 0.2,
        sustain: 0.1,
        release: 0.2,
      },
    }).toDestination();
    
    setIsAudioInitialized(true);
  }, [isAudioInitialized, soundContext]);

  useEffect(() => {
    initializeQuizAudio();

    return () => {
      selectionSynth?.dispose();
    };
  }, [initializeQuizAudio]);

  const handleNext = () => {
    if (step < quizSteps.length - 1) {
      setStep(step + 1);
    } else {
      router.push('/results');
    }
     setAnimatingOption(null);
  };

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
    if (animatingOption) return; // Prevent clicking while animating
    
    if (soundContext?.isSoundOn && isAudioInitialized && selectionSynth) {
      selectionSynth.triggerAttackRelease('C5', '16n');
    }

    setAnswer(step, value);
    setAnimatingOption(value);

    // Animation sequence
    // 1. Flash red animation (1.2s total for 3 flashes)
    setTimeout(() => {
      // 2. Go to next question after animation
      handleNext();
    }, 1200); 
  };
  
  const handleTextAnswerAndNext = (e: React.FormEvent) => {
    e.preventDefault();
    if(answers[step]) {
        handleNext();
    }
  }

  const currentStep = quizSteps[step];
  const progressPercentage = ((step + 1) / quizSteps.length) * 100;

  return (
    <>
    <main className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-128px)]">
      <Card className={cn("w-full max-w-2xl overflow-hidden", { "animate-flash-red": !!animatingOption })}>
        <CardHeader className="text-center">
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
                        return (
                           <Label 
                            key={opt as string} 
                            htmlFor={opt as string} 
                            className={cn(
                              "btn-pixel !font-body !text-base !font-normal !normal-case tracking-normal text-center justify-center",
                              {
                                "!bg-primary !text-primary-foreground !translate-y-0 !shadow-[inset_-2px_-2px_0px_0px_hsl(var(--foreground)_/_0.2)]": answers[step] === opt
                              }
                            )}
                          >
                            <RadioGroupItem value={opt as string} id={opt as string} className="sr-only" onClick={() => handleAnswerSelection(opt as string)} />
                            <span>{opt as string}</span>
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
                          "flex flex-col items-center justify-center p-2 border rounded-md cursor-pointer transition-all duration-300 hover:bg-muted/50",
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
                            className="rounded-md object-cover aspect-[4/3] mb-2"
                          />
                        )}
                        <span className="font-semibold">{opt.label}</span>
                      </Label>
                    ))}
                  </RadioGroup>
                )}
                {currentStep.type === 'radio' && (
                  <RadioGroup onValueChange={handleAnswerSelection} value={answers[step]} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentStep.options?.map(opt => (
                       <Label 
                        key={opt as string} 
                        htmlFor={opt as string} 
                        className={cn(
                           "btn-pixel !font-body !text-sm !font-normal !normal-case tracking-normal text-center justify-center",
                           {
                                "!bg-primary !text-primary-foreground !translate-y-0 !shadow-[inset_-2px_-2px_0px_0px_hsl(var(--foreground)_/_0.2)]": answers[step] === opt
                           }
                        )}
                       >
                         <RadioGroupItem value={opt as string} id={opt as string} className="sr-only" onClick={() => handleAnswerSelection(opt as string)} />
                         <span>{opt as string}</span>
                       </Label>
                    ))}
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
      </main>
    </>
  );
}
