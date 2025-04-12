import { MiniEntity } from "./common.types";
import { Song } from "./song.types";

export type RadioStation = {
  station_id: string;
};

export type RadioSong = {
  station_id: string;
  songs: (Song | MiniEntity)[];
};
