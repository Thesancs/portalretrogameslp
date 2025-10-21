
'use client';

import { useContext, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MoveDownIcon } from 'lucide-react';
import { SpeakerLoudIcon, SpeakerOffIcon } from '@/components/app/pixel-art-icons';
import { SoundContext } from '@/context/sound-context';
import { usePathname } from 'next/navigation';

const SoundToggle = () => {
  const soundContext = useContext(SoundContext);
  const pathname = usePathname();

  useEffect(() => {
    soundContext?.initializeAudio();
  }, [soundContext]);

  if (!soundContext) {
    return null;
  }
  
  // Only show on the homepage, or when music is already playing on other pages
  if (pathname !== '/' && !soundContext.isSoundOn) {
    return null;
  }
  
  if (pathname !== '/') {
      return (
         <Button
            onClick={() => soundContext.toggleSound()}
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
          >
            {soundContext.isSoundOn ? (
              <SpeakerLoudIcon className="h-6 w-6 text-primary" />
            ) : (
              <SpeakerOffIcon className="h-6 w-6" />
            )}
            <span className='sr-only'>Toggle Sound</span>
          </Button>
      )
  }

  const { isSoundOn, toggleSound } = soundContext;
  
  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        onClick={() => toggleSound()}
        variant="ghost"
        size="lg"
        className="flex items-center gap-4 text-muted-foreground hover:text-foreground p-4 rounded-lg animate-glow"
      >
        {isSoundOn ? (
          <SpeakerLoudIcon className="h-8 w-8 text-primary" />
        ) : (
          <SpeakerOffIcon className="h-8 w-8" />
        )}
        <span className='font-body text-lg'>{isSoundOn ? 'Desligar Som' : 'Ligar Som'}</span>
      </Button>
      <div className="flex flex-col items-center gap-2 text-muted-foreground">
        <MoveDownIcon className="h-5 w-5 animate-pulse" />
        <span className='font-pixel'>Ligue o som aqui</span>
      </div>
    </div>
  );
};

export default SoundToggle;
