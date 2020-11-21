export interface Place {
  id: string;
  title: string;
  geopoint: firebase.firestore.GeoPoint;
  description: string;
  coverPhotoUrl?: string;
  originalDownloadUrl?: string;
  originalFileName?: string;
  type?: string;
  dateCreated?: string | Date;
  website?: string;
  states?: string;
}
