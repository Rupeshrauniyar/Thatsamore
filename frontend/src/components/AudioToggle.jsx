import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const timerRef = useRef(null);

  const startAmbience = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
        const ctx = audioCtxRef.current;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.04, ctx.currentTime);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Subtle warm harmonic chords: C maj9 / F maj7 warm acoustic frequencies
        const chords = [
          [261.63, 329.63, 392.00, 493.88], // C E G B
          [349.23, 440.00, 523.25, 659.25], // F A C E
          [220.00, 261.63, 329.63, 392.00], // A C E G
          [196.00, 246.94, 293.66, 392.00]  // G B D G
        ];

        let chordIdx = 0;
        const playChord = () => {
          if (!audioCtxRef.current || audioCtxRef.current.state === 'suspended') return;
          const now = ctx.currentTime;
          const currentChord = chords[chordIdx % chords.length];
          chordIdx++;

          currentChord.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const noteGain = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + idx * 0.15);

            noteGain.gain.setValueAtTime(0.001, now);
            noteGain.gain.exponentialRampToValueAtTime(0.025, now + 0.8 + idx * 0.15);
            noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

            osc.connect(noteGain);
            noteGain.connect(masterGain);

            osc.start(now + idx * 0.15);
            osc.stop(now + 4.8);
          });
        };

        playChord();
        timerRef.current = setInterval(playChord, 5000);
      } else if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      setIsPlaying(true);
    } catch (e) {
      console.warn('Audio ambience unavailable', e);
    }
  };

  const stopAmbience = () => {
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend();
    }
    setIsPlaying(false);
  };

  const toggle = () => {
    if (isPlaying) {
      stopAmbience();
    } else {
      startAmbience();
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <button
      type="button"
      className="audio-toggle"
      onClick={toggle}
      title={isPlaying ? "Mute trattoria ambience" : "Listen to trattoria ambience"}
      aria-label="Toggle dining soundscape"
    >
      {isPlaying ? (
        <span className="audio-toggle__active">
          <Volume2 size={14} />
          <span className="audio-wave">
            <span />
            <span />
            <span />
          </span>
        </span>
      ) : (
        <VolumeX size={14} opacity={0.65} />
      )}
    </button>
  );
}
