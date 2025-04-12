import {
  ArtistMap,
  EntityType,
  MediaQuality,
  MiniEntity,
  ModuleBase,
} from "./common.types";
import { ApiResponse } from "./response.types";
import { Song } from "./song.types";

export type Playlist = {
  id: string;
  name: string;
  subtitle: string;
  type: "playlist";
  image: MediaQuality;
  url: string;
  header_desc: string;
  explicit: boolean;
  language: string;
  year: number;
  play_count: number;
  list_count: number;
  list_type: EntityType;
  songs?: (Song | MiniEntity)[];
  user_info: {
    user_id: string;
    last_updated: string;
    username: string;
    first_name: string;
    last_name: string;
    is_followed: boolean;
    share_url: string;
    fan_count: number;
    follower_count: number;
    playlist_type: string;
    last_updated_timestamp: number;
    artist_map?: ArtistMap;
  };
  modules?: PlaylistModules;
};

export type PlaylistModules = {
  recommend: PlaylistModuleBase & {
    params: { id: string };
  };
  currently_trending: PlaylistModuleBase & {
    params: { type: string; lang: string };
  };
  artists: ModuleBase;
};

type PlaylistModuleBase = ModuleBase & {
  params: Record<string, string>;
};

export type PlaylistResponse = ApiResponse<Playlist>;
export type PlaylistsResponse = ApiResponse<Playlist[]>;
