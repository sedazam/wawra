"use client";

import {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { AudioItem } from "@/types";

type PlayerContextType = {
  currentAudio: AudioItem | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playAudio: (audio: AudioItem) => void;
  pauseAudio: () => void;
  resumeAudio: () => void;
  toggleAudio: (audio: AudioItem) => void;
  seekTo: (time: number) => void;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [currentAudio, setCurrentAudio] = useState<AudioItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentAudio]);

  const playAudio = async (audio: AudioItem) => {
    if (!audioRef.current) return;

    if (currentAudio?.id !== audio.id) {
      setCurrentAudio(audio);
      setCurrentTime(0);
      setDuration(0);

      audioRef.current.src = audio.audioUrl;

      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Playback failed:", error);
      }

      return;
    }

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Playback failed:", error);
    }
  };

  const pauseAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const resumeAudio = async () => {
    if (!audioRef.current) return;

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Playback failed:", error);
    }
  };

  const toggleAudio = async (audio: AudioItem) => {
    if (currentAudio?.id === audio.id) {
      if (isPlaying) {
        pauseAudio();
      } else {
        await resumeAudio();
      }
    } else {
      await playAudio(audio);
    }
  };

  const seekTo = (time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const value = useMemo(
    () => ({
      currentAudio,
      isPlaying,
      currentTime,
      duration,
      playAudio,
      pauseAudio,
      resumeAudio,
      toggleAudio,
      seekTo,
    }),
    [currentAudio, isPlaying, currentTime, duration],
  );

  return (
    <PlayerContext.Provider value={value}>
      {children}
      <audio ref={audioRef} preload="metadata" />
    </PlayerContext.Provider>
  );
}

export function usePlayerContext() {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error("usePlayerContext must be used inside PlayerProvider");
  }

  return context;
}
