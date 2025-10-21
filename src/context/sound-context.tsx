
'use client';

import { createContext, useState, useCallback, ReactNode, useRef, RefObject, useEffect } from 'react';
import * as Tone from 'tone';

type SoundType = 'background' | 'waiting' | 'coin' | 'quiz_start';

interface SoundContextType {
  isSoundOn: boolean;
  toggleSound: (soundType?: SoundType) => void;
  playSound: (soundType: SoundType) => void;
  stopSound: (soundType?: SoundType) => void;
  isInitialized: boolean;
  initializeAudio: () => Promise<void>;
  audioRefs: { [key in SoundType]?: RefObject<HTMLAudioElement> };
}

export const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider = ({ children }: { children: ReactNode }) => {
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const audioRefs = {
    background: useRef<HTMLAudioElement>(null),
    waiting: useRef<HTMLAudioElement>(null),
    coin: useRef<HTMLAudioElement>(null),
    quiz_start: useRef<HTMLAudioElement>(null),
  };

  const initializeAudio = useCallback(async () => {
    if (typeof window === 'undefined' || isInitialized) return;

    try {
        await Tone.start();
        
        // Set volumes
        if(audioRefs.background.current) audioRefs.background.current.volume = 0.3;
        if(audioRefs.waiting.current) audioRefs.waiting.current.volume = 0.4;
        if(audioRefs.coin.current) audioRefs.coin.current.volume = 0.5;
        if(audioRefs.quiz_start.current) audioRefs.quiz_start.current.volume = 0.5;

        setIsInitialized(true);
        console.log("Audio context initialized.");
    } catch (error) {
        console.error("Failed to initialize audio:", error);
    }
  }, [isInitialized]);

  useEffect(() => {
    // Automatically initialize audio for desktop users. Mobile requires a user gesture.
    if (!isInitialized) {
        initializeAudio();
    }
  }, [isInitialized, initializeAudio]);

  const playSound = useCallback(async (soundType: SoundType) => {
    if (!isInitialized) await initializeAudio();
    if (!isInitialized) return; // a second check in case initialization fails
    
    const audioRef = audioRefs[soundType];

    if (!audioRef?.current) return;
    try {
        if(soundType !== 'coin' && soundType !== 'quiz_start') {
            // Stop other looping sounds
            for (const key in audioRefs) {
                const otherRef = audioRefs[key as SoundType];
                if (otherRef?.current && !otherRef.current.paused && key !== soundType) {
                    otherRef.current.pause();
                    otherRef.current.currentTime = 0;
                }
            }
        }
        audioRef.current.currentTime = 0;
        await audioRef.current.play();
        setIsSoundOn(true);
    } catch (error) {
        console.error(`Audio play failed for ${soundType}:`, error);
        if(soundType !== 'coin' && soundType !== 'quiz_start') setIsSoundOn(false);
    }
  }, [isInitialized, initializeAudio]);

  const stopSound = useCallback((soundType?: SoundType) => {
    const stop = (ref: RefObject<HTMLAudioElement> | null) => {
        if (ref?.current) {
            ref.current.pause();
            ref.current.currentTime = 0;
        }
    }

    if (soundType) {
        stop(audioRefs[soundType]);
    } else { // Stop all sounds
        for (const key in audioRefs) {
            stop(audioRefs[key as SoundType]);
        }
    }
    
    // If we stop all sounds or the main background, set sound to off
    if(!soundType || (soundType !== 'coin' && soundType !== 'quiz_start')) {
        setIsSoundOn(false);
    }

  }, []);

  const toggleSound = useCallback(async (soundType: SoundType = 'background') => {
    if (!isInitialized) {
      await initializeAudio();
      // Need a slight delay to ensure Tone.start() has completed
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    if (!isInitialized) return;

    const isAnyLoopingSoundOn = audioRefs.background.current?.paused === false || audioRefs.waiting.current?.paused === false;

    if (isAnyLoopingSoundOn) {
        stopSound();
    } else {
        await playSound(soundType);
    }
  }, [isInitialized, initializeAudio, playSound, stopSound]);
  
  return (
    <SoundContext.Provider value={{ isSoundOn, toggleSound, playSound, stopSound, isInitialized, initializeAudio, audioRefs }}>
      {children}
    </SoundContext.Provider>
  );
};
