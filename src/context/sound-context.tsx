
'use client';

import { createContext, useState, useCallback, ReactNode, useRef, RefObject } from 'react';

interface SoundContextType {
  isSoundOn: boolean;
  toggleSound: () => void;
  playSound: () => void;
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
    if (audioRef.current) {
        audioRef.current.volume = 0.3; // Set a default volume
    }
    setIsInitialized(true);
    console.log("Audio Player Initialized");
  }, [isInitialized]);

  const playSound = useCallback(async () => {
    await initializeAudio();
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsSoundOn(true);
      } catch (error) {
        console.error("Audio play failed:", error);
      }
    }
  }, [initializeAudio]);

  const toggleSound = async () => {
    if (!isInitialized) {
      await playSound();
      return;
    }

    if (audioRef.current) {
      if (audioRef.current.paused) {
        await audioRef.current.play();
        setIsSoundOn(true);
      } else {
        audioRef.current.pause();
        setIsSoundOn(false);
      }
    }
  };
  
  return (
    <SoundContext.Provider value={{ isSoundOn, toggleSound, playSound, isInitialized, initializeAudio, audioRef }}>
      {children}
    </SoundContext.Provider>
  );
};
