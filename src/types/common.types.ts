export type EntityType =
  | "artist"
  | "album"
  | "playlist"
  | "radio"
  | "radio_station"
  | "song"
  | "channel"
  | "mix"
  | "show"
  | "episode"
  | "season"
  | "label";

export type MediaQuality = string | { quality: string; link: string }[];

export type ImageQuality = "low" | "medium" | "high";

export type StreamQuality = "poor" | "low" | "medium" | "high" | "excellent";

export type MediaRights = {
  code: unknown;
  cacheable: unknown;
  delete_cached_object: unknown;
  reason: unknown;
};

export type MiniEntity = {
  id: string;
  name: string;
  subtitle?: string;
  header_desc?: string;
  type: EntityType;
  url: string;
  image: MediaQuality;
  color?: string;
  duration?: number;
  album?: string;
  album_id?: string;
  album_url?: string;
  download_url?: MediaQuality;
  artist_map?: ArtistMap;
  explicit?: boolean;
  list?: string;
};

export type ModuleBase = {
  title: string;
  subtitle: string;
  source: string;
  position: number;
};

export type ArtistUrls = {
  albums: string;
  bio: string;
  comments: string;
  songs: string;
};

export type ArtistMap = {
  primary_artists: ArtistMini[];
  featured_artists: ArtistMini[];
  artists: ArtistMini[];
};

export type ArtistMini = {
  id: string;
  image: MediaQuality;
  url: string;
  name: string;
  type: "artist";
  role: string;
};
