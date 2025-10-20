'use client';

import { useContext } from 'react';
import { Button } from '@/components/ui/button';
import { SpeakerLoudIcon, SpeakerOffIcon, MoveRightIcon } from 'lucide-react';
import { SoundContext } from '@/context/sound-context';
import { usePathname } from 'next/navigation';

const SoundToggle = () => {
  const soundContext = useContext(SoundContext);
  const pathname = usePathname();

  if (!soundContext || pathname !== '/') {
    return null; // Only show on the homepage
  }

  const { isSoundOn, toggleSound } = soundContext;
  
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className='font-pixel'>Ligue o som aqui</span>
        <MoveRightIcon className="h-5 w-5 animate-pulse" />
      </div>
      <Button
        onClick={toggleSound}
        variant="ghost"
        size="lg"
        className="flex items-center gap-4 text-muted-foreground hover:text-foreground p-4 rounded-lg animate-glow"
      >
        {isSoundOn ? (
          <SpeakerLoudIcon className="h-8 w-8 text-primary" />
        ) : (
          <SpeakerOffIcon className="h-8 w-8" />
        )}
        <span className='font-body text-lg'>Ligar Som</span>
      </Button>
    </div>
  );
};

export default SoundToggle;
