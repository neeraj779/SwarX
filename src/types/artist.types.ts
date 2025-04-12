import { Album } from "./album.types";
import {
  ArtistUrls,
  MediaQuality,
  MiniEntity,
  ModuleBase,
} from "./common.types";
import { Playlist } from "./playlist.types";
import { Song } from "./song.types";

export type Artist = {
  id: string;
  name: string;
  subtitle: string;
  image: MediaQuality;
  follower_count: number;
  type: "artist";
  is_verified: boolean;
  dominant_language: string;
  dominant_type: string;
  top_songs: (Song | MiniEntity)[];
  top_albums: (Album | MiniEntity)[];
  dedicated_artist_playlist: (Playlist | MiniEntity)[];
  featured_artist_playlist: (Playlist | MiniEntity)[];
  singles: ArtistSong[];
  latest_release: ArtistSong[];
  similar_artists: SimilarArtist[];
  is_radio_present: boolean;
  bio: {
    title: string;
    text: string;
    sequence: number;
  }[];
  dob: string;
  fb: string;
  twitter: string;
  wiki: string;
  urls: ArtistUrls;
  available_languages: string[];
  fan_count: number;
  is_followed: boolean;
  modules: {
    top_songs: ModuleBase;
    latest_release: ModuleBase;
    top_albums: ModuleBase;
    dedicated_artist_playlist: ModuleBase;
    featured_artist_playlist: ModuleBase;
    singles: ModuleBase;
    similar_artists: ModuleBase;
  };
};

export type SimilarArtist = {
  id: string;
  name: string;
  roles: { [K: string]: string };
  aka: string;
  fb: string;
  twitter: string;
  wiki: string;
  similar: {
    id: string;
    name: string;
  }[];
  dob: string;
  image: MediaQuality;
  search_keywords: string;
  primary_artist_id: string;
  languages: { [K: string]: string };
  url: string;
  type: "artist";
  is_radio_present: boolean;
  dominant_type: string;
};

export type ArtistSong = Pick<
  Song,
  | "id"
  | "name"
  | "subtitle"
  | "type"
  | "url"
  | "image"
  | "language"
  | "year"
  | "play_count"
  | "explicit"
  | "list_count"
  | "list_type"
  | "music"
  | "artist_map"
> & {
  query: string;
  text: string;
  song_count: number;
};

export type ArtistContent<T> = {
  total: number;
  last_page: boolean;
  songs: T[];
  albums: T[];
};

export type ArtistDetails = {
  id: string;
  name: string;
  image: MediaQuality;
  follower_count: number;
  type: "artist";
  is_verified: boolean;
  dominant_language: string;
  dominant_type: string;
  top_songs?: Omit<ArtistContent<Song | MiniEntity>, "albums">;
  top_albums?: Omit<ArtistContent<Album | MiniEntity>, "songs">;
};
