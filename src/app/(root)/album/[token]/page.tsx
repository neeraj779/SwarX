import {
  getAlbumDetails,
  getAlbumFromSameYear,
  getAlbumRecommendations,
  getTrending,
} from "@/services/saavnify.service";

import { DetailsHeader } from "@/components/details-header";
import { SliderList } from "@/components/slider-list";
import { SongList } from "@/components/song-list";

type AlbumDetailsPageProps = {
  params: Promise<{ token: string }>;
};

async function fetcher(token: string) {
  const album = await getAlbumDetails(token);

  const [recommendations, trending, sameYear] = await Promise.allSettled([
    getAlbumRecommendations(album.id),
    getTrending("album"),
    getAlbumFromSameYear(album.year),
  ]);

  return {
    album,
    recommendations:
      recommendations.status === "fulfilled" ? recommendations.value : [],
    trending: trending.status === "fulfilled" ? trending.value : [],
    sameYear: sameYear.status === "fulfilled" ? sameYear.value : [],
  };
}

export default async function AlbumDetailsPage(props: AlbumDetailsPageProps) {
  const { token } = await props.params;

  const { album, recommendations, trending, sameYear } = await fetcher(token);

  return (
    <div className="container mx-auto px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8">
      <DetailsHeader item={album} />
      <SongList songs={album.songs} />

      {recommendations.length > 0 && (
        <SliderList
          title={album.modules.recommend.title}
          items={recommendations}
        />
      )}

      {trending.length > 0 && (
        <SliderList
          title={album.modules.currently_trending.title}
          items={trending}
        />
      )}

      {sameYear.length > 0 && (
        <SliderList
          title={album.modules.top_albums_from_same_year.title}
          items={sameYear}
        />
      )}

      <SliderList
        title={album.modules.artists.title}
        items={album.artist_map.artists}
      />
    </div>
  );
}
