"use client";

import { getSongDetails } from "@/services/saavnify.service";
import { useQueueStore } from "@/stores/use-queue-store";
import { EntityType } from "@/types/common.types";
import { EpisodeDetail } from "@/types/show.types";
import { Song } from "@/types/song.types";

interface PlayButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type: EntityType;
  token: string;
}

export function PlayButton({
  type,
  token,
  children,
  ...props
}: PlayButtonProps) {
  const { queue, setCurrentTrackByIndex, addTracksToQueue, initializePlayer } =
    useQueueStore();

  const handlePlay = async () => {
    const songIndex = queue.findIndex(
      (song) => token === song.url.split("/").pop()
    );

    if (songIndex !== -1) {
      setCurrentTrackByIndex(songIndex);
      return;
    }

    let tracks: (Song | EpisodeDetail)[] = [];

    switch (type) {
      case "song": {
        const songObj = await getSongDetails(token);
        tracks = songObj.songs;
        break;
      }
    }

    const _tracks = tracks.map(
      ({
        id,
        name,
        subtitle,
        type,
        url,
        image,
        download_url,
        artist_map: { artists },
        duration,
      }) => ({
        id,
        name,
        subtitle,
        url,
        type,
        image,
        download_url,
        artists,
        duration,
      })
    );

    const newTrackIndex = queue.length;
    addTracksToQueue(_tracks);
    setCurrentTrackByIndex(newTrackIndex);
    initializePlayer();
  };

  return (
    <button aria-label="Play" onClick={handlePlay} {...props}>
      {children}
    </button>
  );
}
