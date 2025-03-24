interface PaginationParams {
	limit?: string;
	page?: string;
}

export interface GetPlaylistById extends PaginationParams {
	id: string;
}

export interface GetPlaylistByLink extends PaginationParams {
	token: string;
}
