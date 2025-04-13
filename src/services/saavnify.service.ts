"use server";

import { cookies } from "next/headers";

import { envServer } from "@/config/env.server";
import { Language } from "@/constants/language.constants";
import {
  Chart,
  FeaturedPlaylists,
  TopAlbums,
  TopArtist,
} from "@/types/explore.types";
import { HomeModulesMini } from "@/types/homeModules.types";
import { ApiResponse } from "@/types/response.types";

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
