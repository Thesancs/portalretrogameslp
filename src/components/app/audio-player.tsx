
'use client';

import { useContext, useEffect, useRef } from 'react';
import { SoundContext } from '@/context/sound-context';

export default function AudioPlayer() {
    const soundContext = useContext(SoundContext);
    
    // We create local refs to assign to the context refs
    const backgroundRef = useRef<HTMLAudioElement>(null);
    const waitingRef = useRef<HTMLAudioElement>(null);
    const coinRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (soundContext) {
            (soundContext.audioRefs.background as React.MutableRefObject<HTMLAudioElement | null>).current = backgroundRef.current;
            (soundContext.audioRefs.waiting as React.MutableRefObject<HTMLAudioElement | null>).current = waitingRef.current;
            (soundContext.audioRefs.coin as React.MutableRefObject<HTMLAudioElement | null>).current = coinRef.current;
        }
    }, [soundContext]);

    if (!soundContext) return null;
    
    return (
        <>
            <audio ref={backgroundRef} loop>
              <source src="/sounds/sound_.mp3" type="audio/mpeg" />
            </audio>
            <audio ref={waitingRef} loop>
              <source src="/sounds/sound_.mp3" type="audio/mpeg" />
            </audio>
            <audio ref={coinRef}>
              <source src="/sounds/mario-coin.mp3" type="audio/mpeg" />
            </audio>
        </>
    );
}
