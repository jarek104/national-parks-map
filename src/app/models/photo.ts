import { Tag } from './tag';

export interface Photo {
  id: string;
  title: string;
  description: string;
  placeId: string;
  tags: Tag[];
  geopoint: firebase.firestore.GeoPoint;
  authorId?: string;
  isCopyright?: boolean;
  showAuthor?: boolean;
  likesCount?: number;
  viewCount?: number;
  dislikesCount?: number;
  dateCreated: string | Date;
  cameraBrand?: string;
  cameraModel?: string;
  fullRezLink?: string;
  medRezLink?: string;
  lowRezLink?: string;
  wasEdited?: boolean;
  reportIds?: string[];
}
