import React, { createContext, useState, useContext, useEffect, useCallback, useMemo } from 'react';

// A simple, short click sound encoded in base64 to avoid an extra network request.
// Source: Public Domain, https://freesound.org/people/mapiratur/sounds/550248/
const TAP_SOUND_DATA_URL = 'data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAASAAADbWFweXJvbmVzLmNvbQBCbGFtIDYAAAAA//uQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADMgEAAAYGAABQW0xBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVaxMAQAAAAAAAABJbmZvAAAACgAAAAIAAAABAAAISEEgAExhdmY1AAAA//uQBQgAAAEAAAEJqGgAAAEGAQBAAAAodG9jAP/7kMQCAAAAAAAAAAD/7kMQCAAAAAAAAAAD/7kMQCAAAAAAAAAAD/7kMQCAAAAAAAAAAD/7kMQCAAAAAAAAAAD/7kMQCAAAAAAAAAAD/7kMQCAAAAAAAAAAD/7kMQCAAAAAAAAAAD/7kMQCAAAAAAAAAAD/7kMQCAAAAAAAAAAD/T///84AAAB//uQzAsAAADSAAAA6wAABMAABSAAjGgAAAEGAQBAAAAYbGF2YzYwLjMxADIwMjQwNzE0VVVVVVVV//uQzAsAAADSAAAA6wAABMAABSAAjGgAAAEGAQBAAAAYbGF2YzYwLjMxADIwMjQwNzE0VVVVVVVV';

interface SoundContextType {
  soundEnabled: boolean;
  setSoundEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  playSound: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const savedSound = localStorage.getItem('app-sound');
      return savedSound ? JSON.parse(savedSound) : true;
    } catch {
      return true;
    }
  });
  
  const audio = useMemo(() => typeof Audio !== 'undefined' ? new Audio(TAP_SOUND_DATA_URL) : null, []);

  useEffect(() => {
    if (audio) {
        audio.preload = 'auto';
    }
    try {
      localStorage.setItem('app-sound', JSON.stringify(soundEnabled));
    } catch (e) {
      console.error("Could not save sound setting to local storage");
    }
  }, [soundEnabled, audio]);

  const playSound = useCallback(() => {
    if (soundEnabled && audio) {
      audio.currentTime = 0;
      audio.play().catch(e => {}); // Catch errors for browsers that block autoplay
    }
  }, [soundEnabled, audio]);
  
  const value = useMemo(() => ({ soundEnabled, setSoundEnabled, playSound }), [soundEnabled, setSoundEnabled, playSound]);

  return (
    <SoundContext.Provider value={value}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = (): SoundContextType => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};