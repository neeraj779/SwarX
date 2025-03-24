import { createImageLinks } from '@/shared/utils/link.util';
import { albumResponseDto } from '@/modules/album/dto/album.dto';
import { songResponseDto } from '../../song/dto/song.dto';
import type {
	artistAPIResponseSchema,
	artistMapAPIResponseSchema,
	artistMapSchema,
	artistSchema,
} from '@/modules/artist/schemas';
import type { z } from 'zod';

export const artistResponseDto = (
	artist: z.infer<typeof artistAPIResponseSchema>,
): z.infer<typeof artistSchema> => ({
	id: artist.artistId || artist.id,
	name: artist.name,
	url: artist.urls?.overview || artist.perma_url,
	type: artist.type,
	followerCount: artist.follower_count ? Number(artist.follower_count) : null,
	fanCount: artist.fan_count || null,
	isVerified: artist.isVerified || null,
	dominantLanguage: artist.dominantLanguage || null,
	dominantType: artist.dominantType || null,
	bio: artist.bio ? JSON.parse(artist.bio) : null,
	dob: artist.dob || null,
	fb: artist.fb || null,
	twitter: artist.twitter || null,
	wiki: artist.wiki || null,
	availableLanguages: artist.availableLanguages || null,
	isRadioPresent: artist.isRadioPresent || null,
	image: createImageLinks(artist.image),
	topSongs: artist.topSongs?.map(songResponseDto) || null,
	topAlbums: artist.topAlbums?.map(albumResponseDto) || null,
	singles: artist.singles?.map(songResponseDto) || null,
	similarArtists:
		artist.similarArtists?.map(similarArtist => ({
			id: similarArtist.id,
			name: similarArtist.name,
			url: similarArtist.perma_url,
			image: createImageLinks(similarArtist.image_url),
			languages: similarArtist.languages ? JSON.parse(similarArtist.languages) : null,
			wiki: similarArtist.wiki,
			dob: similarArtist.dob,
			fb: similarArtist.fb,
			twitter: similarArtist.twitter,
			isRadioPresent: similarArtist.isRadioPresent,
			type: similarArtist.type,
			dominantType: similarArtist.dominantType,
			aka: similarArtist.aka,
			bio: similarArtist.bio ? JSON.parse(similarArtist.bio) : null,
			similarArtists: similarArtist.similar ? JSON.parse(similarArtist.similar) : null,
		})) || null,
});

export const artistMapResponseDto = (
	artist: z.infer<typeof artistMapAPIResponseSchema>,
): z.infer<typeof artistMapSchema> => ({
	id: artist.id,
	name: artist.name,
	role: artist.role,
	image: createImageLinks(artist.image),
	type: artist.type,
	url: artist.perma_url,
});
