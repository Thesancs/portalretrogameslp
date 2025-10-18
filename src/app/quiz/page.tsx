"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Header from '@/components/app/header';

const quizImage = PlaceHolderImages.find(p => p.id === 'quiz-game-scene')!;

const quizSteps = [
  {
    question: "Você lembra desse momento?",
    type: "image",
    options: ["Sim, com certeza!", "Acho que não...", "Talvez..."]
  },
  {
    question: "Qual foi seu primeiro console?",
    type: "radio",
    options: ["Super Nintendo", "PlayStation 1", "Nintendo 64", "Mega Drive", "Outro"]
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

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(quizSteps.length).fill(''));
  const router = useRouter();

  const handleNext = () => {
    if (step < quizSteps.length - 1) {
      setStep(step + 1);
    } else {
      // Submit logic here
      router.push('/results');
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };
  
  const setAnswer = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  }

  const handleAnswerSelection = (value: string) => {
    setAnswer(step, value);
    // Automatically move to the next question after a short delay
    // to allow the user to see their selection.
    setTimeout(() => {
      handleNext();
    }, 300);
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
    <Header />
    <main className="container mx-auto px-4 py-8 flex items-center justify-center">
      <Card className="w-full max-w-2xl overflow-hidden">
        <CardHeader className="text-center">
          <p className="font-pixel text-primary text-sm">QUIZ NOSTÁLGICO</p>
          <CardTitle className="text-2xl md:text-3xl font-bold">
            YOU STILL GOT THE GAMER BLOOD?
          </CardTitle>
          <CardDescription>Responda para desbloquear suas memórias.</CardDescription>
        </CardHeader>
        <div className="px-6">
            <Progress value={progressPercentage} className="w-full h-2" />
        </div>
        <CardContent className="p-6 min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-6 text-center">{currentStep.question}</h3>
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
                      {currentStep.options?.map(opt => (
                        <Label key={opt} htmlFor={opt} className="flex items-center justify-center p-4 border rounded-md cursor-pointer hover:bg-muted/50 has-[:checked]:bg-primary has-[:checked]:text-primary-foreground has-[:checked]:border-primary">
                          <RadioGroupItem value={opt} id={opt} className="sr-only" />
                          <span>{opt}</span>
                        </Label>
                      ))}
                    </RadioGroup>
                  </div>
                )}
                {currentStep.type === 'radio' && (
                  <RadioGroup onValueChange={handleAnswerSelection} value={answers[step]} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentStep.options?.map(opt => (
                       <Label key={opt} htmlFor={opt} className="flex items-center space-x-3 p-4 border rounded-md cursor-pointer hover:bg-muted/50 has-[:checked]:bg-primary has-[:checked]:text-primary-foreground has-[:checked]:border-primary">
                         <RadioGroupItem value={opt} id={opt} />
                         <span>{opt}</span>
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
