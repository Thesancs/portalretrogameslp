
'use client';

import { useContext } from 'react';
import { SoundContext } from '@/context/sound-context';

export default function AudioPlayer() {
    const soundContext = useContext(SoundContext);
    if (!soundContext) return null;
    
    return (
        <audio ref={soundContext.audioRef} loop>
          <source src="/sound/Super Mario 64 Remastered - Dire, Dire Docks - Church of Kondo (youtube).mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
    );
}
