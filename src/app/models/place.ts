import { Photo } from './photo';

export interface Place {
  id: string;
  title: string;
  description?: string;
  dateCreated?: string | Date;
  longitude?: number;
  latitude?: number;
  photoIds: string[];
  coverPhotoId: string;
}
