export interface SongType {
  id: number;
  status?: string;
  sort?: null | number;
  user_created?: string;
  date_created?: string;
  user_updated?: string;
  date_updated?: string;
  name: string;
  artist: string;
  accent: string;
  cover: string;
  top_track: boolean;
  url: string;
}
