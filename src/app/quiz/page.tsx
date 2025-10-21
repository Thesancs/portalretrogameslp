"use client";

import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { SoundContext } from '@/context/sound-context';
import { Home, Users, Video } from 'lucide-react';

const quizImage = PlaceHolderImages.find(image => image.id === 'quiz-game-scene')!;
const snesImage = PlaceHolderImages.find(image => image.id === 'console-snes')!;
const ps1Image = PlaceHolderImages.find(image => image.id === 'console-ps1')!;
const n64Image = PlaceHolderImages.find(image => image.id === 'console-n64')!;
const megaDriveImage = PlaceHolderImages.find(image => image.id === 'console-megadrive')!;

function ArcadeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="6" width="20" height="16" rx="2" />
      <rect x="6" y="10" width="12" height="6" />
      <path d="M12 10V6" />
      <path d="M10 6h4" />
      <path d="M8 18h2" />
      <path d="M14 18h2" />
    </svg>
  );
}

const quizSteps = [
  {
    question: 'Voce lembra desse momento?',
    type: 'image',
    options: ['Sim, com certeza!', 'Acho que nao...', 'Talvez...'],
  },
  {
    question: 'Qual foi seu primeiro console?',
    type: 'console-select',
    options: [
      { label: 'Super Nintendo', image: snesImage },
      { label: 'PlayStation 1', image: ps1Image },
      { label: 'Nintendo 64', image: n64Image },
      { label: 'Mega Drive', image: megaDriveImage },
      { label: 'Outro' },
    ],
  },
  {
    question: 'Onde voce mais jogava?',
    type: 'radio',
    options: [
      { label: 'Em casa, no meu console', icon: Home },
      { label: 'Na casa de um amigo ou vizinho', icon: Users },
      { label: 'Em uma locadora', icon: Video },
      { label: 'Fliperamas/Arcades', icon: ArcadeIcon },
    ],
  },
  {
    question: 'O que mais te deixava na pilha?',
    type: 'radio',
    options: [
      { label: 'Finalmente zerar o jogo' },
      { label: 'Descobrir um segredo/easter egg' },
      { label: 'Jogar multiplayer com amigos' },
      { label: 'Superar um chefe impossivel' },
    ],
  },
  {
    question: 'Com quem voce gostaria de reviver esses momentos?',
    type: 'radio',
    options: [
      { label: 'Sozinho, no meu ritmo' },
      { label: 'Com amigos da antiga' },
      { label: 'Com minha familia/parceiro(a)' },
      { label: 'Com a comunidade online' },
    ],
  },
] as const;

const totalSteps = quizSteps.length;

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(totalSteps).fill(''));
  const [score, setScore] = useState(0);
  const [animatingOption, setAnimatingOption] = useState<string | null>(null);
  const [isBonusModalOpen, setIsBonusModalOpen] = useState(false);
  const router = useRouter();
  const soundContext = useContext(SoundContext);

  useEffect(() => {
    soundContext?.initializeAudio();
  }, [soundContext]);

  useEffect(() => {
    if (!soundContext) return;
    soundContext.playSound('quiz_start');
    return () => {
      soundContext.stopSound('quiz_start');
    };
  }, [soundContext]);

  const safeStep = totalSteps === 0 ? 0 : Math.max(0, Math.min(step, totalSteps - 1));
  const currentStep = quizSteps[safeStep];

  const handleNext = () => {
    if (safeStep < totalSteps - 1) {
      setStep(prev => Math.min(prev + 1, totalSteps - 1));
    } else {
      router.push(`/results?score=${score}`);
    }
    setAnimatingOption(null);
  };

  const closeBonusModalAndContinue = () => {
    setIsBonusModalOpen(false);
    handleNext();
  };

  const handleBack = () => {
    if (safeStep > 0) {
      setStep(prev => Math.max(prev - 1, 0));
      setAnimatingOption(null);
    }
  };

  const setAnswer = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleAnswerSelection = (value: string) => {
    if (animatingOption || !currentStep) return;

    if (!answers[safeStep]) {
      const randomPoints = Math.floor(Math.random() * (30 - 15 + 1)) + 15;
      setScore(prevScore => prevScore + randomPoints);
      soundContext?.playSound('coin');
    }

    if (safeStep === 0) {
      soundContext?.playSound('quiz_music');
    }

    setAnswer(safeStep, value);
    setAnimatingOption(value);

    if (safeStep === 2) {
      setTimeout(() => {
        setIsBonusModalOpen(true);
      }, 400);
      return;
    }

    setTimeout(() => {
      handleNext();
    }, 1200);
  };

  const progressPercentage =
    totalSteps === 0 ? 0 : ((safeStep + 1) / totalSteps) * 100;

  const renderStepOptions = () => {
    if (!currentStep) {
      return null;
    }

    if (currentStep.type === 'image') {
      return (
        <div className="space-y-6">
          <div className="overflow-hidden rounded-3xl border border-primary/25 bg-secondary/40 p-4 text-center shadow-[0_25px_55px_rgba(0,0,0,0.45)]">
            <Image
              src={quizImage.imageUrl}
              alt={quizImage.description}
              data-ai-hint={quizImage.imageHint}
              width={420}
              height={280}
              className="mx-auto rounded-2xl border border-primary/20 object-cover"
            />
          </div>
          <RadioGroup
            onValueChange={handleAnswerSelection}
            value={answers[safeStep]}
            className="grid gap-4 sm:grid-cols-3"
          >
            {currentStep.options?.map(option => (
              <Label
                key={option}
                htmlFor={option}
                className={cn(
                  'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-transparent bg-secondary/50 px-4 py-5 text-center font-semibold uppercase tracking-[0.2em] transition hover:border-primary/50 hover:bg-secondary/80',
                  answers[safeStep] === option && 'border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/40',
                )}
              >
                <RadioGroupItem
                  value={option}
                  id={option}
                  className="sr-only"
                  onClick={() => handleAnswerSelection(option)}
                />
                <span>{option}</span>
              </Label>
            ))}
          </RadioGroup>
        </div>
      );
    }

    if (currentStep.type === 'console-select') {
      return (
        <RadioGroup
          onValueChange={handleAnswerSelection}
          value={answers[safeStep]}
          className="grid gap-4 md:grid-cols-2"
        >
          {currentStep.options?.map(option => (
            <Label
              key={option.label}
              htmlFor={option.label}
              className={cn(
                'group flex cursor-pointer flex-col items-center gap-4 rounded-3xl border border-primary/20 bg-background/70 p-5 text-center transition hover:border-primary/50 hover:bg-background/90',
                answers[safeStep] === option.label && 'border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/40',
              )}
            >
              <RadioGroupItem
                value={option.label}
                id={option.label}
                className="sr-only"
                onClick={() => handleAnswerSelection(option.label)}
              />
              {option.image && (
                <Image
                  src={option.image.imageUrl}
                  alt={option.image.description}
                  data-ai-hint={option.image.imageHint}
                  width={220}
                  height={160}
                  className="h-40 w-full rounded-2xl border border-primary/20 bg-black/30 object-contain p-4"
                />
              )}
              <span className="font-semibold uppercase tracking-[0.3em]">{option.label}</span>
            </Label>
          ))}
        </RadioGroup>
      );
    }

    return (
      <RadioGroup
        onValueChange={handleAnswerSelection}
        value={answers[safeStep]}
        className="grid gap-4 md:grid-cols-2"
      >
        {currentStep.options?.map(option => {
          const optionLabel = typeof option === 'string' ? option : option.label;
          const Icon = typeof option === 'string' ? undefined : option.icon;

          return (
            <Label
              key={optionLabel}
              htmlFor={optionLabel}
              className={cn(
                'flex cursor-pointer items-center justify-between gap-4 rounded-3xl border border-primary/25 bg-secondary/40 px-5 py-4 text-left transition hover:border-primary/60 hover:bg-secondary/60',
                answers[safeStep] === optionLabel && 'border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/45',
              )}
            >
              <RadioGroupItem
                value={optionLabel}
                id={optionLabel}
                className="sr-only"
                onClick={() => handleAnswerSelection(optionLabel)}
              />
              <div className="flex w-full items-center gap-4">
                {Icon && (
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/40 bg-background/60">
                    <Icon className="h-6 w-6 text-primary" />
                  </span>
                )}
                <span className="font-semibold">{optionLabel}</span>
              </div>
            </Label>
          );
        })}
      </RadioGroup>
    );
  };

  return (
    <>
      <div className="container mx-auto flex min-h-[calc(100vh-160px)] flex-col justify-center px-4 py-12">
        <div
          className={cn(
            'retro-panel w-full max-w-6xl p-6 sm:p-10',
            animatingOption && !isBonusModalOpen && 'animate-flash-red',
          )}
        >
          <div className="retro-panel-content space-y-10">
            <header className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)]">
              <div className="space-y-4">
                <span className="retro-badge">Fase {safeStep + 1} de {totalSteps}</span>
                <h1 className="text-3xl font-headline uppercase text-glow sm:text-4xl">
                  Quiz Nostalgico Portal Retro Games
                </h1>
                <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
                  Responda como se estivesse de volta aos anos que moldaram sua paixao por videogames.
                  Cada escolha desbloqueia memorias e aumenta seu score nostalgico.
                </p>
              </div>

              <div className="rounded-3xl border border-primary/30 bg-background/70 p-6 text-sm text-muted-foreground backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.35em] text-primary">Seu score atual</p>
                <p className="mt-3 font-pixel text-4xl text-primary text-glow">{score}</p>
                <div className="retro-divider my-4" />
                <p>
                  Avance ate o fim para descobrir o nivel da sua nostalgia e liberar acesso as colecoes
                  secretas do portal.
                </p>
              </div>
            </header>

            <div className="space-y-3">
              <Progress
                value={progressPercentage}
                className="h-3 overflow-hidden rounded-full border border-primary/20 bg-secondary/60"
              />
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
                <span>Inicio</span>
                <span>Questao {safeStep + 1}/{totalSteps}</span>
                <span>Resultado</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={safeStep}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                <div className="rounded-3xl border border-primary/25 bg-background/70 p-6 backdrop-blur-xl">
                  <span className="text-xs uppercase tracking-[0.35em] text-primary">Questao {safeStep + 1}</span>
                  <h2 className="mt-3 text-2xl font-headline text-primary sm:text-3xl">
                    {currentStep?.question}
                  </h2>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Escolha a opcao que mais combina com voce. Cada resposta valida soma pontos ao seu placar.
                  </p>
                </div>

                {renderStepOptions()}
              </motion.div>
            </AnimatePresence>

            <footer className="flex flex-col gap-4 border-t border-primary/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <Button variant="outline" onClick={handleBack} disabled={safeStep === 0}>
                Voltar
              </Button>
              {safeStep === totalSteps - 1 ? (
                <Button onClick={handleNext} disabled={!answers[safeStep]}>
                  Ver resultado
                </Button>
              ) : (
                <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
                  Escolha uma opcao para avancar
                </p>
              )}
            </footer>
          </div>
        </div>
      </div>

      <AlertDialog open={isBonusModalOpen} onOpenChange={setIsBonusModalOpen}>
        <AlertDialogContent className="border border-accent/50 bg-background/90 backdrop-blur-xl shadow-lg shadow-accent/20">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center font-pixel text-2xl text-accent text-glow">
              Parabens, voce liberou um bonus!
            </AlertDialogTitle>
            <AlertDialogDescription className="pt-4 text-center text-lg text-foreground/90">
              Todos os jogos de PS2, PS1, Xbox 360 e Xbox foram desbloqueados! Continue para descobrir o resto.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="!justify-center pt-4">
            <AlertDialogAction onClick={closeBonusModalAndContinue} className="btn-pixel-accent">
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
