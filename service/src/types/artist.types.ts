export interface GetArtistAlbums {
	artistId: string;
	page: number;
	sortBy: 'popularity' | 'latest' | 'alphabetical';
	sortOrder: 'asc' | 'desc';
}

export interface GetArtistSongs {
	artistId: string;
	page: number;
	sortBy: 'popularity' | 'latest' | 'alphabetical';
	sortOrder: 'asc' | 'desc';
}

export interface GetArtistByLink {
	token: string;
	page: number;
	songCount: number;
	albumCount: number;
	sortBy: 'popularity' | 'latest' | 'alphabetical';
	sortOrder: 'asc' | 'desc';
}

export interface GetArtistById {
	artistId: string;
	page: number;
	songCount: number;
	albumCount: number;
	sortBy: 'popularity' | 'latest' | 'alphabetical';
	sortOrder: 'asc' | 'desc';
}
