import { Tag } from './tag';
export interface Photo {
  id: string;
  title: string;
  tags: Tag[];
  geopoint: {
    longitude?: number;
    lattitude?: number;
  }
  authorId?: string;
  isCopyright?: boolean;
  showAuthor?: boolean;
  likesCount?: number;
  viewCount?: number;
  dislikesCount?: number;
  dateCreated: string | Date;
  description?: string;
  cameraBrand?: string;
  cameraModel?: string;
  fullRezLink?: string;
  medRezLink?: string;
  lowRezLink?: string;
  wasEdited?: boolean;
  reportIds?: string[];
}
