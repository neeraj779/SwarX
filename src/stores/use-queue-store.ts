import type { ArtistMini, MediaQuality } from "@/types/common.types";
import { create } from "zustand";

export type QueueTrack = {
  id: string;
  name: string;
  subtitle: string;
  url: string;
  type: "song" | "episode";
  image: MediaQuality;
  artists: ArtistMini[];
  download_url: MediaQuality;
  duration: number;
};

interface QueueStore {
  queue: QueueTrack[];
  currentIndex: number;
  currentTrack: QueueTrack | null;
  isPlayerInitialized: boolean;

  // === Actions ===
  addTrackToQueue: (track: QueueTrack) => void;
  addTracksToQueue: (tracks: QueueTrack[]) => void;
  removeTrackFromQueue: (id: string) => void;
  clearQueue: () => void;
  skipToNextTrack: () => void;
  skipToPreviousTrack: () => void;
  setCurrentTrackByIndex: (index: number) => void;
  initializePlayer: () => void;
  resetPlayerState: () => void;
}

export const useQueueStore = create<QueueStore>((set, get) => ({
  queue: [],
  currentIndex: -1,
  currentTrack: null,
  isPlayerInitialized: false,

  addTrackToQueue: (track) =>
    set((state) => ({
      queue: [...state.queue, track],
    })),

  addTracksToQueue: (tracks) =>
    set((state) => ({
      queue: [...state.queue, ...tracks],
    })),

  removeTrackFromQueue: (id) =>
    set((state) => {
      const oldIndex = state.queue.findIndex((t) => t.id === id);
      const newQueue = state.queue.filter((t) => t.id !== id);

      let newIndex = state.currentIndex;
      if (state.currentTrack?.id === id) {
        newIndex = Math.min(newIndex, newQueue.length - 1);
      } else if (oldIndex !== -1 && oldIndex < state.currentIndex) {
        newIndex = Math.max(0, newIndex - 1);
      }

      const newCurrentTrack =
        newQueue.length > 0 && newIndex >= 0 ? newQueue[newIndex] : null;

      return {
        queue: newQueue,
        currentIndex: newQueue.length > 0 ? newIndex : -1,
        currentTrack: newCurrentTrack,
        isPlayerInitialized: !!newCurrentTrack,
      };
    }),

  clearQueue: () =>
    set({
      queue: [],
      currentIndex: -1,
      currentTrack: null,
      isPlayerInitialized: false,
    }),

  skipToNextTrack: () => {
    const { queue, currentIndex } = get();
    if (currentIndex < queue.length - 1) {
      const nextIndex = currentIndex + 1;
      set({
        currentIndex: nextIndex,
        currentTrack: queue[nextIndex],
      });
    }
  },

  skipToPreviousTrack: () => {
    const { queue, currentIndex } = get();
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      set({
        currentIndex: prevIndex,
        currentTrack: queue[prevIndex],
      });
    }
  },

  setCurrentTrackByIndex: (index) => {
    const { queue } = get();
    if (index >= 0 && index < queue.length) {
      set({
        currentIndex: index,
        currentTrack: queue[index],
      });
    }
  },

  initializePlayer: () => set({ isPlayerInitialized: true }),

  resetPlayerState: () => set({ isPlayerInitialized: false }),
}));
