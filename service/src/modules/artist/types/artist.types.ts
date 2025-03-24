type SortBy = 'popularity' | 'latest' | 'alphabetical';
type SortOrder = 'asc' | 'desc';

interface PaginationAndSorting {
	page?: string;
	sortBy?: SortBy;
	sortOrder?: SortOrder;
}

interface ArtistIdentifier {
	artistId: string;
}

interface Counts {
	songCount?: string;
	albumCount?: string;
}

export interface GetArtistAlbums extends ArtistIdentifier, PaginationAndSorting {}

export interface GetArtistSongs extends ArtistIdentifier, PaginationAndSorting {}

export interface GetArtistByLink extends PaginationAndSorting, Counts {
	token: string;
}

export interface GetArtistById extends ArtistIdentifier, PaginationAndSorting, Counts {}
