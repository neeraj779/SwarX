export interface GetPlaylistById {
	id: string;
	limit: number;
	page: number;
}

export interface GetPlaylistByLink {
	token: string;
	limit: number;
	page: number;
}
