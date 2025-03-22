import { api } from '@/lib/api/client';
import type { Playlist, PlaylistFilters, PlaylistTrack } from '@/types/playlists.types';

interface CategorizedSongs {
  trending: PlaylistTrack[];
  relaxing: PlaylistTrack[];
  romance: PlaylistTrack[];
  lofi: PlaylistTrack[];
}

const PLAYLISTS_BASE_URL = '/SongsData';

const categorizePlaylistSongs = (songs: PlaylistTrack[] = []): CategorizedSongs => {
  return {
    trending: songs.slice(0, 7),
    relaxing: songs.slice(7, 14),
    romance: songs.slice(14, 21),
    lofi: songs.slice(21, 28)
  };
};

export const playlistsService = {
  categorizePlaylistSongs,
  async getPlaylistById(id: string, includeLyrics: boolean = false): Promise<Playlist> {
    try {
      const response = await api.get<Playlist>(
        `${PLAYLISTS_BASE_URL}/GetPlaylistById?listId=${id}&lyrics=${includeLyrics}`
      );
      return response;
    } catch (error) {
      console.error('Error fetching playlist:', error);
      throw error;
    }
  },

  async getPlaylists(filters: PlaylistFilters = {}): Promise<Playlist[]> {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, String(value));
      });

      const response = await api.get<Playlist[]>(
        `${PLAYLISTS_BASE_URL}/GetPlaylists?${params.toString()}`
      );
      return response;
    } catch (error) {
      console.error('Error fetching playlists:', error);
      throw error;
    }
  }
};
