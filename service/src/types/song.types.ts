export interface GetSongById {
	songIds: string;
	includeLyrics?: boolean;
}

export interface GetSongSuggestions {
	songId: string;
	limit: number;
}
