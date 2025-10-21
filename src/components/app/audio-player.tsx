
'use client';

import { useContext } from 'react';
import { SoundContext } from '@/context/sound-context';

export default function AudioPlayer() {
    const soundContext = useContext(SoundContext);
    if (!soundContext || !soundContext.audioRefs) return null;
    
    return (
        <>
            <audio ref={soundContext.audioRefs.background} loop>
              <source src="/sounds/sound_.mp3" type="audio/mpeg" />
            </audio>
            <audio ref={soundContext.audioRefs.waiting} loop>
              <source src="/sounds/sound_.mp3" type="audio/mpeg" />
            </audio>
            <audio ref={soundContext.audioRefs.coin}>
              <source src="/sounds/mario-coin.mp3" type="audio/mpeg" />
            </audio>
        </>
    );
}
