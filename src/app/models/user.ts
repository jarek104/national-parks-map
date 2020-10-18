export interface User {
  id: string;
  name: string;
  email: string;
  bio: string;
  memberSince: string;
  totalFavoritesCount: number;
  photos: number[];
  reportIds: number[];
  favoritePhotoIds: number[];
  bucketListIds: number[];
}
