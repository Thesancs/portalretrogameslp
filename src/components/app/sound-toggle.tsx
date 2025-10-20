'use client';

import { useContext } from 'react';
import { Button } from '@/components/ui/button';
import { SpeakerLoudIcon, SpeakerOffIcon } from '@/components/app/pixel-art-icons';
import { SoundContext } from '@/context/sound-context';

const SoundToggle = () => {
  const soundContext = useContext(SoundContext);

  if (!soundContext) {
    return null; // Or a loading/fallback state
  }

  const { isSoundOn, toggleSound } = soundContext;
  
  return (
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
      <span className='font-body text-lg'>{isSoundOn ? 'Sound On' : 'Sound Off'}</span>
    </Button>
  );
};

export default SoundToggle;
