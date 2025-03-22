import { useQuery } from '@tanstack/react-query';
import { playlistsService } from '@/services/playlists.service';
import type { Playlist, PlaylistFilters } from '@/types/playlists.types';

export const playlistKeys = {
  all: ['playlists'] as const,
  lists: () => [...playlistKeys.all, 'list'] as const,
  list: (filters: PlaylistFilters) => [...playlistKeys.lists(), filters] as const,
  details: () => [...playlistKeys.all, 'detail'] as const,
  detail: (id: string, includeLyrics: boolean = false) =>
    [...playlistKeys.details(), id, includeLyrics] as const
};

export function usePlaylists(filters: PlaylistFilters = {}) {
  return useQuery<Playlist[]>({
    queryKey: playlistKeys.list(filters),
    queryFn: () => playlistsService.getPlaylists(filters)
  });
}

export function usePlaylist(id: string, includeLyrics: boolean = false) {
  return useQuery<Playlist>({
    queryKey: playlistKeys.detail(id, includeLyrics),
    queryFn: () => playlistsService.getPlaylistById(id, includeLyrics),
    enabled: !!id
  });
}
