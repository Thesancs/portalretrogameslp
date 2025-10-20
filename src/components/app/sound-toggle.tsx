'use client';

import { useState, useEffect, useCallback } from 'react';
import * as Tone from 'tone';
import { Button } from '@/components/ui/button';
import { SpeakerLoudIcon, SpeakerOffIcon } from '@/components/app/pixel-art-icons';

let synth: Tone.PolySynth;
let sequence: Tone.Sequence;

const SoundToggle = () => {
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
  }, [isInitialized]);

  useEffect(() => {
    return () => {
      // Cleanup on component unmount
      if (Tone.Transport.state === 'started') {
        Tone.Transport.stop();
      }
      sequence?.dispose();
      synth?.dispose();
    };
  }, []);

  const toggleSound = async () => {
    if (!isInitialized) {
      await initializeAudio();
    }
    
    if (Tone.Transport.state === 'started') {
      Tone.Transport.pause();
      setIsSoundOn(false);
    } else {
      Tone.Transport.start();
      setIsSoundOn(true);
    }
  };
  
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
