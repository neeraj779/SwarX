export const ErrorMessages = {
	Artist: {
		NOT_FOUND: 'The requested artist could not be found',
		SONGS_NOT_FOUND: 'No songs found for this artist',
		ALBUMS_NOT_FOUND: 'No albums found for this artist',
	},
	Album: {
		NOT_FOUND: 'The requested album could not be found',
	},
	Song: {
		NOT_FOUND: 'The requested song could not be found',
		LYRICS_NOT_FOUND: 'No lyrics found for this song',
		SUGGESTIONS_NOT_FOUND: 'No song suggestions available',
		STATION_CREATION_FAILED: 'Unable to create song station',
	},
	Playlist: {
		NOT_FOUND: 'The requested playlist could not be found',
	},
	Search: {
		NO_RESULTS: 'No results found for your search',
	},
} as const;
