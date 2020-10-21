export interface Place {
  id: string;
  title: string;
  description?: string;
  dateCreated?: string | Date;
  geopoint: firebase.firestore.GeoPoint;
  photoIds: string[];
  coverPhotoId: string;
}
