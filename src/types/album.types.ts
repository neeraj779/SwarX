import {
  ArtistMap,
  EntityType,
  MediaQuality,
  ModuleBase,
} from "./common.types";
import { Song } from "./song.types";

export type Album = {
  explicit: boolean;
  id: string;
  image: MediaQuality;
  url: string;
  subtitle: string;
  name: string;
  type: "album";
  header_desc: string;
  language: string;
  play_count: number;
  duration: number;
  year: number;
  list_count: number;
  list_type: EntityType;
  artist_map: ArtistMap;
  song_count?: number;
  label_url?: string;
  copyright_text?: string;
  is_dolby_content?: boolean;
  songs: Song[];
  modules: AlbumModules;
};

export type AlbumModules = {
  recommend: AlbumModuleBase & {
    params: { id: string };
  };
  currently_trending: AlbumModuleBase & {
    params: { type: string; lang: string };
  };
  top_albums_from_same_year: AlbumModuleBase & {
    params: { year: string; lang: string };
  };
  artists: ModuleBase;
};

type AlbumModuleBase = ModuleBase & {
  params: Record<string, string>;
};
