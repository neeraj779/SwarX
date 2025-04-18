import {
  ArtistMap,
  MediaQuality,
  MediaRights,
  MiniEntity,
  ModuleBase,
} from "./common.types";

export type Song = {
  id: string;
  name: string;
  subtitle: string;
  header_desc: string;
  type: "song";
  url: string;
  image: MediaQuality;
  language: string;
  year: number;
  play_count: number;
  explicit: boolean;
  list: string;
  list_type: string;
  list_count: number;
  music: string;
  song?: string;
  album: string;
  album_id: string;
  album_url: string;
  label: string;
  label_url: string;
  origin: string;
  is_dolby_content: boolean;
  "320kbps": boolean;
  download_url: MediaQuality;
  duration: number;
  rights: MediaRights;
  has_lyrics: boolean;
  lyrics_id?: string;
  lyrics_snippet: string;
  starred: boolean;
  copyright_text: string;
  artist_map: ArtistMap;
  release_date?: string;
  vcode: string;
  vlink: string;
  triller_available: boolean;
};

export type SongObject = {
  songs: Song[];
  modules?: SongModules;
};

export type SongModules = {
  recommend: SongModuleBase & {
    params: {
      id: string;
      lang: string;
    };
  };
  currently_trending: SongModuleBase & {
    params: {
      type: string;
      lang: string;
    };
  };
  songs_by_same_artists: SongModuleBase & {
    params: {
      artist_id: string;
      song_id: string;
      lang: string;
    };
  };
  songs_by_same_actors: SongModuleBase & {
    params: {
      actor_id: string;
      song_id: string;
      lang: string;
    };
  };
  artists: ModuleBase;
};

type SongModuleBase = ModuleBase & {
  params: Record<string, string>;
};

export type SongResponse = SongObject;
export type SongsResponse = (Song | MiniEntity)[];
