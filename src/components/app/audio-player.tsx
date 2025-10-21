
'use client';

import { useContext, useEffect, useRef } from 'react';
import { SoundContext } from '@/context/sound-context';

export default function AudioPlayer() {
    const soundContext = useContext(SoundContext);
    
    // We create local refs to assign to the context refs
    const backgroundRef = useRef<HTMLAudioElement>(null);
    const waitingRef = useRef<HTMLAudioElement>(null);
    const coinRef = useRef<HTMLAudioElement>(null);
    const quizStartRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (soundContext) {
            (soundContext.audioRefs.background as React.MutableRefObject<HTMLAudioElement | null>).current = backgroundRef.current;
            (soundContext.audioRefs.waiting as React.MutableRefObject<HTMLAudioElement | null>).current = waitingRef.current;
            (soundContext.audioRefs.coin as React.MutableRefObject<HTMLAudioElement | null>).current = coinRef.current;
            (soundContext.audioRefs.quiz_start as React.MutableRefObject<HTMLAudioElement | null>).current = quizStartRef.current;
        }
    }, [soundContext]);

    if (!soundContext) return null;
    
    return (
        <>
            <audio ref={backgroundRef} loop>
              <source src="/sounds/Super Mario 64 Remastered - Dire, Dire Docks - Church of Kondo (youtube).mp3" type="audio/mpeg" />
            </audio>
            <audio ref={waitingRef} loop>
              <source src="/sounds/sound_.mp3" type="audio/mpeg" />
            </audio>
            <audio ref={coinRef}>
              <source src="/sounds/mario-coin.mp3" type="audio/mpeg" />
            </audio>
            <audio ref={quizStartRef}>
              <source src="/sounds/shit-here-we-go-again.mp3" type="audio/mpeg" />
            </audio>
        </>
    );
}
