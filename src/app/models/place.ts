import { Photo } from './photo';

export interface Place {
  id: string;
  longitude: number;
  lattitude: number;
  photoIds: string[];
  coverPhoto: Photo;
}
