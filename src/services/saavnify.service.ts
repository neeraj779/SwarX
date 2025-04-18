"use server";

import { cookies } from "next/headers";

import { envServer } from "@/config/env.server";
import { Language } from "@/constants/language.constants";
import { Album } from "@/types/album.types";
import {
  Chart,
  FeaturedPlaylists,
  TopAlbums,
  TopArtist,
  Trending,
} from "@/types/explore.types";
import { HomeModulesMini } from "@/types/homeModules.types";
import { Playlist } from "@/types/playlist.types";
import { ApiResponse } from "@/types/response.types";
import { SongObject } from "@/types/song.types";

/**
 * Makes an API call to Saavnify with appropriate language settings
 * @param path The API endpoint path
 * @param query Optional query parameters
 * @returns Promise with the API response data
 */
async function fetchSaavnifyData<T>(
  path: string,
  query?: Record<string, string>
): Promise<T> {
  const cookiesStore = await cookies();
  const languagePreference = cookiesStore.get("language")?.value;

  const queryParams = {
    ...query,
    lang: query?.lang || languagePreference || "hindi",
  };

  path = `api/v1${path}`;
  const url = new URL(path, envServer.SAAVNIFY_API_BASE_URL);
  url.search = new URLSearchParams(queryParams).toString();

  const response = await fetch(url, { cache: "force-cache" });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch data from Saavnify: ${response.statusText}`
    );
  }
  const data = (await response.json()) as ApiResponse<T>;

  return data.data!;
}

export async function getHomeData(lang?: Language[], mini = true) {
  return await fetchSaavnifyData<HomeModulesMini>("/explore", {
    lang: lang?.join(",") ?? "",
    mini: `${mini}`,
  });
}

export async function getFeaturedPlaylists(
  page = 1,
  limit = 50,
  lang?: Language,
  mini = true
) {
  return await fetchSaavnifyData<FeaturedPlaylists>(
    "/explore/featured-playlists",
    {
      page: `${page}`,
      limit: `${limit}`,
      lang: lang ?? "",
      mini: `${mini}`,
    }
  );
}

export async function getTopAlbums(
  page = 1,
  limit = 50,
  lang?: Language,
  mini = true
) {
  return await fetchSaavnifyData<TopAlbums>("/explore/top-albums", {
    page: `${page}`,
    limit: `${limit}`,
    lang: lang ?? "",
    mini: `${mini}`,
  });
}

export async function getCharts() {
  return await fetchSaavnifyData<Chart[]>("/explore/charts");
}

export async function getTopArtists(page = 1, limit = 50, mini = true) {
  return await fetchSaavnifyData<TopArtist[]>("/explore/top-artists", {
    page: `${page}`,
    limit: `${limit}`,
    mini: `${mini}`,
  });
}

export async function getSongDetails(token: string | string[], mini = false) {
  return await fetchSaavnifyData<SongObject>(
    "/songs",
    Array.isArray(token)
      ? { id: token.join(","), mini: `${mini}` }
      : { token, mini: `${mini}` }
  );
}

export async function getTrending(
  type: "song" | "album" | "playlist",
  lang?: Language[],
  mini = true
) {
  return await fetchSaavnifyData<Trending>(`/explore/trending`, {
    type,
    lang: lang?.join(",") ?? "",
    mini: `${mini}`,
  });
}

export async function getAlbumDetails(token: string, mini = true) {
  return await fetchSaavnifyData<Album>("/albums", {
    token,
    mini: `${mini}`,
  });
}

export async function getAlbumRecommendations(
  id: string,
  lang?: Language[],
  mini = true
) {
  return await fetchSaavnifyData<Album[]>("/albums/recommend", {
    id,
    lang: lang?.join(",") ?? "",
    mini: `${mini}`,
  });
}

export async function getAlbumFromSameYear(
  year: number,
  lang?: Language[],
  mini = true
) {
  return await fetchSaavnifyData<Album[]>("/albums/same-year", {
    year: `${year}`,
    lang: lang?.join(",") ?? "",
    mini: `${mini}`,
  });
}

export async function getPlaylistDetails(token: string, mini = true) {
  return await fetchSaavnifyData<Playlist>("/playlists", {
    token,
    mini: `${mini}`,
  });
}

export async function getPlaylistRecommendations(
  id: string,
  lang?: Language[],
  mini = true
) {
  return await fetchSaavnifyData<Playlist[]>("/playlists/recommend", {
    id,
    lang: lang?.join(",") ?? "",
    mini: `${mini}`,
  });
}
