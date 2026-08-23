import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from 'lucide-react';

const TRACKS = [
  { title: 'Zero Bullshit Focus', tempo: 70 },
  { title: 'De-mining Systems Beat', tempo: 85 },
  { title: 'Target Operating Sound', tempo: 95 }
];

export const AudioPlayer: React.FC = () => {
  const { isZBMode, isAudioPlaying, setIsAudioPlaying } = useApp();
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Web Audio Synth Generator for Ambient Lo-Fi Background
  const startAmbientSynth = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(isMuted ? 0 : 0.08, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Chord frequencies in Pentatonic Minor (Cyber ambient feel)
      const chordFreqs = [
        [110.0, 130.81, 164.81, 196.0], // A minor 7
        [98.0, 123.47, 146.83, 174.61],  // G major 7
        [87.31, 110.0, 130.81, 155.56],  // F maj 7
        [82.41, 103.83, 123.47, 146.83]  // E minor 7
      ];

      let chordIndex = 0;

      const playChord = () => {
        if (!ctx || ctx.state === 'closed') return;
        const freqs = chordFreqs[chordIndex % chordFreqs.length];
        chordIndex++;

        freqs.forEach((freq) => {
          const osc = ctx.createOscillator();
          const noteGain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          noteGain.gain.setValueAtTime(0, ctx.currentTime);
          noteGain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 1.2);
          noteGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 3.8);

          osc.connect(noteGain);
          noteGain.connect(masterGain);

          osc.start();
          osc.stop(ctx.currentTime + 4);
        });
      };

      playChord();
      intervalRef.current = window.setInterval(playChord, 3500);
    } catch {
      // Audio context policy safe ignore
    }
  };

  const stopAmbientSynth = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend();
    }
  };

  useEffect(() => {
    if (isAudioPlaying && isZBMode) {
      startAmbientSynth();
    } else {
      stopAmbientSynth();
    }

    return () => stopAmbientSynth();
  }, [isAudioPlaying, isZBMode]);

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(
        isMuted ? 0 : 0.08,
        audioCtxRef.current.currentTime
      );
    }
  }, [isMuted]);

  if (!isZBMode) return null;

  const currentTrack = TRACKS[currentTrackIndex];

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-stone-900/95 border border-stone-800 text-stone-100 shadow-2xl backdrop-blur-md">
        {/* Track Title & Equalizer Bars */}
        <div className="flex items-center gap-2 pl-2 pr-1">
          {isAudioPlaying && (
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 h-3 bg-orange-400 animate-pulse" />
              <span className="w-0.5 h-2 bg-orange-400 animate-bounce" />
              <span className="w-0.5 h-3.5 bg-orange-400 animate-pulse" />
            </div>
          )}
          <span className="font-mono text-[10px] text-stone-300 max-w-[120px] truncate">
            {currentTrack.title}
          </span>
        </div>

        {/* Prev Track */}
        <button
          onClick={() =>
            setCurrentTrackIndex((prev) => (prev > 0 ? prev - 1 : TRACKS.length - 1))
          }
          className="p-1.5 text-stone-400 hover:text-stone-100 rounded-full hover:bg-stone-800 transition-colors"
          aria-label="Previous track"
        >
          <SkipBack className="w-3.5 h-3.5" />
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={() => setIsAudioPlaying(!isAudioPlaying)}
          className="p-2 rounded-full bg-orange-500 hover:bg-orange-600 text-stone-950 transition-all hover:scale-105 shadow-md shadow-orange-500/20"
          aria-label={isAudioPlaying ? 'Pause audio' : 'Play audio'}
        >
          {isAudioPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
        </button>

        {/* Next Track */}
        <button
          onClick={() =>
            setCurrentTrackIndex((prev) => (prev < TRACKS.length - 1 ? prev + 1 : 0))
          }
          className="p-1.5 text-stone-400 hover:text-stone-100 rounded-full hover:bg-stone-800 transition-colors"
          aria-label="Next track"
        >
          <SkipForward className="w-3.5 h-3.5" />
        </button>

        {/* Mute Toggle */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-1.5 text-stone-400 hover:text-stone-100 rounded-full hover:bg-stone-800 transition-colors"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};
