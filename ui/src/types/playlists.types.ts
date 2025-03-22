export interface PlaylistTrack {
  id: string;
  type: string;
  song: string;
  album: string;
  year: string;
  music: string;
  music_id: string;
  primary_artists: string;
  primary_artists_id: string;
  featured_artists: string;
  featured_artists_id: string;
  singers: string;
  starring: string;
  image: string;
  label: string;
  albumid: string;
  language: string;
  origin: string;
  play_count: string;
  duration: string;
  rights: {
    code: number;
    reason: string;
    cacheable: boolean;
    delete_cached_object: boolean;
  };
  media_url?: string;
  media_preview_url?: string;
  perma_url: string;
  album_url: string;
  release_date: string;
}

export interface Playlist {
  artists: string[];
  listid: string;
  listname: string;
  content_list: string[];
  perma_url: string;
  follower_count: string;
  uid: string;
  last_updated: string;
  username: string;
  firstname: string;
  lastname: string;
  is_followed: boolean | null;
  isFY: boolean;
  image: string;
  share: string;
  songs: PlaylistTrack[];
  type: string;
  list_count: string;
  fan_count: string;
  H2: null;
  is_dolby_playlist: boolean;
  subheading: null;
  sub_types: null;
  images: null;
  video_available: boolean;
  video_count: number;
  subtitle_desc: string[];
}

export interface PlaylistResponse {
  status: string;
  message: string | null;
  data: Playlist;
}

export interface PlaylistFilters {
  search?: string;
  owner?: string;
}
