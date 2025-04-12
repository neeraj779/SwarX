import { Album } from "./album.types";
import { EntityType, MediaQuality, MiniEntity } from "./common.types";
import { Chart, RadioStation } from "./explore.types";
import { Playlist } from "./playlist.types";
import { Song } from "./song.types";

export type GlobalConfig = {
  random_songs_listid: GlobalConfigItem;
  weekly_top_songs_listid: GlobalConfigItem;
};

type GlobalConfigItem = Record<string, GlobalConfigItemLang>;

type GlobalConfigItemLang = {
  count: number;
  image: string;
  listid: string;
  title?: string;
};

export type Module<T> = {
  title: string;
  subtitle: string;
  position: number;
  featured_text?: string;
  source: string;
  data: T[];
};

type BaseModules = {
  albums: Module<Album | Song>;
  artist_recos: Module<ArtistReco>;
  charts: Module<Chart>;
  city_mod?: Module<CityMod>;
  discover: Module<Discover>;
  mixes: Module<TagMix>;
  playlists: Module<Playlist>;
  radio: Module<RadioStation>;
  trending: Module<Album | Song | Playlist | MiniEntity>;
  global_config: GlobalConfig;
};

type BaseMiniModules = {
  albums: Module<MiniEntity>;
  artist_recos: Module<MiniEntity>;
  charts: Module<MiniEntity>;
  city_mod?: Module<MiniEntity>;
  discover: Module<MiniEntity>;
  mixes: Module<MiniEntity>;
  playlists: Module<MiniEntity>;
  radio: Module<MiniEntity>;
  trending: Module<MiniEntity>;
  global_config: GlobalConfig;
};

export type ArtistReco = {
  explicit: boolean;
  id: string;
  image: MediaQuality;
  url: string;
  subtitle: string;
  name: string;
  type: EntityType;
  featured_station_type: EntityType;
  query: string;
  station_display_text: string;
};

export type Discover = {
  explicit: boolean;
  id: string;
  image: MediaQuality;
  url: string;
  subtitle: string;
  name: string;
  type: "channel";
  badge: string;
  is_featured: boolean;
  sub_type: EntityType;
  tags: Record<string, string[]>;
  video_thumbnail: string;
  video_url: string;
};

export type CityMod = {
  explicit: boolean;
  id: string;
  image: MediaQuality;
  url: string;
  subtitle: string;
  name: string;
  type: EntityType;
  album_id?: string;
  featured_station_type?: string;
  query?: string;
};

export type TagMix = {
  explicit: boolean;
  id: string;
  image: MediaQuality;
  url: string;
  subtitle: string;
  name: string;
  type: EntityType;
  first_name: string;
  language: string;
  last_name: string;
  list_count: number;
  list_type: EntityType;
  list: string;
  play_count: number;
  year: number;
};

export type Promo = {
  explicit: boolean;
  id: string;
  image: MediaQuality;
  url: string;
  subtitle: string;
  name: string;
  type: EntityType;
  editorial_language?: string;
  language?: string;
  list_count?: number;
  list_type?: string;
  list?: string;
  play_count?: number;
  release_year?: number;
  year?: number;
};

export type HomeModules = BaseModules;
export type HomeModulesMini = BaseMiniModules;
