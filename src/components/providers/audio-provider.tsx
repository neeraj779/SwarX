"use client";

import { AudioPlayerProvider } from "react-use-audio-player";

export function AudioProvider({ children }: { children: React.ReactNode }) {
  return <AudioPlayerProvider>{children}</AudioPlayerProvider>;
}
