
'use client';

import { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import * as Tone from 'tone';

interface SoundContextType {
  isSoundOn: boolean;
  toggleSound: () => void;
  playSound: () => void;
  isInitialized: boolean;
  initializeAudio: () => Promise<void>;
}

export const SoundContext = createContext<SoundContextType | undefined>(undefined);

let synth: Tone.PolySynth;
let sequence: Tone.Sequence;

export const SoundProvider = ({ children }: { children: ReactNode }) => {
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const initializeAudio = useCallback(async () => {
    if (isInitialized) return;
    
    await Tone.start();
    
    synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: {
        type: 'square8',
      },
      envelope: {
        attack: 0.01,
        decay: 0.2,
        sustain: 0.2,
        release: 0.2,
      },
    }).toDestination();
    
    const melody = [
      ['C4', '8n'], ['E4', '8n'], ['G4', '8n'], ['C5', '8n'],
      ['G4', '8n'], ['E4', '8n'], ['C4', '8n'], null
    ];

    sequence = new Tone.Sequence((time, note) => {
      if (note) {
        synth.triggerAttackRelease(note, '8n', time);
      }
    }, melody, '4n').start(0);

    Tone.Transport.bpm.value = 120;
    
    setIsInitialized(true);
    console.log("Audio Initialized");
  }, [isInitialized]);

  useEffect(() => {
    return () => {
      if (Tone.Transport.state === 'started') {
        Tone.Transport.stop();
      }
      sequence?.dispose();
      synth?.dispose();
    };
  }, []);
  
  const playSound = useCallback(async () => {
    if (!isInitialized) {
      await initializeAudio();
    }
    if (Tone.Transport.state !== 'started') {
      Tone.Transport.start();
      setIsSoundOn(true);
    }
  }, [isInitialized, initializeAudio]);

  const toggleSound = async () => {
    if (!isInitialized) {
      await initializeAudio();
    }
    
    if (Tone.Transport.state === 'started') {
      Tone.Transport.pause();
      setIsSoundOn(false);
    } else {
      await Tone.start(); // Ensure context is running
      Tone.Transport.start();
      setIsSoundOn(true);
    }
  };

  return (
    <SoundContext.Provider value={{ isSoundOn, toggleSound, playSound, isInitialized, initializeAudio }}>
      {children}
    </SoundContext.Provider>
  );
};
