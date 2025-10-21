'use client';

import { useContext, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { SpeakerLoudIcon, SpeakerOffIcon } from '@/components/app/pixel-art-icons';
import { SoundContext } from '@/context/sound-context';
import { usePathname } from 'next/navigation';

type Orientation = 'vertical' | 'horizontal';

interface SoundToggleProps {
  orientation?: Orientation;
}

const SoundToggle = ({ orientation = 'vertical' }: SoundToggleProps) => {
  const soundContext = useContext(SoundContext);
  const pathname = usePathname();

  useEffect(() => {
    soundContext?.initializeAudio();
  }, [soundContext]);

  if (!soundContext) {
    return null;
  }

  if (pathname !== '/' && !soundContext.isSoundOn) {
    return null;
  }

  const content = (
    <button
      type="button"
      onClick={() => soundContext.toggleSound()}
      className="btn-pixel-accent glow-ring flex items-center gap-3 rounded-full !px-6 !py-3 text-xs font-semibold uppercase tracking-[0.35em] sm:gap-4"
    >
      {soundContext.isSoundOn ? (
        <SpeakerLoudIcon className="h-6 w-6" />
      ) : (
        <SpeakerOffIcon className="h-6 w-6" />
      )}
      <span>{soundContext.isSoundOn ? 'Som ligado' : 'Ligar som'}</span>
    </button>
  );

  if (pathname !== '/') {
    return content;
  }

  if (orientation === 'horizontal') {
    return (
      <div className="retro-panel w-full max-w-xl rounded-3xl px-5 py-4 sm:px-6">
        <div className="retro-panel-content flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <div className="flex items-center gap-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 bg-background/70">
              <Sparkles className="h-5 w-5 text-primary" />
            </span>
            <div className="space-y-1 text-left text-[10px] uppercase tracking-[0.35em] text-muted-foreground sm:text-xs">
              <p>Passo 01</p>
              <p>Ative a trilha nostalgica</p>
            </div>
          </div>
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="retro-panel-content flex flex-col items-center gap-3">
        <span className="retro-badge">Passo 01</span>
        <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
          Ative a trilha nostalgica
        </p>
        {content}
      </div>
    </div>
  );
};

export default SoundToggle;
