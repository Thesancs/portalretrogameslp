
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
        type: 'sine',
      },
      envelope: {
        attack: 0.1,
        decay: 0.5,
        sustain: 0.4,
        release: 1,
      },
      volume: -6,
    }).toDestination();

    // Reverb for a more "watery" feel
    const reverb = new Tone.Reverb({
      decay: 4,
      wet: 0.4,
    }).toDestination();
    synth.connect(reverb);
    
    // Melody inspired by Dire, Dire Docks
    const melody = [
      { time: '0:0', note: 'C4', duration: '2n' },
      { time: '0:2', note: 'G4', duration: '4n' },
      { time: '0:3', note: 'E4', duration: '4n' },
      { time: '1:0', note: 'F4', duration: '2n' },
      { time: '1:2', note: 'C5', duration: '4n' },
      { time: '1:3', note: 'A4', duration: '4n' },
      { time: '2:0', note: 'G4', duration: '1n' },
      { time: '3:0', note: 'E4', duration: '2n' },
      { time: '3:2', note: 'C4', duration: '2n' },
    ];

    sequence = new Tone.Part((time, value) => {
      synth.triggerAttackRelease(value.note, value.duration, time);
    }, melody).start(0);
    sequence.loop = true;
    sequence.loopEnd = '4m';


    Tone.Transport.bpm.value = 75;
    
    setIsInitialized(true);
    console.log("Audio Initialized with Dire Docks theme");
  }, [isInitialized]);

  useEffect(() => {
    return () => {
      if (Tone.Transport.state === 'started') {
        Tone.Transport.stop();
        Tone.Transport.cancel();
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
