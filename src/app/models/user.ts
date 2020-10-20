export interface User {
  id: string;
  name: string;
  email: string;
  contactEnabled: boolean;
  dateCreated: string | Date;
  avatarId?: string;
  points?: number;
  bio?: string;
  uploadedPhotoIds?: string[];
  reportsCreatedIds?: string[];
  reportsReceivedIds?: string[];
  bucketListsIds?: string[];
  favoritePhotoIds?: string[];
  followingUserIds?: string[];
  photoViewingHistory?: string[];
}
