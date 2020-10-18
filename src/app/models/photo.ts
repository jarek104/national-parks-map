export interface Photo {
  id: string;
  longitude: number;
  lattitude: number;
  blob: string;
  title: string;
  description: string;
  authorId: string;
  favorites: number;
  tags: number[];
  date: string;
  placeId: number;
  cameraType: string;
}
