
'use client';

import { createContext, useState, useCallback, ReactNode, useRef, RefObject } from 'react';

interface SoundContextType {
  isSoundOn: boolean;
  toggleSound: () => void;
  playSound: () => void;
  stopSound: () => void;
  isInitialized: boolean;
  initializeAudio: () => Promise<void>;
  audioRef: RefObject<HTMLAudioElement> | null;
}

export const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider = ({ children }: { children: ReactNode }) => {
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const initializeAudio = useCallback(async () => {
    if (isInitialized) return;
    try {
        if (audioRef.current) {
            await audioRef.current.play();
            audioRef.current.pause();
            audioRef.current.volume = 0.3;
        }
        setIsInitialized(true);
    } catch (e) {
        // Autoplay was prevented.
        console.log("Audio initialization requires user interaction.");
    }
  }, [isInitialized]);

  const playSound = useCallback(async () => {
    if (!audioRef.current) return;
    try {
        await audioRef.current.play();
        setIsSoundOn(true);
    } catch (error) {
        console.error("Audio play failed:", error);
        setIsSoundOn(false);
    }
  }, []);

  const stopSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsSoundOn(false);
    }
  }, []);

  const toggleSound = useCallback(async () => {
    if (!isInitialized) {
      await initializeAudio();
    }
    
    if (audioRef.current) {
        if (audioRef.current.paused) {
            await playSound();
        } else {
            stopSound();
        }
    }
  }, [isInitialized, initializeAudio, playSound, stopSound]);
  
  return (
    <SoundContext.Provider value={{ isSoundOn, toggleSound, playSound, stopSound, isInitialized, initializeAudio, audioRef }}>
      {children}
    </SoundContext.Provider>
  );
};
