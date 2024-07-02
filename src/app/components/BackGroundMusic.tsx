'use client';

import { useEffect, useRef } from 'react';

export default function BackgroundMusic()  {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
      const handleUserInteraction = () => {
        if (audioRef.current) {
          audioRef.current.play().catch(error => {
            console.error('Audio play failed:', error);
          });
        }
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('keydown', handleUserInteraction);
      };
  
      document.addEventListener('click', handleUserInteraction);
      document.addEventListener('keydown', handleUserInteraction);
  
      return () => {
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('keydown', handleUserInteraction);
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      };
    }, []);
  
    return <audio ref={audioRef} src="/JK_TEST/audio/BGM.wav" loop />;
};