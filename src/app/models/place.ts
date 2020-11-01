export interface Place {
  id: string;
  title: string;
  geopoint: firebase.firestore.GeoPoint;
  photoIds: string[];
  coverPhotoUrl: string;
  description?: string;
  dateCreated?: string | Date;
}
