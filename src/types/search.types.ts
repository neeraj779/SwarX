import { Album } from "./album.types";
import {
  ArtistMap,
  ArtistMini,
  MediaQuality,
  MiniEntity,
} from "./common.types";
import { EntityType } from "./common.types";
import { Playlist } from "./playlist.types";
import { Song } from "./song.types";

type SearchPaginated<T> = {
  position: number;
  data: T[];
};

export type Search<T> = {
  total: number;
  start: number;
  results: T[];
};

export type TopSearch = {
  id: string;
  name: string;
  subtitle: string;
  type: EntityType;
  image: MediaQuality;
  url: string;
  explicit: boolean;
  album: string;
  artist_map: ArtistMap[];
};

export type AllSearch = {
  albums: SearchPaginated<{
    id: string;
    name: string;
    subtitle: string;
    image: MediaQuality;
    music: string;
    url: string;
    type: string;
    position: number;
    year: number;
    is_movie: boolean;
    language: string;
    song_pids: string;
  }>;
  songs: SearchPaginated<{
    id: string;
    name: string;
    subtitle: string;
    image: MediaQuality;
    album: string;
    url: string;
    type: string;
    position: number;
    primary_artists?: string;
    singers?: string;
    language?: string;
  }>;
  playlists: SearchPaginated<{
    id: string;
    name: string;
    subtitle: string;
    image: MediaQuality;
    extra: string;
    url: string;
    language: string;
    type: string;
    position: number;
    firstname?: string;
    lastname?: string;
    artist_name?: string;
    entity_type?: string;
    entity_sub_type?: string;
    is_dolby_content?: boolean;
    sub_types?: string;
  }>;
  artists: SearchPaginated<{
    id: string;
    name: string;
    image: MediaQuality;
    extra: string;
    url: string;
    type: string;
    subtitle: string;
    entity: number;
    position: number;
  }>;
  top_query: SearchPaginated<AllSearch["songs"]["data"][0]>;
  shows: SearchPaginated<{
    id: string;
    name: string;
    image: MediaQuality;
    type: string;
    season_number: number;
    subtitle: string;
    url: string;
    position: number;
  }>;
  episodes: SearchPaginated<unknown>;
};

export type SongSearch = Search<Song | MiniEntity>;

export type AlbumSearch = Search<Album | MiniEntity>;

export type PlaylistSearch = Search<Playlist | MiniEntity>;

export type ArtistSearch = Search<{
  id: string;
  name: string;
  ctr: number;
  entity: number;
  image: MediaQuality;
  role: string;
  url: string;
  type: string;
  is_radio_present: boolean;
  is_followed: boolean;
}>;

export type PodcastSearch = Search<{
  id: string;
  name: string;
  subtitle: string;
  type: string;
  image: MediaQuality;
  partner_name: string;
  label_name: string;
  explicit: boolean;
  season: number;
  artists: ArtistMini[];
  featured_artists: ArtistMini[];
  primary_artists: ArtistMini[];
  url: string;
}>;
