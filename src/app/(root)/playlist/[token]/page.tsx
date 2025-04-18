import {
  getPlaylistDetails,
  getPlaylistRecommendations,
  getTrending,
} from "@/services/saavnify.service";

import { DetailsHeader } from "@/components/details-header";
import { SliderList } from "@/components/slider-list";
import { SongList } from "@/components/song-list";

type PlaylistPageProps = { params: Promise<{ name: string; token: string }> };

async function fetcher(token: string) {
  const playlist = await getPlaylistDetails(token);

  const [recommendations, trending] = await Promise.all([
    getPlaylistRecommendations(playlist.id),
    getTrending("playlist"),
  ]);

  return {
    playlist,
    recommendations,
    trending,
  };
}

export default async function PlaylistDetailsPage(props: PlaylistPageProps) {
  const { token } = await props.params;

  const { playlist, recommendations, trending } = await fetcher(token);

  return (
    <div className="container mx-auto px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8">
      <DetailsHeader item={playlist} />

      <SongList songs={playlist.songs!} />

      {recommendations.length > 0 && (
        <SliderList
          title={
            playlist.modules?.related_playlist.title ?? "Recommended Playlists"
          }
          items={recommendations}
        />
      )}

      <SliderList
        title={
          playlist.modules?.currently_trending_playlists.title ??
          "Trending Playlists"
        }
        items={trending}
      />

      {playlist.user_info.artists && playlist.user_info.artists.length > 0 && (
        <SliderList
          title={playlist.modules?.artists.title ?? "Artists"}
          items={playlist.user_info.artists}
        />
      )}
    </div>
  );
}
